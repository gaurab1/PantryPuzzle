import React, { useState } from 'react';
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
    const postData = () => {
        foodSubmit(food, expiry)
    }
    return (
        <div>
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