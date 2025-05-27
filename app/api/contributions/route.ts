import { NextResponse } from 'next/server';
import { prisma } from '../../lib/prisma';

export async function POST(request: Request) {
  try {
    const { name, email, item, quantity } = await request.json();

    if (!name || !email || !item || !quantity) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const contribution = await prisma.contribution.create({
      data: {
        name,
        email,
        item,
        quantity: parseInt(quantity),
      },
    });

    return NextResponse.json(contribution);
  } catch (error) {
    console.error('Contribution error:', error);
    return NextResponse.json(
      { error: 'Failed to save contribution' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const contributions = await prisma.contribution.groupBy({
      by: ['item'],
      _count: {
        _all: true
      },
      _sum: {
        quantity: true
      }
    });

    return NextResponse.json(contributions);
  } catch (error) {
    console.error('Error fetching contributions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch contributions' },
      { status: 500 }
    );
  }
} 