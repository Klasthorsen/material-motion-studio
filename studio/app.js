const STORAGE_KEY = "material-motion-studio-semantic-v1";

const categoryCatalog = {
  button: {
    label: "Button",
    intent: "Utility feedback",
    pattern: "micro-interaction",
    easing: "cubic-bezier(0.2, 0, 0, 1)",
    duration: 180,
    delay: 0,
    trigger: "hover, pressed",
    states: ["idle", "hover", "pressed", "disabled"],
    reducedMotion: "Remove scale changes. Keep only a subtle opacity or color feedback.",
    engineeringNotes: "Use a short utility interaction. Keep surrounding layout stable.",
    prototype: "button"
  },
  "page-transition": {
    label: "Page transition",
    intent: "Hierarchy or sibling navigation",
    pattern: "shared-axis-x",
    easing: "cubic-bezier(0.2, 0, 0, 1)",
    duration: 300,
    delay: 0,
    trigger: "route change, open detail, back",
    states: ["leaving", "entering", "arrived"],
    reducedMotion: "Reduce spatial travel. Prefer fade or shorter shared axis movement.",
    engineeringNotes: "Choose shared axis X for sibling views, shared axis Z for hierarchy, container transform when one surface becomes another.",
    prototype: "page"
  },
  "show-hide-menu": {
    label: "Show/hide menu",
    intent: "Reveal or dismiss navigation surface",
    pattern: "fade",
    easing: "cubic-bezier(0.2, 0, 0, 1)",
    duration: 220,
    delay: 0,
    trigger: "open, close",
    states: ["hidden", "entering", "visible", "exiting"],
    reducedMotion: "Use fade only. Avoid large shifts in position.",
    engineeringNotes: "Use fade for lightweight menus and container transform only if the menu emerges from a related surface.",
    prototype: "menu"
  },
  "scroll-appear": {
    label: "Scroll appear",
    intent: "Progressive reveal on scroll",
    pattern: "fade",
    easing: "cubic-bezier(0.2, 0, 0, 1)",
    duration: 200,
    delay: 40,
    trigger: "enters viewport",
    states: ["offscreen", "entering", "visible"],
    reducedMotion: "Keep opacity change only or remove reveal entirely.",
    engineeringNotes: "Keep movement subtle. Prefer opacity and small translate while preserving stable page chrome.",
    prototype: "scroll"
  },
  carousel: {
    label: "Carousel",
    intent: "Sibling continuity",
    pattern: "shared-axis-x",
    easing: "cubic-bezier(0.2, 0, 0, 1)",
    duration: 280,
    delay: 0,
    trigger: "swipe, tap arrows, auto advance",
    states: ["active", "leaving", "entering-sibling"],
    reducedMotion: "Remove travel-heavy motion. Use a fast crossfade or snap with subtle opacity.",
    engineeringNotes: "Treat items as sibling surfaces and keep direction consistent.",
    prototype: "carousel"
  }
};

const patternLabels = {
  "container-transform": "Container transform",
  "shared-axis-x": "Shared axis X",
  "shared-axis-z": "Shared axis Z",
  "fade-through": "Fade through",
  fade: "Fade",
  "micro-interaction": "Micro interaction"
};

const easingLabels = {
  "cubic-bezier(0.2, 0, 0, 1)": "Standard",
  "cubic-bezier(0.05, 0.7, 0.1, 1)": "Emphasized",
  "cubic-bezier(0.3, 0, 0.8, 0.15)": "Emphasized accelerate"
};

