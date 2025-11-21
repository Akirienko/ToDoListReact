import { useState, useEffect } from "react"

export const useLocalStorage = <T,>(
  key: string,
  initialValue: T
): [T, (value: T) => void] => {

  const [data, setData] = useState<T>(() => {

    const saved = localStorage.getItem(key)

    if (saved) {
      return JSON.parse(saved)
    }

    return initialValue
  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(data))
  }, [data, key])

  return [data, setData]
}