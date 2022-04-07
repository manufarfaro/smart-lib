const { expect } = require("chai");
const { ethers } = require("hardhat");

const dummyFinishedBook = {
    id: 0,
    name: "the book of life",
    year: 1986,
    author: "some dude",
    isFinished: true
}

const dummyUnfinishedBook = {
    id: 1,
    name: "love in times of sandwitch",
    year: 2010,
    author: "carl sims",
    isFinished: false
}

describe("Library Contract", () => {
    let library;
    let owner;

    before(async () => {
        const Library = await ethers.getContractFactory("Library");
        [owner] = await ethers.getSigners();
        library = await Library.deploy();
        await library.deployed();
    })

    describe("when a book is added", () => {
        it("should emit an AddBook event", async () => {
            const finishedBook = await library.addBook(
                dummyFinishedBook.name,
                dummyFinishedBook.year,
                dummyFinishedBook.author,
                dummyFinishedBook.isFinished
            );
            const unfinishedBook = await library.addBook(
                dummyUnfinishedBook.name,
                dummyUnfinishedBook.year,
                dummyUnfinishedBook.author,
                dummyUnfinishedBook.isFinished
            );

            await expect(finishedBook)
                .to.emit(library, "AddBook")
                .withArgs(owner.address, dummyFinishedBook.id);

            await expect(unfinishedBook)
                .to.emit(library, "AddBook")
                .withArgs(owner.address, dummyUnfinishedBook.id);
        });
    });

    describe("when a book is requested", () => {
        it("should return sender unfinished books", async () => {
            const [unfinishedBooks] = await library.getUnfinishedBooks();

            expect(unfinishedBooks.id).to.equal(dummyUnfinishedBook.id);
            expect(unfinishedBooks.name).to.equal(dummyUnfinishedBook.name);
            expect(unfinishedBooks.author).to.equal(dummyUnfinishedBook.author);
            expect(unfinishedBooks.year).to.equal(dummyUnfinishedBook.year);
            expect(unfinishedBooks.isFinished).to.equal(dummyUnfinishedBook.isFinished);
        });

        it("should return sender finished books", async () => {
            const [finishedBooks] = await library.getFinishedBooks();
            
            expect(finishedBooks.id).to.equal(dummyFinishedBook.id);
            expect(finishedBooks.name).to.equal(dummyFinishedBook.name);
            expect(finishedBooks.author).to.equal(dummyFinishedBook.author);
            expect(finishedBooks.year).to.equal(dummyFinishedBook.year);
            expect(finishedBooks.isFinished).to.equal(dummyFinishedBook.isFinished);
        });
    });

    describe("when a book finished state is changed", () => {
        it("should emit a SetFinished event", async () => {
            await (expect(library.setFinished(0, true))).
                to.emit(library, "SetFinished")
                .withArgs(0, true);
        })
    })
});