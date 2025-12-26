import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

type params = {
	params: Promise<{ id: string }>;
};

export async function GET(req: NextRequest, { params }: params) {
	try {
		const id = await params;
		if (!id) {
			return NextResponse.json({ error: 'Invalid products ID' }, { status: 400 });
		}
		const product = await prisma.product.findUnique({
			where: id,
		});

		if (!product) {
			return NextResponse.json({ error: 'product not found' }, { status: 404 });
		}

		return NextResponse.json(product);
	} catch (error) {
		console.error('Request error', error);
		return NextResponse.json({ error: 'Error getting product' }, { status: 500 });
	}
}
