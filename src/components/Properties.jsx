import React, { useEffect, useState } from 'react';
import { Row, Form, FormControl } from 'react-bootstrap';
import { getallProperties } from '../services/api';
import Property from './Property';

export default function Properties() {
  const [data, setData] = useState([]);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const updateViews = async (propertyId) => {
  
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getallProperties();
        setData(result.data);
      } catch (error) {
        console.error("Error fetching property data:", error);
      }
    };

    fetchData();
  }, []);

  const handleFilter = (property) => {
    const price = parseFloat(property.price); 
    return price >= (minPrice || 0) && price <= (maxPrice || Infinity);
  };

  return (
    <>
      <Form inline className="mb-4">
        <FormControl
          type="number"
          placeholder="Prix minimum"
          className="mr-sm-2"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
        />
        <FormControl
          type="number"
          placeholder="Prix maximum"
          className="mr-sm-2"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />
      </Form>
      <Row xs={1} md={4} className="g-4">
        {data.filter(handleFilter).map((property) => (
          <Property
            event={property}
            key={property.id}
            updateViews={updateViews}
          />
        ))}
      </Row>
    </>
  );
}
