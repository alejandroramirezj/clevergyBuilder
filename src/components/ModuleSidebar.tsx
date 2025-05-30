import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Search, Plus, Zap, Trash2, Sun, Plug, Star, User, Lock, Info, Flame, Award, Paintbrush } from 'lucide-react';
import { Input } from '@/components/ui/input';
import ReactDOM from 'react-dom';

// Estado para estilos globales
const defaultStyles = {
  '--clevergy-app-background': '#f5f5f5',
  '--clevergy-font-family': 'Inter, system-ui, sans-serif',
  '--clevergy-color-primary': '#0d9488',
  '--clevergy-color-secondary': '#FEC639',
  '--clevergy-color-text': '#171717',
  '--clevergy-color-subtext': '#737373',
  '--clevergy-color-unselected': '#a3a3a3',
  '--clevergy-color-border': '#d4d4d4',
  '--clevergy-module-header-title-color': 'var(--clevergy-color-text)',
  '--clevergy-module-header-action-color': '#004571',
  '--clevergy-module-container-background': 'white',
  '--clevergy-module-container-border': 'none',
  '--clevergy-module-container-border-radius': '12px',
  '--clevergy-module-container-box-shadow': '0 4px 6px -1px rgb(0 0 0 / .1), 0 2px 4px -2px rgb(0 0 0 / .1)',
  '--clevergy-module-container-padding': '16px',
  '--clevergy-module-container-margin': '16px',
  '--clevergy-button-color': 'var(--clevergy-color-primary)',
  '--clevergy-button-contrast-color': '#fff',
  '--clevergy-button-border-radius': '8px',
};

// Valores por defecto para cada variable
const defaultPlaceholders = {
  '--clevergy-app-background': '#f5f5f5',
  '--clevergy-font-family': 'Inter, system-ui, sans-serif',
  '--clevergy-color-primary': '#0d9488',
  '--clevergy-color-secondary': '#FEC639',
  '--clevergy-color-text': '#171717',
  '--clevergy-color-subtext': '#737373',
  '--clevergy-color-unselected': '#a3a3a3',
  '--clevergy-color-border': '#d4d4d4',
  '--clevergy-module-header-title-color': 'var(--clevergy-color-text)',
  '--clevergy-module-header-action-color': '#004571',
  '--clevergy-module-container-background': 'white',
  '--clevergy-module-container-border': 'none',
  '--clevergy-module-container-border-radius': '12px',
  '--clevergy-module-container-box-shadow': '0 4px 6px -1px rgb(0 0 0 / .1), 0 2px 4px -2px rgb(0 0 0 / .1)',
  '--clevergy-module-container-padding': '16px',
  '--clevergy-module-container-margin': '16px',
  '--clevergy-button-color': 'var(--clevergy-color-primary)',
  '--clevergy-button-contrast-color': '#fff',
  '--clevergy-button-border-radius': '8px',
};

// Tooltip helper
const Tooltip = ({ text }) => {
  const ref = React.useRef(null);
  const [show, setShow] = React.useState(false);
  const [coords, setCoords] = React.useState({ top: 0, left: 0, width: 0 });

  React.useEffect(() => {
    if (show && ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setCoords({ top: rect.bottom + 8, left: rect.left + rect.width / 2, width: rect.width });
    }
  }, [show]);

  return (
    <>
      <span
        ref={ref}
        className="relative ml-1"
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        tabIndex={0}
        onFocus={() => setShow(true)}
        onBlur={() => setShow(false)}
        style={{ display: 'inline-flex', alignItems: 'center' }}
      >
        <Info size={14} className="text-gray-400 cursor-pointer" />
      </span>
      {show && ReactDOM.createPortal(
        <div
          style={{
            position: 'fixed',
            top: coords.top,
            left: coords.left,
            transform: 'translateX(-50%)',
            zIndex: 9999,
            pointerEvents: 'none',
          }}
        >
          <div className="bg-gray-900 text-white text-xs rounded-lg px-3 py-2 shadow-xl transition-opacity duration-200 max-w-xs whitespace-pre-line relative">
            <span className="absolute -top-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-gray-900 rotate-45 rounded-sm shadow-xl" style={{ zIndex: 1 }} />
            {text}
          </div>
        </div>,
        document.body
      )}
    </>
  );
};

// Hook para buscar Google Fonts
const useGoogleFonts = (query) => {
  const [fonts, setFonts] = useState([]);
  useEffect(() => {
    if (!query) return setFonts([]);
    fetch(`https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyA-EXAMPLE-KEY&sort=popularity`)
      .then(res => res.json())
      .then(data => {
        setFonts(data.items.filter(f => f.family.toLowerCase().includes(query.toLowerCase())));
      });
  }, [query]);
  return fonts;
};

const getInitialStylesVars = () => {
  const saved = localStorage.getItem('clevergy-custom-styles');
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      return { ...defaultStyles };
    }
  }
  return { ...defaultStyles };
};

// Paletas por defecto
const clevergyPalette = {
  '--clevergy-font-family': 'Inter, system-ui, sans-serif',
  '--clevergy-color-primary': '#0d9488',
  '--clevergy-color-secondary': '#FEC639',
  '--clevergy-color-text': '#171717',
  '--clevergy-color-subtext': '#737373',
  '--clevergy-color-unselected': '#a3a3a3',
  '--clevergy-color-border': '#d4d4d4',
  '--clevergy-module-header-title-color': 'var(--clevergy-color-text)',
  '--clevergy-module-header-action-color': '#004571',
  '--clevergy-module-container-background': 'white',
  '--clevergy-module-container-border': 'none',
  '--clevergy-module-container-border-radius': '12px',
  '--clevergy-module-container-box-shadow': '0 4px 6px -1px rgb(0 0 0 / .1), 0 2px 4px -2px rgb(0 0 0 / .1)',
  '--clevergy-module-container-padding': '16px',
  '--clevergy-module-container-margin': '16px',
  '--clevergy-button-color': 'var(--clevergy-color-primary)',
  '--clevergy-button-contrast-color': '#fff',
  '--clevergy-button-border-radius': '8px',
};
const octopusPalette = {
  '--clevergy-font-family': 'Inter, system-ui, sans-serif',
  '--clevergy-color-primary': '#ce2093', // rosa fuerte
  '--clevergy-color-secondary': '#fdbb58', // amarillo
  '--clevergy-color-text': '#4a0a70', // morado oscuro
  '--clevergy-color-subtext': '#e6caf7', // lila claro
  '--clevergy-color-unselected': '#a3a3a3',
  '--clevergy-color-border': '#ce2093',
  '--clevergy-module-header-title-color': '#4a0a70',
  '--clevergy-module-header-action-color': '#ce2093',
  '--clevergy-module-container-background': 'white',
  '--clevergy-module-container-border': 'none',
  '--clevergy-module-container-border-radius': '12px',
  '--clevergy-module-container-box-shadow': '0 4px 6px -1px rgb(0 0 0 / .1), 0 2px 4px -2px rgb(0 0 0 / .1)',
  '--clevergy-module-container-padding': '16px',
  '--clevergy-module-container-margin': '16px',
  '--clevergy-button-color': '#ce2093',
  '--clevergy-button-contrast-color': '#fff',
  '--clevergy-button-border-radius': '8px',
};
const naturgyPalette = {
  '--clevergy-font-family': 'Inter, system-ui, sans-serif',
  '--clevergy-color-primary': '#ff8200', // naranja naturgy
  '--clevergy-color-secondary': '#005493', // azul naturgy
  '--clevergy-color-text': '#005493',
  '--clevergy-color-subtext': '#737373',
  '--clevergy-color-unselected': '#a3a3a3',
  '--clevergy-color-border': '#ff8200',
  '--clevergy-module-header-title-color': '#005493',
  '--clevergy-module-header-action-color': '#ff8200',
  '--clevergy-module-container-background': 'white',
  '--clevergy-module-container-border': 'none',
  '--clevergy-module-container-border-radius': '12px',
  '--clevergy-module-container-box-shadow': '0 4px 6px -1px rgb(0 0 0 / .1), 0 2px 4px -2px rgb(0 0 0 / .1)',
  '--clevergy-module-container-padding': '16px',
  '--clevergy-module-container-margin': '16px',
  '--clevergy-button-color': '#ff8200',
  '--clevergy-button-contrast-color': '#fff',
  '--clevergy-button-border-radius': '8px',
};
const defaultSavedStyles = [
  { name: 'Clevergy', vars: clevergyPalette },
  { name: 'Cangrejo Rosa', vars: octopusPalette },
  { name: 'Gas Naranja', vars: naturgyPalette },
];

