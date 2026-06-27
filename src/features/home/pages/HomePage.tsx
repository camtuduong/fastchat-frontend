import Button from "@/components/base/Button";
import { useLogout } from "@/features/auth/hooks/useLogout";
import { useNavigate } from "@tanstack/react-router";

export const HomePage = () => {
  const { mutate: logout } = useLogout();
  const navigate = useNavigate();

  const handleLogout = () => {
    try {
      logout();
      navigate({ to: "/login" });
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
      <div className="mt-6 flex gap-2">
        <Button
          className="w-auto bg-green-600 px-4 text-white transition hover:bg-green-800 hover:duration-300"
          onClick={() => navigate({ to: "/chat" })}
        >
          Go to Chat
        </Button>
        <Button
          className="w-auto bg-purple-600 px-4 text-white transition hover:bg-purple-800 hover:duration-300"
          onClick={() => navigate({ to: "/profile" })}
        >
          Go to Your Profile
        </Button>
        <Button
          className="w-auto bg-red-500 px-4 text-white transition hover:bg-red-600 hover:duration-300"
          onClick={handleLogout}
        >
          Log Out
        </Button>
      </div>
    </div>
  );
};
