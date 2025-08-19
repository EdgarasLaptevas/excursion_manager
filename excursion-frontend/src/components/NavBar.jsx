// import { useCheckUserRole } from "@/hooks/useCheckRoles"
// import { NavLink } from "react-router";

// export const NavBar = () => {
//   const admin = useCheckUserRole();

// return (
//     <div className="bg-gradient-to-br from-lime-400 via-emerald-400 to-lime-400 flex justify-end p-1 md:p-3 z-50 shadow-lg">
//             <div className="w-full  flex justify-evenly">
//                  {admin && <NavLink
//                         to={"/excursions"}
//                         className={({ isActive }) =>
//               isActive
//                 ? "text-[#005050] font-semibold hover:animate-pulse"
//                 : "inline-block transform transition duration-400 hover:-translate-y-1 text-white"
//                         }
//                       >
//                         <p className="text-xs sm:text-sm md:text-base ">Ekskursijos</p>
//                       </NavLink>}
//               <NavLink
//                         to={"/registrations"}
//                         className={({ isActive }) =>
//               isActive
//                 ? "text-[#005050] font-semibold hover:animate-pulse"
//                 : "inline-block transform transition duration-400 hover:-translate-y-1 text-white"
//                         }
//                       >
//                         <p className="text-xs sm:text-sm md:text-base ">Registracijos</p>
//                       </NavLink>
                     
//             </div>
//        {/* <DropDownMenu/> */}
//     </div>
// )
// }

import { useCheckUserRole } from "@/hooks/useCheckRoles";
import { NavLink } from "react-router";

export const NavBar = () => {
  const admin = useCheckUserRole();

  return (
    <nav className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 shadow-xl px-6 py-4 fixed top-0 left-0 right-0 z-50">
      <div className="max-w-screen-xl mx-auto flex justify-end space-x-10">
        {admin && (
          <NavLink
            to="/excursions"
            className={({ isActive }) =>
              isActive
                ? "text-white font-bold border-b-2 border-white pb-1"
                : "text-white/80 hover:text-white transition duration-300"
            }
          >
            Ekskursijos
          </NavLink>
        )}
        <NavLink
          to="/excursionslist"
          className={({ isActive }) =>
            isActive
              ? "text-white font-bold border-b-2 border-white pb-1"
              : "text-white/80 hover:text-white transition duration-300"
          }
        >
          Registracijos
        </NavLink>
      </div>
    </nav>
  );
};

// import { NavLink } from "react-router";
// import "../css/navbar.css"
// import { useCheckUserRole } from "@/hooks/useCheckRoles";

// export const NavBar = () => {
//   const admin = useCheckUserRole();

//     return (<nav className="navbar">
//         <div className="navbar-brand">
//             <NavLink to="/">Home</NavLink>
//         </div>
//         <div className="navbar-links">
//             <NavLink to="/" className="nav-link">Home</NavLink>
//             <NavLink to="/registrations" className="nav-link">Registration</NavLink>
//         </div>
//     </nav>
// )
// }