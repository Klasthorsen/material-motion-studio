const STORAGE_KEY = "material-motion-studio-hierarchy-v2";

const presets = {
  "container-transform": {
    label: "Container transform",
    duration: 320,
    easing: "cubic-bezier(0.05, 0.7, 0.1, 1)",
    distance: 0,
    scale: 0.92,
    opacity: 0.08,
    stagger: 20,
    guidance: [
      "Use when one surface becomes another.",
      "Best for cards opening richer detail.",
      "Strongest continuity pattern in Material Motion 3."
    ]
  },
  "shared-axis-x": {
    label: "Shared axis X",
    duration: 280,
    easing: "cubic-bezier(0.2, 0, 0, 1)",
    distance: 36,
    scale: 0.98,
    opacity: 0,
    stagger: 30,
    guidance: [
      "Use for sibling views.",
      "Best for tabs and side-by-side modes.",
      "Horizontal travel should stay modest."
    ]
  },
  "shared-axis-z": {
    label: "Shared axis Z",
    duration: 290,
    easing: "cubic-bezier(0.05, 0.7, 0.1, 1)",
    distance: 0,
    scale: 0.9,
    opacity: 0,
    stagger: 24,
    guidance: [
      "Use for drill-down and hierarchy.",
      "Scale and fade communicates depth.",
      "Strong fit for charts and detail views."
    ]
  },
  "fade-through": {
    label: "Fade through",
    duration: 210,
    easing: "cubic-bezier(0.2, 0, 0, 1)",
    distance: 0,
    scale: 0.96,
    opacity: 0,
    stagger: 35,
    guidance: [
      "Use for content replacement.",
      "Best for filter and period changes.",
      "Keeps shell stable while content swaps."
    ]
  },
  "fade": {
    label: "Fade",
    duration: 190,
    easing: "cubic-bezier(0.2, 0, 0, 1)",
    distance: 0,
    scale: 0.98,
    opacity: 0,
    stagger: 10,
    guidance: [
      "Use for lightweight overlay or appearance.",
      "Good for small focus shifts.",
      "Keep surrounding layout still."
    ]
  },
  "micro-interaction": {
    label: "Micro interaction",
    duration: 170,
    easing: "cubic-bezier(0.2, 0, 0, 1)",
    distance: 8,
    scale: 0.97,
    opacity: 0.3,
    stagger: 0,
    guidance: [
      "Use for hover, pressed, and selection.",
      "Keep it subtle and short.",
      "Treat it as utility motion, not scene transition."
    ]
  }
};

const easingProfiles = {
  "cubic-bezier(0.2, 0, 0, 1)": {
    label: "Standard",
    value: "cubic-bezier(0.2, 0, 0, 1)",
    use: "Use for most component motion, list movement, carousels, and recurring transitions."
  },
  "cubic-bezier(0.05, 0.7, 0.1, 1)": {
    label: "Emphasized",
    value: "cubic-bezier(0.05, 0.7, 0.1, 1)",
    use: "Use when a primary surface deserves stronger arrival and focus."
  },
  "cubic-bezier(0.3, 0, 0.8, 0.15)": {
    label: "Emphasized accelerate",
    value: "cubic-bezier(0.3, 0, 0.8, 0.15)",
    use: "Use when a surface leaves quickly, such as dismiss, swipe away, or exit."
  }
};

const els = {
  sidebar: document.getElementById("sidebar"),
  toggleSidebar: document.getElementById("toggleSidebar"),
  hierarchyList: document.getElementById("hierarchyList"),
  newScreen: document.getElementById("newScreen"),
  importJson: document.getElementById("importJson"),
  selectionKind: document.getElementById("selectionKind"),
  stageTitle: document.getElementById("stageTitle"),
  stageSubtitle: document.getElementById("stageSubtitle"),
  stageStatus: document.getElementById("stageStatus"),
  showScreen: document.getElementById("showScreen"),
  breakpointSwitcher: document.getElementById("breakpointSwitcher"),
  deviceStage: document.getElementById("deviceStage"),
  deviceLabel: document.getElementById("deviceLabel"),
  stageContent: document.getElementById("stageContent"),
  screenSection: document.getElementById("screenSection"),
  screenName: document.getElementById("screenName"),
  screenFigmaUrl: document.getElementById("screenFigmaUrl"),
  screenImage: document.getElementById("screenImage"),
  screenPrompt: document.getElementById("screenPrompt"),
  generateScreen: document.getElementById("generateScreen"),
  addChildComponent: document.getElementById("addChildComponent"),
  focusScreen: document.getElementById("focusScreen"),
  screenAnalysisSection: document.getElementById("screenAnalysisSection"),
  screenAnalysisCopy: document.getElementById("screenAnalysisCopy"),
  screenAnalysisList: document.getElementById("screenAnalysisList"),
  focusFirstComponent: document.getElementById("focusFirstComponent"),
  componentSection: document.getElementById("componentSection"),
  componentName: document.getElementById("componentName"),
  componentType: document.getElementById("componentType"),
  componentPrompt: document.getElementById("componentPrompt"),
  componentInteraction: document.getElementById("componentInteraction"),
  playComponent: document.getElementById("playComponent"),
  analysisSection: document.getElementById("analysisSection"),
  analysisList: document.getElementById("analysisList"),
  reanalyzeMotion: document.getElementById("reanalyzeMotion"),
  motionSection: document.getElementById("motionSection"),
  preset: document.getElementById("preset"),
  duration: document.getElementById("duration"),
  easing: document.getElementById("easing"),
  distance: document.getElementById("distance"),
  scale: document.getElementById("scale"),
  opacity: document.getElementById("opacity"),
  stagger: document.getElementById("stagger"),
  durationValue: document.getElementById("durationValue"),
  distanceValue: document.getElementById("distanceValue"),
  scaleValue: document.getElementById("scaleValue"),
  opacityValue: document.getElementById("opacityValue"),
  staggerValue: document.getElementById("staggerValue"),
  guidanceList: document.getElementById("guidanceList"),
  recommendMotion: document.getElementById("recommendMotion"),
  saveComponent: document.getElementById("saveComponent"),
  duplicateComponent: document.getElementById("duplicateComponent"),
  deleteComponent: document.getElementById("deleteComponent")
  ,
  modeTabs: document.getElementById("modeTabs"),
  rationaleSection: document.getElementById("rationaleSection"),
  handoffSection: document.getElementById("handoffSection"),
  componentStatus: document.getElementById("componentStatus"),
  componentPlatform: document.getElementById("componentPlatform"),
  reducedMotion: document.getElementById("reducedMotion"),
  engineeringNotes: document.getElementById("engineeringNotes"),
  handoffReadable: document.getElementById("handoffReadable"),
  handoffJson: document.getElementById("handoffJson"),
  approveComponent: document.getElementById("approveComponent")
};

const state = loadState();

function defaultState() {
  const screen = createScreen({ name: "New screen 1" });
  return {
    sidebarCollapsed: false,
    mode: "analyze",
    breakpoint: "mobile",
    selected: {
      kind: "screen",
      screenId: screen.id,
      componentId: null
    },
    screens: [screen]
  };
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : defaultState();
  } catch {
    return defaultState();
  }
}

