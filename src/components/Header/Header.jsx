import { Link, useNavigate } from "react-router-dom";
import "./Header.scss";

export default function Header({onClick}){
    const navigate = useNavigate();

    const handleClick = (event) => {
        event.preventDefault();
        onClick();
        navigate("/");
    }
    return(
        <header className="header">
            <a href="/" onClick={handleClick} className="header__link">
                <h1 className="header__title">Travel Tailor</h1>
            </a>
        </header>
    )
}