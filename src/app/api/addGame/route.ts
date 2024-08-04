import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { cookies } from 'next/headers'

const prisma = new PrismaClient()

export async function POST(request: Request) {
  try {
    const playerIdCookie = cookies().get('playerId')
    if (!playerIdCookie) {
      return NextResponse.json(
        { error: 'Player not logged in.' },
        { status: 401 }
      )
    }

    const playerId = parseInt(playerIdCookie.value, 10)

    const { time, lettersPerMinute, wordsPerMinute, accuracy } =
      await request.json()

    if (!time || !lettersPerMinute || !wordsPerMinute || !accuracy) {
      return NextResponse.json(
        { error: 'All fields are required.' },
        { status: 400 }
      )
    }

    const player = await prisma.player.findUnique({
      where: { id: playerId },
    })

    if (!player) {
      return NextResponse.json({ error: 'Player not found.' }, { status: 404 })
    }

    const newGameInfo = await prisma.gameInfo.create({
      data: {
        playerId: player.id,
        time,
        lettersPerMinute,
        wordsPerMinute,
        accuracy,
      },
    })

    return NextResponse.json(newGameInfo, { status: 201 })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: 'Something went wrong.' },
      { status: 500 }
    )
  }
}
