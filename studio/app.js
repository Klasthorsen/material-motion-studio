const STORAGE_KEY = "material-motion-studio-simple-v1";

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
      "Strongest continuity pattern in Material motion."
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
      "Good for tabs and compare flows.",
      "Horizontal motion should stay modest."
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
      "Use for hierarchy and drill-down.",
      "Scale and fade communicates depth.",
      "Best when the user goes deeper into content."
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
      "Best for filters and time-range swaps.",
      "Keeps layout stable while content changes."
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
      "Use for lightweight enter and exit.",
      "Suitable for inline feedback or overlays.",
      "Keep other layout parts still."
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
      "Use for pressed, hover, and selected states.",
      "Keep it subtle and short.",
      "Prefer this for recurring utility interactions."
    ]
  }
};

const samples = [
  {
    id: "conversion-kpi-card",
    name: "Conversion KPI card",
    type: "metric-card",
    figmaUrl: "",
    prompt: "",
    preset: "container-transform"
  },
  {
    id: "retention-chart-panel",
    name: "Retention chart",
    type: "chart-panel",
    figmaUrl: "",
    prompt: "",
    preset: "shared-axis-z"
  },
  {
    id: "period-filter-group",
    name: "Period filter",
    type: "filter-group",
    figmaUrl: "",
    prompt: "",
    preset: "fade-through"
  }
];

const state = loadState();

