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

    const player = await prisma.player.findUnique({
      where: { name },
    })

    if (!player) {
      return NextResponse.json(
        { error: 'Invalid name or password.' },
        { status: 401 }
      )
    }

    const isPasswordValid = await bcrypt.compare(password, player.password)

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Invalid name or password.' },
        { status: 401 }
      )
    }

    // Store the player ID in the response cookie
    const response = NextResponse.json(
      { message: 'Login successful' },
      { status: 200 }
    )

    response.cookies.set('playerId', player.id.toString(), {
      httpOnly: true, // Prevent client-side access to the cookie
      secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
      sameSite: 'strict', // SameSite option in lowercase
      maxAge: 60 * 60 * 1000, // 1 hour
      path: '/', // Ensure the cookie is accessible site-wide
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
