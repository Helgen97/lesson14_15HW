import React from 'react';
import PageAccessValidator from 'components/PageAccessValidator';
import InitialPage from 'pages/Initial';
import PageContainer from 'components/PageContainer';

const Initial = () => (
  <PageAccessValidator>
    <PageContainer>
      <InitialPage />
    </PageContainer>
  </PageAccessValidator>
);

export default Initial;
