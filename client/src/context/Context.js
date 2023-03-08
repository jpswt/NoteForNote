import { createContext, useReducer } from 'react';
import Reducer from './Reducer';

const INIT_STATE = {
	user: null,
	fetched: false,
	error: false,
};

export const Context = createContext(INIT_STATE);

export const ContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(Reducer, INIT_STATE);

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
