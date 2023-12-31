<script setup lang="ts">
import draggable from 'vuedraggable'
import type { TaskGroup, Task } from '~/types';

definePageMeta({
  middleware: ['auth']
})

const {$customFetch} = useNuxtApp()

const router = useRouter()

const $inputTaskTitle = ref<HTMLInputElement | null>(null)

const {data: taskGroups} = await useAsyncData('/task-groups', () => {
  return $customFetch<{
    list: TaskGroup[]
  }>('/task-groups')
})

const selectedTaskGroupId = ref<number | null>(null)

const tasks = ref<Task[]>([])

watch(selectedTaskGroupId, async (value) => {
  const id = value ?? taskGroups.value?.list[0]?.id
  const data = await $customFetch<{
    item: TaskGroup
  }>(`/task-groups/${id}`, {
    method: 'GET',
  })
  tasks.value = data.item.tasks
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
        done: !task.done,
      },
    })
    task.done = !task.done
  } catch (err) {
    console.dir(err);
  }
}

const deleteTask = async (task: Task) => {
  const confirm = window.confirm('削除します、よろしいですか？')
  if (!confirm) return
  try {
    await $customFetch(`/tasks/${task.id}`, {
      method: 'DELETE',
    })
    tasks.value.splice(tasks.value.indexOf(task), 1)
  } catch (err) {
    console.dir(err);
  }
}

const addTask = () => {
  if (!selectedTaskGroupId.value) return
  tasks.value.push({
    id: 0,
    title: '',
    description: '',
    taskGroupId: selectedTaskGroupId.value,
    dueDate: null,
    dueTime: null,
    done: false,
  })

  // 最後の要素にフォーカス
  nextTick(() => {
    // NOTE: 配列になると思ったけど、配列にならなかった
    $inputTaskTitle.value?.focus();
  })
}

const submitTask = async (task: Task) => {
  try {
    if (task.id) {
      // 更新
      await $customFetch<{
        id: number
      }>(`/tasks/${task.id}`, {
        method: 'PATCH',
        body: {
          title: task.title,
          description: task.description,
          taskGroupId: task.taskGroupId,
        },
      })
    } else {
      // 新規
      const data = await $customFetch<{
        id: number
      }>(`/tasks`, {
        method: 'POST',
        body: {
          title: task.title,
          description: task.description,
          taskGroupId: task.taskGroupId,
        },
      })
      task.id = data.id
    }
  } catch (err) {
    console.dir(err);
  }
}

const dragEnd = async (event: {newIndex: number}) => {
  try {
    const targetId = tasks.value[event.newIndex].id;
    const prevId = tasks.value[event.newIndex - 1]?.id;
    const nextId = tasks.value[event.newIndex + 1]?.id;

    await $customFetch(`/tasks/${targetId}/sort`, {
      method: 'PATCH',
      body: {
        prevId: prevId,
        nextId: nextId
      },
    })
  } catch (err) {
    console.dir(err);
  }
}

</script>

<template>
  <div>
    <v-tabs
      v-if="taskGroups"
      align-tabs="left"
    >
      <v-tab 
        v-for="taskGroup in taskGroups.list"
        :key="taskGroup.id"
        :value="taskGroup.id"
        @click="selectTaskGroup(taskGroup)"
      >
        {{ taskGroup.name }}
      </v-tab>
      <v-tab
        :key="0"
        :value="0"
        @click="() => router.push('/task-groups')">
        <v-icon icon="$menu"></v-icon>
      </v-tab>
    </v-tabs>

    <v-list lines="three">
      <draggable
        v-model="tasks"
        item-key="id"
        @end="dragEnd"
      >
        <template #item="{element: task}">
          <v-list-item>
            <template v-slot:prepend>
              <v-list-item-action>
                <v-checkbox-btn v-model="task.done" :checked="task.done" @click.prevent="changeDone(task)"></v-checkbox-btn>
              </v-list-item-action>
            </template>

            <form @submit.prevent="submitTask(task)">
              <v-list-item-title>
                <input
                  v-model.trim="task.title"
                  name="taskTitle"
                  ref="$inputTaskTitle"
                  :style="{
                    border: 'none',
                    outline: 'none',
                    background: 'transparent',
                    width: '100%',
                  }"
                />
              </v-list-item-title>
              <v-list-item-subtitle>
                {{ task.description }}
              </v-list-item-subtitle>
            </form>

            <template v-slot:append>
              <v-list-item-action>
                <v-btn
                  variant="text"
                  size="small"
                  icon="$delete"
                  @click="deleteTask(task)"
                >
                </v-btn>
              </v-list-item-action>
            </template>
          </v-list-item>
        </template>
      </draggable>
    </v-list>

    <v-btn
      :style="{
        position: 'fixed',
        bottom: '1rem',
        right: '1rem',
      }"
      icon="$plus"
      color="primary"
      @click="addTask">
    </v-btn>
  </div>
</template>
