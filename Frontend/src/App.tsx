import { Routes,Route, Navigate, useNavigate } from "react-router-dom";
import { updateUserData } from "./redux/slices/userSlice";
import { updateTokenExpiry} from "./redux/slices/userSlice";
import { useDispatch } from "react-redux";
import Dashboard from "./pages/Dashboard";
import { useSelector } from "react-redux";
import { Toaster } from 'react-hot-toast';
import URLStats from "./pages/URLStats";
import Profile from './pages/Profile';
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { useEffect} from "react";
import Home from "./pages/Home";
import QRCodePage from "./pages/QRCodePage";

export default function App() {
  // @ts-expect-error state type declare later, btw this error because store is not types yet.
  const { tokenExpiry,userData, isLoading} = useSelector(state => state.user);
  const expiresAt = tokenExpiry?.expiresAt;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
   useEffect(() => {

    if (userData && expiresAt) {
      const timeout = setTimeout(() => {
        console.log("is initiated");
        dispatch(updateUserData(null));
        dispatch(updateTokenExpiry(null));
        navigate("/");
      }, expiresAt - Date.now());

      return () => clearTimeout(timeout);
    } 

  }, [userData,expiresAt,dispatch, navigate])


  if(isLoading)
    return <div className="w-screen h-screen blur-md font-bold text-2xl flex justify-center items-center">Loading.....</div>
  
  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/" element={userData ? <Navigate to={"/home"} /> : <Login />} />
        <Route path="/signup" element={userData ? <Navigate to={"/home"} /> : <Signup />} />
        <Route path="/home" element={userData ? <Home /> : <Navigate to={"/"} />} />
        <Route path="/dashboard" element={userData ? <Dashboard /> : <Navigate to={"/"} />} />
        <Route path="/url-stats/:slug" element={userData ? <URLStats /> : <Navigate to={"/"} />}></Route>
        <Route path="/profile" element={<Profile/>}></Route>
         <Route path="/QRCodePage" element={<QRCodePage/>}></Route>
      </Routes>
    </>
  );
}