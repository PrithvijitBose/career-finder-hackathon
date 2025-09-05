// components/LogoutButton.tsx
import { useNavigate } from "react-router-dom";
import { useUser } from "@/context/user";

export default function LogoutButton() {
  const { setUser } = useUser();
  const navigate = useNavigate();

  function handleLogout() {
    setUser(null);            // clears localStorage (career_user)
    navigate("/login");       // go back to login page
  }

  return (
    <button
      onClick={handleLogout}
      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
    >
      Logout
    </button>
  );
}
