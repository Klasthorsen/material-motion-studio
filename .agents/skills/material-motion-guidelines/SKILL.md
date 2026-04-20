---
name: material-motion-guidelines
description: Use this skill when designing or reviewing motion for Figma flows, especially dashboards, statistics screens, drill-downs, tab switches, filter changes, overlays, and component transitions that should follow Material motion. It helps turn static Figma frames into a consistent motion system with transition patterns, timing rules, Figma prototyping guidance, and reusable decision rules.
---

# Material Motion Guidelines

## Overview

Use this skill to translate Material motion principles into a repeatable Figma workflow. It is optimized for teams that want one shared source of truth for motion patterns, component behavior, and review criteria, and it pairs with the local Motion Studio app for multi-project libraries.

## Quick Start

1. Identify the transition type: drill-down, peer-to-peer navigation, content swap, overlay, or micro-interaction.
2. Map the transition to a Material pattern.
3. Apply a preset duration, easing, and movement distance.
4. Prototype in Figma with shared layer names and `Smart Animate`.
5. Register the component in Motion Studio and let the app recommend a Material transition family.
6. Review whether the motion explains the UI change in under 400 ms.

## Pattern Decision Tree

- If one surface becomes another surface, use `container transform`.
- If the user moves between sibling views, use `shared axis x`.
- If the user goes deeper into or back out of hierarchy, use `shared axis z`.
- If content swaps without strong spatial continuity, use `fade through`.
- If an element simply appears or disappears inside the current screen, use `fade`.
- If the change is tiny and frequent, prefer a micro-interaction over a screen transition.

## Recommended Tokens

- `micro`: `150-200 ms`
- `enter`: `225 ms`
- `exit`: `195 ms`
- `screen`: `300 ms`
- `large screen/detail`: `375 ms`
- `standard easing`: `cubic-bezier(0.4, 0, 0.2, 1)`
- `enter easing`: `cubic-bezier(0, 0, 0.2, 1)`
- `exit easing`: `cubic-bezier(0.4, 0, 1, 1)`

## Figma Workflow

1. Keep matching layers named identically across frames.
2. Split motion into one main focal transition and at most one supporting motion.
3. Animate container bounds before or together with content, not after.
4. Keep chart axes, page chrome, and persistent navigation stable during data updates.
5. When changing datasets, preserve continuity for bars, lines, and legends where possible.
6. Use separate frames for `idle`, `pressed`, `transitioning`, and `arrived` states only when needed; do not over-model.
7. For the studio app, paste a small JSON object with `name`, `figmaUrl`, `componentType`, `relationship`, `prominence`, and `motionRole`.

## Review Rules

- Motion should explain hierarchy, not decorate it.
- One transition should have one focal point.
- Avoid changing position, scale, opacity, and color aggressively at the same time.
- Favor continuity for data visuals and continuity for shells.
- For dense dashboard screens, use `standard` motion more often than `expressive`.
- Respect reduced-motion needs by keeping a simplified fallback path available.

## References

- Read [patterns.md](references/patterns.md) for transition mapping and statistics-screen examples.
- Read [figma-workflow.md](references/figma-workflow.md) when building or reviewing a reusable motion library in Figma.
