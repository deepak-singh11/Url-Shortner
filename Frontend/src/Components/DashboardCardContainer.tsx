import DashboardCardContent from "./DashboardCardContent";
import ShareButton from "./ui/ShareButton";
import { useMemo, useState } from "react";
import CopyButton from "./ui/CopyButton";
import EditButton from "./ui/EditButton";

// LinkCard.tsx
interface AllUrlType {
  clickCount: number;
  clickLimit: number;
  createdAt: string;
  originalUrl: string;
  owner?: string;
  slug: string;
  title?: string;
  _id: string;
}

interface LinkCardProps {
  urlData: AllUrlType;
  showDetailedStyle?:boolean;
  showHomeDashboard?:boolean;
}

const   DashboardCardContainer = ({ urlData,showDetailedStyle,showHomeDashboard }: LinkCardProps) => {

  const [appShareModal, setAppShareModal] = useState(false);
  const favicon = `https://www.google.com/s2/favicons?sz=64&domain=${urlData.originalUrl}`;

  const displayCreatedAt = useMemo(() => {
    const date = new Date(urlData.createdAt);
    const minutes = date.getMinutes();     
    const hours = date.getHours();
    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0'); 
    const year = date.getUTCFullYear();

    if(showDetailedStyle)
      return `${day}/${month}/${year} ${hours}:${minutes}`

    return `${day}/${month}/${year}`
  }, [urlData])

  return (
    <>
      <div className={`w-[100%] bg-white shadow-md rounded-lg p-6 
                       mt-8 flex flex-wrap  sm:flex-nowrap flex-col md:flex-row items-start md:items-center justify-between ${showHomeDashboard?"py-7":"py-8"} `}>

        <DashboardCardContent appShareModal={appShareModal} 
                              setAppShareModal={setAppShareModal} 
                              displayCreatedAt={displayCreatedAt} 
                              urlData={urlData} 
                              favicon={favicon}
                              showDetailedStyle={showDetailedStyle}
                              showHomeDashboard={showHomeDashboard}
        />        
        
        {/* Copy Share Edit */}
       <div className={`flex ${showHomeDashboard?"flex-col":"flex-row"} px-2 gap-2 justify-center gap-y-2 h-full flex-end w-[30%] `}>

          {/* Copy */}
          <CopyButton slug={urlData.slug}/>

          {/*Share  */}
          <ShareButton setAppShareModal={setAppShareModal}/>

          {/* Edit */}
          <EditButton slug={urlData.slug} />

        </div>
      </div>
    </>
  );
};

export default DashboardCardContainer;
