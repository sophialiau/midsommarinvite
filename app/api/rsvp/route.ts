import { NextResponse } from 'next/server';
import { prisma } from '../../lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, attending, guests, dietaryRestrictions } = body;

    if (!name || !email || attending === undefined) {
      return NextResponse.json(
        { error: 'Name, email, and attendance status are required' },
        { status: 400 }
      );
    }

    const rsvp = await prisma.rSVP.create({
      data: {
        name,
        email,
        attending,
        guests: attending ? guests : 0,
        dietaryRestrictions: attending ? dietaryRestrictions : null,
      },
    });

    return NextResponse.json(rsvp);
  } catch (error) {
    console.error('Error creating RSVP:', error);
    return NextResponse.json(
      { error: 'Failed to create RSVP' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const rsvps = await prisma.rSVP.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(rsvps);
  } catch (error) {
    console.error('Error fetching RSVPs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch RSVPs' },
      { status: 500 }
    );
  }
} 