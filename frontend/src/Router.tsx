import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { LandingPage } from "@/pages/LandingPage";
import Registration from "@/pages/Registration/Registration";
import Login from "@/pages/Login/Login";
import Catalog from '@/pages/Catalog/Catalog';

// Admin imports
import AdminLayout from '@/components/Admin/AdminLayout';
import Admin from '@/pages/Admin/Admin';
import ProductsManagement from '@/components/Admin/ProductsManagement';
import VendorsManagement from '@/components/Admin/VendorsManagement';
import VacanciesManagement from '@/components/Admin/VacanciesManagement';
import AdvantagesManagement from '@/components/Admin/AdvantagesManagement';
import NewsHome from './pages/News/NewsHome';
import NewsPage from './pages/News/NewsPage';
import ProfilePage from './pages/Profile/ProfilePage';

const router = createBrowserRouter(
    [
        {
            path: '/',
            element: <LandingPage />,
            index: true, // ✅ ensures "/" maps correctly
        },
        {
            path: '/registration',
            element: <Registration />,
        },
        {
            path: '/login',
            element: <Login />,
        },
        {
            path: '/catalog',
            element: <Catalog />,
        },
        {
            path: '/news',
            element: <NewsHome />
        },
        {
            path: '/news/:id',
            element: <NewsPage />
        },
        {
            path: '/profile',
            element: <ProfilePage />
        },
        {
            path: '/admin',
            element: <AdminLayout />,
            children: [
                {
                    index: true,
                    element: <Admin />,
                },
                {
                    path: 'products',
                    element: <ProductsManagement />,
                },
                {
                    path: 'vendors',
                    element: <VendorsManagement />,
                },
                {
                    path: 'vacancies',
                    element: <VacanciesManagement />,
                },
                {
                    path: 'advantages',
                    element: <AdvantagesManagement />,
                },
            ],
        },
    ],
    {
        basename: '/forest-bar',
    }
);

export function Router() {
    return <RouterProvider router={router} />;
}
