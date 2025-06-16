// components/AuthLayout.tsx
import React from "react";

interface AuthLayoutProps {
  children: React.ReactNode;
  imageUrl:string;
  imageDescription:string;
}

export default function AuthLayout({ children,imageUrl, imageDescription}: AuthLayoutProps) {
  return (
    <div className="flex h-screen justify-center ">
      {/* Left Form Section */}
      <div className="flex items-center justify-center p-6 flex-[9] ">{children}</div>

      {/* Right Image Section */}
      <div className="hidden md:block bg-[#f3f4f6] w-[50%] flex-[6] ">
        {/* Replace this with your image */}
        <div className="h-full w-full flex justify-center items-center flex-col  gap-8">
            <img className="w-[90%]" src={imageUrl} alt="Login/Signup Logo" />
            <p className="w-[90%] text-xl text-center font-bold">{imageDescription}</p>
        </div>
      </div>
    </div>
  );
}
