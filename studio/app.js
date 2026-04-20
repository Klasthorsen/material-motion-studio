const STORAGE_KEY = "material-motion-studio-hierarchy-v1";

const presets = {
  "container-transform": {
    label: "Container transform",
    duration: 320,
    easing: "cubic-bezier(0.4, 0, 0.2, 1)",
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
    easing: "cubic-bezier(0.4, 0, 0.2, 1)",
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
    easing: "cubic-bezier(0.4, 0, 0.2, 1)",
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
    easing: "cubic-bezier(0, 0, 0.2, 1)",
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
    easing: "cubic-bezier(0, 0, 0.2, 1)",
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
    easing: "cubic-bezier(0.4, 0, 0.2, 1)",
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
  duplicateComponent: document.getElementById("duplicateComponent")
};

const state = loadState();

function defaultState() {
  const screen = createScreen({ name: "Analytics overview" });
  screen.figmaUrl = "https://www.figma.com/design/analytics-overview";
  screen.prompt = "Mobile analytics screen with KPI summary, chart detail and date filters.";
  screen.components = inferComponentsForScreen(screen);
  screen.generated = true;
  return {
    sidebarCollapsed: false,
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
    preset: presetKey,
    analysis: buildMotionAnalysis({ type, prompt }),
    motion: snapshotPreset(presetKey)
  };
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

  if (text.includes("table") || text.includes("list")) {
    return [
      createComponent({ name: "Header filters", type: "filter-group", prompt: "Replace visible content when a period changes." }),
      createComponent({ name: "Result rows", type: "list-row", prompt: "Open a row into detail." })
    ];
  }

  if (text.includes("tab") || text.includes("compare")) {
    return [
      createComponent({ name: "Mode tabs", type: "tab-panel", prompt: "Switch between sibling views with clear spatial continuity." }),
      createComponent({ name: "Performance chart", type: "chart-panel", prompt: "Drill from overview into focused analysis." })
    ];
  }

  return [
    createComponent({ name: "Summary KPI", type: "metric-card", prompt: "A summary card that becomes a detailed panel." }),
    createComponent({ name: "Trend chart", type: "chart-panel", prompt: "A chart that can drill into deeper detail." }),
    createComponent({ name: "Period filters", type: "filter-group", prompt: "Change the visible dataset between date ranges." })
  ];
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
            <button class="hierarchy-item child${active ? " active" : ""}" data-kind="component" data-screen-id="${screen.id}" data-component-id="${component.id}">
              <span class="hierarchy-title">${escapeHtml(component.name)}</span>
              <span class="hierarchy-meta">${escapeHtml(component.type)}</span>
            </button>
          `;
        })
        .join("");

      return `
        <div class="hierarchy-group">
          <button class="hierarchy-item screen${screenActive ? " active" : ""}" data-kind="screen" data-screen-id="${screen.id}">
            <span class="hierarchy-title">${escapeHtml(screen.name)}</span>
            <span class="hierarchy-meta">${screen.components.length} components</span>
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
}

function renderBreakpoint() {
  els.deviceStage.className = `device-stage ${state.breakpoint}`;
  els.deviceLabel.textContent = `${capitalize(state.breakpoint)} preview`;
  els.breakpointSwitcher.querySelectorAll("button").forEach((button) => {
    button.classList.toggle("active", button.dataset.breakpoint === state.breakpoint);
  });
}

function renderStageHeader() {
  const screen = currentScreen();
  const component = currentComponent();
  if (state.selected.kind === "component" && component) {
    els.selectionKind.textContent = "Component focus";
    els.stageTitle.textContent = component.name;
    els.stageSubtitle.textContent = `Focused inside ${screen.name}.`;
  } else {
    els.selectionKind.textContent = "Screen";
    els.stageTitle.textContent = screen.name;
    if (!screen.figmaUrl && !screen.sourceImageData) {
      els.stageSubtitle.textContent = "Add a Figma link or upload an image, then generate components and motion analysis.";
    } else if (!screen.generated) {
      els.stageSubtitle.textContent = "Generate the screen to create HTML components and Google Material Motion 3 suggestions.";
    } else {
      els.stageSubtitle.textContent = `${screen.components.length} components on this screen. Select one to focus only that component.`;
    }
  }
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

function renderStage() {
  const screen = currentScreen();
  const component = currentComponent();

  if (state.selected.kind === "component" && component) {
    els.stageContent.innerHTML = `
      <div class="focus-preview">
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
      ? `<img class="screen-source-image" src="${screen.sourceImageData}" alt="${escapeHtml(screen.name)}">`
      : `
        <div class="source-summary">
          <div class="source-summary-title">Figma source linked</div>
          <div class="source-summary-copy">${escapeHtml(screen.figmaUrl)}</div>
        </div>
      `;
    els.stageContent.innerHTML = `
      <div class="empty-stage">
        <div class="empty-title">Ready to generate</div>
        <div class="empty-copy">The screen has a source. Click Generate to create HTML components and motion suggestions based on Google Material Motion 3.</div>
        ${sourceBlock}
      </div>
    `;
  } else {
    const imageBlock = screen.sourceImageData
      ? `<img class="screen-source-image" src="${screen.sourceImageData}" alt="${escapeHtml(screen.name)}">`
      : "";
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

  els.screenSection.classList.toggle("hidden", !screenSelected);
  els.screenName.value = screen.name;
  els.screenFigmaUrl.value = screen.figmaUrl || "";
  els.screenPrompt.value = screen.prompt || "";

  els.componentSection.classList.toggle("hidden", screenSelected || !component);
  els.analysisSection.classList.toggle("hidden", screenSelected || !component);
  els.motionSection.classList.toggle("hidden", screenSelected || !component);
  els.saveComponent.classList.toggle("hidden", screenSelected || !component);
  els.duplicateComponent.classList.toggle("hidden", screenSelected || !component);

  if (!screenSelected && component) {
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
    renderAnalysis();
  } else {
    els.analysisList.innerHTML = "";
    els.guidanceList.innerHTML = "";
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
    els.stageSubtitle.textContent = `Focused inside ${screen.name}.`;
    els.stageStatus.textContent = `Editing ${component.interaction} motion`;
  } else {
    els.selectionKind.textContent = "Screen";
    els.stageTitle.textContent = screen.name;
    if (!screen.figmaUrl && !screen.sourceImageData) {
      els.stageSubtitle.textContent = "Add a Figma link or upload an image, then generate components and motion analysis.";
      els.stageStatus.textContent = "Waiting for source";
    } else if (!screen.generated) {
      els.stageSubtitle.textContent = "Your source is loaded. Generate to create HTML components and Google Material Motion 3 suggestions.";
      els.stageStatus.textContent = "Ready to generate";
    } else {
      els.stageSubtitle.textContent = `${screen.components.length} components on this screen.`;
      els.stageStatus.textContent = "Generated";
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

  screen.components = inferComponentsForScreen(screen);
  screen.generated = true;
  state.selected = {
    kind: "component",
    screenId: screen.id,
    componentId: screen.components[0]?.id || null
  };
  persistState();
  syncUI();
}

function saveComponent() {
  const component = currentComponent();
  if (!component) return;
  component.name = els.componentName.value.trim() || "Untitled component";
  component.type = els.componentType.value;
  component.prompt = els.componentPrompt.value.trim();
  component.interaction = els.componentInteraction.value;
  component.analysis = buildMotionAnalysis(component);
  component.preset = els.preset.value;
  component.motion = {
    duration: Number(els.duration.value),
    easing: els.easing.value,
    distance: Number(els.distance.value),
    scale: Number(els.scale.value),
    opacity: Number(els.opacity.value),
    stagger: Number(els.stagger.value)
  };
  persistState();
  syncUI();
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
  screen.components.push(component);
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
  screen.components.push(copy);
  state.selected = { kind: "component", screenId: screen.id, componentId: copy.id };
  persistState();
  syncUI();
}

function focusScreen() {
  selectScreen(currentScreen().id);
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
      sourceImageData: data.sourceImageData || ""
    });
    screen.components = (data.components || []).map((item) =>
      createComponent({
        name: item.name,
        type: item.type,
        prompt: item.prompt || "",
        preset: item.preset,
        interaction: item.interaction || "enter"
      })
    );
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
    currentScreen().sourceImageData = String(reader.result);
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
  els.screenImage.addEventListener("change", handleScreenImageUpload);
  els.recommendMotion.addEventListener("click", recommendMotion);
  els.reanalyzeMotion.addEventListener("click", renderAnalysis);
  els.saveComponent.addEventListener("click", saveComponent);
  els.duplicateComponent.addEventListener("click", duplicateComponent);
  els.playComponent.addEventListener("click", () => {
    const component = currentComponent();
    if (!component) return;
    const node = els.stageContent.querySelector(`[data-preview-component="${component.id}"]`);
    replayPreview(node);
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
      renderAnalysis();
      applyMotionValues();
      renderStage();
    });
  });

  syncUI();
}

initialize();
