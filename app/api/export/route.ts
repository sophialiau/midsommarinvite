import { NextResponse } from 'next/server';
import { prisma } from '../../lib/prisma';

export async function GET(request: Request) {
  try {
    // Get the type of data to export from the URL
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');

    let data: any[] = [];
    let filename = '';
    let headers: string[] = [];

    switch (type) {
      case 'rsvp':
        data = await prisma.rSVP.findMany();
        filename = 'rsvps.csv';
        headers = ['ID', 'Name', 'Email', 'Attending', 'Created At'];
        break;
      case 'votes':
        data = await prisma.vote.findMany();
        filename = 'votes.csv';
        headers = ['ID', 'Name', 'Email', 'Preferred Date', 'Created At'];
        break;
      case 'contributions':
        data = await prisma.contribution.findMany();
        filename = 'contributions.csv';
        headers = ['ID', 'Name', 'Email', 'Item', 'Quantity', 'Created At'];
        break;
      default:
        return NextResponse.json({ error: 'Invalid export type' }, { status: 400 });
    }

    // Convert data to CSV format
    const csvRows = [
      headers.join(','),
      ...data.map(row => {
        const values = Object.values(row).map(value => {
          // Handle dates and special characters
          if (value instanceof Date) {
            return `"${value.toISOString()}"`;
          }
          if (typeof value === 'string' && value.includes(',')) {
            return `"${value}"`;
          }
          return value;
        });
        return values.join(',');
      })
    ];

    const csvContent = csvRows.join('\n');

    // Create response with CSV file
    const response = new NextResponse(csvContent);
    response.headers.set('Content-Type', 'text/csv');
    response.headers.set('Content-Disposition', `attachment; filename="${filename}"`);

    return response;
  } catch (error) {
    console.error('Export error:', error);
    return NextResponse.json({ error: 'Failed to export data' }, { status: 500 });
  }
} 