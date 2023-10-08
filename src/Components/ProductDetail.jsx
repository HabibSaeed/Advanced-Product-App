import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import "./ProductDetail.css"
import Navbar from './Navbar';
import Footer from './Footer';

const Product = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const docRef = doc(db, 'products', productId);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setProduct({ id: docSnap.id, ...docSnap.data() });
                } else {
                    console.log('No such document!');
                }
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };

        fetchProduct();
    }, [productId]);

    return (
        <>
            <Navbar />
            <div>

                {product ? (
                    <div className='productMain'>
                        <h1 >PRODUCTS DETAILS</h1>
                        <h1>Name : {product.productName}</h1>
                        <h2>Price : {product.productPrice}</h2>
                        <p><h3>Description :</h3> {product.productDesc}</p>
                        <Link to="/body" className='homeBtn'>Go Home</Link>
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
            <Footer />
        </>
    );
};

export default Product;
