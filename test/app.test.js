const request = require('supertest')
const server = require('../src/app')
const db = require('../src/models')

const clearDB = async () => {
  jest.setTimeout(20000)
  await db.sequelize.query('SET FOREIGN_KEY_CHECKS = 0;')
  await db.sequelize.query('TRUNCATE TABLE logs;')
  await db.sequelize.query('TRUNCATE TABLE users;')  
  await db.sequelize.query('SET FOREIGN_KEY_CHECKS = 1;')
}

/*
beforeAll(async () => {
  await db.sequelize.query('DROP TABLE IF EXISTS users;')
  await db.sequelize.query('DROP TABLE IF EXISTS logs;')
  await db.sequelize.sync()
})

afterAll(async () => {
  await db.sequelize.query('DROP TABLE IF EXISTS users;')
  await db.sequelize.query('DROP TABLE IF EXISTS logs;')
  await db.sequelize.close()
})
*/

beforeAll(() => clearDB())
afterAll(() => clearDB())


const logs_tests = [
    {
      'id': 1445648915616,
      'level': 'error',
      'description': 'expected expression, got "||"',
      'message': 'please, consult the website for more information',
      'system': 'citrix'
    },
    {
      'id': 1498414561551,
      'type': 'warning',
      'description': 'The fs.SyncWriteStream class was never intended to be a publicly accessible API and has been removed. No alternative API is available. Please use a userland alternative.',
      'message': 'please, consult the manual for mor information',
      'system': 'docenteonline'
    }
]

describe('The API on users/signup/ Endpoint at POST method should...', () => {

  test(`return 200 as status code and 'message' as propertie to a new user`, async () => {
    const res = await request(server.app)
      .post('/users/signup')
      .send({
        name: 'Batman',
        email: 'batbat@gmail.com',
        password: 'admin@123!'
      })

    expect(res.statusCode).toEqual(200)
    expect(Object.keys(res.body)).toMatchObject(['message'])
  })


  test(`return 400 as status code for a email already registered`, async () => {
    const res = await request(server.app)
      .post('/users/signup')
      .send({
        name: 'Batman',
        email: 'batbat@gmail.com',
        password: 'admin@123!'
      })

    expect(res.statusCode).toEqual(400)
    expect(Object.keys(res.body)).toMatchObject(['message'])
  })

  test(`return 404 as status code for a wrong data format`, async () => {
    const res = await request(server.app)
      .post('/users/signup')
      .send({
        username: 'Robin',
        email: 'robin@gmail.com',
        password: 'admin@123!'
      })

    expect(res.statusCode).toEqual(404)
    expect(Object.keys(res.body)).toMatchObject(['message'])
  })

})

describe('The API on users/login Endpoint at POST method should...', () => {
  test(`return 200 as status code and the new token generated`, async () => {

    const res = await request(server.app)
      .post('/users/login')
      .send({
        email: 'batbat@gmail.com',
        password: 'admin@123!'
      })

    expect(res.statusCode).toEqual(200)
    expect(Object.keys(res.body)).toMatchObject(['name','email','accessToken'])
  })

  test(`return 404 as status code for a given email not registered`, async () => {

    const res = await request(server.app)
      .post('/users/login')
      .send({
        email: 'coringa@gmail.com',
        password: '123456!'
      })

    expect(res.statusCode).toEqual(404)
    expect(Object.keys(res.body)).toMatchObject(['message'])
  })

  test(`return 401 as status code for a invalid password `, async () => {

    const res = await request(server.app)
      .post('/users/login')
      .send({
        email: 'batbat@gmail.com',
        password: 'wrong123!'
      })

    expect(res.statusCode).toEqual(401)
    expect(Object.keys(res.body)).toMatchObject(['accessToken','message'])
  })
})


describe('The API on /users Endpoint at GET method should...', () => {

       test(`return 201 as status code and the information of a new record created`, async () => {

       await request(server.app)
      .post('/users/signup')
      .send({
        name: 'Robin',
        email: 'robin@gmail.com',
        password: 'admin@123!'
      })

        const { accessToken = '' } = (
          await request(server.app)
            .post('/users/login')
            .send({
              email: 'robin@gmail.com',
              password: 'admin@123!'
            })
        ).body
        
    const res = await request(server.app)
      .get('/users')
      .set('x-access-token', accessToken)


      expect(res.statusCode).toEqual(200)
      expect(Object.keys(res.body)).toMatchObject([
        'name',
        'email',
        "created",
        "updated"
      ])
    
  })

  test(`return 403 as status code for a empty token`, async () => {

 
  const res = await request(server.app)
   .get('/users')

   expect(res.statusCode).toEqual(403)
   expect(Object.keys(res.body)).toMatchObject([
     'message'
   ])
 
})

test(`return 401 as status code for a invalid token`, async () => {

accessToken  ='eywrongtoken12345678910wrong123456789wrong' 
const res = await request(server.app)
 .get('/users')
 .set('x-access-token', accessToken)

 expect(res.statusCode).toEqual(401)
 expect(Object.keys(res.body)).toMatchObject(['message'])

})

})

