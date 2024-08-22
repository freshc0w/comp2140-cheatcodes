(()=>{"use strict";!function(){function e(e){let t=new String(e.getMonth()+1);t.length<2&&(t=`0${t}`);let a=new String(e.getDate());return a.length<2&&(a=`0${a}`),new String(`${e.getFullYear()}-${t}-${a}`)}function t(e){let t=new Date;return t.setDate(t.getDate()+e),t}const a=e(new Date),n=e(t(1)),o=e(t(2));let l=`Please enter [32mtoday[0m (${a}) or [32mtomorrow[0m (${n}) or [32mday after tomorrow[0m (${o}) to return the number of filtered launches for that day: `,r=(e,t)=>`Fetching data for "${e}" (${t})...`,c=(e,t)=>`Successfully fetched live data for "${e}" (${t}) from the API.`;function i(e){switch(e){case"today":return a;case"tomorrow":return n;case"day after tomorrow":return o;default:return null}}async function s(e){const t=await fetch(e);if(console.log(e,t.status),200==t.status)return await t.json()}async function d(e){let t=(await s("https://api.spacexdata.com/v4/launches/")).filter((t=>new Date(t.date_utc).getDay()==new Date(e).getDay()&&t.success)),a=(await Promise.all(t.map((async e=>{let t=await s("https://api.spacexdata.com/v4/launchpads/"+e.launchpad);e.launchpad=t;let a=t.locality;const n=await s(`https://cors-anywhere.herokuapp.com/https://goweather.herokuapp.com/weather/${a}`);return e.weather=n,e})))).slice(0);return a.sort(((e,t)=>e.date_unix-t.date_unix)),a}async function u(e,t){try{await localStorage.setItem(e,JSON.stringify(t)),console.log((e=>`Saved a localStorage cache called "${e}".`)(e))}catch(e){console.log(e)}}async function h(e){try{const t=await localStorage.getItem(e);return console.log((e=>`Read a localStorage cache called "${e}".`)(e)),t}catch(e){console.log(e)}}let p,m=null;for(;console.log("Welcome to the SpaceX Rocket Launch Checker!"),p=prompt(l),null!==p&&(m=i(p),null===m);)console.log("This isn't one of the valid inputs. Please try again.");null===m?console.log("Exiting. See you next time!"):async function(e){let t,a=i(e),n={},o={},l=await h("all"),s=await h("top3");if(l&&s)n=JSON.parse(l),o=JSON.parse(s);else{n={today:[],tomorrow:[],"day after tomorrow":[]},o={...n};for(let e in n){console.log(r(e,a));let t=await d(a);console.log(c(e,a)),n[e]=t;let l=t.slice(0,3);o[e]=l}await u("all",n),await u("top3",o)}!function(e,t){const a=document.querySelector("#launches-top3").querySelector("tbody"),n=["id","date_local","flight_number","details","success","rocket"],o=["id","full_name","locality","details","launch_attempts","launch_successes"],l=t[e];for(let t of l){let l=document.createElement("tr");for(let e of n){let a=document.createElement("td");a.innerHTML=t[e],l.appendChild(a)}for(let e of o){let a=document.createElement("td");a.innerHTML=t.launchpad[e],l.appendChild(a)}{let a=document.createElement("td");"today"==e&&t.weather.description?a.innerHTML=t.weather.description:a.innerHTML="Unavailable",l.appendChild(a)}{let a=document.createElement("td");const n=["today","tomorrow","day after tomorrow"].indexOf(e);t.weather.forecast[n].temperature?a.innerHTML=t.weather.forecast[n].temperature:a.innerHTML="Unavailable",l.appendChild(a)}a.appendChild(l)}}(e,o),function(e,t){const a=document.querySelector("#prediction").querySelector("tbody"),n=t[e],o=n.reduce(((e,t)=>{if(t.launchpad.launch_successes)return e+t.launchpad.launch_successes}),0),l=n.reduce(((e,t)=>{if(t.launchpad.launch_attempts&&t.launchpad.launch_successes)return e+(t.launchpad.launch_attempts-t.launchpad.launch_successes)}),0),r=[...n].filter((e=>""!=e.weather.description)).map((e=>e.weather.description)),c=r.sort(((e,t)=>r.filter((t=>t===e)).length-r.filter((e=>e===t)).length)).pop(),i=["today","tomorrow","day after tomorrow"].indexOf(e),s=[...n].filter((e=>""!=e.weather.forecast[i].temperature)).map((e=>e.weather.forecast[i].temperature)).sort(((e,t)=>e-t)),d=s.slice(0,1).toString(),u=s.slice(-1).toString();let h="Hold your horses...";const p=d.match(/\d+/)[0];u.match(/\d+/)[0],["Partly cloudy","Sunny"].includes(c)&&o>=95&&p>=15&&p<=35&&(h="Good to go!");let m=document.createElement("tr");{let e=document.createElement("td");e.innerHTML=`${(o/(o+l)*100).toFixed(2)}%`,m.appendChild(e)}{let e=document.createElement("td");e.innerHTML=`${(l/(o+l)*100).toFixed(2)}%`,m.appendChild(e)}{let e=document.createElement("td");e.innerHTML=c,m.appendChild(e)}{let e=document.createElement("td");e.innerHTML=d,m.appendChild(e)}{let e=document.createElement("td");e.innerHTML=u,m.appendChild(e)}{let e=document.createElement("td");e.innerHTML=h,m.appendChild(e)}a.appendChild(m)}(e,n),t=n[e].length,console.log(((e,t)=>`For the input of [32m${e}[0m, the filtered results are: ${t}`)(e,t))}(p)}()})();