const els = {
  sidebar: document.getElementById("sidebar"),
  toggleSidebar: document.getElementById("toggleSidebar"),
  componentList: document.getElementById("componentList"),
  newComponent: document.getElementById("newComponent"),
  importJson: document.getElementById("importJson"),
  componentTitle: document.getElementById("componentTitle"),
  breakpointSwitcher: document.getElementById("breakpointSwitcher"),
  deviceStage: document.getElementById("deviceStage"),
  deviceLabel: document.getElementById("deviceLabel"),
  componentPreview: document.getElementById("componentPreview"),
  componentName: document.getElementById("componentName"),
  componentType: document.getElementById("componentType"),
  figmaUrl: document.getElementById("figmaUrl"),
  sourceImage: document.getElementById("sourceImage"),
  prompt: document.getElementById("prompt"),
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

function defaultState() {
  return {
    sidebarCollapsed: false,
    breakpoint: "mobile",
    selectedId: samples[0].id,
    components: samples.map((component) => ({
      ...component,
      sourceImageData: "",
      motion: snapshotPreset(component.preset)
    }))
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

function currentComponent() {
  return state.components.find((component) => component.id === state.selectedId) || state.components[0];
}

function slugify(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function recommendPreset(component) {
  const prompt = `${component.prompt} ${component.type}`.toLowerCase();
  if (prompt.includes("hover") || prompt.includes("pressed") || prompt.includes("tap state")) {
    return "micro-interaction";
  }
  if (prompt.includes("swap") || prompt.includes("replace") || component.type === "filter-group") {
    return "fade-through";
  }
  if (prompt.includes("tab") || component.type === "tab-panel") {
    return "shared-axis-x";
  }
  if (prompt.includes("drill") || prompt.includes("detail") || component.type === "chart-panel") {
    return "shared-axis-z";
  }
  if (prompt.includes("dialog") || prompt.includes("sheet") || component.type === "dialog-sheet") {
    return "fade";
  }
  return "container-transform";
}

function renderComponentList() {
  els.sidebar.classList.toggle("collapsed", state.sidebarCollapsed);
  els.componentList.innerHTML = state.components
    .map((component) => {
      const active = component.id === state.selectedId ? " active" : "";
      return `
        <button class="component-item${active}" data-id="${component.id}">
          <span class="component-name">${escapeHtml(component.name)}</span>
          <span class="component-type">${escapeHtml(component.type)}</span>
        </button>
      `;
    })
    .join("");

  els.componentList.querySelectorAll("[data-id]").forEach((button) => {
    button.addEventListener("click", () => {
      state.selectedId = button.dataset.id;
      persistState();
      syncUI();
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

function renderPreview() {
  const component = currentComponent();
  const preset = presets[els.preset.value];
  const imageBlock = component.sourceImageData
    ? `<img class="source-image" src="${component.sourceImageData}" alt="${escapeHtml(component.name)}">`
    : "";

  const variants = {
    "metric-card": `
      <div class="preview-surface">
        <div class="preview-topbar">
          <div class="preview-title">${escapeHtml(component.name)}</div>
          <div class="preview-chip">${preset.label}</div>
        </div>
        ${imageBlock}
        <div class="preview-metric-value">12.4%</div>
        <div class="preview-subtle">+2.1 this week</div>
        <div class="preview-chart"></div>
      </div>
    `,
    "chart-panel": `
      <div class="preview-surface">
        <div class="preview-topbar">
          <div class="preview-title">${escapeHtml(component.name)}</div>
          <div class="preview-chip">${preset.label}</div>
        </div>
        ${imageBlock}
        <div class="preview-chart"></div>
        <div class="preview-bars">
          <div class="preview-bar" style="width: 78%"></div>
          <div class="preview-bar" style="width: 92%"></div>
          <div class="preview-bar" style="width: 58%"></div>
        </div>
      </div>
    `,
    "tab-panel": `
      <div class="preview-surface">
        <div class="preview-topbar">
          <div class="preview-title">${escapeHtml(component.name)}</div>
          <div class="preview-chip">${preset.label}</div>
        </div>
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
      </div>
    `,
    "filter-group": `
      <div class="preview-surface">
        <div class="preview-topbar">
          <div class="preview-title">${escapeHtml(component.name)}</div>
          <div class="preview-chip">${preset.label}</div>
        </div>
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
      </div>
    `,
    "list-row": `
      <div class="preview-surface">
        <div class="preview-topbar">
          <div class="preview-title">${escapeHtml(component.name)}</div>
          <div class="preview-chip">${preset.label}</div>
        </div>
        <div class="preview-table">
          <div class="preview-row"></div>
          <div class="preview-row"></div>
          <div class="preview-row"></div>
          <div class="preview-row"></div>
        </div>
      </div>
    `,
    "dialog-sheet": `
      <div class="preview-surface" style="min-height: 100%">
        <div class="preview-topbar">
          <div class="preview-title">${escapeHtml(component.name)}</div>
          <div class="preview-chip">${preset.label}</div>
        </div>
        <div class="preview-subtle">Sheet transition preview</div>
        <div class="preview-sheet">
          <div class="preview-metric-value" style="font-size: 28px">Action sheet</div>
          <div class="preview-subtle">Lightweight overlay for focused actions.</div>
          <div class="preview-bars">
            <div class="preview-bar" style="width: 90%"></div>
            <div class="preview-bar" style="width: 76%"></div>
          </div>
        </div>
      </div>
    `
  };

  els.componentPreview.innerHTML = variants[component.type] || variants["metric-card"];
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

function syncForm() {
  const component = currentComponent();
  els.componentTitle.textContent = component.name;
  els.componentName.value = component.name;
  els.componentType.value = component.type;
  els.figmaUrl.value = component.figmaUrl || "";
  els.prompt.value = component.prompt || "";
  els.preset.value = component.preset;
  els.duration.value = component.motion.duration;
  els.easing.value = component.motion.easing;
  els.distance.value = component.motion.distance;
  els.scale.value = component.motion.scale;
  els.opacity.value = component.motion.opacity;
  els.stagger.value = component.motion.stagger;
}

function syncUI() {
  renderComponentList();
  renderBreakpoint();
  syncForm();
  applyMotionValues();
  renderPreview();
}

function saveCurrentComponent() {
  const component = currentComponent();
  component.name = els.componentName.value.trim() || "Untitled component";
  component.type = els.componentType.value;
  component.figmaUrl = els.figmaUrl.value.trim();
  component.prompt = els.prompt.value.trim();
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
  component.name = els.componentName.value.trim() || component.name;
  component.type = els.componentType.value;
  component.prompt = els.prompt.value.trim();
  const presetKey = recommendPreset(component);
  component.preset = presetKey;
  component.motion = snapshotPreset(presetKey);
  persistState();
  syncUI();
}

function addComponent(partial = {}) {
  const baseName = partial.name || `New component ${state.components.length + 1}`;
  const id = `${slugify(baseName)}-${Date.now().toString(36)}`;
  const presetKey = partial.preset || "container-transform";
  const component = {
    id,
    name: baseName,
    type: partial.type || "metric-card",
    figmaUrl: partial.figmaUrl || "",
    prompt: partial.prompt || "",
    sourceImageData: partial.sourceImageData || "",
    preset: presetKey,
    motion: snapshotPreset(presetKey)
  };
  state.components.push(component);
  state.selectedId = component.id;
  persistState();
  syncUI();
}

function duplicateComponent() {
  const component = currentComponent();
  addComponent({
    name: `${component.name} copy`,
    type: component.type,
    figmaUrl: component.figmaUrl,
    prompt: component.prompt,
    sourceImageData: component.sourceImageData,
    preset: component.preset
  });
}

function importJson() {
  const raw = window.prompt("Paste component JSON");
  if (!raw) return;
  try {
    const data = JSON.parse(raw);
    addComponent({
      name: data.name || "Imported component",
      type: data.componentType || data.type || "metric-card",
      figmaUrl: data.figmaUrl || "",
      prompt: data.prompt || "",
      sourceImageData: data.sourceImageData || "",
      preset: data.preset || recommendPreset({
        type: data.componentType || data.type || "metric-card",
        prompt: data.prompt || ""
      })
    });
  } catch {
    window.alert("Could not parse JSON.");
  }
}

function handleImageUpload(event) {
  const file = event.target.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    currentComponent().sourceImageData = String(reader.result);
    persistState();
    renderPreview();
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
    renderComponentList();
  });

  els.breakpointSwitcher.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
      state.breakpoint = button.dataset.breakpoint;
      persistState();
      renderBreakpoint();
    });
  });

  els.newComponent.addEventListener("click", () => addComponent());
  els.importJson.addEventListener("click", importJson);
  els.recommendMotion.addEventListener("click", recommendMotion);
  els.saveComponent.addEventListener("click", saveCurrentComponent);
  els.duplicateComponent.addEventListener("click", duplicateComponent);
  els.sourceImage.addEventListener("change", handleImageUpload);

  [
    els.componentName,
    els.componentType,
    els.figmaUrl,
    els.prompt,
    els.preset,
    els.duration,
    els.easing,
    els.distance,
    els.scale,
    els.opacity,
    els.stagger
  ].forEach((input) => {
    input.addEventListener("input", () => {
      if (input === els.componentName) {
        els.componentTitle.textContent = els.componentName.value || "Untitled component";
      }
      applyMotionValues();
      renderPreview();
    });
  });

  syncUI();
}

initialize();
