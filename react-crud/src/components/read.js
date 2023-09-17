import React, { useState } from 'react';
import { Table, Button } from 'semantic-ui-react'

import { collection, getDocs, doc, deleteDoc } from "firebase/firestore"; 
import { firestore } from '../firebase';
import '../App.css';

const querySnapshot = await getDocs(collection(firestore, "test_data"));

const onDelete = async (id) => {
    await deleteDoc(doc(firestore, "test_data", id));
    window.location.reload();
}

const Read = (onClose) => {
    const [DecisionModalOpen, setDecisionModalOpen] = useState(false); //for submitting feedback
    const [selectedFood, setselectedFood] = useState([]);




    const DecisionModal = ({ onClose, foodItem }) => {
        return (
          <div className="modal-backdrop">
            <div className="modal-content">
              <span className="close-btn" onClick={onClose}>&times;</span>
    
              <div className="choices-container">
                <h1>What do you want to do with {foodItem}?</h1>

                <button>Give me recipe ideas</button>
                <button>Donate my food</button>
              </div>
      
            </div>
          </div>
        );
      };


      const handleDecisionClick = (foodItem) => {
        setselectedFood(foodItem); // Merge the profilePictureUrl into the selectedApplicant
        console.log(foodItem);
        setDecisionModalOpen(true);
      };


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
                        <Table.HeaderCell>Expiry Date</Table.HeaderCell>
                        <Table.HeaderCell>Days to Expiry</Table.HeaderCell>
                        <Table.HeaderCell>Action?</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                {
                querySnapshot.docs.map(doc => {
                    const days = Math.ceil(-(date - new Date(doc.data().expirationDate)) / (1000 * 60 * 60 * 24));
                    if (days > 2) {
                    return (
                        <Table.Row>
                           <Table.Cell>{doc.data().food}</Table.Cell>
                            <Table.Cell>{doc.data().expirationDate}</Table.Cell>
                            <Table.Cell>{Math.ceil(-(date - new Date(doc.data().expirationDate)) / (1000 * 60 * 60 * 24))}</Table.Cell>
                            <Table.Cell><Button onClick={() => onDelete(doc.id)}>Delete</Button></Table.Cell>

                         </Table.Row>
                    )} else {
                        return (
                            <Table.Row active>
                            <Table.Cell>{doc.data().food}</Table.Cell>
                             <Table.Cell>{doc.data().expirationDate}</Table.Cell>
                             <Table.Cell>{Math.ceil(-(date - new Date(doc.data().expirationDate)) / (1000 * 60 * 60 * 24))}</Table.Cell>
                             <Table.Cell><Button onClick={() => handleDecisionClick(doc.data().food)}>Action!</Button></Table.Cell>
 
                          </Table.Row>
                        )
                    }
                })}
                
                </Table.Body>
            </Table>


            {DecisionModalOpen && (<DecisionModal 
                foodItem={selectedFood}
                onClose={() => setDecisionModalOpen(false)}/>
            )}
        </div>
    )
}

export default Read;