const projects = {
  service: {
    index: '01', category: 'MULTI-TENANT SAAS / SERVICE MANAGEMENT',
    title: 'Multi-Tenant IT Service Desk & SLA Management',
    summary: 'A Java/React service desk for organizations to manage incidents and service requests, route work to support teams, and track response and resolution deadlines with tenant-scoped access.',
    tech: ['Java 21', 'Spring Boot', 'Spring Security', 'React', 'TypeScript', 'PostgreSQL', 'Docker', 'Playwright'],
    decisions: [
      ['Access follows the organization and the team', 'Tenant-scoped queries, PostgreSQL row policies, and role/team checks control ticket visibility and assignment. Public replies and internal notes have separate audiences.'],
      ['SLA clocks follow the business calendar', 'Versioned policies account for business hours, time zones, holidays, pause/resume, warnings, and escalation recipients. Resolution and reopening preserve history.'],
      ['Notifications survive the request', 'PostgreSQL-backed notifications and a transactional email outbox support retries. Live WebSocket refresh reconnects after an interrupted connection.']
    ],
    evidence: [['42', 'backend tests recorded as passing'], ['4', 'browser acceptance tests recorded as passing'], ['42 ms', 'local p95 ticket-list latency'], ['100', 'authenticated benchmark requests at concurrency 10; zero errors']],
    boundary: 'Local portfolio application with synthetic organizations and a local email inbox. No public application deployment or production SLA is claimed. Email can duplicate after a crash, and multiple app instances need sticky routing for in-memory sessions. The ticket-board preview is an illustration of the workflow.',
    href: 'https://github.com/Dilep01/service-desk-sla'
  },
  banking: {
    index: '02', category: 'BANKING SIMULATION / TRANSACTION INTEGRITY',
    title: 'Digital Banking Ledger & Transaction Reconciliation',
    summary: 'A local Java/React application for simulated internal transfers, double-entry bookkeeping, account history, statement reconciliation, and reviewed full reversals with traceable audit evidence.',
    tech: ['Java 21', 'Spring Boot', 'Spring Security', 'Spring JDBC', 'PostgreSQL', 'React', 'TypeScript', 'Playwright'],
    decisions: [
      ['Money is exact and journals must balance', 'BigDecimal and PostgreSQL numeric amounts avoid floating-point errors. Balanced double-entry journals are enforced at database commit, with account locks acquired in a deterministic order.'],
      ['A repeated request has one result', 'Database-backed idempotency reservations persist the response across application instances. Scheduled transfers and outbox delivery are durable.'],
      ['Corrections preserve the evidence', 'CSV statement imports retain source rows and version reconciliation runs. Full reversals require a separate maker and approver; a new reversing journal preserves the original.']
    ],
    evidence: [['62 + 7', 'backend and frontend tests recorded as passing'], ['5', 'browser workflows recorded as passing'], ['50 → 1', 'simultaneous same-key requests produced exactly one transfer'], ['2', 'application instances in the recorded idempotency check']],
    boundary: 'Local simulation using synthetic identities, statements, and money. No bank, UPI, card-network, or real-payment connections. Local checks, including recovery and backup restoration, do not establish production capacity or regulatory compliance.',
    href: 'https://github.com/Dilep01/digital-banking-ledger-reconciliation'
  },
  stockflow: {
    index: '03', category: 'DISTRIBUTED INVENTORY / EVENT-DRIVEN WORKFLOWS',
    title: 'Stockflow — Distributed Inventory & Order Management',
    summary: 'A multi-warehouse application for stock reservations, split orders, fulfillment, partial returns, and warehouse transfers, with a React workspace for customers, operators, and administrators.',
    tech: ['Java 21', 'Spring Boot', 'Spring JDBC', 'React', 'TypeScript', 'PostgreSQL', 'Kafka', 'Redis', 'Docker'],
    decisions: [
      ['Stock allocation is transactional', 'PostgreSQL row locks, an inventory ledger, and idempotent checkout coordinate reservations across warehouses. Orders can split across warehouse stock.'],
      ['Events can be retried without duplicating work', 'Kafka outbox/inbox delivery, bounded retries, dead letters, and duplicate-safe replay make event-processing failures recoverable.'],
      ['Service roles own their data', 'Six separately addressable Spring Boot service roles use separate database ownership. Customers, warehouse operators, and administrators have scoped workspaces.']
    ],
    evidence: [['100 → 10', 'simultaneous checkout requests for 10 units produced 10 allocations'], ['2', 'inventory instances in the recorded contention check'], ['31', 'backend integration tests in recorded verification'], ['4', 'dead-letter recovery checks, plus outage and restart checks']],
    boundary: 'Local portfolio simulation with synthetic data, shipping, and refunds. Service processes share one build artifact. A single PostgreSQL host and Kafka broker do not establish multi-host high availability or production capacity.',
    href: 'https://github.com/Dilep01/stockflow'
  }
};

