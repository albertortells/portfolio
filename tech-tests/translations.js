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
      oneboxCard: { note: "Cart management system: API-first, outside-in design, in-memory persistence and 17 tests with JUnit 5 + Mockito." },
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
    onebox: {
      title: "How I solved the OneBox technical test — Albert Ortells",
      nav: { role: "// TECH TESTS", cases: "← Cases" },
      hero: { eyebrow: "CASE · ONEBOX", h1: "How I solved the OneBox technical test", storage: "In-memory" },
      status: { settled: "SOLVED" },
      story: {
        p1: "It all started with a single document: OneBox's technical test (Ticket Distribution System), dated 2023. A small e-commerce service —carts, products, expiration by inactivity— with a clear note on what would be evaluated: meeting the requirements, minimal test coverage, and being easy to test, review and deploy. No large systems or extra functionality.",
        challenge: {
          h2: "The challenge",
          p: "The brief asked for five very specific behaviors:",
          li1: "Create a cart, with the identifier generated by the application itself.",
          li2: "That cart can contain products.",
          li3: "Add one or more products to a cart, each with a numeric <code>id</code>, an alphanumeric <code>description</code> and a numeric <code>amount</code>.",
          li4: "Look up a cart given its id.",
          li5: "Delete a cart, either explicitly or automatically after ten minutes of inactivity.",
          p2: "The only technical requirement imposed was using Java. Everything else —stack, architecture, the scope of each piece— was left to me, and that's where the decisions that really shape the result come in."
        },
        build: {
          h2: "Building from the outside in",
          p1: "Unlike other tests where the input/output contract is fully fixed by the brief and it makes sense to model the domain first, here the brief described behaviors (\"create a cart\", \"add products\", \"delete it\") without imposing any specific API shape. Designing the domain before knowing exactly what each operation needed to expose would have meant guessing a shape for <code>Cart</code> and <code>Product</code> before having a real reason for that shape.",
          p2: "So I reversed the order: for each operation, I started at the entry point —the REST controller, or the scheduler for expiration— returning a minimal response built right there, with no service layer yet. That immediately gave me a contract verified by a test: HTTP verb, route, status code, body shape. Only once that contract was fixed did I push the logic inward: first to a <code>CartService</code> that still didn't touch any persistence, and finally to an in-memory <code>CartRepository</code> (a <code>ConcurrentHashMap</code>, with no real database, because the brief didn't ask for persistence and adding it would have been extra weight).",
          p3: "My first attempt at this pattern got away from me: instead of touching only one flow's controller, I built the service and the repository all at once too. It served to fix the rule I followed for everything else: each layer is delivered, verified and confirmed before touching the next one, never several at a time."
        },
        decision: {
          h2: "The decision I weighed the most: how to communicate \"the cart doesn't exist\"",
          p1: "With the four operations and the expiration already in place, the happy path worked and was tested, but looking up, modifying or deleting a non-existent cart had no explicit handling: in some cases it returned <code>null</code>, in others an uncontrolled internal error propagated. I needed a single, consistent way to communicate that case across the three operations that depend on the cart existing.",
          p2: "The most direct alternative would have been to also create a dedicated error DTO alongside the exception, but that repeats exactly what I'd avoided from the start: introducing new structures without a real need. I preferred a domain <code>CartNotFoundException</code>, translated to <code>404</code> by a single <code>@RestControllerAdvice</code>, using the <code>ProblemDetail</code> Spring already ships as the error body instead of inventing a new type. For the same reason, <code>Cart</code> and <code>Product</code> themselves —plain records— act as request and response directly; there are no DTOs anywhere in the API, because no endpoint needed a shape different from what the domain already had."
        },
        tests: {
          h2: "Verifying it with tests",
          p1: "Each layer is tested at its own level. The controller, with <code>@WebMvcTest</code> and <code>MockMvc</code>, mocking the service: what matters there is the HTTP contract, not the business logic. The service and the scheduler, with JUnit 5 and Mockito over the mocked repository: what matters is the rule (generating the id, merging products, throwing <code>CartNotFoundException</code> when it should, working out which carts have been inactive for more than ten minutes), not where the data comes from. And the in-memory repository, with a direct test against the real implementation, no mocks, because there what I want to check is that the <code>ConcurrentHashMap</code> stores, looks up and expires correctly.",
          p2: "The result is a suite of 17 tests, run with <code>./mvnw test</code>, covering the four operations, expiration by inactivity, and both the happy path and the non-existent-cart case for each of the three operations that need it."
        },
        docs: {
          h2: "Leaving it documented",
          p: "The <code>README.md</code> ended up with the full brief (the original PDF is removed from the project at the end), the solution adopted and why, the package structure, how to run the project with the included Maven wrapper, how to run the tests, the full API with examples, and the limitations I consciously accepted: no real database, no input-validation library beyond <code>Product</code>'s own typing. None of that is an oversight; it's the flip side of keeping dependencies to the minimum the brief asked for."
        },
        result: {
          h2: "The result",
          p: "A small service, with the shape of the API decided by each operation's contract rather than by the domain, the \"cart not found\" case resolved in a single place instead of repeated in every flow, and no more pieces —DTOs, layers, dependencies— than the problem called for."
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
      oneboxCard: { note: "Sistema de gestión de carritos: diseño API-first de fuera hacia dentro, persistencia en memoria y 17 tests con JUnit 5 + Mockito." },
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
    onebox: {
      title: "Cómo resolví la prueba técnica de OneBox — Albert Ortells",
      nav: { role: "// PRUEBAS TÉCNICAS", cases: "← Casos" },
      hero: { eyebrow: "CASO · ONEBOX", h1: "Cómo resolví la prueba técnica de OneBox", storage: "En memoria" },
      status: { settled: "RESUELTA" },
      story: {
        p1: "Todo empezó con un único documento: la prueba técnica de OneBox (Ticket Distribution System), fechada en 2023. Un servicio pequeño de e-commerce —carritos, productos, expiración por inactividad— con una advertencia clara sobre qué se iba a valorar: que cumpliera los requisitos, una cobertura de tests mínima, y que fuera fácil de probar, revisar y desplegar. Nada de sistemas grandes ni de funcionalidad de sobra.",
        challenge: {
          h2: "El reto",
          p: "El enunciado pedía cinco comportamientos muy concretos:",
          li1: "Crear un carrito, con el identificador generado por la propia aplicación.",
          li2: "Que ese carrito pueda contener productos.",
          li3: "Añadir uno o más productos a un carrito, cada uno con <code>id</code> numérico, <code>description</code> alfanumérica y <code>amount</code> numérico.",
          li4: "Consultar un carrito dado su id.",
          li5: "Eliminar un carrito, tanto de forma explícita como automáticamente tras diez minutos de inactividad.",
          p2: "El único requisito técnico impuesto era usar Java. Todo lo demás —stack, arquitectura, alcance de cada pieza— quedaba en mi mano, y ahí es donde entran las decisiones que de verdad definen el resultado."
        },
        build: {
          h2: "Construir de fuera hacia dentro",
          p1: "A diferencia de otras pruebas donde el contrato de entrada y salida viene totalmente fijado por el enunciado y tiene sentido modelar primero el dominio, aquí el enunciado describía comportamientos (\"crear un carrito\", \"añadir productos\", \"eliminarlo\") sin imponer ninguna forma de API concreta. Diseñar el dominio antes de saber exactamente qué necesitaba exponer cada operación habría significado adivinar una forma para <code>Cart</code> y <code>Product</code> antes de tener motivo real para esa forma.",
          p2: "Así que invertí el orden: por cada operación, empecé por el punto de entrada —el controller REST, o el scheduler en el caso de la expiración— devolviendo una respuesta mínima construida ahí mismo, sin capa de servicio todavía. Eso me daba de inmediato el contrato verificado por un test: verbo HTTP, ruta, código de estado, forma del cuerpo. Solo una vez fijado ese contrato, empujaba la lógica hacia dentro: primero a un <code>CartService</code> que seguía sin tocar ninguna persistencia, y por último a un <code>CartRepository</code> en memoria (un <code>ConcurrentHashMap</code>, sin base de datos real, porque el enunciado no pedía persistencia y añadirla habría sido peso de más).",
          p3: "El primer intento de este patrón se me fue de las manos: en vez de tocar solo el controller de un flujo, construí también el servicio y el repositorio de golpe. Sirvió para fijar la regla que seguí en todo lo demás: cada capa se entrega, se verifica y se confirma antes de tocar la siguiente, nunca varias a la vez."
        },
        decision: {
          h2: "La decisión que más pesé: cómo comunicar \"el carrito no existe\"",
          p1: "Con las cuatro operaciones y la expiración ya en marcha, el camino feliz funcionaba y estaba testeado, pero consultar, modificar o borrar un carrito inexistente no tenía un tratamiento explícito: en unos casos se devolvía <code>null</code>, en otros se propagaba un error interno sin control. Necesitaba una única forma consistente de comunicar ese caso en las tres operaciones que dependen de que el carrito exista.",
          p2: "La alternativa más directa habría sido crear también un DTO de error propio junto a la excepción, pero eso repite exactamente lo que había evitado desde el principio: introducir estructuras nuevas sin necesidad real. Preferí una <code>CartNotFoundException</code> de dominio, traducida a <code>404</code> por un único <code>@RestControllerAdvice</code>, usando el <code>ProblemDetail</code> que Spring ya trae de serie como cuerpo del error en vez de inventar un tipo nuevo. Por la misma razón, los propios <code>Cart</code> y <code>Product</code> —records simples— hacen de request y de response directamente; no hay DTOs en ningún punto de la API, porque ningún endpoint necesitaba una forma distinta de la que el dominio ya tenía."
        },
        tests: {
          h2: "Verificarlo con tests",
          p1: "Cada capa se testea a su propio nivel. El controller, con <code>@WebMvcTest</code> y <code>MockMvc</code>, mockeando el servicio: lo que importa ahí es el contrato HTTP, no la lógica de negocio. El servicio y el scheduler, con JUnit 5 y Mockito sobre el repositorio mockeado: lo que importa es la regla (generar el id, fusionar productos, lanzar <code>CartNotFoundException</code> cuando toca, calcular qué carritos llevan más de diez minutos inactivos), no de dónde vienen los datos. Y el repositorio en memoria, con un test directo sobre la implementación real, sin mocks, porque ahí lo que quiero comprobar es que el <code>ConcurrentHashMap</code> guarda, busca y expira correctamente.",
          p2: "El resultado es una suite de 17 tests, ejecutada con <code>./mvnw test</code>, que cubre las cuatro operaciones, la expiración por inactividad, y tanto el caso feliz como el de carrito inexistente en cada una de las tres operaciones que lo necesitan."
        },
        docs: {
          h2: "Dejarlo documentado",
          p: "En el <code>README.md</code> quedó el enunciado completo (el PDF original se elimina del proyecto al final), la solución adoptada y por qué, la estructura de paquetes, cómo levantar el proyecto con el wrapper de Maven incluido, cómo ejecutar los tests, la API completa con ejemplos, y las limitaciones que asumí conscientemente: sin base de datos real, sin librería de validación de entrada más allá del propio tipado de <code>Product</code>. Nada de eso es un descuido; es la otra cara de mantener las dependencias al mínimo que pedía el enunciado."
        },
        result: {
          h2: "El resultado",
          p: "Un servicio pequeño, con la forma de la API decidida por el contrato de cada operación y no por el dominio, la ausencia de \"carrito no encontrado\" resuelta en un único punto en vez de repetida en cada flujo, y sin más piezas —DTOs, capas, dependencias— de las que el problema pedía."
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
      oneboxCard: { note: "Sistema de gestió de carrets: disseny API-first de fora cap a dins, persistència en memòria i 17 tests amb JUnit 5 + Mockito." },
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
    onebox: {
      title: "Com vaig resoldre la prova tècnica d'OneBox — Albert Ortells",
      nav: { role: "// PROVES TÈCNIQUES", cases: "← Casos" },
      hero: { eyebrow: "CAS · ONEBOX", h1: "Com vaig resoldre la prova tècnica d'OneBox", storage: "En memòria" },
      status: { settled: "RESOLTA" },
      story: {
        p1: "Tot va començar amb un únic document: la prova tècnica d'OneBox (Ticket Distribution System), datada el 2023. Un servei petit de comerç electrònic —carrets, productes, expiració per inactivitat— amb un avís clar sobre què es valoraria: que complís els requisits, una cobertura de tests mínima, i que fos fàcil de provar, revisar i desplegar. Res de sistemes grans ni de funcionalitat de sobra.",
        challenge: {
          h2: "El repte",
          p: "L'enunciat demanava cinc comportaments molt concrets:",
          li1: "Crear un carret, amb l'identificador generat per la pròpia aplicació.",
          li2: "Que aquest carret pugui contenir productes.",
          li3: "Afegir un o més productes a un carret, cadascun amb <code>id</code> numèric, <code>description</code> alfanumèrica i <code>amount</code> numèric.",
          li4: "Consultar un carret donat el seu id.",
          li5: "Eliminar un carret, tant de forma explícita com automàticament després de deu minuts d'inactivitat.",
          p2: "L'únic requisit tècnic imposat era fer servir Java. Tota la resta —stack, arquitectura, abast de cada peça— quedava a les meves mans, i és aquí on entren les decisions que realment defineixen el resultat."
        },
        build: {
          h2: "Construir de fora cap a dins",
          p1: "A diferència d'altres proves on el contracte d'entrada i sortida ve totalment fixat per l'enunciat i té sentit modelar primer el domini, aquí l'enunciat descrivia comportaments (\"crear un carret\", \"afegir productes\", \"eliminar-lo\") sense imposar cap forma d'API concreta. Dissenyar el domini abans de saber exactament què necessitava exposar cada operació hauria significat endevinar una forma per a <code>Cart</code> i <code>Product</code> abans de tenir un motiu real per a aquesta forma.",
          p2: "Així que vaig invertir l'ordre: per a cada operació, vaig començar pel punt d'entrada —el controller REST, o el scheduler en el cas de l'expiració— retornant una resposta mínima construïda allà mateix, sense capa de servei encara. Això em donava de seguida el contracte verificat per un test: verb HTTP, ruta, codi d'estat, forma del cos. Només un cop fixat aquest contracte, empenyia la lògica cap endins: primer a un <code>CartService</code> que encara no tocava cap persistència, i finalment a un <code>CartRepository</code> en memòria (un <code>ConcurrentHashMap</code>, sense base de dades real, perquè l'enunciat no demanava persistència i afegir-la hauria estat pes de més).",
          p3: "El primer intent d'aquest patró se'm va escapar de les mans: en comptes de tocar només el controller d'un flux, vaig construir també el servei i el repositori de cop. Va servir per fixar la regla que vaig seguir en tota la resta: cada capa s'entrega, es verifica i es confirma abans de tocar la següent, mai diverses alhora."
        },
        decision: {
          h2: "La decisió que més vaig sospesar: com comunicar \"el carret no existeix\"",
          p1: "Amb les quatre operacions i l'expiració ja en marxa, el camí feliç funcionava i estava testejat, però consultar, modificar o esborrar un carret inexistent no tenia un tractament explícit: en uns casos es retornava <code>null</code>, en altres es propagava un error intern sense control. Necessitava una única forma consistent de comunicar aquest cas en les tres operacions que depenen que el carret existeixi.",
          p2: "L'alternativa més directa hauria estat crear també un DTO d'error propi al costat de l'excepció, però això repeteix exactament el que havia evitat des del principi: introduir estructures noves sense necessitat real. Vaig preferir una <code>CartNotFoundException</code> de domini, traduïda a <code>404</code> per un únic <code>@RestControllerAdvice</code>, fent servir el <code>ProblemDetail</code> que Spring ja porta de sèrie com a cos de l'error en comptes d'inventar un tipus nou. Pel mateix motiu, els propis <code>Cart</code> i <code>Product</code> —records simples— fan de request i de response directament; no hi ha DTOs en cap punt de l'API, perquè cap endpoint necessitava una forma diferent de la que el domini ja tenia."
        },
        tests: {
          h2: "Verificar-ho amb tests",
          p1: "Cada capa es testeja al seu propi nivell. El controller, amb <code>@WebMvcTest</code> i <code>MockMvc</code>, simulant el servei: el que importa aquí és el contracte HTTP, no la lògica de negoci. El servei i el scheduler, amb JUnit 5 i Mockito sobre el repositori simulat: el que importa és la regla (generar l'id, fusionar productes, llançar <code>CartNotFoundException</code> quan toca, calcular quins carrets porten més de deu minuts inactius), no d'on vénen les dades. I el repositori en memòria, amb un test directe sobre la implementació real, sense mocks, perquè aquí el que vull comprovar és que el <code>ConcurrentHashMap</code> desa, cerca i expira correctament.",
          p2: "El resultat és una suite de 17 tests, executada amb <code>./mvnw test</code>, que cobreix les quatre operacions, l'expiració per inactivitat, i tant el cas feliç com el de carret inexistent en cadascuna de les tres operacions que ho necessiten."
        },
        docs: {
          h2: "Deixar-ho documentat",
          p: "Al <code>README.md</code> hi va quedar l'enunciat complet (el PDF original s'elimina del projecte al final), la solució adoptada i per què, l'estructura de paquets, com aixecar el projecte amb el wrapper de Maven inclòs, com executar els tests, l'API completa amb exemples, i les limitacions que vaig assumir conscientment: sense base de dades real, sense llibreria de validació d'entrada més enllà del propi tipatge de <code>Product</code>. Res d'això és un descuit; és l'altra cara de mantenir les dependències al mínim que demanava l'enunciat."
        },
        result: {
          h2: "El resultat",
          p: "Un servei petit, amb la forma de l'API decidida pel contracte de cada operació i no pel domini, l'absència de \"carret no trobat\" resolta en un únic punt en comptes de repetida a cada flux, i sense més peces —DTOs, capes, dependències— de les que el problema demanava."
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
