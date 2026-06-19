var Ol=Object.defineProperty;var Fl=(i,e,t)=>e in i?Ol(i,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):i[e]=t;var ti=(i,e,t)=>Fl(i,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function t(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(r){if(r.ep)return;r.ep=!0;const s=t(r);fetch(r.href,s)}})();/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const ho="183",Bl=0,No=1,Wl=2,_r=1,Gl=2,mr=3,Jn=0,jt=1,Ln=2,Nn=0,Bi=1,Oo=2,Fo=3,Bo=4,Hl=5,hi=100,zl=101,kl=102,Vl=103,Xl=104,$l=200,Yl=201,ql=202,Zl=203,ma=204,ga=205,jl=206,Kl=207,Jl=208,Ql=209,eh=210,th=211,nh=212,ih=213,rh=214,_a=0,va=1,xa=2,Gi=3,Ma=4,Sa=5,ya=6,Ea=7,Qc=0,sh=1,ah=2,yn=0,el=1,tl=2,nl=3,uo=4,il=5,rl=6,sl=7,al=300,gi=301,Hi=302,Cs=303,Ps=304,gs=306,di=1e3,Un=1001,Ta=1002,Dt=1003,oh=1004,Pr=1005,Yt=1006,Is=1007,pi=1008,rn=1009,ol=1010,cl=1011,xr=1012,fo=1013,bn=1014,Mn=1015,Fn=1016,po=1017,mo=1018,Mr=1020,ll=35902,hl=35899,ul=1021,fl=1022,dn=1023,Bn=1026,mi=1027,dl=1028,go=1029,zi=1030,_o=1031,vo=1033,is=33776,rs=33777,ss=33778,as=33779,ba=35840,Aa=35841,wa=35842,Ra=35843,Ca=36196,Pa=37492,Ia=37496,Da=37488,La=37489,Ua=37490,Na=37491,Oa=37808,Fa=37809,Ba=37810,Wa=37811,Ga=37812,Ha=37813,za=37814,ka=37815,Va=37816,Xa=37817,$a=37818,Ya=37819,qa=37820,Za=37821,ja=36492,Ka=36494,Ja=36495,Qa=36283,eo=36284,to=36285,no=36286,ch=3200,pl=0,lh=1,qn="",$t="srgb",ki="srgb-linear",hs="linear",gt="srgb",Si=7680,Wo=519,hh=512,uh=513,fh=514,xo=515,dh=516,ph=517,Mo=518,mh=519,Go=35044,Ho="300 es",Sn=2e3,Sr=2001;function gh(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function yr(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function _h(){const i=yr("canvas");return i.style.display="block",i}const zo={};function ko(...i){const e="THREE."+i.shift();console.log(e,...i)}function ml(i){const e=i[0];if(typeof e=="string"&&e.startsWith("TSL:")){const t=i[1];t&&t.isStackTrace?i[0]+=" "+t.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function Ve(...i){i=ml(i);const e="THREE."+i.shift();{const t=i[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...i)}}function ft(...i){i=ml(i);const e="THREE."+i.shift();{const t=i[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...i)}}function us(...i){const e=i.join(" ");e in zo||(zo[e]=!0,Ve(...i))}function vh(i,e,t){return new Promise(function(n,r){function s(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:r();break;case i.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:n()}}setTimeout(s,t)})}const xh={[_a]:va,[xa]:ya,[Ma]:Ea,[Gi]:Sa,[va]:_a,[ya]:xa,[Ea]:Ma,[Sa]:Gi};class Zi{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){const n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){const n=this._listeners;if(n===void 0)return;const r=n[e];if(r!==void 0){const s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const n=t[e.type];if(n!==void 0){e.target=this;const r=n.slice(0);for(let s=0,a=r.length;s<a;s++)r[s].call(this,e);e.target=null}}}const kt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Ds=Math.PI/180,io=180/Math.PI;function Tr(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(kt[i&255]+kt[i>>8&255]+kt[i>>16&255]+kt[i>>24&255]+"-"+kt[e&255]+kt[e>>8&255]+"-"+kt[e>>16&15|64]+kt[e>>24&255]+"-"+kt[t&63|128]+kt[t>>8&255]+"-"+kt[t>>16&255]+kt[t>>24&255]+kt[n&255]+kt[n>>8&255]+kt[n>>16&255]+kt[n>>24&255]).toLowerCase()}function ot(i,e,t){return Math.max(e,Math.min(t,i))}function Mh(i,e){return(i%e+e)%e}function Ls(i,e,t){return(1-t)*i+t*e}function tr(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function Zt(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}class lt{constructor(e=0,t=0){lt.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=ot(this.x,e.x,t.x),this.y=ot(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=ot(this.x,e,t),this.y=ot(this.y,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(ot(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(ot(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),r=Math.sin(t),s=this.x-e.x,a=this.y-e.y;return this.x=s*n-a*r+e.x,this.y=s*r+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class ji{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,s,a,o){let h=n[r+0],l=n[r+1],u=n[r+2],d=n[r+3],f=s[a+0],v=s[a+1],M=s[a+2],T=s[a+3];if(d!==T||h!==f||l!==v||u!==M){let _=h*f+l*v+u*M+d*T;_<0&&(f=-f,v=-v,M=-M,T=-T,_=-_);let g=1-o;if(_<.9995){const A=Math.acos(_),C=Math.sin(A);g=Math.sin(g*A)/C,o=Math.sin(o*A)/C,h=h*g+f*o,l=l*g+v*o,u=u*g+M*o,d=d*g+T*o}else{h=h*g+f*o,l=l*g+v*o,u=u*g+M*o,d=d*g+T*o;const A=1/Math.sqrt(h*h+l*l+u*u+d*d);h*=A,l*=A,u*=A,d*=A}}e[t]=h,e[t+1]=l,e[t+2]=u,e[t+3]=d}static multiplyQuaternionsFlat(e,t,n,r,s,a){const o=n[r],h=n[r+1],l=n[r+2],u=n[r+3],d=s[a],f=s[a+1],v=s[a+2],M=s[a+3];return e[t]=o*M+u*d+h*v-l*f,e[t+1]=h*M+u*f+l*d-o*v,e[t+2]=l*M+u*v+o*f-h*d,e[t+3]=u*M-o*d-h*f-l*v,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,r=e._y,s=e._z,a=e._order,o=Math.cos,h=Math.sin,l=o(n/2),u=o(r/2),d=o(s/2),f=h(n/2),v=h(r/2),M=h(s/2);switch(a){case"XYZ":this._x=f*u*d+l*v*M,this._y=l*v*d-f*u*M,this._z=l*u*M+f*v*d,this._w=l*u*d-f*v*M;break;case"YXZ":this._x=f*u*d+l*v*M,this._y=l*v*d-f*u*M,this._z=l*u*M-f*v*d,this._w=l*u*d+f*v*M;break;case"ZXY":this._x=f*u*d-l*v*M,this._y=l*v*d+f*u*M,this._z=l*u*M+f*v*d,this._w=l*u*d-f*v*M;break;case"ZYX":this._x=f*u*d-l*v*M,this._y=l*v*d+f*u*M,this._z=l*u*M-f*v*d,this._w=l*u*d+f*v*M;break;case"YZX":this._x=f*u*d+l*v*M,this._y=l*v*d+f*u*M,this._z=l*u*M-f*v*d,this._w=l*u*d-f*v*M;break;case"XZY":this._x=f*u*d-l*v*M,this._y=l*v*d-f*u*M,this._z=l*u*M+f*v*d,this._w=l*u*d+f*v*M;break;default:Ve("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],r=t[4],s=t[8],a=t[1],o=t[5],h=t[9],l=t[2],u=t[6],d=t[10],f=n+o+d;if(f>0){const v=.5/Math.sqrt(f+1);this._w=.25/v,this._x=(u-h)*v,this._y=(s-l)*v,this._z=(a-r)*v}else if(n>o&&n>d){const v=2*Math.sqrt(1+n-o-d);this._w=(u-h)/v,this._x=.25*v,this._y=(r+a)/v,this._z=(s+l)/v}else if(o>d){const v=2*Math.sqrt(1+o-n-d);this._w=(s-l)/v,this._x=(r+a)/v,this._y=.25*v,this._z=(h+u)/v}else{const v=2*Math.sqrt(1+d-n-o);this._w=(a-r)/v,this._x=(s+l)/v,this._y=(h+u)/v,this._z=.25*v}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(ot(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,r=e._y,s=e._z,a=e._w,o=t._x,h=t._y,l=t._z,u=t._w;return this._x=n*u+a*o+r*l-s*h,this._y=r*u+a*h+s*o-n*l,this._z=s*u+a*l+n*h-r*o,this._w=a*u-n*o-r*h-s*l,this._onChangeCallback(),this}slerp(e,t){let n=e._x,r=e._y,s=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,r=-r,s=-s,a=-a,o=-o);let h=1-t;if(o<.9995){const l=Math.acos(o),u=Math.sin(l);h=Math.sin(h*l)/u,t=Math.sin(t*l)/u,this._x=this._x*h+n*t,this._y=this._y*h+r*t,this._z=this._z*h+s*t,this._w=this._w*h+a*t,this._onChangeCallback()}else this._x=this._x*h+n*t,this._y=this._y*h+r*t,this._z=this._z*h+s*t,this._w=this._w*h+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class k{constructor(e=0,t=0,n=0){k.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Vo.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Vo.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*r,this.y=s[1]*t+s[4]*n+s[7]*r,this.z=s[2]*t+s[5]*n+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,r=this.z,s=e.elements,a=1/(s[3]*t+s[7]*n+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*r+s[12])*a,this.y=(s[1]*t+s[5]*n+s[9]*r+s[13])*a,this.z=(s[2]*t+s[6]*n+s[10]*r+s[14])*a,this}applyQuaternion(e){const t=this.x,n=this.y,r=this.z,s=e.x,a=e.y,o=e.z,h=e.w,l=2*(a*r-o*n),u=2*(o*t-s*r),d=2*(s*n-a*t);return this.x=t+h*l+a*d-o*u,this.y=n+h*u+o*l-s*d,this.z=r+h*d+s*u-a*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*r,this.y=s[1]*t+s[5]*n+s[9]*r,this.z=s[2]*t+s[6]*n+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=ot(this.x,e.x,t.x),this.y=ot(this.y,e.y,t.y),this.z=ot(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=ot(this.x,e,t),this.y=ot(this.y,e,t),this.z=ot(this.z,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(ot(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,r=e.y,s=e.z,a=t.x,o=t.y,h=t.z;return this.x=r*h-s*o,this.y=s*a-n*h,this.z=n*o-r*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Us.copy(this).projectOnVector(e),this.sub(Us)}reflect(e){return this.sub(Us.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(ot(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Us=new k,Vo=new ji;class Ke{constructor(e,t,n,r,s,a,o,h,l){Ke.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,r,s,a,o,h,l)}set(e,t,n,r,s,a,o,h,l){const u=this.elements;return u[0]=e,u[1]=r,u[2]=o,u[3]=t,u[4]=s,u[5]=h,u[6]=n,u[7]=a,u[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,r=t.elements,s=this.elements,a=n[0],o=n[3],h=n[6],l=n[1],u=n[4],d=n[7],f=n[2],v=n[5],M=n[8],T=r[0],_=r[3],g=r[6],A=r[1],C=r[4],R=r[7],D=r[2],P=r[5],U=r[8];return s[0]=a*T+o*A+h*D,s[3]=a*_+o*C+h*P,s[6]=a*g+o*R+h*U,s[1]=l*T+u*A+d*D,s[4]=l*_+u*C+d*P,s[7]=l*g+u*R+d*U,s[2]=f*T+v*A+M*D,s[5]=f*_+v*C+M*P,s[8]=f*g+v*R+M*U,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],a=e[4],o=e[5],h=e[6],l=e[7],u=e[8];return t*a*u-t*o*l-n*s*u+n*o*h+r*s*l-r*a*h}invert(){const e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],a=e[4],o=e[5],h=e[6],l=e[7],u=e[8],d=u*a-o*l,f=o*h-u*s,v=l*s-a*h,M=t*d+n*f+r*v;if(M===0)return this.set(0,0,0,0,0,0,0,0,0);const T=1/M;return e[0]=d*T,e[1]=(r*l-u*n)*T,e[2]=(o*n-r*a)*T,e[3]=f*T,e[4]=(u*t-r*h)*T,e[5]=(r*s-o*t)*T,e[6]=v*T,e[7]=(n*h-l*t)*T,e[8]=(a*t-n*s)*T,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,s,a,o){const h=Math.cos(s),l=Math.sin(s);return this.set(n*h,n*l,-n*(h*a+l*o)+a+e,-r*l,r*h,-r*(-l*a+h*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(Ns.makeScale(e,t)),this}rotate(e){return this.premultiply(Ns.makeRotation(-e)),this}translate(e,t){return this.premultiply(Ns.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let r=0;r<9;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Ns=new Ke,Xo=new Ke().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),$o=new Ke().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Sh(){const i={enabled:!0,workingColorSpace:ki,spaces:{},convert:function(r,s,a){return this.enabled===!1||s===a||!s||!a||(this.spaces[s].transfer===gt&&(r.r=On(r.r),r.g=On(r.g),r.b=On(r.b)),this.spaces[s].primaries!==this.spaces[a].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===gt&&(r.r=Wi(r.r),r.g=Wi(r.g),r.b=Wi(r.b))),r},workingToColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},colorSpaceToWorking:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===qn?hs:this.spaces[r].transfer},getToneMappingMode:function(r){return this.spaces[r].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,a){return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,s){return us("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(r,s)},toWorkingColorSpace:function(r,s){return us("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(r,s)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[ki]:{primaries:e,whitePoint:n,transfer:hs,toXYZ:Xo,fromXYZ:$o,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:$t},outputColorSpaceConfig:{drawingBufferColorSpace:$t}},[$t]:{primaries:e,whitePoint:n,transfer:gt,toXYZ:Xo,fromXYZ:$o,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:$t}}}),i}const dt=Sh();function On(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Wi(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let yi;class yh{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{yi===void 0&&(yi=yr("canvas")),yi.width=e.width,yi.height=e.height;const r=yi.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),n=yi}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=yr("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const r=n.getImageData(0,0,e.width,e.height),s=r.data;for(let a=0;a<s.length;a++)s[a]=On(s[a]/255)*255;return n.putImageData(r,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(On(t[n]/255)*255):t[n]=On(t[n]);return{data:t,width:e.width,height:e.height}}else return Ve("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Eh=0;class So{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Eh++}),this.uuid=Tr(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayHeight,t.displayWidth,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let a=0,o=r.length;a<o;a++)r[a].isDataTexture?s.push(Os(r[a].image)):s.push(Os(r[a]))}else s=Os(r);n.url=s}return t||(e.images[this.uuid]=n),n}}function Os(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?yh.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(Ve("Texture: Unable to serialize Texture."),{})}let Th=0;const Fs=new k;class Ht extends Zi{constructor(e=Ht.DEFAULT_IMAGE,t=Ht.DEFAULT_MAPPING,n=Un,r=Un,s=Yt,a=pi,o=dn,h=rn,l=Ht.DEFAULT_ANISOTROPY,u=qn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Th++}),this.uuid=Tr(),this.name="",this.source=new So(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=r,this.magFilter=s,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=h,this.offset=new lt(0,0),this.repeat=new lt(1,1),this.center=new lt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ke,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(Fs).x}get height(){return this.source.getSize(Fs).y}get depth(){return this.source.getSize(Fs).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const n=e[t];if(n===void 0){Ve(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){Ve(`Texture.setValues(): property '${t}' does not exist.`);continue}r&&n&&r.isVector2&&n.isVector2||r&&n&&r.isVector3&&n.isVector3||r&&n&&r.isMatrix3&&n.isMatrix3?r.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==al)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case di:e.x=e.x-Math.floor(e.x);break;case Un:e.x=e.x<0?0:1;break;case Ta:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case di:e.y=e.y-Math.floor(e.y);break;case Un:e.y=e.y<0?0:1;break;case Ta:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Ht.DEFAULT_IMAGE=null;Ht.DEFAULT_MAPPING=al;Ht.DEFAULT_ANISOTROPY=1;class Ct{constructor(e=0,t=0,n=0,r=1){Ct.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,r=this.z,s=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*r+a[12]*s,this.y=a[1]*t+a[5]*n+a[9]*r+a[13]*s,this.z=a[2]*t+a[6]*n+a[10]*r+a[14]*s,this.w=a[3]*t+a[7]*n+a[11]*r+a[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,s;const h=e.elements,l=h[0],u=h[4],d=h[8],f=h[1],v=h[5],M=h[9],T=h[2],_=h[6],g=h[10];if(Math.abs(u-f)<.01&&Math.abs(d-T)<.01&&Math.abs(M-_)<.01){if(Math.abs(u+f)<.1&&Math.abs(d+T)<.1&&Math.abs(M+_)<.1&&Math.abs(l+v+g-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const C=(l+1)/2,R=(v+1)/2,D=(g+1)/2,P=(u+f)/4,U=(d+T)/4,y=(M+_)/4;return C>R&&C>D?C<.01?(n=0,r=.707106781,s=.707106781):(n=Math.sqrt(C),r=P/n,s=U/n):R>D?R<.01?(n=.707106781,r=0,s=.707106781):(r=Math.sqrt(R),n=P/r,s=y/r):D<.01?(n=.707106781,r=.707106781,s=0):(s=Math.sqrt(D),n=U/s,r=y/s),this.set(n,r,s,t),this}let A=Math.sqrt((_-M)*(_-M)+(d-T)*(d-T)+(f-u)*(f-u));return Math.abs(A)<.001&&(A=1),this.x=(_-M)/A,this.y=(d-T)/A,this.z=(f-u)/A,this.w=Math.acos((l+v+g-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=ot(this.x,e.x,t.x),this.y=ot(this.y,e.y,t.y),this.z=ot(this.z,e.z,t.z),this.w=ot(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=ot(this.x,e,t),this.y=ot(this.y,e,t),this.z=ot(this.z,e,t),this.w=ot(this.w,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(ot(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class bh extends Zi{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Yt,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new Ct(0,0,e,t),this.scissorTest=!1,this.viewport=new Ct(0,0,e,t),this.textures=[];const r={width:e,height:t,depth:n.depth},s=new Ht(r),a=n.count;for(let o=0;o<a;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(e={}){const t={minFilter:Yt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=n,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const r=Object.assign({},e.textures[t].image);this.textures[t].source=new So(r)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class En extends bh{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class gl extends Ht{constructor(e=null,t=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=Dt,this.minFilter=Dt,this.wrapR=Un,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class Ah extends Ht{constructor(e=null,t=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=Dt,this.minFilter=Dt,this.wrapR=Un,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class bt{constructor(e,t,n,r,s,a,o,h,l,u,d,f,v,M,T,_){bt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,r,s,a,o,h,l,u,d,f,v,M,T,_)}set(e,t,n,r,s,a,o,h,l,u,d,f,v,M,T,_){const g=this.elements;return g[0]=e,g[4]=t,g[8]=n,g[12]=r,g[1]=s,g[5]=a,g[9]=o,g[13]=h,g[2]=l,g[6]=u,g[10]=d,g[14]=f,g[3]=v,g[7]=M,g[11]=T,g[15]=_,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new bt().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinant()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinant()===0)return this.identity();const t=this.elements,n=e.elements,r=1/Ei.setFromMatrixColumn(e,0).length(),s=1/Ei.setFromMatrixColumn(e,1).length(),a=1/Ei.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,r=e.y,s=e.z,a=Math.cos(n),o=Math.sin(n),h=Math.cos(r),l=Math.sin(r),u=Math.cos(s),d=Math.sin(s);if(e.order==="XYZ"){const f=a*u,v=a*d,M=o*u,T=o*d;t[0]=h*u,t[4]=-h*d,t[8]=l,t[1]=v+M*l,t[5]=f-T*l,t[9]=-o*h,t[2]=T-f*l,t[6]=M+v*l,t[10]=a*h}else if(e.order==="YXZ"){const f=h*u,v=h*d,M=l*u,T=l*d;t[0]=f+T*o,t[4]=M*o-v,t[8]=a*l,t[1]=a*d,t[5]=a*u,t[9]=-o,t[2]=v*o-M,t[6]=T+f*o,t[10]=a*h}else if(e.order==="ZXY"){const f=h*u,v=h*d,M=l*u,T=l*d;t[0]=f-T*o,t[4]=-a*d,t[8]=M+v*o,t[1]=v+M*o,t[5]=a*u,t[9]=T-f*o,t[2]=-a*l,t[6]=o,t[10]=a*h}else if(e.order==="ZYX"){const f=a*u,v=a*d,M=o*u,T=o*d;t[0]=h*u,t[4]=M*l-v,t[8]=f*l+T,t[1]=h*d,t[5]=T*l+f,t[9]=v*l-M,t[2]=-l,t[6]=o*h,t[10]=a*h}else if(e.order==="YZX"){const f=a*h,v=a*l,M=o*h,T=o*l;t[0]=h*u,t[4]=T-f*d,t[8]=M*d+v,t[1]=d,t[5]=a*u,t[9]=-o*u,t[2]=-l*u,t[6]=v*d+M,t[10]=f-T*d}else if(e.order==="XZY"){const f=a*h,v=a*l,M=o*h,T=o*l;t[0]=h*u,t[4]=-d,t[8]=l*u,t[1]=f*d+T,t[5]=a*u,t[9]=v*d-M,t[2]=M*d-v,t[6]=o*u,t[10]=T*d+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(wh,e,Rh)}lookAt(e,t,n){const r=this.elements;return Qt.subVectors(e,t),Qt.lengthSq()===0&&(Qt.z=1),Qt.normalize(),Hn.crossVectors(n,Qt),Hn.lengthSq()===0&&(Math.abs(n.z)===1?Qt.x+=1e-4:Qt.z+=1e-4,Qt.normalize(),Hn.crossVectors(n,Qt)),Hn.normalize(),Ir.crossVectors(Qt,Hn),r[0]=Hn.x,r[4]=Ir.x,r[8]=Qt.x,r[1]=Hn.y,r[5]=Ir.y,r[9]=Qt.y,r[2]=Hn.z,r[6]=Ir.z,r[10]=Qt.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,r=t.elements,s=this.elements,a=n[0],o=n[4],h=n[8],l=n[12],u=n[1],d=n[5],f=n[9],v=n[13],M=n[2],T=n[6],_=n[10],g=n[14],A=n[3],C=n[7],R=n[11],D=n[15],P=r[0],U=r[4],y=r[8],b=r[12],j=r[1],I=r[5],V=r[9],$=r[13],q=r[2],X=r[6],Y=r[10],H=r[14],ae=r[3],ne=r[7],xe=r[11],Se=r[15];return s[0]=a*P+o*j+h*q+l*ae,s[4]=a*U+o*I+h*X+l*ne,s[8]=a*y+o*V+h*Y+l*xe,s[12]=a*b+o*$+h*H+l*Se,s[1]=u*P+d*j+f*q+v*ae,s[5]=u*U+d*I+f*X+v*ne,s[9]=u*y+d*V+f*Y+v*xe,s[13]=u*b+d*$+f*H+v*Se,s[2]=M*P+T*j+_*q+g*ae,s[6]=M*U+T*I+_*X+g*ne,s[10]=M*y+T*V+_*Y+g*xe,s[14]=M*b+T*$+_*H+g*Se,s[3]=A*P+C*j+R*q+D*ae,s[7]=A*U+C*I+R*X+D*ne,s[11]=A*y+C*V+R*Y+D*xe,s[15]=A*b+C*$+R*H+D*Se,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],r=e[8],s=e[12],a=e[1],o=e[5],h=e[9],l=e[13],u=e[2],d=e[6],f=e[10],v=e[14],M=e[3],T=e[7],_=e[11],g=e[15],A=h*v-l*f,C=o*v-l*d,R=o*f-h*d,D=a*v-l*u,P=a*f-h*u,U=a*d-o*u;return t*(T*A-_*C+g*R)-n*(M*A-_*D+g*P)+r*(M*C-T*D+g*U)-s*(M*R-T*P+_*U)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],a=e[4],o=e[5],h=e[6],l=e[7],u=e[8],d=e[9],f=e[10],v=e[11],M=e[12],T=e[13],_=e[14],g=e[15],A=t*o-n*a,C=t*h-r*a,R=t*l-s*a,D=n*h-r*o,P=n*l-s*o,U=r*l-s*h,y=u*T-d*M,b=u*_-f*M,j=u*g-v*M,I=d*_-f*T,V=d*g-v*T,$=f*g-v*_,q=A*$-C*V+R*I+D*j-P*b+U*y;if(q===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const X=1/q;return e[0]=(o*$-h*V+l*I)*X,e[1]=(r*V-n*$-s*I)*X,e[2]=(T*U-_*P+g*D)*X,e[3]=(f*P-d*U-v*D)*X,e[4]=(h*j-a*$-l*b)*X,e[5]=(t*$-r*j+s*b)*X,e[6]=(_*R-M*U-g*C)*X,e[7]=(u*U-f*R+v*C)*X,e[8]=(a*V-o*j+l*y)*X,e[9]=(n*j-t*V-s*y)*X,e[10]=(M*P-T*R+g*A)*X,e[11]=(d*R-u*P-v*A)*X,e[12]=(o*b-a*I-h*y)*X,e[13]=(t*I-n*b+r*y)*X,e[14]=(T*C-M*D-_*A)*X,e[15]=(u*D-d*C+f*A)*X,this}scale(e){const t=this.elements,n=e.x,r=e.y,s=e.z;return t[0]*=n,t[4]*=r,t[8]*=s,t[1]*=n,t[5]*=r,t[9]*=s,t[2]*=n,t[6]*=r,t[10]*=s,t[3]*=n,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),r=Math.sin(t),s=1-n,a=e.x,o=e.y,h=e.z,l=s*a,u=s*o;return this.set(l*a+n,l*o-r*h,l*h+r*o,0,l*o+r*h,u*o+n,u*h-r*a,0,l*h-r*o,u*h+r*a,s*h*h+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,s,a){return this.set(1,n,s,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){const r=this.elements,s=t._x,a=t._y,o=t._z,h=t._w,l=s+s,u=a+a,d=o+o,f=s*l,v=s*u,M=s*d,T=a*u,_=a*d,g=o*d,A=h*l,C=h*u,R=h*d,D=n.x,P=n.y,U=n.z;return r[0]=(1-(T+g))*D,r[1]=(v+R)*D,r[2]=(M-C)*D,r[3]=0,r[4]=(v-R)*P,r[5]=(1-(f+g))*P,r[6]=(_+A)*P,r[7]=0,r[8]=(M+C)*U,r[9]=(_-A)*U,r[10]=(1-(f+T))*U,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){const r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];const s=this.determinant();if(s===0)return n.set(1,1,1),t.identity(),this;let a=Ei.set(r[0],r[1],r[2]).length();const o=Ei.set(r[4],r[5],r[6]).length(),h=Ei.set(r[8],r[9],r[10]).length();s<0&&(a=-a),ln.copy(this);const l=1/a,u=1/o,d=1/h;return ln.elements[0]*=l,ln.elements[1]*=l,ln.elements[2]*=l,ln.elements[4]*=u,ln.elements[5]*=u,ln.elements[6]*=u,ln.elements[8]*=d,ln.elements[9]*=d,ln.elements[10]*=d,t.setFromRotationMatrix(ln),n.x=a,n.y=o,n.z=h,this}makePerspective(e,t,n,r,s,a,o=Sn,h=!1){const l=this.elements,u=2*s/(t-e),d=2*s/(n-r),f=(t+e)/(t-e),v=(n+r)/(n-r);let M,T;if(h)M=s/(a-s),T=a*s/(a-s);else if(o===Sn)M=-(a+s)/(a-s),T=-2*a*s/(a-s);else if(o===Sr)M=-a/(a-s),T=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=u,l[4]=0,l[8]=f,l[12]=0,l[1]=0,l[5]=d,l[9]=v,l[13]=0,l[2]=0,l[6]=0,l[10]=M,l[14]=T,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,r,s,a,o=Sn,h=!1){const l=this.elements,u=2/(t-e),d=2/(n-r),f=-(t+e)/(t-e),v=-(n+r)/(n-r);let M,T;if(h)M=1/(a-s),T=a/(a-s);else if(o===Sn)M=-2/(a-s),T=-(a+s)/(a-s);else if(o===Sr)M=-1/(a-s),T=-s/(a-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=u,l[4]=0,l[8]=0,l[12]=f,l[1]=0,l[5]=d,l[9]=0,l[13]=v,l[2]=0,l[6]=0,l[10]=M,l[14]=T,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let r=0;r<16;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const Ei=new k,ln=new bt,wh=new k(0,0,0),Rh=new k(1,1,1),Hn=new k,Ir=new k,Qt=new k,Yo=new bt,qo=new ji;class An{constructor(e=0,t=0,n=0,r=An.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const r=e.elements,s=r[0],a=r[4],o=r[8],h=r[1],l=r[5],u=r[9],d=r[2],f=r[6],v=r[10];switch(t){case"XYZ":this._y=Math.asin(ot(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,v),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(f,l),this._z=0);break;case"YXZ":this._x=Math.asin(-ot(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,v),this._z=Math.atan2(h,l)):(this._y=Math.atan2(-d,s),this._z=0);break;case"ZXY":this._x=Math.asin(ot(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-d,v),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(h,s));break;case"ZYX":this._y=Math.asin(-ot(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(f,v),this._z=Math.atan2(h,s)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(ot(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(-u,l),this._y=Math.atan2(-d,s)):(this._x=0,this._y=Math.atan2(o,v));break;case"XZY":this._z=Math.asin(-ot(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(f,l),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-u,v),this._y=0);break;default:Ve("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Yo.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Yo,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return qo.setFromEuler(this),this.setFromQuaternion(qo,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}An.DEFAULT_ORDER="XYZ";class yo{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Ch=0;const Zo=new k,Ti=new ji,Rn=new bt,Dr=new k,nr=new k,Ph=new k,Ih=new ji,jo=new k(1,0,0),Ko=new k(0,1,0),Jo=new k(0,0,1),Qo={type:"added"},Dh={type:"removed"},bi={type:"childadded",child:null},Bs={type:"childremoved",child:null};class Bt extends Zi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Ch++}),this.uuid=Tr(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Bt.DEFAULT_UP.clone();const e=new k,t=new An,n=new ji,r=new k(1,1,1);function s(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(s),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new bt},normalMatrix:{value:new Ke}}),this.matrix=new bt,this.matrixWorld=new bt,this.matrixAutoUpdate=Bt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Bt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new yo,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Ti.setFromAxisAngle(e,t),this.quaternion.multiply(Ti),this}rotateOnWorldAxis(e,t){return Ti.setFromAxisAngle(e,t),this.quaternion.premultiply(Ti),this}rotateX(e){return this.rotateOnAxis(jo,e)}rotateY(e){return this.rotateOnAxis(Ko,e)}rotateZ(e){return this.rotateOnAxis(Jo,e)}translateOnAxis(e,t){return Zo.copy(e).applyQuaternion(this.quaternion),this.position.add(Zo.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(jo,e)}translateY(e){return this.translateOnAxis(Ko,e)}translateZ(e){return this.translateOnAxis(Jo,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Rn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Dr.copy(e):Dr.set(e,t,n);const r=this.parent;this.updateWorldMatrix(!0,!1),nr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Rn.lookAt(nr,Dr,this.up):Rn.lookAt(Dr,nr,this.up),this.quaternion.setFromRotationMatrix(Rn),r&&(Rn.extractRotation(r.matrixWorld),Ti.setFromRotationMatrix(Rn),this.quaternion.premultiply(Ti.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(ft("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Qo),bi.child=e,this.dispatchEvent(bi),bi.child=null):ft("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Dh),Bs.child=e,this.dispatchEvent(Bs),Bs.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Rn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Rn.multiply(e.parent.matrixWorld)),e.applyMatrix4(Rn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Qo),bi.child=e,this.dispatchEvent(bi),bi.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){const a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(nr,e,Ph),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(nr,Ih,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const t=e.x,n=e.y,r=e.z,s=this.matrix.elements;s[12]+=t-s[0]*t-s[4]*n-s[8]*r,s[13]+=n-s[1]*t-s[5]*n-s[9]*r,s[14]+=r-s[2]*t-s[6]*n-s[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),this.static!==!1&&(r.static=this.static),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(o=>({...o})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function s(o,h){return o[h.uuid]===void 0&&(o[h.uuid]=h.toJSON(e)),h.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const h=o.shapes;if(Array.isArray(h))for(let l=0,u=h.length;l<u;l++){const d=h[l];s(e.shapes,d)}else s(e.shapes,h)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let h=0,l=this.material.length;h<l;h++)o.push(s(e.materials,this.material[h]));r.material=o}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let o=0;o<this.children.length;o++)r.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let o=0;o<this.animations.length;o++){const h=this.animations[o];r.animations.push(s(e.animations,h))}}if(t){const o=a(e.geometries),h=a(e.materials),l=a(e.textures),u=a(e.images),d=a(e.shapes),f=a(e.skeletons),v=a(e.animations),M=a(e.nodes);o.length>0&&(n.geometries=o),h.length>0&&(n.materials=h),l.length>0&&(n.textures=l),u.length>0&&(n.images=u),d.length>0&&(n.shapes=d),f.length>0&&(n.skeletons=f),v.length>0&&(n.animations=v),M.length>0&&(n.nodes=M)}return n.object=r,n;function a(o){const h=[];for(const l in o){const u=o[l];delete u.metadata,h.push(u)}return h}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),e.pivot!==null&&(this.pivot=e.pivot.clone()),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const r=e.children[n];this.add(r.clone())}return this}}Bt.DEFAULT_UP=new k(0,1,0);Bt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Bt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class Zn extends Bt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Lh={type:"move"};class Ws{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Zn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Zn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new k,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new k),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Zn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new k,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new k),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,s=null,a=null;const o=this._targetRay,h=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){a=!0;for(const T of e.hand.values()){const _=t.getJointPose(T,n),g=this._getHandJoint(l,T);_!==null&&(g.matrix.fromArray(_.transform.matrix),g.matrix.decompose(g.position,g.rotation,g.scale),g.matrixWorldNeedsUpdate=!0,g.jointRadius=_.radius),g.visible=_!==null}const u=l.joints["index-finger-tip"],d=l.joints["thumb-tip"],f=u.position.distanceTo(d.position),v=.02,M=.005;l.inputState.pinching&&f>v+M?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&f<=v-M&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else h!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(h.matrix.fromArray(s.transform.matrix),h.matrix.decompose(h.position,h.rotation,h.scale),h.matrixWorldNeedsUpdate=!0,s.linearVelocity?(h.hasLinearVelocity=!0,h.linearVelocity.copy(s.linearVelocity)):h.hasLinearVelocity=!1,s.angularVelocity?(h.hasAngularVelocity=!0,h.angularVelocity.copy(s.angularVelocity)):h.hasAngularVelocity=!1));o!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&s!==null&&(r=s),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Lh)))}return o!==null&&(o.visible=r!==null),h!==null&&(h.visible=s!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new Zn;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}const _l={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},zn={h:0,s:0,l:0},Lr={h:0,s:0,l:0};function Gs(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class ct{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=$t){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,dt.colorSpaceToWorking(this,t),this}setRGB(e,t,n,r=dt.workingColorSpace){return this.r=e,this.g=t,this.b=n,dt.colorSpaceToWorking(this,r),this}setHSL(e,t,n,r=dt.workingColorSpace){if(e=Mh(e,1),t=ot(t,0,1),n=ot(n,0,1),t===0)this.r=this.g=this.b=n;else{const s=n<=.5?n*(1+t):n+t-n*t,a=2*n-s;this.r=Gs(a,s,e+1/3),this.g=Gs(a,s,e),this.b=Gs(a,s,e-1/3)}return dt.colorSpaceToWorking(this,r),this}setStyle(e,t=$t){function n(s){s!==void 0&&parseFloat(s)<1&&Ve("Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const a=r[1],o=r[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:Ve("Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(s,16),t);Ve("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=$t){const n=_l[e.toLowerCase()];return n!==void 0?this.setHex(n,t):Ve("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=On(e.r),this.g=On(e.g),this.b=On(e.b),this}copyLinearToSRGB(e){return this.r=Wi(e.r),this.g=Wi(e.g),this.b=Wi(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=$t){return dt.workingToColorSpace(Vt.copy(this),e),Math.round(ot(Vt.r*255,0,255))*65536+Math.round(ot(Vt.g*255,0,255))*256+Math.round(ot(Vt.b*255,0,255))}getHexString(e=$t){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=dt.workingColorSpace){dt.workingToColorSpace(Vt.copy(this),t);const n=Vt.r,r=Vt.g,s=Vt.b,a=Math.max(n,r,s),o=Math.min(n,r,s);let h,l;const u=(o+a)/2;if(o===a)h=0,l=0;else{const d=a-o;switch(l=u<=.5?d/(a+o):d/(2-a-o),a){case n:h=(r-s)/d+(r<s?6:0);break;case r:h=(s-n)/d+2;break;case s:h=(n-r)/d+4;break}h/=6}return e.h=h,e.s=l,e.l=u,e}getRGB(e,t=dt.workingColorSpace){return dt.workingToColorSpace(Vt.copy(this),t),e.r=Vt.r,e.g=Vt.g,e.b=Vt.b,e}getStyle(e=$t){dt.workingToColorSpace(Vt.copy(this),e);const t=Vt.r,n=Vt.g,r=Vt.b;return e!==$t?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(r*255)})`}offsetHSL(e,t,n){return this.getHSL(zn),this.setHSL(zn.h+e,zn.s+t,zn.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(zn),e.getHSL(Lr);const n=Ls(zn.h,Lr.h,t),r=Ls(zn.s,Lr.s,t),s=Ls(zn.l,Lr.l,t);return this.setHSL(n,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*r,this.g=s[1]*t+s[4]*n+s[7]*r,this.b=s[2]*t+s[5]*n+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Vt=new ct;ct.NAMES=_l;class Uh extends Bt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new An,this.environmentIntensity=1,this.environmentRotation=new An,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}const hn=new k,Cn=new k,Hs=new k,Pn=new k,Ai=new k,wi=new k,ec=new k,zs=new k,ks=new k,Vs=new k,Xs=new Ct,$s=new Ct,Ys=new Ct;class fn{constructor(e=new k,t=new k,n=new k){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),hn.subVectors(e,t),r.cross(hn);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,n,r,s){hn.subVectors(r,t),Cn.subVectors(n,t),Hs.subVectors(e,t);const a=hn.dot(hn),o=hn.dot(Cn),h=hn.dot(Hs),l=Cn.dot(Cn),u=Cn.dot(Hs),d=a*l-o*o;if(d===0)return s.set(0,0,0),null;const f=1/d,v=(l*h-o*u)*f,M=(a*u-o*h)*f;return s.set(1-v-M,M,v)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,Pn)===null?!1:Pn.x>=0&&Pn.y>=0&&Pn.x+Pn.y<=1}static getInterpolation(e,t,n,r,s,a,o,h){return this.getBarycoord(e,t,n,r,Pn)===null?(h.x=0,h.y=0,"z"in h&&(h.z=0),"w"in h&&(h.w=0),null):(h.setScalar(0),h.addScaledVector(s,Pn.x),h.addScaledVector(a,Pn.y),h.addScaledVector(o,Pn.z),h)}static getInterpolatedAttribute(e,t,n,r,s,a){return Xs.setScalar(0),$s.setScalar(0),Ys.setScalar(0),Xs.fromBufferAttribute(e,t),$s.fromBufferAttribute(e,n),Ys.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(Xs,s.x),a.addScaledVector($s,s.y),a.addScaledVector(Ys,s.z),a}static isFrontFacing(e,t,n,r){return hn.subVectors(n,t),Cn.subVectors(e,t),hn.cross(Cn).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return hn.subVectors(this.c,this.b),Cn.subVectors(this.a,this.b),hn.cross(Cn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return fn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return fn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,r,s){return fn.getInterpolation(e,this.a,this.b,this.c,t,n,r,s)}containsPoint(e){return fn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return fn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,r=this.b,s=this.c;let a,o;Ai.subVectors(r,n),wi.subVectors(s,n),zs.subVectors(e,n);const h=Ai.dot(zs),l=wi.dot(zs);if(h<=0&&l<=0)return t.copy(n);ks.subVectors(e,r);const u=Ai.dot(ks),d=wi.dot(ks);if(u>=0&&d<=u)return t.copy(r);const f=h*d-u*l;if(f<=0&&h>=0&&u<=0)return a=h/(h-u),t.copy(n).addScaledVector(Ai,a);Vs.subVectors(e,s);const v=Ai.dot(Vs),M=wi.dot(Vs);if(M>=0&&v<=M)return t.copy(s);const T=v*l-h*M;if(T<=0&&l>=0&&M<=0)return o=l/(l-M),t.copy(n).addScaledVector(wi,o);const _=u*M-v*d;if(_<=0&&d-u>=0&&v-M>=0)return ec.subVectors(s,r),o=(d-u)/(d-u+(v-M)),t.copy(r).addScaledVector(ec,o);const g=1/(_+T+f);return a=T*g,o=f*g,t.copy(n).addScaledVector(Ai,a).addScaledVector(wi,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class br{constructor(e=new k(1/0,1/0,1/0),t=new k(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(un.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(un.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=un.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const s=n.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,un):un.fromBufferAttribute(s,a),un.applyMatrix4(e.matrixWorld),this.expandByPoint(un);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Ur.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Ur.copy(n.boundingBox)),Ur.applyMatrix4(e.matrixWorld),this.union(Ur)}const r=e.children;for(let s=0,a=r.length;s<a;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,un),un.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(ir),Nr.subVectors(this.max,ir),Ri.subVectors(e.a,ir),Ci.subVectors(e.b,ir),Pi.subVectors(e.c,ir),kn.subVectors(Ci,Ri),Vn.subVectors(Pi,Ci),ni.subVectors(Ri,Pi);let t=[0,-kn.z,kn.y,0,-Vn.z,Vn.y,0,-ni.z,ni.y,kn.z,0,-kn.x,Vn.z,0,-Vn.x,ni.z,0,-ni.x,-kn.y,kn.x,0,-Vn.y,Vn.x,0,-ni.y,ni.x,0];return!qs(t,Ri,Ci,Pi,Nr)||(t=[1,0,0,0,1,0,0,0,1],!qs(t,Ri,Ci,Pi,Nr))?!1:(Or.crossVectors(kn,Vn),t=[Or.x,Or.y,Or.z],qs(t,Ri,Ci,Pi,Nr))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,un).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(un).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(In[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),In[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),In[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),In[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),In[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),In[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),In[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),In[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(In),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const In=[new k,new k,new k,new k,new k,new k,new k,new k],un=new k,Ur=new br,Ri=new k,Ci=new k,Pi=new k,kn=new k,Vn=new k,ni=new k,ir=new k,Nr=new k,Or=new k,ii=new k;function qs(i,e,t,n,r){for(let s=0,a=i.length-3;s<=a;s+=3){ii.fromArray(i,s);const o=r.x*Math.abs(ii.x)+r.y*Math.abs(ii.y)+r.z*Math.abs(ii.z),h=e.dot(ii),l=t.dot(ii),u=n.dot(ii);if(Math.max(-Math.max(h,l,u),Math.min(h,l,u))>o)return!1}return!0}const Pt=new k,Fr=new lt;let Nh=0;class Tn{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Nh++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Go,this.updateRanges=[],this.gpuType=Mn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Fr.fromBufferAttribute(this,t),Fr.applyMatrix3(e),this.setXY(t,Fr.x,Fr.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Pt.fromBufferAttribute(this,t),Pt.applyMatrix3(e),this.setXYZ(t,Pt.x,Pt.y,Pt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Pt.fromBufferAttribute(this,t),Pt.applyMatrix4(e),this.setXYZ(t,Pt.x,Pt.y,Pt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Pt.fromBufferAttribute(this,t),Pt.applyNormalMatrix(e),this.setXYZ(t,Pt.x,Pt.y,Pt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Pt.fromBufferAttribute(this,t),Pt.transformDirection(e),this.setXYZ(t,Pt.x,Pt.y,Pt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=tr(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Zt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=tr(t,this.array)),t}setX(e,t){return this.normalized&&(t=Zt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=tr(t,this.array)),t}setY(e,t){return this.normalized&&(t=Zt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=tr(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Zt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=tr(t,this.array)),t}setW(e,t){return this.normalized&&(t=Zt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Zt(t,this.array),n=Zt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=Zt(t,this.array),n=Zt(n,this.array),r=Zt(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,s){return e*=this.itemSize,this.normalized&&(t=Zt(t,this.array),n=Zt(n,this.array),r=Zt(r,this.array),s=Zt(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Go&&(e.usage=this.usage),e}}class vl extends Tn{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class xl extends Tn{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class Lt extends Tn{constructor(e,t,n){super(new Float32Array(e),t,n)}}const Oh=new br,rr=new k,Zs=new k;class _s{constructor(e=new k,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):Oh.setFromPoints(e).getCenter(n);let r=0;for(let s=0,a=e.length;s<a;s++)r=Math.max(r,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;rr.subVectors(e,this.center);const t=rr.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),r=(n-this.radius)*.5;this.center.addScaledVector(rr,r/n),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Zs.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(rr.copy(e.center).add(Zs)),this.expandByPoint(rr.copy(e.center).sub(Zs))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let Fh=0;const sn=new bt,js=new Bt,Ii=new k,en=new br,sr=new br,Ft=new k;class Kt extends Zi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Fh++}),this.uuid=Tr(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(gh(e)?xl:vl)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new Ke().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return sn.makeRotationFromQuaternion(e),this.applyMatrix4(sn),this}rotateX(e){return sn.makeRotationX(e),this.applyMatrix4(sn),this}rotateY(e){return sn.makeRotationY(e),this.applyMatrix4(sn),this}rotateZ(e){return sn.makeRotationZ(e),this.applyMatrix4(sn),this}translate(e,t,n){return sn.makeTranslation(e,t,n),this.applyMatrix4(sn),this}scale(e,t,n){return sn.makeScale(e,t,n),this.applyMatrix4(sn),this}lookAt(e){return js.lookAt(e),js.updateMatrix(),this.applyMatrix4(js.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ii).negate(),this.translate(Ii.x,Ii.y,Ii.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let r=0,s=e.length;r<s;r++){const a=e[r];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Lt(n,3))}else{const n=Math.min(e.length,t.count);for(let r=0;r<n;r++){const s=e[r];t.setXYZ(r,s.x,s.y,s.z||0)}e.length>t.count&&Ve("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new br);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){ft("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new k(-1/0,-1/0,-1/0),new k(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,r=t.length;n<r;n++){const s=t[n];en.setFromBufferAttribute(s),this.morphTargetsRelative?(Ft.addVectors(this.boundingBox.min,en.min),this.boundingBox.expandByPoint(Ft),Ft.addVectors(this.boundingBox.max,en.max),this.boundingBox.expandByPoint(Ft)):(this.boundingBox.expandByPoint(en.min),this.boundingBox.expandByPoint(en.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&ft('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new _s);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){ft("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new k,1/0);return}if(e){const n=this.boundingSphere.center;if(en.setFromBufferAttribute(e),t)for(let s=0,a=t.length;s<a;s++){const o=t[s];sr.setFromBufferAttribute(o),this.morphTargetsRelative?(Ft.addVectors(en.min,sr.min),en.expandByPoint(Ft),Ft.addVectors(en.max,sr.max),en.expandByPoint(Ft)):(en.expandByPoint(sr.min),en.expandByPoint(sr.max))}en.getCenter(n);let r=0;for(let s=0,a=e.count;s<a;s++)Ft.fromBufferAttribute(e,s),r=Math.max(r,n.distanceToSquared(Ft));if(t)for(let s=0,a=t.length;s<a;s++){const o=t[s],h=this.morphTargetsRelative;for(let l=0,u=o.count;l<u;l++)Ft.fromBufferAttribute(o,l),h&&(Ii.fromBufferAttribute(e,l),Ft.add(Ii)),r=Math.max(r,n.distanceToSquared(Ft))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&ft('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){ft("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,r=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Tn(new Float32Array(4*n.count),4));const a=this.getAttribute("tangent"),o=[],h=[];for(let y=0;y<n.count;y++)o[y]=new k,h[y]=new k;const l=new k,u=new k,d=new k,f=new lt,v=new lt,M=new lt,T=new k,_=new k;function g(y,b,j){l.fromBufferAttribute(n,y),u.fromBufferAttribute(n,b),d.fromBufferAttribute(n,j),f.fromBufferAttribute(s,y),v.fromBufferAttribute(s,b),M.fromBufferAttribute(s,j),u.sub(l),d.sub(l),v.sub(f),M.sub(f);const I=1/(v.x*M.y-M.x*v.y);isFinite(I)&&(T.copy(u).multiplyScalar(M.y).addScaledVector(d,-v.y).multiplyScalar(I),_.copy(d).multiplyScalar(v.x).addScaledVector(u,-M.x).multiplyScalar(I),o[y].add(T),o[b].add(T),o[j].add(T),h[y].add(_),h[b].add(_),h[j].add(_))}let A=this.groups;A.length===0&&(A=[{start:0,count:e.count}]);for(let y=0,b=A.length;y<b;++y){const j=A[y],I=j.start,V=j.count;for(let $=I,q=I+V;$<q;$+=3)g(e.getX($+0),e.getX($+1),e.getX($+2))}const C=new k,R=new k,D=new k,P=new k;function U(y){D.fromBufferAttribute(r,y),P.copy(D);const b=o[y];C.copy(b),C.sub(D.multiplyScalar(D.dot(b))).normalize(),R.crossVectors(P,b);const I=R.dot(h[y])<0?-1:1;a.setXYZW(y,C.x,C.y,C.z,I)}for(let y=0,b=A.length;y<b;++y){const j=A[y],I=j.start,V=j.count;for(let $=I,q=I+V;$<q;$+=3)U(e.getX($+0)),U(e.getX($+1)),U(e.getX($+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Tn(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let f=0,v=n.count;f<v;f++)n.setXYZ(f,0,0,0);const r=new k,s=new k,a=new k,o=new k,h=new k,l=new k,u=new k,d=new k;if(e)for(let f=0,v=e.count;f<v;f+=3){const M=e.getX(f+0),T=e.getX(f+1),_=e.getX(f+2);r.fromBufferAttribute(t,M),s.fromBufferAttribute(t,T),a.fromBufferAttribute(t,_),u.subVectors(a,s),d.subVectors(r,s),u.cross(d),o.fromBufferAttribute(n,M),h.fromBufferAttribute(n,T),l.fromBufferAttribute(n,_),o.add(u),h.add(u),l.add(u),n.setXYZ(M,o.x,o.y,o.z),n.setXYZ(T,h.x,h.y,h.z),n.setXYZ(_,l.x,l.y,l.z)}else for(let f=0,v=t.count;f<v;f+=3)r.fromBufferAttribute(t,f+0),s.fromBufferAttribute(t,f+1),a.fromBufferAttribute(t,f+2),u.subVectors(a,s),d.subVectors(r,s),u.cross(d),n.setXYZ(f+0,u.x,u.y,u.z),n.setXYZ(f+1,u.x,u.y,u.z),n.setXYZ(f+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Ft.fromBufferAttribute(e,t),Ft.normalize(),e.setXYZ(t,Ft.x,Ft.y,Ft.z)}toNonIndexed(){function e(o,h){const l=o.array,u=o.itemSize,d=o.normalized,f=new l.constructor(h.length*u);let v=0,M=0;for(let T=0,_=h.length;T<_;T++){o.isInterleavedBufferAttribute?v=h[T]*o.data.stride+o.offset:v=h[T]*u;for(let g=0;g<u;g++)f[M++]=l[v++]}return new Tn(f,u,d)}if(this.index===null)return Ve("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Kt,n=this.index.array,r=this.attributes;for(const o in r){const h=r[o],l=e(h,n);t.setAttribute(o,l)}const s=this.morphAttributes;for(const o in s){const h=[],l=s[o];for(let u=0,d=l.length;u<d;u++){const f=l[u],v=e(f,n);h.push(v)}t.morphAttributes[o]=h}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,h=a.length;o<h;o++){const l=a[o];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const h=this.parameters;for(const l in h)h[l]!==void 0&&(e[l]=h[l]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const h in n){const l=n[h];e.data.attributes[h]=l.toJSON(e.data)}const r={};let s=!1;for(const h in this.morphAttributes){const l=this.morphAttributes[h],u=[];for(let d=0,f=l.length;d<f;d++){const v=l[d];u.push(v.toJSON(e.data))}u.length>0&&(r[h]=u,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone());const r=e.attributes;for(const l in r){const u=r[l];this.setAttribute(l,u.clone(t))}const s=e.morphAttributes;for(const l in s){const u=[],d=s[l];for(let f=0,v=d.length;f<v;f++)u.push(d[f].clone(t));this.morphAttributes[l]=u}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let l=0,u=a.length;l<u;l++){const d=a[l];this.addGroup(d.start,d.count,d.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const h=e.boundingSphere;return h!==null&&(this.boundingSphere=h.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}let Bh=0;class Ki extends Zi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Bh++}),this.uuid=Tr(),this.name="",this.type="Material",this.blending=Bi,this.side=Jn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=ma,this.blendDst=ga,this.blendEquation=hi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ct(0,0,0),this.blendAlpha=0,this.depthFunc=Gi,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Wo,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Si,this.stencilZFail=Si,this.stencilZPass=Si,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){Ve(`Material: parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){Ve(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(n):r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Bi&&(n.blending=this.blending),this.side!==Jn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==ma&&(n.blendSrc=this.blendSrc),this.blendDst!==ga&&(n.blendDst=this.blendDst),this.blendEquation!==hi&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Gi&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Wo&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Si&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Si&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Si&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.allowOverride===!1&&(n.allowOverride=!1),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(s){const a=[];for(const o in s){const h=s[o];delete h.metadata,a.push(h)}return a}if(t){const s=r(e.textures),a=r(e.images);s.length>0&&(n.textures=s),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const r=t.length;n=new Array(r);for(let s=0;s!==r;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}const Dn=new k,Ks=new k,Br=new k,Xn=new k,Js=new k,Wr=new k,Qs=new k;class Eo{constructor(e=new k,t=new k(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Dn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Dn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Dn.copy(this.origin).addScaledVector(this.direction,t),Dn.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){Ks.copy(e).add(t).multiplyScalar(.5),Br.copy(t).sub(e).normalize(),Xn.copy(this.origin).sub(Ks);const s=e.distanceTo(t)*.5,a=-this.direction.dot(Br),o=Xn.dot(this.direction),h=-Xn.dot(Br),l=Xn.lengthSq(),u=Math.abs(1-a*a);let d,f,v,M;if(u>0)if(d=a*h-o,f=a*o-h,M=s*u,d>=0)if(f>=-M)if(f<=M){const T=1/u;d*=T,f*=T,v=d*(d+a*f+2*o)+f*(a*d+f+2*h)+l}else f=s,d=Math.max(0,-(a*f+o)),v=-d*d+f*(f+2*h)+l;else f=-s,d=Math.max(0,-(a*f+o)),v=-d*d+f*(f+2*h)+l;else f<=-M?(d=Math.max(0,-(-a*s+o)),f=d>0?-s:Math.min(Math.max(-s,-h),s),v=-d*d+f*(f+2*h)+l):f<=M?(d=0,f=Math.min(Math.max(-s,-h),s),v=f*(f+2*h)+l):(d=Math.max(0,-(a*s+o)),f=d>0?s:Math.min(Math.max(-s,-h),s),v=-d*d+f*(f+2*h)+l);else f=a>0?-s:s,d=Math.max(0,-(a*f+o)),v=-d*d+f*(f+2*h)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,d),r&&r.copy(Ks).addScaledVector(Br,f),v}intersectSphere(e,t){Dn.subVectors(e.center,this.origin);const n=Dn.dot(this.direction),r=Dn.dot(Dn)-n*n,s=e.radius*e.radius;if(r>s)return null;const a=Math.sqrt(s-r),o=n-a,h=n+a;return h<0?null:o<0?this.at(h,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,s,a,o,h;const l=1/this.direction.x,u=1/this.direction.y,d=1/this.direction.z,f=this.origin;return l>=0?(n=(e.min.x-f.x)*l,r=(e.max.x-f.x)*l):(n=(e.max.x-f.x)*l,r=(e.min.x-f.x)*l),u>=0?(s=(e.min.y-f.y)*u,a=(e.max.y-f.y)*u):(s=(e.max.y-f.y)*u,a=(e.min.y-f.y)*u),n>a||s>r||((s>n||isNaN(n))&&(n=s),(a<r||isNaN(r))&&(r=a),d>=0?(o=(e.min.z-f.z)*d,h=(e.max.z-f.z)*d):(o=(e.max.z-f.z)*d,h=(e.min.z-f.z)*d),n>h||o>r)||((o>n||n!==n)&&(n=o),(h<r||r!==r)&&(r=h),r<0)?null:this.at(n>=0?n:r,t)}intersectsBox(e){return this.intersectBox(e,Dn)!==null}intersectTriangle(e,t,n,r,s){Js.subVectors(t,e),Wr.subVectors(n,e),Qs.crossVectors(Js,Wr);let a=this.direction.dot(Qs),o;if(a>0){if(r)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Xn.subVectors(this.origin,e);const h=o*this.direction.dot(Wr.crossVectors(Xn,Wr));if(h<0)return null;const l=o*this.direction.dot(Js.cross(Xn));if(l<0||h+l>a)return null;const u=-o*Xn.dot(Qs);return u<0?null:this.at(u/a,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class fs extends Ki{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new ct(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new An,this.combine=Qc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const tc=new bt,ri=new Eo,Gr=new _s,nc=new k,Hr=new k,zr=new k,kr=new k,ea=new k,Vr=new k,ic=new k,Xr=new k;class It extends Bt{constructor(e=new Kt,t=new fs){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(e,t){const n=this.geometry,r=n.attributes.position,s=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(r,e);const o=this.morphTargetInfluences;if(s&&o){Vr.set(0,0,0);for(let h=0,l=s.length;h<l;h++){const u=o[h],d=s[h];u!==0&&(ea.fromBufferAttribute(d,e),a?Vr.addScaledVector(ea,u):Vr.addScaledVector(ea.sub(t),u))}t.add(Vr)}return t}raycast(e,t){const n=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Gr.copy(n.boundingSphere),Gr.applyMatrix4(s),ri.copy(e.ray).recast(e.near),!(Gr.containsPoint(ri.origin)===!1&&(ri.intersectSphere(Gr,nc)===null||ri.origin.distanceToSquared(nc)>(e.far-e.near)**2))&&(tc.copy(s).invert(),ri.copy(e.ray).applyMatrix4(tc),!(n.boundingBox!==null&&ri.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,ri)))}_computeIntersections(e,t,n){let r;const s=this.geometry,a=this.material,o=s.index,h=s.attributes.position,l=s.attributes.uv,u=s.attributes.uv1,d=s.attributes.normal,f=s.groups,v=s.drawRange;if(o!==null)if(Array.isArray(a))for(let M=0,T=f.length;M<T;M++){const _=f[M],g=a[_.materialIndex],A=Math.max(_.start,v.start),C=Math.min(o.count,Math.min(_.start+_.count,v.start+v.count));for(let R=A,D=C;R<D;R+=3){const P=o.getX(R),U=o.getX(R+1),y=o.getX(R+2);r=$r(this,g,e,n,l,u,d,P,U,y),r&&(r.faceIndex=Math.floor(R/3),r.face.materialIndex=_.materialIndex,t.push(r))}}else{const M=Math.max(0,v.start),T=Math.min(o.count,v.start+v.count);for(let _=M,g=T;_<g;_+=3){const A=o.getX(_),C=o.getX(_+1),R=o.getX(_+2);r=$r(this,a,e,n,l,u,d,A,C,R),r&&(r.faceIndex=Math.floor(_/3),t.push(r))}}else if(h!==void 0)if(Array.isArray(a))for(let M=0,T=f.length;M<T;M++){const _=f[M],g=a[_.materialIndex],A=Math.max(_.start,v.start),C=Math.min(h.count,Math.min(_.start+_.count,v.start+v.count));for(let R=A,D=C;R<D;R+=3){const P=R,U=R+1,y=R+2;r=$r(this,g,e,n,l,u,d,P,U,y),r&&(r.faceIndex=Math.floor(R/3),r.face.materialIndex=_.materialIndex,t.push(r))}}else{const M=Math.max(0,v.start),T=Math.min(h.count,v.start+v.count);for(let _=M,g=T;_<g;_+=3){const A=_,C=_+1,R=_+2;r=$r(this,a,e,n,l,u,d,A,C,R),r&&(r.faceIndex=Math.floor(_/3),t.push(r))}}}}function Wh(i,e,t,n,r,s,a,o){let h;if(e.side===jt?h=n.intersectTriangle(a,s,r,!0,o):h=n.intersectTriangle(r,s,a,e.side===Jn,o),h===null)return null;Xr.copy(o),Xr.applyMatrix4(i.matrixWorld);const l=t.ray.origin.distanceTo(Xr);return l<t.near||l>t.far?null:{distance:l,point:Xr.clone(),object:i}}function $r(i,e,t,n,r,s,a,o,h,l){i.getVertexPosition(o,Hr),i.getVertexPosition(h,zr),i.getVertexPosition(l,kr);const u=Wh(i,e,t,n,Hr,zr,kr,ic);if(u){const d=new k;fn.getBarycoord(ic,Hr,zr,kr,d),r&&(u.uv=fn.getInterpolatedAttribute(r,o,h,l,d,new lt)),s&&(u.uv1=fn.getInterpolatedAttribute(s,o,h,l,d,new lt)),a&&(u.normal=fn.getInterpolatedAttribute(a,o,h,l,d,new k),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));const f={a:o,b:h,c:l,normal:new k,materialIndex:0};fn.getNormal(Hr,zr,kr,f.normal),u.face=f,u.barycoord=d}return u}class Gh extends Ht{constructor(e=null,t=1,n=1,r,s,a,o,h,l=Dt,u=Dt,d,f){super(null,a,o,h,l,u,r,s,d,f),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const ta=new k,Hh=new k,zh=new Ke;class li{constructor(e=new k(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const r=ta.subVectors(n,t).cross(Hh.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(ta),r=this.normal.dot(n);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:t.copy(e.start).addScaledVector(n,s)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||zh.getNormalMatrix(e),r=this.coplanarPoint(ta).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const si=new _s,kh=new lt(.5,.5),Yr=new k;class To{constructor(e=new li,t=new li,n=new li,r=new li,s=new li,a=new li){this.planes=[e,t,n,r,s,a]}set(e,t,n,r,s,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(r),o[4].copy(s),o[5].copy(a),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Sn,n=!1){const r=this.planes,s=e.elements,a=s[0],o=s[1],h=s[2],l=s[3],u=s[4],d=s[5],f=s[6],v=s[7],M=s[8],T=s[9],_=s[10],g=s[11],A=s[12],C=s[13],R=s[14],D=s[15];if(r[0].setComponents(l-a,v-u,g-M,D-A).normalize(),r[1].setComponents(l+a,v+u,g+M,D+A).normalize(),r[2].setComponents(l+o,v+d,g+T,D+C).normalize(),r[3].setComponents(l-o,v-d,g-T,D-C).normalize(),n)r[4].setComponents(h,f,_,R).normalize(),r[5].setComponents(l-h,v-f,g-_,D-R).normalize();else if(r[4].setComponents(l-h,v-f,g-_,D-R).normalize(),t===Sn)r[5].setComponents(l+h,v+f,g+_,D+R).normalize();else if(t===Sr)r[5].setComponents(h,f,_,R).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),si.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),si.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(si)}intersectsSprite(e){si.center.set(0,0,0);const t=kh.distanceTo(e.center);return si.radius=.7071067811865476+t,si.applyMatrix4(e.matrixWorld),this.intersectsSphere(si)}intersectsSphere(e){const t=this.planes,n=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const r=t[n];if(Yr.x=r.normal.x>0?e.max.x:e.min.x,Yr.y=r.normal.y>0?e.max.y:e.min.y,Yr.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(Yr)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Ml extends Ki{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new ct(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const ds=new k,ps=new k,rc=new bt,ar=new Eo,qr=new _s,na=new k,sc=new k;class Vh extends Bt{constructor(e=new Kt,t=new Ml){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let r=1,s=t.count;r<s;r++)ds.fromBufferAttribute(t,r-1),ps.fromBufferAttribute(t,r),n[r]=n[r-1],n[r]+=ds.distanceTo(ps);e.setAttribute("lineDistance",new Lt(n,1))}else Ve("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,r=this.matrixWorld,s=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),qr.copy(n.boundingSphere),qr.applyMatrix4(r),qr.radius+=s,e.ray.intersectsSphere(qr)===!1)return;rc.copy(r).invert(),ar.copy(e.ray).applyMatrix4(rc);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),h=o*o,l=this.isLineSegments?2:1,u=n.index,f=n.attributes.position;if(u!==null){const v=Math.max(0,a.start),M=Math.min(u.count,a.start+a.count);for(let T=v,_=M-1;T<_;T+=l){const g=u.getX(T),A=u.getX(T+1),C=Zr(this,e,ar,h,g,A,T);C&&t.push(C)}if(this.isLineLoop){const T=u.getX(M-1),_=u.getX(v),g=Zr(this,e,ar,h,T,_,M-1);g&&t.push(g)}}else{const v=Math.max(0,a.start),M=Math.min(f.count,a.start+a.count);for(let T=v,_=M-1;T<_;T+=l){const g=Zr(this,e,ar,h,T,T+1,T);g&&t.push(g)}if(this.isLineLoop){const T=Zr(this,e,ar,h,M-1,v,M-1);T&&t.push(T)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function Zr(i,e,t,n,r,s,a){const o=i.geometry.attributes.position;if(ds.fromBufferAttribute(o,r),ps.fromBufferAttribute(o,s),t.distanceSqToSegment(ds,ps,na,sc)>n)return;na.applyMatrix4(i.matrixWorld);const l=e.ray.origin.distanceTo(na);if(!(l<e.near||l>e.far))return{distance:l,point:sc.clone().applyMatrix4(i.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:i}}class Sl extends Ht{constructor(e=[],t=gi,n,r,s,a,o,h,l,u){super(e,t,n,r,s,a,o,h,l,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class ac extends Ht{constructor(e,t,n,r,s,a,o,h,l){super(e,t,n,r,s,a,o,h,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Er extends Ht{constructor(e,t,n=bn,r,s,a,o=Dt,h=Dt,l,u=Bn,d=1){if(u!==Bn&&u!==mi)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const f={width:e,height:t,depth:d};super(f,r,s,a,o,h,u,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new So(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class Xh extends Er{constructor(e,t=bn,n=gi,r,s,a=Dt,o=Dt,h,l=Bn){const u={width:e,height:e,depth:1},d=[u,u,u,u,u,u];super(e,e,t,n,r,s,a,o,h,l),this.image=d,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class yl extends Ht{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class Ji extends Kt{constructor(e=1,t=1,n=1,r=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:s,depthSegments:a};const o=this;r=Math.floor(r),s=Math.floor(s),a=Math.floor(a);const h=[],l=[],u=[],d=[];let f=0,v=0;M("z","y","x",-1,-1,n,t,e,a,s,0),M("z","y","x",1,-1,n,t,-e,a,s,1),M("x","z","y",1,1,e,n,t,r,a,2),M("x","z","y",1,-1,e,n,-t,r,a,3),M("x","y","z",1,-1,e,t,n,r,s,4),M("x","y","z",-1,-1,e,t,-n,r,s,5),this.setIndex(h),this.setAttribute("position",new Lt(l,3)),this.setAttribute("normal",new Lt(u,3)),this.setAttribute("uv",new Lt(d,2));function M(T,_,g,A,C,R,D,P,U,y,b){const j=R/U,I=D/y,V=R/2,$=D/2,q=P/2,X=U+1,Y=y+1;let H=0,ae=0;const ne=new k;for(let xe=0;xe<Y;xe++){const Se=xe*I-$;for(let ye=0;ye<X;ye++){const $e=ye*j-V;ne[T]=$e*A,ne[_]=Se*C,ne[g]=q,l.push(ne.x,ne.y,ne.z),ne[T]=0,ne[_]=0,ne[g]=P>0?1:-1,u.push(ne.x,ne.y,ne.z),d.push(ye/U),d.push(1-xe/y),H+=1}}for(let xe=0;xe<y;xe++)for(let Se=0;Se<U;Se++){const ye=f+Se+X*xe,$e=f+Se+X*(xe+1),yt=f+(Se+1)+X*(xe+1),xt=f+(Se+1)+X*xe;h.push(ye,$e,xt),h.push($e,yt,xt),ae+=6}o.addGroup(v,ae,b),v+=ae,f+=H}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ji(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class bo extends Kt{constructor(e=1,t=32,n=0,r=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:r},t=Math.max(3,t);const s=[],a=[],o=[],h=[],l=new k,u=new lt;a.push(0,0,0),o.push(0,0,1),h.push(.5,.5);for(let d=0,f=3;d<=t;d++,f+=3){const v=n+d/t*r;l.x=e*Math.cos(v),l.y=e*Math.sin(v),a.push(l.x,l.y,l.z),o.push(0,0,1),u.x=(a[f]/e+1)/2,u.y=(a[f+1]/e+1)/2,h.push(u.x,u.y)}for(let d=1;d<=t;d++)s.push(d,d+1,0);this.setIndex(s),this.setAttribute("position",new Lt(a,3)),this.setAttribute("normal",new Lt(o,3)),this.setAttribute("uv",new Lt(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new bo(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class Ao extends Kt{constructor(e=1,t=1,n=1,r=32,s=1,a=!1,o=0,h=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:r,heightSegments:s,openEnded:a,thetaStart:o,thetaLength:h};const l=this;r=Math.floor(r),s=Math.floor(s);const u=[],d=[],f=[],v=[];let M=0;const T=[],_=n/2;let g=0;A(),a===!1&&(e>0&&C(!0),t>0&&C(!1)),this.setIndex(u),this.setAttribute("position",new Lt(d,3)),this.setAttribute("normal",new Lt(f,3)),this.setAttribute("uv",new Lt(v,2));function A(){const R=new k,D=new k;let P=0;const U=(t-e)/n;for(let y=0;y<=s;y++){const b=[],j=y/s,I=j*(t-e)+e;for(let V=0;V<=r;V++){const $=V/r,q=$*h+o,X=Math.sin(q),Y=Math.cos(q);D.x=I*X,D.y=-j*n+_,D.z=I*Y,d.push(D.x,D.y,D.z),R.set(X,U,Y).normalize(),f.push(R.x,R.y,R.z),v.push($,1-j),b.push(M++)}T.push(b)}for(let y=0;y<r;y++)for(let b=0;b<s;b++){const j=T[b][y],I=T[b+1][y],V=T[b+1][y+1],$=T[b][y+1];(e>0||b!==0)&&(u.push(j,I,$),P+=3),(t>0||b!==s-1)&&(u.push(I,V,$),P+=3)}l.addGroup(g,P,0),g+=P}function C(R){const D=M,P=new lt,U=new k;let y=0;const b=R===!0?e:t,j=R===!0?1:-1;for(let V=1;V<=r;V++)d.push(0,_*j,0),f.push(0,j,0),v.push(.5,.5),M++;const I=M;for(let V=0;V<=r;V++){const q=V/r*h+o,X=Math.cos(q),Y=Math.sin(q);U.x=b*Y,U.y=_*j,U.z=b*X,d.push(U.x,U.y,U.z),f.push(0,j,0),P.x=X*.5+.5,P.y=Y*.5*j+.5,v.push(P.x,P.y),M++}for(let V=0;V<r;V++){const $=D+V,q=I+V;R===!0?u.push(q,q+1,$):u.push(q+1,q,$),y+=3}l.addGroup(g,y,R===!0?1:2),g+=y}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ao(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class wo extends Ao{constructor(e=1,t=1,n=32,r=1,s=!1,a=0,o=Math.PI*2){super(0,e,t,n,r,s,a,o),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:r,openEnded:s,thetaStart:a,thetaLength:o}}static fromJSON(e){return new wo(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Ar extends Kt{constructor(e=1,t=1,n=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};const s=e/2,a=t/2,o=Math.floor(n),h=Math.floor(r),l=o+1,u=h+1,d=e/o,f=t/h,v=[],M=[],T=[],_=[];for(let g=0;g<u;g++){const A=g*f-a;for(let C=0;C<l;C++){const R=C*d-s;M.push(R,-A,0),T.push(0,0,1),_.push(C/o),_.push(1-g/h)}}for(let g=0;g<h;g++)for(let A=0;A<o;A++){const C=A+l*g,R=A+l*(g+1),D=A+1+l*(g+1),P=A+1+l*g;v.push(C,R,P),v.push(R,D,P)}this.setIndex(v),this.setAttribute("position",new Lt(M,3)),this.setAttribute("normal",new Lt(T,3)),this.setAttribute("uv",new Lt(_,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ar(e.width,e.height,e.widthSegments,e.heightSegments)}}class ui extends Kt{constructor(e=1,t=32,n=16,r=0,s=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:r,phiLength:s,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const h=Math.min(a+o,Math.PI);let l=0;const u=[],d=new k,f=new k,v=[],M=[],T=[],_=[];for(let g=0;g<=n;g++){const A=[],C=g/n;let R=0;g===0&&a===0?R=.5/t:g===n&&h===Math.PI&&(R=-.5/t);for(let D=0;D<=t;D++){const P=D/t;d.x=-e*Math.cos(r+P*s)*Math.sin(a+C*o),d.y=e*Math.cos(a+C*o),d.z=e*Math.sin(r+P*s)*Math.sin(a+C*o),M.push(d.x,d.y,d.z),f.copy(d).normalize(),T.push(f.x,f.y,f.z),_.push(P+R,1-C),A.push(l++)}u.push(A)}for(let g=0;g<n;g++)for(let A=0;A<t;A++){const C=u[g][A+1],R=u[g][A],D=u[g+1][A],P=u[g+1][A+1];(g!==0||a>0)&&v.push(C,R,P),(g!==n-1||h<Math.PI)&&v.push(R,D,P)}this.setIndex(v),this.setAttribute("position",new Lt(M,3)),this.setAttribute("normal",new Lt(T,3)),this.setAttribute("uv",new Lt(_,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ui(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}function Vi(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const r=i[t][n];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(Ve("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=r.clone():Array.isArray(r)?e[t][n]=r.slice():e[t][n]=r}}return e}function qt(i){const e={};for(let t=0;t<i.length;t++){const n=Vi(i[t]);for(const r in n)e[r]=n[r]}return e}function $h(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function El(i){const e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:dt.workingColorSpace}const Yh={clone:Vi,merge:qt};var qh=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Zh=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class wn extends Ki{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=qh,this.fragmentShader=Zh,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Vi(e.uniforms),this.uniformsGroups=$h(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const r in this.uniforms){const a=this.uniforms[r].value;a&&a.isTexture?t.uniforms[r]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[r]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[r]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[r]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[r]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[r]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[r]={type:"m4",value:a.toArray()}:t.uniforms[r]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const r in this.extensions)this.extensions[r]===!0&&(n[r]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class jh extends wn{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class vr extends Ki{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new ct(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ct(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=pl,this.normalScale=new lt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new An,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Kh extends Ki{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=ch,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Jh extends Ki{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const ia={enabled:!1,files:{},add:function(i,e){this.enabled!==!1&&(oc(i)||(this.files[i]=e))},get:function(i){if(this.enabled!==!1&&!oc(i))return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}};function oc(i){try{const e=i.slice(i.indexOf(":")+1);return new URL(e).protocol==="blob:"}catch{return!1}}class Qh{constructor(e,t,n){const r=this;let s=!1,a=0,o=0,h;const l=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this._abortController=null,this.itemStart=function(u){o++,s===!1&&r.onStart!==void 0&&r.onStart(u,a,o),s=!0},this.itemEnd=function(u){a++,r.onProgress!==void 0&&r.onProgress(u,a,o),a===o&&(s=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(u){r.onError!==void 0&&r.onError(u)},this.resolveURL=function(u){return h?h(u):u},this.setURLModifier=function(u){return h=u,this},this.addHandler=function(u,d){return l.push(u,d),this},this.removeHandler=function(u){const d=l.indexOf(u);return d!==-1&&l.splice(d,2),this},this.getHandler=function(u){for(let d=0,f=l.length;d<f;d+=2){const v=l[d],M=l[d+1];if(v.global&&(v.lastIndex=0),v.test(u))return M}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}}const eu=new Qh;class Ro{constructor(e){this.manager=e!==void 0?e:eu,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,t){const n=this;return new Promise(function(r,s){n.load(e,r,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}}Ro.DEFAULT_MATERIAL_NAME="__DEFAULT";const Di=new WeakMap;class tu extends Ro{constructor(e){super(e)}load(e,t,n,r){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,a=ia.get(`image:${e}`);if(a!==void 0){if(a.complete===!0)s.manager.itemStart(e),setTimeout(function(){t&&t(a),s.manager.itemEnd(e)},0);else{let d=Di.get(a);d===void 0&&(d=[],Di.set(a,d)),d.push({onLoad:t,onError:r})}return a}const o=yr("img");function h(){u(),t&&t(this);const d=Di.get(this)||[];for(let f=0;f<d.length;f++){const v=d[f];v.onLoad&&v.onLoad(this)}Di.delete(this),s.manager.itemEnd(e)}function l(d){u(),r&&r(d),ia.remove(`image:${e}`);const f=Di.get(this)||[];for(let v=0;v<f.length;v++){const M=f[v];M.onError&&M.onError(d)}Di.delete(this),s.manager.itemError(e),s.manager.itemEnd(e)}function u(){o.removeEventListener("load",h,!1),o.removeEventListener("error",l,!1)}return o.addEventListener("load",h,!1),o.addEventListener("error",l,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),ia.add(`image:${e}`,o),s.manager.itemStart(e),o.src=e,o}}class nu extends Ro{constructor(e){super(e)}load(e,t,n,r){const s=new Ht,a=new tu(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(o){s.image=o,s.needsUpdate=!0,t!==void 0&&t(s)},n,r),s}}class Co extends Bt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new ct(e),this.intensity=t}dispose(){this.dispatchEvent({type:"dispose"})}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}}class iu extends Co{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Bt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new ct(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){const t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}}const ra=new bt,lc=new k,hc=new k;class ru{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new lt(512,512),this.mapType=rn,this.map=null,this.mapPass=null,this.matrix=new bt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new To,this._frameExtents=new lt(1,1),this._viewportCount=1,this._viewports=[new Ct(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;lc.setFromMatrixPosition(e.matrixWorld),t.position.copy(lc),hc.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(hc),t.updateMatrixWorld(),ra.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(ra,t.coordinateSystem,t.reversedDepth),t.coordinateSystem===Sr||t.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(ra)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const jr=new k,Kr=new ji,gn=new k;class Tl extends Bt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new bt,this.projectionMatrix=new bt,this.projectionMatrixInverse=new bt,this.coordinateSystem=Sn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(jr,Kr,gn),gn.x===1&&gn.y===1&&gn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(jr,Kr,gn.set(1,1,1)).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorld.decompose(jr,Kr,gn),gn.x===1&&gn.y===1&&gn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(jr,Kr,gn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const $n=new k,uc=new lt,fc=new lt;class an extends Tl{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=io*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Ds*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return io*2*Math.atan(Math.tan(Ds*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){$n.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set($n.x,$n.y).multiplyScalar(-e/$n.z),$n.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set($n.x,$n.y).multiplyScalar(-e/$n.z)}getViewSize(e,t){return this.getViewBounds(e,uc,fc),t.subVectors(fc,uc)}setViewOffset(e,t,n,r,s,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Ds*.5*this.fov)/this.zoom,n=2*t,r=this.aspect*n,s=-.5*r;const a=this.view;if(this.view!==null&&this.view.enabled){const h=a.fullWidth,l=a.fullHeight;s+=a.offsetX*r/h,t-=a.offsetY*n/l,r*=a.width/h,n*=a.height/l}const o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}class Po extends Tl{constructor(e=-1,t=1,n=1,r=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=n-e,a=n+e,o=r+t,h=r-t;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=l*this.view.offsetX,a=s+l*this.view.width,o-=u*this.view.offsetY,h=o-u*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,h,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class su extends ru{constructor(){super(new Po(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class au extends Co{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Bt.DEFAULT_UP),this.updateMatrix(),this.target=new Bt,this.shadow=new su}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}}class ou extends Co{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}const Li=-90,Ui=1;class cu extends Bt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new an(Li,Ui,e,t);r.layers=this.layers,this.add(r);const s=new an(Li,Ui,e,t);s.layers=this.layers,this.add(s);const a=new an(Li,Ui,e,t);a.layers=this.layers,this.add(a);const o=new an(Li,Ui,e,t);o.layers=this.layers,this.add(o);const h=new an(Li,Ui,e,t);h.layers=this.layers,this.add(h);const l=new an(Li,Ui,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,r,s,a,o,h]=t;for(const l of t)this.remove(l);if(e===Sn)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),h.up.set(0,1,0),h.lookAt(0,0,-1);else if(e===Sr)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),h.up.set(0,-1,0),h.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,a,o,h,l,u]=this.children,d=e.getRenderTarget(),f=e.getActiveCubeFace(),v=e.getActiveMipmapLevel(),M=e.xr.enabled;e.xr.enabled=!1;const T=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let _=!1;e.isWebGLRenderer===!0?_=e.state.buffers.depth.getReversed():_=e.reversedDepthBuffer,e.setRenderTarget(n,0,r),_&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(n,1,r),_&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,r),_&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,r),_&&e.autoClear===!1&&e.clearDepth(),e.render(t,h),e.setRenderTarget(n,4,r),_&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),n.texture.generateMipmaps=T,e.setRenderTarget(n,5,r),_&&e.autoClear===!1&&e.clearDepth(),e.render(t,u),e.setRenderTarget(d,f,v),e.xr.enabled=M,n.texture.needsPMREMUpdate=!0}}class lu extends an{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}const dc=new bt;class hu{constructor(e,t,n=0,r=1/0){this.ray=new Eo(e,t),this.near=n,this.far=r,this.camera=null,this.layers=new yo,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):ft("Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return dc.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(dc),this}intersectObject(e,t=!0,n=[]){return ro(e,this,n,t),n.sort(pc),n}intersectObjects(e,t=!0,n=[]){for(let r=0,s=e.length;r<s;r++)ro(e[r],this,n,t);return n.sort(pc),n}}function pc(i,e){return i.distance-e.distance}function ro(i,e,t,n){let r=!0;if(i.layers.test(e.layers)&&i.raycast(e,t)===!1&&(r=!1),r===!0&&n===!0){const s=i.children;for(let a=0,o=s.length;a<o;a++)ro(s[a],e,t,!0)}}function mc(i,e,t,n){const r=uu(n);switch(t){case ul:return i*e;case dl:return i*e/r.components*r.byteLength;case go:return i*e/r.components*r.byteLength;case zi:return i*e*2/r.components*r.byteLength;case _o:return i*e*2/r.components*r.byteLength;case fl:return i*e*3/r.components*r.byteLength;case dn:return i*e*4/r.components*r.byteLength;case vo:return i*e*4/r.components*r.byteLength;case is:case rs:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case ss:case as:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Aa:case Ra:return Math.max(i,16)*Math.max(e,8)/4;case ba:case wa:return Math.max(i,8)*Math.max(e,8)/2;case Ca:case Pa:case Da:case La:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Ia:case Ua:case Na:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Oa:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Fa:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case Ba:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case Wa:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case Ga:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case Ha:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case za:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case ka:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case Va:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case Xa:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case $a:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case Ya:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case qa:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case Za:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case ja:case Ka:case Ja:return Math.ceil(i/4)*Math.ceil(e/4)*16;case Qa:case eo:return Math.ceil(i/4)*Math.ceil(e/4)*8;case to:case no:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function uu(i){switch(i){case rn:case ol:return{byteLength:1,components:1};case xr:case cl:case Fn:return{byteLength:2,components:1};case po:case mo:return{byteLength:2,components:4};case bn:case fo:case Mn:return{byteLength:4,components:1};case ll:case hl:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:ho}}));typeof window<"u"&&(window.__THREE__?Ve("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=ho);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function bl(){let i=null,e=!1,t=null,n=null;function r(s,a){t(s,a),n=i.requestAnimationFrame(r)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(r),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){i=s}}}function fu(i){const e=new WeakMap;function t(o,h){const l=o.array,u=o.usage,d=l.byteLength,f=i.createBuffer();i.bindBuffer(h,f),i.bufferData(h,l,u),o.onUploadCallback();let v;if(l instanceof Float32Array)v=i.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)v=i.HALF_FLOAT;else if(l instanceof Uint16Array)o.isFloat16BufferAttribute?v=i.HALF_FLOAT:v=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)v=i.SHORT;else if(l instanceof Uint32Array)v=i.UNSIGNED_INT;else if(l instanceof Int32Array)v=i.INT;else if(l instanceof Int8Array)v=i.BYTE;else if(l instanceof Uint8Array)v=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)v=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:f,type:v,bytesPerElement:l.BYTES_PER_ELEMENT,version:o.version,size:d}}function n(o,h,l){const u=h.array,d=h.updateRanges;if(i.bindBuffer(l,o),d.length===0)i.bufferSubData(l,0,u);else{d.sort((v,M)=>v.start-M.start);let f=0;for(let v=1;v<d.length;v++){const M=d[f],T=d[v];T.start<=M.start+M.count+1?M.count=Math.max(M.count,T.start+T.count-M.start):(++f,d[f]=T)}d.length=f+1;for(let v=0,M=d.length;v<M;v++){const T=d[v];i.bufferSubData(l,T.start*u.BYTES_PER_ELEMENT,u,T.start,T.count)}h.clearUpdateRanges()}h.onUploadCallback()}function r(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function s(o){o.isInterleavedBufferAttribute&&(o=o.data);const h=e.get(o);h&&(i.deleteBuffer(h.buffer),e.delete(o))}function a(o,h){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const u=e.get(o);(!u||u.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const l=e.get(o);if(l===void 0)e.set(o,t(o,h));else if(l.version<o.version){if(l.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,o,h),l.version=o.version}}return{get:r,remove:s,update:a}}var du=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,pu=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,mu=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,gu=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,_u=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,vu=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,xu=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Mu=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Su=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,yu=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Eu=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Tu=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,bu=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Au=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,wu=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Ru=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Cu=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Pu=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Iu=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Du=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,Lu=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Uu=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,Nu=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,Ou=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Fu=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Bu=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Wu=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Gu=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Hu=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,zu=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,ku="gl_FragColor = linearToOutputTexel( gl_FragColor );",Vu=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Xu=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,$u=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,Yu=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,qu=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Zu=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,ju=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Ku=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Ju=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Qu=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,ef=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,tf=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,nf=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,rf=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,sf=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,af=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,of=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,cf=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,lf=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,hf=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,uf=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,ff=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
		vec3 iridescenceFresnelDielectric;
		vec3 iridescenceFresnelMetallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return v;
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
vec3 BRDF_GGX_Multiscatter( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 singleScatter = BRDF_GGX( lightDir, viewDir, normal, material );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 dfgV = texture2D( dfgLUT, vec2( material.roughness, dotNV ) ).rg;
	vec2 dfgL = texture2D( dfgLUT, vec2( material.roughness, dotNL ) ).rg;
	vec3 FssEss_V = material.specularColorBlended * dfgV.x + material.specularF90 * dfgV.y;
	vec3 FssEss_L = material.specularColorBlended * dfgL.x + material.specularF90 * dfgL.y;
	float Ess_V = dfgV.x + dfgV.y;
	float Ess_L = dfgL.x + dfgL.y;
	float Ems_V = 1.0 - Ess_V;
	float Ems_L = 1.0 - Ess_L;
	vec3 Favg = material.specularColorBlended + ( 1.0 - material.specularColorBlended ) * 0.047619;
	vec3 Fms = FssEss_V * FssEss_L * Favg / ( 1.0 - Ems_V * Ems_L * Favg + EPSILON );
	float compensationFactor = Ems_V * Ems_L;
	vec3 multiScatter = Fms * compensationFactor;
	return singleScatter + multiScatter;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX_Multiscatter( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnelDielectric, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceFresnelMetallic, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,df=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( material.iridescenceFresnelDielectric, material.iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,pf=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,mf=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,gf=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,_f=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,vf=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,xf=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Mf=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Sf=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,yf=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Ef=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Tf=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,bf=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Af=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,wf=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Rf=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Cf=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Pf=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,If=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Df=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Lf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Uf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Nf=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Of=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Ff=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Bf=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Wf=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Gf=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Hf=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,zf=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,kf=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Vf=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Xf=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,$f=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Yf=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,qf=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Zf=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,jf=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Kf=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Jf=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Qf=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,ed=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,td=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,nd=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,id=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,rd=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,sd=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,ad=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,od=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,cd=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,ld=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,hd=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,ud=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,fd=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const dd=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,pd=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,md=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,gd=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,_d=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,vd=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,xd=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Md=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Sd=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,yd=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,Ed=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Td=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,bd=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Ad=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,wd=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Rd=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Cd=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Pd=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Id=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Dd=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Ld=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Ud=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Nd=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Od=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Fd=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Bd=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Wd=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Gd=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Hd=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,zd=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,kd=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Vd=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Xd=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,$d=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,tt={alphahash_fragment:du,alphahash_pars_fragment:pu,alphamap_fragment:mu,alphamap_pars_fragment:gu,alphatest_fragment:_u,alphatest_pars_fragment:vu,aomap_fragment:xu,aomap_pars_fragment:Mu,batching_pars_vertex:Su,batching_vertex:yu,begin_vertex:Eu,beginnormal_vertex:Tu,bsdfs:bu,iridescence_fragment:Au,bumpmap_pars_fragment:wu,clipping_planes_fragment:Ru,clipping_planes_pars_fragment:Cu,clipping_planes_pars_vertex:Pu,clipping_planes_vertex:Iu,color_fragment:Du,color_pars_fragment:Lu,color_pars_vertex:Uu,color_vertex:Nu,common:Ou,cube_uv_reflection_fragment:Fu,defaultnormal_vertex:Bu,displacementmap_pars_vertex:Wu,displacementmap_vertex:Gu,emissivemap_fragment:Hu,emissivemap_pars_fragment:zu,colorspace_fragment:ku,colorspace_pars_fragment:Vu,envmap_fragment:Xu,envmap_common_pars_fragment:$u,envmap_pars_fragment:Yu,envmap_pars_vertex:qu,envmap_physical_pars_fragment:af,envmap_vertex:Zu,fog_vertex:ju,fog_pars_vertex:Ku,fog_fragment:Ju,fog_pars_fragment:Qu,gradientmap_pars_fragment:ef,lightmap_pars_fragment:tf,lights_lambert_fragment:nf,lights_lambert_pars_fragment:rf,lights_pars_begin:sf,lights_toon_fragment:of,lights_toon_pars_fragment:cf,lights_phong_fragment:lf,lights_phong_pars_fragment:hf,lights_physical_fragment:uf,lights_physical_pars_fragment:ff,lights_fragment_begin:df,lights_fragment_maps:pf,lights_fragment_end:mf,logdepthbuf_fragment:gf,logdepthbuf_pars_fragment:_f,logdepthbuf_pars_vertex:vf,logdepthbuf_vertex:xf,map_fragment:Mf,map_pars_fragment:Sf,map_particle_fragment:yf,map_particle_pars_fragment:Ef,metalnessmap_fragment:Tf,metalnessmap_pars_fragment:bf,morphinstance_vertex:Af,morphcolor_vertex:wf,morphnormal_vertex:Rf,morphtarget_pars_vertex:Cf,morphtarget_vertex:Pf,normal_fragment_begin:If,normal_fragment_maps:Df,normal_pars_fragment:Lf,normal_pars_vertex:Uf,normal_vertex:Nf,normalmap_pars_fragment:Of,clearcoat_normal_fragment_begin:Ff,clearcoat_normal_fragment_maps:Bf,clearcoat_pars_fragment:Wf,iridescence_pars_fragment:Gf,opaque_fragment:Hf,packing:zf,premultiplied_alpha_fragment:kf,project_vertex:Vf,dithering_fragment:Xf,dithering_pars_fragment:$f,roughnessmap_fragment:Yf,roughnessmap_pars_fragment:qf,shadowmap_pars_fragment:Zf,shadowmap_pars_vertex:jf,shadowmap_vertex:Kf,shadowmask_pars_fragment:Jf,skinbase_vertex:Qf,skinning_pars_vertex:ed,skinning_vertex:td,skinnormal_vertex:nd,specularmap_fragment:id,specularmap_pars_fragment:rd,tonemapping_fragment:sd,tonemapping_pars_fragment:ad,transmission_fragment:od,transmission_pars_fragment:cd,uv_pars_fragment:ld,uv_pars_vertex:hd,uv_vertex:ud,worldpos_vertex:fd,background_vert:dd,background_frag:pd,backgroundCube_vert:md,backgroundCube_frag:gd,cube_vert:_d,cube_frag:vd,depth_vert:xd,depth_frag:Md,distance_vert:Sd,distance_frag:yd,equirect_vert:Ed,equirect_frag:Td,linedashed_vert:bd,linedashed_frag:Ad,meshbasic_vert:wd,meshbasic_frag:Rd,meshlambert_vert:Cd,meshlambert_frag:Pd,meshmatcap_vert:Id,meshmatcap_frag:Dd,meshnormal_vert:Ld,meshnormal_frag:Ud,meshphong_vert:Nd,meshphong_frag:Od,meshphysical_vert:Fd,meshphysical_frag:Bd,meshtoon_vert:Wd,meshtoon_frag:Gd,points_vert:Hd,points_frag:zd,shadow_vert:kd,shadow_frag:Vd,sprite_vert:Xd,sprite_frag:$d},ve={common:{diffuse:{value:new ct(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ke},alphaMap:{value:null},alphaMapTransform:{value:new Ke},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ke}},envmap:{envMap:{value:null},envMapRotation:{value:new Ke},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ke}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ke}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ke},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ke},normalScale:{value:new lt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ke},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ke}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ke}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ke}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ct(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new ct(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ke},alphaTest:{value:0},uvTransform:{value:new Ke}},sprite:{diffuse:{value:new ct(16777215)},opacity:{value:1},center:{value:new lt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ke},alphaMap:{value:null},alphaMapTransform:{value:new Ke},alphaTest:{value:0}}},xn={basic:{uniforms:qt([ve.common,ve.specularmap,ve.envmap,ve.aomap,ve.lightmap,ve.fog]),vertexShader:tt.meshbasic_vert,fragmentShader:tt.meshbasic_frag},lambert:{uniforms:qt([ve.common,ve.specularmap,ve.envmap,ve.aomap,ve.lightmap,ve.emissivemap,ve.bumpmap,ve.normalmap,ve.displacementmap,ve.fog,ve.lights,{emissive:{value:new ct(0)},envMapIntensity:{value:1}}]),vertexShader:tt.meshlambert_vert,fragmentShader:tt.meshlambert_frag},phong:{uniforms:qt([ve.common,ve.specularmap,ve.envmap,ve.aomap,ve.lightmap,ve.emissivemap,ve.bumpmap,ve.normalmap,ve.displacementmap,ve.fog,ve.lights,{emissive:{value:new ct(0)},specular:{value:new ct(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:tt.meshphong_vert,fragmentShader:tt.meshphong_frag},standard:{uniforms:qt([ve.common,ve.envmap,ve.aomap,ve.lightmap,ve.emissivemap,ve.bumpmap,ve.normalmap,ve.displacementmap,ve.roughnessmap,ve.metalnessmap,ve.fog,ve.lights,{emissive:{value:new ct(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:tt.meshphysical_vert,fragmentShader:tt.meshphysical_frag},toon:{uniforms:qt([ve.common,ve.aomap,ve.lightmap,ve.emissivemap,ve.bumpmap,ve.normalmap,ve.displacementmap,ve.gradientmap,ve.fog,ve.lights,{emissive:{value:new ct(0)}}]),vertexShader:tt.meshtoon_vert,fragmentShader:tt.meshtoon_frag},matcap:{uniforms:qt([ve.common,ve.bumpmap,ve.normalmap,ve.displacementmap,ve.fog,{matcap:{value:null}}]),vertexShader:tt.meshmatcap_vert,fragmentShader:tt.meshmatcap_frag},points:{uniforms:qt([ve.points,ve.fog]),vertexShader:tt.points_vert,fragmentShader:tt.points_frag},dashed:{uniforms:qt([ve.common,ve.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:tt.linedashed_vert,fragmentShader:tt.linedashed_frag},depth:{uniforms:qt([ve.common,ve.displacementmap]),vertexShader:tt.depth_vert,fragmentShader:tt.depth_frag},normal:{uniforms:qt([ve.common,ve.bumpmap,ve.normalmap,ve.displacementmap,{opacity:{value:1}}]),vertexShader:tt.meshnormal_vert,fragmentShader:tt.meshnormal_frag},sprite:{uniforms:qt([ve.sprite,ve.fog]),vertexShader:tt.sprite_vert,fragmentShader:tt.sprite_frag},background:{uniforms:{uvTransform:{value:new Ke},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:tt.background_vert,fragmentShader:tt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ke}},vertexShader:tt.backgroundCube_vert,fragmentShader:tt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:tt.cube_vert,fragmentShader:tt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:tt.equirect_vert,fragmentShader:tt.equirect_frag},distance:{uniforms:qt([ve.common,ve.displacementmap,{referencePosition:{value:new k},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:tt.distance_vert,fragmentShader:tt.distance_frag},shadow:{uniforms:qt([ve.lights,ve.fog,{color:{value:new ct(0)},opacity:{value:1}}]),vertexShader:tt.shadow_vert,fragmentShader:tt.shadow_frag}};xn.physical={uniforms:qt([xn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ke},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ke},clearcoatNormalScale:{value:new lt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ke},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ke},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ke},sheen:{value:0},sheenColor:{value:new ct(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ke},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ke},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ke},transmissionSamplerSize:{value:new lt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ke},attenuationDistance:{value:0},attenuationColor:{value:new ct(0)},specularColor:{value:new ct(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ke},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ke},anisotropyVector:{value:new lt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ke}}]),vertexShader:tt.meshphysical_vert,fragmentShader:tt.meshphysical_frag};const Jr={r:0,b:0,g:0},ai=new An,Yd=new bt;function qd(i,e,t,n,r,s){const a=new ct(0);let o=r===!0?0:1,h,l,u=null,d=0,f=null;function v(A){let C=A.isScene===!0?A.background:null;if(C&&C.isTexture){const R=A.backgroundBlurriness>0;C=e.get(C,R)}return C}function M(A){let C=!1;const R=v(A);R===null?_(a,o):R&&R.isColor&&(_(R,1),C=!0);const D=i.xr.getEnvironmentBlendMode();D==="additive"?t.buffers.color.setClear(0,0,0,1,s):D==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,s),(i.autoClear||C)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function T(A,C){const R=v(C);R&&(R.isCubeTexture||R.mapping===gs)?(l===void 0&&(l=new It(new Ji(1,1,1),new wn({name:"BackgroundCubeMaterial",uniforms:Vi(xn.backgroundCube.uniforms),vertexShader:xn.backgroundCube.vertexShader,fragmentShader:xn.backgroundCube.fragmentShader,side:jt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(D,P,U){this.matrixWorld.copyPosition(U.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(l)),ai.copy(C.backgroundRotation),ai.x*=-1,ai.y*=-1,ai.z*=-1,R.isCubeTexture&&R.isRenderTargetTexture===!1&&(ai.y*=-1,ai.z*=-1),l.material.uniforms.envMap.value=R,l.material.uniforms.flipEnvMap.value=R.isCubeTexture&&R.isRenderTargetTexture===!1?-1:1,l.material.uniforms.backgroundBlurriness.value=C.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=C.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(Yd.makeRotationFromEuler(ai)),l.material.toneMapped=dt.getTransfer(R.colorSpace)!==gt,(u!==R||d!==R.version||f!==i.toneMapping)&&(l.material.needsUpdate=!0,u=R,d=R.version,f=i.toneMapping),l.layers.enableAll(),A.unshift(l,l.geometry,l.material,0,0,null)):R&&R.isTexture&&(h===void 0&&(h=new It(new Ar(2,2),new wn({name:"BackgroundMaterial",uniforms:Vi(xn.background.uniforms),vertexShader:xn.background.vertexShader,fragmentShader:xn.background.fragmentShader,side:Jn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),h.geometry.deleteAttribute("normal"),Object.defineProperty(h.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(h)),h.material.uniforms.t2D.value=R,h.material.uniforms.backgroundIntensity.value=C.backgroundIntensity,h.material.toneMapped=dt.getTransfer(R.colorSpace)!==gt,R.matrixAutoUpdate===!0&&R.updateMatrix(),h.material.uniforms.uvTransform.value.copy(R.matrix),(u!==R||d!==R.version||f!==i.toneMapping)&&(h.material.needsUpdate=!0,u=R,d=R.version,f=i.toneMapping),h.layers.enableAll(),A.unshift(h,h.geometry,h.material,0,0,null))}function _(A,C){A.getRGB(Jr,El(i)),t.buffers.color.setClear(Jr.r,Jr.g,Jr.b,C,s)}function g(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),h!==void 0&&(h.geometry.dispose(),h.material.dispose(),h=void 0)}return{getClearColor:function(){return a},setClearColor:function(A,C=1){a.set(A),o=C,_(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(A){o=A,_(a,o)},render:M,addToRenderList:T,dispose:g}}function Zd(i,e){const t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},r=f(null);let s=r,a=!1;function o(I,V,$,q,X){let Y=!1;const H=d(I,q,$,V);s!==H&&(s=H,l(s.object)),Y=v(I,q,$,X),Y&&M(I,q,$,X),X!==null&&e.update(X,i.ELEMENT_ARRAY_BUFFER),(Y||a)&&(a=!1,R(I,V,$,q),X!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(X).buffer))}function h(){return i.createVertexArray()}function l(I){return i.bindVertexArray(I)}function u(I){return i.deleteVertexArray(I)}function d(I,V,$,q){const X=q.wireframe===!0;let Y=n[V.id];Y===void 0&&(Y={},n[V.id]=Y);const H=I.isInstancedMesh===!0?I.id:0;let ae=Y[H];ae===void 0&&(ae={},Y[H]=ae);let ne=ae[$.id];ne===void 0&&(ne={},ae[$.id]=ne);let xe=ne[X];return xe===void 0&&(xe=f(h()),ne[X]=xe),xe}function f(I){const V=[],$=[],q=[];for(let X=0;X<t;X++)V[X]=0,$[X]=0,q[X]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:V,enabledAttributes:$,attributeDivisors:q,object:I,attributes:{},index:null}}function v(I,V,$,q){const X=s.attributes,Y=V.attributes;let H=0;const ae=$.getAttributes();for(const ne in ae)if(ae[ne].location>=0){const Se=X[ne];let ye=Y[ne];if(ye===void 0&&(ne==="instanceMatrix"&&I.instanceMatrix&&(ye=I.instanceMatrix),ne==="instanceColor"&&I.instanceColor&&(ye=I.instanceColor)),Se===void 0||Se.attribute!==ye||ye&&Se.data!==ye.data)return!0;H++}return s.attributesNum!==H||s.index!==q}function M(I,V,$,q){const X={},Y=V.attributes;let H=0;const ae=$.getAttributes();for(const ne in ae)if(ae[ne].location>=0){let Se=Y[ne];Se===void 0&&(ne==="instanceMatrix"&&I.instanceMatrix&&(Se=I.instanceMatrix),ne==="instanceColor"&&I.instanceColor&&(Se=I.instanceColor));const ye={};ye.attribute=Se,Se&&Se.data&&(ye.data=Se.data),X[ne]=ye,H++}s.attributes=X,s.attributesNum=H,s.index=q}function T(){const I=s.newAttributes;for(let V=0,$=I.length;V<$;V++)I[V]=0}function _(I){g(I,0)}function g(I,V){const $=s.newAttributes,q=s.enabledAttributes,X=s.attributeDivisors;$[I]=1,q[I]===0&&(i.enableVertexAttribArray(I),q[I]=1),X[I]!==V&&(i.vertexAttribDivisor(I,V),X[I]=V)}function A(){const I=s.newAttributes,V=s.enabledAttributes;for(let $=0,q=V.length;$<q;$++)V[$]!==I[$]&&(i.disableVertexAttribArray($),V[$]=0)}function C(I,V,$,q,X,Y,H){H===!0?i.vertexAttribIPointer(I,V,$,X,Y):i.vertexAttribPointer(I,V,$,q,X,Y)}function R(I,V,$,q){T();const X=q.attributes,Y=$.getAttributes(),H=V.defaultAttributeValues;for(const ae in Y){const ne=Y[ae];if(ne.location>=0){let xe=X[ae];if(xe===void 0&&(ae==="instanceMatrix"&&I.instanceMatrix&&(xe=I.instanceMatrix),ae==="instanceColor"&&I.instanceColor&&(xe=I.instanceColor)),xe!==void 0){const Se=xe.normalized,ye=xe.itemSize,$e=e.get(xe);if($e===void 0)continue;const yt=$e.buffer,xt=$e.type,Q=$e.bytesPerElement,fe=xt===i.INT||xt===i.UNSIGNED_INT||xe.gpuType===fo;if(xe.isInterleavedBufferAttribute){const de=xe.data,Xe=de.stride,Oe=xe.offset;if(de.isInstancedInterleavedBuffer){for(let Ge=0;Ge<ne.locationSize;Ge++)g(ne.location+Ge,de.meshPerAttribute);I.isInstancedMesh!==!0&&q._maxInstanceCount===void 0&&(q._maxInstanceCount=de.meshPerAttribute*de.count)}else for(let Ge=0;Ge<ne.locationSize;Ge++)_(ne.location+Ge);i.bindBuffer(i.ARRAY_BUFFER,yt);for(let Ge=0;Ge<ne.locationSize;Ge++)C(ne.location+Ge,ye/ne.locationSize,xt,Se,Xe*Q,(Oe+ye/ne.locationSize*Ge)*Q,fe)}else{if(xe.isInstancedBufferAttribute){for(let de=0;de<ne.locationSize;de++)g(ne.location+de,xe.meshPerAttribute);I.isInstancedMesh!==!0&&q._maxInstanceCount===void 0&&(q._maxInstanceCount=xe.meshPerAttribute*xe.count)}else for(let de=0;de<ne.locationSize;de++)_(ne.location+de);i.bindBuffer(i.ARRAY_BUFFER,yt);for(let de=0;de<ne.locationSize;de++)C(ne.location+de,ye/ne.locationSize,xt,Se,ye*Q,ye/ne.locationSize*de*Q,fe)}}else if(H!==void 0){const Se=H[ae];if(Se!==void 0)switch(Se.length){case 2:i.vertexAttrib2fv(ne.location,Se);break;case 3:i.vertexAttrib3fv(ne.location,Se);break;case 4:i.vertexAttrib4fv(ne.location,Se);break;default:i.vertexAttrib1fv(ne.location,Se)}}}}A()}function D(){b();for(const I in n){const V=n[I];for(const $ in V){const q=V[$];for(const X in q){const Y=q[X];for(const H in Y)u(Y[H].object),delete Y[H];delete q[X]}}delete n[I]}}function P(I){if(n[I.id]===void 0)return;const V=n[I.id];for(const $ in V){const q=V[$];for(const X in q){const Y=q[X];for(const H in Y)u(Y[H].object),delete Y[H];delete q[X]}}delete n[I.id]}function U(I){for(const V in n){const $=n[V];for(const q in $){const X=$[q];if(X[I.id]===void 0)continue;const Y=X[I.id];for(const H in Y)u(Y[H].object),delete Y[H];delete X[I.id]}}}function y(I){for(const V in n){const $=n[V],q=I.isInstancedMesh===!0?I.id:0,X=$[q];if(X!==void 0){for(const Y in X){const H=X[Y];for(const ae in H)u(H[ae].object),delete H[ae];delete X[Y]}delete $[q],Object.keys($).length===0&&delete n[V]}}}function b(){j(),a=!0,s!==r&&(s=r,l(s.object))}function j(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:o,reset:b,resetDefaultState:j,dispose:D,releaseStatesOfGeometry:P,releaseStatesOfObject:y,releaseStatesOfProgram:U,initAttributes:T,enableAttribute:_,disableUnusedAttributes:A}}function jd(i,e,t){let n;function r(l){n=l}function s(l,u){i.drawArrays(n,l,u),t.update(u,n,1)}function a(l,u,d){d!==0&&(i.drawArraysInstanced(n,l,u,d),t.update(u,n,d))}function o(l,u,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,u,0,d);let v=0;for(let M=0;M<d;M++)v+=u[M];t.update(v,n,1)}function h(l,u,d,f){if(d===0)return;const v=e.get("WEBGL_multi_draw");if(v===null)for(let M=0;M<l.length;M++)a(l[M],u[M],f[M]);else{v.multiDrawArraysInstancedWEBGL(n,l,0,u,0,f,0,d);let M=0;for(let T=0;T<d;T++)M+=u[T]*f[T];t.update(M,n,1)}}this.setMode=r,this.render=s,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=h}function Kd(i,e,t,n){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){const U=e.get("EXT_texture_filter_anisotropic");r=i.getParameter(U.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function a(U){return!(U!==dn&&n.convert(U)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(U){const y=U===Fn&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(U!==rn&&n.convert(U)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&U!==Mn&&!y)}function h(U){if(U==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";U="mediump"}return U==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp";const u=h(l);u!==l&&(Ve("WebGLRenderer:",l,"not supported, using",u,"instead."),l=u);const d=t.logarithmicDepthBuffer===!0,f=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),v=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),M=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),T=i.getParameter(i.MAX_TEXTURE_SIZE),_=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),g=i.getParameter(i.MAX_VERTEX_ATTRIBS),A=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),C=i.getParameter(i.MAX_VARYING_VECTORS),R=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),D=i.getParameter(i.MAX_SAMPLES),P=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:h,textureFormatReadable:a,textureTypeReadable:o,precision:l,logarithmicDepthBuffer:d,reversedDepthBuffer:f,maxTextures:v,maxVertexTextures:M,maxTextureSize:T,maxCubemapSize:_,maxAttributes:g,maxVertexUniforms:A,maxVaryings:C,maxFragmentUniforms:R,maxSamples:D,samples:P}}function Jd(i){const e=this;let t=null,n=0,r=!1,s=!1;const a=new li,o=new Ke,h={value:null,needsUpdate:!1};this.uniform=h,this.numPlanes=0,this.numIntersection=0,this.init=function(d,f){const v=d.length!==0||f||n!==0||r;return r=f,n=d.length,v},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(d,f){t=u(d,f,0)},this.setState=function(d,f,v){const M=d.clippingPlanes,T=d.clipIntersection,_=d.clipShadows,g=i.get(d);if(!r||M===null||M.length===0||s&&!_)s?u(null):l();else{const A=s?0:n,C=A*4;let R=g.clippingState||null;h.value=R,R=u(M,f,C,v);for(let D=0;D!==C;++D)R[D]=t[D];g.clippingState=R,this.numIntersection=T?this.numPlanes:0,this.numPlanes+=A}};function l(){h.value!==t&&(h.value=t,h.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function u(d,f,v,M){const T=d!==null?d.length:0;let _=null;if(T!==0){if(_=h.value,M!==!0||_===null){const g=v+T*4,A=f.matrixWorldInverse;o.getNormalMatrix(A),(_===null||_.length<g)&&(_=new Float32Array(g));for(let C=0,R=v;C!==T;++C,R+=4)a.copy(d[C]).applyMatrix4(A,o),a.normal.toArray(_,R),_[R+3]=a.constant}h.value=_,h.needsUpdate=!0}return e.numPlanes=T,e.numIntersection=0,_}}const jn=4,gc=[.125,.215,.35,.446,.526,.582],fi=20,Qd=256,or=new Po,_c=new ct;let sa=null,aa=0,oa=0,ca=!1;const ep=new k;class vc{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,r=100,s={}){const{size:a=256,position:o=ep}=s;sa=this._renderer.getRenderTarget(),aa=this._renderer.getActiveCubeFace(),oa=this._renderer.getActiveMipmapLevel(),ca=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const h=this._allocateTargets();return h.depthBuffer=!0,this._sceneToCubeUV(e,n,r,h,o),t>0&&this._blur(h,0,0,t),this._applyPMREM(h),this._cleanup(h),h}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Sc(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Mc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(sa,aa,oa),this._renderer.xr.enabled=ca,e.scissorTest=!1,Ni(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===gi||e.mapping===Hi?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),sa=this._renderer.getRenderTarget(),aa=this._renderer.getActiveCubeFace(),oa=this._renderer.getActiveMipmapLevel(),ca=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Yt,minFilter:Yt,generateMipmaps:!1,type:Fn,format:dn,colorSpace:ki,depthBuffer:!1},r=xc(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=xc(e,t,n);const{_lodMax:s}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=tp(s)),this._blurMaterial=ip(s,e,t),this._ggxMaterial=np(s,e,t)}return r}_compileMaterial(e){const t=new It(new Kt,e);this._renderer.compile(t,or)}_sceneToCubeUV(e,t,n,r,s){const h=new an(90,1,t,n),l=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],d=this._renderer,f=d.autoClear,v=d.toneMapping;d.getClearColor(_c),d.toneMapping=yn,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(r),d.clearDepth(),d.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new It(new Ji,new fs({name:"PMREM.Background",side:jt,depthWrite:!1,depthTest:!1})));const T=this._backgroundBox,_=T.material;let g=!1;const A=e.background;A?A.isColor&&(_.color.copy(A),e.background=null,g=!0):(_.color.copy(_c),g=!0);for(let C=0;C<6;C++){const R=C%3;R===0?(h.up.set(0,l[C],0),h.position.set(s.x,s.y,s.z),h.lookAt(s.x+u[C],s.y,s.z)):R===1?(h.up.set(0,0,l[C]),h.position.set(s.x,s.y,s.z),h.lookAt(s.x,s.y+u[C],s.z)):(h.up.set(0,l[C],0),h.position.set(s.x,s.y,s.z),h.lookAt(s.x,s.y,s.z+u[C]));const D=this._cubeSize;Ni(r,R*D,C>2?D:0,D,D),d.setRenderTarget(r),g&&d.render(T,h),d.render(e,h)}d.toneMapping=v,d.autoClear=f,e.background=A}_textureToCubeUV(e,t){const n=this._renderer,r=e.mapping===gi||e.mapping===Hi;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Sc()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Mc());const s=r?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=s;const o=s.uniforms;o.envMap.value=e;const h=this._cubeSize;Ni(t,0,0,3*h,2*h),n.setRenderTarget(t),n.render(a,or)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const r=this._lodMeshes.length;for(let s=1;s<r;s++)this._applyGGXFilter(e,s-1,s);t.autoClear=n}_applyGGXFilter(e,t,n){const r=this._renderer,s=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;const h=a.uniforms,l=n/(this._lodMeshes.length-1),u=t/(this._lodMeshes.length-1),d=Math.sqrt(l*l-u*u),f=0+l*1.25,v=d*f,{_lodMax:M}=this,T=this._sizeLods[n],_=3*T*(n>M-jn?n-M+jn:0),g=4*(this._cubeSize-T);h.envMap.value=e.texture,h.roughness.value=v,h.mipInt.value=M-t,Ni(s,_,g,3*T,2*T),r.setRenderTarget(s),r.render(o,or),h.envMap.value=s.texture,h.roughness.value=0,h.mipInt.value=M-n,Ni(e,_,g,3*T,2*T),r.setRenderTarget(e),r.render(o,or)}_blur(e,t,n,r,s){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,r,"latitudinal",s),this._halfBlur(a,e,n,n,r,"longitudinal",s)}_halfBlur(e,t,n,r,s,a,o){const h=this._renderer,l=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&ft("blur direction must be either latitudinal or longitudinal!");const u=3,d=this._lodMeshes[r];d.material=l;const f=l.uniforms,v=this._sizeLods[n]-1,M=isFinite(s)?Math.PI/(2*v):2*Math.PI/(2*fi-1),T=s/M,_=isFinite(s)?1+Math.floor(u*T):fi;_>fi&&Ve(`sigmaRadians, ${s}, is too large and will clip, as it requested ${_} samples when the maximum is set to ${fi}`);const g=[];let A=0;for(let U=0;U<fi;++U){const y=U/T,b=Math.exp(-y*y/2);g.push(b),U===0?A+=b:U<_&&(A+=2*b)}for(let U=0;U<g.length;U++)g[U]=g[U]/A;f.envMap.value=e.texture,f.samples.value=_,f.weights.value=g,f.latitudinal.value=a==="latitudinal",o&&(f.poleAxis.value=o);const{_lodMax:C}=this;f.dTheta.value=M,f.mipInt.value=C-n;const R=this._sizeLods[r],D=3*R*(r>C-jn?r-C+jn:0),P=4*(this._cubeSize-R);Ni(t,D,P,3*R,2*R),h.setRenderTarget(t),h.render(d,or)}}function tp(i){const e=[],t=[],n=[];let r=i;const s=i-jn+1+gc.length;for(let a=0;a<s;a++){const o=Math.pow(2,r);e.push(o);let h=1/o;a>i-jn?h=gc[a-i+jn-1]:a===0&&(h=0),t.push(h);const l=1/(o-2),u=-l,d=1+l,f=[u,u,d,u,d,d,u,u,d,d,u,d],v=6,M=6,T=3,_=2,g=1,A=new Float32Array(T*M*v),C=new Float32Array(_*M*v),R=new Float32Array(g*M*v);for(let P=0;P<v;P++){const U=P%3*2/3-1,y=P>2?0:-1,b=[U,y,0,U+2/3,y,0,U+2/3,y+1,0,U,y,0,U+2/3,y+1,0,U,y+1,0];A.set(b,T*M*P),C.set(f,_*M*P);const j=[P,P,P,P,P,P];R.set(j,g*M*P)}const D=new Kt;D.setAttribute("position",new Tn(A,T)),D.setAttribute("uv",new Tn(C,_)),D.setAttribute("faceIndex",new Tn(R,g)),n.push(new It(D,null)),r>jn&&r--}return{lodMeshes:n,sizeLods:e,sigmas:t}}function xc(i,e,t){const n=new En(i,e,t);return n.texture.mapping=gs,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Ni(i,e,t,n,r){i.viewport.set(e,t,n,r),i.scissor.set(e,t,n,r)}function np(i,e,t){return new wn({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:Qd,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:vs(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:Nn,depthTest:!1,depthWrite:!1})}function ip(i,e,t){const n=new Float32Array(fi),r=new k(0,1,0);return new wn({name:"SphericalGaussianBlur",defines:{n:fi,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:vs(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Nn,depthTest:!1,depthWrite:!1})}function Mc(){return new wn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:vs(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Nn,depthTest:!1,depthWrite:!1})}function Sc(){return new wn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:vs(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Nn,depthTest:!1,depthWrite:!1})}function vs(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}class Al extends En{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];this.texture=new Sl(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new Ji(5,5,5),s=new wn({name:"CubemapFromEquirect",uniforms:Vi(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:jt,blending:Nn});s.uniforms.tEquirect.value=t;const a=new It(r,s),o=t.minFilter;return t.minFilter===pi&&(t.minFilter=Yt),new cu(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,r=!0){const s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,r);e.setRenderTarget(s)}}function rp(i){let e=new WeakMap,t=new WeakMap,n=null;function r(f,v=!1){return f==null?null:v?a(f):s(f)}function s(f){if(f&&f.isTexture){const v=f.mapping;if(v===Cs||v===Ps)if(e.has(f)){const M=e.get(f).texture;return o(M,f.mapping)}else{const M=f.image;if(M&&M.height>0){const T=new Al(M.height);return T.fromEquirectangularTexture(i,f),e.set(f,T),f.addEventListener("dispose",l),o(T.texture,f.mapping)}else return null}}return f}function a(f){if(f&&f.isTexture){const v=f.mapping,M=v===Cs||v===Ps,T=v===gi||v===Hi;if(M||T){let _=t.get(f);const g=_!==void 0?_.texture.pmremVersion:0;if(f.isRenderTargetTexture&&f.pmremVersion!==g)return n===null&&(n=new vc(i)),_=M?n.fromEquirectangular(f,_):n.fromCubemap(f,_),_.texture.pmremVersion=f.pmremVersion,t.set(f,_),_.texture;if(_!==void 0)return _.texture;{const A=f.image;return M&&A&&A.height>0||T&&A&&h(A)?(n===null&&(n=new vc(i)),_=M?n.fromEquirectangular(f):n.fromCubemap(f),_.texture.pmremVersion=f.pmremVersion,t.set(f,_),f.addEventListener("dispose",u),_.texture):null}}}return f}function o(f,v){return v===Cs?f.mapping=gi:v===Ps&&(f.mapping=Hi),f}function h(f){let v=0;const M=6;for(let T=0;T<M;T++)f[T]!==void 0&&v++;return v===M}function l(f){const v=f.target;v.removeEventListener("dispose",l);const M=e.get(v);M!==void 0&&(e.delete(v),M.dispose())}function u(f){const v=f.target;v.removeEventListener("dispose",u);const M=t.get(v);M!==void 0&&(t.delete(v),M.dispose())}function d(){e=new WeakMap,t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:r,dispose:d}}function sp(i){const e={};function t(n){if(e[n]!==void 0)return e[n];const r=i.getExtension(n);return e[n]=r,r}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const r=t(n);return r===null&&us("WebGLRenderer: "+n+" extension not supported."),r}}}function ap(i,e,t,n){const r={},s=new WeakMap;function a(d){const f=d.target;f.index!==null&&e.remove(f.index);for(const M in f.attributes)e.remove(f.attributes[M]);f.removeEventListener("dispose",a),delete r[f.id];const v=s.get(f);v&&(e.remove(v),s.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,t.memory.geometries--}function o(d,f){return r[f.id]===!0||(f.addEventListener("dispose",a),r[f.id]=!0,t.memory.geometries++),f}function h(d){const f=d.attributes;for(const v in f)e.update(f[v],i.ARRAY_BUFFER)}function l(d){const f=[],v=d.index,M=d.attributes.position;let T=0;if(M===void 0)return;if(v!==null){const A=v.array;T=v.version;for(let C=0,R=A.length;C<R;C+=3){const D=A[C+0],P=A[C+1],U=A[C+2];f.push(D,P,P,U,U,D)}}else{const A=M.array;T=M.version;for(let C=0,R=A.length/3-1;C<R;C+=3){const D=C+0,P=C+1,U=C+2;f.push(D,P,P,U,U,D)}}const _=new(M.count>=65535?xl:vl)(f,1);_.version=T;const g=s.get(d);g&&e.remove(g),s.set(d,_)}function u(d){const f=s.get(d);if(f){const v=d.index;v!==null&&f.version<v.version&&l(d)}else l(d);return s.get(d)}return{get:o,update:h,getWireframeAttribute:u}}function op(i,e,t){let n;function r(f){n=f}let s,a;function o(f){s=f.type,a=f.bytesPerElement}function h(f,v){i.drawElements(n,v,s,f*a),t.update(v,n,1)}function l(f,v,M){M!==0&&(i.drawElementsInstanced(n,v,s,f*a,M),t.update(v,n,M))}function u(f,v,M){if(M===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,v,0,s,f,0,M);let _=0;for(let g=0;g<M;g++)_+=v[g];t.update(_,n,1)}function d(f,v,M,T){if(M===0)return;const _=e.get("WEBGL_multi_draw");if(_===null)for(let g=0;g<f.length;g++)l(f[g]/a,v[g],T[g]);else{_.multiDrawElementsInstancedWEBGL(n,v,0,s,f,0,T,0,M);let g=0;for(let A=0;A<M;A++)g+=v[A]*T[A];t.update(g,n,1)}}this.setMode=r,this.setIndex=o,this.render=h,this.renderInstances=l,this.renderMultiDraw=u,this.renderMultiDrawInstances=d}function cp(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,a,o){switch(t.calls++,a){case i.TRIANGLES:t.triangles+=o*(s/3);break;case i.LINES:t.lines+=o*(s/2);break;case i.LINE_STRIP:t.lines+=o*(s-1);break;case i.LINE_LOOP:t.lines+=o*s;break;case i.POINTS:t.points+=o*s;break;default:ft("WebGLInfo: Unknown draw mode:",a);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:n}}function lp(i,e,t){const n=new WeakMap,r=new Ct;function s(a,o,h){const l=a.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,d=u!==void 0?u.length:0;let f=n.get(o);if(f===void 0||f.count!==d){let j=function(){y.dispose(),n.delete(o),o.removeEventListener("dispose",j)};var v=j;f!==void 0&&f.texture.dispose();const M=o.morphAttributes.position!==void 0,T=o.morphAttributes.normal!==void 0,_=o.morphAttributes.color!==void 0,g=o.morphAttributes.position||[],A=o.morphAttributes.normal||[],C=o.morphAttributes.color||[];let R=0;M===!0&&(R=1),T===!0&&(R=2),_===!0&&(R=3);let D=o.attributes.position.count*R,P=1;D>e.maxTextureSize&&(P=Math.ceil(D/e.maxTextureSize),D=e.maxTextureSize);const U=new Float32Array(D*P*4*d),y=new gl(U,D,P,d);y.type=Mn,y.needsUpdate=!0;const b=R*4;for(let I=0;I<d;I++){const V=g[I],$=A[I],q=C[I],X=D*P*4*I;for(let Y=0;Y<V.count;Y++){const H=Y*b;M===!0&&(r.fromBufferAttribute(V,Y),U[X+H+0]=r.x,U[X+H+1]=r.y,U[X+H+2]=r.z,U[X+H+3]=0),T===!0&&(r.fromBufferAttribute($,Y),U[X+H+4]=r.x,U[X+H+5]=r.y,U[X+H+6]=r.z,U[X+H+7]=0),_===!0&&(r.fromBufferAttribute(q,Y),U[X+H+8]=r.x,U[X+H+9]=r.y,U[X+H+10]=r.z,U[X+H+11]=q.itemSize===4?r.w:1)}}f={count:d,texture:y,size:new lt(D,P)},n.set(o,f),o.addEventListener("dispose",j)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)h.getUniforms().setValue(i,"morphTexture",a.morphTexture,t);else{let M=0;for(let _=0;_<l.length;_++)M+=l[_];const T=o.morphTargetsRelative?1:1-M;h.getUniforms().setValue(i,"morphTargetBaseInfluence",T),h.getUniforms().setValue(i,"morphTargetInfluences",l)}h.getUniforms().setValue(i,"morphTargetsTexture",f.texture,t),h.getUniforms().setValue(i,"morphTargetsTextureSize",f.size)}return{update:s}}function hp(i,e,t,n,r){let s=new WeakMap;function a(l){const u=r.render.frame,d=l.geometry,f=e.get(l,d);if(s.get(f)!==u&&(e.update(f),s.set(f,u)),l.isInstancedMesh&&(l.hasEventListener("dispose",h)===!1&&l.addEventListener("dispose",h),s.get(l)!==u&&(t.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,i.ARRAY_BUFFER),s.set(l,u))),l.isSkinnedMesh){const v=l.skeleton;s.get(v)!==u&&(v.update(),s.set(v,u))}return f}function o(){s=new WeakMap}function h(l){const u=l.target;u.removeEventListener("dispose",h),n.releaseStatesOfObject(u),t.remove(u.instanceMatrix),u.instanceColor!==null&&t.remove(u.instanceColor)}return{update:a,dispose:o}}const up={[el]:"LINEAR_TONE_MAPPING",[tl]:"REINHARD_TONE_MAPPING",[nl]:"CINEON_TONE_MAPPING",[uo]:"ACES_FILMIC_TONE_MAPPING",[rl]:"AGX_TONE_MAPPING",[sl]:"NEUTRAL_TONE_MAPPING",[il]:"CUSTOM_TONE_MAPPING"};function fp(i,e,t,n,r){const s=new En(e,t,{type:i,depthBuffer:n,stencilBuffer:r}),a=new En(e,t,{type:Fn,depthBuffer:!1,stencilBuffer:!1}),o=new Kt;o.setAttribute("position",new Lt([-1,3,0,-1,-1,0,3,-1,0],3)),o.setAttribute("uv",new Lt([0,2,0,0,2,0],2));const h=new jh({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),l=new It(o,h),u=new Po(-1,1,1,-1,0,1);let d=null,f=null,v=!1,M,T=null,_=[],g=!1;this.setSize=function(A,C){s.setSize(A,C),a.setSize(A,C);for(let R=0;R<_.length;R++){const D=_[R];D.setSize&&D.setSize(A,C)}},this.setEffects=function(A){_=A,g=_.length>0&&_[0].isRenderPass===!0;const C=s.width,R=s.height;for(let D=0;D<_.length;D++){const P=_[D];P.setSize&&P.setSize(C,R)}},this.begin=function(A,C){if(v||A.toneMapping===yn&&_.length===0)return!1;if(T=C,C!==null){const R=C.width,D=C.height;(s.width!==R||s.height!==D)&&this.setSize(R,D)}return g===!1&&A.setRenderTarget(s),M=A.toneMapping,A.toneMapping=yn,!0},this.hasRenderPass=function(){return g},this.end=function(A,C){A.toneMapping=M,v=!0;let R=s,D=a;for(let P=0;P<_.length;P++){const U=_[P];if(U.enabled!==!1&&(U.render(A,D,R,C),U.needsSwap!==!1)){const y=R;R=D,D=y}}if(d!==A.outputColorSpace||f!==A.toneMapping){d=A.outputColorSpace,f=A.toneMapping,h.defines={},dt.getTransfer(d)===gt&&(h.defines.SRGB_TRANSFER="");const P=up[f];P&&(h.defines[P]=""),h.needsUpdate=!0}h.uniforms.tDiffuse.value=R.texture,A.setRenderTarget(T),A.render(l,u),T=null,v=!1},this.isCompositing=function(){return v},this.dispose=function(){s.dispose(),a.dispose(),o.dispose(),h.dispose()}}const wl=new Ht,so=new Er(1,1),Rl=new gl,Cl=new Ah,Pl=new Sl,yc=[],Ec=[],Tc=new Float32Array(16),bc=new Float32Array(9),Ac=new Float32Array(4);function Qi(i,e,t){const n=i[0];if(n<=0||n>0)return i;const r=e*t;let s=yc[r];if(s===void 0&&(s=new Float32Array(r),yc[r]=s),e!==0){n.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=t,i[a].toArray(s,o)}return s}function Ut(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function Nt(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function xs(i,e){let t=Ec[e];t===void 0&&(t=new Int32Array(e),Ec[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function dp(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function pp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ut(t,e))return;i.uniform2fv(this.addr,e),Nt(t,e)}}function mp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Ut(t,e))return;i.uniform3fv(this.addr,e),Nt(t,e)}}function gp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ut(t,e))return;i.uniform4fv(this.addr,e),Nt(t,e)}}function _p(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Ut(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),Nt(t,e)}else{if(Ut(t,n))return;Ac.set(n),i.uniformMatrix2fv(this.addr,!1,Ac),Nt(t,n)}}function vp(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Ut(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),Nt(t,e)}else{if(Ut(t,n))return;bc.set(n),i.uniformMatrix3fv(this.addr,!1,bc),Nt(t,n)}}function xp(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Ut(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),Nt(t,e)}else{if(Ut(t,n))return;Tc.set(n),i.uniformMatrix4fv(this.addr,!1,Tc),Nt(t,n)}}function Mp(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function Sp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ut(t,e))return;i.uniform2iv(this.addr,e),Nt(t,e)}}function yp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Ut(t,e))return;i.uniform3iv(this.addr,e),Nt(t,e)}}function Ep(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ut(t,e))return;i.uniform4iv(this.addr,e),Nt(t,e)}}function Tp(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function bp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ut(t,e))return;i.uniform2uiv(this.addr,e),Nt(t,e)}}function Ap(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Ut(t,e))return;i.uniform3uiv(this.addr,e),Nt(t,e)}}function wp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ut(t,e))return;i.uniform4uiv(this.addr,e),Nt(t,e)}}function Rp(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r);let s;this.type===i.SAMPLER_2D_SHADOW?(so.compareFunction=t.isReversedDepthBuffer()?Mo:xo,s=so):s=wl,t.setTexture2D(e||s,r)}function Cp(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture3D(e||Cl,r)}function Pp(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTextureCube(e||Pl,r)}function Ip(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture2DArray(e||Rl,r)}function Dp(i){switch(i){case 5126:return dp;case 35664:return pp;case 35665:return mp;case 35666:return gp;case 35674:return _p;case 35675:return vp;case 35676:return xp;case 5124:case 35670:return Mp;case 35667:case 35671:return Sp;case 35668:case 35672:return yp;case 35669:case 35673:return Ep;case 5125:return Tp;case 36294:return bp;case 36295:return Ap;case 36296:return wp;case 35678:case 36198:case 36298:case 36306:case 35682:return Rp;case 35679:case 36299:case 36307:return Cp;case 35680:case 36300:case 36308:case 36293:return Pp;case 36289:case 36303:case 36311:case 36292:return Ip}}function Lp(i,e){i.uniform1fv(this.addr,e)}function Up(i,e){const t=Qi(e,this.size,2);i.uniform2fv(this.addr,t)}function Np(i,e){const t=Qi(e,this.size,3);i.uniform3fv(this.addr,t)}function Op(i,e){const t=Qi(e,this.size,4);i.uniform4fv(this.addr,t)}function Fp(i,e){const t=Qi(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function Bp(i,e){const t=Qi(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function Wp(i,e){const t=Qi(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function Gp(i,e){i.uniform1iv(this.addr,e)}function Hp(i,e){i.uniform2iv(this.addr,e)}function zp(i,e){i.uniform3iv(this.addr,e)}function kp(i,e){i.uniform4iv(this.addr,e)}function Vp(i,e){i.uniform1uiv(this.addr,e)}function Xp(i,e){i.uniform2uiv(this.addr,e)}function $p(i,e){i.uniform3uiv(this.addr,e)}function Yp(i,e){i.uniform4uiv(this.addr,e)}function qp(i,e,t){const n=this.cache,r=e.length,s=xs(t,r);Ut(n,s)||(i.uniform1iv(this.addr,s),Nt(n,s));let a;this.type===i.SAMPLER_2D_SHADOW?a=so:a=wl;for(let o=0;o!==r;++o)t.setTexture2D(e[o]||a,s[o])}function Zp(i,e,t){const n=this.cache,r=e.length,s=xs(t,r);Ut(n,s)||(i.uniform1iv(this.addr,s),Nt(n,s));for(let a=0;a!==r;++a)t.setTexture3D(e[a]||Cl,s[a])}function jp(i,e,t){const n=this.cache,r=e.length,s=xs(t,r);Ut(n,s)||(i.uniform1iv(this.addr,s),Nt(n,s));for(let a=0;a!==r;++a)t.setTextureCube(e[a]||Pl,s[a])}function Kp(i,e,t){const n=this.cache,r=e.length,s=xs(t,r);Ut(n,s)||(i.uniform1iv(this.addr,s),Nt(n,s));for(let a=0;a!==r;++a)t.setTexture2DArray(e[a]||Rl,s[a])}function Jp(i){switch(i){case 5126:return Lp;case 35664:return Up;case 35665:return Np;case 35666:return Op;case 35674:return Fp;case 35675:return Bp;case 35676:return Wp;case 5124:case 35670:return Gp;case 35667:case 35671:return Hp;case 35668:case 35672:return zp;case 35669:case 35673:return kp;case 5125:return Vp;case 36294:return Xp;case 36295:return $p;case 36296:return Yp;case 35678:case 36198:case 36298:case 36306:case 35682:return qp;case 35679:case 36299:case 36307:return Zp;case 35680:case 36300:case 36308:case 36293:return jp;case 36289:case 36303:case 36311:case 36292:return Kp}}class Qp{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Dp(t.type)}}class em{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Jp(t.type)}}class tm{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const r=this.seq;for(let s=0,a=r.length;s!==a;++s){const o=r[s];o.setValue(e,t[o.id],n)}}}const la=/(\w+)(\])?(\[|\.)?/g;function wc(i,e){i.seq.push(e),i.map[e.id]=e}function nm(i,e,t){const n=i.name,r=n.length;for(la.lastIndex=0;;){const s=la.exec(n),a=la.lastIndex;let o=s[1];const h=s[2]==="]",l=s[3];if(h&&(o=o|0),l===void 0||l==="["&&a+2===r){wc(t,l===void 0?new Qp(o,i,e):new em(o,i,e));break}else{let d=t.map[o];d===void 0&&(d=new tm(o),wc(t,d)),t=d}}}class os{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){const o=e.getActiveUniform(t,a),h=e.getUniformLocation(t,o.name);nm(o,h,this)}const r=[],s=[];for(const a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(a):s.push(a);r.length>0&&(this.seq=r.concat(s))}setValue(e,t,n,r){const s=this.map[t];s!==void 0&&s.setValue(e,n,r)}setOptional(e,t,n){const r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let s=0,a=t.length;s!==a;++s){const o=t[s],h=n[o.id];h.needsUpdate!==!1&&o.setValue(e,h.value,r)}}static seqWithValue(e,t){const n=[];for(let r=0,s=e.length;r!==s;++r){const a=e[r];a.id in t&&n.push(a)}return n}}function Rc(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const im=37297;let rm=0;function sm(i,e){const t=i.split(`
`),n=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let a=r;a<s;a++){const o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}const Cc=new Ke;function am(i){dt._getMatrix(Cc,dt.workingColorSpace,i);const e=`mat3( ${Cc.elements.map(t=>t.toFixed(4))} )`;switch(dt.getTransfer(i)){case hs:return[e,"LinearTransferOETF"];case gt:return[e,"sRGBTransferOETF"];default:return Ve("WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function Pc(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),s=(i.getShaderInfoLog(e)||"").trim();if(n&&s==="")return"";const a=/ERROR: 0:(\d+)/.exec(s);if(a){const o=parseInt(a[1]);return t.toUpperCase()+`

`+s+`

`+sm(i.getShaderSource(e),o)}else return s}function om(i,e){const t=am(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}const cm={[el]:"Linear",[tl]:"Reinhard",[nl]:"Cineon",[uo]:"ACESFilmic",[rl]:"AgX",[sl]:"Neutral",[il]:"Custom"};function lm(i,e){const t=cm[e];return t===void 0?(Ve("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Qr=new k;function hm(){dt.getLuminanceCoefficients(Qr);const i=Qr.x.toFixed(4),e=Qr.y.toFixed(4),t=Qr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function um(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(gr).join(`
`)}function fm(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function dm(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let r=0;r<n;r++){const s=i.getActiveAttrib(e,r),a=s.name;let o=1;s.type===i.FLOAT_MAT2&&(o=2),s.type===i.FLOAT_MAT3&&(o=3),s.type===i.FLOAT_MAT4&&(o=4),t[a]={type:s.type,location:i.getAttribLocation(e,a),locationSize:o}}return t}function gr(i){return i!==""}function Ic(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Dc(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const pm=/^[ \t]*#include +<([\w\d./]+)>/gm;function ao(i){return i.replace(pm,gm)}const mm=new Map;function gm(i,e){let t=tt[e];if(t===void 0){const n=mm.get(e);if(n!==void 0)t=tt[n],Ve('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return ao(t)}const _m=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Lc(i){return i.replace(_m,vm)}function vm(i,e,t,n){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function Uc(i){let e=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}const xm={[_r]:"SHADOWMAP_TYPE_PCF",[mr]:"SHADOWMAP_TYPE_VSM"};function Mm(i){return xm[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const Sm={[gi]:"ENVMAP_TYPE_CUBE",[Hi]:"ENVMAP_TYPE_CUBE",[gs]:"ENVMAP_TYPE_CUBE_UV"};function ym(i){return i.envMap===!1?"ENVMAP_TYPE_CUBE":Sm[i.envMapMode]||"ENVMAP_TYPE_CUBE"}const Em={[Hi]:"ENVMAP_MODE_REFRACTION"};function Tm(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":Em[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}const bm={[Qc]:"ENVMAP_BLENDING_MULTIPLY",[sh]:"ENVMAP_BLENDING_MIX",[ah]:"ENVMAP_BLENDING_ADD"};function Am(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":bm[i.combine]||"ENVMAP_BLENDING_NONE"}function wm(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:n,maxMip:t}}function Rm(i,e,t,n){const r=i.getContext(),s=t.defines;let a=t.vertexShader,o=t.fragmentShader;const h=Mm(t),l=ym(t),u=Tm(t),d=Am(t),f=wm(t),v=um(t),M=fm(s),T=r.createProgram();let _,g,A=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(_=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,M].filter(gr).join(`
`),_.length>0&&(_+=`
`),g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,M].filter(gr).join(`
`),g.length>0&&(g+=`
`)):(_=[Uc(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,M,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+h:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(gr).join(`
`),g=[Uc(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,M,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+u:"",t.envMap?"#define "+d:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+h:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==yn?"#define TONE_MAPPING":"",t.toneMapping!==yn?tt.tonemapping_pars_fragment:"",t.toneMapping!==yn?lm("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",tt.colorspace_pars_fragment,om("linearToOutputTexel",t.outputColorSpace),hm(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(gr).join(`
`)),a=ao(a),a=Ic(a,t),a=Dc(a,t),o=ao(o),o=Ic(o,t),o=Dc(o,t),a=Lc(a),o=Lc(o),t.isRawShaderMaterial!==!0&&(A=`#version 300 es
`,_=[v,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+_,g=["#define varying in",t.glslVersion===Ho?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Ho?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+g);const C=A+_+a,R=A+g+o,D=Rc(r,r.VERTEX_SHADER,C),P=Rc(r,r.FRAGMENT_SHADER,R);r.attachShader(T,D),r.attachShader(T,P),t.index0AttributeName!==void 0?r.bindAttribLocation(T,0,t.index0AttributeName):t.morphTargets===!0&&r.bindAttribLocation(T,0,"position"),r.linkProgram(T);function U(I){if(i.debug.checkShaderErrors){const V=r.getProgramInfoLog(T)||"",$=r.getShaderInfoLog(D)||"",q=r.getShaderInfoLog(P)||"",X=V.trim(),Y=$.trim(),H=q.trim();let ae=!0,ne=!0;if(r.getProgramParameter(T,r.LINK_STATUS)===!1)if(ae=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(r,T,D,P);else{const xe=Pc(r,D,"vertex"),Se=Pc(r,P,"fragment");ft("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(T,r.VALIDATE_STATUS)+`

Material Name: `+I.name+`
Material Type: `+I.type+`

Program Info Log: `+X+`
`+xe+`
`+Se)}else X!==""?Ve("WebGLProgram: Program Info Log:",X):(Y===""||H==="")&&(ne=!1);ne&&(I.diagnostics={runnable:ae,programLog:X,vertexShader:{log:Y,prefix:_},fragmentShader:{log:H,prefix:g}})}r.deleteShader(D),r.deleteShader(P),y=new os(r,T),b=dm(r,T)}let y;this.getUniforms=function(){return y===void 0&&U(this),y};let b;this.getAttributes=function(){return b===void 0&&U(this),b};let j=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return j===!1&&(j=r.getProgramParameter(T,im)),j},this.destroy=function(){n.releaseStatesOfProgram(this),r.deleteProgram(T),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=rm++,this.cacheKey=e,this.usedTimes=1,this.program=T,this.vertexShader=D,this.fragmentShader=P,this}let Cm=0;class Pm{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,r=this._getShaderStage(t),s=this._getShaderStage(n),a=this._getShaderCacheForMaterial(e);return a.has(r)===!1&&(a.add(r),r.usedTimes++),a.has(s)===!1&&(a.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new Im(e),t.set(e,n)),n}}class Im{constructor(e){this.id=Cm++,this.code=e,this.usedTimes=0}}function Dm(i,e,t,n,r,s){const a=new yo,o=new Pm,h=new Set,l=[],u=new Map,d=n.logarithmicDepthBuffer;let f=n.precision;const v={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function M(y){return h.add(y),y===0?"uv":`uv${y}`}function T(y,b,j,I,V){const $=I.fog,q=V.geometry,X=y.isMeshStandardMaterial||y.isMeshLambertMaterial||y.isMeshPhongMaterial?I.environment:null,Y=y.isMeshStandardMaterial||y.isMeshLambertMaterial&&!y.envMap||y.isMeshPhongMaterial&&!y.envMap,H=e.get(y.envMap||X,Y),ae=H&&H.mapping===gs?H.image.height:null,ne=v[y.type];y.precision!==null&&(f=n.getMaxPrecision(y.precision),f!==y.precision&&Ve("WebGLProgram.getParameters:",y.precision,"not supported, using",f,"instead."));const xe=q.morphAttributes.position||q.morphAttributes.normal||q.morphAttributes.color,Se=xe!==void 0?xe.length:0;let ye=0;q.morphAttributes.position!==void 0&&(ye=1),q.morphAttributes.normal!==void 0&&(ye=2),q.morphAttributes.color!==void 0&&(ye=3);let $e,yt,xt,Q;if(ne){const je=xn[ne];$e=je.vertexShader,yt=je.fragmentShader}else $e=y.vertexShader,yt=y.fragmentShader,o.update(y),xt=o.getVertexShaderID(y),Q=o.getFragmentShaderID(y);const fe=i.getRenderTarget(),de=i.state.buffers.depth.getReversed(),Xe=V.isInstancedMesh===!0,Oe=V.isBatchedMesh===!0,Ge=!!y.map,At=!!y.matcap,We=!!H,ht=!!y.aoMap,mt=!!y.lightMap,qe=!!y.bumpMap,Mt=!!y.normalMap,L=!!y.displacementMap,Tt=!!y.emissiveMap,it=!!y.metalnessMap,ut=!!y.roughnessMap,Ce=y.anisotropy>0,w=y.clearcoat>0,x=y.dispersion>0,W=y.iridescence>0,J=y.sheen>0,te=y.transmission>0,K=Ce&&!!y.anisotropyMap,Te=w&&!!y.clearcoatMap,le=w&&!!y.clearcoatNormalMap,Ne=w&&!!y.clearcoatRoughnessMap,Fe=W&&!!y.iridescenceMap,re=W&&!!y.iridescenceThicknessMap,se=J&&!!y.sheenColorMap,we=J&&!!y.sheenRoughnessMap,Re=!!y.specularMap,Me=!!y.specularColorMap,Ze=!!y.specularIntensityMap,N=te&&!!y.transmissionMap,he=te&&!!y.thicknessMap,oe=!!y.gradientMap,Ee=!!y.alphaMap,ie=y.alphaTest>0,Z=!!y.alphaHash,be=!!y.extensions;let ze=yn;y.toneMapped&&(fe===null||fe.isXRRenderTarget===!0)&&(ze=i.toneMapping);const _t={shaderID:ne,shaderType:y.type,shaderName:y.name,vertexShader:$e,fragmentShader:yt,defines:y.defines,customVertexShaderID:xt,customFragmentShaderID:Q,isRawShaderMaterial:y.isRawShaderMaterial===!0,glslVersion:y.glslVersion,precision:f,batching:Oe,batchingColor:Oe&&V._colorsTexture!==null,instancing:Xe,instancingColor:Xe&&V.instanceColor!==null,instancingMorph:Xe&&V.morphTexture!==null,outputColorSpace:fe===null?i.outputColorSpace:fe.isXRRenderTarget===!0?fe.texture.colorSpace:ki,alphaToCoverage:!!y.alphaToCoverage,map:Ge,matcap:At,envMap:We,envMapMode:We&&H.mapping,envMapCubeUVHeight:ae,aoMap:ht,lightMap:mt,bumpMap:qe,normalMap:Mt,displacementMap:L,emissiveMap:Tt,normalMapObjectSpace:Mt&&y.normalMapType===lh,normalMapTangentSpace:Mt&&y.normalMapType===pl,metalnessMap:it,roughnessMap:ut,anisotropy:Ce,anisotropyMap:K,clearcoat:w,clearcoatMap:Te,clearcoatNormalMap:le,clearcoatRoughnessMap:Ne,dispersion:x,iridescence:W,iridescenceMap:Fe,iridescenceThicknessMap:re,sheen:J,sheenColorMap:se,sheenRoughnessMap:we,specularMap:Re,specularColorMap:Me,specularIntensityMap:Ze,transmission:te,transmissionMap:N,thicknessMap:he,gradientMap:oe,opaque:y.transparent===!1&&y.blending===Bi&&y.alphaToCoverage===!1,alphaMap:Ee,alphaTest:ie,alphaHash:Z,combine:y.combine,mapUv:Ge&&M(y.map.channel),aoMapUv:ht&&M(y.aoMap.channel),lightMapUv:mt&&M(y.lightMap.channel),bumpMapUv:qe&&M(y.bumpMap.channel),normalMapUv:Mt&&M(y.normalMap.channel),displacementMapUv:L&&M(y.displacementMap.channel),emissiveMapUv:Tt&&M(y.emissiveMap.channel),metalnessMapUv:it&&M(y.metalnessMap.channel),roughnessMapUv:ut&&M(y.roughnessMap.channel),anisotropyMapUv:K&&M(y.anisotropyMap.channel),clearcoatMapUv:Te&&M(y.clearcoatMap.channel),clearcoatNormalMapUv:le&&M(y.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Ne&&M(y.clearcoatRoughnessMap.channel),iridescenceMapUv:Fe&&M(y.iridescenceMap.channel),iridescenceThicknessMapUv:re&&M(y.iridescenceThicknessMap.channel),sheenColorMapUv:se&&M(y.sheenColorMap.channel),sheenRoughnessMapUv:we&&M(y.sheenRoughnessMap.channel),specularMapUv:Re&&M(y.specularMap.channel),specularColorMapUv:Me&&M(y.specularColorMap.channel),specularIntensityMapUv:Ze&&M(y.specularIntensityMap.channel),transmissionMapUv:N&&M(y.transmissionMap.channel),thicknessMapUv:he&&M(y.thicknessMap.channel),alphaMapUv:Ee&&M(y.alphaMap.channel),vertexTangents:!!q.attributes.tangent&&(Mt||Ce),vertexColors:y.vertexColors,vertexAlphas:y.vertexColors===!0&&!!q.attributes.color&&q.attributes.color.itemSize===4,pointsUvs:V.isPoints===!0&&!!q.attributes.uv&&(Ge||Ee),fog:!!$,useFog:y.fog===!0,fogExp2:!!$&&$.isFogExp2,flatShading:y.wireframe===!1&&(y.flatShading===!0||q.attributes.normal===void 0&&Mt===!1&&(y.isMeshLambertMaterial||y.isMeshPhongMaterial||y.isMeshStandardMaterial||y.isMeshPhysicalMaterial)),sizeAttenuation:y.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:de,skinning:V.isSkinnedMesh===!0,morphTargets:q.morphAttributes.position!==void 0,morphNormals:q.morphAttributes.normal!==void 0,morphColors:q.morphAttributes.color!==void 0,morphTargetsCount:Se,morphTextureStride:ye,numDirLights:b.directional.length,numPointLights:b.point.length,numSpotLights:b.spot.length,numSpotLightMaps:b.spotLightMap.length,numRectAreaLights:b.rectArea.length,numHemiLights:b.hemi.length,numDirLightShadows:b.directionalShadowMap.length,numPointLightShadows:b.pointShadowMap.length,numSpotLightShadows:b.spotShadowMap.length,numSpotLightShadowsWithMaps:b.numSpotLightShadowsWithMaps,numLightProbes:b.numLightProbes,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:y.dithering,shadowMapEnabled:i.shadowMap.enabled&&j.length>0,shadowMapType:i.shadowMap.type,toneMapping:ze,decodeVideoTexture:Ge&&y.map.isVideoTexture===!0&&dt.getTransfer(y.map.colorSpace)===gt,decodeVideoTextureEmissive:Tt&&y.emissiveMap.isVideoTexture===!0&&dt.getTransfer(y.emissiveMap.colorSpace)===gt,premultipliedAlpha:y.premultipliedAlpha,doubleSided:y.side===Ln,flipSided:y.side===jt,useDepthPacking:y.depthPacking>=0,depthPacking:y.depthPacking||0,index0AttributeName:y.index0AttributeName,extensionClipCullDistance:be&&y.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(be&&y.extensions.multiDraw===!0||Oe)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:y.customProgramCacheKey()};return _t.vertexUv1s=h.has(1),_t.vertexUv2s=h.has(2),_t.vertexUv3s=h.has(3),h.clear(),_t}function _(y){const b=[];if(y.shaderID?b.push(y.shaderID):(b.push(y.customVertexShaderID),b.push(y.customFragmentShaderID)),y.defines!==void 0)for(const j in y.defines)b.push(j),b.push(y.defines[j]);return y.isRawShaderMaterial===!1&&(g(b,y),A(b,y),b.push(i.outputColorSpace)),b.push(y.customProgramCacheKey),b.join()}function g(y,b){y.push(b.precision),y.push(b.outputColorSpace),y.push(b.envMapMode),y.push(b.envMapCubeUVHeight),y.push(b.mapUv),y.push(b.alphaMapUv),y.push(b.lightMapUv),y.push(b.aoMapUv),y.push(b.bumpMapUv),y.push(b.normalMapUv),y.push(b.displacementMapUv),y.push(b.emissiveMapUv),y.push(b.metalnessMapUv),y.push(b.roughnessMapUv),y.push(b.anisotropyMapUv),y.push(b.clearcoatMapUv),y.push(b.clearcoatNormalMapUv),y.push(b.clearcoatRoughnessMapUv),y.push(b.iridescenceMapUv),y.push(b.iridescenceThicknessMapUv),y.push(b.sheenColorMapUv),y.push(b.sheenRoughnessMapUv),y.push(b.specularMapUv),y.push(b.specularColorMapUv),y.push(b.specularIntensityMapUv),y.push(b.transmissionMapUv),y.push(b.thicknessMapUv),y.push(b.combine),y.push(b.fogExp2),y.push(b.sizeAttenuation),y.push(b.morphTargetsCount),y.push(b.morphAttributeCount),y.push(b.numDirLights),y.push(b.numPointLights),y.push(b.numSpotLights),y.push(b.numSpotLightMaps),y.push(b.numHemiLights),y.push(b.numRectAreaLights),y.push(b.numDirLightShadows),y.push(b.numPointLightShadows),y.push(b.numSpotLightShadows),y.push(b.numSpotLightShadowsWithMaps),y.push(b.numLightProbes),y.push(b.shadowMapType),y.push(b.toneMapping),y.push(b.numClippingPlanes),y.push(b.numClipIntersection),y.push(b.depthPacking)}function A(y,b){a.disableAll(),b.instancing&&a.enable(0),b.instancingColor&&a.enable(1),b.instancingMorph&&a.enable(2),b.matcap&&a.enable(3),b.envMap&&a.enable(4),b.normalMapObjectSpace&&a.enable(5),b.normalMapTangentSpace&&a.enable(6),b.clearcoat&&a.enable(7),b.iridescence&&a.enable(8),b.alphaTest&&a.enable(9),b.vertexColors&&a.enable(10),b.vertexAlphas&&a.enable(11),b.vertexUv1s&&a.enable(12),b.vertexUv2s&&a.enable(13),b.vertexUv3s&&a.enable(14),b.vertexTangents&&a.enable(15),b.anisotropy&&a.enable(16),b.alphaHash&&a.enable(17),b.batching&&a.enable(18),b.dispersion&&a.enable(19),b.batchingColor&&a.enable(20),b.gradientMap&&a.enable(21),y.push(a.mask),a.disableAll(),b.fog&&a.enable(0),b.useFog&&a.enable(1),b.flatShading&&a.enable(2),b.logarithmicDepthBuffer&&a.enable(3),b.reversedDepthBuffer&&a.enable(4),b.skinning&&a.enable(5),b.morphTargets&&a.enable(6),b.morphNormals&&a.enable(7),b.morphColors&&a.enable(8),b.premultipliedAlpha&&a.enable(9),b.shadowMapEnabled&&a.enable(10),b.doubleSided&&a.enable(11),b.flipSided&&a.enable(12),b.useDepthPacking&&a.enable(13),b.dithering&&a.enable(14),b.transmission&&a.enable(15),b.sheen&&a.enable(16),b.opaque&&a.enable(17),b.pointsUvs&&a.enable(18),b.decodeVideoTexture&&a.enable(19),b.decodeVideoTextureEmissive&&a.enable(20),b.alphaToCoverage&&a.enable(21),y.push(a.mask)}function C(y){const b=v[y.type];let j;if(b){const I=xn[b];j=Yh.clone(I.uniforms)}else j=y.uniforms;return j}function R(y,b){let j=u.get(b);return j!==void 0?++j.usedTimes:(j=new Rm(i,b,y,r),l.push(j),u.set(b,j)),j}function D(y){if(--y.usedTimes===0){const b=l.indexOf(y);l[b]=l[l.length-1],l.pop(),u.delete(y.cacheKey),y.destroy()}}function P(y){o.remove(y)}function U(){o.dispose()}return{getParameters:T,getProgramCacheKey:_,getUniforms:C,acquireProgram:R,releaseProgram:D,releaseShaderCache:P,programs:l,dispose:U}}function Lm(){let i=new WeakMap;function e(a){return i.has(a)}function t(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function r(a,o,h){i.get(a)[o]=h}function s(){i=new WeakMap}return{has:e,get:t,remove:n,update:r,dispose:s}}function Um(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.materialVariant!==e.materialVariant?i.materialVariant-e.materialVariant:i.z!==e.z?i.z-e.z:i.id-e.id}function Nc(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function Oc(){const i=[];let e=0;const t=[],n=[],r=[];function s(){e=0,t.length=0,n.length=0,r.length=0}function a(f){let v=0;return f.isInstancedMesh&&(v+=2),f.isSkinnedMesh&&(v+=1),v}function o(f,v,M,T,_,g){let A=i[e];return A===void 0?(A={id:f.id,object:f,geometry:v,material:M,materialVariant:a(f),groupOrder:T,renderOrder:f.renderOrder,z:_,group:g},i[e]=A):(A.id=f.id,A.object=f,A.geometry=v,A.material=M,A.materialVariant=a(f),A.groupOrder=T,A.renderOrder=f.renderOrder,A.z=_,A.group=g),e++,A}function h(f,v,M,T,_,g){const A=o(f,v,M,T,_,g);M.transmission>0?n.push(A):M.transparent===!0?r.push(A):t.push(A)}function l(f,v,M,T,_,g){const A=o(f,v,M,T,_,g);M.transmission>0?n.unshift(A):M.transparent===!0?r.unshift(A):t.unshift(A)}function u(f,v){t.length>1&&t.sort(f||Um),n.length>1&&n.sort(v||Nc),r.length>1&&r.sort(v||Nc)}function d(){for(let f=e,v=i.length;f<v;f++){const M=i[f];if(M.id===null)break;M.id=null,M.object=null,M.geometry=null,M.material=null,M.group=null}}return{opaque:t,transmissive:n,transparent:r,init:s,push:h,unshift:l,finish:d,sort:u}}function Nm(){let i=new WeakMap;function e(n,r){const s=i.get(n);let a;return s===void 0?(a=new Oc,i.set(n,[a])):r>=s.length?(a=new Oc,s.push(a)):a=s[r],a}function t(){i=new WeakMap}return{get:e,dispose:t}}function Om(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new k,color:new ct};break;case"SpotLight":t={position:new k,direction:new k,color:new ct,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new k,color:new ct,distance:0,decay:0};break;case"HemisphereLight":t={direction:new k,skyColor:new ct,groundColor:new ct};break;case"RectAreaLight":t={color:new ct,position:new k,halfWidth:new k,halfHeight:new k};break}return i[e.id]=t,t}}}function Fm(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new lt};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new lt};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new lt,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let Bm=0;function Wm(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function Gm(i){const e=new Om,t=Fm(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new k);const r=new k,s=new bt,a=new bt;function o(l){let u=0,d=0,f=0;for(let b=0;b<9;b++)n.probe[b].set(0,0,0);let v=0,M=0,T=0,_=0,g=0,A=0,C=0,R=0,D=0,P=0,U=0;l.sort(Wm);for(let b=0,j=l.length;b<j;b++){const I=l[b],V=I.color,$=I.intensity,q=I.distance;let X=null;if(I.shadow&&I.shadow.map&&(I.shadow.map.texture.format===zi?X=I.shadow.map.texture:X=I.shadow.map.depthTexture||I.shadow.map.texture),I.isAmbientLight)u+=V.r*$,d+=V.g*$,f+=V.b*$;else if(I.isLightProbe){for(let Y=0;Y<9;Y++)n.probe[Y].addScaledVector(I.sh.coefficients[Y],$);U++}else if(I.isDirectionalLight){const Y=e.get(I);if(Y.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){const H=I.shadow,ae=t.get(I);ae.shadowIntensity=H.intensity,ae.shadowBias=H.bias,ae.shadowNormalBias=H.normalBias,ae.shadowRadius=H.radius,ae.shadowMapSize=H.mapSize,n.directionalShadow[v]=ae,n.directionalShadowMap[v]=X,n.directionalShadowMatrix[v]=I.shadow.matrix,A++}n.directional[v]=Y,v++}else if(I.isSpotLight){const Y=e.get(I);Y.position.setFromMatrixPosition(I.matrixWorld),Y.color.copy(V).multiplyScalar($),Y.distance=q,Y.coneCos=Math.cos(I.angle),Y.penumbraCos=Math.cos(I.angle*(1-I.penumbra)),Y.decay=I.decay,n.spot[T]=Y;const H=I.shadow;if(I.map&&(n.spotLightMap[D]=I.map,D++,H.updateMatrices(I),I.castShadow&&P++),n.spotLightMatrix[T]=H.matrix,I.castShadow){const ae=t.get(I);ae.shadowIntensity=H.intensity,ae.shadowBias=H.bias,ae.shadowNormalBias=H.normalBias,ae.shadowRadius=H.radius,ae.shadowMapSize=H.mapSize,n.spotShadow[T]=ae,n.spotShadowMap[T]=X,R++}T++}else if(I.isRectAreaLight){const Y=e.get(I);Y.color.copy(V).multiplyScalar($),Y.halfWidth.set(I.width*.5,0,0),Y.halfHeight.set(0,I.height*.5,0),n.rectArea[_]=Y,_++}else if(I.isPointLight){const Y=e.get(I);if(Y.color.copy(I.color).multiplyScalar(I.intensity),Y.distance=I.distance,Y.decay=I.decay,I.castShadow){const H=I.shadow,ae=t.get(I);ae.shadowIntensity=H.intensity,ae.shadowBias=H.bias,ae.shadowNormalBias=H.normalBias,ae.shadowRadius=H.radius,ae.shadowMapSize=H.mapSize,ae.shadowCameraNear=H.camera.near,ae.shadowCameraFar=H.camera.far,n.pointShadow[M]=ae,n.pointShadowMap[M]=X,n.pointShadowMatrix[M]=I.shadow.matrix,C++}n.point[M]=Y,M++}else if(I.isHemisphereLight){const Y=e.get(I);Y.skyColor.copy(I.color).multiplyScalar($),Y.groundColor.copy(I.groundColor).multiplyScalar($),n.hemi[g]=Y,g++}}_>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=ve.LTC_FLOAT_1,n.rectAreaLTC2=ve.LTC_FLOAT_2):(n.rectAreaLTC1=ve.LTC_HALF_1,n.rectAreaLTC2=ve.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=d,n.ambient[2]=f;const y=n.hash;(y.directionalLength!==v||y.pointLength!==M||y.spotLength!==T||y.rectAreaLength!==_||y.hemiLength!==g||y.numDirectionalShadows!==A||y.numPointShadows!==C||y.numSpotShadows!==R||y.numSpotMaps!==D||y.numLightProbes!==U)&&(n.directional.length=v,n.spot.length=T,n.rectArea.length=_,n.point.length=M,n.hemi.length=g,n.directionalShadow.length=A,n.directionalShadowMap.length=A,n.pointShadow.length=C,n.pointShadowMap.length=C,n.spotShadow.length=R,n.spotShadowMap.length=R,n.directionalShadowMatrix.length=A,n.pointShadowMatrix.length=C,n.spotLightMatrix.length=R+D-P,n.spotLightMap.length=D,n.numSpotLightShadowsWithMaps=P,n.numLightProbes=U,y.directionalLength=v,y.pointLength=M,y.spotLength=T,y.rectAreaLength=_,y.hemiLength=g,y.numDirectionalShadows=A,y.numPointShadows=C,y.numSpotShadows=R,y.numSpotMaps=D,y.numLightProbes=U,n.version=Bm++)}function h(l,u){let d=0,f=0,v=0,M=0,T=0;const _=u.matrixWorldInverse;for(let g=0,A=l.length;g<A;g++){const C=l[g];if(C.isDirectionalLight){const R=n.directional[d];R.direction.setFromMatrixPosition(C.matrixWorld),r.setFromMatrixPosition(C.target.matrixWorld),R.direction.sub(r),R.direction.transformDirection(_),d++}else if(C.isSpotLight){const R=n.spot[v];R.position.setFromMatrixPosition(C.matrixWorld),R.position.applyMatrix4(_),R.direction.setFromMatrixPosition(C.matrixWorld),r.setFromMatrixPosition(C.target.matrixWorld),R.direction.sub(r),R.direction.transformDirection(_),v++}else if(C.isRectAreaLight){const R=n.rectArea[M];R.position.setFromMatrixPosition(C.matrixWorld),R.position.applyMatrix4(_),a.identity(),s.copy(C.matrixWorld),s.premultiply(_),a.extractRotation(s),R.halfWidth.set(C.width*.5,0,0),R.halfHeight.set(0,C.height*.5,0),R.halfWidth.applyMatrix4(a),R.halfHeight.applyMatrix4(a),M++}else if(C.isPointLight){const R=n.point[f];R.position.setFromMatrixPosition(C.matrixWorld),R.position.applyMatrix4(_),f++}else if(C.isHemisphereLight){const R=n.hemi[T];R.direction.setFromMatrixPosition(C.matrixWorld),R.direction.transformDirection(_),T++}}}return{setup:o,setupView:h,state:n}}function Fc(i){const e=new Gm(i),t=[],n=[];function r(u){l.camera=u,t.length=0,n.length=0}function s(u){t.push(u)}function a(u){n.push(u)}function o(){e.setup(t)}function h(u){e.setupView(t,u)}const l={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:r,state:l,setupLights:o,setupLightsView:h,pushLight:s,pushShadow:a}}function Hm(i){let e=new WeakMap;function t(r,s=0){const a=e.get(r);let o;return a===void 0?(o=new Fc(i),e.set(r,[o])):s>=a.length?(o=new Fc(i),a.push(o)):o=a[s],o}function n(){e=new WeakMap}return{get:t,dispose:n}}const zm=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,km=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,Vm=[new k(1,0,0),new k(-1,0,0),new k(0,1,0),new k(0,-1,0),new k(0,0,1),new k(0,0,-1)],Xm=[new k(0,-1,0),new k(0,-1,0),new k(0,0,1),new k(0,0,-1),new k(0,-1,0),new k(0,-1,0)],Bc=new bt,cr=new k,ha=new k;function $m(i,e,t){let n=new To;const r=new lt,s=new lt,a=new Ct,o=new Kh,h=new Jh,l={},u=t.maxTextureSize,d={[Jn]:jt,[jt]:Jn,[Ln]:Ln},f=new wn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new lt},radius:{value:4}},vertexShader:zm,fragmentShader:km}),v=f.clone();v.defines.HORIZONTAL_PASS=1;const M=new Kt;M.setAttribute("position",new Tn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const T=new It(M,f),_=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=_r;let g=this.type;this.render=function(P,U,y){if(_.enabled===!1||_.autoUpdate===!1&&_.needsUpdate===!1||P.length===0)return;this.type===Gl&&(Ve("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=_r);const b=i.getRenderTarget(),j=i.getActiveCubeFace(),I=i.getActiveMipmapLevel(),V=i.state;V.setBlending(Nn),V.buffers.depth.getReversed()===!0?V.buffers.color.setClear(0,0,0,0):V.buffers.color.setClear(1,1,1,1),V.buffers.depth.setTest(!0),V.setScissorTest(!1);const $=g!==this.type;$&&U.traverse(function(q){q.material&&(Array.isArray(q.material)?q.material.forEach(X=>X.needsUpdate=!0):q.material.needsUpdate=!0)});for(let q=0,X=P.length;q<X;q++){const Y=P[q],H=Y.shadow;if(H===void 0){Ve("WebGLShadowMap:",Y,"has no shadow.");continue}if(H.autoUpdate===!1&&H.needsUpdate===!1)continue;r.copy(H.mapSize);const ae=H.getFrameExtents();r.multiply(ae),s.copy(H.mapSize),(r.x>u||r.y>u)&&(r.x>u&&(s.x=Math.floor(u/ae.x),r.x=s.x*ae.x,H.mapSize.x=s.x),r.y>u&&(s.y=Math.floor(u/ae.y),r.y=s.y*ae.y,H.mapSize.y=s.y));const ne=i.state.buffers.depth.getReversed();if(H.camera._reversedDepth=ne,H.map===null||$===!0){if(H.map!==null&&(H.map.depthTexture!==null&&(H.map.depthTexture.dispose(),H.map.depthTexture=null),H.map.dispose()),this.type===mr){if(Y.isPointLight){Ve("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}H.map=new En(r.x,r.y,{format:zi,type:Fn,minFilter:Yt,magFilter:Yt,generateMipmaps:!1}),H.map.texture.name=Y.name+".shadowMap",H.map.depthTexture=new Er(r.x,r.y,Mn),H.map.depthTexture.name=Y.name+".shadowMapDepth",H.map.depthTexture.format=Bn,H.map.depthTexture.compareFunction=null,H.map.depthTexture.minFilter=Dt,H.map.depthTexture.magFilter=Dt}else Y.isPointLight?(H.map=new Al(r.x),H.map.depthTexture=new Xh(r.x,bn)):(H.map=new En(r.x,r.y),H.map.depthTexture=new Er(r.x,r.y,bn)),H.map.depthTexture.name=Y.name+".shadowMap",H.map.depthTexture.format=Bn,this.type===_r?(H.map.depthTexture.compareFunction=ne?Mo:xo,H.map.depthTexture.minFilter=Yt,H.map.depthTexture.magFilter=Yt):(H.map.depthTexture.compareFunction=null,H.map.depthTexture.minFilter=Dt,H.map.depthTexture.magFilter=Dt);H.camera.updateProjectionMatrix()}const xe=H.map.isWebGLCubeRenderTarget?6:1;for(let Se=0;Se<xe;Se++){if(H.map.isWebGLCubeRenderTarget)i.setRenderTarget(H.map,Se),i.clear();else{Se===0&&(i.setRenderTarget(H.map),i.clear());const ye=H.getViewport(Se);a.set(s.x*ye.x,s.y*ye.y,s.x*ye.z,s.y*ye.w),V.viewport(a)}if(Y.isPointLight){const ye=H.camera,$e=H.matrix,yt=Y.distance||ye.far;yt!==ye.far&&(ye.far=yt,ye.updateProjectionMatrix()),cr.setFromMatrixPosition(Y.matrixWorld),ye.position.copy(cr),ha.copy(ye.position),ha.add(Vm[Se]),ye.up.copy(Xm[Se]),ye.lookAt(ha),ye.updateMatrixWorld(),$e.makeTranslation(-cr.x,-cr.y,-cr.z),Bc.multiplyMatrices(ye.projectionMatrix,ye.matrixWorldInverse),H._frustum.setFromProjectionMatrix(Bc,ye.coordinateSystem,ye.reversedDepth)}else H.updateMatrices(Y);n=H.getFrustum(),R(U,y,H.camera,Y,this.type)}H.isPointLightShadow!==!0&&this.type===mr&&A(H,y),H.needsUpdate=!1}g=this.type,_.needsUpdate=!1,i.setRenderTarget(b,j,I)};function A(P,U){const y=e.update(T);f.defines.VSM_SAMPLES!==P.blurSamples&&(f.defines.VSM_SAMPLES=P.blurSamples,v.defines.VSM_SAMPLES=P.blurSamples,f.needsUpdate=!0,v.needsUpdate=!0),P.mapPass===null&&(P.mapPass=new En(r.x,r.y,{format:zi,type:Fn})),f.uniforms.shadow_pass.value=P.map.depthTexture,f.uniforms.resolution.value=P.mapSize,f.uniforms.radius.value=P.radius,i.setRenderTarget(P.mapPass),i.clear(),i.renderBufferDirect(U,null,y,f,T,null),v.uniforms.shadow_pass.value=P.mapPass.texture,v.uniforms.resolution.value=P.mapSize,v.uniforms.radius.value=P.radius,i.setRenderTarget(P.map),i.clear(),i.renderBufferDirect(U,null,y,v,T,null)}function C(P,U,y,b){let j=null;const I=y.isPointLight===!0?P.customDistanceMaterial:P.customDepthMaterial;if(I!==void 0)j=I;else if(j=y.isPointLight===!0?h:o,i.localClippingEnabled&&U.clipShadows===!0&&Array.isArray(U.clippingPlanes)&&U.clippingPlanes.length!==0||U.displacementMap&&U.displacementScale!==0||U.alphaMap&&U.alphaTest>0||U.map&&U.alphaTest>0||U.alphaToCoverage===!0){const V=j.uuid,$=U.uuid;let q=l[V];q===void 0&&(q={},l[V]=q);let X=q[$];X===void 0&&(X=j.clone(),q[$]=X,U.addEventListener("dispose",D)),j=X}if(j.visible=U.visible,j.wireframe=U.wireframe,b===mr?j.side=U.shadowSide!==null?U.shadowSide:U.side:j.side=U.shadowSide!==null?U.shadowSide:d[U.side],j.alphaMap=U.alphaMap,j.alphaTest=U.alphaToCoverage===!0?.5:U.alphaTest,j.map=U.map,j.clipShadows=U.clipShadows,j.clippingPlanes=U.clippingPlanes,j.clipIntersection=U.clipIntersection,j.displacementMap=U.displacementMap,j.displacementScale=U.displacementScale,j.displacementBias=U.displacementBias,j.wireframeLinewidth=U.wireframeLinewidth,j.linewidth=U.linewidth,y.isPointLight===!0&&j.isMeshDistanceMaterial===!0){const V=i.properties.get(j);V.light=y}return j}function R(P,U,y,b,j){if(P.visible===!1)return;if(P.layers.test(U.layers)&&(P.isMesh||P.isLine||P.isPoints)&&(P.castShadow||P.receiveShadow&&j===mr)&&(!P.frustumCulled||n.intersectsObject(P))){P.modelViewMatrix.multiplyMatrices(y.matrixWorldInverse,P.matrixWorld);const $=e.update(P),q=P.material;if(Array.isArray(q)){const X=$.groups;for(let Y=0,H=X.length;Y<H;Y++){const ae=X[Y],ne=q[ae.materialIndex];if(ne&&ne.visible){const xe=C(P,ne,b,j);P.onBeforeShadow(i,P,U,y,$,xe,ae),i.renderBufferDirect(y,null,$,xe,P,ae),P.onAfterShadow(i,P,U,y,$,xe,ae)}}}else if(q.visible){const X=C(P,q,b,j);P.onBeforeShadow(i,P,U,y,$,X,null),i.renderBufferDirect(y,null,$,X,P,null),P.onAfterShadow(i,P,U,y,$,X,null)}}const V=P.children;for(let $=0,q=V.length;$<q;$++)R(V[$],U,y,b,j)}function D(P){P.target.removeEventListener("dispose",D);for(const y in l){const b=l[y],j=P.target.uuid;j in b&&(b[j].dispose(),delete b[j])}}}function Ym(i,e){function t(){let N=!1;const he=new Ct;let oe=null;const Ee=new Ct(0,0,0,0);return{setMask:function(ie){oe!==ie&&!N&&(i.colorMask(ie,ie,ie,ie),oe=ie)},setLocked:function(ie){N=ie},setClear:function(ie,Z,be,ze,_t){_t===!0&&(ie*=ze,Z*=ze,be*=ze),he.set(ie,Z,be,ze),Ee.equals(he)===!1&&(i.clearColor(ie,Z,be,ze),Ee.copy(he))},reset:function(){N=!1,oe=null,Ee.set(-1,0,0,0)}}}function n(){let N=!1,he=!1,oe=null,Ee=null,ie=null;return{setReversed:function(Z){if(he!==Z){const be=e.get("EXT_clip_control");Z?be.clipControlEXT(be.LOWER_LEFT_EXT,be.ZERO_TO_ONE_EXT):be.clipControlEXT(be.LOWER_LEFT_EXT,be.NEGATIVE_ONE_TO_ONE_EXT),he=Z;const ze=ie;ie=null,this.setClear(ze)}},getReversed:function(){return he},setTest:function(Z){Z?fe(i.DEPTH_TEST):de(i.DEPTH_TEST)},setMask:function(Z){oe!==Z&&!N&&(i.depthMask(Z),oe=Z)},setFunc:function(Z){if(he&&(Z=xh[Z]),Ee!==Z){switch(Z){case _a:i.depthFunc(i.NEVER);break;case va:i.depthFunc(i.ALWAYS);break;case xa:i.depthFunc(i.LESS);break;case Gi:i.depthFunc(i.LEQUAL);break;case Ma:i.depthFunc(i.EQUAL);break;case Sa:i.depthFunc(i.GEQUAL);break;case ya:i.depthFunc(i.GREATER);break;case Ea:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}Ee=Z}},setLocked:function(Z){N=Z},setClear:function(Z){ie!==Z&&(ie=Z,he&&(Z=1-Z),i.clearDepth(Z))},reset:function(){N=!1,oe=null,Ee=null,ie=null,he=!1}}}function r(){let N=!1,he=null,oe=null,Ee=null,ie=null,Z=null,be=null,ze=null,_t=null;return{setTest:function(je){N||(je?fe(i.STENCIL_TEST):de(i.STENCIL_TEST))},setMask:function(je){he!==je&&!N&&(i.stencilMask(je),he=je)},setFunc:function(je,on,Wt){(oe!==je||Ee!==on||ie!==Wt)&&(i.stencilFunc(je,on,Wt),oe=je,Ee=on,ie=Wt)},setOp:function(je,on,Wt){(Z!==je||be!==on||ze!==Wt)&&(i.stencilOp(je,on,Wt),Z=je,be=on,ze=Wt)},setLocked:function(je){N=je},setClear:function(je){_t!==je&&(i.clearStencil(je),_t=je)},reset:function(){N=!1,he=null,oe=null,Ee=null,ie=null,Z=null,be=null,ze=null,_t=null}}}const s=new t,a=new n,o=new r,h=new WeakMap,l=new WeakMap;let u={},d={},f=new WeakMap,v=[],M=null,T=!1,_=null,g=null,A=null,C=null,R=null,D=null,P=null,U=new ct(0,0,0),y=0,b=!1,j=null,I=null,V=null,$=null,q=null;const X=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let Y=!1,H=0;const ae=i.getParameter(i.VERSION);ae.indexOf("WebGL")!==-1?(H=parseFloat(/^WebGL (\d)/.exec(ae)[1]),Y=H>=1):ae.indexOf("OpenGL ES")!==-1&&(H=parseFloat(/^OpenGL ES (\d)/.exec(ae)[1]),Y=H>=2);let ne=null,xe={};const Se=i.getParameter(i.SCISSOR_BOX),ye=i.getParameter(i.VIEWPORT),$e=new Ct().fromArray(Se),yt=new Ct().fromArray(ye);function xt(N,he,oe,Ee){const ie=new Uint8Array(4),Z=i.createTexture();i.bindTexture(N,Z),i.texParameteri(N,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(N,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let be=0;be<oe;be++)N===i.TEXTURE_3D||N===i.TEXTURE_2D_ARRAY?i.texImage3D(he,0,i.RGBA,1,1,Ee,0,i.RGBA,i.UNSIGNED_BYTE,ie):i.texImage2D(he+be,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,ie);return Z}const Q={};Q[i.TEXTURE_2D]=xt(i.TEXTURE_2D,i.TEXTURE_2D,1),Q[i.TEXTURE_CUBE_MAP]=xt(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),Q[i.TEXTURE_2D_ARRAY]=xt(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),Q[i.TEXTURE_3D]=xt(i.TEXTURE_3D,i.TEXTURE_3D,1,1),s.setClear(0,0,0,1),a.setClear(1),o.setClear(0),fe(i.DEPTH_TEST),a.setFunc(Gi),qe(!1),Mt(No),fe(i.CULL_FACE),ht(Nn);function fe(N){u[N]!==!0&&(i.enable(N),u[N]=!0)}function de(N){u[N]!==!1&&(i.disable(N),u[N]=!1)}function Xe(N,he){return d[N]!==he?(i.bindFramebuffer(N,he),d[N]=he,N===i.DRAW_FRAMEBUFFER&&(d[i.FRAMEBUFFER]=he),N===i.FRAMEBUFFER&&(d[i.DRAW_FRAMEBUFFER]=he),!0):!1}function Oe(N,he){let oe=v,Ee=!1;if(N){oe=f.get(he),oe===void 0&&(oe=[],f.set(he,oe));const ie=N.textures;if(oe.length!==ie.length||oe[0]!==i.COLOR_ATTACHMENT0){for(let Z=0,be=ie.length;Z<be;Z++)oe[Z]=i.COLOR_ATTACHMENT0+Z;oe.length=ie.length,Ee=!0}}else oe[0]!==i.BACK&&(oe[0]=i.BACK,Ee=!0);Ee&&i.drawBuffers(oe)}function Ge(N){return M!==N?(i.useProgram(N),M=N,!0):!1}const At={[hi]:i.FUNC_ADD,[zl]:i.FUNC_SUBTRACT,[kl]:i.FUNC_REVERSE_SUBTRACT};At[Vl]=i.MIN,At[Xl]=i.MAX;const We={[$l]:i.ZERO,[Yl]:i.ONE,[ql]:i.SRC_COLOR,[ma]:i.SRC_ALPHA,[eh]:i.SRC_ALPHA_SATURATE,[Jl]:i.DST_COLOR,[jl]:i.DST_ALPHA,[Zl]:i.ONE_MINUS_SRC_COLOR,[ga]:i.ONE_MINUS_SRC_ALPHA,[Ql]:i.ONE_MINUS_DST_COLOR,[Kl]:i.ONE_MINUS_DST_ALPHA,[th]:i.CONSTANT_COLOR,[nh]:i.ONE_MINUS_CONSTANT_COLOR,[ih]:i.CONSTANT_ALPHA,[rh]:i.ONE_MINUS_CONSTANT_ALPHA};function ht(N,he,oe,Ee,ie,Z,be,ze,_t,je){if(N===Nn){T===!0&&(de(i.BLEND),T=!1);return}if(T===!1&&(fe(i.BLEND),T=!0),N!==Hl){if(N!==_||je!==b){if((g!==hi||R!==hi)&&(i.blendEquation(i.FUNC_ADD),g=hi,R=hi),je)switch(N){case Bi:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Oo:i.blendFunc(i.ONE,i.ONE);break;case Fo:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Bo:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:ft("WebGLState: Invalid blending: ",N);break}else switch(N){case Bi:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Oo:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case Fo:ft("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Bo:ft("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:ft("WebGLState: Invalid blending: ",N);break}A=null,C=null,D=null,P=null,U.set(0,0,0),y=0,_=N,b=je}return}ie=ie||he,Z=Z||oe,be=be||Ee,(he!==g||ie!==R)&&(i.blendEquationSeparate(At[he],At[ie]),g=he,R=ie),(oe!==A||Ee!==C||Z!==D||be!==P)&&(i.blendFuncSeparate(We[oe],We[Ee],We[Z],We[be]),A=oe,C=Ee,D=Z,P=be),(ze.equals(U)===!1||_t!==y)&&(i.blendColor(ze.r,ze.g,ze.b,_t),U.copy(ze),y=_t),_=N,b=!1}function mt(N,he){N.side===Ln?de(i.CULL_FACE):fe(i.CULL_FACE);let oe=N.side===jt;he&&(oe=!oe),qe(oe),N.blending===Bi&&N.transparent===!1?ht(Nn):ht(N.blending,N.blendEquation,N.blendSrc,N.blendDst,N.blendEquationAlpha,N.blendSrcAlpha,N.blendDstAlpha,N.blendColor,N.blendAlpha,N.premultipliedAlpha),a.setFunc(N.depthFunc),a.setTest(N.depthTest),a.setMask(N.depthWrite),s.setMask(N.colorWrite);const Ee=N.stencilWrite;o.setTest(Ee),Ee&&(o.setMask(N.stencilWriteMask),o.setFunc(N.stencilFunc,N.stencilRef,N.stencilFuncMask),o.setOp(N.stencilFail,N.stencilZFail,N.stencilZPass)),Tt(N.polygonOffset,N.polygonOffsetFactor,N.polygonOffsetUnits),N.alphaToCoverage===!0?fe(i.SAMPLE_ALPHA_TO_COVERAGE):de(i.SAMPLE_ALPHA_TO_COVERAGE)}function qe(N){j!==N&&(N?i.frontFace(i.CW):i.frontFace(i.CCW),j=N)}function Mt(N){N!==Bl?(fe(i.CULL_FACE),N!==I&&(N===No?i.cullFace(i.BACK):N===Wl?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):de(i.CULL_FACE),I=N}function L(N){N!==V&&(Y&&i.lineWidth(N),V=N)}function Tt(N,he,oe){N?(fe(i.POLYGON_OFFSET_FILL),($!==he||q!==oe)&&($=he,q=oe,a.getReversed()&&(he=-he),i.polygonOffset(he,oe))):de(i.POLYGON_OFFSET_FILL)}function it(N){N?fe(i.SCISSOR_TEST):de(i.SCISSOR_TEST)}function ut(N){N===void 0&&(N=i.TEXTURE0+X-1),ne!==N&&(i.activeTexture(N),ne=N)}function Ce(N,he,oe){oe===void 0&&(ne===null?oe=i.TEXTURE0+X-1:oe=ne);let Ee=xe[oe];Ee===void 0&&(Ee={type:void 0,texture:void 0},xe[oe]=Ee),(Ee.type!==N||Ee.texture!==he)&&(ne!==oe&&(i.activeTexture(oe),ne=oe),i.bindTexture(N,he||Q[N]),Ee.type=N,Ee.texture=he)}function w(){const N=xe[ne];N!==void 0&&N.type!==void 0&&(i.bindTexture(N.type,null),N.type=void 0,N.texture=void 0)}function x(){try{i.compressedTexImage2D(...arguments)}catch(N){ft("WebGLState:",N)}}function W(){try{i.compressedTexImage3D(...arguments)}catch(N){ft("WebGLState:",N)}}function J(){try{i.texSubImage2D(...arguments)}catch(N){ft("WebGLState:",N)}}function te(){try{i.texSubImage3D(...arguments)}catch(N){ft("WebGLState:",N)}}function K(){try{i.compressedTexSubImage2D(...arguments)}catch(N){ft("WebGLState:",N)}}function Te(){try{i.compressedTexSubImage3D(...arguments)}catch(N){ft("WebGLState:",N)}}function le(){try{i.texStorage2D(...arguments)}catch(N){ft("WebGLState:",N)}}function Ne(){try{i.texStorage3D(...arguments)}catch(N){ft("WebGLState:",N)}}function Fe(){try{i.texImage2D(...arguments)}catch(N){ft("WebGLState:",N)}}function re(){try{i.texImage3D(...arguments)}catch(N){ft("WebGLState:",N)}}function se(N){$e.equals(N)===!1&&(i.scissor(N.x,N.y,N.z,N.w),$e.copy(N))}function we(N){yt.equals(N)===!1&&(i.viewport(N.x,N.y,N.z,N.w),yt.copy(N))}function Re(N,he){let oe=l.get(he);oe===void 0&&(oe=new WeakMap,l.set(he,oe));let Ee=oe.get(N);Ee===void 0&&(Ee=i.getUniformBlockIndex(he,N.name),oe.set(N,Ee))}function Me(N,he){const Ee=l.get(he).get(N);h.get(he)!==Ee&&(i.uniformBlockBinding(he,Ee,N.__bindingPointIndex),h.set(he,Ee))}function Ze(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),u={},ne=null,xe={},d={},f=new WeakMap,v=[],M=null,T=!1,_=null,g=null,A=null,C=null,R=null,D=null,P=null,U=new ct(0,0,0),y=0,b=!1,j=null,I=null,V=null,$=null,q=null,$e.set(0,0,i.canvas.width,i.canvas.height),yt.set(0,0,i.canvas.width,i.canvas.height),s.reset(),a.reset(),o.reset()}return{buffers:{color:s,depth:a,stencil:o},enable:fe,disable:de,bindFramebuffer:Xe,drawBuffers:Oe,useProgram:Ge,setBlending:ht,setMaterial:mt,setFlipSided:qe,setCullFace:Mt,setLineWidth:L,setPolygonOffset:Tt,setScissorTest:it,activeTexture:ut,bindTexture:Ce,unbindTexture:w,compressedTexImage2D:x,compressedTexImage3D:W,texImage2D:Fe,texImage3D:re,updateUBOMapping:Re,uniformBlockBinding:Me,texStorage2D:le,texStorage3D:Ne,texSubImage2D:J,texSubImage3D:te,compressedTexSubImage2D:K,compressedTexSubImage3D:Te,scissor:se,viewport:we,reset:Ze}}function qm(i,e,t,n,r,s,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,h=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new lt,u=new WeakMap;let d;const f=new WeakMap;let v=!1;try{v=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function M(w,x){return v?new OffscreenCanvas(w,x):yr("canvas")}function T(w,x,W){let J=1;const te=Ce(w);if((te.width>W||te.height>W)&&(J=W/Math.max(te.width,te.height)),J<1)if(typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&w instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&w instanceof ImageBitmap||typeof VideoFrame<"u"&&w instanceof VideoFrame){const K=Math.floor(J*te.width),Te=Math.floor(J*te.height);d===void 0&&(d=M(K,Te));const le=x?M(K,Te):d;return le.width=K,le.height=Te,le.getContext("2d").drawImage(w,0,0,K,Te),Ve("WebGLRenderer: Texture has been resized from ("+te.width+"x"+te.height+") to ("+K+"x"+Te+")."),le}else return"data"in w&&Ve("WebGLRenderer: Image in DataTexture is too big ("+te.width+"x"+te.height+")."),w;return w}function _(w){return w.generateMipmaps}function g(w){i.generateMipmap(w)}function A(w){return w.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:w.isWebGL3DRenderTarget?i.TEXTURE_3D:w.isWebGLArrayRenderTarget||w.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function C(w,x,W,J,te=!1){if(w!==null){if(i[w]!==void 0)return i[w];Ve("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+w+"'")}let K=x;if(x===i.RED&&(W===i.FLOAT&&(K=i.R32F),W===i.HALF_FLOAT&&(K=i.R16F),W===i.UNSIGNED_BYTE&&(K=i.R8)),x===i.RED_INTEGER&&(W===i.UNSIGNED_BYTE&&(K=i.R8UI),W===i.UNSIGNED_SHORT&&(K=i.R16UI),W===i.UNSIGNED_INT&&(K=i.R32UI),W===i.BYTE&&(K=i.R8I),W===i.SHORT&&(K=i.R16I),W===i.INT&&(K=i.R32I)),x===i.RG&&(W===i.FLOAT&&(K=i.RG32F),W===i.HALF_FLOAT&&(K=i.RG16F),W===i.UNSIGNED_BYTE&&(K=i.RG8)),x===i.RG_INTEGER&&(W===i.UNSIGNED_BYTE&&(K=i.RG8UI),W===i.UNSIGNED_SHORT&&(K=i.RG16UI),W===i.UNSIGNED_INT&&(K=i.RG32UI),W===i.BYTE&&(K=i.RG8I),W===i.SHORT&&(K=i.RG16I),W===i.INT&&(K=i.RG32I)),x===i.RGB_INTEGER&&(W===i.UNSIGNED_BYTE&&(K=i.RGB8UI),W===i.UNSIGNED_SHORT&&(K=i.RGB16UI),W===i.UNSIGNED_INT&&(K=i.RGB32UI),W===i.BYTE&&(K=i.RGB8I),W===i.SHORT&&(K=i.RGB16I),W===i.INT&&(K=i.RGB32I)),x===i.RGBA_INTEGER&&(W===i.UNSIGNED_BYTE&&(K=i.RGBA8UI),W===i.UNSIGNED_SHORT&&(K=i.RGBA16UI),W===i.UNSIGNED_INT&&(K=i.RGBA32UI),W===i.BYTE&&(K=i.RGBA8I),W===i.SHORT&&(K=i.RGBA16I),W===i.INT&&(K=i.RGBA32I)),x===i.RGB&&(W===i.UNSIGNED_INT_5_9_9_9_REV&&(K=i.RGB9_E5),W===i.UNSIGNED_INT_10F_11F_11F_REV&&(K=i.R11F_G11F_B10F)),x===i.RGBA){const Te=te?hs:dt.getTransfer(J);W===i.FLOAT&&(K=i.RGBA32F),W===i.HALF_FLOAT&&(K=i.RGBA16F),W===i.UNSIGNED_BYTE&&(K=Te===gt?i.SRGB8_ALPHA8:i.RGBA8),W===i.UNSIGNED_SHORT_4_4_4_4&&(K=i.RGBA4),W===i.UNSIGNED_SHORT_5_5_5_1&&(K=i.RGB5_A1)}return(K===i.R16F||K===i.R32F||K===i.RG16F||K===i.RG32F||K===i.RGBA16F||K===i.RGBA32F)&&e.get("EXT_color_buffer_float"),K}function R(w,x){let W;return w?x===null||x===bn||x===Mr?W=i.DEPTH24_STENCIL8:x===Mn?W=i.DEPTH32F_STENCIL8:x===xr&&(W=i.DEPTH24_STENCIL8,Ve("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):x===null||x===bn||x===Mr?W=i.DEPTH_COMPONENT24:x===Mn?W=i.DEPTH_COMPONENT32F:x===xr&&(W=i.DEPTH_COMPONENT16),W}function D(w,x){return _(w)===!0||w.isFramebufferTexture&&w.minFilter!==Dt&&w.minFilter!==Yt?Math.log2(Math.max(x.width,x.height))+1:w.mipmaps!==void 0&&w.mipmaps.length>0?w.mipmaps.length:w.isCompressedTexture&&Array.isArray(w.image)?x.mipmaps.length:1}function P(w){const x=w.target;x.removeEventListener("dispose",P),y(x),x.isVideoTexture&&u.delete(x)}function U(w){const x=w.target;x.removeEventListener("dispose",U),j(x)}function y(w){const x=n.get(w);if(x.__webglInit===void 0)return;const W=w.source,J=f.get(W);if(J){const te=J[x.__cacheKey];te.usedTimes--,te.usedTimes===0&&b(w),Object.keys(J).length===0&&f.delete(W)}n.remove(w)}function b(w){const x=n.get(w);i.deleteTexture(x.__webglTexture);const W=w.source,J=f.get(W);delete J[x.__cacheKey],a.memory.textures--}function j(w){const x=n.get(w);if(w.depthTexture&&(w.depthTexture.dispose(),n.remove(w.depthTexture)),w.isWebGLCubeRenderTarget)for(let J=0;J<6;J++){if(Array.isArray(x.__webglFramebuffer[J]))for(let te=0;te<x.__webglFramebuffer[J].length;te++)i.deleteFramebuffer(x.__webglFramebuffer[J][te]);else i.deleteFramebuffer(x.__webglFramebuffer[J]);x.__webglDepthbuffer&&i.deleteRenderbuffer(x.__webglDepthbuffer[J])}else{if(Array.isArray(x.__webglFramebuffer))for(let J=0;J<x.__webglFramebuffer.length;J++)i.deleteFramebuffer(x.__webglFramebuffer[J]);else i.deleteFramebuffer(x.__webglFramebuffer);if(x.__webglDepthbuffer&&i.deleteRenderbuffer(x.__webglDepthbuffer),x.__webglMultisampledFramebuffer&&i.deleteFramebuffer(x.__webglMultisampledFramebuffer),x.__webglColorRenderbuffer)for(let J=0;J<x.__webglColorRenderbuffer.length;J++)x.__webglColorRenderbuffer[J]&&i.deleteRenderbuffer(x.__webglColorRenderbuffer[J]);x.__webglDepthRenderbuffer&&i.deleteRenderbuffer(x.__webglDepthRenderbuffer)}const W=w.textures;for(let J=0,te=W.length;J<te;J++){const K=n.get(W[J]);K.__webglTexture&&(i.deleteTexture(K.__webglTexture),a.memory.textures--),n.remove(W[J])}n.remove(w)}let I=0;function V(){I=0}function $(){const w=I;return w>=r.maxTextures&&Ve("WebGLTextures: Trying to use "+w+" texture units while this GPU supports only "+r.maxTextures),I+=1,w}function q(w){const x=[];return x.push(w.wrapS),x.push(w.wrapT),x.push(w.wrapR||0),x.push(w.magFilter),x.push(w.minFilter),x.push(w.anisotropy),x.push(w.internalFormat),x.push(w.format),x.push(w.type),x.push(w.generateMipmaps),x.push(w.premultiplyAlpha),x.push(w.flipY),x.push(w.unpackAlignment),x.push(w.colorSpace),x.join()}function X(w,x){const W=n.get(w);if(w.isVideoTexture&&it(w),w.isRenderTargetTexture===!1&&w.isExternalTexture!==!0&&w.version>0&&W.__version!==w.version){const J=w.image;if(J===null)Ve("WebGLRenderer: Texture marked for update but no image data found.");else if(J.complete===!1)Ve("WebGLRenderer: Texture marked for update but image is incomplete");else{Q(W,w,x);return}}else w.isExternalTexture&&(W.__webglTexture=w.sourceTexture?w.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,W.__webglTexture,i.TEXTURE0+x)}function Y(w,x){const W=n.get(w);if(w.isRenderTargetTexture===!1&&w.version>0&&W.__version!==w.version){Q(W,w,x);return}else w.isExternalTexture&&(W.__webglTexture=w.sourceTexture?w.sourceTexture:null);t.bindTexture(i.TEXTURE_2D_ARRAY,W.__webglTexture,i.TEXTURE0+x)}function H(w,x){const W=n.get(w);if(w.isRenderTargetTexture===!1&&w.version>0&&W.__version!==w.version){Q(W,w,x);return}t.bindTexture(i.TEXTURE_3D,W.__webglTexture,i.TEXTURE0+x)}function ae(w,x){const W=n.get(w);if(w.isCubeDepthTexture!==!0&&w.version>0&&W.__version!==w.version){fe(W,w,x);return}t.bindTexture(i.TEXTURE_CUBE_MAP,W.__webglTexture,i.TEXTURE0+x)}const ne={[di]:i.REPEAT,[Un]:i.CLAMP_TO_EDGE,[Ta]:i.MIRRORED_REPEAT},xe={[Dt]:i.NEAREST,[oh]:i.NEAREST_MIPMAP_NEAREST,[Pr]:i.NEAREST_MIPMAP_LINEAR,[Yt]:i.LINEAR,[Is]:i.LINEAR_MIPMAP_NEAREST,[pi]:i.LINEAR_MIPMAP_LINEAR},Se={[hh]:i.NEVER,[mh]:i.ALWAYS,[uh]:i.LESS,[xo]:i.LEQUAL,[fh]:i.EQUAL,[Mo]:i.GEQUAL,[dh]:i.GREATER,[ph]:i.NOTEQUAL};function ye(w,x){if(x.type===Mn&&e.has("OES_texture_float_linear")===!1&&(x.magFilter===Yt||x.magFilter===Is||x.magFilter===Pr||x.magFilter===pi||x.minFilter===Yt||x.minFilter===Is||x.minFilter===Pr||x.minFilter===pi)&&Ve("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(w,i.TEXTURE_WRAP_S,ne[x.wrapS]),i.texParameteri(w,i.TEXTURE_WRAP_T,ne[x.wrapT]),(w===i.TEXTURE_3D||w===i.TEXTURE_2D_ARRAY)&&i.texParameteri(w,i.TEXTURE_WRAP_R,ne[x.wrapR]),i.texParameteri(w,i.TEXTURE_MAG_FILTER,xe[x.magFilter]),i.texParameteri(w,i.TEXTURE_MIN_FILTER,xe[x.minFilter]),x.compareFunction&&(i.texParameteri(w,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(w,i.TEXTURE_COMPARE_FUNC,Se[x.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(x.magFilter===Dt||x.minFilter!==Pr&&x.minFilter!==pi||x.type===Mn&&e.has("OES_texture_float_linear")===!1)return;if(x.anisotropy>1||n.get(x).__currentAnisotropy){const W=e.get("EXT_texture_filter_anisotropic");i.texParameterf(w,W.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(x.anisotropy,r.getMaxAnisotropy())),n.get(x).__currentAnisotropy=x.anisotropy}}}function $e(w,x){let W=!1;w.__webglInit===void 0&&(w.__webglInit=!0,x.addEventListener("dispose",P));const J=x.source;let te=f.get(J);te===void 0&&(te={},f.set(J,te));const K=q(x);if(K!==w.__cacheKey){te[K]===void 0&&(te[K]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,W=!0),te[K].usedTimes++;const Te=te[w.__cacheKey];Te!==void 0&&(te[w.__cacheKey].usedTimes--,Te.usedTimes===0&&b(x)),w.__cacheKey=K,w.__webglTexture=te[K].texture}return W}function yt(w,x,W){return Math.floor(Math.floor(w/W)/x)}function xt(w,x,W,J){const K=w.updateRanges;if(K.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,x.width,x.height,W,J,x.data);else{K.sort((re,se)=>re.start-se.start);let Te=0;for(let re=1;re<K.length;re++){const se=K[Te],we=K[re],Re=se.start+se.count,Me=yt(we.start,x.width,4),Ze=yt(se.start,x.width,4);we.start<=Re+1&&Me===Ze&&yt(we.start+we.count-1,x.width,4)===Me?se.count=Math.max(se.count,we.start+we.count-se.start):(++Te,K[Te]=we)}K.length=Te+1;const le=i.getParameter(i.UNPACK_ROW_LENGTH),Ne=i.getParameter(i.UNPACK_SKIP_PIXELS),Fe=i.getParameter(i.UNPACK_SKIP_ROWS);i.pixelStorei(i.UNPACK_ROW_LENGTH,x.width);for(let re=0,se=K.length;re<se;re++){const we=K[re],Re=Math.floor(we.start/4),Me=Math.ceil(we.count/4),Ze=Re%x.width,N=Math.floor(Re/x.width),he=Me,oe=1;i.pixelStorei(i.UNPACK_SKIP_PIXELS,Ze),i.pixelStorei(i.UNPACK_SKIP_ROWS,N),t.texSubImage2D(i.TEXTURE_2D,0,Ze,N,he,oe,W,J,x.data)}w.clearUpdateRanges(),i.pixelStorei(i.UNPACK_ROW_LENGTH,le),i.pixelStorei(i.UNPACK_SKIP_PIXELS,Ne),i.pixelStorei(i.UNPACK_SKIP_ROWS,Fe)}}function Q(w,x,W){let J=i.TEXTURE_2D;(x.isDataArrayTexture||x.isCompressedArrayTexture)&&(J=i.TEXTURE_2D_ARRAY),x.isData3DTexture&&(J=i.TEXTURE_3D);const te=$e(w,x),K=x.source;t.bindTexture(J,w.__webglTexture,i.TEXTURE0+W);const Te=n.get(K);if(K.version!==Te.__version||te===!0){t.activeTexture(i.TEXTURE0+W);const le=dt.getPrimaries(dt.workingColorSpace),Ne=x.colorSpace===qn?null:dt.getPrimaries(x.colorSpace),Fe=x.colorSpace===qn||le===Ne?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,x.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,x.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Fe);let re=T(x.image,!1,r.maxTextureSize);re=ut(x,re);const se=s.convert(x.format,x.colorSpace),we=s.convert(x.type);let Re=C(x.internalFormat,se,we,x.colorSpace,x.isVideoTexture);ye(J,x);let Me;const Ze=x.mipmaps,N=x.isVideoTexture!==!0,he=Te.__version===void 0||te===!0,oe=K.dataReady,Ee=D(x,re);if(x.isDepthTexture)Re=R(x.format===mi,x.type),he&&(N?t.texStorage2D(i.TEXTURE_2D,1,Re,re.width,re.height):t.texImage2D(i.TEXTURE_2D,0,Re,re.width,re.height,0,se,we,null));else if(x.isDataTexture)if(Ze.length>0){N&&he&&t.texStorage2D(i.TEXTURE_2D,Ee,Re,Ze[0].width,Ze[0].height);for(let ie=0,Z=Ze.length;ie<Z;ie++)Me=Ze[ie],N?oe&&t.texSubImage2D(i.TEXTURE_2D,ie,0,0,Me.width,Me.height,se,we,Me.data):t.texImage2D(i.TEXTURE_2D,ie,Re,Me.width,Me.height,0,se,we,Me.data);x.generateMipmaps=!1}else N?(he&&t.texStorage2D(i.TEXTURE_2D,Ee,Re,re.width,re.height),oe&&xt(x,re,se,we)):t.texImage2D(i.TEXTURE_2D,0,Re,re.width,re.height,0,se,we,re.data);else if(x.isCompressedTexture)if(x.isCompressedArrayTexture){N&&he&&t.texStorage3D(i.TEXTURE_2D_ARRAY,Ee,Re,Ze[0].width,Ze[0].height,re.depth);for(let ie=0,Z=Ze.length;ie<Z;ie++)if(Me=Ze[ie],x.format!==dn)if(se!==null)if(N){if(oe)if(x.layerUpdates.size>0){const be=mc(Me.width,Me.height,x.format,x.type);for(const ze of x.layerUpdates){const _t=Me.data.subarray(ze*be/Me.data.BYTES_PER_ELEMENT,(ze+1)*be/Me.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ie,0,0,ze,Me.width,Me.height,1,se,_t)}x.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ie,0,0,0,Me.width,Me.height,re.depth,se,Me.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,ie,Re,Me.width,Me.height,re.depth,0,Me.data,0,0);else Ve("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else N?oe&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,ie,0,0,0,Me.width,Me.height,re.depth,se,we,Me.data):t.texImage3D(i.TEXTURE_2D_ARRAY,ie,Re,Me.width,Me.height,re.depth,0,se,we,Me.data)}else{N&&he&&t.texStorage2D(i.TEXTURE_2D,Ee,Re,Ze[0].width,Ze[0].height);for(let ie=0,Z=Ze.length;ie<Z;ie++)Me=Ze[ie],x.format!==dn?se!==null?N?oe&&t.compressedTexSubImage2D(i.TEXTURE_2D,ie,0,0,Me.width,Me.height,se,Me.data):t.compressedTexImage2D(i.TEXTURE_2D,ie,Re,Me.width,Me.height,0,Me.data):Ve("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):N?oe&&t.texSubImage2D(i.TEXTURE_2D,ie,0,0,Me.width,Me.height,se,we,Me.data):t.texImage2D(i.TEXTURE_2D,ie,Re,Me.width,Me.height,0,se,we,Me.data)}else if(x.isDataArrayTexture)if(N){if(he&&t.texStorage3D(i.TEXTURE_2D_ARRAY,Ee,Re,re.width,re.height,re.depth),oe)if(x.layerUpdates.size>0){const ie=mc(re.width,re.height,x.format,x.type);for(const Z of x.layerUpdates){const be=re.data.subarray(Z*ie/re.data.BYTES_PER_ELEMENT,(Z+1)*ie/re.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,Z,re.width,re.height,1,se,we,be)}x.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,re.width,re.height,re.depth,se,we,re.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,Re,re.width,re.height,re.depth,0,se,we,re.data);else if(x.isData3DTexture)N?(he&&t.texStorage3D(i.TEXTURE_3D,Ee,Re,re.width,re.height,re.depth),oe&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,re.width,re.height,re.depth,se,we,re.data)):t.texImage3D(i.TEXTURE_3D,0,Re,re.width,re.height,re.depth,0,se,we,re.data);else if(x.isFramebufferTexture){if(he)if(N)t.texStorage2D(i.TEXTURE_2D,Ee,Re,re.width,re.height);else{let ie=re.width,Z=re.height;for(let be=0;be<Ee;be++)t.texImage2D(i.TEXTURE_2D,be,Re,ie,Z,0,se,we,null),ie>>=1,Z>>=1}}else if(Ze.length>0){if(N&&he){const ie=Ce(Ze[0]);t.texStorage2D(i.TEXTURE_2D,Ee,Re,ie.width,ie.height)}for(let ie=0,Z=Ze.length;ie<Z;ie++)Me=Ze[ie],N?oe&&t.texSubImage2D(i.TEXTURE_2D,ie,0,0,se,we,Me):t.texImage2D(i.TEXTURE_2D,ie,Re,se,we,Me);x.generateMipmaps=!1}else if(N){if(he){const ie=Ce(re);t.texStorage2D(i.TEXTURE_2D,Ee,Re,ie.width,ie.height)}oe&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,se,we,re)}else t.texImage2D(i.TEXTURE_2D,0,Re,se,we,re);_(x)&&g(J),Te.__version=K.version,x.onUpdate&&x.onUpdate(x)}w.__version=x.version}function fe(w,x,W){if(x.image.length!==6)return;const J=$e(w,x),te=x.source;t.bindTexture(i.TEXTURE_CUBE_MAP,w.__webglTexture,i.TEXTURE0+W);const K=n.get(te);if(te.version!==K.__version||J===!0){t.activeTexture(i.TEXTURE0+W);const Te=dt.getPrimaries(dt.workingColorSpace),le=x.colorSpace===qn?null:dt.getPrimaries(x.colorSpace),Ne=x.colorSpace===qn||Te===le?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,x.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,x.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ne);const Fe=x.isCompressedTexture||x.image[0].isCompressedTexture,re=x.image[0]&&x.image[0].isDataTexture,se=[];for(let Z=0;Z<6;Z++)!Fe&&!re?se[Z]=T(x.image[Z],!0,r.maxCubemapSize):se[Z]=re?x.image[Z].image:x.image[Z],se[Z]=ut(x,se[Z]);const we=se[0],Re=s.convert(x.format,x.colorSpace),Me=s.convert(x.type),Ze=C(x.internalFormat,Re,Me,x.colorSpace),N=x.isVideoTexture!==!0,he=K.__version===void 0||J===!0,oe=te.dataReady;let Ee=D(x,we);ye(i.TEXTURE_CUBE_MAP,x);let ie;if(Fe){N&&he&&t.texStorage2D(i.TEXTURE_CUBE_MAP,Ee,Ze,we.width,we.height);for(let Z=0;Z<6;Z++){ie=se[Z].mipmaps;for(let be=0;be<ie.length;be++){const ze=ie[be];x.format!==dn?Re!==null?N?oe&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,be,0,0,ze.width,ze.height,Re,ze.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,be,Ze,ze.width,ze.height,0,ze.data):Ve("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):N?oe&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,be,0,0,ze.width,ze.height,Re,Me,ze.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,be,Ze,ze.width,ze.height,0,Re,Me,ze.data)}}}else{if(ie=x.mipmaps,N&&he){ie.length>0&&Ee++;const Z=Ce(se[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,Ee,Ze,Z.width,Z.height)}for(let Z=0;Z<6;Z++)if(re){N?oe&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,0,0,se[Z].width,se[Z].height,Re,Me,se[Z].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,Ze,se[Z].width,se[Z].height,0,Re,Me,se[Z].data);for(let be=0;be<ie.length;be++){const _t=ie[be].image[Z].image;N?oe&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,be+1,0,0,_t.width,_t.height,Re,Me,_t.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,be+1,Ze,_t.width,_t.height,0,Re,Me,_t.data)}}else{N?oe&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,0,0,Re,Me,se[Z]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,Ze,Re,Me,se[Z]);for(let be=0;be<ie.length;be++){const ze=ie[be];N?oe&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,be+1,0,0,Re,Me,ze.image[Z]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,be+1,Ze,Re,Me,ze.image[Z])}}}_(x)&&g(i.TEXTURE_CUBE_MAP),K.__version=te.version,x.onUpdate&&x.onUpdate(x)}w.__version=x.version}function de(w,x,W,J,te,K){const Te=s.convert(W.format,W.colorSpace),le=s.convert(W.type),Ne=C(W.internalFormat,Te,le,W.colorSpace),Fe=n.get(x),re=n.get(W);if(re.__renderTarget=x,!Fe.__hasExternalTextures){const se=Math.max(1,x.width>>K),we=Math.max(1,x.height>>K);te===i.TEXTURE_3D||te===i.TEXTURE_2D_ARRAY?t.texImage3D(te,K,Ne,se,we,x.depth,0,Te,le,null):t.texImage2D(te,K,Ne,se,we,0,Te,le,null)}t.bindFramebuffer(i.FRAMEBUFFER,w),Tt(x)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,J,te,re.__webglTexture,0,L(x)):(te===i.TEXTURE_2D||te>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&te<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,J,te,re.__webglTexture,K),t.bindFramebuffer(i.FRAMEBUFFER,null)}function Xe(w,x,W){if(i.bindRenderbuffer(i.RENDERBUFFER,w),x.depthBuffer){const J=x.depthTexture,te=J&&J.isDepthTexture?J.type:null,K=R(x.stencilBuffer,te),Te=x.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;Tt(x)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,L(x),K,x.width,x.height):W?i.renderbufferStorageMultisample(i.RENDERBUFFER,L(x),K,x.width,x.height):i.renderbufferStorage(i.RENDERBUFFER,K,x.width,x.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,Te,i.RENDERBUFFER,w)}else{const J=x.textures;for(let te=0;te<J.length;te++){const K=J[te],Te=s.convert(K.format,K.colorSpace),le=s.convert(K.type),Ne=C(K.internalFormat,Te,le,K.colorSpace);Tt(x)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,L(x),Ne,x.width,x.height):W?i.renderbufferStorageMultisample(i.RENDERBUFFER,L(x),Ne,x.width,x.height):i.renderbufferStorage(i.RENDERBUFFER,Ne,x.width,x.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Oe(w,x,W){const J=x.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(i.FRAMEBUFFER,w),!(x.depthTexture&&x.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const te=n.get(x.depthTexture);if(te.__renderTarget=x,(!te.__webglTexture||x.depthTexture.image.width!==x.width||x.depthTexture.image.height!==x.height)&&(x.depthTexture.image.width=x.width,x.depthTexture.image.height=x.height,x.depthTexture.needsUpdate=!0),J){if(te.__webglInit===void 0&&(te.__webglInit=!0,x.depthTexture.addEventListener("dispose",P)),te.__webglTexture===void 0){te.__webglTexture=i.createTexture(),t.bindTexture(i.TEXTURE_CUBE_MAP,te.__webglTexture),ye(i.TEXTURE_CUBE_MAP,x.depthTexture);const Fe=s.convert(x.depthTexture.format),re=s.convert(x.depthTexture.type);let se;x.depthTexture.format===Bn?se=i.DEPTH_COMPONENT24:x.depthTexture.format===mi&&(se=i.DEPTH24_STENCIL8);for(let we=0;we<6;we++)i.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+we,0,se,x.width,x.height,0,Fe,re,null)}}else X(x.depthTexture,0);const K=te.__webglTexture,Te=L(x),le=J?i.TEXTURE_CUBE_MAP_POSITIVE_X+W:i.TEXTURE_2D,Ne=x.depthTexture.format===mi?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(x.depthTexture.format===Bn)Tt(x)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,Ne,le,K,0,Te):i.framebufferTexture2D(i.FRAMEBUFFER,Ne,le,K,0);else if(x.depthTexture.format===mi)Tt(x)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,Ne,le,K,0,Te):i.framebufferTexture2D(i.FRAMEBUFFER,Ne,le,K,0);else throw new Error("Unknown depthTexture format")}function Ge(w){const x=n.get(w),W=w.isWebGLCubeRenderTarget===!0;if(x.__boundDepthTexture!==w.depthTexture){const J=w.depthTexture;if(x.__depthDisposeCallback&&x.__depthDisposeCallback(),J){const te=()=>{delete x.__boundDepthTexture,delete x.__depthDisposeCallback,J.removeEventListener("dispose",te)};J.addEventListener("dispose",te),x.__depthDisposeCallback=te}x.__boundDepthTexture=J}if(w.depthTexture&&!x.__autoAllocateDepthBuffer)if(W)for(let J=0;J<6;J++)Oe(x.__webglFramebuffer[J],w,J);else{const J=w.texture.mipmaps;J&&J.length>0?Oe(x.__webglFramebuffer[0],w,0):Oe(x.__webglFramebuffer,w,0)}else if(W){x.__webglDepthbuffer=[];for(let J=0;J<6;J++)if(t.bindFramebuffer(i.FRAMEBUFFER,x.__webglFramebuffer[J]),x.__webglDepthbuffer[J]===void 0)x.__webglDepthbuffer[J]=i.createRenderbuffer(),Xe(x.__webglDepthbuffer[J],w,!1);else{const te=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,K=x.__webglDepthbuffer[J];i.bindRenderbuffer(i.RENDERBUFFER,K),i.framebufferRenderbuffer(i.FRAMEBUFFER,te,i.RENDERBUFFER,K)}}else{const J=w.texture.mipmaps;if(J&&J.length>0?t.bindFramebuffer(i.FRAMEBUFFER,x.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,x.__webglFramebuffer),x.__webglDepthbuffer===void 0)x.__webglDepthbuffer=i.createRenderbuffer(),Xe(x.__webglDepthbuffer,w,!1);else{const te=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,K=x.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,K),i.framebufferRenderbuffer(i.FRAMEBUFFER,te,i.RENDERBUFFER,K)}}t.bindFramebuffer(i.FRAMEBUFFER,null)}function At(w,x,W){const J=n.get(w);x!==void 0&&de(J.__webglFramebuffer,w,w.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),W!==void 0&&Ge(w)}function We(w){const x=w.texture,W=n.get(w),J=n.get(x);w.addEventListener("dispose",U);const te=w.textures,K=w.isWebGLCubeRenderTarget===!0,Te=te.length>1;if(Te||(J.__webglTexture===void 0&&(J.__webglTexture=i.createTexture()),J.__version=x.version,a.memory.textures++),K){W.__webglFramebuffer=[];for(let le=0;le<6;le++)if(x.mipmaps&&x.mipmaps.length>0){W.__webglFramebuffer[le]=[];for(let Ne=0;Ne<x.mipmaps.length;Ne++)W.__webglFramebuffer[le][Ne]=i.createFramebuffer()}else W.__webglFramebuffer[le]=i.createFramebuffer()}else{if(x.mipmaps&&x.mipmaps.length>0){W.__webglFramebuffer=[];for(let le=0;le<x.mipmaps.length;le++)W.__webglFramebuffer[le]=i.createFramebuffer()}else W.__webglFramebuffer=i.createFramebuffer();if(Te)for(let le=0,Ne=te.length;le<Ne;le++){const Fe=n.get(te[le]);Fe.__webglTexture===void 0&&(Fe.__webglTexture=i.createTexture(),a.memory.textures++)}if(w.samples>0&&Tt(w)===!1){W.__webglMultisampledFramebuffer=i.createFramebuffer(),W.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,W.__webglMultisampledFramebuffer);for(let le=0;le<te.length;le++){const Ne=te[le];W.__webglColorRenderbuffer[le]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,W.__webglColorRenderbuffer[le]);const Fe=s.convert(Ne.format,Ne.colorSpace),re=s.convert(Ne.type),se=C(Ne.internalFormat,Fe,re,Ne.colorSpace,w.isXRRenderTarget===!0),we=L(w);i.renderbufferStorageMultisample(i.RENDERBUFFER,we,se,w.width,w.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+le,i.RENDERBUFFER,W.__webglColorRenderbuffer[le])}i.bindRenderbuffer(i.RENDERBUFFER,null),w.depthBuffer&&(W.__webglDepthRenderbuffer=i.createRenderbuffer(),Xe(W.__webglDepthRenderbuffer,w,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(K){t.bindTexture(i.TEXTURE_CUBE_MAP,J.__webglTexture),ye(i.TEXTURE_CUBE_MAP,x);for(let le=0;le<6;le++)if(x.mipmaps&&x.mipmaps.length>0)for(let Ne=0;Ne<x.mipmaps.length;Ne++)de(W.__webglFramebuffer[le][Ne],w,x,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+le,Ne);else de(W.__webglFramebuffer[le],w,x,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+le,0);_(x)&&g(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Te){for(let le=0,Ne=te.length;le<Ne;le++){const Fe=te[le],re=n.get(Fe);let se=i.TEXTURE_2D;(w.isWebGL3DRenderTarget||w.isWebGLArrayRenderTarget)&&(se=w.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(se,re.__webglTexture),ye(se,Fe),de(W.__webglFramebuffer,w,Fe,i.COLOR_ATTACHMENT0+le,se,0),_(Fe)&&g(se)}t.unbindTexture()}else{let le=i.TEXTURE_2D;if((w.isWebGL3DRenderTarget||w.isWebGLArrayRenderTarget)&&(le=w.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(le,J.__webglTexture),ye(le,x),x.mipmaps&&x.mipmaps.length>0)for(let Ne=0;Ne<x.mipmaps.length;Ne++)de(W.__webglFramebuffer[Ne],w,x,i.COLOR_ATTACHMENT0,le,Ne);else de(W.__webglFramebuffer,w,x,i.COLOR_ATTACHMENT0,le,0);_(x)&&g(le),t.unbindTexture()}w.depthBuffer&&Ge(w)}function ht(w){const x=w.textures;for(let W=0,J=x.length;W<J;W++){const te=x[W];if(_(te)){const K=A(w),Te=n.get(te).__webglTexture;t.bindTexture(K,Te),g(K),t.unbindTexture()}}}const mt=[],qe=[];function Mt(w){if(w.samples>0){if(Tt(w)===!1){const x=w.textures,W=w.width,J=w.height;let te=i.COLOR_BUFFER_BIT;const K=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Te=n.get(w),le=x.length>1;if(le)for(let Fe=0;Fe<x.length;Fe++)t.bindFramebuffer(i.FRAMEBUFFER,Te.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Fe,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,Te.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Fe,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,Te.__webglMultisampledFramebuffer);const Ne=w.texture.mipmaps;Ne&&Ne.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Te.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Te.__webglFramebuffer);for(let Fe=0;Fe<x.length;Fe++){if(w.resolveDepthBuffer&&(w.depthBuffer&&(te|=i.DEPTH_BUFFER_BIT),w.stencilBuffer&&w.resolveStencilBuffer&&(te|=i.STENCIL_BUFFER_BIT)),le){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Te.__webglColorRenderbuffer[Fe]);const re=n.get(x[Fe]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,re,0)}i.blitFramebuffer(0,0,W,J,0,0,W,J,te,i.NEAREST),h===!0&&(mt.length=0,qe.length=0,mt.push(i.COLOR_ATTACHMENT0+Fe),w.depthBuffer&&w.resolveDepthBuffer===!1&&(mt.push(K),qe.push(K),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,qe)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,mt))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),le)for(let Fe=0;Fe<x.length;Fe++){t.bindFramebuffer(i.FRAMEBUFFER,Te.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Fe,i.RENDERBUFFER,Te.__webglColorRenderbuffer[Fe]);const re=n.get(x[Fe]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,Te.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Fe,i.TEXTURE_2D,re,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Te.__webglMultisampledFramebuffer)}else if(w.depthBuffer&&w.resolveDepthBuffer===!1&&h){const x=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[x])}}}function L(w){return Math.min(r.maxSamples,w.samples)}function Tt(w){const x=n.get(w);return w.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&x.__useRenderToTexture!==!1}function it(w){const x=a.render.frame;u.get(w)!==x&&(u.set(w,x),w.update())}function ut(w,x){const W=w.colorSpace,J=w.format,te=w.type;return w.isCompressedTexture===!0||w.isVideoTexture===!0||W!==ki&&W!==qn&&(dt.getTransfer(W)===gt?(J!==dn||te!==rn)&&Ve("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):ft("WebGLTextures: Unsupported texture color space:",W)),x}function Ce(w){return typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement?(l.width=w.naturalWidth||w.width,l.height=w.naturalHeight||w.height):typeof VideoFrame<"u"&&w instanceof VideoFrame?(l.width=w.displayWidth,l.height=w.displayHeight):(l.width=w.width,l.height=w.height),l}this.allocateTextureUnit=$,this.resetTextureUnits=V,this.setTexture2D=X,this.setTexture2DArray=Y,this.setTexture3D=H,this.setTextureCube=ae,this.rebindTextures=At,this.setupRenderTarget=We,this.updateRenderTargetMipmap=ht,this.updateMultisampleRenderTarget=Mt,this.setupDepthRenderbuffer=Ge,this.setupFrameBufferTexture=de,this.useMultisampledRTT=Tt,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function Zm(i,e){function t(n,r=qn){let s;const a=dt.getTransfer(r);if(n===rn)return i.UNSIGNED_BYTE;if(n===po)return i.UNSIGNED_SHORT_4_4_4_4;if(n===mo)return i.UNSIGNED_SHORT_5_5_5_1;if(n===ll)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===hl)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===ol)return i.BYTE;if(n===cl)return i.SHORT;if(n===xr)return i.UNSIGNED_SHORT;if(n===fo)return i.INT;if(n===bn)return i.UNSIGNED_INT;if(n===Mn)return i.FLOAT;if(n===Fn)return i.HALF_FLOAT;if(n===ul)return i.ALPHA;if(n===fl)return i.RGB;if(n===dn)return i.RGBA;if(n===Bn)return i.DEPTH_COMPONENT;if(n===mi)return i.DEPTH_STENCIL;if(n===dl)return i.RED;if(n===go)return i.RED_INTEGER;if(n===zi)return i.RG;if(n===_o)return i.RG_INTEGER;if(n===vo)return i.RGBA_INTEGER;if(n===is||n===rs||n===ss||n===as)if(a===gt)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(n===is)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===rs)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===ss)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===as)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(n===is)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===rs)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===ss)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===as)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===ba||n===Aa||n===wa||n===Ra)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(n===ba)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Aa)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===wa)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Ra)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Ca||n===Pa||n===Ia||n===Da||n===La||n===Ua||n===Na)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(n===Ca||n===Pa)return a===gt?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(n===Ia)return a===gt?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC;if(n===Da)return s.COMPRESSED_R11_EAC;if(n===La)return s.COMPRESSED_SIGNED_R11_EAC;if(n===Ua)return s.COMPRESSED_RG11_EAC;if(n===Na)return s.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===Oa||n===Fa||n===Ba||n===Wa||n===Ga||n===Ha||n===za||n===ka||n===Va||n===Xa||n===$a||n===Ya||n===qa||n===Za)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(n===Oa)return a===gt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Fa)return a===gt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Ba)return a===gt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Wa)return a===gt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Ga)return a===gt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Ha)return a===gt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===za)return a===gt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===ka)return a===gt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Va)return a===gt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Xa)return a===gt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===$a)return a===gt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Ya)return a===gt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===qa)return a===gt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Za)return a===gt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===ja||n===Ka||n===Ja)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(n===ja)return a===gt?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Ka)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Ja)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Qa||n===eo||n===to||n===no)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(n===Qa)return s.COMPRESSED_RED_RGTC1_EXT;if(n===eo)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===to)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===no)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Mr?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}const jm=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Km=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class Jm{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const n=new yl(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new wn({vertexShader:jm,fragmentShader:Km,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new It(new Ar(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Qm extends Zi{constructor(e,t){super();const n=this;let r=null,s=1,a=null,o="local-floor",h=1,l=null,u=null,d=null,f=null,v=null,M=null;const T=typeof XRWebGLBinding<"u",_=new Jm,g={},A=t.getContextAttributes();let C=null,R=null;const D=[],P=[],U=new lt;let y=null;const b=new an;b.viewport=new Ct;const j=new an;j.viewport=new Ct;const I=[b,j],V=new lu;let $=null,q=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Q){let fe=D[Q];return fe===void 0&&(fe=new Ws,D[Q]=fe),fe.getTargetRaySpace()},this.getControllerGrip=function(Q){let fe=D[Q];return fe===void 0&&(fe=new Ws,D[Q]=fe),fe.getGripSpace()},this.getHand=function(Q){let fe=D[Q];return fe===void 0&&(fe=new Ws,D[Q]=fe),fe.getHandSpace()};function X(Q){const fe=P.indexOf(Q.inputSource);if(fe===-1)return;const de=D[fe];de!==void 0&&(de.update(Q.inputSource,Q.frame,l||a),de.dispatchEvent({type:Q.type,data:Q.inputSource}))}function Y(){r.removeEventListener("select",X),r.removeEventListener("selectstart",X),r.removeEventListener("selectend",X),r.removeEventListener("squeeze",X),r.removeEventListener("squeezestart",X),r.removeEventListener("squeezeend",X),r.removeEventListener("end",Y),r.removeEventListener("inputsourceschange",H);for(let Q=0;Q<D.length;Q++){const fe=P[Q];fe!==null&&(P[Q]=null,D[Q].disconnect(fe))}$=null,q=null,_.reset();for(const Q in g)delete g[Q];e.setRenderTarget(C),v=null,f=null,d=null,r=null,R=null,xt.stop(),n.isPresenting=!1,e.setPixelRatio(y),e.setSize(U.width,U.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Q){s=Q,n.isPresenting===!0&&Ve("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Q){o=Q,n.isPresenting===!0&&Ve("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(Q){l=Q},this.getBaseLayer=function(){return f!==null?f:v},this.getBinding=function(){return d===null&&T&&(d=new XRWebGLBinding(r,t)),d},this.getFrame=function(){return M},this.getSession=function(){return r},this.setSession=async function(Q){if(r=Q,r!==null){if(C=e.getRenderTarget(),r.addEventListener("select",X),r.addEventListener("selectstart",X),r.addEventListener("selectend",X),r.addEventListener("squeeze",X),r.addEventListener("squeezestart",X),r.addEventListener("squeezeend",X),r.addEventListener("end",Y),r.addEventListener("inputsourceschange",H),A.xrCompatible!==!0&&await t.makeXRCompatible(),y=e.getPixelRatio(),e.getSize(U),T&&"createProjectionLayer"in XRWebGLBinding.prototype){let de=null,Xe=null,Oe=null;A.depth&&(Oe=A.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,de=A.stencil?mi:Bn,Xe=A.stencil?Mr:bn);const Ge={colorFormat:t.RGBA8,depthFormat:Oe,scaleFactor:s};d=this.getBinding(),f=d.createProjectionLayer(Ge),r.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),R=new En(f.textureWidth,f.textureHeight,{format:dn,type:rn,depthTexture:new Er(f.textureWidth,f.textureHeight,Xe,void 0,void 0,void 0,void 0,void 0,void 0,de),stencilBuffer:A.stencil,colorSpace:e.outputColorSpace,samples:A.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}else{const de={antialias:A.antialias,alpha:!0,depth:A.depth,stencil:A.stencil,framebufferScaleFactor:s};v=new XRWebGLLayer(r,t,de),r.updateRenderState({baseLayer:v}),e.setPixelRatio(1),e.setSize(v.framebufferWidth,v.framebufferHeight,!1),R=new En(v.framebufferWidth,v.framebufferHeight,{format:dn,type:rn,colorSpace:e.outputColorSpace,stencilBuffer:A.stencil,resolveDepthBuffer:v.ignoreDepthValues===!1,resolveStencilBuffer:v.ignoreDepthValues===!1})}R.isXRRenderTarget=!0,this.setFoveation(h),l=null,a=await r.requestReferenceSpace(o),xt.setContext(r),xt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function H(Q){for(let fe=0;fe<Q.removed.length;fe++){const de=Q.removed[fe],Xe=P.indexOf(de);Xe>=0&&(P[Xe]=null,D[Xe].disconnect(de))}for(let fe=0;fe<Q.added.length;fe++){const de=Q.added[fe];let Xe=P.indexOf(de);if(Xe===-1){for(let Ge=0;Ge<D.length;Ge++)if(Ge>=P.length){P.push(de),Xe=Ge;break}else if(P[Ge]===null){P[Ge]=de,Xe=Ge;break}if(Xe===-1)break}const Oe=D[Xe];Oe&&Oe.connect(de)}}const ae=new k,ne=new k;function xe(Q,fe,de){ae.setFromMatrixPosition(fe.matrixWorld),ne.setFromMatrixPosition(de.matrixWorld);const Xe=ae.distanceTo(ne),Oe=fe.projectionMatrix.elements,Ge=de.projectionMatrix.elements,At=Oe[14]/(Oe[10]-1),We=Oe[14]/(Oe[10]+1),ht=(Oe[9]+1)/Oe[5],mt=(Oe[9]-1)/Oe[5],qe=(Oe[8]-1)/Oe[0],Mt=(Ge[8]+1)/Ge[0],L=At*qe,Tt=At*Mt,it=Xe/(-qe+Mt),ut=it*-qe;if(fe.matrixWorld.decompose(Q.position,Q.quaternion,Q.scale),Q.translateX(ut),Q.translateZ(it),Q.matrixWorld.compose(Q.position,Q.quaternion,Q.scale),Q.matrixWorldInverse.copy(Q.matrixWorld).invert(),Oe[10]===-1)Q.projectionMatrix.copy(fe.projectionMatrix),Q.projectionMatrixInverse.copy(fe.projectionMatrixInverse);else{const Ce=At+it,w=We+it,x=L-ut,W=Tt+(Xe-ut),J=ht*We/w*Ce,te=mt*We/w*Ce;Q.projectionMatrix.makePerspective(x,W,J,te,Ce,w),Q.projectionMatrixInverse.copy(Q.projectionMatrix).invert()}}function Se(Q,fe){fe===null?Q.matrixWorld.copy(Q.matrix):Q.matrixWorld.multiplyMatrices(fe.matrixWorld,Q.matrix),Q.matrixWorldInverse.copy(Q.matrixWorld).invert()}this.updateCamera=function(Q){if(r===null)return;let fe=Q.near,de=Q.far;_.texture!==null&&(_.depthNear>0&&(fe=_.depthNear),_.depthFar>0&&(de=_.depthFar)),V.near=j.near=b.near=fe,V.far=j.far=b.far=de,($!==V.near||q!==V.far)&&(r.updateRenderState({depthNear:V.near,depthFar:V.far}),$=V.near,q=V.far),V.layers.mask=Q.layers.mask|6,b.layers.mask=V.layers.mask&-5,j.layers.mask=V.layers.mask&-3;const Xe=Q.parent,Oe=V.cameras;Se(V,Xe);for(let Ge=0;Ge<Oe.length;Ge++)Se(Oe[Ge],Xe);Oe.length===2?xe(V,b,j):V.projectionMatrix.copy(b.projectionMatrix),ye(Q,V,Xe)};function ye(Q,fe,de){de===null?Q.matrix.copy(fe.matrixWorld):(Q.matrix.copy(de.matrixWorld),Q.matrix.invert(),Q.matrix.multiply(fe.matrixWorld)),Q.matrix.decompose(Q.position,Q.quaternion,Q.scale),Q.updateMatrixWorld(!0),Q.projectionMatrix.copy(fe.projectionMatrix),Q.projectionMatrixInverse.copy(fe.projectionMatrixInverse),Q.isPerspectiveCamera&&(Q.fov=io*2*Math.atan(1/Q.projectionMatrix.elements[5]),Q.zoom=1)}this.getCamera=function(){return V},this.getFoveation=function(){if(!(f===null&&v===null))return h},this.setFoveation=function(Q){h=Q,f!==null&&(f.fixedFoveation=Q),v!==null&&v.fixedFoveation!==void 0&&(v.fixedFoveation=Q)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(V)},this.getCameraTexture=function(Q){return g[Q]};let $e=null;function yt(Q,fe){if(u=fe.getViewerPose(l||a),M=fe,u!==null){const de=u.views;v!==null&&(e.setRenderTargetFramebuffer(R,v.framebuffer),e.setRenderTarget(R));let Xe=!1;de.length!==V.cameras.length&&(V.cameras.length=0,Xe=!0);for(let We=0;We<de.length;We++){const ht=de[We];let mt=null;if(v!==null)mt=v.getViewport(ht);else{const Mt=d.getViewSubImage(f,ht);mt=Mt.viewport,We===0&&(e.setRenderTargetTextures(R,Mt.colorTexture,Mt.depthStencilTexture),e.setRenderTarget(R))}let qe=I[We];qe===void 0&&(qe=new an,qe.layers.enable(We),qe.viewport=new Ct,I[We]=qe),qe.matrix.fromArray(ht.transform.matrix),qe.matrix.decompose(qe.position,qe.quaternion,qe.scale),qe.projectionMatrix.fromArray(ht.projectionMatrix),qe.projectionMatrixInverse.copy(qe.projectionMatrix).invert(),qe.viewport.set(mt.x,mt.y,mt.width,mt.height),We===0&&(V.matrix.copy(qe.matrix),V.matrix.decompose(V.position,V.quaternion,V.scale)),Xe===!0&&V.cameras.push(qe)}const Oe=r.enabledFeatures;if(Oe&&Oe.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&T){d=n.getBinding();const We=d.getDepthInformation(de[0]);We&&We.isValid&&We.texture&&_.init(We,r.renderState)}if(Oe&&Oe.includes("camera-access")&&T){e.state.unbindTexture(),d=n.getBinding();for(let We=0;We<de.length;We++){const ht=de[We].camera;if(ht){let mt=g[ht];mt||(mt=new yl,g[ht]=mt);const qe=d.getCameraImage(ht);mt.sourceTexture=qe}}}}for(let de=0;de<D.length;de++){const Xe=P[de],Oe=D[de];Xe!==null&&Oe!==void 0&&Oe.update(Xe,fe,l||a)}$e&&$e(Q,fe),fe.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:fe}),M=null}const xt=new bl;xt.setAnimationLoop(yt),this.setAnimationLoop=function(Q){$e=Q},this.dispose=function(){}}}const oi=new An,eg=new bt;function tg(i,e){function t(_,g){_.matrixAutoUpdate===!0&&_.updateMatrix(),g.value.copy(_.matrix)}function n(_,g){g.color.getRGB(_.fogColor.value,El(i)),g.isFog?(_.fogNear.value=g.near,_.fogFar.value=g.far):g.isFogExp2&&(_.fogDensity.value=g.density)}function r(_,g,A,C,R){g.isMeshBasicMaterial?s(_,g):g.isMeshLambertMaterial?(s(_,g),g.envMap&&(_.envMapIntensity.value=g.envMapIntensity)):g.isMeshToonMaterial?(s(_,g),d(_,g)):g.isMeshPhongMaterial?(s(_,g),u(_,g),g.envMap&&(_.envMapIntensity.value=g.envMapIntensity)):g.isMeshStandardMaterial?(s(_,g),f(_,g),g.isMeshPhysicalMaterial&&v(_,g,R)):g.isMeshMatcapMaterial?(s(_,g),M(_,g)):g.isMeshDepthMaterial?s(_,g):g.isMeshDistanceMaterial?(s(_,g),T(_,g)):g.isMeshNormalMaterial?s(_,g):g.isLineBasicMaterial?(a(_,g),g.isLineDashedMaterial&&o(_,g)):g.isPointsMaterial?h(_,g,A,C):g.isSpriteMaterial?l(_,g):g.isShadowMaterial?(_.color.value.copy(g.color),_.opacity.value=g.opacity):g.isShaderMaterial&&(g.uniformsNeedUpdate=!1)}function s(_,g){_.opacity.value=g.opacity,g.color&&_.diffuse.value.copy(g.color),g.emissive&&_.emissive.value.copy(g.emissive).multiplyScalar(g.emissiveIntensity),g.map&&(_.map.value=g.map,t(g.map,_.mapTransform)),g.alphaMap&&(_.alphaMap.value=g.alphaMap,t(g.alphaMap,_.alphaMapTransform)),g.bumpMap&&(_.bumpMap.value=g.bumpMap,t(g.bumpMap,_.bumpMapTransform),_.bumpScale.value=g.bumpScale,g.side===jt&&(_.bumpScale.value*=-1)),g.normalMap&&(_.normalMap.value=g.normalMap,t(g.normalMap,_.normalMapTransform),_.normalScale.value.copy(g.normalScale),g.side===jt&&_.normalScale.value.negate()),g.displacementMap&&(_.displacementMap.value=g.displacementMap,t(g.displacementMap,_.displacementMapTransform),_.displacementScale.value=g.displacementScale,_.displacementBias.value=g.displacementBias),g.emissiveMap&&(_.emissiveMap.value=g.emissiveMap,t(g.emissiveMap,_.emissiveMapTransform)),g.specularMap&&(_.specularMap.value=g.specularMap,t(g.specularMap,_.specularMapTransform)),g.alphaTest>0&&(_.alphaTest.value=g.alphaTest);const A=e.get(g),C=A.envMap,R=A.envMapRotation;C&&(_.envMap.value=C,oi.copy(R),oi.x*=-1,oi.y*=-1,oi.z*=-1,C.isCubeTexture&&C.isRenderTargetTexture===!1&&(oi.y*=-1,oi.z*=-1),_.envMapRotation.value.setFromMatrix4(eg.makeRotationFromEuler(oi)),_.flipEnvMap.value=C.isCubeTexture&&C.isRenderTargetTexture===!1?-1:1,_.reflectivity.value=g.reflectivity,_.ior.value=g.ior,_.refractionRatio.value=g.refractionRatio),g.lightMap&&(_.lightMap.value=g.lightMap,_.lightMapIntensity.value=g.lightMapIntensity,t(g.lightMap,_.lightMapTransform)),g.aoMap&&(_.aoMap.value=g.aoMap,_.aoMapIntensity.value=g.aoMapIntensity,t(g.aoMap,_.aoMapTransform))}function a(_,g){_.diffuse.value.copy(g.color),_.opacity.value=g.opacity,g.map&&(_.map.value=g.map,t(g.map,_.mapTransform))}function o(_,g){_.dashSize.value=g.dashSize,_.totalSize.value=g.dashSize+g.gapSize,_.scale.value=g.scale}function h(_,g,A,C){_.diffuse.value.copy(g.color),_.opacity.value=g.opacity,_.size.value=g.size*A,_.scale.value=C*.5,g.map&&(_.map.value=g.map,t(g.map,_.uvTransform)),g.alphaMap&&(_.alphaMap.value=g.alphaMap,t(g.alphaMap,_.alphaMapTransform)),g.alphaTest>0&&(_.alphaTest.value=g.alphaTest)}function l(_,g){_.diffuse.value.copy(g.color),_.opacity.value=g.opacity,_.rotation.value=g.rotation,g.map&&(_.map.value=g.map,t(g.map,_.mapTransform)),g.alphaMap&&(_.alphaMap.value=g.alphaMap,t(g.alphaMap,_.alphaMapTransform)),g.alphaTest>0&&(_.alphaTest.value=g.alphaTest)}function u(_,g){_.specular.value.copy(g.specular),_.shininess.value=Math.max(g.shininess,1e-4)}function d(_,g){g.gradientMap&&(_.gradientMap.value=g.gradientMap)}function f(_,g){_.metalness.value=g.metalness,g.metalnessMap&&(_.metalnessMap.value=g.metalnessMap,t(g.metalnessMap,_.metalnessMapTransform)),_.roughness.value=g.roughness,g.roughnessMap&&(_.roughnessMap.value=g.roughnessMap,t(g.roughnessMap,_.roughnessMapTransform)),g.envMap&&(_.envMapIntensity.value=g.envMapIntensity)}function v(_,g,A){_.ior.value=g.ior,g.sheen>0&&(_.sheenColor.value.copy(g.sheenColor).multiplyScalar(g.sheen),_.sheenRoughness.value=g.sheenRoughness,g.sheenColorMap&&(_.sheenColorMap.value=g.sheenColorMap,t(g.sheenColorMap,_.sheenColorMapTransform)),g.sheenRoughnessMap&&(_.sheenRoughnessMap.value=g.sheenRoughnessMap,t(g.sheenRoughnessMap,_.sheenRoughnessMapTransform))),g.clearcoat>0&&(_.clearcoat.value=g.clearcoat,_.clearcoatRoughness.value=g.clearcoatRoughness,g.clearcoatMap&&(_.clearcoatMap.value=g.clearcoatMap,t(g.clearcoatMap,_.clearcoatMapTransform)),g.clearcoatRoughnessMap&&(_.clearcoatRoughnessMap.value=g.clearcoatRoughnessMap,t(g.clearcoatRoughnessMap,_.clearcoatRoughnessMapTransform)),g.clearcoatNormalMap&&(_.clearcoatNormalMap.value=g.clearcoatNormalMap,t(g.clearcoatNormalMap,_.clearcoatNormalMapTransform),_.clearcoatNormalScale.value.copy(g.clearcoatNormalScale),g.side===jt&&_.clearcoatNormalScale.value.negate())),g.dispersion>0&&(_.dispersion.value=g.dispersion),g.iridescence>0&&(_.iridescence.value=g.iridescence,_.iridescenceIOR.value=g.iridescenceIOR,_.iridescenceThicknessMinimum.value=g.iridescenceThicknessRange[0],_.iridescenceThicknessMaximum.value=g.iridescenceThicknessRange[1],g.iridescenceMap&&(_.iridescenceMap.value=g.iridescenceMap,t(g.iridescenceMap,_.iridescenceMapTransform)),g.iridescenceThicknessMap&&(_.iridescenceThicknessMap.value=g.iridescenceThicknessMap,t(g.iridescenceThicknessMap,_.iridescenceThicknessMapTransform))),g.transmission>0&&(_.transmission.value=g.transmission,_.transmissionSamplerMap.value=A.texture,_.transmissionSamplerSize.value.set(A.width,A.height),g.transmissionMap&&(_.transmissionMap.value=g.transmissionMap,t(g.transmissionMap,_.transmissionMapTransform)),_.thickness.value=g.thickness,g.thicknessMap&&(_.thicknessMap.value=g.thicknessMap,t(g.thicknessMap,_.thicknessMapTransform)),_.attenuationDistance.value=g.attenuationDistance,_.attenuationColor.value.copy(g.attenuationColor)),g.anisotropy>0&&(_.anisotropyVector.value.set(g.anisotropy*Math.cos(g.anisotropyRotation),g.anisotropy*Math.sin(g.anisotropyRotation)),g.anisotropyMap&&(_.anisotropyMap.value=g.anisotropyMap,t(g.anisotropyMap,_.anisotropyMapTransform))),_.specularIntensity.value=g.specularIntensity,_.specularColor.value.copy(g.specularColor),g.specularColorMap&&(_.specularColorMap.value=g.specularColorMap,t(g.specularColorMap,_.specularColorMapTransform)),g.specularIntensityMap&&(_.specularIntensityMap.value=g.specularIntensityMap,t(g.specularIntensityMap,_.specularIntensityMapTransform))}function M(_,g){g.matcap&&(_.matcap.value=g.matcap)}function T(_,g){const A=e.get(g).light;_.referencePosition.value.setFromMatrixPosition(A.matrixWorld),_.nearDistance.value=A.shadow.camera.near,_.farDistance.value=A.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:r}}function ng(i,e,t,n){let r={},s={},a=[];const o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function h(A,C){const R=C.program;n.uniformBlockBinding(A,R)}function l(A,C){let R=r[A.id];R===void 0&&(M(A),R=u(A),r[A.id]=R,A.addEventListener("dispose",_));const D=C.program;n.updateUBOMapping(A,D);const P=e.render.frame;s[A.id]!==P&&(f(A),s[A.id]=P)}function u(A){const C=d();A.__bindingPointIndex=C;const R=i.createBuffer(),D=A.__size,P=A.usage;return i.bindBuffer(i.UNIFORM_BUFFER,R),i.bufferData(i.UNIFORM_BUFFER,D,P),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,C,R),R}function d(){for(let A=0;A<o;A++)if(a.indexOf(A)===-1)return a.push(A),A;return ft("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(A){const C=r[A.id],R=A.uniforms,D=A.__cache;i.bindBuffer(i.UNIFORM_BUFFER,C);for(let P=0,U=R.length;P<U;P++){const y=Array.isArray(R[P])?R[P]:[R[P]];for(let b=0,j=y.length;b<j;b++){const I=y[b];if(v(I,P,b,D)===!0){const V=I.__offset,$=Array.isArray(I.value)?I.value:[I.value];let q=0;for(let X=0;X<$.length;X++){const Y=$[X],H=T(Y);typeof Y=="number"||typeof Y=="boolean"?(I.__data[0]=Y,i.bufferSubData(i.UNIFORM_BUFFER,V+q,I.__data)):Y.isMatrix3?(I.__data[0]=Y.elements[0],I.__data[1]=Y.elements[1],I.__data[2]=Y.elements[2],I.__data[3]=0,I.__data[4]=Y.elements[3],I.__data[5]=Y.elements[4],I.__data[6]=Y.elements[5],I.__data[7]=0,I.__data[8]=Y.elements[6],I.__data[9]=Y.elements[7],I.__data[10]=Y.elements[8],I.__data[11]=0):(Y.toArray(I.__data,q),q+=H.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,V,I.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function v(A,C,R,D){const P=A.value,U=C+"_"+R;if(D[U]===void 0)return typeof P=="number"||typeof P=="boolean"?D[U]=P:D[U]=P.clone(),!0;{const y=D[U];if(typeof P=="number"||typeof P=="boolean"){if(y!==P)return D[U]=P,!0}else if(y.equals(P)===!1)return y.copy(P),!0}return!1}function M(A){const C=A.uniforms;let R=0;const D=16;for(let U=0,y=C.length;U<y;U++){const b=Array.isArray(C[U])?C[U]:[C[U]];for(let j=0,I=b.length;j<I;j++){const V=b[j],$=Array.isArray(V.value)?V.value:[V.value];for(let q=0,X=$.length;q<X;q++){const Y=$[q],H=T(Y),ae=R%D,ne=ae%H.boundary,xe=ae+ne;R+=ne,xe!==0&&D-xe<H.storage&&(R+=D-xe),V.__data=new Float32Array(H.storage/Float32Array.BYTES_PER_ELEMENT),V.__offset=R,R+=H.storage}}}const P=R%D;return P>0&&(R+=D-P),A.__size=R,A.__cache={},this}function T(A){const C={boundary:0,storage:0};return typeof A=="number"||typeof A=="boolean"?(C.boundary=4,C.storage=4):A.isVector2?(C.boundary=8,C.storage=8):A.isVector3||A.isColor?(C.boundary=16,C.storage=12):A.isVector4?(C.boundary=16,C.storage=16):A.isMatrix3?(C.boundary=48,C.storage=48):A.isMatrix4?(C.boundary=64,C.storage=64):A.isTexture?Ve("WebGLRenderer: Texture samplers can not be part of an uniforms group."):Ve("WebGLRenderer: Unsupported uniform value type.",A),C}function _(A){const C=A.target;C.removeEventListener("dispose",_);const R=a.indexOf(C.__bindingPointIndex);a.splice(R,1),i.deleteBuffer(r[C.id]),delete r[C.id],delete s[C.id]}function g(){for(const A in r)i.deleteBuffer(r[A]);a=[],r={},s={}}return{bind:h,update:l,dispose:g}}const ig=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let _n=null;function rg(){return _n===null&&(_n=new Gh(ig,16,16,zi,Fn),_n.name="DFG_LUT",_n.minFilter=Yt,_n.magFilter=Yt,_n.wrapS=Un,_n.wrapT=Un,_n.generateMipmaps=!1,_n.needsUpdate=!0),_n}class sg{constructor(e={}){const{canvas:t=_h(),context:n=null,depth:r=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:h=!0,preserveDrawingBuffer:l=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:f=!1,outputBufferType:v=rn}=e;this.isWebGLRenderer=!0;let M;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");M=n.getContextAttributes().alpha}else M=a;const T=v,_=new Set([vo,_o,go]),g=new Set([rn,bn,xr,Mr,po,mo]),A=new Uint32Array(4),C=new Int32Array(4);let R=null,D=null;const P=[],U=[];let y=null;this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=yn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const b=this;let j=!1;this._outputColorSpace=$t;let I=0,V=0,$=null,q=-1,X=null;const Y=new Ct,H=new Ct;let ae=null;const ne=new ct(0);let xe=0,Se=t.width,ye=t.height,$e=1,yt=null,xt=null;const Q=new Ct(0,0,Se,ye),fe=new Ct(0,0,Se,ye);let de=!1;const Xe=new To;let Oe=!1,Ge=!1;const At=new bt,We=new k,ht=new Ct,mt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let qe=!1;function Mt(){return $===null?$e:1}let L=n;function Tt(S,O){return t.getContext(S,O)}try{const S={alpha:!0,depth:r,stencil:s,antialias:o,premultipliedAlpha:h,preserveDrawingBuffer:l,powerPreference:u,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${ho}`),t.addEventListener("webglcontextlost",be,!1),t.addEventListener("webglcontextrestored",ze,!1),t.addEventListener("webglcontextcreationerror",_t,!1),L===null){const O="webgl2";if(L=Tt(O,S),L===null)throw Tt(O)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(S){throw ft("WebGLRenderer: "+S.message),S}let it,ut,Ce,w,x,W,J,te,K,Te,le,Ne,Fe,re,se,we,Re,Me,Ze,N,he,oe,Ee;function ie(){it=new sp(L),it.init(),he=new Zm(L,it),ut=new Kd(L,it,e,he),Ce=new Ym(L,it),ut.reversedDepthBuffer&&f&&Ce.buffers.depth.setReversed(!0),w=new cp(L),x=new Lm,W=new qm(L,it,Ce,x,ut,he,w),J=new rp(b),te=new fu(L),oe=new Zd(L,te),K=new ap(L,te,w,oe),Te=new hp(L,K,te,oe,w),Me=new lp(L,ut,W),se=new Jd(x),le=new Dm(b,J,it,ut,oe,se),Ne=new tg(b,x),Fe=new Nm,re=new Hm(it),Re=new qd(b,J,Ce,Te,M,h),we=new $m(b,Te,ut),Ee=new ng(L,w,ut,Ce),Ze=new jd(L,it,w),N=new op(L,it,w),w.programs=le.programs,b.capabilities=ut,b.extensions=it,b.properties=x,b.renderLists=Fe,b.shadowMap=we,b.state=Ce,b.info=w}ie(),T!==rn&&(y=new fp(T,t.width,t.height,r,s));const Z=new Qm(b,L);this.xr=Z,this.getContext=function(){return L},this.getContextAttributes=function(){return L.getContextAttributes()},this.forceContextLoss=function(){const S=it.get("WEBGL_lose_context");S&&S.loseContext()},this.forceContextRestore=function(){const S=it.get("WEBGL_lose_context");S&&S.restoreContext()},this.getPixelRatio=function(){return $e},this.setPixelRatio=function(S){S!==void 0&&($e=S,this.setSize(Se,ye,!1))},this.getSize=function(S){return S.set(Se,ye)},this.setSize=function(S,O,z=!0){if(Z.isPresenting){Ve("WebGLRenderer: Can't change size while VR device is presenting.");return}Se=S,ye=O,t.width=Math.floor(S*$e),t.height=Math.floor(O*$e),z===!0&&(t.style.width=S+"px",t.style.height=O+"px"),y!==null&&y.setSize(t.width,t.height),this.setViewport(0,0,S,O)},this.getDrawingBufferSize=function(S){return S.set(Se*$e,ye*$e).floor()},this.setDrawingBufferSize=function(S,O,z){Se=S,ye=O,$e=z,t.width=Math.floor(S*z),t.height=Math.floor(O*z),this.setViewport(0,0,S,O)},this.setEffects=function(S){if(T===rn){console.error("THREE.WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(S){for(let O=0;O<S.length;O++)if(S[O].isOutputPass===!0){console.warn("THREE.WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}y.setEffects(S||[])},this.getCurrentViewport=function(S){return S.copy(Y)},this.getViewport=function(S){return S.copy(Q)},this.setViewport=function(S,O,z,F){S.isVector4?Q.set(S.x,S.y,S.z,S.w):Q.set(S,O,z,F),Ce.viewport(Y.copy(Q).multiplyScalar($e).round())},this.getScissor=function(S){return S.copy(fe)},this.setScissor=function(S,O,z,F){S.isVector4?fe.set(S.x,S.y,S.z,S.w):fe.set(S,O,z,F),Ce.scissor(H.copy(fe).multiplyScalar($e).round())},this.getScissorTest=function(){return de},this.setScissorTest=function(S){Ce.setScissorTest(de=S)},this.setOpaqueSort=function(S){yt=S},this.setTransparentSort=function(S){xt=S},this.getClearColor=function(S){return S.copy(Re.getClearColor())},this.setClearColor=function(){Re.setClearColor(...arguments)},this.getClearAlpha=function(){return Re.getClearAlpha()},this.setClearAlpha=function(){Re.setClearAlpha(...arguments)},this.clear=function(S=!0,O=!0,z=!0){let F=0;if(S){let B=!1;if($!==null){const pe=$.texture.format;B=_.has(pe)}if(B){const pe=$.texture.type,_e=g.has(pe),ue=Re.getClearColor(),me=Re.getClearAlpha(),ge=ue.r,He=ue.g,Be=ue.b;_e?(A[0]=ge,A[1]=He,A[2]=Be,A[3]=me,L.clearBufferuiv(L.COLOR,0,A)):(C[0]=ge,C[1]=He,C[2]=Be,C[3]=me,L.clearBufferiv(L.COLOR,0,C))}else F|=L.COLOR_BUFFER_BIT}O&&(F|=L.DEPTH_BUFFER_BIT),z&&(F|=L.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),F!==0&&L.clear(F)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",be,!1),t.removeEventListener("webglcontextrestored",ze,!1),t.removeEventListener("webglcontextcreationerror",_t,!1),Re.dispose(),Fe.dispose(),re.dispose(),x.dispose(),J.dispose(),Te.dispose(),oe.dispose(),Ee.dispose(),le.dispose(),Z.dispose(),Z.removeEventListener("sessionstart",m),Z.removeEventListener("sessionend",c),p.stop()};function be(S){S.preventDefault(),ko("WebGLRenderer: Context Lost."),j=!0}function ze(){ko("WebGLRenderer: Context Restored."),j=!1;const S=w.autoReset,O=we.enabled,z=we.autoUpdate,F=we.needsUpdate,B=we.type;ie(),w.autoReset=S,we.enabled=O,we.autoUpdate=z,we.needsUpdate=F,we.type=B}function _t(S){ft("WebGLRenderer: A WebGL context could not be created. Reason: ",S.statusMessage)}function je(S){const O=S.target;O.removeEventListener("dispose",je),on(O)}function on(S){Wt(S),x.remove(S)}function Wt(S){const O=x.get(S).programs;O!==void 0&&(O.forEach(function(z){le.releaseProgram(z)}),S.isShaderMaterial&&le.releaseShaderCache(S))}this.renderBufferDirect=function(S,O,z,F,B,pe){O===null&&(O=mt);const _e=B.isMesh&&B.matrixWorld.determinant()<0,ue=nt(S,O,z,F,B);Ce.setMaterial(F,_e);let me=z.index,ge=1;if(F.wireframe===!0){if(me=K.getWireframeAttribute(z),me===void 0)return;ge=2}const He=z.drawRange,Be=z.attributes.position;let Ie=He.start*ge,at=(He.start+He.count)*ge;pe!==null&&(Ie=Math.max(Ie,pe.start*ge),at=Math.min(at,(pe.start+pe.count)*ge)),me!==null?(Ie=Math.max(Ie,0),at=Math.min(at,me.count)):Be!=null&&(Ie=Math.max(Ie,0),at=Math.min(at,Be.count));const Et=at-Ie;if(Et<0||Et===1/0)return;oe.setup(B,F,ue,z,me);let Rt,vt=Ze;if(me!==null&&(Rt=te.get(me),vt=N,vt.setIndex(Rt)),B.isMesh)F.wireframe===!0?(Ce.setLineWidth(F.wireframeLinewidth*Mt()),vt.setMode(L.LINES)):vt.setMode(L.TRIANGLES);else if(B.isLine){let zt=F.linewidth;zt===void 0&&(zt=1),Ce.setLineWidth(zt*Mt()),B.isLineSegments?vt.setMode(L.LINES):B.isLineLoop?vt.setMode(L.LINE_LOOP):vt.setMode(L.LINE_STRIP)}else B.isPoints?vt.setMode(L.POINTS):B.isSprite&&vt.setMode(L.TRIANGLES);if(B.isBatchedMesh)if(B._multiDrawInstances!==null)us("WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),vt.renderMultiDrawInstances(B._multiDrawStarts,B._multiDrawCounts,B._multiDrawCount,B._multiDrawInstances);else if(it.get("WEBGL_multi_draw"))vt.renderMultiDraw(B._multiDrawStarts,B._multiDrawCounts,B._multiDrawCount);else{const zt=B._multiDrawStarts,De=B._multiDrawCounts,Jt=B._multiDrawCount,pt=me?te.get(me).bytesPerElement:1,cn=x.get(F).currentProgram.getUniforms();for(let mn=0;mn<Jt;mn++)cn.setValue(L,"_gl_DrawID",mn),vt.render(zt[mn]/pt,De[mn])}else if(B.isInstancedMesh)vt.renderInstances(Ie,Et,B.count);else if(z.isInstancedBufferGeometry){const zt=z._maxInstanceCount!==void 0?z._maxInstanceCount:1/0,De=Math.min(z.instanceCount,zt);vt.renderInstances(Ie,Et,De)}else vt.render(Ie,Et)};function vi(S,O,z){S.transparent===!0&&S.side===Ln&&S.forceSinglePass===!1?(S.side=jt,S.needsUpdate=!0,Je(S,O,z),S.side=Jn,S.needsUpdate=!0,Je(S,O,z),S.side=Ln):Je(S,O,z)}this.compile=function(S,O,z=null){z===null&&(z=S),D=re.get(z),D.init(O),U.push(D),z.traverseVisible(function(B){B.isLight&&B.layers.test(O.layers)&&(D.pushLight(B),B.castShadow&&D.pushShadow(B))}),S!==z&&S.traverseVisible(function(B){B.isLight&&B.layers.test(O.layers)&&(D.pushLight(B),B.castShadow&&D.pushShadow(B))}),D.setupLights();const F=new Set;return S.traverse(function(B){if(!(B.isMesh||B.isPoints||B.isLine||B.isSprite))return;const pe=B.material;if(pe)if(Array.isArray(pe))for(let _e=0;_e<pe.length;_e++){const ue=pe[_e];vi(ue,z,B),F.add(ue)}else vi(pe,z,B),F.add(pe)}),D=U.pop(),F},this.compileAsync=function(S,O,z=null){const F=this.compile(S,O,z);return new Promise(B=>{function pe(){if(F.forEach(function(_e){x.get(_e).currentProgram.isReady()&&F.delete(_e)}),F.size===0){B(S);return}setTimeout(pe,10)}it.get("KHR_parallel_shader_compile")!==null?pe():setTimeout(pe,10)})};let Qn=null;function Rs(S){Qn&&Qn(S)}function m(){p.stop()}function c(){p.start()}const p=new bl;p.setAnimationLoop(Rs),typeof self<"u"&&p.setContext(self),this.setAnimationLoop=function(S){Qn=S,Z.setAnimationLoop(S),S===null?p.stop():p.start()},Z.addEventListener("sessionstart",m),Z.addEventListener("sessionend",c),this.render=function(S,O){if(O!==void 0&&O.isCamera!==!0){ft("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(j===!0)return;const z=Z.enabled===!0&&Z.isPresenting===!0,F=y!==null&&($===null||z)&&y.begin(b,$);if(S.matrixWorldAutoUpdate===!0&&S.updateMatrixWorld(),O.parent===null&&O.matrixWorldAutoUpdate===!0&&O.updateMatrixWorld(),Z.enabled===!0&&Z.isPresenting===!0&&(y===null||y.isCompositing()===!1)&&(Z.cameraAutoUpdate===!0&&Z.updateCamera(O),O=Z.getCamera()),S.isScene===!0&&S.onBeforeRender(b,S,O,$),D=re.get(S,U.length),D.init(O),U.push(D),At.multiplyMatrices(O.projectionMatrix,O.matrixWorldInverse),Xe.setFromProjectionMatrix(At,Sn,O.reversedDepth),Ge=this.localClippingEnabled,Oe=se.init(this.clippingPlanes,Ge),R=Fe.get(S,P.length),R.init(),P.push(R),Z.enabled===!0&&Z.isPresenting===!0){const _e=b.xr.getDepthSensingMesh();_e!==null&&E(_e,O,-1/0,b.sortObjects)}E(S,O,0,b.sortObjects),R.finish(),b.sortObjects===!0&&R.sort(yt,xt),qe=Z.enabled===!1||Z.isPresenting===!1||Z.hasDepthSensing()===!1,qe&&Re.addToRenderList(R,S),this.info.render.frame++,Oe===!0&&se.beginShadows();const B=D.state.shadowsArray;if(we.render(B,S,O),Oe===!0&&se.endShadows(),this.info.autoReset===!0&&this.info.reset(),(F&&y.hasRenderPass())===!1){const _e=R.opaque,ue=R.transmissive;if(D.setupLights(),O.isArrayCamera){const me=O.cameras;if(ue.length>0)for(let ge=0,He=me.length;ge<He;ge++){const Be=me[ge];ee(_e,ue,S,Be)}qe&&Re.render(S);for(let ge=0,He=me.length;ge<He;ge++){const Be=me[ge];G(R,S,Be,Be.viewport)}}else ue.length>0&&ee(_e,ue,S,O),qe&&Re.render(S),G(R,S,O)}$!==null&&V===0&&(W.updateMultisampleRenderTarget($),W.updateRenderTargetMipmap($)),F&&y.end(b),S.isScene===!0&&S.onAfterRender(b,S,O),oe.resetDefaultState(),q=-1,X=null,U.pop(),U.length>0?(D=U[U.length-1],Oe===!0&&se.setGlobalState(b.clippingPlanes,D.state.camera)):D=null,P.pop(),P.length>0?R=P[P.length-1]:R=null};function E(S,O,z,F){if(S.visible===!1)return;if(S.layers.test(O.layers)){if(S.isGroup)z=S.renderOrder;else if(S.isLOD)S.autoUpdate===!0&&S.update(O);else if(S.isLight)D.pushLight(S),S.castShadow&&D.pushShadow(S);else if(S.isSprite){if(!S.frustumCulled||Xe.intersectsSprite(S)){F&&ht.setFromMatrixPosition(S.matrixWorld).applyMatrix4(At);const _e=Te.update(S),ue=S.material;ue.visible&&R.push(S,_e,ue,z,ht.z,null)}}else if((S.isMesh||S.isLine||S.isPoints)&&(!S.frustumCulled||Xe.intersectsObject(S))){const _e=Te.update(S),ue=S.material;if(F&&(S.boundingSphere!==void 0?(S.boundingSphere===null&&S.computeBoundingSphere(),ht.copy(S.boundingSphere.center)):(_e.boundingSphere===null&&_e.computeBoundingSphere(),ht.copy(_e.boundingSphere.center)),ht.applyMatrix4(S.matrixWorld).applyMatrix4(At)),Array.isArray(ue)){const me=_e.groups;for(let ge=0,He=me.length;ge<He;ge++){const Be=me[ge],Ie=ue[Be.materialIndex];Ie&&Ie.visible&&R.push(S,_e,Ie,z,ht.z,Be)}}else ue.visible&&R.push(S,_e,ue,z,ht.z,null)}}const pe=S.children;for(let _e=0,ue=pe.length;_e<ue;_e++)E(pe[_e],O,z,F)}function G(S,O,z,F){const{opaque:B,transmissive:pe,transparent:_e}=S;D.setupLightsView(z),Oe===!0&&se.setGlobalState(b.clippingPlanes,z),F&&Ce.viewport(Y.copy(F)),B.length>0&&Pe(B,O,z),pe.length>0&&Pe(pe,O,z),_e.length>0&&Pe(_e,O,z),Ce.buffers.depth.setTest(!0),Ce.buffers.depth.setMask(!0),Ce.buffers.color.setMask(!0),Ce.setPolygonOffset(!1)}function ee(S,O,z,F){if((z.isScene===!0?z.overrideMaterial:null)!==null)return;if(D.state.transmissionRenderTarget[F.id]===void 0){const Ie=it.has("EXT_color_buffer_half_float")||it.has("EXT_color_buffer_float");D.state.transmissionRenderTarget[F.id]=new En(1,1,{generateMipmaps:!0,type:Ie?Fn:rn,minFilter:pi,samples:Math.max(4,ut.samples),stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:dt.workingColorSpace})}const pe=D.state.transmissionRenderTarget[F.id],_e=F.viewport||Y;pe.setSize(_e.z*b.transmissionResolutionScale,_e.w*b.transmissionResolutionScale);const ue=b.getRenderTarget(),me=b.getActiveCubeFace(),ge=b.getActiveMipmapLevel();b.setRenderTarget(pe),b.getClearColor(ne),xe=b.getClearAlpha(),xe<1&&b.setClearColor(16777215,.5),b.clear(),qe&&Re.render(z);const He=b.toneMapping;b.toneMapping=yn;const Be=F.viewport;if(F.viewport!==void 0&&(F.viewport=void 0),D.setupLightsView(F),Oe===!0&&se.setGlobalState(b.clippingPlanes,F),Pe(S,z,F),W.updateMultisampleRenderTarget(pe),W.updateRenderTargetMipmap(pe),it.has("WEBGL_multisampled_render_to_texture")===!1){let Ie=!1;for(let at=0,Et=O.length;at<Et;at++){const Rt=O[at],{object:vt,geometry:zt,material:De,group:Jt}=Rt;if(De.side===Ln&&vt.layers.test(F.layers)){const pt=De.side;De.side=jt,De.needsUpdate=!0,Ae(vt,z,F,zt,De,Jt),De.side=pt,De.needsUpdate=!0,Ie=!0}}Ie===!0&&(W.updateMultisampleRenderTarget(pe),W.updateRenderTargetMipmap(pe))}b.setRenderTarget(ue,me,ge),b.setClearColor(ne,xe),Be!==void 0&&(F.viewport=Be),b.toneMapping=He}function Pe(S,O,z){const F=O.isScene===!0?O.overrideMaterial:null;for(let B=0,pe=S.length;B<pe;B++){const _e=S[B],{object:ue,geometry:me,group:ge}=_e;let He=_e.material;He.allowOverride===!0&&F!==null&&(He=F),ue.layers.test(z.layers)&&Ae(ue,O,z,me,He,ge)}}function Ae(S,O,z,F,B,pe){S.onBeforeRender(b,O,z,F,B,pe),S.modelViewMatrix.multiplyMatrices(z.matrixWorldInverse,S.matrixWorld),S.normalMatrix.getNormalMatrix(S.modelViewMatrix),B.onBeforeRender(b,O,z,F,S,pe),B.transparent===!0&&B.side===Ln&&B.forceSinglePass===!1?(B.side=jt,B.needsUpdate=!0,b.renderBufferDirect(z,O,F,B,S,pe),B.side=Jn,B.needsUpdate=!0,b.renderBufferDirect(z,O,F,B,S,pe),B.side=Ln):b.renderBufferDirect(z,O,F,B,S,pe),S.onAfterRender(b,O,z,F,B,pe)}function Je(S,O,z){O.isScene!==!0&&(O=mt);const F=x.get(S),B=D.state.lights,pe=D.state.shadowsArray,_e=B.state.version,ue=le.getParameters(S,B.state,pe,O,z),me=le.getProgramCacheKey(ue);let ge=F.programs;F.environment=S.isMeshStandardMaterial||S.isMeshLambertMaterial||S.isMeshPhongMaterial?O.environment:null,F.fog=O.fog;const He=S.isMeshStandardMaterial||S.isMeshLambertMaterial&&!S.envMap||S.isMeshPhongMaterial&&!S.envMap;F.envMap=J.get(S.envMap||F.environment,He),F.envMapRotation=F.environment!==null&&S.envMap===null?O.environmentRotation:S.envMapRotation,ge===void 0&&(S.addEventListener("dispose",je),ge=new Map,F.programs=ge);let Be=ge.get(me);if(Be!==void 0){if(F.currentProgram===Be&&F.lightsStateVersion===_e)return Le(S,ue),Be}else ue.uniforms=le.getUniforms(S),S.onBeforeCompile(ue,b),Be=le.acquireProgram(ue,me),ge.set(me,Be),F.uniforms=ue.uniforms;const Ie=F.uniforms;return(!S.isShaderMaterial&&!S.isRawShaderMaterial||S.clipping===!0)&&(Ie.clippingPlanes=se.uniform),Le(S,ue),F.needsLights=et(S),F.lightsStateVersion=_e,F.needsLights&&(Ie.ambientLightColor.value=B.state.ambient,Ie.lightProbe.value=B.state.probe,Ie.directionalLights.value=B.state.directional,Ie.directionalLightShadows.value=B.state.directionalShadow,Ie.spotLights.value=B.state.spot,Ie.spotLightShadows.value=B.state.spotShadow,Ie.rectAreaLights.value=B.state.rectArea,Ie.ltc_1.value=B.state.rectAreaLTC1,Ie.ltc_2.value=B.state.rectAreaLTC2,Ie.pointLights.value=B.state.point,Ie.pointLightShadows.value=B.state.pointShadow,Ie.hemisphereLights.value=B.state.hemi,Ie.directionalShadowMatrix.value=B.state.directionalShadowMatrix,Ie.spotLightMatrix.value=B.state.spotLightMatrix,Ie.spotLightMap.value=B.state.spotLightMap,Ie.pointShadowMatrix.value=B.state.pointShadowMatrix),F.currentProgram=Be,F.uniformsList=null,Be}function Qe(S){if(S.uniformsList===null){const O=S.currentProgram.getUniforms();S.uniformsList=os.seqWithValue(O.seq,S.uniforms)}return S.uniformsList}function Le(S,O){const z=x.get(S);z.outputColorSpace=O.outputColorSpace,z.batching=O.batching,z.batchingColor=O.batchingColor,z.instancing=O.instancing,z.instancingColor=O.instancingColor,z.instancingMorph=O.instancingMorph,z.skinning=O.skinning,z.morphTargets=O.morphTargets,z.morphNormals=O.morphNormals,z.morphColors=O.morphColors,z.morphTargetsCount=O.morphTargetsCount,z.numClippingPlanes=O.numClippingPlanes,z.numIntersection=O.numClipIntersection,z.vertexAlphas=O.vertexAlphas,z.vertexTangents=O.vertexTangents,z.toneMapping=O.toneMapping}function nt(S,O,z,F,B){O.isScene!==!0&&(O=mt),W.resetTextureUnits();const pe=O.fog,_e=F.isMeshStandardMaterial||F.isMeshLambertMaterial||F.isMeshPhongMaterial?O.environment:null,ue=$===null?b.outputColorSpace:$.isXRRenderTarget===!0?$.texture.colorSpace:ki,me=F.isMeshStandardMaterial||F.isMeshLambertMaterial&&!F.envMap||F.isMeshPhongMaterial&&!F.envMap,ge=J.get(F.envMap||_e,me),He=F.vertexColors===!0&&!!z.attributes.color&&z.attributes.color.itemSize===4,Be=!!z.attributes.tangent&&(!!F.normalMap||F.anisotropy>0),Ie=!!z.morphAttributes.position,at=!!z.morphAttributes.normal,Et=!!z.morphAttributes.color;let Rt=yn;F.toneMapped&&($===null||$.isXRRenderTarget===!0)&&(Rt=b.toneMapping);const vt=z.morphAttributes.position||z.morphAttributes.normal||z.morphAttributes.color,zt=vt!==void 0?vt.length:0,De=x.get(F),Jt=D.state.lights;if(Oe===!0&&(Ge===!0||S!==X)){const Ot=S===X&&F.id===q;se.setState(F,S,Ot)}let pt=!1;F.version===De.__version?(De.needsLights&&De.lightsStateVersion!==Jt.state.version||De.outputColorSpace!==ue||B.isBatchedMesh&&De.batching===!1||!B.isBatchedMesh&&De.batching===!0||B.isBatchedMesh&&De.batchingColor===!0&&B.colorTexture===null||B.isBatchedMesh&&De.batchingColor===!1&&B.colorTexture!==null||B.isInstancedMesh&&De.instancing===!1||!B.isInstancedMesh&&De.instancing===!0||B.isSkinnedMesh&&De.skinning===!1||!B.isSkinnedMesh&&De.skinning===!0||B.isInstancedMesh&&De.instancingColor===!0&&B.instanceColor===null||B.isInstancedMesh&&De.instancingColor===!1&&B.instanceColor!==null||B.isInstancedMesh&&De.instancingMorph===!0&&B.morphTexture===null||B.isInstancedMesh&&De.instancingMorph===!1&&B.morphTexture!==null||De.envMap!==ge||F.fog===!0&&De.fog!==pe||De.numClippingPlanes!==void 0&&(De.numClippingPlanes!==se.numPlanes||De.numIntersection!==se.numIntersection)||De.vertexAlphas!==He||De.vertexTangents!==Be||De.morphTargets!==Ie||De.morphNormals!==at||De.morphColors!==Et||De.toneMapping!==Rt||De.morphTargetsCount!==zt)&&(pt=!0):(pt=!0,De.__version=F.version);let cn=De.currentProgram;pt===!0&&(cn=Je(F,O,B));let mn=!1,ei=!1,xi=!1;const St=cn.getUniforms(),Gt=De.uniforms;if(Ce.useProgram(cn.program)&&(mn=!0,ei=!0,xi=!0),F.id!==q&&(q=F.id,ei=!0),mn||X!==S){Ce.buffers.depth.getReversed()&&S.reversedDepth!==!0&&(S._reversedDepth=!0,S.updateProjectionMatrix()),St.setValue(L,"projectionMatrix",S.projectionMatrix),St.setValue(L,"viewMatrix",S.matrixWorldInverse);const Gn=St.map.cameraPosition;Gn!==void 0&&Gn.setValue(L,We.setFromMatrixPosition(S.matrixWorld)),ut.logarithmicDepthBuffer&&St.setValue(L,"logDepthBufFC",2/(Math.log(S.far+1)/Math.LN2)),(F.isMeshPhongMaterial||F.isMeshToonMaterial||F.isMeshLambertMaterial||F.isMeshBasicMaterial||F.isMeshStandardMaterial||F.isShaderMaterial)&&St.setValue(L,"isOrthographic",S.isOrthographicCamera===!0),X!==S&&(X=S,ei=!0,xi=!0)}if(De.needsLights&&(Jt.state.directionalShadowMap.length>0&&St.setValue(L,"directionalShadowMap",Jt.state.directionalShadowMap,W),Jt.state.spotShadowMap.length>0&&St.setValue(L,"spotShadowMap",Jt.state.spotShadowMap,W),Jt.state.pointShadowMap.length>0&&St.setValue(L,"pointShadowMap",Jt.state.pointShadowMap,W)),B.isSkinnedMesh){St.setOptional(L,B,"bindMatrix"),St.setOptional(L,B,"bindMatrixInverse");const Ot=B.skeleton;Ot&&(Ot.boneTexture===null&&Ot.computeBoneTexture(),St.setValue(L,"boneTexture",Ot.boneTexture,W))}B.isBatchedMesh&&(St.setOptional(L,B,"batchingTexture"),St.setValue(L,"batchingTexture",B._matricesTexture,W),St.setOptional(L,B,"batchingIdTexture"),St.setValue(L,"batchingIdTexture",B._indirectTexture,W),St.setOptional(L,B,"batchingColorTexture"),B._colorsTexture!==null&&St.setValue(L,"batchingColorTexture",B._colorsTexture,W));const Wn=z.morphAttributes;if((Wn.position!==void 0||Wn.normal!==void 0||Wn.color!==void 0)&&Me.update(B,z,cn),(ei||De.receiveShadow!==B.receiveShadow)&&(De.receiveShadow=B.receiveShadow,St.setValue(L,"receiveShadow",B.receiveShadow)),(F.isMeshStandardMaterial||F.isMeshLambertMaterial||F.isMeshPhongMaterial)&&F.envMap===null&&O.environment!==null&&(Gt.envMapIntensity.value=O.environmentIntensity),Gt.dfgLUT!==void 0&&(Gt.dfgLUT.value=rg()),ei&&(St.setValue(L,"toneMappingExposure",b.toneMappingExposure),De.needsLights&&Ue(Gt,xi),pe&&F.fog===!0&&Ne.refreshFogUniforms(Gt,pe),Ne.refreshMaterialUniforms(Gt,F,$e,ye,D.state.transmissionRenderTarget[S.id]),os.upload(L,Qe(De),Gt,W)),F.isShaderMaterial&&F.uniformsNeedUpdate===!0&&(os.upload(L,Qe(De),Gt,W),F.uniformsNeedUpdate=!1),F.isSpriteMaterial&&St.setValue(L,"center",B.center),St.setValue(L,"modelViewMatrix",B.modelViewMatrix),St.setValue(L,"normalMatrix",B.normalMatrix),St.setValue(L,"modelMatrix",B.matrixWorld),F.isShaderMaterial||F.isRawShaderMaterial){const Ot=F.uniformsGroups;for(let Gn=0,Mi=Ot.length;Gn<Mi;Gn++){const Uo=Ot[Gn];Ee.update(Uo,cn),Ee.bind(Uo,cn)}}return cn}function Ue(S,O){S.ambientLightColor.needsUpdate=O,S.lightProbe.needsUpdate=O,S.directionalLights.needsUpdate=O,S.directionalLightShadows.needsUpdate=O,S.pointLights.needsUpdate=O,S.pointLightShadows.needsUpdate=O,S.spotLights.needsUpdate=O,S.spotLightShadows.needsUpdate=O,S.rectAreaLights.needsUpdate=O,S.hemisphereLights.needsUpdate=O}function et(S){return S.isMeshLambertMaterial||S.isMeshToonMaterial||S.isMeshPhongMaterial||S.isMeshStandardMaterial||S.isShadowMaterial||S.isShaderMaterial&&S.lights===!0}this.getActiveCubeFace=function(){return I},this.getActiveMipmapLevel=function(){return V},this.getRenderTarget=function(){return $},this.setRenderTargetTextures=function(S,O,z){const F=x.get(S);F.__autoAllocateDepthBuffer=S.resolveDepthBuffer===!1,F.__autoAllocateDepthBuffer===!1&&(F.__useRenderToTexture=!1),x.get(S.texture).__webglTexture=O,x.get(S.depthTexture).__webglTexture=F.__autoAllocateDepthBuffer?void 0:z,F.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(S,O){const z=x.get(S);z.__webglFramebuffer=O,z.__useDefaultFramebuffer=O===void 0};const ke=L.createFramebuffer();this.setRenderTarget=function(S,O=0,z=0){$=S,I=O,V=z;let F=null,B=!1,pe=!1;if(S){const ue=x.get(S);if(ue.__useDefaultFramebuffer!==void 0){Ce.bindFramebuffer(L.FRAMEBUFFER,ue.__webglFramebuffer),Y.copy(S.viewport),H.copy(S.scissor),ae=S.scissorTest,Ce.viewport(Y),Ce.scissor(H),Ce.setScissorTest(ae),q=-1;return}else if(ue.__webglFramebuffer===void 0)W.setupRenderTarget(S);else if(ue.__hasExternalTextures)W.rebindTextures(S,x.get(S.texture).__webglTexture,x.get(S.depthTexture).__webglTexture);else if(S.depthBuffer){const He=S.depthTexture;if(ue.__boundDepthTexture!==He){if(He!==null&&x.has(He)&&(S.width!==He.image.width||S.height!==He.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");W.setupDepthRenderbuffer(S)}}const me=S.texture;(me.isData3DTexture||me.isDataArrayTexture||me.isCompressedArrayTexture)&&(pe=!0);const ge=x.get(S).__webglFramebuffer;S.isWebGLCubeRenderTarget?(Array.isArray(ge[O])?F=ge[O][z]:F=ge[O],B=!0):S.samples>0&&W.useMultisampledRTT(S)===!1?F=x.get(S).__webglMultisampledFramebuffer:Array.isArray(ge)?F=ge[z]:F=ge,Y.copy(S.viewport),H.copy(S.scissor),ae=S.scissorTest}else Y.copy(Q).multiplyScalar($e).floor(),H.copy(fe).multiplyScalar($e).floor(),ae=de;if(z!==0&&(F=ke),Ce.bindFramebuffer(L.FRAMEBUFFER,F)&&Ce.drawBuffers(S,F),Ce.viewport(Y),Ce.scissor(H),Ce.setScissorTest(ae),B){const ue=x.get(S.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_CUBE_MAP_POSITIVE_X+O,ue.__webglTexture,z)}else if(pe){const ue=O;for(let me=0;me<S.textures.length;me++){const ge=x.get(S.textures[me]);L.framebufferTextureLayer(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0+me,ge.__webglTexture,z,ue)}}else if(S!==null&&z!==0){const ue=x.get(S.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,ue.__webglTexture,z)}q=-1},this.readRenderTargetPixels=function(S,O,z,F,B,pe,_e,ue=0){if(!(S&&S.isWebGLRenderTarget)){ft("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let me=x.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&_e!==void 0&&(me=me[_e]),me){Ce.bindFramebuffer(L.FRAMEBUFFER,me);try{const ge=S.textures[ue],He=ge.format,Be=ge.type;if(S.textures.length>1&&L.readBuffer(L.COLOR_ATTACHMENT0+ue),!ut.textureFormatReadable(He)){ft("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!ut.textureTypeReadable(Be)){ft("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}O>=0&&O<=S.width-F&&z>=0&&z<=S.height-B&&L.readPixels(O,z,F,B,he.convert(He),he.convert(Be),pe)}finally{const ge=$!==null?x.get($).__webglFramebuffer:null;Ce.bindFramebuffer(L.FRAMEBUFFER,ge)}}},this.readRenderTargetPixelsAsync=async function(S,O,z,F,B,pe,_e,ue=0){if(!(S&&S.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let me=x.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&_e!==void 0&&(me=me[_e]),me)if(O>=0&&O<=S.width-F&&z>=0&&z<=S.height-B){Ce.bindFramebuffer(L.FRAMEBUFFER,me);const ge=S.textures[ue],He=ge.format,Be=ge.type;if(S.textures.length>1&&L.readBuffer(L.COLOR_ATTACHMENT0+ue),!ut.textureFormatReadable(He))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!ut.textureTypeReadable(Be))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Ie=L.createBuffer();L.bindBuffer(L.PIXEL_PACK_BUFFER,Ie),L.bufferData(L.PIXEL_PACK_BUFFER,pe.byteLength,L.STREAM_READ),L.readPixels(O,z,F,B,he.convert(He),he.convert(Be),0);const at=$!==null?x.get($).__webglFramebuffer:null;Ce.bindFramebuffer(L.FRAMEBUFFER,at);const Et=L.fenceSync(L.SYNC_GPU_COMMANDS_COMPLETE,0);return L.flush(),await vh(L,Et,4),L.bindBuffer(L.PIXEL_PACK_BUFFER,Ie),L.getBufferSubData(L.PIXEL_PACK_BUFFER,0,pe),L.deleteBuffer(Ie),L.deleteSync(Et),pe}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(S,O=null,z=0){const F=Math.pow(2,-z),B=Math.floor(S.image.width*F),pe=Math.floor(S.image.height*F),_e=O!==null?O.x:0,ue=O!==null?O.y:0;W.setTexture2D(S,0),L.copyTexSubImage2D(L.TEXTURE_2D,z,0,0,_e,ue,B,pe),Ce.unbindTexture()};const Ye=L.createFramebuffer(),ce=L.createFramebuffer();this.copyTextureToTexture=function(S,O,z=null,F=null,B=0,pe=0){let _e,ue,me,ge,He,Be,Ie,at,Et;const Rt=S.isCompressedTexture?S.mipmaps[pe]:S.image;if(z!==null)_e=z.max.x-z.min.x,ue=z.max.y-z.min.y,me=z.isBox3?z.max.z-z.min.z:1,ge=z.min.x,He=z.min.y,Be=z.isBox3?z.min.z:0;else{const Gt=Math.pow(2,-B);_e=Math.floor(Rt.width*Gt),ue=Math.floor(Rt.height*Gt),S.isDataArrayTexture?me=Rt.depth:S.isData3DTexture?me=Math.floor(Rt.depth*Gt):me=1,ge=0,He=0,Be=0}F!==null?(Ie=F.x,at=F.y,Et=F.z):(Ie=0,at=0,Et=0);const vt=he.convert(O.format),zt=he.convert(O.type);let De;O.isData3DTexture?(W.setTexture3D(O,0),De=L.TEXTURE_3D):O.isDataArrayTexture||O.isCompressedArrayTexture?(W.setTexture2DArray(O,0),De=L.TEXTURE_2D_ARRAY):(W.setTexture2D(O,0),De=L.TEXTURE_2D),L.pixelStorei(L.UNPACK_FLIP_Y_WEBGL,O.flipY),L.pixelStorei(L.UNPACK_PREMULTIPLY_ALPHA_WEBGL,O.premultiplyAlpha),L.pixelStorei(L.UNPACK_ALIGNMENT,O.unpackAlignment);const Jt=L.getParameter(L.UNPACK_ROW_LENGTH),pt=L.getParameter(L.UNPACK_IMAGE_HEIGHT),cn=L.getParameter(L.UNPACK_SKIP_PIXELS),mn=L.getParameter(L.UNPACK_SKIP_ROWS),ei=L.getParameter(L.UNPACK_SKIP_IMAGES);L.pixelStorei(L.UNPACK_ROW_LENGTH,Rt.width),L.pixelStorei(L.UNPACK_IMAGE_HEIGHT,Rt.height),L.pixelStorei(L.UNPACK_SKIP_PIXELS,ge),L.pixelStorei(L.UNPACK_SKIP_ROWS,He),L.pixelStorei(L.UNPACK_SKIP_IMAGES,Be);const xi=S.isDataArrayTexture||S.isData3DTexture,St=O.isDataArrayTexture||O.isData3DTexture;if(S.isDepthTexture){const Gt=x.get(S),Wn=x.get(O),Ot=x.get(Gt.__renderTarget),Gn=x.get(Wn.__renderTarget);Ce.bindFramebuffer(L.READ_FRAMEBUFFER,Ot.__webglFramebuffer),Ce.bindFramebuffer(L.DRAW_FRAMEBUFFER,Gn.__webglFramebuffer);for(let Mi=0;Mi<me;Mi++)xi&&(L.framebufferTextureLayer(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,x.get(S).__webglTexture,B,Be+Mi),L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,x.get(O).__webglTexture,pe,Et+Mi)),L.blitFramebuffer(ge,He,_e,ue,Ie,at,_e,ue,L.DEPTH_BUFFER_BIT,L.NEAREST);Ce.bindFramebuffer(L.READ_FRAMEBUFFER,null),Ce.bindFramebuffer(L.DRAW_FRAMEBUFFER,null)}else if(B!==0||S.isRenderTargetTexture||x.has(S)){const Gt=x.get(S),Wn=x.get(O);Ce.bindFramebuffer(L.READ_FRAMEBUFFER,Ye),Ce.bindFramebuffer(L.DRAW_FRAMEBUFFER,ce);for(let Ot=0;Ot<me;Ot++)xi?L.framebufferTextureLayer(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,Gt.__webglTexture,B,Be+Ot):L.framebufferTexture2D(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,Gt.__webglTexture,B),St?L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,Wn.__webglTexture,pe,Et+Ot):L.framebufferTexture2D(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,Wn.__webglTexture,pe),B!==0?L.blitFramebuffer(ge,He,_e,ue,Ie,at,_e,ue,L.COLOR_BUFFER_BIT,L.NEAREST):St?L.copyTexSubImage3D(De,pe,Ie,at,Et+Ot,ge,He,_e,ue):L.copyTexSubImage2D(De,pe,Ie,at,ge,He,_e,ue);Ce.bindFramebuffer(L.READ_FRAMEBUFFER,null),Ce.bindFramebuffer(L.DRAW_FRAMEBUFFER,null)}else St?S.isDataTexture||S.isData3DTexture?L.texSubImage3D(De,pe,Ie,at,Et,_e,ue,me,vt,zt,Rt.data):O.isCompressedArrayTexture?L.compressedTexSubImage3D(De,pe,Ie,at,Et,_e,ue,me,vt,Rt.data):L.texSubImage3D(De,pe,Ie,at,Et,_e,ue,me,vt,zt,Rt):S.isDataTexture?L.texSubImage2D(L.TEXTURE_2D,pe,Ie,at,_e,ue,vt,zt,Rt.data):S.isCompressedTexture?L.compressedTexSubImage2D(L.TEXTURE_2D,pe,Ie,at,Rt.width,Rt.height,vt,Rt.data):L.texSubImage2D(L.TEXTURE_2D,pe,Ie,at,_e,ue,vt,zt,Rt);L.pixelStorei(L.UNPACK_ROW_LENGTH,Jt),L.pixelStorei(L.UNPACK_IMAGE_HEIGHT,pt),L.pixelStorei(L.UNPACK_SKIP_PIXELS,cn),L.pixelStorei(L.UNPACK_SKIP_ROWS,mn),L.pixelStorei(L.UNPACK_SKIP_IMAGES,ei),pe===0&&O.generateMipmaps&&L.generateMipmap(De),Ce.unbindTexture()},this.initRenderTarget=function(S){x.get(S).__webglFramebuffer===void 0&&W.setupRenderTarget(S)},this.initTexture=function(S){S.isCubeTexture?W.setTextureCube(S,0):S.isData3DTexture?W.setTexture3D(S,0):S.isDataArrayTexture||S.isCompressedArrayTexture?W.setTexture2DArray(S,0):W.setTexture2D(S,0),Ce.unbindTexture()},this.resetState=function(){I=0,V=0,$=null,Ce.reset(),oe.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Sn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=dt._getDrawingBufferColorSpace(e),t.unpackColorSpace=dt._getUnpackColorSpace()}}class ag{constructor(){this.container=document.getElementById("three-game")||document.body,this.scene=new Uh,this.scene.background=new ct(12184319);const{width:e,height:t}=this.getViewportSize(),n=e/t;this.camera=new an(38,n,.5,1e3),this.cameraOffset=new k(14,13,24),this.cameraLookOffset=new k(0,.8,0),this.camera.position.copy(this.cameraOffset),this.camera.lookAt(0,0,0),this.renderer=new sg({antialias:!0,alpha:!1}),this.renderer.setSize(e,t),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2)),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=_r,this.renderer.outputColorSpace=$t,this.renderer.toneMapping=uo,this.renderer.toneMappingExposure=1.08,this.container.appendChild(this.renderer.domElement),this.renderer.domElement.id="three-canvas";const r=new iu(15334399,12044425,1);this.scene.add(r);const s=new ou(16777215,.42);this.scene.add(s);const a=new au(16774096,1.35);a.position.set(12,26,10),a.castShadow=!0,a.shadow.mapSize.set(2048,2048),a.shadow.camera.left=-34,a.shadow.camera.right=34,a.shadow.camera.top=34,a.shadow.camera.bottom=-34,a.shadow.camera.near=1,a.shadow.camera.far=80,a.shadow.bias=-25e-5,a.shadow.radius=3,this.scene.add(a),this.worldGroup=new Zn,this.scene.add(this.worldGroup),this.entityGroup=new Zn,this.scene.add(this.entityGroup),this.cameraZoom=1,this.raycaster=new hu,this.pathLine=null,window.addEventListener("resize",()=>this.onWindowResize())}getViewportSize(){const e=this.container.getBoundingClientRect();return{width:Math.max(320,e.width||window.innerWidth),height:Math.max(240,e.height||window.innerHeight)}}getIntersectedTile(e){this.raycaster.setFromCamera(e,this.camera);const t=this.raycaster.intersectObjects(this.worldGroup.children);return t.length>0?t[0].object.userData.tile:null}renderPathLine(e,t){if(this.pathLine&&(this.scene.remove(this.pathLine),this.pathLine.geometry.dispose(),this.pathLine.material.dispose(),this.pathLine=null),!e||e.length<2)return;const n=[];for(const a of e){const o=t.getElevation(a.x,a.y)+1.1;n.push(new k(a.x,o,a.y))}const r=new Kt().setFromPoints(n),s=new Ml({color:65484,transparent:!0,opacity:.8,depthTest:!1});this.pathLine=new Vh(r,s),this.scene.add(this.pathLine)}onWindowResize(){const{width:e,height:t}=this.getViewportSize();this.camera.aspect=e/t,this.camera.updateProjectionMatrix(),this.renderer.setSize(e,t)}handleZoom(e){const t=e>0?-.1:.1;this.cameraZoom=Math.max(.5,Math.min(3,this.cameraZoom+t)),this.camera.zoom=this.cameraZoom,this.camera.updateProjectionMatrix()}updateCamera(e){const t=e.clone().add(this.cameraLookOffset);this.camera.position.copy(e).add(this.cameraOffset),this.camera.lookAt(t)}render(){this.renderer.render(this.scene,this.camera)}addToWorld(e){this.worldGroup.add(e)}addToEntities(e){this.entityGroup.add(e)}removeFromWorld(e){this.worldGroup.remove(e)}removeFromEntities(e){this.entityGroup.remove(e)}}const st={VOID:0,GEO:1,HYDRO:2,ANEMO:3,CRYO:4,PYRO:5,STRUCTURE:6},Wc={[st.VOID]:{id:"void",label:"Void",walkable:!1,habitats:[],topColor:8226710,sideColor:6121075,roughness:.95,pattern:"blocked"},[st.GEO]:{id:"geo",label:"Grassland",walkable:!0,habitats:["meadow","forest-edge"],topColor:9427560,sideColor:6466136,roughness:.76,moveCost:1,pattern:"grass"},[st.HYDRO]:{id:"hydro",label:"Water",walkable:!1,habitats:["shore"],topColor:5227511,sideColor:1935039,roughness:.35,moveCost:1/0,pattern:"water"},[st.ANEMO]:{id:"anemo",label:"Sand",walkable:!0,habitats:["shore"],topColor:16767352,sideColor:14919757,roughness:.78,moveCost:1.08,pattern:"sand"},[st.CRYO]:{id:"cryo",label:"Snowfield",walkable:!0,habitats:["snow"],topColor:15989759,sideColor:12048874,roughness:.32,moveCost:1.18,pattern:"ice"},[st.PYRO]:{id:"pyro",label:"Lava",walkable:!1,habitats:[],topColor:16742950,sideColor:12073496,roughness:.55,moveCost:1/0,pattern:"lava"},[st.STRUCTURE]:{id:"structure",label:"Building Wall",walkable:!1,habitats:[],topColor:16758223,sideColor:13135245,roughness:.7,moveCost:1/0,pattern:"building"}},og={[`${st.HYDRO}:4`]:{label:"Brackish Water",topColor:7840359,sideColor:4878661,pattern:"marsh"},[`${st.GEO}:1`]:{label:"Forest Floor",topColor:6800239,sideColor:4167251,moveCost:1.2,pattern:"forest"},[`${st.GEO}:2`]:{label:"Village Road",topColor:16308618,sideColor:13869911,moveCost:.9,pattern:"road"},[`${st.GEO}:3`]:{label:"Hill Ledge",topColor:10999929,sideColor:5213251,moveCost:1.28,pattern:"hill"},[`${st.GEO}:4`]:{label:"Mountain Ledge",topColor:11451532,sideColor:6911068,moveCost:1.45,pattern:"stone"},[`${st.CRYO}:1`]:{label:"Ice Lake",topColor:12120319,sideColor:7716311,moveCost:1.24,pattern:"ice"},[`${st.STRUCTURE}:0`]:{label:"Stone Wall",topColor:11911372,sideColor:8293273,pattern:"blocked"},[`${st.STRUCTURE}:1`]:{label:"Town Wall",topColor:16761710,sideColor:14190908,pattern:"brick"}};function Xi(i,e=0){const t=Wc[i]||Wc[st.VOID],n=og[`${i}:${e}`]||{};return{...t,...n}}function cg(i,e=0){return Xi(i,e).walkable}function lg(i,e,t){return Xi(i,e).habitats.includes(t)}const rt=class rt{constructor(e,t,n,r,s={}){this.threeManager=e,this.gridX=t,this.gridY=n,this.elevation=r,this.attributes=s,this.element=s.element||st.GEO,this.textureValue=s.textureValue||0,this.render()}setElementalType(e,t){this.element=e,this.textureValue=t,this.mesh&&(this.restoreBaseMaterial(),this.mesh.material=rt.getMaterials(e,t))}render(){const e=rt.getMaterials(this.element,this.textureValue);this.mesh=new It(rt.geometry,e),this.mesh.castShadow=!Xi(this.element,this.textureValue).walkable,this.mesh.receiveShadow=!0,this.mesh.position.set(this.gridX,this.elevation,this.gridY),this.mesh.userData.tile=this,this.threeManager.addToWorld(this.mesh)}highlight(e=5592405){this.mesh&&this.mesh.material&&(this.highlightMaterial||(this.highlightMaterial=Array.isArray(this.mesh.material)?this.mesh.material.map(n=>n.clone()):this.mesh.material.clone(),this.mesh.material=this.highlightMaterial),(Array.isArray(this.mesh.material)?this.mesh.material:[this.mesh.material]).forEach(n=>{var r;return(r=n.emissive)==null?void 0:r.setHex(e)}))}clearHighlight(){this.restoreBaseMaterial()}restoreBaseMaterial(){if(!this.mesh||!this.highlightMaterial)return;(Array.isArray(this.highlightMaterial)?this.highlightMaterial:[this.highlightMaterial]).forEach(t=>t.dispose()),this.highlightMaterial=null,this.mesh.material=rt.getMaterials(this.element,this.textureValue)}static getMaterials(e,t=0){const n=`${e}:${t}`;if(!rt.materialCache.has(n)){const r=Xi(e,t),s=rt.createTexture(r),a=rt.createSideTexture(r),o=new vr({color:16777215,map:s,roughness:r.roughness,metalness:.05}),h=new vr({color:16777215,map:a,roughness:Math.min(1,r.roughness+.08),metalness:.02});rt.materialCache.set(n,[h,h,o,h,h,h])}return rt.materialCache.get(n)}static createTexture(e){const t=document.createElement("canvas");t.width=96,t.height=96;const n=t.getContext("2d"),r=`#${e.topColor.toString(16).padStart(6,"0")}`,s=`#${e.sideColor.toString(16).padStart(6,"0")}`;n.fillStyle=r,n.fillRect(0,0,t.width,t.height),rt.drawSoftTop(n,e),e.pattern==="grass"?rt.drawGrass(n,r,s):e.pattern==="forest"?rt.drawForest(n):e.pattern==="hill"?rt.drawHill(n):e.pattern==="stone"?rt.drawStone(n):e.pattern==="road"?rt.drawRoad(n):e.pattern==="water"?rt.drawWaves(n,"#b7e6f4",.35):e.pattern==="marsh"?(rt.drawWaves(n,"#7c8b48",.28),rt.drawSpeckles(n,"#2f3b20",22,.45)):e.pattern==="sand"?rt.drawSpeckles(n,"#f5dea0",42,.45):e.pattern==="ice"?rt.drawIce(n,"#ffffff"):e.pattern==="lava"?rt.drawLava(n):e.pattern==="brick"?rt.drawBrick(n):e.pattern==="blocked"?rt.drawBlocked(n):rt.drawSpeckles(n,s,28,.25),rt.drawRoundedFrame(n,e.walkable);const a=new ac(t);return a.colorSpace=$t,a.wrapS=di,a.wrapT=di,a.repeat.set(1,1),a.needsUpdate=!0,a}static createSideTexture(e){const t=document.createElement("canvas");t.width=96,t.height=96;const n=t.getContext("2d"),r=`#${e.topColor.toString(16).padStart(6,"0")}`,s=`#${e.sideColor.toString(16).padStart(6,"0")}`,a=n.createLinearGradient(0,0,0,96);a.addColorStop(0,r),a.addColorStop(.18,s),a.addColorStop(1,rt.shadeColor(s,-34)),n.fillStyle=a,n.fillRect(0,0,96,96),n.fillStyle="rgba(255, 255, 255, 0.22)",n.fillRect(0,0,96,8),n.fillStyle="rgba(4, 9, 12, 0.26)",n.fillRect(0,84,96,12),n.strokeStyle=e.walkable?"rgba(31, 58, 35, 0.22)":"rgba(6, 9, 12, 0.38)",n.lineWidth=3;for(let h=22;h<88;h+=22)n.beginPath(),n.moveTo(0,h),n.lineTo(96,h),n.stroke();e.walkable||(n.strokeStyle="rgba(255, 255, 255, 0.2)",n.lineWidth=4,n.beginPath(),n.moveTo(18,16),n.lineTo(78,76),n.moveTo(80,18),n.lineTo(20,78),n.stroke());const o=new ac(t);return o.colorSpace=$t,o.wrapS=di,o.wrapT=di,o.needsUpdate=!0,o}static shadeColor(e,t){const n=parseInt(e.replace("#",""),16),r=Math.max(0,Math.min(255,(n>>16)+t)),s=Math.max(0,Math.min(255,(n>>8&255)+t)),a=Math.max(0,Math.min(255,(n&255)+t));return`#${((1<<24)+(r<<16)+(s<<8)+a).toString(16).slice(1)}`}static drawSoftTop(e,t){const n=e.createRadialGradient(34,26,8,48,48,72);n.addColorStop(0,"rgba(255, 255, 255, 0.34)"),n.addColorStop(.52,"rgba(255, 255, 255, 0.08)"),n.addColorStop(1,t.walkable?"rgba(45, 62, 44, 0.16)":"rgba(18, 24, 24, 0.34)"),e.fillStyle=n,e.fillRect(0,0,96,96)}static drawRoundedFrame(e,t){e.save(),e.lineWidth=t?4:6,e.strokeStyle=t?"rgba(255, 255, 255, 0.28)":"rgba(30, 24, 22, 0.42)",rt.roundRect(e,7,7,82,82,15),e.stroke(),e.lineWidth=3,e.strokeStyle=t?"rgba(43, 68, 45, 0.18)":"rgba(5, 7, 8, 0.34)",rt.roundRect(e,2.5,2.5,91,91,13),e.stroke(),e.restore()}static roundRect(e,t,n,r,s,a){e.beginPath(),e.moveTo(t+a,n),e.arcTo(t+r,n,t+r,n+s,a),e.arcTo(t+r,n+s,t,n+s,a),e.arcTo(t,n+s,t,n,a),e.arcTo(t,n,t+r,n,a),e.closePath()}static drawGrass(e,t,n){rt.drawSpeckles(e,"#a4d37e",32,.5),e.strokeStyle=n,e.lineWidth=2;for(let r=0;r<18;r++){const s=r*31%92+2,a=r*47%88+5;e.beginPath(),e.moveTo(s,a+5),e.lineTo(s+3,a),e.stroke()}e.fillStyle=t,e.globalAlpha=.25,e.fillRect(0,0,96,96),e.globalAlpha=1}static drawForest(e){rt.drawSpeckles(e,"#2f8d48",30,.32),e.fillStyle="rgba(20, 110, 54, 0.35)";for(let t=0;t<13;t++){const n=t*29%82+8,r=t*43%82+8;e.beginPath(),e.arc(n,r,4+t%3,0,Math.PI*2),e.fill()}}static drawHill(e){rt.drawSpeckles(e,"#d4ed91",24,.36),e.strokeStyle="rgba(57, 108, 53, 0.34)",e.lineWidth=4;for(let t=20;t<86;t+=22)e.beginPath(),e.moveTo(13,t),e.bezierCurveTo(30,t-10,52,t+10,80,t-2),e.stroke()}static drawStone(e){rt.drawSpeckles(e,"#dce2b2",30,.28),e.strokeStyle="rgba(75, 84, 72, 0.32)",e.lineWidth=3;for(let t=0;t<8;t++){const n=t*19%74+10,r=t*31%74+10;e.beginPath(),e.moveTo(n-8,r),e.lineTo(n,r-6),e.lineTo(n+10,r-2),e.lineTo(n+6,r+8),e.closePath(),e.stroke()}}static drawRoad(e){e.save(),e.strokeStyle="rgba(163, 112, 53, 0.28)",e.lineWidth=5,e.setLineDash([10,9]),e.beginPath(),e.moveTo(4,51),e.bezierCurveTo(24,38,50,60,92,43),e.stroke(),e.restore(),rt.drawSpeckles(e,"#fff1bd",34,.38)}static drawWaves(e,t,n){e.strokeStyle=t,e.globalAlpha=n,e.lineWidth=3;for(let r=14;r<96;r+=20){e.beginPath();for(let s=-8;s<104;s+=12){const a=r+Math.sin(s*.18)*3;s===-8?e.moveTo(s,a):e.lineTo(s,a)}e.stroke()}e.globalAlpha=1}static drawSpeckles(e,t,n,r){e.fillStyle=t,e.globalAlpha=r;for(let s=0;s<n;s++){const a=s*37%92+2,o=s*53%92+2,h=1+s%3;e.fillRect(a,o,h,h)}e.globalAlpha=1}static drawIce(e,t){e.strokeStyle=t,e.globalAlpha=.5,e.lineWidth=2;for(let n=0;n<7;n++){const r=n*13%96;e.beginPath(),e.moveTo(r,4),e.lineTo(96-r/2,92),e.stroke()}e.globalAlpha=1}static drawLava(e){const t=e.createRadialGradient(48,48,4,48,48,70);t.addColorStop(0,"#ffd166"),t.addColorStop(.45,"#f97316"),t.addColorStop(1,"#7c1d12"),e.fillStyle=t,e.fillRect(0,0,96,96),e.strokeStyle="rgba(255, 224, 102, 0.65)",e.lineWidth=4,e.beginPath(),e.moveTo(8,28),e.bezierCurveTo(28,10,42,60,62,28),e.bezierCurveTo(72,12,84,30,91,18),e.stroke()}static drawBrick(e){e.strokeStyle="rgba(137, 85, 44, 0.36)",e.lineWidth=3;for(let t=18;t<96;t+=18)e.beginPath(),e.moveTo(4,t),e.lineTo(92,t),e.stroke();for(let t=9;t<96;t+=18){const n=Math.floor(t/18)%2*18;for(let r=8+n;r<96;r+=36)e.beginPath(),e.moveTo(r,t),e.lineTo(r,t+18),e.stroke()}}static drawBlocked(e){e.save(),e.fillStyle="rgba(20, 24, 28, 0.2)",rt.roundRect(e,12,12,72,72,15),e.fill(),e.strokeStyle="rgba(255, 255, 255, 0.18)",e.lineWidth=4,e.beginPath(),e.moveTo(22,28),e.lineTo(74,68),e.moveTo(72,25),e.lineTo(24,73),e.stroke(),e.restore()}destroy(){this.mesh&&(this.restoreBaseMaterial(),this.threeManager.removeFromWorld(this.mesh),this.mesh=null),this.objects&&(this.objects.forEach(e=>{e.destroy?e.destroy():e.dispose&&e.dispose()}),this.objects=[])}};ti(rt,"geometry",new Ji(.98,.96,.98)),ti(rt,"materialCache",new Map);let oo=rt;const hg=16;class ug{constructor(e,t={}){this.threeManager=e,this.chunkSize=t.chunkSize||hg,this.tiles=[],this.tileMap=new Map,this.elevationMap=new Map,this.surfaceMap=new Map,this.chunkMap=new Map}generate(e,t){this.clear();for(let n=-e/2;n<e/2;n++)for(let r=-t/2;r<t/2;r++){const s=Math.sqrt(n*n+r*r);let a=1,o=st.GEO,h=0;s>e*.4?(o=st.HYDRO,h=2,a=0,Math.abs(Math.sin(n*.2)*Math.cos(r*.2))>.7&&(h=4)):s>e*.35&&(o=st.ANEMO,a=0);for(let l=0;l<=a;l++){const u=l===a?o:st.GEO,d=l===a?h:0;this.addTile(n,r,l,u,d)}}}generateFromArray(e,t){this.clear();const n=e.length,r=e[0].length,s=Math.floor(r/2),a=Math.floor(n/2);for(let o=0;o<n;o++){const h=e[o];for(let l=0;l<r;l++){const u=h[l],d=t[u]||{element:st.VOID,maxZ:0,textureValue:0},f=l-s,v=o-a;for(let M=0;M<=d.maxZ;M++){const T=M===d.maxZ?d.element:st.GEO,_=M===d.maxZ?d.textureValue??0:0;this.addTile(f,v,M,T,_)}}}}generateFromChunkedArray(e,t,n=this.chunkSize){this.chunkSize=n,this.generateFromArray(e,t)}addTile(e,t,n,r,s=0){const a=new oo(this.threeManager,e,t,n,{element:r,textureValue:s});this.tiles.push(a);const o=this.getTileKey(e,t,n);this.tileMap.set(o,a),this.registerTileInChunk(e,t,o);const h=this.getColumnKey(e,t),l=this.elevationMap.get(h)??-1;return n>l&&(this.elevationMap.set(h,n),this.surfaceMap.set(h,{x:e,y:t,z:n,element:r,textureValue:s,definition:Xi(r,s)})),a}getTileAt(e,t,n){return this.tileMap.get(this.getTileKey(e,t,n))}getElevation(e,t){const{gridX:n,gridY:r}=this.toGridPosition(e,t);return this.elevationMap.get(this.getColumnKey(n,r))??0}getSurfaceAt(e,t){const{gridX:n,gridY:r}=this.toGridPosition(e,t);return this.surfaceMap.get(this.getColumnKey(n,r))}hasTileColumn(e,t){const{gridX:n,gridY:r}=this.toGridPosition(e,t);return this.elevationMap.has(this.getColumnKey(n,r))}isWalkable(e,t){const n=this.getSurfaceAt(e,t);return n?cg(n.element,n.textureValue):!1}canOccupyTile(e,t,n=e,r=t){if(!this.isWalkable(e,t))return!1;const s=this.getElevation(n,r);return this.getElevation(e,t)-s<2}canMoveBetween(e,t,n,r,s=!1){const a=this.toGridPosition(e,t),o=this.toGridPosition(n,r);if(a.gridX===o.gridX&&a.gridY===o.gridY)return this.canOccupyTile(o.gridX,o.gridY,a.gridX,a.gridY);if(!this.canOccupyTile(o.gridX,o.gridY,a.gridX,a.gridY))return!1;const h=o.gridX-a.gridX,l=o.gridY-a.gridY;if(Math.abs(h)>1||Math.abs(l)>1)return!1;if(!(s||Math.abs(h)===1&&Math.abs(l)===1))return!0;const d=this.canOccupyTile(o.gridX,a.gridY,a.gridX,a.gridY),f=this.canOccupyTile(a.gridX,o.gridY,a.gridX,a.gridY);return d&&f}supportsHabitat(e,t,n){const r=this.getSurfaceAt(e,t);return r?lg(r.element,r.textureValue,n):!1}getMoveCost(e,t,n,r,s=!1){var v;if(!this.canMoveBetween(e,t,n,r,s))return 1/0;const a=this.getElevation(e,t),h=this.getElevation(n,r)-a;if(h>=2)return 1/0;const l=this.getSurfaceAt(n,r),u=s?1.414:1,d=((v=l==null?void 0:l.definition)==null?void 0:v.moveCost)||1,f=h>0?h*.5:h*.15;return Math.max(.1,u*d+f)}findNearestHabitat(e,t,n,r=16){const s=this.toGridPosition(e,t);let a=null;for(let o=0;o<=r;o++){for(let h=s.gridX-o;h<=s.gridX+o;h++){for(let l=s.gridY-o;l<=s.gridY+o;l++)if(!(Math.abs(h-s.gridX)!==o&&Math.abs(l-s.gridY)!==o)&&this.supportsHabitat(h,l,n)){a={x:h,y:l,z:this.getElevation(h,l)};break}if(a)break}if(a)return a}return null}findNearestWalkable(e,t,n=48){const r=this.toGridPosition(e,t);for(let s=0;s<=n;s++)for(let a=r.gridX-s;a<=r.gridX+s;a++)for(let o=r.gridY-s;o<=r.gridY+s;o++)if(!(Math.abs(a-r.gridX)!==s&&Math.abs(o-r.gridY)!==s)&&this.isWalkable(a,o))return{x:a,y:o,z:this.getElevation(a,o)};return null}modifyTile(e,t,n,r,s=0){const a=this.getTileAt(e,t,n);a?(console.log(`[WorldGenerator] Modifying tile at ${e},${t},${n} to Element:${r}, Var:${s}`),a.setElementalType(r,s)):this.addTile(e,t,n,r,s)}applyIceToTile(e,t,n){const r=this.getTileAt(e,t,n);r&&r.element===st.HYDRO&&this.modifyTile(e,t,n,st.CRYO,0)}removeTile(e,t,n){const r=this.getTileKey(e,t,n),s=this.tileMap.get(r);if(s){s.destroy(),this.tileMap.delete(r),this.tiles=this.tiles.filter(l=>l!==s),this.unregisterTileFromChunk(e,t,r);let a=-1,o=null;for(let l=n+10;l>=0;l--){const u=this.tileMap.get(this.getTileKey(e,t,l));if(u){a=l,o=u;break}}const h=this.getColumnKey(e,t);a===-1?(this.elevationMap.delete(h),this.surfaceMap.delete(h)):(this.elevationMap.set(h,a),this.surfaceMap.set(h,{x:e,y:t,z:a,element:o.element,textureValue:o.textureValue,definition:Xi(o.element,o.textureValue)}))}}clear(){this.tiles.forEach(e=>e.destroy()),this.tiles=[],this.tileMap.clear(),this.elevationMap.clear(),this.surfaceMap.clear(),this.chunkMap.clear()}exportWorld(){const e=this.tiles.map(t=>({gridX:t.gridX,gridY:t.gridY,elevation:t.elevation,element:t.element,variant:t.textureValue}));return JSON.stringify(e)}loadWorld(e){try{const t=JSON.parse(e);this.clear(),t.forEach(n=>{this.addTile(n.gridX,n.gridY,n.elevation,n.element,n.variant)}),console.log(`[WorldGenerator] Loaded ${t.length} tiles.`)}catch(t){console.error("[WorldGenerator] Failed to load world:",t)}}getTileKey(e,t,n){return`${e},${t},${n}`}getColumnKey(e,t){return`${e},${t}`}toGridPosition(e,t){return{gridX:Math.round(e),gridY:Math.round(t)}}getChunkCoord(e){return Math.floor(e/this.chunkSize)}getChunkKey(e,t){return`${e},${t}`}getChunkKeyForTile(e,t){return this.getChunkKey(this.getChunkCoord(e),this.getChunkCoord(t))}registerTileInChunk(e,t,n){const r=this.getChunkKeyForTile(e,t);if(!this.chunkMap.has(r)){const[s,a]=r.split(",").map(Number);this.chunkMap.set(r,{chunkX:s,chunkY:a,tileKeys:new Set})}this.chunkMap.get(r).tileKeys.add(n)}unregisterTileFromChunk(e,t,n){const r=this.getChunkKeyForTile(e,t),s=this.chunkMap.get(r);s&&(s.tileKeys.delete(n),s.tileKeys.size===0&&this.chunkMap.delete(r))}getLoadedChunkSummary(){return[...this.chunkMap.values()].map(e=>({chunkX:e.chunkX,chunkY:e.chunkY,blocks:e.tileKeys.size}))}}const fg="assets/characters/lpc-human-male/Walk.png",ua=8,Gc=4,dg=.11,Hc={south:0,west:1,east:2,north:3},lr=new k,hr=new k,ur=new lt,nn=class nn{constructor(e,t,n,r,s,a={}){this.threeManager=e,this.inputManager=t,this.worldGenerator=n,this.isLocal=a.isLocal??!0,this.userId=a.userId||"player",this.gridX=r,this.gridY=s,this.gridZ=this.worldGenerator.getElevation(r,s),this.visualX=this.gridX,this.visualY=this.gridY,this.visualZ=this.gridZ,this.targetX=this.gridX,this.targetY=this.gridY,this.targetZ=this.gridZ,this.speed=3.2,this.currentPath=[],this.direction="south",this.frame=0,this.frameTimer=0,this.isMoving=!1,this.group=new Zn,this.shadow=new It(nn.shadowGeometry,nn.shadowMaterial),this.shadow.rotation.x=-Math.PI/2,this.shadow.position.y=.02,this.group.add(this.shadow),this.material=new fs({transparent:!0,alphaTest:.08,depthWrite:!1}),this.mesh=new It(nn.geometry,this.material),this.mesh.position.y=1,this.group.add(this.mesh),this.threeManager.addToEntities(this.group),this.loadTexture(),this.syncModel()}async loadTexture(){const e=await nn.getSourceTexture();this.texture=e.clone(),this.texture.needsUpdate=!0,this.texture.repeat.set(1/ua,1/Gc),this.material.map=this.texture,this.material.needsUpdate=!0,this.updateFrame(0)}static getSourceTexture(){return nn.texturePromise||(nn.texturePromise=new Promise((e,t)=>{new nu().load(fg,n=>{n.colorSpace=$t,n.magFilter=Dt,n.minFilter=Dt,e(n)},void 0,t)})),nn.texturePromise}setPath(e){if(this.currentPath=[...e],this.currentPath.length>0){const t=this.currentPath[0];Math.abs(t.x-this.gridX)<.1&&Math.abs(t.y-this.gridY)<.1&&this.currentPath.shift()}}setRemoteTarget(e,t,n){this.targetX=e,this.targetY=t,this.targetZ=n}update(e=1/60){this.isLocal?this.updateLocal(e):this.updateRemote(e),this.updateAnimation(e),this.syncModel()}updateLocal(e){const t=this.speed*Math.min(e,.05);if(this.isMoving=!1,this.currentPath.length>0){const s=this.currentPath[0];this.moveToward(s.x,s.y,t),Math.abs(s.x-this.gridX)<.001&&Math.abs(s.y-this.gridY)<.001&&this.currentPath.shift();return}const n=(this.inputManager.isKeyDown("KeyD")?1:0)-(this.inputManager.isKeyDown("KeyA")?1:0),r=(this.inputManager.isKeyDown("KeyW")?1:0)-(this.inputManager.isKeyDown("KeyS")?1:0);if(n!==0||r!==0){const{mx:s,my:a}=this.getCameraRelativeMovement(n,r),o=this.gridX+s*t,h=this.gridY+a*t,l=this.tryMove(o,this.gridY,s,0),u=this.tryMove(this.gridX,h,0,a);!l&&!u&&this.tryMove(o,h,s,a)}}getCameraRelativeMovement(e,t){return lr.set(0,0,-1).applyQuaternion(this.threeManager.camera.quaternion),lr.y=0,lr.normalize(),hr.set(1,0,0).applyQuaternion(this.threeManager.camera.quaternion),hr.y=0,hr.normalize(),ur.set(hr.x*e+lr.x*t,hr.z*e+lr.z*t),ur.lengthSq()>1&&ur.normalize(),{mx:ur.x,my:ur.y}}moveToward(e,t,n){const r=e-this.gridX,s=t-this.gridY,a=Math.sqrt(r*r+s*s);a<=n?this.tryMove(e,t,r,s):this.tryMove(this.gridX+r/a*n,this.gridY+s/a*n,r,s)}tryMove(e,t,n,r){const s=Math.round(this.gridX),a=Math.round(this.gridY),o=Math.round(e),h=Math.round(t),l=s!==o&&a!==h,u=this.worldGenerator.getElevation(o,h);return this.worldGenerator.canMoveBetween(s,a,o,h,l)?(this.gridX=e,this.gridY=t,this.gridZ=u,this.targetX=e,this.targetY=t,this.targetZ=u,this.setDirection(n,r),this.isMoving=!0,!0):!1}updateRemote(e){const t=Math.min(1,e*12),n=this.targetX-this.gridX,r=this.targetY-this.gridY;this.gridX+=n*t,this.gridY+=r*t,this.gridZ+=(this.targetZ-this.gridZ)*t,this.isMoving=Math.sqrt(n*n+r*r)>.01,this.isMoving&&this.setDirection(n,r)}setDirection(e,t){Math.abs(e)>Math.abs(t)?this.direction=e>0?"east":"west":this.direction=t>0?"south":"north"}updateAnimation(e){this.isMoving?(this.frameTimer+=e,this.frameTimer>=dg&&(this.frameTimer=0,this.frame=(this.frame+1)%ua)):(this.frame=0,this.frameTimer=0),this.updateFrame(this.frame)}updateFrame(e){if(!this.texture)return;const t=Hc[this.direction]??Hc.south;this.texture.offset.x=e/ua,this.texture.offset.y=1-(t+1)/Gc}syncModel(){this.visualX+=(this.gridX-this.visualX)*.45,this.visualY+=(this.gridY-this.visualY)*.45,this.visualZ+=(this.gridZ-this.visualZ)*.2,this.group.position.set(this.visualX,this.visualZ+.02,this.visualY),this.mesh.quaternion.copy(this.threeManager.camera.quaternion)}getCenterPayload(){return{centerX:this.gridX,centerY:this.gridY,centerZ:this.gridZ}}applyAuthoritativeCenter(e,t,n,r,s,a){const o=Math.sqrt((e-this.gridX)**2+(t-this.gridY)**2);this.gridX=e,this.gridY=t,this.gridZ=n??a,this.targetX=e,this.targetY=t,this.targetZ=n??a,Number.isFinite(r)&&Number.isFinite(s)&&(this.gridZ=a),o>.75&&(this.visualX=this.gridX,this.visualY=this.gridY,this.visualZ=this.gridZ)}destroy(){this.threeManager.removeFromEntities(this.group),this.texture&&this.texture.dispose(),this.material.dispose()}};ti(nn,"texturePromise",null),ti(nn,"geometry",new Ar(1.18,2)),ti(nn,"shadowGeometry",new bo(.32,20)),ti(nn,"shadowMaterial",new fs({color:329477,transparent:!0,opacity:.28,depthWrite:!1}));let ms=nn;class pg{constructor(){this.keys={},this.wheelDelta=0,this.callbacks={},this.pointerTarget=window,window.addEventListener("keydown",e=>{this.keys[e.code]||this.callbacks[e.code]&&this.callbacks[e.code].forEach(t=>t()),this.keys[e.code]=!0}),window.addEventListener("keyup",e=>{this.keys[e.code]=!1}),window.addEventListener("wheel",e=>{this.wheelDelta=e.deltaY}),this.onClickCallbacks=[],this.mouseNDC={x:0,y:0},this.handleMouseDown=e=>{this.updateMousePosition(e),this.onClickCallbacks.forEach(t=>t(e.button,e))},this.handleMouseMove=e=>this.updateMousePosition(e),this.setPointerTarget(window)}setPointerTarget(e){this.pointerTarget&&(this.pointerTarget.removeEventListener("mousedown",this.handleMouseDown),this.pointerTarget.removeEventListener("mousemove",this.handleMouseMove)),this.pointerTarget=e||window,this.pointerTarget.addEventListener("mousedown",this.handleMouseDown),this.pointerTarget.addEventListener("mousemove",this.handleMouseMove)}updateMousePosition(e){const n=(this.pointerTarget===window?document.documentElement:this.pointerTarget).getBoundingClientRect(),r=n.width||window.innerWidth,s=n.height||window.innerHeight;this.mouseNDC.x=(e.clientX-n.left)/r*2-1,this.mouseNDC.y=-((e.clientY-n.top)/s)*2+1}isKeyDown(e){return!!this.keys[e]}getWheelDelta(){const e=this.wheelDelta;return this.wheelDelta=0,e}onLeftClick(e){this.onClickCallbacks.push(e)}onKeyDown(e,t){this.callbacks[e]||(this.callbacks[e]=[]),this.callbacks[e].push(t)}}class mg{constructor(e){this.worldGenerator=e}findPath(e,t,n,r){const s={x:Math.round(e),y:Math.round(t)},a={x:Math.round(n),y:Math.round(r)};if(!this.worldGenerator.isWalkable(a.x,a.y))return[];const o=[s],h=new Map,l=new Set,u=new Map;u.set(`${s.x},${s.y}`,0);const d=new Map;for(d.set(`${s.x},${s.y}`,this.heuristic(s,a));o.length>0;){let f=o[0],v=0;for(let T=1;T<o.length;T++){const _=o[T];(d.get(`${_.x},${_.y}`)??1/0)<(d.get(`${f.x},${f.y}`)??1/0)&&(f=_,v=T)}if(f.x===a.x&&f.y===a.y)return this.reconstructPath(h,f);o.splice(v,1),l.add(`${f.x},${f.y}`);const M=[{x:f.x+1,y:f.y,isDiag:!1},{x:f.x-1,y:f.y,isDiag:!1},{x:f.x,y:f.y+1,isDiag:!1},{x:f.x,y:f.y-1,isDiag:!1},{x:f.x+1,y:f.y+1,isDiag:!0},{x:f.x+1,y:f.y-1,isDiag:!0},{x:f.x-1,y:f.y+1,isDiag:!0},{x:f.x-1,y:f.y-1,isDiag:!0}];for(const T of M){const _=`${T.x},${T.y}`;if(l.has(_))continue;const g=this.worldGenerator.getMoveCost(f.x,f.y,T.x,T.y,T.isDiag);if(!Number.isFinite(g))continue;const A=(u.get(`${f.x},${f.y}`)??1/0)+g;A<(u.get(_)??1/0)&&(h.set(_,f),u.set(_,A),d.set(_,A+this.heuristic(T,a)),o.find(C=>C.x===T.x&&C.y===T.y)||o.push(T))}}return[]}heuristic(e,t){const n=Math.abs(e.x-t.x),r=Math.abs(e.y-t.y);return 1*Math.max(n,r)+(1.414-1)*Math.min(n,r)}reconstructPath(e,t){const n=[t];let r=`${t.x},${t.y}`;for(;e.has(r);)t=e.get(r),n.unshift(t),r=`${t.x},${t.y}`;return n}}class gg{constructor(e,t,n){this.threeManager=e,this.worldGenerator=t,this.id=n.id,this.species=n.species,this.habitat=n.habitat,this.homeX=n.x,this.homeY=n.y,this.leashRadius=n.leashRadius||4,this.gridX=n.x,this.gridY=n.y,this.gridZ=this.worldGenerator.getElevation(n.x,n.y),this.visualZ=this.gridZ,this.speed=1.35,this.idleTimer=.4,this.target=null,this.bobTime=Math.random()*Math.PI*2,this.group=this.createModel(),this.threeManager.addToEntities(this.group),this.syncModel()}createModel(){const e=new Zn,t=new vr({color:13279599,roughness:.8}),n=new vr({color:16114888,roughness:.85}),r=new vr({color:5256745,roughness:.75}),s=new It(new ui(.28,16,12),t);s.scale.set(1.25,.72,.82),s.position.set(0,.22,0),e.add(s);const a=new It(new ui(.16,12,8),n);a.scale.set(1.1,.7,.55),a.position.set(.15,.2,.02),e.add(a);const o=new It(new ui(.16,14,10),t);o.position.set(.33,.31,0),e.add(o);const h=new wo(.045,.32,8),l=new It(h,t);l.position.set(.34,.56,-.07),l.rotation.z=-.28,e.add(l);const u=new It(h,t);u.position.set(.34,.56,.07),u.rotation.z=-.18,e.add(u);const d=new It(new ui(.035,8,6),r);d.position.set(.48,.31,0),e.add(d);const f=new It(new ui(.09,10,8),n);return f.position.set(-.33,.26,0),e.add(f),e.scale.set(.8,.8,.8),e.userData.wildlife=this,e}update(e){if(this.bobTime+=e*5,this.target||(this.idleTimer-=e,this.idleTimer<=0&&(this.target=this.pickTarget(),this.idleTimer=1.2+Math.random()*2.4)),this.target){const t=this.target.x-this.gridX,n=this.target.y-this.gridY,r=Math.sqrt(t*t+n*n),s=this.speed*Math.min(e,.05);if(r<=s)this.gridX=this.target.x,this.gridY=this.target.y,this.gridZ=this.worldGenerator.getElevation(this.gridX,this.gridY),this.target=null;else{this.gridX+=t/r*s,this.gridY+=n/r*s;const a=Math.round(this.gridX),o=Math.round(this.gridY);this.gridZ=this.worldGenerator.getElevation(a,o),this.group.rotation.y=t<0?Math.PI:0}}this.syncModel()}pickTarget(){const e=[];for(let t=this.homeX-this.leashRadius;t<=this.homeX+this.leashRadius;t++)for(let n=this.homeY-this.leashRadius;n<=this.homeY+this.leashRadius;n++)Math.sqrt((t-this.homeX)**2+(n-this.homeY)**2)>this.leashRadius||this.worldGenerator.supportsHabitat(t,n,this.habitat)&&e.push({x:t,y:n});return e.length===0?null:e[Math.floor(Math.random()*e.length)]}syncModel(){this.visualZ+=(this.gridZ-this.visualZ)*.18;const e=this.target?Math.abs(Math.sin(this.bobTime))*.08:0;this.group.position.set(this.gridX,this.visualZ+1.05+e,this.gridY)}destroy(){this.group.traverse(e=>{e.geometry&&e.geometry.dispose(),e.material&&e.material.dispose()}),this.threeManager.removeFromEntities(this.group)}}const _g={meadowHare:gg};class zc{constructor(e,t,n=[]){this.threeManager=e,this.worldGenerator=t,this.wildlife=[],this.spawnAll(n)}spawnAll(e){for(const t of e)this.spawn(t)}spawn(e){const t=_g[e.species];if(!t)return console.warn(`[WildlifeSystem] Unknown species "${e.species}" ignored.`),null;const n=this.worldGenerator.supportsHabitat(e.x,e.y,e.habitat)?{x:e.x,y:e.y}:this.worldGenerator.findNearestHabitat(e.x,e.y,e.habitat,12);if(!n)return console.warn(`[WildlifeSystem] No "${e.habitat}" habitat found for ${e.id}.`),null;const r={...e,x:n.x,y:n.y},s=new t(this.threeManager,this.worldGenerator,r);return this.wildlife.push(s),s}update(e){for(const t of this.wildlife)t.update(e)}destroy(){this.wildlife.forEach(e=>e.destroy()),this.wildlife=[]}}const es=16,kc={W:{element:st.HYDRO,maxZ:0,textureValue:2},B:{element:st.HYDRO,maxZ:0,textureValue:4},S:{element:st.ANEMO,maxZ:1,textureValue:0},G:{element:st.GEO,maxZ:1,textureValue:0},F:{element:st.GEO,maxZ:1,textureValue:1},H:{element:st.GEO,maxZ:2,textureValue:3},M:{element:st.GEO,maxZ:3,textureValue:4},P:{element:st.CRYO,maxZ:4,textureValue:0},I:{element:st.CRYO,maxZ:0,textureValue:1},L:{element:st.PYRO,maxZ:2,textureValue:0},R:{element:st.GEO,maxZ:1,textureValue:2},T:{element:st.STRUCTURE,maxZ:3,textureValue:1},X:{element:st.STRUCTURE,maxZ:2,textureValue:0}},Il=["WWWWWWWWWWWWWWWWWWWWWWWWWWWWWW","WWWWWWGSSSSSWWWWWWWWWWWWWWWWWW","WWWWWGSSSSSGGWWWWWWWWHHHHWWWWW","WWWWGGGGSSGGGGWWWWWHHHHHHGHWWW","WWWWGGGGGGGGGGGWHHHHMMMMHHGGWW","WWWGGGHHGGGGGGGWHHHHMMMMHHGGWW","WWWGGHHMMHGGGGGWHHMMMMMMMHGGWW","WWWGGHMMMHGGGGGWHHMMMMMMMHGGWW","WWGGHMMMMHGHHHHWHMMPPPPMHGGWWW","WWGGHMMMMHHHHHHWHHMPPPPMHHGWWW","WWGGHMMMHHGHGGGHHHMMPPMMMHGGWW","WWGGGHHHHGGGGGGHWWHHMMMMMHGWWW","WWWGGGGGGGGGWGGHWWWWWHHHHHGGWW","WWWWWGGGGGGWWGGHWWHHWWHHHGGWWW","WWWWWGGGGGWBBWGHWWWHWWHHGGGWWW","WWWWWGGGGGWWBBGWWWWWHWHHGGWWWW","WWWWWGGGGGBBBBWWWWWWWHHHGWWWWW","WWWWWGGGGGWBBWWWWWHWHWWHWWWWWW","WWWWWWGGGGWWWWWHHHHWWHHWWWWWWW","WWWWWWWGGGWHHHHHHMMHWHGWWWWWWW","WWWWWWWWWWHHMMMMMMMHWHGGWWWWWW","WWWWWWWWHHMMMMLLMMHHWHHGWWWWWW","WWWWWWWWHHMMMLLLMMHHWWHGWWWWWW","WWWWWWWWHHMMMMLLMMHWWWHWWWWWWW","WWWWWWWWHHHHMMMMHHWWWWWWWWWWWW","WWWWWWWWWHHHHHHHHHWWWWWWWWWWWW","WWWWWWWWIIIHWHHHWWWWWWWWWWWWWW","WWWWWWWIIIIIIWWWWWWWWWWWWWWWWW","WWWWWWWIIIIIIWWWWWWWWWWWWWWWWW","WWWWWWWWWWWWWWWWWWWWWWWWWWWWWW"],Vc=[{id:"meadow-hare-01",species:"meadowHare",habitat:"meadow",x:-8,y:-4,leashRadius:4}];function vg(i=72,e=60,t=Date.now(),n={}){const r=xg(t),s=Mg(i,e,t,r,n),a=[];for(let l=0;l<e;l++){let u="";for(let d=0;d<i;d++)u+=yg(Sg(d,l,s,t));a.push(u)}const o=bg(a,s,r),h=Ag(o,i,e,r);return Eg(o,h,r)}function xg(i){let e=Math.abs(Math.floor(i))||1;return()=>(e=(e*1664525+1013904223)%4294967296,e/4294967296)}function Mg(i,e,t,n,r){const s=r.ridgeAngle??n()*Math.PI,a=n()>.5;return{width:i,height:e,seed:t,centerX:i/2,centerY:e/2,seaLevel:r.seaLevel??.34,ridgeCos:Math.cos(s),ridgeSin:Math.sin(s),moistureBias:r.moistureBias??n()*.18-.06,temperatureBias:r.temperatureBias??n()*.16-.08,volcanicBias:r.volcanicBias??n()*.18,riverSource:{x:Math.floor(i*(.38+n()*.24)),y:Math.floor(e*(a?.22:.78))},riverTarget:{x:Math.floor(i*(n()>.5?.08:.92)),y:Math.floor(e*(.36+n()*.28))}}}function Sg(i,e,t,n){const r=(i-t.centerX)/t.centerX,s=(e-t.centerY)/t.centerY,a=Math.min(i,e,t.width-i-1,t.height-e-1),o=Math.sqrt(r*r+s*s),h=Math.abs(r*t.ridgeCos+s*t.ridgeSin),l=1.02-o*.9,u=Math.max(0,.28-h)*1.38,d=fr(i,e,n,.055)*.18,f=fr(i,e,n+97,.15)*.08,v=fr(i,e,n+223,.1),M=l+u+d+f+v*.15,_=1-Math.abs(e/t.height-.5)*2*.78-Math.max(0,M-.7)*.48+fr(i,e,n+421,.04)*.1+t.temperatureBias,g=.48+fr(i,e,n+641,.075)*.28-Math.max(0,M-.78)*.18+t.moistureBias;return{x:i,y:e,edge:a,heightScore:M,mountainNoise:v,temperature:_,moisture:g,seaLevel:t.seaLevel,volcanicBias:t.volcanicBias}}function yg(i){const{edge:e,heightScore:t,mountainNoise:n,temperature:r,moisture:s,seaLevel:a,volcanicBias:o}=i;if(e<=1||t<a-.16)return s>.58?"B":"W";if(t<a-.04)return s>.66?"B":"W";if(t<a+.08)return"S";if(r<.14&&t<.72&&s>.42)return"I";if(t>1.08&&r<.4)return"P";const h=n+o+Math.max(0,t-.92);return t>.88&&h>1.22&&r>.28?"L":t>.95?n>.08?"M":"H":t>.74?s>.62&&r>.24?"F":"H":s>.58&&r>.22?"F":"G"}function Eg(i,e,t){var s,a,o,h;const n=i.map(l=>l.split("")),r=[{x:-7,y:-3,w:5,h:4},{x:3,y:-4,w:6,h:4},{x:-2,y:4,w:5,h:4}];for(const l of r)for(let u=0;u<l.h;u++)for(let d=0;d<l.w;d++){const f=e.x+l.x+d,v=e.y+l.y+u;if(!((s=n[v])!=null&&s[f])||!Tg(n[v][f]))continue;const M=d===0||u===0||d===l.w-1||u===l.h-1;n[v][f]=M?"T":"R"}for(let l=e.x-11;l<=e.x+11;l++)(a=n[e.y])!=null&&a[l]&&n[e.y][l]!=="T"&&Xc(n[e.y][l])&&(n[e.y][l]="R");for(let l=e.y-8;l<=e.y+8;l++)(o=n[l])!=null&&o[e.x]&&n[l][e.x]!=="T"&&Xc(n[l][e.x])&&(n[l][e.x]="R");for(let l=0;l<18;l++){const u=e.x+Math.floor(t()*20)-10,d=e.y+Math.floor(t()*14)-7;(h=n[d])!=null&&h[u]&&n[d][u]==="G"&&(n[d][u]="F")}return n.map(l=>l.join(""))}function Tg(i){return["G","F","S"].includes(i)}function Xc(i){return["G","F","S","H","R"].includes(i)}function bg(i,e,t){var o;const n=i.map(h=>h.split(""));let r=e.riverSource.x,s=e.riverSource.y;const a=e.width+e.height;for(let h=0;h<a&&((o=n[s])!=null&&o[r]);h++){const l=n[s][r];if(["M","P","L"].includes(l)||(n[s][r]=l==="S"?"W":"B",ts(n,r+1,s),ts(n,r-1,s),ts(n,r,s+1),ts(n,r,s-1)),r<=2||s<=2||r>=e.width-3||s>=e.height-3)break;const u=Math.sign(e.riverTarget.x-r),d=Math.sign(e.riverTarget.y-s);t()>.52&&(r+=u||(t()>.5?1:-1)),t()>.42&&(s+=d||(t()>.5?1:-1)),t()>.76&&(r+=t()>.5?1:-1),t()>.84&&(s+=t()>.5?1:-1),r=Math.max(1,Math.min(e.width-2,r)),s=Math.max(1,Math.min(e.height-2,s))}return n.map(h=>h.join(""))}function ts(i,e,t){var n;(n=i[t])!=null&&n[e]&&["G","F","H"].includes(i[t][e])&&(i[t][e]="S")}function Ag(i,e,t,n){var s;let r={x:Math.floor(e/2),y:Math.floor(t/2),score:-1/0};for(let a=8;a<t-8;a++)for(let o=8;o<e-8;o++){let h=n()*.8;for(let u=-4;u<=4;u++)for(let d=-4;d<=4;d++){const f=(s=i[a+u])==null?void 0:s[o+d];["G","F","S"].includes(f)&&(h+=2),f==="H"&&(h+=.4),["W","B","I","L","M","P"].includes(f)&&(h-=3.2)}const l=Math.min(o,a,e-o-1,t-a-1);h+=Math.min(l,14)*.18,h>r.score&&(r={x:o,y:a,score:h})}return{x:r.x,y:r.y}}function fr(i,e,t,n){const r=Math.sin((i*n+t*.013)*12.9898+(e*n-t*.007)*78.233)*43758.5453;return(r-Math.floor(r))*2-1}class wg{constructor(e){this.onApplyMap=e.onApplyMap,this.onRandomizeMap=e.onRandomizeMap,this.onStartCombat=e.onStartCombat,this.toggleButton=document.getElementById("admin-toggle"),this.panel=document.getElementById("admin-panel"),this.mapInput=document.getElementById("map-array-input"),this.message=document.getElementById("admin-message"),this.applyButton=document.getElementById("apply-map-button"),this.randomButton=document.getElementById("random-map-button"),this.combatButton=document.getElementById("start-combat-button"),this.closeButton=document.getElementById("admin-close-button"),this.mapInput.value=Il.join(`
`),this.bindEvents()}bindEvents(){this.toggleButton.addEventListener("click",()=>this.setOpen(!this.panel.classList.contains("is-open"))),this.closeButton.addEventListener("click",()=>this.setOpen(!1)),this.applyButton.addEventListener("click",()=>this.applyCurrentMap()),this.randomButton.addEventListener("click",()=>this.randomizeMap()),this.combatButton.addEventListener("click",()=>{this.setOpen(!1),this.onStartCombat()})}setOpen(e){this.panel.classList.toggle("is-open",e),this.toggleButton.setAttribute("aria-expanded",String(e))}applyCurrentMap(){try{const e=this.parseMapRows(this.mapInput.value);this.onApplyMap(e),this.setMessage(`Applied ${e[0].length} x ${e.length} array map.`,"success")}catch(e){this.setMessage(e.message,"error")}}randomizeMap(){const e=vg();this.mapInput.value=e.join(`
`),this.onRandomizeMap(e),this.setMessage(`Randomized ${e[0].length} x ${e.length} world.`,"success")}parseMapRows(e){const t=e.split(`
`).map(s=>s.trim().toUpperCase()).filter(Boolean);if(t.length<4)throw new Error("Map needs at least 4 rows.");const n=t[0].length;if(n<4)throw new Error("Map rows need at least 4 columns.");const r=new Set(["W","B","S","G","F","H","M","P","I","L","R","T","X"]);for(const s of t){if(s.length!==n)throw new Error("Every map row must have the same width.");for(const a of s)if(!r.has(a))throw new Error(`Unknown map symbol "${a}".`)}return t}setMapRows(e){this.mapInput.value=e.join(`
`)}setMessage(e,t="neutral"){this.message.textContent=e,this.message.dataset.tone=t}}class $c{constructor(e){this.client=e.client,this.userId=e.userId,this.onExit=e.onExit,this.overlay=document.getElementById("combat-scene"),this.status=document.getElementById("combat-status"),this.roundReadout=document.getElementById("combat-round"),this.turnReadout=document.getElementById("combat-turn"),this.partyList=document.getElementById("combat-party-list"),this.enemyList=document.getElementById("combat-enemy-list"),this.log=document.getElementById("combat-log"),this.attackButton=document.getElementById("combat-attack-button"),this.guardButton=document.getElementById("combat-guard-button"),this.readyButton=document.getElementById("combat-ready-button"),this.leaveButton=document.getElementById("combat-leave-button"),this.attackButton.addEventListener("click",()=>this.sendAction("attack")),this.guardButton.addEventListener("click",()=>this.sendAction("guard")),this.readyButton.addEventListener("click",()=>this.sendAction("ready")),this.leaveButton.addEventListener("click",()=>this.leave())}async enter(e="meadow-hare-demo"){if(this.overlay.classList.add("is-open"),!this.client){this.setStatus("Combat unavailable while offline.");return}this.setStatus("Joining co-op combat...");try{this.room=await this.client.joinOrCreate("combat",{userId:this.userId,encounterId:e}),this.bindRoom(),this.setStatus("Co-op combat ready.")}catch(t){console.error("[CombatScene] Failed to join combat:",t),this.setStatus("Could not join combat room.")}}bindRoom(){this.room&&(this.room.onMessage("combat:snapshot",e=>this.renderSnapshot(e)),this.room.onMessage("combat:log",e=>this.appendLog(e.message)))}sendAction(e){if(!this.room){this.appendLog("No combat room connected.");return}const t=e==="attack"?"wildlife_meadow_hare":"";this.room.send("combat:action",{action:e,targetId:t})}renderSnapshot(e){this.roundReadout.textContent=`${e.round}`,this.turnReadout.textContent=e.activeActorId||"Waiting",this.renderList(this.partyList,e.party||[],"ally"),this.renderList(this.enemyList,e.enemies||[],"enemy"),this.setStatus(e.phase==="planning"?"Choose an action.":"Resolving turn.")}renderList(e,t,n){e.innerHTML="";for(const r of t){const s=document.createElement("li");s.className=`combat-actor ${n}`;const a=document.createElement("span");a.textContent=r.name;const o=document.createElement("meter");o.min=0,o.max=r.maxHp,o.value=r.hp;const h=document.createElement("strong");h.textContent=`${r.hp}/${r.maxHp}`,s.append(a,o,h),e.appendChild(s)}}appendLog(e){const t=document.createElement("li");for(t.textContent=e,this.log.prepend(t);this.log.children.length>5;)this.log.removeChild(this.log.lastChild)}setStatus(e){this.status.textContent=e}async leave(){var e;this.room&&(await this.room.leave(),this.room=null),this.overlay.classList.remove("is-open"),(e=this.onExit)==null||e.call(this)}}var wt=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function Rg(i){if(i.__esModule)return i;var e=i.default;if(typeof e=="function"){var t=function n(){return this instanceof n?Reflect.construct(e,arguments,this.constructor):e.apply(this,arguments)};t.prototype=e.prototype}else t={};return Object.defineProperty(t,"__esModule",{value:!0}),Object.keys(i).forEach(function(n){var r=Object.getOwnPropertyDescriptor(i,n);Object.defineProperty(t,n,r.get?r:{enumerable:!0,get:function(){return i[n]}})}),t}var Dl={};ArrayBuffer.isView||(ArrayBuffer.isView=i=>i!==null&&typeof i=="object"&&i.buffer instanceof ArrayBuffer);typeof globalThis>"u"&&typeof window<"u"&&(window.globalThis=window);var $i={},Ms={};(function(i){Object.defineProperty(i,"__esModule",{value:!0}),i.ServerError=i.CloseCode=void 0,function(t){t[t.CONSENTED=4e3]="CONSENTED",t[t.DEVMODE_RESTART=4010]="DEVMODE_RESTART"}(i.CloseCode||(i.CloseCode={}));class e extends Error{constructor(n,r){super(r),this.name="ServerError",this.code=n}}i.ServerError=e})(Ms);var wr={},Yi={};Object.defineProperty(Yi,"__esModule",{value:!0});Yi.decode=Yi.encode=void 0;function er(i,e){if(this._offset=e,i instanceof ArrayBuffer)this._buffer=i,this._view=new DataView(this._buffer);else if(ArrayBuffer.isView(i))this._buffer=i.buffer,this._view=new DataView(this._buffer,i.byteOffset,i.byteLength);else throw new Error("Invalid argument")}function Cg(i,e,t){for(var n="",r=0,s=e,a=e+t;s<a;s++){var o=i.getUint8(s);if(!(o&128)){n+=String.fromCharCode(o);continue}if((o&224)===192){n+=String.fromCharCode((o&31)<<6|i.getUint8(++s)&63);continue}if((o&240)===224){n+=String.fromCharCode((o&15)<<12|(i.getUint8(++s)&63)<<6|(i.getUint8(++s)&63)<<0);continue}if((o&248)===240){r=(o&7)<<18|(i.getUint8(++s)&63)<<12|(i.getUint8(++s)&63)<<6|(i.getUint8(++s)&63)<<0,r>=65536?(r-=65536,n+=String.fromCharCode((r>>>10)+55296,(r&1023)+56320)):n+=String.fromCharCode(r);continue}throw new Error("Invalid byte "+o.toString(16))}return n}er.prototype._array=function(i){for(var e=new Array(i),t=0;t<i;t++)e[t]=this._parse();return e};er.prototype._map=function(i){for(var e="",t={},n=0;n<i;n++)e=this._parse(),t[e]=this._parse();return t};er.prototype._str=function(i){var e=Cg(this._view,this._offset,i);return this._offset+=i,e};er.prototype._bin=function(i){var e=this._buffer.slice(this._offset,this._offset+i);return this._offset+=i,e};er.prototype._parse=function(){var i=this._view.getUint8(this._offset++),e,t=0,n=0,r=0,s=0;if(i<192)return i<128?i:i<144?this._map(i&15):i<160?this._array(i&15):this._str(i&31);if(i>223)return(255-i+1)*-1;switch(i){case 192:return null;case 194:return!1;case 195:return!0;case 196:return t=this._view.getUint8(this._offset),this._offset+=1,this._bin(t);case 197:return t=this._view.getUint16(this._offset),this._offset+=2,this._bin(t);case 198:return t=this._view.getUint32(this._offset),this._offset+=4,this._bin(t);case 199:if(t=this._view.getUint8(this._offset),n=this._view.getInt8(this._offset+1),this._offset+=2,n===-1){var a=this._view.getUint32(this._offset);return r=this._view.getInt32(this._offset+4),s=this._view.getUint32(this._offset+8),this._offset+=12,new Date((r*4294967296+s)*1e3+a/1e6)}return[n,this._bin(t)];case 200:return t=this._view.getUint16(this._offset),n=this._view.getInt8(this._offset+2),this._offset+=3,[n,this._bin(t)];case 201:return t=this._view.getUint32(this._offset),n=this._view.getInt8(this._offset+4),this._offset+=5,[n,this._bin(t)];case 202:return e=this._view.getFloat32(this._offset),this._offset+=4,e;case 203:return e=this._view.getFloat64(this._offset),this._offset+=8,e;case 204:return e=this._view.getUint8(this._offset),this._offset+=1,e;case 205:return e=this._view.getUint16(this._offset),this._offset+=2,e;case 206:return e=this._view.getUint32(this._offset),this._offset+=4,e;case 207:return r=this._view.getUint32(this._offset)*Math.pow(2,32),s=this._view.getUint32(this._offset+4),this._offset+=8,r+s;case 208:return e=this._view.getInt8(this._offset),this._offset+=1,e;case 209:return e=this._view.getInt16(this._offset),this._offset+=2,e;case 210:return e=this._view.getInt32(this._offset),this._offset+=4,e;case 211:return r=this._view.getInt32(this._offset)*Math.pow(2,32),s=this._view.getUint32(this._offset+4),this._offset+=8,r+s;case 212:if(n=this._view.getInt8(this._offset),this._offset+=1,n===0){this._offset+=1;return}return[n,this._bin(1)];case 213:return n=this._view.getInt8(this._offset),this._offset+=1,[n,this._bin(2)];case 214:return n=this._view.getInt8(this._offset),this._offset+=1,n===-1?(e=this._view.getUint32(this._offset),this._offset+=4,new Date(e*1e3)):[n,this._bin(4)];case 215:if(n=this._view.getInt8(this._offset),this._offset+=1,n===0)return r=this._view.getInt32(this._offset)*Math.pow(2,32),s=this._view.getUint32(this._offset+4),this._offset+=8,new Date(r+s);if(n===-1){r=this._view.getUint32(this._offset),s=this._view.getUint32(this._offset+4),this._offset+=8;var o=(r&3)*4294967296+s;return new Date(o*1e3+(r>>>2)/1e6)}return[n,this._bin(8)];case 216:return n=this._view.getInt8(this._offset),this._offset+=1,[n,this._bin(16)];case 217:return t=this._view.getUint8(this._offset),this._offset+=1,this._str(t);case 218:return t=this._view.getUint16(this._offset),this._offset+=2,this._str(t);case 219:return t=this._view.getUint32(this._offset),this._offset+=4,this._str(t);case 220:return t=this._view.getUint16(this._offset),this._offset+=2,this._array(t);case 221:return t=this._view.getUint32(this._offset),this._offset+=4,this._array(t);case 222:return t=this._view.getUint16(this._offset),this._offset+=2,this._map(t);case 223:return t=this._view.getUint32(this._offset),this._offset+=4,this._map(t)}throw new Error("Could not parse")};function Pg(i,e=0){var t=new er(i,e),n=t._parse();if(t._offset!==i.byteLength)throw new Error(i.byteLength-t._offset+" trailing bytes");return n}Yi.decode=Pg;var Ig=4294967296-1,Dg=17179869184-1;function Lg(i,e,t){for(var n=0,r=0,s=t.length;r<s;r++)n=t.charCodeAt(r),n<128?i.setUint8(e++,n):n<2048?(i.setUint8(e++,192|n>>6),i.setUint8(e++,128|n&63)):n<55296||n>=57344?(i.setUint8(e++,224|n>>12),i.setUint8(e++,128|n>>6&63),i.setUint8(e++,128|n&63)):(r++,n=65536+((n&1023)<<10|t.charCodeAt(r)&1023),i.setUint8(e++,240|n>>18),i.setUint8(e++,128|n>>12&63),i.setUint8(e++,128|n>>6&63),i.setUint8(e++,128|n&63))}function Ug(i){for(var e=0,t=0,n=0,r=i.length;n<r;n++)e=i.charCodeAt(n),e<128?t+=1:e<2048?t+=2:e<55296||e>=57344?t+=3:(n++,t+=4);return t}function Fi(i,e,t){var n=typeof t,r=0,s=0,a=0,o=0,h=0,l=0;if(n==="string"){if(h=Ug(t),h<32)i.push(h|160),l=1;else if(h<256)i.push(217,h),l=2;else if(h<65536)i.push(218,h>>8,h),l=3;else if(h<4294967296)i.push(219,h>>24,h>>16,h>>8,h),l=5;else throw new Error("String too long");return e.push({_str:t,_length:h,_offset:i.length}),l+h}if(n==="number")return Math.floor(t)!==t||!isFinite(t)?(i.push(203),e.push({_float:t,_length:8,_offset:i.length}),9):t>=0?t<128?(i.push(t),1):t<256?(i.push(204,t),2):t<65536?(i.push(205,t>>8,t),3):t<4294967296?(i.push(206,t>>24,t>>16,t>>8,t),5):(a=t/Math.pow(2,32)>>0,o=t>>>0,i.push(207,a>>24,a>>16,a>>8,a,o>>24,o>>16,o>>8,o),9):t>=-32?(i.push(t),1):t>=-128?(i.push(208,t),2):t>=-32768?(i.push(209,t>>8,t),3):t>=-2147483648?(i.push(210,t>>24,t>>16,t>>8,t),5):(a=Math.floor(t/Math.pow(2,32)),o=t>>>0,i.push(211,a>>24,a>>16,a>>8,a,o>>24,o>>16,o>>8,o),9);if(n==="object"){if(t===null)return i.push(192),1;if(Array.isArray(t)){if(h=t.length,h<16)i.push(h|144),l=1;else if(h<65536)i.push(220,h>>8,h),l=3;else if(h<4294967296)i.push(221,h>>24,h>>16,h>>8,h),l=5;else throw new Error("Array too large");for(r=0;r<h;r++)l+=Fi(i,e,t[r]);return l}if(t instanceof Date){var u=t.getTime(),d=Math.floor(u/1e3),f=(u-d*1e3)*1e6;return d>=0&&f>=0&&d<=Dg?f===0&&d<=Ig?(i.push(214,255,d>>24,d>>16,d>>8,d),6):(a=d/4294967296,o=d&4294967295,i.push(215,255,f>>22,f>>14,f>>6,a,o>>24,o>>16,o>>8,o),10):(a=Math.floor(d/4294967296),o=d>>>0,i.push(199,12,255,f>>24,f>>16,f>>8,f,a>>24,a>>16,a>>8,a,o>>24,o>>16,o>>8,o),15)}if(t instanceof ArrayBuffer){if(h=t.byteLength,h<256)i.push(196,h),l=2;else if(h<65536)i.push(197,h>>8,h),l=3;else if(h<4294967296)i.push(198,h>>24,h>>16,h>>8,h),l=5;else throw new Error("Buffer too large");return e.push({_bin:t,_length:h,_offset:i.length}),l+h}if(typeof t.toJSON=="function")return Fi(i,e,t.toJSON());var v=[],M="",T=Object.keys(t);for(r=0,s=T.length;r<s;r++)M=T[r],t[M]!==void 0&&typeof t[M]!="function"&&v.push(M);if(h=v.length,h<16)i.push(h|128),l=1;else if(h<65536)i.push(222,h>>8,h),l=3;else if(h<4294967296)i.push(223,h>>24,h>>16,h>>8,h),l=5;else throw new Error("Object too large");for(r=0;r<h;r++)M=v[r],l+=Fi(i,e,M),l+=Fi(i,e,t[M]);return l}if(n==="boolean")return i.push(t?195:194),1;if(n==="undefined")return i.push(192),1;if(typeof t.toJSON=="function")return Fi(i,e,t.toJSON());throw new Error("Could not encode")}function Ng(i){var e=[],t=[],n=Fi(e,t,i),r=new ArrayBuffer(n),s=new DataView(r),a=0,o=0,h=-1;t.length>0&&(h=t[0]._offset);for(var l,u=0,d=0,f=0,v=e.length;f<v;f++)if(s.setUint8(o+f,e[f]),f+1===h){if(l=t[a],u=l._length,d=o+h,l._bin)for(var M=new Uint8Array(l._bin),T=0;T<u;T++)s.setUint8(d+T,M[T]);else l._str?Lg(s,d,l._str):l._float!==void 0&&s.setFloat64(d,l._float);a++,o+=u,t[a]&&(h=t[a]._offset)}return r}Yi.encode=Ng;var Ss={},ys={},Og=function(){throw new Error("ws does not work in the browser. Browser clients must use the native WebSocket object")},Fg=wt&&wt.__importDefault||function(i){return i&&i.__esModule?i:{default:i}};Object.defineProperty(ys,"__esModule",{value:!0});ys.WebSocketTransport=void 0;const Bg=Fg(Og),fa=globalThis.WebSocket||Bg.default;class Wg{constructor(e){this.events=e}send(e){e instanceof ArrayBuffer?this.ws.send(e):Array.isArray(e)&&this.ws.send(new Uint8Array(e).buffer)}connect(e,t){try{this.ws=new fa(e,{headers:t,protocols:this.protocols})}catch{this.ws=new fa(e,this.protocols)}this.ws.binaryType="arraybuffer",this.ws.onopen=this.events.onopen,this.ws.onmessage=this.events.onmessage,this.ws.onclose=this.events.onclose,this.ws.onerror=this.events.onerror}close(e,t){this.ws.close(e,t)}get isOpen(){return this.ws.readyState===fa.OPEN}}ys.WebSocketTransport=Wg;Object.defineProperty(Ss,"__esModule",{value:!0});Ss.Connection=void 0;const Gg=ys;class Hg{constructor(){this.events={},this.transport=new Gg.WebSocketTransport(this.events)}send(e){this.transport.send(e)}connect(e,t){this.transport.connect(e,t)}close(e,t){this.transport.close(e,t)}get isOpen(){return this.transport.isOpen}}Ss.Connection=Hg;var Io={};(function(i){Object.defineProperty(i,"__esModule",{value:!0}),i.utf8Length=i.utf8Read=i.ErrorCode=i.Protocol=void 0,function(n){n[n.HANDSHAKE=9]="HANDSHAKE",n[n.JOIN_ROOM=10]="JOIN_ROOM",n[n.ERROR=11]="ERROR",n[n.LEAVE_ROOM=12]="LEAVE_ROOM",n[n.ROOM_DATA=13]="ROOM_DATA",n[n.ROOM_STATE=14]="ROOM_STATE",n[n.ROOM_STATE_PATCH=15]="ROOM_STATE_PATCH",n[n.ROOM_DATA_SCHEMA=16]="ROOM_DATA_SCHEMA",n[n.ROOM_DATA_BYTES=17]="ROOM_DATA_BYTES"}(i.Protocol||(i.Protocol={})),function(n){n[n.MATCHMAKE_NO_HANDLER=4210]="MATCHMAKE_NO_HANDLER",n[n.MATCHMAKE_INVALID_CRITERIA=4211]="MATCHMAKE_INVALID_CRITERIA",n[n.MATCHMAKE_INVALID_ROOM_ID=4212]="MATCHMAKE_INVALID_ROOM_ID",n[n.MATCHMAKE_UNHANDLED=4213]="MATCHMAKE_UNHANDLED",n[n.MATCHMAKE_EXPIRED=4214]="MATCHMAKE_EXPIRED",n[n.AUTH_FAILED=4215]="AUTH_FAILED",n[n.APPLICATION_ERROR=4216]="APPLICATION_ERROR"}(i.ErrorCode||(i.ErrorCode={}));function e(n,r){const s=n[r++];for(var a="",o=0,h=r,l=r+s;h<l;h++){var u=n[h];if(!(u&128)){a+=String.fromCharCode(u);continue}if((u&224)===192){a+=String.fromCharCode((u&31)<<6|n[++h]&63);continue}if((u&240)===224){a+=String.fromCharCode((u&15)<<12|(n[++h]&63)<<6|(n[++h]&63)<<0);continue}if((u&248)===240){o=(u&7)<<18|(n[++h]&63)<<12|(n[++h]&63)<<6|(n[++h]&63)<<0,o>=65536?(o-=65536,a+=String.fromCharCode((o>>>10)+55296,(o&1023)+56320)):a+=String.fromCharCode(o);continue}throw new Error("Invalid byte "+u.toString(16))}return a}i.utf8Read=e;function t(n=""){let r=0,s=0;for(let a=0,o=n.length;a<o;a++)r=n.charCodeAt(a),r<128?s+=1:r<2048?s+=2:r<55296||r>=57344?s+=3:(a++,s+=4);return s+1}i.utf8Length=t})(Io);var _i={};Object.defineProperty(_i,"__esModule",{value:!0});_i.getSerializer=_i.registerSerializer=void 0;const Ll={};function zg(i,e){Ll[i]=e}_i.registerSerializer=zg;function kg(i){const e=Ll[i];if(!e)throw new Error("missing serializer: "+i);return e}_i.getSerializer=kg;var Rr={};Object.defineProperty(Rr,"__esModule",{value:!0});Rr.createNanoEvents=void 0;const Vg=()=>({emit(i,...e){let t=this.events[i]||[];for(let n=0,r=t.length;n<r;n++)t[n](...e)},events:{},on(i,e){var t;return!((t=this.events[i])===null||t===void 0)&&t.push(e)||(this.events[i]=[e]),()=>{var n;this.events[i]=(n=this.events[i])===null||n===void 0?void 0:n.filter(r=>e!==r)}}});Rr.createNanoEvents=Vg;var qi={};Object.defineProperty(qi,"__esModule",{value:!0});qi.createSignal=qi.EventEmitter=void 0;class Ul{constructor(){this.handlers=[]}register(e,t=!1){return this.handlers.push(e),this}invoke(...e){this.handlers.forEach(t=>t.apply(this,e))}invokeAsync(...e){return Promise.all(this.handlers.map(t=>t.apply(this,e)))}remove(e){const t=this.handlers.indexOf(e);this.handlers[t]=this.handlers[this.handlers.length-1],this.handlers.pop()}clear(){this.handlers=[]}}qi.EventEmitter=Ul;function Xg(){const i=new Ul;function e(t){return i.register(t,this===null)}return e.once=t=>{const n=function(...r){t.apply(this,r),i.remove(n)};i.register(n)},e.remove=t=>i.remove(t),e.invoke=(...t)=>i.invoke(...t),e.invokeAsync=(...t)=>i.invokeAsync(...t),e.clear=()=>i.clear(),e}qi.createSignal=Xg;var co={exports:{}};(function(i,e){(function(t,n){n(e)})(wt,function(t){var n=function(m,c){return n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(p,E){p.__proto__=E}||function(p,E){for(var G in E)Object.prototype.hasOwnProperty.call(E,G)&&(p[G]=E[G])},n(m,c)};function r(m,c){if(typeof c!="function"&&c!==null)throw new TypeError("Class extends value "+String(c)+" is not a constructor or null");n(m,c);function p(){this.constructor=m}m.prototype=c===null?Object.create(c):(p.prototype=c.prototype,new p)}function s(m,c,p,E){var G=arguments.length,ee=G<3?c:E,Pe;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")ee=Reflect.decorate(m,c,p,E);else for(var Ae=m.length-1;Ae>=0;Ae--)(Pe=m[Ae])&&(ee=(G<3?Pe(ee):G>3?Pe(c,p,ee):Pe(c,p))||ee);return G>3&&ee&&Object.defineProperty(c,p,ee),ee}function a(m,c,p){if(arguments.length===2)for(var E=0,G=c.length,ee;E<G;E++)(ee||!(E in c))&&(ee||(ee=Array.prototype.slice.call(c,0,E)),ee[E]=c[E]);return m.concat(ee||Array.prototype.slice.call(c))}typeof SuppressedError=="function"&&SuppressedError;var o=255,h=213;t.OPERATION=void 0,function(m){m[m.ADD=128]="ADD",m[m.REPLACE=0]="REPLACE",m[m.DELETE=64]="DELETE",m[m.DELETE_AND_ADD=192]="DELETE_AND_ADD",m[m.TOUCH=1]="TOUCH",m[m.CLEAR=10]="CLEAR"}(t.OPERATION||(t.OPERATION={}));var l=function(){function m(c,p,E){this.changed=!1,this.changes=new Map,this.allChanges=new Set,this.caches={},this.currentCustomOperation=0,this.ref=c,this.setParent(p,E)}return m.prototype.setParent=function(c,p,E){var G=this;if(this.indexes||(this.indexes=this.ref instanceof je?this.ref._definition.indexes:{}),this.parent=c,this.parentIndex=E,!!p)if(this.root=p,this.ref instanceof je){var ee=this.ref._definition;for(var Pe in ee.schema){var Ae=this.ref[Pe];if(Ae&&Ae.$changes){var Je=ee.indexes[Pe];Ae.$changes.setParent(this.ref,p,Je)}}}else typeof this.ref=="object"&&this.ref.forEach(function(Qe,Le){if(Qe instanceof je){var nt=Qe.$changes,Ue=G.ref.$changes.indexes[Le];nt.setParent(G.ref,G.root,Ue)}})},m.prototype.operation=function(c){this.changes.set(--this.currentCustomOperation,c)},m.prototype.change=function(c,p){p===void 0&&(p=t.OPERATION.ADD);var E=typeof c=="number"?c:this.indexes[c];this.assertValidIndex(E,c);var G=this.changes.get(E);(!G||G.op===t.OPERATION.DELETE||G.op===t.OPERATION.TOUCH)&&this.changes.set(E,{op:G&&G.op===t.OPERATION.DELETE?t.OPERATION.DELETE_AND_ADD:p,index:E}),this.allChanges.add(E),this.changed=!0,this.touchParents()},m.prototype.touch=function(c){var p=typeof c=="number"?c:this.indexes[c];this.assertValidIndex(p,c),this.changes.has(p)||this.changes.set(p,{op:t.OPERATION.TOUCH,index:p}),this.allChanges.add(p),this.touchParents()},m.prototype.touchParents=function(){this.parent&&this.parent.$changes.touch(this.parentIndex)},m.prototype.getType=function(c){if(this.ref._definition){var p=this.ref._definition;return p.schema[p.fieldsByIndex[c]]}else{var p=this.parent._definition,E=p.schema[p.fieldsByIndex[this.parentIndex]];return Object.values(E)[0]}},m.prototype.getChildrenFilter=function(){var c=this.parent._definition.childFilters;return c&&c[this.parentIndex]},m.prototype.getValue=function(c){return this.ref.getByIndex(c)},m.prototype.delete=function(c){var p=typeof c=="number"?c:this.indexes[c];if(p===void 0){console.warn("@colyseus/schema ".concat(this.ref.constructor.name,": trying to delete non-existing index: ").concat(c," (").concat(p,")"));return}var E=this.getValue(p);this.changes.set(p,{op:t.OPERATION.DELETE,index:p}),this.allChanges.delete(p),delete this.caches[p],E&&E.$changes&&(E.$changes.parent=void 0),this.changed=!0,this.touchParents()},m.prototype.discard=function(c,p){var E=this;c===void 0&&(c=!1),p===void 0&&(p=!1),this.ref instanceof je||this.changes.forEach(function(G){if(G.op===t.OPERATION.DELETE){var ee=E.ref.getIndex(G.index);delete E.indexes[ee]}}),this.changes.clear(),this.changed=c,p&&this.allChanges.clear(),this.currentCustomOperation=0},m.prototype.discardAll=function(){var c=this;this.changes.forEach(function(p){var E=c.getValue(p.index);E&&E.$changes&&E.$changes.discardAll()}),this.discard()},m.prototype.cache=function(c,p){this.caches[c]=p},m.prototype.clone=function(){return new m(this.ref,this.parent,this.root)},m.prototype.ensureRefId=function(){this.refId===void 0&&(this.refId=this.root.getNextUniqueId())},m.prototype.assertValidIndex=function(c,p){if(c===void 0)throw new Error('ChangeTree: missing index for field "'.concat(p,'"'))},m}();function u(m,c,p,E){return m[c]||(m[c]=[]),m[c].push(p),E==null||E.forEach(function(G,ee){return p(G,ee)}),function(){return f(m[c],m[c].indexOf(p))}}function d(m){var c=this,p=typeof this.$changes.getType()!="string";this.$items.forEach(function(E,G){m.push({refId:c.$changes.refId,op:t.OPERATION.DELETE,field:G,value:void 0,previousValue:E}),p&&c.$changes.root.removeRef(E.$changes.refId)})}function f(m,c){if(c===-1||c>=m.length)return!1;for(var p=m.length-1,E=c;E<p;E++)m[E]=m[E+1];return m.length=p,!0}var v=function(m,c){var p=m.toString(),E=c.toString();return p<E?-1:p>E?1:0};function M(m){return m.$proxy=!0,m=new Proxy(m,{get:function(c,p){return typeof p!="symbol"&&!isNaN(p)?c.at(p):c[p]},set:function(c,p,E){if(typeof p!="symbol"&&!isNaN(p)){var G=Array.from(c.$items.keys()),ee=parseInt(G[p]||p);E==null?c.deleteAt(ee):c.setAt(ee,E)}else c[p]=E;return!0},deleteProperty:function(c,p){return typeof p=="number"?c.deleteAt(p):delete c[p],!0},has:function(c,p){return typeof p!="symbol"&&!isNaN(Number(p))?c.$items.has(Number(p)):Reflect.has(c,p)}}),m}var T=function(){function m(){for(var c=[],p=0;p<arguments.length;p++)c[p]=arguments[p];this.$changes=new l(this),this.$items=new Map,this.$indexes=new Map,this.$refId=0,this.push.apply(this,c)}return m.prototype.onAdd=function(c,p){return p===void 0&&(p=!0),u(this.$callbacks||(this.$callbacks={}),t.OPERATION.ADD,c,p?this.$items:void 0)},m.prototype.onRemove=function(c){return u(this.$callbacks||(this.$callbacks={}),t.OPERATION.DELETE,c)},m.prototype.onChange=function(c){return u(this.$callbacks||(this.$callbacks={}),t.OPERATION.REPLACE,c)},m.is=function(c){return Array.isArray(c)||c.array!==void 0},Object.defineProperty(m.prototype,"length",{get:function(){return this.$items.size},set:function(c){c===0?this.clear():this.splice(c,this.length-c)},enumerable:!1,configurable:!0}),m.prototype.push=function(){for(var c=this,p=[],E=0;E<arguments.length;E++)p[E]=arguments[E];var G;return p.forEach(function(ee){G=c.$refId++,c.setAt(G,ee)}),G},m.prototype.pop=function(){var c=Array.from(this.$indexes.values()).pop();if(c!==void 0){this.$changes.delete(c),this.$indexes.delete(c);var p=this.$items.get(c);return this.$items.delete(c),p}},m.prototype.at=function(c){if(c=Math.trunc(c)||0,c<0&&(c+=this.length),!(c<0||c>=this.length)){var p=Array.from(this.$items.keys())[c];return this.$items.get(p)}},m.prototype.setAt=function(c,p){var E,G;if(p==null){console.error("ArraySchema items cannot be null nor undefined; Use `deleteAt(index)` instead.");return}if(this.$items.get(c)!==p){p.$changes!==void 0&&p.$changes.setParent(this,this.$changes.root,c);var ee=(G=(E=this.$changes.indexes[c])===null||E===void 0?void 0:E.op)!==null&&G!==void 0?G:t.OPERATION.ADD;this.$changes.indexes[c]=c,this.$indexes.set(c,c),this.$items.set(c,p),this.$changes.change(c,ee)}},m.prototype.deleteAt=function(c){var p=Array.from(this.$items.keys())[c];return p===void 0?!1:this.$deleteAt(p)},m.prototype.$deleteAt=function(c){return this.$changes.delete(c),this.$indexes.delete(c),this.$items.delete(c)},m.prototype.clear=function(c){this.$changes.discard(!0,!0),this.$changes.indexes={},this.$indexes.clear(),c&&d.call(this,c),this.$items.clear(),this.$changes.operation({index:0,op:t.OPERATION.CLEAR}),this.$changes.touchParents()},m.prototype.concat=function(){for(var c,p=[],E=0;E<arguments.length;E++)p[E]=arguments[E];return new(m.bind.apply(m,a([void 0],(c=Array.from(this.$items.values())).concat.apply(c,p),!1)))},m.prototype.join=function(c){return Array.from(this.$items.values()).join(c)},m.prototype.reverse=function(){var c=this,p=Array.from(this.$items.keys()),E=Array.from(this.$items.values()).reverse();return E.forEach(function(G,ee){c.setAt(p[ee],G)}),this},m.prototype.shift=function(){var c=Array.from(this.$items.keys()),p=c.shift();if(p!==void 0){var E=this.$items.get(p);return this.$deleteAt(p),E}},m.prototype.slice=function(c,p){var E=new m;return E.push.apply(E,Array.from(this.$items.values()).slice(c,p)),E},m.prototype.sort=function(c){var p=this;c===void 0&&(c=v);var E=Array.from(this.$items.keys()),G=Array.from(this.$items.values()).sort(c);return G.forEach(function(ee,Pe){p.setAt(E[Pe],ee)}),this},m.prototype.splice=function(c,p){p===void 0&&(p=this.length-c);for(var E=[],G=2;G<arguments.length;G++)E[G-2]=arguments[G];for(var ee=Array.from(this.$items.keys()),Pe=[],Ae=c;Ae<c+p;Ae++)Pe.push(this.$items.get(ee[Ae])),this.$deleteAt(ee[Ae]);for(var Ae=0;Ae<E.length;Ae++)this.setAt(c+Ae,E[Ae]);return Pe},m.prototype.unshift=function(){for(var c=this,p=[],E=0;E<arguments.length;E++)p[E]=arguments[E];var G=this.length,ee=p.length,Pe=Array.from(this.$items.values());return p.forEach(function(Ae,Je){c.setAt(Je,Ae)}),Pe.forEach(function(Ae,Je){c.setAt(ee+Je,Ae)}),G+ee},m.prototype.indexOf=function(c,p){return Array.from(this.$items.values()).indexOf(c,p)},m.prototype.lastIndexOf=function(c,p){return p===void 0&&(p=this.length-1),Array.from(this.$items.values()).lastIndexOf(c,p)},m.prototype.every=function(c,p){return Array.from(this.$items.values()).every(c,p)},m.prototype.some=function(c,p){return Array.from(this.$items.values()).some(c,p)},m.prototype.forEach=function(c,p){Array.from(this.$items.values()).forEach(c,p)},m.prototype.map=function(c,p){return Array.from(this.$items.values()).map(c,p)},m.prototype.filter=function(c,p){return Array.from(this.$items.values()).filter(c,p)},m.prototype.reduce=function(c,p){return Array.prototype.reduce.apply(Array.from(this.$items.values()),arguments)},m.prototype.reduceRight=function(c,p){return Array.prototype.reduceRight.apply(Array.from(this.$items.values()),arguments)},m.prototype.find=function(c,p){return Array.from(this.$items.values()).find(c,p)},m.prototype.findIndex=function(c,p){return Array.from(this.$items.values()).findIndex(c,p)},m.prototype.fill=function(c,p,E){throw new Error("ArraySchema#fill() not implemented")},m.prototype.copyWithin=function(c,p,E){throw new Error("ArraySchema#copyWithin() not implemented")},m.prototype.toString=function(){return this.$items.toString()},m.prototype.toLocaleString=function(){return this.$items.toLocaleString()},m.prototype[Symbol.iterator]=function(){return Array.from(this.$items.values())[Symbol.iterator]()},Object.defineProperty(m,Symbol.species,{get:function(){return m},enumerable:!1,configurable:!0}),m.prototype.entries=function(){return this.$items.entries()},m.prototype.keys=function(){return this.$items.keys()},m.prototype.values=function(){return this.$items.values()},m.prototype.includes=function(c,p){return Array.from(this.$items.values()).includes(c,p)},m.prototype.flatMap=function(c,p){throw new Error("ArraySchema#flatMap() is not supported.")},m.prototype.flat=function(c){throw new Error("ArraySchema#flat() is not supported.")},m.prototype.findLast=function(){var c=Array.from(this.$items.values());return c.findLast.apply(c,arguments)},m.prototype.findLastIndex=function(){var c=Array.from(this.$items.values());return c.findLastIndex.apply(c,arguments)},m.prototype.with=function(c,p){var E=Array.from(this.$items.values());return E[c]=p,new(m.bind.apply(m,a([void 0],E,!1)))},m.prototype.toReversed=function(){return Array.from(this.$items.values()).reverse()},m.prototype.toSorted=function(c){return Array.from(this.$items.values()).sort(c)},m.prototype.toSpliced=function(c,p){var E=Array.from(this.$items.values());return E.toSpliced.apply(E,arguments)},m.prototype.setIndex=function(c,p){this.$indexes.set(c,p)},m.prototype.getIndex=function(c){return this.$indexes.get(c)},m.prototype.getByIndex=function(c){return this.$items.get(this.$indexes.get(c))},m.prototype.deleteByIndex=function(c){var p=this.$indexes.get(c);this.$items.delete(p),this.$indexes.delete(c)},m.prototype.toArray=function(){return Array.from(this.$items.values())},m.prototype.toJSON=function(){return this.toArray().map(function(c){return typeof c.toJSON=="function"?c.toJSON():c})},m.prototype.clone=function(c){var p;return c?p=new(m.bind.apply(m,a([void 0],Array.from(this.$items.values()),!1))):p=new(m.bind.apply(m,a([void 0],this.map(function(E){return E.$changes?E.clone():E}),!1))),p},m}();function _(m){return m.$proxy=!0,m=new Proxy(m,{get:function(c,p){return typeof p!="symbol"&&typeof c[p]>"u"?c.get(p):c[p]},set:function(c,p,E){return typeof p!="symbol"&&p.indexOf("$")===-1&&p!=="onAdd"&&p!=="onRemove"&&p!=="onChange"?c.set(p,E):c[p]=E,!0},deleteProperty:function(c,p){return c.delete(p),!0}}),m}var g=function(){function m(c){var p=this;if(this.$changes=new l(this),this.$items=new Map,this.$indexes=new Map,this.$refId=0,c)if(c instanceof Map||c instanceof m)c.forEach(function(G,ee){return p.set(ee,G)});else for(var E in c)this.set(E,c[E])}return m.prototype.onAdd=function(c,p){return p===void 0&&(p=!0),u(this.$callbacks||(this.$callbacks={}),t.OPERATION.ADD,c,p?this.$items:void 0)},m.prototype.onRemove=function(c){return u(this.$callbacks||(this.$callbacks={}),t.OPERATION.DELETE,c)},m.prototype.onChange=function(c){return u(this.$callbacks||(this.$callbacks={}),t.OPERATION.REPLACE,c)},m.is=function(c){return c.map!==void 0},m.prototype[Symbol.iterator]=function(){return this.$items[Symbol.iterator]()},Object.defineProperty(m.prototype,Symbol.toStringTag,{get:function(){return this.$items[Symbol.toStringTag]},enumerable:!1,configurable:!0}),Object.defineProperty(m,Symbol.species,{get:function(){return m},enumerable:!1,configurable:!0}),m.prototype.set=function(c,p){if(p==null)throw new Error("MapSchema#set('".concat(c,"', ").concat(p,"): trying to set ").concat(p," value on '").concat(c,"'."));c=c.toString();var E=typeof this.$changes.indexes[c]<"u",G=E?this.$changes.indexes[c]:this.$refId++,ee=E?t.OPERATION.REPLACE:t.OPERATION.ADD,Pe=p.$changes!==void 0;if(Pe&&p.$changes.setParent(this,this.$changes.root,G),!E)this.$changes.indexes[c]=G,this.$indexes.set(G,c);else{if(!Pe&&this.$items.get(c)===p)return;Pe&&this.$items.get(c)!==p&&(ee=t.OPERATION.ADD)}return this.$items.set(c,p),this.$changes.change(c,ee),this},m.prototype.get=function(c){return this.$items.get(c)},m.prototype.delete=function(c){return this.$changes.delete(c.toString()),this.$items.delete(c)},m.prototype.clear=function(c){this.$changes.discard(!0,!0),this.$changes.indexes={},this.$indexes.clear(),c&&d.call(this,c),this.$items.clear(),this.$changes.operation({index:0,op:t.OPERATION.CLEAR}),this.$changes.touchParents()},m.prototype.has=function(c){return this.$items.has(c)},m.prototype.forEach=function(c){this.$items.forEach(c)},m.prototype.entries=function(){return this.$items.entries()},m.prototype.keys=function(){return this.$items.keys()},m.prototype.values=function(){return this.$items.values()},Object.defineProperty(m.prototype,"size",{get:function(){return this.$items.size},enumerable:!1,configurable:!0}),m.prototype.setIndex=function(c,p){this.$indexes.set(c,p)},m.prototype.getIndex=function(c){return this.$indexes.get(c)},m.prototype.getByIndex=function(c){return this.$items.get(this.$indexes.get(c))},m.prototype.deleteByIndex=function(c){var p=this.$indexes.get(c);this.$items.delete(p),this.$indexes.delete(c)},m.prototype.toJSON=function(){var c={};return this.forEach(function(p,E){c[E]=typeof p.toJSON=="function"?p.toJSON():p}),c},m.prototype.clone=function(c){var p;return c?p=Object.assign(new m,this):(p=new m,this.forEach(function(E,G){E.$changes?p.set(G,E.clone()):p.set(G,E)})),p},m}(),A={};function C(m,c){A[m]=c}function R(m){return A[m]}var D=function(){function m(){this.indexes={},this.fieldsByIndex={},this.deprecated={},this.descriptors={}}return m.create=function(c){var p=new m;return p.schema=Object.assign({},c&&c.schema||{}),p.indexes=Object.assign({},c&&c.indexes||{}),p.fieldsByIndex=Object.assign({},c&&c.fieldsByIndex||{}),p.descriptors=Object.assign({},c&&c.descriptors||{}),p.deprecated=Object.assign({},c&&c.deprecated||{}),p},m.prototype.addField=function(c,p){var E=this.getNextFieldIndex();this.fieldsByIndex[E]=c,this.indexes[c]=E,this.schema[c]=Array.isArray(p)?{array:p[0]}:p},m.prototype.hasField=function(c){return this.indexes[c]!==void 0},m.prototype.addFilter=function(c,p){return this.filters||(this.filters={},this.indexesWithFilters=[]),this.filters[this.indexes[c]]=p,this.indexesWithFilters.push(this.indexes[c]),!0},m.prototype.addChildrenFilter=function(c,p){var E=this.indexes[c],G=this.schema[c];if(R(Object.keys(G)[0]))return this.childFilters||(this.childFilters={}),this.childFilters[E]=p,!0;console.warn("@filterChildren: field '".concat(c,"' can't have children. Ignoring filter."))},m.prototype.getChildrenFilter=function(c){return this.childFilters&&this.childFilters[this.indexes[c]]},m.prototype.getNextFieldIndex=function(){return Object.keys(this.schema||{}).length},m}();function P(m){return m._context&&m._context.useFilters}var U=function(){function m(){this.types={},this.schemas=new Map,this.useFilters=!1}return m.prototype.has=function(c){return this.schemas.has(c)},m.prototype.get=function(c){return this.types[c]},m.prototype.add=function(c,p){p===void 0&&(p=this.schemas.size),c._definition=D.create(c._definition),c._typeid=p,this.types[p]=c,this.schemas.set(c,p)},m.create=function(c){return c===void 0&&(c={}),function(p){return c.context||(c.context=new m),b(p,c)}},m}(),y=new U;function b(m,c){return c===void 0&&(c={}),function(p,E){var G=c.context||y,ee=p.constructor;if(ee._context=G,!m)throw new Error("".concat(ee.name,': @type() reference provided for "').concat(E,`" is undefined. Make sure you don't have any circular dependencies.`));G.has(ee)||G.add(ee);var Pe=ee._definition;if(Pe.addField(E,m),Pe.descriptors[E]){if(Pe.deprecated[E])return;try{throw new Error("@colyseus/schema: Duplicate '".concat(E,"' definition on '").concat(ee.name,`'.
Check @type() annotation`))}catch(Ue){var Ae=Ue.stack.split(`
`)[4].trim();throw new Error("".concat(Ue.message," ").concat(Ae))}}var Je=T.is(m),Qe=!Je&&g.is(m);if(typeof m!="string"&&!je.is(m)){var Le=Object.values(m)[0];typeof Le!="string"&&!G.has(Le)&&G.add(Le)}if(c.manual){Pe.descriptors[E]={enumerable:!0,configurable:!0,writable:!0};return}var nt="_".concat(E);Pe.descriptors[nt]={enumerable:!1,configurable:!1,writable:!0},Pe.descriptors[E]={get:function(){return this[nt]},set:function(Ue){Ue!==this[nt]&&(Ue!=null?(Je&&!(Ue instanceof T)&&(Ue=new(T.bind.apply(T,a([void 0],Ue,!1)))),Qe&&!(Ue instanceof g)&&(Ue=new g(Ue)),Ue.$proxy===void 0&&(Qe?Ue=_(Ue):Je&&(Ue=M(Ue))),this.$changes.change(E),Ue.$changes&&Ue.$changes.setParent(this,this.$changes.root,this._definition.indexes[E])):this[nt]!==void 0&&this.$changes.delete(E),this[nt]=Ue)},enumerable:!0,configurable:!0}}}function j(m){return function(c,p){var E=c.constructor,G=E._definition;G.addFilter(p,m)&&(E._context.useFilters=!0)}}function I(m){return function(c,p){var E=c.constructor,G=E._definition;G.addChildrenFilter(p,m)&&(E._context.useFilters=!0)}}function V(m){return m===void 0&&(m=!0),function(c,p){var E=c.constructor,G=E._definition;G.deprecated[p]=!0,m&&(G.descriptors[p]={get:function(){throw new Error("".concat(p," is deprecated."))},set:function(ee){},enumerable:!1,configurable:!0})}}function $(m,c,p){p===void 0&&(p={}),p.context||(p.context=m._context||p.context||y);for(var E in c)b(c[E],p)(m.prototype,E);return m}function q(m){for(var c=0,p=0,E=0,G=m.length;E<G;E++)c=m.charCodeAt(E),c<128?p+=1:c<2048?p+=2:c<55296||c>=57344?p+=3:(E++,p+=4);return p}function X(m,c,p){for(var E=0,G=0,ee=p.length;G<ee;G++)E=p.charCodeAt(G),E<128?m[c++]=E:E<2048?(m[c++]=192|E>>6,m[c++]=128|E&63):E<55296||E>=57344?(m[c++]=224|E>>12,m[c++]=128|E>>6&63,m[c++]=128|E&63):(G++,E=65536+((E&1023)<<10|p.charCodeAt(G)&1023),m[c++]=240|E>>18,m[c++]=128|E>>12&63,m[c++]=128|E>>6&63,m[c++]=128|E&63)}function Y(m,c){m.push(c&255)}function H(m,c){m.push(c&255)}function ae(m,c){m.push(c&255),m.push(c>>8&255)}function ne(m,c){m.push(c&255),m.push(c>>8&255)}function xe(m,c){m.push(c&255),m.push(c>>8&255),m.push(c>>16&255),m.push(c>>24&255)}function Se(m,c){var p=c>>24,E=c>>16,G=c>>8,ee=c;m.push(ee&255),m.push(G&255),m.push(E&255),m.push(p&255)}function ye(m,c){var p=Math.floor(c/Math.pow(2,32)),E=c>>>0;Se(m,E),Se(m,p)}function $e(m,c){var p=c/Math.pow(2,32)>>0,E=c>>>0;Se(m,E),Se(m,p)}function yt(m,c){Xe(m,c)}function xt(m,c){Oe(m,c)}var Q=new Int32Array(2),fe=new Float32Array(Q.buffer),de=new Float64Array(Q.buffer);function Xe(m,c){fe[0]=c,xe(m,Q[0])}function Oe(m,c){de[0]=c,xe(m,Q[0]),xe(m,Q[1])}function Ge(m,c){return H(m,c?1:0)}function At(m,c){c||(c="");var p=q(c),E=0;if(p<32)m.push(p|160),E=1;else if(p<256)m.push(217),H(m,p),E=2;else if(p<65536)m.push(218),ne(m,p),E=3;else if(p<4294967296)m.push(219),Se(m,p),E=5;else throw new Error("String too long");return X(m,m.length,c),E+p}function We(m,c){if(isNaN(c))return We(m,0);if(isFinite(c)){if(c!==(c|0))return m.push(203),Oe(m,c),9}else return We(m,c>0?Number.MAX_SAFE_INTEGER:-Number.MAX_SAFE_INTEGER);return c>=0?c<128?(H(m,c),1):c<256?(m.push(204),H(m,c),2):c<65536?(m.push(205),ne(m,c),3):c<4294967296?(m.push(206),Se(m,c),5):(m.push(207),$e(m,c),9):c>=-32?(m.push(224|c+32),1):c>=-128?(m.push(208),Y(m,c),2):c>=-32768?(m.push(209),ae(m,c),3):c>=-2147483648?(m.push(210),xe(m,c),5):(m.push(211),ye(m,c),9)}var ht=Object.freeze({__proto__:null,boolean:Ge,float32:yt,float64:xt,int16:ae,int32:xe,int64:ye,int8:Y,number:We,string:At,uint16:ne,uint32:Se,uint64:$e,uint8:H,utf8Write:X,writeFloat32:Xe,writeFloat64:Oe});function mt(m,c,p){for(var E="",G=0,ee=c,Pe=c+p;ee<Pe;ee++){var Ae=m[ee];if(!(Ae&128)){E+=String.fromCharCode(Ae);continue}if((Ae&224)===192){E+=String.fromCharCode((Ae&31)<<6|m[++ee]&63);continue}if((Ae&240)===224){E+=String.fromCharCode((Ae&15)<<12|(m[++ee]&63)<<6|(m[++ee]&63)<<0);continue}if((Ae&248)===240){G=(Ae&7)<<18|(m[++ee]&63)<<12|(m[++ee]&63)<<6|(m[++ee]&63)<<0,G>=65536?(G-=65536,E+=String.fromCharCode((G>>>10)+55296,(G&1023)+56320)):E+=String.fromCharCode(G);continue}console.error("Invalid byte "+Ae.toString(16))}return E}function qe(m,c){return Mt(m,c)<<24>>24}function Mt(m,c){return m[c.offset++]}function L(m,c){return Tt(m,c)<<16>>16}function Tt(m,c){return m[c.offset++]|m[c.offset++]<<8}function it(m,c){return m[c.offset++]|m[c.offset++]<<8|m[c.offset++]<<16|m[c.offset++]<<24}function ut(m,c){return it(m,c)>>>0}function Ce(m,c){return Te(m,c)}function w(m,c){return le(m,c)}function x(m,c){var p=ut(m,c),E=it(m,c)*Math.pow(2,32);return E+p}function W(m,c){var p=ut(m,c),E=ut(m,c)*Math.pow(2,32);return E+p}var J=new Int32Array(2),te=new Float32Array(J.buffer),K=new Float64Array(J.buffer);function Te(m,c){return J[0]=it(m,c),te[0]}function le(m,c){return J[0]=it(m,c),J[1]=it(m,c),K[0]}function Ne(m,c){return Mt(m,c)>0}function Fe(m,c){var p=m[c.offset++],E;p<192?E=p&31:p===217?E=Mt(m,c):p===218?E=Tt(m,c):p===219&&(E=ut(m,c));var G=mt(m,c.offset,E);return c.offset+=E,G}function re(m,c){var p=m[c.offset];return p<192&&p>160||p===217||p===218||p===219}function se(m,c){var p=m[c.offset++];if(p<128)return p;if(p===202)return Te(m,c);if(p===203)return le(m,c);if(p===204)return Mt(m,c);if(p===205)return Tt(m,c);if(p===206)return ut(m,c);if(p===207)return W(m,c);if(p===208)return qe(m,c);if(p===209)return L(m,c);if(p===210)return it(m,c);if(p===211)return x(m,c);if(p>223)return(255-p+1)*-1}function we(m,c){var p=m[c.offset];return p<128||p>=202&&p<=211}function Re(m,c){return m[c.offset]<160}function Me(m,c){return m[c.offset-1]===o&&(m[c.offset]<128||m[c.offset]>=202&&m[c.offset]<=211)}var Ze=Object.freeze({__proto__:null,arrayCheck:Re,boolean:Ne,float32:Ce,float64:w,int16:L,int32:it,int64:x,int8:qe,number:se,numberCheck:we,readFloat32:Te,readFloat64:le,string:Fe,stringCheck:re,switchStructureCheck:Me,uint16:Tt,uint32:ut,uint64:W,uint8:Mt}),N=function(){function m(c){var p=this;this.$changes=new l(this),this.$items=new Map,this.$indexes=new Map,this.$refId=0,c&&c.forEach(function(E){return p.add(E)})}return m.prototype.onAdd=function(c,p){return p===void 0&&(p=!0),u(this.$callbacks||(this.$callbacks=[]),t.OPERATION.ADD,c,p?this.$items:void 0)},m.prototype.onRemove=function(c){return u(this.$callbacks||(this.$callbacks=[]),t.OPERATION.DELETE,c)},m.prototype.onChange=function(c){return u(this.$callbacks||(this.$callbacks=[]),t.OPERATION.REPLACE,c)},m.is=function(c){return c.collection!==void 0},m.prototype.add=function(c){var p=this.$refId++,E=c.$changes!==void 0;return E&&c.$changes.setParent(this,this.$changes.root,p),this.$changes.indexes[p]=p,this.$indexes.set(p,p),this.$items.set(p,c),this.$changes.change(p),p},m.prototype.at=function(c){var p=Array.from(this.$items.keys())[c];return this.$items.get(p)},m.prototype.entries=function(){return this.$items.entries()},m.prototype.delete=function(c){for(var p=this.$items.entries(),E,G;(G=p.next())&&!G.done;)if(c===G.value[1]){E=G.value[0];break}return E===void 0?!1:(this.$changes.delete(E),this.$indexes.delete(E),this.$items.delete(E))},m.prototype.clear=function(c){this.$changes.discard(!0,!0),this.$changes.indexes={},this.$indexes.clear(),c&&d.call(this,c),this.$items.clear(),this.$changes.operation({index:0,op:t.OPERATION.CLEAR}),this.$changes.touchParents()},m.prototype.has=function(c){return Array.from(this.$items.values()).some(function(p){return p===c})},m.prototype.forEach=function(c){var p=this;this.$items.forEach(function(E,G,ee){return c(E,G,p)})},m.prototype.values=function(){return this.$items.values()},Object.defineProperty(m.prototype,"size",{get:function(){return this.$items.size},enumerable:!1,configurable:!0}),m.prototype.setIndex=function(c,p){this.$indexes.set(c,p)},m.prototype.getIndex=function(c){return this.$indexes.get(c)},m.prototype.getByIndex=function(c){return this.$items.get(this.$indexes.get(c))},m.prototype.deleteByIndex=function(c){var p=this.$indexes.get(c);this.$items.delete(p),this.$indexes.delete(c)},m.prototype.toArray=function(){return Array.from(this.$items.values())},m.prototype.toJSON=function(){var c=[];return this.forEach(function(p,E){c.push(typeof p.toJSON=="function"?p.toJSON():p)}),c},m.prototype.clone=function(c){var p;return c?p=Object.assign(new m,this):(p=new m,this.forEach(function(E){E.$changes?p.add(E.clone()):p.add(E)})),p},m}(),he=function(){function m(c){var p=this;this.$changes=new l(this),this.$items=new Map,this.$indexes=new Map,this.$refId=0,c&&c.forEach(function(E){return p.add(E)})}return m.prototype.onAdd=function(c,p){return p===void 0&&(p=!0),u(this.$callbacks||(this.$callbacks=[]),t.OPERATION.ADD,c,p?this.$items:void 0)},m.prototype.onRemove=function(c){return u(this.$callbacks||(this.$callbacks=[]),t.OPERATION.DELETE,c)},m.prototype.onChange=function(c){return u(this.$callbacks||(this.$callbacks=[]),t.OPERATION.REPLACE,c)},m.is=function(c){return c.set!==void 0},m.prototype.add=function(c){var p,E;if(this.has(c))return!1;var G=this.$refId++;c.$changes!==void 0&&c.$changes.setParent(this,this.$changes.root,G);var ee=(E=(p=this.$changes.indexes[G])===null||p===void 0?void 0:p.op)!==null&&E!==void 0?E:t.OPERATION.ADD;return this.$changes.indexes[G]=G,this.$indexes.set(G,G),this.$items.set(G,c),this.$changes.change(G,ee),G},m.prototype.entries=function(){return this.$items.entries()},m.prototype.delete=function(c){for(var p=this.$items.entries(),E,G;(G=p.next())&&!G.done;)if(c===G.value[1]){E=G.value[0];break}return E===void 0?!1:(this.$changes.delete(E),this.$indexes.delete(E),this.$items.delete(E))},m.prototype.clear=function(c){this.$changes.discard(!0,!0),this.$changes.indexes={},this.$indexes.clear(),c&&d.call(this,c),this.$items.clear(),this.$changes.operation({index:0,op:t.OPERATION.CLEAR}),this.$changes.touchParents()},m.prototype.has=function(c){for(var p=this.$items.values(),E=!1,G;(G=p.next())&&!G.done;)if(c===G.value){E=!0;break}return E},m.prototype.forEach=function(c){var p=this;this.$items.forEach(function(E,G,ee){return c(E,G,p)})},m.prototype.values=function(){return this.$items.values()},Object.defineProperty(m.prototype,"size",{get:function(){return this.$items.size},enumerable:!1,configurable:!0}),m.prototype.setIndex=function(c,p){this.$indexes.set(c,p)},m.prototype.getIndex=function(c){return this.$indexes.get(c)},m.prototype.getByIndex=function(c){return this.$items.get(this.$indexes.get(c))},m.prototype.deleteByIndex=function(c){var p=this.$indexes.get(c);this.$items.delete(p),this.$indexes.delete(c)},m.prototype.toArray=function(){return Array.from(this.$items.values())},m.prototype.toJSON=function(){var c=[];return this.forEach(function(p,E){c.push(typeof p.toJSON=="function"?p.toJSON():p)}),c},m.prototype.clone=function(c){var p;return c?p=Object.assign(new m,this):(p=new m,this.forEach(function(E){E.$changes?p.add(E.clone()):p.add(E)})),p},m}(),oe=function(){function m(){this.refIds=new WeakSet,this.containerIndexes=new WeakMap}return m.prototype.addRefId=function(c){this.refIds.has(c)||(this.refIds.add(c),this.containerIndexes.set(c,new Set))},m.get=function(c){return c.$filterState===void 0&&(c.$filterState=new m),c.$filterState},m}(),Ee=function(){function m(){this.refs=new Map,this.refCounts={},this.deletedRefs=new Set,this.nextUniqueId=0}return m.prototype.getNextUniqueId=function(){return this.nextUniqueId++},m.prototype.addRef=function(c,p,E){E===void 0&&(E=!0),this.refs.set(c,p),E&&(this.refCounts[c]=(this.refCounts[c]||0)+1)},m.prototype.removeRef=function(c){var p=this.refCounts[c];if(p===void 0){console.warn("trying to remove reference ".concat(c," that doesn't exist"));return}if(p===0){console.warn("trying to remove reference ".concat(c," with 0 refCount"));return}this.refCounts[c]=p-1,this.deletedRefs.add(c)},m.prototype.clearRefs=function(){this.refs.clear(),this.deletedRefs.clear(),this.refCounts={}},m.prototype.garbageCollectDeletedRefs=function(){var c=this;this.deletedRefs.forEach(function(p){if(!(c.refCounts[p]>0)){var E=c.refs.get(p);if(E instanceof je)for(var G in E._definition.schema)typeof E._definition.schema[G]!="string"&&E[G]&&E[G].$changes&&c.removeRef(E[G].$changes.refId);else{var ee=E.$changes.parent._definition,Pe=ee.schema[ee.fieldsByIndex[E.$changes.parentIndex]];typeof Object.values(Pe)[0]=="function"&&Array.from(E.values()).forEach(function(Ae){return c.removeRef(Ae.$changes.refId)})}c.refs.delete(p),delete c.refCounts[p]}}),this.deletedRefs.clear()},m}(),ie=function(m){r(c,m);function c(){return m!==null&&m.apply(this,arguments)||this}return c}(Error);function Z(m,c,p,E){var G,ee=!1;switch(c){case"number":case"int8":case"uint8":case"int16":case"uint16":case"int32":case"uint32":case"int64":case"uint64":case"float32":case"float64":G="number",isNaN(m)&&console.log('trying to encode "NaN" in '.concat(p.constructor.name,"#").concat(E));break;case"string":G="string",ee=!0;break;case"boolean":return}if(typeof m!==G&&(!ee||ee&&m!==null)){var Pe="'".concat(JSON.stringify(m),"'").concat(m&&m.constructor&&" (".concat(m.constructor.name,")")||"");throw new ie("a '".concat(G,"' was expected, but ").concat(Pe," was provided in ").concat(p.constructor.name,"#").concat(E))}}function be(m,c,p,E){if(!(m instanceof c))throw new ie("a '".concat(c.name,"' was expected, but '").concat(m.constructor.name,"' was provided in ").concat(p.constructor.name,"#").concat(E))}function ze(m,c,p,E,G){Z(p,m,E,G);var ee=ht[m];if(ee)ee(c,p);else throw new ie("a '".concat(m,"' was expected, but ").concat(p," was provided in ").concat(E.constructor.name,"#").concat(G))}function _t(m,c,p){return Ze[m](c,p)}var je=function(){function m(){for(var c=[],p=0;p<arguments.length;p++)c[p]=arguments[p];Object.defineProperties(this,{$changes:{value:new l(this,void 0,new Ee),enumerable:!1,writable:!0},$callbacks:{value:void 0,enumerable:!1,writable:!0}});var E=this._definition.descriptors;E&&Object.defineProperties(this,E),c[0]&&this.assign(c[0])}return m.onError=function(c){console.error(c)},m.is=function(c){return c._definition&&c._definition.schema!==void 0},m.prototype.onChange=function(c){return u(this.$callbacks||(this.$callbacks={}),t.OPERATION.REPLACE,c)},m.prototype.onRemove=function(c){return u(this.$callbacks||(this.$callbacks={}),t.OPERATION.DELETE,c)},m.prototype.assign=function(c){return Object.assign(this,c),this},Object.defineProperty(m.prototype,"_definition",{get:function(){return this.constructor._definition},enumerable:!1,configurable:!0}),m.prototype.setDirty=function(c,p){this.$changes.change(c,p)},m.prototype.listen=function(c,p,E){var G=this;return E===void 0&&(E=!0),this.$callbacks||(this.$callbacks={}),this.$callbacks[c]||(this.$callbacks[c]=[]),this.$callbacks[c].push(p),E&&this[c]!==void 0&&p(this[c],void 0),function(){return f(G.$callbacks[c],G.$callbacks[c].indexOf(p))}},m.prototype.decode=function(c,p,E){p===void 0&&(p={offset:0}),E===void 0&&(E=this);var G=[],ee=this.$changes.root,Pe=c.length,Ae=0;for(ee.refs.set(Ae,this);p.offset<Pe;){var Je=c[p.offset++];if(Je==o){Ae=se(c,p);var Qe=ee.refs.get(Ae);if(!Qe)throw new Error('"refId" not found: '.concat(Ae));E=Qe;continue}var Le=E.$changes,nt=E._definition!==void 0,Ue=nt?Je>>6<<6:Je;if(Ue===t.OPERATION.CLEAR){E.clear(G);continue}var et=nt?Je%(Ue||255):se(c,p),ke=nt?E._definition.fieldsByIndex[et]:"",Ye=Le.getType(et),ce=void 0,S=void 0,O=void 0;if(nt?S=E["_".concat(ke)]:(S=E.getByIndex(et),(Ue&t.OPERATION.ADD)===t.OPERATION.ADD?(O=E instanceof g?Fe(c,p):et,E.setIndex(et,O)):O=E.getIndex(et)),(Ue&t.OPERATION.DELETE)===t.OPERATION.DELETE&&(Ue!==t.OPERATION.DELETE_AND_ADD&&E.deleteByIndex(et),S&&S.$changes&&ee.removeRef(S.$changes.refId),ce=null),ke===void 0){console.warn("@colyseus/schema: definition mismatch");for(var z={offset:p.offset};p.offset<Pe&&!(Me(c,p)&&(z.offset=p.offset+1,ee.refs.has(se(c,z))));)p.offset++;continue}else if(Ue!==t.OPERATION.DELETE)if(m.is(Ye)){var F=se(c,p);if(ce=ee.refs.get(F),Ue!==t.OPERATION.REPLACE){var B=this.getSchemaType(c,p,Ye);ce||(ce=this.createTypeInstance(B),ce.$changes.refId=F,S&&(ce.$callbacks=S.$callbacks,S.$changes.refId&&F!==S.$changes.refId&&ee.removeRef(S.$changes.refId))),ee.addRef(F,ce,ce!==S)}}else if(typeof Ye=="string")ce=_t(Ye,c,p);else{var pe=R(Object.keys(Ye)[0]),_e=se(c,p),ue=ee.refs.has(_e)?S||ee.refs.get(_e):new pe.constructor;if(ce=ue.clone(!0),ce.$changes.refId=_e,S&&(ce.$callbacks=S.$callbacks,S.$changes.refId&&_e!==S.$changes.refId)){ee.removeRef(S.$changes.refId);for(var me=S.entries(),ge=void 0;(ge=me.next())&&!ge.done;){var He=ge.value,Be=He[0],Ie=He[1];G.push({refId:_e,op:t.OPERATION.DELETE,field:Be,value:void 0,previousValue:Ie})}}ee.addRef(_e,ce,ue!==S)}if(ce!=null){if(ce.$changes&&ce.$changes.setParent(Le.ref,Le.root,et),E instanceof m)E[ke]=ce;else if(E instanceof g){var Be=O;E.$items.set(Be,ce),E.$changes.allChanges.add(et)}else if(E instanceof T)E.setAt(et,ce);else if(E instanceof N){var at=E.add(ce);E.setIndex(et,at)}else if(E instanceof he){var at=E.add(ce);at!==!1&&E.setIndex(et,at)}}S!==ce&&G.push({refId:Ae,op:Ue,field:ke,dynamicIndex:O,value:ce,previousValue:S})}return this._triggerChanges(G),ee.garbageCollectDeletedRefs(),G},m.prototype.encode=function(c,p,E){c===void 0&&(c=!1),p===void 0&&(p=[]),E===void 0&&(E=!1);for(var G=this.$changes,ee=new WeakSet,Pe=[G],Ae=1,Je=0;Je<Ae;Je++){var Qe=Pe[Je],Le=Qe.ref,nt=Le instanceof m;Qe.ensureRefId(),ee.add(Qe),Qe!==G&&(Qe.changed||c)&&(H(p,o),We(p,Qe.refId));for(var Ue=c?Array.from(Qe.allChanges):Array.from(Qe.changes.values()),et=0,ke=Ue.length;et<ke;et++){var Ye=c?{op:t.OPERATION.ADD,index:Ue[et]}:Ue[et],ce=Ye.index,S=nt?Le._definition.fieldsByIndex&&Le._definition.fieldsByIndex[ce]:ce,O=p.length;if(Ye.op!==t.OPERATION.TOUCH)if(nt)H(p,ce|Ye.op);else{if(H(p,Ye.op),Ye.op===t.OPERATION.CLEAR)continue;We(p,ce)}if(!nt&&(Ye.op&t.OPERATION.ADD)==t.OPERATION.ADD&&Le instanceof g){var z=Qe.ref.$indexes.get(ce);At(p,z)}if(Ye.op!==t.OPERATION.DELETE){var F=Qe.getType(ce),B=Qe.getValue(ce);if(B&&B.$changes&&!ee.has(B.$changes)&&(Pe.push(B.$changes),B.$changes.ensureRefId(),Ae++),Ye.op!==t.OPERATION.TOUCH){if(m.is(F))be(B,F,Le,S),We(p,B.$changes.refId),(Ye.op&t.OPERATION.ADD)===t.OPERATION.ADD&&this.tryEncodeTypeId(p,F,B.constructor);else if(typeof F=="string")ze(F,p,B,Le,S);else{var pe=R(Object.keys(F)[0]);be(Le["_".concat(S)],pe.constructor,Le,S),We(p,B.$changes.refId)}E&&Qe.cache(ce,p.slice(O))}}}!c&&!E&&Qe.discard()}return p},m.prototype.encodeAll=function(c){return this.encode(!0,[],c)},m.prototype.applyFilters=function(c,p){var E,G;p===void 0&&(p=!1);for(var ee=this,Pe=new Set,Ae=oe.get(c),Je=[this.$changes],Qe=1,Le=[],nt=function(et){var ke=Je[et];if(Pe.has(ke.refId))return"continue";var Ye=ke.ref,ce=Ye instanceof m;H(Le,o),We(Le,ke.refId);var S=Ae.refIds.has(ke),O=p||!S;Ae.addRefId(ke);var z=Ae.containerIndexes.get(ke),F=O?Array.from(ke.allChanges):Array.from(ke.changes.values());if(!p&&ce&&Ye._definition.indexesWithFilters){var B=Ye._definition.indexesWithFilters;B.forEach(function(Et){!z.has(Et)&&ke.allChanges.has(Et)&&(O?F.push(Et):F.push({op:t.OPERATION.ADD,index:Et}))})}for(var pe=0,_e=F.length;pe<_e;pe++){var ue=O?{op:t.OPERATION.ADD,index:F[pe]}:F[pe];if(ue.op===t.OPERATION.CLEAR){H(Le,ue.op);continue}var me=ue.index;if(ue.op===t.OPERATION.DELETE){ce?H(Le,ue.op|me):(H(Le,ue.op),We(Le,me));continue}var ge=ke.getValue(me),He=ke.getType(me);if(ce){var Be=Ye._definition.filters&&Ye._definition.filters[me];if(Be&&!Be.call(Ye,c,ge,ee)){ge&&ge.$changes&&Pe.add(ge.$changes.refId);continue}}else{var Ie=ke.parent,Be=ke.getChildrenFilter();if(Be&&!Be.call(Ie,c,Ye.$indexes.get(me),ge,ee)){ge&&ge.$changes&&Pe.add(ge.$changes.refId);continue}}if(ge.$changes&&(Je.push(ge.$changes),Qe++),ue.op!==t.OPERATION.TOUCH)if(ue.op===t.OPERATION.ADD||ce)Le.push.apply(Le,(E=ke.caches[me])!==null&&E!==void 0?E:[]),z.add(me);else if(z.has(me))Le.push.apply(Le,(G=ke.caches[me])!==null&&G!==void 0?G:[]);else{if(z.add(me),H(Le,t.OPERATION.ADD),We(Le,me),Ye instanceof g){var at=ke.ref.$indexes.get(me);At(Le,at)}ge.$changes?We(Le,ge.$changes.refId):ht[He](Le,ge)}else if(ge.$changes&&!ce){if(H(Le,t.OPERATION.ADD),We(Le,me),Ye instanceof g){var at=ke.ref.$indexes.get(me);At(Le,at)}We(Le,ge.$changes.refId)}}},Ue=0;Ue<Qe;Ue++)nt(Ue);return Le},m.prototype.clone=function(){var c,p=new this.constructor,E=this._definition.schema;for(var G in E)typeof this[G]=="object"&&typeof((c=this[G])===null||c===void 0?void 0:c.clone)=="function"?p[G]=this[G].clone():p[G]=this[G];return p},m.prototype.toJSON=function(){var c=this._definition.schema,p=this._definition.deprecated,E={};for(var G in c)!p[G]&&this[G]!==null&&typeof this[G]<"u"&&(E[G]=typeof this[G].toJSON=="function"?this[G].toJSON():this["_".concat(G)]);return E},m.prototype.discardAllChanges=function(){this.$changes.discardAll()},m.prototype.getByIndex=function(c){return this[this._definition.fieldsByIndex[c]]},m.prototype.deleteByIndex=function(c){this[this._definition.fieldsByIndex[c]]=void 0},m.prototype.tryEncodeTypeId=function(c,p,E){p._typeid!==E._typeid&&(H(c,h),We(c,E._typeid))},m.prototype.getSchemaType=function(c,p,E){var G;return c[p.offset]===h&&(p.offset++,G=this.constructor._context.get(se(c,p))),G||E},m.prototype.createTypeInstance=function(c){var p=new c;return p.$changes.root=this.$changes.root,p},m.prototype._triggerChanges=function(c){for(var p,E,G,ee,Pe,Ae,Je,Qe,Le,nt=new Set,Ue=this.$changes.root.refs,et=function(Ye){var ce=c[Ye],S=ce.refId,O=Ue.get(S),z=O.$callbacks;if((ce.op&t.OPERATION.DELETE)===t.OPERATION.DELETE&&ce.previousValue instanceof m&&((E=(p=ce.previousValue.$callbacks)===null||p===void 0?void 0:p[t.OPERATION.DELETE])===null||E===void 0||E.forEach(function(F){return F()})),!z)return"continue";if(O instanceof m){if(!nt.has(S))try{(G=z==null?void 0:z[t.OPERATION.REPLACE])===null||G===void 0||G.forEach(function(F){return F()})}catch(F){m.onError(F)}try{z.hasOwnProperty(ce.field)&&((ee=z[ce.field])===null||ee===void 0||ee.forEach(function(F){return F(ce.value,ce.previousValue)}))}catch(F){m.onError(F)}}else ce.op===t.OPERATION.ADD&&ce.previousValue===void 0?(Pe=z[t.OPERATION.ADD])===null||Pe===void 0||Pe.forEach(function(F){var B;return F(ce.value,(B=ce.dynamicIndex)!==null&&B!==void 0?B:ce.field)}):ce.op===t.OPERATION.DELETE?ce.previousValue!==void 0&&((Ae=z[t.OPERATION.DELETE])===null||Ae===void 0||Ae.forEach(function(F){var B;return F(ce.previousValue,(B=ce.dynamicIndex)!==null&&B!==void 0?B:ce.field)})):ce.op===t.OPERATION.DELETE_AND_ADD&&(ce.previousValue!==void 0&&((Je=z[t.OPERATION.DELETE])===null||Je===void 0||Je.forEach(function(F){var B;return F(ce.previousValue,(B=ce.dynamicIndex)!==null&&B!==void 0?B:ce.field)})),(Qe=z[t.OPERATION.ADD])===null||Qe===void 0||Qe.forEach(function(F){var B;return F(ce.value,(B=ce.dynamicIndex)!==null&&B!==void 0?B:ce.field)})),ce.value!==ce.previousValue&&((Le=z[t.OPERATION.REPLACE])===null||Le===void 0||Le.forEach(function(F){var B;return F(ce.value,(B=ce.dynamicIndex)!==null&&B!==void 0?B:ce.field)}));nt.add(S)},ke=0;ke<c.length;ke++)et(ke)},m._definition=D.create(),m}();function on(m){for(var c=[m.$changes],p=1,E={},G=E,ee=function(Ae){var Je=c[Ae];Je.changes.forEach(function(Qe){var Le=Je.ref,nt=Qe.index,Ue=Le._definition?Le._definition.fieldsByIndex[nt]:Le.$indexes.get(nt);G[Ue]=Je.getValue(nt)})},Pe=0;Pe<p;Pe++)ee(Pe);return E}var Wt={context:new U},vi=function(m){r(c,m);function c(){return m!==null&&m.apply(this,arguments)||this}return s([b("string",Wt)],c.prototype,"name",void 0),s([b("string",Wt)],c.prototype,"type",void 0),s([b("number",Wt)],c.prototype,"referencedType",void 0),c}(je),Qn=function(m){r(c,m);function c(){var p=m!==null&&m.apply(this,arguments)||this;return p.fields=new T,p}return s([b("number",Wt)],c.prototype,"id",void 0),s([b([vi],Wt)],c.prototype,"fields",void 0),c}(je),Rs=function(m){r(c,m);function c(){var p=m!==null&&m.apply(this,arguments)||this;return p.types=new T,p}return c.encode=function(p){var E,G=p.constructor,ee=new c;ee.rootType=G._typeid;var Pe=function(Le,nt){for(var Ue in nt){var et=new vi;et.name=Ue;var ke=void 0;if(typeof nt[Ue]=="string")ke=nt[Ue];else{var Ye=nt[Ue],ce=void 0;je.is(Ye)?(ke="ref",ce=nt[Ue]):(ke=Object.keys(Ye)[0],typeof Ye[ke]=="string"?ke+=":"+Ye[ke]:ce=Ye[ke]),et.referencedType=ce?ce._typeid:-1}et.type=ke,Le.fields.push(et)}ee.types.push(Le)},Ae=(E=G._context)===null||E===void 0?void 0:E.types;for(var Je in Ae){var Qe=new Qn;Qe.id=Number(Je),Pe(Qe,Ae[Je]._definition.schema)}return ee.encodeAll()},c.decode=function(p,E){var G=new U,ee=new c;ee.decode(p,E);var Pe=ee.types.reduce(function(nt,Ue){var et=function(Ye){r(ce,Ye);function ce(){return Ye!==null&&Ye.apply(this,arguments)||this}return ce}(je),ke=Ue.id;return nt[ke]=et,G.add(et,ke),nt},{});ee.types.forEach(function(nt){var Ue=Pe[nt.id];nt.fields.forEach(function(et){var ke;if(et.referencedType!==void 0){var Ye=et.type,ce=Pe[et.referencedType];if(!ce){var S=et.type.split(":");Ye=S[0],ce=S[1]}Ye==="ref"?b(ce,{context:G})(Ue.prototype,et.name):b((ke={},ke[Ye]=ce,ke),{context:G})(Ue.prototype,et.name)}else b(et.type,{context:G})(Ue.prototype,et.name)})});var Ae=Pe[ee.rootType],Je=new Ae;for(var Qe in Ae._definition.schema){var Le=Ae._definition.schema[Qe];typeof Le!="string"&&(Je[Qe]=typeof Le=="function"?new Le:new(R(Object.keys(Le)[0])).constructor)}return Je},s([b([Qn],Wt)],c.prototype,"types",void 0),s([b("number",Wt)],c.prototype,"rootType",void 0),c}(je);C("map",{constructor:g}),C("array",{constructor:T}),C("set",{constructor:he}),C("collection",{constructor:N}),t.ArraySchema=T,t.CollectionSchema=N,t.Context=U,t.MapSchema=g,t.Reflection=Rs,t.ReflectionField=vi,t.ReflectionType=Qn,t.Schema=je,t.SchemaDefinition=D,t.SetSchema=he,t.decode=Ze,t.defineTypes=$,t.deprecated=V,t.dumpChanges=on,t.encode=ht,t.filter=j,t.filterChildren=I,t.hasFilter=P,t.registerType=C,t.type=b})})(co,co.exports);var Nl=co.exports,$g=wt&&wt.__createBinding||(Object.create?function(i,e,t,n){n===void 0&&(n=t);var r=Object.getOwnPropertyDescriptor(e,t);(!r||("get"in r?!e.__esModule:r.writable||r.configurable))&&(r={enumerable:!0,get:function(){return e[t]}}),Object.defineProperty(i,n,r)}:function(i,e,t,n){n===void 0&&(n=t),i[n]=e[t]}),Yg=wt&&wt.__setModuleDefault||(Object.create?function(i,e){Object.defineProperty(i,"default",{enumerable:!0,value:e})}:function(i,e){i.default=e}),qg=wt&&wt.__importStar||function(i){if(i&&i.__esModule)return i;var e={};if(i!=null)for(var t in i)t!=="default"&&Object.prototype.hasOwnProperty.call(i,t)&&$g(e,i,t);return Yg(e,i),e};Object.defineProperty(wr,"__esModule",{value:!0});wr.Room=void 0;const Yc=qg(Yi),Zg=Ss,Xt=Io,qc=_i,jg=Rr,ns=qi,tn=Nl,Zc=Ms;class Do{constructor(e,t){this.onStateChange=(0,ns.createSignal)(),this.onError=(0,ns.createSignal)(),this.onLeave=(0,ns.createSignal)(),this.onJoin=(0,ns.createSignal)(),this.hasJoined=!1,this.onMessageHandlers=(0,jg.createNanoEvents)(),this.roomId=null,this.name=e,t&&(this.serializer=new((0,qc.getSerializer)("schema")),this.rootSchema=t,this.serializer.state=new t),this.onError((n,r)=>{var s;return(s=console.warn)===null||s===void 0?void 0:s.call(console,`colyseus.js - onError => (${n}) ${r}`)}),this.onLeave(()=>this.removeAllListeners())}get id(){return this.roomId}connect(e,t,n=this,r){const s=new Zg.Connection;n.connection=s,s.events.onmessage=Do.prototype.onMessageCallback.bind(n),s.events.onclose=function(a){var o;if(!n.hasJoined){(o=console.warn)===null||o===void 0||o.call(console,`Room connection was closed unexpectedly (${a.code}): ${a.reason}`),n.onError.invoke(a.code,a.reason);return}a.code===Zc.CloseCode.DEVMODE_RESTART&&t?t():(n.onLeave.invoke(a.code,a.reason),n.destroy())},s.events.onerror=function(a){var o;(o=console.warn)===null||o===void 0||o.call(console,`Room, onError (${a.code}): ${a.reason}`),n.onError.invoke(a.code,a.reason)},s.connect(e,r)}leave(e=!0){return new Promise(t=>{this.onLeave(n=>t(n)),this.connection?e?this.connection.send([Xt.Protocol.LEAVE_ROOM]):this.connection.close():this.onLeave.invoke(Zc.CloseCode.CONSENTED)})}onMessage(e,t){return this.onMessageHandlers.on(this.getMessageHandlerKey(e),t)}send(e,t){const n=[Xt.Protocol.ROOM_DATA];typeof e=="string"?tn.encode.string(n,e):tn.encode.number(n,e);let r;if(t!==void 0){const s=Yc.encode(t);r=new Uint8Array(n.length+s.byteLength),r.set(new Uint8Array(n),0),r.set(new Uint8Array(s),n.length)}else r=new Uint8Array(n);this.connection.send(r.buffer)}sendBytes(e,t){const n=[Xt.Protocol.ROOM_DATA_BYTES];typeof e=="string"?tn.encode.string(n,e):tn.encode.number(n,e);let r;r=new Uint8Array(n.length+(t.byteLength||t.length)),r.set(new Uint8Array(n),0),r.set(new Uint8Array(t),n.length),this.connection.send(r.buffer)}get state(){return this.serializer.getState()}removeAllListeners(){this.onJoin.clear(),this.onStateChange.clear(),this.onError.clear(),this.onLeave.clear(),this.onMessageHandlers.events={}}onMessageCallback(e){const t=Array.from(new Uint8Array(e.data)),n=t[0];if(n===Xt.Protocol.JOIN_ROOM){let r=1;const s=(0,Xt.utf8Read)(t,r);if(r+=(0,Xt.utf8Length)(s),this.serializerId=(0,Xt.utf8Read)(t,r),r+=(0,Xt.utf8Length)(this.serializerId),!this.serializer){const a=(0,qc.getSerializer)(this.serializerId);this.serializer=new a}t.length>r&&this.serializer.handshake&&this.serializer.handshake(t,{offset:r}),this.reconnectionToken=`${this.roomId}:${s}`,this.hasJoined=!0,this.onJoin.invoke(),this.connection.send([Xt.Protocol.JOIN_ROOM])}else if(n===Xt.Protocol.ERROR){const r={offset:1},s=tn.decode.number(t,r),a=tn.decode.string(t,r);this.onError.invoke(s,a)}else if(n===Xt.Protocol.LEAVE_ROOM)this.leave();else if(n===Xt.Protocol.ROOM_DATA_SCHEMA){const r={offset:1},a=this.serializer.getState().constructor._context.get(tn.decode.number(t,r)),o=new a;o.decode(t,r),this.dispatchMessage(a,o)}else if(n===Xt.Protocol.ROOM_STATE)t.shift(),this.setState(t);else if(n===Xt.Protocol.ROOM_STATE_PATCH)t.shift(),this.patch(t);else if(n===Xt.Protocol.ROOM_DATA){const r={offset:1},s=tn.decode.stringCheck(t,r)?tn.decode.string(t,r):tn.decode.number(t,r),a=t.length>r.offset?Yc.decode(e.data,r.offset):void 0;this.dispatchMessage(s,a)}else if(n===Xt.Protocol.ROOM_DATA_BYTES){const r={offset:1},s=tn.decode.stringCheck(t,r)?tn.decode.string(t,r):tn.decode.number(t,r);this.dispatchMessage(s,new Uint8Array(t.slice(r.offset)))}}setState(e){this.serializer.setState(e),this.onStateChange.invoke(this.serializer.getState())}patch(e){this.serializer.patch(e),this.onStateChange.invoke(this.serializer.getState())}dispatchMessage(e,t){var n;const r=this.getMessageHandlerKey(e);this.onMessageHandlers.events[r]?this.onMessageHandlers.emit(r,t):this.onMessageHandlers.events["*"]?this.onMessageHandlers.emit("*",e,t):(n=console.warn)===null||n===void 0||n.call(console,`colyseus.js: onMessage() not registered for type '${e}'.`)}destroy(){this.serializer&&this.serializer.teardown()}getMessageHandlerKey(e){switch(typeof e){case"function":return`$${e._typeid}`;case"string":return e;case"number":return`i${e}`;default:throw new Error("invalid message type.")}}}wr.Room=Do;var Es={};function jc(i,e){e.headers=i.headers||{},e.statusMessage=i.statusText,e.statusCode=i.status,e.data=i.response}function pn(i,e,t){return new Promise(function(n,r){t=t||{};var s=new XMLHttpRequest,a,o,h,l=t.body,u=t.headers||{};t.timeout&&(s.timeout=t.timeout),s.ontimeout=s.onerror=function(d){d.timeout=d.type=="timeout",r(d)},s.open(i,e.href||e),s.onload=function(){for(h=s.getAllResponseHeaders().trim().split(/[\r\n]+/),jc(s,s);o=h.shift();)o=o.split(": "),s.headers[o.shift().toLowerCase()]=o.join(": ");if(o=s.headers["content-type"],o&&~o.indexOf("application/json"))try{s.data=JSON.parse(s.data,t.reviver)}catch(d){return jc(s,d),r(d)}(s.status>=400?r:n)(s)},typeof FormData<"u"&&l instanceof FormData||l&&typeof l=="object"&&(u["content-type"]="application/json",l=JSON.stringify(l)),s.withCredentials=!!t.withCredentials;for(a in u)s.setRequestHeader(a,u[a]);s.send(l)})}var Kg=pn.bind(pn,"GET"),Jg=pn.bind(pn,"POST"),Qg=pn.bind(pn,"PATCH"),e0=pn.bind(pn,"DELETE"),t0=pn.bind(pn,"PUT");const n0=Object.freeze(Object.defineProperty({__proto__:null,del:e0,get:Kg,patch:Qg,post:Jg,put:t0,send:pn},Symbol.toStringTag,{value:"Module"})),i0=Rg(n0);var r0=wt&&wt.__createBinding||(Object.create?function(i,e,t,n){n===void 0&&(n=t);var r=Object.getOwnPropertyDescriptor(e,t);(!r||("get"in r?!e.__esModule:r.writable||r.configurable))&&(r={enumerable:!0,get:function(){return e[t]}}),Object.defineProperty(i,n,r)}:function(i,e,t,n){n===void 0&&(n=t),i[n]=e[t]}),s0=wt&&wt.__setModuleDefault||(Object.create?function(i,e){Object.defineProperty(i,"default",{enumerable:!0,value:e})}:function(i,e){i.default=e}),a0=wt&&wt.__importStar||function(i){if(i&&i.__esModule)return i;var e={};if(i!=null)for(var t in i)t!=="default"&&Object.prototype.hasOwnProperty.call(i,t)&&r0(e,i,t);return s0(e,i),e};Object.defineProperty(Es,"__esModule",{value:!0});Es.HTTP=void 0;const o0=Ms,c0=a0(i0);class l0{constructor(e,t={}){this.client=e,this.headers=t}get(e,t={}){return this.request("get",e,t)}post(e,t={}){return this.request("post",e,t)}del(e,t={}){return this.request("del",e,t)}put(e,t={}){return this.request("put",e,t)}request(e,t,n={}){return c0[e](this.client.getHttpEndpoint(t),this.getOptions(n)).catch(r=>{var s;const a=r.statusCode,o=((s=r.data)===null||s===void 0?void 0:s.error)||r.statusMessage||r.message;throw!a&&!o?r:new o0.ServerError(a,o)})}getOptions(e){return e.headers=Object.assign({},this.headers,e.headers),this.authToken&&(e.headers.Authorization=`Bearer ${this.authToken}`),typeof cc<"u"&&cc.sys&&cc.sys.isNative||(e.withCredentials=!0),e}}Es.HTTP=l0;var Cr={},Kn={};Object.defineProperty(Kn,"__esModule",{value:!0});Kn.getItem=Kn.removeItem=Kn.setItem=void 0;let dr;function Lo(){if(!dr)try{dr=typeof cc<"u"&&cc.sys&&cc.sys.localStorage?cc.sys.localStorage:window.localStorage}catch{}return dr||(dr={cache:{},setItem:function(i,e){this.cache[i]=e},getItem:function(i){this.cache[i]},removeItem:function(i){delete this.cache[i]}}),dr}function h0(i,e){Lo().setItem(i,e)}Kn.setItem=h0;function u0(i){Lo().removeItem(i)}Kn.removeItem=u0;function f0(i,e){const t=Lo().getItem(i);typeof Promise>"u"||!(t instanceof Promise)?e(t):t.then(n=>e(n))}Kn.getItem=f0;var ci=wt&&wt.__awaiter||function(i,e,t,n){function r(s){return s instanceof t?s:new t(function(a){a(s)})}return new(t||(t=Promise))(function(s,a){function o(u){try{l(n.next(u))}catch(d){a(d)}}function h(u){try{l(n.throw(u))}catch(d){a(d)}}function l(u){u.done?s(u.value):r(u.value).then(o,h)}l((n=n.apply(i,e||[])).next())})},Oi=wt&&wt.__classPrivateFieldGet||function(i,e,t,n){if(t==="a"&&!n)throw new TypeError("Private accessor was defined without a getter");if(typeof e=="function"?i!==e||!n:!e.has(i))throw new TypeError("Cannot read private member from an object whose class did not declare it");return t==="m"?n:t==="a"?n.call(i):n?n.value:e.get(i)},pr=wt&&wt.__classPrivateFieldSet||function(i,e,t,n,r){if(n==="m")throw new TypeError("Private method is not writable");if(n==="a"&&!r)throw new TypeError("Private accessor was defined without a setter");if(typeof e=="function"?i!==e||!r:!e.has(i))throw new TypeError("Cannot write private member to an object whose class did not declare it");return n==="a"?r.call(i,t):r?r.value=t:e.set(i,t),t},cs,lo,Yn,ls;Object.defineProperty(Cr,"__esModule",{value:!0});Cr.Auth=void 0;const da=Kn,d0=Rr;class p0{constructor(e){this.http=e,this.settings={path:"/auth",key:"colyseus-auth-token"},cs.set(this,!1),lo.set(this,void 0),Yn.set(this,void 0),ls.set(this,(0,d0.createNanoEvents)()),(0,da.getItem)(this.settings.key,t=>this.token=t)}set token(e){this.http.authToken=e}get token(){return this.http.authToken}onChange(e){const t=Oi(this,ls,"f").on("change",e);return Oi(this,cs,"f")||pr(this,lo,new Promise((n,r)=>{this.getUserData().then(s=>{this.emitChange(Object.assign(Object.assign({},s),{token:this.token}))}).catch(s=>{this.emitChange({user:null,token:void 0})}).finally(()=>{n()})}),"f"),pr(this,cs,!0,"f"),t}getUserData(){return ci(this,void 0,void 0,function*(){if(this.token)return(yield this.http.get(`${this.settings.path}/userdata`)).data;throw new Error("missing auth.token")})}registerWithEmailAndPassword(e,t,n){return ci(this,void 0,void 0,function*(){const r=(yield this.http.post(`${this.settings.path}/register`,{body:{email:e,password:t,options:n}})).data;return this.emitChange(r),r})}signInWithEmailAndPassword(e,t){return ci(this,void 0,void 0,function*(){const n=(yield this.http.post(`${this.settings.path}/login`,{body:{email:e,password:t}})).data;return this.emitChange(n),n})}signInAnonymously(e){return ci(this,void 0,void 0,function*(){const t=(yield this.http.post(`${this.settings.path}/anonymous`,{body:{options:e}})).data;return this.emitChange(t),t})}sendPasswordResetEmail(e){return ci(this,void 0,void 0,function*(){return(yield this.http.post(`${this.settings.path}/forgot-password`,{body:{email:e}})).data})}signInWithProvider(e,t={}){return ci(this,void 0,void 0,function*(){return new Promise((n,r)=>{const s=t.width||480,a=t.height||768,o=this.token?`?token=${this.token}`:"",h=`Login with ${e[0].toUpperCase()+e.substring(1)}`,l=this.http.client.getHttpEndpoint(`${t.prefix||`${this.settings.path}/provider`}/${e}${o}`),u=screen.width/2-s/2,d=screen.height/2-a/2;pr(this,Yn,window.open(l,h,"toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width="+s+", height="+a+", top="+d+", left="+u),"f");const f=M=>{M.data.user===void 0&&M.data.token===void 0||(clearInterval(v),Oi(this,Yn,"f").close(),pr(this,Yn,void 0,"f"),window.removeEventListener("message",f),M.data.error!==void 0?r(M.data.error):(n(M.data),this.emitChange(M.data)))},v=setInterval(()=>{(!Oi(this,Yn,"f")||Oi(this,Yn,"f").closed)&&(pr(this,Yn,void 0,"f"),r("cancelled"),window.removeEventListener("message",f))},200);window.addEventListener("message",f)})})}signOut(){return ci(this,void 0,void 0,function*(){this.emitChange({user:null,token:null})})}emitChange(e){e.token!==void 0&&(this.token=e.token,e.token===null?(0,da.removeItem)(this.settings.key):(0,da.setItem)(this.settings.key,e.token)),Oi(this,ls,"f").emit("change",e)}}Cr.Auth=p0;cs=new WeakMap,lo=new WeakMap,Yn=new WeakMap,ls=new WeakMap;var Ts={};Object.defineProperty(Ts,"__esModule",{value:!0});Ts.discordURLBuilder=void 0;function m0(i){var e;const t=((e=window==null?void 0:window.location)===null||e===void 0?void 0:e.hostname)||"localhost",n=i.hostname.split("."),r=!i.hostname.includes("trycloudflare.com")&&!i.hostname.includes("discordsays.com")&&n.length>2?`/${n[0]}`:"";return i.pathname.startsWith("/.proxy")?`${i.protocol}//${t}${r}${i.pathname}${i.search}`:`${i.protocol}//${t}/.proxy/colyseus${r}${i.pathname}${i.search}`}Ts.discordURLBuilder=m0;var vn=wt&&wt.__awaiter||function(i,e,t,n){function r(s){return s instanceof t?s:new t(function(a){a(s)})}return new(t||(t=Promise))(function(s,a){function o(u){try{l(n.next(u))}catch(d){a(d)}}function h(u){try{l(n.throw(u))}catch(d){a(d)}}function l(u){u.done?s(u.value):r(u.value).then(o,h)}l((n=n.apply(i,e||[])).next())})},pa;Object.defineProperty($i,"__esModule",{value:!0});$i.Client=$i.MatchMakeError=void 0;const g0=Ms,_0=wr,v0=Es,x0=Cr,M0=Ts;class bs extends Error{constructor(e,t){super(e),this.code=t,Object.setPrototypeOf(this,bs.prototype)}}$i.MatchMakeError=bs;const Kc=typeof window<"u"&&typeof((pa=window==null?void 0:window.location)===null||pa===void 0?void 0:pa.hostname)<"u"?`${window.location.protocol.replace("http","ws")}//${window.location.hostname}${window.location.port&&`:${window.location.port}`}`:"ws://127.0.0.1:2567";class S0{constructor(e=Kc,t){var n,r;if(typeof e=="string"){const s=e.startsWith("/")?new URL(e,Kc):new URL(e),a=s.protocol==="https:"||s.protocol==="wss:",o=Number(s.port||(a?443:80));this.settings={hostname:s.hostname,pathname:s.pathname,port:o,secure:a}}else e.port===void 0&&(e.port=e.secure?443:80),e.pathname===void 0&&(e.pathname=""),this.settings=e;this.settings.pathname.endsWith("/")&&(this.settings.pathname=this.settings.pathname.slice(0,-1)),this.http=new v0.HTTP(this,(t==null?void 0:t.headers)||{}),this.auth=new x0.Auth(this.http),this.urlBuilder=t==null?void 0:t.urlBuilder,!this.urlBuilder&&typeof window<"u"&&(!((r=(n=window==null?void 0:window.location)===null||n===void 0?void 0:n.hostname)===null||r===void 0)&&r.includes("discordsays.com"))&&(this.urlBuilder=M0.discordURLBuilder,console.log("Colyseus SDK: Discord Embedded SDK detected. Using custom URL builder."))}joinOrCreate(e,t={},n){return vn(this,void 0,void 0,function*(){return yield this.createMatchMakeRequest("joinOrCreate",e,t,n)})}create(e,t={},n){return vn(this,void 0,void 0,function*(){return yield this.createMatchMakeRequest("create",e,t,n)})}join(e,t={},n){return vn(this,void 0,void 0,function*(){return yield this.createMatchMakeRequest("join",e,t,n)})}joinById(e,t={},n){return vn(this,void 0,void 0,function*(){return yield this.createMatchMakeRequest("joinById",e,t,n)})}reconnect(e,t){return vn(this,void 0,void 0,function*(){if(typeof e=="string"&&typeof t=="string")throw new Error("DEPRECATED: .reconnect() now only accepts 'reconnectionToken' as argument.\nYou can get this token from previously connected `room.reconnectionToken`");const[n,r]=e.split(":");if(!n||!r)throw new Error(`Invalid reconnection token format.
The format should be roomId:reconnectionToken`);return yield this.createMatchMakeRequest("reconnect",n,{reconnectionToken:r},t)})}getAvailableRooms(e=""){return vn(this,void 0,void 0,function*(){return(yield this.http.get(`matchmake/${e}`,{headers:{Accept:"application/json"}})).data})}consumeSeatReservation(e,t,n){return vn(this,void 0,void 0,function*(){const r=this.createRoom(e.room.name,t);r.roomId=e.room.roomId,r.sessionId=e.sessionId;const s={sessionId:r.sessionId};e.reconnectionToken&&(s.reconnectionToken=e.reconnectionToken);const a=n||r;return r.connect(this.buildEndpoint(e.room,s),e.devMode&&(()=>vn(this,void 0,void 0,function*(){console.info(`[Colyseus devMode]: ${String.fromCodePoint(128260)} Re-establishing connection with room id '${r.roomId}'...`);let o=0,h=8;const l=()=>vn(this,void 0,void 0,function*(){o++;try{yield this.consumeSeatReservation(e,t,a),console.info(`[Colyseus devMode]: ${String.fromCodePoint(9989)} Successfully re-established connection with room '${r.roomId}'`)}catch{o<h?(console.info(`[Colyseus devMode]: ${String.fromCodePoint(128260)} retrying... (${o} out of ${h})`),setTimeout(l,2e3)):console.info(`[Colyseus devMode]: ${String.fromCodePoint(10060)} Failed to reconnect. Is your server running? Please check server logs.`)}});setTimeout(l,2e3)})),a,this.http.headers),new Promise((o,h)=>{const l=(u,d)=>h(new g0.ServerError(u,d));a.onError.once(l),a.onJoin.once(()=>{a.onError.remove(l),o(a)})})})}createMatchMakeRequest(e,t,n={},r,s){return vn(this,void 0,void 0,function*(){const a=(yield this.http.post(`matchmake/${e}/${t}`,{headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify(n)})).data;if(a.error)throw new bs(a.error,a.code);return e==="reconnect"&&(a.reconnectionToken=n.reconnectionToken),yield this.consumeSeatReservation(a,r,s)})}createRoom(e,t){return new _0.Room(e,t)}buildEndpoint(e,t={}){const n=[];for(const a in t)t.hasOwnProperty(a)&&n.push(`${a}=${t[a]}`);let r=this.settings.secure?"wss://":"ws://";e.publicAddress?r+=`${e.publicAddress}`:r+=`${this.settings.hostname}${this.getEndpointPort()}${this.settings.pathname}`;const s=`${r}/${e.processId}/${e.roomId}?${n.join("&")}`;return this.urlBuilder?this.urlBuilder(new URL(s)):s}getHttpEndpoint(e=""){const t=e.startsWith("/")?e:`/${e}`,n=`${this.settings.secure?"https":"http"}://${this.settings.hostname}${this.getEndpointPort()}${this.settings.pathname}${t}`;return this.urlBuilder?this.urlBuilder(new URL(n)):n}getEndpointPort(){return this.settings.port!==80&&this.settings.port!==443?`:${this.settings.port}`:""}}$i.Client=S0;var As={};Object.defineProperty(As,"__esModule",{value:!0});As.SchemaSerializer=void 0;const Jc=Nl;class y0{setState(e){return this.state.decode(e)}getState(){return this.state}patch(e){return this.state.decode(e)}teardown(){var e,t;(t=(e=this.state)===null||e===void 0?void 0:e.$changes)===null||t===void 0||t.root.clearRefs()}handshake(e,t){this.state?new Jc.Reflection().decode(e,t):this.state=Jc.Reflection.decode(e,t)}}As.SchemaSerializer=y0;var ws={};Object.defineProperty(ws,"__esModule",{value:!0});ws.NoneSerializer=void 0;class E0{setState(e){}getState(){return null}patch(e){}teardown(){}handshake(e){}}ws.NoneSerializer=E0;(function(i){Object.defineProperty(i,"__esModule",{value:!0}),i.SchemaSerializer=i.registerSerializer=i.Auth=i.Room=i.ErrorCode=i.Protocol=i.MatchMakeError=i.Client=void 0;var e=$i;Object.defineProperty(i,"Client",{enumerable:!0,get:function(){return e.Client}}),Object.defineProperty(i,"MatchMakeError",{enumerable:!0,get:function(){return e.MatchMakeError}});var t=Io;Object.defineProperty(i,"Protocol",{enumerable:!0,get:function(){return t.Protocol}}),Object.defineProperty(i,"ErrorCode",{enumerable:!0,get:function(){return t.ErrorCode}});var n=wr;Object.defineProperty(i,"Room",{enumerable:!0,get:function(){return n.Room}});var r=Cr;Object.defineProperty(i,"Auth",{enumerable:!0,get:function(){return r.Auth}});const s=As;Object.defineProperty(i,"SchemaSerializer",{enumerable:!0,get:function(){return s.SchemaSerializer}});const a=ws,o=_i;Object.defineProperty(i,"registerSerializer",{enumerable:!0,get:function(){return o.registerSerializer}}),(0,o.registerSerializer)("schema",s.SchemaSerializer),(0,o.registerSerializer)("none",a.NoneSerializer)})(Dl);class T0{constructor(){this.threeManager=new ag,this.inputManager=new pg,this.inputManager.setPointerTarget(this.threeManager.renderer.domElement),this.worldGenerator=new ug(this.threeManager,{chunkSize:es}),this.worldGenerator.generateFromChunkedArray(Il,kc,es),this.pathfinder=new mg(this.worldGenerator),this.userId=this.generateUserId(),this.player=new ms(this.threeManager,this.inputManager,this.worldGenerator,-8,0,{isLocal:!0,userId:this.userId}),this.remotePlayers=new Map,this.wildlifeSystem=new zc(this.threeManager,this.worldGenerator,Vc),this.hoveredTile=null,this.activePath=[],this.lastFrameTime=performance.now(),this.connectToServer(),this.inputManager.onLeftClick(e=>{if(e===0&&this.hoveredTile&&this.player){const t=this.pathfinder.findPath(this.player.gridX,this.player.gridY,this.hoveredTile.gridX,this.hoveredTile.gridY);t&&t.length>0&&this.player.setPath(t)}}),this.animate=this.animate.bind(this),this.statusPill=document.getElementById("status-pill"),this.positionReadout=document.getElementById("position-readout"),this.zoneReadout=document.getElementById("zone-readout"),this.chunkReadout=document.getElementById("chunk-readout"),this.wildlifeReadout=document.getElementById("wildlife-readout"),this.playerCountReadout=document.getElementById("player-count-readout"),this.adminPanel=new wg({onApplyMap:e=>this.applyWorldMap(e,"custom"),onRandomizeMap:e=>this.applyWorldMap(e,"random"),onStartCombat:()=>this.startCombatScene()}),this.updateHud("Connecting"),requestAnimationFrame(this.animate)}async connectToServer(){try{console.log("[Game] Connecting to server...");const e=window.location.hostname;this.client=new Dl.Client(`ws://${e}:2567`),this.room=await this.client.joinOrCreate("world",{userId:this.userId,x:0,y:0,z:0}),console.log("[Game] Connected to room:",this.room.id),this.updateHud("Online"),this.setupNetworking(),this.combatScene=new $c({client:this.client,userId:this.userId,onExit:()=>this.updateHud("Online")})}catch(e){console.error("[Game] Failed to connect to server:",e),this.updateHud("Solo")}}setupNetworking(){this.room&&(this.room.state.players.onAdd=(e,t)=>{t===this.room.sessionId?this.player.applyAuthoritativeCenter(e.centerX,e.centerY,e.centerZ,e.tileX,e.tileY,e.tileZ):this.addRemotePlayer(e,t)},this.room.state.players.onRemove=(e,t)=>{this.removeRemotePlayer(t)},this.room.onMessage("world:chunk:init",e=>{this.serverChunkInfo=e,this.updateHud("Online")}),this.room.onMessage("world:chunk:entered",e=>{this.serverChunkInfo=e,this.updateHud("Online")}),this.room.onMessage("world:map:updated",e=>{this.adminPanel.setMessage(`World ${e.source} map active: ${e.width} x ${e.height}.`,"success")}),setInterval(()=>{if(this.room&&this.player){const e=this.player.getCenterPayload();this.room.send("player:move",{centerX:e.centerX,centerY:e.centerY,centerZ:e.centerZ})}},100))}addRemotePlayer(e,t){if(this.remotePlayers.has(t))return;const n=new ms(this.threeManager,null,this.worldGenerator,e.centerX,e.centerY,{isLocal:!1,userId:e.userId});n.setRemoteTarget(e.centerX,e.centerY,e.centerZ),this.remotePlayers.set(t,n)}removeRemotePlayer(e){const t=this.remotePlayers.get(e);t&&(t.destroy(),this.remotePlayers.delete(e))}syncRemotePlayersFromState(){var e,t;(t=(e=this.room)==null?void 0:e.state)!=null&&t.players&&this.room.state.players.forEach((n,r)=>{if(r===this.room.sessionId){(Math.abs(n.centerX-this.player.gridX)>.8||Math.abs(n.centerY-this.player.gridY)>.8)&&this.player.applyAuthoritativeCenter(n.centerX,n.centerY,n.centerZ,n.tileX,n.tileY,n.tileZ);return}this.remotePlayers.has(r)||this.addRemotePlayer(n,r),this.remotePlayers.get(r).setRemoteTarget(n.centerX,n.centerY,n.centerZ)})}applyWorldMap(e,t){this.hoveredTile&&(this.hoveredTile.clearHighlight(),this.hoveredTile=null),this.activePath=[],this.threeManager.renderPathLine([],this.worldGenerator),this.wildlifeSystem.destroy(),this.worldGenerator.generateFromChunkedArray(e,kc,es),this.repositionPlayerForCurrentWorld(),this.wildlifeSystem=new zc(this.threeManager,this.worldGenerator,Vc),this.room&&this.room.send("world:admin:map_updated",{source:t,width:e[0].length,height:e.length,chunkSize:es,rows:e}),this.updateHud()}repositionPlayerForCurrentWorld(){const e=this.worldGenerator.findNearestHabitat(-8,0,"meadow",48),t=e&&this.worldGenerator.isWalkable(e.x,e.y)?e:null,n=this.worldGenerator.findNearestWalkable(this.player.gridX,this.player.gridY,64),r=t||n||this.findFirstWalkableTile();r&&(this.player.gridX=r.x,this.player.gridY=r.y,this.player.gridZ=this.worldGenerator.getElevation(r.x,r.y),this.player.targetX=this.player.gridX,this.player.targetY=this.player.gridY,this.player.targetZ=this.player.gridZ,this.player.visualX=this.player.gridX,this.player.visualY=this.player.gridY,this.player.visualZ=this.player.gridZ,this.player.currentPath=[],this.player.syncModel())}findFirstWalkableTile(){for(const e of this.worldGenerator.surfaceMap.values())if(this.worldGenerator.isWalkable(e.x,e.y))return{x:e.x,y:e.y};return null}async startCombatScene(){this.combatScene||(this.combatScene=new $c({client:this.client,userId:this.userId,onExit:()=>this.updateHud(this.room?"Online":"Solo")})),await this.combatScene.enter("meadow-hare-demo")}generateUserId(){const e=localStorage.getItem("userId");if(e)return e;const t="user_"+Math.random().toString(36).substr(2,9);return localStorage.setItem("userId",t),t}animate(){requestAnimationFrame(this.animate);const e=performance.now(),t=Math.min((e-this.lastFrameTime)/1e3,.1);this.lastFrameTime=e;const n=this.inputManager.getWheelDelta();n!==0&&this.threeManager.handleZoom(n);const r=this.threeManager.getIntersectedTile(this.inputManager.mouseNDC);if(r!==this.hoveredTile)if(this.hoveredTile&&this.hoveredTile.clearHighlight(),this.hoveredTile=r,this.hoveredTile){const s=this.worldGenerator.isWalkable(this.hoveredTile.gridX,this.hoveredTile.gridY);this.hoveredTile.highlight(s?3116878:9381424),this.player&&s?(this.activePath=this.pathfinder.findPath(this.player.gridX,this.player.gridY,this.hoveredTile.gridX,this.hoveredTile.gridY),this.threeManager.renderPathLine(this.activePath,this.worldGenerator)):(this.activePath=[],this.threeManager.renderPathLine([],this.worldGenerator))}else this.activePath=null,this.threeManager.renderPathLine([],this.worldGenerator);if(this.player){this.player.update(t),this.syncRemotePlayersFromState();for(const a of this.remotePlayers.values())a.update(t);this.wildlifeSystem.update(t);const s=this.player.group.position;this.threeManager.updateCamera(s),this.updateHud()}this.threeManager.render()}updateHud(e){var o,h,l,u;if(e&&this.statusPill&&(this.statusPill.textContent=e,this.statusPill.dataset.status=e.toLowerCase()),!this.player)return;const t=Math.round(this.player.gridX),n=Math.round(this.player.gridY),r=this.worldGenerator.getSurfaceAt(t,n),s=this.worldGenerator.getChunkKeyForTile(t,n),a=this.worldGenerator.getLoadedChunkSummary().length;this.positionReadout&&(this.positionReadout.textContent=`${t}, ${n}, ${this.player.gridZ}`),this.zoneReadout&&(this.zoneReadout.textContent=((o=r==null?void 0:r.definition)==null?void 0:o.label)||"Unknown"),this.chunkReadout&&(this.chunkReadout.textContent=`${s} / ${a}`),this.wildlifeReadout&&(this.wildlifeReadout.textContent=`${this.wildlifeSystem.wildlife.length}`),this.playerCountReadout&&(this.playerCountReadout.textContent=`${((u=(l=(h=this.room)==null?void 0:h.state)==null?void 0:l.players)==null?void 0:u.size)||1}`)}}window.addEventListener("DOMContentLoaded",()=>{new T0,console.log("[Main] Game initialized with Three.js")});
