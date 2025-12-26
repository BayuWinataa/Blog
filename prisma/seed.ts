import { PrismaClient, Prisma } from '../src/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import 'dotenv/config';

const adapter = new PrismaPg({
	connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
	adapter,
});

const userData: Prisma.UserCreateInput[] = [
	{
		name: 'Alice',
		email: 'alice@prisma.io',
	},
	{
		name: 'Bob',
		email: 'bob@prisma.io',
	},
];

const productData: Prisma.ProductCreateInput[] = [
	{
		name: 'Laptop Dell XPS 13',
		price: 15000000,
	},
	{
		name: 'Mouse Logitech MX Master 3',
		price: 1500000,
	},
	{
		name: 'Keyboard Mechanical Keychron K2',
		price: 2000000,
	},
	{
		name: 'Monitor LG UltraWide 34"',
		price: 8000000,
	},
	{
		name: 'Webcam Logitech C920',
		price: 1200000,
	},
	{
		name: 'Headphone Sony WH-1000XM5',
		price: 5000000,
	},
];

export async function main() {
	console.log('🌱 Starting seed...');

	// Seed Users
	console.log('Creating users...');
	for (const u of userData) {
		const user = await prisma.user.upsert({
			where: { email: u.email },
			update: {},
			create: u,
		});
		console.log(`✅ Created/Updated user: ${user.name} (${user.email})`);
	}

	// Seed Products
	console.log('Creating products...');
	for (const p of productData) {
		const product = await prisma.product.create({ data: p });
		console.log(`✅ Created product: ${product.name} - Rp ${product.price.toLocaleString('id-ID')}`);
	}

	console.log('✨ Seed completed successfully!');
}

main()
	.catch((e) => {
		console.error('❌ Seed failed:', e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
