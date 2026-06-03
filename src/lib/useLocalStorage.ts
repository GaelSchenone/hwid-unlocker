"use client"

import { useState, useEffect, useCallback } from "react"

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(initialValue)

  useEffect(() => {
    try {
      const item = localStorage.getItem(key)
      if (item) {
        setValue(JSON.parse(item))
      }
    } catch {}
  }, [key])

  const setStoredValue = useCallback(
    (newValue: T | ((prev: T) => T)) => {
      setValue((prev) => {
        const val =
          newValue instanceof Function ? newValue(prev) : newValue
        try {
          localStorage.setItem(key, JSON.stringify(val))
        } catch {}
        return val
      })
    },
    [key]
  )

  return [value, setStoredValue] as const
}