function persistState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function slugify(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function createScreen(partial = {}) {
  const name = partial.name || `New screen ${Date.now().toString(36)}`;
  return {
    id: `${slugify(name)}-${Date.now().toString(36)}`,
    name,
    figmaUrl: partial.figmaUrl || "",
    sourceImageData: partial.sourceImageData || "",
    prompt: partial.prompt || "",
    analysisSummary: partial.analysisSummary || "",
    analysisOverview: partial.analysisOverview || "",
    analysisNotes: partial.analysisNotes || [],
    generated: false,
    components: partial.components || []
  };
}

function snapshotPreset(presetKey) {
  const preset = presets[presetKey];
  return {
    duration: preset.duration,
    easing: preset.easing,
    distance: preset.distance,
    scale: preset.scale,
    opacity: preset.opacity,
    stagger: preset.stagger
  };
}

function createComponent(partial = {}) {
  const prompt = partial.prompt || "";
  const type = partial.type || "metric-card";
  const presetKey = partial.preset || recommendPreset({ type, prompt });
  return {
    id: `${slugify(partial.name || type)}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 5)}`,
    name: partial.name || "New component",
    type,
    prompt,
    interaction: partial.interaction || "enter",
    frame: partial.frame || null,
    preset: presetKey,
    analysis: buildMotionAnalysis({ type, prompt }),
    motion: snapshotPreset(presetKey)
    ,
    status: partial.status || "unreviewed",
    platform: partial.platform || "web",
    reducedMotion: partial.reducedMotion || "Reduce scale and travel. Keep opacity changes subtle and preserve hierarchy without large transforms.",
    engineeringNotes: partial.engineeringNotes || ""
  };
}

function setMode(mode) {
  state.mode = mode;
  persistState();
  syncUI();
}

function statusLabel(status) {
  return {
    unreviewed: "Unreviewed",
    reviewed: "Reviewed",
    approved: "Approved"
  }[status] || "Unreviewed";
}

function screenWorkflowStatus(screen) {
  if (!screen.generated || !screen.components.length) return "Structure";
  const statuses = screen.components.map((component) => component.status || "unreviewed");
  if (statuses.every((status) => status === "approved")) return "Ready";
  if (statuses.some((status) => status === "reviewed" || status === "approved")) return "In progress";
  return "Analyzed";
}

function inferComponentFrames(components) {
  const mobileFrames = {
    "metric-card": { x: 6, y: 8, w: 88, h: 18 },
    "chart-panel": { x: 6, y: 30, w: 88, h: 30 },
    "filter-group": { x: 6, y: 66, w: 88, h: 12 },
    "tab-panel": { x: 6, y: 14, w: 88, h: 14 },
    "list-row": { x: 6, y: 48, w: 88, h: 28 },
    "dialog-sheet": { x: 10, y: 54, w: 80, h: 26 }
  };

  const fallbackY = [8, 28, 50, 70];

  return components.map((component, index) => ({
    ...component,
    frame: component.frame || mobileFrames[component.type] || {
      x: 8,
      y: fallbackY[index] || Math.min(76, 8 + index * 18),
      w: 84,
      h: 16
    }
  }));
}

function currentScreen() {
  return state.screens.find((screen) => screen.id === state.selected.screenId) || state.screens[0];
}

function currentComponent() {
  if (state.selected.kind !== "component") return null;
  const screen = currentScreen();
  return screen?.components.find((component) => component.id === state.selected.componentId) || null;
}

function selectScreen(screenId) {
  state.selected = { kind: "screen", screenId, componentId: null };
  persistState();
  syncUI();
}

function selectComponent(screenId, componentId) {
  state.selected = { kind: "component", screenId, componentId };
  persistState();
  syncUI();
}

function recommendPreset(component) {
  return buildMotionAnalysis(component)[0].preset;
}

function buildMotionAnalysis(component) {
  const prompt = `${component.prompt || ""} ${component.type || ""}`.toLowerCase();
  const suggestions = [];

  if (component.type === "metric-card") {
    suggestions.push({
      preset: "container-transform",
      title: "Container transform",
      reason: "Google Material Motion 3 recommends container transform when one surface becomes another, which fits a KPI card expanding into detail.",
      strength: 95
    });
    suggestions.push({
      preset: "shared-axis-z",
      title: "Shared axis Z",
      reason: "Use shared axis Z when the KPI leads deeper into hierarchy rather than morphing directly into a new surface.",
      strength: 76
    });
  }

  if (component.type === "chart-panel") {
    suggestions.push({
      preset: "shared-axis-z",
      title: "Shared axis Z",
      reason: "Google Material Motion 3 uses shared axis Z for drill-in and hierarchy changes, which matches charts moving into focused analysis.",
      strength: 92
    });
    suggestions.push({
      preset: "container-transform",
      title: "Container transform",
      reason: "Choose container transform when the chart itself morphs into the destination surface instead of just navigating deeper.",
      strength: 78
    });
  }

  if (component.type === "tab-panel") {
    suggestions.push({
      preset: "shared-axis-x",
      title: "Shared axis X",
      reason: "Google Material Motion 3 shared axis X is built for sibling views, which is the clearest fit for tab transitions.",
      strength: 94
    });
    suggestions.push({
      preset: "fade-through",
      title: "Fade through",
      reason: "Fade through is a fallback when the content behaves more like replacement than spatial tab movement.",
      strength: 63
    });
  }

  if (component.type === "filter-group") {
    suggestions.push({
      preset: "fade-through",
      title: "Fade through",
      reason: "Google Material Motion 3 uses fade through for replacing outgoing content with incoming content when spatial continuity is weak, which fits filter swaps.",
      strength: 96
    });
    suggestions.push({
      preset: "fade",
      title: "Fade",
      reason: "Fade can support smaller state changes, but fade through is the stronger Material 3 default for content replacement.",
      strength: 57
    });
  }

  if (component.type === "list-row") {
    suggestions.push({
      preset: "container-transform",
      title: "Container transform",
      reason: "If the row opens into detail, container transform gives the strongest continuity between list and destination.",
      strength: 82
    });
    suggestions.push({
      preset: "fade",
      title: "Fade",
      reason: "Fade works when the row only appears or dismisses within the same screen.",
      strength: 58
    });
  }

  if (component.type === "dialog-sheet") {
    suggestions.push({
      preset: "fade",
      title: "Fade",
      reason: "Google Material Motion 3 fade suits lightweight overlays and focused surfaces entering the current screen.",
      strength: 84
    });
    suggestions.push({
      preset: "micro-interaction",
      title: "Micro interaction",
      reason: "Use a shorter interaction only if the sheet behaves more like a quick inline state.",
      strength: 49
    });
  }

  if (prompt.includes("hover") || prompt.includes("pressed") || prompt.includes("mouse over")) {
    suggestions.unshift({
      preset: "micro-interaction",
      title: "Micro interaction",
      reason: "Your description points to a recurring utility state, which Google Material Motion 3 treats as micro interaction rather than a scene transition.",
      strength: 97
    });
  }

  if (prompt.includes("loading") || prompt.includes("replace") || prompt.includes("swap")) {
    suggestions.unshift({
      preset: "fade-through",
      title: "Fade through",
      reason: "Your description points to replacement or loading content, which aligns with Google Material Motion 3 fade through.",
      strength: 95
    });
  }

  if (prompt.includes("tab") || prompt.includes("sibling")) {
    suggestions.unshift({
      preset: "shared-axis-x",
      title: "Shared axis X",
      reason: "Your description suggests sibling navigation, which is the canonical Material Motion 3 use case for shared axis X.",
      strength: 95
    });
  }

  if (prompt.includes("drill") || prompt.includes("detail") || prompt.includes("deeper")) {
    suggestions.unshift({
      preset: "shared-axis-z",
      title: "Shared axis Z",
      reason: "Your description suggests deeper hierarchy, which aligns with Google Material Motion 3 shared axis Z.",
      strength: 96
    });
  }

  if (prompt.includes("grow") || prompt.includes("expand") || prompt.includes("becomes")) {
    suggestions.unshift({
      preset: "container-transform",
      title: "Container transform",
      reason: "Your description says one surface becomes another, which is the primary Material Motion 3 container transform case.",
      strength: 98
    });
  }

  if (!suggestions.length) {
    suggestions.push({
      preset: "container-transform",
      title: "Container transform",
      reason: "Default to the strongest Material Motion 3 continuity pattern when the component likely opens into richer detail.",
      strength: 70
    });
  }

  const deduped = [];
  const seen = new Set();
  suggestions
    .sort((a, b) => b.strength - a.strength)
    .forEach((item) => {
      if (!seen.has(item.preset)) {
        seen.add(item.preset);
        deduped.push(item);
      }
    });

  return deduped.slice(0, 3);
}

function inferComponentsForScreen(screen) {
  const text = `${screen.name} ${screen.prompt}`.toLowerCase();
  const blueprints = [];

  const pushUnique = (name, type, prompt, interaction = "enter") => {
    if (!blueprints.some((item) => item.name === name)) {
      blueprints.push({ name, type, prompt, interaction });
    }
  };

  if (text.includes("hero") || text.includes("banner") || text.includes("featured")) {
    pushUnique("Hero card", "metric-card", "Primary focal surface with a strong entrance that can expand into richer detail.");
  }

  if (text.includes("kpi") || text.includes("summary") || text.includes("stat")) {
    pushUnique("Summary KPI", "metric-card", "A summary card that becomes a detailed panel.");
  }

  if (text.includes("chart") || text.includes("graph") || text.includes("trend")) {
    pushUnique("Trend chart", "chart-panel", "A chart that can drill into deeper detail.");
  }

  if (text.includes("carousel") || text.includes("rail") || text.includes("thumbnails") || text.includes("trending")) {
    pushUnique("Content carousel", "tab-panel", "Swipe or move between sibling items with clear spatial continuity.");
  }

  if (text.includes("sport") || text.includes("upcoming games")) {
    pushUnique("Sports rail", "tab-panel", "A sibling carousel for upcoming events with directional continuity.");
  }

  if (text.includes("filter") || text.includes("segment") || text.includes("date range")) {
    pushUnique("Period filters", "filter-group", "Change the visible dataset between date ranges.");
  }

  if (text.includes("table") || text.includes("list") || text.includes("themes") || text.includes("menu")) {
    pushUnique("List items", "list-row", "Rows that can enter softly and open into detail.");
  }

  if (text.includes("tab") || text.includes("bottom nav") || text.includes("navigation")) {
    pushUnique("Bottom navigation", "tab-panel", "Switch between sibling views with clear spatial continuity and a strong indicator.");
  }

  if (text.includes("dialog") || text.includes("modal") || text.includes("sheet")) {
    pushUnique("Overlay sheet", "dialog-sheet", "A focused overlay surface entering above the current screen.");
  }

  if (text.includes("button") || text.includes("cta")) {
    pushUnique("Primary CTA", "metric-card", "A focal interactive surface with emphasis on hover or pressed feedback.", "hover");
  }

  const explicitlySingle = [
    "single component",
    "one component",
    "single card",
    "one card",
    "single button",
    "modal",
    "dialog",
    "sheet"
  ].some((keyword) => text.includes(keyword));

  if (explicitlySingle && blueprints.length) {
    return [createComponent(blueprints[0])];
  }

  if (!blueprints.length) {
    blueprints.push(
      { name: "Summary KPI", type: "metric-card", prompt: "A summary card that becomes a detailed panel." },
      { name: "Trend chart", type: "chart-panel", prompt: "A chart that can drill into deeper detail." },
      { name: "Period filters", type: "filter-group", prompt: "Change the visible dataset between date ranges." }
    );
  }

  return blueprints.map((item) => createComponent(item));
}

function buildScreenAnalysis(screen) {
  const text = `${screen.name} ${screen.prompt} ${screen.figmaUrl}`.toLowerCase();
  const notes = [];
  const patterns = new Set(screen.components.map((component) => screenPrimarySuggestion(component).title));
  const states = new Set(screen.components.map((component) => component.interaction));
  const componentScope = screen.components.length <= 1 ? "single component" : "multiple components";

  if (screen.sourceImageData) {
    notes.push("A source image is loaded, so the stage can show the screen visually while you place motion on its components.");
  } else if (screen.figmaUrl) {
    notes.push("A Figma link is linked, but the studio cannot render the Figma frame visually here without an uploaded image.");
  }

  if (text.includes("hover") || text.includes("mouse over")) {
    notes.push("The screen description mentions hover behavior, so micro-interactions should be reviewed on interactive surfaces.");
  }

  if (text.includes("loading") || text.includes("skeleton")) {
    notes.push("The screen description mentions loading, so fade through or subtle placeholder transitions should be prioritized.");
  }

  if (text.includes("scroll")) {
    notes.push("The screen description mentions scroll, so persistent shells should stay stable while list or chart content moves.");
  }

  if (!notes.length) {
    notes.push("The current component suggestions are based on the screen name and prompt, then mapped to Google Material Motion 3 patterns.");
  }

  if (screen.components.length) {
    notes.push(`Primary motion families on this screen: ${Array.from(patterns).join(", ")}.`);
    notes.push(`This analysis identifies ${componentScope} on the current screen.`);
  }

  return {
    summary: screen.components.length <= 1
      ? "This source currently reads as a single component. The analysis below recommends the most suitable Material Motion 3 behavior for that component."
      : `${screen.components.length} components suggested from the current source and prompt. Start with the first focal surface, then choreograph supporting components with shorter staggered motion.`,
    overview: buildScreenOverview({
      screen,
      patterns: Array.from(patterns),
      states: Array.from(states),
      componentScope
    }),
    notes
  };
}

function buildScreenOverview({ screen, patterns, states, componentScope }) {
  const text = `${screen.name} ${screen.prompt}`.toLowerCase();
  const componentNames = screen.components.map((component) => component.name).join(", ");
  const staggerStart = screen.components.length > 2 ? "40-80ms" : "20-40ms";

  let summary = componentScope === "single component"
    ? `The source currently reads as one primary component: ${componentNames}.`
    : `The screen currently reads as a mobile-first dark interface with ${componentNames}.`;

  if (text.includes("home") || text.includes("hero")) {
    summary += " The leading surface should arrive first and establish hierarchy before supporting content follows.";
  } else if (text.includes("dashboard") || text.includes("analytics")) {
    summary += " Dense information should feel sequenced, with one focal transition and stable surrounding chrome.";
  } else {
    summary += " The strongest result comes from giving one component the main arrival while supporting elements settle in after it.";
  }

  const motionSentence = `Recommended Material Motion 3 families here are ${patterns.join(", ") || "Container transform"} with ${states.includes("hover") ? "micro-interactions on interactive elements" : "supporting state motion on interactive elements"}.`;
  const sequencingSentence = `Use ${staggerStart} stagger between major component groups so the screen feels choreographed rather than simultaneous.`;

  return `${summary} ${motionSentence} ${sequencingSentence}`;
}

function inferComponentStates(component) {
  const states = new Set(["enter"]);
  const prompt = `${component.prompt} ${component.name}`.toLowerCase();

  if (prompt.includes("loading") || component.interaction === "loading") states.add("loading");
  if (prompt.includes("hover") || prompt.includes("mouse over") || component.interaction === "hover") states.add("hover");
  if (component.type === "filter-group" || component.type === "tab-panel") states.add("selection");
  if (component.type === "metric-card" || component.type === "list-row" || component.type === "chart-panel") states.add("drill-in");

  return Array.from(states);
}

function componentDisplayName(component) {
  const typeLabels = {
    "metric-card": "Hero or KPI card",
    "chart-panel": "Chart or media panel",
    "tab-panel": "Tab or carousel rail",
    "filter-group": "Filter or segmented control",
    "list-row": "List item",
    "dialog-sheet": "Overlay or sheet"
  };

  return typeLabels[component.type] || "Component";
}

function buildComponentMotionBrief(component, index) {
  const primary = screenPrimarySuggestion(component);
  const preset = presets[primary.preset];
  const easing = easingProfiles[preset.easing] || easingProfiles["cubic-bezier(0.2, 0, 0, 1)"];
  const states = inferComponentStates(component);
  const emphasis = easing.label === "Emphasized"
    ? "This component deserves stronger focus and should land with more presence."
    : "This component should move as supporting UI, with clear but restrained motion.";

  return {
    role: componentDisplayName(component),
    pattern: primary.title,
    patternReason: primary.reason,
    easingName: easing.label,
    easingValue: easing.value,
    easingUse: easing.use,
    duration: `${preset.duration}ms`,
    stagger: `${index * 40}ms`,
    states,
    emphasis
  };
}

function screenPrimarySuggestion(component) {
  return buildMotionAnalysis(component)[0];
}

function renderHierarchy() {
  els.sidebar.classList.toggle("collapsed", state.sidebarCollapsed);
  els.hierarchyList.innerHTML = state.screens
    .map((screen) => {
      const screenActive = state.selected.kind === "screen" && state.selected.screenId === screen.id;
      const childMarkup = screen.components
        .map((component) => {
          const active = state.selected.kind === "component" && state.selected.componentId === component.id;
          return `
            <div class="hierarchy-row">
              <button class="hierarchy-item child${active ? " active" : ""}" data-kind="component" data-screen-id="${screen.id}" data-component-id="${component.id}">
                <span class="hierarchy-title">${escapeHtml(component.name)}</span>
                <span class="hierarchy-meta">${escapeHtml(component.type)} · ${escapeHtml(statusLabel(component.status))}</span>
              </button>
              <button class="hierarchy-remove" data-remove-component="${component.id}" data-screen-id="${screen.id}" aria-label="Remove ${escapeHtml(component.name)}">×</button>
            </div>
          `;
        })
        .join("");

      return `
        <div class="hierarchy-group">
          <button class="hierarchy-item screen${screenActive ? " active" : ""}" data-kind="screen" data-screen-id="${screen.id}">
            <span class="hierarchy-title">${escapeHtml(screen.name)}</span>
            <span class="hierarchy-meta">${screen.components.length} components · ${escapeHtml(screenWorkflowStatus(screen))}</span>
          </button>
          <div class="hierarchy-children">${childMarkup}</div>
        </div>
      `;
    })
    .join("");

  els.hierarchyList.querySelectorAll("[data-kind='screen']").forEach((button) => {
    button.addEventListener("click", () => selectScreen(button.dataset.screenId));
  });

  els.hierarchyList.querySelectorAll("[data-kind='component']").forEach((button) => {
    button.addEventListener("click", () => selectComponent(button.dataset.screenId, button.dataset.componentId));
  });

  els.hierarchyList.querySelectorAll("[data-remove-component]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      removeComponent(button.dataset.screenId, button.dataset.removeComponent);
    });
  });
}

