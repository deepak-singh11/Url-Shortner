import { Share2 } from 'lucide-react';

const ShareButton = ({setAppShareModal}:{setAppShareModal:React.Dispatch<React.SetStateAction<boolean>>}) => {
    return (
        <div
            onClick={() => setAppShareModal(true)}
            className="px-2 py-1 border border-gray-300 w-full rounded flex justify-center  gap-2 hover:bg-gray-100 h-fit cursor-pointer ">
            <div className="flex justify-center items-center">
                <Share2 size={20} />
            </div>
            Share
        </div>
    )
}

export default ShareButton
