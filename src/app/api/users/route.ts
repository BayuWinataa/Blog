import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
	try {
		const users = await prisma.user.findMany();
		return NextResponse.json(users);
	} catch (error) {
		console.error('Request error', error);
		return NextResponse.json({ error: 'Error fetching news' }, { status: 500 });
	}
}

export async function POST(req: NextRequest) {
	try {
		const { name, email } = await req.json();
		const newUser = await prisma.user.create({
			data: {
				name: name,
				email: email,
			},
		});
		return NextResponse.json(newUser, { status: 201 });
	} catch (error) {
		console.error('Request error', error);
		return NextResponse.json({ error: 'Error creating user' }, { status: 500 });
	}
}