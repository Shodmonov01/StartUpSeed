import { configureStore, applyMiddleware } from '@reduxjs/toolkit';
import rootReducer from './reducers/rootReducer';
import profileReducer from './reducers/profileReducer';
import projectReducer from './reducers/projectReducer';
import specialistsReducer from './reducers/specialistsReducer';
import chatReducer from './reducers/chatReducer';
// import thunk from 'redux-thunk';

const store = configureStore({
    reducer: {
        rootReducer: rootReducer.reducer,
        profileReducer: profileReducer.reducer,
        projectReducer: projectReducer.reducer,
        specialistsReducer: specialistsReducer.reducer,
        chatReducer: chatReducer.reducer,
    },
    applyMiddleware
});

export default store;