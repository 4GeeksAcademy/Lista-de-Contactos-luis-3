import React from "react";
import { useNavigate } from "react-router-dom";

const ContactCard = ({ contact, image, onDelete }) => {
    const navigate = useNavigate();

    const handleEditClick = () => {
        navigate("/addContact", { state: { contact } }); // Enviamos el contacto como estado
    };

    return (
        <div className="card mb-3 p-20 m-20" >
            <div className="row g-0">
                <div className="col-md-4">
                    <img src={image} className="img-fluid rounded-circle" alt="" />
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <div className="d-flex justify-content-between align-items-center" style={{ marginBottom: "10px" }}>
                            <h5 className="card-title">{contact.name}</h5>
                            <div>
                                <i
                                    className="fa-solid fa-pencil me-3"
                                    style={{ cursor: "pointer" }}
                                    onClick={handleEditClick}
                                ></i>
                                <i
                                    onClick={() => onDelete(contact.id)}
                                    className="fa-solid fa-trash-can"
                                    style={{ cursor: "pointer" }}
                                ></i>
                            </div>
                        </div>
                        <p className="card-text">
                            <i className="fa-solid fa-envelope me-3"></i>
                            {contact.email}
                        </p>
                        <p className="card-text">
                            <i className="fa-solid fa-phone-flip me-3"></i>
                            <small className="text-body-secondary">{contact.phone}</small>
                        </p>
                        <p>
                            <i className="fa-solid fa-location-dot me-3"></i>
                            {contact.address}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactCard;
