import { Pencil } from 'lucide-react';

const EditButton = ({slug}:{slug:string}) => {
    return (
        <div onClick={() => navigator.clipboard.writeText(`${import.meta.env.VITE_BASE_URL}${slug}`)}
            className="px-3 text-black py-1  border border-gray-300 w-full rounded flex justify-center items-center gap-2 hover:bg-gray-100 h-fit cursor-pointer">
            <div className="flex justify-center items-center">
                <Pencil size={20} />
            </div>
            Edit
        </div>
    )
}

export default EditButton
