// reducers/index.js
import { combineReducers } from '@reduxjs/toolkit';
import eventReducer from './slices/slice';

const rootReducer = combineReducers({
    // La clé 'events' détermine le nom de l'espace dans le state global
list: eventReducer,
});

export default rootReducer;
