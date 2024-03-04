import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import ErrorPage from '../pages/Error';
import Home from '../pages/Home';
import Login from '../pages/auth/SignIn';
import RouteGuard from './RouteGuard';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      {/** Public routes */}
      <Route element={<RouteGuard isPrivate={false} />}>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<ErrorPage />} />
      </Route>

      {/** Private routes */}
      <Route element={<RouteGuard isPrivate={true} />}>
        <Route index element={<Home />} />
      </Route>
    </Route>,
  ),
);

export default router;
