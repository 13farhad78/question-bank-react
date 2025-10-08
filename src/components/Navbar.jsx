import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <div className="container">
            <nav className="sticky top-0 z-50 flex justify-center backdrop-blur-md bg-white/10 border-b border-white/20 shadow-md py-4 rounded-2xl">
                <ul className="flex gap-8">
                    <li>
                        <Link
                            to="/"
                            className="text-white hover:text-blue-400 transition-colors">
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/add"
                            className="text-white hover:text-blue-400 transition-colors">
                            Add Question
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/saved"
                            className="text-white hover:text-blue-400 transition-colors">
                            Saved Question
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/practice"
                            className="text-white hover:text-blue-400 transition-colors">
                            Practice Page
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}
