import loginPage from '../support/pages/login'
import ShaversPage from '../support/pages/shavers'


describe('login', () => {

    context('quando submeto o formulário', () => {
        it('deve logar com sucesso', () => {

            const user = {
                name: 'Paty',
                email: 'patyqsilva@gmail.com.br',
                password: 'Teu@1234'
            }

            loginPage.submit(user.email, user.password)
            ShaversPage.header.userShouldBeLoggedIn(user.name)

        })

        it('não deve logar com senha incorreta', () => {
            const user = {
                name: 'Paty',
                email: 'patyqsilva@gmail.com.br',
                password: 'Teu@4321'

            }

            loginPage.submit(user.email, user.password)


            const message = 'Ocorreu um erro ao fazer login, verifique suas credenciais.'
            loginPage.noticeShouldBe(message)

        })

        it('não deve logar com email não cadastrado', () => {
            const user = {
                name: 'Paty',
                email: 'patyqsilva@404.com.br',
                password: 'Teu@4321'

            }

            loginPage.submit(user.email, user.password)

            const message = 'Ocorreu um erro ao fazer login, verifique suas credenciais.'
            loginPage.noticeShouldBe(message)
        })

        it('campos obrigatórios', () => {
            loginPage.submit()
            loginPage.requiredFields('E-mail é obrigatório', 'Senha é obrigatória')

        })

    })

})

    context('senha muito curta', () => {

        const passwords = [
            '1',
            '12',
            '123',
            '1234',
            '12345'

        ]

        passwords.forEach((p) => {

            it(`não deve logar com a senha: ${p}`, () => {
                loginPage.submit('patyqsilva@gmail.com.br', p)
                loginPage.alertShouldBe('Pelo menos 6 caracteres')
            })

        })


        context('email no formato incorreto', () => {

            const emails = [
                'paty&gmail.com',
                'paty.com.br',
                '@gmail.com',
                '@',
                'paty@',
                '121323',
                '@#@!#!@',
                'xpto123'
            ]

            emails.forEach((e) => {

                it(`não deve logar com o email: ${e}`, () => {
                    loginPage.submit(e, 'Teu@1234')
                    loginPage.alertShouldBe('Informe um email válido')


                })
            })

        })

    })