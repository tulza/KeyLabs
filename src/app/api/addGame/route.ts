import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(request: Request) {
  try {
    const { playerId, time, lettersPerMinute, wordsPerMinute, accuracy } =
      await request.json()

    if (
      !playerId ||
      !time ||
      !lettersPerMinute ||
      !wordsPerMinute ||
      !accuracy
    ) {
      return NextResponse.json(
        { error: 'All fields are required.' },
        { status: 400 }
      )
    }

    const player = await prisma.player.findUnique({
      where: { id: parseInt(playerId, 10) },
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