function renderBreakpoint() {
  els.deviceStage.className = `device-stage ${state.breakpoint}`;
  els.deviceLabel.textContent = `${capitalize(state.breakpoint)} preview`;
  els.breakpointSwitcher.querySelectorAll("button").forEach((button) => {
    button.classList.toggle("active", button.dataset.breakpoint === state.breakpoint);
  });
}

function componentMarkup(component, includePlay = false) {
  const preset = presets[component.preset];
  const interactionClass = component.interaction === "hover" ? " is-hover" : component.interaction === "loading" ? " is-loading" : "";
  const playButton = includePlay
    ? `<button class="preview-play" data-play-component="${component.id}">Play</button>`
    : "";

  const variants = {
    "metric-card": `
      <article class="preview-surface preview-block${interactionClass}" data-preview-component="${component.id}" data-focus-component="${component.id}">
        <div class="preview-topbar">
          <div class="preview-title">${escapeHtml(component.name)}</div>
          <div class="preview-chip">${preset.label}</div>
        </div>
        ${playButton}
        <div class="preview-metric-value">${component.interaction === "loading" ? "--.--" : "12.4%"}</div>
        <div class="preview-subtle">${component.interaction === "loading" ? "Loading metric" : "+2.1 this week"}</div>
        <div class="preview-chart"></div>
      </article>
    `,
    "chart-panel": `
      <article class="preview-surface preview-block${interactionClass}" data-preview-component="${component.id}" data-focus-component="${component.id}">
        <div class="preview-topbar">
          <div class="preview-title">${escapeHtml(component.name)}</div>
          <div class="preview-chip">${preset.label}</div>
        </div>
        ${playButton}
        <div class="preview-chart"></div>
        <div class="preview-bars">
          <div class="preview-bar" style="width: 78%"></div>
          <div class="preview-bar" style="width: 92%"></div>
          <div class="preview-bar" style="width: 58%"></div>
        </div>
      </article>
    `,
    "tab-panel": `
      <article class="preview-surface preview-block${interactionClass}" data-preview-component="${component.id}" data-focus-component="${component.id}">
        <div class="preview-topbar">
          <div class="preview-title">${escapeHtml(component.name)}</div>
          <div class="preview-chip">${preset.label}</div>
        </div>
        ${playButton}
        <div class="preview-tabs">
          <div class="preview-tab active">Overview</div>
          <div class="preview-tab">Breakdown</div>
          <div class="preview-tab">Compare</div>
        </div>
        <div class="preview-bars">
          <div class="preview-bar" style="width: 86%"></div>
          <div class="preview-bar" style="width: 72%"></div>
          <div class="preview-bar" style="width: 64%"></div>
        </div>
      </article>
    `,
    "filter-group": `
      <article class="preview-surface preview-block${interactionClass}" data-preview-component="${component.id}" data-focus-component="${component.id}">
        <div class="preview-topbar">
          <div class="preview-title">${escapeHtml(component.name)}</div>
          <div class="preview-chip">${preset.label}</div>
        </div>
        ${playButton}
        <div class="preview-filters">
          <div class="preview-filter active">Last 7 days</div>
          <div class="preview-filter">Last 30 days</div>
          <div class="preview-filter">Region</div>
        </div>
        <div class="preview-bars">
          <div class="preview-bar" style="width: 88%"></div>
          <div class="preview-bar" style="width: 61%"></div>
          <div class="preview-bar" style="width: 74%"></div>
        </div>
      </article>
    `,
    "list-row": `
      <article class="preview-surface preview-block${interactionClass}" data-preview-component="${component.id}" data-focus-component="${component.id}">
        <div class="preview-topbar">
          <div class="preview-title">${escapeHtml(component.name)}</div>
          <div class="preview-chip">${preset.label}</div>
        </div>
        ${playButton}
        <div class="preview-table">
          <div class="preview-row"></div>
          <div class="preview-row"></div>
          <div class="preview-row"></div>
        </div>
      </article>
    `,
    "dialog-sheet": `
      <article class="preview-surface preview-block${interactionClass}" data-preview-component="${component.id}" data-focus-component="${component.id}">
        <div class="preview-topbar">
          <div class="preview-title">${escapeHtml(component.name)}</div>
          <div class="preview-chip">${preset.label}</div>
        </div>
        ${playButton}
        <div class="preview-sheet">
          <div class="preview-metric-value" style="font-size: 28px">Action sheet</div>
          <div class="preview-subtle">Focused overlay surface.</div>
          <div class="preview-bars">
            <div class="preview-bar" style="width: 90%"></div>
            <div class="preview-bar" style="width: 76%"></div>
          </div>
        </div>
      </article>
    `
  };

  return variants[component.type] || variants["metric-card"];
}

