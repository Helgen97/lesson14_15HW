import React from "react";
import PageAccessValidator from "components/PageAccessValidator";
import PageContainer from "components/PageContainer";
import BookEditPage from "pages/BookEdit"


const BooksList = () => (
  <PageAccessValidator neededAuthorities={['МОЖНО_ВОТ_ЭТУ_ШТУКУ']}> 
    <PageContainer>
      <BookEditPage />
    </PageContainer>
  </PageAccessValidator>
);

export default BooksList;