//const { NODE_ENV = 'development' } = process.env

module.exports = {
  db: {
    host     : 'localhost',
    user     : 'root',
    password : '1234',
    //database : `codenation_${NODE_ENV}`,
    database : `codenation_development`,
  }
  //env: NODE_ENV
}
