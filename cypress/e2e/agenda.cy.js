describe('Agenda de contatos', () => {
  // Nome único para não confundir com contatos de outras pessoas
  const id = Date.now()
  const nome = `Pedro Badaró ${id}`
  const nomeEditado = `Pedro Editado ${id}`

  const contato = (texto) => cy.contains('.contato', texto)

  beforeEach(() => {
    cy.visit('/')
    cy.get('form').should('be.visible')
  })

  it('Deve incluir um novo contato', () => {
    cy.get('input[placeholder="Nome"]').type(nome)
    cy.get('input[placeholder="E-mail"]').type('pedro@email.com')
    cy.get('input[placeholder="Telefone"]').type('11999999999')
    cy.get('form button[type="submit"]').click()

    contato(nome)
      .should('be.visible')
      .and('contain', 'pedro@email.com')
      .and('contain', '11999999999')
  })

  it('Deve alterar o contato incluído', () => {
    contato(nome).find('.edit').click()

    cy.get('input[placeholder="Nome"]').should('have.value', nome)
    cy.get('input[placeholder="Nome"]').clear().type(nomeEditado)
    cy.get('input[placeholder="E-mail"]').clear().type('novo@email.com')
    cy.get('input[placeholder="Telefone"]').clear().type('11988888888')
    cy.get('form button[type="submit"]').should('contain', 'Salvar').click()

    contato(nomeEditado)
      .should('be.visible')
      .and('contain', 'novo@email.com')
      .and('contain', '11988888888')
    cy.contains('.contato', nome).should('not.exist')
  })

  it('Deve remover o contato alterado', () => {
    contato(nomeEditado).find('.delete').click()

    cy.contains('.contato', nomeEditado).should('not.exist')
  })
})
