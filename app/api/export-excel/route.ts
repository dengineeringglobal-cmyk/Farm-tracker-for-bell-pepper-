import { NextRequest, NextResponse } from 'next/server';

// Simple CSV export (since xlsx requires additional setup)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { data } = body;

    if (!Array.isArray(data)) {
      return NextResponse.json(
        { error: 'Invalid data format' },
        { status: 400 }
      );
    }

    // Create CSV content
    let csv = 'Date,Temperature (°C),Humidity (%),Wind Speed (km/h),Crop Health,Notes\n';

    data.forEach((entry: any) => {
      const row = [
        entry.date || '',
        entry.temperature || '',
        entry.humidity || '',
        entry.windSpeed || '',
        entry.cropHealth || '',
        `"${(entry.notes || '').replace(/"/g, '""')}"`, // Escape quotes in CSV
      ];
      csv += row.join(',') + '\n';
    });

    // Return as file
    return new NextResponse(csv, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="farm-data-${new Date().toISOString().split('T')[0]}.csv"`,
      },
    });
  } catch (error) {
    console.error('[v0] Export error:', error);
    return NextResponse.json(
      { error: 'Export failed' },
      { status: 500 }
    );
  }
}
