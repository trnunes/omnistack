const knex = require('knex');
const configuration = require('../../knexfile');

const config = process.env.NODE_ENV === 'test' ? configuration.test : configuration.development;
console.log("Olá", config);
const connection = knex(config);
module.exports = connection;
