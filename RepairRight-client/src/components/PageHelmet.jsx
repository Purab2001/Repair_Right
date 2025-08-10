import React from 'react'
import { Helmet } from '@dr.pogodin/react-helmet'
import { usePageTitle } from '../hooks/usePageTitle'
import { useLocation } from 'react-router'

const PageHelmet = ({
    customTitle = null,
    customDescription = null,
    customKeywords = null,
    additionalMeta = []
}) => {
    const location = useLocation()
    const { title, description, keywords } = usePageTitle(customTitle)

    const finalDescription = customDescription || description
    const finalKeywords = customKeywords || keywords

    const isHomePage = location.pathname === '/'
    const pageTitle = isHomePage && !customTitle ? 'RepairRight - Professional Home Repair Services' : title

    return (
        <Helmet>
            <title>{pageTitle}</title>
            <meta name="description" content={finalDescription} />
            <meta name="keywords" content={finalKeywords} />

            <meta property="og:type" content="website" />
            <meta property="og:title" content={pageTitle} />
            <meta property="og:description" content={finalDescription} />
            <meta property="og:site_name" content="RepairRight" />

            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={pageTitle} />
            <meta name="twitter:description" content={finalDescription} />

            {additionalMeta.map((meta, index) => (
                <meta key={index} {...meta} />
            ))}
        </Helmet>
    )
}

export default PageHelmet
