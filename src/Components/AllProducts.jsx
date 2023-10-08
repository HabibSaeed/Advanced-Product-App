import { collection, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../firebase';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';
import Footer from './Footer';

const AllProducts = () => {
    const [allProducts, setAllProducts] = useState([]);

    useEffect(() => {
        const unsub = onSnapshot(collection(db, 'products'), (snapshot) => {
            const tempArr = [];
            snapshot.forEach((doc) => {
                tempArr.push({ ...doc.data(), id: doc.id });
            });
            setAllProducts(tempArr);
        });

        return () => unsub();
    }, []);

    return (
        <>
            <Navbar />
            <h1 style={{ textAlign: 'center', color: '#555' }}>All Products</h1>
            <div className="productsCard text-center"> {/* Added text-center class here */}
                {allProducts.map((product) => (
                    <div key={product.id} className="productCard">
                        <h2 className="productTitle">{product.productName}</h2>
                        <h4 className="productPrice">Price: {product.productPrice}</h4>
                        <p className="productDescription">
                            Description: {product.productDesc.length > 50 ? product.productDesc.slice(0, 50) + '...' : product.productDesc}
                        </p>
                        {/* Link to the product detail page */}
                        <Link to={`/product/${product.id}`} className='viewBtn'>View More</Link>
                    </div>
                ))}
            </div>
            <Footer />
        </>
    )
}

export default AllProducts;
