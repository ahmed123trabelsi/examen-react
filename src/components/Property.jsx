

  import React, { useState } from 'react'
import { Button, Card } from 'react-bootstrap';
import { Form, Link, useNavigate } from 'react-router-dom';
import { editProperty, getallProperties } from '../services/api';

export default function Property({event, updateViews}) {
    const [ev, setEv] = useState(event);
    const navigate = useNavigate();
    const [showRating, setShowRating] = useState(false); 
    const [rating, setRating] = useState(1);
    const incrementPropertyViews = async (id) => {
        try {
          const property = await getallProperties(id);
          const updatedViews = property.data.vue_number + 1;
          await editProperty(id, { ...property.data, vue_number: updatedViews });
        } catch (error) {
          console.error('Error incrementing property views:', error);
        }
      };
    const handleReservation = async () => {
      
        await incrementPropertyViews(ev.id);
    
      
        navigate(`/reserve/${ev.id}`, { state: { property: ev } }); 
      };
      const handleAddRating = () => {
        setShowRating(true); 
      };
    
      const handleRatingChange = (e) => {
        setRating(e.target.value); 
      };
  return (
    <>          
    <Card style={{ width: "18rem" }} className="me-5 mt-4">

   <Card.Body>
   <Card.Title>
   <Link     >{ev.name}</Link>
   </Card.Title>
     <Card.Text>{ev.adress}</Card.Text>
     <Card.Text>prix: {ev.price}</Card.Text>
     <Card.Text>nombre de vue: {ev.vue_number}</Card.Text>

     {ev.available && (
            <Button variant="primary" onClick={handleReservation}>
              Réserver la propriété
            </Button>
          )}
               <Button variant="secondary" onClick={handleAddRating}>
            Ajouter une évaluation
          </Button>

          {showRating && (
            <Form.Control as="select" value={rating} onChange={handleRatingChange} className="mt-2">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </Form.Control>
          )}

   

     
   </Card.Body>
 </Card></>
  )
}
