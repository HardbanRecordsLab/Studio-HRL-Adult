// User & Auth Types
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'partner' | 'model';
  avatar?: string;
  createdAt: string;
  lastLogin?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (userData: RegisterData) => Promise<void>;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  role: 'partner' | 'model';
}

// Partner Types
export interface Partner {
  id: string;
  name: string;
  email: string;
  phone: string;
  age: number;
  experience: string;
  categories: string[];
  avatar: string;
  status: 'active' | 'pending' | 'inactive';
  earnings: {
    total: number;
    monthly: number;
    weekly: number;
  };
  platforms: PlatformConnection[];
  rating: number;
  joinDate: string;
  lastActive: string;
  documents: Document[];
}

export interface PlatformConnection {
  platformId: string;
  platformName: string;
  connected: boolean;
  username?: string;
  earnings?: number;
  followers?: number;
}

// Platform Types
export interface Platform {
  id: string;
  name: string;
  type: 'live-cam' | 'fansite' | 'video';
  icon: string;
  description: string;
  features: string[];
  paymentMethods: string[];
  payoutSchedule: string;
  minPayout: number;
  revenueShare: number;
  traffic: string;
  status: 'connected' | 'disconnected';
  earnings?: number;
}

// Content Types
export interface Content {
  id: string;
  title: string;
  type: 'video' | 'podcast' | 'guide';
  description: string;
  duration?: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  thumbnail?: string;
  fileUrl?: string;
  createdAt: string;
  views?: number;
  downloads?: number;
}

export interface VideoContent extends Content {
  type: 'video';
  resolution: string;
  fileSize: number;
}

export interface PodcastContent extends Content {
  type: 'podcast';
  audioUrl: string;
  fileSize: number;
}

export interface GuideContent extends Content {
  type: 'guide';
  fileFormat: 'pdf' | 'docx';
  fileSize: number;
}

// Form Types
export interface CastingFormData {
  // Personal Info
  name: string;
  email: string;
  phone: string;
  age: number;
  location: string;
  
  // Experience
  experience: string;
  categories: string[];
  availability: string[];
  
  // Appearance
  height: string;
  weight: string;
  measurements: string;
  hairColor: string;
  eyeColor: string;
  tattoos: boolean;
  piercings: boolean;
  
  // Equipment
  equipment: string[];
  internetSpeed: string;
  workspace: string;
  
  // Preferences
  boundaries: string[];
  limits: string[];
  specialSkills: string[];
  
  // Media
  photos: File[];
  video: File;
  
  // Consents
  consentAge: boolean;
  consentTerms: boolean;
  consentData: boolean;
  consentMarketing: boolean;
}

// Admin Types
export interface DashboardStats {
  totalPartners: number;
  activePartners: number;
  totalEarnings: number;
  monthlyEarnings: number;
  platformConnections: number;
  pendingApplications: number;
}

export interface FinancialReport {
  period: string;
  totalRevenue: number;
  partnerShare: number;
  modelShare: number;
  studioShare: number;
  expenses: number;
  profit: number;
}

export interface Document {
  id: string;
  name: string;
  type: string;
  size: number;
  uploadDate: string;
  url: string;
}

// UI Types
export interface LoadingState {
  [key: string]: boolean;
}

export interface NotificationState {
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Store Types
export interface AppState {
  auth: AuthState;
  partners: PartnersState;
  platforms: PlatformsState;
  content: ContentState;
  ui: UIState;
}

export interface PartnersState {
  partners: Partner[];
  loading: boolean;
  error: string | null;
  selectedPartner: Partner | null;
  fetchPartners: () => Promise<void>;
  addPartner: (partner: Omit<Partner, 'id'>) => Promise<void>;
  updatePartner: (id: string, updates: Partial<Partner>) => Promise<void>;
  deletePartner: (id: string) => Promise<void>;
}

export interface PlatformsState {
  platforms: Platform[];
  loading: boolean;
  error: string | null;
  fetchPlatforms: () => Promise<void>;
  connectPlatform: (platformId: string, credentials: any) => Promise<void>;
  disconnectPlatform: (platformId: string) => Promise<void>;
}

export interface ContentState {
  content: Content[];
  loading: boolean;
  error: string | null;
  uploadContent: (content: Omit<Content, 'id' | 'createdAt'>) => Promise<void>;
  deleteContent: (id: string) => Promise<void>;
}

export interface UIState {
  sidebarOpen: boolean;
  theme: 'dark' | 'light';
  notifications: NotificationState[];
  setSidebarOpen: (open: boolean) => void;
  addNotification: (notification: NotificationState) => void;
  removeNotification: (index: number) => void;
}
