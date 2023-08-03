import React, { useEffect, useState } from "react";

//image
import placeholder_img from "../assets/imges/No-Image-Placeholder.svg";

//react-router
import { useNavigate } from "react-router-dom";

//redux
import { list } from "../redux/movieDetailsSlice";
import { useDispatch } from "react-redux";

//firebase
import { auth, db } from "../config/firebase/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { doc, getDoc } from "firebase/firestore";

//react-toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function FavoritePage() {
  const [favoriteList, setFavoriteList] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user] = useAuthState(auth);

  useEffect(() => {
    const docReference = doc(db, "userDetails", `${user?.email}`);
    const getUser = async () => {
      await getDoc(docReference)
        .then((res) => {
          setFavoriteList(res.data().savedShows);
        })
        .catch((err) => {
          toast.error(err.message, {
            position: "top-center",
            autoClose: 0,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: 0,
            theme: "dark",
          });
        });
    };
    getUser();
  }, []);

  const movieDetails = (
    id,
    backdrop,
    title,
    overview,
    poster,
    date,
    vote,
    media_type,
    language,
    adult
  ) => {
    dispatch(
      list({
        id: id,
        backdrop: backdrop,
        title: title,
        overview: overview,
        poster: poster,
        date: date,
        vote: vote,
        media_type: media_type,
        language: language,
        adult: adult,
      })
    );

    navigate("/movie_details");
  };

  return (
    <div className="bg-secondary  container mx-auto px-3">
      {favoriteList === null ? (
        <h4 className="font-semibold  text-[22px] md:text-[28px] xl:text-[32px]">
          Add a movie to favorite
        </h4>
      ) : (
        <>
          <h4 className="font-semibold text-[22px] md:text-[28px] xl:text-[32px]">
            Favorite list
          </h4>
          <div className="w-[150px] h-[4px] bg-primary mt-2"></div>
          <div className=" mt-12 grid justify-center items-center grid-cols-2 gap-6 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 overflow-hidden">
            {favoriteList?.map((result, id) => {
              return (
                <div
                  key={id}
                  className="group mx-auto relative  hover:scale-110  ease-in-out duration-300 overflow-hidden col-span-1"
                  onClick={() => {
                    movieDetails(
                      result.movieId,
                      result.movieBackdrop,
                      result.movieTitle,
                      result.movieOverview,
                      result.moviePoster,
                      result.movieDate,
                      result.movieVote,
                      result.movieMedia_type,
                      result.movieLanguage,
                      result.movieAdult
                    );
                  }}
                >
                  <img
                    src={`${
                      result.moviePoster === null
                        ? placeholder_img
                        : `https://image.tmdb.org/t/p/w200${result.moviePoster}`
                    }`}
                    alt=""
                    className="mx-auto overflow-hidde"
                  />
                  <div className="opacity-0 group-hover:opacity-100 absolute bottom-0 left-0 w-full h-[90px] bg-black p-3">
                    <h6 className="text-[13px] font-semibold md:text-[15px] w-[80%] overflow-hidden  whitespace-nowrap  text-ellipsis">
                      {result.movieTitle}
                    </h6>
                    <p className="text-[13px] md:text-[15px] mt-2 text-gray-400">
                      {result.movieDate.slice(0, 4)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </>
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
