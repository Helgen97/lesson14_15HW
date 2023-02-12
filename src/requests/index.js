import {
  getToken,
} from 'token';

const getHeaders = () => ({
  Accept: 'application/json',
  Authorization: `Bearer ${getToken()}`,
  'Content-Type': 'application/json',
});

const fetchGet = ({ params = {}, url }) => {
  url = new URL(url);
  url.search = new URLSearchParams(params).toString();
  return fetch(
    url,
    {
      headers: getHeaders(),
      method: 'GET',
    }
  );
};

const fetchPost = ({ body, params = {}, url }) => {
  url = new URL(url);
  url.search = new URLSearchParams(params).toString();

  return fetch(
    url,
    {
      body: JSON.stringify(body),
      headers: getHeaders(),
      method: 'POST',
    }
  );
};

export const getJson = ({
  params,
  url,
}) => {
  return fetchGet({
    params,
    url,
  }).then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw response;
  });
};

export const postJson = ({
  body,
  url,
}) => {
  return fetchPost({
    body,
    url,
  })
};

export const putJson = ({ body, url }) => {
  return fetch(
    url,
    {
      headers: getHeaders(),
      body: JSON.stringify(body),
      method: 'PUT',
    }
  );
}

export const fetchDelete = ({ url }) => {

  return fetch(
    url,
    {
      headers: getHeaders(),
      method: 'DELETE',
    }
  );
};
