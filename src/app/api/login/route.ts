import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(request: Request) {
  try {
    const { name } = await request.json()

    if (!name) {
      return NextResponse.json({ error: 'Name is required.' }, { status: 400 })
    }

    const existingPlayer = await prisma.player.findUnique({
      where: { name },
    })

    if (existingPlayer) {
      const response = NextResponse.json(
        { message: 'Login successful' },
        { status: 200 }
      )

      response.cookies.set('playerId', existingPlayer.id.toString(), {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 1000,
        path: '/',
      })

      return response
    } else {
      const newPlayer = await prisma.player.create({
        data: {
          name,
        },
      })

      const response = NextResponse.json(newPlayer, { status: 201 })

      response.cookies.set('playerId', newPlayer.id.toString(), {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 1000,
        path: '/',
      })

      return response
    }
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: 'Something went wrong.' },
      { status: 500 }
    )
  }
}
