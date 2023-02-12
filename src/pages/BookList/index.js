import React from "react";
import { Provider } from "react-redux";
import withAuthorities from "decorators/withAuthorities";
import BookList from './containers/BookList'
import store from "./store/store";


export default withAuthorities(props => (
    <Provider store={store}>
        <BookList {...props} />
    </Provider>
));