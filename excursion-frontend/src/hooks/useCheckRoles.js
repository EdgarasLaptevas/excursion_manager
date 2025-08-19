import { useAuth } from "@/contexts/AuthProvider";

export const useCheckAdminRole = () => {
  const { account } = useAuth();

  return account?.scope?.includes("ROLE_ADMIN");
};

export const useCheckUserRole = () => {
  const { account } = useAuth();

  return account?.scope?.includes("ROLE_USER");
};
