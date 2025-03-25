import { RouterProvider } from 'react-router-dom';
import router from './routes';
import { injectStore } from './api/apiClient';
import store from './store';
injectStore(store)
function App() {

  return (
    <RouterProvider router={router}>
      
    </RouterProvider>
  )
}

export default App
