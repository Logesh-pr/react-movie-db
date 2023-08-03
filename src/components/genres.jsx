import React, { useEffect, useState } from "react";

//react-router
import { Link, useNavigate } from "react-router-dom";

//redux

import { id } from "../redux/genresSlice";
import { useDispatch } from "react-redux";

//axios
import axios from "axios";

//request_api
import request from "../config/tmdb-api/request";

export default function Genres({ navBar }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [genresData, getGenresData] = useState([]);

  useEffect(() => {
    axios
      .all([axios.get(request.movieGenres), axios.get(request.tvGenres)])
      .then(
        axios.spread((...genres) => {
          getGenresData([...genres[0].data.genres, ...genres[1].data.genres]);
        })
      );
  }, []);

  const genres = genresData.reduce((initialArr, current) => {
    let result = initialArr.find((item) => item.id === current.id);

    if (result) {
      return initialArr;
    } else return initialArr.concat([current]);
  }, []);

  const genresId = (movieId, name) => {
    dispatch(id({ newId: movieId, newName: name }));
    navigate("/genres");

    navBar(false);
  };

  const navLink = document.getElementsByTagName("li");
  let nav = Array.from(navLink);
  nav.forEach((link) => {
    link.addEventListener("click", () => {
      document.querySelector(".active")?.classList.remove("active");
      link.classList.add("active");
    });
  });

  return (
    <div className="mt-4 md:mt-0 w-full ">
      <h5 className="px-5 font-medium text-gray-500 text-center md:text-start">
        Genres
      </h5>
      <ul
        className="mt-6 flex flex-col gap-y-5 lg:gap-y-7 justify-center items-center
      md:items-start ease-in-out duration-300  overflow-x-hidden"
      >
        {genres.map((menu, id) => {
          return (
            <li
              key={id}
              className="  md:w-[90%]  "
              onClick={() => {
                genresId(menu.id, menu.name);
              }}
            >
              <Link className="  flex justify-center md:justify-start items-center gap-6 cursor-pointer px-5 py-2  ease-in-out duration-200 text-[16px] font-medium  text-white">
                {menu.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
