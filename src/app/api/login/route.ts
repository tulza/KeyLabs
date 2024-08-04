import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(request: Request) {
  try {
    const { name } = await request.json()

    if (!name) {
      return NextResponse.json({ error: 'Name is required.' }, { status: 400 })
    }

    const player = await prisma.player.findUnique({
      where: { name },
    })

    if (!player) {
      return NextResponse.json({ error: 'Invalid name.' }, { status: 401 })
    }

    const response = NextResponse.json(
      { message: 'Login successful' },
      { status: 200 }
    )

    response.cookies.set('playerId', player.id.toString(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 1000,
      path: '/',
    })

    return response
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: 'Something went wrong.' },
      { status: 500 }
    )
  }
}
