"use client";

import React, { useContext, useEffect, useState } from "react";
import { KeyboardKey } from "./VirtualKeyboard";
import { GameContext } from "@/app/kgrid/page";
import { motion } from "framer-motion";
import Timer from "./Timer";
export const KeyGrid = () => {
  const padding = 64;
  const hort = 12;
  const vert = 7;
  const gridsize = 64;
  const chaos = 24;
  const scaleChaos = 1;

  const gridwidth = hort * gridsize + padding * 2;
  const gridheight = vert * gridsize + padding * 2;

  const [currKeyArr, setKeyArr] = useState<keyItem[]>([]);
  const [dict, setWordDict] = useState<alphdict>({});
  const [hasStarted, setStarted] = useState(false);
  const [index, setindex] = useState(0);
  const [initialTime, setinitialTime] = useState(30);

  const [prevsGameDisplay, setDisplay] = useState("");

  const [totalClick, setTotalClick] = useState(0);
  const [numwords, setnumWord] = useState(0);
  const [lettersCorrect, setlettersCorrect] = useState(0);
  const [prevsGameScore, setpresgamescore] = useState(0);
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

  useEffect(() => {
    if (randomWord) {
      handleCreate(randomWord);
    }
  }, [randomWord]);

  const handleIsCorrectKey = (label: string) => {
    if (label == randomWord.trim().split("")[index]) {
      let worddictemp = dict;
      setlettersCorrect((pres) => pres + 1);
      worddictemp[label] -= 1;
      setindex((pre) => pre + 1);
      setWordDict(worddictemp);

      if (isWordFinsihed()) {
        handleNewWord();
      }
      setTotalClick((pre) => pre + 1);
      return true;
    }
    setTotalClick((pre) => pre + 1);
    return false;
  };

  const callbackFINISHGAME = () => {
    const wpm = ((numwords / initialTime) * 60).toFixed(2); //TODO
    const lpm = ((lettersCorrect / initialTime) * 60).toFixed(2);
    const time = initialTime;
    const acc = ((lettersCorrect / totalClick) * 100).toFixed(2);

    addGame(parseFloat(lpm), parseFloat(wpm), parseFloat(acc));
    setDisplay("WPM: " + wpm + " LPM: " + lpm + " Time: " + time + " Accuracy: " + acc + "%");

    setlettersCorrect(0);
    setStarted(false);
    resetBoard();
  };

  const isWordFinsihed = () => {
    const keys = Object.keys(dict);
    for (let i = 0; i < keys.length; i++) {
      if (dict[keys[i]] != 0) {
        return false;
      }
    }
    setnumWord((pres) => pres + 1);
    return true;
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
  };

  // Function to add game information
  async function addGame(lpm: number, wpm: number, accuracy: number) {
    const time = new Date().toISOString();
    const lettersPerMinute = lpm;
    const wordsPerMinute = wpm;

    const response = await fetch("/api/add-game", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        time,
        lettersPerMinute,
        wordsPerMinute,
        accuracy,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Game info added:", data);
    } else {
      const errorData = await response.json();
      console.error("Error:", errorData.error);
    }
  }

  return (
    <div className="relative flex h-dvh w-dvw flex-col items-center justify-center gap-8 overflow-hidden">
      <div className="absolute left-[50%] top-8 flex -translate-x-[50%] flex-col items-center justify-center gap-4">
        <div className="flex flex-col gap-1">
          <Timer
            key={hasStarted ? "HELP" : "ME"}
            initialTime={initialTime}
            callback={() => callbackFINISHGAME()}
            hasGameStart={hasStarted}
          />
          <h1 className="w-min whitespace-nowrap rounded-xl bg-black p-2 px-8">
            Letters elapsed: {lettersCorrect}
          </h1>
        </div>
      </div>
      <div className="absolute bottom-2 left-[50%] flex -translate-x-[50%] flex-col gap-4 rounded-xl bg-black/70 p-4">
        <button className="h-full p-4 px-8 text-white outline outline-1">{prevsGameDisplay}</button>
      </div>
      <motion.div key={randomWord} className="select-none text-5xl font-bold" layout="position">
        {hasStarted && (
          <>
            <p className="absolute text-white/20">{randomWord}&nbsp;</p>
            <p>{randomWord.split("").splice(0, index)}&nbsp;</p>
          </>
        )}
      </motion.div>
      <div className="flex w-dvw justify-center bg-white/10">
        <div
          className="relative"
          style={{
            width: gridwidth,
            height: gridheight,
          }}
        >
          {currKeyArr.map((keyi, i) => {
            if (index > i) return;
            const topchaos = gridsize + (Math.random() - 0.5) * chaos;
            const leftchaos = gridsize + (Math.random() - 0.5) * chaos;
            return (
              <KeyboardKey
                label={keyi.label}
                key={keyi.location}
                className="absolute"
                style={{
                  top: padding + Math.floor(keyi.location / hort) * gridsize + topchaos,
                  left: padding + (keyi.location % hort) * gridsize + leftchaos,
                }}
                animate={{ scale: 1 + scaleChaos * (Math.random() - 0.2) }}
                onMouseDown={() => {
                  handleIsCorrectKey(keyi.label);
                }}
              />
            );
          })}

          {!hasStarted && (
            <div
              className="absolute grid h-full w-full place-items-center bg-teal-950"
              onClick={() => {
                setStarted(true);
                handleNewWord();
              }}
            >
              Start test
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
