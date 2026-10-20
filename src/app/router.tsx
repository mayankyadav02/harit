import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Home } from '@/pages/home/Home';
import { About } from '@/pages/about/About';
import { GreenRoofs } from '@/pages/green-roofs/GreenRoofs';
import { FarmerMarket } from '@/pages/farmer-market/FarmerMarket';
import { EcoStore } from '@/pages/eco-store/EcoStore';
import { Conservation } from '@/pages/conservation/Conservation';
import { Education } from '@/pages/education/Education';
import { Campaigns } from '@/pages/campaigns/Campaigns';
import { Contact } from '@/pages/contact/Contact';
import { Auth } from '@/pages/auth/Auth';
import { Dashboards } from '@/pages/dashboards/Dashboards';
import { CustomerDashboard } from '@/pages/dashboards/CustomerDashboard';
import { FarmerDashboard } from '@/pages/dashboards/FarmerDashboard';
import { AdminDashboard } from '@/pages/dashboards/AdminDashboard';

const router = createBrowserRouter([
  // Public Pages with Layout (Navbar + Footer + Cart Drawer)
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'about',
        element: <About />,
      },
      {
        path: 'green-roofs',
        element: <GreenRoofs />,
      },
      {
        path: 'farmer-market',
        element: <FarmerMarket />,
      },
      {
        path: 'eco-store',
        element: <EcoStore />,
      },
      {
        path: 'conservation',
        element: <Conservation />,
      },
      {
        path: 'education',
        element: <Education />,
      },
      {
        path: 'campaigns',
        element: <Campaigns />,
      },
      {
        path: 'contact',
        element: <Contact />,
      },
      {
        path: 'login',
        element: <Auth />,
      },
      {
        path: 'register',
        element: <Auth />,
      },
      {
        path: 'auth',
        element: <Auth />,
      },
    ],
  },

  // 3 Distinct Dashboard Experiences
  {
    path: 'dashboards',
    element: <Dashboards />,
  },
  {
    path: 'dashboard/customer',
    element: <CustomerDashboard />,
  },
  {
    path: 'dashboard/farmer',
    element: <FarmerDashboard />,
  },
  {
    path: 'dashboard/admin',
    element: <AdminDashboard />,
  },

  // Fallback Catch-All
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
