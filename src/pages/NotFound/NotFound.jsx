import { useNavigate } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { useEffect } from "react";
import "./NotFound.scss";

export default function NotFound() {
    const navigate = useNavigate();

    useEffect(() => {
        const redirectDelay = setTimeout(() => {
            navigate("/");
        }, 4500);

        return () => clearTimeout(redirectDelay);
    }, [navigate]);

    return (
        <>
            <Header />
            <main className="not-found">
                <div className="not-found__notification">
                    <h1 className="not-found__title">Looks Like You're Lost!</h1>
                    <h2 className="not-found__subtitle">Let's get you back on track.</h2>
                    <div className="not-found__animation"></div>
                </div>
            </main>
            <Footer />
        </>
    );
}
