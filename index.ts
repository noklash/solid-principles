
// SOLID PRINCIPLE PRACTICE
// https://dev.to/ryosuke/solid-principles-tutorial-with-nodejs-1khf

/**
 * SINGLE RESPONSIBILITY : this means each class should handle a particular responsibility just like the Book class
 *        handles creating of properties, the book repository handles adding books to a collection and retrieving such books.
 * 
**/
                        
class Book {
    name: string;
    author: string;
    year: number;
    price: number;

    constructor (name: string, author: string, year: number, price: number){
        this.name = name;
        this.author = author;
        this.year = year;
        this.price = price;
    }
}


class BookRepository{
    private books: Book[];

    constructor(book: Book) {
        this.books = []
    }

    addBook(book: Book) {
        this.books.push(book);
    }

    getAllBooks(): Book[] {
        return this.books;
    }
}

/**
 * OPEN-CLOSED PRINCIPLES: This means classes should be open to extension but closed for modification
 *         just as FictionBook and NonFictionBook represent another type of Book and extends the Book class.
 *         with this principle we can add new types of Book without modifying existing code. 
 *         This promotes code flexibility and reusability.
 * 
 */

class FunBook extends Book {}
class NonFunBook extends Book {}


/**
 * LISKOV SUBSTITUTION PRINCIPLE (LSP) : This principle states that objects in a 
 *         superclass should be replaceable with objects of its subclasses 
 *         without affecting the correctness of the program.
 * 
 * IMPLEMENTATION
 *      Both "FictionBook" and "NonFictionBook" classes are subclasses of the "Book" class. 
 *      This allows us to treat any book type as a regular book ("Book")
 *      without breaking the application's functionality. 
 *      For example, we can add a "getType()" method to each subclass to return its specific type.
 */

class FictionBook extends Book {
    getType(): string {
        return 'Fiction Book'
    }
}

class NonFictionBook extends Book {
    getType(): string {
        return 'Non-Fiction Book'
    }
}


/**
 * INTERFACE SEGREGATION PRINCIPLE (ISP): This principle states that a class should not 
 *          be forced to implement an interface it does not use.
 * 
 * IMPLEMENTATION 
 * We have an interface named "BookRepositoryInterface" with two methods:
        "addBook(book: Book)" and "getAllbooks(): Book[]". By having a specific interface 
        for "BookRepository", we prevent unrelated classes from implementing unnecessary methods.
 */

interface BookRepositoryInterface {
    addBook(book: Book): void;
    getAllBooks(): Book[]
}

/**
 * DEPENDENCY INVERSION PRINCIPLE (DIP): This principle states that high level modules should not not depoend on low level modules. 
 *      Instead both should depend on abstractions.
 *      In this example we use follow DIP by using Depedency injection.
 * 
 * IMPLEMENTATION
 * We have a BookReepository class that implements the  "BookRepositoryInterface" interface. 
 * The 'BookRepository' instance is injected into the 'bookRepository' variable. This approach allows for loose coupling between modules
 * making it easy to sawap implementation without changing the app's core logic.
 */
// 
const bookRepository = new BookRepository();

const book1 = new Book('learning solid principle', 'Goodluck', 2024, 250);
const fictionBook = new FictionBook('The Adventure', 'M.k Fiction', 2023, 100);
const nonFictionBook = new NonFictionBook('Real life', 'ken.mild', 2005, 1000)

bookRepository.addBook(book1);
bookRepository.addBook(fictionBook);
bookRepository.addBook(nonFictionBook);

const allBooks = bookRepository.getAllBooks()
console.log(allBooks)