import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { blogService, Blog } from "@/services/blogService";
import { authService } from "@/services/authService";
import { supabase } from "@/lib/supabase";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import PageTransition from "@/components/shared/PageTransition";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  CheckCircle, 
  Trash2, 
  Edit, 
  Plus, 
  LogOut,
  Key,
  Loader2,
  Mail,
  UserPlus,
  Calendar,
  MessageSquare,
  Phone,
  Globe
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import RichTextEditor from "@/components/shared/RichTextEditor";

interface Contact {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  created_at: string;
}

interface Registration {
  id: string;
  name: string;
  email: string;
  phone: string;
  country?: string;
  language: string;
  level: string;
  batch?: string;
  hear_about?: string;
  comments?: string;
  created_at: string;
}

const AdminPanel = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isPassDialogOpen, setIsPassDialogOpen] = useState(false);

  useEffect(() => {
    if (!authService.isAuthenticated()) {
      navigate("/admin/login");
      return;
    }
    fetchAllData();
  }, [navigate]);

  const fetchAllData = async () => {
    setIsLoading(true);
    try {
      const [blogsData, contactsData, regsData] = await Promise.all([
        blogService.getAllBlogs(),
        supabase.from('contacts').select('*').order('created_at', { ascending: false }),
        supabase.from('registrations').select('*').order('created_at', { ascending: false })
      ]);

      setBlogs(blogsData);
      if (contactsData.data) setContacts(contactsData.data);
      if (regsData.data) setRegistrations(regsData.data);
    } catch (error) {
      toast.error("Failed to fetch data");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    authService.logout();
    toast.success("Logged out successfully");
    navigate("/admin/login");
  };

  const handleApprove = async (id: string) => {
    try {
      await blogService.updateBlogStatus(id, 'approved');
      toast.success("Blog approved!");
      const data = await blogService.getAllBlogs();
      setBlogs(data);
    } catch (error) {
      toast.error("Failed to approve blog");
    }
  };

  const handleDeleteBlog = async (id: string) => {
    if (confirm("Are you sure you want to delete this blog?")) {
      try {
        await blogService.deleteBlog(id);
        toast.success("Blog deleted");
        const data = await blogService.getAllBlogs();
        setBlogs(data);
      } catch (error) {
        toast.error("Failed to delete blog");
      }
    }
  };

  const handleDeleteContact = async (id: string) => {
    if (confirm("Delete this message?")) {
      const { error } = await supabase.from('contacts').delete().eq('id', id);
      if (error) toast.error("Failed to delete message");
      else {
        toast.success("Message deleted");
        setContacts(contacts.filter(c => c.id !== id));
      }
    }
  };

  const handleDeleteRegistration = async (id: string) => {
    if (confirm("Delete this registration?")) {
      const { error } = await supabase.from('registrations').delete().eq('id', id);
      if (error) toast.error("Failed to delete registration");
      else {
        toast.success("Registration deleted");
        setRegistrations(registrations.filter(r => r.id !== id));
      }
    }
  };

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [content, setContent] = useState("");

  useEffect(() => {
    if (editingBlog) {
      setContent(editingBlog.content);
    } else {
      setContent("");
    }
  }, [editingBlog]);

  const handleSaveEdit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      title: formData.get("title") as string,
      author_name: formData.get("author_name") as string,
      content: content,
      image_url: formData.get("image_url") as string,
    };

    try {
      if (editingBlog?.id) {
        await blogService.updateBlog(editingBlog.id, { ...data, image_file: imageFile || undefined });
        toast.success("Blog updated");
      } else {
        await blogService.createBlog({ ...data, status: 'approved', image_file: imageFile || undefined });
        toast.success("Blog created");
      }
      setIsDialogOpen(false);
      setEditingBlog(null);
      setImageFile(null);
      const blogsData = await blogService.getAllBlogs();
      setBlogs(blogsData);
    } catch (error) {
      toast.error("Failed to save blog");
    }
  };

  const handleChangePassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const oldPass = formData.get("old_password") as string;
    const newPass = formData.get("new_password") as string;
    const confirmPass = formData.get("confirm_password") as string;

    if (newPass !== confirmPass) {
      toast.error("New passwords do not match");
      return;
    }

    const success = await authService.changePassword(oldPass, newPass);
    if (success) {
      toast.success("Password changed successfully!");
      setIsPassDialogOpen(false);
    } else {
      toast.error("Incorrect current password");
    }
  };

  const pendingBlogs = blogs.filter(b => b.status === 'pending');
  const approvedBlogs = blogs.filter(b => b.status === 'approved');

  return (
    <PageTransition>
      <Navbar />
      <main className="pt-24 min-h-screen bg-ivory">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <h1 className="text-3xl md:text-4xl font-display font-bold text-charcoal">Admin Dashboard</h1>
              <p className="text-muted-foreground mt-2">Manage blogs, contacts, and registrations.</p>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <Dialog open={isPassDialogOpen} onOpenChange={setIsPassDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="rounded-full">
                    <Key className="w-4 h-4 mr-2" /> Change Password
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Change Admin Password</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleChangePassword} className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="old_password">Current Password</Label>
                      <Input id="old_password" name="old_password" type="password" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new_password">New Password</Label>
                      <Input id="new_password" name="new_password" type="password" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm_password">Confirm New Password</Label>
                      <Input id="confirm_password" name="confirm_password" type="password" required />
                    </div>
                    <DialogFooter>
                      <Button type="submit" className="bg-gold text-primary-foreground">Update Password</Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>

              <Button variant="ghost" className="text-red-500 hover:text-red-600 hover:bg-red-50 rounded-full" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" /> Logout
              </Button>

              <Dialog open={isDialogOpen} onOpenChange={(open) => { setIsDialogOpen(open); if (!open) setEditingBlog(null); }}>
                <DialogTrigger asChild>
                  <Button className="bg-gold hover:bg-gold/90 text-primary-foreground rounded-full px-6">
                    <Plus className="w-4 h-4 mr-2" /> New Blog Post
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>{editingBlog ? "Edit Blog" : "Create New Blog"}</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleSaveEdit} className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Title</Label>
                      <Input id="title" name="title" defaultValue={editingBlog?.title} required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="author_name">Author Name</Label>
                      <Input id="author_name" name="author_name" defaultValue={editingBlog?.author_name} required />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="image_file">Upload Image</Label>
                        <Input id="image_file" type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files?.[0] || null)} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="image_url">Or Image URL</Label>
                        <Input id="image_url" name="image_url" defaultValue={editingBlog?.image_url} />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs font-bold uppercase tracking-widest text-gold">Content</Label>
                      <RichTextEditor 
                        content={content} 
                        onChange={setContent} 
                        placeholder="Write or edit the story content here..."
                      />
                    </div>
                    <DialogFooter>
                      <Button type="submit" className="bg-gold text-primary-foreground">{editingBlog ? "Update" : "Post"}</Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="w-10 h-10 text-gold animate-spin mb-4" />
              <p className="text-muted-foreground">Loading dashboard data...</p>
            </div>
          ) : (
            <Tabs defaultValue="blogs" className="w-full">
              <TabsList className="mb-8 flex-wrap h-auto p-1 gap-1">
                <TabsTrigger value="blogs">Blogs</TabsTrigger>
                <TabsTrigger value="contacts" className="relative">
                  Contact Messages
                  {contacts.length > 0 && (
                    <span className="ml-2 px-1.5 py-0.5 rounded-full bg-charcoal/10 text-[10px]">
                      {contacts.length}
                    </span>
                  )}
                </TabsTrigger>
                <TabsTrigger value="registrations" className="relative">
                  Registrations
                  {registrations.length > 0 && (
                    <span className="ml-2 px-1.5 py-0.5 rounded-full bg-charcoal/10 text-[10px]">
                      {registrations.length}
                    </span>
                  )}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="blogs">
                <Tabs defaultValue="pending" className="w-full">
                  <TabsList className="mb-6 bg-transparent border-b rounded-none w-full justify-start h-auto p-0 gap-8">
                    <TabsTrigger value="pending" className="rounded-none border-b-2 border-transparent data-[state=active]:border-gold data-[state=active]:bg-transparent pb-2 px-0">
                      Pending Review ({pendingBlogs.length})
                    </TabsTrigger>
                    <TabsTrigger value="approved" className="rounded-none border-b-2 border-transparent data-[state=active]:border-gold data-[state=active]:bg-transparent pb-2 px-0">
                      Published ({approvedBlogs.length})
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="pending">
                    <AnimatePresence mode="popLayout">
                      {pendingBlogs.length === 0 ? (
                        <NoData icon={<CheckCircle />} message="No pending blogs to review." />
                      ) : (
                        pendingBlogs.map(blog => (
                          <DataCard 
                            key={blog.id} 
                            title={blog.title} 
                            subtitle={`By ${blog.author_name} • ${new Date(blog.created_at).toLocaleDateString()}`}
                            imageUrl={blog.image_url}
                          >
                            <div className="space-y-4">
                              <p className="text-sm text-muted-foreground line-clamp-2">
                                {blog.content.replace(/<[^>]*>/g, '')}
                              </p>
                              <div className="flex gap-2">
                                <Button size="sm" variant="outline" className="text-green-600" onClick={() => handleApprove(blog.id)}>
                                  <CheckCircle className="w-4 h-4 mr-1" /> Approve
                                </Button>
                                <Button size="icon" variant="ghost" onClick={() => { setEditingBlog(blog); setIsDialogOpen(true); }}>
                                  <Edit className="w-4 h-4" />
                                </Button>
                                <Button size="icon" variant="ghost" className="text-red-500" onClick={() => handleDeleteBlog(blog.id)}>
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                          </DataCard>
                        ))
                      )}
                    </AnimatePresence>
                  </TabsContent>

                  <TabsContent value="approved">
                    <AnimatePresence mode="popLayout">
                      {approvedBlogs.length === 0 ? (
                        <NoData icon={<Plus />} message="No published blogs yet." />
                      ) : (
                        approvedBlogs.map(blog => (
                          <DataCard 
                            key={blog.id} 
                            title={blog.title} 
                            subtitle={`By ${blog.author_name} • ${new Date(blog.created_at).toLocaleDateString()}`}
                            imageUrl={blog.image_url}
                          >
                            <div className="space-y-4">
                              <p className="text-sm text-muted-foreground line-clamp-2">
                                {blog.content.replace(/<[^>]*>/g, '')}
                              </p>
                              <div className="flex gap-2">
                                <Button size="icon" variant="ghost" onClick={() => { setEditingBlog(blog); setIsDialogOpen(true); }}>
                                  <Edit className="w-4 h-4" />
                                </Button>
                                <Button size="icon" variant="ghost" className="text-red-500" onClick={() => handleDeleteBlog(blog.id)}>
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                          </DataCard>
                        ))
                      )}
                    </AnimatePresence>
                  </TabsContent>
                </Tabs>
              </TabsContent>

              <TabsContent value="contacts">
                <AnimatePresence mode="popLayout">
                  {contacts.length === 0 ? (
                    <NoData icon={<Mail />} message="No contact messages yet." />
                  ) : (
                    contacts.map(contact => (
                      <DataCard key={contact.id} title={contact.subject || "No Subject"} subtitle={`${contact.name} (${contact.email})`}>
                        <div className="space-y-4 w-full">
                          <p className="text-sm text-charcoal/80 bg-ivory p-4 rounded-lg italic border border-border/50">
                            "{contact.message}"
                          </p>
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-muted-foreground">{new Date(contact.created_at).toLocaleString()}</span>
                            <Button size="icon" variant="ghost" className="text-red-500" onClick={() => handleDeleteContact(contact.id)}>
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </DataCard>
                    ))
                  )}
                </AnimatePresence>
              </TabsContent>

              <TabsContent value="registrations">
                <AnimatePresence mode="popLayout">
                  {registrations.length === 0 ? (
                    <NoData icon={<UserPlus />} message="No course registrations yet." />
                  ) : (
                    registrations.map(reg => (
                      <DataCard 
                        key={reg.id} 
                        title={reg.name} 
                        subtitle={`${reg.email} • ${reg.phone}`}
                      >
                        <div className="w-full space-y-4">
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <InfoBadge icon={<Globe size={12}/>} label="Language" value={reg.language} />
                            <InfoBadge icon={<Calendar size={12}/>} label="Level" value={reg.level} />
                            {reg.batch && <InfoBadge icon={<Loader2 size={12}/>} label="Batch" value={reg.batch} />}
                            {reg.country && <InfoBadge icon={<Globe size={12}/>} label="Country" value={reg.country} />}
                          </div>
                          
                          {(reg.comments || reg.hear_about) && (
                            <div className="text-sm space-y-2 pt-2 border-t border-border/50">
                              {reg.hear_about && <p><strong>Source:</strong> {reg.hear_about}</p>}
                              {reg.comments && <p><strong>Note:</strong> {reg.comments}</p>}
                            </div>
                          )}

                          <div className="flex justify-between items-center pt-2">
                            <span className="text-xs text-muted-foreground">{new Date(reg.created_at).toLocaleString()}</span>
                            <Button size="icon" variant="ghost" className="text-red-500" onClick={() => handleDeleteRegistration(reg.id)}>
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </DataCard>
                    ))
                  )}
                </AnimatePresence>
              </TabsContent>
            </Tabs>
          )}
        </div>
      </main>
      <Footer />
    </PageTransition>
  );
};