function renderOverlayButton(component, selected = false) {
  const frame = component.frame || { x: 8, y: 8, w: 84, h: 16 };
  const primary = screenPrimarySuggestion(component);
  return `
    <button
      class="source-overlay${selected ? " selected" : ""}"
      data-overlay-focus="${component.id}"
      style="left:${frame.x}%;top:${frame.y}%;width:${frame.w}%;height:${frame.h}%"
    >
      <span class="source-overlay-name">${escapeHtml(component.name)}</span>
      <span class="source-overlay-motion">${escapeHtml(primary.title)}</span>
    </button>
  `;
}

function renderStage() {
  const screen = currentScreen();
  const component = currentComponent();

  if (state.selected.kind === "component" && component) {
    const sourceReference = screen.sourceImageData
      ? `
        <div class="focus-reference">
          <div class="focus-reference-head">
            <div class="eyebrow">Source Reference</div>
            <div class="focus-reference-copy">Original screen with the selected component highlighted.</div>
          </div>
          <div class="screen-source-stage focus-source-stage">
            <img class="screen-source-image" src="${screen.sourceImageData}" alt="${escapeHtml(screen.name)}">
            ${renderOverlayButton(component, true)}
          </div>
        </div>
      `
      : "";

    els.stageContent.innerHTML = `
      <div class="focus-preview">
        ${sourceReference}
        ${componentMarkup(component, true)}
      </div>
    `;
  } else if (!screen.figmaUrl && !screen.sourceImageData) {
    els.stageContent.innerHTML = `
      <div class="empty-stage">
        <div class="empty-title">Start with a source</div>
        <div class="empty-copy">Add a Figma link or upload an image in the right panel. Then generate the screen to create HTML components and Material Motion 3 analysis.</div>
      </div>
    `;
  } else if (!screen.generated) {
    const sourceBlock = screen.sourceImageData
      ? `
        <div class="screen-source-stage">
          <img class="screen-source-image" src="${screen.sourceImageData}" alt="${escapeHtml(screen.name)}">
        </div>
      `
      : `
        <div class="source-summary">
          <div class="source-summary-title">Figma source linked</div>
          <div class="source-summary-copy">${escapeHtml(screen.figmaUrl)}</div>
          <div class="source-summary-copy">This gives the studio a source reference. Uploading an image is still the best way to see the exact screen visually inside the app.</div>
        </div>
      `;
    els.stageContent.innerHTML = `
      <div class="empty-stage">
        <div class="empty-title">Ready to analyze</div>
        <div class="empty-copy">The screen source is loaded. Click Analyze screen to create a component hierarchy, HTML prototypes, and Material Motion 3 suggestions.</div>
        ${sourceBlock}
      </div>
    `;
  } else {
    const imageBlock = screen.sourceImageData
      ? `
        <div class="screen-source-stage">
          <img class="screen-source-image" src="${screen.sourceImageData}" alt="${escapeHtml(screen.name)}">
          ${screen.components.map((item) => renderOverlayButton(item)).join("")}
        </div>
      `
      : `
        <div class="source-summary">
          <div class="source-summary-title">Screen analyzed from link and prompt</div>
          <div class="source-summary-copy">A Figma link is attached, but there is no uploaded image to render visually in the stage. The generated HTML components below remain editable.</div>
        </div>
      `;
    els.stageContent.innerHTML = `
      <div class="screen-preview">
        ${imageBlock}
        ${screen.components.map((item) => componentMarkup(item, true)).join("")}
      </div>
    `;
  }

  els.stageContent.querySelectorAll("[data-play-component]").forEach((button) => {
    button.addEventListener("click", () => {
      const target = els.stageContent.querySelector(`[data-preview-component="${button.dataset.playComponent}"]`);
      replayPreview(target);
    });
  });

  if (state.selected.kind === "screen") {
    els.stageContent.querySelectorAll("[data-focus-component]").forEach((node) => {
      node.addEventListener("click", (event) => {
        if (event.target.closest("[data-play-component]")) return;
        selectComponent(screen.id, node.dataset.focusComponent);
      });
    });
  }

  els.stageContent.querySelectorAll("[data-overlay-focus]").forEach((button) => {
    button.addEventListener("click", () => {
      selectComponent(screen.id, button.dataset.overlayFocus);
    });
  });
}

