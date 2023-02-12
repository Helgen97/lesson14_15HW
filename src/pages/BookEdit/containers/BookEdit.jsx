import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import { useIntl } from "react-intl";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "components/Paper";
import TextField from "components/TextField";
import MenuItem from "components/MenuItem";
import Select from "components/Select";
import Typography from "components/Typography";
import ButtonGroup from "components/ButtonGroup";
import Button from "components/Button";
import useChangePage from "hooks/useChangePage";
import * as PAGES from "constants/pages";
import {
  fetchCreatingBook,
  fetchBook,
  fetchEditBook,
  refreshStore,
} from "../store/actions/actions";
import Loader from "components/Loader";

const getClasses = makeStyles(() => ({
  container: {
    width: "60%",
    margin: "10px auto",
    padding: "10px",
  },
  title: {
    textAlign: "center",
  },
  input: {
    width: "100%",
    margin: "10px",
  },
  buttonGroup: {
    width: "100%",
    margin: "20px 0",
    justifyContent: "center",
  },
  button: {
    width: "100%",
  },
}));

const authors = [
  { id: 1, fullName: "Joanne Rowling" },
  { id: 2, fullName: "Terry Pratchett" },
  { id: 3, fullName: "John Ronald Reuel Tolkien" },
  { id: 4, fullName: "George Martin" },
  { id: 5, fullName: "Howard Phillips Lovecraft" },
];

const BookEdit = () => {
  const { id } = useParams();
  const classes = getClasses();
  const { book: bookStore } = useSelector((reducer) => reducer);
  const dispatch = useDispatch();
  const { formatMessage } = useIntl();
  const changePage = useChangePage();

  const [bookState, setBookState] = useState({
    name: "",
    description: "",
    publicationDate: "2023-01-01",
    authorId: 0,
  });

  useEffect(() => {
    if (bookStore.isBookSuccessSaved) {
      dispatch(refreshStore());
    }

    if (id !== undefined) {
      dispatch(fetchBook(id));
    }
  }, []);

  useEffect(() => {
    setBookState(bookStore.book);
  }, [bookStore.book]);

  const checkEmptyFields = () => {
    const { name, description, publicationDate, authorId } = bookState;
    return (
      name === "" ||
      description === "" ||
      publicationDate === "" ||
      authorId === 0
    );
  };

  const handleCancelClick = () => {
    changePage({ path: `/${PAGES.BOOKS}` });
  };

  const handleSaveClick = () => {
    if (checkEmptyFields()) return;

    id === undefined
      ? dispatch(fetchCreatingBook(bookState))
      : dispatch(fetchEditBook(id, bookState));
  };

  return (
    <>
      {bookStore.isLoading && <Loader />}

      {bookStore.isBookSuccessSaved && <Redirect to={`/${PAGES.BOOKS}`} />}

      {!bookStore.isLoading && (
        <Paper elevation={3} className={classes.container}>
          <Typography variant="h3" className={classes.title}>
            {formatMessage({ id: "bookTitleForm" })}
          </Typography>
          <TextField
            label={formatMessage({ id: "bookNameField" })}
            className={classes.input}
            value={bookState.name}
            onChange={(e) =>
              setBookState((prevState) => ({
                ...prevState,
                name: e.target.value,
              }))
            }
          />
          <TextField
            label={formatMessage({ id: "bookDescriptionField" })}
            className={classes.input}
            value={bookState.description}
            onChange={(e) =>
              setBookState((prevState) => ({
                ...prevState,
                description: e.target.value,
              }))
            }
          />
          <TextField
            label={formatMessage({ id: "bookPublicationDateField" })}
            type={"date"}
            className={classes.input}
            value={bookState.publicationDate}
            onChange={(e) =>
              setBookState((prevState) => ({
                ...prevState,
                publicationDate: e.target.value,
              }))
            }
          />
          <Select
            className={classes.input}
            label={formatMessage({ id: "bookAuthorField" })}
            value={bookState.authorId}
            onChange={(e) =>
              setBookState((prevState) => ({
                ...prevState,
                authorId: e.target.value,
              }))
            }
          >
            <MenuItem value={0}>
              {formatMessage({ id: "authorFieldLabel" })}
            </MenuItem>

            {authors.map((author) => (
              <MenuItem key={author.id} value={author.id}>
                {author.fullName}
              </MenuItem>
            ))}
          </Select>

          <ButtonGroup variant="contained" className={classes.buttonGroup}>
            <Button
              color="secondary"
              className={classes.button}
              onClick={handleCancelClick}
            >
              {formatMessage({ id: "cancelButton" })}
            </Button>
            <Button
              color="primary"
              className={classes.button}
              onClick={handleSaveClick}
            >
              {formatMessage({ id: "saveButton" })}
            </Button>
          </ButtonGroup>
        </Paper>
      )}
    </>
  );
};

export default BookEdit;
