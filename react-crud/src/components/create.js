import React from 'react'
import { Button, Checkbox, Form } from 'semantic-ui-react'

import '../App.css';

const Create = () => (
    <Form className="create-form">
        <Form.Field>
            <label>Food item</label>
            <input placeholder='First Name' />
        </Form.Field>
        <Form.Field>
            <label>Expiry date</label>
            <input placeholder='Last Name' />
        </Form.Field>
        <Form.Field>
            <Checkbox label='I agree to the Terms and Conditions' />
        </Form.Field>
        <Button type='submit'>Submit</Button>
    </Form>
)

export default Create;