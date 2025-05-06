let userBookList = []; 

module.exports = {
  getAll: () => userBookList,

  getById: (id) => userBookList.find(book => book.id === id),

  add: (book) => {
    if (!userBookList.find(b => b.id === book.id)) {
      userBookList.push(book);
      return book;
    }
    return null; 
  },

  remove: (id) => {
    const index = userBookList.findIndex(book => book.id === id);
    if (index !== -1) {
      return userBookList.splice(index, 1)[0];
    }
    return null;
  }
};
