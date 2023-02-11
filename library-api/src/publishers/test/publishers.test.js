import request from 'supertest'
import {
    describe, expect, it, jest, test
} from '@jest/globals';
import app from '../../app.js'

let idResponse
describe('Test CREATE in /publishers/create', () => {
    it('should return 201 when create author', async () => {
        const response = await request(app)
            .post('/publishers/create')
            .send({
                name: "Editora leao",
                cnpj: "0293029",
                tell: "099299939333"
            })
            .expect('Content-Type', /json/)
            .expect(201)

        idResponse = response.body.id
    })

    it('should return 409 when create author', async () => {

        const res = await request(app)
            .post('/publishers/create')
            .send({
                name: "Editora leao",
                cnpj: "0293029",
                tell: "099299939333"
            })
            .expect('Content-Type', /json/)
            .expect(409)
        expect(res.body.message).toEqual('Publisher already exists')
    })
})

describe('Test GET in /publishers/find-all', () => {
    it('should return 200 when get all publishers', async () => {
        const res = await request(app)
            .get('/publishers/find-all')
            .expect('Content-Type', /json/)
            .expect(200)
        expect(res.body).toEqual(expect.any(Object))
    })
})

describe('Test GET in /publishers/find/:id', () => {
    it('should return 200 when get publisher by id', async () => {
        const res = await request(app)
            .get(`/publishers/find/${idResponse}`)
            .expect(200)
        expect(res.body).toEqual(expect.any(Object))
    })
})

describe('Test GET in /publishers/find-by-name/', () => {
    it('should return 200 when get publishers by name', async () => {
        const res = await request(app)
            .get(`/publishers/find-by-name/`)
            .send(
                {
                    name: 'Editora leao',
                }
            )
            .expect('Content-Type', /json/)
            .expect(200)
        expect(res.body).toEqual(expect.any(Object))
    })
    it('should return 404 when get publishers by name', async () => {
        const res = await request(app)
            .get(`/publishers/find-by-name/`)
            .send(
                {
                    name: 'Editora leao cego',
                }
            )
        expect(404)
        expect(res.body.message).toEqual('Publisher not found')
    })

    it('should return 404 when get publishers by name', async () => {
        const res = await request(app)
            .get(`/publishers/find-by-name/`)
            .send(
                {
                    name: ' ',
                }
            )
        expect(404)
        expect(res.body.message).toEqual('Publisher not found')
    })
})

describe('Test UPDATE in /publishers/update/:id', () => {
    test.each([
        ['name', { name: 'Editora leao doca' }],
        ['cnpj', { cnpj: '0293029' }],
        ['tell', { tell: '099299939333' }],
    ])('must change the field %s', async (key, param) => {

        const requestspy = { request }
        const spy = jest.spyOn(requestspy, 'request')
        const res = await requestspy.request(app)
            .put(`/publishers/update/${idResponse}`)
            .send(param)
            .expect('Content-Type', /json/)
            .expect(200)
        expect(spy).toHaveBeenCalled()
        expect(res.body.message).toEqual('Publisher updated successfully')
    })

    it('should return 404 when update publishers', async () => {
        const res = await request(app)
            .put(`/publishers/update/999`)
            .send(
                {
                    name: 'Editora pascoale 092',
                }
            )
            .expect('Content-Type', /json/)
            .expect(404)
        expect(res.body.message).toEqual('Publisher not found')
    })
})
describe('Test DELETE in /books/delete/:id', () => {
    it('should return 200 when delete book', async () => {
        console.log(idResponse)
        const res = await request(app)
            .delete(`/publishers/delete/${idResponse}`)
            .expect(200)
        expect(res.body.message).toEqual('Publisher deleted successfully')
    })

    it('should return 404 when delete book', async () => {
        const res = await request(app)
            .delete(`/publishers/delete/999`)
            .expect(404)
        expect(res.body.message).toEqual('Publisher not found')
    })

})
