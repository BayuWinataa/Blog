import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

type params = { params: Promise<{ id: string }> };

export async function GET(req: NextRequest, { params }: params) {
	try {
		const id = Number((await params).id);
		if (!id) {
			return NextResponse.json({ message: 'error id' }, { status: 500 });
		}
		const address = await prisma.address.findUnique({ where: { id } });
		return NextResponse.json({ message: 'success get detail address', data: address });
	} catch (error) {
		console.error('Request error', error);
		return NextResponse.json({ message: 'failed get detail address' }, { status: 500 });
	}
}
