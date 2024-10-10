<script setup lang="ts">
import CategoriesTable from '@/components/CategoriesTable.vue'
import CategoryCreate from '@/components/CategoryCreate.vue'
import type { Category } from '@/composables/category'
import { useCategoriesStore } from '@/stores/categories'
import { onMounted, ref, type Ref } from 'vue'

const categoriesStore = useCategoriesStore()
const fetchedCategories: Ref<Category | undefined> = ref()

async function updateCategories() {
	const categoriesPromise = await categoriesStore.getCategories()
	fetchedCategories.value = await categoriesPromise.json()
}

onMounted(updateCategories)
</script>

<template>
	<header class="d-flex align-center justify-space-between">
		<h1 class="text-h3">Categories</h1>
		<CategoryCreate @categoryCreated="updateCategories" />
	</header>
	<CategoriesTable :fetched-categories="fetchedCategories" />
</template>
