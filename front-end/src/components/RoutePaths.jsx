import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import HomePage from "./HomePage";
import LoginForm from "./LoginForm";
import ExcursionRegistrationForm from "./ExcursionRegistrationForm";
import UserRegistrationForm from "./UserRegistrationForm";
import UserReservationList from "./UserReservationList";

export default function RoutePaths(){
    const { isLoggedIn, login } = useAuth();
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
            path="/login"
            element={
                !isLoggedIn ? (
                <LoginForm
                    onLogin={login}
                />
                ) : (
                <Navigate to="/" />
                )
            }
            />
            <Route
            path="/register"
            element={<UserRegistrationForm/>}
            />
            <Route
            path="/add-excursion"
            element={
                isLoggedIn ? (
                <ExcursionRegistrationForm />
                ) : (
                <Navigate to="/login" />
                )
            }
            />
            <Route path="/my-reservations" element={<UserReservationList />} />
        </Routes>
    );
}