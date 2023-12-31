<script setup lang="ts">
type Task = {
  id: number
  title: string
  description: string
  taskGroupId: number
  done: boolean
}

type TaskGroup = {
  id: number
  name: string
  tasks: Task[]
}

const {$customFetch} = useNuxtApp()

const selectedTaskGroupId = ref<number | null>(null)
const selectedTaskGroup = ref<TaskGroup | null>(null)

const {data: taskGroups} = await useAsyncData('a', () => {
  return $customFetch<{
    list: TaskGroup[]
  }>('/task-groups')
})

watch(selectedTaskGroupId, async (value) => {
  if (value === null) {
    return
  }
  const data = await $customFetch<{
    item: TaskGroup
  }>(`/task-groups/${value}`, {
    method: 'GET',
  })
  selectedTaskGroup.value = data.item
})

const selectTaskGroup = (taskGroup: TaskGroup) => {
  selectedTaskGroupId.value = taskGroup.id
}

const changeDone = async (task: Task) => {
  try {
    const data = await $customFetch(`/tasks/${task.id}/done`, {
      method: 'PATCH',
      body: JSON.stringify({
        done: task.done,
      }),
    })
  console.dir(data);
  } catch (err) {
    console.dir(err);
  }
}

</script>

<template>
  <div>
    <h1>Tasks</h1>
    <ul>
      <li v-for="taskGroup in taskGroups?.list" :key="taskGroup.id">
        <a @click.prevent="selectTaskGroup(taskGroup)">{{ taskGroup.name }}</a>
      </li>
    </ul>
    <div v-if="selectedTaskGroup">
      <ul>
        <li v-for="task in selectedTaskGroup.tasks" :key="task.id">
          <p>{{task.title}}</p>
          <input type="checkbox" v-model="task.done" @change="changeDone(task)">
        </li>
      </ul>
    </div>
  </div>
</template>