const flows = {
  service: {
    file: 'service-desk / request-flow',
    steps: [
      ['↗', 'Submit', 'A request starts with its tenant', 'An employee submits an incident or service request. Organization membership and ownership establish the access boundary.'],
      ['⇄', 'Route', 'Route to the right support team', 'Role and team permissions control queues and eligible assignees. Internal notes remain separate from public replies.'],
      ['◷', 'Track SLA', 'Time follows the working calendar', 'Versioned SLA policies apply business hours, holidays, pause/resume rules, warnings, and escalation recipients.'],
      ['✓', 'Resolve', 'Keep the resolution traceable', 'An agent records a resolution summary. Notifications and the email outbox preserve delivery work beyond the request.'],
      ['↻', 'Confirm', 'Closure includes the employee', 'The requester can confirm or reopen. Resolution cycles and audit history remain available for review.']
    ]
  },
  banking: {
    file: 'banking-ledger / transfer-flow',
    steps: [
      ['↗', 'Review', 'Check the transfer before posting', 'The customer reviews an exact INR amount. Account ownership, funds checks, and an idempotency key guard the request.'],
      ['⇄', 'Post', 'Balance every journal', 'Ordered account locks protect concurrent changes. Debit and credit entries, balance projections, and audit evidence commit atomically.'],
      ['≡', 'Match', 'Reconcile with preserved source rows', 'Imported statements are matched against account legs. Each reconciliation run is versioned and keeps its source evidence.'],
      ['⌕', 'Investigate', 'Make discrepancies reviewable', 'Operations can inspect unmatched evidence, journal entries, and account history before requesting a full reversal.'],
      ['✓', 'Approve', 'A second person reviews the correction', 'A separate approver decides the reversal. A new reversing journal preserves the original posting and its audit trail.']
    ]
  },
  stockflow: {
    file: 'stockflow / order-flow',
    steps: [
      ['↗', 'Checkout', 'Make checkout repeatable', 'A customer submits an order with an idempotency key. Repeated requests must not create duplicate work.'],
      ['▤', 'Reserve', 'The last unit is allocated once', 'PostgreSQL row locks and transactional reservations coordinate competing requests across warehouse stock.'],
      ['⇄', 'Fulfill', 'Split work across warehouses', 'Orders split when needed. Warehouse-scoped operators pick, pack, and dispatch their own fulfillment work.'],
      ['↻', 'Deliver', 'Keep returns connected to inventory', 'Simulated shipping, partial returns, and warehouse transfers create ledger history rather than silently changing stock.'],
      ['✓', 'Reconcile', 'Recover events without repeating their effects', 'Transactional outbox/inbox delivery, bounded retries, dead letters, and duplicate-safe replay handle interrupted processing.']
    ]
  }
};

const $ = (selector) => document.querySelector(selector);
const dialog = $('.case-dialog');
let dialogTrigger;
function create(tag, className, content) { const el = document.createElement(tag); if (className) el.className = className; if (content !== undefined) el.textContent = content; return el; }
function openProject(key, trigger) {
  const project = projects[key];
  dialogTrigger = trigger;
  $('#case-index').textContent = project.index;
  $('#case-category').textContent = project.category;
  $('#case-title').textContent = project.title;
  $('#case-summary').textContent = project.summary;
  $('#case-tech').replaceChildren(...project.tech.map(t => create('span', '', t)));
  $('#case-decisions').replaceChildren(...project.decisions.map(([title, text]) => { const el = create('div', 'case-decision'); el.append(create('h4', '', title), create('p', '', text)); return el; }));
  $('#case-evidence').replaceChildren(...project.evidence.map(([number, text]) => { const el = create('div', 'evidence'); el.append(create('strong', '', number), create('span', '', text)); return el; }));
  $('#case-boundary').textContent = project.boundary;
  $('#case-repository').href = project.href;
  dialog.showModal(); dialog.scrollTop = 0; $('.close-dialog').focus();
}
document.querySelectorAll('[data-project]').forEach(button => button.addEventListener('click', () => openProject(button.dataset.project, button)));
$('.close-dialog').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if (event.target === dialog) { const r = dialog.getBoundingClientRect(); if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) dialog.close(); } });
dialog.addEventListener('close', () => dialogTrigger?.focus());

