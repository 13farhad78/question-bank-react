// src/Layout.jsx
import { Outlet } from "react-router-dom"
import Header from "./components/Header"
import Navbar from "./components/Navbar"

export default function Layout () {
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white">
            <Header/>
            <Navbar/>
            <main dir="ltr" className="flex-grow py-6">
                <div className="container">
                    <Outlet/>
                </div>
            </main>
        </div>

    )
}