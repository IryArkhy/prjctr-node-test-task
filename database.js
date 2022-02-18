const database = {
  getUser: (id, callback) => {
    const users = [
      {
        id: 1,
        name: "Robert"
      },
      {
        id: 2,
        name: "John"
      }
    ];

    const user = users.find((user) => user.id === id);
    if (!user) {
      callback(`User with id=${id} not found`);
    } else {
      callback(null, user);
    }
  },
  getUsersBook: (userId, callback) => {
    const usersBooks = {
      1: [],
      2: [1, 2]
    };

    const userBook = usersBooks[userId];
    if (!userBook) {
      callback(`Set of books related to userId=${userId} not found`);
    } else {
      callback(null, userBook);
    }
  },
  buyBook: (id, callback) => {
    const books = [
      {
        id: 1,
        name: "Art of war"
      },
      {
        id: 2,
        name: "Hunger games"
      },
      {
        id: 3,
        name: "1984"
      }
    ];

    const book = books.find((book) => book.id === id);
    if (!book) {
      callback(`Book with id=${id} not found`);
    } else {
      callback(null, true);
    }
  }
};

const getUser = (userId) =>
  new Promise((resolve, reject) => {
    database.getUser(userId, (error, user) => {
      if (error) reject(error);

      resolve(user);
    });
  });

const checkUserBook = (userId, bookId) =>
  new Promise((resolve, reject) => {
    database.getUsersBook(userId, (error, userBooks) => {
      if (error) reject(error);

      if (userBooks.includes(bookId)) {
        reject(`User already has book with id=${bookId}`);
      }
      resolve(userBooks);
    });
  });

const buyBook = (bookId) =>
  new Promise((resolve, reject) => {
    database.buyBook(bookId, (error) => {
      if (error) reject(error);

      resolve("Success");
    });
  });

const buyBookForUser = async (bookId, userId) => {
  const user = await getUser(userId);

  if (user) {
    await checkUserBook(userId, bookId);

    return await buyBook(bookId);
  }
};

buyBookForUser(1, 1).then(console.log).catch(console.error);

buyBookForUser(1, 2).then(console.log).catch(console.error);

buyBookForUser(3, 2).then(console.log).catch(console.error);

buyBookForUser(5, 2).then(console.log).catch(console.error);

buyBookForUser(1, 3).then(console.log).catch(console.error);