let flowKey = 'service'; let stepIndex = 0;
function renderStep() {
  const step = flows[flowKey].steps[stepIndex];
  $('#step-number').textContent = `${String(stepIndex + 1).padStart(2, '0')} / 05`;
  $('#step-title').textContent = step[2]; $('#step-description').textContent = step[3];
  $('#flow-counter').textContent = `${String(stepIndex + 1).padStart(2, '0')} — 05`;
  document.querySelectorAll('.flow-stage').forEach((el, i) => { if (i === stepIndex) el.setAttribute('aria-current', 'step'); else el.removeAttribute('aria-current'); });
  $('#flow-next').replaceChildren(document.createTextNode(stepIndex === 4 ? 'Back to start ' : 'Next step '), create('span', '', stepIndex === 4 ? '↻' : '→'));
}
function renderFlow(key) {
  flowKey = key; stepIndex = 0;
  $('#flow-file').textContent = flows[key].file;
  $('#flow-panel').setAttribute('aria-labelledby', `tab-${key}`);
  document.querySelectorAll('[data-flow]').forEach(tab => { const selected = tab.dataset.flow === key; tab.setAttribute('aria-selected', String(selected)); tab.tabIndex = selected ? 0 : -1; });
  $('#flow-stages').replaceChildren(...flows[key].steps.map(([icon, title], i) => { const el = create('button', 'flow-stage'); el.setAttribute('aria-label', `Step ${i + 1}: ${title}`); el.append(create('span', 'flow-stage-icon', icon), create('span', '', title)); el.addEventListener('click', () => { stepIndex = i; renderStep(); }); return el; }));
  renderStep();
}
document.querySelectorAll('[data-flow]').forEach(tab => {
  tab.addEventListener('click', () => renderFlow(tab.dataset.flow));
  tab.addEventListener('keydown', e => { const keys = ['service', 'banking', 'stockflow']; let i = keys.indexOf(flowKey); if (e.key === 'ArrowRight') i = (i + 1) % 3; else if (e.key === 'ArrowLeft') i = (i + 2) % 3; else if (e.key === 'Home') i = 0; else if (e.key === 'End') i = 2; else return; e.preventDefault(); renderFlow(keys[i]); $(`#tab-${keys[i]}`).focus(); });
});
$('#flow-next').addEventListener('click', () => { stepIndex = (stepIndex + 1) % 5; renderStep(); });
renderFlow(flowKey);

const menuButton = $('.menu-toggle');
function closeMenu() { menuButton.setAttribute('aria-expanded', 'false'); menuButton.setAttribute('aria-label', 'Open navigation'); $('#nav-links').classList.remove('open'); }
menuButton.addEventListener('click', () => { const open = menuButton.getAttribute('aria-expanded') !== 'true'; menuButton.setAttribute('aria-expanded', String(open)); menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation'); $('#nav-links').classList.toggle('open', open); });
document.querySelectorAll('#nav-links a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', e => { if (e.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') { closeMenu(); menuButton.focus(); } });
document.addEventListener('click', e => { if (!e.target.closest('.navigation')) closeMenu(); });

const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
let motionPaused = motionQuery.matches;
try { const stored = localStorage.getItem('dilep-java-motion'); if (stored !== null) motionPaused = stored === 'paused' || motionQuery.matches; } catch {}
function updateMotion() {
  document.documentElement.classList.toggle('motion-paused', motionPaused);
  $('.motion-toggle').setAttribute('aria-pressed', String(motionPaused));
  $('.motion-toggle').setAttribute('aria-label', motionPaused ? 'Resume animations' : 'Pause animations');
  $('.motion-icon').textContent = motionPaused ? '▷' : 'Ⅱ';
  $('.motion-label').textContent = motionPaused ? 'Motion off' : 'Motion on';
}
$('.motion-toggle').addEventListener('click', () => { motionPaused = !motionPaused; updateMotion(); try { localStorage.setItem('dilep-java-motion', motionPaused ? 'paused' : 'playing'); } catch {} });
motionQuery.addEventListener('change', e => { motionPaused = e.matches; updateMotion(); });
updateMotion();
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); } }), { threshold: .08 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  document.documentElement.classList.add('motion-ready');
}

$('.copy-email').addEventListener('click', async () => {
  try { await navigator.clipboard.writeText('dilepdeepu001@gmail.com'); $('.copy-status').textContent = 'Email copied'; }
  catch { $('.copy-status').textContent = 'Copy unavailable. Use the email link.'; }
});
