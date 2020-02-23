import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';

import Layout from '../components/Layout';


export const NotFoundPage = () => {
	const data = useStaticQuery(query)

	return (
		<Layout>
			<h1>NOT FOUND</h1>
			<p>You just hit a route that doesn&#39;t exist... the sadness.</p>
		</Layout>
	)
}


const query = graphql`
	query {
		site {
			siteMetadata {
				title
			}
		}
	}
`
