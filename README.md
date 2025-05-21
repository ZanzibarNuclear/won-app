# World of Nuclear - SPA for Browsers

We are doing our part to influence world-wide adoption of nuclear energy. This platform is being built with that purpose in mind.

## Featuring...

This is the primary interface for members (and future members) of the World of Nuclear. This provides access to key features, such as:

- Flux -- an area for open discourse and sharing ideas
- Lessons -- topics directly about or related to nuclear energy, presented for beginners
- News and Views -- a blog about what's happening in the world of nuclear energy

We are also working on a story-based adventure experience, with twists and turns, choices to make, and simulations to run...coming soon.

## Lay of the Land

Here are the parts that make this work:

- This is a Web client for browsers. It's a dynamic, single-page app (SPA).
  - We have thought about building a mobile client (for iPad or Andriod). That kind of doubles (or triples) the work, so not yet...
- Behind the clients is the World of Nuclear (WoN) Service, accessed through its API.
  - The WoN Service is backed by a relational database (Postgres).
- There's a CDN running to serve images and other static files (fonts, etc.) as needed.

That's all for now.
