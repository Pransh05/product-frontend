import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductForm from './components/ProductForm';
import ProductList from './components/ProductList';
const baseUrl = process.env.REACT_APP_BACKEND_URL;

const App = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  // fetch products from the backend
  const fetchProducts = () => {
    axios.get('http://localhost:8080/api/products')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  };

  // fetch products when the component mounts
  useEffect(() => {
    fetchProducts();
  }, []);

  // product creation
  const handleProductCreate = (newProduct) => {
    if (editingProduct) {

      axios.put(`http://localhost:8080/api/products/${editingProduct.id}`, newProduct)
        .then(() => {
          setEditingProduct(null);
          fetchProducts();
        })
        .catch(error => {
          console.error('Error updating product:', error);
        });
    } else {

      axios.post('http://localhost:8080/api/products', newProduct)
        .then(() => {
          fetchProducts();
        })
        .catch(error => {
          console.error('Error creating product:', error);
        });
    }
  };

  // product deletion
  const handleProductDelete = (productId) => {
    axios.delete(`http://localhost:8080/api/products/${productId}`)
      .then(() => {
        fetchProducts();
      })
      .catch(error => {
        console.error('Error deleting product:', error);
      });
  };

  // product editing
  const handleProductEdit = (product) => {
    setEditingProduct(product);  // Set the product being edited
  };

  return (
    <div>
      <h1>Product Management</h1>
      <ProductForm onProductCreate={handleProductCreate} productToEdit={editingProduct} />
      <ProductList products={products} onEdit={handleProductEdit} onDelete={handleProductDelete} />
    </div>
  );
};

export default App;
