# Fetch Frontend Take-Home Exercise

This is a take home exercise for Fetch Rewards for the position of Frontend Engineer at Fetch.

I decided to really focus on building a simple but reusable set of components as well as making everything as
accessible as possible- both objectives that I aim to achieve when working on the frontend.

## Getting Started

After cloning into the repo, install packages, then start the server.

`npm run intall`
`npm run dev`

## Project Details

I decided to go with Next.js as it is a framework I'm very familiar with from my work on GOMdrop. In addition to this,
I used a variety of libraries to help me build out my components. In particular I used
Downshift and React-Menu, both headless UI libraries that provide helpful implementations
of WAI-ARIA patterns.

The project structure is a straightforward Next.js single page app. Some little things I added
were separate folders for components, hooks, and contexts, as well as a folder `rest` for
the actual API calls.

## Addressing Concerns and Questions

### Handling the cookie in a smoother fashion

Because the session token in the form of the cookie is coming from a different domain, I was
not able to easily access it on either the client or server side. Keeping in mind this is
meant as a relatively simple take-home exercise, I decided to set my own cookie to keep
track of whether a session token exists. This presents us with some problems, mainly the fact
that the two cookies won't be in perfect sync.

### Reusability of components

There are some components I made that are still to specific to this project such as the Dog Card
component. I would have liked to generalize these components even more so. I was planning
to use Storybook to ensure the components stood on their own, but I ended up spending
more time setting that up than necessary, so I decided to be practical and move on.

### Fetching data in React

Currently, I am fetching data using an async function inside useEffect. Again, this was a
choice based on familiarity, however, I do know there are better ways to fetch data in React now
and I would have liked to include that here.

## Future Recommendations

Were I to expand on this project, I would like to build out a little map feature for the location
search so that the search radius can be visualized for the user. Doing so would allow me
to learn how to build a new kind of component as well as learn more about the accessibility of such
web elements.
