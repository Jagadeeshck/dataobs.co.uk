const $ = (s, p = document) => p.querySelector(s);
const el = (t, c, h='') => { const n = document.createElement(t); if (c) n.className = c; n.innerHTML = h; return n; };

const archStates = {
  data: { title: 'Data reliability', desc: 'Prioritize freshness, quality, and schema integrity tied to ownership and SLA.', events:['freshness_miss','schema_drift','quality_drop'], actions:['Targeted alert','Owner routing','Quality runbook'], layers:[0,2,4] },
  pipeline: { title: 'Pipeline reliability', desc: 'Track retries, lag, and job failures with lineage and business context.', events:['airflow_retry_storm','kafka_lag','dbt_failure'], actions:['Incident routing','Backlog issue','Pipeline dashboard'], layers:[0,1,4] },
  ai: { title: 'AI activity', desc: 'Observe agent and MCP tool data movement, token spikes, and policy boundaries.', events:['agent_token_spike','rag_latency_jump','mcp_tool_access'], actions:['Access review','Prompt/runbook update','Security signal'], layers:[0,2,3] },
  security: { title: 'Security & compliance', desc: 'Correlate sensitive-data access with user, service, and evidence workflow.', events:['pii_access','privilege_jump','policy_violation'], actions:['SIEM case','Evidence pack','Compliance dashboard'], layers:[1,2,3] },
  business: { title: 'Business impact', desc: 'Map technical telemetry to service health and reporting commitments.', events:['orders_sla_risk','finance_feed_delay','dashboard_staleness'], actions:['Exec view','Priority escalation','Change freeze'], layers:[2,3,4] }
};
const layerNames = ['Signal Sources','Collection','DataObs Intelligence Layer','Observability Platforms','Action'];
const tabs = [ ['data','Data reliability'], ['pipeline','Pipeline reliability'], ['ai','AI activity'], ['security','Security & compliance'], ['business','Business impact'] ];
const tabRow = $('#archTabs'), detail = $('#archDetail'), diagram = $('#archDiagram');
let active = 'data';
function renderArch(){
  tabRow.innerHTML='';
  tabs.forEach(([k,label])=>{ const b = el('button', k===active?'active':'', label); b.onclick=()=>{active=k; renderArch();}; tabRow.appendChild(b); });
  diagram.innerHTML=''; layerNames.forEach((l,i)=> diagram.appendChild(el('div',`arch-layer ${archStates[active].layers.includes(i)?'active':''}`,`<strong>Layer ${i+1}:</strong> ${l}`)));
  const s = archStates[active];
  detail.innerHTML = `<h3>${s.title}</h3><p>${s.desc}</p><p><strong>Example events:</strong> ${s.events.join(' · ')}</p><p><strong>Recommended actions:</strong> ${s.actions.join(' · ')}</p>`;
}
renderArch();

const signalInfo = {
  traces: 'Traces connect end-to-end execution across services, pipelines, and AI flows with lineage impact and owner routing.',
  metrics: 'Metrics track saturation, lag, quality score, and business SLA status for fast operational decisions.',
  logs: 'Logs add diagnostic detail linked to datasets, jobs, and security evidence requirements.',
  events: 'Events capture key state changes such as freshness breaches, schema drift, and access-policy triggers.',
  profiles: 'Profiles expose runtime cost and performance hotspots in collectors, agents, and upstream compute jobs.',
  baggage: 'Baggage/context carries tenant, data product context, owner, and sensitivity tags for correlation.'
};
const signalInsight = $('#signalInsight');
document.querySelectorAll('.signal-chip').forEach(btn=>{
  btn.addEventListener('click',()=>{
    document.querySelectorAll('.signal-chip').forEach(n=>n.classList.remove('active'));
    btn.classList.add('active');
    signalInsight.textContent = signalInfo[btn.dataset.signal];
  });
});

const deployPatterns = {
  agent: {
    title: 'Agent pattern',
    desc: 'Workload/host → local collector → backend. Best when low-latency local collection is required near the workload.',
    lines: ['Workload / host', 'Local collector agent', 'Observability backend']
  },
  gateway: {
    title: 'Gateway pattern',
    desc: 'Apps/services → central collector gateway → multiple backends. Central policy and routing for shared platforms.',
    lines: ['Apps / services', 'Central collector gateway', 'Elastic · OpenSearch · Grafana · SIEM']
  },
  hybrid: {
    title: 'Agent → Gateway pattern',
    desc: 'Node agents → regional gateway → Elastic/OpenSearch/Grafana/SIEM. Agent stays close to workload while gateway centralizes controls; usually strongest for enterprise scale.',
    lines: ['Node agents', 'Regional gateway', 'Elastic · OpenSearch · Grafana · SIEM']
  }
};
const deployTabs = [['agent','Agent'],['gateway','Gateway'],['hybrid','Agent → Gateway']];
let deployActive = 'agent';
function renderDeployPattern(){
  const tabTarget = $('#otelDeployTabs');
  const panel = $('#deployPattern');
  if(!tabTarget || !panel) return;
  tabTarget.innerHTML = '';
  deployTabs.forEach(([key,label])=>{
    const b = el('button', key===deployActive ? 'active' : '', label);
    b.type='button'; b.role='tab'; b.setAttribute('aria-selected', key===deployActive);
    b.onclick=()=>{deployActive=key; renderDeployPattern();};
    tabTarget.appendChild(b);
  });
  const d = deployPatterns[deployActive];
  panel.innerHTML = `<h4>${d.title}</h4><p>${d.desc}</p><div class="deploy-graph">${d.lines.map((line,i)=>`<div class="deploy-line"><strong>${i+1}.</strong> ${line}</div>`).join('')}</div>`;
}
renderDeployPattern();

