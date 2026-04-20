# Material Motion Workspace

This repo is a starting point for a shared Material motion system around Figma and analytics-style interfaces.

## Motion Rule

All motion analysis, recommendations, and default suggestions in the studio must always be based on Google Material Motion 3 patterns.

## What is included

- `/.agents/skills/material-motion-guidelines/`
  A repo-local skill for turning Figma flows into reusable Material motion decisions.
- `/plugins/material-motion-studio/`
  A local plugin scaffold for Codex with metadata and an app entry.
- `/studio/`
  A dependency-free browser studio for tuning motion parameters, storing components per project, and generating reusable motion briefs.
- `/index.html`
  The deploy entrypoint used by GitHub/Vercel, loading the studio app from the repo root.

## Intended workflow

1. Review a component or flow from Figma.
2. Paste a lightweight component JSON into the studio or register the component manually.
3. Let the studio recommend a Material pattern based on relationship, hierarchy, and motion role.
4. Tune the behavior in `studio/index.html`.
5. Bring the approved values back into Figma as documented tokens and component examples.

## Figma import format

The studio accepts a simple JSON object:

```json
{
  "name": "Revenue card",
  "figmaUrl": "https://www.figma.com/design/FILE/...",
  "componentType": "metric-card",
  "relationship": "container",
  "prominence": "standard",
  "motionRole": "spatial"
}
```

## First ideas for next iteration

- Connect Figma MCP workflows so selected nodes can be turned into motion briefs.
- Save approved specs as JSON files per component family.
- Add a true component inventory page so the studio becomes more Storybook-like over time.

## Deployment

- GitHub repo: push this folder as its own repository root.
- Vercel: import the GitHub repo and deploy as a static site.
- The deployed app entrypoint is the root [index.html](/Users/klasthorsen/Codex%20projects/Material%20motion/index.html).
