import { useAuthState, useDbData } from "./Firebase";

export const useAdminChecker = () => {
  const user = useAuthState();
  const [isAdmin, error] = useDbData(`/admins/${user?.uid || "default"}`);

  return [isAdmin, error];
};
