module.exports = {
    HOST: 'sql5.freesqldatabase.com',
    USER: 'sql5472634',
    PASSWORD: 'jBmy28jrNx',
    DB: 'sql5472634',
    dialect: 'mysql',

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
}