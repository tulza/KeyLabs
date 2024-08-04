import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

export async function POST(request: Request) {
  try {
    const { name } = await request.json()

    if (!name) {
      return NextResponse.json({ error: 'Name is required.' }, { status: 400 })
    }

    // Check if the player already exists
    const existingPlayer = await prisma.player.findUnique({
      where: { name },
    })

    if (existingPlayer) {
      return NextResponse.json(
        { error: 'Player with this name already exists.' },
        { status: 400 }
      )
    }

    const newPlayer = await prisma.player.create({
      data: {
        name,
      },
    })

    return NextResponse.json(newPlayer, { status: 201 })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: 'Something went wrong.' },
      { status: 500 }
    )
  }
}
