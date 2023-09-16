import React, { useState } from 'react';
import { Button, Checkbox, Form } from 'semantic-ui-react'


import '../App.css';


export default function Create() {
    const [food, setFood] = useState('');
    const [expiry, setExpiry] = useState('');
    const postData = () => {
        console.log(food);
        console.log(expiry);
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