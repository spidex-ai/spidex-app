import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/Layout';
import Home from '../pages/Home';
import CreateAgent from '@/pages/Agent/CreateAgent';
import Agent from '@/pages/Agent';
import EditAgent from '@/pages/Agent/EditAgent';
import Chat from '@/pages/Chat';
import Marketplace from '@/pages/Marketplace';
import Creator from '@/pages/Marketplace/Creator';
import CreatorPage from '@/pages/Marketplace/CreatorPage';
import AiList from '@/pages/Marketplace/AiList';
import CreatorDetail from '@/pages/Marketplace/CreatorDetail';

const router = createBrowserRouter([
  {
    path: '/app',
    element: <Layout isLandingPage={false} />,
    children: [
      {
        path: 'agent/:id',
        element: <EditAgent />,
      },
      {
        path: 'create-agent',
        element: <CreateAgent />,
      },
      {
        path: 'chat',
        element: <Chat />,
      },
      {
        path: 'marketplace',
        element: <Marketplace />,
      },
      {
        path: 'marketplace/creator',
        element: <Creator />,
      },
      {
        path: 'marketplace/creator/:id',
        element: <CreatorPage />,
      },
      {
        path: 'marketplace/creator/:id/detail',
        element: <CreatorDetail />,
      },
      {
        path: 'marketplace/ai-list',
        element: <AiList />,
      },
      {
        index: true,
        element: <Agent />,
      },
    ],
  },
  {
    path: '',
    element: <Layout isLandingPage={true} />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
]);

export default router;