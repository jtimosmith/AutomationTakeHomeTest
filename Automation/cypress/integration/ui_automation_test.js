describe('Sauce Demo Login', function () {
	it('Logs in as a standard user', function() {
		cy.visit('/'); // navigate to the SwagLabs webpage using saucedemo.com as the base URL

		cy.get('[data-test=username]').type('standard_user'); // find the text box of data-test "username" and input standard_user
		cy.get('[data-test=password]').type('secret_sauce'); // find the text box of data-test "password" and input secret_sauce
		cy.get('[data-test=login-button]').click(); // find the button of data-test "login-button" and click
	})
})

describe('Purchase T-Shirts', function() {
	it('Purchases all the t-shirts on the SwagLabs Products page', function() {
		cy.url().should('include', '/inventory.html'); // verify that the inventory page is open

		cy.get('[data-test*="t-shirt"]').should('contain', 'Add to cart').click({multiple: true}); // find all data-tests that contain "t-shirt", are not yet added to the cart, and add them to the cart
		cy.get('[data-test*="t-shirt"]').should('contain', 'Remove'); // find all data-tests that contain "t-shirt" and verify that they have been added to the cart by checking for a "Remove" button
		cy.get('[class=shopping_cart_badge]').should('contain', '2').click(); // verify that two items were added to the cart and click the cart icon
		
		// steps below are being executed to circumvent an error on the saucedemo side
		// a "you can only access '/cart.html' when you are logged in" error appears when clicking the cart despite the user being logged in
		cy.get('[data-test=username]').type('standard_user');
		cy.get('[data-test=password]').type('secret_sauce');
		cy.get('[data-test=login-button]').click();
		cy.get('[class=shopping_cart_badge]').click();

		cy.url().should('include', '/cart.html'); // verify that the cart page is open
		cy.get('[data-test=checkout]').click(); // find and click  the data-test "checkout" button

		cy.url().should('include', '/checkout-step-one.html'); // verify that the checkout step one page is open
		cy.get('[data-test=firstName]').type('Standard'); // find the text box of data-test "firstName" and input Standard
		cy.get('[data-test=lastName]').type('User'); // find the text box of data-test "lastName" and input User
		cy.get('[data-test=postalCode]').type('10101'); // find the text box of data-test "postalCode" and input 10101
		cy.get('[data-test=continue]').click(); // find the button of data-test "continue" and click

		cy.url().should('include', '/checkout-step-two.html'); // verify that the checkout step two page is open
		cy.get('[class=inventory_item_name]').should('contain', 'T-Shirt'); // verify that all checked out items contain a t-shirt
		cy.get('[data-test=finish]').click(); // find the button of data-test "finish" and click

		cy.url().should('include', '/checkout-complete.html'); // verify that the checkout complete page is open
		cy.contains('THANK YOU FOR YOUR ORDER'); // verify that the user receives a thank you message for their order
		cy.get('[data-test=back-to-products]').click(); // find the button of data-test "back-to-products" and click to take the user back to the homepage
		cy.url().should('include', '/inventory.html'); // verify that the inventory page is open
	})
})