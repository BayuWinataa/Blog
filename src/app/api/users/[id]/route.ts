import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

type Context = {
	params: Promise<{ id: string }>;
};

export async function GET(req: NextRequest, context: Context) {
	try {
		const { id } = await context.params;
		const numericId = parseInt(id);
		if (isNaN(numericId)) {
			return NextResponse.json({ error: 'Invalid users ID' }, { status: 400 });
		}
		const user = await prisma.user.findUnique({
			where: { id: numericId },
		});

		if (!user) {
			return NextResponse.json({ error: 'User not found' }, { status: 404 });
		}

		return NextResponse.json(user);
	} catch (error) {
		console.error('Request error', error);
		return NextResponse.json({ error: 'Error getting user' }, { status: 500 });
	}
}

export async function PATCH(req: NextRequest, context: Context) {
	try {
		const { id } = await context.params;
		const numericId = parseInt(id);
		if (isNaN(numericId)) {
			return NextResponse.json({ error: 'Invalid users ID' }, { status: 400 });
		}
		const body = await req.json();
		const { name, email } = body;

		const updatedUser = await prisma.user.update({
			where: { id: numericId },
			data: {
				name: name,
				email: email,
			},
		});
		return NextResponse.json(updatedUser);
	} catch (error) {
		console.error('Request error', error);
		return NextResponse.json({ error: 'Error getting user' }, { status: 500 });
	}
}

export async function DELETE(req: NextRequest, context: Context) {
	try {
		const { id } = await context.params;
		const numericId = parseInt(id);
		if (isNaN(numericId)) {
			return NextResponse.json({ error: 'Invalid users ID' }, { status: 400 });
		}
		await prisma.user.delete({
			where: { id: numericId },
		});
		return NextResponse.json({ message: 'User deleted successfully' });
	} catch (error) {
		console.error('Request error', error);
		return NextResponse.json({ error: 'Error deleting user' }, { status: 500 });
	}
}
