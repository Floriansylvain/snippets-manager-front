<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { ref, type Ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const authStore = useAuthStore()

const valid: Ref<boolean> = ref(false)
const email: Ref<string> = ref('')
const emailRules: Ref<Array<(v: string) => boolean | string>> = ref([
	(value) => {
		if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return true
		return 'E-mail must respect standard e-mails format.'
	}
])
const password: Ref<string> = ref('')

const errorMessage: Ref<string> = ref('')

async function onSubmit(): Promise<void> {
	if (!valid.value) return
	const loginPromise = await authStore.postLogin({ email: email.value, password: password.value })
	if (!loginPromise.ok) {
		errorMessage.value = 'Wrong e-mail and/or password.'
		return
	}
	router.push('/')
}
</script>

<template>
	<section class="d-flex w-100 h-100 justify-center align-center flex-column ga-16 containter">
		<h1 class="text-h4 text-md-h3 text-lg-h2 text-xl-h2">SnippetsManager</h1>
		<VCard max-width="350" class="w-100 pa-2" variant="flat">
			<VCardTitle>Login</VCardTitle>
			<VCardSubtitle>Enter your credentials to log in.</VCardSubtitle>
			<VForm v-model="valid" class="pa-4 d-flex flex-column ga-2" @submit.prevent="onSubmit">
				<VTextField
					v-model="email"
					:rules="emailRules"
					label="E-mail*"
					type="email"
					variant="outlined"
					color="primary"
					hide-details="auto"
					required
				/>
				<div class="d-flex flex-column">
					<VTextField
						v-model="password"
						label="Password*"
						type="password"
						variant="outlined"
						color="primary"
						hide-details="auto"
						required
						autocomplete
					/>
					<VBtn variant="plain" color="primary-darken-1" size="small" class="pa-0 align-self-start">
						Reset password
					</VBtn>
				</div>
				<p v-if="errorMessage !== ''" class="text-body-1" style="color: rgb(var(--v-theme-error))">
					{{ errorMessage }}
				</p>
				<section class="d-flex flex-column ga-2">
					<VBtn variant="flat" color="primary" type="submit" :disabled="!valid">Log in</VBtn>
					<VBtn variant="outlined" color="primary">Create account</VBtn>
				</section>
			</VForm>
		</VCard>
	</section>
</template>
