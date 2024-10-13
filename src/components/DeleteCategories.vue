<script setup lang="ts">
import { useCategoriesStore } from '@/stores/categories'
import { ref, type Ref } from 'vue'

const emit = defineEmits<{
	categoriesDeleted: []
}>()

const props = defineProps<{
	ids: number[]
}>()

const dialog: Ref<boolean> = ref(false)

const categoriesStore = useCategoriesStore()

async function onSubmit(): Promise<void> {
	await categoriesStore.deleteCategories(props.ids)
	emit('categoriesDeleted')
	dialog.value = false
}
</script>

<template>
	<VDialog v-model="dialog" max-width="500">
		<template v-slot:activator="{ props: activatorProps }">
			<VBtn
				v-if="props.ids.length > 0"
				prepend-icon="mdi-delete"
				text="Delete selected"
				color="error"
				variant="outlined"
				v-bind="activatorProps"
			></VBtn>
		</template>
		<VCard prepend-icon="mdi-delete" title="Create Category">
			<VForm @submit.prevent="onSubmit">
				<VCardText class="text-body-1">
					Are you absolutely sure you want to delete the {{ ids.length }} selected categories? This
					is unrecoverable.
				</VCardText>
				<VDivider />
				<VCardActions>
					<VSpacer />
					<VBtn color="primary" text="Close" variant="outlined" @click="dialog = false"></VBtn>
					<VBtn color="error" text="Delete" variant="flat" type="submit"></VBtn>
				</VCardActions>
			</VForm>
		</VCard>
	</VDialog>
</template>
