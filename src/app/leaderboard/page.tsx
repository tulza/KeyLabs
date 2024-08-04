'use client'

export const runtime = 'edge'
import { useEffect, useState } from 'react'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/ui/card'

interface Player {
  id: number
  name: string
}

interface GameInfo {
  id: number
  playerId: number
  time: string
  lettersPerMinute: number
  wordsPerMinute: number
  accuracy: number
  player: Player
}

export default function Leaderboard() {
  const [topScores, setTopScores] = useState<GameInfo[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTopScores = async () => {
      try {
        const response = await fetch('/api/getLeaderboard')
        if (!response.ok) {
          throw new Error('Failed to fetch top scores')
        }
        const data: GameInfo[] = await response.json()
        setTopScores(data)
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message)
        } else {
          setError('An unexpected error occurred.')
        }
      }
    }

    fetchTopScores()
  }, [])

  return (
    <Card className="w-full max-w-3xl">
      <CardHeader className="flex flex-col items-center gap-2 border-b pb-4">
        <CardTitle className="text-2xl font-bold">Leaderboard</CardTitle>
        <CardDescription className="text-muted-foreground">
          Top 10 high scores
        </CardDescription>
      </CardHeader>
      <CardContent className="py-4">
        {error && <p className="text-red-500">{error}</p>}
        {topScores.length === 0 ? (
          <p>Loading...</p>
        ) : (
          topScores.map((score, index) => (
            <div
              key={score.id}
              className="grid grid-cols-[auto_1fr_auto] items-center gap-4 border-b py-3 last:border-b-0"
            >
              <div className="bg-primary text-primary-foreground flex h-8 w-8 items-center justify-center rounded-full">
                {index + 1}
              </div>
              <div className="space-y-1">
                <div className="font-medium">{score.player.name}</div>
                <div className="text-muted-foreground text-xs">
                  {score.time}
                </div>
              </div>
              <div className="text-right font-medium">
                {score.lettersPerMinute}
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  )
}
