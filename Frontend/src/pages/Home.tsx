import MainHomeContent from "@/Components/MainHomeContent";
import ThreeCards from '@/Components/ThreeCards'
import TopBar from "@/Components/TopBar";
import { useSelector } from "react-redux";

export default function HomePage() {

  // @ts-expect-error state
  const {userData}=useSelector(state=>state.user);
  console.log("user data is sent",userData);
  
  return (
    <div className="flex min-h-screen w-full">
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
