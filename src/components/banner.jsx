import React, { useEffect, useState } from "react";

// Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

//  Swiper styles
import "swiper/css";

//api file
import requests from "../config/tmdb-api/request";

//axios
import axios from "axios";

//react-toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Banner() {
  const [banner, setBanner] = useState([]);

  useEffect(() => {
    axios
      .get(requests.nowPlaying)
      .then((res) => setBanner(res.data.results))

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
  }, []);

  return (
    <div className="container mt-4 mx-auto ">
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
        className="  lg:h-[500px] ease-in-out duration-300"
      >
        {banner
          .filter((element, elementId) => elementId < 10)
          .map((banner, id) => {
            return (
              <SwiperSlide className="relative " key={id}>
                <img
                  src={`https://image.tmdb.org/t/p/original${banner.backdrop_path}`}
                  alt={banner.title}
                  className="w-full h-full object-cover object-top overflow-hidden"
                />
                <div className="absolute top-0 right-0  w-full h-full bg-gradient-to-t from-black flex flex-col gap-y-2 md:gap-y-4 lg:gap-y-6 items-start justify-end pb-4 px-4 md:px-6 md:pb-8">
                  <h5 className="w-56 md:w-full font-semibold md:font-extrabold text-lg md:text-[24px] lg:text-[28px] leading-6 text-primary">
                    {banner.title}
                  </h5>
                  <p className="w-[70%] h-[20px] text-[13px] md:text-[15px] lg:text-[17px] overflow-hidden  whitespace-nowrap  text-ellipsis">
                    {banner.overview}
                  </p>
                </div>
              </SwiperSlide>
            );
          })}
      </Swiper>
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
