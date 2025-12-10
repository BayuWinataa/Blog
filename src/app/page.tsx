'use client';

import { Button } from '@/components/ui/button';
import axios from 'axios';
import { useEffect, useState } from 'react';
import type { User } from '@/types';

export default function Page() {
	const [users, setUsers] = useState<User[]>([]);

	useEffect(() => {
		async function fetchUsers() {
			try {
				const response = await axios.get('/api/users');
				setUsers(response.data);
			} catch (error) {
				console.error('Error fetching users:', error);
			}
		}
		fetchUsers();
	}, []);
	return (
		<div>
			<Button variant="destructive">Test</Button>
			<ol className="list-decimal list-inside ">
				{users.map((user) => (
					<li key={user.id} className="mb-2">
						{user.name} - {user.email} 
					</li>
				))}
			</ol>
		</div>
	);
}
