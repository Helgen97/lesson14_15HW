import { getJson, fetchDelete } from "requests";

import config from "config/config";

import {
    REQUEST_BOOKS,
    REQUEST_DELETE_BOOK,
    RECEIVE_BOOKS,
    SUCCESS_DELETE_BOOK,
    ERROR_RECEIVING_BOOKS,
    ERROR_DELETING_BOOK
} from '../constants/actionTypes';

const requestBooks = () => ({
    type: REQUEST_BOOKS
})

const requestDeleteBook = () => ({
    type: REQUEST_DELETE_BOOK
})

const receiveBooks = (books) => ({
    type: RECEIVE_BOOKS,
    books: books
})

const successDeletingBook = (id) => ({
    type: SUCCESS_DELETE_BOOK,
    deletedBookId: id
})


const errorReceiveBooks = () => ({
    type: ERROR_RECEIVING_BOOKS
})

const errorDeletingBook = () => ({
    type: ERROR_DELETING_BOOK
})

const getBooks = () => {
    const { BASE_URL, BOOK_SERVICE } = config;

    return getJson({
        url: `${BASE_URL}/${BOOK_SERVICE}`
    })
}

export const fetchBooks = () => async (dispatch) => {
    dispatch(requestBooks());

    try {
        const books = await getBooks();
        return dispatch(receiveBooks(books));
    } catch {
        return dispatch(errorReceiveBooks());
    }
}

const deleteBook = (id) => {
    const { BASE_URL, BOOK_SERVICE } = config;

    return fetchDelete({
        url: `${BASE_URL}/${BOOK_SERVICE}/${id}`
    })
}


export const fetchDeleteBook = (id) => async (dispatch) => {
    dispatch(requestDeleteBook());

    deleteBook(id)
        .then(() => {
            return dispatch(successDeletingBook(id))
        }).catch(() => {
            return dispatch(errorDeletingBook())
        })
}

