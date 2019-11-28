const GOOGLE_ANALYTICS_ID = 'UA-141718871-1'


module.exports = {
	siteMetadata: {
		title: 'Purple Royale',
		author: 'Pavlos Vinieratos',
		description: 'The website and blog of Pavlos, where he writes about code and codes about stuff.',
		siteUrl: 'https://pvin.is',
		social: {
			twitter: 'pvinis',
			github: 'pvinis',
		},
	},
	plugins: [
		{
			resolve: 'gatsby-plugin-google-analytics',
			options: {
				trackingId: GOOGLE_ANALYTICS_ID,
				head: true,
			},
		},
		{
			resolve: 'gatsby-source-filesystem',
			options: {
				path: `${__dirname}/content/posts`,
				name: 'blog',
			},
		},
		{
			resolve: 'gatsby-source-filesystem',
			options: {
				path: `${__dirname}/content/assets`,
				name: 'assets',
			},
		},
		{
			resolve: 'gatsby-transformer-remark',
			options: {
				plugins: [
					{
						resolve: 'gatsby-remark-images',
						options: {
							maxWidth: 590,
						},
					},
					{
						resolve: 'gatsby-remark-responsive-iframe',
						options: {
							wrapperStyle: 'margin-bottom: 1.0725rem',
						},
					},
					'gatsby-remark-prismjs',
					'gatsby-remark-copy-linked-files',
					'gatsby-remark-smartypants',
				],
			},
		},
		'gatsby-transformer-sharp',
		'gatsby-plugin-sharp',
		{
			resolve: 'gatsby-plugin-google-analytics',
			options: {
				trackingId: GOOGLE_ANALYTICS_ID,
			},
		},
		'gatsby-plugin-feed',
		{
			resolve: 'gatsby-plugin-manifest',
			options: {
				name: 'Purple Royale',
				short_name: 'pvin.is',
				start_url: '/',
				background_color: '#ffffff',
				theme_color: '#663399',
				display: 'minimal-ui',
				icon: 'content/assets/colors-small.png',
			},
		},
		'gatsby-plugin-offline',
		'gatsby-plugin-react-helmet',
		{
			resolve: 'gatsby-plugin-typography',
			options: {
				pathToConfigModule: 'src/utils/typography',
			},
		},
		'gatsby-plugin-emotion',
	],
}
