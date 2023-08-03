import React, { useEffect, useState } from "react";

//logo
import logo from "../assets/logo/Logo.svg";

//icons
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";
import { AiFillHeart } from "react-icons/ai";
import { RiLogoutBoxFill } from "react-icons/ri";
import { BiSolidUpArrow } from "react-icons/bi";
import user_icon from "../assets/icons/user_icon.svg";

//react-router
import { Link, useNavigate } from "react-router-dom";

//redux
import { title } from "../redux/searchSlice";
import { useDispatch } from "react-redux";

//components
import Genres from "./genres";

//react-toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//firebase
import { auth, db } from "../config/firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";

export default function Navbar() {
  const [searchValue, setSearchValue] = useState("");
  const [userName, setUserName] = useState("");
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState(false);
  const [user] = useAuthState(auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchInput = (e) => {
    e.preventDefault();
    dispatch(title({ title: searchValue }));
    navigate("/result");
  };

  useEffect(() => {
    if (user) {
      const docRef = doc(db, "userDetails", `${user?.email}`);
      const getUser = async () => {
        getDoc(docRef).then((res) => {
          setUserName(res.data().userName);
        });
      };
      getUser();
    }
  });

  const logOut = async () => {
    await signOut(auth);
  };
  const accountDetails = () => {
    setMenu(!menu);
  };

  const FavoritePage = () => {
    navigate("/favorite");
    setOpen(false);
    setMenu(false);
  };
  return (
    <>
      <nav className=" container  mx-auto  px-3 py-8 ease-in-out duration-300">
        <div className="relative  md:h-[80px]  grid grid-cols-4 justify-center items-center   lg:grid-cols-5 md:grid-flow-col-dense  ">
          <div className="col-start-1 col-end-3 md:col-span-1 ">
            <Link to="/" className="inline-flex">
              <img src={logo} alt="Logo" className="w-40 lg:w-48" />
            </Link>
          </div>

          <div className="md:hidden col-span-2  inline-flex justify-end items-center text-white  ">
            <div onClick={() => setOpen(!open)}>
              {open ? (
                <IoMdClose className="text-3xl cursor-pointer  " />
              ) : (
                <HiOutlineMenuAlt1 className="text-3xl cursor-pointer " />
              )}
            </div>
          </div>
          <div
            className={` ${
              open ? "right-[0]" : "right-[-100%]"
            }  fixed top-[90px]  w-full h-full py-8 overflow-y-scroll bg-secondary ease-in-out duration-300  flex flex-col  items-center md:static md:h-full md:w-full md:bg-transparent md:top-0 md:overflow-auto md:py-0 md:right-[-100%]  md:duration-0 md:col-start-5 md:col-end-7 md:items-end z-10`}
          >
            <div
              className={` w-full h-full gap-y-6 md:gap-y-0 flex flex-col justify-center  items-center ease-in-out duration-300 ${
                user
                  ? "md:flex-row  md:justify-end md:gap-x-4 md:items-center"
                  : "md:items-end"
              } `}
            >
              {user && (
                <>
                  <img
                    src={`${
                      user.photoURL === null ? user_icon : user.photoURL
                    }`}
                    alt=""
                    className="w-[70px] h-[70px] md:w-[50px] md:h-[50px] rounded-full"
                  />
                  <Link
                    className="flex justify-center items-center gap-x-4 font-semibold cursor-pointer"
                    onClick={accountDetails}
                  >
                    {userName}
                    <BiSolidUpArrow
                      className={`text-[13px] ease-in-out duration-300 ${
                        menu ? "rotate-0" : "rotate-180"
                      } `}
                    />
                  </Link>
                  {menu && (
                    <div className=" md:absolute md:bg-secondary md:top-[80px] md:w-[200px] md:z-50 md:border md:border-gray-700 ease-in-out duration-300 rounded-xl w-[250px]  flex flex-col justify-center items-center   md:py-2 px-6">
                      <p
                        onClick={FavoritePage}
                        className=" w-full py-4  flex justify-center md:justify-start  items-center gap-x-3 text-[16px] md:border-b md:border-gray-700 cursor-pointer"
                      >
                        <AiFillHeart className="text-[17px] " />
                        Favorite list
                      </p>
                      <Link
                        onClick={logOut}
                        className="w-full flex justify-center md:justify-start items-center gap-x-3 text-[15px] text-white   md:text-[14px]  py-4   ease-in-out duration-300   "
                      >
                        <RiLogoutBoxFill className="text-[17px]" />
                        Log out
                      </Link>
                    </div>
                  )}
                </>
              )}

              <div className="flex flex-row justify-center md:justify-end items-center gap-4   ">
                {user ? (
                  <></>
                ) : (
                  <>
                    <Link
                      to={"/accounts/sign-up"}
                      className="text-white px-6 md:px-4 xl:px-6 text-[13px] md:text-[14px] font-medium py-2 border border-primary hover:bg-primary ease-in-out duration-300 rounded-md "
                    >
                      Sign up
                    </Link>
                    <Link
                      to={"/accounts/log-in"}
                      className="text-white px-6  xl:px-6 text-[13px] md:text-[14px] font-medium py-2 border bg-primary hover:bg-red-600 ease-in-out duration-300 border-none rounded-md"
                    >
                      Log in
                    </Link>
                  </>
                )}
              </div>
            </div>
            <div className="md:hidden">
              <Genres navBar={setOpen} />
            </div>
          </div>
          <div className=" mt-4 md:mt-0 md:me-4 col-span-full  md:col-start-2 md:col-end-5 ">
            <form onSubmit={searchInput}>
              <div className="w-full mx-auto md:w-[400px] lg:w-[550px] flex justify-between bg-secondary_gray h-12    rounded-xl ease-in-out duration-300">
                <input
                  type="text"
                  value={searchValue}
                  placeholder="Enter movie titles"
                  className="w-full bg-transparent text-white ms-6 placeholder:text-sm placeholder:text-zinc-600 font-semibold"
                  onChange={(e) => setSearchValue(e.target.value)}
                />
                <button
                  type="submit"
                  className="text-white text-[12px] md:text-[14px] font-semibold tracking-wide px-4 bg-primary hover:bg-red-600 ease-in-out duration-300 h-full rounded-r-lg"
                  onClick={searchInput}
                >
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>
      </nav>
      <ToastContainer
        position="top-center"
        autoClose={0}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
}
