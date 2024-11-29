import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Agenda = () => {
    const [agendaName, setAgendaName] = useState("");
    const [errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate();

    const handleCreateAgenda = async () => {
        if (!agendaName.trim()) {
            setErrorMessage("El nombre de la agenda no puede estar vacío.");
            return;
        }

        try {
            const response = await fetch(
                `https://playground.4geeks.com/contact/agendas/${agendaName}`,
                {
                    method: "POST",
                    headers: { "accept": "application/json" },
                }
            );

            if (response.ok) {
                const result = await response.json();
                console.log("Agenda creada:", result);
                navigate("/Contact"); // Redirige a la lista de contactos
            } else if (response.status === 400) {
                setErrorMessage("La agenda ya existe.");
                navigate("/Contact"); // Si existe, redirige a los contactos
            } else {
                setErrorMessage("Ocurrió un error al crear la agenda.");
            }
        } catch (error) {
            console.error("Error al crear la agenda:", error);
            setErrorMessage("Error de conexión. Inténtalo de nuevo.");
        }
    };

    return (
        <div className="container-agenda">
            <h1 className="text-center">Crear Agenda</h1>
            <div className="mb-3">
                <label htmlFor="agendaName" className="form-label">
                    Nombre de la Agenda
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="agendaName"
                    placeholder="Ingresa el nombre de la agenda"
                    value={agendaName}
                    onChange={(e) => setAgendaName(e.target.value)}
                />
            </div>
            {errorMessage && <p className="text-danger">{errorMessage}</p>}
            <button
                className="btn btn-success w-30 d-flex justifay-content-center"
                onClick={handleCreateAgenda}
            >
                Crear Agenda
            </button>
        </div>
    );
};
