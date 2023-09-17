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

    const [food, setFood] = useState('');
    const [expiry, setExpiry] = useState('');
    const postData = () => {
        foodSubmit(food, expiry)
        setFood('')
        setExpiry('')
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
                    <input placeholder='Food Item' value={food} onChange={(e) => setFood(e.target.value)}/>
                </Form.Field>
                <Form.Field>
                    <label>Expiry Date</label>
                    <input placeholder='Expiry Date' value={expiry} onChange={(e) => setExpiry(e.target.value)}/>
                </Form.Field>
                <Button onClick={testSubmit} type='submit'>Submit</Button>
            </Form>
        </div>
    )
}