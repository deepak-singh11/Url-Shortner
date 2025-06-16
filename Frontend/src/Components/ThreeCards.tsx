import { Button } from "../Components/ui/button"

const   ThreeCards = () => {
  return (
    <div className="flex gap-6 mb-8 ">
      {/* Link dashboard */}
      <div className="w-1/3 bg-white p-4 rounded-xl shadow hover:shadow-md flex justify-center">
        <div className=" w-[50%] flex justify-center bg-[#5fa0eb2d]">
          <img className="w-[90%]" src="/dashboard_links.png" alt="" />
        </div>
        <div className=" w-[50%] flex flex-col justify-center items-center">
          <div className="text-lg font-bold">Make it short</div>
          <Button
            variant="outline"
            className="mt-4 text-blue-600 cursor-pointer hover:scale-105 hover:bg-[#5fa0eb2d] hover:text-blue-700 hover:font-bold"
          >
            Go to links
          </Button>
        </div>
      </div>

      {/* QR dashboard */}
      <div className="w-1/3 bg-white p-4 rounded-xl shadow hover:shadow-md flex justify-center">
        <div className=" w-[50%] flex justify-center bg-[#5fa0eb2d]">
          <img className="w-[90%]" src="/dashboard_qrcs.png" alt="" />
        </div>
        <div className=" w-[50%] flex flex-col justify-center items-center">
          <div className="text-lg font-bold">Make it scannable</div>
          <Button
            variant="outline"
            className="mt-4 text-blue-600 cursor-pointer hover:scale-105 hover:bg-[#5fa0eb2d] hover:text-blue-700 hover:font-bold "
          >
            Go to Codes
          </Button>
        </div>
      </div>

      {/* Page Dashboard*/}
      <div className="w-1/3  bg-white p-4 rounded-xl shadow hover:shadow-md flex justify-center">
        <div className="w-[50%] flex justify-center bg-[#5fa0eb2d]">
          <img className="w-[90%]" src="/dashboard_lib.png" alt="" />
        </div>
        <div className="w-[50%] flex flex-col justify-center items-center">
          <div className="text-lg font-bold">Make a page</div>
          <Button
            variant="outline"
            className="mt-4 text-blue-600 cursor-pointer hover:scale-105 hover:bg-[#5fa0eb2d] hover:text-blue-700 hover:font-bold"
          >
            Go to Pages
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ThreeCards;
