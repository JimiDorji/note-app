import {configureStore} from '@reduxjs/toolkit';
import notesReducer from './store/notesSlice';

const store = configureStore({
  reducer: {
    notes: notesReducer,
  },
});

export default store;
