import PropTypes from 'prop-types'


function SeoTags({ seo }) {
  const structuredData = JSON.stringify(seo.structuredData).replaceAll('<', '\\u003c')

  return (
    <>
      <title>{seo.documentTitle}</title>
      <meta content={seo.description} name='description' />
      <meta content={seo.robots} name='robots' />
      <meta content={seo.robots} name='googlebot' />
      {seo.authorName ? <meta content={seo.authorName} name='author' /> : null}
      <link href={seo.canonical} rel='canonical' />

      <meta content={seo.documentTitle} property='og:title' />
      <meta content={seo.description} property='og:description' />
      <meta content={seo.pageType} property='og:type' />
      <meta content={seo.canonical} property='og:url' />
      <meta content={seo.documentTitle} property='og:image:alt' />
      <meta content='en_US' property='og:locale' />
      <meta content='Ayesha JM' property='og:site_name' />
      {seo.socialImage ? <meta content={seo.socialImage} property='og:image' /> : null}

      <meta content='summary_large_image' name='twitter:card' />
      <meta content={seo.documentTitle} name='twitter:title' />
      <meta content={seo.description} name='twitter:description' />
      {seo.socialImage ? <meta content={seo.socialImage} name='twitter:image' /> : null}
      {seo.socialImage ? <meta content={seo.imageAlt} name='twitter:image:alt' /> : null}

      {seo.publishedAt ? <meta content={seo.publishedAt} property='article:published_time' /> : null}
      {seo.modifiedAt ? <meta content={seo.modifiedAt} property='article:modified_time' /> : null}
      {seo.authorName ? <meta content={seo.authorName} property='article:author' /> : null}
      {seo.section ? <meta content={seo.section} property='article:section' /> : null}
      {seo.tags.map((tag) => <meta content={tag} key={tag} property='article:tag' />)}

      <script dangerouslySetInnerHTML={{ __html: structuredData }} type='application/ld+json' />
    </>
  )
}


SeoTags.propTypes = {
  seo: PropTypes.shape({
    authorName: PropTypes.string,
    canonical: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    documentTitle: PropTypes.string.isRequired,
    imageAlt: PropTypes.string,
    modifiedAt: PropTypes.string,
    pageType: PropTypes.string.isRequired,
    publishedAt: PropTypes.string,
    robots: PropTypes.string.isRequired,
    section: PropTypes.string,
    socialImage: PropTypes.string,
    structuredData: PropTypes.object.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
}


export default SeoTags
