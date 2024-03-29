import { createContext, useEffect, useReducer } from 'react';
import Reducer from './Reducer';

const INIT_STATE = {
	user: JSON.parse(sessionStorage.getItem('user')) || null,
	fetched: false,
	error: false,
};

export const Context = createContext(INIT_STATE);

export const ContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(Reducer, INIT_STATE);

	useEffect(() => {
		sessionStorage.setItem('user', JSON.stringify(state.user));
	}, [state.user]);

	return (
		<Context.Provider
			value={{
				user: state.user,
				fetched: state.fetched,
				error: state.error,
				dispatch,
			}}
		>
			{children}
		</Context.Provider>
	);
};
