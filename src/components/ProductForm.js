import React, { useState, useEffect } from 'react';

const ProductForm = ({ onProductCreate, productToEdit }) => {
    const [product, setProduct] = useState({
        description: '',
        category: '',
        price: '',
        isSpecial: false
    });

    // Update the form when a product is selected for editing
    useEffect(() => {
        if (productToEdit) {
            setProduct(productToEdit);
        }
    }, [productToEdit]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setProduct({
            ...product,
            [name]: type === 'checkbox' ? checked : value  // Handle checkbox correctly
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Make sure all fields are filled
        if (product.description && product.category && product.price) {
            onProductCreate(product);  // Call the function to create/update product
            setProduct({ description: '', category: '', price: '', isSpecial: false });  // Reset form after submission
        } else {
            console.error('All fields are required.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Description:</label>
                <input
                    type="text"
                    name="description"
                    value={product.description}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Category:</label>
                <select
                    name="category"
                    value={product.category}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select a category</option>
                    <option value="vegetables">Vegetables</option>
                    <option value="meat">Meat</option>
                    <option value="furniture">Furniture</option>
                </select>
            </div>
            <div>
                <label>Price:</label>
                <input
                    type="number"
                    name="price"
                    value={product.price}
                    onChange={handleChange}
                    step="0.01"
                    required
                />
            </div>
            <div>
                <label>Special:</label>
                <input
                    type="checkbox"
                    name="isSpecial"
                    checked={product.isSpecial}  // Correctly bind the checked state
                    onChange={handleChange}      // Handle checkbox changes
                />
            </div>
            <button type="submit">{productToEdit ? 'Update' : 'Add'} Product</button>
        </form>
    );
};

export default ProductForm;
