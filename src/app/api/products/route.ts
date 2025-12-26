import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
	try {
		const products = await prisma.product.findMany();
		return NextResponse.json({message: 'success fetching products', data: products});
	} catch (error) {
		console.error('Request error', error);
		return NextResponse.json({ message: 'Error fetching products' }, { status: 500 });
	}
}
