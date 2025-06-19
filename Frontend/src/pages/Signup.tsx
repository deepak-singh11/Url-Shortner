// pages/Signup.tsx
import AuthLayout from "../Components/AuthLayout";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateUserData,updateTokenExpiry, updateLocation} from "@/redux/slices/userSlice";
import { toast } from 'react-hot-toast';
import { useState } from "react";
import axios from "axios";

interface SignupDataType {
    username: string;
    email: string;
    password: string;
}


export default function Signup() {

    const dispatch=useDispatch();
    const navigate = useNavigate();
    const [signupData, setSignupData] = useState<SignupDataType>({ username: "", email: "", password: "" })

    const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/user/signup`, signupData, {
                withCredentials: true
            });

            if (response.status == 200) {
                toast.success(response?.data?.message);
                setSignupData({ username: "", email: "", password: "" });
                dispatch(updateUserData(response.data.userData));
                dispatch(updateTokenExpiry(response.data.tokenExpiry));
                dispatch(updateLocation("home"));
                navigate("/home")

            }
            console.log(response?.data);

        } catch (error) {
            // Now TypeScript knows 'error' is an AxiosError
            if (axios.isAxiosError(error)) {
                toast.error(error?.response?.data?.message || "An API error occurred.")
            }
            else {
                // Handle generic JavaScript errors (e.g., network issues before request was sent)
                toast.error("An unexpected error occurred.");
                console.log("Generic error during login request:", error);
            }
        }
    }


    return (
        <AuthLayout imageUrl={`/signup_image.png`} imageDescription="Power your links, QR Codes, and landing pages with Bitly's Connections Platform.">
            <div className="w-full max-w-md">
                <h2 className="text-2xl font-bold mb-2">Create your account</h2>
                <p className="mb-4 text-sm">
                    Already have an account?{" "}
                    <Link to={"/"} className="text-blue-600 font-medium">Log in</Link>
                </p>

                <div className="space-y-3">
                    <button className="w-full border px-4 py-2 rounded flex items-center justify-center gap-2 cursor-pointer">
                        <span><img src="/google-icon.png" className="w-[25px]" alt="" /></span> Continue with Google
                    </button>
                </div>

                <div className="divider">OR</div>   


                <form className="space-y-4" onSubmit={submitHandler}>
                    <div>
                        <label className="block text-sm font-medium mb-1">Username</label>
                        <input value={signupData.username} type="text" className="w-full border px-4 py-2 rounded" onChange={(e) => setSignupData({ ...signupData, username: e.target.value })} />
                    </div>
                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Email</label>
                        <input value={signupData.email} type="email" className="w-full border px-4 py-2 rounded" onChange={(e) => setSignupData({ ...signupData, email: e.target.value })} />
                    </div>
                    {/* Password */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Password</label>
                        <input value={signupData.password} type="password" className="w-full border px-4 py-2 rounded" onChange={(e) => setSignupData({ ...signupData, password: e.target.value })} />
                    </div>
                    <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">
                        Create free account
                    </button>
                    <p className="text-xs text-gray-500 mt-2">
                        By creating an account, you agree to Bitly’s{" "}
                        <a href="#" className="text-blue-600">Terms of Service</a>,{" "}
                        <a href="#" className="text-blue-600">Privacy Policy</a> and{" "}
                        <a href="#" className="text-blue-600">Acceptable Use Policy</a>.
                    </p>
                </form>
            </div>
        </AuthLayout>
    );
}
