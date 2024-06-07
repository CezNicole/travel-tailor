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
    
    // const handleProvinceChange = (event) => {
    //     console.log(event.target.value);
    //     setSelectedProvince(event.target.value);
    // }

    const fetchAttractions = async (province, season) => {
        setLoading(true);

        try {
            const response = await axios.get(`${serverUrl}/api/attractions/${province}/${season}`);
            console.log("Attractions: ", response.data);
            setAttractions(response.data);
            setError(null);
        } catch (error) {
            console.error("Error fetching Canadian attractions", error);
            setError(error.message);
            setLoading(false);
        }
    }

    useEffect(() => {
        if(selectedProvince){
            const season = getSeason(startDate);
            fetchAttractions(selectedProvince, season);
        } else{
            setAttractions([]);
        }
    }, [selectedProvince, startDate, serverUrl]);

    // useEffect(() => {
    //     const fetchAttractions = async () => {
    //         try {
    //             if(selectedProvince){
    //                 const response = await axios.get(`${serverUrl}/api/attractions/${selectedProvince}`);
    //                 console.log("Attractions: ", response.data);
    //             } else{
    //                 console.log(setAttractions([]));
    //                 setAttractions([]);
    //             }
    //         } catch (error) {
    //             console.error("Error fetching Canadian attractions", error);
    //         }
    //     }

    //     fetchAttractions();

    // }, [selectedProvince, serverUrl])


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

        // const fetchAttractions = async () => {
        //     try {
        //         const response = await axios.get(`${serverUrl}/api/attractions/${selectedProvince}`);
        //         console.log(response.data);
        //         setAttractions(response.data);
        //     } catch (error) {
        //         console.error("Error fetching Canadian attractions", error);   
        //     }
        // }

        const season = getSeason(startDate);
        if(selectedProvince && season){
            fetchAttractions(selectedProvince, season)
        } else{
            console.log("Selected province/territory or season is undefined");
        }

        fetchAttractions();
    }

    return(
        <>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            
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
                    {provinces.map((province) => {
                        console.log(province);
                        return(
                            <option key={province} value={province}>
                                {province.province_territory}
                            </option>
                        )
                    })}
                </select>
                <p>Selected Province/Territory: {selectedProvince}</p>

                <ul>
                    {attractions.map((attraction) => (
                        <li key={attraction.id}>
                            {attraction.attraction_name}
                            Attraction Type: {attraction.attraction_type}
                            Best Time to Visit: {attraction.best_time_to_visit}
                            Visiting Hours: {attraction.visiting_hours}
                            Address: {attraction.address}
                            Website: <a href={attraction.website_link}>{attraction.website_link}</a>
                            <img src={attraction.image_link} alt={attraction.attraction_name} />
                        </li>

                    ))}
                </ul>

                
                <CalendarSelector onDateChange={handleDateChange} />

                <button className="form__button">
                    Let's Travel, Eh? 
                    <img src={airplaneIcon} alt="airplane icon" className="form__button-icon"/>
                </button>
            </form>
        </>
    )
}