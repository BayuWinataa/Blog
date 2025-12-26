'use client';

import { FormEvent } from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableFooter } from '@/components/ui/table';
import type { User } from '@/types';
import { FaPencilAlt, FaRegTrashAlt } from 'react-icons/fa';

export default function Page() {
	const [users, setUsers] = useState<User[]>([]);
	const [email, setEmail] = useState('');
	const [name, setName] = useState('');
	const [editingId, setEditingId] = useState<number | null>(null);
	const [isEditing, setIsEditing] = useState(false);

	async function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();

		if (isEditing && editingId !== null) {
			// Mode Edit
			try {
				const updatedUser = { name, email };
				const response = await axios.patch(`/api/users/${editingId}`, updatedUser);
				setUsers((prev) => prev.map((user) => (user.id === editingId ? response.data : user)));
				setName('');
				setEmail('');
				setIsEditing(false);
				setEditingId(null);
			} catch (error) {
				console.error('Error updating user:', error);
			}
		}
		// Mode Create
		try {
			const newUsers = { name, email };
			const response = await axios.post('/api/users', newUsers);
			setUsers((prev) => [...prev, response.data]);
			setName('');
			setEmail('');
		} catch (error) {
			console.error('Error creating user:', error);
		}
	}

	function handleEditClick(user: User) {
		setName(user.name);
		setEmail(user.email);
		setEditingId(user.id);
		setIsEditing(true);
	}

	function handleCancel() {
		setName('');
		setEmail('');
		setIsEditing(false);
		setEditingId(null);
	}

	async function handleDelete(id: number) {
		try {
			await axios.delete(`/api/users/${id}`);
			setUsers((prev) => prev.filter((user) => user.id !== id));
		} catch (error) {
			console.error('Error deleting user:', error);
		}
	}

	useEffect(() => {
		async function fetchUsers() {
			const response = await axios.get('/api/users');
			setUsers(response.data);
		}
		fetchUsers();
	}, []);

	return (
		<div>
			<form onSubmit={handleSubmit} className="flex flex-col w-1/2 gap-2">
				<label htmlFor="username">Username:</label>
				<input type="text" id="username" className="border-2 border-green-600 rounded-xl py-2 px-2" value={name} onChange={(e) => setName(e.target.value)} required />

				<label htmlFor="email">Email:</label>
				<input type="email" id="email" className="border-2 border-green-600 rounded-xl py-2 px-2" value={email} onChange={(e) => setEmail(e.target.value)} required />

				<div className="flex gap-2">
					<button type="submit" className="py-2 px-1 rounded-full bg-green-500 hover:bg-green-700 font-bold text-xl text-white flex-1">
						{isEditing ? 'Update User' : 'Add User'}
					</button>
					{isEditing && (
						<button type="button" onClick={handleCancel} className="py-2 px-1 rounded-full bg-gray-500 hover:bg-gray-700 font-bold text-xl text-white flex-1">
							Cancel
						</button>
					)}
				</div>
			</form>

			<Table className="">
				<TableHeader>
					<TableRow>
						<TableHead className="w-[100px]">No</TableHead>
						<TableHead>Nama</TableHead>
						<TableHead>Email</TableHead>
						<TableHead className="">Created At</TableHead>
						<TableHead className="text-center">Action</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{users.map((user, index) => (
						<TableRow key={user.id}>
							<TableCell className="font-medium">{index + 1}</TableCell>
							<TableCell>{user.name}</TableCell>
							<TableCell>{user.email}</TableCell>
							<TableCell className="">
								{new Date(user.createdAt).toLocaleString('id-ID', {
									dateStyle: 'full',
									timeStyle: 'short',
								})}
							</TableCell>

							<TableCell className="flex gap-2 justify-center ">
								<FaPencilAlt className="text-xl text-blue-500 cursor-pointer" onClick={() => handleEditClick(user)} />
								<FaRegTrashAlt className="text-xl text-red-500 cursor-pointer" onClick={() => handleDelete(user.id)} />
							</TableCell>
						</TableRow>
					))}
				</TableBody>
				<TableFooter>
					<TableRow className="bg-gray-300">
						<TableCell colSpan={4}>Total</TableCell>
						<TableCell className="text-center ">$2,500.00</TableCell>
					</TableRow>
				</TableFooter>
			</Table>
		</div>
	);
}
