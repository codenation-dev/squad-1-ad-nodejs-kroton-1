const request = require('supertest')
const server = require('../src/app')
const db = require('../src/models')

const clearDB = async () => {
  await db.sequelize.query('SET FOREIGN_KEY_CHECKS = 0;')
  await db.sequelize.query('TRUNCATE TABLE logs;')
  await db.sequelize.query('TRUNCATE TABLE users;')  
  await db.sequelize.query('TRUNCATE TABLE log_levels;')
  await db.sequelize.query('SET FOREIGN_KEY_CHECKS = 1;')
}

beforeAll(async () => {
  await db.sequelize.query('-- DROP TABLE IF EXISTS logs;')
  await db.sequelize.sync()
})

afterAll(async () => {
  await db.sequelize.query('-- DROP TABLE IF EXISTS logs;')
  await db.sequelize.close()
})

const logs_tests = [
    {
      'id': 1445648915616,
      'type': 'error',
      'subType': 'SyntaxError',
      'description': 'expected expression, got "||"',
      'system': 'citrix',
      'ip': '124.168.175.242',
      'operation': ''
    },
    {
      'id': 1498414561551,
      'type': 'warning',
      'subType': 'End-of-Life',
      'description': 'The fs.SyncWriteStream class was never intended to be a publicly accessible API and has been removed. No alternative API is available. Please use a userland alternative.',
      'system': 'docenteonline',
      'ip': '82.236.34.130',
      'operation': 'Login'
    }
]

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

describe('The API on /signin Endpoint at POST method should...', () => {
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