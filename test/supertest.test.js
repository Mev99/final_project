import chai from "chai";
import { describe, it } from "mocha";
import supertest from "supertest";

const expect = chai.expect
const requester = supertest('http://localhost:8080')


describe('testing con supertest', () => {
    let userRegisterMock = {
        first_name: "super",
        last_name: "test",
        email: "supertest@mail.com",
        age: 5,
        password: "123",
        role: "premium"
    }

    let userLoginMock = {
        email: "supertest@mail.com",
        password: "123"
    }

    let cookie

    let productCreateMock = {
        product: "test",
        category: "supertest",
        price: 1,
        stock: 1,
        image: "supertest_image.jpg"
    }

    let productId

    let productUpdateMock = {
        "price": "5"
    }
    describe('User testing ./user', () => {
        it('Register a new account ./register', async () => {

            const response = await requester
                .post("/user/register")
                .send(userRegisterMock)
                .redirects(1)

            expect(response.status).to.equal(200)

        })

        it('login with your account ./login', async () => {
            const response = await requester
                .post("/user/login")
                .send(userLoginMock)

            const cookieResult = response.headers['set-cookie'][0]
            expect(cookieResult).to.exist
            cookie = {
                name: cookieResult.split('=')[0],
                value: cookieResult.split('=')[1]
            }
            expect(response.status).to.equal(302)
        })

    })

    describe('Products testing ./products', () => {

        it('Creates a new product ./products', async () => {
            const response = await requester
                .post('/products')
                .set('Cookie', `${cookie.name}=${cookie.value}`)
                .send(productCreateMock)

            expect(response._body.payload).to.have.property('_id')
            productId = response._body.payload._id
        })

        it('Updates an existing product ./products/{pid}', async () => {
            const response = await requester
                .put(`/products/${productId}`)
                .set('Cookie', `${cookie.name}=${cookie.value}`)
                .send(productUpdateMock)

            expect(response._body.result).to.be.equal('success')
            expect(response._body.payload).to.have.property('acknowledged').to.be.true
        })

        it('Deletes a product ./products/{pid}', async () => {
            const response = await requester
                .delete(`/products/${productId}`)
                .set('Cookie', `${cookie.name}=${cookie.value}`)
                .send(productId)

            expect(response.statusCode).to.be.equal(200)
        })
    })

    describe('Cart testing ./cart', () => {
        it('Obtain your cart ./cart', async () => {
            const response = await requester
                .get('/cart')
                .set('Cookie', `${cookie.name}=${cookie.value}`)

            expect(response.statusCode).to.be.equal(200)
        })

        it('Add product to cart ./cart/add_product/{pid}', async () => {
            const response = await requester
                .put(`/cart/add_product/${productId}`)
                .set('Cookie', `${cookie.name}=${cookie.value}`)
                .send()
            expect(response.statusCode).to.be.equal(200)
        })

        it('Delete product from your cart ./cart/products/{pid}', async () => {
            const response = await requester
                .delete(`/cart/product/${productId}`)
                .set('Cookie', `${cookie.name}=${cookie.value}`)
                .send()
            expect(response.statusCode).to.be.equal(200)
        })
    })

})