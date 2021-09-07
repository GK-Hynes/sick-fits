import { useMutation, useQuery } from "@apollo/client";
import gql from "graphql-tag";
import Form from "./styles/Form";
import DisplayError from "./ErrorMessage";
import useForm from "../lib/useForm";

const SINGLE_PRODUCT_QUERY = gql`
  query SINGLE_PRODUCT_QUERY($id: ID!) {
    Product(where: { id: $id }) {
      id
      name
      description
      price
    }
  }
`;

const UPDATE_PRODUCT_MUTATION = gql`
  mutation UPDATE_PRODUCT_MUTATION(
    $id: ID!
    $name: String
    $description: String
    $price: Int
  ) {
    updateProduct(
      id: $id
      data: { name: $name, description: $description, price: $price }
    ) {
      id
      name
      description
      price
    }
  }
`;

export default function UpdateProduct({ id }) {
  // Get existing product
  const { data, error, loading } = useQuery(SINGLE_PRODUCT_QUERY, {
    variables: { id }
  });

  // Get mutation to update product
  const [
    updateProduct,
    { data: updateData, error: updateError, loading: updateLoading }
  ] = useMutation(UPDATE_PRODUCT_MUTATION);
  // Create state for form inputs
  const { inputs, handleChange, clearForm, resetForm } = useForm(data?.Product);

  if (loading) return <p>Loading...</p>;

  // Form to handle updates
  return (
    <Form
      onSubmit={async (e) => {
        e.preventDefault();
        const res = await updateProduct({
          variables: {
            id: id,
            name: inputs.name,
            description: inputs.description,
            price: inputs.price
          }
        }).catch(console.error(error));
        // // Submit input fields to backend
        // const res = await createProduct();
        // clearForm();
        // // Go to that product's page
        // Router.push({
        //   path: `/product/${res.data.createProduct.id}`
        // });
        // TODO: handle submit
      }}
    >
      <DisplayError error={error || updateError} />
      <fieldset disabled={updateLoading} aria-busy={updateLoading}>
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
        <button type="submit">Update Product</button>
      </fieldset>
    </Form>
  );
}
