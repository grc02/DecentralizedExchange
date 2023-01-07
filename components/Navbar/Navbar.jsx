import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import Style from "./Navbar.module.css";
import images from "../../assets";
import { Model, TokenList } from "../index";

const Navbar = () => {
  const menuItems = [
    {
      name: "Swap",
      link: "/",
    },
    {
      name: "Tokens",
      link: "/",
    },
    {
      name: "Pools",
      link: "/",
    },
  ];
  const [openModel, setOpenModel] = useState(false);
  const [openTokenBox, setOpenTokenBox] = useState(false);

  return (
    <div className={Style.Navbar}>
      <div className={Style.NavbarBox}>
        <div className={Style.NavbarBoxLeft}>
          {/* // Logo Image */}
          <div className={Style.NavbarBoxLeftImage}>
            <Image src={images.uniswap} alt="logo" width={50} height={50} />
          </div>
          {/* // Menu */}
          <div className={Style.NavbarBoxLeftMenu}>
            {menuItems.map((el, i) => (
              <Link key={i + 1} href={{ pathname: `${el.name}` }}>
                <p className={Style.NavbarBoxLeftMenuItem}>{el.name}</p>
              </Link>
            ))}
          </div>
        </div>
        <div className={Style.NavbarBoxRight}>Right</div>
      </div>
    </div>
  );
};

export default Navbar;
