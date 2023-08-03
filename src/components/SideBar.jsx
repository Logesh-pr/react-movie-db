import React from "react";

//components
import Genres from "./genres";

export default function SideBar() {
  return (
    <div className="hidden md:block bg-secondary   border-r border-borderColor col-start-1 col-end-1 row-span-6  ">
      <div className=" w-full h-full  mt-8  px-2">
        <Genres />
      </div>
    </div>
  );
}
