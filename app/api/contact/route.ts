import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Contact from '@/models/Contact';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, projectType, budget, description } = body;

    // Validate required fields
    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required fields.' },
        { status: 400 }
      );
    }

    // Connect to MongoDB
    await dbConnect();

    // Create the document
    const contact = await Contact.create({
      name,
      email,
      projectType,
      budget,
      description,
    });

    return NextResponse.json(
      { success: true, data: contact },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Contact API error:', error);
    return NextResponse.json(
      { error: 'Failed to submit form. Please try again later.' },
      { status: 500 }
    );
  }
}