const els = {
  sidebar: document.getElementById("sidebar"),
  toggleSidebar: document.getElementById("toggleSidebar"),
  screenList: document.getElementById("screenList"),
  newScreen: document.getElementById("newScreen"),
  importJson: document.getElementById("importJson"),
  stageEyebrow: document.getElementById("stageEyebrow"),
  stageTitle: document.getElementById("stageTitle"),
  stageSubtitle: document.getElementById("stageSubtitle"),
  modeTabs: document.getElementById("modeTabs"),
  breakpointSwitcher: document.getElementById("breakpointSwitcher"),
  deviceStage: document.getElementById("deviceStage"),
  deviceLabel: document.getElementById("deviceLabel"),
  stageContent: document.getElementById("stageContent"),
  sourceSection: document.getElementById("sourceSection"),
  analyzeSection: document.getElementById("analyzeSection"),
  confirmSection: document.getElementById("confirmSection"),
  handoffSection: document.getElementById("handoffSection"),
  screenName: document.getElementById("screenName"),
  screenFigmaUrl: document.getElementById("screenFigmaUrl"),
  screenImage: document.getElementById("screenImage"),
  screenPrompt: document.getElementById("screenPrompt"),
  analyzeScreen: document.getElementById("analyzeScreen"),
  deleteScreen: document.getElementById("deleteScreen"),
  resetAnalysis: document.getElementById("resetAnalysis"),
  categoryGrid: document.getElementById("categoryGrid"),
  analysisSummary: document.getElementById("analysisSummary"),
  analysisList: document.getElementById("analysisList"),
  addComponent: document.getElementById("addComponent"),
  componentName: document.getElementById("componentName"),
  componentCategory: document.getElementById("componentCategory"),
  componentVerification: document.getElementById("componentVerification"),
  componentIntent: document.getElementById("componentIntent"),
  componentPattern: document.getElementById("componentPattern"),
  componentEasing: document.getElementById("componentEasing"),
  componentDuration: document.getElementById("componentDuration"),
  componentDelay: document.getElementById("componentDelay"),
  componentTrigger: document.getElementById("componentTrigger"),
  componentStates: document.getElementById("componentStates"),
  reducedMotion: document.getElementById("reducedMotion"),
  engineeringNotes: document.getElementById("engineeringNotes"),
  saveComponent: document.getElementById("saveComponent"),
  deleteComponent: document.getElementById("deleteComponent"),
  playPrototype: document.getElementById("playPrototype"),
  handoffSummary: document.getElementById("handoffSummary"),
  handoffReadable: document.getElementById("handoffReadable"),
  handoffJson: document.getElementById("handoffJson"),
  copyJson: document.getElementById("copyJson")
};

const state = loadState();

function defaultState() {
  const screen = createScreen({ name: "New screen 1" });
  return {
    sidebarCollapsed: false,
    mode: "analyze",
    breakpoint: "mobile",
    selectedScreenId: screen.id,
    selectedComponentId: null,
    screens: [screen]
  };
}

function createScreen(partial = {}) {
  return {
    id: `screen-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 5)}`,
    name: partial.name || "New screen",
    figmaUrl: partial.figmaUrl || "",
    sourceImageData: partial.sourceImageData || "",
    prompt: partial.prompt || "",
    handoffReady: false,
    components: partial.components || []
  };
}

function createComponent(categoryKey, partial = {}) {
  const base = categoryCatalog[categoryKey];
  return {
    id: `component-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 5)}`,
    name: partial.name || base.label,
    category: categoryKey,
    verificationStatus: partial.verificationStatus || "unverified",
    intent: partial.intent || base.intent,
    pattern: partial.pattern || base.pattern,
    easing: partial.easing || base.easing,
    duration: partial.duration ?? base.duration,
    delay: partial.delay ?? base.delay,
    trigger: partial.trigger || base.trigger,
    states: partial.states || [...base.states],
    reducedMotion: partial.reducedMotion || base.reducedMotion,
    engineeringNotes: partial.engineeringNotes || base.engineeringNotes,
    prototype: partial.prototype || base.prototype,
    sourceLabel: partial.sourceLabel || "Suggested from static design"
  };
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState();
    const parsed = JSON.parse(raw);
    if (!parsed.screens?.length) return defaultState();
    return parsed;
  } catch {
    return defaultState();
  }
}

function persistState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function currentScreen() {
  return state.screens.find((screen) => screen.id === state.selectedScreenId) || state.screens[0];
}

function currentComponent() {
  const screen = currentScreen();
  return screen.components.find((component) => component.id === state.selectedComponentId) || null;
}

function parseFigmaUrl(url) {
  if (!url) return null;
  try {
    const parsed = new URL(url);
    if (!parsed.hostname.includes("figma.com")) return null;
    const parts = parsed.pathname.split("/").filter(Boolean);
    return {
      fileKey: parts[1] || "",
      nodeId: parsed.searchParams.get("node-id") || ""
    };
  } catch {
    return null;
  }
}

function ensureAtLeastOneScreen() {
  if (!state.screens.length) {
    const screen = createScreen({ name: "New screen 1" });
    state.screens = [screen];
    state.selectedScreenId = screen.id;
    state.selectedComponentId = null;
  }
}

