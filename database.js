const database = {
    getUser: async (id) => {
        const users = [{
            id: 1,
            name: 'Robert',
        }, {
            id: 2,
            name: 'John'
        }];
        
        const user = users.find((user) => user.id === id);
        if (!user) {
            throw new Error(`User with id=${id} not found`);
            return null;
        } else {
            return user;
        }
    },
    getUsersBook: async (userId) => {
        const usersBooks = {
            1: [],
            2: [1, 2],
        };

        const userBook = usersBooks[userId];
        if (!userBook) {
            throw new Error(`Set of books related to userId=${userId} not found`);
            return null;
        } else {
            return userBook;
        }
    },
    buyBook: async (id) => {
        const books = [{
            id: 1,
            name: 'Art of war'
        }, {
            id: 2,
            name: 'Hunger games'
        }, {
            id: 3,
            name: '1984'
        }];

        const book = books.find((book) => book.id === id);
        if (!book) {
            throw new Error(`Book with id=${id} not found`);
        } else {
            return true;
        }
    },
};



const buyBookForUser = async (bookId, userId) => {
  try {
    const user = await database.getUser(userId);
    
    if (user) {
      const userBooks = await database.getUsersBook(userId);
      
      if(userBooks.includes(bookId))
        throw new Error(`User already has book with id=${bookId}`);
      
      await database.buyBook(bookId);
      console.log("Success");
    } 
  } catch (error) {
    console.log(error.message);
  }
}

(async () => {
 await buyBookForUser(1,1);

 await buyBookForUser(1,2);

 await buyBookForUser(3,2);

 await buyBookForUser(5,2);

 await buyBookForUser(1,3);
})()
