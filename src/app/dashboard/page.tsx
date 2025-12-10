'use client';

import { FormEvent } from 'react';
import { useState } from 'react';
import axios from 'axios';

export default function Page() {
	const [email, setEmail] = useState('');
	const [name, setName] = useState('');

	async function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		try {
			await axios.post('/api/users', {
				name,
				email,
			});
			setName('');
			setEmail('');
		} catch (error) {
			console.error('Error creating user:', error);
		}
	}

	return (
		<div>
			<form onSubmit={handleSubmit} className="flex flex-col w-1/2 gap-2">
				<label htmlFor="username">Username:</label>
				<input type="text" id="username" className="border-2 border-green-600 rounded-xl py-2 px-2" value={name} onChange={(e) => setName(e.target.value)} required />

				<label htmlFor="email">Email:</label>
				<input type="email" id="email" className="border-2 border-green-600 rounded-xl py-2 px-2" value={email} onChange={(e) => setEmail(e.target.value)} required />

				<button type="submit" className="py-2 px-1 rounded-full bg-green-500 hover:bg-green-700 font-bold text-xl text-white">
					Add User
				</button>
			</form>
		</div>
	);
}