function setMode(mode) {
  state.mode = mode;
  persistState();
  syncUI();
}

function setBreakpoint(breakpoint) {
  state.breakpoint = breakpoint;
  persistState();
  renderBreakpoint();
}

function selectScreen(screenId) {
  state.selectedScreenId = screenId;
  state.selectedComponentId = null;
  persistState();
  syncUI();
}

function selectComponent(componentId) {
  state.selectedComponentId = componentId;
  persistState();
  syncUI();
}

function helperCategories() {
  return Object.entries(categoryCatalog).map(([key, value]) => ({ key, ...value }));
}

function inferCategories(screen) {
  const text = `${screen.name} ${screen.prompt} ${screen.figmaUrl}`.toLowerCase();
  const suggestions = new Set();

  if (text.match(/button|cta|action|primary/)) suggestions.add("button");
  if (text.match(/page|transition|detail|back|route|screen/)) suggestions.add("page-transition");
  if (text.match(/menu|drawer|nav|navigation/)) suggestions.add("show-hide-menu");
  if (text.match(/scroll|viewport|reveal|appear/)) suggestions.add("scroll-appear");
  if (text.match(/carousel|rail|slider|swipe|trending/)) suggestions.add("carousel");

  if (!suggestions.size) {
    suggestions.add("button");
    suggestions.add("page-transition");
  }

  return Array.from(suggestions);
}

function analyzeScreen() {
  const screen = currentScreen();
  screen.name = els.screenName.value.trim() || "Untitled screen";
  screen.figmaUrl = els.screenFigmaUrl.value.trim();
  screen.prompt = els.screenPrompt.value.trim();

  if (!screen.figmaUrl && !screen.sourceImageData) {
    window.alert("Add a Figma link or upload an image first.");
    return;
  }

  const categoryKeys = inferCategories(screen);
  screen.components = categoryKeys.map((categoryKey) => createComponent(categoryKey));
  screen.handoffReady = false;
  state.selectedComponentId = screen.components[0]?.id || null;
  state.mode = "analyze";
  persistState();
  syncUI();
}

function addComponentManually() {
  const screen = currentScreen();
  const component = createComponent("button", { name: `New ${categoryCatalog.button.label}` });
  component.sourceLabel = "Added manually";
  screen.components.push(component);
  state.selectedComponentId = component.id;
  state.mode = "confirm";
  screen.handoffReady = false;
  persistState();
  syncUI();
}

function removeComponent() {
  const screen = currentScreen();
  const component = currentComponent();
  if (!component) return;
  screen.components = screen.components.filter((item) => item.id !== component.id);
  state.selectedComponentId = screen.components[0]?.id || null;
  refreshHandoffReady(screen);
  persistState();
  syncUI();
}

function removeScreen() {
  state.screens = state.screens.filter((screen) => screen.id !== state.selectedScreenId);
  ensureAtLeastOneScreen();
  if (!state.screens.some((screen) => screen.id === state.selectedScreenId)) {
    state.selectedScreenId = state.screens[0].id;
    state.selectedComponentId = null;
  }
  persistState();
  syncUI();
}

function resetAnalysis() {
  const screen = currentScreen();
  screen.components = [];
  screen.handoffReady = false;
  state.selectedComponentId = null;
  persistState();
  syncUI();
}

function refreshHandoffReady(screen) {
  screen.handoffReady = screen.components.length > 0 && screen.components.every((component) => component.verificationStatus === "confirmed");
}

function updateCurrentComponentFromInputs() {
  const component = currentComponent();
  const screen = currentScreen();
  if (!component) return;
  component.name = els.componentName.value.trim() || categoryCatalog[component.category].label;
  component.category = els.componentCategory.value;
  component.verificationStatus = els.componentVerification.value;
  component.intent = els.componentIntent.value.trim();
  component.pattern = els.componentPattern.value;
  component.easing = els.componentEasing.value;
  component.duration = Number(els.componentDuration.value) || categoryCatalog[component.category].duration;
  component.delay = Number(els.componentDelay.value) || 0;
  component.trigger = els.componentTrigger.value.trim();
  component.states = els.componentStates.value.split(",").map((item) => item.trim()).filter(Boolean);
  component.reducedMotion = els.reducedMotion.value.trim();
  component.engineeringNotes = els.engineeringNotes.value.trim();
  component.prototype = categoryCatalog[component.category].prototype;
  refreshHandoffReady(screen);
}

