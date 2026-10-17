import './style.css'

const app =document.querySelector('#app');
const state={
  windows:[],
  nextid:1,activeId:null,launcherOpen:false,
};
const applications=[
  {id:'terminal',name:'Terminal',icon:'>_',description:'command line'},
  {id:'files', name:'Files' ,icon:'▤' , description: 'your workspace' },
  { id: 'settings' ,name:'Settings',icon :'⚙',description:'system preferences'},
  {id:'about', name :'About PeasantOS' ,icon:'◈', description:'Learn about this Project'},
];
function getTime(){
  return new Intl.DateTimeFormat(undefined,{weekday:'short',
    month:'short',day:'numeric',}).format(new Date());
}
function renderDesktop(){
  app.innerHTML= `
  <main class='desktop'>
  <div class="wallpaper-glow glow-one"></div>
  <div class="wallpaper-glow glow-two"></div>
  <header class="topbar">
  <button class ="brand" data-action="launcher" aria-label="Open app launcher">
    <span class = "brand-mark">P</span>
  </button>
  <div class= "topbar-centre"> A little Desktop</div>
  <div class = "system-status">
      <span class ="status-dot"></span>
      <span>System ready</span>
   </div>
  </header>
  <section class ="desktop-icon" aria-label= "Desktop applications">
   ${applications.map((item)=>`
      <button class= "desktop-icon" data-app ="${item.id}">
        <span class ="app-icon icon-${item.id}">${item.icon}</span>
        <span>${item.name}</span>
        </button>
        `).join(``)}
  </section>
  <section id ="window-layer" class= "window-layer" aria-label ="Application windows"></section>
   <div id="launcher" calss="launcher hidden">
    <div class="launcher-heading">
     <div>
      <span class= "eyebrow">Your Workspace</span>
      <h2>Applications</h2>
    </div>
    <button class = "icon-button" data-action= "launcher" aria-label ="close launcher">×</button>
    </div>
    <div class ="launcher-grid">
    ${applications.map((item)=>`
      <button class ="launcher-app"data-app= "${item.id}">
      <span class ="app-icon icon-${item,id}">${item.icon}</span>
      <span class= "launcher-app-name">${item.name}</span>
      <span class = "launcher-app-description>${item.description}</span>
    </button>`).join(``)}
   </div>
   <div class ="launcher-footer">PeasantOS·Preview</div>
   </div>
   <footer class="taskbar">
   <button class ="taskbar-start" data-action ="launcher-" aria-label= "Open app launcher">
    <span class ="brand-mark"P</span>
  </button>
  <div id= "taskbar-apps" class ="taskbar-apps"></span>
  <div class="taskbar-clock">
   <span id="clock-time">${getTime()}</span>
   </div>
   </footer>
   </main>
   `;
renderWindows();
     
}
function getWindowContent(id){
  switch(id){
    case 'terminal':
     return`
      <div class ="terminal-content">
       <div class="terminal-banner"> PeasantOS Terminal<span>0.1.0</span></div>
       <p>welcome to PeasantOS.</p>
       <p>Type<code>help</code> to see available commands.</p>
       <div id ="terminal-output"></div>
       <form id= "terminal-form" class ="terminal-form">
        <label for = "terminal-input">guest@peasantos:~$</label>
        <input id="terminal-input" autocomplete="off" spellcheck="false" autofocus/>
      </form>
      </div> `;
    case 'files' :
      return`
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
       `;
    case 'settings':
      return`
      <div class ="settings-content">
       <div class= "settings-card">
       <span class = "settings-symbol>◈</span>
       <div><strong>PeasantOS</strong><p>Version 0.1.0 · Development build</p></div>
      </div>
      <h3>System</h3>
      <div class ="settings row"><span>Environment</span><strong>Browser</strong></div>
      <div class ="settings row"><span>Network</span><strong>Browser-managed</strong></div>
      <div class ="settings row"><span>storage</span><strong>Local Demo </strong></div>
      <p class ="muted-note">These settings are informational in this MVP</p>
      </div>`;
    case 'about':
      return`
      <div class ="about-content"
      <div class="about logo">P</div>
      <h2>PeasantOS</h2>
      <p class class="about-subtitle">A small OS-inspired experience built for the web.</p>
          <div class="about-divider"></div>
          <p>This is a browser-based desktop simulation, not a bootable operating system.</p>
          <p>Built with vanilla JavaScript, CSS, and Vite.</p>
          <span class="version-tag">EARLY PREVIEW · 0.1.0</span>
        </div>
      `;
    default:
      return '<p class="muted-note">Application not found.</p>';
  } 
}
function openAPP(id){
  const existing  =state.windows.find((window)=>window.appId===id);
  if(existing){
    existing.minimized=false;
    focusWindow(existing.id);
    renderWindows();
    state.launcherOpen=false;
    document.querySelector('#launcher')?.classList.add('hidden');
    return;
  }
  const appInfo= applications.find((item)=>item.id===id);
  if(!appInfo) return;
  const WindowState={
    id: state.nextid++,
    appid:id,
    title:appInfo.name,
    x:Math.min(190+state.windows.length*32,window.innerWidth -480),
    y:Math.min(190+state.windows.length*28, windows.innerHeight -400),
    width:id==='terminal' ? 650:560,
    height:id==='terminal'?390:360,
    minimized:false,
    zIndex:state.nextid++,
  };
  state.windows.push(WindowState);
  focusWindow(windowState.id);
  state.launcherOpen=false;
  renderWindows();
  document.querySelector('#launcher')?.classList.add('hidden');

}
function focusWindow(id){
  state.activeId=id;
  const target=state.windows.find((window)=> window.id===id);
  if(target) target.zIndex=Math.max(20,...state.windows.map((window)=> window.zIndex))+1;
  renderWindows();

}
function renderWindows(){
  const layer=document.querySelector('#window-layer');
  const taskbar =document.querySelector('#taskbarapps');
  if(!layer ||!taskbar)return;
  layer.innerHTML=state.windows
  .filter((windows)=>!window.minimized)
  .map((window)=>`
     <section
      class ="app-window ${window.id === state.activeId ?'active-window' : ''}"
       data-window-id = "${window.id}"
       style= "left:${window.x}px;top:${window.y}px;width:${window.width}px; height:${window.height}px; z-index:${window.zIndex}"
       aria-label="${escapeHTML(window.title)} window">
        <header class= "window-titlebar" data-drag-handle= "${window.id}">
        <div class ="window-title">
        <span class= "window-app-dot icon-${window.appId}">${applications.find((item) =>item.id===window.appId)?.icon??'•'}</span>
          <span>${escapeHTML(window.title)} </span>
          </div>
          <div class ="window-controls">
            <button data-action="minimize" data-id="${window.id}" aria-label="Minimize window">−</button>
            <button class="close-control" data-action="close" data-id="${window.id}" aria-label="Close window">×</button>
          </div>
        </header>
        <div class="window-content"> ${getWindowContent(window.appId)}</div>
      </section>`).join(``);
      bindWindowInteractions();
      bindTerminal();
       
}