const DataCard = ({ title, subtitle, imageUrl, children }: { title: string; subtitle: string; imageUrl?: string; children: React.ReactNode }) => (
  <motion.div 
    layout
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, scale: 0.95 }}
    className="bg-white p-6 rounded-2xl border border-border shadow-sm mb-4"
  >
    <div className="flex gap-6 items-start">
      {imageUrl && (
        <div className="w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-muted border border-border">
          <img src={imageUrl} alt="" className="w-full h-full object-cover" />
        </div>
      )}
      <div className="flex flex-col gap-4 flex-1">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <h3 className="font-display font-semibold text-lg text-charcoal">{title}</h3>
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          </div>
        </div>
        {children}
      </div>
    </div>
  </motion.div>
);

const NoData = ({ icon, message }: { icon: React.ReactNode; message: string }) => (
  <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-border">
    <div className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-20">
      {icon}
    </div>
    <p className="text-muted-foreground">{message}</p>
  </div>
);

const InfoBadge = ({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) => (
  <div className="bg-ivory p-2 rounded-lg border border-border/50">
    <div className="flex items-center gap-1.5 text-gold mb-0.5">
      {icon}
      <span className="text-[10px] font-bold uppercase tracking-wider">{label}</span>
    </div>
    <p className="text-xs font-semibold text-charcoal truncate">{value}</p>
  </div>
);

export default AdminPanel;
