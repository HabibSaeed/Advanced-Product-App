import React, { useState, useEffect } from 'react';
import './Body.css';
import Button from './Button';
import TransitionsModal from './Modal';
import { db } from '../firebase';
import { collection, onSnapshot } from 'firebase/firestore';
import { Carousel } from 'react-responsive-carousel';
import Navbar from './Navbar';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Footer from './Footer';
import { Link } from 'react-router-dom';

const Body = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
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

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };


    return (
        <>
            <Navbar />
            <div className="bodyMain">
                <div className="bodyNested1">
                    <Carousel infiniteLoop autoPlay showThumbs={false}>
                        <div>
                            <img src="https://wallpapers.com/images/high/music-symbols-treble-clef-in-blue-and-orange-7zyg2qb6n7nwcbzh.webp" alt="My Picture" />
                        </div>
                        <div>
                            <img src="https://wallpapers.com/images/high/music-4k-headphones-nw4padndnep0wut4.webp" alt="" />
                        </div>
                        <div>
                            <img src="https://wallpapers.com/images/high/kid-with-radio-music-4k-05vuvrtqe511s36j.webp" alt="" />
                        </div>
                    </Carousel>
                </div>
                <div className='bodyNested2'>
                    <h1>Welcome to Our Product App</h1>
                    <p>Welcome to our cutting-edge Product App, where we harness the power of Firebase, React.js, and the latest JavaScript ES6 features to deliver a seamless and dynamic user experience. Our app leverages Firebase's real-time database and authentication capabilities, providing users with secure access and ensuring that data is always up-to-date.</p>
                    <div className='bodyNested3'>
                        <div className='firebase same-1'>
                            <h2>FireBase</h2>
                            <div className="spinner">
                                <div className="static-spinner">
                                    <div className="static-fill"></div>
                                </div>
                                65%
                            </div>
                            <Button name="FireBase" color="blue" />
                        </div>
                        <div className='jses6 same-1'>
                            <h2>JS(ES6)</h2>
                            <div className="spinner">
                                <div className="static-spinner-2">
                                    <div className="static-fill-2"></div>
                                </div>
                                55%
                            </div>
                            <Button name="Javascript" color="#adad1f" />
                        </div>
                        <div className='react same-1'>
                            <h2>React Js</h2>
                            <div className="spinner">
                                <div className="static-spinner-3">
                                    <div className="static-fill-3"></div>
                                </div>
                                85%
                            </div>
                            <Button name="React JS" color="#087ea4" />
                        </div>
                    </div>
                    <div className='addProduct'>
                        <button className='productBtn' onClick={openModal}>Add Product</button>
                    </div>

                    {isModalOpen && <TransitionsModal closeModal={closeModal} />}
                </div>
            </div>
            <div className="productsCard">
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
    );
};

export default Body;
