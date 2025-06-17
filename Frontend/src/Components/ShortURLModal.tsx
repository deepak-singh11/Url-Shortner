import { Copy } from 'lucide-react';
import { useEffect, useRef } from "react";
import { ChartNoAxesColumn } from 'lucide-react';
import SocialMediaApps from './ui/SocialMediaApps';

interface ModalOpenTypes {
    isModalOpen: boolean;
    setIsModalOpen:React.Dispatch<React.SetStateAction<boolean>>;
    newShortUrl: string;
}
const ShortURLModal = ({ isModalOpen,setIsModalOpen, newShortUrl, }: ModalOpenTypes) => {

    const modalRef = useRef<HTMLDialogElement>(null);
    useEffect(() => {
        if (isModalOpen) {
            modalRef.current?.showModal();
        }
    }, [isModalOpen]);
    return (
        <div>
            {/* Open the modal using document.getElementById('ID').showModal() method */}
            {/* <button className="btn" onClick={() => modalOpen?(document.getElementById('my_modal_1').showModal()):""}>open modal</button>  */}
            {/* {document.getElementById('my_modal_1').showModal()} */}

            <dialog ref={modalRef} id="my_modal_1" className="modal border">
                <div className="modal-box w-[40%] max-w-5xl p-10">
                    {/* Heading */}
                    <h2 className="font-bold text-2xl mt-3">Your link is ready! 🎉</h2>

                    <p className="my-6">Copy the link below to share it or choose a platform to share it to.</p>

                    <div className="bg-[#5fa0eb2d] flex flex-col justify-center items-center gap-y-5 rounded-lg py-5">
                        {/* Link */}
                        <h3 className='text-blue-600 font-bold text-xl'>{newShortUrl}</h3>

                        {/*Link Details and Copy  */}
                        <div className='flex gap-5'>
                            {/* Link Button */}
                            <div className='flex justify-center items-center gap-2 border px-3 py-2 bg-white text-blue-600 font-semibold rounded-sm cursor-pointer'>
                                <ChartNoAxesColumn className='' />
                                <span className=''>View Link Details</span>
                            </div>
                            {/* Copy Button */}
                            <div
                                onClick={() => {
                                    if (navigator.clipboard) {
                                        navigator.clipboard.writeText(newShortUrl)
                                            .then(() => {
                                                alert("Link copied to clipboard!");
                                            })
                                            .catch((err) => {
                                                console.error("Failed to copy: ", err);
                                            });
                                    } else {
                                        console.warn("Clipboard not supported.");
                                    }
                                }}
                                className='flex justify-center items-center gap-2 border px-4 py-2 bg-blue-600 text-white font-semibold rounded-sm cursor-pointer hover:bg-blue-700'
                            >
                                <Copy />
                                <span>Copy link</span>
                            </div>
                            
                        </div>
                    </div>
                    <SocialMediaApps/>
                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button onClick={()=>setIsModalOpen(false)} className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>

        </div>
    )
}

export default ShortURLModal
