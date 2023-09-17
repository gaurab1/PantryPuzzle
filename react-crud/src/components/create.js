import React, { useState } from 'react';
import { Button, Form } from 'semantic-ui-react'

import foodSubmit from '../handles/foodsubmit';
import { useRef } from 'react';
//IMPORT FOODSUBMIT

//IMPORT 


import '../App.css';


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
            <Form className="create-form">
                <Form.Field>
                    <label>Food Item</label>
                    <input placeholder='Food Item' value={food} onChange={(e) => setFood(e.target.value)}/>
                </Form.Field>
                <Form.Field>
                    <label>Expiry Date</label>
                    <input placeholder='Expiry Date' value={expiry} onChange={(e) => setExpiry(e.target.value)}/>
                </Form.Field>
                <Button onClick={postData} type='submit'>Submit</Button>
            </Form>
        </div>
    )
}