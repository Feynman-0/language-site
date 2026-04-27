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

class BlogService {
  async getAllBlogs(): Promise<Blog[]> {
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data as Blog[];
  }

  async getApprovedBlogs(): Promise<Blog[]> {
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .eq('status', 'approved')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data as Blog[];
  }

  async getBlogById(id: string): Promise<Blog | null> {
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .eq('id', id)
      .single();

    if (error) return null;
    return data as Blog;
  }

  async uploadImage(file: File): Promise<string> {
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
  }

  async createBlog(blog: Omit<Blog, 'id' | 'created_at'> & { image_file?: File }): Promise<Blog> {
    let imageUrl = blog.image_url;

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
  }

  async updateBlogStatus(id: string, status: BlogStatus): Promise<Blog> {
    return this.updateBlog(id, { status });
  }

  async deleteBlog(id: string): Promise<void> {
    const { error } = await supabase
      .from('blogs')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }

  async updateBlog(id: string, updates: Partial<Blog> & { image_file?: File }): Promise<Blog> {
    let imageUrl = updates.image_url;

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
  }
}

export const blogService = new BlogService();
