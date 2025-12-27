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

const addressData: Prisma.AddressCreateInput[] = [
	{
		name: 'Rumah Utama',
		phone: '081234567890',
		addressLine: 'Jl. Sudirman No. 123',
		city: 'Jakarta Selatan',
		province: 'DKI Jakarta',
		postalCode: '12190',
		notes: 'Dekat dengan MRT Blok M',
	},
	{
		name: 'Kantor',
		phone: '081234567891',
		addressLine: 'Jl. Gatot Subroto Kav. 52-53',
		city: 'Jakarta Selatan',
		province: 'DKI Jakarta',
		postalCode: '12950',
		notes: 'Gedung lantai 15, sebelah lift',
	},
	{
		name: 'Rumah Orang Tua',
		phone: '081234567892',
		addressLine: 'Jl. Diponegoro No. 45',
		city: 'Bandung',
		province: 'Jawa Barat',
		postalCode: '40115',
		notes: 'Rumah warna putih, pagar hitam',
	},
	{
		name: 'Kost',
		phone: '081234567893',
		addressLine: 'Jl. Gejayan No. 78',
		city: 'Yogyakarta',
		province: 'DI Yogyakarta',
		postalCode: '55281',
	},
	{
		name: 'Villa',
		phone: '081234567894',
		addressLine: 'Jl. Raya Ubud No. 100',
		city: 'Gianyar',
		province: 'Bali',
		postalCode: '80571',
		notes: 'Villa dengan kolam renang',
	},
];

export async function main() {
	for (const u of userData) {
		const user = await prisma.user.upsert({
			where: { email: u.email },
			update: {},
			create: u,
		});
		console.log(`✅ Created/Updated user: ${user.name} (${user.email})`);
	}

	for (const p of productData) {
		const product = await prisma.product.create({ data: p });
		console.log(`✅ Created product: ${product.name} - Rp ${product.price.toLocaleString('id-ID')}`);
	}

	for (const a of addressData) {
		await prisma.address.create({ data: a });
	}
}

main()
	.catch((e) => {
		console.error('❌ Seed failed:', e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
