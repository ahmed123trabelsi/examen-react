import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap'; 
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate, useParams } from 'react-router-dom';
import { editProperty, getallProperties } from '../services/api';

export default function ReservationForm() {
    const { id} = useParams();
    const [property, setProperty] = useState(null);
    const [data, setData] = useState([]);
  const [tenantName, setTenantName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const navigate = useNavigate();
  const p = data.find(p => p.id === id);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getallProperties(id);
        setProperty(result.data);
      } catch (error) {
        console.error("Error fetching property data:", error);
      }
    };
    fetchData();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (property) {
 
      const duration = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
      const totalPrice = duration * property.price;

      await editProperty(id, { ...property, available: false });

      setConfirmationMessage(`Mr|Mme ${tenantName}, votre réservation pour la propriété ${property.name} est confirmée pour un prix de ${totalPrice} DT.`);
      setShowConfirmation(true);

    
      setTimeout(() => {
        setTenantName('');
        setPhoneNumber('');
        setStartDate(new Date());
        setEndDate(new Date());
        setShowConfirmation(false);
        navigate('/');
      }, 5000);
    }
  };
  
    return (    <>
        {showConfirmation && <div>{confirmationMessage}</div>}
        <p>reserver la propriete avec id{id}</p>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formTenantName">
          <Form.Label>Nom du locataire</Form.Label>
          <Form.Control
            type="text"
            placeholder="Entrez le nom du locataire"
            value={tenantName}
            onChange={(e) => setTenantName(e.target.value)}
          />
        </Form.Group>
  
        <Form.Group controlId="formPhoneNumber">
          <Form.Label>Numéro de téléphone</Form.Label>
          <Form.Control
            type="tel"
            placeholder="Entrez le numéro de téléphone"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </Form.Group>
  
        <Form.Group controlId="formStartDate">
          <Form.Label>Date de début</Form.Label>
          <ReactDatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
        </Form.Group>
  
        <Form.Group controlId="formEndDate">
          <Form.Label>Date de fin</Form.Label>
          <ReactDatePicker selected={endDate} onChange={(date) => setEndDate(date)} />
        </Form.Group>
  
        <Button variant="primary" type="submit">
          Valider
        </Button>
      </Form>
      </>
    );
}
