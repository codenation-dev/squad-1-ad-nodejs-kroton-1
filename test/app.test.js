const request = require('supertest')
const server = require('../src/app')
const db = require('../src/models')

beforeAll(async () => {
  await db.sequelize.query('-- DROP TABLE IF EXISTS logs;')
  await db.sequelize.sync()
})

afterAll(async () => {
  await db.sequelize.query('-- DROP TABLE IF EXISTS logs;')
  await db.sequelize.close()
})

const logs_tests = [
    {},
    {}
]

describe('The API on /logs Endpoint at GET method should...', () => {
  beforeEach(async () => {
    db.logs.bulkCreate(logs_tests)
  })

  afterEach(async () => {
    await db.sequelize.query('SET FOREIGN_KEY_CHECKS = 0;')
    await db.sequelize.query('TRUNCATE TABLE logs;')
    await db.sequelize.query('SET FOREIGN_KEY_CHECKS = 1;')
  })

  test(`return 200 as status code and have 'total' and 'logs' as properties`, async () => {
    const res = await request(server.app).get('/logs')
    expect(res.body.total).toBe(10)
    expect(res.body.logs).toBeDefined()
  })

  test(`return the 'log' property with all items from DB`, async () => {
    // ...
  })
})

describe('The API on /log/:logId Endpoint at GET method should...', () => {
  beforeEach(async () => {
    // ...
  })

  afterEach(async () => {
    await db.sequelize.query('SET FOREIGN_KEY_CHECKS = 0;')
    await db.sequelize.query('TRUNCATE TABLE logs;')
    await db.sequelize.query('SET FOREIGN_KEY_CHECKS = 1;')
  })
})

describe('The API on /log/:logId/info Endpoint at GET method should...', () => {
  beforeEach(async () => {
    // ...
  })

  afterEach(async () => {
    await db.sequelize.query('SET FOREIGN_KEY_CHECKS = 0;')
    await db.sequelize.query('TRUNCATE TABLE logs;')
    await db.sequelize.query('SET FOREIGN_KEY_CHECKS = 1;')
  })
})

describe('The API on /logs Endpoint at POST method should...', () => {
  afterEach(async () => {
    await db.sequelize.query('SET FOREIGN_KEY_CHECKS = 0;')
    await db.sequelize.query('TRUNCATE TABLE logs;')
    await db.sequelize.query('SET FOREIGN_KEY_CHECKS = 1;')
  })
})