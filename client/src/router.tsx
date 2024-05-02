import { createBrowserRouter } from 'react-router-dom';
import Problem1 from './pages/problem1';
import Problem2 from './pages/problem2';
import Problem3 from './pages/problem3';
import Problem4 from './pages/problem4';
import Problem5 from './pages/problem5';
import Problem6 from './pages/problem6';
import Home from './pages/home';
import Layout from './layout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '/', element: <Home /> },
      {
        path: 'problem1',
        element: <Problem1 />,
      },
      {
        path: 'problem2',
        element: <Problem2 />,
      },
      {
        path: 'problem3',
        element: <Problem3 />,
      },
      {
        path: 'problem4',
        element: <Problem4 />,
      },
      {
        path: 'problem5',
        element: <Problem5 />,
      },
      {
        path: 'problem6',
        element: <Problem6 />,
      },
    ],
  },
]);

export default router;
