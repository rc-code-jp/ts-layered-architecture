<script setup lang="ts">
definePageMeta({
  middleware: [async () => {
    return navigateTo('/home')
  }]
})
</script>
