# axis-hub

Nuxt web hub for the Axis arcade machine community (game submissions, leaderboards),
deployed on Netlify. See `../CLAUDE.md` for the ecosystem.

## Run

`npm install`, `npm run dev`, `npm run generate` for the static build.

## Documentation page

`content/documentation.md` is a copy of the axis-api README, **do not edit it here**:
edit `../axis-api/README.md` and push. `scripts/fetch-documentation.js` runs before
`dev`, `build` and `generate` (npm `pre*` hooks) and overwrites the file with the README
from GitHub (`main`, or `AXIS_API_README_REF`). If GitHub can't be reached it keeps the
committed copy and only warns; `SKIP_DOCUMENTATION_FETCH=1` skips the fetch (e.g. to
preview local README edits copied by hand). Commit the refreshed file when it changes so
the fallback stays recent. The page (`utils/parseDocumentation.js`) builds its sidebar
from the README's "Table of contents" section and `##` headings.

## Design notes

- Shares the Axis identity with `../axis-launcher-front` (Darker Grotesque, black/white) and adds the accent palette in `assets/styles/resources/_variables.scss`: green `#7fef08`, purple `#952DFF`, blue `#4285F4`, red `#FF3E3E`, yellow `#FFD600`, greys `#6D6E70` / `#ACACAC`, text `#1F1F1F`.
- Fonts are self-hosted "edited" Darker Grotesque files in `static/fonts/` for better vertical alignment, mapped Regular→500, Medium→600, SemiBold→700, Bold→800. This differs from the front's Google mapping (700 = Bold), so copy weights deliberately when reusing.
- Base font-size differs from the front (`0.55vw` at the medium breakpoint, 1440 reference for `rem()`), so do not copy `rem()` values between the two repos without converting.
