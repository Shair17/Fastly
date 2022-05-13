import Server from './server';
import { appHost } from './constants/app.constants';

async function main() {
	const startTime = performance.now();

	const app = await Server({
		logger: true,
		disableRequestLogging: true,
		ignoreTrailingSlash: true,
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
			await app.listen(+app.config.PORT, appHost);
		});
	}
}

main();
