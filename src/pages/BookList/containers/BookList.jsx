import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useAccessValidate from "hooks/useAccessValidate";
import { fetchBooks, fetchDeleteBook } from "../store/actions/actions";
import Card from "components/CustomCard";
import Button from "components/Button";
import Typography from "components/Typography";
import { makeStyles } from "@material-ui/core/styles";
import useChangePage from "hooks/useChangePage";
import { useIntl } from "react-intl";
import Loader from "components/Loader";
import * as Pages from 'constants/pages'

const getClasses = makeStyles(() => ({
  card: {
    margin: "10px",
    flex: "1 0 25%",
  },
  createButton: {
    margin: "15px",
    flex: "1 0 100%",
  },
}));

const BookList = ({ authorities }) => {
  const classes = getClasses();

  const [state, setState] = useState({
    books: [],
  });

  const { books: booksStore } = useSelector((reducer) => reducer);

  const dispatch = useDispatch();
  const changePage = useChangePage();
  const { formatMessage } = useIntl();

  const canChangeBooks = useAccessValidate({
    ownedAuthorities: authorities,
    neededAuthorities: ["МОЖНО_ВОТ_ЭТУ_ШТУКУ"],
  });

  useEffect(() => {
    dispatch(fetchBooks());
  }, []);

  useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      books: booksStore.books,
    }));
  }, [booksStore.books]);

  const handleDeleteClick = (id) => {
    dispatch(fetchDeleteBook(id));
  };

  const handleCreateOrChangeClick = (id) => {
    let path = id !== 0 ? `${Pages.BOOKS}/${Pages.EDIT}/${id}` : `${Pages.BOOKS}/${Pages.EDIT}`;
    changePage({ path: path});
  };

  return (
    <>
      {booksStore.isLoading && <Loader />}

      {!booksStore.isLoading && canChangeBooks && (
        <Button
          color="primary"
          variant="contained"
          className={classes.createButton}
          onClick={() => handleCreateOrChangeClick(0)}
        >
          {formatMessage({ id: "createBook" })}
        </Button>
      )}
      {!booksStore.isLoading &&
        state.books.map((book) => (
          <Card
            key={book.id}
            cardClass={classes.card}
            canSeeButtons={canChangeBooks}
            handleDeleteButton={() => {
              handleDeleteClick(book.id);
            }}
            handleEditButton={() => {
              handleCreateOrChangeClick(book.id);
            }}
          >
            <Typography variant="h5">
              {book.id}. {book.name}
            </Typography>
            <Typography variant="h6">
              {formatMessage({ id: "bookDescription" })}:
            </Typography>
            <Typography>{book.description}</Typography>
            <Typography variant="h6">
              {formatMessage({ id: "publicationDate" })}:
            </Typography>
            <Typography>{book.publicationDate}</Typography>
            <Typography variant="h6">
              {formatMessage({ id: "author" })}:
            </Typography>
            <Typography>{book.author.fullName}</Typography>
          </Card>
        ))}
    </>
  );
};

export default BookList;
