import React from 'react'
import TopBar from '@/Components/TopBar';
import { useNavigate } from 'react-router-dom';
import { MoveLeft } from 'lucide-react';

type Props={
    children:React.ReactNode;
    showDetailedStyle?:boolean;
}

const DashboardOutlineStructure = ({children,showDetailedStyle}:Props) => {
    const navigate=useNavigate();
    return (
        <>
            <TopBar />
            <div className=" p-4  flex justify-center bg-[#F4F6FA] ">
                <div className=' w-[80%]  flex justify-center items-center flex-col '>

                    <div 
                        className='w-[100%] flex justify-between border-b-2 border-gray-200 p-5 text-black'>
                        <h1 onClick={showDetailedStyle?()=>{navigate(-1)}:()=>{}} 
                            className={`${showDetailedStyle?"text-lg":"text-4xl"} ${showDetailedStyle?"":"font-bold"} mb-4 `}>
                                {showDetailedStyle?<MoveLeft className='cursor-pointer' size={20} />:"Dashboard"}
                        </h1>
                        <button className="btn btn-primary text-white">Create Link</button>
                    </div>
                    {children}
                </div>
            </div>

        </>
    )
}

export default DashboardOutlineStructure
