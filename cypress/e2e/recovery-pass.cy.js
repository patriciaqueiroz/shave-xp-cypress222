

import fpPage from '../support/pages/forgot-pass'

describe('esqueci minha senha', () => {

    it('deve poder solicitar o resgate de senha', () => {

        const user = {
            name: "João Esquecido",
            email: 'joao@gmail.com',
            password: 'Teu@123',
            is_shaver: false
        }

        cy.createUser(user)

        fpPage.go()
        fpPage.submit(user.email)

        const message = 'Enviamos um e-mail para confirmar a recuperação de senha, verifique sua caixa de entrada.'
        fpPage.noticeShouldBe(message)

    })

    it.only('deve poder cadastrar uma nova senha', () => {

        const user = {
            name: "Wil Souza",
            email: 'Wil@gmail.com',
            password: 'Teu@122',
            is_shaver: false
        }

        cy.createUser(user)

        fpPage.go()
        fpPage.submit(user.email)

        const message = 'Enviamos um e-mail para confirmar a recuperação de senha, verifique sua caixa de entrada.'
        fpPage.noticeShouldBe(message)

        cy.request({
            method: 'GET',
            url: 'http://localhost:5000/token/' + user.email
        }).then(result => {
            expect(result.status).to.eql(200)
        })

    })


})