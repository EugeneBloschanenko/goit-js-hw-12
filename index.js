import{a as w,S as C,i as c}from"./assets/vendor-D9tHNiur.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const s of o.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function n(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(e){if(e.ep)return;e.ep=!0;const o=n(e);fetch(e.href,o)}})();const p=document.querySelector(".loader"),q="49108908-dee8565c8232193f8d4c70c7a",M="https://pixabay.com/api/";function P(){p.style.display="inline-block"}function E(){p.style.display="none"}async function f(t,r=1){P();const n={key:q,q:t,image_type:"photo",orientation:"horizontal",safesearch:!0,page:r,per_page:40};try{return(await w.get(M,{params:n})).data}catch(i){return console.error("Помилка під час запиту:",i),{hits:[],totalHits:0}}finally{E()}}const u=document.querySelector(".gallery");u.classList.add("gallery-style");function m(t,r=!1){const n=t.map(({webformatURL:e,largeImageURL:o,tags:s,likes:L,views:v,comments:S,downloads:$})=>`
      <div class="photo-card">
        <a href="${o}"> <!-- Використовуємо велике зображення тут -->
          <img src="${e}" alt="${s}" class="gallery-image" />
        </a>
        <div class="info">
          <p class="info-item">
            <b>Likes</b><br>${L}
          </p>
          <p class="info-item">
            <b>Views</b><br>${v}
          </p>
          <p class="info-item">
            <b>Comments</b><br>${S}
          </p>
          <p class="info-item">
            <b>Downloads</b><br>${$}
          </p>
        </div>
      </div>
    `).join("");r?u.insertAdjacentHTML("beforeend",n):u.innerHTML=n,new C(".gallery a",{captions:!0,captionsData:"alt",captionDelay:250,captionPosition:"bottom"}).refresh()}const y=document.querySelector(".search-form"),h=document.querySelector(".gallery"),a=document.querySelector(".load-more");let l=1,d="",g=0;y.addEventListener("submit",H);a.addEventListener("click",O);function H(t){t.preventDefault();const r=t.currentTarget.elements.search.value.trim();if(!r){c.error({title:"Введіть у полі пошуку яке зображення Вас цікавить.",position:"topCenter"});return}h.innerHTML="",a.style.display="none",d=r,l=1,f(d,l).then(({hits:n,totalHits:i})=>{if(n.length===0){c.error({title:"Пошук не дав результатів. Будь ласка, спробуйте ще!",position:"topCenter"});return}g=i,m(n),b()}).catch(n=>{console.error("Під час запиту сталася помилка:",n),c.error({title:"Сталася помилка! Повторіть спробу пізніше.",message:`${n}`,position:"topCenter"})}),y.reset()}function O(){l+=1,f(d,l).then(({hits:t})=>{m(t,!0),b(),x()}).catch(t=>{console.error("Помилка при завантаженні додаткових зображень:",t),c.error({title:"Не вдалося завантажити додаткові зображення!",position:"topCenter"})})}function b(){l*40>=g?(a.style.display="none",c.info({title:"Ви переглянули всі зображення за Вашим запитом!",position:"topCenter"})):a.style.display="block"}function x(){const t=h.firstElementChild;if(!t)return;const{height:r}=t.getBoundingClientRect();window.scrollBy({top:r*2,behavior:"smooth"})}
//# sourceMappingURL=index.js.map
