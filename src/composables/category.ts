export interface Category {
	categories: {
		id: number
		name: string
		user_id: number
	}[]
	pagination: {
		skip: number
		take: number
	}
	links: {
		next: string
		prev: string
	}
	total: number
}
