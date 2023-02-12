import { getJson, postJson, putJson } from "requests";

import config from "config/config";

import {
    REFRESH_STORE,
    CREATING_BOOK,
    EDITING_BOOK,
    FETCHING_BOOK,
    SUCCESS_CREATING_BOOK,
    SUCCESS_EDITING_BOOK,
    RECEIVE_BOOK,
    ERROR_CREATING_BOOK,
    ERROR_EDITING_BOOK,
    ERROR_RECEVING_BOOK
} from '../constants/actionTypes';

const cleanStore = () => ({
    type: REFRESH_STORE
})

const requestCreateBook = () => ({
    type: CREATING_BOOK
})

const editingBook = () => ({
    type: EDITING_BOOK
})

const requestBook = () => ({
    type: FETCHING_BOOK
})

const successCreatedBook = () => ({
    type: SUCCESS_CREATING_BOOK
})

const successEditedBook = () => ({
    type: SUCCESS_EDITING_BOOK
})

const receiveBook = (book) => ({
    type: RECEIVE_BOOK,
    book: book
})

const errorCreatingBook = () => ({
    type: ERROR_CREATING_BOOK
})

const errorFetchingBook = () => ({
    type: ERROR_RECEVING_BOOK
})

const errorEditingBook = () => ({
    type: ERROR_EDITING_BOOK
})

const createBook = (book) => {
    const { BASE_URL, BOOK_SERVICE } = config;

    return postJson({ body: book, url: `${BASE_URL}/${BOOK_SERVICE}` })
}

const getBook = (id) => {
    const { BASE_URL, BOOK_SERVICE } = config;

    return getJson({ url: `${BASE_URL}/${BOOK_SERVICE}/${id}` })
}

const editBook = (id, book) => {
    const { BASE_URL, BOOK_SERVICE } = config;

    return putJson({ url: `${BASE_URL}/${BOOK_SERVICE}/${id}`, body: book })
}

export const fetchCreatingBook = (book) => async (dispatch) => {
    dispatch(requestCreateBook());

    return createBook(book)
        .then(() => dispatch(successCreatedBook()))
        .catch(() => dispatch(errorCreatingBook()))
}

export const fetchBook = (id) => async (dispatch) => {
    dispatch(requestBook())

    try {
        const book = await getBook(id);
        return dispatch(receiveBook(book))
    } catch {
        return dispatch(errorFetchingBook())
    }
}

export const fetchEditBook = (id, book) => async (dispatch) => {
    dispatch(editingBook());

    return editBook(id, book)
        .then(() => dispatch(successEditedBook()))
        .catch(() => dispatch(errorEditingBook()))
}

export const refreshStore = () => (dispatch) => {
    return dispatch(cleanStore());
}