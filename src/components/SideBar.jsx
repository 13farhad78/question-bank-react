import { Link, useLocation } from "react-router-dom"
import DashboardIcon from '@mui/icons-material/Dashboard';
import AddIcon from '@mui/icons-material/Add';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import SettingsIcon from '@mui/icons-material/Settings';

const menuItems = [
  { name: "Dashboard", icon: <DashboardIcon />, path: "/" },
  { name: "Add Question", icon: <AddIcon />, path: "/add-question" },
  { name: "Question Bank", icon: <AccountBalanceIcon />, path: "/saved-questions" },
  { name: "Settings", icon: <SettingsIcon />, path: "/settings" },
]

export default function SideBar() {
  const location = useLocation()

  return (
    <div className="w-64 min-h-screen bg-gray-900 border-r border-gray-800 flex flex-col">
      <div className="p-6 text-xl font-bold border-b border-gray-800">Question Bank</div>
      <ul className="flex-1 mt-4">
        {menuItems.map((item) => (
          <li key={item.name}>
            <Link
              to={item.path}
              className={`flex items-center px-6 py-3 text-gray-300 hover:bg-gray-800 transition-colors ${
                location.pathname === item.path ? "bg-gray-800 text-white" : ""
              }`}
            >
              <span className="mr-3">{item.icon}</span>
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
      <div className="p-6 border-t border-gray-800 text-sm text-gray-500">
        © 2025 Farhad
      </div>
    </div>
  )
}
