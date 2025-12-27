import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { FaPencilAlt, FaRegTrashAlt, FaPlus } from 'react-icons/fa';
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function page() {
	return (
		<div className="container mx-auto my-10">
			<div className="w-full flex justify-between">
				<h1>Product Page</h1>
				<Dialog>
					<form action="">
						<DialogTrigger asChild>
							<Button>
								Add Product
								<FaPlus />
							</Button>
						</DialogTrigger>
						<DialogContent>
							<DialogHeader>
								<DialogTitle>Add Product</DialogTitle>
							</DialogHeader>
							<div className="grid gap-4">
								<div className="grid gap-3">
									<Label htmlFor="name">Name</Label>
									<Input id="name" name="name" />
								</div>
								<div className="grid gap-3">
									<Label htmlFor="price">Price</Label>
									<Input id="price" name="price" type="number" />
								</div>
							</div>
							<DialogFooter>
								<DialogClose asChild>
									<Button variant="outline">Cancel</Button>
								</DialogClose>
								<Button type="submit">Save changes</Button>
							</DialogFooter>
						</DialogContent>
					</form>
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
						<TableRow>
							<TableCell>1</TableCell>
							<TableCell>bayu</TableCell>
							<TableCell>20000</TableCell>
							<TableCell>5 agustus 2025</TableCell>
							<TableCell>5 agustus</TableCell>
							<TableCell className="flex justify-center gap-5">
								<FaPencilAlt className="text-xl text-blue-500 cursor-pointer" />
								<FaRegTrashAlt className="text-xl text-red-500 cursor-pointer" />
							</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</div>
		</div>
	);
}
