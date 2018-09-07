const router = new (require('restify-router')).Router();
const GpsDataSchema = require('./model');

router.get('/', function (req, res, next) {
	let limit = parseInt(req.query.limit, 10) || 10; // default limit to 10 docs
	let skip  = parseInt(req.query.skip, 10) || 0; // default skip to 0 docs
	let query = req.params || {};

	// remove skip and limit from data to avoid false querying
	delete query.skip
	delete query.limit

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

router.post('/', function (req, res, next) {
	console.log(req.params);
	let data = Object.assign({}, { accountId: req.params.accountId, contractId: req.params.contractId }, req.body) || {}
	console.log(data);

	GpsDataSchema.create(data)
		.then(gpsData => {
			res.send(200, gpsData)
			next()
		})
		.catch(err => {
			res.send(500, err)
		})
});

module.exports = router;
