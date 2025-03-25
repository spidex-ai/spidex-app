import Chat from '@/pages/chat';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import Layout from '@/components/Layout/Layout';

const router = createBrowserRouter([
  {
    path: '/app',
    element: <Layout isLandingPage={false} />,
    children: [
      {
        index: true,
        element: <Chat />,
      },
    ],
  },
  {
    path: '', 
    element: <Navigate to="/app" replace />
  }
]);

export default router;