import React, { useEffect, useState } from "react";

//axios library
import axios from "axios";

//react_router
import { useNavigate } from "react-router";

//redux
import { useSelector } from "react-redux";
import { list } from "../redux/movieDetailsSlice";
import { useDispatch } from "react-redux";

//image
import placeholder_img from "../assets/imges/No-Image-Placeholder.svg";

//react-toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Result_page() {
  const searchTitle = useSelector((state) => state.persistedReducer.search);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    axios(`
   https://api.themoviedb.org/3/search/multi?api_key=${
     import.meta.env.VITE_TMDB_API_KEY
   }&query=${searchTitle.value.title}`)
      .then((res) => setSearchResult(res.data.results))
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
  }, [searchTitle]);

  window.addEventListener("beforeunload", () => {
    navigate("/");
  });

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
    <div className="mt-6 container mx-auto px-2 mb-12">
      <div className="grid justify-center items-center grid-cols-2 gap-6 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6  overflow-hidden">
        {searchResult === null ? (
          <h1 className="text-white ">
            There are no movies that matched your query.
          </h1>
        ) : (
          <>
            {searchResult.map((result, id) => {
              return (
                <div
                  key={id}
                  className="group mx-auto relative  hover:scale-110  ease-in-out duration-300 overflow-hidden col-span-1"
                  onClick={() => {
                    movieDetails(
                      result.id,
                      result.backdrop_path,
                      `${
                        result.media_type === "movie"
                          ? result.title
                          : result.name
                      }`,
                      result.overview,
                      result.poster_path,
                      `${
                        result.media_type == "tv"
                          ? result.first_air_date
                          : result.release_date
                      }`,
                      result.vote_average,
                      result.media_type,
                      result.original_language,
                      result.adult
                    );
                  }}
                >
                  <img
                    src={`${
                      result.poster_path === null
                        ? placeholder_img
                        : `https://image.tmdb.org/t/p/w200${result.poster_path}`
                    }`}
                    alt=""
                    className="mx-auto overflow-hidde"
                  />
                  <div className="opacity-0 group-hover:opacity-100 absolute bottom-0 left-0 w-full h-[90px] bg-black p-3">
                    <h6 className="text-[13px] font-semibold md:text-[15px] w-[80%] overflow-hidden  whitespace-nowrap  text-ellipsis">
                      {`${
                        result.media_type === "movie"
                          ? result.title
                          : result.name
                      }`}
                    </h6>
                    <p className="text-[13px] md:text-[15px] mt-2 text-gray-400">
                      {`${
                        result.media_type == "tv"
                          ? result.first_air_date
                          : result.release_date
                      }`.slice(0, 4)}
                    </p>
                  </div>
                </div>
              );
            })}
          </>
        )}
      </div>
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
