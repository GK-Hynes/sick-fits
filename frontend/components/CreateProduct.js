import React, { useState } from 'react'
import useForm from '../lib/useForm'
import Form from "./styles/Form"

export default function CreateProduct() {
  const {inputs, handleChange, clearForm, resetForm} = useForm({
    image: "",
    name: "Nice shoes",
    price: 3734,
    description: "These are the best shoes"
  })
  return (
    <Form onSubmit={e => {
      e.preventDefault()
      console.log(inputs)
    }}>
      <fieldset>
        <label htmlFor="image">
          Image
          <input type="file" name="image" id="image" onChange={handleChange} required/>
        </label>
        <label htmlFor="name">
          Name
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Name"
            value={inputs.name}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="price">
          Price
          <input
            type="number"
            name="price"
            id="price"
            placeholder="Price"
            value={inputs.price}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="description">
          Description
          <textarea
            name="description"
            id="description"
            placeholder="Description"
            value={inputs.description}
            onChange={handleChange}
          ></textarea>
        </label>
        <button type="submit">+ Add Product</button>
      </fieldset>
    </Form>
  );
}