function applyCategoryTemplate(categoryKey) {
  const component = currentComponent();
  if (!component) return;
  const template = categoryCatalog[categoryKey];
  component.category = categoryKey;
  component.intent = template.intent;
  component.pattern = template.pattern;
  component.easing = template.easing;
  component.duration = template.duration;
  component.delay = template.delay;
  component.trigger = template.trigger;
  component.states = [...template.states];
  component.reducedMotion = template.reducedMotion;
  component.engineeringNotes = template.engineeringNotes;
  component.prototype = template.prototype;
  if (!component.name || component.name === categoryCatalog[component.category]?.label) {
    component.name = template.label;
  }
}

function saveComponent() {
  updateCurrentComponentFromInputs();
  persistState();
  syncUI();
}

function importJson() {
  const raw = window.prompt("Paste exported JSON");
  if (!raw) return;

  try {
    const parsed = JSON.parse(raw);
    const screen = createScreen({
      name: parsed.screen_name || "Imported screen",
      figmaUrl: parsed.source?.figma_url || "",
      sourceImageData: "",
      prompt: ""
    });

    screen.components = (parsed.components || []).map((component) =>
      createComponent(component.category, {
        name: component.component_name,
        verificationStatus: component.verification_status,
        intent: component.motion_intent,
        pattern: component.material_pattern,
        easing: component.easing_curve,
        duration: component.duration_ms,
        delay: component.delay_ms,
        trigger: component.trigger,
        states: component.states,
        reducedMotion: component.reduced_motion,
        engineeringNotes: component.engineering_notes
      })
    );

    refreshHandoffReady(screen);
    state.screens.push(screen);
    state.selectedScreenId = screen.id;
    state.selectedComponentId = screen.components[0]?.id || null;
    persistState();
    syncUI();
  } catch {
    window.alert("Could not parse JSON.");
  }
}

function handleImageUpload(event) {
  const file = event.target.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    currentScreen().sourceImageData = String(reader.result);
    currentScreen().handoffReady = false;
    persistState();
    syncUI();
  };
  reader.readAsDataURL(file);
}

function addScreen() {
  const screen = createScreen({ name: `New screen ${state.screens.length + 1}` });
  state.screens.push(screen);
  state.selectedScreenId = screen.id;
  state.selectedComponentId = null;
  state.mode = "analyze";
  persistState();
  syncUI();
}

function stageSummary(screen) {
  const imageState = screen.sourceImageData ? "Image loaded" : "No image loaded";
  const figmaMeta = parseFigmaUrl(screen.figmaUrl);
  const figmaState = figmaMeta ? `Figma linked (${figmaMeta.fileKey})` : screen.figmaUrl ? "Link attached" : "No Figma link";
  return `${imageState}. ${figmaState}.`;
}

function renderScreens() {
  els.sidebar.classList.toggle("collapsed", state.sidebarCollapsed);
  els.screenList.innerHTML = state.screens
    .map((screen) => {
      const active = screen.id === state.selectedScreenId;
      const status = screen.handoffReady ? "Ready for handoff" : screen.components.length ? "Needs confirmation" : "Unanalyzed";
      const tree = active && screen.components.length
        ? `
          <div class="component-tree">
            ${screen.components.map((component) => `
              <button class="component-item${component.id === state.selectedComponentId ? " active" : ""}" data-component-tree-id="${component.id}">
                <span class="component-copy">
                  <span class="component-name">${escapeHtml(component.name)}</span>
                  <span class="component-type">${escapeHtml(categoryCatalog[component.category].label)}</span>
                </span>
                <span class="component-status ${escapeHtml(component.verificationStatus)}">${escapeHtml(component.verificationStatus)}</span>
              </button>
            `).join("")}
          </div>
        `
        : "";
      return `
        <div class="screen-item${active ? " active" : ""}">
          <button class="screen-row" data-screen-id="${screen.id}">
            <span>
              <span class="screen-item-title">${escapeHtml(screen.name)}</span>
              <span class="screen-item-meta">${escapeHtml(status)}</span>
            </span>
            <span class="screen-status ${screen.handoffReady ? "ready" : ""}">${escapeHtml(status)}</span>
          </button>
          ${tree}
        </div>
      `;
    })
    .join("");

  els.screenList.querySelectorAll("[data-screen-id]").forEach((button) => {
    button.addEventListener("click", () => selectScreen(button.dataset.screenId));
  });

  els.screenList.querySelectorAll("[data-component-tree-id]").forEach((button) => {
    button.addEventListener("click", () => {
      state.selectedComponentId = button.dataset.componentTreeId;
      state.mode = "confirm";
      persistState();
      syncUI();
    });
  });
}

