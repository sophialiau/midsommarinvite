import { NextResponse } from 'next/server';
import { prisma } from '../../lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, items } = body;

    if (!name || !email || !items) {
      return NextResponse.json(
        { error: 'Name, email, and items are required' },
        { status: 400 }
      );
    }

    // Create a contribution for each item
    const contributions = await Promise.all(
      Object.entries(items).map(([type, quantity]) =>
        prisma.contribution.create({
          data: {
            name,
            email,
            type,
            details: quantity.toString(),
          },
        })
      )
    );

    return NextResponse.json(contributions);
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
      _sum: {
        details: true,
      },
    });

    const contributionCounts = contributions.reduce((acc, contribution) => {
      acc[contribution.type] = parseInt(contribution._sum.details || '0');
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