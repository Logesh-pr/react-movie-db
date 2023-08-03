import React, { useEffect, useState } from "react";

//redux
import { useSelector } from "react-redux";

//react_router_dom
import { Link, useNavigate } from "react-router-dom";

//react-icon
import { IoMdPlayCircle } from "react-icons/io";
import { AiOutlineHeart } from "react-icons/ai";
import { AiFillHeart } from "react-icons/ai";

//Components
import Cast from "../components/cast";
import Trailer from "../components/trailer";

//firebase
import { auth, db } from "../config/firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { arrayUnion, doc, updateDoc, getDoc } from "firebase/firestore";

//image
import placeholder_img from "../assets/imges/No-Image-Placeholder.svg";

//react-toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function MovieDetails() {
  const movieDetails = useSelector((state) => state.persistedReducer.movie);
  const [user] = useAuthState(auth);
  const [favorite, setFavorite] = useState(false);
  const [trailer, setTrailer] = useState(false);
  const navigate = useNavigate();
  const borderColor = [];

  useEffect(() => {
    const docReference = doc(db, "userDetails", `${user?.email}`);
    const getUser = async () => {
      await getDoc(docReference)
        .then((res) => {
          res.data().savedShows.filter((data) => {
            if (data.movieId === movieDetails.value.id) {
              setFavorite(true);
            }
          });
        })
        .catch((err) => console.log(err.message));
    };
    getUser();
  });

  if (movieDetails.value.vote <= 5) {
    borderColor.push("text-red-500");
  } else if (movieDetails.value.vote <= 7) {
    borderColor.push("text-yellow-500");
  } else {
    borderColor.push("text-green-500");
  }

  const trailer_container = () => {
    setTrailer(!trailer);
  };

  window.addEventListener("beforeunload", () => {
    navigate("/");
  });

  const addShow = async () => {
    const saveMovie = doc(db, "userDetails", `${user?.email}`);
    await updateDoc(saveMovie, {
      savedShows: arrayUnion({
        movieId: movieDetails.value.id ? movieDetails.value.id : "",
        movieBackdrop: movieDetails.value.backdrop
          ? movieDetails.value.backdrop
          : "",
        movieTitle: movieDetails.value.title ? movieDetails.value.title : "",
        movieOverview: movieDetails.value.overview
          ? movieDetails.value.overview
          : "",
        moviePoster: movieDetails.value.poster ? movieDetails.value.poster : "",
        movieDate: movieDetails.value.date ? movieDetails.value.date : "",
        movieVote: movieDetails.value.vote ? movieDetails.value.vote : "",
        movieMedia_type: movieDetails.value.media_type
          ? movieDetails.value.media_type
          : "",
        movieLanguage: movieDetails.value.language
          ? movieDetails.value.language
          : "",
        movieAdult: movieDetails.value.adult ? movieDetails.value.adult : "",
      }),
    });
    toast.success("Added to favorite list", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: 0,
      theme: "dark",
    });
  };

  const storeMovie = async () => {
    favorite ? deletShow() : addShow();
  };

  window.addEventListener("beforeunload", () => {
    navigate("/");
  });
  return (
    <div className="bg-black">
      <div className="w-full h-[60vh] relative ">
        <img
          src={`${
            movieDetails.value.backdrop === null
              ? placeholder_img
              : `https://image.tmdb.org/t/p/original${movieDetails.value.backdrop}`
          }`}
          alt=""
          className="w-full h-full object-cover object-to overflow-hidden "
        />
        <div className="absolute w-full h-full inset-0  bg_gradient "></div>
      </div>
      <div className="  container mx-auto p-5 relative -top-[250px] md:-top-[250px] 2xl:-top-[300px] grid  grid-cols-2 md:grid-cols-3 xl:grid-cols-4  2xl:grid-cols-6 gap-y-6 md:gap-y-0 md:gap-x-6 justify-center  ease-in-out duration-300">
        <div className="text-center col-span-2 md:col-span-1  2xl:col-start-1 2xl:col-end-3">
          <img
            src={`${
              movieDetails.value.poster === null
                ? placeholder_img
                : `https://image.tmdb.org/t/p/original${movieDetails.value.poster}`
            }`}
            alt={movieDetails.value.title}
            className="w-[250px] md:w-[300px] 2xl:w-[350px] mx-auto"
          />
        </div>

        <div className="col-span-2 md:col-span-2 xl:col-span-3 2xl:col-start-3 2xl:col-end-7">
          <h4 className="text-[24px] font-bold md:text-[30px] lg:text-[32px] xl:text-[34px] text-primary">
            {movieDetails.value.title}
          </h4>

          <p className="mt-4 font-medium text-gray-300  ">
            <span className="font-semibold text-white pe-4 me-3 border-r-2">
              Release Date
            </span>
            {movieDetails.value.date}
          </p>
          <p className="mt-4 font-medium text-gray-300  ">
            <span className="font-semibold text-white pe-4 me-3 border-r-2">
              Original Language
            </span>
            {movieDetails.value.language}
          </p>
          <p className="mt-4 font-medium text-gray-300 text-[15px] xl:text-[16px]">
            <span className="font-semibold text-white pe-4 me-3 border-r-2">
              Media Type
            </span>
            {movieDetails.value.media_type}
          </p>
          <div className="mt-4 font-medium text-gray-300 text-[15px] xl:text-[16px] flex  items-center">
            <div className="font-semibold text-white pe-4 me-3 border-r-2">
              Rating
            </div>

            <div
              className={`${borderColor.join(
                ""
              )} text-[16px] md:text-[18px] font-semibold`}
            >
              {movieDetails.value.vote.toString().slice(0, 3)}
            </div>
          </div>
          <div className="mt-4">
            <h6 className="font-semibold text-white  text-[15px] xl:text-[16px]">
              Overview :
            </h6>
            <p className="mt-2 text-[14px] md:text-[15px]">
              {movieDetails.value.overview}
            </p>
          </div>
          <div className="mt-8 flex flex-wrap justify-start items-center gap-6">
            {user && (
              <div
                className={`  cursor-pointer  px-4 py-2 ${
                  favorite ? "bg-white text-black" : "border text-white"
                }  rounded-lg flex justify-center items-center gap-x-2`}
                onClick={() => {
                  setFavorite(!favorite);
                  storeMovie();
                }}
              >
                <p>
                  {favorite ? (
                    <AiFillHeart className="text-[24px]" />
                  ) : (
                    <AiOutlineHeart className="text-[24px]" />
                  )}
                </p>

                <p className="text-[14px] font-semibold">{`${
                  favorite ? "Added" : "Add"
                } to favorite`}</p>
              </div>
            )}
            <Link
              className=" w-fit flex bg-primary  hover:bg-red-600   justify-center items-center gap-x-2 px-4 py-2 rounded-lg ease-in duration-300"
              onClick={trailer_container}
            >
              <IoMdPlayCircle className="text-[25px]" />
              <p className="font-semibold text-[14px]">Watch Trailer</p>
            </Link>
          </div>

          {movieDetails.value.media_type === "movie" ? (
            <Cast type={"movie"} movieId={movieDetails.value.id} />
          ) : (
            <Cast type={"tv"} movieId={movieDetails.value.id} />
          )}
        </div>
      </div>

      {trailer && (
        <div>
          {movieDetails.value.media_type === "movie" ? (
            <Trailer
              type={movieDetails.value.media_type}
              id={movieDetails.value.id}
              close={setTrailer}
            />
          ) : (
            <Trailer
              type={movieDetails.value.media_type}
              id={movieDetails.value.id}
              close={setTrailer}
            />
          )}
        </div>
      )}
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
    </div>
  );
}
