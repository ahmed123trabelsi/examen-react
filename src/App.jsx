import { Suspense, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from 'react-router-dom';
import Properties from './components/Properties';
import ReservationForm from './components/ReservationForm';

function App() {


  return (
    <>
     <Suspense fallback={<div>loading..</div>}> 
  <Routes>
    
 
<Route path="/" element={<Properties/>} />
<Route path="/reserve/:id" element={<ReservationForm/>} />
     

 {/*  <Route path="*" element={<NotFound />} />  */}
 </Routes> </Suspense>    
    </>
  )
}

export default App
