import { useApi } from '@/composables/api'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCategoriesStore = defineStore('categories', () => {
	const api = useApi()

	const skip = ref(0)
	const take = ref(10)
	const orderBy = ref(undefined as string | undefined)
	const direction = ref(undefined as string | undefined)

	const updateSkipTake = (_skip: number, _take: number) => {
		skip.value = _skip
		take.value = _take
	}

	const updateSort = (_orderBy?: string, _direction?: 'asc' | 'desc') => {
		orderBy.value = _orderBy
		direction.value = _direction
	}

	const getCategories = async (): Promise<Response> => {
		const sort =
			orderBy.value && direction.value
				? `&orderBy=${orderBy.value}&direction=${direction.value}`
				: ''
		return await fetch(
			`${api.url}/category?skip=${skip.value}&take=${take.value}${sort}`,
			api.options
		)
	}

	const postCategory = async (name: string): Promise<Response> => {
		return await fetch(`${api.url}/category`, {
			...api.options,
			method: 'POST',
			body: JSON.stringify({ name })
		})
	}

	const deleteCategory = async (id: number): Promise<Response> => {
		return await fetch(`${api.url}/category/${id}`, {
			...api.options,
			method: 'DELETE'
		})
	}

	return {
		getCategories,
		postCategory,
		deleteCategory,
		updateSkipTake,
		updateSort
	}
})
