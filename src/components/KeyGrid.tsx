"use client";

import React, { useEffect, useState } from "react";
import { KeyboardKey } from "./VirtualKeyboard";
export const KeyGrid = () => {
  const padding = 32;
  const hort = 12;
  const vert = 7;
  const gridsize = 64;

  const gridwidth = hort * gridsize + padding * 2;
  const gridheight = vert * gridsize + padding * 2;

  const [currKeyArr, setKeyArr] = useState<keyItem[]>([]);
  const [dict, setWordDict] = useState<alphdict>({});

  type alphdict = {
    [key: string]: number;
  };

  type keyItem = {
    label: string;
    location: number;
  };

  const resetBoard = () => {
    setWordDict({} as alphdict);
    setKeyArr([]);
  };

  const handleNewWordInstance = (word: string) => {
    let wordDict: alphdict = {};
    let locationarr: number[] = [];
    for (let i = 0; i < word.length; i++) {
      let location = Math.floor(Math.random() * (hort * vert));
      while (checkSpotTaken(location, locationarr)) {
        location = Math.floor(Math.random() * (hort * vert));
        break;
      }
      locationarr.push(location);
    }

    if (word.length != locationarr.length) {
      console.log("how id dhti happen break im going to kms");
    }

    const letters = word.split("");
    for (let i = 0; i < letters.length; i++) {
      if (letters[i] in wordDict) {
        wordDict[letters[i]] += 1;
      } else {
        wordDict[letters[i]] = 1;
      }
    }
    setWordDict(() => {
      return wordDict;
    });

    setKeyArr(
      letters.map((letter, i) => {
        return { label: letter, location: locationarr[i] };
      })
    );
  };

  const handleIsCorrectKey = () => {};

  const checkSpotTaken = (location: number, locationArr: number[]) => {
    for (let i = 0; i < currKeyArr.length; i++) {
      if (locationArr[i] == location) {
        return true;
      }
    }
    return false;
  };

  const handleCreate = () => {
    resetBoard();
    handleNewWordInstance("kyskys");
  };

  return (
    <div className="flex h-dvh w-dvw flex-col items-center justify-center">
      <div className="relative rounded-lg outline" style={{ width: gridwidth, height: gridheight }}>
        {currKeyArr.map((keyi) => {
          return (
            <KeyboardKey
              label={keyi.label}
              key={keyi.location}
              className="absolute"
              style={{
                top: padding + Math.floor(keyi.location / hort) * gridsize,
                left: padding + (keyi.location % hort) * gridsize,
              }}
            />
          );
        })}
      </div>
      <div onClick={handleCreate} className="size-8 bg-black"></div>
      <div onClick={handleCreate} className="">
        {JSON.stringify(currKeyArr)}
        {JSON.stringify(dict)}
      </div>
    </div>
  );
};
