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

Testimonials:
- take a look at design at `_notes/sequential/14-testimonials`
- they should auto scroll with 3s. but when hovered over card, it freezes.

let me know when testimonails is added as next section.

---

Book Now Strip
- add a book now card strip
- approx 20-50vh (let's call it 30)
- pure black. square corners. containerd with arrow on right and text on left (with button)
- it should have a very big arrow on right (diagonal to top right). but from icon. like a preview icon is beset (as maybe it is in a square also)
- on left, a heading and text. witha button also
- user may either click button or the big arrow
- that takes them to book page

---

FAQs:
- Add FAQ accordions next
- on big screens, 2 columns
- on tablet and mobile, single column
- nice and smooth they should be
- and matching website's elements

let me know when done.

---

Favicon and title:
- Add "A." favicon (same font as in header Ayesha J.)
- title should also be "Ayesha J. | Home" -- updating as user visits other pages also
- on click on header, show each page. but for now, add them all as blank (we shall add contents later)

---