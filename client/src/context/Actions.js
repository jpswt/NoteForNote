export const LoginStart = (userCreds) => ({
	type: 'LOGIN_START',
});

export const LoginSuccess = (user) => ({
	type: 'LOGIN_SUCCESS',
	payload: user,
});

export const LoginFail = () => ({
	type: 'LOGIN_FAIL',
});

export const Logout = () => ({
	type: 'LOGOUT',
});

export const UpdateStart = (userCreds) => ({
	type: 'UPDATE_START',
});

export const UpdateSuccess = (user) => ({
	type: 'UPDATE_SUCCESS',
	payload: user,
});

export const UpdateFail = () => ({
	type: 'UPDATE_FAIL',
});
