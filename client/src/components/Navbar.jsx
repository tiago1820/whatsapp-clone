import { useNavigate } from "react-router-dom";


export const Navbar = () => {
    const navigate = useNavigate();


    const handleLogout = () => {
        localStorage.clear();
        navigate("/");

    }
    return (
        <nav className="navbar navbar-expand-md navbar-dark bg-dark">
            <div className="container">
                <a className="navbar-brand" href="#">Mi App</a>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <a onClick={handleLogout} className="nav-link" href="#">Logout</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}