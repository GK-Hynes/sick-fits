import React, { useState } from 'react'

export default function useForm(initial ={}) {
  // Create state object for inputs
  const [inputs, setInputs] = useState(initial)
  
  function handleChange(e) {
    let {value, name, type} = e.target
    if(type === "number") {
      value = parseInt(value)
    }
    if(type === "file") {
      value[0] = e.target.files
    }
    setInputs({
      // Copy existing state
      ...inputs,
      [name]: value
    })
  }

  function resetForm(){
    setInputs(inital)
  }

  function clearForm(){
    const blankState = Object.fromEntries(Object.entries(inputs).map(([key, value]) => [key, ""]))
    setInputs(blankState)
  }

  // Return the things you want to surface
  return {
    inputs,
    handleChange,
    resetForm,
    clearForm
  }
}
