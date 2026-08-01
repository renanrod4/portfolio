import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
	return {
		rules: {
			userAgent: '*',
			allow: '/',
		},
		sitemap: 'https://renanrod.vercel.app/sitemap.xml',
		host: 'https://renanrod.vercel.app',
	};
}
