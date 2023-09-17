import React, { useState } from 'react';
import { Table, Button } from 'semantic-ui-react'
import Geocode from "react-geocode";

import { collection, getDocs, doc, deleteDoc } from "firebase/firestore"; 
import { firestore } from '../firebase';
import donateSubmit from '../handles/donatesubmit'
import trash from '../trash-can-icon.svg'
import '../App.css';

const querySnapshot = await getDocs(collection(firestore, "test_data"));

const onDelete = async (id) => {
    await deleteDoc(doc(firestore, "test_data", id));
    window.location.reload();
}

const Read = (onClose) => {
    const [DecisionModalOpen, setDecisionModalOpen] = useState(false); //for submitting feedback
    const [selectedFood, setselectedFood] = useState([]);
    const [daysTilExpire, setDaysTilExpire] = useState([]);
    const [theID, settheID] = useState([]);


    const DecisionModal = ({ onClose, foodItem, daysTilExpire, id }) => {
        console.log("heree");
        return (
          <div className="modal-backdrop">
            <div className="modal-content">
              <span className="close-btn" onClick={onClose}>&times;</span>
    
              <div className="choices-container">
                <center><h1>What do you want to do with your {foodItem}?</h1></center>
                {/* <h2>{daysTilExpire}</h2> */}
                <center className="decision-btns">
                <Button>Give me recipe ideas</Button>
                <Button onClick={function() {donateAndClose(foodItem, daysTilExpire, onClose, id)}}>Donate my food</Button>
                </center>
                                   
              </div>
      
            </div>
          </div>
        );
      };

    const donateAndClose = (foodItem, daysTilExpire, onClose, id) => {
        console.log("donate");
        donateSubmit(foodItem, daysTilExpire);
        //delete from test_data!!!

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(pos => {
              const {latitude, longitude} = pos.coords;
              console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
              Geocode.setLanguage("en");
              Geocode.setLocationType("ROOFTOP");
              Geocode.enableDebug();

                const apiUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;

                fetch(apiUrl)
                .then((response) => response.json())
                .then((data) => {
                    const address = data.display_name;
                    console.log(`Address: ${address}`);
                    if (data.address && data.address.road) {
                        const street = data.address.road;
                        console.log(`Street: ${street}`);
                      } else {
                        console.error('Street name not found in the response.');
                      }
                })
                .catch((error) => {
                    console.error('Error fetching data:', error);
                });

            // Geocode.fromLatLng(latitude, longitude).then(
            //     (response) => {
            //       const address = response.results[0].formatted_address;
            //       console.log(address);
            //     },
            //     (error) => {
            //       console.error(error);
            //     }
            // );

            //   const url ='https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}'
            //   fetch(url).then(res => res.json()).then(data=>console.log(data))
            });
          } else {
            console.log("Geolocation is not supported by this browser.");
        }

        // onDelete(id);
        onClose= setDecisionModalOpen(false);
    }




      const handleDecisionClick = (foodItem, daysTilExpire, id) => {
        setselectedFood(foodItem); // Merge the profilePictureUrl into the selectedApplicant
        setDaysTilExpire(daysTilExpire); // Merge the profilePictureUrl into the selectedApplicant
        settheID(id);
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
                                <Table.Cell>{Math.ceil(-(date - new Date(doc.data().expirationDate)) / (1000 * 60 * 60 * 24))}</Table.Cell>
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
                                <Table.Cell>{Math.ceil(-(date - new Date(doc.data().expirationDate)) / (1000 * 60 * 60 * 24))}</Table.Cell>
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
                id={theID}
                />
            )}
        </div>
    )
}

export default Read;