# Discovery Report: VR Project Experience

## Architecture Snapshot

- **Core Pages**:
  - `projects.html`: Listing page. Uses Client-side rendering via `scripts/main.js` and `scripts/data.js`.
  - `project-detail.html`: Detail page. URL-based routing (`?id=x`).
- **Data Source**: `scripts/data.js` (global `projectData` array).
- **Styling**: `styles/anthropic.css` (primary), `styles/magazine-premium.css` (possibly unused or secondary).
- **Libraries**:
  - GSAP + ScrollTrigger (Animations)
  - Swiper.js (Sliders)
  - Font Awesome (Icons)
  - Three.js (Hero Background)
  - AOS (Scroll Animations - possibly redundant with GSAP)

## Existing Patterns

- **Bento Grid**: Implemented in `projects.html` using CSS Grid and JS logic (`index % 5 === 0` for wide cards).
- **Filtering**: Client-side filtering in `projects.html` (Search, Type, Location, Status).
- **VR/3D**: Placeholder logic in `project-detail.html` (`window.loadVrTour`), expecting an iframe URL.
- **Glassmorphism**: `.glass-morphism` class used extensively.

## Technical Constraints

- **No Backend**: This is a static site. All data is in JS files.
- **Browser Support**: Modern browsers (ES6+).
- **Performance**: Heavy use of animations (GSAP, Three.js). Need to ensure performance doesn't degrade with more complex layouts.

## External References

- **Matterport**: implied provider for VR tours.
- **Bento Grids**: Apple promotional pages, modern SaaS landing pages.
