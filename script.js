const $ = (s, p = document) => p.querySelector(s);
const el = (t, c, h = '') => { const n = document.createElement(t); if (c) n.className = c; n.innerHTML = h; return n; };

const themeToggle = $('#themeToggle');
if (themeToggle) themeToggle.onclick = () => document.documentElement.dataset.theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
const menuBtn = $('.menu-btn');
if (menuBtn) menuBtn.onclick = (e) => { const nav = $('#site-nav'); if (!nav) return; const open = nav.classList.toggle('open'); e.currentTarget.setAttribute('aria-expanded', open); };

const emailField = $('#contactForm input[name="email"]');
const replyToField = $('#replyToField');
if (emailField && replyToField) emailField.addEventListener('input', () => { replyToField.value = emailField.value; });

const tabRow = $('#archTabs'), detail = $('#archDetail'), diagram = $('#archDiagram');
if (tabRow && detail && diagram) {
  const archStates = { data: { title: 'Data reliability', desc: 'Prioritize freshness, quality, and schema integrity tied to ownership and SLA.', events:['freshness_miss','schema_drift','quality_drop'], actions:['Targeted alert','Owner routing','Quality runbook'], layers:[0,2,4] }, pipeline: { title: 'Pipeline reliability', desc: 'Track retries, lag, and job failures with lineage and business context.', events:['airflow_retry_storm','kafka_lag','dbt_failure'], actions:['Incident routing','Backlog issue','Pipeline dashboard'], layers:[0,1,4] }, ai: { title: 'AI activity', desc: 'Observe agent and MCP tool data movement, token spikes, and policy boundaries.', events:['agent_token_spike','rag_latency_jump','mcp_tool_access'], actions:['Access review','Prompt/runbook update','Security signal'], layers:[0,2,3] }, security: { title: 'Security & compliance', desc: 'Correlate sensitive-data access with user, service, and evidence workflow.', events:['pii_access','privilege_jump','policy_violation'], actions:['SIEM case','Evidence pack','Compliance dashboard'], layers:[1,2,3] }, business: { title: 'Business impact', desc: 'Map technical telemetry to service health and reporting commitments.', events:['orders_sla_risk','finance_feed_delay','dashboard_staleness'], actions:['Exec view','Priority escalation','Change freeze'], layers:[2,3,4] } };
  const layerNames = ['Signal Sources','Collection','DataObs Intelligence Layer','Observability Platforms','Action'];
  const tabs = [ ['data','Data reliability'], ['pipeline','Pipeline reliability'], ['ai','AI activity'], ['security','Security & compliance'], ['business','Business impact'] ];
  let active='data';
  const renderArch=()=>{ tabRow.innerHTML=''; tabs.forEach(([k,l])=>{ const b=el('button',k===active?'active':'',l); b.onclick=()=>{active=k;renderArch();}; tabRow.appendChild(b);}); diagram.innerHTML=''; layerNames.forEach((l,i)=>diagram.appendChild(el('div',`arch-layer ${archStates[active].layers.includes(i)?'active':''}`,`<strong>Layer ${i+1}:</strong> ${l}`))); const s=archStates[active]; detail.innerHTML=`<h3>${s.title}</h3><p>${s.desc}</p><p><strong>Example events:</strong> ${s.events.join(' · ')}</p><p><strong>Recommended actions:</strong> ${s.actions.join(' · ')}</p>`;};
  renderArch();
}

const signalInsight = $('#signalInsight');
if (signalInsight) {
  const signalInfo = { traces:'Traces connect end-to-end execution across services, pipelines, and AI flows with lineage impact and owner routing.', metrics:'Metrics track saturation, lag, quality score, and business SLA status for fast operational decisions.', logs:'Logs add diagnostic detail linked to datasets, jobs, and security evidence requirements.', events:'Events capture key state changes such as freshness breaches, schema drift, and access-policy triggers.', profiles:'Profiles expose runtime cost and performance hotspots in collectors, agents, and upstream compute jobs.', baggage:'Baggage/context carries tenant, data product context, owner, and sensitivity tags for correlation.' };
  document.querySelectorAll('.signal-chip').forEach(btn => btn.addEventListener('click', () => { document.querySelectorAll('.signal-chip').forEach(n=>n.classList.remove('active')); btn.classList.add('active'); signalInsight.textContent = signalInfo[btn.dataset.signal]; }));
}

