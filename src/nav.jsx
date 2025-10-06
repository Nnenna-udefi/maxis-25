import React from "react";
import { useState, useEffect } from "react";
import { useRef } from "react";
import { Menu, X } from "lucide-react";

const navItems = [
  { id: 1, text: "Home", href: "/" },
  { id: 2, text: "Agenda", href: "/agenda" },
];
const Nav = () => {
  const [nav, showNav] = useState(false);
  const navRef = useRef < HTMLDivElement > null;
  //   const pathname = usePathname();

  const handleNav = () => {
    showNav((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    if (navRef.current && !navRef.current.contains(event.target)) {
      showNav(false);
    }
  };

  useEffect(() => {
    if (nav) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [nav]);
  return (
    <div className="text-white ">
      <div className="flex bg-[#1c2028] justify-between md:text-lg text-base p-6 md:px-12">
        <h1 className="text-2xl">Maxis 25</h1>

        <div>
          <ul className="gap-10 text-xl hidden md:flex">
            {navItems.map((items) => {
              // const isActive = pathname === items.href;
              return (
                <li
                  key={items.id}
                  // className={`${isActive ? `border-b` : `border-none`}`}
                >
                  {" "}
                  <a href={items.href}>{items.text}</a>
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
          <ul className="space-y-[48px] bg-black text-white pl-2 mx-3 pt-[40px]">
            {navItems.map((items) => {
              // const isActive = pathname === items.href;
              return (
                <li key={items.id}>
                  {" "}
                  <a href={items.href}>{items.text}</a>
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
