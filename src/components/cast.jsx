import React, { useEffect, useState } from "react";

//axios library
import axios from "axios";

//swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css/navigation";

//icons
import person from "../assets/icons/person.svg";

//react-toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Cast({ type, movieId }) {
  const [cast, setCast] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/${type}/${movieId}/credits?api_key=${
          import.meta.env.VITE_TMDB_API_KEY
        }`
      )
      .then((res) => {
        setCast(res.data.cast);
      })
      .catch((err) => {
        toast.error(err.message, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: 0,
          theme: "dark",
        });
      });
  }, []);

  return (
    <div className="mt-6">
      <h5 className="text-xl font-semibold">Cast</h5>
      <div className=" w-full h-full ">
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
          className="mySwiper ease-in-out duration-300 mt-4"
        >
          {cast.map((cast, id) => {
            return (
              <SwiperSlide className=" ease-in-out duration-300 " key={id}>
                <img
                  src={`${
                    cast.profile_path === null
                      ? person
                      : `https://image.tmdb.org/t/p/original${cast.profile_path}`
                  }`}
                  className="w-[150px] h-[150px] rounded-full object-cover "
                />
                <p className="mt-6 w-[150px]  text-center">{cast.name}</p>
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