function renderCategoryGrid(screen) {
  const active = new Set(screen.components.map((component) => component.category));
  els.categoryGrid.innerHTML = helperCategories()
    .map((category) => `
      <button class="category-card${active.has(category.key) ? " active" : ""}" data-category="${category.key}">
        <span class="category-title">${escapeHtml(category.label)}</span>
        <span class="category-copy">${escapeHtml(category.intent)}</span>
      </button>
    `)
    .join("");

  els.categoryGrid.querySelectorAll("[data-category]").forEach((button) => {
    button.addEventListener("click", () => {
      const existing = screen.components.find((component) => component.category === button.dataset.category);
      if (existing) {
        state.selectedComponentId = existing.id;
        state.mode = "confirm";
      } else {
        const component = createComponent(button.dataset.category);
        component.sourceLabel = "Added from common component library";
        screen.components.push(component);
        state.selectedComponentId = component.id;
        screen.handoffReady = false;
        state.mode = "confirm";
      }
      persistState();
      syncUI();
    });
  });
}

function renderAnalysisList(screen) {
  const summaryPrefix = screen.components.length
    ? `${screen.components.length} semantic component suggestions generated.`
    : "No components generated yet.";
  els.analysisSummary.textContent = `${summaryPrefix} ${stageSummary(screen)}`;

  els.analysisList.innerHTML = screen.components
    .map((component) => `
      <button class="analysis-card${component.id === state.selectedComponentId ? " active" : ""}" data-component-id="${component.id}">
        <div class="analysis-card-top">
          <span class="analysis-card-title">${escapeHtml(component.name)}</span>
          <span class="analysis-card-status">${escapeHtml(component.verificationStatus)}</span>
        </div>
        <div class="analysis-card-copy">${escapeHtml(categoryCatalog[component.category].label)} · ${escapeHtml(component.intent)}</div>
        <div class="analysis-card-copy">${escapeHtml(component.sourceLabel)}</div>
      </button>
    `)
    .join("");

  els.analysisList.querySelectorAll("[data-component-id]").forEach((button) => {
    button.addEventListener("click", () => {
      selectComponent(button.dataset.componentId);
      setMode("confirm");
    });
  });
}

function renderConfirmForm(component) {
  if (!component) {
    els.confirmSection.classList.add("hidden");
    return;
  }
  els.confirmSection.classList.remove("hidden");
  els.componentCategory.innerHTML = helperCategories()
    .map((category) => `<option value="${category.key}">${escapeHtml(category.label)}</option>`)
    .join("");

  els.componentName.value = component.name;
  els.componentCategory.value = component.category;
  els.componentVerification.value = component.verificationStatus;
  els.componentIntent.value = component.intent;
  els.componentPattern.value = component.pattern;
  els.componentEasing.value = component.easing;
  els.componentDuration.value = component.duration;
  els.componentDelay.value = component.delay;
  els.componentTrigger.value = component.trigger;
  els.componentStates.value = component.states.join(", ");
  els.reducedMotion.value = component.reducedMotion;
  els.engineeringNotes.value = component.engineeringNotes;
}

