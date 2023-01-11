import React, { useState } from "react";
import Image from "next/image";

import Style from "./SearchToken.module.css";
import images from "../../assets";

const SearchToken = ({ openToken, tokens, tokenData }) => {
  const [active, setActive] = useState(1);

  const coins = [
    {
      image: images.ether,
      name: "ETH",
    },
    {
      image: images.ether,
      name: "DAI",
    },
    {
      image: images.ether,
      name: "DOG",
    },
    {
      image: images.ether,
      name: "FUN",
    },
    {
      image: images.ether,
      name: "WETH",
    },
    {
      image: images.ether,
      name: "UNI",
    },
    {
      image: images.ether,
      name: "TIME",
    },
    {
      image: images.ether,
      name: "LOO",
    },
    {
      image: images.ether,
      name: "OOO",
    },
    {
      image: images.ether,
      name: "HEY  ",
    },
  ];
  return (
    <div className={Style.SearchToken}>
      <div className={Style.SearchTokenBox}>
        <div className={Style.SearchTokenBoxHeader}>
          <h4>Select token</h4>
          <Image
            src={images.close}
            alt="close"
            width={50}
            height={50}
            onClick={() => openToken(false)}
          />
        </div>

        <div className={Style.SearchTokenBoxSearch}>
          <div className={Style.SearchTokenBoxSearchImage}>
            <Image src={images.search} alt="search" width={20} height={20} />
          </div>
          <input type="text" placeholder="Search by token name" />
        </div>

        <div className={Style.SearchTokenBoxToken}>
          {coins.map((el, i) => (
            <span
              key={i + 1}
              className={active == i + 1 ? `${Style.active}` : ""}
              onClick={() => (
                setActive(i + 1),
                tokens({
                  name: el.name,
                  image: el.image,
                })
              )}
            >
              <Image
                src={el.image || images.ether}
                alt="img"
                width={30}
                height={30}
              />
              {el.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchToken;
