import { Calendar1 } from 'lucide-react';
import { ChartNoAxesColumn } from 'lucide-react';
import ShareSocialMediaAppsContainer from "./ui/ShareSocialMediaAppsContainer";
import { Link } from "react-router-dom";


interface UrlDataType {
    clickCount: number;
    clickLimit: number;
    createdAt: string;
    originalUrl: string;
    owner?: string;
    slug: string;
    title?: string;
    _id: string;
}
interface PropsTypes {
    appShareModal: boolean;
    setAppShareModal: React.Dispatch<React.SetStateAction<boolean>>;
    displayCreatedAt: string;
    urlData: UrlDataType;
    favicon: string
    showDetailedStyle?: boolean;
    showHomeDashboard?:boolean;
}

const DashboardCardContent = ({ appShareModal, setAppShareModal, displayCreatedAt, urlData, favicon, showDetailedStyle, showHomeDashboard }: PropsTypes) => {


    return (
        <div className="flex flex-wrap items-start gap-4 w-[70%]  ">
            {
                appShareModal ? <ShareSocialMediaAppsContainer modalOpen={appShareModal} setModalOpen={setAppShareModal} url={import.meta.env.VITE_BASE_URL + urlData.slug} /> : null

            }
            {/* Favicon  */}
            <div className="border border-gray-300 rounded-full p-1.5">
                <img src={favicon} alt="logo" className="w-8 h-8 rounded-full" />
            </div>
            {/* URL Content  */}
            <div className="flex flex-col ">
                {/* Title */}
                <div title={urlData?.title} className={`${showDetailedStyle ? "text-3xl" : "text-xl"} flex flex-wrap font-bold text-gray-900 truncate ${showDetailedStyle ? "max-w-[700px]" : showHomeDashboard? "max-w-[350px]":"max-w-[550px]"}`}>
                    <Link className="hover:underline" to={`/url-stats/${urlData?.slug}`} state={{ urlData: urlData }} >{urlData?.title} </Link>
                </div>
                {/* ShortUrl */}
                <div className="mt-2 text-blue-700 font-bold flex  hover:underline">
                    <a href={`${urlData?.originalUrl}`} target="_blank" rel="noopener noreferrer">
                        {import.meta.env.VITE_BASE_URL+'/'+ urlData?.slug}
                    </a>
                </div>
                {/* Original Url */}
                <div className=" font-semibold text-md flex text-[#383535] font-roboto ">
                    <a href={`${urlData?.originalUrl}`} target="blank" className="hover:underline">{urlData?.originalUrl}</a>
                </div>

                {showDetailedStyle ? <div className='border-1 mt-7 mb-2  border-gray-200'></div> : null}

                {/* Clicks, CreatedAt,  */}
                <div className="flex flex-wrap items-center gap-4 mt-5 text-sm ">
                    {/* Clicks */}
                    <span className="flex flex-wrap items-center gap-1">
                        <ChartNoAxesColumn size={18} />
                        <i className="fas fa-chart-bar" /> {`${urlData?.clickCount} Clicks`}
                    </span>
                    {/* CreatedAt */}
                    <span className="flex flex-wrap items-center gap-1">
                        <Calendar1 size={18} />
                        <i className="fas fa-calendar" />{displayCreatedAt}
                    </span>
                    {/* No Tag */}
                    <span className="flex flex-wrap items-center gap-1">
                        <i className="fas fa-tag" /> No tags
                    </span>
                </div>
            </div>

        </div>
    )
}

export default DashboardCardContent
