<script setup lang="ts">
import type { Category } from '@/composables/category'
import { useCategoriesStore } from '@/stores/categories'
import { ref, watch, type Ref } from 'vue'

interface CategoryItem {
	id: number
	name: string
}

const props = defineProps<{
	fetchedCategories: Category | undefined
	loading: boolean
	itemsTotal: number
}>()

const emit = defineEmits<{
	categoriesUpdated: []
	categoriesIdsToDeleteUpdated: [ids: number[]]
}>()

const categoriesStore = useCategoriesStore()

const deleteDialog: Ref<boolean> = ref(false)
const deleteDialogCategory: Ref<CategoryItem | undefined> = ref()

const itemsPerPageGlob: Ref<number> = ref(10)
const itemsPage: Ref<number> = ref(0)

const itemsSelected: Ref<number[]> = ref([])

function onDeleteClick(category: CategoryItem) {
	deleteDialogCategory.value = category
	deleteDialog.value = true
}

async function deleteCategory() {
	const categoryPromise = await categoriesStore.deleteCategory(deleteDialogCategory.value?.id ?? -1)
	await categoryPromise.json()
	const skip = itemsPage.value === 1 ? 0 : (itemsPage.value - 1) * itemsPerPageGlob.value
	categoriesStore.updateSkipTake(skip, itemsPerPageGlob.value)
	emit('categoriesUpdated')
	deleteDialog.value = false
}

async function loadItems({
	page,
	itemsPerPage,
	sortBy
}: {
	page: number
	itemsPerPage: number
	sortBy: { key: string; order: 'asc' | 'desc' }[]
}) {
	itemsPage.value = page
	itemsPerPageGlob.value = itemsPerPage
	const skip = page === 1 ? 0 : (page - 1) * itemsPerPage
	categoriesStore.updateSkipTake(skip, itemsPerPage)
	if (sortBy[0]) categoriesStore.updateSort(sortBy[0].key, sortBy[0].order)
	else categoriesStore.updateSort(undefined, undefined)
	emit('categoriesUpdated')
}

watch(itemsSelected, (newItemsSelected) => {
	emit('categoriesIdsToDeleteUpdated', newItemsSelected)
})

watch(
	() => props.fetchedCategories,
	() => {
		itemsSelected.value = []
	}
)
</script>

<template>
	<VDataTableServer
		:headers="[
			{ title: 'ID', key: 'id', sortable: true },
			{ title: 'Name', key: 'name', sortable: true },
			{ title: 'Actions', key: 'actions', align: 'end', sortable: false }
		]"
		:items="props.fetchedCategories?.categories"
		:loading="props.loading"
		:items-length="props.itemsTotal"
		v-model:items-per-page="itemsPerPageGlob"
		v-model="itemsSelected"
		@update:options="loadItems"
		show-select
	>
		<template v-slot:[`item.actions`]="{ item }">
			<VBtn icon="mdi-pencil" variant="flat" size="small"></VBtn>
			<VBtn icon="mdi-delete" variant="flat" size="small" @click="onDeleteClick(item)" />
		</template>
	</VDataTableServer>

	<VDialog max-width="340" v-model="deleteDialog">
		<VCard prepend-icon="mdi-delete" title="Delete Category">
			<VCardText class="text-body-1">
				Are you sure you want to delete the
				<span class="text-decoration-underline">{{ deleteDialogCategory?.name }}</span> category?
			</VCardText>
			<VDivider />
			<VCardActions>
				<VBtn variant="outlined" text="Cancel" color="primary" @click="deleteDialog = false"></VBtn>
				<VBtn variant="flat" text="Delete" color="error" @click="deleteCategory"></VBtn>
			</VCardActions>
		</VCard>
	</VDialog>
</template>
