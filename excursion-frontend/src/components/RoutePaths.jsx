import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";
import HomePage from "../pages/home/HomePage";
import LoginForm from "../pages/auth/LoginForm";
import ExcursionRegistrationForm from "../pages/excursions/ExcursionRegistrationForm";
import UserRegistrationForm from "../pages/auth/UserRegistrationForm";
import UserReservationList from "../pages/excursions/UserReservationList";

export default function RoutePaths() {
  const { isLoggedIn, login } = useAuth();
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route
        path="/login"
        element={
          !isLoggedIn ? <LoginForm onLogin={login} /> : <Navigate to="/" />
        }
      />
      <Route path="/register" element={<UserRegistrationForm />} />
      <Route
        path="/add-excursion"
        element={
          isLoggedIn ? <ExcursionRegistrationForm /> : <Navigate to="/login" />
        }
      />
      <Route path="/my-reservations" element={<UserReservationList />} />
    </Routes>
  );
}
