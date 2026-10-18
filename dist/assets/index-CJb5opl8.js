(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=document.querySelector(`#app`),t={windows:[],nextid:1,activeId:null,launcherOpen:!1},n=[{id:`terminal`,name:`Terminal`,icon:`>_`,description:`command line`},{id:`files`,name:`Files`,icon:`▤`,description:`your workspace`},{id:`settings`,name:`Settings`,icon:`⚙`,description:`system preferences`},{id:`about`,name:`About PeasantOS`,icon:`◈`,description:`Learn about this Project`}];function r(e){return String(e).replace(/[&<>"']/g,e=>({"&":`&amp;`,"<":`&lt;`,">":`&gt;`,'"':`&quot;`,"'":`&#39;`})[e])}function i(){return new Intl.DateTimeFormat(void 0,{weekday:`short`,month:`short`,day:`numeric`}).format(new Date)}function a(){let e=document.querySelector(`#taskbar-apps`);e&&(e.innerHTML=t.windows.map(e=>`
    <button class="taskbar-app ${e.id===t.activeId&&!e.minimized?`taskbar-app-active`:``}"
            data-action="restore" data-id="${e.id}">
      <span>${n.find(t=>t.id===e.appId)?.icon??`•`}</span>
      <span class="taskbar-app-label">${r(e.title)}</span>
    </button>`).join(``))}function o(){e.innerHTML=`
  <main class='desktop'>
  <div class="wallpaper-glow glow-one"></div>
  <div class="wallpaper-glow glow-two"></div>
  <header class="topbar">
  <button class ="brand" data-action="launcher" aria-label="Open app launcher">
    <span class = "brand-mark">P</span>
  </button>
  <div class= "topbar-center"> A little Desktop</div>
  <div class = "system-status">
      <span class ="status-dot"></span>
      <span>System ready</span>
   </div>
  </header>
  <section class ="desktop-icons" aria-label= "Desktop applications">
   ${n.map(e=>`
      <button class= "desktop-icon" data-app ="${e.id}">
        <span class ="app-icon icon-${e.id}">${e.icon}</span>
        <span>${e.name}</span>
        </button>
        `).join(``)}
  </section>
  <section id ="window-layer" class= "window-layer" aria-label ="Application windows"></section>
   <div id="launcher" class="launcher hidden">
    <div class="launcher-heading">
     <div>
      <span class= "eyebrow">Your Workspace</span>
      <h2>Applications</h2>
    </div>
    <button class = "icon-button" data-action= "launcher" aria-label ="close launcher">×</button>
    </div>
    <div class ="launcher-grid">
    ${n.map(e=>`
      <button class ="launcher-app" data-app= "${e.id}">
      <span class ="app-icon icon-${e.id}">${e.icon}</span>
      <span class= "launcher-app-name">${e.name}</span>
      <span class = "launcher-app-description">${e.description}</span> 
    </button>`).join(``)}
   </div>
   <div class ="launcher-footer">PeasantOS·Preview</div>
   </div>
   <footer class="taskbar">
   <button class ="taskbar-start" data-action ="launcher" aria-label= "Open app launcher">
    <span class ="brand-mark">P</span>
  </button>
  <div id= "taskbar-apps" class ="taskbar-apps"></div>
  <div class="taskbar-clock">
   <span id="clock-time">${i()}</span>
   </div>
   </footer>
   </main>
   `,u()}function s(e){switch(e){case`terminal`:return`
      <div class ="terminal-content">
       <div class="terminal-banner"> PeasantOS Terminal<span>0.1.0</span></div>
       <p>welcome to PeasantOS.</p>
       <p>Type<code>help</code> to see available commands.</p>
       <div id ="terminal-output"></div>
       <form id= "terminal-form" class ="terminal-form">
        <label for = "terminal-input">guest@peasantos:~$</label>
        <input id="terminal-input" autocomplete="off" spellcheck="false" autofocus/>
      </form>
      </div> `;case`files`:return`
       <div class="files-content">
       <div class = "file-location"><span>▤ </span> Home / Workspace </div> 
       <div class ="file-grid">
            <div class="file-item"><span>📁</span><strong>Documents</strong><small>Folder</small></div>
            <div class="file-item"><span>📁</span><strong>Projects</strong><small>Folder</small></div>
            <div class="file-item"><span>📁</span><strong>Downloads</strong><small>Folder</small></div>
            <div class="file-item"><span>📄</span><strong>Welcome.txt</strong><small>Text document</small></div>
       </div>
       <p class= "muted-note">Demo files only-persistent virtual storage is coming next.</p>
       </div>
       `;case`settings`:return`
      <div class ="settings-content">
       <div class= "settings-card">
       <span class = "settings-symbol">◈</span>
       <div><strong>PeasantOS</strong><p>Version 0.1.0 · Development build</p></div>
      </div>
      <h3>System</h3>
      <div class ="settings-row"><span>Environment</span><strong>Browser</strong></div>
      <div class ="settings-row"><span>Network</span><strong>Browser-managed</strong></div>
      <div class ="settings-row"><span>storage</span><strong>Local Demo </strong></div>
      <p class ="muted-note">These settings are informational in this MVP</p>
      </div>`;case`about`:return`
      <div class ="about-content">
      <div class="about-logo">P</div>
      <h2>PeasantOS</h2>
      <p  class="about-subtitle">A small OS-inspired experience built for the web.</p>
          <div class="about-divider"></div>
          <p>This is a browser-based desktop simulation, not a bootable operating system.</p>
          <p>Built with vanilla JavaScript, CSS, and Vite.</p>
          <span class="version-tag">EARLY PREVIEW · 0.1.0</span>
        </div>
      `;default:return`<p class="muted-note">Application not found.</p>`}}function c(e){let r=t.windows.find(t=>t.appId===e);if(r){r.minimized=!1,l(r.id),u(),t.launcherOpen=!1,document.querySelector(`#launcher`)?.classList.add(`hidden`);return}let i=n.find(t=>t.id===e);if(!i)return;let a={id:t.nextid++,appId:e,title:i.name,x:Math.min(190+t.windows.length*32,window.innerWidth-480),y:Math.min(190+t.windows.length*28,window.innerHeight-400),width:e===`terminal`?650:560,height:e===`terminal`?390:360,minimized:!1,zIndex:t.nextid++};t.windows.push(a),l(a.id),t.launcherOpen=!1,u(),document.querySelector(`#launcher`)?.classList.add(`hidden`)}function l(e){t.activeId=e;let n=t.windows.find(t=>t.id===e);n&&(n.zIndex=Math.max(20,...t.windows.map(e=>e.zIndex))+1),document.querySelectorAll(`.app-window`).forEach(n=>{let r=t.windows.find(e=>e.id===Number(n.dataset.windowId));n.classList.toggle(`active-window`,r?.id===e),r&&(n.style.zIndex=r.zIndex)}),a()}function u(){let e=document.querySelector(`#window-layer`),i=document.querySelector(`#taskbar-apps`);e&&i&&(e.innerHTML=t.windows.filter(e=>!e.minimized).map(e=>`
     <section
      class ="app-window ${e.id===t.activeId?`active-window`:``}"
       data-window-id = "${e.id}"
       style= "left:${e.x}px;top:${e.y}px;width:${e.width}px; height:${e.height}px; z-index:${e.zIndex}"
       aria-label="${r(e.title)} window">
        <header class= "window-titlebar" data-drag-handle= "${e.id}">
        <div class ="window-title">
        <span class= "window-app-dot icon-${e.appId}">${n.find(t=>t.id===e.appId)?.icon??`•`}</span>
          <span>${r(e.title)} </span>
          </div>
          <div class ="window-controls">
            <button data-action="minimize" data-id="${e.id}" aria-label="Minimize window">−</button>
            <button class="close-control" data-action="close" data-id="${e.id}" aria-label="Close window">×</button>
          </div>
        </header>
        <div class="window-content"> ${s(e.appId)}</div>
      </section>`).join(``),d(),f(),a())}function d(){document.querySelectorAll(`.app-window`).forEach(e=>{e.addEventListener(`pointerdown`,()=>{let n=Number(e.dataset.windowId);n!==t.activeId&&l(n)})}),document.querySelectorAll(`[data-drag-handle]`).forEach(e=>{e.addEventListener(`pointerdown`,n=>{if(n.target.closest(`button`))return;let r=Number(e.dataset.dragHandle),i=t.windows.find(e=>e.id===r);if(!i)return;l(r);let a=n.clientX,o=n.clientY,s=i.x,c=i.y;e.setPointerCapture(n.pointerId);let u=e=>{i.x=Math.max(0,Math.min(window.innerWidth-100,s+e.clientX-a)),i.y=Math.max(42,Math.min(window.innerHeight-90,c+e.clientY-o));let t=document.querySelector(`[data-window-id= "${r}"]`);t&&(t.style.left=`${i.x}px`,t.style.top=`${i.y}px`)},d=()=>{e.removeEventListener(`pointermove`,u),e.removeEventListener(`pointerup`,d),e.removeEventListener(`pointercancel`,d)};e.addEventListener(`pointermove`,u),e.addEventListener(`pointerup`,d),e.addEventListener(`pointercancel`,d)})})}function f(){let e=document.querySelector(`#terminal-form`),t=document.querySelector(`#terminal-input`),n=document.querySelector(`#terminal-output`);e&&t&&n&&e.addEventListener(`submit`,e=>{e.preventDefault();let i=t.value.trim();if(!i)return;let a=document.createElement(`div`);a.className=`terminal-line`,a.innerHTML=`<span class="terminal-prompt">guest@peasantos:~$</span> ${r(i)}`,n.append(a);let[o,...s]=i.split(/\s+/),c=document.createElement(`div`);switch(c.className=`terminal-result`,o.toLowerCase()){case`help`:c.textContent=`Available commands: help, clear, echo, date, whoami, ls, pwd, neofetch`;break;case`echo`:c.textContent=s.join(` `);break;case`date`:c.textContent=new Date().toString();break;case`whoami`:c.textContent=`guest`;break;case`pwd`:c.textContent=`/home/guest`;break;case`ls`:c.textContent=`Desktop  Documents  Downloads  Projects`;break;case`neofetch`:c.textContent=`PeasantOS 0.1.0 | Browser desktop | Vanilla JS | Vite`;break;case`clear`:n.innerHTML=``,t.value=``;return;default:c.textContent=`Command not found:${o}. Type "help" for available commands`,c.classList.add(`terminal-error`)}n.append(c),t.value=``;let l=document.querySelector(`.terminal-content`);l&&(l.scrollTop=l.scrollHeight)})}e.addEventListener(`click`,e=>{let n=e.target.closest(`button`);if(!n)return;if(n.dataset.app){c(n.dataset.app);return}let r=n.dataset.action,i=Number(n.dataset.id);if(r===`launcher`&&(t.launcherOpen=!t.launcherOpen),r===`close`&&(t.windows=t.windows.filter(e=>e.id!==i),t.activeId===i&&(t.activeId=t.windows.at(-1)?.id??null),u()),r===`restore`){let e=t.windows.find(e=>e.id===i);if(!e)return;t.activeId===i&&!e.minimized?e.minimized=!0:(e.minimized=!1,l(i)),u()}}),o();function p(){let e=document.querySelector(`#clock-time`),t=document.querySelector(`#clock-date`);e&&(e.textContent=i()),t&&(t.textContent=getDate())}p(),setInterval(p,1e3);