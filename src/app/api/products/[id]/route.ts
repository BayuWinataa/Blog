import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

type params = {
	params: Promise<{ id: string }>;
};

export async function GET(req: NextRequest, { params }: params) {
	try {
		const id = await params;
		if (!id) {
			return NextResponse.json({ message: 'Invalid products ID' }, { status: 400 });
		}
		const product = await prisma.product.findUnique({
			where: id,
		});

		if (!product) {
			return NextResponse.json({ message: 'product not found' }, { status: 404 });
		}

		return NextResponse.json({ message: 'success get products', data: product }, { status: 200 });
	} catch (error) {
		console.error('Request error', error);
		return NextResponse.json({ message: 'Error getting product' }, { status: 500 });
	}
}

export async function PATCH(req: NextRequest, { params }: params) {
	const id = (await params).id;

	if (!id) {
		return NextResponse.json({ message: 'failed get detail id product' }, { status: 500 });
	}

	const body = await req.json();
	const { name, price } = body;

	const product = await prisma.product.update({
		where: { id },
		data: {
			name,
			price,
		},
	});

	if (!product) {
		return NextResponse.json({ message: 'failed get product' }, { status: 500 });
	}
	return NextResponse.json({ message: 'success get products', data: product }, { status: 200 });
}