import { useState,useEffect, useRef } from "react"
import SocialMediaApps from "./SocialMediaApps";

interface ModalOpenType{
    modalOpen:boolean;
    setModalOpen:React.Dispatch<React.SetStateAction<boolean>>;
    url:string;
}

const ShareSocialMediaAppsContainer = ({modalOpen,setModalOpen,url}:ModalOpenType) => {

    const myDialogRef = useRef<HTMLDialogElement>(null);
    const [copyButtonText,setCopyButtonText]=useState("Copy");
    
    
    useEffect(() => {

        if (modalOpen) {
            myDialogRef.current?.showModal();
        }
    },[modalOpen]);
    console.log(modalOpen)
    return (
        (modalOpen?
        <div>            
            <dialog ref={myDialogRef} id="my_modal_3" className="modal">
                <div className="modal-box  border ">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button onClick={()=>setModalOpen(false)} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h3 className="font-bold text-2xl ">Share your Shortly Link!</h3>
                    <div className="mt-7">
                        <SocialMediaApps/>
                    </div>
                    <div className="border px-2 py-2 mt-10 rounded flex justify-between items-center ">
                        {url}
                        <button onClick={()=>{navigator.clipboard.writeText(url); setCopyButtonText("Copied")}} className="border bg-gray-200 px-2 py-1 rounded cursor-pointer">{copyButtonText}</button>
                    </div>
                </div>
            </dialog>
        </div>
        :
        null)
    );


}

export default ShareSocialMediaAppsContainer
