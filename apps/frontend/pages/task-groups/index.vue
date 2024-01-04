<script setup lang="ts">
import { ref } from 'vue'
import draggable from 'vuedraggable'
import type { TaskGroup } from '~/types';

definePageMeta({
  middleware: ['auth']
})

const {$customFetch} = useNuxtApp()

const $inputName = ref<HTMLInputElement | null>(null)

const {data: taskGroups} = await useAsyncData('/task-groups', () => {
  return $customFetch<{
    list: TaskGroup[]
  }>('/task-groups')
})

const deleteTaskGroup = async (taskGroup: TaskGroup) => {
  const confirm = window.confirm('削除します、よろしいですか？')
  if (!confirm) return
  try {
    await $customFetch(`/task-groups/${taskGroup.id}`, {
      method: 'DELETE',
    })
    taskGroups.value?.list.splice(taskGroups.value?.list.indexOf(taskGroup), 1)
  } catch (err) {
    console.dir(err);
  }
}

const dragEnd = async (event: {newIndex: number}) => {
  try {
    const targetId = taskGroups.value?.list[event.newIndex].id;
    const prevId = taskGroups.value?.list[event.newIndex - 1]?.id;
    const nextId = taskGroups.value?.list[event.newIndex + 1]?.id;

    await $customFetch(`/task-groups/${targetId}/sort`, {
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

const addTaskGroup = () => {
  taskGroups.value?.list.push({
    id: 0,
    name: '',
    tasks: []
  })

  // 最後の要素にフォーカス
  nextTick(() => {
    // NOTE: 配列になると思ったけど、配列にならなかった
    $inputName.value?.focus();
  })
}

const submitTaskGroup = async (taskGroup: TaskGroup) => {
  try {
    if (taskGroup.id) {
      // 更新
      await $customFetch<{
        id: number
      }>(`/task-groups/${taskGroup.id}`, {
        method: 'PATCH',
        body: {
          name: taskGroup.name,
        },
      })
    } else {
      // 新規
      const data = await $customFetch<{
        id: number
      }>(`/task-groups`, {
        method: 'POST',
        body: {
          name: taskGroup.name,
        },
      })
      taskGroup.id = data.id
    }
  } catch (err) {
    console.dir(err);
  }
}
</script>

<template>
  <div>
    <v-list v-if="taskGroups" lines="two">
      <draggable
        v-if="taskGroups"
        v-model="taskGroups.list"
        item-key="id"
        @end="dragEnd"
      >
        <template #item="{element: taskGroup}">
          <v-list-item>
            <v-list-item-title>
              <input
                  v-model.trim="taskGroup.name"
                  name="taskGroupName"
                  ref="$inputName"
                  :style="{
                    border: 'none',
                    outline: 'none',
                    background: 'transparent',
                    width: '100%',
                  }"
                  @change="submitTaskGroup(taskGroup)"
                />
            </v-list-item-title>

            <template v-slot:append>
              <v-list-item-action>
                <v-btn 
                  variant="text"
                  size="small"
                  icon="$delete"
                  @click="deleteTaskGroup(taskGroup)"
                >
                </v-btn>
              </v-list-item-action>
            </template>
          </v-list-item>
        </template>
      </draggable>
      <v-list-item>
        <div>
          <v-btn size="large" variant="outlined" @click="addTaskGroup">
            Add Task group
          </v-btn>
        </div>  
      </v-list-item>
    </v-list>
    <div>
      <nuxt-link to="/home">Back</nuxt-link>
    </div>
  </div>
</template>
