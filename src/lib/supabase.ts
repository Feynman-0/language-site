import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://pfzhdyirsrdcpvtqzkza.supabase.co';
const supabaseAnonKey = 'sb_publishable_NRIZqyzasVB0DYWxTnhr_Q_prST2Cph';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
