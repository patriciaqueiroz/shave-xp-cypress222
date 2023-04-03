import fpPage from '../support/pages/forgot-pass'
import rpPage from '../support/pages/reset-pass'
import loginPage from '../support/pages/login'
import shaversPage from '../support/pages/shavers'

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

    context('Quando o usuário solicita resgate de senha', () =>{
        const user = {
            name: "Wil Souza",
            email: 'Wil@gmail.com',
            password: 'Teu@122',
            is_shaver: false
        }   
        beforeEach(() =>{
            cy.createUser(user)
            cy.recoveryPass(user.email)
            cy.getToken(user.email)
        })
        it('deve poder cadastrar uma nova senha', () => {
            const message = 'Agora você já pode logar com a sua nova senha secreta.'
          rpPage.go(Cypress.env('token'))
          rpPage.submit('abc123','abc123')
          rpPage.noticeShouldBe(message)
        })

        afterEach(() => {
            loginPage.submit(user.email, 'abc123')
            shaversPage.header.userShouldBeLoggedIn(user.name)
        })
        
    })
    


})  