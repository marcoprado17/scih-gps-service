const restify = require('restify');
const router = new (require('restify-router')).Router();
const server = restify.createServer({
	name: 'scih-gps-service',
	version: '1.0.0',
});
const mongoose = require('mongoose');
const mongoDbUri = "mongodb://root:UycjvlH5R54cJHfy44XGbvtXfGtXKweQ@35.239.45.68:27017/gps-data?authSource=admin"

const connectWithRetry = () => {
	console.log('MongoDB connection with retry')
	mongoose.connect(mongoDbUri, {}).then(()=>{
		console.log('MongoDB is connected')
	}).catch(err=>{
		console.log('MongoDB connection unsuccessful, retry after 5 seconds.')
		setTimeout(connectWithRetry, 5000)
	});
}
connectWithRetry();

const gpsDataRoutes = require('./resources/gpsData/routes');

// server.use(restify.plugins.throttle({
// 	burst: 100,  	// Max 10 concurrent requests (if tokens)
// 	rate: 2,  		// Steady state: 2 request / 1 seconds
// 	ip: true,		// throttle per IP
// }));
server.use(restify.plugins.bodyParser());
server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.gzipResponse());

router.get('/', (req, res, next) => {
	res.send(200);
});

router.add('/api/accounts/:accountId/contracts/:contractId/gps-data', gpsDataRoutes);
router.applyRoutes(server);

server.on('after', restify.plugins.metrics({ server: server }, function onMetrics(err, metrics) {
	console.info(`${metrics.method} ${metrics.path} ${metrics.statusCode} ${metrics.latency} ms`);
}));	

server.listen(8282, function () {
	console.info('%s listening at %s', server.name, server.url);
});

server.on('uncaughtException', function (req, res, route, err) {
	console.error(err);
});
