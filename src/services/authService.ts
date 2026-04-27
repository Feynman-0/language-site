import { supabase } from '@/lib/supabase';

const SESSION_KEY = 'language_site_admin_session';

class AuthService {
  async login(password: string): Promise<boolean> {
    try {
      const { data, error } = await supabase
        .from('admin_config')
        .select('value')
        .eq('key', 'admin_password')
        .single();
      
      if (error) throw error;

      if (data && password === data.value) {
        localStorage.setItem(SESSION_KEY, 'true');
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  }

  logout() {
    localStorage.removeItem(SESSION_KEY);
  }

  isAuthenticated(): boolean {
    return localStorage.getItem(SESSION_KEY) === 'true';
  }

  async changePassword(oldPassword: string, newPassword: string): Promise<boolean> {
    try {
      // First verify the old password
      const isVerified = await this.login(oldPassword);
      if (!isVerified) return false;

      // Update with the new password
      const { error } = await supabase
        .from('admin_config')
        .update({ value: newPassword })
        .eq('key', 'admin_password');
      
      return !error;
    } catch (error) {
      console.error('Change password error:', error);
      return false;
    }
  }
}

export const authService = new AuthService();
