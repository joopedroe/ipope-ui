import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import BlogPage from './pages/BlogPage';
import SearchesList from './pages/SearchsList';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import NewSearch from './pages/search/NewSearch';
import Results from './pages/results';
import ResultsMaps from './pages/resultsMap';
import DashboardAppPage from './pages/DashboardAppPage';

// ----------------------------------------------------------------------

export default function Router() {

  const authenticated = localStorage.getItem('token');

  const routes = useRoutes([
    {
      path: '/dashboard',
      element: !authenticated ? <LoginPage /> : <DashboardLayout />,
      children: [
        { element: !authenticated ? <LoginPage /> :  <Navigate to="/dashboard/searches" />, index: true },
        { path: 'searches', element: <SearchesList /> },
        { path: 'searches/edit/:id', element: <NewSearch /> },
        { path: 'results/search/:id', element: <Results /> },
        { path: 'resultsMaps/search/:id', element: <ResultsMaps /> },
        { path: 'blog', element: <BlogPage /> },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/login" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
