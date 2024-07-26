import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import NavBar from "../../components/NavBar";
import { useSelector } from "react-redux";
import "../../assets/styles/CreateGroupPage.css";
import { handleCreateGroup } from "../../axios/GroupAxios";
const CreateGroupPage = () => {
	const navigate = useNavigate();
	const user = useSelector((state) => state.user.user);
	const [form, setForm] = useState({
		groupName: "",
		status: null,
		userEmail: user.email,
	});
	const [errors, setErrors] = useState({});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setForm({
			...form,
			[name]: value,
		});
	};

	const validate = () => {
		let errors = {};
		if (!form.groupName) errors.groupName = "Group name is required";

		if (!form.status) errors.status = "Group status is required";
		return errors;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const errors = validate();
		setErrors(errors);

		if (Object.keys(errors).length === 0) {
			await handleCreateGroup(form);
			alert("Group created successfully");
			navigate("/group");
		}
	};
    
	const [isNavVisible, setIsNavVisible] = useState(false);

	return (
		<div className="group-create-container">
			<Header />
			<div className="menu-toggle" onClick={() => setIsNavVisible(!isNavVisible)}>
                <div></div>
                <div></div>
                <div></div>
            </div>


			<div className={`content ${isNavVisible ? "nav-visible" : ""}`}>
                <div className={`sidebar ${isNavVisible ? "visible" : ""}`}>
                    <button className="close-btn" onClick={() => setIsNavVisible(false)}>×</button>
                    <NavBar />
                </div>

				<form className="group-create-form" onSubmit={handleSubmit}>
					<div className="form-group">
						<label>Group Name</label>
						<input
							type="text"
							name="groupName"
							placeholder="Group name"
							value={form.groupName}
							onChange={handleChange}
						/>
						{errors.groupName && <p className="error">{errors.groupName}</p>}
					</div>
					<div className="form-group">
						<label>Group Status</label>
						<select name="status" value={form.status} onChange={handleChange}>
							<option value="">Select Status</option>
							<option value={false}>Public</option>
							<option value={true}>Private</option>
						</select>
						{errors.status && <p className="error">{errors.status}</p>}
					</div>

					<button type="submit">Create Group</button>
				</form>
			</div>
		</div>
	);
};

export default CreateGroupPage;
