import React, { useEffect, useState } from 'react';
import { Table, Button } from 'semantic-ui-react'

import { collection, getDocs, doc, deleteDoc } from "firebase/firestore"; 
import { firestore } from '../firebase';


const querySnapshot = await getDocs(collection(firestore, "test_data"));

const onDelete = async (id) => {
    await deleteDoc(doc(firestore, "test_data", id));
    window.location.reload();
}
export default function Read() {
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    return ( 
        <div>
            <center><h3> Date {month}/{day}/{year}</h3></center>
            <Table singleLine>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Food Item</Table.HeaderCell>
                        <Table.HeaderCell>Expiry Date</Table.HeaderCell>
                        <Table.HeaderCell>Days to Expiry</Table.HeaderCell>
                        <Table.HeaderCell>Delete</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                {
                querySnapshot.docs.map(doc => {

                    return (
                        <Table.Row>
                           <Table.Cell>{doc.data().food}</Table.Cell>
                            <Table.Cell>{doc.data().expirationDate}</Table.Cell>
                            <Table.Cell>{Math.ceil(-(date - new Date(doc.data().expirationDate)) / (1000 * 60 * 60 * 24))}</Table.Cell>
                            <Table.Cell><Button onClick={() => onDelete(doc.id)}>Delete</Button></Table.Cell>
                         </Table.Row>
                    )
                })}
                
                </Table.Body>
            </Table>
        </div>
    )
}
