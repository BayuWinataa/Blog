'use client';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { FaPencilAlt, FaRegTrashAlt } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
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
	const [name, setName] = useState('');
	const [phone, setPhone] = useState('');
	const [addressLine, setAddressLine] = useState('');
	const [city, setCity] = useState('');
	const [province, setProvince] = useState('');
	const [postalCode, setPostalCode] = useState('');
	const [notes, setNotes] = useState('');
	const [editing, setEditing] = useState<Address | null>(null);
	const [isDialogOpen, setIsDialogOpen] = useState(false);

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		try {
			const payload = { name, phone, addressLine, city, province, postalCode, notes };
			if (editing) {
				const res = await axios.patch(`/api/address/${editing.id}`, payload);
				const data = res.data.data;
				setAddress((prev) => prev.map((p) => (p.id === editing.id ? data : p)));
				setEditing(null);
				alert(res.data.message);
			} else {
				const res = await axios.post('/api/address', payload);
				const data = res.data.data;
				setAddress((prev) => [...prev, data]);
				alert(res.data.message);
			}
			setName('');
			setPhone('');
			setAddressLine('');
			setCity('');
			setProvince('');
			setPostalCode('');
			setNotes('');
			setIsDialogOpen(false);
		} catch (err) {
			console.error(err);
			alert('failed add/edit address');
		}
	}

	async function handleDelete(id: number) {
		try {
			await axios.delete(`/api/address/${id}`);
			setAddress((prev) => prev.filter((p) => p.id !== id));
		} catch (err) {
			console.error('delete failed', err);
		}
	}

	async function handleEdit(address: Address) {
		setEditing(address);
		setName(address.name);
		setPhone(address.phone);
		setAddressLine(address.addressLine);
		setCity(address.city);
		setProvince(address.province);
		setPostalCode(address.postalCode ?? '');
		setNotes(address.notes ?? '');
		setIsDialogOpen(true);
	}

	function handleAddNew() {
		setEditing(null);
		setName('');
		setPhone('');
		setAddressLine('');
		setCity('');
		setProvince('');
		setPostalCode('');
		setNotes('');
		setIsDialogOpen(true);
	}

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
				<div>
					<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
						<DialogTrigger asChild>
							<Button onClick={handleAddNew}>Add address</Button>
						</DialogTrigger>
						<DialogContent className="max-h-[95vh]">
							<form onSubmit={handleSubmit}>
								<DialogHeader>
									<DialogTitle>{editing ? 'Edit Address' : 'Add Address'}</DialogTitle>
								</DialogHeader>

								<div className="grid gap-4 max-h-[60vh] overflow-y-scroll p-2 ">
									<div className="grid gap-3">
										<Label htmlFor="name">Name</Label>
										<Input id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} required />
									</div>
									<div className="grid gap-3">
										<Label htmlFor="phone">Phone</Label>
										<Input id="phone" name="phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
									</div>
									<div className="grid gap-3">
										<Label htmlFor="address">address line</Label>
										<Input id="address" name="address" value={addressLine} onChange={(e) => setAddressLine(e.target.value)} required />
									</div>
									<div className="w-full grid grid-cols-2 gap-5">
										<div className="grid gap-3">
											<Label htmlFor="city">city</Label>
											<Input id="city" name="city" value={city} onChange={(e) => setCity(e.target.value)} required />
										</div>
										<div className="grid gap-3">
											<Label htmlFor="province">province</Label>
											<Input id="province" name="province" value={province} onChange={(e) => setProvince(e.target.value)} required />
										</div>
									</div>
									<div className="grid gap-3">
										<Label htmlFor="postal">postal code</Label>
										<Input id="postal" name="postal" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} required />
									</div>
									<div className="grid gap-3">
										<Label htmlFor="notes">notes</Label>
										<Input id="notes" name="notes" value={notes} onChange={(e) => setNotes(e.target.value)} required />
									</div>
								</div>
								<DialogFooter>
									<Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
										Cancel
									</Button>
									<Button type="submit">{editing ? 'Update' : 'Save'}</Button>
								</DialogFooter>
							</form>
						</DialogContent>
					</Dialog>
				</div>
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
								<TableCell>{addres.notes}</TableCell>
								<TableCell>{new Date(addres.createdAt).toLocaleString()}</TableCell>
								<TableCell>{new Date(addres.updatedAt).toLocaleString()}</TableCell>
								<TableCell className="flex justify-center gap-5">
									<FaPencilAlt className="text-xl text-blue-500 cursor-pointer" onClick={() => handleEdit(addres)} />
									<FaRegTrashAlt className="text-xl text-red-500 cursor-pointer" onClick={() => handleDelete(addres.id)} />
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</div>
	);
}
