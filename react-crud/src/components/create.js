import React, { useState, useEffect } from 'react';
import { Button, Form } from 'semantic-ui-react'

import foodSubmit from '../handles/foodsubmit';
import { useRef } from 'react';
import axios from 'axios';
//IMPORT FOODSUBMIT

//IMPORT 


import '../App.css';

const backendUrl = 'http://127.0.0.1:3001/create';
const backendUrl2 = 'http://127.0.0.1:3001/images';

export default function Create() {
    const foodItem = useRef()
    const expDate = useRef()



    const [food, setFood] = useState('');
    const [expiry, setExpiry] = useState('');
    const [images, setImages] = useState([]);
    const [imageURLs, setImageURLs] = useState([]);
    // const postData = async () => {
    //     try {
    //         const formData = new FormData();

    //         formData.append('food', food);
    //         formData.append('expiry', expiry);

    //         images.forEach((image, index) => {
    //             formData.append(`image${index}`, image);
    //           });
            
    //           const response = await axios.post(backendUrl, formData);
    //           console.log(response.data);
    //           alert('Data uploaded successfully');
    //         } catch (error) {
    //             console.error(error);   
    //             alert('Error uploading data');
    //           }

    //     foodSubmit(food, expiry);
    // };

    const testSubmit = async (e) => {
        e.preventDefault();
        try {
            const requestData = { food: food, expiry: expiry }; // Create an object with the data you want to send
            const response = await axios.post(backendUrl, requestData);
          //setMessage(response.data.message);
        } catch (error) {
          console.error('Error sending data:', error);
        }
      };

    useEffect(() => {
        console.log("DID IT");
        if (images.length < 1) return;
        const newImageUrls = [];
        //images.forEach(image => newImageUrls.push(URL.createObjectURL(image)));

        console.log("HEY");
        //new code for backend communication.

        setImageURLs(newImageUrls);
        console.log(newImageUrls);
    }, [images]);

    


    // function onImageChange(e){
    //     console.log(e.target.files[0]);
    //     setImages([...e.target.files]);


    // }

    const onImageUpload = async (e) => {
        setImages([...e.target.files]);
        
        axios.post(backendUrl2, formData).then((response) => {
            console.log(response);
        })
        console.log("DONE");

        
    }

    

    return (
        <div>
            Upload Food Images
            <br/>
            <br/>
            <input type="file" multiple accept="image/*" onChange={onImageUpload} />
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
                <Button onClick={testSubmit} type='submit'>Submit</Button>
            </Form>
        </div>
    )
}