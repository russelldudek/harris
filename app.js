const passportData = {
  origin: {
    serial: 'MISSION / ORIGIN / 001',
    title: 'Start with real work, not an AI use-case list.',
    summary: 'The passport begins with a named user, a specific workflow, and a decision or handoff worth improving.',
    owner: 'Named', baseline: 'Observed', authority: 'Declared', value: 'Defined',
    explainTitle: 'What the enablement lead makes easier',
    bullets: [
      'Observe where work is repetitive, slow, error-prone, information-heavy, or decision-constrained.',
      'Require a business owner and a before-state before a solution is built.',
      'Define whether the intended gain is time, quality, cycle time, customer experience, revenue support, or risk reduction.',
      'Record what must remain a human judgment or approval.'
    ]
  },
  proof: {
    serial: 'MISSION / PROOF / 002',
    title: 'Prove a changed workflow locally.',
    summary: 'A Mission earns portability by changing work and producing credible evidence—not by generating a polished demo.',
    owner: 'Accountable', baseline: 'Compared', authority: 'Observed', value: 'Measured',
    explainTitle: 'The proof packet',
    bullets: [
      'Document the before-state, intervention, and after-state using workflow-appropriate measures.',
      'Observe whether people repeat the behavior after the initial launch period.',
      'Capture failure modes, workarounds, exception handling, and where human review mattered.',
      'Separate real gains from novelty effects, cherry-picked examples, or tool-usage vanity metrics.'
    ]
  },
  trust: {
    serial: 'MISSION / TRUST / 003',
    title: 'Make the trust boundary visible.',
    summary: 'Security and governance become part of the adoption design: understandable at the point of work and reviewable at scale.',
    owner: 'Responsible', baseline: 'Traceable', authority: 'Explicit', value: 'Monitored',
    explainTitle: 'The trust stamp',
    bullets: [
      'Record data class, system access, retention assumptions, and sensitive-data constraints.',
      'Name what the AI can propose, what it may execute, and what requires human approval.',
      'Document likely failure modes and escalation paths before broader adoption.',
      'Create a review trail that is strong enough for governance without making low-risk work impossible.'
    ]
  },
  transfer: {
    serial: 'MISSION / TRANSFER / 004',
    title: 'Package the reusable pattern, not the local costume.',
    summary: 'Separate reusable workflow primitives from vertical-specific language, integrations, policy, data, and control needs.',
    owner: 'Contributor', baseline: 'Portable', authority: 'Bounded', value: 'Comparable',
    explainTitle: 'The transfer packet',
    bullets: [
      'Identify the reusable job-to-be-done, trigger, context inputs, decision step, output, review boundary, and metric.',
      'List dependencies and local adaptations explicitly so reuse is informed rather than copied blindly.',
      'Attach implementation notes, prompt or agent patterns where appropriate, and known failure lessons.',
      'Make discovery easy for another team searching by workflow problem—not only by technology.'
    ]
  },
  arrival: {
    serial: 'MISSION / ARRIVAL / 005',
    title: 'Revalidate locally and return the learning.',
    summary: 'A receiving business unit owns adaptation. Its outcome improves the shared pattern for the next team.',
    owner: 'Local', baseline: 'Re-established', authority: 'Reconfirmed', value: 'Returned',
    explainTitle: 'The arrival contract',
    bullets: [
      'Name a receiving owner and confirm the local workflow baseline before adapting the Mission.',
      'Revalidate controls, human authority, integrations, language, and success measure in local context.',
      'Compare adaptation effort with expected value and stop work that no longer makes sense.',
      'Return outcome data and adaptation notes to the shared Mission record so enablement compounds.'
    ]
  }
};

const tabs = document.querySelectorAll('.passport-tab');
const serial = document.getElementById('passport-serial');
const title = document.getElementById('passport-title');
const summary = document.getElementById('passport-summary');
const owner = document.getElementById('passport-owner');
const baseline = document.getElementById('passport-baseline');
const authority = document.getElementById('passport-authority');
const value = document.getElementById('passport-value');
const explainTitle = document.getElementById('passport-explain-title');
const list = document.getElementById('passport-list');

function showPassport(key) {
  const item = passportData[key];
  if (!item || !serial) return;
  serial.textContent = item.serial;
  title.textContent = item.title;
  summary.textContent = item.summary;
  owner.textContent = item.owner;
  baseline.textContent = item.baseline;
  authority.textContent = item.authority;
  value.textContent = item.value;
  explainTitle.textContent = item.explainTitle;
  list.innerHTML = item.bullets.map(text => `<li>${text}</li>`).join('');
}

tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.setAttribute('aria-selected', 'false'));
    tab.setAttribute('aria-selected', 'true');
    showPassport(tab.dataset.passport);
  });
  tab.addEventListener('keydown', event => {
    if (!['ArrowLeft','ArrowRight','Home','End'].includes(event.key)) return;
    event.preventDefault();
    let next = index;
    if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
    if (event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = tabs.length - 1;
    tabs[next].focus();
    tabs[next].click();
  });
});
