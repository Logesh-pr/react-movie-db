import React from "react";

//components
import SideBar from "../components/SideBar";
import Banner from "../components/banner";
import Row from "../components/row";

//request_api
import request from "../config/tmdb-api/request";

export default function Home() {
  return (
    <>
      <div className="container mx-auto ease-in-out duration-300">
        <div className=" md:grid  md:grid-cols-5 xl:grid-cols-6 ">
          <SideBar />
          <div className=" h-screen  px-4 md:col-start-2 md:col-end-7  ">
            <Banner />
            <Row
              name="Trending Movies"
              date="release_date"
              title="title"
              categories={request.trendingMovies}
            />
            <Row
              name="Trending Tv Shows"
              date="first_air_date"
              title="name"
              categories={request.trendingTvShows}
            />
            <Row
              name="Top Rated Movies"
              date="release_date"
              title="title"
              categories={request.topRatedMovies}
            />
            <Row
              name="Top Rated Tv Shows"
              date="first_air_date"
              title="name"
              categories={request.topRatedTvShows}
            />
          </div>
        </div>
      </div>
    </>
  );
}
