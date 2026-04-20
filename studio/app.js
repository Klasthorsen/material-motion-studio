const STORAGE_KEY = "material-motion-studio-state-v2";

const presets = {
  "container-transform": {
    label: "Container transform",
    duration: 320,
    easing: "cubic-bezier(0.4, 0, 0.2, 1)",
    distance: 0,
    scale: 0.92,
    opacity: 0.08,
    stagger: 20,
    family: "Container",
    guidance: [
      "Use when one surface becomes another and continuity matters.",
      "Material Container Transform is meant to transform one container to another.",
      "Good fit for metric cards opening richer analytics detail."
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
    family: "Shared axis",
    guidance: [
      "Use for sibling views with a navigational relationship.",
      "Material Shared Axis on X slides and fades the target horizontally.",
      "Good fit for tab switches and peer dashboard views."
    ]
  },
  "shared-axis-z": {
    label: "Shared axis Z",
    duration: 290,
    easing: "cubic-bezier(0.4, 0, 0.2, 1)",
    distance: 0,
    scale: 0.9,
    opacity: 0,
    stagger: 25,
    family: "Shared axis",
    guidance: [
      "Use when entering or leaving hierarchy.",
      "Material Shared Axis on Z scales and fades instead of sliding.",
      "Good fit for drill-downs from chart or segment into detail."
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
    family: "Fade through",
    guidance: [
      "Use when outgoing and incoming content do not have a strong spatial relationship.",
      "Material Fade Through sequentially fades out old content and fades in new content.",
      "Good fit for filters, date range swaps, and alternate analytical cuts."
    ]
  },
  "fade": {
    label: "Fade",
    duration: 190,
    easing: "cubic-bezier(0, 0, 0.2, 1)",
    distance: 0,
    scale: 0.98,
    opacity: 0,
    stagger: 15,
    family: "Fade",
    guidance: [
      "Use for elements that enter or exit within the current screen bounds.",
      "Suitable for tooltips, lightweight overlays, or inline status.",
      "Keep the rest of the layout stable."
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
    family: "Effects",
    guidance: [
      "Use for small recurring interactions such as pressed, hover, and selection.",
      "Best paired with the standard motion scheme for utilitarian UI.",
      "Keep motion brief so it never blocks reading or task flow."
    ]
  }
};

const libraryCards = [
  {
    title: "Container transform",
    pattern: "One surface becomes another",
    body: "Transforms one container to another and preserves continuity across hierarchy changes."
  },
  {
    title: "Shared axis X",
    pattern: "Sibling navigation",
    body: "Slides and fades horizontally to explain movement between peer views."
  },
  {
    title: "Shared axis Z",
    pattern: "Hierarchy",
    body: "Scales and fades to reinforce moving deeper into, or back out of, structure."
  },
  {
    title: "Fade through",
    pattern: "Content replacement",
    body: "Sequentially replaces content when continuity between surfaces is weak."
  }
];

const state = loadState();

const els = {
  projectSelect: document.getElementById("projectSelect"),
  newProjectName: document.getElementById("newProjectName"),
  createProject: document.getElementById("createProject"),
  figmaImport: document.getElementById("figmaImport"),
  importFigma: document.getElementById("importFigma"),
  sourceMode: document.getElementById("sourceMode"),
  sourceFrameUrl: document.getElementById("sourceFrameUrl"),
  sourceImage: document.getElementById("sourceImage"),
  sourcePreview: document.getElementById("sourcePreview"),
  prototypePrompt: document.getElementById("prototypePrompt"),
  generatePrototype: document.getElementById("generatePrototype"),
  applyPrototypeSuggestion: document.getElementById("applyPrototypeSuggestion"),
  prototypeMeta: document.getElementById("prototypeMeta"),
  prototypePreview: document.getElementById("prototypePreview"),
  prototypeCode: document.getElementById("prototypeCode"),
  componentName: document.getElementById("componentName"),
  figmaUrl: document.getElementById("figmaUrl"),
  componentType: document.getElementById("componentType"),
  relationship: document.getElementById("relationship"),
  prominence: document.getElementById("prominence"),
  motionRole: document.getElementById("motionRole"),
  recommendMotion: document.getElementById("recommendMotion"),
  saveComponent: document.getElementById("saveComponent"),
  preset: document.getElementById("preset"),
  duration: document.getElementById("duration"),
  easing: document.getElementById("easing"),
  distance: document.getElementById("distance"),
  scale: document.getElementById("scale"),
  opacity: document.getElementById("opacity"),
  stagger: document.getElementById("stagger"),
  presetLabel: document.getElementById("presetLabel"),
  guidanceList: document.getElementById("guidanceList"),
  componentList: document.getElementById("componentList"),
  guidelineOutput: document.getElementById("guidelineOutput"),
  selectedComponentName: document.getElementById("selectedComponentName"),
  summaryProject: document.getElementById("summaryProject"),
  summaryPattern: document.getElementById("summaryPattern"),
  summaryScheme: document.getElementById("summaryScheme"),
  summaryRole: document.getElementById("summaryRole"),
  replay: document.getElementById("replay"),
  copySpec: document.getElementById("copySpec"),
  libraryGrid: document.getElementById("libraryGrid")
};

const valueEls = {
  duration: document.getElementById("durationValue"),
  distance: document.getElementById("distanceValue"),
  scale: document.getElementById("scaleValue"),
  opacity: document.getElementById("opacityValue"),
  stagger: document.getElementById("staggerValue")
};

function defaultState() {
  return {
    projects: [
      {
        id: "core-analytics",
        name: "Core analytics",
        components: [
          {
            id: "conversion-kpi-card",
            name: "Conversion KPI card",
            figmaUrl: "",
            sourceMode: "figma",
            sourceFrameUrl: "",
            sourceImageData: "",
            prototypePrompt: "",
            componentType: "metric-card",
            relationship: "container",
            prominence: "standard",
            motionRole: "spatial",
            preset: "container-transform",
            spec: presetSnapshot("container-transform")
          }
        ]
      }
    ],
    selectedProjectId: "core-analytics",
    selectedComponentId: "conversion-kpi-card"
  };
}

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : defaultState();
  } catch (error) {
    return defaultState();
  }
}

function persistState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function presetSnapshot(presetKey) {
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

function currentProject() {
  return state.projects.find((project) => project.id === state.selectedProjectId) || state.projects[0];
}

function currentComponent() {
  const project = currentProject();
  return project?.components.find((component) => component.id === state.selectedComponentId) || project?.components[0];
}

function slugify(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function recommendPreset({ relationship, componentType, prominence, motionRole }) {
  if (motionRole === "effects") {
    return "micro-interaction";
  }
  if (relationship === "container") {
    return "container-transform";
  }
  if (relationship === "sibling") {
    return "shared-axis-x";
  }
  if (relationship === "hierarchy") {
    return "shared-axis-z";
  }
  if (relationship === "ephemeral") {
    return componentType === "dialog-sheet" ? "fade" : "micro-interaction";
  }
  if (relationship === "swap") {
    return "fade-through";
  }
  return prominence === "expressive" ? "shared-axis-z" : "fade-through";
}

function recommendSpec(component) {
  const presetKey = recommendPreset(component);
  const base = { ...presetSnapshot(presetKey) };

  if (component.prominence === "expressive") {
    base.duration = Math.min(420, base.duration + 20);
    base.scale = Math.max(0.88, base.scale - 0.01);
  }

  if (component.componentType === "chart-panel") {
    base.stagger = Math.min(40, base.stagger + 5);
  }

  if (component.componentType === "filter-group") {
    base.duration = Math.min(base.duration, 220);
  }

  return { preset: presetKey, spec: base };
}

function renderProjects() {
  els.projectSelect.innerHTML = state.projects
    .map((project) => `<option value="${project.id}">${project.name}</option>`)
    .join("");
  els.projectSelect.value = state.selectedProjectId;
}

function renderLibrary() {
  els.libraryGrid.innerHTML = libraryCards
    .map(
      (card) => `
        <article class="library-card">
          <div class="eyebrow">${card.pattern}</div>
          <h3>${card.title}</h3>
          <p>${card.body}</p>
        </article>
      `
    )
    .join("");
}

function renderComponents() {
  const project = currentProject();
  els.componentList.innerHTML = project.components
    .map((component) => {
      const active = component.id === state.selectedComponentId ? " active" : "";
      const preset = presets[component.preset];
      return `
        <button class="component-item${active}" data-component-id="${component.id}">
          <span class="component-name">${component.name}</span>
          <span class="component-meta">${component.componentType} · ${preset.label}</span>
        </button>
      `;
    })
    .join("");

  els.componentList.querySelectorAll("[data-component-id]").forEach((button) => {
    button.addEventListener("click", () => {
      state.selectedComponentId = button.dataset.componentId;
      persistState();
      syncUIFromSelectedComponent();
      renderComponents();
    });
  });
}

function setMotionControls(spec, presetKey) {
  els.preset.value = presetKey;
  els.duration.value = spec.duration;
  els.easing.value = spec.easing;
  els.distance.value = spec.distance;
  els.scale.value = spec.scale;
  els.opacity.value = spec.opacity;
  els.stagger.value = spec.stagger;
  updateLabels();
}

function syncUIFromSelectedComponent() {
  const component = currentComponent();
  const project = currentProject();
  if (!component) return;

  els.sourceMode.value = component.sourceMode || "figma";
  els.sourceFrameUrl.value = component.sourceFrameUrl || component.figmaUrl || "";
  els.prototypePrompt.value = component.prototypePrompt || "";
  els.componentName.value = component.name;
  els.figmaUrl.value = component.figmaUrl || "";
  els.componentType.value = component.componentType;
  els.relationship.value = component.relationship;
  els.prominence.value = component.prominence;
  els.motionRole.value = component.motionRole;
  setMotionControls(component.spec, component.preset);
  applyMotionVariables();

  els.selectedComponentName.textContent = component.name;
  els.summaryProject.textContent = project.name;
  els.summaryPattern.textContent = presets[component.preset].label;
  els.summaryScheme.textContent = capitalize(component.prominence);
  els.summaryRole.textContent = capitalize(component.motionRole);
  renderSourcePreview(component);
  renderPrototype(component);
  renderGuideline(component);
}

function updateLabels() {
  valueEls.duration.textContent = `${els.duration.value} ms`;
  valueEls.distance.textContent = `${els.distance.value} px`;
  valueEls.scale.textContent = Number(els.scale.value).toFixed(2);
  valueEls.opacity.textContent = Number(els.opacity.value).toFixed(2);
  valueEls.stagger.textContent = `${els.stagger.value} ms`;
}

function capitalize(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function applyMotionVariables() {
  const root = document.documentElement;
  root.style.setProperty("--duration", `${els.duration.value}ms`);
  root.style.setProperty("--easing", els.easing.value);
  root.style.setProperty("--scale-start", els.scale.value);
  root.style.setProperty("--opacity-start", els.opacity.value);
  root.style.setProperty("--stagger", `${els.stagger.value}ms`);

  const presetKey = els.preset.value;
  const preset = presets[presetKey];
  els.presetLabel.textContent = preset.label;
  els.guidanceList.innerHTML = [
    ...preset.guidance,
    `Recommended scheme: ${capitalize(els.prominence.value)}.`,
    `Recommended role: ${capitalize(els.motionRole.value)}.`
  ].map((item) => `<li>${item}</li>`).join("");

  const distance = Number(els.distance.value);
  document.querySelectorAll("[data-demo='tabs'] .motion-target").forEach((node) => {
    node.style.setProperty("--x-start", `${distance}px`);
    node.style.setProperty("--y-start", "0px");
  });
  document.querySelectorAll("[data-demo='kpi'] .motion-target, [data-demo='filters'] .motion-target").forEach((node) => {
    node.style.setProperty("--x-start", "0px");
    node.style.setProperty("--y-start", "0px");
  });

  els.summaryPattern.textContent = preset.label;
  els.summaryScheme.textContent = capitalize(els.prominence.value);
  els.summaryRole.textContent = capitalize(els.motionRole.value);
}

function replayAnimation(scope) {
  const container = scope || document;
  const motionTargets = container.querySelectorAll(".motion-target");
  const staggerTargets = container.querySelectorAll(".stagger-target");

  motionTargets.forEach((node) => {
    node.classList.remove("animate");
    void node.offsetWidth;
    node.classList.add("animate");
  });

  staggerTargets.forEach((node, index) => {
    node.classList.remove("animate");
    node.style.animationDelay = `${index * Number(els.stagger.value)}ms`;
    void node.offsetWidth;
    node.classList.add("animate");
  });
}

function readFormComponent() {
  return {
    name: els.componentName.value.trim() || "Untitled component",
    figmaUrl: els.figmaUrl.value.trim(),
    sourceMode: els.sourceMode.value,
    sourceFrameUrl: els.sourceFrameUrl.value.trim(),
    componentType: els.componentType.value,
    relationship: els.relationship.value,
    prominence: els.prominence.value,
    motionRole: els.motionRole.value
  };
}

function saveCurrentComponent() {
  const project = currentProject();
  const component = currentComponent();
  const next = readFormComponent();

  component.name = next.name;
  component.figmaUrl = next.figmaUrl;
  component.sourceMode = next.sourceMode;
  component.sourceFrameUrl = next.sourceFrameUrl;
  component.prototypePrompt = els.prototypePrompt.value.trim();
  component.componentType = next.componentType;
  component.relationship = next.relationship;
  component.prominence = next.prominence;
  component.motionRole = next.motionRole;
  component.preset = els.preset.value;
  component.spec = {
    duration: Number(els.duration.value),
    easing: els.easing.value,
    distance: Number(els.distance.value),
    scale: Number(els.scale.value),
    opacity: Number(els.opacity.value),
    stagger: Number(els.stagger.value)
  };

  project.components = project.components.map((item) => (item.id === component.id ? component : item));
  persistState();
  syncUIFromSelectedComponent();
  renderComponents();
}

function applyRecommendation() {
  const component = { ...readFormComponent() };
  const recommended = recommendSpec(component);
  setMotionControls(recommended.spec, recommended.preset);
  applyMotionVariables();
}

function createProject() {
  const name = els.newProjectName.value.trim();
  if (!name) return;

  const id = slugify(name);
  if (state.projects.some((project) => project.id === id)) {
    state.selectedProjectId = id;
    persistState();
    renderProjects();
    renderComponents();
    syncUIFromSelectedComponent();
    return;
  }

  const project = {
    id,
    name,
    components: []
  };
  state.projects.push(project);
  state.selectedProjectId = id;
  els.newProjectName.value = "";
  createComponent({
    name: "New motion component",
    figmaUrl: "",
    componentType: "metric-card",
    relationship: "container",
    prominence: "standard",
    motionRole: "spatial"
  });
}

function createComponent(componentInput) {
  const project = currentProject();
  const id = slugify(componentInput.name || `component-${project.components.length + 1}`) || `component-${project.components.length + 1}`;
  const recommended = recommendSpec(componentInput);
  const component = {
    id,
    name: componentInput.name,
    figmaUrl: componentInput.figmaUrl || "",
    sourceMode: componentInput.sourceMode || "figma",
    sourceFrameUrl: componentInput.sourceFrameUrl || componentInput.figmaUrl || "",
    sourceImageData: componentInput.sourceImageData || "",
    prototypePrompt: componentInput.prototypePrompt || "",
    componentType: componentInput.componentType || "metric-card",
    relationship: componentInput.relationship || "container",
    prominence: componentInput.prominence || "standard",
    motionRole: componentInput.motionRole || "spatial",
    preset: recommended.preset,
    spec: recommended.spec
  };

  project.components.push(component);
  state.selectedComponentId = component.id;
  persistState();
  renderProjects();
  renderComponents();
  syncUIFromSelectedComponent();
}

function importFromFigmaJSON() {
  const raw = els.figmaImport.value.trim();
  if (!raw) return;

  try {
    const data = JSON.parse(raw);
    createComponent({
      name: data.name || "Imported component",
      figmaUrl: data.figmaUrl || data.url || "",
      sourceMode: data.sourceMode || "figma",
      sourceFrameUrl: data.sourceFrameUrl || data.figmaUrl || data.url || "",
      sourceImageData: data.sourceImageData || "",
      prototypePrompt: data.prototypePrompt || "",
      componentType: data.componentType || "metric-card",
      relationship: data.relationship || "container",
      prominence: data.prominence || "standard",
      motionRole: data.motionRole || "spatial"
    });
    els.figmaImport.value = "";
  } catch (error) {
    window.alert("Could not parse the Figma JSON. Use a valid JSON object.");
  }
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function renderSourcePreview(component) {
  if (component.sourceImageData) {
    els.sourcePreview.innerHTML = `<img class="source-image" src="${component.sourceImageData}" alt="${escapeHtml(component.name)}">`;
    return;
  }

  if (component.sourceFrameUrl) {
    els.sourcePreview.innerHTML = `
      <div class="source-card">
        <div class="source-tag">Figma frame</div>
        <div class="source-url">${escapeHtml(component.sourceFrameUrl)}</div>
      </div>
    `;
    return;
  }

  els.sourcePreview.innerHTML = `<div class="source-placeholder">No frame image loaded yet.</div>`;
}

function derivePrototypeVariant(component, prompt) {
  const text = `${prompt} ${component.componentType} ${component.relationship}`.toLowerCase();
  if (text.includes("table") || text.includes("rows")) return "table";
  if (text.includes("compare") || text.includes("breakdown")) return "comparison";
  if (text.includes("detail") || text.includes("drill")) return "detail";
  if (component.componentType === "chart-panel") return "chart";
  if (component.componentType === "filter-group") return "filters";
  return "dashboard";
}

function buildPrototypeMarkup(component) {
  const prompt = component.prototypePrompt || "";
  const variant = derivePrototypeVariant(component, prompt);
  const title = escapeHtml(component.name);

  const templates = {
    dashboard: `
      <section class="proto-canvas">
        <header class="proto-header">
          <div>
            <div class="proto-eyebrow">HTML prototype</div>
            <h3>${title}</h3>
          </div>
          <span class="proto-chip">${escapeHtml(presets[component.preset].label)}</span>
        </header>
        <div class="proto-grid">
          <article class="proto-kpi">
            <span class="proto-label">Revenue</span>
            <strong>1.42M</strong>
            <span class="proto-trend">+8.4%</span>
          </article>
          <article class="proto-panel proto-panel-chart"></article>
          <article class="proto-panel proto-panel-bars"></article>
        </div>
      </section>
    `,
    chart: `
      <section class="proto-canvas">
        <header class="proto-header">
          <div>
            <div class="proto-eyebrow">HTML prototype</div>
            <h3>${title}</h3>
          </div>
          <span class="proto-chip">${escapeHtml(presets[component.preset].label)}</span>
        </header>
        <div class="proto-chart">
          <div class="proto-axis"></div>
          <div class="proto-line"></div>
          <div class="proto-bars">
            <span></span><span class="tall"></span><span class="mid"></span><span></span>
          </div>
        </div>
      </section>
    `,
    filters: `
      <section class="proto-canvas">
        <header class="proto-header">
          <div>
            <div class="proto-eyebrow">HTML prototype</div>
            <h3>${title}</h3>
          </div>
          <span class="proto-chip">${escapeHtml(presets[component.preset].label)}</span>
        </header>
        <div class="proto-filter-row">
          <span class="proto-filter active">Last 7 days</span>
          <span class="proto-filter">Last 30 days</span>
          <span class="proto-filter">Segment</span>
        </div>
        <div class="proto-grid proto-grid-tight">
          <article class="proto-panel proto-panel-bars"></article>
          <article class="proto-panel proto-panel-bars alt"></article>
        </div>
      </section>
    `,
    comparison: `
      <section class="proto-canvas">
        <header class="proto-header">
          <div>
            <div class="proto-eyebrow">HTML prototype</div>
            <h3>${title}</h3>
          </div>
          <span class="proto-chip">${escapeHtml(presets[component.preset].label)}</span>
        </header>
        <div class="proto-compare">
          <article class="proto-panel">
            <span class="proto-label">Current</span>
            <strong>48%</strong>
          </article>
          <article class="proto-panel">
            <span class="proto-label">Previous</span>
            <strong>41%</strong>
          </article>
        </div>
        <div class="proto-panel proto-panel-bars"></div>
      </section>
    `,
    detail: `
      <section class="proto-canvas">
        <header class="proto-header">
          <div>
            <div class="proto-eyebrow">HTML prototype</div>
            <h3>${title}</h3>
          </div>
          <span class="proto-chip">${escapeHtml(presets[component.preset].label)}</span>
        </header>
        <div class="proto-detail">
          <article class="proto-kpi large">
            <span class="proto-label">Conversion detail</span>
            <strong>12.4%</strong>
            <span class="proto-trend">Focus metric</span>
          </article>
          <article class="proto-panel proto-panel-chart"></article>
          <article class="proto-panel proto-panel-table"></article>
        </div>
      </section>
    `,
    table: `
      <section class="proto-canvas">
        <header class="proto-header">
          <div>
            <div class="proto-eyebrow">HTML prototype</div>
            <h3>${title}</h3>
          </div>
          <span class="proto-chip">${escapeHtml(presets[component.preset].label)}</span>
        </header>
        <div class="proto-table">
          <div class="proto-row head"></div>
          <div class="proto-row"></div>
          <div class="proto-row"></div>
          <div class="proto-row"></div>
        </div>
      </section>
    `
  };

  return { variant, markup: templates[variant] || templates.dashboard };
}

function renderPrototype(component) {
  const { variant, markup } = buildPrototypeMarkup(component);
  els.prototypePreview.innerHTML = markup;
  els.prototypeCode.value = markup.trim();
  els.prototypeMeta.innerHTML = `
    <div class="proto-meta-card">
      <span class="proto-meta-label">Variant</span>
      <strong>${capitalize(variant)}</strong>
    </div>
    <div class="proto-meta-card">
      <span class="proto-meta-label">Suggested pattern</span>
      <strong>${presets[component.preset].label}</strong>
    </div>
    <div class="proto-meta-card">
      <span class="proto-meta-label">Prompt tone</span>
      <strong>${component.prototypePrompt ? "Custom" : "Default"}</strong>
    </div>
  `;
}

function generatePrototype() {
  const component = currentComponent();
  component.prototypePrompt = els.prototypePrompt.value.trim();

  if (els.sourceFrameUrl.value.trim()) {
    component.sourceFrameUrl = els.sourceFrameUrl.value.trim();
    component.figmaUrl = els.figmaUrl.value.trim() || component.sourceFrameUrl;
  }

  component.sourceMode = els.sourceMode.value;
  const recommended = recommendSpec({
    ...component,
    prominence: els.prominence.value,
    motionRole: els.motionRole.value,
    relationship: els.relationship.value,
    componentType: els.componentType.value
  });

  component.preset = recommended.preset;
  component.spec = recommended.spec;
  setMotionControls(component.spec, component.preset);
  applyMotionVariables();
  renderSourcePreview(component);
  renderPrototype(component);
  renderGuideline(component);
  persistState();
}

function applyPrototypeSuggestion() {
  const component = currentComponent();
  const prompt = (els.prototypePrompt.value || "").toLowerCase();

  if (prompt.includes("hero") || prompt.includes("expressive")) {
    els.prominence.value = "expressive";
  }
  if (prompt.includes("subtle") || prompt.includes("utility")) {
    els.prominence.value = "standard";
  }
  if (prompt.includes("swap") || prompt.includes("replace")) {
    els.relationship.value = "swap";
  }
  if (prompt.includes("deeper") || prompt.includes("detail") || prompt.includes("drill")) {
    els.relationship.value = "hierarchy";
  }

  component.prototypePrompt = els.prototypePrompt.value.trim();
  applyRecommendation();
  renderPrototype({
    ...component,
    preset: els.preset.value,
    prototypePrompt: component.prototypePrompt
  });
  renderGuideline(component);
}

function renderGuideline(component) {
  const preset = presets[els.preset.value];
  const project = currentProject();
  const rationale = [
    ...preset.guidance,
    `Recommended scheme: ${capitalize(els.prominence.value)}.`,
    `Recommended role: ${capitalize(els.motionRole.value)}.`
  ];
  const output = [
    `Project: ${project.name}`,
    `Component: ${component.name}`,
    `Figma: ${component.figmaUrl || "Not set"}`,
    "",
    `Material motion scheme: ${capitalize(els.prominence.value)}`,
    `Motion role: ${capitalize(els.motionRole.value)}`,
    `Transition pattern: ${preset.label}`,
    `Transition family: ${preset.family}`,
    "",
    `Recommended spec`,
    `- Duration: ${els.duration.value} ms`,
    `- Easing: ${els.easing.value}`,
    `- Distance: ${els.distance.value} px`,
    `- Scale start: ${els.scale.value}`,
    `- Opacity start: ${els.opacity.value}`,
    `- Stagger: ${els.stagger.value} ms`,
    "",
    `Usage rationale`,
    ...rationale.map((line) => `- ${line}`)
  ].join("\n");

  els.guidelineOutput.value = output;
}

function handleImageUpload(event) {
  const file = event.target.files?.[0];
  const component = currentComponent();
  if (!file || !component) return;

  const reader = new FileReader();
  reader.onload = () => {
    component.sourceImageData = String(reader.result);
    component.sourceMode = "image";
    els.sourceMode.value = "image";
    renderSourcePreview(component);
    persistState();
  };
  reader.readAsDataURL(file);
}

function copySpec() {
  const component = currentComponent();
  const spec = {
    project: currentProject().name,
    component: component.name,
    figmaUrl: component.figmaUrl,
    scheme: els.prominence.value,
    motionRole: els.motionRole.value,
    pattern: els.preset.value,
    duration: Number(els.duration.value),
    easing: els.easing.value,
    distance: Number(els.distance.value),
    scaleStart: Number(els.scale.value),
    opacityStart: Number(els.opacity.value),
    stagger: Number(els.stagger.value)
  };

  navigator.clipboard.writeText(JSON.stringify(spec, null, 2)).then(() => {
    const original = els.copySpec.textContent;
    els.copySpec.textContent = "Copied";
    setTimeout(() => {
      els.copySpec.textContent = original;
    }, 1200);
  });
}

function initialize() {
  renderProjects();
  renderLibrary();

  const project = currentProject();
  if (!project.components.length) {
    createComponent({
      name: "New motion component",
      figmaUrl: "",
      componentType: "metric-card",
      relationship: "container",
      prominence: "standard",
      motionRole: "spatial"
    });
  } else {
    renderComponents();
    syncUIFromSelectedComponent();
  }

  els.projectSelect.addEventListener("change", () => {
    state.selectedProjectId = els.projectSelect.value;
    const project = currentProject();
    state.selectedComponentId = project.components[0]?.id || "";
    persistState();
    renderComponents();
    syncUIFromSelectedComponent();
  });

  els.createProject.addEventListener("click", createProject);
  els.importFigma.addEventListener("click", importFromFigmaJSON);
  els.generatePrototype.addEventListener("click", generatePrototype);
  els.applyPrototypeSuggestion.addEventListener("click", applyPrototypeSuggestion);
  els.sourceImage.addEventListener("change", handleImageUpload);
  els.recommendMotion.addEventListener("click", applyRecommendation);
  els.saveComponent.addEventListener("click", saveCurrentComponent);
  els.replay.addEventListener("click", () => replayAnimation());
  els.copySpec.addEventListener("click", copySpec);

  [els.duration, els.easing, els.distance, els.scale, els.opacity, els.stagger, els.preset, els.prominence, els.motionRole].forEach((input) => {
    input.addEventListener("input", () => {
      updateLabels();
      applyMotionVariables();
      renderGuideline(currentComponent());
    });
    input.addEventListener("change", () => {
      updateLabels();
      applyMotionVariables();
      renderGuideline(currentComponent());
    });
  });

  document.querySelectorAll("[data-trigger]").forEach((button) => {
    button.addEventListener("click", () => {
      const card = button.closest(".demo-card");
      replayAnimation(card);
    });
  });

  updateLabels();
  applyMotionVariables();
  renderPrototype(currentComponent());
}

initialize();
