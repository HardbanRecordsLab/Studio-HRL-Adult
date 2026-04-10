import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// Client for public operations (RLS protected)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Client for admin operations (bypasses RLS)
export const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

// Helper function to create admin client with JWT token
export const createAdminClient = (token: string) => {
  return createClient(supabaseUrl, serviceRoleKey, {
    global: {
      headers: {
        Authorization: `Bearer ${token}`
      }
    },
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });
};

// Types for database tables
export interface CastingApplication {
  id: string;
  createdAt: string;
  updatedAt: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  birthDate: string;
  height?: number;
  weight?: number;
  hairColor?: string;
  eyeColor?: string;
  breastSize?: string;
  experience: string;
  experienceDesc?: string;
  platforms?: string;
  contentTypes?: string;
  limits?: string;
  sessionsPerWeek?: string;
  workingTimes?: string;
  motivation: string;
  bodyModifications?: string;
  skills?: string;
  consentAge: boolean;
  consentTerms: boolean;
  consentData: boolean;
  consentMarketing: boolean;
  photo1?: string;
  photo2?: string;
  photo3?: string;
  video?: string;
  status: string;
}

export interface Partner {
  id: string;
  createdAt: string;
  updatedAt: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  nationality: string;
  city: string;
  country: string;
  height: number;
  weight: number;
  measurements?: string;
  hairColor: string;
  eyeColor: string;
  tattoos: boolean;
  piercings: boolean;
  experience: string;
  categories?: string;
  availability?: string;
  equipment?: string;
  languages?: string;
  platforms?: string;
  earnings?: string;
  status: string;
  isVerified: boolean;
}

export interface FinancialRecord {
  id: string;
  createdAt: string;
  updatedAt: string;
  partnerId: string;
  platform: string;
  revenueType: string;
  amount: number;
  currency: string;
  period: string;
  platformFee: number;
  studioFee: number;
  partnerEarnings: number;
  status: string;
}

export interface PartnerDocument {
  id: string;
  createdAt: string;
  updatedAt: string;
  partnerId: string;
  documentType: string;
  fileName: string;
  fileUrl: string;
  fileSize: number;
  mimeType: string;
  isBlurred: boolean;
  isVerified: boolean;
  verificationDate?: string;
  verifiedBy?: string;
  notes?: string;
}

export interface AcademyVideo {
  id: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  description: string;
  videoUrl: string;
  thumbnail: string;
  duration: number;
  category: string;
  tags?: string;
  isPublished: boolean;
  level?: string;
  views: number;
}

export interface AcademyPodcast {
  id: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  description: string;
  audioUrl: string;
  duration: number;
  category: string;
  tags?: string;
  isPublished: boolean;
  episodeNumber?: number;
  plays: number;
}

export interface AcademyDocument {
  id: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  description: string;
  fileUrl: string;
  fileType: string;
  fileSize: number;
  category: string;
  tags?: string;
  isPublished: boolean;
  downloads: number;
}

export interface AcademyBlogArticle {
  id: string;
  createdAt: string;
  updatedAt: string;
  slug: string;
  title: string;
  category: string;
  tag: string;
  excerpt: string;
  content: string;
  readTime: string;
  isPublished: boolean;
  date: string;
  author: string;
  tags?: string;
  views: number;
}

export interface AdminLog {
  id: string;
  createdAt: string;
  adminEmail: string;
  action: string;
  resource: string;
  resourceId?: string;
  details?: string;
  ip?: string;
  userAgent?: string;
}

export interface StudioSettings {
  id: string;
  createdAt: string;
  updatedAt: string;
  studioName: string;
  contactEmail: string;
  notificationEmail: string;
  partnerModelShare: number;
  externalPartnerShare: number;
  studioShare: number;
  castingEmailTemplate?: string;
  castingRejectTemplate?: string;
  maintenanceMode: boolean;
  allowNewApplications: boolean;
  defaultCurrency: string;
}

// Database helper functions
export const db = {
  // Casting Applications
  async getCastingApplications() {
    const { data, error } = await supabaseAdmin
      .from('CastingApplication')
      .select('*')
      .order('createdAt', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  async createCastingApplication(application: Partial<CastingApplication>) {
    const { data, error } = await supabaseAdmin
      .from('CastingApplication')
      .insert(application)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async updateCastingApplication(id: string, updates: Partial<CastingApplication>) {
    const { data, error } = await supabaseAdmin
      .from('CastingApplication')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Partners
  async getPartners() {
    const { data, error } = await supabaseAdmin
      .from('Partner')
      .select('*')
      .order('createdAt', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  async createPartner(partner: Partial<Partner>) {
    const { data, error } = await supabaseAdmin
      .from('Partner')
      .insert(partner)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async updatePartner(id: string, updates: Partial<Partner>) {
    const { data, error } = await supabaseAdmin
      .from('Partner')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Financial Records
  async getFinancialRecords() {
    const { data, error } = await supabaseAdmin
      .from('FinancialRecord')
      .select('*')
      .order('createdAt', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  async createFinancialRecord(record: Partial<FinancialRecord>) {
    const { data, error } = await supabaseAdmin
      .from('FinancialRecord')
      .insert(record)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Partner Documents
  async getPartnerDocuments(partnerId?: string) {
    let query = supabaseAdmin.from('PartnerDocument').select('*');
    
    if (partnerId) {
      query = query.eq('partnerId', partnerId);
    }
    
    const { data, error } = await query.order('createdAt', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  async createPartnerDocument(document: Partial<PartnerDocument>) {
    const { data, error } = await supabaseAdmin
      .from('PartnerDocument')
      .insert(document)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Academy Content
  async getAcademyVideos() {
    const { data, error } = await supabase
      .from('AcademyVideo')
      .select('*')
      .eq('isPublished', true)
      .order('createdAt', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  async getAcademyPodcasts() {
    const { data, error } = await supabase
      .from('AcademyPodcast')
      .select('*')
      .eq('isPublished', true)
      .order('createdAt', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  async getAcademyDocuments() {
    const { data, error } = await supabase
      .from('AcademyDocument')
      .select('*')
      .eq('isPublished', true)
      .order('createdAt', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  async getAcademyBlogArticles() {
    const { data, error } = await supabase
      .from('AcademyBlogArticle')
      .select('*')
      .eq('isPublished', true)
      .order('createdAt', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  // Admin Logs
  async logAdminAction(log: Partial<AdminLog>) {
    const { data, error } = await supabaseAdmin
      .from('AdminLog')
      .insert(log)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async getAdminLogs() {
    const { data, error } = await supabaseAdmin
      .from('AdminLog')
      .select('*')
      .order('createdAt', { ascending: false })
      .limit(1000);
    
    if (error) throw error;
    return data;
  },

  // Studio Settings
  async getStudioSettings() {
    const { data, error } = await supabase
      .from('StudioSettings')
      .select('*')
      .eq('id', 'singleton')
      .single();
    
    if (error && error.code !== 'PGRST116') throw error;
    return data;
  },

  async updateStudioSettings(updates: Partial<StudioSettings>) {
    const { data, error } = await supabaseAdmin
      .from('StudioSettings')
      .update(updates)
      .eq('id', 'singleton')
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }
};
