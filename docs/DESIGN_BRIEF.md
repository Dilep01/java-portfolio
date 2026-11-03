# Java portfolio design brief

Create a separate portfolio for Dilep Kumar K, a Java full-stack developer based in Bengaluru, Karnataka. His independent projects use Java 21, Spring Boot, React, TypeScript, PostgreSQL, and messaging patterns. He has 18 months of professional software testing experience and seeks Java full-stack and backend roles. Use the supplied portrait as a small introduction avatar and a larger photograph in the About section. Use the attached Java resume as the source for experience, skills, education, and its download.

## Visual direction

Use a warm ivory canvas, ink-colored text, cobalt accents, muted sage, and light blue/lavender project surfaces. Choose oversized geometric typography, generous whitespace, fine rules, and small monospaced annotations. Avoid reusing the Data Science site's dark background, peach palette, arched portrait hero, neural effects, and seventeen-project layout. The hero should be centered, typographic, and paired with an original isometric illustration of the application stack. Keep the portfolio aesthetic restrained and readable.

## Structure and content

1. Navigation: identity, Selected work, Toolkit, About, Contact, and a direct resume download. Provide an accessible small-screen menu.
2. Home: introduce Dilep and his Java full-stack focus with the headline “Java at the core. Care in every layer.” Offer Explore my work and GitHub links. Animate separated interface, application, and persistence layers with restrained floating motion and a traveling signal.
3. Selected work: feature exactly the three requested Java projects. Give Service Desk a full-width feature, followed by Banking and Stockflow in a two-column layout. Include technologies, concise explanations, repository links, and case-study dialogs. Use actual Banking and Stockflow screenshots and label the Service Desk workflow illustration clearly.
4. Case studies: cover engineering decisions, recorded local validation, and operating boundaries. Service Desk includes tenant/team permissions, business-calendar SLA policies, notifications, 42 backend tests and 4 browser acceptance tests. Banking includes exact money, double-entry journals, idempotency, reconciliation, maker/approver reversals, and recorded cross-instance checks. Stockflow includes row-lock reservations, split fulfillment, Kafka outbox/inbox processing, retries, and duplicate-safe replay. State that tests and benchmark numbers were recorded locally with synthetic data. Do not imply production validation or live financial connections.
5. Under the surface: offer a keyboard-accessible interactive request-flow explorer with three project tabs and five selectable stages. Explain the safety property of each stage in plain language. Treat it as a conceptual diagram rather than a live backend demonstration.
6. Toolkit: group resume skills by application core, user experience, data and messaging, and quality and delivery. Use restrained rows rather than proficiency percentages.
7. About: include the supplied portrait, the transition from testing to independent Java development, location, target roles, and resume link.
8. Experience and education: separate independent development in 2026 from Testing Trainee at Arteria Technologies, September 2024–March 2026. Mention 30+ CPI iFlows, eight production releases, reporting over 18 months, and the Client Champion Award 2025. Include B.E. Computer Science and Engineering, ATME College of Engineering, 2024, CGPA 7.62.
9. Contact: email dilepdeepu001@gmail.com, GitHub Dilep01, the verified LinkedIn URL, resume download, and a secondary link to the Data Science portfolio. Include a copy-email action with a clear result and graceful clipboard failure handling.

## Animation and implementation

Use lightweight CSS/SVG animation and IntersectionObserver reveals. Keep content readable if JavaScript fails. Respect reduced-motion preferences and provide a persistent pause control. Use native dialogs, visible focus states, meaningful image alternatives, semantic headings, and anchor navigation. Support narrow mobile screens without horizontal overflow. Build as a static, dependency-free site with local assets and relative paths, suitable for static hosting. No paid APIs, invented testimonials, fabricated achievements, or nonfunctional contact forms.

## Sources

- Attached Java resume: `C:\Users\dilip\Downloads\Resume\Java\Dilep_Kumar_K_Resume.docx`
- Existing public portfolio: https://dilep01.github.io/portfolio/
- Public repositories: https://github.com/Dilep01/service-desk-sla ; https://github.com/Dilep01/digital-banking-ledger-reconciliation ; https://github.com/Dilep01/stockflow
- The corresponding current local project documentation and screenshot assets.

## Design update

Current location is Bengaluru, Karnataka. Use unaccented Resume labels. Add soft blue, lilac, mint, and peach gradients across the hero and sections, with a richer blue-to-lilac contact background. Keep text contrast and the existing animations intact.
