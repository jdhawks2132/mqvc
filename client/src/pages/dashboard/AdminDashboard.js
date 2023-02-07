import { useState } from 'react';
import {
	useVendorAssignmentsQuery,
	useUploadVendorsMutation,
} from '../../store/mqvcAPI';
import { useNavigate } from 'react-router-dom';
import AdminVendorAssignmentsTable from '../../components/tables/admin/vendorAssignments/AdminVendorAssignmentsTable';
import ContributionForm from '../../components/forms/ContributionForm';
import RegistrationForm from '../../components/forms/RegistrationForm';

const AdminDashboard = () => {
	const [file, setFile] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	const navigate = useNavigate();

	const {
		data: vendorAssignments,
		error,
		isSuccess,
	} = useVendorAssignmentsQuery();

	const [uploadVendors] = useUploadVendorsMutation();

	const handleFileChange = (e) => {
		setFile(e.target.files[0]);
	};

	const handleUpload = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		const formData = new FormData();
		formData.append('file', file);
		try {
			uploadVendors(formData);
			setIsLoading(false);
			navigate('/dashboard');
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div>
			<h1 className='text-2xl font-bold m-11'>Admin Dashboard</h1>
			<div className='admin-dashboard'>
				<form
					onSubmit={handleUpload}
					className='flex flex-col items-center justify-center my-4 import '>
					<h2 className='text-xl my-4'>Upload New Vendors Vendors</h2>
					<input
						type='file'
						name='file'
						onChange={handleFileChange}
						className='border border-gray-300 rounded-md p-2'
					/>
					<button
						type='submit'
						disabled={isLoading}
						className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-4'>
						Upload
					</button>
				</form>
				{isSuccess && (
					<div className='assign'>
						<AdminVendorAssignmentsTable
							vendorAssignments={vendorAssignments}
						/>
					</div>
				)}
				{error && <p>{error.message}</p>}
				<div className='contribution'>
					<ContributionForm />
				</div>
				<div className='registration'>
					<RegistrationForm />
				</div>
			</div>
		</div>
	);
};

export default AdminDashboard;
