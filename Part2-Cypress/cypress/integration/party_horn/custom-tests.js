describe('Party Horn Tests', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5500//Part2-Cypress/index.html');
  });

  it('Slider changes when volume input changes', () => {
    cy.get('#volume-number').clear().type('75')
    .then($el => {
      expect($el).to.have.value(75);
    });
  });

  it('Volume number changes when slider input changes', () => {
    cy.get('#volume-slider').invoke('val', 33).trigger('input')
    .then($el => {
      expect($el).to.have.value(33);
    });
  });

  it('Audio volume changes when slider input changes', () => {
    cy.get('#volume-slider').invoke('val', 33).trigger('input');
    cy.get('#horn-sound')
    .then($el => {
      expect($el).to.have.prop('volume', 0.33);
    });
  });

  it('Image and sound source change after selecting party horn radio', () => {
    // Check audio file changes
    cy.get('#radio-party-horn').check();
    cy.get('#horn-sound')
    .then($el => {
      expect($el).to.have.attr('src', './assets/media/audio/party-horn.mp3');
    });

    // check image file changes
    cy.get('#sound-image')
    .then($el => {
      expect($el).to.have.attr('src', './assets/media/images/party-horn.svg');
    });
  });

  it('Volume image changes when volume increases', () => {
    // Check level 0
    cy.get('#volume-number').clear().type('0');
    cy.get('#volume-image')
    .then($el => {
      expect($el).to.have.attr('src', './assets/media/icons/volume-level-0.svg');
    });

    // Check level 1
    cy.get('#volume-number').clear().type('33');
    cy.get('#volume-image')
    .then($el => {
      expect($el).to.have.attr('src', './assets/media/icons/volume-level-1.svg');
    });

    // Check level 2
    cy.get('#volume-number').clear().type('66');
    cy.get('#volume-image')
    .then($el => {
      expect($el).to.have.attr('src', './assets/media/icons/volume-level-2.svg');
    });

    // Check level 3
    cy.get('#volume-number').clear().type('100');
    cy.get('#volume-image')
    .then($el => {
      expect($el).to.have.attr('src', './assets/media/icons/volume-level-3.svg');
    });
  });

  it('Honk button is disabled when textbox input is empty or has non-number', () => {
    // Check when input is empty
    cy.get('#volume-number').clear();
    cy.get('#honk-btn')
    .then($el => {
      expect($el).to.have.prop('disabled', true);
    });

    // Check when input has non-number
    cy.get('#volume-number').clear().type('abc');
    cy.get('#honk-btn')
    .then($el => {
      expect($el).to.have.prop('disabled', true);
    });
  });

  it('Error shown on input out of range', () => {
    cy.get('#volume-number').clear().type('200');
    cy.document()
    .then(doc => {
      const invalidList = doc.querySelectorAll(':invalid');
      expect(invalidList.length).to.eq(3);
    });
  });


});
