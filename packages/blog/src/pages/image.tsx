import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import Img from 'gatsby-image';


export const Image = () => {
	const data = useStaticQuery(query)

	return <Img fluid={data.placeholderImage.childImageSharp.fluid} />
}

const query = graphql`
	query {
		placeholderImage: file(relativePath: { eq: "gatsby-astronaut.png" }) {
			childImageSharp {
				fluid(maxWidth: 300) {
					...GatsbyImageSharpFluid
				}
			}
		}
	}
`
