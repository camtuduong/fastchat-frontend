import { useLocation } from "@tanstack/react-router";

export const useGetPath = () => {
  const location = useLocation();
  const path = location.pathname;
  return path;
};
