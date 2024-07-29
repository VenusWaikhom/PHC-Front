import React from "react";
import "./NavBar.css";

const NavBar = () => {
  return (
    <div className="NavBar flex content-center justify-between p-10 flex-wrap h-16 text-xl ">
      <div></div>
      <div className="flex content-center justify-center gap-10">
        <a
          href="/"
          className="NavItem flex content-center justify-center flex-wrap cursor-pointer tracking-widest"
        >
          Home
        </a>
        <a
          href="Register"
          className="NavItem flex content-center justify-center flex-wrap cursor-pointer tracking-widest"
        >
          Register
        </a>
        <a
          href="Setting"
          className="NavItem flex content-center justify-center flex-wrap cursor-pointer tracking-widest"
        >
          Setting
        </a>
      </div>
    </div>
  );
};

export default NavBar;
