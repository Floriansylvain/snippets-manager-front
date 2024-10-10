export function useCookie() {
	const getCookie = (name: string): string | null => {
		const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'))
		return match ? match[2] : null
	}

	const setCookie = (name: string, value: string, days: number = 365) => {
		const date = new Date()
		date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
		const expires = 'expires=' + date.toUTCString()
		document.cookie = `${name}=${value}; ${expires}; path=/`
	}

	return { getCookie, setCookie }
}
