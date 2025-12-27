'use client';

import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { FaPencilAlt, FaRegTrashAlt, FaPlus } from 'react-icons/fa';
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useEffect, useState } from 'react';
import axios from 'axios';

type Product = {
	id: string;
	name: string;
	price: number;
	createdAt: string;
	updatedAt: string;
};

export default function Page() {
	const [products, setProducts] = useState<Product[]>([]);
	const [price, setPrice] = useState('');
	const [name, setName] = useState('');
	const [open, setOpen] = useState(false);

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		try {
			const res = await axios.post('/api/products', { name, price: Number(price) });
			setProducts((prev) => [res.data.data, ...prev]);
			setName('');
			setPrice('');
			setOpen(false);
		} catch (error) {
			console.error('error submit product', error);
		}
	}

	useEffect(() => {
		async function getProducts() {
			const res = await axios.get('/api/products');
			// alert(res.data.message);
			setProducts(res.data.data);
		}
		getProducts();
	}, []);

	return (
		<div className="container mx-auto my-10">
			<div className="w-full flex justify-between">
				<h1>Product Page</h1>
				<Dialog open={open} onOpenChange={setOpen}>
					<DialogTrigger asChild>
						<Button type="button">
							Add Product
							<FaPlus />
						</Button>
					</DialogTrigger>

					<DialogContent>
						<form onSubmit={handleSubmit}>
							<DialogHeader>
								<DialogTitle>Add Product</DialogTitle>
							</DialogHeader>

							<div className="grid gap-4">
								<div className="grid gap-3">
									<Label htmlFor="name">Name</Label>
									<Input id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} />
								</div>

								<div className="grid gap-3">
									<Label htmlFor="price">Price</Label>
									<Input id="price" name="price" type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
								</div>
							</div>

							<DialogFooter>
								<DialogClose asChild>
									<Button type="button" variant="outline">
										Cancel
									</Button>
								</DialogClose>

								<Button type="submit">Save changes</Button>
							</DialogFooter>
						</form>
					</DialogContent>
				</Dialog>
			</div>
			<div>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Nomor</TableHead>
							<TableHead>Nama</TableHead>
							<TableHead>harga</TableHead>
							<TableHead>Created At</TableHead>
							<TableHead>Updated At</TableHead>
							<TableHead className="text-center">Actions</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{products.map((product, idx) => (
							<TableRow key={product.id}>
								<TableCell>{idx + 1}</TableCell>
								<TableCell>{product.name}</TableCell>
								<TableCell>{product.price}</TableCell>
								<TableCell>{product.createdAt}</TableCell>
								<TableCell>{product.updatedAt}</TableCell>
								<TableCell className="flex justify-center gap-5">
									<FaPencilAlt className="text-xl text-blue-500 cursor-pointer" />
									<FaRegTrashAlt className="text-xl text-red-500 cursor-pointer" />
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</div>
	);
}
