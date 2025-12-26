import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
	try {
		const products = await prisma.product.findMany();
		return NextResponse.json({ message: 'Success fetching products', data: products });
	} catch (error) {
		console.error('Request error', error);
		return NextResponse.json({ message: 'Error fetching products' }, { status: 500 });
	}
}

export async function POST(req: NextRequest) {
	try {
		const body = await req.json();
		const { name, price } = body;
		const products = await prisma.product.create({
			data: {
				name,
				price,
			},
		});
		return NextResponse.json({ message: 'Success post product', data: products });
	} catch (error) {
		console.error('request error', error);
		return NextResponse.json({ message: 'Error post products' }, { status: 500 });
	}
}
