import { updateClickedAtDates, updateDeviceData, updateReferrerData, updateCountryData, updateCityData } from "@/redux/slices/urlStatsSlice";
import DashboardOutlineStructure from "@/Components/ui/DashboardOutlineStructure";
import DashboardCardContainer from "@/Components/DashboardCardContainer";
import ReferrerPirChart from "@/Components/charts/ReferrerPirChart";
import CountryBarChart from "@/Components/charts/CountryBarChart";
import DevicePieChart from "@/Components/charts/DevicePieChart";
import ClickLineChart from "@/Components/charts/ClickLineChart";
import CityBarChart from "@/Components/charts/CityBarChart";
import type { RootState } from "@/redux/store";
import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import axios from "axios";

interface LocationType {
    country: string,
    city: string,
}

interface UrlStats {
    clickedAt: string;
    device: string;
    location: LocationType;
    referrer: string;
    slug: string;
    __v: string;
    _id: string;

}

const URLStats = () => {

    const [showDetailedStyle, setShowDetailedStyle] = useState(false);
    const { urlStats, clickedAtData, deviceData } = useSelector((state: RootState) => state.urlStats)

    console.log("urlStats value is: ", urlStats, clickedAtData, deviceData)

    // Accessing Data sent from dashboard
    const dispatch = useDispatch();
    const location = useLocation();
    const urlData = location.state?.urlData;

    // Extracting slug from params
    const { slug } = useParams<{ slug?: string }>();

    const getOrdinal = (n: number) => {
        const s = ["th", "st", "nd", "rd"];
        const v = n % 100;
        return n + (s[(v - 20) % 10] || s[v] || s[0]);
    };

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

    // Fetching url
    useEffect(() => {
        const fetchUrlStats = async (): Promise<void> => {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/url/slugStats/${slug}`, { withCredentials: true })
            console.log(response.data);
            const urlStatsArray = response.data.slugInfo;
            console.log("urlStatsArray value is: ", urlStatsArray);

            const clickedAtArray: string[] = [];
            const deviceArray: string[] = [];
            const referrerArray: string[] = [];
            const countryArray: string[] = [];
            const cityArray: string[] = [];

            // ClickedAt Dates--> Right Format
            const formattedDates = clickedAtArray.map(dateStr => {
                const date = new Date(dateStr);
                const weekday = date.toLocaleString('en-US', { weekday: 'short' });
                const day = getOrdinal(date.getDate());
                const month = date.toLocaleString('en-US', { month: 'long' });
                return `${weekday} ${day} ${month}`;
            });

            // Extracting info from Url Stats object
            urlStatsArray.map((urlStat: UrlStats) => {
                clickedAtArray.push(urlStat.clickedAt);
                deviceArray.push(urlStat.device);
                referrerArray.push(urlStat.referrer);
                countryArray.push(urlStat.location?.country);
                cityArray.push(urlStat.location?.city);
            });

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

        }
        fetchUrlStats();
        setShowDetailedStyle(true);
    }, [dispatch, slug]);

    return (
        <>
            {urlData ? (
                <div>
                    <DashboardOutlineStructure showDetailedStyle={showDetailedStyle} >
                        <DashboardCardContainer urlData={urlData} showDetailedStyle={true} />
                    </DashboardOutlineStructure>

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
            ) : null}

        </>
    )
}

export default URLStats
