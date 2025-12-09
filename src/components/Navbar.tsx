import Link from 'next/link';

export default function Navbar() {
	return (
		<header className="w-full bg-white border-b">
			<div className="mw-full mx-auto flex items-center justify-between p-4">
				<Link href="/" className="text-2xl font-extrabold text-green-700">
					MyBlog
				</Link>

				<nav>
					<div className="flex items-center gap-3">
						<Link href="/login" className="text-sm px-3 py-1.5 rounded-md text-green-700 hover:bg-green-100 transition bg-green-50">
							Login
						</Link>
						<Link href="/register" className="text-sm px-3 py-1.5 rounded-md bg-green-700 text-white hover:bg-green-600 transition">
							Register
						</Link>
					</div>
				</nav>
			</div>
		</header>
	);
}
