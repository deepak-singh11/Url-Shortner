import DashboardOutlineStructure from "@/Components/ui/DashboardOutlineStructure";
import DashboardCardContainer from "@/Components/DashboardCardContainer";
import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import ClickLineChart from "@/Components/charts/ClickLineChart";
import { useDispatch } from "react-redux";
import axios from "axios";
import DevicePieChart from "@/Components/charts/DevicePieChart";
import { updateClickedAtDates, updateDeviceData, updateReferrerData, updateCountryData, updateCityData } from "@/redux/slices/urlStatsSlice";
import ReferrerPirChart from "@/Components/charts/ReferrerPirChart";
import CountryBarChart from "@/Components/charts/CountryBarChart";
import CityBarChart from "@/Components/charts/CityBarChart";

const URLStats = () => {

    const [showDetailedStyle, setShowDetailedStyle] = useState(false);

    // Accessing Data sent from dashboard
    const dispatch = useDispatch();
    const location = useLocation();
    const urlData = location.state?.urlData;
    const clickedAtArray = [];
    const deviceArray = [];
    const referrerArray = [];
    const countryArray = [];
    const cityArray = [];
    // Extracting slug from params
    const { slug } = useParams<{ slug?: string }>();

    const getOrdinal = (n) => {
        const s = ["th", "st", "nd", "rd"];
        const v = n % 100;
        return n + (s[(v - 20) % 10] || s[v] || s[0]);
    };

    // fetching url
    const fetchUrlStats = async () => {
        const response = await axios.get(`http://localhost:3000/api/v1/url/slugStats/${slug}`, { withCredentials: true })
        console.log(response.data);
        const urlStatsArray = response.data.slugInfo;

        // Extracting info from Url Stats object
        urlStatsArray.map((urlStat) => {
            clickedAtArray.push(urlStat.clickedAt);
            deviceArray.push(urlStat.device);
            referrerArray.push(urlStat.referrer);
            deviceArray.push(urlStat.device);
            countryArray.push(urlStat.location?.country);
            cityArray.push(urlStat.location?.city);
        });

        // ClickedAt Dates--> Right Format
        const formattedDates = clickedAtArray.map(dateStr => {
            const date = new Date(dateStr);
            const weekday = date.toLocaleString('en-US', { weekday: 'short' });
            const day = getOrdinal(date.getDate());
            const month = date.toLocaleString('en-US', { month: 'long' });
            return `${weekday} ${day} ${month}`;
        });

        // Map Making method:
        function getFrequencyMap(arr: (string | undefined)[]) {
            const map: { [key: string]: number } = {};
            for (const item of arr) {
                if (!item) continue;
                map[item] = (map[item] || 0) + 1;
            }
            return Object.entries(map)
                .map(([name, count]) => ({ name, count }))
                .sort((a, b) => b.count - a.count); // Sort descending
        }

        const clickedAtData = getFrequencyMap(formattedDates);
        const referrerData = getFrequencyMap(referrerArray);
        const countryData = getFrequencyMap(countryArray);
        const cityData = getFrequencyMap(cityArray);
        const deviceData = getFrequencyMap(deviceArray);


        // Saving Format Dates to Store
        dispatch(updateClickedAtDates(clickedAtData));
        dispatch(updateReferrerData(referrerData));
        dispatch(updateCountryData(countryData));
        dispatch(updateCityData(cityData));
        dispatch(updateDeviceData(deviceData));
        console.log("device data", deviceData)
        console.log(clickedAtData, referrerData, countryData, cityData);
    }

    useEffect(() => {
        fetchUrlStats();
        setShowDetailedStyle(true);
    }, []);



    return (
        <div>
            <DashboardOutlineStructure showDetailedStyle={showDetailedStyle} >
                <DashboardCardContainer urlData={urlData} showDetailedStyle={true} />
            </DashboardOutlineStructure>
            {/* <div className='w-[100%] flex justify-center bg-[#F4F6FA]  '>
                <div className="w-[78%] py-5 border-b-2 border-gray-300">
                    <h1 className={`text-4xl  font-bold `}> Analytics</h1>
                </div>
            </div> */}
            <div className=" border-blue-500  bg-[#F4F6FA] flex justify-center items-center mb-10 pb-10">
                <div className=" border-pink-600 w-[80%]">
                    <div className="">
                        <div className="bg-white  rounded-lg mt-5 px-10 pb-5">
                            <ClickLineChart />
                        </div>
                        <div className="flex mt-5 gap-5">
                            <CountryBarChart />
                            <CityBarChart />
                        </div>
                        <div className="flex mt-5 gap-5">
                            <DevicePieChart />
                            <ReferrerPirChart />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default URLStats
