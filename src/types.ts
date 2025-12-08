export type Task = {
  id: number | string
  title: string
  created_at: string
  isDone: boolean
}

export type User = {
  id: string
  username: string
  email: string
  age: number
  profession?: string
  mainGoal?: string
}

export type ProfileData = {
  username: string
  age: number
  profession?: string
  mainGoal?: string
}