function replayPreview(node) {
  if (!node) return;
  node.classList.remove("replay");
  void node.offsetWidth;
  node.classList.add("replay");
}

function renderAnalysis() {
  const component = currentComponent();
  if (!component) {
    els.analysisList.innerHTML = "";
    return;
  }

  component.analysis = buildMotionAnalysis({
    ...component,
    type: els.componentType.value,
    prompt: els.componentPrompt.value.trim()
  });

  els.analysisList.innerHTML = component.analysis
    .map((item, index) => `
      <button class="analysis-item${item.preset === els.preset.value ? " active" : ""}" data-preset="${item.preset}">
        <div class="analysis-top">
          <span class="analysis-title">${escapeHtml(item.title)}</span>
          <span class="analysis-badge">${index === 0 ? "Recommended" : "Option"}</span>
        </div>
        <div class="analysis-reason">${escapeHtml(item.reason)}</div>
      </button>
    `)
    .join("");

  els.analysisList.querySelectorAll("[data-preset]").forEach((button) => {
    button.addEventListener("click", () => {
      const presetKey = button.dataset.preset;
      const component = currentComponent();
      component.preset = presetKey;
      component.motion = snapshotPreset(presetKey);
      persistState();
      syncUI();
    });
  });
}

function renderScreenAnalysis() {
  const screen = currentScreen();

  if (!screen.generated || !screen.components.length) {
    els.screenAnalysisCopy.textContent = "Analyze the screen to create a component hierarchy and suggest Material Motion 3 patterns.";
    els.screenAnalysisList.innerHTML = "";
    return;
  }

  els.screenAnalysisCopy.textContent = screen.analysisSummary || `The screen has ${screen.components.length} suggested components. Start with the most important interaction and then fine-tune each component.`;
  const overviewMarkup = screen.analysisOverview
    ? `<div class="screen-analysis-overview">${escapeHtml(screen.analysisOverview)}</div>`
    : "";
  const noteMarkup = (screen.analysisNotes || [])
    .map((note) => `<div class="screen-analysis-note">${escapeHtml(note)}</div>`)
    .join("");

  const componentMarkup = screen.components
    .map((component, index) => {
      const suggestion = screenPrimarySuggestion(component);
      const brief = buildComponentMotionBrief(component, index);
      return `
        <button class="analysis-item analysis-rich" data-screen-component="${component.id}">
          <div class="analysis-top">
            <span class="analysis-title">${escapeHtml(component.name)}</span>
            <span class="analysis-badge">${escapeHtml(suggestion.title)}</span>
          </div>
          <div class="analysis-role">${escapeHtml(brief.role)}</div>
          <div class="analysis-copy">Identified as an individual component with its own motion recommendation.</div>
          <div class="analysis-reason">${escapeHtml(suggestion.reason)}</div>
          <div class="analysis-meta">
            <span class="analysis-pill">${escapeHtml(brief.easingName)}</span>
            <span class="analysis-pill">${escapeHtml(brief.duration)}</span>
            <span class="analysis-pill">Stagger ${escapeHtml(brief.stagger)}</span>
          </div>
          <div class="analysis-easing">${escapeHtml(brief.easingValue)}</div>
          <div class="analysis-copy">${escapeHtml(brief.emphasis)}</div>
          <div class="analysis-state-row">
            ${brief.states.map((state) => `<span class="analysis-state">${escapeHtml(state)}</span>`).join("")}
          </div>
        </button>
      `;
    })
    .join("");

  els.screenAnalysisList.innerHTML = `${overviewMarkup}${noteMarkup}${componentMarkup}`;

  els.screenAnalysisList.querySelectorAll("[data-screen-component]").forEach((button) => {
    button.addEventListener("click", () => {
      selectComponent(screen.id, button.dataset.screenComponent);
    });
  });
}

