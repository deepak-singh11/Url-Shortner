import { useState } from "react";
import { Copy } from 'lucide-react';

interface SlugType{
    slug:string;
}   
const CopyButton = ({slug}:SlugType) => {
    const [copyButtonText, setCopyButtonText] = useState("Copy")

    const copyButtonTextHandler = () => {
        setCopyButtonText("Copied");
        setTimeout(() => {
            setCopyButtonText("Copy");
        }, 3000)
    }

    return (
        <div onClick={() => {
            navigator.clipboard.writeText(`${import.meta.env.VITE_BASE_URL}/${slug}`);
            copyButtonTextHandler();
        }}
            className="px-3 py-1  border-gray-300 border bg-gray-200 w-full rounded flex justify-center items-center gap-2 hover:bg-gray-300 h-fit cursor-pointer">
            <div className="flex flex-wrap justify-center items-center h-fit">
                <Copy size={20} />
            </div>
            {copyButtonText}
        </div>
    )
}

export default CopyButton
