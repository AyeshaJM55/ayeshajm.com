import ContactCta from '../../../components/domain/site/ContactCta'
import PageHero from '../../../components/domain/site/PageHero'
import ProcessSteps from '../../../components/domain/site/ProcessSteps'
import SectionHeader from '../../../components/domain/site/SectionHeader'
import TextMediaSplit from '../../../components/domain/site/TextMediaSplit'
import studioImage from '../../../assets/featured-work/studio-renders.png'
import lifestyleImage from '../../../assets/featured-work/lifestyle-render-2.png'
import SiteLayout from '../../../layouts/SiteLayout/SiteLayout'

const process = [
  { title: 'Discover', description: 'Understand the product, audience, intended use, timeline, and existing assets.' },
  { title: 'Build', description: 'Create the digital product, scene, materials, and visual foundation.' },
  { title: 'Refine', description: 'Review composition, details, lighting, motion, and brand alignment.' },
  { title: 'Deliver', description: 'Prepare final files for web, marketplaces, campaigns, presentations, or print.' },
]

const capabilities = ['Product visualization', 'Material development', 'Lighting and art direction', 'Commercial rendering', 'CGI animation', 'E-commerce imagery']

function About() {
  return (
    <SiteLayout>
      <main aria-label='About page' id='main-content'>
        <PageHero description='I create precise, commercially useful 3D product visuals for brands that need to communicate clearly before, during, and after launch.' eyebrow='About' image={studioImage} imageAlt='Minimal studio product render' title='Visualizing products before they exist in the world.' />

        <section className='bg-white py-20 sm:py-24 lg:py-32'>
          <div className='mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-[clamp(2.5rem,4vw,4.75rem)]'>
            <TextMediaSplit image={lifestyleImage} imageAlt='Art-directed lifestyle product scene'>
              <SectionHeader description='The work sits between technical understanding and visual storytelling. Every image has to feel believable, but it also has to explain, persuade, and fit the place where it will be used.' eyebrow='Perspective' title='Realism with a job to do.' />
              <p className='mt-8 max-w-xl text-base leading-8 text-black/60'>I work across modeling, rendering, animation, and art direction so product assets remain consistent from a single launch image to a larger campaign system.</p>
            </TextMediaSplit>
          </div>
        </section>

        <section className='bg-neutral-50 py-20 sm:py-24 lg:py-28'>
          <div className='mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-[clamp(2.5rem,4vw,4.75rem)]'>
            <SectionHeader eyebrow='Capabilities' title='A focused visual toolkit.' />
            <ul className='mt-12 border-t border-black/15'>{capabilities.map((capability) => <li className='border-b border-black/15 py-5 text-2xl font-semibold tracking-[-0.035em] text-black sm:text-3xl' key={capability}>{capability}</li>)}</ul>
          </div>
        </section>

        <section className='bg-white py-20 sm:py-24 lg:py-28'>
          <div className='mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-[clamp(2.5rem,4vw,4.75rem)]'>
            <SectionHeader description='Clear checkpoints keep feedback organized and protect the final quality.' eyebrow='How projects move' title='A practical four-stage process.' />
            <div className='mt-12'><ProcessSteps steps={process} /></div>
          </div>
        </section>

        <section className='bg-black py-20 text-white sm:py-24 lg:py-28'>
          <div className='mx-auto grid w-full max-w-[1600px] gap-10 px-4 sm:px-6 lg:grid-cols-3 lg:px-[clamp(2.5rem,4vw,4.75rem)]'>
            {[
              ['Detail with purpose', 'Precision matters most when it improves understanding, credibility, and use.'],
              ['Clear collaboration', 'Feedback is structured around real decisions instead of vague rounds of aesthetic panic.'],
              ['Visuals built for use', 'Every output is planned around the platform, audience, and next step.'],
            ].map(([title, copy], index) => <article className='border-t border-white/25 pt-6' key={title}><p className='text-xs uppercase tracking-[0.16em] text-white/40'>0{index + 1}</p><h2 className='mt-12 text-3xl font-semibold tracking-[-0.04em]'>{title}</h2><p className='mt-4 text-base leading-7 text-white/60'>{copy}</p></article>)}
          </div>
        </section>

        <ContactCta description='Explore the portfolio or share the product, timeline, and visual challenge you are working through.' title='Have a product in mind?' />
      </main>
    </SiteLayout>
  )
}

export default About
