const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			contact: [],
			agenda: "luis"
		},
		actions: {
			// Use getActions to call a function within a fuction

			getContact: async () => {

				try {
					const response = await fetch('https://playground.4geeks.com/contact/agendas/luis/contacts');
      				const result = await response.json();
					setStore({contact:result.contacts});
				} catch (error) {
					console.log("No se encontraron los contactos");
				}
			},

			postContact: async (contact) => {
				try {
					const response = await fetch('https://playground.4geeks.com/contact/agendas/luis/contacts',{
						method: "POST",
						headers: {
						accept: "application/json",
						"Content-Type": "application/json",
						},
						body: JSON.stringify(contact),
					});
					const result = await response.json();
					setStore({contact:[...getStore().contact,result]}); 
					
				} catch (error) {
					console.log("No se encontraron los contactos");
				}
			},

			deleteContact: async (id) => {
				try {
					const response = await fetch(`https://playground.4geeks.com/contact/agendas/luis/contacts/${id}`, {
						method: "DELETE",
						headers: {
							accept: "application/json",
						},
					});
					if (response.ok) {
						// Filtra los contactos eliminando el que tiene el id proporcionado
						const updatedContacts = getStore().contact.filter((contact) => contact.id !== id);
						setStore({ contact: updatedContacts });
					} else {
						alert("Error al eliminar el contacto");
					}
				} catch (error) {
					console.log("Error al eliminar el contacto", error);
				}
			},

			putContact: async (id, updatedContact) => {
				try {
					const response = await fetch(`https://playground.4geeks.com/contact/agendas/luis/contacts/${id}`, {
						method: "PUT",
						headers: {
							accept: "application/json",
							"Content-Type": "application/json",
						},
						body: JSON.stringify(updatedContact),
					});
					if (response.ok) {
						// Actualizar el estado del contacto en el store
						const updatedContacts = getStore().contact.map((contact) =>
							contact.id === id ? { ...contact, ...updatedContact } : contact
						);
						setStore({ contact: updatedContacts });
					} else {
						console.log("Error al actualizar el contacto");
					}
				} catch (error) {
					console.log("Error al actualizar el contacto", error);
				}
			}
			
			
		}
	};
};

export default getState;