const ModuleSidebar = ({ onModuleDrop, projectType, stylesVars, setStylesVars }) => {
  const [houseId, setHouseId] = useState("6413c72b-1e8f-41a9-8024-b810cd260b42");
  const [token, setToken] = useState("eyJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJodHRwczovL2lkZW50aXR5dG9vbGtpdC5nb29nbGVhcGlzLmNvbS9nb29nbGUuaWRlbnRpdHkuaWRlbnRpdHl0b29sa2l0LnYxLklkZW50aXR5VG9vbGtpdCIsImV4cCI6MTc0ODQ0NzgwOCwiaWF0IjoxNzQ4NDQ0MjA4LCJpc3MiOiJwdWJsaWMtZnJvbnQtYmFja0BjbGV2ZXJneS5pYW0uZ3NlcnZpY2VhY2NvdW50LmNvbSIsInN1YiI6InB1YmxpYy1mcm9udC1iYWNrQGNsZXZlcmd5LmlhbS5nc2VydmljZWFjY291bnQuY29tIiwidGVuYW50X2lkIjoiY2xldmVyZ3ktZW8zOW0iLCJ1aWQiOiJSYzhETjVFRXJ5VEY0M0hiQXR6dTliV0ZZQk4yIn0.AGFE5utjbaHQ7fm0VabGytcwPVI4IKTxtk7pWMpgS85zldDFn-9yHrfpzvjr9gMkF16hoQV_RdkzaMsuspeq5_sZEIOcL8owIThObuYQbJHLQ7rgxtczvcIcJHxfJypFX8joytrF4VDuH1yNYG6arwoVSqaz2Vzm-9UnfSC8YG2Ud-HSBlPi4XLMjJIemyMxmsCq7RItogLHnSVhU1gLnUwDdSr-sEu4GY9fWE_EwaCasyHTZdXDD_aQswsu6fuiSPwJaRIFv2_2_Yip84cCRa3Bgc6USH3Ineoh-0zDm7xIHXCpqVEdIxbdET1N-oUxXX7QyBMKJVz_MGAzc-FE4A");
  const [authFilter, setAuthFilter] = useState({ auth: true, noauth: true });
  const allCategories = [
    "Energía",
    "Solar",
    "Integraciones",
    "Leads"
  ];
  const [categoryFilter, setCategoryFilter] = useState(allCategories);
  const [search, setSearch] = useState("");
  const [customAttrs, setCustomAttrs] = useState({});
  const [showStyles, setShowStyles] = useState(false);
  const [activeTab, setActiveTab] = useState('Colores');
  const [fontQuery, setFontQuery] = useState('');
  const googleFonts = useGoogleFonts(fontQuery);
  const [feedback, setFeedback] = useState('');
  const [savedStyles, setSavedStyles] = useState(() => {
    try {
      let local = JSON.parse(localStorage.getItem('clevergy-saved-styles') || 'null');
      if (local && Array.isArray(local)) {
        local = local.map(s => s.name === 'Estilo Clevergy' ? { ...s, name: 'Clevergy' } : s);
        localStorage.setItem('clevergy-saved-styles', JSON.stringify(local));
        if (local.length > 0) return local;
      }
      localStorage.setItem('clevergy-saved-styles', JSON.stringify(defaultSavedStyles));
      return defaultSavedStyles;
    } catch {
      localStorage.setItem('clevergy-saved-styles', JSON.stringify(defaultSavedStyles));
      return defaultSavedStyles;
    }
  });
  const [styleName, setStyleName] = useState('');
  const [showAddStyle, setShowAddStyle] = useState(false);
  // Estado para el dropdown de estilos de ejemplo
  const [showExamples, setShowExamples] = useState(false);
  // Estado global para controlar qué categorías están abiertas
  const [openCategories, setOpenCategories] = useState(() => {
    const initial = {};
    allCategories.forEach((cat, i) => { initial[cat] = i === 0; });
    return initial;
  });

  // Ejemplo de definición de módulos con categoría
  const allModules = [
    {
      id: 'energy-prices',
      name: 'energy-prices',
      description: 'Precios de energía en tiempo real',
      auth: false,
      category: 'Energía',
      htmlTag: '<clevergy-energy-prices\n    data-energy-prices-type="PVPC"\n    data-language="es"\n    data-show-energy-price-list="true"\n    data-show-energy-price-surplus="false"\n  />'
    },
    {
      id: 'contract',
      name: 'contract',
      icon: Zap,
      description: 'Oportunidad de contrato Clevergy',
      auth: false,
      category: 'Leads',
      htmlTag: '<clevergy-create-contract-opportunity data-client-key="fba8a790ff474b69696271680851d0d529c3" data-language="es-ES"></clevergy-create-contract-opportunity>'
    },
    {
      id: 'integration-shelly',
      name: 'Shelly Integration',
      icon: Zap,
      description: 'Integración con dispositivos Shelly',
      auth: true,
      category: 'Integraciones',
      htmlTag: `<clevergy-integration-shelly data-token="${token}" data-house-id="${houseId}" data-language="es-ES"></clevergy-integration-shelly>`
    },
    {
      id: 'smart-devices',
      name: 'Smart Devices',
      icon: Zap,
      description: 'Gestión de dispositivos inteligentes',
      auth: true,
      category: 'Integraciones',
      htmlTag: `<clevergy-smart-devices data-token="${token}" data-house-id="${houseId}" data-language="es-ES"></clevergy-smart-devices>`
    },
    {
      id: 'smart-devices-settings',
      name: 'Smart Devices Settings',
      icon: Zap,
      description: 'Configuración de dispositivos inteligentes',
      auth: true,
      category: 'Integraciones',
      htmlTag: `<clevergy-smart-devices-settings data-token="${token}" data-house-id="${houseId}" data-show-back-button="false" data-show-add-devices-button="false" data-language="es-ES"></clevergy-smart-devices-settings>`
    },
    {
      id: 'alerts-settings',
      name: 'Alerts Settings',
      icon: Zap,
      description: 'Configura tus avisos',
      auth: true,
      category: 'Energía',
      htmlTag: `<clevergy-alerts-settings
        data-token="${token}"
        data-house-id="${houseId}"
        data-title="Configura tus avisos"
        data-unit="ENERGY"
        data-language="es-ES"
      />`
    },
    {
      id: 'battery',
      name: 'Battery',
      icon: Zap,
      description: 'Batería',
      auth: true,
      category: 'Energía',
      htmlTag: `<clevergy-battery
        data-token="${token}"
        data-house-id="${houseId}"
        data-cups=""
        data-language="es-ES"
      />`
    },
    {
      id: 'breakdown',
      name: 'Breakdown',
      icon: Zap,
      description: 'Desglose de consumo',
      auth: true,
      category: 'Energía',
      htmlTag: `<clevergy-breakdown
        data-token="${token}"
        data-house-id="${houseId}"
        data-show-dates-selector="true"
        data-date-range-type=""
        data-custom-start-date=""
        data-custom-end-date=""
        data-unit="ENERGY"
        data-language="es-ES"
      />`
    },
    {
      id: 'consumption-cumulative',
      name: 'Consumption Cumulative',
      icon: Zap,
      description: 'Consumo acumulado',
      auth: true,
      category: 'Energía',
      htmlTag: `<clevergy-consumption-cumulative
        data-token="${token}"
        data-house-id="${houseId}"
        data-tooltip="This is a tooltip"
        data-unit="ENERGY"
        data-language="es-ES"
      />`
    },
    {
      id: 'energy-chart',
      name: 'Energy Chart',
      icon: Zap,
      description: 'Gráfico de energía',
      auth: true,
      category: 'Energía',
      htmlTag: `<clevergy-energy-chart
        data-token="${token}"
        data-house-id="${houseId}"
        data-show-dates-selector="true"
        data-date-range-type="month"
        data-date-range-current-date="2024-03-01"
        data-custom-start-date=""
        data-custom-end-date=""
        data-language="es-ES"
        data-show-download-csv="true"
        data-unit="ENERGY"
      />`
    },
    {
      id: 'house-comparison',
      name: 'House Comparison',
      icon: Zap,
      description: 'Comparativa de hogares',
      auth: true,
      category: 'Energía',
      htmlTag: `<clevergy-house-comparison
        data-token="${token}"
        data-house-id="${houseId}"
        data-view="race"
        data-show-dates-selector="false"
        data-dates-selector-position-="bottom"
        data-variant="advanced"
        data-tooltip="<p><strong>En esta sección puedes comparar el consumo de tu hogar con:</strong></p><ul><li><strong>Hogares cercanos:</strong> consumo medio de hogares con el mismo código postal que tú.</li><li><strong>Hogares similares:</strong> consumo medio de hogares con características similares según tu configuración de la cuenta.</li><li><strong>Hogares eficientes:</strong> consumo medio de hogares con características similares según tu configuración de la cuenta, teniendo en cuenta solo el 30% de los hogares con menor consumo.</li></ul>"
        data-language="es-ES"
      />`
    },
    {
      id: 'house-contract',
      name: 'House Contract',
      icon: Zap,
      description: 'Contrato del hogar',
      auth: true,
      category: 'Energía',
      htmlTag: `<clevergy-house-contract
        data-token="${token}"
        data-house-id="${houseId}"
        data-language="es-ES"
      />`
    },
    {
      id: 'house-settings',
      name: 'House Settings',
      icon: Zap,
      description: 'Configuración del hogar',
      auth: true,
      category: 'Energía',
      htmlTag: `<clevergy-house-settings
        data-token="${token}"
        data-house-id="${houseId}"
        data-language="es-ES"
      />`
    },
    {
      id: 'integration-fronius-b2c',
      name: 'Integration Fronius B2C',
      icon: Zap,
      description: 'Integración Fronius B2C',
      auth: true,
      category: 'Integraciones',
      htmlTag: `<clevergy-integration-fronius-b2c
        data-token="${token}"
        data-house-id="${houseId}"
        data-allow-skipping="false"
        data-language="es-ES"
      />`
    },
    {
      id: 'integration-huawei-b2c',
      name: 'Integration Huawei B2C',
      icon: Zap,
      description: 'Integración Huawei B2C',
      auth: true,
      category: 'Integraciones',
      htmlTag: `<clevergy-integration-huawei-b2c
        data-token="${token}"
        data-house-id="${houseId}"
        data-callback-url=""
        data-delegate-url-opening=""
        data-allow-skipping=""
        data-language="es-ES"
      />`
    },
    {
      id: 'integration-shelly-otro',
      name: 'Shelly Integration',
      description: 'Integración con dispositivos Shelly',
      auth: true,
      category: 'Integraciones',
      htmlTag: `<clevergy-integration-shelly data-token="${token}" data-house-id="${houseId}" data-language="es-ES"></clevergy-integration-shelly>`
    },
    {
      id: 'invoice-viewer',
      name: 'Invoice Viewer',
      icon: Zap,
      description: 'Visor de facturas',
      auth: true,
      category: 'Energía',
      htmlTag: `<clevergy-invoice-viewer
        data-token="${token}"
        data-house-id="${houseId}"
        data-title="Factura explicada"
        data-language="es-ES"
        data-show-empty-state="false"
      />`
    },
    {
      id: 'power-chart',
      name: 'Power Chart',
      icon: Zap,
      description: 'Gráfico de potencia',
      auth: true,
      category: 'Energía',
      htmlTag: `<clevergy-power-chart
        data-token="${token}"
        data-house-id="${houseId}"
        data-current-date="2024-03-01"
        data-language="es-ES"
      />`
    },
    {
      id: 'rate-recommender',
      name: 'Rate Recommender',
      icon: Zap,
      description: 'Recomendador de tarifa',
      auth: true,
      category: 'Energía',
      htmlTag: `<clevergy-rate-recommender
        data-token="${token}"
        data-house-id="${houseId}"
        data-variant="default"
        data-language="es-ES"
      />`
    },
    {
      id: 'recommendations',
      name: 'Recommendations',
      icon: Zap,
      description: 'Recomendaciones',
      auth: true,
      category: 'Leads',
      htmlTag: `<clevergy-recommendations
        data-token="${token}"
        data-house-id="${houseId}"
        data-title="Recomendaciones"
        data-language="es-ES"
      />`
    },
    {
      id: 'solar-amortization',
      name: 'Solar Amortization',
      icon: Zap,
      description: 'Amortización solar',
      auth: true,
      category: 'Solar',
      htmlTag: `<clevergy-solar-amortization
        data-token="${token}"
        data-house-id="${houseId}"
        data-language="es-ES"
      />`
    },
    {
      id: 'solar-info',
      name: 'Solar Info',
      icon: Zap,
      description: 'Información solar',
      auth: true,
      category: 'Solar',
      htmlTag: `<clevergy-solar-info
        data-token="${token}"
        data-house-id="${houseId}"
        data-language="es-ES"
      />`
    },
    {
      id: 'solar-real-time',
      name: 'Solar Real Time',
      icon: Zap,
      description: 'Solar en tiempo real',
      auth: true,
      category: 'Solar',
      htmlTag: `<clevergy-solar-real-time
        data-token="${token}"
        data-house-id="${houseId}"
        data-language="es-ES"
      />`
    },
    {
      id: 'solar-recommender',
      name: 'Solar Recommender',
      icon: Zap,
      description: 'Recomendador solar',
      auth: true,
      category: 'Solar',
      htmlTag: `<clevergy-solar-recommender
        data-token="${token}"
        data-house-id="${houseId}"
        data-language="es-ES"
      />`
    },
    {
      id: 'solar-summary',
      name: 'Solar Summary',
      icon: Zap,
      description: 'Resumen solar',
      auth: true,
      category: 'Solar',
      htmlTag: `<clevergy-solar-summary
        data-token="${token}"
        data-house-id="${houseId}"
        data-show-dates-selector="true"
        data-title="Resumen"
        data-unit="ENERGY"
        data-language="es-ES"
      />`
    },
    {
      id: 'tips-panel',
      name: 'Tips Panel',
      icon: Zap,
      description: 'Panel de consejos',
      auth: true,
      category: 'Energía',
      htmlTag: `<clevergy-tips-panel
        data-token="${token}"
        data-house-id="${houseId}"
        data-language="es-ES"
      />`
    },
    {
      id: 'virtual-wallet',
      name: 'Virtual Wallet',
      icon: Zap,
      description: 'Monedero virtual',
      auth: true,
      category: 'Energía',
      htmlTag: `<clevergy-virtual-wallet
        data-token="${token}"
        data-house-id="${houseId}"
        data-language="es-ES"
      />`
    }
  ];

  // Agrupa los módulos por categoría
  const groupedModules = allModules.reduce((acc, mod) => {
    acc[mod.category] = acc[mod.category] || [];
    acc[mod.category].push(mod);
    return acc;
  }, {});

  // Filtrado según autenticación y categoría
  const modules = useMemo(() => {
    return allModules.filter(m =>
      ((m.auth && authFilter.auth) || (!m.auth && authFilter.noauth)) &&
      (categoryFilter.includes(m.category)) &&
      (
        m.name.toLowerCase().includes(search.toLowerCase()) ||
        m.description.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [authFilter, houseId, token, categoryFilter, search]);

  // Helper para extraer atributos de la string htmlTag
  function extractAttrs(htmlTag) {
    const attrs = {};
    const attrRegex = /([a-zA-Z0-9-:]+)="([^"]*)"/g;
    let match;
    while ((match = attrRegex.exec(htmlTag))) {
      if (match[1] !== 'data-house-id' && match[1] !== 'data-token') {
        attrs[match[1]] = match[2];
      }
    }
    return attrs;
  }

  const handleDragStart = (e, module) => {
    let htmlTag = module.htmlTag;
    const attrs = extractAttrs(htmlTag);
    const custom = customAttrs[module.id] || {};
    Object.entries(attrs).forEach(([attr, val]) => {
      if (custom[attr] !== undefined) {
        htmlTag = htmlTag.replace(
          new RegExp(`${attr}="[^"]*"`),
          `${attr}="${custom[attr]}"`
        );
      }
    });
    // Al arrastrar, el objeto debe tener el htmlTag actualizado
    const moduleWithCustom = { ...module, htmlTag };
    e.dataTransfer.setData('application/json', JSON.stringify(moduleWithCustom));
  };

  const categoryInfo = {
    "Energía": { icon: <Zap size={18} />, iconBg: "bg-yellow-100", border: "border-yellow-300", chip: "focus:ring-yellow-300" },
    "Solar": { icon: <Sun size={18} />, iconBg: "bg-orange-100", border: "border-orange-300", chip: "focus:ring-orange-300" },
    "Integraciones": { icon: <Plug size={18} />, iconBg: "bg-gray-200", border: "border-gray-300", chip: "focus:ring-gray-300" },
    "Leads": { icon: <Star size={18} />, iconBg: "bg-blue-100", border: "border-blue-300", chip: "focus:ring-blue-300" }
  };

  // Inyectar estilos en el documento principal
  React.useEffect(() => {
    let styleTag = document.getElementById('clevergy-custom-vars');
      if (!styleTag) {
      styleTag = document.createElement('style');
        styleTag.id = 'clevergy-custom-vars';
      document.head.appendChild(styleTag);
      }
      styleTag.innerHTML = `:root {\n${Object.entries(stylesVars).map(([k,v]) => `  ${k}: ${v};`).join('\n')}\n}`;
  }, [stylesVars]);

  // Helper para limpiar los valores por defecto para los campos numéricos (ahora con px y los nuevos valores)
  const getDefaultStylesClean = () => {
    return { ...defaultStyles };
  };

  // Función para guardar un nuevo estilo con nombre
  const handleSaveStyle = () => {
    if (!styleName.trim()) {
      setFeedback('Ponle un nombre a tu estilo');
      setTimeout(() => setFeedback(''), 1200);
      return;
    }
    const newStyles = [
      ...savedStyles.filter(s => s.name !== styleName.trim()),
      { name: styleName.trim(), vars: { ...stylesVars } }
    ];
    setSavedStyles(newStyles);
    localStorage.setItem('clevergy-saved-styles', JSON.stringify(newStyles));
    setFeedback('¡Estilo guardado!');
    setTimeout(() => setFeedback(''), 1200);
  };

  // Función para cargar un estilo guardado
  const handleLoadStyle = (vars) => {
    setStylesVars({ ...vars });
    setFeedback('¡Estilo cargado!');
    setTimeout(() => setFeedback(''), 1200);
  };

  // Función para eliminar un estilo guardado
  const handleDeleteStyle = (name) => {
    const newStyles = savedStyles.filter(s => s.name !== name);
    setSavedStyles(newStyles);
    localStorage.setItem('clevergy-saved-styles', JSON.stringify(newStyles));
    setFeedback('Estilo eliminado');
    setTimeout(() => setFeedback(''), 1200);
  };

  // Calcular el total de módulos privados
  const totalPrivateModules = Object.values(groupedModules).reduce((acc: number, mods) => {
    if (Array.isArray(mods)) {
      return acc + (mods as {auth: boolean}[]).filter(m => m.auth).length;
    }
    return acc;
  }, 0);

  return (
    <div className="w-80 bg-white border-r border-gray-200/50 flex flex-col">
      {/* Campos de autenticación */}
      <div className="p-4 border-b border-gray-100 space-y-3">
        <div>
          <label className="text-xs font-medium text-gray-700 mb-1 block">House ID</label>
          <Input value={houseId} onChange={e => setHouseId(e.target.value)} className="bg-gray-50 border-0 focus:bg-white text-sm" placeholder="Ingresa el house-id" />
        </div>
        <div>
          <label className="text-xs font-medium text-gray-700 mb-1 block">Token</label>
          <Input value={token} onChange={e => setToken(e.target.value)} className="bg-gray-50 border-0 focus:bg-white text-sm" placeholder="Ingresa el token" />
        </div>
      </div>

      {/* Personaliza tu apariencia como dropdown */}
      <div className="p-4 border-b border-gray-100 relative">
        <div className="flex items-center justify-between cursor-pointer select-none" onClick={() => setShowExamples(v => !v)}>
          <div className="flex items-center gap-2">
            <Paintbrush size={18} className="text-blue-500" />
            <span className="font-bold text-sm text-gray-800">Personaliza tu apariencia</span>
          </div>
          <span className="text-gray-400 text-lg">{showExamples ? '▲' : '▼'}</span>
        </div>
        {/* Dropdown de estilos de ejemplo */}
        {showExamples && savedStyles.length > 0 && (
          <div className="w-full mt-3 flex flex-col gap-1 animate-fade-in">
            <div className="text-xs text-gray-500 mb-1">Estilos de ejemplo:</div>
            {savedStyles.map((s, idx) => {
              let icon = null;
              if (s.name === 'Cangrejo Rosa') icon = <span role="img" aria-label="cangrejo" className="text-xl">🦀</span>;
              else if (s.name === 'Gas Naranja') icon = <Flame className="text-orange-500" size={18} />;
              else if (s.name === 'Clevergy') icon = <img src="dist/favicon%20clevergy.png" alt="Clevergy" className="w-5 h-5 inline-block align-middle rounded" />;
              else icon = <Award className="text-gray-400" size={18} />;
              const isActive = JSON.stringify(stylesVars) === JSON.stringify(s.vars);
              const isEditable = !['Cangrejo Rosa', 'Gas Naranja', 'Clevergy'].includes(s.name) ? true : false;
              const isDefault = ['Cangrejo Rosa', 'Gas Naranja', 'Clevergy'].includes(s.name);
              return (
                <div key={s.name} className="flex items-center gap-2 w-full group relative">
                  <span className="text-xs text-gray-400 w-4 text-right">{idx + 1}.</span>
        <button
                    className={`flex-1 text-left px-2 py-1 text-xs rounded-lg border border-gray-200 transition-colors flex items-center gap-2 ${isActive ? 'bg-gray-200 font-bold text-blue-700' : 'bg-white hover:bg-blue-50'}`}
                    onClick={() => handleLoadStyle(s.vars)}
                    title="Cargar estilo"
                    style={{ outline: 'none', display: 'flex', alignItems: 'center', width: '100%' }}
                  >
                    <span className="mr-2 flex items-center">{icon}</span>
                    <span className="truncate flex-1">{s.name}</span>
                    {isActive && <span className="ml-2 text-blue-500">✔</span>}
                    {/* Botón 'Ver estilo' solo para estilos por defecto, alineado a la derecha y visible solo en hover */}
                    {isDefault && (
                      <button
                        className="flex items-center gap-1 px-2 py-1 text-xs text-gray-600 bg-gray-100 rounded hover:bg-gray-200 transition opacity-0 group-hover:opacity-100 focus:opacity-100 ml-auto"
                        style={{ fontWeight: 500 }}
                        title="Abrir en la vista lateral"
                        onClick={e => { e.stopPropagation(); setStylesVars({ ...s.vars }); setStyleName(s.name); setShowStyles(true); }}
        >
                        <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="16" rx="2" fill="#e5e7eb" stroke="#94a3b8" strokeWidth="1.5"/><rect x="5.5" y="6.5" width="5" height="11" rx="1" fill="#fff" stroke="#64748b" strokeWidth="1.2"/><rect x="12.5" y="6.5" width="6" height="11" rx="1" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.2"/></svg>
                        <span className="hidden sm:inline">Ver estilo</span>
        </button>
                    )}
                    {/* Iconos de editar y eliminar solo para estilos editables */}
                    {isEditable && (
                      <span className="flex items-center ml-auto gap-1">
        <button
                          className="text-gray-400 hover:text-blue-500 p-1 rounded transition-colors"
                          title="Editar estilo"
                          onClick={e => { e.stopPropagation(); setStylesVars({ ...s.vars }); setStyleName(s.name); setShowStyles(true); }}
                          style={{ background: 'none', border: 'none' }}
                        >
                          <svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M16.474 5.425a2.409 2.409 0 1 1 3.406 3.406l-9.05 9.05a2 2 0 0 1-.707.464l-3.11 1.11a.5.5 0 0 1-.64-.64l1.11-3.11a2 2 0 0 1 .464-.707l9.05-9.05Z"/></svg>
                        </button>
                        <button
                          className="text-gray-400 hover:text-red-500 p-1 rounded transition-colors"
                          title="Eliminar estilo"
                          onClick={e => { e.stopPropagation(); handleDeleteStyle(s.name); }}
                          style={{ background: 'none', border: 'none' }}
                        >
                          <Trash2 size={16} />
                        </button>
            </span>
                    )}
        </button>
      </div>
              );
            })}
            {/* Botón compacto para crear nuevo estilo, alineado a la izquierda */}
            <div className="flex w-full justify-start mt-3">
          <button
                className="flex items-center gap-1 px-2 py-1 text-xs font-medium text-blue-700 bg-blue-100 rounded-md hover:bg-blue-200 transition-all focus:ring-2 focus:ring-blue-300"
                onClick={() => { setStyleName(''); setStylesVars({ ...defaultStyles }); setShowStyles(true); }}
              >
                <span className="text-base font-bold">+</span> Nuevo estilo
          </button>
      </div>
        </div>
        )}
        {/* Panel flotante de personalización solo se abre al pulsar el botón */}
        {showStyles && (
          <div className="fixed top-0 left-80 z-50 w-80 h-full bg-white shadow-2xl border-l border-gray-200 p-6 animate-fade-in flex flex-col gap-6"
            style={{ minHeight: '100vh', maxHeight: '100vh', overflowY: 'auto' }}
          >
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-base font-semibold text-gray-800">Personaliza apariencia</h2>
        <button
                className="text-gray-400 hover:text-gray-700 text-lg"
                onClick={() => setShowStyles(false)}
                aria-label="Cerrar personalización"
              >
                ✕
        </button>
            </div>
            {/* Tipografía */}
            <div className="space-y-3">
            <div className="flex items-center gap-2">
                <span className="text-lg">📝</span>
                <label className="text-xs font-medium text-gray-700">Familia de fuente</label>
                <Tooltip text="Fuente global para todos los módulos. Debe estar cargada en la web." />
              </div>
              <select
                className="w-full border rounded-lg px-3 py-2 text-sm"
                value={stylesVars['--clevergy-font-family']}
                onChange={e => setStylesVars(s => ({ ...s, '--clevergy-font-family': e.target.value }))}
              >
                <optgroup label="Sans-serif">
                  <option value="Inter, system-ui, sans-serif">Inter</option>
                  <option value="Roboto, system-ui, sans-serif">Roboto</option>
                  <option value="Open Sans, system-ui, sans-serif">Open Sans</option>
                  <option value="Montserrat, system-ui, sans-serif">Montserrat</option>
                  <option value="Poppins, system-ui, sans-serif">Poppins</option>
                  <option value="Nunito, system-ui, sans-serif">Nunito</option>
                </optgroup>
                <optgroup label="Serif">
                  <option value="Merriweather, Georgia, serif">Merriweather</option>
                  <option value="Playfair Display, Georgia, serif">Playfair Display</option>
                  <option value="Source Serif Pro, Georgia, serif">Source Serif Pro</option>
                </optgroup>
                <optgroup label="Monospace">
                  <option value="JetBrains Mono, monospace">JetBrains Mono</option>
                  <option value="Fira Code, monospace">Fira Code</option>
                  <option value="Source Code Pro, monospace">Source Code Pro</option>
                </optgroup>
              </select>
            </div>
            {/* Colores comunes */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-lg">🎨</span>
                <label className="text-xs font-medium text-gray-700">Colores comunes</label>
              </div>
              <div className="grid grid-cols-2 gap-4">
            {[
                  ['--clevergy-color-primary', 'Color primario', 'Color principal de la marca y botones.'],
                  ['--clevergy-color-secondary', 'Color secundario', 'Color secundario de la marca.'],
                  ['--clevergy-color-text', 'Color texto', 'Color principal del texto.'],
                  ['--clevergy-color-subtext', 'Color subtexto', 'Color para textos secundarios o descripciones.'],
                  ['--clevergy-color-unselected', 'Color unselected', 'Color para elementos no seleccionados.'],
                  ['--clevergy-color-border', 'Color borde', 'Color de los bordes de los módulos.'],
                ].map(([key, label, tooltip]) => (
                  <div key={key} className="flex flex-col gap-2">
                    <label className="text-xs text-gray-500 flex items-center gap-1">{label}<Tooltip text={tooltip} /></label>
                    <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={stylesVars[key]}
                  onChange={e => setStylesVars(s => ({ ...s, [key]: e.target.value }))}
                        className="w-10 h-10 rounded-lg border-2 border-gray-200 cursor-pointer shadow"
                        style={{ minWidth: 40, minHeight: 40, width: '80px' }}
                      />
                      <input
                        type="text"
                        value={stylesVars[key]}
                        onChange={e => setStylesVars(s => ({ ...s, [key]: e.target.value }))}
                        className="text-xs border rounded-lg px-2 py-1.5 bg-gray-50"
                        style={{ width: '80px' }}
                        placeholder="Ej: #e57200"
                      />
                    </div>
              </div>
            ))}
              </div>
            </div>
            {/* Header módulo */}
            <div className="space-y-3">
            <div className="flex items-center gap-2">
                <span className="text-lg">📌</span>
                <label className="text-xs font-medium text-gray-700">Header del módulo</label>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  ['--clevergy-module-header-title-color', 'Título', 'Color del título del header del módulo.'],
                  ['--clevergy-module-header-action-color', 'Acción', 'Color de los iconos o acciones del header.'],
                ].map(([key, label, tooltip]) => (
                  <div key={key} className="flex flex-col gap-2">
                    <label className="text-xs text-gray-500 flex items-center gap-1">{label}<Tooltip text={tooltip} /></label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={stylesVars[key]}
                        onChange={e => setStylesVars(s => ({ ...s, [key]: e.target.value }))}
                        className="w-10 h-10 rounded-lg border-2 border-gray-200 cursor-pointer shadow"
                        style={{ minWidth: 40, minHeight: 40, width: '80px' }}
                      />
              <input
                type="text"
                        value={stylesVars[key]}
                        onChange={e => setStylesVars(s => ({ ...s, [key]: e.target.value }))}
                        className="text-xs border rounded-lg px-2 py-1.5 bg-gray-50"
                        style={{ width: '80px' }}
                        placeholder="Ej: #004571"
              />
            </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Contenedor del módulo */}
            <div className="space-y-3">
            <div className="flex items-center gap-2">
                <span className="text-lg">📦</span>
                <label className="text-xs font-medium text-gray-700">Contenedor del módulo</label>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  ['--clevergy-module-container-background', 'Fondo', 'Fondo del contenedor del módulo. Puede ser color, gradiente o none.'],
                  ['--clevergy-module-container-border', 'Borde', 'Borde del contenedor. Ejemplo: 1px solid #d9d9d9 o none.'],
                  ['--clevergy-module-container-border-radius', 'Radio del borde', 'Redondez de las esquinas. Ejemplo: 8px o none.'],
                  ['--clevergy-module-container-box-shadow', 'Sombra', 'Sombra del contenedor. Ejemplo: 0 2px 8px rgba(0,0,0,0.1) o none.'],
                  ['--clevergy-module-container-padding', 'Padding', 'Espaciado interno. Ejemplo: 16px o none.'],
                  ['--clevergy-module-container-margin', 'Margen', 'Espaciado externo. Ejemplo: 16px o none.'],
                ].map(([key, label, tooltip]) => (
                  <div key={key} className="flex flex-col gap-2">
                    <label className="text-xs text-gray-500 flex items-center gap-1">{label}<Tooltip text={tooltip} /></label>
              <input
                type="text"
                      value={stylesVars[key]}
                      onChange={e => {
                        if ([
                          '--clevergy-module-container-border-radius',
                          '--clevergy-module-container-padding',
                          '--clevergy-module-container-margin',
                          '--clevergy-button-border-radius',
                        ].includes(key)) {
                          const val = e.target.value;
                          setStylesVars(s => ({ ...s, [key]: val }));
                        } else {
                          setStylesVars(s => ({ ...s, [key]: e.target.value }));
                        }
                      }}
                      className="w-full text-xs border rounded-lg px-2 py-1"
                      placeholder={defaultPlaceholders[key] ? (['--clevergy-module-container-border-radius','--clevergy-module-container-padding','--clevergy-module-container-margin','--clevergy-button-border-radius'].includes(key) ? defaultPlaceholders[key] + 'px' : defaultPlaceholders[key]) : ''}
              />
            </div>
                ))}
              </div>
            </div>
            {/* Botones */}
            <div className="space-y-3">
            <div className="flex items-center gap-2">
                <span className="text-lg">🔘</span>
                <label className="text-xs font-medium text-gray-700">Botones</label>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  ['--clevergy-button-color', 'Color botón', 'Color principal del botón.'],
                  ['--clevergy-button-contrast-color', 'Contraste', 'Color del texto o fondo de contraste del botón.'],
                  ['--clevergy-button-border-radius', 'Radio del botón', 'Redondez de los botones. Ejemplo: 8px.'],
                ].map(([key, label, tooltip]) => (
                  <div key={key} className="flex flex-col gap-2">
                    <label className="text-xs text-gray-500 flex items-center gap-1">{label}<Tooltip text={tooltip} /></label>
              <input
                type="text"
                      value={stylesVars[key]}
                      onChange={e => setStylesVars(s => ({ ...s, [key]: e.target.value }))}
                      className="w-full text-xs border rounded-lg px-2 py-1"
                      placeholder={key.includes('color') ? '#e57200' : '8px'}
              />
            </div>
                ))}
              </div>
            </div>
            {/* Si hay cambios respecto a los estilos guardados, muestra input para guardar como */}
            {JSON.stringify(stylesVars) !== JSON.stringify(defaultStyles) && (
              <div className="flex w-full gap-2 mt-2">
              <input
                type="text"
                  className="flex-1 text-xs border rounded-lg px-2 py-1 bg-gray-50"
                  placeholder="Nombre del estilo (ej: Clevergy, Octopus...)"
                  value={styleName}
                  onChange={e => setStyleName(e.target.value)}
                  maxLength={32}
                />
                <button
                  className="px-3 py-1.5 text-xs font-medium text-green-700 bg-green-50 rounded-lg hover:bg-green-100 transition-all active:scale-95 active:shadow-inner focus:ring-2 focus:ring-green-300"
                  onClick={handleSaveStyle}
                >
                  Guardar
                </button>
            </div>
            )}
            {feedback && (
              <div className="w-full flex justify-center mt-2">
                <span className="text-xs text-green-600 font-semibold animate-pulse bg-green-50 rounded px-3 py-1 shadow">{feedback}</span>
              </div>
            )}
            {/* Mostrar input y botón guardar solo si NO es un estilo por defecto */}
            {!["Clevergy", "Cangrejo Rosa", "Gas Naranja"].includes(styleName) && (
              <div className="flex flex-col gap-2 mt-6 border-t pt-4">
              <input
                type="text"
                  className="w-full text-xs border rounded-lg px-2 py-1 bg-gray-50"
                  placeholder="Nombre del estilo"
                  value={styleName}
                  onChange={e => setStyleName(e.target.value)}
                  maxLength={32}
              />
            <button
                  className="px-4 py-1.5 text-xs font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-all active:scale-95 active:shadow-inner focus:ring-2 focus:ring-blue-300"
                  style={{ minWidth: 80 }}
                  onClick={handleSaveStyle}
                >
                  Guardar estilo
            </button>
              </div>
            )}
        </div>
        )}
      </div>

      {/* Lista de módulos */}
      <div className="flex-1 overflow-y-auto p-4">
        <h3 className="text-sm font-medium text-gray-900 mb-4">
          Módulos Clevergy
          <span className="ml-2 text-xs text-gray-500">({modules.length})</span>
        </h3>
        {/* 1. Sección inicial: Explora sin autenticar */}
        <div className="mb-6">
          <details className="border rounded-lg" open>
            <summary className="px-4 py-3 text-base font-semibold cursor-pointer bg-blue-100 border-b rounded-t-lg flex items-center gap-2 select-none">
              <span role="img" aria-label="puzzle">🌐</span>
              <span>Públicos ({modules.filter(m => !m.auth).length})</span>
              <svg className="ml-2 transition-transform group-open:rotate-90" width="16" height="16" fill="none" viewBox="0 0 24 24"><path d="M8 10l4 4 4-4" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </summary>
            <div className="p-4">
              <div className="flex items-center gap-2 mb-3 text-blue-700 bg-blue-50 border border-blue-100 rounded-lg px-3 py-2 text-xs">
                <Info size={16} className="text-blue-400" />
                <span>Estos módulos no requieren autenticación. Puedes probarlos directamente.</span>
              </div>
              <div>
                {Object.entries(groupedModules).map(([cat, mods]) => {
                  const publicMods = Array.isArray(mods) ? mods.filter(m => !m.auth) : [];
                  if (publicMods.length === 0) return null;
                  return (
                    <div key={cat} className="mb-2">
                      <div className="text-xs font-bold text-gray-700 mb-1">{cat}</div>
                      <div className="space-y-1">
                        {publicMods.map(module => {
                          const attrs = extractAttrs(module.htmlTag);
                          const showCustom = customAttrs[module.id]?.show || false;
                          return (
                            <div
                              key={module.id}
                              className="relative bg-white rounded-lg border border-gray-100 shadow-sm p-2 group cursor-grab hover:shadow-md transition-shadow flex flex-col gap-1"
                              draggable
                              onDragStart={e => handleDragStart(e, module)}
                              style={{ marginBottom: 4 }}
                            >
                              <div className="flex items-center justify-between w-full gap-2">
                                <div className="flex-1 min-w-0">
                                  <h4 className="font-medium text-gray-900 text-xs truncate">{module.name}</h4>
                                  <p className="text-xs text-gray-600 line-clamp-1 truncate">{module.description}</p>
                                </div>
                                <button
                                  className="text-xs text-blue-600 hover:bg-blue-50 border border-blue-100 rounded px-2 py-1 font-medium whitespace-nowrap ml-2"
                                  onClick={e => {
                                    e.stopPropagation();
                                    setCustomAttrs(prev => ({
                                      ...prev,
                                      [module.id]: { ...prev[module.id], show: !showCustom }
                                    }));
                                  }}
                                  type="button"
                                >
                                  {showCustom ? 'Ocultar' : 'Personalizar'}
                                </button>
                              </div>
                              {showCustom && (
                                <div className="mt-2 space-y-2">
                                  {(() => {
                                    // Orden específico para energy-prices
                                    if (module.id === 'energy-prices') {
                                      const orderedAttrs = [];
                                      if ('data-energy-prices-type' in attrs) orderedAttrs.push(['data-energy-prices-type', attrs['data-energy-prices-type']]);
                                      if ('data-language' in attrs) orderedAttrs.push(['data-language', attrs['data-language']]);
                                      if ('data-show-energy-price-list' in attrs) orderedAttrs.push(['data-show-energy-price-list', attrs['data-show-energy-price-list']]);
                                      // El surplus siempre el último
                                      if ('data-show-energy-price-surplus' in attrs) orderedAttrs.push(['data-show-energy-price-surplus', attrs['data-show-energy-price-surplus']]);
                                      // El resto de atributos
                                      Object.entries(attrs).forEach(([attr, val]) => {
                                        if (!['data-energy-prices-type','data-language','data-show-energy-price-list','data-show-energy-price-surplus'].includes(attr)) {
                                          orderedAttrs.push([attr, val]);
                                        }
                                      });
                                      return orderedAttrs.map(([attr, val]) => {
                                        // Selector de idioma
                                        if (attr === 'data-language') {
                                          return (
                                            <div key={attr} className="flex items-center gap-2">
                                              <label className="text-xs text-gray-500 w-40 truncate">{attr}</label>
                                              <select
                                                className="flex-1 border rounded px-2 py-1 text-xs"
                                                value={customAttrs[module.id]?.[attr] ?? val}
                                                onChange={e => setCustomAttrs(prev => ({
                                                  ...prev,
                                                  [module.id]: { ...prev[module.id], [attr]: e.target.value }
                                                }))}
                                              >
                                                <option value="es-ES">es-ES</option>
                                                <option value="ca-ES">ca-ES</option>
                                                <option value="gl-ES">gl-ES</option>
                                              </select>
                                            </div>
                                          );
                                        }
                                        // Select para tipo
                                        if (attr === 'data-energy-prices-type') {
                                          return (
                                            <div key={attr} className="flex items-center gap-2">
                                              <label className="text-xs text-gray-500 w-40 truncate">{attr}</label>
                                              <select
                                                className="flex-1 border rounded px-2 py-1 text-xs"
                                                value={customAttrs[module.id]?.[attr] ?? val}
                                                onChange={e => setCustomAttrs(prev => ({
                                                  ...prev,
                                                  [module.id]: { ...prev[module.id], [attr]: e.target.value }
                                                }))}
                                              >
                                                <option value="PVPC">PVPC</option>
                                                <option value="OMIE">OMIE</option>
                                              </select>
                                            </div>
                                          );
                                        }
                                        // Booleanos como checkbox
                                        if (val === 'true' || val === 'false') {
                                          return (
                                            <div key={attr} className="flex items-center gap-2">
                                              <label className="text-xs text-gray-500 w-40 truncate">{attr}</label>
                                              <input
                                                type="checkbox"
                                                checked={(customAttrs[module.id]?.[attr] ?? val) === 'true'}
                                                onChange={e => setCustomAttrs(prev => ({
                                                  ...prev,
                                                  [module.id]: { ...prev[module.id], [attr]: e.target.checked ? 'true' : 'false' }
                                                }))}
                                              />
                                            </div>
                                          );
                                        }
                                        // Por defecto, input de texto
                                        return (
                                          <div key={attr} className="flex items-center gap-2">
                                            <label className="text-xs text-gray-500 w-40 truncate">{attr}</label>
                                            <input
                                              className="flex-1 border rounded px-2 py-1 text-xs"
                                              type="text"
                                              value={customAttrs[module.id]?.[attr] ?? val}
                                              onChange={e => setCustomAttrs(prev => ({
                                                ...prev,
                                                [module.id]: { ...prev[module.id], [attr]: e.target.value }
                                              }))}
                                            />
                                          </div>
                                        );
                                      });
                                    }
                                    // Para el resto de módulos, render normal
                                    return Object.entries(attrs).map(([attr, val]) => {
                                      if (attr === 'data-language') {
                                        return (
                                          <div key={attr} className="flex items-center gap-2">
                                            <label className="text-xs text-gray-500 w-40 truncate">{attr}</label>
                                            <select
                                              className="flex-1 border rounded px-2 py-1 text-xs"
                                              value={customAttrs[module.id]?.[attr] ?? val}
                                              onChange={e => setCustomAttrs(prev => ({
                                                ...prev,
                                                [module.id]: { ...prev[module.id], [attr]: e.target.value }
                                              }))}
                                            >
                                              <option value="es-ES">es-ES</option>
                                              <option value="ca-ES">ca-ES</option>
                                              <option value="gl-ES">gl-ES</option>
                                            </select>
                                          </div>
                                        );
                                      }
                                      if (module.id === 'energy-prices' && attr === 'data-energy-prices-type') {
                                        return (
                                          <div key={attr} className="flex items-center gap-2">
                                            <label className="text-xs text-gray-500 w-40 truncate">{attr}</label>
                                            <select
                                              className="flex-1 border rounded px-2 py-1 text-xs"
                                              value={customAttrs[module.id]?.[attr] ?? val}
                                              onChange={e => setCustomAttrs(prev => ({
                                                ...prev,
                                                [module.id]: { ...prev[module.id], [attr]: e.target.value }
                                              }))}
                                            >
                                              <option value="PVPC">PVPC</option>
                                              <option value="OMIE">OMIE</option>
                                            </select>
                                          </div>
                                        );
                                      }
                                      if (val === 'true' || val === 'false') {
                                        return (
                                          <div key={attr} className="flex items-center gap-2">
                                            <label className="text-xs text-gray-500 w-40 truncate">{attr}</label>
                                            <input
                                              type="checkbox"
                                              checked={(customAttrs[module.id]?.[attr] ?? val) === 'true'}
                                              onChange={e => setCustomAttrs(prev => ({
                                                ...prev,
                                                [module.id]: { ...prev[module.id], [attr]: e.target.checked ? 'true' : 'false' }
                                              }))}
                                            />
                                          </div>
                                        );
                                      }
                                      return (
                                        <div key={attr} className="flex items-center gap-2">
                                          <label className="text-xs text-gray-500 w-40 truncate">{attr}</label>
                                          <input
                                            className="flex-1 border rounded px-2 py-1 text-xs"
                                            type="text"
                                            value={customAttrs[module.id]?.[attr] ?? val}
                                            onChange={e => setCustomAttrs(prev => ({
                                              ...prev,
                                              [module.id]: { ...prev[module.id], [attr]: e.target.value }
                                            }))}
                                          />
                                        </div>
                                      );
                                    });
                                  })()}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </details>
        </div>

        {/* 2. Sección Accede a módulos privados (plegable, CTA) */}
        <div className="mb-6">
          <details className="border rounded-lg" open={!!token && !!houseId ? true : undefined}>
            <summary className="px-4 py-3 text-base font-semibold cursor-pointer bg-green-100 border-b rounded-t-lg flex items-center gap-2 select-none">
              <span role="img" aria-label="lock">🔒</span>
              <span>Privados ({totalPrivateModules})</span>
              <svg className="ml-2 transition-transform group-open:rotate-90" width="16" height="16" fill="none" viewBox="0 0 24 24"><path d="M8 10l4 4 4-4" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </summary>
            <div className="p-4">
              {/* Si ya hay token y houseId, muestra los módulos privados */}
              {token && houseId ? (
                <div>
                  {Object.entries(groupedModules).map(([cat, mods]) => {
                    const privateMods = Array.isArray(mods) ? mods.filter(m => m.auth) : [];
                    if (privateMods.length === 0) return null;
                    return (
                      <div key={cat} className="mb-2 border rounded-lg">
                        <button
                          className={`flex items-center w-full px-3 py-2 text-sm font-semibold gap-2 ${categoryInfo[cat]?.border || ''} ${categoryInfo[cat]?.iconBg || ''} rounded-t-lg focus:outline-none select-none`}
                          style={{ background: openCategories[cat] ? '#f8fafc' : '#fff' }}
                          onClick={() => setOpenCategories(open => ({ ...open, [cat]: !open[cat] }))}
                        >
                          <span className={`w-6 h-6 flex items-center justify-center rounded-full ${categoryInfo[cat]?.iconBg}`}>{categoryInfo[cat]?.icon}</span>
                          <span className="flex-1 text-left">{cat} ({privateMods.length})</span>
                          <svg className={`transition-transform ${openCategories[cat] ? 'rotate-90' : ''}`} width="16" height="16" fill="none" viewBox="0 0 24 24"><path d="M8 10l4 4 4-4" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        </button>
                        {openCategories[cat] && (
                          <div className="p-1 space-y-1 bg-white rounded-b-lg">
                            {privateMods.map(module => {
                              const attrs = extractAttrs(module.htmlTag);
                              const showCustom = customAttrs[module.id]?.show || false;
                              return (
                                <div
                                  key={module.id}
                                  className="relative bg-white rounded-lg border border-gray-100 shadow-sm p-2 group cursor-grab hover:shadow-md transition-shadow flex flex-col gap-1"
                                  draggable
                                  onDragStart={e => handleDragStart(e, module)}
                                  style={{ marginBottom: 4 }}
                                >
                                  <div className="flex items-center justify-between w-full gap-2">
                                    <div className="flex-1 min-w-0">
                                      <h4 className="font-medium text-gray-900 text-xs truncate">{module.name}</h4>
                                      <p className="text-xs text-gray-600 line-clamp-1 truncate">{module.description}</p>
                                    </div>
                                    <button
                                      className="text-xs text-blue-600 hover:bg-blue-50 border border-blue-100 rounded px-2 py-1 font-medium whitespace-nowrap ml-2"
                                      onClick={e => {
                                        e.stopPropagation();
                                        setCustomAttrs(prev => ({
                                          ...prev,
                                          [module.id]: { ...prev[module.id], show: !showCustom }
                                        }));
                                      }}
                                      type="button"
                                    >
                                      {showCustom ? 'Ocultar' : 'Personalizar'}
                                    </button>
                                  </div>
                {showCustom && (
                                    <div className="mt-2 space-y-2">
                    {(() => {
                      // Orden específico para energy-prices
                      if (module.id === 'energy-prices') {
                        const orderedAttrs = [];
                        if ('data-energy-prices-type' in attrs) orderedAttrs.push(['data-energy-prices-type', attrs['data-energy-prices-type']]);
                        if ('data-language' in attrs) orderedAttrs.push(['data-language', attrs['data-language']]);
                        if ('data-show-energy-price-list' in attrs) orderedAttrs.push(['data-show-energy-price-list', attrs['data-show-energy-price-list']]);
                        // El surplus siempre el último
                        if ('data-show-energy-price-surplus' in attrs) orderedAttrs.push(['data-show-energy-price-surplus', attrs['data-show-energy-price-surplus']]);
                        // El resto de atributos
                        Object.entries(attrs).forEach(([attr, val]) => {
                          if (!['data-energy-prices-type','data-language','data-show-energy-price-list','data-show-energy-price-surplus'].includes(attr)) {
                            orderedAttrs.push([attr, val]);
                          }
                        });
                        return orderedAttrs.map(([attr, val]) => {
                          // Selector de idioma
                          if (attr === 'data-language') {
                            return (
                              <div key={attr} className="flex items-center gap-2">
                                <label className="text-xs text-gray-500 w-40 truncate">{attr}</label>
                                <select
                                  className="flex-1 border rounded px-2 py-1 text-xs"
                                  value={customAttrs[module.id]?.[attr] ?? val}
                                  onChange={e => setCustomAttrs(prev => ({
                                    ...prev,
                                    [module.id]: { ...prev[module.id], [attr]: e.target.value }
                                  }))}
                                >
                                  <option value="es-ES">es-ES</option>
                                  <option value="ca-ES">ca-ES</option>
                                  <option value="gl-ES">gl-ES</option>
                                </select>
                              </div>
                            );
                          }
                          // Select para tipo
                          if (attr === 'data-energy-prices-type') {
                            return (
                              <div key={attr} className="flex items-center gap-2">
                                <label className="text-xs text-gray-500 w-40 truncate">{attr}</label>
                                <select
                                  className="flex-1 border rounded px-2 py-1 text-xs"
                                  value={customAttrs[module.id]?.[attr] ?? val}
                                  onChange={e => setCustomAttrs(prev => ({
                                    ...prev,
                                    [module.id]: { ...prev[module.id], [attr]: e.target.value }
                                  }))}
                                >
                                  <option value="PVPC">PVPC</option>
                                  <option value="OMIE">OMIE</option>
                                </select>
                              </div>
                            );
                          }
                          // Booleanos como checkbox
                          if (val === 'true' || val === 'false') {
                            return (
                              <div key={attr} className="flex items-center gap-2">
                                <label className="text-xs text-gray-500 w-40 truncate">{attr}</label>
                                <input
                                  type="checkbox"
                                  checked={(customAttrs[module.id]?.[attr] ?? val) === 'true'}
                                  onChange={e => setCustomAttrs(prev => ({
                                    ...prev,
                                    [module.id]: { ...prev[module.id], [attr]: e.target.checked ? 'true' : 'false' }
                                  }))}
                                />
                              </div>
                            );
                          }
                          // Por defecto, input de texto
                          return (
                            <div key={attr} className="flex items-center gap-2">
                              <label className="text-xs text-gray-500 w-40 truncate">{attr}</label>
                              <input
                                className="flex-1 border rounded px-2 py-1 text-xs"
                                type="text"
                                value={customAttrs[module.id]?.[attr] ?? val}
                                onChange={e => setCustomAttrs(prev => ({
                                  ...prev,
                                  [module.id]: { ...prev[module.id], [attr]: e.target.value }
                                }))}
                              />
                            </div>
                          );
                        });
                      }
                      // Para el resto de módulos, render normal
                      return Object.entries(attrs).map(([attr, val]) => {
                        if (attr === 'data-language') {
                          return (
                            <div key={attr} className="flex items-center gap-2">
                              <label className="text-xs text-gray-500 w-40 truncate">{attr}</label>
                              <select
                                className="flex-1 border rounded px-2 py-1 text-xs"
                                value={customAttrs[module.id]?.[attr] ?? val}
                                onChange={e => setCustomAttrs(prev => ({
                                  ...prev,
                                  [module.id]: { ...prev[module.id], [attr]: e.target.value }
                                }))}
                              >
                                <option value="es-ES">es-ES</option>
                                <option value="ca-ES">ca-ES</option>
                                <option value="gl-ES">gl-ES</option>
                              </select>
                            </div>
                          );
                        }
                        if (module.id === 'energy-prices' && attr === 'data-energy-prices-type') {
                          return (
                            <div key={attr} className="flex items-center gap-2">
                              <label className="text-xs text-gray-500 w-40 truncate">{attr}</label>
                              <select
                                className="flex-1 border rounded px-2 py-1 text-xs"
                                value={customAttrs[module.id]?.[attr] ?? val}
                                onChange={e => setCustomAttrs(prev => ({
                                  ...prev,
                                  [module.id]: { ...prev[module.id], [attr]: e.target.value }
                                }))}
                              >
                                <option value="PVPC">PVPC</option>
                                <option value="OMIE">OMIE</option>
                              </select>
                            </div>
                          );
                        }
                        if (val === 'true' || val === 'false') {
                          return (
                            <div key={attr} className="flex items-center gap-2">
                              <label className="text-xs text-gray-500 w-40 truncate">{attr}</label>
                              <input
                                type="checkbox"
                                checked={(customAttrs[module.id]?.[attr] ?? val) === 'true'}
                                onChange={e => setCustomAttrs(prev => ({
                                  ...prev,
                                  [module.id]: { ...prev[module.id], [attr]: e.target.checked ? 'true' : 'false' }
                                }))}
                              />
                            </div>
                          );
                        }
                        return (
                          <div key={attr} className="flex items-center gap-2">
                            <label className="text-xs text-gray-500 w-40 truncate">{attr}</label>
                            <input
                              className="flex-1 border rounded px-2 py-1 text-xs"
                              type="text"
                              value={customAttrs[module.id]?.[attr] ?? val}
                              onChange={e => setCustomAttrs(prev => ({
                                ...prev,
                                [module.id]: { ...prev[module.id], [attr]: e.target.value }
                              }))}
                            />
                          </div>
                        );
                      });
                    })()}
                  </div>
                )}
              </div>
            );
          })}
        </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {/* Mini-asistente paso a paso */}
                  <div className="bg-gray-50 border border-gray-200 rounded-lg shadow p-4 flex flex-col gap-4">
                    <div className="flex items-center gap-2 text-sm font-semibold mb-2"><span>🪜</span>Paso 1: Buscar usuario</div>
                    <div className="flex gap-2">
                      <Input className="flex-1" placeholder="Nombre, DNI o email" />
                      <button className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-medium hover:bg-blue-700 transition">Buscar</button>
                    </div>
                    {/* Aquí iría la lista de resultados de usuarios (cards pequeñas) */}
                    <div className="flex items-center gap-2 text-sm font-semibold mt-4"><span>🏡</span>Paso 2: Ver casas del usuario</div>
                    {/* Aquí iría la lista de casas (cards con botón 'Usar esta casa') */}
                    <div className="flex items-center gap-2 text-sm font-semibold mt-4"><span>🔑</span>Paso 3: Generar token</div>
                    {/* Aquí iría el feedback de autenticación completada */}
                  </div>
                  {/* Opción para introducir token y houseId manualmente */}
                  <div className="text-xs text-gray-500 text-center mt-2">
                    ¿Ya tienes token y house ID? <button className="underline text-blue-600 hover:text-blue-800">Introdúcelos aquí manualmente</button>
                  </div>
                  {/* Mensaje si no hay token */}
                  <div className="flex items-center gap-2 text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2 text-xs mt-2">
                    <span>🚫</span> Estos módulos requieren autenticación. Completa los pasos anteriores para desbloquearlos.
                  </div>
                </div>
              )}
            </div>
          </details>
        </div>
      </div>
    </div>
  );
};

export default ModuleSidebar;
