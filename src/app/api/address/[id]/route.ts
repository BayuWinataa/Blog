import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

type params = { params: Promise<{ id: string }> };

export async function GET(req: NextRequest, { params }: params) {
	try {
		const id = Number((await params).id);
		if (!id) {
			return NextResponse.json({ message: 'error id' }, { status: 400 });
		}
		const address = await prisma.address.findUnique({ where: { id } });
		if (!address) {
			return NextResponse.json({ message: 'error address not found' }, { status: 404 });
		}
		return NextResponse.json({ message: 'success delete address', data: address });
	} catch (error) {
		console.error('Request error', error);
		return NextResponse.json({ message: 'failed delete address' }, { status: 500 });
	}
}

export async function DELETE(req: NextRequest, { params }: params) {
	try {
		const id = Number((await params).id);
		if (!id) {
			return NextResponse.json({ message: 'error id' }, { status: 400 });
		}
		const address = await prisma.address.delete({ where: { id } });
		if (!address) {
			return NextResponse.json({ message: 'error address not found' }, { status: 404 });
		}
		return NextResponse.json({ message: 'success delete address' });
	} catch (error) {
		console.error('Request error', error);
		return NextResponse.json({ message: 'failed delete address' }, { status: 500 });
	}
}

export async function PATCH(req: NextRequest, { params }: params) {
	try {
		const id = Number((await params).id);
		if (!id) {
			return NextResponse.json({ message: 'error id' }, { status: 400 });
		}
		const body = await req.json();
		const { name, phone, addressLine, city, province, postalCode, notes } = body;
		const address = await prisma.address.update({
			where: { id },
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
		if (!address) {
			return NextResponse.json({ message: 'address not found' }, { status: 404 });
		}
		return NextResponse.json({ message: 'success edit address', data: address });
	} catch (error) {
		console.error('Request error', error);
		return NextResponse.json({ message: 'failed edit address' }, { status: 500 });
	}
}
