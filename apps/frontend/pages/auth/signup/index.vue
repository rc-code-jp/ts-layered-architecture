<script setup lang="ts">
import { ref } from 'vue';

const runtimeConfig = useRuntimeConfig();

const isLoading = ref(false)

const  submit = async () => {
  isLoading.value = true
  
  try {
    const res = await $fetch(`${runtimeConfig.public.API_URL}/api/auth/signup`, {
      method: 'POST',
      body: {
        email: '',
        password: '',
        confirmPassword: '',
      },
    })
    console.dir(res);
    isLoading.value = false
  } catch (err) {
    console.error(err)
    isLoading.value = false
  }
}
</script>

<template>
  <div>
    <h1>Sign up</h1>
    <form @submit.prevent="submit">
      <div>
        <label>Email</label>
        <input type="email" />
      </div>
      <div>
        <label>Password</label>
        <input type="password" />
      </div>
      <div>
        <label>Confirm password</label>
        <input type="password" />
      </div>
      <div>
        <button type="submit">Sign up</button>
      </div>
    </form>
  </div>
</template>
