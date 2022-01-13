import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MoonLoader } from "react-spinners";
import {
	onAuthStateChanged,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
} from "firebase/auth";

import { auth } from "../firebase/config";

const AuthContext = createContext();

const useAuthContext = () => {
	return useContext(AuthContext);
};

const AuthContextProvider = ({ children }) => {
	const navigate = useNavigate();
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			setUser(user);
			setLoading(false);

			/* console.log("auth change", user); */
		});
	}, []);

	const signup = (email, password) => {
		return createUserWithEmailAndPassword(auth, email, password);
	};

	const login = (email, password) => {
		signInWithEmailAndPassword(auth, email, password);
		navigate("/albums");
		return;
	};

	const logout = () => {
		return signOut(auth);
	};

	const values = { signup, login, logout, user, setUser };
	return (
		<AuthContext.Provider value={values}>
			{!loading ? (
				children
			) : (
				<div className="loading">
					<MoonLoader />
				</div>
			)}
		</AuthContext.Provider>
	);
};

export { useAuthContext, AuthContextProvider as default };
