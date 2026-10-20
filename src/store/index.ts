import { create } from 'zustand';
import type {
  User,
  UserRole,
  Product,
  CartItem,
  ConservationPledge,
  Campaign,
  EnquirySubmission,
  NotificationItem,
  ProjectOrder,
  FarmerSaleRecord,
} from '@/types';
import {
  MOCK_USERS,
  MOCK_PRODUCTS,
  MOCK_CONSERVATION_BASE,
  MOCK_PLEDGES,
  MOCK_CAMPAIGNS,
  MOCK_NOTIFICATIONS,
  MOCK_CUSTOMER_PROJECTS,
  MOCK_FARMER_SALES,
  MOCK_ALL_USERS,
} from '@/data/mockData';

interface AppStore {
  // Theme
  theme: 'dark' | 'light';
  toggleTheme: () => void;

  // User & Role
  currentUser: User;
  setUserRole: (role: UserRole) => void;
  setUser: (user: User) => void;
  allUsers: User[];
  toggleUserVerification: (userId: string) => void;

  // Cart
  cart: CartItem[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  addToCart: (product: Product, quantity?: number) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;

  // Wishlist
  wishlist: string[];
  toggleWishlist: (productId: string) => void;

  // Conservation Metrics & Pledges
  conservationMetrics: {
    treesPlanted: number;
    feedersInstalled: number;
    waterPotsInstalled: number;
    hectaresCovered: number;
    participatingCities: number;
    carbonOffsetTons: number;
  };
  pledges: ConservationPledge[];
  addPledge: (pledge: { type: 'tree' | 'feeder' | 'water_pot'; count: number; contributorName: string; city: string; note?: string }) => void;

  // Farmer & Eco Products
  allProducts: Product[];
  addFarmerProduct: (product: Omit<Product, 'id'>) => void;
  updateFarmerProduct: (id: string, updates: Partial<Product>) => void;
  updateProductStock: (id: string, newStock: number) => void;
  deleteFarmerProduct: (id: string) => void;

  // Campaigns
  campaigns: Campaign[];
  toggleJoinCampaign: (campaignId: string) => void;

  // Enquiries & Quotes
  enquiries: EnquirySubmission[];
  addEnquiry: (enquiry: Omit<EnquirySubmission, 'id' | 'submittedAt'>) => void;

  // Notifications
  notifications: NotificationItem[];
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;

  // Projects & Orders
  projects: ProjectOrder[];
  addCustomerProject: (project: Omit<ProjectOrder, 'id'>) => void;
  updateProjectProgress: (id: string, progress: number, status: ProjectOrder['status']) => void;
  farmerSales: FarmerSaleRecord[];
  updateFarmerSaleStatus: (id: string, status: FarmerSaleRecord['status']) => void;
  approveFarmerPayoutBatch: () => { count: number; totalAmount: number };
}

// LocalStorage helpers
const loadLocal = <T>(key: string, fallback: T): T => {
  try {
    const item = localStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : fallback;
  } catch {
    return fallback;
  }
};

const saveLocal = <T>(key: string, value: T) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // ignore
  }
};

