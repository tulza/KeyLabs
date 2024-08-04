"use client";

import { KeyGrid } from "@/components/KeyGrid";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { QueryClient, QueryClientProvider, useQuery } from "@tanstack/react-query";
import {
  Context,
  createContext,
  PropsWithChildren,
  ServerContext,
  useContext,
  useEffect,
  useState,
} from "react";

type timeContext = {
  timeRemaining: number;
};

// // const leaderBoardContext = useContext<>(null);
// const TimerContext = useContext<ServerContext<timeContext>>(
//   {} as Context<ServerContext<timeContext>>
// );
// const GameContext = useContext<ServerContext<gameContext>>(
//   {} as Context<ServerContext<gameContext>>
// );

// const TimerContext = useContext<timeContext>(
//   {} as timeContext
// );
// const GameContext = useContext<ServerContext<gameContext(
//   {} as Context<ServerContext<gameContext>>
// );

// const TimerContext = useContext<timeContext>({} as timeContext);
// const GameContext = useContext<gameContext>({} as gameContext);

// const useTimer = () => {
//   const context = useContext(TimerContext);
//   if (!context) {
//     throw new Error("useTimer must be used within a TimerProvider");
//   }
//   return context;
// };

// const useGameContext = () => {
//   const context = useContext(GameContext);
//   if (!context) {
//     throw new Error("useTimer must be used within a GameContextProvider");
//   }
//   return context;
// };

// const UseContexts = ({ ...props }: PropsWithChildren) => {
//   const [Timer, setTimer] = useState();
//   const [gameContext, setGame] = useState();
//   const [hasGameStart, setGameStart] = useState(false);

//   const handleGameStart = () => {
//     setGameStart(true);
//   };

//   return (
//     <GameContext.Provider value={{} as gameContext}>
//       <TimerContext.Provider value={{} as timeContext}>{props.children}</TimerContext.Provider>
//     </GameContext.Provider>
//   );
// };

type gameContext = {
  game: {
    playerName: string;
    time: string;
    accuracy: string;
    lettersPerSecond: number;
    wordsPerMinute: number;
  };
  hasStarted: boolean;
};

type idfk = {
  handleNewWord: () => void;
  randomWord: string;
  isloading: boolean;
};

export const GameContext = createContext<idfk>({} as idfk);

export default function kgrid() {
  const isMinWidth = useMediaQuery("(min-width:900px)");
  const isMinHeight = useMediaQuery("(min-height:720px)");

  const [words, setWords] = useState<string[]>([]);
  const [randomWord, setRandomWord] = useState<string>("");
  const [isloading, setloading] = useState<boolean>(true);
  const [wordList, setWordList] = useState<string[]>([]);

  useEffect(() => {
    fetch("/1000-most-common-words.txt")
      .then((response) => response.text())
      .then((data) => {
        const wordsArray = data.split("\n");
        setWords(wordsArray);
        setloading(false);
      });
  }, []);

  useEffect(() => {
    if (words.length > 0) {
      setRandomWord(getRandomWord(words));
    }
  }, [words]);

  console.log(isloading);

  function handleNewWord() {
    setRandomWord(getRandomWord(words));
  }

  function getRandomWord(wordsArray: string[]): string {
    const randomIndex = Math.floor(Math.random() * wordsArray.length);
    return wordsArray[randomIndex];
  }

  const handleGenerateWordSet = () => {
    let wordSet: string[] = [];
    for (let i = 0; i < 10; i++) {
      wordSet.push(getRandomWord(words));
    }
    setWordList(wordSet);
  };

  if (!isMinWidth || !isMinHeight) {
    return (
      <div className="absolute left-0 top-0 z-50 grid h-dvh w-dvw select-none place-items-center bg-teal-950">
        <p>You need a screen size of at least 1200x720</p>
        <div>
          {!isMinWidth && <p>screen width is too small</p>}
          {!isMinHeight && <p>screen height is too small</p>}
        </div>
      </div>
    );
  }

  return (
    <div className="h-100dvh w-100dvw relative overflow-hidden">
      <GameContext.Provider value={{ randomWord, handleNewWord, isloading }}>
        <KeyGrid />
      </GameContext.Provider>
    </div>
  );
}
