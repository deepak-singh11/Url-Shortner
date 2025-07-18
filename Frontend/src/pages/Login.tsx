// pages/Login.tsx
import { updateUserData, updateLocation, updateTokenExpiry } from "@/redux/slices/userSlice";
import AuthLayout from "../Components/AuthLayout";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";

type LoginDataType = {
    email: string;
    password: string;
}

export default function Login() {

    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loginData, setLoginData] = useState<LoginDataType>({ email: "", password: "" });

    useEffect(() => {

        const params = new URLSearchParams(location.search);
        const token = params.get("token");
        const username = params.get("username");
        const email = params.get("email");
        const profileImage = params.get("profileImage");
        const joinedAt = params.get("joinedAt");
        if (token && email) {

            dispatch(updateUserData({ username, email, profileImage, joinedAt }));
            dispatch(updateTokenExpiry({ expiresAt: Date.now() + 3600000 }));
            navigate('/home');

            //   clean URL
            navigate("/login", { replace: true });
        }
    }, [dispatch, navigate, location.search]);

    // Submit-Handler
    const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/user/signin`, loginData, {
                withCredentials: true
            });
            if (response.status == 200) {
                toast.success("Logged in successfully")
                dispatch(updateUserData(response.data.userData));
                dispatch(updateTokenExpiry(response.data.tokenExpiry));
                dispatch(updateLocation("home"));
                navigate("/home")
                setLoginData({ email: "", password: "" });
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                // Now TypeScript knows 'error' is an AxiosError
                toast.error(error.response?.data?.message || "An API error occurred.");
                console.log("Axios error during login request:", error.response?.data);
            } else {
                // Handle generic JavaScript errors (e.g., network issues before request was sent)
                toast.error("An unexpected error occurred.");
                console.log("Generic error during login request:", error);
            }
        }
    }

    // Google Login Handler
    const googleLoginHandler = async () => {
        window.location.href = "http://localhost:3000/auth/google?mode=login";
    }

    return (
        <AuthLayout imageUrl={"/login_image.png"} imageDescription="Analyze your links and QR Codes as easily as creating them">
            <div className="w-full max-w-md">
                <h2 className="text-2xl font-bold mb-2">Log in and start sharing</h2>

                <p className="mb-4 text-sm">
                    Don’t have an account?{" "}
                    <Link to={"/signup"} className="text-blue-600 font-medium">Sign up</Link>
                </p>

                <div className="space-y-3">
                    <button
                        onClick={googleLoginHandler}
                        className="w-full border px-4 py-2 rounded flex items-center justify-center gap-2 cursor-pointer">
                        <span><img src="/google-icon.png" className="w-[25px]" alt="" /></span> Continue with Google
                    </button>

                </div>

                <div className="divider">OR</div>


                <form className="space-y-4" onSubmit={submitHandler}>
                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Email</label>
                        <input value={loginData.email} type="email" className="w-full border px-4 py-2 rounded" onChange={(e) => setLoginData({ ...loginData, email: e.target.value })} />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Password</label>
                        <input value={loginData.password} type="password" className="w-full border px-4 py-2 rounded" onChange={(e) => setLoginData({ ...loginData, password: e.target.value })} />
                    </div>

                    {/* Login */}
                    <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">
                        Log in
                    </button>

                    {/* Forgot Password */}
                    <div className="text-right text-sm">
                        <a href="#" className="text-blue-600">Forgot your password?</a>
                    </div>
                </form>
            </div>
        </AuthLayout>
    );
}
