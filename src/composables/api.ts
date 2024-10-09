export function useApi() {
	const url = import.meta.env.VITE_API as string

	return { url }
}
