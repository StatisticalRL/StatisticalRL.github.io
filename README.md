# StatRL presentation website

This is a static, single-page presentation for the [StatRL Python library](https://github.com/StatisticalRL/statrl). It is separate from the experimental web playground and does not run Python in the browser.

Open `index.html` directly, or serve this directory with any static host. For a local HTTP preview, run `python3 -m http.server 8000`, then open `http://localhost:8000`. No build tools, dependencies, or backend are needed.

- `index.html`: site content, catalogue records, and links.
- `style.css`: responsive layout, typography, and theme tokens.
- `script.js`: mobile menu, catalogue filters, and copy controls. Content is available without scripting.
- `assets/`: local Open Sans font and original benchmark figures; accompanying licenses are included.

The design takes its visual cues from [Lean Machine Learning](https://leanmachinelearning.org/). Project details come from the [StatRL repository](https://github.com/StatisticalRL/statrl) and its [documentation](https://statisticalrl.github.io/statrl/). The two regret figures are from the [repository’s screenshot directory](https://github.com/StatisticalRL/statrl/tree/main/screenshots).
