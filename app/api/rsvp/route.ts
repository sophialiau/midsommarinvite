import { NextResponse } from 'next/server';
import { prisma } from '../../lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, attending, guests, dietaryRestrictions } = body;

    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      );
    }

    const rsvp = await prisma.rsvp.create({
      data: {
        name,
        email,
        attending: attending === 'yes',
        guests,
        dietaryRestrictions,
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
    const rsvps = await prisma.rsvp.findMany({
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