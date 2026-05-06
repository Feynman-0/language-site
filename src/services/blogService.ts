import { supabase } from '@/lib/supabase';

export type BlogStatus = 'pending' | 'approved';

export interface Blog {
  id: string;
  title: string;
  content: string;
  author_name: string;
  image_url?: string;
  status: BlogStatus;
  created_at: string;
}

const BLOGS_KEY = 'language_site_blogs';

class BlogService {
  private getMockBlogs(): Blog[] {
    const stored = localStorage.getItem(BLOGS_KEY);
    return stored ? JSON.parse(stored) : [];
  }

  private saveMockBlogs(blogs: Blog[]) {
    localStorage.setItem(BLOGS_KEY, JSON.stringify(blogs));
  }

  async getAllBlogs(): Promise<Blog[]> {
    try {
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Blog[];
    } catch (error) {
      console.error('Failed to fetch blogs from Supabase, using mock data:', error);
      return this.getMockBlogs();
    }
  }

  async getApprovedBlogs(): Promise<Blog[]> {
    try {
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .eq('status', 'approved')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Blog[];
    } catch (error) {
      console.error('Failed to fetch approved blogs, using mock data:', error);
      return this.getMockBlogs().filter(b => b.status === 'approved');
    }
  }

  async getBlogById(id: string): Promise<Blog | null> {
    try {
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data as Blog;
    } catch (error) {
      return this.getMockBlogs().find(b => b.id === id) || null;
    }
  }

  async uploadImage(file: File): Promise<string> {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `blog-images/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('blog-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('blog-images')
        .getPublicUrl(filePath);

      return data.publicUrl;
    } catch (error) {
      console.warn('Supabase upload failed, converting to Base64 for local testing');
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(file);
      });
    }
  }

  async createBlog(blog: Omit<Blog, 'id' | 'created_at'> & { image_file?: File }): Promise<Blog> {
    let imageUrl = blog.image_url;

    try {
      if (blog.image_file) {
        imageUrl = await this.uploadImage(blog.image_file);
      }

      const { data, error } = await supabase
        .from('blogs')
        .insert([{
          title: blog.title,
          content: blog.content,
          author_name: blog.author_name,
          image_url: imageUrl,
          status: blog.status
        }])
        .select()
        .single();

      if (error) throw error;
      return data as Blog;
    } catch (error) {
      console.error('Failed to create blog in Supabase, using mock storage:', error);
      const newBlog: Blog = {
        ...blog,
        image_url: imageUrl, // Use the processed image URL/Base64
        id: Math.random().toString(36).substr(2, 9),
        created_at: new Date().toISOString()
      };
      const blogs = this.getMockBlogs();
      blogs.unshift(newBlog);
      this.saveMockBlogs(blogs);
      return newBlog;
    }
  }

  async updateBlogStatus(id: string, status: BlogStatus): Promise<Blog> {
    return this.updateBlog(id, { status });
  }

  async deleteBlog(id: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('blogs')
        .delete()
        .eq('id', id);

      if (error) throw error;
    } catch (error) {
      const blogs = this.getMockBlogs().filter(b => b.id !== id);
      this.saveMockBlogs(blogs);
    }
  }

  async updateBlog(id: string, updates: Partial<Blog> & { image_file?: File }): Promise<Blog> {
    let imageUrl = updates.image_url;

    try {
      if (updates.image_file) {
        imageUrl = await this.uploadImage(updates.image_file);
      }

      const finalUpdates = { ...updates };
      delete finalUpdates.image_file;
      if (imageUrl) finalUpdates.image_url = imageUrl;

      const { data, error } = await supabase
        .from('blogs')
        .update(finalUpdates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data as Blog;
    } catch (error) {
      const blogs = this.getMockBlogs();
      const index = blogs.findIndex(b => b.id === id);
      if (index === -1) throw new Error("Blog not found");
      
      const finalUpdates = { ...updates };
      delete finalUpdates.image_file;
      if (imageUrl) finalUpdates.image_url = imageUrl;

      blogs[index] = { ...blogs[index], ...finalUpdates };
      this.saveMockBlogs(blogs);
      return blogs[index];
    }
  }
}

export const blogService = new BlogService();
