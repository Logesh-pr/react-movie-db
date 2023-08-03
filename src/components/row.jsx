import React, { useEffect, useState } from "react";

//axios library
import axios from "axios";

//react-router
import { useNavigate } from "react-router-dom";

//swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css/navigation";

//redux
import { list } from "../redux/movieDetailsSlice";
import { useDispatch } from "react-redux";

//react-toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Row({ name, categories, title, date }) {
  const [movies, setMovies] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(categories)
      .then((res) => {
        setMovies(res.data.results);
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
  }, [categories]);

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
    <div className="container mx-auto mt-12 pb-12">
      <h5 className="font-bold text-lg lg:text-xl">{name}</h5>
      <div className="w-[100px] h-[4px] bg-primary mt-2"></div>
      <div className="mt-8 w-full h-full ">
        <Swiper
          slidesPerView={1}
          centeredSlides={false}
          spaceBetween={40}
          navigation={true}
          breakpoints={{
            340: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
            640: {
              slidesPerView: 3,
              spaceBetween: 20,
            },

            1024: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
            1280: {
              slidesPerView: 5,
              spaceBetween: 20,
            },
            1536: {
              slidesPerView: 6,
              spaceBetween: 20,
            },
            1992: {
              slidesPerView: 7,
              spaceBetween: 20,
            },
          }}
          modules={[Navigation]}
          className="mySwiper ease-in-out duration-300 "
        >
          {movies.map((movie, id) => {
            return (
              <SwiperSlide
                className="group hover:scale-110 w-full h-full relative ease-in-out duration-300 "
                key={id}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie[title]}
                  className="w-full overflow-hidden "
                  onClick={() => {
                    movieDetails(
                      movie.id,
                      movie.backdrop_path,
                      movie[title],
                      movie.overview,
                      movie.poster_path,
                      movie[date],
                      movie.vote_average,
                      movie.media_type,
                      movie.original_language,
                      movie.adult
                    );
                  }}
                />
                <div className="opacity-0 group-hover:opacity-100 group-hover:h-[80px] bg-black  absolute bottom-0 left-0 w-full h-[70px] p-3 z-10  ">
                  <h6 className="text-[13px] font-semibold md:text-[15px] w-[80%] overflow-hidden  whitespace-nowrap  text-ellipsis">
                    {movie[title]}
                  </h6>
                  <p className="text-[13px] md:text-[15px] mt-2 text-gray-400">
                    {movie[date].slice(0, 4)}
                  </p>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
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
