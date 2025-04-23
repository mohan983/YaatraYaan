import { Route, Routes } from 'react-router-dom';

import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import Home from './components/Home';
import MyBookings from './components/MyBookings';
import BookingPage from './components/BookingPage';
import ProtectedRoute from './components/ProtectedRoute';
import ContactUs from './components/ContactUs';
import Profile from './components/Profile';


const App = () => (
  <Routes>
    {/* Public Routes */}
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<LoginForm />} />
    <Route path="/signup" element={<SignupForm />} />
    <Route path="/contact" element={<ContactUs />} />

    {/* Protected Routes */}
    <Route element={<ProtectedRoute />}>
      <Route path="/bookings" element={<MyBookings />} />
      <Route path="/booking" element={<BookingPage />} />
      <Route path='/profile' element={<Profile/>} />
    </Route>
  </Routes>
)

export default App