function buildHandoffSpec(component, screen) {
  const suggestion = screenPrimarySuggestion(component);
  const motion = component.motion;
  return {
    screen: screen.name,
    component_name: component.name,
    component_type: component.type,
    component_role: componentDisplayName(component),
    status: component.status,
    platform: component.platform,
    trigger: component.interaction,
    material_pattern: suggestion.title,
    material_preset: component.preset,
    easing_curve: motion.easing,
    easing_name: (easingProfiles[motion.easing] || { label: "Custom" }).label,
    duration_ms: motion.duration,
    delay_ms: motion.stagger,
    move_px: motion.distance,
    scale_start: motion.scale,
    opacity_start: motion.opacity,
    states: inferComponentStates(component),
    reduced_motion_fallback: component.reducedMotion,
    engineering_notes: component.engineeringNotes || "No additional implementation notes yet."
  };
}

function renderHandoff() {
  const screen = currentScreen();
  const component = currentComponent();

  if (!component) {
    const approved = screen.components.filter((item) => item.status === "approved").length;
    els.handoffReadable.innerHTML = `
      <div class="handoff-empty">
        <div class="analysis-copy">Select a component to prepare developer handoff.</div>
        <div class="analysis-copy">${approved} of ${screen.components.length} components approved for handoff.</div>
      </div>
    `;
    els.handoffJson.textContent = "";
    return;
  }

  const spec = buildHandoffSpec(component, screen);
  els.componentStatus.value = component.status;
  els.componentPlatform.value = component.platform;
  els.reducedMotion.value = component.reducedMotion;
  els.engineeringNotes.value = component.engineeringNotes;

  els.handoffReadable.innerHTML = `
    <div class="handoff-line"><strong>Component:</strong> ${escapeHtml(spec.component_name)}</div>
    <div class="handoff-line"><strong>Pattern:</strong> ${escapeHtml(spec.material_pattern)}</div>
    <div class="handoff-line"><strong>Trigger:</strong> ${escapeHtml(spec.trigger)}</div>
    <div class="handoff-line"><strong>Easing:</strong> ${escapeHtml(spec.easing_name)} ${escapeHtml(spec.easing_curve)}</div>
    <div class="handoff-line"><strong>Duration:</strong> ${spec.duration_ms}ms</div>
    <div class="handoff-line"><strong>Delay/Stagger:</strong> ${spec.delay_ms}ms</div>
    <div class="handoff-line"><strong>States:</strong> ${escapeHtml(spec.states.join(", "))}</div>
    <div class="handoff-line"><strong>Reduced motion:</strong> ${escapeHtml(spec.reduced_motion_fallback)}</div>
  `;
  els.handoffJson.textContent = JSON.stringify(spec, null, 2);
}

function applyMotionValues() {
  document.documentElement.style.setProperty("--duration", `${els.duration.value}ms`);
  document.documentElement.style.setProperty("--easing", els.easing.value);
  document.documentElement.style.setProperty("--scale-start", els.scale.value);
  document.documentElement.style.setProperty("--opacity-start", els.opacity.value);

  els.durationValue.textContent = `${els.duration.value} ms`;
  els.distanceValue.textContent = `${els.distance.value} px`;
  els.scaleValue.textContent = Number(els.scale.value).toFixed(2);
  els.opacityValue.textContent = Number(els.opacity.value).toFixed(2);
  els.staggerValue.textContent = `${els.stagger.value} ms`;

  const preset = presets[els.preset.value];
  els.guidanceList.innerHTML = preset.guidance.map((item) => `<li>${item}</li>`).join("");
}

