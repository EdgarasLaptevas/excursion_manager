// import { useCheckUserRole } from "@/hooks/useCheckRoles";
// import { NavLink } from "react-router";

// export const NavBar = () => {
//   const admin = useCheckUserRole();

//   return (
//     <nav className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 shadow-xl px-6 py-4 fixed top-0 left-0 right-0 z-50">
//       <div className="max-w-screen-xl mx-auto flex justify-end space-x-10">
//         {admin && (
//           <NavLink
//             to="/excursions"
//             className={({ isActive }) =>
//               isActive
//                 ? "text-white font-bold border-b-2 border-white pb-1"
//                 : "text-white/80 hover:text-white transition duration-300"
//             }
//           >
//             Ekskursijos
//           </NavLink>
//         )}
//         <NavLink
//           to="/excursionslist"
//           className={({ isActive }) =>
//             isActive
//               ? "text-white font-bold border-b-2 border-white pb-1"
//               : "text-white/80 hover:text-white transition duration-300"
//           }
//         >
//           Registracijos
//         </NavLink>
//       </div>
//     </nav>
//   );
// };

import { useCheckUserRole } from "@/hooks/useCheckRoles";
import { NavLink, useNavigate } from "react-router";
import { useAuth } from "@/contexts/AuthProvider";
export const NavBar = () => {
  const admin = useCheckUserRole();
  const { account, logout } = useAuth();

return (
    <nav className="bg-white shadow-md px-6 py-4 fixed top-0 left-0 right-0 z-50">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-6">
          <NavLink
            to="/excursionslist"
            className={({ isActive }) =>
              isActive
                ? "text-indigo-600 font-semibold border-b-2 border-indigo-600 pb-1"
                : "text-gray-600 hover:text-indigo-600 transition"
            }
          >
            Ekskursijos
          </NavLink>
          <NavLink
  to="/myregistrations"
  className={({ isActive }) =>
    isActive
      ? "text-indigo-600 font-semibold border-b-2 border-indigo-600 pb-1"
      : "text-gray-600 hover:text-indigo-600 transition"
  }
>
  Mano registracijos
</NavLink>
          <NavLink
            to="/reviews"
            className={({ isActive }) =>
              isActive
                ? "text-indigo-600 font-semibold border-b-2 border-indigo-600 pb-1"
                : "text-gray-600 hover:text-indigo-600 transition"
            }
          >
            Palikti atsiliepimą
          </NavLink>
        </div>
        <div className="flex items-center space-x-4">
          {account && (
            <>
              <span className="text-sm text-gray-700">
                Sveiki, <span className="font-medium">{account.email}</span>
              </span>
              <button
                onClick={logout}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
              >
                Atsijungti
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
