import React, { useState } from 'react';
import { Table, Button, TextArea } from 'semantic-ui-react'

import { collection, getDocs, doc, deleteDoc } from "firebase/firestore"; 
import { firestore } from '../firebase';
import donateSubmit from '../handles/donatesubmit'
import '../App.css';

import axios from 'axios';

const querySnapshot = await getDocs(collection(firestore, "test_data"));



//local host 3001
const backendURL = 'http://localhost:3001/recipe'

const onDelete = async (id) => {
    await deleteDoc(doc(firestore, "test_data", id));
    window.location.reload();
}

function handleDate(difference) {
  if(difference < 0) {
    return Math.abs(difference) + " days expired";
  }
  return difference + " days until expiration";

  
}



const Read = (onClose) => {
  const [text, setText] = useState('');
  
    const [DecisionModalOpen, setDecisionModalOpen] = useState(false); //for submitting feedback
    const [selectedFood, setselectedFood] = useState([]);
    const [daysTilExpire, setDaysTilExpire] = useState([]);

    const generateRecipe = async (foodItem) => {
      console.log(foodItem);
    
      //post request to backend with foodItem as body
    
      try {
        const requestData = {foodItem: foodItem};
        const response = await axios.post(backendURL, requestData);
        //from response body, get data field
        const recipeData = response.data;
        console.log(recipeData);
        setText(recipeData);
      } catch (error) {
        console.log(error);
      }
    
    
    }



    const DecisionModal = ({ onClose, foodItem, daysTilExpire }) => {
        console.log("heree");
        // e.preventDefault();
        return (
          <div className="modal-backdrop">
            <div className="modal-content">
              <span className="close-btn" onClick={onClose}>&times;</span>
    
              <div className="choices-container">
                <h1>What do you want to do with your {foodItem}?</h1>
                {/* <h2>{daysTilExpire}</h2> */}

                <Button onClick={() => generateRecipe( foodItem )}>Give me recipe ideas</Button>
                <Button onClick={function(){ donateSubmit(foodItem, daysTilExpire) }}>Donate my food</Button>
                <TextArea value={text} onChange={(e) => setText(e.target.value)} rows={5} cols={30} readonly={true} />
                    {/* REROUTE TO DONATE.JS PAGE!!!! */}
              </div>
      
            </div>
          </div>
        );
      };

      const  Donate = async ( food, expiry ) => {
            donateSubmit(food, expiry);
      };

      const  CONSOLE = async ( food, expiry ) => {
        donateSubmit(food, expiry);
  };


      const handleDecisionClick = (foodItem, daysTilExpire) => {
        setselectedFood(foodItem); // Merge the profilePictureUrl into the selectedApplicant
        setDaysTilExpire(daysTilExpire); // Merge the profilePictureUrl into the selectedApplicant
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
                            <Table.Cell>{ handleDate(days) }</Table.Cell>
                            <Table.Cell><Button onClick={() => onDelete(doc.id)}>Delete</Button></Table.Cell>

                         </Table.Row>
                    )} else {
                        return (
                            <Table.Row active>
                            <Table.Cell>{doc.data().food}</Table.Cell>
                             <Table.Cell>{doc.data().expirationDate}</Table.Cell>
                             <Table.Cell>{handleDate(days)}</Table.Cell>
                             <Table.Cell><Button onClick={() => handleDecisionClick(doc.data().food, days)}>Action!</Button></Table.Cell>
 
                          </Table.Row>
                        )
                    }
                })}
                
                </Table.Body>
            </Table>


            {DecisionModalOpen && (<DecisionModal 
                foodItem={selectedFood}
                daysTilExpire={daysTilExpire}
                onClose={() => setDecisionModalOpen(false)}/>
            )}
        </div>
    )
}

export default Read;