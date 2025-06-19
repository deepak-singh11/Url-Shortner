import { useDispatch } from 'react-redux';
import ShortURLCreation from '../Components/ShortURLCreation';
import DashboardCardContainer from './DashboardCardContainer';
import { useEffect, useState } from 'react';
import { updateUrlData } from '@/redux/slices/urlDataSlice';
import axios from 'axios';


interface AllUrlType {

    clickCount:number;
    clickLimit:number;
    createdAt:string;
    originalUrl:string;
    owner?:string;
    slug:string;
    _id:string;

}

const MainHomeContent = () => {

    const dispatch=useDispatch();
    const showHomeDashboard = true;
    const [newUrlUpdated,setNewUrlUpdated]=useState(false);    
    const [homeShortUrl,sethomeShortUrl]=useState<AllUrlType[]>([]);

    
    useEffect(()=>{
        // Fetching ShortUrls
        const fetchLinks = async () => {  
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/url/allSlugs`, {
                withCredentials: true
            });
            console.log("all url data",response.data);  
            dispatch(updateUrlData(response.data));
            sethomeShortUrl(response.data);
        }
        fetchLinks();
        setNewUrlUpdated(false);
    },[newUrlUpdated,dispatch])

    return (
        <div className="grid grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-xl shadow">
                <div className="text-2xl mb-4 font-bold text-center "><h2>Getting started with Shortly</h2></div>

                <ShortURLCreation setNewUrlUpdated={setNewUrlUpdated}/>

            </div>
            {homeShortUrl?(
                <div className="bg-white p-6 rounded-xl shadow text-center ">
                <div className="text-2xl mb-4 font-bold text-center  "><h2>Latest Links</h2></div>

                <div className=" bg-[#5fa0eb2d] flex flex-col justify-center items-center   rounded-xl pb-6 px-2">
                    {homeShortUrl.slice(0, 2).map((urlData) => <DashboardCardContainer urlData={urlData} showHomeDashboard={showHomeDashboard} />)}
                </div>
            </div>)
            :
            (<div className='flex justify-center items-center'> <h1> No Link Created</h1> </div>)            
            
        }            

        </div>
    )
}

export default MainHomeContent
