<script setup lang="ts">
import { useCategoriesStore } from '@/stores/categories'
import { ref, type Ref } from 'vue'

const emit = defineEmits<{
	categoryCreated: [id: number]
}>()

const dialog: Ref<boolean> = ref(false)

const valid: Ref<boolean> = ref(false)
const name: Ref<string> = ref('')
const nameRules: Ref<Array<(v: string) => boolean | string>> = ref([
	(value) => {
		if (value.length > 0 && value.length <= 50) return true
		return `Name length should be below 50 characters. (currently: ${value.length})`
	}
])

const categoriesStore = useCategoriesStore()

async function onSubmit(): Promise<void> {
	const createdCategoryPromise = await categoriesStore.postCategory(name.value)
	const createdCategory: { id: number } = await createdCategoryPromise.json()
	emit('categoryCreated', createdCategory.id)
	dialog.value = false
	name.value = ''
}
</script>

<template>
	<VDialog v-model="dialog" max-width="500">
		<template v-slot:activator="{ props: activatorProps }">
			<VBtn
				prepend-icon="mdi-plus"
				text="Create Category"
				color="primary"
				variant="flat"
				v-bind="activatorProps"
			></VBtn>
		</template>
		<VCard prepend-icon="mdi-plus" title="Create Category">
			<VForm v-model="valid" @submit.prevent="onSubmit">
				<VCardText>
					<VText-field
						v-model="name"
						:rules="nameRules"
						label="Name*"
						variant="outlined"
						hide-details="auto"
						required
					></VText-field>
				</VCardText>
				<VDivider />
				<VCardActions>
					<VSpacer />
					<VBtn color="primary" text="Close" variant="outlined" @click="dialog = false"></VBtn>
					<VBtn
						color="primary"
						text="Create"
						variant="flat"
						type="submit"
						:disabled="!valid"
					></VBtn>
				</VCardActions>
			</VForm>
		</VCard>
	</VDialog>
</template>
