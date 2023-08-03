import React from "react";

//compornents
import SideBar from "../components/SideBar";
import Row from "../components/row";

//redux
import { useSelector } from "react-redux";

export default function Genres_page() {
  const genresnewId = useSelector((state) => state.persistedReducer.cat);

  return (
    <div className="container mx-auto ease-in-out duration-300">
      <div className=" md:grid  md:grid-cols-5 xl:grid-cols-6 ">
        <SideBar />
        <div className=" h-screen  px-4 md:col-start-2 md:col-end-7  ">
          <Row
            name={`" ${genresnewId.value.newName} " Movies`}
            date="release_date"
            title="title"
            categories={`https://api.themoviedb.org/3/discover/movie?api_key=${
              import.meta.env.VITE_TMDB_API_KEY
            }&with_genres=${genresnewId.value.newId}`}
          />
          <Row
            name={`" ${genresnewId.value.newName} " Tv Shows`}
            date="first_air_date"
            title="name"
            categories={`https://api.themoviedb.org/3/discover/tv?api_key=${
              import.meta.env.VITE_TMDB_API_KEY
            }&with_genres=${genresnewId.value.newId}`}
          />
        </div>
      </div>
    </div>
  );
}
