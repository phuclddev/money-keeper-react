import { configureStore } from '@reduxjs/toolkit';
import mainReducer from '../modules/reducer';

export default configureStore({
  reducer: {
    main: mainReducer
  },
})