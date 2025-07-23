import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

export default function NavBar() {
const navigate = useNavigate();
  const { isLoggedIn, roles = [], logout } = useAuth();
  const hasRole = (role) => roles.include(role);

  return (
    <nav className="flex gap-[8px] mt-1 justify-center items-center">
      <Link to="/">Ekskursijos</Link>
      
      {!isLoggedIn && <Link to="/login">Prisijungti</Link>}

      {isLoggedIn && (
        <>
          {(hasRole("ROLE_USER") || hasRole("ROLE_ADMIN")) && (
            <Link to="/my-reservations">Mano rezervacijos</Link>
          )}

          {hasRole("ROLE_ADMIN") && (
            <Link to="/add-excursion">Pridėti ekskursiją</Link>
          )}
          <button
            type="button"
            onClick={() => {
              logout();
              navigate("/");
            }}
            className="text-red-600 hover:underline"
          >
            {" "}
            Atsijungti
          </button>
        </>
      )}
    </nav>
  );
}