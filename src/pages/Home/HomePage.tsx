import Button from "@/components/base/Button";
import { useAuthStore } from "@/stores/useAuthStore";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const { signOut } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut();
      navigate("/signin");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold">Welcome to FastChat!</h1>
      <p className="mt-4 text-lg text-gray-600">
        This is the home page. You are successfully authenticated.
      </p>
      <Button
        className="w-auto bg-red-500 px-4 text-white transition hover:bg-red-600 hover:duration-300"
        onClick={handleLogout}
      >
        Log Out
      </Button>
    </div>
  );
}