const deployTabsEl = $('#otelDeployTabs'), deployPatternEl = $('#deployPattern');
if (deployTabsEl && deployPatternEl) {
  const deployPatterns = { agent:{title:'Agent pattern',desc:'Workload/host → local collector → backend. Best when low-latency local collection is required near the workload.',lines:['Workload / host','Local collector agent','Observability backend']}, gateway:{title:'Gateway pattern',desc:'Apps/services → central collector gateway → multiple backends. Central policy and routing for shared platforms.',lines:['Apps / services','Central collector gateway','Elastic · OpenSearch · Grafana · SIEM']}, hybrid:{title:'Agent → Gateway pattern',desc:'Node agents → regional gateway → Elastic/OpenSearch/Grafana/SIEM. Agent stays close to workload while gateway centralizes controls; usually strongest for enterprise scale.',lines:['Node agents','Regional gateway','Elastic · OpenSearch · Grafana · SIEM']}};
  const deployTabs=[['agent','Agent'],['gateway','Gateway'],['hybrid','Agent → Gateway']]; let deployActive='agent';
  const render=()=>{ deployTabsEl.innerHTML=''; deployTabs.forEach(([k,l])=>{ const b=el('button',k===deployActive?'active':'',l); b.onclick=()=>{deployActive=k;render();}; deployTabsEl.appendChild(b);}); const d=deployPatterns[deployActive]; deployPatternEl.innerHTML=`<h4>${d.title}</h4><p>${d.desc}</p><div class="deploy-graph">${d.lines.map((line,i)=>`<div class="deploy-line"><strong>${i+1}.</strong> ${line}</div>`).join('')}</div>`;};
  render();
}

document.querySelectorAll('.collector-stage').forEach(stage => { stage.addEventListener('mouseenter',()=>stage.classList.add('active')); stage.addEventListener('mouseleave',()=>stage.classList.remove('active')); });

const dpeFlow = $('#dpeFlow');
if (dpeFlow) dpeFlow.append(...['Choose cloud (AWS · GCP · Azure)','Choose components (Kafka, SQL, object storage, Spark)','Generate IaC blueprint','Deploy platform baseline','Attach observability profile'].map(s => el('div','step',s)));

const solutionsGrid = $('#solutionsGrid');
if (solutionsGrid) solutionsGrid.append(...['Data Reliability','Pipeline Observability','AI Agent Observability','Elastic / OpenSearch Observability','SIEM and Compliance Observability','Data Platform Engineering','Business SLA Observability','Tool Consolidation and Telemetry Routing'].map(t=>el('article','solution',`<h3>${t}</h3><p>Reduce blind spots and connect data health to business impact.</p><ul><li>Faster detection</li><li>Clear ownership</li><li>Actionable routing</li></ul>`)));

