'use client'

import { useEffect, useState } from 'react'

export default function Home() {
  const [words, setWords] = useState<string[]>([])
  const [randomWord, setRandomWord] = useState<string>('')

  useEffect(() => {
    fetch('/1000-most-common-words.txt')
      .then((response) => response.text())
      .then((data) => {
        const wordsArray = data.split('\n')
        setWords(wordsArray)
      })
  }, [])

  useEffect(() => {
    if (words.length > 0) {
      setRandomWord(getRandomWord(words))
    }
  }, [words])

  function getRandomWord(wordsArray: string[]): string {
    const randomIndex = Math.floor(Math.random() * wordsArray.length)
    return wordsArray[randomIndex]
  }

  function handleNewWord() {
    setRandomWord(getRandomWord(words))
  }

  return (
    <div className="flex h-dvh w-dvw flex-col items-center justify-center overflow-hidden p-8">
      <div>
        <h1>Random Word</h1>
        <div>{randomWord}</div>
        <button
          onClick={handleNewWord}
          className="mt-4 rounded bg-blue-500 p-2 text-white"
        >
          Get New Word
        </button>
      </div>
    </div>
  )
}
