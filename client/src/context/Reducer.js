const Reducer = (state, action) => {
	switch (action.type) {
		case 'LOGIN_START':
			return {
				user: null,
				fetched: true,
				error: false,
			};
		case 'LOGIN_SUCCESS':
			return {
				user: action.payload,
				fetched: false,
				error: false,
			};
		case 'LOGIN_FAIL':
			return {
				user: null,
				fetched: false,
				error: true,
			};
		case 'LOGOUT':
			return {
				user: null,
				fetched: false,
				error: false,
			};
		default:
			return state;
	}
};

export default Reducer;
