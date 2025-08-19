import { AuthProvider } from "@/contexts/AuthProvider";
import { UIProvider } from "@/contexts/UIContext";
import { MainLayout } from "@/layouts/MainLayout";
import { UserLoginForm } from "@/pages/auth/LoginForm";
import { UserRegisterForm } from "@/pages/auth/UserRegistrationForm";
import { ExcursionForm } from "@/pages/ExcursionForm";
import ExcursionListPage from "@/components/ExcursionsList";
import HomePage from "@/pages/home/HomePage";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";

export const RoutePaths = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <UIProvider>
          <Routes>
            <Route path="/register" element={<UserRegisterForm />} />
            <Route path="/login" element={<UserLoginForm />} />
            <Route path="/excursions" element={<ExcursionForm/>} />
            <Route path="/excursionslist" element={<ExcursionListPage />} />
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Navigate to={"/home"} replace />} />
              <Route path="/home" element={<HomePage />} />
            </Route>
          </Routes>
        </UIProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};
