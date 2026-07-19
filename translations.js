const TRANSLATIONS = {
  en: {
    title: "Albert Ortells — Backend Engineer",
    nav: {
      role: "// BACKEND ENGINEER",
      experience: "Experience",
      industries: "Industries",
      stack: "Stack",
      contact: "Contact",
      techtests: "Tech Tests"
    },
    hero: {
      eyebrow: "Statement of work",
      h1: "Four industries. One discipline: build for what breaks.",
      lede: "Backend engineer with <strong>7+ years</strong> across banking, automotive, public administration and travel-tech. The domain changes every time — the focus on systems that hold up under real conditions doesn't. Currently leading backend integrations at Neobookings.",
      ctaLog: "View the log ↓",
      ctaEmail: "Email me"
    },
    ticker: {
      years: "years across banking, automotive, public sector & travel-tech",
      companies: "companies and teams",
      legacy: "legacy systems modernized end-to-end",
      tolerance: "tolerance for inconsistent state in distributed systems"
    },
    log: { eyebrow: "01 — Track record", h2: "Experience" },
    status: { active: "ACTIVE", settled: "SETTLED" },
    toggle: { more: "Show more", less: "Show less" },
    entry1: {
      when: "2023 — PRESENT",
      role: "Senior Backend Engineer",
      desc: "Own backend integrations for a B2B travel-tech platform — payments, PMS connectivity and the loyalty program — after helping split a legacy monolith into domain services.",
      more1: "Leading the unification of 18+ external payment providers (Stripe, Redsys, Adyen, OpenPay, PlaceToPay and more) into one resilient flow, with database-level idempotency to eliminate duplicate transactions under concurrency.",
      more2: "Designed and built the loyalty program from scratch, and integrated multiple external Property Management Systems (PMS) to keep inventory and bookings in sync across the platform.",
      more3: "Contributed to splitting a legacy monolith into Payments, Loyalty and Inventory services through event storming, and mentors newer developers through onboarding and pair programming."
    },
    entry2: {
      role: "Backend Developer — My SEAT App",
      desc: "Built and maintained REST APIs powering remote vehicle control and telemetry for a connected-car mobile app, keeping data consistent across asynchronous, distributed sources.",
      more1: "Worked within a distributed architecture where vehicle sensors sent data to backend services, which exposed it through APIs consumed by the mobile app. Focused on implementing business logic for vehicle status, remote actions and telemetry data.",
      more2: "Though the project was in a maintenance phase, it gave deep exposure to distributed system design, service communication and how domain boundaries emerge in real systems — foundational for the integration work that followed at Neobookings."
    },
    entry3: {
      role: "Full Stack Developer (via CAS Training)",
      desc: "Modernized a legacy fiscal-declaration platform for the agricultural sector — migrating AngularJS to Angular, hardening the Spring backend, and translating stakeholder requirements directly into shipped features.",
      more1: "Took on a hybrid role combining development, technical decision-making and coordination, working within a legacy system used by farmers and livestock professionals to submit and manage fiscal declarations.",
      more2: "Participated directly in technical and functional requirement definition with stakeholders, and supported junior developers while contributing to solution design — strengthening the ability to navigate ambiguous, multi-stakeholder environments and turn business requirements into shipped technical decisions."
    },
    entry4: {
      when: "MAY 2021 — JUN 2021",
      role: "Backend Developer · Castelldefels",
      desc: "Backend developer also contributing to Angular front-end work on insurance-sector projects for Catalana Occident.",
      more1: "Two-month engagement combining backend development with hands-on Angular work for Catalana Occident, getting exposure to how insurance-sector platforms structure data and workflows between backend services and client-facing interfaces."
    },
    entry5: {
      when: "NOV 2019 — MAY 2021",
      role: "Frontend Developer — via Tenea Tecnologías, then internal at DXC Technology",
      desc: "Built the dashboard business clients use to manage financial operations — starting as an external contractor and earning a place on DXC Technology's internal team.",
      more1: "Joined the project as an external contractor placed through Tenea Tecnologías, working inside DXC Technology's team on a digital banking dashboard for business clients. After proving his work over several months, DXC brought him on directly as internal staff — continuing on the same project.",
      more2: "Focused on implementing UI components from design specs (JSP-based architecture), integrating frontend logic with backend APIs to display real-time financial data, and reducing friction in key operations — reinforcing how much backend data contracts shape frontend usability."
    },
    entry6: {
      role: "Java Developer",
      desc: "Maintenance developer on Java Swing desktop applications wired directly to the database, resolving tickets in a Kanban flow.",
      more1: "Worked on thick-client Java Swing interfaces connected directly to the database with no backend layer in between — a different paradigm from the API-first, service-oriented work that came both before and after in his career.",
      more2: "Operated within a Kanban-driven maintenance project, picking up tickets and resolving them independently, which sharpened the ability to work efficiently within tightly scoped, ticket-based workflows."
    },
    entry7: {
      when: "JUL 2018 — APR 2019",
      role: "Software Programmer · Barcelona",
      desc: "First professional role — junior developer on projects for Volkswagen Group España Distribución (VGED) and Grupo Planeta.",
      more1: "The starting point of a backend career: as a junior developer discovering the professional world, this is where fundamentals like Spring Boot, Liquibase-managed database migrations, testing tools and agile methodologies were first put into practice on real client work for VGED and Grupo Planeta.",
      more2: "Everything since — from legacy modernization to payment infrastructure — has built on what got picked up here first."
    },
    industries: { eyebrow: "02 — Industries", h2: "Same discipline, different playing fields" },
    industry: {
      travel: { tag: "Travel-tech", note: "Payments, PMS connectivity and loyalty for a B2B hotel distribution platform." },
      automotive: { tag: "Automotive", note: "Backend APIs for remote vehicle control and telemetry on a connected-car app." },
      public: { tag: "Public sector", note: "Modernized a legacy fiscal-declaration platform for the agricultural sector." },
      banking: { tag: "Banking", note: "Frontend for a business dashboard managing financial operations." }
    },
    stack: {
      eyebrow: "03 — Balance sheet", h2: "Stack",
      runtime: "Runtime", infrastructure: "Infrastructure", interface: "Interface", practice: "Practice"
    },
    practice: {
      item1: "Clean code", item2: "API-first design", item3: "Event storming", item4: "Idempotent by default"
    },
    languages: "Spanish (native) · Catalan (native) · English (professional working proficiency)",
    contact: {
      tear: "✂ TEAR HERE",
      eyebrow: "04 — Authorize",
      h2: "Let's talk about what you're building.",
      lede: "Open to conversations about backend engineering and distributed systems, across any industry.",
      footnote: "Receipt No. 000-ALBERT-ORTELLS · Thank you for scrolling"
    }
  },

  es: {
    title: "Albert Ortells — Ingeniero Backend",
    nav: {
      role: "// INGENIERO BACKEND",
      experience: "Experiencia",
      industries: "Sectores",
      stack: "Stack",
      contact: "Contacto",
      techtests: "Pruebas técnicas"
    },
    hero: {
      eyebrow: "Orden de trabajo",
      h1: "Cuatro sectores. Una misma disciplina: construir para lo que falla.",
      lede: "Ingeniero backend con <strong>7+ años</strong> de experiencia en banca, automoción, administración pública y travel-tech. El sector cambia cada vez — el foco en sistemas que aguantan condiciones reales, no. Actualmente lidero integraciones backend en Neobookings.",
      ctaLog: "Ver el historial ↓",
      ctaEmail: "Escríbeme"
    },
    ticker: {
      years: "años en banca, automoción, sector público y travel-tech",
      companies: "empresas y equipos",
      legacy: "sistemas legacy modernizados de principio a fin",
      tolerance: "tolerancia a estados inconsistentes en sistemas distribuidos"
    },
    log: { eyebrow: "01 — Historial", h2: "Experiencia" },
    status: { active: "ACTIVO", settled: "CERRADO" },
    toggle: { more: "Ver más", less: "Ver menos" },
    entry1: {
      when: "2023 — ACTUALIDAD",
      role: "Ingeniero Backend Senior",
      desc: "Responsable de las integraciones backend de una plataforma B2B de travel-tech — pagos, conectividad con PMS y el programa de fidelización — tras ayudar a dividir un monolito legacy en servicios de dominio.",
      more1: "Liderando la unificación de 18+ proveedores de pago externos (Stripe, Redsys, Adyen, OpenPay, PlaceToPay y más) en un único flujo resiliente, con idempotencia a nivel de base de datos para eliminar transacciones duplicadas bajo concurrencia.",
      more2: "Diseñé y construí el programa de fidelización desde cero, e integré varios Property Management Systems (PMS) externos para mantener sincronizados el inventario y las reservas en toda la plataforma.",
      more3: "Contribuí a dividir un monolito legacy en los servicios de Pagos, Fidelización e Inventario mediante event storming, y hago de mentor de nuevos desarrolladores en el onboarding y con pair programming."
    },
    entry2: {
      role: "Desarrollador Backend — My SEAT App",
      desc: "Desarrollo y mantenimiento de APIs REST para el control remoto y la telemetría de vehículos en una app móvil de coche conectado, manteniendo la consistencia de datos entre fuentes distribuidas y asíncronas.",
      more1: "Trabajé dentro de una arquitectura distribuida donde los sensores del vehículo enviaban datos a servicios backend, que los exponían mediante APIs consumidas por la app móvil. Centrado en implementar la lógica de negocio para el estado del vehículo, acciones remotas y datos de telemetría.",
      more2: "Aunque el proyecto estaba en fase de mantenimiento, me dio una exposición profunda al diseño de sistemas distribuidos, la comunicación entre servicios y cómo emergen los límites de dominio en sistemas reales — la base para el trabajo de integración que vino después en Neobookings."
    },
    entry3: {
      role: "Full Stack Developer (a través de CAS Training)",
      desc: "Modernización de una plataforma legacy de declaraciones fiscales para el sector agrícola — migrando de AngularJS a Angular, reforzando el backend en Spring, y traduciendo los requisitos de los stakeholders directamente en funcionalidades entregadas.",
      more1: "Asumí un rol híbrido combinando desarrollo, decisiones técnicas y coordinación, trabajando en un sistema legacy usado por agricultores y ganaderos para presentar y gestionar declaraciones fiscales.",
      more2: "Participé directamente en la definición de requisitos técnicos y funcionales con los stakeholders, y di soporte a desarrolladores junior contribuyendo al diseño de la solución — reforzando la capacidad de moverme en entornos ambiguos con múltiples interesados y convertir requisitos de negocio en decisiones técnicas entregadas."
    },
    entry4: {
      when: "MAY 2021 — JUN 2021",
      role: "Desarrollador Backend · Castelldefels",
      desc: "Desarrollador backend que también contribuyó en el frontend con Angular en proyectos del sector seguros para Catalana Occident.",
      more1: "Colaboración de dos meses combinando desarrollo backend con trabajo práctico en Angular para Catalana Occident, con exposición a cómo las plataformas del sector seguros estructuran datos y flujos entre los servicios backend y las interfaces de cliente."
    },
    entry5: {
      when: "NOV 2019 — MAY 2021",
      role: "Desarrollador Frontend — vía Tenea Tecnologías, después interno en DXC Technology",
      desc: "Construí el dashboard que los clientes empresariales usan para gestionar sus operaciones financieras — empezando como contractor externo y ganándome un puesto en el equipo interno de DXC Technology.",
      more1: "Me incorporé al proyecto como contractor externo a través de Tenea Tecnologías, trabajando dentro del equipo de DXC Technology en un dashboard de banca digital para clientes empresariales. Tras demostrar mi trabajo durante varios meses, DXC me contrató directamente como personal interno — continuando en el mismo proyecto.",
      more2: "Centrado en implementar componentes de UI a partir de especificaciones de diseño (arquitectura basada en JSP), integrando la lógica de frontend con las APIs de backend para mostrar datos financieros en tiempo real, y reduciendo fricción en operaciones clave — reforzando cuánto condicionan los contratos de datos del backend la usabilidad del frontend."
    },
    entry6: {
      role: "Desarrollador Java",
      desc: "Desarrollador de mantenimiento en aplicaciones de escritorio Java Swing conectadas directamente a la base de datos, resolviendo tickets en un flujo Kanban.",
      more1: "Trabajé en interfaces thick-client de Java Swing conectadas directamente a la base de datos, sin ninguna capa de backend entre medias — un paradigma distinto al trabajo API-first y orientado a servicios que vino antes y después en mi carrera.",
      more2: "Operé dentro de un proyecto de mantenimiento gestionado con Kanban, cogiendo tickets y resolviéndolos de forma autónoma, lo que perfeccionó mi capacidad de trabajar de forma eficiente en flujos de trabajo muy acotados y basados en tickets."
    },
    entry7: {
      when: "JUL 2018 — ABR 2019",
      role: "Programador de Software · Barcelona",
      desc: "Primer puesto profesional — desarrollador junior en proyectos para Volkswagen Group España Distribución (VGED) y Grupo Planeta.",
      more1: "El punto de partida de una carrera backend: como desarrollador junior descubriendo el mundo profesional, aquí fue donde puse en práctica por primera vez fundamentos como Spring Boot, migraciones de base de datos gestionadas con Liquibase, herramientas de testing y metodologías ágiles, en trabajo real para VGED y Grupo Planeta.",
      more2: "Todo lo que vino después — desde la modernización de sistemas legacy hasta la infraestructura de pagos — se construyó sobre lo que aprendí aquí primero."
    },
    industries: { eyebrow: "02 — Sectores", h2: "Una misma disciplina, terrenos de juego distintos" },
    industry: {
      travel: { tag: "Travel-tech", note: "Pagos, conectividad PMS y fidelización para una plataforma B2B de distribución hotelera." },
      automotive: { tag: "Automoción", note: "APIs backend para el control remoto y la telemetría de vehículos en una app de coche conectado." },
      public: { tag: "Sector público", note: "Modernización de una plataforma legacy de declaraciones fiscales para el sector agrícola." },
      banking: { tag: "Banca", note: "Frontend de un dashboard empresarial para la gestión de operaciones financieras." }
    },
    stack: {
      eyebrow: "03 — Balance", h2: "Stack",
      runtime: "Runtime", infrastructure: "Infraestructura", interface: "Interfaz", practice: "Prácticas"
    },
    practice: {
      item1: "Código limpio", item2: "Diseño API-first", item3: "Event storming", item4: "Idempotente por defecto"
    },
    languages: "Español (nativo) · Catalán (nativo) · Inglés (nivel profesional de trabajo)",
    contact: {
      tear: "✂ CORTAR AQUÍ",
      eyebrow: "04 — Autorizar",
      h2: "Hablemos de lo que estás construyendo.",
      lede: "Abierto a conversaciones sobre ingeniería backend y sistemas distribuidos, en cualquier sector.",
      footnote: "Recibo N.º 000-ALBERT-ORTELLS · Gracias por hacer scroll"
    }
  },

  ca: {
    title: "Albert Ortells — Enginyer Backend",
    nav: {
      role: "// ENGINYER BACKEND",
      experience: "Experiència",
      industries: "Sectors",
      stack: "Stack",
      contact: "Contacte",
      techtests: "Proves tècniques"
    },
    hero: {
      eyebrow: "Ordre de treball",
      h1: "Quatre sectors. Una mateixa disciplina: construir per allò que falla.",
      lede: "Enginyer backend amb <strong>7+ anys</strong> d'experiència en banca, automoció, administració pública i travel-tech. El sector canvia cada vegada — el focus en sistemes que aguanten condicions reals, no. Actualment lidero integracions backend a Neobookings.",
      ctaLog: "Veure l'historial ↓",
      ctaEmail: "Escriu-me"
    },
    ticker: {
      years: "anys en banca, automoció, sector públic i travel-tech",
      companies: "empreses i equips",
      legacy: "sistemes legacy modernitzats de cap a cap",
      tolerance: "tolerància a estats inconsistents en sistemes distribuïts"
    },
    log: { eyebrow: "01 — Historial", h2: "Experiència" },
    status: { active: "ACTIU", settled: "TANCAT" },
    toggle: { more: "Veure més", less: "Veure menys" },
    entry1: {
      when: "2023 — ACTUALITAT",
      role: "Enginyer Backend Senior",
      desc: "Responsable de les integracions backend d'una plataforma B2B de travel-tech — pagaments, connectivitat amb PMS i el programa de fidelització — després d'ajudar a dividir un monòlit legacy en serveis de domini.",
      more1: "Liderant la unificació de 18+ proveïdors de pagament externs (Stripe, Redsys, Adyen, OpenPay, PlaceToPay i més) en un únic flux resilient, amb idempotència a nivell de base de dades per eliminar transaccions duplicades sota concurrència.",
      more2: "Vaig dissenyar i construir el programa de fidelització des de zero, i vaig integrar diversos Property Management Systems (PMS) externs per mantenir sincronitzats l'inventari i les reserves a tota la plataforma.",
      more3: "Vaig contribuir a dividir un monòlit legacy en els serveis de Pagaments, Fidelització i Inventari mitjançant event storming, i faig de mentor de nous desenvolupadors durant l'onboarding i amb pair programming."
    },
    entry2: {
      role: "Desenvolupador Backend — My SEAT App",
      desc: "Desenvolupament i manteniment d'APIs REST per al control remot i la telemetria de vehicles en una app mòbil de cotxe connectat, mantenint la consistència de dades entre fonts distribuïdes i asíncrones.",
      more1: "Vaig treballar dins d'una arquitectura distribuïda on els sensors del vehicle enviaven dades a serveis backend, que les exposaven mitjançant APIs consumides per l'app mòbil. Centrat a implementar la lògica de negoci per a l'estat del vehicle, accions remotes i dades de telemetria.",
      more2: "Tot i que el projecte estava en fase de manteniment, em va donar una exposició profunda al disseny de sistemes distribuïts, la comunicació entre serveis i com emergeixen els límits de domini en sistemes reals — la base per a la feina d'integració que va venir després a Neobookings."
    },
    entry3: {
      role: "Full Stack Developer (a través de CAS Training)",
      desc: "Modernització d'una plataforma legacy de declaracions fiscals per al sector agrícola — migrant d'AngularJS a Angular, reforçant el backend en Spring, i traduint els requisits dels stakeholders directament en funcionalitats entregades.",
      more1: "Vaig assumir un rol híbrid combinant desenvolupament, decisions tècniques i coordinació, treballant en un sistema legacy usat per pagesos i ramaders per presentar i gestionar declaracions fiscals.",
      more2: "Vaig participar directament en la definició de requisits tècnics i funcionals amb els stakeholders, i vaig donar suport a desenvolupadors júnior contribuint al disseny de la solució — reforçant la capacitat de moure'm en entorns ambigus amb múltiples interessats i convertir requisits de negoci en decisions tècniques entregades."
    },
    entry4: {
      when: "MAI 2021 — JUN 2021",
      role: "Desenvolupador Backend · Castelldefels",
      desc: "Desenvolupador backend que també va contribuir al frontend amb Angular en projectes del sector assegurances per a Catalana Occident.",
      more1: "Col·laboració de dos mesos combinant desenvolupament backend amb feina pràctica en Angular per a Catalana Occident, amb exposició a com les plataformes del sector assegurances estructuren dades i fluxos entre els serveis backend i les interfícies de client."
    },
    entry5: {
      when: "NOV 2019 — MAI 2021",
      role: "Desenvolupador Frontend — via Tenea Tecnologías, després intern a DXC Technology",
      desc: "Vaig construir el dashboard que els clients empresarials fan servir per gestionar les seves operacions financeres — començant com a contractor extern i guanyant-me un lloc a l'equip intern de DXC Technology.",
      more1: "Em vaig incorporar al projecte com a contractor extern a través de Tenea Tecnologías, treballant dins de l'equip de DXC Technology en un dashboard de banca digital per a clients empresarials. Després de demostrar la meva feina durant diversos mesos, DXC em va contractar directament com a personal intern — continuant en el mateix projecte.",
      more2: "Centrat a implementar components d'UI a partir d'especificacions de disseny (arquitectura basada en JSP), integrant la lògica de frontend amb les APIs de backend per mostrar dades financeres en temps real, i reduint fricció en operacions clau — reforçant com de determinants són els contractes de dades del backend per a la usabilitat del frontend."
    },
    entry6: {
      role: "Desenvolupador Java",
      desc: "Desenvolupador de manteniment en aplicacions d'escriptori Java Swing connectades directament a la base de dades, resolent tickets en un flux Kanban.",
      more1: "Vaig treballar en interfícies thick-client de Java Swing connectades directament a la base de dades, sense cap capa de backend enmig — un paradigma diferent de la feina API-first i orientada a serveis que va venir abans i després en la meva carrera.",
      more2: "Vaig operar dins d'un projecte de manteniment gestionat amb Kanban, agafant tickets i resolent-los de forma autònoma, cosa que va perfeccionar la meva capacitat de treballar de manera eficient en fluxos de treball molt acotats i basats en tickets."
    },
    entry7: {
      when: "JUL 2018 — ABR 2019",
      role: "Programador de Software · Barcelona",
      desc: "Primer lloc professional — desenvolupador júnior en projectes per a Volkswagen Group España Distribución (VGED) i Grupo Planeta.",
      more1: "El punt de partida d'una carrera backend: com a desenvolupador júnior descobrint el món professional, aquí vaig posar en pràctica per primera vegada fonaments com Spring Boot, migracions de base de dades gestionades amb Liquibase, eines de testing i metodologies àgils, en feina real per a VGED i Grupo Planeta.",
      more2: "Tot el que va venir després — des de la modernització de sistemes legacy fins a la infraestructura de pagaments — es va construir sobre el que vaig aprendre aquí primer."
    },
    industries: { eyebrow: "02 — Sectors", h2: "Una mateixa disciplina, terrenys de joc diferents" },
    industry: {
      travel: { tag: "Travel-tech", note: "Pagaments, connectivitat PMS i fidelització per a una plataforma B2B de distribució hotelera." },
      automotive: { tag: "Automoció", note: "APIs backend per al control remot i la telemetria de vehicles en una app de cotxe connectat." },
      public: { tag: "Sector públic", note: "Modernització d'una plataforma legacy de declaracions fiscals per al sector agrícola." },
      banking: { tag: "Banca", note: "Frontend d'un dashboard empresarial per a la gestió d'operacions financeres." }
    },
    stack: {
      eyebrow: "03 — Balanç", h2: "Stack",
      runtime: "Runtime", infrastructure: "Infraestructura", interface: "Interfície", practice: "Pràctiques"
    },
    practice: {
      item1: "Codi net", item2: "Disseny API-first", item3: "Event storming", item4: "Idempotent per defecte"
    },
    languages: "Espanyol (natiu) · Català (natiu) · Anglès (nivell professional de treball)",
    contact: {
      tear: "✂ RETALLA AQUÍ",
      eyebrow: "04 — Autoritzar",
      h2: "Parlem d'allò que estàs construint.",
      lede: "Obert a converses sobre enginyeria backend i sistemes distribuïts, en qualsevol sector.",
      footnote: "Rebut Núm. 000-ALBERT-ORTELLS · Gràcies per fer scroll"
    }
  }
};
