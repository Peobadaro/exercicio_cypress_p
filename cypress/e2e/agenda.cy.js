describe('Agenda de Contatos', () => {
    beforeEach(() => {
      cy.visit('https://agenda-contatos-react.vercel.app/');
    });
  
    it('Deve adicionar um novo contato', () => {
      cy.get('input[placeholder="Nome"]').should('be.visible').type('Pedro Badaró');
      cy.get('input[placeholder="E-mail"]').type('pedro@email.com');
      cy.get('input[placeholder="Telefone"]').type('11999999999');
      cy.get('button[type="submit"]').click();
  
      cy.contains('Pedro Badaró').should('exist');
    });
  
    it('Deve editar um contato existente', () => {
      cy.contains('li', 'Pedro Badaró').within(() => {
        cy.contains('EDITAR').click();
      });
  
      cy.get('input[placeholder="Nome"]').clear().type('Pedro Atualizado');
      cy.get('input[placeholder="E-mail"]').clear().type('novo@email.com');
      cy.get('input[placeholder="Telefone"]').clear().type('11988888888');
      cy.get('button[type="submit"]').click();
  
      cy.contains('Pedro Atualizado').should('exist');
    });
  
    it('Deve remover um contato existente', () => {
      cy.contains('li', 'Pedro Atualizado').within(() => {
        cy.contains('DELETAR').click();
      });
  
      cy.contains('Pedro Atualizado').should('not.exist');
    });
  });
  