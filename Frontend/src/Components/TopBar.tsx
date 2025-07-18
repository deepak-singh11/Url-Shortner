import { Link, useNavigate } from 'react-router-dom';
import { Bell } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { updateUserData } from '@/redux/slices/userSlice';
import { useSelector } from 'react-redux';

const TopBar = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    // @ts-expect-error state type definition
    const { userData } = useSelector(state => state.user);
    const userProfileImage = userData?.profileImage;

    const profileImage = userProfileImage || null;
    const logoutHandler = () => {
        console.log("handler reached");
        dispatch(updateUserData(null));
        navigate("/");
    }
    return (
        <div className="navbar bg-base-100 shadow-sm flex justify-between    ">
            {/* Logo */}
            <div className="w-[60%] ">
                <Link to={"/home"} className="btn btn-ghost font-bold text-2xl">Shortly</Link>
            </div>

            {/* Search, Upgrade and Profile */}
            <div className="flex w-[30%] justify-around ">

                {/* Dashboard And Profile */}

                {/* Dashboard */}
                <div onClick={() => navigate("/dashboard")} className='flex items-center justify-center px-3 rounded hover:bg-[#5fa0eb2d]'>
                    <Link to={"#"} className='font-semibold  text-lg'>Dashboard </Link>
                </div>
                {/* Plans and Servicec */}
                <div className='flex items-center px-2 rounded hover:bg-[#5fa0eb2d]'>
                    <Link to={"#"} className='font-semibold  text-lg'>Plans & Services </Link>
                </div>
                {/* Notification */}
                <div className='flex hover: hover:rounded-full p-2 hover:bg-[#5fa0eb2d]'>
                    <button onClick={() => navigate("/dashboard")} className="  cursor-pointer">
                        <Bell size={25} />
                    </button>
                </div>

                {/* Profile */}
                <div className="dropdown dropdown-end flex justify-between items-center ">

                    {/* Profile */}
                    <div tabIndex={0} role="button" className="btn w-[45px] btn-ghost btn-circle avatar">
                        <div className=" rounded-full border">
                            <img
                                alt="Tailwind CSS Navbar component"
                                src={profileImage}

                            />
                        </div>
                    </div>
                    {/* DropDown List */}
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-32 w-52 p-2 shadow">
                        <li>
                            <Link to={"/profile"} className="justify-between text-sm">
                                Profile
                                <span className="badge">New</span>
                            </Link>
                        </li>
                        {/* <li ><a>Settings</a></li> */}
                        <li onClick={() => logoutHandler()}>
                            <Link className="justify-between text-sm" to={"#"}>Logout</Link>
                        </li>
                    </ul>
                </div>



            </div>
        </div>
    )
}

export default TopBar
