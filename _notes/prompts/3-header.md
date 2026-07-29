Pre-req:
- there is a project at ./project/
- it is reactjs with framer motion and gsap libs installed (for good animations)
- We are developing according to skill `frontend-dev` (at `.agents/skills/frontend-dev`)

Current Task:
- I'm referring a sample design (which is a good design)
- but it does not follows our structure
- add it to current project according to our structure.
- sample is at `_notes/sequential/8-header`
- it is header
- add it to project.

let me know when done.

---

one impornt problem:
- in `_notes/sequential/8-header`, the header becomes small on scroll
- but in our (at `project/`) it is not behaving the same. it remains the same size
- this is not good
- change this.

Ok in our site, we are using round pill like corners
- the header forms a corner
- but book now button is differnt. that's bad
- also kind of button should become a pill with #000 having a 10% opacity. so that it looks like a slightly dark semi-transparent pill
- i hope you got the idea.

lmk when done.

---

hay man:
- when scrolled, the header is still not reducing its width
- cannot u just check `_notes/sequential/8-header` properly ? because it does

update and let me know so that i can check.

also:
- i want you to install a good icon library (maybe material icon or something else)
- and add a proper book now icon instead of that dumb arrow

start now.

---

For header, it should be respnosive:
- hamburger with full screne manu on mobile
- check for all devices also

let me know when done.


---

hay man !! u look at that round borders. they are like too round when it is on mobile (content overflow sand they are too big). yes we had pill like radius . but when hamburger opens, it should be pixel (fixed). instead of that much big. man !! fix that. l mk when done.

---

good. but still it has a transition in start. disable that on hamburger open. but it should exist for lock (that we have on scroll trigger). lmk when done

---

Time for hero section:
- in `_notes/sequential/9-hero`, there is hero section
- forget the header in this one, we already have that
- now we just need the hero from it

make sure it is responsive. on mboeil and desktop.
and add it to project according to our skill `.agents/skills/frontend-dev`

---

pic problem:
- it should be circle with pic only in it
- currently pic is saperate and circle is saperate
- plus circle's bg is visible

on right, it should just be simple circle with bg image.
having cover with round and no overflows etc. proper structure.

---

Now we need to add `_notes/sequential/10-strip` as next strip (after 100vh hero)
- get strip only 
- but also add a 100vh temporary section afterwards so that i can test scroll
- they should scroll on x-axis (horizontally) when page scrolls y (vertically)
- but it is not hapenning
- u should fix that and use gsap properly here
- so that it works on scroll.

let me know when done.
and scroll problem fixed.

---

good. but speed is very fast. it is like 5x. make it 1x.

better. but still:
- font is big
- it should not have any y padding or spacing (up and down)

let me know when it is compact.

also it is a bit faster than scroll still. cannot we just make it match the scroll speed like exactly ? i guess gsap has that method.

lmk when done.

---

u even removed the padding that was in inner items. like i just wanted to remove external margin etc. now add some padding kindly. lmk when done. font size is very small now. if earlier was 2 and now it is 1, then it should be 1.8.

lmk when done.

---

should we add a "." between all logos.

---

great. i guess we do not need that placeholder section now. as everything is tested and looks great. 

just add next section that has some counts in cards.

you can refer to `_notes/sequential/11-highlight-cards` draft.
and create section according to our theme.

let me know when done.

---

why u made them blu like color. make pure black (the bg). lmk when done.

---

square corners instead of round.

---

for those logos:
- their y padding is less
- make them 1.5x to 2x more than what it is
- because there is less y padding atm.

---

those circles (between logos) are small. make them 2x.

---

Cards counts:
- counts in those cards are fixed
- they are 4+, 400+, etc.
- but add counter animation
- that starts with scroll trigger
- i.e., make the trigger and delay etc or something in a manner, so that it starts as user gest to that page
- and it takes some time so that user clearly notices that time starts counting.

---

