import { useState, Fragment } from 'react';
import AdminVAReadOnly from './AdminVAReadOnly';
import AdminVAInlineForm from './AdminVAInlineForm';

import { useUpdateVendorAssignmentMutation } from '../../../../store/mqvcAPI';

const AdminVendorAssignmentsTable = ({ vendorAssignments }) => {
	const [updateVendorAssignment] = useUpdateVendorAssignmentMutation();

	const [isEditing, setIsEditing] = useState(null);
	const [formData, setFormData] = useState({
		vendor_id: '',
		user_id: '',
	});

	const handleUpdateClick = (e, vendorAssignment) => {
		e.preventDefault();
		setIsEditing(vendorAssignment.id);
		setFormData({
			vendor_id: vendorAssignment.vendor_id,
			user_id: vendorAssignment.user_id,
		});
	};

	const handleUpdateFormChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleCancelClick = (e) => {
		e.preventDefault();
		setIsEditing(null);
	};

	const handleDelete = (e, vendorAssignment) => {
		e.preventDefault();
		console.log('Delete Clicked', vendorAssignment.id);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		await updateVendorAssignment({
			id: isEditing,
			...formData,
		});
		setIsEditing(null);
	};

	return (
		<div className='mx-auto my-4'>
			<h2 className='text-xl text-center my-4'>Vendor Assignments</h2>
			<form onSubmit={handleSubmit}>
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
							<Fragment key={vendorAssignment.id}>
								{isEditing === vendorAssignment.id ? (
									<AdminVAInlineForm
										vendorAssignment={vendorAssignment}
										handleUpdateFormChange={handleUpdateFormChange}
										handleCancelClick={handleCancelClick}
									/>
								) : (
									<AdminVAReadOnly
										vendorAssignment={vendorAssignment}
										handleUpdateClick={handleUpdateClick}
										handleDelete={handleDelete}
									/>
								)}
							</Fragment>
						))}
					</tbody>
				</table>
			</form>
		</div>
	);
};

export default AdminVendorAssignmentsTable;
