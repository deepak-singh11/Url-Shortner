import { useState } from "react";
import axios from "axios";
import ShortURLModal from "@/Components/ShortURLModal";
import {toast} from "react-hot-toast";


export default function ShortLinkCreation({setNewUrlUpdated}) {

  const [form, setForm] = useState({
    originalUrl: "",
    customSlug: "",
    clickLimit: "",
    expiresAt: "",
  });

  const [isModalOpen,setIsModalOpen]=useState(false);
  const [isLoading,setIsLoading]=useState(false);
  const [shortUrl,setShortURL]=useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const handleSubmit = async (e: React.FormEvent) => {
    setIsLoading(true);
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/api/v1/url/create",form,{
        withCredentials:true
      })
      await delay(1000)
      console.log(response?.data);
      if(response.data.shortUrl){
        setShortURL(response.data.shortUrl)
        setIsModalOpen(true);
        setNewUrlUpdated(true);
        toast.success(response?.data?.message);
      
      }else{
        toast.error(response?.data?.message);        
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Error creating URL:", error);
    }
  };

  return (
    <div className=" bg-[#5fa0eb2d] flex justify-center items-center rounded-xl">
      <div className="max-w-md mx-auto my-10 bg-white p-6 shadow border rounded-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">🔗 Create Short URL</h2>
      {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Original Url */}
          <input
            type="url"
            name="originalUrl"
            placeholder="Original URL"
            className="w-full border px-4 py-2 rounded"
            onChange={handleChange}
            required
          />
          {/* Custom Slug */}
          <input
            type="text"
            name="customSlug"
            placeholder="Custom Slug (optional)"
            className="w-full border px-4 py-2 rounded"
            onChange={handleChange}
          />
          {/* Click Limit */}
          <input
            type="number"
            name="clickLimit"
            placeholder="Click Limit (optional)"
            className="w-full border px-4 py-2 rounded"
            onChange={handleChange}
          />
          {/* Expiry Date */}
          <input
            type="datetime-local"
            name="expiresAt"
            placeholder="Expires At (optional)"
            className="w-full border px-4 py-2 rounded"
            onChange={handleChange}
          />
          {/* Submit Button & Loading Button*/}

          { 
            isLoading? <button // isLoading= true-> Show Loader
                      className="w-full bg-blue-600 text-white py-2 rounded"
                      type="button"
                      >
                      <span className="loading loading-spinner loading-xs"></span>
                      </button> 
                    :           
                      <button // isLoading = false-> Show text
                      type="submit"
                      className="w-full bg-blue-600 text-white py-2 rounded"
                      >
                      Create Short URL
                      </button>
          }
          
        </form>
        <ShortURLModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} newShortUrl={shortUrl}/>
        </div>
    </div>
  );
}