Pre-req:
- there are images for services that i provide at `_notes/sequential/12-images`
- from project `_notes/sequential/7-visune-io-lovable-project`, learn about layout and structure of how section with heading "Go-to Resources" is designed
- i need next section as "Featured Work"
- each should have a nice smooth transition on hover etc as well
- i would like an on-hover little scale-up
- along with revealed arrow-lik small icon-button at top-right with "Open" or "Preview" icon. so that it opens up that project page (for now just take user to /)
- before hover, only show the title
- but after hover, it should show a black to transparent gradeitn transitioned and taking only a 50% of lower part of image (like a smooth) so that it also reveals the description
- before hover, it may only take 20% with title only

i hope you got the idea.

it should look great.
let me know when it is added.

---

a view all button at bottom right should take user to projects page (for now just add / link) and also this footer strip should have a lighter bg. instead of white. like a light cream. but on left add some text. and on right (at end) a button.

---

for pics, use contain instead of fill. and in contain, they should be on top (instead of center)

---

footer updates
- bg should be #0001 instead of that cream
- it should not be in container. it should take full width (outside of any container limitaions)
- text and button inside tha tfooter should be in container though
- on left, single line text only. instead of a heading and text. just simple short sentence.

---

that icon on top right should have a bit of shadow. cz rare but sometimes on white it should not be visible.
that shadow should not be much. or like  a big shadow. a small light shadow.

---

the section element sitll has padding that appies to footer also. i guess we do not need any x padding.

---

for those work cards, add a bit of y padding. for that grid of work only

---

