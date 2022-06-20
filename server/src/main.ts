import Server from './server';
import qs from 'qs';
import { serverHost } from './constants/app.constants';

async function main() {
	const startTime = performance.now();

	const app = await Server({
		logger: true,
		disableRequestLogging: true,
		ignoreTrailingSlash: true,
		querystringParser: (str) => qs.parse(str),
	});

	const endTime = performance.now();

	if (!!(require.main && module.children)) {
		for (let [path, route] of app.routes) {
			app.log.info(`Mapped {${path}, ${route[0].method}} route`);
		}

		app.ready(async () => {
			app.log.info(
				`Fastly server took ${Math.floor(endTime - startTime)} ms to start`
			);
			app.log.info(
				`Developed by @Shair17 <hello@shair.dev>, https://shair.dev`
			);

			await app.listen(+app.config.PORT, serverHost);

			app.log.info(
				`Websocket server is listening at ws://${serverHost}:${app.config.PORT}`
			);
		});
	}
}

main();
