import { NextResponse, NextRequest } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
	try {
		const address = await prisma.address.findMany({
			orderBy: { name: 'asc' },
		});
		return NextResponse.json({ message: 'success get address', data: address });
	} catch (error) {
		console.error('Request error', error);
		return NextResponse.json({ message: 'failed get address' }, { status: 500 });
	}
}

export async function POST(req: NextRequest) {
	try {
		const body = await req.json();
		const { name, phone, addressLine, city, province, postalCode, notes } = body;
		const address = await prisma.address.create({
			data: {
				name,
				phone,
				addressLine,
				city,
				province,
				postalCode,
				notes,
			},
		});
		return NextResponse.json({ message: 'success post address', data: address }, { status: 201 });
	} catch (error) {
		console.error('error', error);
		return NextResponse.json({ message: 'failed post address' }, { status: 500 });
	}
}
