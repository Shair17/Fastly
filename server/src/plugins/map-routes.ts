import { FastifyInstance } from 'fastify';

export default async function mapRoutes(fastify: FastifyInstance) {
	let routes: string[] = [];

	for (let [path, route] of fastify.routes) {
		fastify.log.info(`Mapped {${path}, ${route[0].method}} route`);
		routes.push(`Mapped {${path}, ${route[0].method}} route`);
	}

	fastify.get('/map-routes', async () => routes);
}
