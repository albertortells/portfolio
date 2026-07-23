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
      world2meetCard: { note: "Superhero API: layered architecture, Liquibase-managed DDL, MapStruct, and service-layer unit tests with JUnit 5 and Mockito." },
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
    world2meet: {
      title: "How I built the superhero API — Albert Ortells",
      nav: { role: "// TECH TESTS", cases: "← Cases" },
      hero: {
        eyebrow: "Technical test · World2Meet · July 2021",
        h1: "How I built the superhero API",
        lede: "The first-person account of how I approached W2M's backend technical test: the design decisions, what I prioritized, and what I left out for lack of time."
      },
      story: {
        p1: "The brief asked for a Spring Boot 2 / Java 11 API to maintain a list of superheroes: list them all, look one up by id, search by a fragment of their name, update them, and delete them, with persistence in an in-memory H2 and at least one unit test. There was also a list of optional points (DDL via a library, execution-time annotation, exception handling, integration tests, Docker, caching, documentation, security) that I knew I wouldn't have time to cover all of, so from the start I decided to prioritize the mandatory requirements and lay down a clean architecture foundation that those optionals could be added to later without friction.",
        process: { h2: "The process, commit by commit" },
        timeline: {
          entry1: { date: "13 Jul 2021", p: "I started the repository locally. There was no need to publish it — the brief allowed submitting it as a zip — but I preferred to track it with Git from minute one, so the commit history would serve as evidence of the process, just as the brief suggested: \"the use of TDD will be positively valued... commits can be used to see the process\"." },
          entry2: {
            date: "13 Jul 2021",
            p: "I generated the project skeleton and chose the dependencies already thinking about several of the optional points:",
            li1: "<strong>Spring Web + Data JPA + Data JDBC + Data REST</strong> for the API and persistence layer.",
            li2: "<strong>H2</strong> in memory, exactly as the brief asked for.",
            li3: "<strong>Liquibase</strong> so I wouldn't have to write the DDL by hand — covers the optional point of \"a library that eases the maintenance of DDL scripts\".",
            li4: "<strong>MapStruct</strong> so I wouldn't have to hand-write the mapping between JPA entities and the objects that travel through the API.",
            li5: "<strong>spring-restdocs-mockmvc</strong>, thinking I'd generate API documentation from the tests, though in the end I didn't have time to finish that part."
          },
          entry3: {
            date: "15 Jul 2021 (morning)",
            p: "This was the big commit: I put together the layered architecture and the first three query endpoints.",
            li1: "<code>SuperheroeEntity</code> plus a Liquibase changelog (<code>superheroes.sql</code>) that creates the table and seeds 10 example heroes.",
            li2: "A split between <code>Entity</code> (persistence) / <code>DAO</code> (input) / <code>DTO</code> (output), with a <code>SuperheroeMapper</code> from MapStruct in between, so what I store in the database isn't coupled to what I expose through the API.",
            li3: "<code>SuperheroesRepository</code> on top of <code>JpaRepository</code>, with a derived method <code>findSuperheroeEntitiesByNameContainingIgnoreCase</code> for the partial-name search the brief asked for (the \"man\" example → Spiderman/Superman/Manolito).",
            li4: "<code>GenericResponse</code> as a single response wrapper (status, message, data) so every endpoint responds consistently.",
            li5: "<code>URLConstant</code> to centralize routes and avoid repeating magic strings across controllers.",
            li6: "The three GET endpoints: all, by id, and by name."
          },
          entry4: { date: "15 Jul 2021 (midday)", p: "I added the <code>PUT</code> to update an existing hero, with a basic check that the id exists before touching anything." },
          entry5: { date: "15 Jul 2021 (afternoon)", p: "I added the <code>DELETE</code>, completing the brief's five functional requirements." },
          entry6: { date: "16 Jul 2021", p: "I closed out the submission with unit tests for <code>SuperheroeServiceImpl</code> using JUnit 5 and Mockito, covering both the happy path and the error path (200/201 vs 404) for each service method. The brief only asked for \"unit tests for some service\", so I focused on covering that one service well instead of spreading effort across shallow tests of more components." }
        },
        decisions: {
          h2: "Design decisions",
          card1: { h3: "Uniform response", p: "<code>GenericResponse</code> wraps status, message and data in every response, so the consuming frontend gets a predictable contract without having to blindly interpret the HTTP code." },
          card2: { h3: "Decoupled layers", p: "Entity ↔ DAO/DTO via MapStruct, a thin controller that delegates to the service, and the service talking only to the repository. Each piece has a single reason to change." },
          card3: { h3: "Versioned DDL", p: "Liquibase manages the schema and the initial load of the 10 example heroes, instead of a loose <code>schema.sql</code>/<code>data.sql</code>." },
          card4: { h3: "Centralized routes", p: "<code>URLConstant</code> groups the route fragments so there are no repeated, out-of-sync strings between the controller and the tests." }
        },
        coverage: {
          h2: "What got covered and what didn't",
          intro: "Being honest about the final result, of the brief's optional points:",
          item1: "Library for DDL maintenance — Liquibase.",
          item2: "Custom annotation to measure execution time (<code>@Timed</code>-style) — I didn't get to implement it.",
          item3: "Centralized exception handling — controllers validate by hand, without <code>@ControllerAdvice</code>.",
          item4: "Integration test — there's only a unit test of the service.",
          item5: "Dockerized application — I didn't include a Dockerfile.",
          item6: "Request caching — not implemented.",
          item7: "API documentation — I added the Spring REST Docs dependency but never generated the final documentation.",
          item8: "API security — not added (<code>CrossOrigin(\"*\")</code> stays wide open).",
          closing: "The detail of how to close out each of these points, along with other improvements I now see with the benefit of hindsight, is in <a href=\"improvements.html\">the pending-improvements write-up</a>."
        }
      },
      cta: {
        github: "View the code on GitHub ↗",
        improvements: "See pending improvements →",
        back: "← See other cases"
      }
    },
    w2mImprovements: {
      title: "What this test is still missing — Albert Ortells",
      nav: { role: "// TECH TESTS", story: "← Story", cases: "Cases" },
      hero: {
        eyebrow: "Technical test · World2Meet",
        h1: "What this test is still missing to be perfect",
        lede: "A technical review of the code's current state: a real bug in the test, an inconsistency with the brief, and the optional points left pending. Context on how it got here in <a href=\"./index.html\">world2meet</a>."
      },
      story: {
        h2Findings: "Findings",
        bugLabel: "⚠ Bug",
        item1: {
          h3: "The test isn't testing what it looks like",
          p1: "<code>SuperheroeServiceImplTest</code> declares:",
          p2: "The <code>@Mock</code> is never injected into <code>service</code> (there's no <code>@InjectMocks</code>, <code>@MockBean</code>, nor <code>MockitoAnnotations.openMocks(this)</code>/<code>MockitoExtension</code>). The autowired <code>service</code> is the real bean, wired to the real repository against the in-memory H2 seeded by Liquibase with the 10 heroes from <code>superheroes.sql</code>. The <code>doReturn(...).when(repository)...</code> calls have no effect at all: they're an orphaned mock.",
          p3: "This explains why <code>getSuperheroByID_isOK_thenReturnStatus200</code> \"works\" and expects <code>\"Batman\"</code> for <code>id = 2</code>: it's not because the mock returns that value, it's that it happens to match the real seed data by coincidence. It's an integration test disguised as a unit test, and fragile against any change to <code>superheroes.sql</code>.",
          p4: "<strong>How to fix it:</strong> add <code>@ExtendWith(MockitoExtension.class)</code> (or <code>MockitoAnnotations.openMocks(this)</code> in a <code>@BeforeEach</code>) and inject the mock with <code>@InjectMocks SuperheroeServiceImpl service</code> instead of <code>@Autowired</code> + <code>@SpringBootTest</code>, so it's a real, fast unit test, without spinning up a Spring context or a database."
        },
        item2: {
          h3: "Java 11 vs 1.8 bytecode inconsistency",
          p: "<code>pom.xml</code> declares <code>&lt;java.version&gt;11&lt;/java.version&gt;</code> but the <code>maven-compiler-plugin</code> is configured with <code>&lt;source&gt;1.8&lt;/source&gt;</code> <code>&lt;target&gt;1.8&lt;/target&gt;</code>. The brief explicitly asked for Java 11. Change the plugin to <code>&lt;source&gt;11&lt;/source&gt;&lt;target&gt;11&lt;/target&gt;</code> (or better, use <code>&lt;maven.compiler.release&gt;11&lt;/maven.compiler.release&gt;</code> and remove the duplicated property)."
        },
        item3: {
          h3: "Optional points from the brief left unimplemented",
          li1: "<strong>Custom execution-time annotation.</strong> Create <code>@LogExecutionTime</code> + <code>@Aspect</code> with Spring AOP (<code>spring-boot-starter-aop</code>) wrapping the annotated method, measuring with <code>System.nanoTime()</code> and logging the result. Apply it to <code>SuperheroeServiceImpl</code>'s methods.",
          li2: "<strong>Centralized exception handling.</strong> Add a <code>@RestControllerAdvice</code> with <code>@ExceptionHandler</code> for <code>MethodArgumentNotValidException</code>, <code>ConstraintViolationException</code> and a custom business exception (e.g. <code>SuperheroeNotFoundException</code>), always returning a consistent <code>GenericResponse</code> instead of the repeated manual checks in the controller.",
          li3: "<strong>Integration test.</strong> Add a <code>@SpringBootTest</code> with <code>@AutoConfigureMockMvc</code> that hits the real endpoints (<code>MockMvc</code> or <code>WebTestClient</code>) against the in-memory H2, complementing the service's unit test.",
          li4: "<strong>Dockerization.</strong> Add a multi-stage <code>Dockerfile</code> (build with <code>mvnw</code> + final <code>eclipse-temurin:11-jre</code> image) and optionally a <code>docker-compose.yml</code>.",
          li5: "<strong>Request caching.</strong> Add <code>spring-boot-starter-cache</code> + <code>@EnableCaching</code>, and annotate <code>getAllSuperheroes()</code> / <code>getSuperheroByID()</code> with <code>@Cacheable</code>, invalidating the cache in <code>updateSuperhero()</code> and <code>deleteSuperhero()</code> with <code>@CacheEvict</code>.",
          li6: "<strong>API documentation.</strong> The <code>spring-restdocs-mockmvc</code> dependency is already in <code>pom.xml</code> but no documentation was ever generated with it. Simpler and easier to maintain today: add <code>springdoc-openapi-ui</code> for auto-generated Swagger UI, or finish the REST Docs configuration already in place.",
          li7: "<strong>API security.</strong> There's no security dependency at all. At minimum, add <code>spring-boot-starter-security</code> with basic authentication or an API key for the write endpoints (<code>PUT</code>/<code>DELETE</code>), and replace <code>@CrossOrigin(origins = \"*\")</code> (open to any origin) with a concrete allowlist of origins."
        },
        item4: {
          h3: "API design",
          li1: "<strong>It isn't RESTful.</strong> The routes carry the verb in the URL itself (<code>GET /get/all</code>, <code>GET /get/one/{id}</code>, <code>PUT /put</code>, <code>DELETE /delete/{id}</code>) instead of relying on the HTTP method: it should be <code>GET /superheroes</code>, <code>GET /superheroes/{id}</code>, <code>GET /superheroes?name=man</code>, <code>PUT /superheroes/{id}</code>, <code>DELETE /superheroes/{id}</code>.",
          li2: "<strong>The <code>PUT</code> doesn't carry the id in the URL</strong> (<code>SuperheroesController.putExample</code>): it receives the id inside the body (<code>SuperheroeDAO.id</code>). It should be <code>PUT /superheroes/{id}</code> with the id as a <code>@PathVariable</code>, and the body carrying only the fields to update.",
          li3: "<strong>Method names inherited from the template.</strong> <code>putExample</code> and <code>deleteExample</code> in <code>SuperheroesController</code> are Spring Initializr's example names that were never renamed; they should be called <code>updateSuperheroe</code> / <code>deleteSuperheroe</code>.",
          li4: "<strong><code>URLConstant.POST</code> is declared and never used</strong> (there's no creation endpoint, nor did the brief ask for one). If a <code>POST</code> isn't going to be added, remove the dead constant; if it is, use it.",
          li5: "<strong>Pagination is missing</strong> from <code>getAllSuperheroes()</code>. With <code>JpaRepository</code> already available, switching to <code>Page&lt;SuperheroeEntity&gt; findAll(Pageable pageable)</code> is almost free."
        },
        item5: {
          h3: "Validation",
          p1: "<code>javax.validation</code> is in <code>pom.xml</code> and <code>@Valid</code> is used in the controller, but <code>SuperheroeDAO</code> has no validation annotations at all (<code>@NotBlank</code>, <code>@Size</code>, etc.), so <code>@Valid</code> does nothing there. The current checks are manual and repeated:",
          p2: "Move these rules to annotations on <code>SuperheroeDAO</code> (<code>@NotBlank</code> on <code>name</code>/<code>power</code>, <code>@Size(max = 25)</code> / <code>@Size(max = 50)</code> matching the <code>superheroes.sql</code> columns) and let point 3's <code>@RestControllerAdvice</code> translate the validation errors into a <code>GenericResponse</code>."
        },
        item6: {
          h3: "Logging",
          p: "There's no logger anywhere in the project. Add SLF4J (<code>LoggerFactory.getLogger(...)</code>) at least in the service and in point 3's execution-time aspect; right now there's no trace at all of what the application does in production."
        },
        item7: {
          h3: "Coupling to concrete types",
          li1: "<code>SuperheroesRepository</code> declares <code>ArrayList&lt;SuperheroeEntity&gt; findAll()</code> and <code>ArrayList&lt;SuperheroeEntity&gt; findSuperheroeEntitiesByNameContainingIgnoreCase(String param)</code>. A Spring Data repository should expose <code>List&lt;T&gt;</code>, not <code>ArrayList&lt;T&gt;</code>: coupling to the concrete implementation adds nothing, and overriding <code>findAll()</code> just to change the return type is unnecessary.",
          li2: "Same pattern in <code>SuperheroeMapper.arrayListSuperheroeEntityToArrayListSuperheroDTO</code>: use <code>List&lt;SuperheroeDTO&gt;</code> in the signature."
        },
        item8: {
          h3: "Mixing JAX-RS and Spring",
          p: "The project uses Spring Boot end to end, but for status codes it reaches for <code>javax.ws.rs.core.Response.Status</code> (JAX-RS) instead of <code>org.springframework.http.HttpStatus</code>, and pulls in the <code>javax.ws.rs-api</code> dependency just for that. Replace it with Spring's <code>HttpStatus</code> and return <code>ResponseEntity&lt;GenericResponse&gt;</code> from the controllers instead of setting the status only inside the <code>GenericResponse</code> (so the response's real HTTP code matches what's reported in the body)."
        },
        item9: {
          h3: "Configuration",
          li1: "The datasource password (<code>spring.datasource.password=password</code>) is hardcoded in <code>application.properties</code>. For a test in-memory H2 the risk is minimal, but it's a bad habit worth avoiding even in technical tests.",
          li2: "There are no profiles (<code>application-dev.properties</code>, <code>application-prod.properties</code>), nor a way to parameterize the port/environment without editing the source file."
        },
        item10: {
          h3: "Documentation and naming",
          li1: "A mix of Spanish (\"Superheroe\", \"Prueba técnica\") and English (class names, response messages) — not a blocker, but worth settling on one language for the code and keeping it consistent.",
          li2: "No Javadoc on the public interfaces (<code>SuperheroeService</code>, <code>SuperheroesRepository</code>)."
        },
        h2Priority: "Prioritized summary",
        priority: {
          li1: "Fix the test that isn't testing anything real (point 1) — it's the most serious issue, it gives false confidence.",
          li2: "Align Java 11 in the compiler (point 2) — it breaks an explicit requirement from the brief.",
          li3: "Centralized exception handling + annotation-based validation (points 3 and 5) — visible improvement for little effort.",
          li4: "Redesign the routes in REST style (point 4) — impacts the API's contract, do it before adding more clients.",
          li5: "The rest of the optionals (execution-time AOP, integration tests, Docker, caching, security, OpenAPI docs) as time allows."
        },
        tags: { tag1: "Testing", tag4: "Security" }
      },
      cta: {
        github: "View the code on GitHub ↗",
        story: "← Back to the story",
        cases: "← See other cases"
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
      world2meetCard: { note: "API de súper héroes: arquitectura en capas, DDL gestionado con Liquibase, MapStruct y tests unitarios del servicio con JUnit 5 y Mockito." },
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
    world2meet: {
      title: "Cómo construí la API de súper héroes — Albert Ortells",
      nav: { role: "// PRUEBAS TÉCNICAS", cases: "← Casos" },
      hero: {
        eyebrow: "Prueba técnica · World2Meet · Julio 2021",
        h1: "Cómo construí la API de súper héroes",
        lede: "El relato, en primera persona, de cómo abordé la prueba técnica de backend de W2M: las decisiones de diseño, lo que prioricé y lo que dejé fuera por tiempo."
      },
      story: {
        p1: "El enunciado pedía una API en Spring Boot 2 / Java 11 para mantener una lista de súper héroes: consultarlos todos, consultarlos por id, buscarlos por un fragmento de su nombre, modificarlos y borrarlos, con persistencia en una H2 en memoria y al menos un test unitario. Además había una lista de puntos opcionales (DDL con librería, anotación de tiempos, gestión de excepciones, tests de integración, Docker, caché, documentación, seguridad) que sabía que no me daría tiempo a cubrir todos, así que decidí desde el principio priorizar lo obligatorio y dejar sentada una base de arquitectura limpia sobre la que esos opcionales pudieran añadirse después sin fricción.",
        process: { h2: "El proceso, commit a commit" },
        timeline: {
          entry1: { date: "13 jul 2021", p: "Arranqué el repositorio en local. No hacía falta publicarlo, el enunciado permitía entregarlo comprimido, pero preferí llevarlo por Git desde el minuto uno para que el historial de commits sirviera como evidencia del proceso, tal y como sugería el punto de \"se valorará positivamente el uso de TDD... se pueden utilizar los commits para ver el proceso\"." },
          entry2: {
            date: "13 jul 2021",
            p: "Generé el esqueleto del proyecto y elegí las dependencias pensando ya en varios de los puntos opcionales:",
            li1: "<strong>Spring Web + Data JPA + Data JDBC + Data REST</strong> para la capa de API y persistencia.",
            li2: "<strong>H2</strong> en memoria, tal y como pedía el enunciado.",
            li3: "<strong>Liquibase</strong> para no escribir el DDL a mano — cubre el opcional de \"librería que facilite el mantenimiento de los scripts DDL\".",
            li4: "<strong>MapStruct</strong> para no escribir a mano el mapeo entre entidades JPA y los objetos que viajan por la API.",
            li5: "<strong>spring-restdocs-mockmvc</strong> pensando en generar documentación de la API a partir de los tests, aunque al final el tiempo no me llegó para completar esa parte."
          },
          entry3: {
            date: "15 jul 2021 (mañana)",
            p: "Este fue el commit grueso: monté la arquitectura en capas y los tres primeros endpoints de consulta.",
            li1: "<code>SuperheroeEntity</code> + changelog de Liquibase (<code>superheroes.sql</code>) que crea la tabla y siembra 10 héroes de ejemplo.",
            li2: "Separación <code>Entity</code> (persistencia) / <code>DAO</code> (entrada) / <code>DTO</code> (salida), con <code>SuperheroeMapper</code> de MapStruct entre medias, para no acoplar lo que guardo en base de datos con lo que expongo por la API.",
            li3: "<code>SuperheroesRepository</code> sobre <code>JpaRepository</code>, con un método derivado <code>findSuperheroeEntitiesByNameContainingIgnoreCase</code> para la búsqueda por nombre parcial que pedía el enunciado (el ejemplo de \"man\" → Spiderman/Superman/Manolito).",
            li4: "<code>GenericResponse</code> como envoltorio único de respuesta (status, message, data) para que todos los endpoints respondan de forma consistente.",
            li5: "<code>URLConstant</code> para centralizar las rutas y no repetir strings mágicos por los controladores.",
            li6: "Los tres endpoints GET: todos, por id y por nombre."
          },
          entry4: { date: "15 jul 2021 (mediodía)", p: "Añadí el <code>PUT</code> para modificar un héroe existente, con validación básica de que el id exista antes de tocar nada." },
          entry5: { date: "15 jul 2021 (tarde)", p: "Añadí el <code>DELETE</code>, completando así los cinco requisitos funcionales del enunciado." },
          entry6: { date: "16 jul 2021", p: "Cerré la entrega con los tests unitarios de <code>SuperheroeServiceImpl</code> usando JUnit 5 y Mockito, cubriendo el camino feliz y el de error (200/201 vs 404) de cada método del servicio. El enunciado solo pedía \"test unitarios de algún servicio\", así que me centré en cubrir bien ese único servicio en vez de repartir esfuerzo en tests superficiales de más componentes." }
        },
        decisions: {
          h2: "Decisiones de diseño",
          card1: { h3: "Respuesta uniforme", p: "<code>GenericResponse</code> envuelve status, mensaje y datos en todas las respuestas, para que el frontend consumidor tenga un contrato predecible sin tener que interpretar el código HTTP a ciegas." },
          card2: { h3: "Capas desacopladas", p: "Entity ↔ DAO/DTO vía MapStruct, controlador delgado que delega en el servicio, y el servicio hablando solo con el repositorio. Cada pieza tiene una única razón para cambiar." },
          card3: { h3: "DDL versionado", p: "Liquibase gestiona el esquema y la carga inicial de los 10 héroes de ejemplo, en vez de un <code>schema.sql</code>/<code>data.sql</code> sueltos." },
          card4: { h3: "Rutas centralizadas", p: "<code>URLConstant</code> agrupa los fragmentos de ruta para que no queden strings repetidos y desincronizados entre controlador y tests." }
        },
        coverage: {
          h2: "Qué quedó cubierto y qué no",
          intro: "Siendo honesto con el resultado final, de los puntos opcionales del enunciado:",
          item1: "Librería para el mantenimiento del DDL — Liquibase.",
          item2: "Anotación personalizada para medir tiempos de ejecución (estilo <code>@Timed</code>) — no llegué a implementarla.",
          item3: "Gestión centralizada de excepciones — los controladores validan a mano, sin <code>@ControllerAdvice</code>.",
          item4: "Test de integración — solo hay test unitario del servicio.",
          item5: "Aplicación dockerizada — no incluí Dockerfile.",
          item6: "Caché de peticiones — no implementada.",
          item7: "Documentación de la API — añadí la dependencia de Spring REST Docs pero no generé la documentación final.",
          item8: "Seguridad del API — no añadida (el <code>CrossOrigin(\"*\")</code> queda abierto).",
          closing: "El detalle de cómo cerrar cada uno de estos puntos, junto con otras mejoras que veo con perspectiva de los años, está en <a href=\"improvements.html\">el documento de mejoras pendientes</a>."
        }
      },
      cta: {
        github: "Ver el código en GitHub ↗",
        improvements: "Ver mejoras pendientes →",
        back: "← Ver otros casos"
      }
    },
    w2mImprovements: {
      title: "Qué le falta a esta prueba para estar perfecta — Albert Ortells",
      nav: { role: "// PRUEBAS TÉCNICAS", story: "← Historia", cases: "Casos" },
      hero: {
        eyebrow: "Prueba técnica · World2Meet",
        h1: "Qué le falta a esta prueba para estar perfecta",
        lede: "Repaso técnico del estado actual del código: un bug real en el test, una inconsistencia con el enunciado, y los puntos opcionales que quedaron pendientes. Contexto de por qué se llegó hasta aquí en <a href=\"./index.html\">world2meet</a>."
      },
      story: {
        h2Findings: "Hallazgos",
        bugLabel: "⚠ Bug",
        item1: {
          h3: "El test no está probando lo que parece",
          p1: "<code>SuperheroeServiceImplTest</code> declara:",
          p2: "El <code>@Mock</code> nunca se inyecta en <code>service</code> (no hay <code>@InjectMocks</code>, <code>@MockBean</code> ni <code>MockitoAnnotations.openMocks(this)</code>/<code>MockitoExtension</code>). El <code>service</code> autowireado es el bean real, conectado al repositorio real contra la H2 en memoria sembrada por Liquibase con los 10 héroes de <code>superheroes.sql</code>. Los <code>doReturn(...).when(repository)...</code> no tienen ningún efecto: son un mock huérfano.",
          p3: "Esto explica por qué <code>getSuperheroByID_isOK_thenReturnStatus200</code> \"funciona\" y espera <code>\"Batman\"</code> para <code>id = 2</code>: no es porque el mock devuelva ese valor, es que coincide por casualidad con el dato semilla real. Es un test de integración disfrazado de test unitario, y frágil ante cualquier cambio en <code>superheroes.sql</code>.",
          p4: "<strong>Cómo arreglarlo:</strong> añadir <code>@ExtendWith(MockitoExtension.class)</code> (o <code>MockitoAnnotations.openMocks(this)</code> en un <code>@BeforeEach</code>) e inyectar el mock con <code>@InjectMocks SuperheroeServiceImpl service</code> en lugar de <code>@Autowired</code> + <code>@SpringBootTest</code>, para que sea un test unitario real y rápido, sin levantar contexto de Spring ni base de datos."
        },
        item2: {
          h3: "Inconsistencia Java 11 vs bytecode 1.8",
          p: "<code>pom.xml</code> declara <code>&lt;java.version&gt;11&lt;/java.version&gt;</code> pero el <code>maven-compiler-plugin</code> está configurado con <code>&lt;source&gt;1.8&lt;/source&gt;</code> <code>&lt;target&gt;1.8&lt;/target&gt;</code>. El enunciado pedía explícitamente Java 11. Cambiar el plugin a <code>&lt;source&gt;11&lt;/source&gt;&lt;target&gt;11&lt;/target&gt;</code> (o mejor, usar <code>&lt;maven.compiler.release&gt;11&lt;/maven.compiler.release&gt;</code> y eliminar la propiedad duplicada)."
        },
        item3: {
          h3: "Puntos opcionales del enunciado sin implementar",
          li1: "<strong>Anotación personalizada de tiempos de ejecución.</strong> Crear <code>@LogExecutionTime</code> + <code>@Aspect</code> con Spring AOP (<code>spring-boot-starter-aop</code>) que envuelva el método anotado, mida con <code>System.nanoTime()</code> y escriba el resultado con un logger. Aplicarla sobre los métodos de <code>SuperheroeServiceImpl</code>.",
          li2: "<strong>Gestión centralizada de excepciones.</strong> Añadir un <code>@RestControllerAdvice</code> con <code>@ExceptionHandler</code> para <code>MethodArgumentNotValidException</code>, <code>ConstraintViolationException</code> y una excepción de negocio propia (p. ej. <code>SuperheroeNotFoundException</code>), devolviendo siempre un <code>GenericResponse</code> coherente en vez de las validaciones manuales repetidas en el controlador.",
          li3: "<strong>Test de integración.</strong> Añadir un <code>@SpringBootTest</code> con <code>@AutoConfigureMockMvc</code> que golpee los endpoints reales (<code>MockMvc</code> o <code>WebTestClient</code>) contra la H2 en memoria, complementando el test unitario del servicio.",
          li4: "<strong>Dockerización.</strong> Añadir un <code>Dockerfile</code> multi-stage (build con <code>mvnw</code> + imagen final <code>eclipse-temurin:11-jre</code>) y opcionalmente un <code>docker-compose.yml</code>.",
          li5: "<strong>Caché de peticiones.</strong> Añadir <code>spring-boot-starter-cache</code> + <code>@EnableCaching</code>, y anotar <code>getAllSuperheroes()</code> / <code>getSuperheroByID()</code> con <code>@Cacheable</code>, invalidando la caché en <code>updateSuperhero()</code> y <code>deleteSuperhero()</code> con <code>@CacheEvict</code>.",
          li6: "<strong>Documentación de la API.</strong> Ya está la dependencia <code>spring-restdocs-mockmvc</code> en el <code>pom.xml</code> pero no se llegó a generar documentación con ella. Más simple y mantenible hoy: añadir <code>springdoc-openapi-ui</code> para Swagger UI autogenerado, o completar la configuración de REST Docs ya presente.",
          li7: "<strong>Seguridad del API.</strong> No hay ninguna dependencia de seguridad. Como mínimo, añadir <code>spring-boot-starter-security</code> con autenticación básica o un API key para los endpoints de escritura (<code>PUT</code>/<code>DELETE</code>), y sustituir <code>@CrossOrigin(origins = \"*\")</code> (abierto a cualquier origen) por una lista blanca de orígenes concreta."
        },
        item4: {
          h3: "Diseño de la API",
          li1: "<strong>No es RESTful.</strong> Las rutas usan el verbo en la propia URL (<code>GET /get/all</code>, <code>GET /get/one/{id}</code>, <code>PUT /put</code>, <code>DELETE /delete/{id}</code>) en vez de apoyarse en el método HTTP: debería ser <code>GET /superheroes</code>, <code>GET /superheroes/{id}</code>, <code>GET /superheroes?name=man</code>, <code>PUT /superheroes/{id}</code>, <code>DELETE /superheroes/{id}</code>.",
          li2: "<strong>El <code>PUT</code> no lleva el id en la URL</strong> (<code>SuperheroesController.putExample</code>): recibe el id dentro del body (<code>SuperheroeDAO.id</code>). Debería ser <code>PUT /superheroes/{id}</code> con el id como <code>@PathVariable</code>, y el body solo con los campos a modificar.",
          li3: "<strong>Nombres de método heredados de la plantilla.</strong> <code>putExample</code> y <code>deleteExample</code> en <code>SuperheroesController</code> son nombres de ejemplo de Spring Initializr que no se renombraron; deberían llamarse <code>updateSuperheroe</code> / <code>deleteSuperheroe</code>.",
          li4: "<strong><code>URLConstant.POST</code> está declarado y no se usa</strong> (no hay endpoint de creación, ni lo pedía el enunciado). Si no se va a añadir un <code>POST</code>, eliminar la constante muerta; si se añade, usarla.",
          li5: "<strong>Falta paginación</strong> en <code>getAllSuperheroes()</code>. Con <code>JpaRepository</code> ya disponible, cambiar a <code>Page&lt;SuperheroeEntity&gt; findAll(Pageable pageable)</code> es casi gratis."
        },
        item5: {
          h3: "Validación",
          p1: "<code>javax.validation</code> está en el <code>pom.xml</code> y <code>@Valid</code> se usa en el controlador, pero <code>SuperheroeDAO</code> no tiene ninguna anotación de validación (<code>@NotBlank</code>, <code>@Size</code>, etc.), así que <code>@Valid</code> no hace nada ahí. Los controles actuales son manuales y repetidos:",
          p2: "Mover estas reglas a anotaciones en <code>SuperheroeDAO</code> (<code>@NotBlank</code> en <code>name</code>/<code>power</code>, <code>@Size(max = 25)</code> / <code>@Size(max = 50)</code> acorde a las columnas de <code>superheroes.sql</code>) y dejar que el <code>@RestControllerAdvice</code> del punto 3 traduzca los errores de validación a <code>GenericResponse</code>."
        },
        item6: {
          h3: "Logging",
          p: "No hay ningún logger en el proyecto. Añadir SLF4J (<code>LoggerFactory.getLogger(...)</code>) al menos en el servicio y en el aspecto de tiempos de ejecución del punto 3; ahora mismo no queda ningún rastro de lo que hace la aplicación en producción."
        },
        item7: {
          h3: "Acoplamiento a tipos concretos",
          li1: "<code>SuperheroesRepository</code> declara <code>ArrayList&lt;SuperheroeEntity&gt; findAll()</code> y <code>ArrayList&lt;SuperheroeEntity&gt; findSuperheroeEntitiesByNameContainingIgnoreCase(String param)</code>. Un repositorio Spring Data debería exponer <code>List&lt;T&gt;</code>, no <code>ArrayList&lt;T&gt;</code>: acoplarse a la implementación concreta no aporta nada y sobreescribir <code>findAll()</code> solo para cambiar el tipo de retorno es innecesario.",
          li2: "Mismo patrón en <code>SuperheroeMapper.arrayListSuperheroeEntityToArrayListSuperheroDTO</code>: usar <code>List&lt;SuperheroeDTO&gt;</code> en la firma."
        },
        item8: {
          h3: "Mezcla de JAX-RS y Spring",
          p: "El proyecto usa Spring Boot de principio a fin, pero para los códigos de estado tira de <code>javax.ws.rs.core.Response.Status</code> (JAX-RS) en vez de <code>org.springframework.http.HttpStatus</code>, y mete la dependencia <code>javax.ws.rs-api</code> solo para eso. Sustituir por <code>HttpStatus</code> de Spring y devolver <code>ResponseEntity&lt;GenericResponse&gt;</code> en los controladores en vez de fijar el status solo dentro del <code>GenericResponse</code> (así el código HTTP real de la respuesta coincide con el que se informa en el body)."
        },
        item9: {
          h3: "Configuración",
          li1: "La contraseña de la datasource (<code>spring.datasource.password=password</code>) está hardcodeada en <code>application.properties</code>. Para una H2 en memoria de prueba el riesgo es mínimo, pero es un mal hábito a evitar incluso en pruebas técnicas.",
          li2: "No hay perfiles (<code>application-dev.properties</code>, <code>application-prod.properties</code>) ni forma de parametrizar el puerto/entorno sin editar el fichero fuente."
        },
        item10: {
          h3: "Documentación y naming",
          li1: "Mezcla de español (\"Superheroe\", \"Prueba técnica\") e inglés (nombres de clases, mensajes de respuesta) — no bloqueante, pero conviene decidir un idioma para el código y mantenerlo consistente.",
          li2: "No hay Javadoc en las interfaces públicas (<code>SuperheroeService</code>, <code>SuperheroesRepository</code>)."
        },
        h2Priority: "Resumen priorizado",
        priority: {
          li1: "Arreglar el test que no testea nada real (punto 1) — es lo más grave, da falsa confianza.",
          li2: "Alinear Java 11 en el compilador (punto 2) — incumple un requisito explícito del enunciado.",
          li3: "Gestión centralizada de excepciones + validación con anotaciones (puntos 3 y 5) — mejora visible con poco esfuerzo.",
          li4: "Rediseñar rutas a estilo REST (punto 4) — impacto en el contrato de la API, hacerlo antes de sumar más clientes.",
          li5: "Resto de opcionales (AOP de tiempos, tests de integración, Docker, caché, seguridad, documentación OpenAPI) según tiempo disponible."
        },
        tags: { tag1: "Testing", tag4: "Seguridad" }
      },
      cta: {
        github: "Ver el código en GitHub ↗",
        story: "← Volver a la historia",
        cases: "← Ver otros casos"
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
      world2meetCard: { note: "API de superherois: arquitectura en capes, DDL gestionat amb Liquibase, MapStruct i tests unitaris del servei amb JUnit 5 i Mockito." },
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
    world2meet: {
      title: "Com vaig construir l'API de superherois — Albert Ortells",
      nav: { role: "// PROVES TÈCNIQUES", cases: "← Casos" },
      hero: {
        eyebrow: "Prova tècnica · World2Meet · Juliol 2021",
        h1: "Com vaig construir l'API de superherois",
        lede: "El relat, en primera persona, de com vaig abordar la prova tècnica de backend de W2M: les decisions de disseny, què vaig prioritzar i què vaig deixar fora per manca de temps."
      },
      story: {
        p1: "L'enunciat demanava una API en Spring Boot 2 / Java 11 per mantenir una llista de superherois: consultar-los tots, consultar-los per id, cercar-los per un fragment del seu nom, modificar-los i esborrar-los, amb persistència en una H2 en memòria i almenys un test unitari. A més hi havia una llista de punts opcionals (DDL amb llibreria, anotació de temps, gestió d'excepcions, tests d'integració, Docker, caché, documentació, seguretat) que sabia que no em donaria temps a cobrir tots, així que vaig decidir des del principi prioritzar l'obligatori i deixar assentada una base d'arquitectura neta sobre la qual aquests opcionals poguessin afegir-se després sense fricció.",
        process: { h2: "El procés, commit a commit" },
        timeline: {
          entry1: { date: "13 jul 2021", p: "Vaig arrencar el repositori en local. No calia publicar-lo, l'enunciat permetia lliurar-lo comprimit, però vaig preferir portar-lo per Git des del primer minut perquè l'historial de commits servís com a evidència del procés, tal com suggeria el punt de \"es valorarà positivament l'ús de TDD... es poden utilitzar els commits per veure el procés\"." },
          entry2: {
            date: "13 jul 2021",
            p: "Vaig generar l'esquelet del projecte i vaig triar les dependències pensant ja en diversos dels punts opcionals:",
            li1: "<strong>Spring Web + Data JPA + Data JDBC + Data REST</strong> per a la capa d'API i persistència.",
            li2: "<strong>H2</strong> en memòria, tal com demanava l'enunciat.",
            li3: "<strong>Liquibase</strong> per no escriure el DDL a mà — cobreix l'opcional de \"llibreria que faciliti el manteniment dels scripts DDL\".",
            li4: "<strong>MapStruct</strong> per no escriure a mà el mapeig entre entitats JPA i els objectes que viatgen per l'API.",
            li5: "<strong>spring-restdocs-mockmvc</strong> pensant a generar documentació de l'API a partir dels tests, tot i que al final el temps no em va arribar per completar aquesta part."
          },
          entry3: {
            date: "15 jul 2021 (matí)",
            p: "Aquest va ser el commit gruixut: vaig muntar l'arquitectura en capes i els tres primers endpoints de consulta.",
            li1: "<code>SuperheroeEntity</code> + changelog de Liquibase (<code>superheroes.sql</code>) que crea la taula i sembra 10 herois d'exemple.",
            li2: "Separació <code>Entity</code> (persistència) / <code>DAO</code> (entrada) / <code>DTO</code> (sortida), amb un <code>SuperheroeMapper</code> de MapStruct enmig, per no acoblar el que guardo a base de dades amb el que exposo per l'API.",
            li3: "<code>SuperheroesRepository</code> sobre <code>JpaRepository</code>, amb un mètode derivat <code>findSuperheroeEntitiesByNameContainingIgnoreCase</code> per a la cerca per nom parcial que demanava l'enunciat (l'exemple de \"man\" → Spiderman/Superman/Manolito).",
            li4: "<code>GenericResponse</code> com a embolcall únic de resposta (status, message, data) perquè tots els endpoints responguin de forma consistent.",
            li5: "<code>URLConstant</code> per centralitzar les rutes i no repetir strings màgics pels controladors.",
            li6: "Els tres endpoints GET: tots, per id i per nom."
          },
          entry4: { date: "15 jul 2021 (migdia)", p: "Vaig afegir el <code>PUT</code> per modificar un heroi existent, amb validació bàsica que l'id existeixi abans de tocar res." },
          entry5: { date: "15 jul 2021 (tarda)", p: "Vaig afegir el <code>DELETE</code>, completant així els cinc requisits funcionals de l'enunciat." },
          entry6: { date: "16 jul 2021", p: "Vaig tancar el lliurament amb els tests unitaris de <code>SuperheroeServiceImpl</code> fent servir JUnit 5 i Mockito, cobrint el camí feliç i el d'error (200/201 vs 404) de cada mètode del servei. L'enunciat només demanava \"tests unitaris d'algun servei\", així que em vaig centrar a cobrir bé aquest únic servei en comptes de repartir esforç en tests superficials de més components." }
        },
        decisions: {
          h2: "Decisions de disseny",
          card1: { h3: "Resposta uniforme", p: "<code>GenericResponse</code> embolcalla status, missatge i dades a totes les respostes, perquè el frontend consumidor tingui un contracte predictible sense haver d'interpretar el codi HTTP a cegues." },
          card2: { h3: "Capes desacoblades", p: "Entity ↔ DAO/DTO via MapStruct, controlador prim que delega en el servei, i el servei parlant només amb el repositori. Cada peça té una única raó per canviar." },
          card3: { h3: "DDL versionat", p: "Liquibase gestiona l'esquema i la càrrega inicial dels 10 herois d'exemple, en comptes d'un <code>schema.sql</code>/<code>data.sql</code> solts." },
          card4: { h3: "Rutes centralitzades", p: "<code>URLConstant</code> agrupa els fragments de ruta perquè no quedin strings repetits i desincronitzats entre el controlador i els tests." }
        },
        coverage: {
          h2: "Què va quedar cobert i què no",
          intro: "Sent honest amb el resultat final, dels punts opcionals de l'enunciat:",
          item1: "Llibreria per al manteniment del DDL — Liquibase.",
          item2: "Anotació personalitzada per mesurar temps d'execució (estil <code>@Timed</code>) — no vaig arribar a implementar-la.",
          item3: "Gestió centralitzada d'excepcions — els controladors validen a mà, sense <code>@ControllerAdvice</code>.",
          item4: "Test d'integració — només hi ha test unitari del servei.",
          item5: "Aplicació dockeritzada — no vaig incloure Dockerfile.",
          item6: "Caché de peticions — no implementada.",
          item7: "Documentació de l'API — vaig afegir la dependència de Spring REST Docs però no vaig generar la documentació final.",
          item8: "Seguretat de l'API — no afegida (el <code>CrossOrigin(\"*\")</code> queda obert).",
          closing: "El detall de com tancar cadascun d'aquests punts, juntament amb altres millores que veig amb perspectiva dels anys, és a <a href=\"improvements.html\">el document de millores pendents</a>."
        }
      },
      cta: {
        github: "Veure el codi a GitHub ↗",
        improvements: "Veure millores pendents →",
        back: "← Veure altres casos"
      }
    },
    w2mImprovements: {
      title: "Què li falta a aquesta prova per ser perfecta — Albert Ortells",
      nav: { role: "// PROVES TÈCNIQUES", story: "← Història", cases: "Casos" },
      hero: {
        eyebrow: "Prova tècnica · World2Meet",
        h1: "Què li falta a aquesta prova per ser perfecta",
        lede: "Repàs tècnic de l'estat actual del codi: un bug real al test, una inconsistència amb l'enunciat, i els punts opcionals que van quedar pendents. Context de per què es va arribar fins aquí a <a href=\"./index.html\">world2meet</a>."
      },
      story: {
        h2Findings: "Troballes",
        bugLabel: "⚠ Bug",
        item1: {
          h3: "El test no està provant el que sembla",
          p1: "<code>SuperheroeServiceImplTest</code> declara:",
          p2: "El <code>@Mock</code> mai s'injecta a <code>service</code> (no hi ha <code>@InjectMocks</code>, <code>@MockBean</code> ni <code>MockitoAnnotations.openMocks(this)</code>/<code>MockitoExtension</code>). El <code>service</code> autowired és el bean real, connectat al repositori real contra la H2 en memòria sembrada per Liquibase amb els 10 herois de <code>superheroes.sql</code>. Els <code>doReturn(...).when(repository)...</code> no tenen cap efecte: són un mock orfe.",
          p3: "Això explica per què <code>getSuperheroByID_isOK_thenReturnStatus200</code> \"funciona\" i espera <code>\"Batman\"</code> per a <code>id = 2</code>: no és perquè el mock retorni aquest valor, és que coincideix per casualitat amb la dada llavor real. És un test d'integració disfressat de test unitari, i fràgil davant qualsevol canvi a <code>superheroes.sql</code>.",
          p4: "<strong>Com arreglar-ho:</strong> afegir <code>@ExtendWith(MockitoExtension.class)</code> (o <code>MockitoAnnotations.openMocks(this)</code> en un <code>@BeforeEach</code>) i injectar el mock amb <code>@InjectMocks SuperheroeServiceImpl service</code> en lloc de <code>@Autowired</code> + <code>@SpringBootTest</code>, perquè sigui un test unitari real i ràpid, sense aixecar context d'Spring ni base de dades."
        },
        item2: {
          h3: "Inconsistència Java 11 vs bytecode 1.8",
          p: "<code>pom.xml</code> declara <code>&lt;java.version&gt;11&lt;/java.version&gt;</code> però el <code>maven-compiler-plugin</code> està configurat amb <code>&lt;source&gt;1.8&lt;/source&gt;</code> <code>&lt;target&gt;1.8&lt;/target&gt;</code>. L'enunciat demanava explícitament Java 11. Canviar el plugin a <code>&lt;source&gt;11&lt;/source&gt;&lt;target&gt;11&lt;/target&gt;</code> (o millor, fer servir <code>&lt;maven.compiler.release&gt;11&lt;/maven.compiler.release&gt;</code> i eliminar la propietat duplicada)."
        },
        item3: {
          h3: "Punts opcionals de l'enunciat sense implementar",
          li1: "<strong>Anotació personalitzada de temps d'execució.</strong> Crear <code>@LogExecutionTime</code> + <code>@Aspect</code> amb Spring AOP (<code>spring-boot-starter-aop</code>) que embolcalli el mètode anotat, mesuri amb <code>System.nanoTime()</code> i escrigui el resultat amb un logger. Aplicar-la sobre els mètodes de <code>SuperheroeServiceImpl</code>.",
          li2: "<strong>Gestió centralitzada d'excepcions.</strong> Afegir un <code>@RestControllerAdvice</code> amb <code>@ExceptionHandler</code> per a <code>MethodArgumentNotValidException</code>, <code>ConstraintViolationException</code> i una excepció de negoci pròpia (p. ex. <code>SuperheroeNotFoundException</code>), retornant sempre un <code>GenericResponse</code> coherent en comptes de les validacions manuals repetides al controlador.",
          li3: "<strong>Test d'integració.</strong> Afegir un <code>@SpringBootTest</code> amb <code>@AutoConfigureMockMvc</code> que colpegi els endpoints reals (<code>MockMvc</code> o <code>WebTestClient</code>) contra la H2 en memòria, complementant el test unitari del servei.",
          li4: "<strong>Dockerització.</strong> Afegir un <code>Dockerfile</code> multi-stage (build amb <code>mvnw</code> + imatge final <code>eclipse-temurin:11-jre</code>) i opcionalment un <code>docker-compose.yml</code>.",
          li5: "<strong>Caché de peticions.</strong> Afegir <code>spring-boot-starter-cache</code> + <code>@EnableCaching</code>, i anotar <code>getAllSuperheroes()</code> / <code>getSuperheroByID()</code> amb <code>@Cacheable</code>, invalidant la caché a <code>updateSuperhero()</code> i <code>deleteSuperhero()</code> amb <code>@CacheEvict</code>.",
          li6: "<strong>Documentació de l'API.</strong> Ja hi ha la dependència <code>spring-restdocs-mockmvc</code> al <code>pom.xml</code> però no es va arribar a generar documentació amb ella. Més simple i mantenible avui: afegir <code>springdoc-openapi-ui</code> per a Swagger UI autogenerat, o completar la configuració de REST Docs ja present.",
          li7: "<strong>Seguretat de l'API.</strong> No hi ha cap dependència de seguretat. Com a mínim, afegir <code>spring-boot-starter-security</code> amb autenticació bàsica o una API key per als endpoints d'escriptura (<code>PUT</code>/<code>DELETE</code>), i substituir <code>@CrossOrigin(origins = \"*\")</code> (obert a qualsevol origen) per una llista blanca d'orígens concreta."
        },
        item4: {
          h3: "Disseny de l'API",
          li1: "<strong>No és RESTful.</strong> Les rutes fan servir el verb a la mateixa URL (<code>GET /get/all</code>, <code>GET /get/one/{id}</code>, <code>PUT /put</code>, <code>DELETE /delete/{id}</code>) en comptes de recolzar-se en el mètode HTTP: hauria de ser <code>GET /superheroes</code>, <code>GET /superheroes/{id}</code>, <code>GET /superheroes?name=man</code>, <code>PUT /superheroes/{id}</code>, <code>DELETE /superheroes/{id}</code>.",
          li2: "<strong>El <code>PUT</code> no porta l'id a la URL</strong> (<code>SuperheroesController.putExample</code>): rep l'id dins del body (<code>SuperheroeDAO.id</code>). Hauria de ser <code>PUT /superheroes/{id}</code> amb l'id com a <code>@PathVariable</code>, i el body només amb els camps a modificar.",
          li3: "<strong>Noms de mètode heretats de la plantilla.</strong> <code>putExample</code> i <code>deleteExample</code> a <code>SuperheroesController</code> són noms d'exemple de Spring Initializr que no es van renombrar; haurien de dir-se <code>updateSuperheroe</code> / <code>deleteSuperheroe</code>.",
          li4: "<strong><code>URLConstant.POST</code> està declarat i no s'utilitza</strong> (no hi ha endpoint de creació, ni ho demanava l'enunciat). Si no es va a afegir un <code>POST</code>, eliminar la constant morta; si s'afegeix, utilitzar-la.",
          li5: "<strong>Falta paginació</strong> a <code>getAllSuperheroes()</code>. Amb <code>JpaRepository</code> ja disponible, canviar a <code>Page&lt;SuperheroeEntity&gt; findAll(Pageable pageable)</code> és gairebé gratis."
        },
        item5: {
          h3: "Validació",
          p1: "<code>javax.validation</code> és al <code>pom.xml</code> i <code>@Valid</code> s'utilitza al controlador, però <code>SuperheroeDAO</code> no té cap anotació de validació (<code>@NotBlank</code>, <code>@Size</code>, etc.), així que <code>@Valid</code> no fa res allà. Els controls actuals són manuals i repetits:",
          p2: "Moure aquestes regles a anotacions a <code>SuperheroeDAO</code> (<code>@NotBlank</code> a <code>name</code>/<code>power</code>, <code>@Size(max = 25)</code> / <code>@Size(max = 50)</code> segons les columnes de <code>superheroes.sql</code>) i deixar que el <code>@RestControllerAdvice</code> del punt 3 tradueixi els errors de validació a <code>GenericResponse</code>."
        },
        item6: {
          h3: "Logging",
          p: "No hi ha cap logger al projecte. Afegir SLF4J (<code>LoggerFactory.getLogger(...)</code>) almenys al servei i a l'aspecte de temps d'execució del punt 3; ara mateix no queda cap rastre del que fa l'aplicació en producció."
        },
        item7: {
          h3: "Acoblament a tipus concrets",
          li1: "<code>SuperheroesRepository</code> declara <code>ArrayList&lt;SuperheroeEntity&gt; findAll()</code> i <code>ArrayList&lt;SuperheroeEntity&gt; findSuperheroeEntitiesByNameContainingIgnoreCase(String param)</code>. Un repositori Spring Data hauria d'exposar <code>List&lt;T&gt;</code>, no <code>ArrayList&lt;T&gt;</code>: acoblar-se a la implementació concreta no aporta res i sobreescriure <code>findAll()</code> només per canviar el tipus de retorn és innecessari.",
          li2: "Mateix patró a <code>SuperheroeMapper.arrayListSuperheroeEntityToArrayListSuperheroDTO</code>: fer servir <code>List&lt;SuperheroeDTO&gt;</code> a la signatura."
        },
        item8: {
          h3: "Barreja de JAX-RS i Spring",
          p: "El projecte fa servir Spring Boot de cap a cap, però per als codis d'estat recorre a <code>javax.ws.rs.core.Response.Status</code> (JAX-RS) en comptes de <code>org.springframework.http.HttpStatus</code>, i afegeix la dependència <code>javax.ws.rs-api</code> només per això. Substituir-lo per <code>HttpStatus</code> d'Spring i retornar <code>ResponseEntity&lt;GenericResponse&gt;</code> als controladors en comptes de fixar l'status només dins del <code>GenericResponse</code> (així el codi HTTP real de la resposta coincideix amb el que s'informa al body)."
        },
        item9: {
          h3: "Configuració",
          li1: "La contrasenya de la datasource (<code>spring.datasource.password=password</code>) està hardcodejada a <code>application.properties</code>. Per a una H2 en memòria de prova el risc és mínim, però és un mal hàbit a evitar fins i tot en proves tècniques.",
          li2: "No hi ha perfils (<code>application-dev.properties</code>, <code>application-prod.properties</code>) ni manera de parametritzar el port/entorn sense editar el fitxer font."
        },
        item10: {
          h3: "Documentació i naming",
          li1: "Barreja d'espanyol (\"Superheroe\", \"Prueba técnica\") i anglès (noms de classes, missatges de resposta) — no bloquejant, però convé decidir un idioma per al codi i mantenir-lo consistent.",
          li2: "No hi ha Javadoc a les interfícies públiques (<code>SuperheroeService</code>, <code>SuperheroesRepository</code>)."
        },
        h2Priority: "Resum prioritzat",
        priority: {
          li1: "Arreglar el test que no testeja res real (punt 1) — és el més greu, dona falsa confiança.",
          li2: "Alinear Java 11 al compilador (punt 2) — incompleix un requisit explícit de l'enunciat.",
          li3: "Gestió centralitzada d'excepcions + validació amb anotacions (punts 3 i 5) — millora visible amb poc esforç.",
          li4: "Redissenyar rutes a estil REST (punt 4) — impacte en el contracte de l'API, fer-ho abans de sumar més clients.",
          li5: "Resta d'opcionals (AOP de temps, tests d'integració, Docker, caché, seguretat, documentació OpenAPI) segons temps disponible."
        },
        tags: { tag1: "Testing", tag4: "Seguretat" }
      },
      cta: {
        github: "Veure el codi a GitHub ↗",
        story: "← Tornar a la història",
        cases: "← Veure altres casos"
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
