const router = new (require('restify-router')).Router();

router.get('/api/accounts/:accountId/gps-data', function (req, res, next) {
	res.json({
		message: 'Lista com todas gps-data',
		query: req.query
	});
	next();
});

module.exports = router;
