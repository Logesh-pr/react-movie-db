import React, { useEffect, useState } from "react";

//axios library
import axios from "axios";

//react_icons
import { IoMdClose } from "react-icons/io";

//react-toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Trailer({ type, id, close }) {
  const [key, setKey] = useState([]);
  useEffect(() => {
    axios
      .get(
        `
        https://api.themoviedb.org/3/${type}/${id}/videos?api_key=${
          import.meta.env.VITE_TMDB_API_KEY
        }`
      )
      .then((res) => {
        let index = res.data.results.find(
          (trailer) => trailer.type === "Trailer"
        );
        setKey(index.key);
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
  });

  const closeTrailer = () => {
    close(false);
  };

  return (
    <div className="z-50 absolute  w-full h-full top-0 left-0 trailer_container flex justify-center items-center">
      <div className="w-[80%] mx-auto max-w-[800px] max-h-[480px] relative flex justify-center items-center">
        <iframe
          src={`https://www.youtube.com/embed/${key}`}
          title="YouTube video player"
          width="800"
          height="480"
          allowFullScreen
          frameBorder="1"
          allow="accelerometer; autoplay; clipboard-write;  gyroscope; picture-in-picture; web-share"
        ></iframe>

        <IoMdClose
          className="absolute z-50 -top-[30px] -right-[20px] cursor-pointer  w-[30px] h-[30px] bg-primary rounded-full "
          onClick={closeTrailer}
        />
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