For footer, i want you to show me a short plan in chat that includes:
- it should be around 40vh (not fixed just giving u the idea)
- it should be very minimal. but big font. i.e., directly email on right
- on left, few links. links to social medai also.
- so that it looks like a nice design
- for background it should be pure black. but as user hovers over it, it shows the grid (white) near pointer
- pointer it should like a opaque to transparent gradeint effect. so that grid is only visible where there is pointer. otherwise there is no such place
- instead of grids, use dots (like antigravity's website). it should have the grid of circles that becomes visisble on hover
- circles near pointer are big, far are small (we do not need gradient. actually the size will create the effect)
- it should have "difference" effect with white text in footer, so that text is white on black. but the place wher eit comes on top of that gradient circlcles, css's difference effect make it white at those places with sharp style

create a summary in chat. so that i can approve.

---

looks liek a great plan. completely implement it.

-

output too large. try different command.

---

one at `_notes/sequential/13-footer` looks better. i want that footer here.

on-hover:
- mail and links on hover should not turn dark
- instead make their bg pure black (so that it is above htose grid of circles).
- but with a 0.4s transition and then removed when mouse went away.

social media:
- add icons instead of text
- and add them above the email (insetad of left)
- on right, only email and those links

---

icons are small. make them 2x

---

replace behance with artstation

---

Next-up, we need to create a section to display "Services"
i.e., which services does Ayesha J. provides

Design:
- take a look at "Effect coverflow" from SwiperJS
- we need to use a full-width section with those cards
- the central card should be big (50vw). and others on sides (with effect)
- active card should show 50% gradient (like we had for those in work section)
- that shows heading and paragraph

Services:
1. 3D Modeling: creating a 3d geometry of product
2. Photorealistc Renders
3. Product/CGI Animations
4. Lifestyle Renders
5. 360 degree rotation animations
6. Exploded View
7. Amazon Studo Renders

each should play a video in repeat when comes. with muted.
for now, you can download any video from from web (using curl) and add same on all places.

no seek / pause controls. or volume. because it is a muted, looped video simply.

Usage:
- when user comes to slider, it is a 100vh
- it gets locked
- and all of those items scroll
- then it gets unlocked when ti scrolled to end
- specifiy a fixed scroll duration for each item
- and overall scroll size should be added by multiplation
- so that any element addeed in future works nicely (we do not have to change those params. they should be dynamic)

clicking right + left should work. also show pagination pills that are supported by SwiperJS.

create a short summary in chat.

---

no . u did not study properly on web. first do and then share plan in chat. no need for json commands now. just study web for this lib (SwiperJS) check their docs. learn how to make it and then share plan in chat.

---

looks like a great plan. compeltely implmeent it.

---

Changes:
- use white bg. no black bg for this section
- On left use heading "Services" and text "From precise modeling to campaign-ready CGI, each service is built to present products with clarity and impact" below it. do not add it on right
- the pagination is taking too much space, reduce that so that it may lower carousel (to fit text below heading)
- i hope it is resopnsive already.
- remove those carets. they do not look good.
- too many. use 4 services only. not much.

---

add a bit of space on top as it is near header.

---

title of each service should also be white. it is left black.

---

Testimonials:
- take a look at design at `_notes/sequential/14-testimonials`
- they should auto scroll with 3s. but when hovered over card, it freezes.

let me know when testimonails is added as next section.

---

Update for hero image:
- from "Featured Work" section, checkout "Product Visualization" card
- use that image. u can roate it 45deg with css

For services, u used a flower video in all.
use both from `_notes/sequential/15-videos` in alternate.

---

Testimonials update:
- instead of big head in center
- add heaidng on left with text (like services)
- and arrows (carets) are inside of cards. make sure they are outside with some spacing
- as they were in given example.

---

Hero image should be "cover" (not contain).

testimonial carets:
- they are different from one another
- they should not have different bgs. make identical. always

---

Book Now Strip
- add a book now card strip
- approx 20-50vh (let's call it 30)
- pure black. square corners. containerd with arrow on right and text on left (with button)
- it should have a very big arrow on right (diagonal to top right). but from icon. like a preview icon is beset (as maybe it is in a square also)
- on left, a heading and text. witha button also
- user may either click button or the big arrow
- that takes them to book page

this is one of important sections that we need to add.
after that we just need to add FAQ (later . not now).
let me know when book now is ready.

---

minor update for testimonials:
- they have navy blue in caret and pills that are active
- instead black. because we are using black and white hteme here.

FAQs:
- Add FAQ accordions next
- on big screens, 2 columns
- on tablet and mobile, single column
- nice and smooth they should be
- and matching website's elements

let me know when done.

---

why 1st is opened by default ? all should be closed by default. we do not need a full height section for this. make heading "FAQs" right aligned. no para. just accordions. 5 only.  this is not supposed to be a full 100vh section. 

---

Leave a message full 100vh form before fAQs.

---

After leave a message, add an on-scroll anim that draws a line from very left to very right using pen icon.
a better thing instead of a divider. line should be dashed.
matches the scroll speed. just like partners logos section (after hero)

---

make the pen with svg. like a "pen tool". and it should be drawing line. means it should be at very end of line. currently it only stays on left and just moves a bit.

---

line is also not good:
- because it is changing width instead of revealing
- its dashes length also changes. not good
- make it revealing or getting drawn etc.

---

pen shrinked on small screens. no that's bad. it should be fixed. hanvn't u saved and used as img properly ?

---

Favicon and title:
- Add "A." favicon (same font as in header Ayesha J.)
- title should also be "Ayesha J. | Home" -- updating as user visits other pages also
- on click on header, show each page. but for now, add them all as blank (we shall add contents later)

---

Other pages:
- create a plan to add all other pages
- according to theme and styles in current page
- create all pages. u may use some section but create most
- each service should also have its own page. similarly work.
- as well as links in hader and footer.

save complete plan as md at `_notes/plans/1-pages-and-sections.md`

---

i moved it to `_notes/plans/1-pages-and-sections.md`. cz u made at `project/_notes/plans/1-pages-and-sections.md` (wrong place).
now it is time to work in project.
looks like a great plan. compeltely implmeent it.

---

there is more gap between pagse and services columns in footer.
actually the email should not get in new line. so u may make it adjustible so that it auto fits in remaining spacee. upto limits (at max, just do not grow any further)

contact's heading is very big. that's not good.

last section in contact page, 2nd last in portfolio and 3rd last in services.
they have a design that looks very used and very AI. change that.
also for services and portfolio images, use contain instead of cover.

similarly on each work (case study) pages also.

make updates so that i can review again.

---

images with contain should have white bg.

---

just like hompage, other pages should also have nice animations and transitions.
create a plan at `_notes/plans/2-animations-and-transitions.md` to add them or update some sections accordingly.

let me know when plan is ready.

---

looks like a great plan. completely implment it.

---

short task: on services, a few images seem missing.

---

i mean for 01, ..., 04, there is space on side of service. but that's empty. add image there.

also i hope each page lazy laods. we do not need to make it heavy for user in browser. lazy load and clear other page.
then it re-laods again with a spinner in center.

make sure the header is not loading and footer also. only the central part. make router this way.

let me know when done.

---

also the explore service button on services page should be like Send Message in Leave us a message on homepage.

Add custom scrollbar matching theme.
and on bottom, add 2px pure black progressbar style scroll progress for each page.

---

create a plan at `_notes/plans/3-blog.md`
according to this plan, i should be able to add blog pages in markdown files in a folder
with each one's slug and deatils in its header.
so that i can just change md and re build / re-deploy.
but catches live in `npm run dev`.

let me know when blog plan is ready.

also add support for author pages (also mds).
create plan md now.


---

Add SEO preloads to all pages.
and footer artstation link is ayesha_jm.artstation.com

---

Add a nice loader.
when page loads it shows that preloader (full viewport).
and upto when website loads.

i would like this one with favicon ("A." text) in center

````txt
You are given a task to integrate an existing React component in the codebase

The codebase should support:
- shadcn project structure  
- Tailwind CSS
- Typescript

If it doesn't, provide instructions on how to setup project via shadcn CLI, install Tailwind or Typescript.

Determine the default path for components and styles. 
If default path for components is not /components/ui, provide instructions on why it's important to create this folder
Copy-paste this component to /components/ui folder:
```tsx
snow-ball-loading-spinner.tsx
export default function LoadingSpinner() {
  return (
    <div className="pl">
      <div className="pl__outer-ring"></div>
      <div className="pl__inner-ring"></div>
      <div className="pl__track-cover"></div>
      <div className="pl__ball">
        <div className="pl__ball-texture"></div>
        <div className="pl__ball-outer-shadow"></div>
        <div className="pl__ball-inner-shadow"></div>
        <div className="pl__ball-side-shadows"></div>
      </div>
    </div>
  );
}

demo.tsx
import LoadingSpinner from '../components/ui/snow-ball-loading-spinner';

export default function Default() {
  return <LoadingSpinner />;
}
```

Extend existing Tailwind 4 index.css with this code (or if project uses Tailwind 3, extend tailwind.config.js or globals.css):
```css
@import "tailwindcss";
@import "tw-animate-css";


@keyframes ball {
  from {
    transform: rotate(0) translateY(-6.5em);
  }
  50% {
    transform: rotate(180deg) translateY(-6em);
  }
  to {
    transform: rotate(360deg) translateY(-6.5em);
  }
}

@keyframes ballInnerShadow {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(-360deg);
  }
}

@keyframes ballOuterShadow {
  from {
    transform: rotate(20deg);
  }
  to {
    transform: rotate(-340deg);
  }
}

@keyframes ballTexture {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(50%);
  }
}

@keyframes trackCover {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
```

Implementation Guidelines
 1. Analyze the component structure and identify all required dependencies
 2. Review the component's argumens and state
 3. Identify any required context providers or hooks and install them
 4. Questions to Ask
 - What data/props will be passed to this component?
 - Are there any specific state management requirements?
 - Are there any required assets (images, icons, etc.)?
 - What is the expected responsive behavior?
 - What is the best place to use this component in the app?

Steps to integrate
 0. Copy paste all the code above in the correct directories
 1. Install external dependencies
 2. Fill image assets with Unsplash stock images you know exist
 3. Use lucide-react icons for svgs or logos if component requires them
````

---

text like "required fields are marked by browser" in Leave a message
or similar in other places of website should be removed. insetad add "*" and say "Required fields are marked *".

audit and update for such updates

---

In `docs/`, add compelte details of projects.
so that content editor can refer these docs to any llm. and ask it to create blog pages, update case study pages, update sections on pages, etc. and it updates them while keeping the integrity and style of those pages.

let me know when compelte docs are ready. u can create multi files in dirs.
start now.

---

