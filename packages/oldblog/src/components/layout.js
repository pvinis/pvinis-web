import React from 'react'
import { pipe, keys, map } from 'ramda'
import { Link } from 'gatsby'
import { Global, css } from '@emotion/core'

import { rhythm, scale } from '../utils/typography'
import Fonts from '../utils/fonts'


const Layout = (props) => {
    const { location, title, children } = props
    const rootPath = `${__PATH_PREFIX__}/`
    let header

    if (location.pathname === rootPath) {
        header = (
            <h1 style={{
                ...scale(1.5),
                marginBottom: rhythm(1.5),
                marginTop: 0,
                fontFamily: 'Iosevka',
                fontWeight: 'bold',
            }}>
                <Link
                    style={{
                        boxShadow: 'none',
                        textDecoration: 'none',
                        color: 'inherit',
                    }}
                    to={'/'}
                >
                    {title}
                </Link>
            </h1>
        )
    } else {
        header = (
            <h3
                style={{
                    fontFamily: 'Iosevka, Montserrat, sans-serif',
                    marginTop: 0,
                }}
            >
                <Link
                    style={{
                        boxShadow: 'none',
                        textDecoration: 'none',
                        color: 'inherit',
                    }}
                    to={'/'}
                >
                    {title}
                </Link>
            </h3>
        )
    }

    const footer = (<>
        {`© ${new Date().getFullYear()}, Built by `}
        <a href="https://www.github.com/pvinis">pvinis</a>
        {' with 💜 '}
        {' using '}
        <a href="https://www.gatsbyjs.org">Gatsby</a>
        {', '}
        <a href="https://github.com">GitHub</a>
        {', '}
        <a href="https://netlify.com">Netlify</a>
        {', '}
        <a href="https://cloudflare.com">Cloudflare</a>
        .
    </>)

    return (
        <div
            style={{
                marginLeft: 'auto',
                marginRight: 'auto',
                maxWidth: rhythm(24),
                padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
            }}
        >
            <header>{header}</header>
            <main>{children}</main>
            <footer>{footer}</footer>
        </div>
    )
}
export default Layout
