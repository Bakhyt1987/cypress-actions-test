//https://docs.cypress.io/guides/references/assertions#Chai
//https://www.chaijs.com/guide/styles/
// before(() => {
//     cy.visit("http://localhost:3000/")
// }) 

const { waitForDomChange } = require("@testing-library/react")

// beforeEach(() => {
//     cy.visit("http://localhost:3000/")
// }) 

// after(() => {
//     cy.visit("http://localhost:3000/")
// })

// afterEach(() => {
//     cy.visit("http://localhost:3000/")
// }) 

//before-once runs  before all
//beforeEach runs before every block
//afterEach runs after every block
//after-once runs after all


describe('Make sure site loads', () => {
    beforeEach(() => {
        // const moviesListUrl =
        //     "https://api.themoviedb.org/3/discover/movie?language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&api_key=619c8f69bef13c3bc04b77a7f3a5f93c"

        // const configUrl = "https://api.themoviedb.org/3/configuration?api_key=619c8f69bef13c3bc04b77a7f3a5f93c"

        // cy.intercept(moviesListUrl, {
        //     fixture: "moviesList",
        // })
        // cy.intercept(configUrl, {
        //     fixture: "config",
        // })
        cy.visit("http://localhost:3000/")
        cy.login()
    })

    it("Page loads", () => {
        cy.visit("http://localhost:3000/")
        cy.contains("Filter")

        cy.findAllByTestId("movies-list-movie")
            .first()
            .then(($movie) => {
                const movieUrl = $movie.attr("href")
                cy.findAllByTestId("movies-list-movie").first().click()
                cy.url().should("include", movieUrl)
            })
        expect(true).to.equal(true)
    })

    it("Correct number of movies", () => {
        cy.findAllByTestId("movies-list-movie").should("have.length", 20)
        cy.findAllByTestId("movies-list-movie").should("have.length", 20)
    })

    it("Understands chainers", () => {
        cy.findAllByTestId("movies-list-movie").should("have.length", 20)
        cy.findAllByTestId("movies-list-movie").should('exist')
        cy.findAllByTestId("movies-lists-movie").should('not.exist')

        cy.get('input').type('black');
        cy.get('label').click();
        cy.get('input').click();
        cy.get(':nth-child(1) > [data-testid=movies-list-movie] > img').click();

        cy.fixture("moviesList").then((jsonData) => {
            console.log("jsonData", jsonData.results[0].title);
            expect(jsonData.results[0].title).to.eq("Black Widow")
        })
    })
})