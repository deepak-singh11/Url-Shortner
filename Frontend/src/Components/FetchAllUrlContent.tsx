import { useEffect, useState } from 'react'
import DashboardCardContainer from './DashboardCardContainer';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { updateUrlData } from '@/redux/slices/urlDataSlice';

interface AllUrlType {

    clickCount:number;
    clickLimit:number;
    createdAt:string;
    originalUrl:string;
    owner?:string;
    slug:string;
    _id:string;
}
const FetchAllUrlContent = () => {

    const dispatch=useDispatch();
    const [allUrlData, setAllUrlData] = useState<AllUrlType[]>([]);
    const fetchLinks = async () => {  
        const response = await axios.get("http://localhost:3000/api/v1/url/allSlugs", {
            withCredentials: true
        });
        console.log("all url data",response.data);  
        setAllUrlData(response.data);
        dispatch(updateUrlData(response.data));
    }

    useEffect(()=>{
        fetchLinks();
    },[])

    return (
        <>
            {allUrlData?(allUrlData.map((ele,ind)=><DashboardCardContainer key={ind} urlData={ele}/>))
            :
            (<div className='flex justify-center items-center'> <h1> No Link Created</h1> </div>)}
        </>
        
    )
}

export default FetchAllUrlContent
