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

const initialState = {
    book: {
        name: "",
        description: "",
        publicationDate: "2023-01-01",
        authorId: 0,
    },
    isLoading: false,
    isBookSuccessSaved: false,
    isError: false
}

const bookReducer = (state = initialState, action) => {
    switch (action.type) {
        case REFRESH_STORE: {
            return {
                ...state,
                isBookSuccessSaved: false
            };
        }
        case CREATING_BOOK:
        case EDITING_BOOK:
        case FETCHING_BOOK: {
            return {
                ...state,
                isLoading: true,
            }
        }
        case SUCCESS_CREATING_BOOK:
        case SUCCESS_EDITING_BOOK: {
            return {
                ...state,
                isLoading: false,
                isError: false,
                isBookSuccessSaved: true,
            }
        }
        case RECEIVE_BOOK: {
            const receivedBook = action.book;
            const book = {
                name: receivedBook.name,
                description: receivedBook.description,
                publicationDate: receivedBook.publicationDate,
                authorId: receivedBook.author.id
            };

            return {
                ...state,
                book: book,
                isLoading: false,
                isError: false,
            }
        }
        case ERROR_CREATING_BOOK:
        case ERROR_EDITING_BOOK:
        case ERROR_RECEVING_BOOK: {
            return {
                ...state,
                isLoading: false,
                isError: true,
            }
        }
        default: return state;
    }
}

export default bookReducer;