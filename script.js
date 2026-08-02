const tiles=document.querySelectorAll('.tile');
tiles.forEach(b=>b.onclick=()=>b.classList.toggle('active'));
const rb=document.getElementById('reset');
rb.addEventListener('mouseenter',()=>{rb.style.color='#444';rb.style.transform='translateY(-1px)';});
rb.addEventListener('mouseleave',()=>{rb.style.color='#777';rb.style.transform='';});
document.getElementById('reset').onclick=()=>document.querySelectorAll('.tile.active').forEach(x=>x.classList.remove('active'));

let intervalo=1.0;
const visor=document.getElementById('intervalo');
const botones=document.querySelectorAll('.ctrl button');
function mostrar(){
  visor.style.transform='scale(1.04)';
  visor.style.boxShadow='-4px -4px 8px rgba(255,255,255,.98),5px 5px 10px rgba(0,0,0,.30)';
  setTimeout(()=>{
    visor.style.transform='';
  },90);
  visor.textContent=Number.isInteger(intervalo)?String(intervalo):intervalo.toFixed(2);
}
botones[0].addEventListener('click',()=>{
  intervalo=Math.max(0.5,Math.round((intervalo-0.5)*100)/100);
  mostrar();
});
botones[1].addEventListener('click',()=>{
  intervalo=Math.round((intervalo+0.5)*100)/100;
  mostrar();
});
mostrar();
(function(){
const start=document.getElementById('start');
const arrows=[...document.querySelectorAll('.arrow')];
const colors=[...document.querySelectorAll('.color-row .tile')];
const chars=['↑','→','↓','←'];
let timer,last='';
const overlay=document.createElement('div');
overlay.style.cssText='position:fixed;inset:0;background:#000;display:none;align-items:center;justify-content:center;z-index:999999;';
const sym=document.createElement('img');
sym.src='imagenes/flecha.svg';
sym.style.cssText=`
width:55vmin;
height:55vmin;
display:none;
user-select:none;
pointer-events:none;
`;
overlay.appendChild(sym);
document.body.appendChild(overlay);
overlay.onclick=()=>{clearInterval(timer);overlay.style.display='none';if(document.fullscreenElement)document.exitFullscreen();};
function pick(a){return a[Math.floor(Math.random()*a.length)]}
start.onclick=()=>{
 const sa=arrows.filter(x=>x.classList.contains('active'));
 const sc=colors.filter(x=>x.classList.contains('active'));
// Debe haber al menos un tipo de estímulo seleccionado
if (!sa.length && !sc.length) {
    alert("Selecciona al menos una flecha o un color");
    return;
}
// Determinar el modo de entrenamiento
let modo;

if (sa.length && sc.length) {
    modo = "combinado";
}
else if (sa.length) {
    modo = "flechas";
}
else {
    modo = "colores";
}
 overlay.style.display='flex';
 document.documentElement.requestFullscreen?.();
 function show(){

    //==========================================
    // SOLO FLECHAS
    //==========================================

    if(modo==="flechas"){

        const ai=Math.floor(Math.random()*sa.length);

        const idx=arrows.indexOf(sa[ai]);

 sym.style.display="block";
sym.style.transform=`rotate(${idx*45}deg)`;

        overlay.style.background="#ffffff";

        sym.style.color="#000000";

        return;

    }

    //==========================================
    // SOLO COLORES
    //==========================================

    if(modo==="colores"){

        const ci=Math.floor(Math.random()*sc.length);

     sym.style.display="none";

        overlay.style.background=getComputedStyle(sc[ci]).backgroundColor;

        return;

    }

    //==========================================
    // FLECHAS + COLORES
    //==========================================

    if(Math.random()<0.5){

        // Mostrar flecha

        const ai=Math.floor(Math.random()*sa.length);

        const idx=arrows.indexOf(sa[ai]);

sym.style.display="block";
sym.style.transform=`rotate(${idx*45}deg)`;

        sym.style.color="#000000";

        overlay.style.background="#ffffff";

    }
    else{

        // Mostrar color

        const ci=Math.floor(Math.random()*sc.length);

    sym.style.display="none";

        overlay.style.background=getComputedStyle(sc[ci]).backgroundColor;

    }

}
 show();
 timer=setInterval(show, intervalo*1000);
};
})();
