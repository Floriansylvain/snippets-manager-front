<script setup lang="ts">
import type { Category } from '@/composables/category'
import { useCategoriesStore } from '@/stores/categories'
import { ref, type Ref } from 'vue'

interface CategoryItem {
	id: number
	name: string
}

const props = defineProps<{
	fetchedCategories: Category | undefined
}>()

const emit = defineEmits<{
	categoryDeleted: [id: number]
}>()

const categoriesStore = useCategoriesStore()

const deleteDialog: Ref<boolean> = ref(false)
const deleteDialogCategory: Ref<CategoryItem | undefined> = ref()

function onDeleteClick(category: CategoryItem) {
	deleteDialogCategory.value = category
	deleteDialog.value = true
}

async function deleteCategory() {
	const categoryPromise = await categoriesStore.deleteCategory(deleteDialogCategory.value?.id ?? -1)
	const response = await categoryPromise.json()
	emit('categoryDeleted', response.id)
	deleteDialog.value = false
}
</script>

<template>
	<VDataTable
		:headers="[
			{ title: 'Name', key: 'name', sortable: true },
			{ title: 'Actions', key: 'actions', align: 'end', sortable: false }
		]"
		:items="props.fetchedCategories?.categories"
	>
		<template v-slot:[`item.actions`]="{ item }">
			<VBtn icon="mdi-pencil" variant="flat" size="small"></VBtn>
			<VBtn icon="mdi-delete" variant="flat" size="small" @click="onDeleteClick(item)" />
		</template>
	</VDataTable>

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
