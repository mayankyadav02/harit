// HARIT — India's Green Mission Type Definitions

export type UserRole = 'customer' | 'farmer' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
  city?: string;
  state?: string;
  avatar?: string;
  farmName?: string;
  organization?: string;
  verified?: boolean;
  joinedDate?: string;
}

export type ProductCategory = 
  | 'seeds' 
  | 'grains' 
  | 'saplings' 
  | 'fertilizers' 
  | 'honey-herbs' 
  | 'bird-care' 
  | 'water-pots' 
  | 'gardening-tools'
  | 'pots-planters';

export interface Product {
  id: string;
  name: string;
  tagline: string;
  category: ProductCategory;
  price: number; // in INR (₹)
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  inStock: boolean;
  stockQuantity: number;
  unit: string; // e.g. "500g", "1 kg", "Pack of 5", "Single Unit"
  seller: {
    id: string;
    name: string;
    location: string;
    state: string;
    organicCertified: boolean;
    rating: number;
    badge?: string;
  };
  image: string;
  description: string;
  ecoBenefits: string[];
  harvestDate?: string;
  sourceType: 'farmer' | 'store';
  isFeatured?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface GreenRoofService {
  id: string;
  title: string;
  slug: string;
  tagline: string;
  description: string;
  idealFor: string;
  coolingEffect: string;
  weightLoad: string;
  waterRetention: string;
  pricePerSqFt: number; // in INR
  maintenanceLevel: 'Minimal' | 'Moderate' | 'Seasonal' | 'Comprehensive';
  benefits: string[];
  features: string[];
  suitablePlants: string[];
  image: string;
}

export interface ConservationPledge {
  id: string;
  type: 'tree' | 'feeder' | 'water_pot';
  count: number;
  contributorName: string;
  city: string;
  date: string;
  note?: string;
}

export interface Campaign {
  id: string;
  title: string;
  category: string;
  description: string;
  targetCount: number;
  currentCount: number;
  unit: string;
  location: string;
  state: string;
  startDate: string;
  endDate: string;
  organizer: string;
  joined: boolean;
  image: string;
  highlights: string[];
}

export interface EducationArticle {
  id: string;
  title: string;
  slug: string;
  category: 'rooftop' | 'birds' | 'seasonal' | 'compost' | 'trees';
  categoryLabel: string;
  readTime: string;
  author: string;
  authorTitle: string;
  date: string;
  summary: string;
  coverImage: string;
  sections: {
    heading: string;
    text: string;
    bullets?: string[];
  }[];
  proTips: string[];
  tags: string[];
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'order' | 'project' | 'campaign' | 'payout' | 'system';
  targetRole: UserRole | 'all';
}

export interface ProjectOrder {
  id: string;
  title: string;
  clientName: string;
  clientEmail: string;
  city: string;
  roofAreaSqFt: number;
  serviceType: string;
  status: 'Survey Scheduled' | 'Engineering Audit' | 'Installation in Progress' | 'Inspection & Handover' | 'Active & Blooming';
  progressPercentage: number;
  healthScore: number;
  totalCost: number;
  paidAmount: number;
  startDate: string;
  estimatedCompletion: string;
  recentMilestone: string;
  nextStep: string;
  soilMoisturePct?: number;
  tempReductionC?: number;
  irrigationStatus?: string;
  sensorBatteryPct?: number;
}

export interface FarmerSaleRecord {
  id: string;
  orderNumber: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  totalAmount: number;
  customerName: string;
  customerCity: string;
  date: string;
  status: 'Harvest Pending' | 'Packed' | 'Dispatched' | 'Delivered';
  payoutStatus: 'Escrow' | 'Processing' | 'Credited';
  utrNumber?: string;
  courierPartner?: string;
  trackingNumber?: string;
}

export interface EnquirySubmission {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  city: string;
  serviceInterest: string;
  roofArea?: string;
  buildingType?: string;
  message: string;
  submittedAt: string;
}
