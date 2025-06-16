// import { useState } from "react";
import ThreeCards from '@/Components/ThreeCards'
import TopBar from "@/Components/TopBar";
import MainHomeContent from "@/Components/MainHomeContent";
import { useSelector } from 'react-redux';

export default function HomePage() {

  // @ts-expect-error ere
  const {userData}=useSelector(state=>state.user)
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
