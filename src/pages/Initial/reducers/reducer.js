const initialState = {
  availableItems: [
    {
      path: 'books',
      linkText: 'See books list'
    },
    {
      path: 'otherPath',
      linkText: "Some other path"
    }
  ],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {

    default: return state;
  }
}
