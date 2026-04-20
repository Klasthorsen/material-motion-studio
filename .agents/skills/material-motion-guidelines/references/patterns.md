# Transition Patterns

## Statistics Screens

### KPI card to detail screen

- Pattern: `container transform`
- Use when a summary card opens a richer analytical view.
- Keep the originating card visible as the starting surface.
- Animate bounds, corner radius, and elevation together.
- Recommended timing: `300-375 ms`

### Tab or segment switch

- Pattern: `shared axis x`
- Use when changing between sibling views such as `Overview`, `Breakdown`, and `Compare`.
- Move content horizontally with a small fade.
- Recommended timing: `250-300 ms`

### Drill-down into a deeper level

- Pattern: `shared axis z`
- Use when the user enters a more specific level of the information hierarchy.
- Combine scale and fade, not a large slide.
- Recommended timing: `250-300 ms`

### Filter or date range swap

- Pattern: `fade through`
- Use when content changes but the new content does not feel like the same physical surface.
- Keep the shell stable and change only the data region.
- Recommended timing: `195-225 ms`

### Tooltip, legend, menu, or inline status

- Pattern: `fade`
- Use for lightweight entrance and exit inside one screen.
- Pair with a subtle elevation or scale shift if needed.
- Recommended timing: `150-200 ms`

## Motion Budget

- Default to one prominent transition per screen change.
- Use stagger only for secondary items and keep offsets small, around `20-40 ms`.
- Avoid long sequences in dashboards because metrics need to stay scannable.
