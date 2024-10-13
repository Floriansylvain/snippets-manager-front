<script setup lang="ts">
import CategoriesTable from '@/components/CategoriesTable.vue'
import CategoryCreate from '@/components/CategoryCreate.vue'
import DeleteCategories from '@/components/DeleteCategories.vue'
import type { Category } from '@/composables/category'
import { useCategoriesStore } from '@/stores/categories'
import { onMounted, ref, type Ref } from 'vue'

const categoriesStore = useCategoriesStore()
const fetchedCategories: Ref<Category | undefined> = ref()
const loading: Ref<boolean> = ref(true)

const categoriesIdsToDelete: Ref<number[]> = ref([])

async function fetchCategories() {
	const categoriesPromise = await categoriesStore.getCategories()
	fetchedCategories.value = await categoriesPromise.json()
	loading.value = false
}

async function deleteCategories() {
	await categoriesStore.deleteCategories(categoriesIdsToDelete.value)
	await fetchCategories()
	categoriesIdsToDelete.value = []
}

onMounted(async () => {
	await fetchCategories()
})
</script>

<template>
	<header class="d-flex align-center justify-space-between">
		<h1 class="text-h3">Categories</h1>
		<div class="d-flex align-center ga-2">
			<DeleteCategories @categoriesDeleted="deleteCategories" :ids="categoriesIdsToDelete" />
			<CategoryCreate @categoryCreated="fetchCategories" />
		</div>
	</header>
	<CategoriesTable
		@categoriesUpdated="fetchCategories"
		@categoriesIdsToDeleteUpdated="categoriesIdsToDelete = $event"
		:fetchedCategories="fetchedCategories"
		:loading="loading"
		:itemsTotal="fetchedCategories?.total ?? 0"
	/>
</template>
