import React from 'react';

const ProductList = ({ products, onEdit, onDelete }) => {
    return (
        <div>
            <h2>Product List</h2>
            {products.length === 0 ? (
                <p>No products available</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Special</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product.id} style={{ backgroundColor: product.isSpecial ? 'yellow' : 'white' }}>
                                <td>{product.description}</td>
                                <td>{product.category}</td>
                                <td>{product.price.toFixed(2)}</td>
                                <td>
                                    <input type="checkbox" checked={product.isSpecial} readOnly />
                                </td>
                                <td>
                                    <button onClick={() => onEdit(product)}>Edit</button>
                                    <button onClick={() => onDelete(product.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ProductList;
