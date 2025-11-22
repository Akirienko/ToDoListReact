export type Task = {
  id: number | string
  title: string
  created_at: string
  isDone: boolean
}

export type User = {
  username: string
  email: string
  age: number
  password: string
  profession?: string
  mainGoal?: string
}