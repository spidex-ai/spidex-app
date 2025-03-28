import Chat from '@/pages/chat';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import Layout from '@/components/Layout/Layout';
import Token from '@/pages/token';
import Account from '@/pages/account';
import Porfolio from '@/pages/porfolio';
import ComponentBase from '@/pages/ui';

const router = createBrowserRouter([
  {
    path: '/app',
    element: <Layout isLandingPage={false} />,
    children: [
      {
        path: 'chat',
        element: <Chat />,
      },
      {
        path: 'token',
        element: <Token />,
      },
      {
        path: 'account',
        element: <Account />,
      },
      {
        path: 'porfolio',
        element: <Porfolio />,
      },
      {
        path: 'base-component',
        element: <ComponentBase />,
      }
    ],
  },
  {
    path: '', 
    element: <Navigate to="/app/chat" replace />
  }
]);

export default router;