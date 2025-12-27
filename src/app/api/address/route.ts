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
