<script setup lang="ts">
import draggable from 'vuedraggable'
import type { TaskGroup, Task } from '~/types';

const {$customFetch} = useNuxtApp()

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
        prevTaskId: prevId,
        nextTaskId: nextId
      },
    })
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
              {{ taskGroup.name }}
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
    </v-list>
  </div>
</template>
