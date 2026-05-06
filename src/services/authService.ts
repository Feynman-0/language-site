import { supabase } from '@/lib/supabase';

const SESSION_KEY = 'language_site_admin_session';
const PASSWORD_KEY = 'language_site_admin_password';
const DEFAULT_PASSWORD = 'admin123';

class AuthService {
  private getStoredPassword(): string {
    return localStorage.getItem(PASSWORD_KEY) || DEFAULT_PASSWORD;
  }

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
      // Fallback: Check against localStorage or default
      if (password === this.getStoredPassword()) {
        localStorage.setItem(SESSION_KEY, 'true');
        return true;
      }
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

      // Try updating Supabase
      const { error } = await supabase
        .from('admin_config')
        .update({ value: newPassword })
        .eq('key', 'admin_password');
      
      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Change password error:', error);
      // Fallback: Update localStorage
      localStorage.setItem(PASSWORD_KEY, newPassword);
      return true;
    }
  }
}

export const authService = new AuthService();