function syncInspector() {
  const screen = currentScreen();
  const component = currentComponent();
  const screenSelected = state.selected.kind === "screen";
  const analyzeMode = state.mode === "analyze";
  const tweakMode = state.mode === "tweak";
  const handoffMode = state.mode === "handoff";

  els.modeTabs.querySelectorAll("[data-mode]").forEach((button) => {
    button.classList.toggle("active", button.dataset.mode === state.mode);
  });

  els.screenSection.classList.toggle("hidden", !(analyzeMode && screenSelected));
  els.screenAnalysisSection.classList.toggle("hidden", !(analyzeMode && screenSelected));
  els.screenName.value = screen.name;
  els.screenFigmaUrl.value = screen.figmaUrl || "";
  els.screenPrompt.value = screen.prompt || "";

  els.componentSection.classList.toggle("hidden", !component || handoffMode);
  els.analysisSection.classList.toggle("hidden", !(component && (analyzeMode || tweakMode)));
  els.motionSection.classList.toggle("hidden", !(component && tweakMode));
  els.rationaleSection.classList.toggle("hidden", !(component && tweakMode));
  els.handoffSection.classList.toggle("hidden", !handoffMode);
  els.saveComponent.classList.toggle("hidden", !(component && tweakMode));
  els.duplicateComponent.classList.toggle("hidden", !(component && tweakMode));
  els.deleteComponent.classList.toggle("hidden", !(component && tweakMode));

  if (component) {
    els.componentName.value = component.name;
    els.componentType.value = component.type;
    els.componentPrompt.value = component.prompt || "";
    els.componentInteraction.value = component.interaction || "enter";
    els.preset.value = component.preset;
    els.duration.value = component.motion.duration;
    els.easing.value = component.motion.easing;
    els.distance.value = component.motion.distance;
    els.scale.value = component.motion.scale;
    els.opacity.value = component.motion.opacity;
    els.stagger.value = component.motion.stagger;
    if (analyzeMode || tweakMode) renderAnalysis();
  } else {
    els.analysisList.innerHTML = "";
    els.guidanceList.innerHTML = "";
  }

  if (screenSelected && analyzeMode) {
    renderScreenAnalysis();
  }

  if (handoffMode) {
    renderHandoff();
  }
}

function syncUI() {
  renderHierarchy();
  renderBreakpoint();
  renderStageHeader();
  syncInspector();
  applyMotionValues();
  renderStage();
}

function renderStageHeader() {
  const screen = currentScreen();
  const component = currentComponent();
  if (state.selected.kind === "component" && component) {
    els.selectionKind.textContent = "Component focus";
    els.stageTitle.textContent = component.name;
    els.stageSubtitle.textContent = `Focused inside ${screen.name}. Review the source reference, then adjust the component's Material Motion 3 behavior.`;
    els.stageStatus.textContent = `Editing ${component.interaction} motion`;
  } else {
    els.selectionKind.textContent = "Screen";
    els.stageTitle.textContent = screen.name;
    if (!screen.figmaUrl && !screen.sourceImageData) {
      els.stageSubtitle.textContent = "Add a Figma link or upload an image, then generate components and motion analysis.";
      els.stageStatus.textContent = "Waiting for source";
    } else if (!screen.generated) {
      els.stageSubtitle.textContent = "Your source is loaded. Analyze the screen to build a component hierarchy and Google Material Motion 3 suggestions.";
      els.stageStatus.textContent = "Ready to analyze";
    } else {
      els.stageSubtitle.textContent = `${screen.components.length} components are ready. Choose one hotspot or analysis card to start tweaking motion.`;
      els.stageStatus.textContent = "Analysis ready";
    }
  }
}

function generateScreen() {
  const screen = currentScreen();
  screen.name = els.screenName.value.trim() || "Untitled screen";
  screen.figmaUrl = els.screenFigmaUrl.value.trim();
  screen.prompt = els.screenPrompt.value.trim();

  if (!screen.figmaUrl && !screen.sourceImageData) {
    window.alert("Add a Figma link or upload an image first.");
    return;
  }

  screen.components = inferComponentFrames(inferComponentsForScreen(screen));
  const screenAnalysis = buildScreenAnalysis(screen);
  screen.analysisSummary = screenAnalysis.summary;
  screen.analysisOverview = screenAnalysis.overview;
  screen.analysisNotes = screenAnalysis.notes;
  screen.generated = true;
  state.selected = {
    kind: "screen",
    screenId: screen.id,
    componentId: null
  };
  persistState();
  syncUI();
}

function saveComponent() {
  const component = currentComponent();
  if (!component) return;
  syncComponentDraftFromInputs();
  if (component.status === "unreviewed") {
    component.status = "reviewed";
  }
  persistState();
  syncUI();
}

function syncComponentDraftFromInputs() {
  const component = currentComponent();
  if (!component) return;

  component.name = els.componentName.value.trim() || "Untitled component";
  component.type = els.componentType.value;
  component.prompt = els.componentPrompt.value.trim();
  component.interaction = els.componentInteraction.value;
  component.preset = els.preset.value;
  component.analysis = buildMotionAnalysis(component);
  component.motion = {
    duration: Number(els.duration.value),
    easing: els.easing.value,
    distance: Number(els.distance.value),
    scale: Number(els.scale.value),
    opacity: Number(els.opacity.value),
    stagger: Number(els.stagger.value)
  };
  component.platform = els.componentPlatform?.value || component.platform;
  component.reducedMotion = els.reducedMotion?.value || component.reducedMotion;
  component.engineeringNotes = els.engineeringNotes?.value || component.engineeringNotes;
}

function recommendMotion() {
  const component = currentComponent();
  if (!component) return;
  component.type = els.componentType.value;
  component.prompt = els.componentPrompt.value.trim();
  component.analysis = buildMotionAnalysis(component);
  component.preset = component.analysis[0].preset;
  component.motion = snapshotPreset(component.preset);
  persistState();
  syncUI();
}

function addEmptyScreen() {
  const screen = createScreen({ name: `New screen ${state.screens.length + 1}` });
  state.screens.push(screen);
  state.selected = {
    kind: "screen",
    screenId: screen.id,
    componentId: null
  };
  persistState();
  syncUI();
}

function addChildComponent() {
  const screen = currentScreen();
  const component = createComponent({
    name: `Component ${screen.components.length + 1}`,
    type: "metric-card",
    prompt: "A component that becomes a richer detail view."
  });
  component.frame = inferComponentFrames([component])[0].frame;
  screen.components.push(component);
  const screenAnalysis = buildScreenAnalysis(screen);
  screen.analysisSummary = screenAnalysis.summary;
  screen.analysisOverview = screenAnalysis.overview;
  screen.analysisNotes = screenAnalysis.notes;
  screen.generated = true;
  state.selected = { kind: "component", screenId: screen.id, componentId: component.id };
  persistState();
  syncUI();
}

