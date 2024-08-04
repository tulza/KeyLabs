"use client";

import React, { useContext, useEffect, useState } from "react";
import { KeyboardKey } from "./VirtualKeyboard";
import { GameContext } from "@/app/kgrid/page";
export const KeyGrid = () => {
  const padding = 32;
  const hort = 12;
  const vert = 7;
  const gridsize = 64;

  const gridwidth = hort * gridsize + padding * 2;
  const gridheight = vert * gridsize + padding * 2;

  const [currKeyArr, setKeyArr] = useState<keyItem[]>([]);
  const [dict, setWordDict] = useState<alphdict>({});
  const [hasStarted, setStarted] = useState(false);
  const [index, setindex] = useState(0);

  type alphdict = {
    [key: string]: number;
  };

  type keyItem = {
    label: string;
    location: number;
  };

  const resetBoard = () => {
    setindex(0);
    setWordDict({} as alphdict);
    setKeyArr([]);
  };

  const { randomWord, handleNewWord } = useContext(GameContext);
  console.log(randomWord);

  const handleNewWordInstance = (word: string) => {
    word = word.trim();
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

  const handleIsCorrectKey = (label: string) => {
    console.log(label, randomWord.trim().split("")[0]);
    if (label == randomWord.trim().split("")[index]) {
      let worddictemp = dict;
      worddictemp[label] -= 1;
      setindex((pre) => pre + 1);
      setWordDict(worddictemp);
      return true;
    }
    return false;
  };

  const checkSpotTaken = (location: number, locationArr: number[]) => {
    for (let i = 0; i < currKeyArr.length; i++) {
      if (locationArr[i] == location) {
        return true;
      }
    }
    return false;
  };

  const handleCreate = (word: string) => {
    resetBoard();
    handleNewWordInstance(word);
    setStarted(true);
  };

  return (
    <div className="flex h-dvh w-dvw flex-col items-center justify-center gap-8">
      <div key={randomWord} className="text-xl font-bold">
        &nbsp;
        {hasStarted && randomWord}
      </div>
      <div className="relative rounded-lg outline" style={{ width: gridwidth, height: gridheight }}>
        {currKeyArr.map((keyi, i) => {
          console.log(keyi, i);
          if (index > i) return;
          return (
            <KeyboardKey
              label={keyi.label}
              key={keyi.location}
              className="absolute"
              style={{
                top: padding + Math.floor(keyi.location / hort) * gridsize,
                left: padding + (keyi.location % hort) * gridsize,
              }}
              onMouseDown={(e) => {
                handleIsCorrectKey(keyi.label);
              }}
            />
          );
        })}
        {!hasStarted && (
          <div
            className="absolute grid h-full w-full place-items-center bg-teal-950"
            onClick={() => handleCreate(randomWord)}
          >
            Start test
          </div>
        )}
      </div>
      {JSON.stringify(currKeyArr)}
    </div>
  );
};
