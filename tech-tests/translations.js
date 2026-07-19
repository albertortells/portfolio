const TECH_TRANSLATIONS = {
  en: {
    cards: {
      title: "Tech Tests — Albert Ortells",
      nav: { role: "// TECH TESTS", back: "← Portfolio" },
      hero: {
        eyebrow: "DOSSIER · TECH TESTS",
        h1: "How I solve technical tests",
        lede: "Every technical test I've solved, told as what it really is: a brief, some design decisions, and a result you can review. <strong>No frills</strong> — the brief, how it was solved, and the final code."
      },
      section: { eyebrow: "Cases", h2: "Select a case" },
      cabsaCard: { note: "Animal API: REST endpoints, tests with JUnit 5 + Mockito, and clean code as the main focus." },
      inditexCard: { note: "Price-rate API: explicit business priority rule, JdbcTemplate, and layered unit tests with H2 and Mockito." },
      status: { settled: "SOLVED" },
      contact: {
        tear: "✂ TEAR HERE",
        eyebrow: "Back",
        h2: "Looking for the rest of the journey?",
        lede: "The full portfolio is at albertortells.cat.",
        cta: "View the portfolio ↗",
        footnote: "Technical tests dossier · Albert Ortells"
      }
    },
    cabsa: {
      title: "How we solved the CABSA technical test — Albert Ortells",
      nav: { role: "// TECH TESTS", cases: "← Cases" },
      hero: { eyebrow: "CASE · CABSA", h1: "How we solved the CABSA technical test" },
      status: { settled: "SOLVED" },
      story: {
        p1: "It all started with an email from CABSA after the interview: a small technical test to see how we build a solution and write code. No impossible algorithms or coding marathons — just a simple API, an already-runnable Spring Boot skeleton, and one clear recommendation: <em>\"we'll value code structure and cleanliness more than the functionality itself\"</em>.",
        challenge: {
          h2: "The challenge",
          p: "The brief asked for three very specific things:",
          li1: "Return a list of animals in JSON along with what they eat.",
          li2: "Be able to search animals by name or by what they eat.",
          li3: "Be able to create a new type of food.",
          p2: "With that in mind, and knowing the focus was on code quality rather than the amount of functionality, we got to work on top of the provided skeleton."
        },
        build: {
          h2: "Building on what was already there",
          p: "The skeleton already sketched out a layered architecture. We completed that structure consistently: a <code>JungleController</code> with the three REST endpoints, a service layer (<code>AnimalService</code> / <code>AnimalServiceImpl</code>) with the business logic, JPA repositories for animals and food, and a DTO (<code>AnimalDto</code>) so the persisted model isn't exposed directly in the responses. All API responses were unified under a single wrapper, <code>ApiResponse</code>, with status, message and data."
        },
        clean: {
          h2: "Stopping to clean up before calling the test done",
          p: "With the functionality ready, it was time to do what would really be evaluated: reviewing the code with a critical eye. Two things stood out:",
          li1: "The search-by-name-and/or-food method had three almost identical blocks, repeating the same \"search, check for null, build the response\" pattern over and over. We rewrote it as a single piece of logic, much shorter and easier to read. Along the way, that simplification uncovered and fixed a silent <code>NullPointerException</code> that occurred when searching by name and food at once when only one of the two existed in the database.",
          li2: "We found a small inconsistency between the two entities: food auto-generated its id, but the animal didn't, even though the database column was equally auto-incrementing. We aligned the criteria between both."
        },
        tests: {
          h2: "Verifying it with tests",
          p: "Once the cleanup was done, it was time to demonstrate — not just assume — that the behavior was still correct. We added a suite of unit tests over the service layer with JUnit 5 and Mockito, mocking the repositories so we didn't depend on a real database. We covered the full listing, searching by name, by food and by both at once, the \"not found\" cases, and especially the regression case for the bug we'd just fixed, to make sure it wouldn't come back."
        },
        docs: {
          h2: "Leaving it all documented",
          p: "Finally, we clearly separated the brief from the solution: a <code>README.md</code> that faithfully captures what the test asked for, and a <code>SOLUTION.md</code> that explains how it was solved — architecture, endpoints, design decisions, and how to run both the application and the tests."
        },
        result: {
          h2: "The result",
          p: "A small, tidy, tested API that meets what CABSA asked for without more complexity than necessary — which, in the end, was exactly the point of the test."
        }
      },
      cta: { github: "View the code on GitHub ↗", back: "← See other cases" }
    },
    inditex: {
      title: "How I solved the Inditex technical test — Albert Ortells",
      nav: { role: "// TECH TESTS", cases: "← Cases" },
      hero: { eyebrow: "CASE · INDITEX", h1: "How I solved the Inditex technical test" },
      status: { settled: "SOLVED" },
      story: {
        p1: "It all started with a brief after Inditex's selection process: a small technical test to see how I design and build a service. No large systems or heavy functionality — just a query endpoint over a price table, and a clear note on what would be evaluated: service design and construction, code quality, and correct test results.",
        challenge: {
          h2: "The challenge",
          p: "The brief asked for three very specific things:",
          li1: "A REST endpoint that, given an application date, a product and a brand/chain, returns the price rate that applies.",
          li2: "An in-memory database (H2) seeded with the four sample records from the brief.",
          li3: "Tests validating five specific requests against that data: different times on June 14th, 15th and 16th, 2020, for the same product and the same brand.",
          p2: "With that in mind, and knowing the focus was on code quality rather than the amount of functionality, I got to work."
        },
        build: {
          h2: "Building from the inside out",
          p1: "I didn't start with the controller. I started by modeling the domain: a <code>Price</code> <code>record</code> that mirrors the table, and two DTOs, <code>PriceQueryRequest</code> and <code>PriceQueryResponse</code>, with the exact input and output the brief asked for. Only after that did I build the data access, the service, and finally the controller. Starting from the domain avoids shaping the model around how the HTTP request happens to arrive.",
          p2: "For data access I chose <code>JdbcTemplate</code> over JPA/Hibernate: it's a single query over a single table, with no relationships between entities, so pulling in a full ORM would have been more weight than the problem called for. The repository ended up as one query filtering by brand, product and date range, ordered by priority.",
          p3: "On top of that, a <code>PriceService</code> that applies the business rule and builds the response, and a <code>PriceController</code> with a single <code>GET /prices</code> that just receives parameters and delegates."
        },
        priority: {
          h2: "The decision I weighed the most: where priority lives",
          p1: "The brief makes the rule clear: if two rates match on the same date, the one with the higher priority wins. I could have leaned on the query's own <code>ORDER BY PRIORITY DESC</code> and just kept the first row that came back. It works, but it hides an important business rule inside a SQL query, where no one sees it at a glance and no one tests it in isolation.",
          p2: "I preferred to resolve it explicitly in the service, comparing the priority of the candidates the repository returns. It's a bit more code, but it leaves the rule somewhere you can read, touch and test without depending on how the query happens to be written. I applied the same criterion to the \"no rate applies\" case: instead of returning <code>null</code> or an empty list, I turned it into a dedicated exception, so that case can't slip past any layer above unnoticed."
        },
        tests: {
          h2: "Verifying it with tests",
          p1: "The brief itself asked for tests covering the five sample requests, and I was also explicitly asked for unit tests only, no integration or end-to-end tests. So each layer was tested at its own level: the repository against a real in-memory H2 database, because there what I want to validate is that the SQL is correct; the service and the controller with their dependencies mocked (Mockito), because their logic doesn't depend on whether there's a real database or HTTP server behind it.",
          p2: "I covered the single-rate listing, overlapping rates with priority-based selection, the no-results case and the non-existent-product case. As a final check, on top of the automated suite, I ran the real application and manually fired the five cases from the brief against the endpoint: all five returned exactly the expected rate and price."
        },
        docs: {
          h2: "Leaving it documented",
          p: "Finally, I poured into the <code>README.md</code> the full brief, the stack chosen and why, how to run the application, how to query the endpoint, and how to run the tests, so anyone can start the project and verify the result with no more context than that file."
        },
        result: {
          h2: "The result",
          p: "A small API, with the business rule living somewhere explicit and testable, without more complexity than the problem called for — which, in the end, was exactly the point of the test."
        }
      },
      cta: { github: "View the code on GitHub ↗", back: "← See other cases" }
    }
  },

  es: {
    cards: {
      title: "Pruebas técnicas — Albert Ortells",
      nav: { role: "// PRUEBAS TÉCNICAS", back: "← Portfolio" },
      hero: {
        eyebrow: "DOSSIER · PRUEBAS TÉCNICAS",
        h1: "Cómo resuelvo pruebas técnicas",
        lede: "Cada prueba técnica que he resuelto, contada como lo que realmente es: un enunciado, unas decisiones de diseño y un resultado que se puede revisar. <strong>Sin adornos</strong> — el enunciado, cómo se resolvió y el código final."
      },
      section: { eyebrow: "Casos", h2: "Selecciona un caso" },
      cabsaCard: { note: "API de animales: endpoints REST, tests con JUnit 5 + Mockito, y limpieza de código como foco principal." },
      inditexCard: { note: "API de tarifas de precios: prioridad de negocio explícita, JdbcTemplate y tests unitarios por capas con H2 y Mockito." },
      status: { settled: "RESUELTA" },
      contact: {
        tear: "✂ CORTAR AQUÍ",
        eyebrow: "Volver",
        h2: "¿Buscas el resto del recorrido?",
        lede: "El portfolio completo está en albertortells.cat.",
        cta: "Ver el portfolio ↗",
        footnote: "Dossier de pruebas técnicas · Albert Ortells"
      }
    },
    cabsa: {
      title: "Cómo resolvimos la prueba técnica de CABSA — Albert Ortells",
      nav: { role: "// PRUEBAS TÉCNICAS", cases: "← Casos" },
      hero: { eyebrow: "CASO · CABSA", h1: "Cómo resolvimos la prueba técnica de CABSA" },
      status: { settled: "RESUELTA" },
      story: {
        p1: "Todo empezó con un correo de CABSA tras la entrevista: una pequeña prueba técnica para ver cómo desarrollamos una solución y escribimos código. Nada de algoritmos imposibles ni maratones de programación — solo una API sencilla, un esqueleto de Spring Boot ya arrancable, y una recomendación clara: <em>\"valoraremos más la estructura de código y limpieza del mismo que la funcionalidad en sí\"</em>.",
        challenge: {
          h2: "El reto",
          p: "El enunciado pedía tres cosas muy concretas:",
          li1: "Devolver un listado de animales en JSON junto con lo que comen.",
          li2: "Poder buscar animales por nombre o por lo que comen.",
          li3: "Poder crear un nuevo tipo de comida.",
          p2: "Con eso en mente, y sabiendo que el foco estaba en la calidad del código más que en la cantidad de funcionalidad, nos pusimos manos a la obra sobre el esqueleto proporcionado."
        },
        build: {
          h2: "Construir sobre lo que ya había",
          p: "El esqueleto ya traía una arquitectura por capas esbozada. Completamos esa estructura de forma coherente: un <code>JungleController</code> con los tres endpoints REST, una capa de servicio (<code>AnimalService</code> / <code>AnimalServiceImpl</code>) con la lógica de negocio, repositorios JPA para animales y comida, y un DTO (<code>AnimalDto</code>) para no exponer directamente el modelo persistido en las respuestas. Todas las respuestas de la API quedaron unificadas bajo un mismo envoltorio, <code>ApiResponse</code>, con estado, mensaje y datos."
        },
        clean: {
          h2: "Parar a limpiar antes de dar la prueba por terminada",
          p: "Con la funcionalidad lista, tocaba hacer lo que realmente iban a valorar: revisar el código con ojo crítico. Dos cosas llamaron la atención:",
          li1: "El método de búsqueda por nombre y/o comida tenía tres bloques casi idénticos, repitiendo una y otra vez el mismo patrón de \"buscar, comprobar si es nulo, construir la respuesta\". Lo reescribimos en una única lógica, mucho más corta y fácil de leer. De paso, esa simplificación destapó y corrigió un <code>NullPointerException</code> silencioso que ocurría al buscar por nombre y comida a la vez cuando solo uno de los dos existía en base de datos.",
          li2: "Encontramos una pequeña inconsistencia entre las dos entidades: la comida generaba su id automáticamente, pero el animal no, pese a que la columna en base de datos era igualmente autoincremental. Se alineó el criterio entre ambas."
        },
        tests: {
          h2: "Verificarlo con tests",
          p: "Una vez cerrada la limpieza, tocaba demostrar —no solo asumir— que el comportamiento seguía siendo correcto. Añadimos una batería de tests unitarios sobre la capa de servicio con JUnit 5 y Mockito, mockeando los repositorios para no depender de una base de datos real. Cubrimos el listado completo, la búsqueda por nombre, por comida y por ambos a la vez, los casos de \"no encontrado\", y muy especialmente el caso de regresión del error que acabábamos de corregir, para asegurarnos de que no volvería a aparecer."
        },
        docs: {
          h2: "Dejarlo todo documentado",
          p: "Por último, separamos claramente el enunciado de la solución: un <code>README.md</code> que recoge fielmente lo que se pedía en la prueba, y un <code>SOLUTION.md</code> que explica cómo se resolvió — arquitectura, endpoints, decisiones de diseño y cómo poner en marcha tanto la aplicación como los tests."
        },
        result: {
          h2: "El resultado",
          p: "Una API pequeña, ordenada y probada, que cumple lo que pedía CABSA sin más complejidad de la necesaria — que, al final, era justo el objetivo de la prueba."
        }
      },
      cta: { github: "Ver el código en GitHub ↗", back: "← Ver otros casos" }
    },
    inditex: {
      title: "Cómo resolví la prueba técnica de Inditex — Albert Ortells",
      nav: { role: "// PRUEBAS TÉCNICAS", cases: "← Casos" },
      hero: { eyebrow: "CASO · INDITEX", h1: "Cómo resolví la prueba técnica de Inditex" },
      status: { settled: "RESUELTA" },
      story: {
        p1: "Todo empezó con un enunciado tras el proceso de selección de Inditex: una prueba técnica pequeña para ver cómo diseño y construyo un servicio. Nada de sistemas grandes ni de mucha funcionalidad — solo un endpoint de consulta sobre una tabla de precios, y una advertencia clara sobre qué se iba a valorar: diseño y construcción del servicio, calidad de código y resultados correctos en los tests.",
        challenge: {
          h2: "El reto",
          p: "El enunciado pedía tres cosas muy concretas:",
          li1: "Un endpoint REST que, dados una fecha de aplicación, un producto y una cadena, devuelva la tarifa de precios que corresponde aplicar.",
          li2: "Una base de datos en memoria (H2) inicializada con los cuatro registros de ejemplo del enunciado.",
          li3: "Tests que validasen cinco peticiones concretas contra esos datos: distintas horas de los días 14, 15 y 16 de junio de 2020 para el mismo producto y la misma cadena.",
          p2: "Con eso en mente, y sabiendo que el foco estaba en la calidad del código más que en la cantidad de funcionalidad, me puse manos a la obra."
        },
        build: {
          h2: "Construir de dentro hacia afuera",
          p1: "No arranqué por el controlador. Empecé modelando el dominio: un <code>record</code> <code>Price</code> que refleja la tabla, y dos DTOs, <code>PriceQueryRequest</code> y <code>PriceQueryResponse</code>, con la entrada y la salida exactas que pedía el enunciado. Solo después construí el acceso a datos, el servicio y por último el controlador. Empezar por el dominio evita diseñar el modelo en función de cómo llega la petición HTTP.",
          p2: "Para el acceso a datos elegí <code>JdbcTemplate</code> en vez de JPA/Hibernate: es una única consulta sobre una única tabla, sin relaciones entre entidades, así que meter un ORM completo habría sido más peso del que el problema pedía. El repositorio quedó reducido a una consulta que filtra por marca, producto y rango de fechas, ordenada por prioridad.",
          p3: "Encima de eso, un <code>PriceService</code> que aplica la regla de negocio y construye la respuesta, y un <code>PriceController</code> con un único <code>GET /prices</code> que solo recibe parámetros y delega."
        },
        priority: {
          h2: "La decisión que más pesé: dónde vive la prioridad",
          p1: "El enunciado deja clara la regla: si dos tarifas coinciden en la misma fecha, gana la de mayor prioridad. Podría haberme apoyado en el propio <code>ORDER BY PRIORITY DESC</code> de la consulta y quedarme con la primera fila que llegara. Funciona, pero esconde una regla de negocio importante dentro de una query SQL, donde nadie la ve a simple vista y nadie la testea de forma aislada.",
          p2: "Preferí resolverlo de forma explícita en el servicio, comparando la prioridad de los candidatos que devuelve el repositorio. Es un poco más de código, pero deja la regla donde se puede leer, tocar y testear sin depender de cómo esté escrita la query. Apliqué el mismo criterio al caso de \"no hay ninguna tarifa aplicable\": en vez de devolver <code>null</code> o una lista vacía, lo convertí en una excepción propia, para que ese caso no se pueda pasar por alto en ninguna capa superior."
        },
        tests: {
          h2: "Verificarlo con tests",
          p1: "El propio enunciado pedía tests para las cinco peticiones de ejemplo, y además se me pidió explícitamente que fueran solo tests unitarios, sin integración ni end-to-end. Así que cada capa se testeó a su propio nivel: el repositorio contra una base H2 real en memoria, porque ahí lo que quiero validar es que el SQL es correcto; el servicio y el controlador con sus dependencias simuladas (Mockito), porque su lógica no depende de si hay una base de datos o un servidor HTTP real detrás.",
          p2: "Cubrí el listado de una tarifa única, el solapamiento de varias tarifas con la selección por prioridad, el caso sin resultados y el de producto inexistente. Como comprobación final, aparte de la batería automática, levanté la aplicación real y lancé a mano los cinco casos del enunciado contra el endpoint: los cinco devolvieron exactamente la tarifa y el precio esperados."
        },
        docs: {
          h2: "Dejarlo documentado",
          p: "Por último, volqué en el <code>README.md</code> el enunciado completo, el stack elegido y por qué, cómo levantar la aplicación, cómo consultar el endpoint y cómo ejecutar los tests, para que cualquiera pueda arrancar el proyecto y verificar el resultado sin más contexto que ese fichero."
        },
        result: {
          h2: "El resultado",
          p: "Una API pequeña, con la regla de negocio en un sitio explícito y testeable, y sin más complejidad de la que el problema pedía — que, al final, era justo el objetivo de la prueba."
        }
      },
      cta: { github: "Ver el código en GitHub ↗", back: "← Ver otros casos" }
    }
  },

  ca: {
    cards: {
      title: "Proves tècniques — Albert Ortells",
      nav: { role: "// PROVES TÈCNIQUES", back: "← Portfolio" },
      hero: {
        eyebrow: "DOSSIER · PROVES TÈCNIQUES",
        h1: "Com resolc proves tècniques",
        lede: "Cada prova tècnica que he resolt, explicada tal com és: un enunciat, unes decisions de disseny i un resultat que es pot revisar. <strong>Sense adorns</strong> — l'enunciat, com es va resoldre i el codi final."
      },
      section: { eyebrow: "Casos", h2: "Selecciona un cas" },
      cabsaCard: { note: "API d'animals: endpoints REST, tests amb JUnit 5 + Mockito, i neteja de codi com a focus principal." },
      inditexCard: { note: "API de tarifes de preus: regla de prioritat de negoci explícita, JdbcTemplate i tests unitaris per capes amb H2 i Mockito." },
      status: { settled: "RESOLTA" },
      contact: {
        tear: "✂ RETALLA AQUÍ",
        eyebrow: "Tornar",
        h2: "Busques la resta del recorregut?",
        lede: "El portfolio complet és a albertortells.cat.",
        cta: "Veure el portfolio ↗",
        footnote: "Dossier de proves tècniques · Albert Ortells"
      }
    },
    cabsa: {
      title: "Com vam resoldre la prova tècnica de CABSA — Albert Ortells",
      nav: { role: "// PROVES TÈCNIQUES", cases: "← Casos" },
      hero: { eyebrow: "CAS · CABSA", h1: "Com vam resoldre la prova tècnica de CABSA" },
      status: { settled: "RESOLTA" },
      story: {
        p1: "Tot va començar amb un correu de CABSA després de l'entrevista: una petita prova tècnica per veure com desenvolupem una solució i escrivim codi. Res d'algorismes impossibles ni marató de programació — només una API senzilla, un esquelet de Spring Boot ja arrencable, i una recomanació clara: <em>\"valorarem més l'estructura del codi i la seva neteja que la funcionalitat en si\"</em>.",
        challenge: {
          h2: "El repte",
          p: "L'enunciat demanava tres coses molt concretes:",
          li1: "Retornar un llistat d'animals en JSON juntament amb el que mengen.",
          li2: "Poder cercar animals per nom o pel que mengen.",
          li3: "Poder crear un nou tipus de menjar.",
          p2: "Amb això al cap, i sabent que el focus estava en la qualitat del codi més que en la quantitat de funcionalitat, ens vam posar mans a l'obra sobre l'esquelet proporcionat."
        },
        build: {
          h2: "Construir sobre el que ja hi havia",
          p: "L'esquelet ja portava una arquitectura per capes esbossada. Vam completar aquesta estructura de forma coherent: un <code>JungleController</code> amb els tres endpoints REST, una capa de servei (<code>AnimalService</code> / <code>AnimalServiceImpl</code>) amb la lògica de negoci, repositoris JPA per a animals i menjar, i un DTO (<code>AnimalDto</code>) per no exposar directament el model persistit a les respostes. Totes les respostes de l'API van quedar unificades sota un mateix embolcall, <code>ApiResponse</code>, amb estat, missatge i dades."
        },
        clean: {
          h2: "Parar a netejar abans de donar la prova per acabada",
          p: "Amb la funcionalitat a punt, tocava fer el que realment es valoraria: revisar el codi amb ull crític. Dues coses van cridar l'atenció:",
          li1: "El mètode de cerca per nom i/o menjar tenia tres blocs gairebé idèntics, repetint una vegada i una altra el mateix patró de \"cercar, comprovar si és nul, construir la resposta\". El vam reescriure en una única lògica, molt més curta i fàcil de llegir. De pas, aquesta simplificació va destapar i corregir un <code>NullPointerException</code> silenciós que passava en cercar per nom i menjar alhora quan només un dels dos existia a la base de dades.",
          li2: "Vam trobar una petita inconsistència entre les dues entitats: el menjar generava el seu id automàticament, però l'animal no, tot i que la columna a la base de dades era igualment autoincremental. Es va alinear el criteri entre totes dues."
        },
        tests: {
          h2: "Verificar-ho amb tests",
          p: "Un cop tancada la neteja, tocava demostrar —no només assumir— que el comportament seguia sent correcte. Vam afegir una bateria de tests unitaris sobre la capa de servei amb JUnit 5 i Mockito, simulant els repositoris per no dependre d'una base de dades real. Vam cobrir el llistat complet, la cerca per nom, per menjar i per tots dos alhora, els casos de \"no trobat\", i molt especialment el cas de regressió de l'error que acabàvem de corregir, per assegurar-nos que no tornaria a aparèixer."
        },
        docs: {
          h2: "Deixar-ho tot documentat",
          p: "Finalment, vam separar clarament l'enunciat de la solució: un <code>README.md</code> que recull fidelment el que es demanava a la prova, i un <code>SOLUTION.md</code> que explica com es va resoldre — arquitectura, endpoints, decisions de disseny i com posar en marxa tant l'aplicació com els tests."
        },
        result: {
          h2: "El resultat",
          p: "Una API petita, ordenada i provada, que compleix el que demanava CABSA sense més complexitat de la necessària — que, al final, era justament l'objectiu de la prova."
        }
      },
      cta: { github: "Veure el codi a GitHub ↗", back: "← Veure altres casos" }
    },
    inditex: {
      title: "Com vaig resoldre la prova tècnica d'Inditex — Albert Ortells",
      nav: { role: "// PROVES TÈCNIQUES", cases: "← Casos" },
      hero: { eyebrow: "CAS · INDITEX", h1: "Com vaig resoldre la prova tècnica d'Inditex" },
      status: { settled: "RESOLTA" },
      story: {
        p1: "Tot va començar amb un enunciat després del procés de selecció d'Inditex: una prova tècnica petita per veure com dissenyo i construeixo un servei. Res de sistemes grans ni de molta funcionalitat — només un endpoint de consulta sobre una taula de preus, i un avís clar sobre què es valoraria: disseny i construcció del servei, qualitat del codi i resultats correctes als tests.",
        challenge: {
          h2: "El repte",
          p: "L'enunciat demanava tres coses molt concretes:",
          li1: "Un endpoint REST que, donades una data d'aplicació, un producte i una cadena, retorni la tarifa de preus que correspon aplicar.",
          li2: "Una base de dades en memòria (H2) inicialitzada amb els quatre registres d'exemple de l'enunciat.",
          li3: "Tests que validessin cinc peticions concretes contra aquestes dades: diferents hores dels dies 14, 15 i 16 de juny de 2020 per al mateix producte i la mateixa cadena.",
          p2: "Amb això al cap, i sabent que el focus estava en la qualitat del codi més que en la quantitat de funcionalitat, em vaig posar mans a l'obra."
        },
        build: {
          h2: "Construir de dins cap enfora",
          p1: "No vaig començar pel controlador. Vaig començar modelant el domini: un <code>record</code> <code>Price</code> que reflecteix la taula, i dos DTOs, <code>PriceQueryRequest</code> i <code>PriceQueryResponse</code>, amb l'entrada i la sortida exactes que demanava l'enunciat. Només després vaig construir l'accés a dades, el servei i finalment el controlador. Començar pel domini evita dissenyar el model en funció de com arriba la petició HTTP.",
          p2: "Per a l'accés a dades vaig triar <code>JdbcTemplate</code> en comptes de JPA/Hibernate: és una única consulta sobre una única taula, sense relacions entre entitats, així que afegir un ORM complet hauria estat més pes del que el problema demanava. El repositori va quedar reduït a una consulta que filtra per marca, producte i rang de dates, ordenada per prioritat.",
          p3: "A sobre d'això, un <code>PriceService</code> que aplica la regla de negoci i construeix la resposta, i un <code>PriceController</code> amb un únic <code>GET /prices</code> que només rep paràmetres i delega."
        },
        priority: {
          h2: "La decisió que més vaig sospesar: on viu la prioritat",
          p1: "L'enunciat deixa clara la regla: si dues tarifes coincideixen en la mateixa data, guanya la de més prioritat. Podria haver-me recolzat en el propi <code>ORDER BY PRIORITY DESC</code> de la consulta i quedar-me amb la primera fila que arribés. Funciona, però amaga una regla de negoci important dins d'una query SQL, on ningú la veu a simple vista i ningú la testeja de forma aïllada.",
          p2: "Vaig preferir resoldre-ho de forma explícita al servei, comparant la prioritat dels candidats que retorna el repositori. És una mica més de codi, però deixa la regla on es pot llegir, tocar i testejar sense dependre de com estigui escrita la query. Vaig aplicar el mateix criteri al cas de \"no hi ha cap tarifa aplicable\": en comptes de retornar <code>null</code> o una llista buida, el vaig convertir en una excepció pròpia, perquè aquest cas no es pugui passar per alt en cap capa superior."
        },
        tests: {
          h2: "Verificar-ho amb tests",
          p1: "El mateix enunciat demanava tests per a les cinc peticions d'exemple, i a més se'm va demanar explícitament que fossin només tests unitaris, sense integració ni end-to-end. Així que cada capa es va testejar al seu propi nivell: el repositori contra una base H2 real en memòria, perquè aquí el que vull validar és que l'SQL és correcte; el servei i el controlador amb les seves dependències simulades (Mockito), perquè la seva lògica no depèn de si hi ha una base de dades o un servidor HTTP real al darrere.",
          p2: "Vaig cobrir el llistat d'una tarifa única, el solapament de diverses tarifes amb la selecció per prioritat, el cas sense resultats i el de producte inexistent. Com a comprovació final, a més de la bateria automàtica, vaig aixecar l'aplicació real i vaig llançar a mà els cinc casos de l'enunciat contra l'endpoint: els cinc van retornar exactament la tarifa i el preu esperats."
        },
        docs: {
          h2: "Deixar-ho documentat",
          p: "Finalment, vaig abocar al <code>README.md</code> l'enunciat complet, l'stack triat i per què, com aixecar l'aplicació, com consultar l'endpoint i com executar els tests, perquè qualsevol pugui arrencar el projecte i verificar el resultat sense més context que aquest fitxer."
        },
        result: {
          h2: "El resultat",
          p: "Una API petita, amb la regla de negoci en un lloc explícit i testejable, i sense més complexitat de la que el problema demanava — que, al final, era justament l'objectiu de la prova."
        }
      },
      cta: { github: "Veure el codi a GitHub ↗", back: "← Veure altres casos" }
    }
  }
};