function bindWindowInteractions() {
  document.querySelectorAll('.app-window').forEach((element) => {element.addEventListener('pointerdown', () => {
      const id = Number(element.dataset.windowId);
      if (id !== state.activeId) focusWindow(id);
    });
  });

  document.querySelectorAll('[data-drag-handle]').forEach((handle) => {
    handle.addEventListener('pointerdown', (event) => {
      if (event.target.closest('button')) return;

      const id = Number(handle.dataset.dragHandle);
      const windowState = state.windows.find((item) => item.id === id);
      if (!windowState) return;

      focusWindow(id);
      const startX =event.clientX;
      const startY= event.clientY;
      const initialX=windowState.x;
      const initialY = windowState.y;

      handle.setPointerCapture(event.pointerId);

      const move =(moveEvent)=> {
        windowState.x= Math.max(0, Math.min( window.innerWidth - 100,
          initialX +moveEvent.clientX- startX,
        ));
        windowState.y = Math.max(42, Math.min(window.innerHeight - 90,
          initialY+ moveEvent.clientY -startY,
        ));

        const windowElement =document.querySelector(  `[data-window-id= "${id}"]`, );

        if (windowElement){
          windowElement.style.left= `${windowState.x}px`;
          windowElement.style.top =`${windowState.y}px`;
        }
      };

      const stop= () =>{
        handle.removeEventListener('pointermove', move);
        handle.removeEventListener('pointerup', stop);
        handle.removeEventListener('pointercancel', stop);
      };

      handle.addEventListener('pointermove', move);
      handle.addEventListener('pointerup', stop);
      handle.addEventListener('pointercancel', stop);
    });
  });
}
function bindTerminal(){
  const form= document.querySelector('#terminal-form');
  const input =document.querySelector('#terminal-input');
  const output=document.querySelector('#terminal-output');
   if (!form || !input || !output) return;
   form.addEventListener('submit',(event) =>{
    event.preventDefault();
    const command= input.ariaValueMax.trim();
    if(!command) return;
    const line =document.createElement('div');
    line.className='terminal-line';
    line.innerHTML =`<span class="terminal-prompt">guest@peasantos:~$</span> ${escapeHTML(command)}`;
    output.append(line);
    const [program, ...args]=command.split(/\s+/);
    const result=document.createElement('div ')
    result.className ='terminal-result';
    switch (program.toLowerCase()) {
      case 'help' :
        result.textContent ='Available commands: help, clear, echo, date, whoami, ls, pwd, neofetch';
        break;
      case 'echo' :
        result.textContent =args.join(' ');
        break;
      case 'date' :
        result.textContent= new Date().toString();
        break;
      case 'whoami' :
        result.textContent = 'guest';
        break;
      case 'pwd' :
         result.textContent ='/home/guest';
         break;
      case 'ls':
        result.textContent ='Desktop  Documents  Downloads  Projects';
        break;
      case 'neofetch' :
        result.textContent = 'PeasantOS 0.1.0 | Browser desktop | Vanilla JS | Vite';
        break;
      case 'clear' :
        output.innerHTML='';
        input.value='';
        return;
      default:
        result.textContent=`Command not found:${program}. Type "help" for available commands`;
        result.classList.add('terminal-error ');
    }
    output.append(result);
    input.value ='';
    const content =document.querySelector('.terminal-content');
    if(content) content.scrollTop=content.scrollHeight;
   });
}
app.addEventListener('click', (event) => {
  const button = event.target.closest('button');
  if (!button) return;
  if (button.dataset.app) {
    openApp(button.dataset.app);
    return;
  }
  const action =button.dataset.action;
  const id = Number(button.dataset.id);
  if(action==='launcher'){
    state.launcherOpen=!state.launcherOpen;
  }
  if(action==='close'){
    state.windows=state.windows.filter((window)=> window.id !==id);
    if (state.activeId===id){
      state.activeId=state.windows.at(-1)?.id ?? null;
    }
    renderWindows();
  }
  if (action === 'restore') {
    const target = state.windows.find((window) => window.id === id);
    if (!target) return;
    if (state.activeId ===id && !target.minimized) {
      target.minimized =true;
    } else {
      target.minimized =false;
      focusWindow(id);
    }
    renderWindows();
  }
});
renderDesktop();
function updateClock(){
  const time= document.querySelector('#clock-time');
  const date= document.querySelector('#clock-date');
  if (time) time.textContent= getTime();
  if (date) date.textContent= getDate();
}
updateClock();
setInterval(updateClock,1000);