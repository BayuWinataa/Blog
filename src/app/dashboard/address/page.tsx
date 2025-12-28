'use client';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { FaPencilAlt, FaRegTrashAlt } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { DialogClose } from '@radix-ui/react-dialog';
import { Label } from '@radix-ui/react-label';
import { Input } from '@/components/ui/input';
import { useEffect, useState } from 'react';
import axios from 'axios';

type Address = {
	id: number;
	name: string;
	phone: string;
	addressLine: string;
	city: string;
	province: string;
	postalCode?: string;
	notes?: string;
	createdAt: string;
	updatedAt: string;
};

export default function Page() {
	const [address, setAddress] = useState<Address[]>([]);

	useEffect(() => {
		const getAddress = async () => {
			const res = await axios.get('/api/address');
			const data = res.data.data;
			setAddress(data);
		};
		getAddress();
	}, []);

	return (
		<div className="container mx-auto my-10">
			<div className="flex justify-between">
				<h1>address page</h1>
				<Dialog>
					<DialogTrigger asChild>
						<Button>Add address</Button>
					</DialogTrigger>
					<DialogContent className="max-h-[95vh]">
						<DialogHeader>
							<DialogTitle>Add Address</DialogTitle>
						</DialogHeader>
						<div className="grid gap-4 max-h-[60vh] overflow-y-scroll p-2 ">
							<div className="grid gap-3">
								<Label htmlFor="name">Name</Label>
								<Input id="name" name="name" />
							</div>
							<div className="grid gap-3">
								<Label htmlFor="phone">Phone</Label>
								<Input id="phone" name="phone" />
							</div>
							<div className="grid gap-3">
								<Label htmlFor="address">address line</Label>
								<Input id="address" name="address" />
							</div>
							<div className="w-full grid grid-cols-2 gap-5">
								<div className="grid gap-3">
									<Label htmlFor="city">city</Label>
									<Input id="city" name="city" />
								</div>
								<div className="grid gap-3">
									<Label htmlFor="province">province</Label>
									<Input id="province" name="province" />
								</div>
							</div>
							<div className="grid gap-3">
								<Label htmlFor="postal">postal code</Label>
								<Input id="postal" name="postal" />
							</div>
							<div className="grid gap-3">
								<Label htmlFor="notes">notes</Label>
								<Input id="notes" name="notes" />
							</div>
						</div>
						<DialogFooter>
							<DialogClose asChild>
								<Button variant="outline">Cancel</Button>
							</DialogClose>
							<Button type="submit">Save changes</Button>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			</div>
			<div>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>No</TableHead>
							<TableHead>Name</TableHead>
							<TableHead>Phone</TableHead>
							<TableHead>addressLine</TableHead>
							<TableHead>city</TableHead>
							<TableHead>province</TableHead>
							<TableHead>postalCode</TableHead>
							<TableHead>notes</TableHead>
							<TableHead>createedAt</TableHead>
							<TableHead>UpdatesAt</TableHead>
							<TableHead className="text-center">Actions</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{address.map((addres, idx) => (
							<TableRow key={addres.id}>
								<TableCell>{idx + 1}</TableCell>
								<TableCell>{addres.name}</TableCell>
								<TableCell>{addres.phone}</TableCell>
								<TableCell>{addres.addressLine} </TableCell>
								<TableCell>{addres.city}</TableCell>
								<TableCell>{addres.province}</TableCell>
								<TableCell>{addres.postalCode}</TableCell>
								<TableCell>{addres.postalCode}</TableCell>
								<TableCell>{new Date(addres.createdAt).toLocaleString()}</TableCell>
								<TableCell>{new Date(addres.updatedAt).toLocaleString()}</TableCell>
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
