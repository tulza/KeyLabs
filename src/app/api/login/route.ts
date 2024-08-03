import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

export async function POST(request: Request) {
  try {
    const { name, password } = await request.json()

    if (!name || !password) {
      return NextResponse.json(
        { error: 'Name and password are required.' },
        { status: 400 }
      )
    }

    // Find the user by name
    const user = await prisma.player.findUnique({
      where: { name },
    })

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid credentials.' },
        { status: 401 }
      )
    }

    // Check if the password matches
    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      return NextResponse.json(
        { error: 'Invalid credentials.' },
        { status: 401 }
      )
    }

    // If login is successful
    return NextResponse.json(
      { message: 'Login successful', user: { id: user.id, name: user.name } },
      { status: 200 }
    )
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: 'Something went wrong.' },
      { status: 500 }
    )
  }
}
