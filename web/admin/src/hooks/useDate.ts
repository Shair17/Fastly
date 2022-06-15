import { useEffect, useState } from 'react';

interface Greeting {
	time: string;
	greeting: string;
}

export function useDate(): Greeting {
	// const locale = 'en';

	const [today, setDate] = useState<Date>(new Date());

	useEffect(() => {
		const timer = setInterval(() => {
			setDate(new Date());
		}, 60 * 1000);
		return () => {
			clearInterval(timer);
		};
	}, []);

	// const day = today.toLocaleDateString(locale, { weekday: 'long' });
	// const date = `${day}, ${today.getDate()} ${today.toLocaleDateString(locale, {
	// 	month: 'long',
	// })}\n\n`;

	const hour = today.getHours();
	const greeting = `${
		(hour < 12 && 'Buenos días') ||
		(hour < 18 && 'Buenas tardes') ||
		'Buenas noches'
	}`;

	const time = today.toLocaleTimeString('es', {
		hour: 'numeric',
		hour12: true,
		minute: 'numeric',
	});

	return {
		// date,
		time,
		greeting,
	};
}
