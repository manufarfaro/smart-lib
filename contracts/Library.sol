// SPDX-License-Identifier: MIT License
pragma solidity ^0.8.0;

contract Library {
    event AddBook(address recipient, uint bookId);
    event SetFinished(uint bookId, bool isFinished);

    struct Book {
        uint id;
        string name;
        uint year;
        string author;
        bool isFinished;
    }

    Book[] public bookList;

    // Owner Book Mapping - BookId to address
    mapping(uint256 => address) public bookOwners;

    function addBook(string memory name, uint16 year, string memory author, bool isFinished) external {
        uint bookId = bookList.length;
        Book memory newBook = Book(bookId, name, year, author, isFinished);
        bookList.push(newBook);
        bookOwners[bookId] = msg.sender;
        emit AddBook(bookOwners[bookId], bookId);
    }

    function getBookList(bool isFinished) private view returns(Book[] memory) {
        Book[] memory tempResults = new Book[](bookList.length);
        uint counter = 0;
        for (uint i = 0; i < bookList.length; i++) {
            Book memory book = bookList[i];
            // We'll check for our own books and if it is finished or not
            if (bookOwners[book.id] == msg.sender && book.isFinished == isFinished) {
                tempResults[counter] = book;
                counter++;
            }
        }
        Book[] memory bookResults = new Book[](counter);
        for (uint i = 0; i < counter; i++) {
            bookResults[i] = tempResults[i];
        }
        return bookResults;
    }

    function getFinishedBooks() external view returns(Book[] memory ) {
        return getBookList(true);
    }

    function getUnfinishedBooks() external view returns(Book[] memory) {
        return getBookList(false);
    }

    function setFinished(uint bookId, bool isFinished) external {
        if (bookOwners[bookId] == msg.sender) {
            bookList[bookId].isFinished = isFinished;
            emit SetFinished(bookId, bookList[bookId].isFinished);
        }
    }
}