function duplicateComponent() {
  const screen = currentScreen();
  const component = currentComponent();
  if (!component) return;
  const copy = createComponent({
    name: `${component.name} copy`,
    type: component.type,
    prompt: component.prompt,
    preset: component.preset,
    interaction: component.interaction
  });
  copy.motion = { ...component.motion };
  copy.analysis = buildMotionAnalysis(copy);
  copy.frame = component.frame ? { ...component.frame } : inferComponentFrames([copy])[0].frame;
  screen.components.push(copy);
  const screenAnalysis = buildScreenAnalysis(screen);
  screen.analysisSummary = screenAnalysis.summary;
  screen.analysisOverview = screenAnalysis.overview;
  screen.analysisNotes = screenAnalysis.notes;
  state.selected = { kind: "component", screenId: screen.id, componentId: copy.id };
  persistState();
  syncUI();
}

function removeComponent(screenId, componentId) {
  const screen = state.screens.find((item) => item.id === screenId);
  if (!screen) return;

  screen.components = screen.components.filter((component) => component.id !== componentId);
  const screenAnalysis = buildScreenAnalysis(screen);
  screen.analysisSummary = screenAnalysis.summary;
  screen.analysisOverview = screenAnalysis.overview;
  screen.analysisNotes = screenAnalysis.notes;
  screen.generated = screen.components.length > 0;

  if (state.selected.kind === "component" && state.selected.componentId === componentId) {
    state.selected = {
      kind: "screen",
      screenId,
      componentId: null
    };
  }

  persistState();
  syncUI();
}

function focusScreen() {
  selectScreen(currentScreen().id);
}

function resetScreenAnalysis(screen) {
  screen.generated = false;
  screen.components = [];
  screen.analysisSummary = "";
  screen.analysisOverview = "";
  screen.analysisNotes = [];
}

function updateScreenDraft() {
  const screen = currentScreen();
  screen.name = els.screenName.value.trim() || screen.name || "Untitled screen";
  screen.figmaUrl = els.screenFigmaUrl.value.trim();
  screen.prompt = els.screenPrompt.value.trim();
  resetScreenAnalysis(screen);
  persistState();
  syncUI();
}

function importJson() {
  const raw = window.prompt("Paste screen JSON");
  if (!raw) return;
  try {
    const data = JSON.parse(raw);
    const screen = createScreen({
      name: data.name || "Imported screen",
      figmaUrl: data.figmaUrl || "",
      prompt: data.prompt || "",
      sourceImageData: data.sourceImageData || "",
      analysisSummary: data.analysisSummary || "",
      analysisOverview: data.analysisOverview || "",
      analysisNotes: data.analysisNotes || []
    });
    screen.components = (data.components || []).map((item) =>
      createComponent({
        name: item.name,
        type: item.type,
        prompt: item.prompt || "",
        preset: item.preset,
        interaction: item.interaction || "enter",
        frame: item.frame || null
      })
    );
    screen.components = inferComponentFrames(screen.components);
    screen.generated = screen.components.length > 0;
    state.screens.push(screen);
    selectScreen(screen.id);
  } catch {
    window.alert("Could not parse screen JSON.");
  }
}

function handleScreenImageUpload(event) {
  const file = event.target.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    const screen = currentScreen();
    screen.sourceImageData = String(reader.result);
    resetScreenAnalysis(screen);
    persistState();
    syncUI();
  };
  reader.readAsDataURL(file);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function capitalize(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function initialize() {
  els.toggleSidebar.addEventListener("click", () => {
    state.sidebarCollapsed = !state.sidebarCollapsed;
    persistState();
    renderHierarchy();
  });

  els.breakpointSwitcher.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
      state.breakpoint = button.dataset.breakpoint;
      persistState();
      renderBreakpoint();
    });
  });

  els.newScreen.addEventListener("click", addEmptyScreen);
  els.importJson.addEventListener("click", importJson);
  els.generateScreen.addEventListener("click", generateScreen);
  els.showScreen.addEventListener("click", () => selectScreen(currentScreen().id));
  els.addChildComponent.addEventListener("click", addChildComponent);
  els.focusScreen.addEventListener("click", focusScreen);
  els.focusFirstComponent.addEventListener("click", () => {
    const screen = currentScreen();
    if (screen.components[0]) {
      selectComponent(screen.id, screen.components[0].id);
    }
  });
  els.screenImage.addEventListener("change", handleScreenImageUpload);
  [els.screenName, els.screenFigmaUrl, els.screenPrompt].forEach((input) => {
    input.addEventListener("input", updateScreenDraft);
  });
  els.recommendMotion.addEventListener("click", recommendMotion);
  els.reanalyzeMotion.addEventListener("click", renderAnalysis);
  els.saveComponent.addEventListener("click", saveComponent);
  els.duplicateComponent.addEventListener("click", duplicateComponent);
  els.deleteComponent.addEventListener("click", () => {
    const component = currentComponent();
    const screen = currentScreen();
    if (!component || !screen) return;
    removeComponent(screen.id, component.id);
  });
  els.playComponent.addEventListener("click", () => {
    const component = currentComponent();
    if (!component) return;
    const node = els.stageContent.querySelector(`[data-preview-component="${component.id}"]`);
    replayPreview(node);
  });

  els.modeTabs.querySelectorAll("[data-mode]").forEach((button) => {
    button.addEventListener("click", () => setMode(button.dataset.mode));
  });

  els.componentStatus.addEventListener("input", () => {
    const component = currentComponent();
    if (!component) return;
    component.status = els.componentStatus.value;
    persistState();
    syncUI();
  });

  els.componentPlatform.addEventListener("input", () => {
    const component = currentComponent();
    if (!component) return;
    component.platform = els.componentPlatform.value;
    persistState();
    renderHandoff();
  });

  els.reducedMotion.addEventListener("input", () => {
    const component = currentComponent();
    if (!component) return;
    component.reducedMotion = els.reducedMotion.value;
    persistState();
    renderHandoff();
  });

  els.engineeringNotes.addEventListener("input", () => {
    const component = currentComponent();
    if (!component) return;
    component.engineeringNotes = els.engineeringNotes.value;
    persistState();
    renderHandoff();
  });

  els.approveComponent.addEventListener("click", () => {
    const component = currentComponent();
    if (!component) return;
    component.status = "approved";
    persistState();
    syncUI();
  });

  [
    els.componentName,
    els.componentType,
    els.componentPrompt,
    els.componentInteraction,
    els.preset,
    els.duration,
    els.easing,
    els.distance,
    els.scale,
    els.opacity,
    els.stagger
  ].forEach((input) => {
    input.addEventListener("input", () => {
      if (state.selected.kind !== "component") return;
      syncComponentDraftFromInputs();
      persistState();
      renderAnalysis();
      applyMotionValues();
      renderHierarchy();
      renderStageHeader();
      renderStage();
    });
  });

  syncUI();
}

initialize();
