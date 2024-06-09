import { useEffect, useState } from "react";
import airplaneIcon from "../../assets/icons/airplane.svg";
import errorIcon from "../../assets/icons/error.svg";
import CalendarSelector from "../../components/CalendarSelector/CalendarSelector";
import "./Home.scss";
import axios from "axios";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import Slider from "react-slick";
import "slick-carousel/slick/slick.scss";
import "slick-carousel/slick/slick-theme.scss";

export default function Home() {
            
    const serverUrl = process.env.REACT_APP_SERVER_URL;
            
    const [provinces, setProvinces] = useState([]);
    const [selectedProvince, setSelectedProvince] = useState("");
    const [attractions, setAttractions] = useState([]);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showAttractions, setShowAttractions] = useState(false);

    const getSeason = (date) => {
        const month = date.getMonth() + 1;
        if(month >= 6 && month <= 8){
            return 'summer';
        } else if (month >= 9 && month <= 11){
            return 'fall';
        } else {
            return 'all time';
        }
    }
    
    useEffect(() => {
        const fetchProvinces = async () => {
            try {
                const response = await axios.get(`${serverUrl}/api/provinces`);
                setProvinces(response.data);
            } catch (error) {
                console.error("Error fetching Canadian provinces/territories", error);
            }
        }

        fetchProvinces();

    }, [serverUrl]);

    const fetchAttractions = async () => {
        setLoading(true);

        const season = getSeason(startDate);

        try {
            const responseSummerAndFall = await axios.get(`${serverUrl}/api/attractions/${selectedProvince}/${season}`);
            const attractionsBySeason = responseSummerAndFall.data;

            const responseAllTimeSeason = await axios.get(`${serverUrl}/api/attractions/${selectedProvince}/all time`);
            const attractionsAllTime = responseAllTimeSeason.data;

            const combinedAttractions = [...attractionsBySeason, ...attractionsAllTime.filter(attraction => !attractionsBySeason.find(a => a.id === attraction.id))];

            setAttractions(combinedAttractions);
            setShowAttractions(true);
            setError(null);
        } catch (error) {
            console.error("Error fetching Canadian attractions", error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    const handleProvinceChange = (event) => {
        setSelectedProvince(event.target.value);

        if (event.target.value === "") {
            setAttractions([]);
            setShowAttractions(false);
            setError(null);
        }
    }

    const handleProvinceClick = (province) => {
        setSelectedProvince(province);
    }
    
    const handleDateChange = (dates) => {
        setStartDate(dates[0]);
        setEndDate(dates[1]);
    };

    const resetForm = () => {
        setSelectedProvince("");
        setAttractions([]);

        const currentDate = new Date();
        setStartDate(currentDate);
        setEndDate(currentDate);

        setShowAttractions(false);
        setError(null);
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        if(!selectedProvince){
            setError("Please select a province / territory");
            return;
        } else {
            fetchAttractions();
        }
    }

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 4,
        autoplay: true,
        autoplaySpeed: 3000,
    };

    return(
        <>
            <Header onClick={resetForm}/>

            <div className="home__content">

                <h2>Your next Canadian adventure awaits...</h2>

                <Slider {...sliderSettings} className="home__carousel">
                    {provinces.map((province, index) => {
                        const words = province.province_territory.split(" ");
                        const capitalizedProvince = words.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
                        
                        return (
                            <div
                            key={index}
                            onClick={() => handleProvinceClick(province.province_territory)}
                            className="home__carousel-item"
                            >
                                <h3 className="home__carousel-title">{capitalizedProvince}</h3>
                                {province.image_link && <img src={province.image_link} alt={province.province_territory} className="home__carousel-image"/>}
                            </div>
                        )
                        })}
                </Slider>

                <form onSubmit={handleSubmit} className="form">
                <select
                        className="form__selection"
                        value={selectedProvince}
                        onChange={handleProvinceChange}
                        >
                        <option value="">Select a Province/Territory</option>
                        {provinces.map((province, index) => {
                            const words = province.province_territory.split(" ");
                            const capitalizedProvince = words.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
                            return(
                                <option key={index} value={province.province_territory}>
                                    {capitalizedProvince}
                                </option>
                            )
                            })}
                    </select>

                    <CalendarSelector startDate={startDate} endDate={endDate} onDateChange={handleDateChange} />

                    <button className="form__button">
                        Let's Travel, Eh?
                        <img src={airplaneIcon} alt="airplane icon" className="form__button-icon" />
                    </button>
                </form>

                {loading && <p>Loading attractions from the database...</p>}
                {error && 
                    <div className="error-message">
                        <img src={errorIcon} alt="error icon"/>
                        <span>{error}</span>
                    </div>
                }
                

                {!loading && showAttractions && attractions.length === 0 &&
                    <p>
                        Sorry, no attractions available for the selected province/territory and/or season.
                        Please modify your selection.
                    </p>
                }

                {!loading && showAttractions && attractions.length > 0 && (
                    <>
                        <section>
                            {attractions.map((attraction) => (
                                <div key={attraction.id} className="attraction">
                                    <h3 className="attraction__title">{attraction.attraction_name}</h3>
                                    <p className="attraction__description"><b>Attraction Type:</b> {attraction.attraction_type}</p>
                                    <p className="attraction__description"><b>Best Time to Visit:</b> {attraction.best_time_to_visit}</p>
                                    <p className="attraction__description"><b>Visiting Hours:</b> {attraction.visiting_hours}</p>
                                    <p className="attraction__description"><b>Address:</b> {attraction.address}</p>
                        <p className="attraction__description"><b>Website:</b> <a href={attraction.website_link}>{attraction.website_link}</a></p>
                                    <img src={attraction.image_link} alt={attraction.attraction_name} className="attraction__image" />
                                </div>
                            ))}
                        </section>
                    </>
                )}

            </div>

            <Footer />  
        </>
    )
}