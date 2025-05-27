import { NextResponse } from 'next/server';
import { prisma } from '../../lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, dateId } = body;

    if (!name || !email || !dateId) {
      return NextResponse.json(
        { error: 'Name, email, and date ID are required' },
        { status: 400 }
      );
    }

    // Ensure dateId is a number
    const numericDateId = Number(dateId);
    if (isNaN(numericDateId)) {
      return NextResponse.json(
        { error: 'Invalid date ID' },
        { status: 400 }
      );
    }

    const vote = await prisma.vote.create({
      data: {
        name,
        email,
        dateId: numericDateId,
      },
    });

    return NextResponse.json(vote);
  } catch (error) {
    console.error('Error creating vote:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create vote' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const votes = await prisma.vote.groupBy({
      by: ['dateId'],
      _count: {
        _all: true,
      },
    });

    const voteCounts = votes.reduce((acc, vote) => {
      acc[vote.dateId] = vote._count._all;
      return acc;
    }, {} as { [key: number]: number });

    return NextResponse.json(voteCounts);
  } catch (error) {
    console.error('Error fetching votes:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch votes' },
      { status: 500 }
    );
  }
} 