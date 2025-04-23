import { Route, Routes } from 'react-router-dom';

import LoginForm from './components/LoginForm';
import Home from './components/Home';
import Bookings from './components/MyBookings';
import ProtectedRoute from './components/ProtectedRoute';
import Profile from './components/Profile';


const App = () => (
  <Routes>
    {/* Public Routes */}
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<LoginForm />} />

    {/* Protected Routes */}
    <Route element={<ProtectedRoute />}>
      <Route path="/bookings" element={<MyBookings />} />
      <Route path='/profile' element={<Profile/>} />
    </Route>
  </Routes>
)

export default App