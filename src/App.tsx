import React from "react";
import "./App.css";
import KanbanBoard from "./pages/KanbanBoard";
import Login from "./pages/Login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AppProvider } from "./context/AppContext";

function App() {
	return (
		<div className="App">
			<AppProvider>
				<Router>
					<Routes>
						<Route path="/" element={<Login />} />
						<Route path="/home" element={<KanbanBoard />} />
					</Routes>
				</Router>
			</AppProvider>
		</div>
	);
}

export default App;
