import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App.jsx';
import Home from './pages/Home.jsx';
import Map from './components/Map.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound.jsx';
import FriendList from './pages/Friends.jsx';
import About from './pages/About.jsx';
// import ProtectedRoute from './components/protectedRoutes.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />
      },{
        path: '/about',
        element: <About />
      }, {
        path: '/Map',
        element: <Map />
      }, {
        path: '/login',
        element: <Login />
      }, {
        path: '/signup',
        element: <Signup />
      },
      {
        path: '/me',
        element:
          <Profile />
      }, {
        path: '/profiles/:profileId',
        element: <Profile />
      }
    , {
      path: '/friends',
      element: <FriendList />
    }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
