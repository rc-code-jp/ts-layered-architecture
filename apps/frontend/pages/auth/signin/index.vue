<script setup lang="ts">
import { ref } from 'vue';
import { setAuthToken } from '~/_auth';

const router = useRouter()
const runtimeConfig = useRuntimeConfig();

const form = ref({
  email: '',
  password: '',
})

const isLoading = ref(false)

const  submit = async () => {
  isLoading.value = true
  try {
    const res = await $fetch<any>(`${runtimeConfig.public.API_URL}/auth/signin`, {
      method: 'POST',
      body: {
        email: form.value.email,
        password: form.value.password,
      },
    })

    setAuthToken({
      accessToken: res.accessToken,
      refreshToken: res.refreshToken,
    })

    await router.push('/')
  } catch (err) {
    console.error(err)
    isLoading.value = false
  }
}
</script>

<template>
  <div>
    <h1>Sign in</h1>
    <form @submit.prevent="submit">
      <div>
        <v-text-field
          label="メールアドレス"
          placeholder="example@example.com"
          v-model="form.email"
          type="email"
          variant="outlined"
          autocomplete="email"
        />
      </div>
      <div>
        <v-text-field
          label="パスワード"
          v-model="form.password"
          type="password"
          variant="outlined"
          autocomplete="current-password"
        />
      </div>
      <div>
        <v-btn type="submit" color="primary" size="large">Sign in</v-btn>
      </div>
    </form>
  </div>
</template>
