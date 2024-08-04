import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const topScores = await prisma.gameInfo.findMany({
      orderBy: {
        lettersPerMinute: 'desc',
      },
      take: 10,
      include: {
        player: true,
      },
    })

    return NextResponse.json(topScores, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: 'Something went wrong.' },
      { status: 500 }
    )
  }
}
