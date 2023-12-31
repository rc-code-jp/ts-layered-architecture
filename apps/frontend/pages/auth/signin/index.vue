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
        <label>Email</label>
        <input type="email" v-model="form.email" />
      </div>
      <div>
        <label>Password</label>
        <input type="password" v-model="form.password"/>
      </div>
      <div>
        <button type="submit">Sign in</button>
      </div>
    </form>
  </div>
</template>
