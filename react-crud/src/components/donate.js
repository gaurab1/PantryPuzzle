//MODIFY!!!!

import React, { useState } from 'react';
import { Table, Button } from 'semantic-ui-react'

import { collection, getDocs, doc, deleteDoc } from "firebase/firestore"; 
import { firestore } from '../firebase';
import donateSubmit from '../handles/donatesubmit'
import '../App.css';

const querySnapshot = await getDocs(collection(firestore, "donations"));

const onDelete = async (id) => {
    await deleteDoc(doc(firestore, "donations", id));
    window.location.reload();
}

const Read = (onClose) => {


    //Main return statement
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    return ( 
        <div>
            <center><h3> Today's Date: {month}/{day}/{year}</h3></center>
            <Table singleLine>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Food Item</Table.HeaderCell>
                        <Table.HeaderCell>Days to Expiry</Table.HeaderCell>
                        <Table.HeaderCell>Action?</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                {
                querySnapshot.docs.map(doc => {
                    return (
                        <Table.Row>
                           <Table.Cell>{doc.data().food}</Table.Cell>
                            <Table.Cell>{doc.data().daysTilExpire}</Table.Cell>
                            <Table.Cell><Button>Request</Button></Table.Cell>

                         </Table.Row>
                    )
                })}
                
                </Table.Body>
            </Table>


        </div>
    )
}

export default Read;