import React, { useState } from "react";
import Image from "next/image";

import Style from "./SearchToken.module.css";
import images from "../../assets";

const SearchToken = ({ openToken, tokens, tokenData }) => {
  const [active, setActive] = useState(1);

  let tokenList = [];
  for (let i = 0; i < tokenData.length / 2; i++) {
    tokenList.push(tokenData[i]);
  }

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
          {tokenList.map((el, i) => (
            <span
              key={i + 1}
              className={active == i + 1 ? `${Style.active}` : ""}
              onClick={() => (
                setActive(i + 1),
                tokens({
                  name: el.name,
                  image: el.image,
                  symbol: el.symbol,
                  tokenBalance: el.tokenBalance,
                  tokenAddress: el.tokenAddress,
                })
              )}
            >
              <Image
                src={el.image || images.ether}
                alt="img"
                width={30}
                height={30}
              />
              {el.symbol}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchToken;
