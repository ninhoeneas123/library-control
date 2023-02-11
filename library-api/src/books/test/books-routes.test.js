import request from 'supertest'
import {
    describe, expect, it, jest, test
} from '@jest/globals';
import app from '../../app.js'

let idResponse
describe('Test CREATE in /books/create', () => {
    it('should return 201 when create author', async () => {
        const res = await request(app)
            .post('/books/create')
            .send({
                title: 'NARNIA 2',
                genre: "action",
                authorId: 1,
                publishingId: 1
            })
            .expect('Content-Type', /json/)
            .expect(201)

        idResponse = res.body.id
    })

    it('should return 409 when create author', async () => {
        const res = await request(app)
            .post('/books/create')
            .send(
                {
                    title: 'NARNIA 2',
                    genre: "action",
                    authorId: 1,
                    publishingId: 1
                }
            )
            .expect('Content-Type', /json/)
            .expect(409)
        expect(res.body.message).toEqual('Book already exists')
    })
})

describe('Test GET in /author', () => {
    it('should return 200 when get all auth  ors', async () => {
        const res = await request(app)
            .get('/author')
            .expect('Content-Type', /json/)
            .expect(200)
        expect(res.body).toEqual(expect.any(Array))
    })
})

describe('Test GET in /books/find/:id', () => {
    it('should return 200 when get book by id', async () => {
        console.log("aaaaaaaaaaaaaaa",idResponse)
        const res = await request(app)
            .get(`/books/find/${idResponse}`)
            .expect(200)

        expect(res.body).toEqual(expect.any(Object))
    })
    it('should return 404 when get book by id', async () => {
        const res = await request(app)
            .get(`/books/find/${idResponse}0000`)
            .expect(404)

        expect(res.body.message).toEqual('Book not found')
    })
})

describe('Test GET in /books/find-by-name/', () => {
    it('should return 200 when get book by name', async () => {
        const res = await request(app)
            .get(`/books/find-by-name/`)
            .send(
                {
                    title: 'NARNIA 2',
                }
            )
            .expect('Content-Type', /json/)
            .expect(200)
        expect(res.body).toEqual(expect.any(Object))
    })
    it('should return 404 when get book by name', async () => {
        const res = await request(app)
            .get(`/books/find-by-name/`)
            .send(
                {
                    title: 'NARNIA 02',
                }
            )
            .expect('Content-Type', /json/)
            .expect(404)
        expect(res.body.message).toEqual('Book not found')
    })
})

describe('Test UPDATE in /books/update/:id', () => {
    test.each([
        ['title', { title: 'NARNIA 23' }],
        ['genre', { genre: 'action' }],
        ['authorId', { authorId: 3 }],
        ['publishingId', { publishingId: 3 }],
    ])('must change the field %s', async (key, param) => {

        const requestSpy = { request }
        const spy = jest.spyOn(requestSpy, 'request')
        const res = await requestSpy.request(app)
            .put(`/books/update/${idResponse}`)
            .send(param)
            .expect('Content-Type', /json/)
            .expect(200)
        expect(spy).toHaveBeenCalled()
        expect(res.body.message).toEqual('Book updated successfully')
    })
    it('should return 404 when update author', async () => {
        const res = await request(app)
            .put(`/author/update/999`)
            .send(
                {
                    name: 'Author 01',
                    nationality: "Brasil"
                }
            )
            .expect('Content-Type', /json/)
            .expect(404)
        expect(res.body.message).toEqual('Author not found')
    })
})
describe('Test DELETE in /books/delete/:id', () => {
    it('should return 200 when delete book', async () => {
        const res = await request(app)
            .delete(`/books/delete/${idResponse}`)
            .expect(200)
        expect(res.body.message).toEqual('book deleted successfully')
    })

    it('should return 404 when delete book', async () => {
        const res = await request(app)
            .delete(`/books/delete/999`)
            .expect(404)
        expect(res.body.message).toEqual('book not found')
    })

})
