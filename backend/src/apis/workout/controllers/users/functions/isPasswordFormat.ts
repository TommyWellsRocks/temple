export function isPasswordFormat(password: string) {
	return 9 < password.length && password.length < 100;
}