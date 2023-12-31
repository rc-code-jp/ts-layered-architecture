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

const {data: taskGroups} = await useAsyncData('/task-groups', () => {
  return $customFetch<{
    list: TaskGroup[]
  }>('/task-groups')
})

const firstTaskGroupId = taskGroups.value?.list[0].id ?? null

const selectedTaskGroupId = ref<number | null>(firstTaskGroupId)
const selectedTaskGroup = ref<TaskGroup | null>(null)

watch(selectedTaskGroupId, async (value) => {
  const data = await $customFetch<{
    item: TaskGroup
  }>(`/task-groups/${value}`, {
    method: 'GET',
  })
  selectedTaskGroup.value = data.item
}, {
  immediate: true,
})

const selectTaskGroup = (taskGroup: TaskGroup) => {
  selectedTaskGroupId.value = taskGroup.id
}

const changeDone = async (task: Task) => {
  try {
    await $customFetch(`/tasks/${task.id}/done`, {
      method: 'PATCH',
      body: {
        done: task.done,
      },
    })
    task.done = task.done
  } catch (err) {
    console.dir(err);
  }
}

const deleteTask = async (task: Task) => {
  const confirm = window.confirm('Are you sure?')
  if (!confirm) return
  try {
    await $customFetch(`/tasks/${task.id}`, {
      method: 'DELETE',
    })
    selectedTaskGroup.value?.tasks.splice(selectedTaskGroup.value?.tasks.indexOf(task), 1)
  } catch (err) {
    console.dir(err);
  }
}

</script>

<template>
  <div>
    <v-tabs
      v-if="taskGroups"
      v-model="selectedTaskGroupId"
      align-tabs="left"
    >
      <v-tab 
        v-for="taskGroup in taskGroups.list"
        :key="taskGroup.id"
        :value="taskGroup.id"
        @click.prevent="selectTaskGroup(taskGroup)"
      >
        {{ taskGroup.name }}
      </v-tab>
    </v-tabs>

    <v-list v-if="selectedTaskGroup" lines="three">
      <v-list-item v-for="task in selectedTaskGroup.tasks" :key="task.id" :value="task">
        
        <template v-slot:prepend>
          <v-list-item-action>
            <v-checkbox-btn v-model="task.done" @click="changeDone(task)"></v-checkbox-btn>
          </v-list-item-action>
        </template>

        <v-list-item-title>{{ task.title }}</v-list-item-title>
        
        <v-list-item-subtitle>
          {{ task.description }}
        </v-list-item-subtitle>

        <template v-slot:append>
          <v-list-item-action>
            <v-btn variant="text" size="small" icon="$delete" @click="deleteTask(task)">
            </v-btn>
          </v-list-item-action>
        </template>
      </v-list-item>
    </v-list>

    <v-btn
      :style="{
        position: 'fixed',
        bottom: '1rem',
        right: '1rem',
      }"
      icon="$plus"
      @click="() => null">
    </v-btn>
  </div>
</template>