function readableSpec(screen, component) {
  return `
    <div class="spec-line"><strong>Screen:</strong> ${escapeHtml(screen.name)}</div>
    <div class="spec-line"><strong>Component:</strong> ${escapeHtml(component.name)}</div>
    <div class="spec-line"><strong>Category:</strong> ${escapeHtml(categoryCatalog[component.category].label)}</div>
    <div class="spec-line"><strong>Verification:</strong> ${escapeHtml(component.verificationStatus)}</div>
    <div class="spec-line"><strong>Intent:</strong> ${escapeHtml(component.intent)}</div>
    <div class="spec-line"><strong>Pattern:</strong> ${escapeHtml(patternLabels[component.pattern] || component.pattern)}</div>
    <div class="spec-line"><strong>Easing:</strong> ${escapeHtml(easingLabels[component.easing] || component.easing)} ${escapeHtml(component.easing)}</div>
    <div class="spec-line"><strong>Duration:</strong> ${component.duration}ms</div>
    <div class="spec-line"><strong>Delay:</strong> ${component.delay}ms</div>
    <div class="spec-line"><strong>Trigger:</strong> ${escapeHtml(component.trigger)}</div>
    <div class="spec-line"><strong>States:</strong> ${escapeHtml(component.states.join(", "))}</div>
    <div class="spec-line"><strong>Reduced motion:</strong> ${escapeHtml(component.reducedMotion)}</div>
    <div class="spec-line"><strong>Engineering notes:</strong> ${escapeHtml(component.engineeringNotes)}</div>
  `;
}

function exportPayload(screen) {
  const confirmed = screen.components.filter((component) => component.verificationStatus === "confirmed");
  return {
    screen_name: screen.name,
    handoff_ready: screen.handoffReady,
    source: {
      figma_url: screen.figmaUrl || "",
      image_present: Boolean(screen.sourceImageData)
    },
    components: confirmed.map((component) => ({
      component_name: component.name,
      category: component.category,
      verification_status: component.verificationStatus,
      motion_intent: component.intent,
      material_pattern: component.pattern,
      easing_name: easingLabels[component.easing] || "Custom",
      easing_curve: component.easing,
      duration_ms: component.duration,
      delay_ms: component.delay,
      trigger: component.trigger,
      states: component.states,
      reduced_motion: component.reducedMotion,
      engineering_notes: component.engineeringNotes
    }))
  };
}

function renderHandoff(screen) {
  const confirmed = screen.components.filter((component) => component.verificationStatus === "confirmed");
  const blocked = screen.components.filter((component) => component.verificationStatus !== "confirmed");

  els.handoffSummary.textContent = confirmed.length
    ? `${confirmed.length} confirmed components ready for handoff. ${blocked.length} still blocked from export.`
    : "No confirmed components yet. Confirm components before handoff export.";

  els.handoffReadable.innerHTML = confirmed.length
    ? confirmed.map((component) => `<section class="handoff-card">${readableSpec(screen, component)}</section>`).join("")
    : `<div class="empty-copy">Confirm components in the Confirm step before handoff becomes available.</div>`;

  els.handoffJson.textContent = JSON.stringify(exportPayload(screen), null, 2);
}

function renderBreakpoint() {
  els.deviceStage.className = `device-stage ${state.breakpoint}`;
  els.deviceLabel.textContent = `${capitalize(state.breakpoint)} preview`;
  els.breakpointSwitcher.querySelectorAll("[data-breakpoint]").forEach((button) => {
    button.classList.toggle("active", button.dataset.breakpoint === state.breakpoint);
  });
}

function prototypeMarkup(component) {
  const label = categoryCatalog[component.category].label;
  const commonHeader = `<div class="prototype-label">Working prototype · ${escapeHtml(label)}</div>`;

  switch (component.prototype) {
    case "button":
      return `
        <div class="prototype-card replay-target">
          ${commonHeader}
          <button class="prototype-button">Primary action</button>
        </div>
      `;
    case "page":
      return `
        <div class="prototype-card replay-target">
          ${commonHeader}
          <div class="prototype-page">
            <div class="prototype-block large"></div>
            <div class="prototype-block"></div>
            <div class="prototype-block"></div>
          </div>
        </div>
      `;
    case "menu":
      return `
        <div class="prototype-card replay-target">
          ${commonHeader}
          <div class="prototype-menu">
            <div class="prototype-menu-panel"></div>
            <div class="prototype-menu-lines">
              <div class="prototype-line"></div>
              <div class="prototype-line"></div>
              <div class="prototype-line short"></div>
            </div>
          </div>
        </div>
      `;
    case "scroll":
      return `
        <div class="prototype-card replay-target">
          ${commonHeader}
          <div class="prototype-scroll">
            <div class="prototype-reveal"></div>
            <div class="prototype-reveal delayed"></div>
            <div class="prototype-reveal delayed-more"></div>
          </div>
        </div>
      `;
    case "carousel":
      return `
        <div class="prototype-card replay-target">
          ${commonHeader}
          <div class="prototype-carousel">
            <div class="prototype-slide active"></div>
            <div class="prototype-slide"></div>
            <div class="prototype-slide"></div>
          </div>
        </div>
      `;
    default:
      return `<div class="prototype-card replay-target">${commonHeader}</div>`;
  }
}

