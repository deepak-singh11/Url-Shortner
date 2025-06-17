// import { useState } from "react";
import ThreeCards from '@/Components/ThreeCards'
import TopBar from "@/Components/TopBar";
import MainHomeContent from "@/Components/MainHomeContent";
import { useSelector } from 'react-redux';
import type { RootState } from "@/redux/store";

export default function HomePage() {

  const {userData}=useSelector((state:RootState)=>state.user)
  console.log(userData);
  // localStorage.removeItem("persist:root")
  // const [navOpen, setNavOpen] = useState(true);
  // const toggleNav = () => setNavOpen(!navOpen);

  return (
    <div className="flex min-h-screen w-full border">
      {/* Center Page */}
      <div className="flex-1 bg-gray-50">
        <TopBar />
        {/* Main Content */}
        <div className="p-8">
          <ThreeCards/>
          <MainHomeContent />
        </div>
      </div>
    </div>
  );
}
