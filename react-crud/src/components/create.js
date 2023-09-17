import React, { useState, useEffect } from 'react';
import { Button, Form } from 'semantic-ui-react'

import foodSubmit from '../handles/foodsubmit';
import { useRef } from 'react';
//IMPORT FOODSUBMIT

//IMPORT 


import '../App.css';


export default function Create() {
    const foodItem = useRef()
    const expDate = useRef()



    const [food, setFood] = useState('');
    const [expiry, setExpiry] = useState('');
    const [images, setImages] = useState([]);
    const [imageURLs, setImageURLs] = useState([]);
    const postData = () => {
        foodSubmit(food, expiry)
    }

    useEffect(() => {
        console.log("DID IT");
        if (images.length < 1) return;
        const newImageUrls = [];
        images.forEach(image => newImageUrls.push(URL.createObjectURL(image)));

        console.log("HEY");
        //new code for backend communication.

        const formData = new FormData();
        for (let i = 0; i < images.length; i++) {
            formData.append('image', images[i]);
        }

        fetch('http://localhost:3000', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            console.log(response);
            setImageURLs(newImageUrls);
        })
        .catch(error => {
            console.error("Error uploading images: ", error);
        });
        console.log("DID IT");

        

        setImageURLs(newImageUrls);
        console.log(newImageUrls);
    }, [images]);

    

    // const handleImageUpload = async () => {
    //     const formData = new FormData();
    //     for (let i = 0; i < images.length; i++) {
    //         formData.append('image', images[i]);
    //     }
    //     try {
    //         const response = await fetch('http://localhost:3000/image-urls', {
    //             method: 'POST',
    //             body: formData
    //         });
    //         console.log(response);
    //     } catch(error) {
    //         console.error("Error uploading images: ", error);
    //     }
    // };

    function onImageChange(e){
        setImages([...e.target.files]);
    }

    return (
        <div>
            Upload Food Images
            <br/>
            <br/>
            <input type="file" multiple accept="image/*" onChange={onImageChange} />
            {imageURLs.map(imageSrc => <img src={imageSrc}  width="10%"/>)}
            <br/>
            <br/>

            OR

            <br/>
            <br/>
            <Form className="create-form">
                <Form.Field>
                    <label>Food Item</label>
                    <input placeholder='Food Item' onChange={(e) => setFood(e.target.value)}/>
                </Form.Field>
                <Form.Field>
                    <label>Expiry Date</label>
                    <input placeholder='Expiry Date' onChange={(e) => setExpiry(e.target.value)}/>
                </Form.Field>
                <Button onClick={postData} type='submit'>Submit</Button>
            </Form>
        </div>
    )
}