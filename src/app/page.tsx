import { Button } from '@/components/ui/button';
import prisma from '@/lib/prisma';

export default async function Page() {
	const users = await prisma.user.findMany();
	return (
		<div>
			<Button variant="destructive">Test</Button>
			<ol className="list-decimal list-inside ">
				{users.map((user) => (
					<li key={user.id} className="mb-2">
						{user.name} - {user.email}
						<p>bayu</p>
					</li>
				))}
			</ol>
		</div>
	);
}
