import app from '../../app.js'
import path from 'path'
import request from 'supertest'
import {
    describe, expect, it, jest, test
} from '@jest/globals';

let server;
beforeEach(() => {
    const port = 3000;
    server = app.listen(port);
});

afterEach(() => {
    server.close();
});

let idResponse
describe('Test CREATE in /author/create', () => {
    it('should return 201 when create author', async () => {
        const __dirname = path.resolve(path.dirname(''))
        
        const image = path.resolve(__dirname, `./author-image.jpeg`);
        const res = await request(app)
            .post('/author/create')
            .send(
                {
                    name: 'luciano ramos 1',
                    nationality: 'Brasil',
                    image: image
                }
            )
            .expect('Content-Type', /json/)
            .expect(201)

        idResponse = res.body.id
    })

    it('should return 409 when create author', async () => {
        const res = await request(app)
            .post('/author/create')
            .send(
                {
                    name: 'luciano ramos 1',
                    nationality: "Brasil"
                }
            )
            .expect('Content-Type', /json/)
            .expect(409)
        expect(res.body.message).toEqual('Author already exists')
    })
})

describe('Test GET in /author', () => {
    it('should return 200 when get all authors', async () => {
        const res = await request(app)
            .get('/author')
            .expect('Content-Type', /json/)
            .expect(200)
        expect(res.body).toEqual(expect.any(Array))
    })
})

describe('Test GET in /author/:id', () => {
    it('should return 200 when get author by id', async () => {
        const res = await request(app)
            .get(`/author/find/${idResponse}`)
            .expect(200)

        expect(res.body).toEqual(expect.any(Object))
    })
    it('should return 404 when get author by id', async () => {
        const res = await request(app)
            .get(`/author/find/9999`)
            .expect(404)
    })
})

describe('Test GET in /author/find-by-name', () => {
    it('should return 200 when get author by name', async () => {
        const res = await request(app)
            .get(`/author/find-by-name`)
            .send(
                {
                    name: 'luciano ramos 1',
                }
            )
            .expect('Content-Type', /json/)
            .expect(200)
        expect(res.body).toEqual(expect.any(Object))
    })

    it('should return 404 when get author by name', async () => {
        const res = await request(app)
            .get(`/author/find-by-name`)
            .send(
                {
                    name: 'Author LUBANGO',
                }
            )
            .expect('Content-Type', /json/)
            .expect(404)

        expect(res.body.message).toEqual('Author not found')
    })
})

describe('Test UPDATE in /author/update/:id', () => {

    test.each([
        ['name', { name: 'Author 01' }],
        ['nationality', { nationality: 'Brasil' }],
    ])('must change the field %s', async (key, param) => {

        const requestSpy = { request }
        const spy = jest.spyOn(requestSpy, 'request')
        const res = await requestSpy.request(app)
            .put(`/author/update/${idResponse}`)
            .send(param)
            .expect('Content-Type', /json/)
            .expect(200)
        expect(spy).toHaveBeenCalled()
        expect(res.body.message).toEqual('Author updated successfully')
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

    describe('Test DELETE in /author/delete/:id', () => {
        it('should return 200 when delete author', async () => {
            const res = await request(app)
                .delete(`/author/delete/${idResponse}`)
                .expect(200)
            expect(res.body.message).toEqual('Author deleted successfully')
        })

        it('should return 404 when delete author', async () => {
            const res = await request(app)
                .delete(`/author/delete/999`)
                .expect(404)
            expect(res.body.message).toEqual('Author not found')
        })

    })
})
