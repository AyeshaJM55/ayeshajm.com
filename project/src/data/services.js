import productDesign from '../assets/featured-work/3d-product-design.png'
import lifestyleRender from '../assets/featured-work/lifestyle-image-render.png'
import photorealisticRender from '../assets/featured-work/photo-realistic-renders.png'
import studioRender from '../assets/featured-work/studio-renders.png'
import serviceVideoA from '../assets/services/service-a.mp4'
import serviceVideoB from '../assets/services/service-b.mp4'

export const services = [
  {
    slug: '3d-modeling',
    number: '01',
    title: '3D Modeling',
    shortTitle: 'Modeling',
    description: 'Precise digital geometry that captures form, proportions, construction, and defining product details.',
    intro: 'Strong imagery begins with a dependable model. Products are rebuilt from CAD, drawings, measurements, sketches, or photography with enough structure to support stills, animation, and future campaign variations.',
    heroMedia: productDesign,
    supportingMedia: studioRender,
    video: serviceVideoA,
    deliverables: ['Clean production-ready geometry', 'Organized source scenes', 'UV-ready assets', 'Variant-ready product models', 'Web and animation preparation'],
    idealFor: ['Products without usable CAD', 'Pre-production launches', 'Design presentations', 'Reusable campaign assets'],
    process: [
      { title: 'Reference review', description: 'Confirm proportions, construction, finishes, and missing details before production begins.' },
      { title: 'Base geometry', description: 'Build the main form and validate the silhouette from key views.' },
      { title: 'Detail pass', description: 'Add seams, interfaces, hardware, tolerances, and product-defining features.' },
      { title: 'Technical cleanup', description: 'Organize the scene for rendering, animation, and future variations.' },
    ],
    faq: [
      { question: 'Can you work without CAD files?', answer: 'Yes. Accurate models can be developed from measurements, sketches, product photographs, prototypes, or a combination of references.' },
      { question: 'Will I receive source files?', answer: 'Source-file delivery is agreed during scoping because licensing, organization, and downstream use differ by project.' },
      { question: 'Can one model support future campaigns?', answer: 'Yes. Building a clean reusable asset is often the best way to create future stills, animation, color variants, and seasonal scenes efficiently.' },
    ],
    relatedProjectSlugs: ['3d-product-design', 'product-visualization', 'studio-renders'],
  },
  {
    slug: 'photorealistic-renders',
    number: '02',
    title: 'Photorealistic Renders',
    shortTitle: 'Renders',
    description: 'High-fidelity product imagery with believable materials, controlled lighting, and polished commercial detail.',
    intro: 'Photorealistic rendering turns a digital product into imagery that feels tangible, premium, and ready for commerce. Lighting, material response, composition, and retouching are developed together for a clear visual result.',
    heroMedia: photorealisticRender,
    supportingMedia: studioRender,
    video: serviceVideoB,
    deliverables: ['Hero renders', 'Studio packshots', 'Transparent-background images', 'Detail crops', 'Color and material variants', 'Web and print exports'],
    idealFor: ['E-commerce listings', 'Launch campaigns', 'Catalogs', 'Retail presentations'],
    process: [
      { title: 'Visual direction', description: 'Define audience, usage, framing, and the visual character of the image set.' },
      { title: 'Materials', description: 'Develop believable finishes using physical references and brand-approved samples.' },
      { title: 'Lighting', description: 'Shape the product with controlled highlights, contrast, and reflections.' },
      { title: 'Final polish', description: 'Render, retouch, color-match, and prepare all required output formats.' },
    ],
    faq: [
      { question: 'What resolution can you deliver?', answer: 'Outputs can be prepared for web, marketplaces, presentations, and print. Final dimensions are agreed before rendering.' },
      { question: 'Can backgrounds be changed later?', answer: 'Yes. Transparent, neutral, campaign, and alternate-color backgrounds can be planned as part of the deliverable set.' },
      { question: 'Can you render product variations?', answer: 'Yes. Colorways, finishes, packaging variants, and component options are efficient once the base scene is approved.' },
    ],
    relatedProjectSlugs: ['photorealistic-renders', 'amazon-product-visuals', 'studio-renders'],
  },
  {
    slug: 'product-cgi-animation',
    number: '03',
    title: 'Product & CGI Animation',
    shortTitle: 'Animation',
    description: 'Purposeful motion that demonstrates features, tells the product story, and creates campaign-ready visual moments.',
    intro: 'CGI animation gives products time, movement, and narrative. Camera choreography, product motion, transitions, lighting, and edit rhythm are designed around the message rather than added as decoration.',
    heroMedia: studioRender,
    supportingMedia: productDesign,
    video: serviceVideoA,
    deliverables: ['Hero product films', 'Feature demonstrations', 'Social cutdowns', 'Looping website motion', 'Multiple aspect ratios', 'Storyboard and style frames'],
    idealFor: ['Product launches', 'Paid social campaigns', 'Feature education', 'Website hero content'],
    process: [
      { title: 'Message and script', description: 'Clarify the product story, audience, duration, and required moments.' },
      { title: 'Storyboard', description: 'Plan the sequence, camera language, product actions, and edit structure.' },
      { title: 'Animation', description: 'Build motion, lighting changes, transitions, and product behavior.' },
      { title: 'Finishing', description: 'Render, edit, add sound where scoped, and export every required format.' },
    ],
    faq: [
      { question: 'How long should a product animation be?', answer: 'The right duration depends on platform and purpose. Short social loops may be only a few seconds, while launch films often need more time to establish a story.' },
      { question: 'Can you deliver vertical and square versions?', answer: 'Yes. Aspect-ratio planning should happen early so compositions remain effective across widescreen, square, and vertical outputs.' },
      { question: 'Is sound included?', answer: 'Sound design and music can be included when agreed in the project scope.' },
    ],
    relatedProjectSlugs: ['product-visualization', '3d-product-design', 'amazon-product-visuals'],
  },
  {
    slug: 'lifestyle-renders',
    number: '04',
    title: 'Lifestyle Renders',
    shortTitle: 'Lifestyle',
    description: 'Context-rich scenes that place products naturally inside carefully art-directed environments and everyday settings.',
    intro: 'Lifestyle rendering gives a product context, scale, mood, and emotional relevance. Every environment is composed around the product so the scene feels believable without allowing the setting to become the main character.',
    heroMedia: lifestyleRender,
    supportingMedia: photorealisticRender,
    video: serviceVideoB,
    deliverables: ['Lifestyle hero images', 'Campaign scene sets', 'Seasonal variations', 'Multiple camera angles', 'Social and marketplace crops', 'Art-direction boards'],
    idealFor: ['Campaign imagery', 'Home and lifestyle products', 'Seasonal launches', 'Brand storytelling'],
    process: [
      { title: 'Mood direction', description: 'Define the environment, palette, atmosphere, and audience context.' },
      { title: 'Scene design', description: 'Build architecture, surfaces, props, and supporting details around the product.' },
      { title: 'Art direction', description: 'Refine composition, product placement, lighting, and visual hierarchy.' },
      { title: 'Image set', description: 'Produce a cohesive family of views, crops, and campaign variations.' },
    ],
    faq: [
      { question: 'Can you create a location that does not exist?', answer: 'Yes. Environments can be designed from references, mood boards, brand guidelines, or a completely new visual concept.' },
      { question: 'Can one scene produce several images?', answer: 'Yes. A well-planned scene can support alternate camera angles, product variants, seasonal styling, and multiple crops.' },
      { question: 'Do I need to provide props and location references?', answer: 'References are useful, but the full environment and prop direction can also be developed as part of the project.' },
    ],
    relatedProjectSlugs: ['lifestyle-rendering', 'lifestyle-art-direction', 'material-exploration'],
  },
]

export const getServiceBySlug = (slug) => services.find((service) => service.slug === slug)
