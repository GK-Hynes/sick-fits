import React, { useState } from 'react'
import useForm from '../lib/useForm'

export default function CreateProduct() {
  const {inputs, handleChange, clearForm, resetForm} = useForm({
    name: "Nice shoes",
    price: 3734,
    description: "These are the best shoes"
  })
  return (
    <form>
      <label htmlFor="name">
        Name
        <input type="text" name="name" id="name" placeholder="Name" value={inputs.name} onChange={handleChange}/>
      </label>
      <label htmlFor="price">
        Price
        <input type="number" name="price" id="price" placeholder="Price" value={inputs.price} onChange={handleChange}/>
      </label>
      <button type="button" onClick={clearForm}>Clear Form</button>
    </form>
  )
}
