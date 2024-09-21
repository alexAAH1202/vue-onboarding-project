describe('Subscription Flow', () => {
  beforeEach(() => {
    cy.visit('/subscription')
  })

  it('completes subscription process for monthly tier 1', () => {
    cy.get('[data-test="tier-select"]').select('tier1')
    cy.get('[data-test="billing-cycle"]').select('monthly')
    cy.get('[data-test="calculated-price"]').should('contain', '$9.99')
    cy.get('[data-test="total-with-gst"]').should('contain', '$10.99')
    
    cy.get('[data-test="business-name"]').type('Test Company')
    cy.get('[data-test="business-address"]').type('123 Test St, Test City')
    cy.get('[data-test="abn-acn"]').type('12345678901')
    
    cy.get('[data-test="payment-form"]').within(() => {
      cy.get('[data-test="card-number"]').type('4242424242424242')
      cy.get('[data-test="card-expiry"]').type('1225')
      cy.get('[data-test="card-cvc"]').type('123')
    })
    
    cy.get('[data-test="submit-subscription"]').click()
    
    cy.get('[data-test="subscription-confirmation"]').should('be.visible')
    cy.get('[data-test="subscription-details"]').should('contain', 'Tier 1 Monthly')
  })

  it('completes subscription process for yearly tier 2', () => {
    cy.get('[data-test="tier-select"]').select('tier2')
    cy.get('[data-test="billing-cycle"]').select('yearly')
    cy.get('[data-test="calculated-price"]').should('contain', '$199.99')
    cy.get('[data-test="total-with-gst"]').should('contain', '$219.99')
    
    cy.get('[data-test="business-name"]').type('Another Test Company')
    cy.get('[data-test="business-address"]').type('456 Test Ave, Test Town')
    cy.get('[data-test="abn-acn"]').type('98765432109')
    
    cy.get('[data-test="payment-form"]').within(() => {
      cy.get('[data-test="card-number"]').type('4242424242424242')
      cy.get('[data-test="card-expiry"]').type('1225')
      cy.get('[data-test="card-cvc"]').type('123')
    })
    
    cy.get('[data-test="submit-subscription"]').click()
    
    cy.get('[data-test="subscription-confirmation"]').should('be.visible')
    cy.get('[data-test="subscription-details"]').should('contain', 'Tier 2 Yearly')
  })
})
