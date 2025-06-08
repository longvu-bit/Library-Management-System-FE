/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useEffect } from 'react'

export const debouncedSearch = (value, delay) => {
  const [debounceValue, setDebounceValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debounceValue
}
