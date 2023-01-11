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
  const [account, setAccounnt] = useState(false);

  return (
    <div className={Style.Navbar}>
      <div className={Style.NavbarBox}>
        {/* //Left SECTION */}
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
        {/* //Middle SECTION */}
        <div className={Style.NavbarBoxMiddle}>
          <div className={Style.NavbarBoxMiddleSearch}>
            <div className={Style.NavbarBoxMiddleSearchImage}>
              <Image src={images.search} alt="search" width={25} height={25} />
            </div>
            {/* //INPUT SECTION */}
            <input type="text" placeholder="Search Token" />
          </div>
        </div>
        {/* //Right SECTION */}
        <div className={Style.NavbarBoxRight}>
          <div className={Style.NavbarBoxRightBox}>
            <div className={Style.NavbarBoxRightImage}>
              <Image src={images.ether} alt="network" width={30} height={30} />
            </div>
            <p>Network name</p>
          </div>

          {account ? (
            <button
              onClick={() => {
                setOpenModel(true);
              }}
            >
              Connect
            </button>
          ) : (
            <button
              onClick={() => {
                setOpenTokenBox(true);
              }}
            >
              0xffffffffffff
            </button>
          )}

          {openModel && (
            <Model setOpenModel={setOpenModel} connectWallet="Connect" />
          )}
        </div>
      </div>
      {/* //TOKENLIST COMPONENT */}
      {openTokenBox && (
        <TokenList setOpenTokenBox={setOpenTokenBox} tokenData="Data" />
      )}
    </div>
  );
};

export default Navbar;