const packagesEl = $('#packages');
if (packagesEl) {
const packages = [
{name:'Cluster Health Audit',tag:'Most popular',price:'£750',duration:'Fixed price · delivered in 2–3 days',bestFor:'Teams with growing or underperforming Elasticsearch / OpenSearch clusters.',deliverables:['Index lifecycle and shard allocation review','Query performance bottleneck analysis','ILM policy and cost optimisation recommendations','Security settings review','Written report + 30-min walkthrough call'],upsell:'Optional: Cluster Remediation (£2,000–£5,000 to implement findings)'},
{name:'Observability Assessment Sprint',tag:'',price:'From £2,500',duration:'1 week · remote delivery',bestFor:'Teams that collect telemetry but lack data observability coverage.',deliverables:['Current-state telemetry gap map','Target OTel architecture blueprint','Vendor-neutral tool recommendations','Prioritised implementation roadmap','Operable handover assets'],upsell:''},
{name:'OTEL Foundation Build',tag:'',price:'From £5,000',duration:'2–3 weeks · remote delivery',bestFor:'Teams ready to implement OpenTelemetry across pipelines and data platforms.',deliverables:['OTel collector pipeline setup (receivers, processors, exporters)','DataObs enrichment layer configuration','Integration with Elastic, OpenSearch, or Grafana','Runbook and alert patterns','Operable handover'],upsell:''},
{name:'Elastic / OpenSearch DataOps Build',tag:'',price:'From £4,000',duration:'2 weeks · remote delivery',bestFor:'Teams on Elastic or OpenSearch needing production-grade observability pipelines.',deliverables:['Index design and ILM policies','Ingest pipeline build (Logstash / Fleet / Elastic Agent)','Dashboard and alert pack','Search relevance review (if applicable)','Operable handover'],upsell:''},
{name:'AI Agent Telemetry PoC',tag:'New',price:'From £3,000',duration:'1–2 weeks · remote delivery',bestFor:'Teams deploying LLM apps, AI agents, or MCP tools that need governance and visibility.',deliverables:['AI activity event schema design','OTel instrumentation for agent/MCP tool calls','Token and latency monitoring','Sensitive data access visibility','Integration with existing observability stack'],upsell:'Can include AgentGuard Elastic integration'},
{name:'SIEM and Compliance Evidence Pack',tag:'',price:'From £3,500',duration:'1–2 weeks · remote delivery',bestFor:'Teams needing to connect data-access telemetry to SIEM and compliance evidence workflows.',deliverables:['Data-access event schema aligned to ECS','SIEM integration (Elastic Security / OpenSearch Security Analytics)','PII access and privilege-escalation detection rules','Evidence pack for audit','Runbook and handover assets'],upsell:''},
{name:'DPE Managed Deployment',tag:'Open-source + managed',price:'From £3,500',duration:'1–2 weeks · remote delivery',bestFor:'Teams who want the DPE open-source framework deployed, configured, and handed over in their cloud environment.',deliverables:['DPE framework deployed on AWS (or GCP/Azure)','Components configured to your stack (Kafka, Spark, dbt, Airflow, S3)','Full observability attached from day one (OTel + Elastic/Grafana)','IaC blueprint (Terraform/CloudFormation)','Runbook and operable handover'],upsell:'DPE itself is free and open-source — you only pay for the deployment engagement.'}
];
packagesEl.append(...packages.map(pkg=>el('article','package',`<div class="package-header"><h3>${pkg.name}</h3>${pkg.tag ? `<span class="package-tag">${pkg.tag}</span>` : ''}</div><p class="package-price">${pkg.price}</p><p class="package-duration">${pkg.duration}</p><p><strong>Best for:</strong> ${pkg.bestFor}</p><ul>${pkg.deliverables.map(item => `<li>${item}</li>`).join('')}</ul>${pkg.upsell ? `<p class="package-upsell">💡 ${pkg.upsell}</p>` : ''}<a href="contact.html" class="btn btn-secondary">Discuss this package</a>`)));
}

const chips = $('#chips');
if (chips) { const chipGroups={Cloud:['AWS','Azure','GCP'],Data:['S3','Glue','EMR','Athena','Redshift','Kafka','Spark','dbt','Airflow','PostgreSQL','MySQL'],Observability:['OpenTelemetry','Elastic','OpenSearch','Grafana','Datadog','CloudWatch','Prometheus'],'Security & workflow':['SIEM','ServiceNow','PagerDuty','Slack','Jira'],AI:['LLM apps','AI agents','MCP tools','RAG pipelines','feature stores']}; Object.entries(chipGroups).forEach(([k,v])=>chips.appendChild(el('div','chip-group',`<h3>${k}</h3>${v.map(c=>`<span class="chip">${c}</span>`).join('')}`))); }

const calcOut = $('#calcOut');
if (calcOut && $('#incidents') && $('#hours') && $('#people') && $('#rate') && $('#reduction')) {
  const calc=()=>{ const i=+$('#incidents').value,h=+$('#hours').value,p=+$('#people').value,r=+$('#rate').value,red=+$('#reduction').value/100; const annual=i*h*p*r*12,savings=annual*red,recovered=i*h*p*12*red; const suggestion=i>20?'Observability Assessment Sprint + OTEL Foundation Build':'Architecture review + targeted accelerator setup'; calcOut.innerHTML=`<p><strong>Current annual operational cost:</strong> £${annual.toLocaleString()}</p><p><strong>Potential annual savings:</strong> £${Math.round(savings).toLocaleString()}</p><p><strong>Hours recovered:</strong> ${Math.round(recovered).toLocaleString()} / year</p><p><strong>Suggested first engagement:</strong> ${suggestion}</p>`;}; ['incidents','hours','people','rate','reduction'].forEach(id=>$('#'+id).addEventListener('input',calc)); calc();
}
