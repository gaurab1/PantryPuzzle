import React, { useState } from 'react';

import Geocode from "react-geocode";
import { Table, Button, TextArea } from 'semantic-ui-react'

import { collection, getDocs, doc, deleteDoc, updateDoc, addDoc } from "firebase/firestore"; 
import { firestore } from '../firebase';
import donateSubmit from '../handles/donatesubmit'
import trash from '../trash-can-icon.svg'
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
    const [theID, settheID] = useState([]);
    const [location, setLocation] = useState([]);

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


    const DecisionModal = ({ onClose, foodItem, daysTilExpire, id, location }) => {
        console.log("heree");
        return (
          <div className="modal-backdrop">
            <div className="modal-content">
              <span className="close-btn" onClick={onClose}>&times;</span>
    
              <div className="choices-container">
                <center><h1>What do you want to do with your {foodItem}?</h1></center>
                {/* <h2>{daysTilExpire}</h2> */}
                <center className="decision-btns">
                <Button onClick={() => generateRecipe( foodItem )}>Give me recipe ideas</Button>
                <Button onClick={function() {donateAndClose(foodItem, daysTilExpire, onClose, id, location)}}>Donate my food</Button>
                </center>
                                   
              </div>
              <TextArea className="text-box" value={text} onChange={(e) => setText(e.target.value)} rows={5} cols={30} readonly={true} />
      
            </div>
          </div>
        );
      };

      const donateAndClose = async (foodItem, daysTilExpire, onClose, id, location) => {
        console.log("donate");
      
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(async (pos) => {
            const { latitude, longitude } = pos.coords;
            console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
            Geocode.setLanguage("en");
            Geocode.setLocationType("ROOFTOP");
            Geocode.enableDebug();
      
            const apiUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;
      
            try {
              const response = await fetch(apiUrl);
              const data = await response.json();
              const address = data.display_name;
              location = address;
              console.log(`Location var: ${location}`);
      
              // Create a new document in "donations" collection
              const docRef = await addDoc(collection(firestore, 'donations'), {
                food: foodItem,
                daysTilExpire: daysTilExpire,
              });
      
              // Capture the document ID of the newly created document
              const docId = docRef.id;
      
              // ADD LOCATION TO DOCUMENT IN "test_data" COLLECTION USING CAPTURED DOC ID
              const testDocRef = doc(firestore, 'donations', docId);
              const updateData = {
                userLocation: location,
              };
      
              try {
                await updateDoc(testDocRef, updateData);
                console.log('Document updated successfully in "donations" collection.');
              } catch (error) {
                console.error('Error updating document in "donations" collection:', error);
              }
            } catch (error) {
              console.error('Error fetching data:', error);
            }
          });
        } else {
          console.log("Geolocation is not supported by this browser.");
        }
      
        // DELETE FROM "test_data"
        onDelete(id);
        onClose = setDecisionModalOpen(false);
      };
      
      



      const handleDecisionClick = (foodItem, daysTilExpire, id, location) => {
        setselectedFood(foodItem); // Merge the profilePictureUrl into the selectedApplicant
        setDaysTilExpire(daysTilExpire); // Merge the profilePictureUrl into the selectedApplicant
        settheID(id);
        setLocation(location)
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
                        <Table.HeaderCell></Table.HeaderCell>
                        <Table.HeaderCell></Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                {
                querySnapshot.docs.map(doc => {
                    const days = Math.ceil(-(date - new Date(doc.data().expirationDate)) / (1000 * 60 * 60 * 24));
                    if (days < 2) {
                        return (
                            <Table.Row active className="highlighted">
                               <Table.Cell>{doc.data().food}</Table.Cell>
                                <Table.Cell>{doc.data().expirationDate}</Table.Cell>
                                <Table.Cell>{handleDate(days)}</Table.Cell>
                                <Table.Cell><Button onClick={() => handleDecisionClick(doc.data().food, days, doc.id)} className="urgent-btn"><bold>Action!</bold></Button></Table.Cell>
                                <Table.Cell><img src={trash} className="trash-icon" onClick={() => onDelete(doc.id)}/></Table.Cell>
                             </Table.Row>
                        )
                    }
                    else {
                        return (
                            <Table.Row>
                               <Table.Cell>{doc.data().food}</Table.Cell>
                                <Table.Cell>{doc.data().expirationDate}</Table.Cell>
                                <Table.Cell>{handleDate(days)}</Table.Cell>
                                <Table.Cell><Button onClick={() => handleDecisionClick(doc.data().food, days, doc.id)}>Action</Button></Table.Cell>
                                <Table.Cell><img src={trash} className="trash-icon" onClick={() => onDelete(doc.id)}/></Table.Cell>
                             </Table.Row>
                        )
                    }
                    
                })}
                
                </Table.Body>
            </Table>


            {DecisionModalOpen && (<DecisionModal 
                onClose={() => setDecisionModalOpen(false)}
                foodItem={selectedFood}
                daysTilExpire={daysTilExpire}
                location={location}
                id={theID}
                />
            )}
        </div>
    )
}

export default Read;