import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import Style from "./Navbar.module.css";
import images from "../../assets";
import { Model, TokenList } from "../index";

import { SwapTokenContext } from "../../context/swapContext";

const Navbar = () => {
  const { ether, account, networkConnection, connectWallet, tokenData } =
    useContext(SwapTokenContext);

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
            <p>{networkConnection}</p>
          </div>

          {account ? (
            <button onClick={() => setOpenTokenBox(true)}>
              {account.slice(0, 20)}...
            </button>
          ) : (
            <button onClick={() => setOpenModel(true)}>Connect</button>
          )}

          {openModel && (
            <Model setOpenModel={setOpenModel} connectWallet={connectWallet} />
          )}
        </div>
      </div>
      {/* //TOKENLIST COMPONENT */}
      {openTokenBox && (
        <TokenList setOpenTokenBox={setOpenTokenBox} tokenData={tokenData} />
      )}
    </div>
  );
};

export default Navbar;