function renderSourceReference(screen, component) {
  const figmaMeta = parseFigmaUrl(screen.figmaUrl);
  const sourceMeta = figmaMeta
    ? `<div class="source-meta">Figma source: ${escapeHtml(figmaMeta.fileKey)}${figmaMeta.nodeId ? ` · node ${escapeHtml(figmaMeta.nodeId)}` : ""}</div>`
    : screen.figmaUrl
      ? `<div class="source-meta">Link attached as metadata.</div>`
      : `<div class="source-meta">No Figma link attached.</div>`;

  const overlay = component
    ? `<div class="source-overlay-banner">${escapeHtml(component.name)}</div>`
    : "";

  if (screen.sourceImageData) {
    return `
      <section class="source-panel">
        <div class="eyebrow">Original Design</div>
        ${sourceMeta}
        <div class="source-image-shell">
          <img class="source-image" src="${screen.sourceImageData}" alt="${escapeHtml(screen.name)}">
          ${overlay}
        </div>
      </section>
    `;
  }

  return `
    <section class="source-panel">
      <div class="eyebrow">Original Design</div>
      ${sourceMeta}
      <div class="source-empty">
        Upload a static image from Figma to establish the visual truth for this screen.
      </div>
    </section>
  `;
}

function renderStage() {
  const screen = currentScreen();
  const component = currentComponent();

  if (state.mode === "analyze") {
    els.stageContent.innerHTML = `
      <div class="stage-layout">
        ${renderSourceReference(screen, null)}
        <section class="working-panel">
          <div class="eyebrow">Analyze</div>
          <div class="working-copy">Use the common component library to decide which motion-relevant parts of this screen should be handed off. The image stays the visual truth.</div>
          <div class="working-list">
            ${screen.components.map((item) => `
              <button class="working-item${item.id === state.selectedComponentId ? " active" : ""}" data-stage-component="${item.id}">
                <span>${escapeHtml(item.name)}</span>
                <span>${escapeHtml(item.verificationStatus)}</span>
              </button>
            `).join("") || `<div class="empty-copy">No components suggested yet. Run Analyze screen first.</div>`}
          </div>
        </section>
      </div>
    `;
  } else if (state.mode === "confirm") {
    els.stageContent.innerHTML = component
      ? `
        <div class="stage-layout side-by-side">
          ${renderSourceReference(screen, component)}
          <section class="working-panel">
            <div class="eyebrow">Working Prototype</div>
            <div class="working-copy">This HTML is a working prototype used to discuss motion and handoff. It is not treated as the visual source of truth.</div>
            ${prototypeMarkup(component)}
          </section>
        </div>
      `
      : `
        <div class="empty-stage">
          <div class="empty-title">Choose a component</div>
          <div class="empty-copy">Select a suggested component to confirm its semantic meaning and motion details.</div>
        </div>
      `;
  } else {
    els.stageContent.innerHTML = `
      <div class="stage-layout">
        ${renderSourceReference(screen, null)}
        <section class="working-panel">
          <div class="eyebrow">Handoff Status</div>
          <div class="working-copy">${screen.handoffReady ? "All components are confirmed and ready for developer handoff." : "Some components are still unverified or need correction, so export remains partial."}</div>
          <div class="working-list">
            ${screen.components.map((item) => `
              <div class="working-item static">
                <span>${escapeHtml(item.name)}</span>
                <span>${escapeHtml(item.verificationStatus)}</span>
              </div>
            `).join("") || `<div class="empty-copy">No components available for handoff yet.</div>`}
          </div>
        </section>
      </div>
    `;
  }

  els.stageContent.querySelectorAll("[data-stage-component]").forEach((button) => {
    button.addEventListener("click", () => selectComponent(button.dataset.stageComponent));
  });
}

function renderStageHeader(screen) {
  els.stageTitle.textContent = screen.name;
  els.stageEyebrow.textContent = capitalize(state.mode);

  if (state.mode === "analyze") {
    els.stageSubtitle.textContent = "Import a static design, detect common motion-relevant components, and decide what should move into semantic review.";
  } else if (state.mode === "confirm") {
    els.stageSubtitle.textContent = "Confirm the component type, then tune its Material Motion 3 handoff values. The HTML stays a working prototype.";
  } else {
    els.stageSubtitle.textContent = "Export only confirmed components as readable developer handoff and JSON.";
  }
}