describe('The API on users/update Endpoint at PUT method should...', () => {
  test(`return 200 as status code for a new password`, async () => {

    const { accessToken = '' } = (
      await request(server.app)
        .post('/users/login')
        .send({
          email: 'robin@gmail.com',
          password: 'admin@123!'
        })
    ).body
    

    const res = await request(server.app)
      .put('/users/update')
      .send({
        password: '0011'
      })
      .set('x-access-token', accessToken)

    expect(res.statusCode).toEqual(200)
    expect(Object.keys(res.body)).toMatchObject(['message'])
  })

  test(`return 200 as status code for login with the new password`, async () => {

    const res = await request(server.app)
      .post('/users/login')
      .send({
        email: 'robin@gmail.com',
        password: '0011'
      })

    expect(res.statusCode).toEqual(200)
    expect(Object.keys(res.body)).toMatchObject(['name','email','accessToken'])
  })
})

describe('The API on /users/delete Endpoint at DELETE method should...', () => {

  test(`return 204 as status code for a deleted user`, async () => {

    await request(server.app)
    .post('/users/signup')
    .send({
      name: 'Pinguim',
      email: 'pinguim@gmail.com',
      password: 'quack123'
    })
    
      const { accessToken = '' } = (
        await request(server.app)
          .post('/users/login')
          .send({
            email: 'pinguim@gmail.com',
            password: 'quack123'
          })
      ).body
      
    const res = await request(server.app)
    .delete('/users/delete')
    .set('x-access-token', accessToken)

    expect(res.statusCode).toEqual(204)
    
  })
  test(`return 204 as status code for a deleted user`, async () => {


    const res = await request(server.app)
      .post('/users/login')
      .send({
        email: 'pinguim@gmail.com',
        password: 'quack123'
      })
      

    expect(res.statusCode).toEqual(404)
    expect(res.body).toEqual({ message: "User Not found." })
    
  })

})


/*
describe('The API on /logs Endpoint at GET method should...', () => {
  beforeEach(async () => {
    db.logs.bulkCreate(logs_tests)
  })

  afterEach(async () => {
    clearDB()
  })

  test(`return 200 as status code and have 'total' and 'logs' as properties`, async () => {
    const res = await request(server.app).get('/logs')
    expect(res.body.total).toBe(logs_tests.length)
    expect(res.body.logs).toMatchObject(logs_tests)
  })

  test(`return the 'log' property with all items from DB`, async () => {
    const res = await request(server.app).get('/logs')
    expect(res.body.logs).toEqual(logs_tests)
  })
})

describe('The API on /log/:logId Endpoint at GET method should...', () => {
  beforeEach(async () => {
    // ...
  })

  afterEach(async () => {
    clearDB()
  })
})

describe('The API on /log/:logId/info Endpoint at GET method should...', () => {
  beforeEach(async () => {
    // ...
  })

  afterEach(async () => {
    clearDB()
  })
})

describe('The API on /log Endpoint at POST method should...', () => {
  afterEach(async () => {
    clearDB()
  })
})

describe('The API on /log Endpoint at PATCH method should...', () => {
  beforeEach(async () => {
    // ...
  })

  afterEach(async () => {
    clearDB()
  })
})

describe('The API on /log Endpoint at DELETE method should...', () => {
  beforeEach(async () => {
    // ...
  })

  afterEach(async () => {
    clearDB()
  })
})

describe('The API on /signup Endpoint at POST method should...', () => {
  afterEach(async () => {
    clearDB()
  })
})

describe('The API on /login Endpoint at POST method should...', () => {
  afterEach(async () => {
    clearDB()
  })
})

describe('The API on / Endpoint at GET method should...', () => {
  test(`return 200 as status code and have all list of routes`, async () => {
    const res = await request(server.app).get('/')
    const routes = {
      "GET":
      ['/logs', '/log/:logId', '/log/:logId/info'],
      "POST":
      ['/log', '/signin', '/login'],
      'PATCH':
      ['/log'],
      'DELETE':
      ['/log']
    }
    expect(res.body.routes).toMatchObject(routes)
  })
})
*/