export const useStore = create<AppStore>((set) => ({
  // Theme
  theme: 'dark',
  toggleTheme: () =>
    set((state) => {
      const nextTheme = state.theme === 'dark' ? 'light' : 'dark';
      if (typeof document !== 'undefined') {
        if (nextTheme === 'light') {
          document.documentElement.classList.add('light-theme');
          document.documentElement.classList.remove('dark');
        } else {
          document.documentElement.classList.remove('light-theme');
          document.documentElement.classList.add('dark');
        }
      }
      return { theme: nextTheme };
    }),

  // User & Role
  currentUser: loadLocal<User>('harit_current_user', MOCK_USERS.customer),
  setUserRole: (role: UserRole) => {
    const newUser = MOCK_USERS[role] || MOCK_USERS.customer;
    saveLocal('harit_current_user', newUser);
    set({ currentUser: newUser });
  },
  setUser: (user: User) => {
    saveLocal('harit_current_user', user);
    set({ currentUser: user });
  },
  allUsers: loadLocal<User[]>('harit_all_users', MOCK_ALL_USERS),
  toggleUserVerification: (userId: string) =>
    set((state) => {
      const updated = state.allUsers.map((u) =>
        u.id === userId ? { ...u, verified: !u.verified } : u
      );
      saveLocal('harit_all_users', updated);
      return { allUsers: updated };
    }),

  // Cart
  cart: loadLocal<CartItem[]>('harit_cart', [
    { product: MOCK_PRODUCTS[0], quantity: 2 },
    { product: MOCK_PRODUCTS[6], quantity: 1 },
  ]),
  isCartOpen: false,
  setIsCartOpen: (open: boolean) => set({ isCartOpen: open }),
  addToCart: (product: Product, quantity = 1) =>
    set((state) => {
      const existing = state.cart.find((item) => item.product.id === product.id);
      let updated: CartItem[];
      if (existing) {
        updated = state.cart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        updated = [...state.cart, { product, quantity }];
      }
      saveLocal('harit_cart', updated);
      return { cart: updated, isCartOpen: true };
    }),
  updateQuantity: (productId: string, quantity: number) =>
    set((state) => {
      const updated =
        quantity <= 0
          ? state.cart.filter((item) => item.product.id !== productId)
          : state.cart.map((item) =>
              item.product.id === productId ? { ...item, quantity } : item
            );
      saveLocal('harit_cart', updated);
      return { cart: updated };
    }),
  removeFromCart: (productId: string) =>
    set((state) => {
      const updated = state.cart.filter((item) => item.product.id !== productId);
      saveLocal('harit_cart', updated);
      return { cart: updated };
    }),
  clearCart: () => {
    saveLocal('harit_cart', []);
    set({ cart: [] });
  },

  // Wishlist
  wishlist: loadLocal<string[]>('harit_wishlist', ['prod-f-01', 'prod-s-02']),
  toggleWishlist: (productId: string) =>
    set((state) => {
      const exists = state.wishlist.includes(productId);
      const updated = exists
        ? state.wishlist.filter((id) => id !== productId)
        : [...state.wishlist, productId];
      saveLocal('harit_wishlist', updated);
      return { wishlist: updated };
    }),

  // Conservation Metrics & Pledges
  conservationMetrics: loadLocal('harit_conservation_metrics', MOCK_CONSERVATION_BASE),
  pledges: loadLocal<ConservationPledge[]>('harit_pledges', MOCK_PLEDGES),
  addPledge: (pledge) =>
    set((state) => {
      const newPledge: ConservationPledge = {
        id: `plg_${Date.now()}`,
        date: 'Just now',
        ...pledge,
      };
      const updatedMetrics = { ...state.conservationMetrics };
      if (pledge.type === 'tree') {
        updatedMetrics.treesPlanted += pledge.count;
        updatedMetrics.carbonOffsetTons += Math.round(pledge.count * 0.02);
      } else if (pledge.type === 'feeder') {
        updatedMetrics.feedersInstalled += pledge.count;
      } else if (pledge.type === 'water_pot') {
        updatedMetrics.waterPotsInstalled += pledge.count;
      }
      const updatedPledges = [newPledge, ...state.pledges];
      saveLocal('harit_conservation_metrics', updatedMetrics);
      saveLocal('harit_pledges', updatedPledges);
      return {
        conservationMetrics: updatedMetrics,
        pledges: updatedPledges,
      };
    }),

  // Products
  allProducts: loadLocal<Product[]>('harit_all_products', MOCK_PRODUCTS),
  addFarmerProduct: (productData) =>
    set((state) => {
      const newProduct: Product = {
        ...productData,
        id: `prod-f-${Date.now()}`,
      };
      const updated = [newProduct, ...state.allProducts];
      saveLocal('harit_all_products', updated);
      return { allProducts: updated };
    }),
  updateFarmerProduct: (id, updates) =>
    set((state) => {
      const updated = state.allProducts.map((p) =>
        p.id === id ? { ...p, ...updates } : p
      );
      saveLocal('harit_all_products', updated);
      return { allProducts: updated };
    }),
  updateProductStock: (id, newStock) =>
    set((state) => {
      const updated = state.allProducts.map((p) =>
        p.id === id ? { ...p, stockQuantity: Math.max(0, newStock), inStock: newStock > 0 } : p
      );
      saveLocal('harit_all_products', updated);
      return { allProducts: updated };
    }),
  deleteFarmerProduct: (id) =>
    set((state) => {
      const updated = state.allProducts.filter((p) => p.id !== id);
      saveLocal('harit_all_products', updated);
      return { allProducts: updated };
    }),

  // Campaigns
  campaigns: loadLocal<Campaign[]>('harit_campaigns', MOCK_CAMPAIGNS),
  toggleJoinCampaign: (campaignId) =>
    set((state) => {
      const updated = state.campaigns.map((camp) => {
        if (camp.id === campaignId) {
          const nextJoined = !camp.joined;
          return {
            ...camp,
            joined: nextJoined,
            currentCount: nextJoined ? camp.currentCount + 1 : camp.currentCount - 1,
          };
        }
        return camp;
      });
      saveLocal('harit_campaigns', updated);
      return { campaigns: updated };
    }),

  // Enquiries
  enquiries: loadLocal<EnquirySubmission[]>('harit_enquiries', []),
  addEnquiry: (enquiryData) =>
    set((state) => {
      const newEnquiry: EnquirySubmission = {
        ...enquiryData,
        id: `enq_${Date.now()}`,
        submittedAt: new Date().toLocaleDateString('en-IN', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        }),
      };
      const updated = [newEnquiry, ...state.enquiries];
      saveLocal('harit_enquiries', updated);
      return { enquiries: updated };
    }),

  // Notifications
  notifications: loadLocal<NotificationItem[]>('harit_notifications', MOCK_NOTIFICATIONS),
  markNotificationRead: (id) =>
    set((state) => {
      const updated = state.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      );
      saveLocal('harit_notifications', updated);
      return { notifications: updated };
    }),
  markAllNotificationsRead: () =>
    set((state) => {
      const updated = state.notifications.map((n) => ({ ...n, read: true }));
      saveLocal('harit_notifications', updated);
      return { notifications: updated };
    }),

  // Projects & Farmer Sales
  projects: loadLocal<ProjectOrder[]>('harit_projects', MOCK_CUSTOMER_PROJECTS),
  addCustomerProject: (projectData) =>
    set((state) => {
      const newProj: ProjectOrder = {
        ...projectData,
        id: `proj-cust-${Date.now()}`,
      };
      const updated = [newProj, ...state.projects];
      saveLocal('harit_projects', updated);
      return { projects: updated };
    }),
  updateProjectProgress: (id, progress, status) =>
    set((state) => {
      const updated = state.projects.map((proj) =>
        proj.id === id ? { ...proj, progressPercentage: progress, status } : proj
      );
      saveLocal('harit_projects', updated);
      return { projects: updated };
    }),
  farmerSales: loadLocal<FarmerSaleRecord[]>('harit_farmer_sales', MOCK_FARMER_SALES),
  updateFarmerSaleStatus: (id, status) =>
    set((state) => {
      const updated = state.farmerSales.map((sale) =>
        sale.id === id ? { ...sale, status } : sale
      );
      saveLocal('harit_farmer_sales', updated);
      return { farmerSales: updated };
    }),
  approveFarmerPayoutBatch: () => {
    let count = 0;
    let totalAmount = 0;
    set((state) => {
      const updated = state.farmerSales.map((sale) => {
        if (sale.payoutStatus !== 'Credited') {
          count += 1;
          totalAmount += sale.totalAmount;
          return {
            ...sale,
            payoutStatus: 'Credited' as const,
            utrNumber: sale.utrNumber || `UTR-AUDIT-${Math.floor(100000 + Math.random() * 900000)}`,
          };
        }
        return sale;
      });
      saveLocal('harit_farmer_sales', updated);
      return { farmerSales: updated };
    });
    return { count, totalAmount };
  },
}));
