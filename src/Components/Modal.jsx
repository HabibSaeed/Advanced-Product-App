import React, { useState } from 'react';
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";
import "./Modal.css";
import { CircularProgress } from "@mui/material";
import { storage } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";


const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 2,
    borderRadius: "12px",
};

export default function TransitionsModal({ closeModal }) {
    const [productName, setProductName] = useState("");
    const [productPrice, setProductPrice] = useState("");
    const [productDesc, setProductDesc] = useState("");
    const [image, setImage] = useState(null); // Store the selected image file
    const [loader, setLoader] = useState(false);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
    };

    const addTodo = async (e) => {
        e.preventDefault();
        try {
            setLoader(true);

            // Step 1: Upload the image to Firebase Storage
            const storageRef = ref(db.storage, `product_images/${image.name}`);
            await uploadBytes(storageRef, image);

            // Step 2: Get the image URL from Firebase Storage
            const imageUrl = await getDownloadURL(storageRef);

            // Step 3: Save product details including the image URL in Firestore
            const docRef = await addDoc(collection(db, "products"), {
                productName,
                productPrice,
                productDesc,
                imageUrl, // Save the image URL
            });

            setLoader(false);
            closeModal();
            console.log("Document written with ID: ", docRef.id);
        } catch (error) {
            setLoader(false);
            console.error(error);
            alert(error.message);
        }
    };

    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={true}
                onClose={closeModal}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={true}>
                    <Box sx={style}>
                        <Box>
                            <h1 className="heading">Add Your Product</h1>
                        </Box>
                        <Box component={"form"} onSubmit={addTodo}>
                            <input
                                type="text"
                                placeholder="Enter Product Name"
                                onChange={(e) => setProductName(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="Enter Product Price"
                                onChange={(e) => setProductPrice(e.target.value)}
                            />
                            <input
                                type="file"
                                accept="image/*" // Accept only image files
                                onChange={handleImageChange} // Handle image file selection
                            />
                            <textarea
                                type="text"
                                placeholder="Enter Product Desc"
                                onChange={(e) => setProductDesc(e.target.value)}
                            />
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    gap: "10px",
                                }}
                            >
                                <Button variant="contained" type="submit">
                                    {loader ? (
                                        <CircularProgress size={"18px"} sx={{ color: "white" }} />
                                    ) : (
                                        "Add"
                                    )}
                                </Button>
                                <Button onClick={closeModal} variant="contained" color="error">
                                    CLOSE
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}
