import { NextResponse } from 'next/server';
import { prisma } from '../../lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, type, details } = body;

    if (!name || !email || !type || !details) {
      return NextResponse.json(
        { error: 'Name, email, type, and details are required' },
        { status: 400 }
      );
    }

    const contribution = await prisma.contribution.create({
      data: {
        name,
        email,
        type,
        details,
      },
    });

    return NextResponse.json(contribution);
  } catch (error) {
    console.error('Error creating contribution:', error);
    return NextResponse.json(
      { error: 'Failed to create contribution' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const contributions = await prisma.contribution.groupBy({
      by: ['type'],
      _count: {
        type: true,
      },
    });

    const contributionCounts = contributions.reduce((acc, contribution) => {
      acc[contribution.type] = contribution._count.type;
      return acc;
    }, {} as { [key: string]: number });

    return NextResponse.json(contributionCounts);
  } catch (error) {
    console.error('Error fetching contributions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch contributions' },
      { status: 500 }
    );
  }
} 