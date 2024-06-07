import { useEffect, useState } from "react";
import airplaneIcon from "../../assets/icons/airplane.svg";
import CalendarSelector from "../../components/CalendarSelector/CalendarSelector";
import "./Home.scss";
import axios from "axios";

export default function Home() {

    
    
    
    // const handleSubmit = async (event) => {
        //     event.preventDefault();
        //     // const response = await getTravelRecommendations(location);
        //     // history.push({
            //     // pathname: "/travelrecommendations",
            //     // state: {response, duration},
            //     // });
            // }
            
            
            
    const serverUrl = process.env.REACT_APP_SERVER_URL;
    console.log(serverUrl);
            
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
                console.log("Provinces: ", response.data);
                setProvinces(response.data);
            } catch (error) {
                console.error("Error fetching Canadian provinces/territories", error);
            }
        }

        fetchProvinces();

    }, [serverUrl]);
    
    const fetchAttractions = async (province, season) => {
        setLoading(true);
        
        try {
            const season = getSeason(startDate);
            const response = await axios.get(`${serverUrl}/api/attractions/${selectedProvince}/${season}`);
            console.log("Attractions: ", response.data);
            setAttractions(response.data);
            setShowAttractions(true);
            setError(null);
        } catch (error) {
            console.error("Error fetching Canadian attractions", error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    // useEffect(() => {
    //     if(selectedProvince){
    //         const season = getSeason(startDate);
    //         fetchAttractions(selectedProvince, season);
    //     } else{
    //         setAttractions([]);
    //     }
    // }, [selectedProvince, startDate, serverUrl]);

    const handleProvinceChange = (event) => {
        console.log(event.target.value);
        setSelectedProvince(event.target.value);
    }
    
    const handleDateChange = (dates) => {
        setStartDate(dates[0]);
        setEndDate(dates[1]);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // const season = getSeason(startDate);
        // if(selectedProvince && season){
        //     fetchAttractions(selectedProvince, season)
        // } else{
        //     console.log("Selected province/territory or season is undefined");
        // }

        fetchAttractions();
    }

    return(
        <>
            <h1>Travel Tailor</h1>
            <h2>Your next Canadian adventure awaits...</h2>
            <form onSubmit={handleSubmit}>
               <select
                    className="form__selection"
                    value={selectedProvince}
                    onChange={handleProvinceChange}
                >
                    {/* <option key={0} value={0}>Select a Province/Territory</option> */}
                    <option value="">Select a Province/Territory</option>
                    {provinces.map((province, index) => {
                        const words = province.split(" ");
                        const capitalizedProvince = words.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
                        console.log(province);
                        return(
                            <option key={index} value={province}>
                                {capitalizedProvince}
                            </option>
                        )
                    })}
                </select>
                <p>Selected Province/Territory: {selectedProvince}</p>

                <CalendarSelector onDateChange={handleDateChange} />

                <button className="form__button">
                    Let's Travel, Eh?
                    <img src={airplaneIcon} alt="airplane icon" className="form__button-icon" />
                </button>
            </form>


            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}


            {/* {!showAttractions && attractions.length === 0 && 
                <p>Sorry, no attractions available for the selected province/territory and/or season. 
                    Please modify your selection.
                </p>
            } */}

            {!loading && showAttractions && attractions.length === 0 &&
                <p>
                    Sorry, no attractions available for the selected province/territory and/or season.
                    Please modify your selection.
                </p>
            }

            {!loading && showAttractions && attractions.length > 0 && (
                <>
                    <ul>
                        {attractions.map((attraction) => (
                            <li key={attraction.id}>
                                {attraction.attraction_name}<br></br>
                                Attraction Type: {attraction.attraction_type}<br></br>
                                Best Time to Visit: {attraction.best_time_to_visit}<br></br>
                                Visiting Hours: {attraction.visiting_hours}<br></br>
                                Address: {attraction.address}<br></br>
                                Website: <a href={attraction.website_link}>{attraction.website_link}</a><br></br>
                                <img src={attraction.image_link} alt={attraction.attraction_name} /><br></br>
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </>
    )
}