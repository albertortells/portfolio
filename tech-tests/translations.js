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
      card: { note: "Animal API: REST endpoints, tests with JUnit 5 + Mockito, and clean code as the main focus." },
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
      card: { note: "API de animales: endpoints REST, tests con JUnit 5 + Mockito, y limpieza de código como foco principal." },
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
      card: { note: "API d'animals: endpoints REST, tests amb JUnit 5 + Mockito, i neteja de codi com a focus principal." },
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
    }
  }
};
