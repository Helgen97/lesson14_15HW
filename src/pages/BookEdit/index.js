import React from "react";
import { Provider } from "react-redux";
import withAuthorities from "decorators/withAuthorities";
import BookEdit from './containers/BookEdit'
import store from "./store/store";


export default withAuthorities(props => (
    <Provider store={store}>
        <BookEdit {...props} />
    </Provider>
));
