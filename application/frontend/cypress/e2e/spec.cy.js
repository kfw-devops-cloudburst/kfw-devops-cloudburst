describe('spec.cy.js', () => { 
  const BOOK_TITLE = "Test Book Title"
  
  beforeEach(() => {
    cy.log(cy.url());

    /*
    // Only required for "npx cypress open"
    if (!window.navigator || !navigator.serviceWorker) {
      return null;
    }
  
    return navigator.serviceWorker.getRegistrations()
      .then((registrations) => {
        return Promise.all(registrations.map((registration) => {
          return registration.unregister();
        }));
      });
      */
  });

  // a. Validate that the page is accessible
  it('successfully loads', () => {
    cy.visit('/')
  })


  // b. Check that books are displayed
  it('displays a book', () => {
    cy.visit('/books')
    cy.contains('Agile Software Development with Scrum').should('be.visible')
  })

  // c. Add a new book
  it('adds a new book', () => {
    cy.visit('/admin')

    // Open Form
    cy.get('[aria-label="Add"]').click()
    // Click on "name" input and insert book title
    // Additionally, wait 200ms to finish the typing
    cy.get('#name').click().type(BOOK_TITLE).wait(200)
    // Get "Add" button
    cy.get('button:contains("Add")').click();
  

    // cy.visit('/')
    cy.contains(BOOK_TITLE).should('be.visible')
  })
  

  // d. Borrow and return a book
  it('borrows and returns a book', () => {
    const NAME = "Tmp Name"

    cy.visit('/admin')

    // Find all rows with "available", then search for the link and click the first one.
    cy.contains('available').first().parent().find('a').click();

    // Find button for "rent"
    cy.get('button:contains("Entlehnen")').click();
 
    // Insert name
    cy.get('[role="dialog"]').get('#standard-name').click().type(NAME).wait(200);

    // Rent
    cy.get('[role="dialog"]').contains('Entlehnen').click();

    // Search for "return"
    cy.contains('Zurückgeben', { timeout: 15000 }).then((elem) => {      
      // Click
      elem.click()

      // Confirm 
      cy.get('[role="dialog"]').contains('Zurückgeben', {timeout: 15000}).click();

      // Ensure that we can rent it again
      cy.contains('Entlehnen', { timeout: 15000 });
    })
  })


  // e. Delete a book
  it('deletes a book', () => {
    let oldCount;
    cy.visit('/admin')

    // Find previously created BOOK_TITLE, and count its occurrences
    cy.get('body').find(`th:contains(${BOOK_TITLE})`).its('length').then((oldCnt) => {
      oldCount = oldCnt});

    // Find previously created BOOK_TITLE, and look for the parent button with "delete"
    cy.contains(BOOK_TITLE).parent().find(`[aria-label="Delete"]`).click();

    // Confirm deletion
    cy.get('button:contains("Delete")').click({force: true}).wait(200);

    // Ensure that the count of the book has decreased by one
    cy.get('body').find(`th:contains(${BOOK_TITLE})`).its('length').then((newCount) => {
      expect(oldCount).to.eq(newCount + 1);
    })
  })
})