document.querySelectorAll('.collector-stage').forEach(stage=>{
  stage.addEventListener('mouseenter',()=>stage.classList.add('active'));
  stage.addEventListener('mouseleave',()=>stage.classList.remove('active'));
  stage.addEventListener('focusin',()=>stage.classList.add('active'));
  stage.addEventListener('focusout',()=>stage.classList.remove('active'));
});

$('#themeToggle').onclick=()=>document.documentElement.dataset.theme=document.documentElement.dataset.theme==='dark'?'light':'dark';
$('.menu-btn').onclick=(e)=>{ const nav=$('#site-nav'); const open=nav.classList.toggle('open'); e.currentTarget.setAttribute('aria-expanded',open); };

const dpe = ['Choose cloud (AWS · GCP · Azure)','Choose components (Kafka, SQL, object storage, Spark)','Generate IaC blueprint','Deploy platform baseline','Attach observability profile'];
$('#dpeFlow').append(...dpe.map(s=>el('div','step',s)));

const solutions=['Data Reliability','Pipeline Observability','AI Agent Observability','Elastic / OpenSearch Observability','SIEM and Compliance Observability','Data Platform Engineering','Business SLA Observability','Tool Consolidation and Telemetry Routing'];
$('#solutionsGrid').append(...solutions.map(t=>el('article','solution',`<h3>${t}</h3><p>Reduce blind spots and connect data health to business impact.</p><ul><li>Faster detection</li><li>Clear ownership</li><li>Actionable routing</li></ul>`)));

const story=[['Signal detected','orders.hourly freshness breach'],['Context added','Owner, SLA, lineage, upstream job, downstream dashboard'],['Impact calculated','Business service and reporting impact'],['Action routed','Alert, runbook, incident ticket, evidence pack'],['Learning captured','Backlog item, dashboard update, rule tuning']];
$('#timeline').append(...story.map(([h,p])=>el('div','story-step',`<h3>${h}</h3><p>${p}</p>`)));

const packages=['Observability Assessment Sprint','OTEL Foundation Build','Elastic / OpenSearch DataOps Build','AI Agent Telemetry Proof of Concept','DPE Data Platform Review','SIEM and Compliance Evidence Pack'];
$('#packages').append(...packages.map(p=>el('article','package',`<h3>${p}</h3><p><strong>Best for:</strong> teams starting focused observability delivery.</p><p><strong>What is delivered:</strong> architecture, implementation plan, and runbook pattern.</p><p><strong>Typical outputs:</strong></p><ul><li>Current-state map</li><li>Target blueprint</li><li>Operable handover assets</li></ul><a href="#contact" class="btn btn-secondary">Discuss this package</a>`)));

const chipGroups={Cloud:['AWS','Azure','GCP'],Data:['S3','Glue','EMR','Athena','Redshift','Kafka','Spark','dbt','Airflow','PostgreSQL','MySQL'],Observability:['OpenTelemetry','Elastic','OpenSearch','Grafana','Datadog','CloudWatch','Prometheus'],'Security & workflow':['SIEM','ServiceNow','PagerDuty','Slack','Jira'],AI:['LLM apps','AI agents','MCP tools','RAG pipelines','feature stores']};
Object.entries(chipGroups).forEach(([k,v])=>$('#chips').appendChild(el('div','chip-group',`<h3>${k}</h3>${v.map(c=>`<span class="chip">${c}</span>`).join('')}`)));

function calc(){
  const i=+$('#incidents').value,h=+$('#hours').value,p=+$('#people').value,r=+$('#rate').value,red=+$('#reduction').value/100;
  const annual=i*h*p*r*12, savings=annual*red, recovered=i*h*p*12*red;
  const suggestion = i>20?'Observability Assessment Sprint + OTEL Foundation Build':'Architecture review + targeted accelerator setup';
  $('#calcOut').innerHTML=`<p><strong>Current annual operational cost:</strong> £${annual.toLocaleString()}</p><p><strong>Potential annual savings:</strong> £${Math.round(savings).toLocaleString()}</p><p><strong>Hours recovered:</strong> ${Math.round(recovered).toLocaleString()} / year</p><p><strong>Suggested first engagement:</strong> ${suggestion}</p>`;
}
['incidents','hours','people','rate','reduction'].forEach(id=>$('#'+id).addEventListener('input',calc)); calc();

$('#contactForm').addEventListener('submit',(e)=>{ e.preventDefault(); const d=new FormData(e.target); const body=`Name: ${d.get('name')}%0AEmail: ${d.get('email')}%0ACompany: ${d.get('company')}%0ATools: ${d.get('tools')}%0AChallenge: ${d.get('challenge')}`; window.location.href=`mailto:hello@dataobs.co.uk?subject=Architecture%20Review%20Request&body=${body}`; });
