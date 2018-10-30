const router = new (require('restify-router')).Router();
const GpsDataSchema = require('./model');

// Endpoint para obtenção dos dados do GPS
router.get('/', function (req, res, next) {
	// default limit to 10 docs
	let limit = parseInt(req.query.limit, 10) || 10; 
	// default skip to 0 docs
	let skip  = parseInt(req.query.skip, 10) || 0; 
	let query = req.params || {};

	// remove skip and limit from data to avoid false querying
	delete query.skip
	delete query.limit

	// Obtendo um determinado dado do GPS
	GpsDataSchema
		.find(query)
		.skip(skip)
		.limit(limit)
		.then(allGpsData => {
			res.send(200, allGpsData)
			next()
		})
		.catch(err => {
			res.send(500, err)
		})
});

// Enviando uma amostra do sinal GPS para o banco de dados
router.post('/', function (req, res, next) {
	// console.log(req.params);
	// Adicionando accountId e contractId ao dado que será 
	// armazenado no banco de dados
	let data = Object.assign({}, 
		{ 	
			accountId: req.params.accountId, 
			contractId: req.params.contractId 
		}, req.body) || {}
	// console.log(data);

	// Enviando para o banco de dados o dado
	GpsDataSchema
		.create(data)
		.then(gpsData => {
			res.send(200)
			next()
		})
		.catch(err => {
			res.send(500, err)
		})
});

module.exports = router;
