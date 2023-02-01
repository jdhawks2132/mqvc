import { useState } from 'react';
import { useVendorAssignmentsQuery } from '../../store/mqvcAPI';
import axios from 'axios';

const AdminDashboard = () => {
	const [file, setFile] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	const {
		data: vendorAssignments,
		error,
		isSuccess,
	} = useVendorAssignmentsQuery();

	const handleFileChange = (e) => {
		setFile(e.target.files[0]);
	};

	const handleUpload = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		const formData = new FormData();
		formData.append('file', file);
		try {
			const res = await axios.post(
				'http://localhost:3000/api/v1/import-vendors',
				formData,
				{
					headers: {
						'Content-Type': 'multipart/form-data',
						Authorization: localStorage.getItem('jwt'),
					},
				}
			);
			console.log(res);
		} catch (err) {
			console.log(err);
		}
	};

	const UPLOAD_URL = 'http://localhost:3000/api/v1/import-vendors';
	return (
		<div>
			<h1 className='text-2xl font-bold m-11'>Admin Dashboard</h1>
			{isSuccess && (
				<div className='mx-auto'>
					<h2 className='text-xl text-center my-4'>Vendor Assignments</h2>
					<table className='table-auto mx-auto'>
						<thead>
							<tr>
								<th className='px-4 py-2'>Vendor</th>

								<th className='px-4 py-2'>User Assigned To</th>

								<th className='px-4 py-2'>Actions</th>
							</tr>
						</thead>
						<tbody>
							{vendorAssignments.map((vendorAssignment) => (
								<tr key={vendorAssignment.id}>
									<td className='text-xs border px-2 py-1'>
										{vendorAssignment.vendor_name}
									</td>
									<td className='text-xs border px-2 py-1'>
										{vendorAssignment.user_name}
									</td>

									<td className='border px-4 py-1'>
										<button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 mr-4 rounded text-xs '>
											Edit
										</button>
										<button className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-2 rounded text-xs '>
											Delete
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			)}
			{error && <p>{error.message}</p>}
			<form onSubmit={handleUpload}>
				<input
					type='file'
					name='file'
					onChange={handleFileChange}
				/>
				<button
					type='submit'
					disabled={isLoading}>
					Upload
				</button>
			</form>
		</div>
	);
};

export default AdminDashboard;
