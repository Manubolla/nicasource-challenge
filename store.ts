import { createStore } from 'redux';
import applicationReducer from './reducers/application.reducers';

const store = createStore(applicationReducer);
export default store;
