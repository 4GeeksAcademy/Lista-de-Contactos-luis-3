import React, { useContext, useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const AddContact = () => {
	const { actions } = useContext(Context);
	const navigate = useNavigate();
	const location = useLocation();
	const editingContact = location.state?.contact; // Obtenemos el contacto si estamos editando

	const [contact, setContact] = useState({
		name: "",
		email: "",
		phone: "",
		address: "",
		id: null,
	});

	// Si estamos editando, prellenar el formulario
	useEffect(() => {
		if (editingContact) {
			setContact(editingContact);
		}
	}, [editingContact]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (contact.id) {
			// Editar contacto existente
			await actions.putContact(contact.id, contact);
			console.log("Contacto actualizado, redirigiendo...");
		} else {
			// Crear nuevo contacto
			await actions.postContact(contact);
			console.log("Contacto guardado, redirigiendo...");
		}
		navigate("/Contact");
	};

	return (
		<form onSubmit={handleSubmit} className="w-50 m-auto">
			<h2 className="text-center">
				{contact.id ? "Edit Contact" : "Add a new Contact"}
			</h2>
			<div className="mb-3">
				<label form="text" className="form-lable">Full Name</label>
				<input
					type="text"
					className="form-control"
					placeholder="Full Name"
					value={contact.name}
					onChange={(e) => setContact((prevContact) => ({ ...prevContact, name: e.target.value }))}
				/>
			</div>
			<div className="mb-3">
				<label form="email" className="form-lable">Email</label>
				<input
					type="email"
					className="form-control"
					placeholder="Enter email"
					value={contact.email}
					onChange={(e) => setContact((prevContact) => ({ ...prevContact, email: e.target.value }))}
				/>
			</div>
			<div className="mb-3">
				<label form="tel" className="form-lable">Phone</label>
				<input
					type="tel"
					className="form-control"
					placeholder="Enter Phone"
					value={contact.phone}
					onChange={(e) => setContact((prevContact) => ({ ...prevContact, phone: e.target.value }))}
				/>
			</div>
			<div className="mb-3">
				<label form="text" className="form-lable">Address</label>
				<input
					type="text"
					className="form-control"
					placeholder="Enter address"
					value={contact.address}
					onChange={(e) => setContact((prevContact) => ({ ...prevContact, address: e.target.value }))}
				/>
			</div>
			<button type="submit" className="btn btn-primary w-100 mb-3">
				{contact.id ? "Update" : "Save"}
			</button>
			<div>
				<Link to="/Contact">Or get back to contacts</Link>
			</div>
		</form>
	);
};

