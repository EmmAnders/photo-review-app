import React, { createContext, useContext, useEffect, useState } from "react";
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
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			setTimeout(() => {
				setUser(user);
				setLoading(false);
			}, 800);
			/* console.log("auth change", user); */
		});
	}, []);

	const signup = (email, password) => {
		return createUserWithEmailAndPassword(auth, email, password);
	};

	const login = (email, password) => {
		return signInWithEmailAndPassword(auth, email, password);
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
