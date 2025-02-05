import { ChangeEvent, useState } from 'react'

const useInput = (initialValue: string) => {
  const [value, setValue] = useState(initialValue)
  const [error, setError] = useState('')

  const handleChange = (value: string) => {
    setValue(value)
  }

  return {
    value,
    error,
    onInputChange: handleChange,
    setError
  }
}

export default useInput;
