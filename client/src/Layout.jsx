// src/Layout.jsx
import { Outlet } from "react-router-dom"
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material"
import SideBar from "./components/SideBar"
import Header from "./components/Header"

const theme = createTheme({
    palette : {mode: "dark"}
})

export default function Layout () {
    return (
        <>
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <div className="min-h-screen flex bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white">
                <SideBar/>
                <div className="w-full">
                    <Header/>
                    <main className="flex-grow py-6">
                        <div className="container">
                            <Outlet/>
                        </div>
                    </main>
                </div>
            </div>
        </ThemeProvider>
        </>

    )
}