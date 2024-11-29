import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import ContactCard from "../component/ContactCard";

export const Contact = () => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        actions.getContact();
    }, []);

    const image = "https://picsum.photos/400?random=1";

    return (
        <>
            <div className="d-flex justify-content-end me-4">
                <Link to="/addContact" className="btn btn-success mb-2 justify-item-end">
                    Add new contact
                </Link>
            </div>

            <div className="container">
                
                    {store.contact.map((contact) => (
                        <ContactCard
                            key={contact.id} 
                            contact={contact}
                            image={image}
                            onDelete={actions.deleteContact}
                        />
                    ))}
                
            </div>
        </>
    );
};





 