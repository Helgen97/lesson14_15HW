import React from "react";
import PageAccessValidator from "components/PageAccessValidator";
import PageContainer from "components/PageContainer";
import BookListPage from "pages/BookList"


const BooksList = () => (
  <PageAccessValidator>
    <PageContainer>
      <BookListPage />
    </PageContainer>
  </PageAccessValidator>
);

export default BooksList;
