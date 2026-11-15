(()=>{'use strict';
const ID='sp-emi-pwa-install';
let deferred=null;
const standalone=()=>window.matchMedia('(display-mode: standalone)').matches||window.navigator.standalone===true;
const ios=()=>/iPad|iPhone|iPod/.test(navigator.userAgent)||(/Macintosh/.test(navigator.userAgent)&&navigator.maxTouchPoints>1);
const showHelp=()=>{
 let panel=document.getElementById('sp-emi-install-help');
 if(panel){panel.remove();return;}
 panel=document.createElement('div');panel.id='sp-emi-install-help';panel.setAttribute('role','dialog');panel.setAttribute('aria-label','Install StartPay EMI Calculator');
 panel.style.cssText='position:fixed;left:12px;right:12px;bottom:82px;max-width:390px;z-index:10002;padding:16px;border-radius:14px;background:#fff;color:#10213c;border:2px solid #002D9C;box-shadow:0 8px 28px #0004;font:14px/1.5 system-ui';
 const title=document.createElement('strong');title.textContent='Install StartPay EMI Calculator';panel.appendChild(title);
 const p=document.createElement('p');p.style.margin='10px 0';p.textContent=ios()?'iPhone/iPad: Safari में यह पेज खोलें, Share बटन दबाएँ और Add to Home Screen चुनें।':'Chrome/Edge में browser menu (⋮) खोलें और Install app या Add to Home screen चुनें। अगर विकल्प नहीं दिखता, HTTPS पर पेज खोलें और कुछ समय बाद दोबारा कोशिश करें।';panel.appendChild(p);
 const close=document.createElement('button');close.type='button';close.textContent='Close';close.style.cssText='padding:8px 18px;border:0;border-radius:8px;background:#002D9C;color:white';close.onclick=()=>panel.remove();panel.appendChild(close);document.body.appendChild(panel);
};
const init=()=>{
 if(standalone())return;
 let b=document.getElementById(ID);
 if(!b){b=document.createElement('button');b.id=ID;b.type='button';b.textContent='Install App';b.setAttribute('aria-label','Install StartPay EMI Calculator app');b.style.cssText='position:fixed;right:max(12px,env(safe-area-inset-right));left:auto;top:50%;bottom:auto;transform:translateY(-50%);z-index:10001;background:#002D9C;color:#fff;border:2px solid #fff;border-radius:28px;padding:12px 18px;font:700 13px system-ui;box-shadow:0 4px 14px #002d9c44;cursor:pointer';document.body.appendChild(b);}
 b.hidden=false;
 b.onclick=async()=>{if(deferred){const p=deferred;deferred=null;try{await p.prompt();await p.userChoice;}catch(e){showHelp();}}else showHelp();};
};
window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();deferred=e;init();});
window.addEventListener('appinstalled',()=>{deferred=null;document.getElementById(ID)?.remove();document.getElementById('sp-emi-install-help')?.remove();});
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
if('serviceWorker' in navigator&&window.isSecureContext)window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js',{scope:'./'}).catch(e=>console.warn('StartPay EMI PWA:',e)),{once:true});
})();