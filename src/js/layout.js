import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";


import {Contact} from "./views/Contact";
import {AddContact} from "./views/AddContact";
import injectContext from "./store/appContext";
import { Footer } from "./component/footer";
import { Agenda } from "./views/agenda";

//create your first component
const Layout = () => {
	//the basename is used when your project is published in a subdirectory and not in the root of the domain
	// you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
	const basename = process.env.BASENAME || "";

	return (
		<div>
			<BrowserRouter basename={basename}>
				<ScrollToTop>
					<Routes>
						<Route path="/" element={<Agenda />} />
						<Route path="/Contact" element={<Contact />} />
						<Route path="/addContact" element={<AddContact />} />
						<Route path="*" element={<h1>Not found!</h1>} />
					</Routes>
					<Footer />
				</ScrollToTop>  
			</BrowserRouter>
		</div>
	);
};

export default injectContext(Layout);
