export const portfolioData = {
  identity: {
    name: "Mónica Cubides Rojas",
    role: "Experta en Planeación Financiera",
    secondaryRole: "Profesional en Seguros",
    niche: "Protección Patrimonial & Planeación Financiera",
    location: "Bogotá, Colombia",
    alliance: "Aliada Certificada Skandia Colombia",
  },

  brand: {
    style: "Experta en Planeación Financiera - Dark Luxury",
    primaryColor: "#8ee002",
    tealColor: "#2dd19c",
    deepColor: "#03c73f",
    backgroundColor: "#050505",
    surfaceColor: "#0F1310",
    textColor: "#FFFFFF",
    mutedTextColor: "#8F9F96",
  },

  nav: {
    brandTitle: "Mónica Cubides",
    brandSubtitle: "Experta en Planeación Financiera",
    links: [
      { label: "Inicio", href: "#inicio" },
      { label: "Proyecciones", href: "#proyecciones" },
      { label: "Servicios", href: "#servicios" },
      { label: "Respaldo", href: "#respaldo" },
      { label: "Contacto", href: "#contacto" },
    ],
    cta: "Agendar Sesión",
  },

  hero: {
    eyebrow: "Experta en Planeación Financiera - Aliada Skandia",
    headline: "Protección y crecimiento real de tu patrimonio.",
    subheadline: "Estructuro planes de ahorro e inversión con respaldo institucional para asegurar la educación de tus hijos y tu libertad financiera, optimizando cada peso desde $15.000 diarios.",
    primaryCTA: "Simular Mi Futuro",
    secondaryCTA: "Mi Respaldo",
    trustBadges: ["Skandia Colombia", "SFC Certificada", "Profesional en Seguros"],
    floatingBadgeOne: { value: "70 Años", label: "Respaldo Skandia Global" },
    floatingBadgeTwo: { value: "8% E.A.", label: "Rentabilidad Proyectada" },
    portrait: "/images/monica-portrait.jpg",
  },

  about: {
    eyebrow: "Misión Profesional",
    headline: "Arquitectura financiera basada en datos, no en promesas.",
    paragraphOne: "Acompaño a familias y empresarios a transformar el flujo de caja actual en un respaldo sólido para el mañana.",
    paragraphTwo: "Mi enfoque no es vender productos; es diseñar la estructura que permite que tu dinero trabaje para ti bajo la seguridad de Skandia Colombia.",
    highlights: [
      "Optimización Tributaria",
      "Portafolios Globales",
      "Seguridad Institucional",
    ],
  },

  wealthEngine: {
    title: "Simulador Patrimonial: El Poder de la Constancia",
    subtitle: "Desplaza el control para ver cómo pequeñas decisiones diarias se convierten en un capital sólido a lo largo del tiempo, bajo una tasa proyectada del 8% E.A.",
    sliderMin: 15000,
    sliderMax: 150000,
    sliderStep: 5000,
    sliderDefault: 30000,
    annualRate: 0.08,
    disclaimer: "*Proyección referencial calculada con interés compuesto al 8% E.A. No constituye una garantía de rentabilidad. Los resultados reales dependen del fondo, plazo y condiciones de mercado vigentes.",
    periods: [
      { months: 12, label: "1 Año" },
      { months: 60, label: "5 Años" },
      { months: 120, label: "10 Años" },
    ],
  },

  credentials: {
    eyebrow: "Respaldo Institucional",
    title: "Respaldo Institucional e Integridad",
    subtitle: "La tranquilidad no se improvisa. Mi trabajo cuenta con la certificación y la solidez de las instituciones financieras líderes de Colombia.",
    skandiaLogo: "/images/skandia-logo.png",
    certificate: {
      awardTitle: "Re-Evolución: Elegido en la Comunidad de Seguros",
      issuedTo: "Mónica Cubides Rojas",
      issuedBy: [
        "Santiago García - Presidente Skandia Colombia",
        "Rodrigo Iñiguez - Vicepresidente Comercial",
      ],
      date: "17 de Abril de 2024",
    },
    stats: [
      { value: "70", suffix: " Años", label: "Solidez del Grupo Skandia" },
      { value: "SFC", suffix: "", label: "Entidad Vigilada" },
      { value: "10+", suffix: " Años", label: "Experiencia en Consultoría" },
    ],
  },

  services: [
    {
      title: "Protección Universitaria",
      subtitle: "Fondo de Educación",
      description: "Garantiza el pago de la universidad de tus hijos desde hoy sin sacrificar tu liquidez futura. Un plan que crece con ellos.",
      result: "Desde $15.000 COP diarios",
      marker: "01",
      icon: "graduation",
    },
    {
      title: "Inversión Libre",
      subtitle: "Wealth Building",
      description: "Construcción de portafolios diversificados respaldados por Skandia para metas a mediano y largo plazo. Tu dinero trabaja mientras tú vives.",
      result: "Tasa promedio proyectada: 8% E.A.",
      marker: "02",
      icon: "growth",
    },
    {
      title: "Blindaje Patrimonial",
      subtitle: "Seguro de Vida",
      description: "Estructuras de protección de alta gama para asegurar la estabilidad financiera de tu familia y socios en cualquier escenario.",
      result: "Protección familiar inmediata",
      marker: "03",
      icon: "shield",
    },
  ],

  work: [
    {
      title: "El Plan Universitario",
      category: "Fondo de Educación",
      context: "Padres con un hijo de 5 años preocupados por los costos de matrícula universitaria en 13 años.",
      strategy: "Ahorro programado con inversión compuesta a largo plazo bajo el fondo educativo de Skandia.",
      impact: "100% de la carrera financiada al llegar a sus 18 años, con un esfuerzo diario mínimo de $15.000 COP.",
      metric: "100%",
      metricLabel: "Carrera Cubierta",
    },
    {
      title: "Optimización de Estilo de Vida",
      category: "Wealth Building",
      context: "Profesional con altos ingresos que gastaba excesivamente en marcas de lujo y suscripciones no utilizadas.",
      strategy: "Redireccionamiento de $850.500 COP mensuales hacia un portafolio compuesto diversificado.",
      impact: "Más de 154 millones COP proyectados a 10 años para un retiro anticipado con libertad total.",
      metric: "+$154M",
      metricLabel: "COP a 10 años",
    },
  ],

  process: [
    {
      step: "01",
      title: "Diagnóstico Financiero",
      description: "Analizamos tu presupuesto actual, identificamos fugas de capital y definimos tus objetivos de vida prioritarios.",
      duration: "Sesión de 45 min",
      icon: "search",
    },
    {
      step: "02",
      title: "Diseño Estructurado",
      description: "Estructuramos una propuesta personalizada bajo los fondos más eficientes de Skandia Colombia, optimizando beneficios tributarios.",
      duration: "1 a 2 semanas",
      icon: "blueprint",
    },
    {
      step: "03",
      title: "Acompañamiento & Monitoreo",
      description: "Implementamos tu plan y realizamos revisiones periódicas para asegurar que tu dinero siga rindiendo al ritmo que necesitas.",
      duration: "Seguimiento continuo",
      icon: "handshake",
    },
  ],

  testimonials: [
    {
      quote: "Ver las proyecciones en papel me hizo dar cuenta de que asegurar la universidad de mi hija era totalmente viable sin cambiar mi ritmo de vida. El profesionalismo de Mónica es impecable.",
      name: "Alejandro R.",
      role: "Diseñador de Interiores y Padre",
    },
    {
      quote: "Mónica no te vende un seguro; te enseña a ver el dinero como una herramienta de libertad a largo plazo. Su alianza con Skandia me dio la confianza que necesitaba.",
      name: "Carolina M.",
      role: "Empresaria de Moda",
    },
  ],

  contact: {
    eyebrow: "Siguiente Paso",
    headline: "¿Listo para estructurar tu libertad financiera?",
    text: "Agenda una sesión estratégica gratuita de 15 minutos. Analizaremos tu caso sin compromisos.",
    whatsappLabel: "Hablemos por WhatsApp",
    whatsapp: "https://wa.me/573195772983",
    email: "monicacubides82@gmail.com",
  },

  footer: {
    text: "Construyendo patrimonio y tranquilidad, una decisión a la vez.",
    legal: "Asesoría independiente bajo alianza comercial con Skandia Colombia. Todos los derechos reservados.",
  },
};