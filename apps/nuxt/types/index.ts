export type Task = {
  id: number
  title: string
  description: string
  taskGroupId: number
  done: boolean
  dueDate: string | null,
  dueTime: string | null,
}

export type TaskGroup = {
  id: number
  name: string
  tasks: Task[]
}
