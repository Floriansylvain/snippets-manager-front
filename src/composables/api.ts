export function useApi() {
	const url = import.meta.env.VITE_API as string
	const options = {
		headers: { 'Content-Type': 'application/json' },
		credentials: 'include' as RequestCredentials
	}

	return { url, options }
}
