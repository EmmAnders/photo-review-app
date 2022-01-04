import { Routes, Route } from "react-router-dom";
import "./App.css";

// Route imports
import Home from "./pages/home/Home";
import Signup from "./pages/signup/Signup";

function App() {
	return (
		<div className="App">
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="signup" element={<Signup />} />
			</Routes>
		</div>
	);
}

export default App;
