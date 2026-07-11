const dispatchData = {
  finance: {
    id:'AI-DISPATCH / FIN / 014',
    title:'Recurring analysis and narrative preparation',
    summary:'Observe where analysts repeatedly gather the same context, compare recurring variances, or draft explanations from governed source material.',
    route:'Assist', owner:'Finance process owner', metric:'Cycle time + review quality', boundary:'Approved data + human sign-off',
    routeTitle:'Why this route first',
    routeSummary:'Begin with bounded assistance before automation. Preserve financial review authority, use approved data sources, and establish a baseline before scaling.',
    pill:'Dispatch class · Assist',
    bullets:['Observe the workflow with the people doing it.','Define the before-state and what quality means.','Prototype inside the approved tool set.','Measure repeat use and downstream review effort, not prompt volume.']
  },
  customer: {
    id:'AI-DISPATCH / CS / 027',
    title:'Case context and knowledge retrieval',
    summary:'Test whether approved AI can reduce time spent reconstructing case history or locating trusted internal guidance while keeping customer decisions and communication accountable.',
    route:'Build + Integrate', owner:'Customer Service owner', metric:'Handle time + first-touch quality', boundary:'Source traceability + human response authority',
    routeTitle:'Why this route may need more than prompting',
    routeSummary:'The likely value comes from governed context, retrieval, and workflow integration—not a generic chatbot. Start small and coordinate data and access boundaries early.',
    pill:'Dispatch class · Build + Integrate',
    bullets:['Map the systems and knowledge sources agents already use.','Define what content is authoritative and how answers remain traceable.','Pilot with a bounded case type before broad rollout.','Measure both speed and downstream correction or escalation.']
  },
  operations: {
    id:'AI-DISPATCH / OPS / 031',
    title:'Issue triage and handoff clarity',
    summary:'Look for repetitive classification, status translation, routing, and cross-system handoffs where structured automation can reduce queue friction.',
    route:'Automate', owner:'Operations process owner', metric:'Queue age + rework', boundary:'Exception path + escalation owner',
    routeTitle:'Why this route first',
    routeSummary:'When the problem is repeatable flow rather than judgment, bounded automation can remove friction while preserving an explicit exception path.',
    pill:'Dispatch class · Automate',
    bullets:['Baseline queue age, reassignment, and missing-context failure points.','Automate only stable rules and make exceptions visible.','Keep the responsible process owner in control of routing logic.','Tune based on real exception patterns rather than ideal workflow maps.']
  },
  hr: {
    id:'AI-DISPATCH / HR / 008',
    title:'Role-specific AI literacy and confidence',
    summary:'When the blocker is uncertainty, policy confusion, or weak examples, the right intervention may be training and guided practice—not software.',
    route:'Enable', owner:'HR leader + role champions', metric:'Task adoption + confidence', boundary:'Approved-use guidance + sensitive-data rules',
    routeTitle:'Why this route first',
    routeSummary:'Teach AI through real tasks and explicit boundaries. A workshop should end with changed behavior, not a slide deck and a forgotten prompt list.',
    pill:'Dispatch class · Enable',
    bullets:['Assess role-specific tasks, confidence, and policy ambiguity.','Build examples from approved, low-risk workflows.','Use champions and office hours to reinforce practice.','Track repeated task use and manager-observed behavior change.']
  },
  sales: {
    id:'AI-DISPATCH / SALES / 019',
    title:'Research, preparation, and reusable customer context',
    summary:'Identify where sellers repeatedly assemble public research, internal proof, meeting context, or proposal inputs and where AI can improve preparation without fabricating claims.',
    route:'Assist', owner:'Sales leader', metric:'Prep time + content quality', boundary:'Source grounding + claim review',
    routeTitle:'Why this route first',
    routeSummary:'Keep the seller responsible for commercial judgment while using AI to compress research and drafting work that is repetitive and evidence-bound.',
    pill:'Dispatch class · Assist',
    bullets:['Choose one recurring preparation workflow with a measurable before-state.','Ground outputs in approved internal and public sources.','Create review rules for claims, customer data, and commitments.','Measure preparation time and downstream rework or reuse.']
  },
  ps: {
    id:'AI-DISPATCH / PS / 022',
    title:'Discovery notes, scope traceability, and delivery handoff',
    summary:'Explore whether AI can structure discovery outputs, preserve decisions, identify open questions, or improve handoff consistency across professional-services work.',
    route:'Assist → Automate', owner:'Professional Services owner', metric:'Handoff completeness + rework', boundary:'Customer confidentiality + approval',
    routeTitle:'Why the route can evolve',
    routeSummary:'Start with assistance to learn the structure and failure modes. Automate only after the team proves which outputs are stable, trusted, and useful downstream.',
    pill:'Dispatch class · Assist, then Automate',
    bullets:['Observe discovery and handoff artifacts before designing a template.','Define customer-data handling and retention expectations.','Test structured summaries with downstream delivery users.','Automate only the stable parts that reduce rework without flattening nuance.']
  }
};

const tabs = [...document.querySelectorAll('.dispatch-tab')];
const get = id => document.getElementById(id);
function showDepartment(key){
  const d = dispatchData[key];
  if(!d || !get('ticket-id')) return;
  get('ticket-id').textContent=d.id;
  get('ticket-title').textContent=d.title;
  get('ticket-summary').textContent=d.summary;
  get('ticket-route').textContent=d.route;
  get('ticket-owner').textContent=d.owner;
  get('ticket-metric').textContent=d.metric;
  get('ticket-boundary').textContent=d.boundary;
  get('route-title').textContent=d.routeTitle;
  get('route-summary').textContent=d.routeSummary;
  get('route-pill').textContent=d.pill;
  get('route-list').innerHTML=d.bullets.map(b=>`<li>${b}</li>`).join('');
}

tabs.forEach((tab,index)=>{
  tab.addEventListener('click',()=>{
    tabs.forEach(t=>t.setAttribute('aria-selected','false'));
    tab.setAttribute('aria-selected','true');
    showDepartment(tab.dataset.dept);
  });
  tab.addEventListener('keydown',event=>{
    if(!['ArrowLeft','ArrowRight','Home','End'].includes(event.key)) return;
    event.preventDefault();
    let next=index;
    if(event.key==='ArrowRight') next=(index+1)%tabs.length;
    if(event.key==='ArrowLeft') next=(index-1+tabs.length)%tabs.length;
    if(event.key==='Home') next=0;
    if(event.key==='End') next=tabs.length-1;
    tabs[next].focus();
    tabs[next].click();
  });
});
