import { buildAuthors } from './loadAuthors'
import { buildBlogPosts, blogPosts } from './loadBlogPosts'


const authorSource = `---
slug: test-author
name: Test Author
role: Writer
shortBio: Writes useful tests.
avatar: /author.jpg
avatarAlt: Test author portrait
---
Biography.
`

const postSource = ({ draft = false, slug = 'test-post', author = 'test-author' } = {}) => `---
slug: ${slug}
title: Test Post
description: Test description.
publishedAt: 2026-01-01
author: ${author}
coverImage: /cover.jpg
coverAlt: Cover image
draft: ${draft}
tags:
  - Testing
---
A short article body.
`

describe('Markdown content loaders', () => {
  it('loads real posts with resolved authors and reading times', () => {
    expect(blogPosts.length).toBeGreaterThan(0)
    expect(blogPosts[0].author.name).toBeTruthy()
    expect(blogPosts[0].readingTime).toBeGreaterThan(0)
  })

  it('parses authors and excludes drafts when requested', () => {
    const authorRecords = buildAuthors({ '/content/authors/test.md': authorSource })
    const posts = buildBlogPosts({
      '/content/blog/published.md': postSource(),
      '/content/blog/draft.md': postSource({ draft: true, slug: 'draft-post' }),
    }, authorRecords, { showDrafts: false })

    expect(posts).toHaveLength(1)
    expect(posts[0].slug).toBe('test-post')
  })

  it('rejects duplicate slugs and unknown authors', () => {
    const authorRecords = buildAuthors({ '/content/authors/test.md': authorSource })
    expect(() => buildBlogPosts({ a: postSource(), b: postSource() }, authorRecords)).toThrow(/duplicate blog slug/)
    expect(() => buildBlogPosts({ a: postSource({ author: 'missing-author' }) }, authorRecords)).toThrow(/unknown author slug/)
  })
})
