import {
    REQUEST_BOOKS,
    REQUEST_DELETE_BOOK,
    RECEIVE_BOOKS,
    SUCCESS_DELETE_BOOK,
    ERROR_RECEIVING_BOOKS,
    ERROR_DELETING_BOOK
} from '../constants/actionTypes'


const initialState = {
    books: [],
    isLoading: false,
    isError: false
}

const bookReducer = (state = initialState, action) => {
    switch (action.type) {
        case REQUEST_BOOKS:
        case REQUEST_DELETE_BOOK: {
            return {
                ...state,
                isLoading: true,
            };
        }

        case RECEIVE_BOOKS: {
            const { books } = action;
            return {
                ...state,
                isLoading: false,
                isError: false,
                books: books
            };
        }
        case SUCCESS_DELETE_BOOK: {
            const filteredBooks = state.books.filter((book) => book.id !== action.deletedBookId);

            return {
                ...state,
                isLoading: false,
                isError: false,
                books: filteredBooks
            }
        }
        case ERROR_RECEIVING_BOOKS:
        case ERROR_DELETING_BOOK: {
            return {
                ...state,
                isLoading: false,
                isError: true
            };
        }

        default: return state;
    }
}

export default bookReducer;