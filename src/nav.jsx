import React from "react";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  { id: 1, text: "Home", href: "/" },
  { id: 2, text: "Agenda", href: "/agenda" },
];
const Nav = () => {
  const [nav, showNav] = useState(false);
  const location = useLocation();

  const handleNav = () => {
    showNav((prev) => !prev);
  };

  return (
    <div className="text-white ">
      <div className="flex bg-[#1c2028] justify-between md:text-lg text-base p-6 md:px-12">
        <h1 className="text-2xl md:text-4xl font-unica-one">Maxis 25'</h1>

        <div>
          <ul className="gap-10 text-xl hidden md:flex">
            {navItems.map((items) => {
              const isActive = location.pathname === items.href;
              return (
                <li
                  key={items.id}
                  className={`${isActive ? `border-b` : `border-none`}`}
                >
                  {" "}
                  <Link to={items.href}>{items.text}</Link>
                </li>
              );
            })}
          </ul>
        </div>
        <div
          onClick={handleNav}
          className="cursor-pointer md:hidden block pr-[10px]"
        >
          <Menu />
        </div>
      </div>
      {nav && (
        <div className="fixed w-[300px] inset-0 bg-black cursor-pointer bg-opacity-10 backdrop-blur-sm z-10">
          <div
            className="absolute top-4 right-4 cursor-pointer"
            onClick={handleNav}
          >
            <X />
          </div>
          <h1 className="text-2xl pt-6">Maxis 25</h1>
          <ul className="space-y-[60px] bg-black text-left text-lg text-white pl-2 mx-3 pt-[60px]">
            {navItems.map((items) => {
              const isActive = location.pathname === items.href;
              return (
                <li
                  key={items.id}
                  className={`${isActive ? `border-b w-fit` : `border-none`}`}
                >
                  {" "}
                  <Link to={items.href}>{items.text}</Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Nav;
