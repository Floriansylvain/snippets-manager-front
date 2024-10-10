<script setup lang="ts">
import { useCategoriesStore } from '@/stores/categories'
import { onMounted, ref, type Ref } from 'vue'

interface Category {
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

const categoriesStore = useCategoriesStore()
const fetchedCategories: Ref<Category | undefined> = ref()

onMounted(async () => {
	const categoriesPromise = await categoriesStore.getCategories()
	fetchedCategories.value = await categoriesPromise.json()
})
</script>

<template>
	<VDataTable
		:headers="[
			{ title: 'Name', key: 'name', sortable: true },
			{ title: 'Actions', key: 'actions', align: 'end', sortable: false }
		]"
		:items="fetchedCategories?.categories"
	>
		<template
			v-slot:[`item.actions`]="{
				// item
			}"
		>
			<VBtn icon="mdi-pencil" variant="flat" size="small"></VBtn>
			<VBtn icon="mdi-delete" variant="flat" size="small"></VBtn>
		</template>
	</VDataTable>
</template>