function syncSourceForm(screen) {
  els.screenName.value = screen.name;
  els.screenFigmaUrl.value = screen.figmaUrl;
  els.screenPrompt.value = screen.prompt;
}

function syncInspector(screen, component) {
  const analyzeMode = state.mode === "analyze";
  const confirmMode = state.mode === "confirm";
  const handoffMode = state.mode === "handoff";

  els.sourceSection.classList.toggle("hidden", !analyzeMode);
  els.analyzeSection.classList.toggle("hidden", !analyzeMode);
  els.confirmSection.classList.toggle("hidden", !confirmMode);
  els.handoffSection.classList.toggle("hidden", !handoffMode);

  els.modeTabs.querySelectorAll("[data-mode]").forEach((button) => {
    button.classList.toggle("active", button.dataset.mode === state.mode);
  });

  syncSourceForm(screen);
  renderCategoryGrid(screen);
  renderAnalysisList(screen);
  renderConfirmForm(component);
  renderHandoff(screen);
}

function syncUI() {
  ensureAtLeastOneScreen();
  const screen = currentScreen();
  const component = currentComponent();
  renderScreens();
  renderBreakpoint();
  renderStageHeader(screen);
  syncInspector(screen, component);
  renderStage();
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

function replayPrototype() {
  const node = document.querySelector(".replay-target");
  if (!node) return;
  node.classList.remove("replay");
  void node.offsetWidth;
  node.classList.add("replay");
}

function copyJson() {
  const screen = currentScreen();
  const confirmed = screen.components.some((component) => component.verificationStatus === "confirmed");
  if (!confirmed) {
    window.alert("Confirm at least one component before copying JSON.");
    return;
  }
  navigator.clipboard.writeText(els.handoffJson.textContent).catch(() => {
    window.alert("Could not copy JSON.");
  });
}

function bindEvents() {
  els.toggleSidebar.addEventListener("click", () => {
    state.sidebarCollapsed = !state.sidebarCollapsed;
    persistState();
    renderScreens();
  });

  els.newScreen.addEventListener("click", addScreen);
  els.importJson.addEventListener("click", importJson);
  els.analyzeScreen.addEventListener("click", analyzeScreen);
  els.addComponent.addEventListener("click", addComponentManually);
  els.deleteComponent.addEventListener("click", removeComponent);
  els.deleteScreen.addEventListener("click", removeScreen);
  els.resetAnalysis.addEventListener("click", resetAnalysis);
  els.playPrototype.addEventListener("click", replayPrototype);
  els.copyJson.addEventListener("click", copyJson);
  els.screenImage.addEventListener("change", handleImageUpload);

  [els.screenName, els.screenFigmaUrl, els.screenPrompt].forEach((input) => {
    input.addEventListener("input", () => {
      const screen = currentScreen();
      screen.name = els.screenName.value.trim() || screen.name;
      screen.figmaUrl = els.screenFigmaUrl.value.trim();
      screen.prompt = els.screenPrompt.value.trim();
      screen.handoffReady = false;
      persistState();
      renderStageHeader(screen);
      renderAnalysisList(screen);
      renderStage();
    });
  });

  els.componentCategory.addEventListener("input", () => {
    applyCategoryTemplate(els.componentCategory.value);
    saveComponent();
  });

  [
    els.componentName,
    els.componentVerification,
    els.componentIntent,
    els.componentPattern,
    els.componentEasing,
    els.componentDuration,
    els.componentDelay,
    els.componentTrigger,
    els.componentStates,
    els.reducedMotion,
    els.engineeringNotes
  ].forEach((input) => {
    input.addEventListener("input", saveComponent);
  });

  els.modeTabs.querySelectorAll("[data-mode]").forEach((button) => {
    button.addEventListener("click", () => setMode(button.dataset.mode));
  });

  els.breakpointSwitcher.querySelectorAll("[data-breakpoint]").forEach((button) => {
    button.addEventListener("click", () => setBreakpoint(button.dataset.breakpoint));
  });
}

bindEvents();
syncUI();
