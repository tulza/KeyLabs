import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const playerId = request.cookies.get('playerId')

  if (!playerId) {
    return NextResponse.redirect(new URL('/home', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/', '/api/add-game', '/kgrid'],
}
