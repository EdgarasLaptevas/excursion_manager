import NavBar from "@/components/NavBar"
import { Outlet } from "react-router"

export const MainLayout = () => {
    return (
        <div>
            <NavBar/>
            <Outlet/>
        </div>
    )
}