var hh=Object.defineProperty;var uh=(i,e,t)=>e in i?hh(i,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):i[e]=t;var hn=(i,e,t)=>uh(i,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function t(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(r){if(r.ep)return;r.ep=!0;const s=t(r);fetch(r.href,s)}})();/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Ia="183",fh=0,el=1,dh=2,wr=1,ph=2,Tr=3,ui=0,ln=1,_n=2,qn=0,Zi=1,Ms=2,tl=3,nl=4,mh=5,Ei=100,gh=101,_h=102,vh=103,xh=104,Mh=200,Sh=201,yh=202,Eh=203,Oo=204,No=205,Th=206,bh=207,wh=208,Ah=209,Rh=210,Ch=211,Ph=212,Ih=213,Dh=214,Fo=0,Bo=1,ko=2,Dn=3,zo=4,Ho=5,Ar=6,Vo=7,Sc=0,Lh=1,Uh=2,On=0,yc=1,Ec=2,Tc=3,Da=4,bc=5,wc=6,Ac=7,Rc=300,Ri=301,Qi=302,$s=303,Ys=304,Ds=306,bi=1e3,Yn=1001,Go=1002,jt=1003,Oh=1004,kr=1005,Xt=1006,qs=1007,wi=1008,pn=1009,Cc=1010,Pc=1011,Rr=1012,La=1013,Bn=1014,Ln=1015,Kn=1016,Ua=1017,Oa=1018,Cr=1020,Ic=35902,Dc=35899,Lc=1021,Uc=1022,Tn=1023,Zn=1026,Ai=1027,Oc=1028,Na=1029,er=1030,Fa=1031,Ba=1033,ds=33776,ps=33777,ms=33778,gs=33779,Wo=35840,Xo=35841,$o=35842,Yo=35843,qo=36196,jo=37492,Ko=37496,Zo=37488,Jo=37489,Qo=37490,ea=37491,ta=37808,na=37809,ia=37810,ra=37811,sa=37812,oa=37813,aa=37814,la=37815,ca=37816,ha=37817,ua=37818,fa=37819,da=37820,pa=37821,ma=36492,ga=36494,_a=36495,va=36283,xa=36284,Ma=36285,Sa=36286,Nh=3200,Nc=0,Fh=1,ai="",en="srgb",tr="srgb-linear",Ss="linear",Et="srgb",Ui=7680,il=519,Bh=512,kh=513,zh=514,ka=515,Hh=516,Vh=517,za=518,Gh=519,rl=35044,sl="300 es",Un=2e3,Pr=2001;function Wh(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function ys(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Xh(){const i=ys("canvas");return i.style.display="block",i}const ol={};function al(...i){const e="THREE."+i.shift();console.log(e,...i)}function Fc(i){const e=i[0];if(typeof e=="string"&&e.startsWith("TSL:")){const t=i[1];t&&t.isStackTrace?i[0]+=" "+t.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function je(...i){i=Fc(i);const e="THREE."+i.shift();{const t=i[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...i)}}function vt(...i){i=Fc(i);const e="THREE."+i.shift();{const t=i[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...i)}}function Es(...i){const e=i.join(" ");e in ol||(ol[e]=!0,je(...i))}function $h(i,e,t){return new Promise(function(n,r){function s(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:r();break;case i.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:n()}}setTimeout(s,t)})}const Yh={[Fo]:Bo,[ko]:Ar,[zo]:Vo,[Dn]:Ho,[Bo]:Fo,[Ar]:ko,[Vo]:zo,[Ho]:Dn};class or{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){const n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){const n=this._listeners;if(n===void 0)return;const r=n[e];if(r!==void 0){const s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const n=t[e.type];if(n!==void 0){e.target=this;const r=n.slice(0);for(let s=0,o=r.length;s<o;s++)r[s].call(this,e);e.target=null}}}const Zt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],js=Math.PI/180,ya=180/Math.PI;function Lr(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Zt[i&255]+Zt[i>>8&255]+Zt[i>>16&255]+Zt[i>>24&255]+"-"+Zt[e&255]+Zt[e>>8&255]+"-"+Zt[e>>16&15|64]+Zt[e>>24&255]+"-"+Zt[t&63|128]+Zt[t>>8&255]+"-"+Zt[t>>16&255]+Zt[t>>24&255]+Zt[n&255]+Zt[n>>8&255]+Zt[n>>16&255]+Zt[n>>24&255]).toLowerCase()}function dt(i,e,t){return Math.max(e,Math.min(t,i))}function qh(i,e){return(i%e+e)%e}function Ks(i,e,t){return(1-t)*i+t*e}function ur(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function sn(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}class ht{constructor(e=0,t=0){ht.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=dt(this.x,e.x,t.x),this.y=dt(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=dt(this.x,e,t),this.y=dt(this.y,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(dt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(dt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),r=Math.sin(t),s=this.x-e.x,o=this.y-e.y;return this.x=s*n-o*r+e.x,this.y=s*r+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class ar{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,s,o,a){let l=n[r+0],c=n[r+1],u=n[r+2],d=n[r+3],f=s[o+0],_=s[o+1],x=s[o+2],y=s[o+3];if(d!==y||l!==f||c!==_||u!==x){let v=l*f+c*_+u*x+d*y;v<0&&(f=-f,_=-_,x=-x,y=-y,v=-v);let p=1-a;if(v<.9995){const b=Math.acos(v),C=Math.sin(b);p=Math.sin(p*b)/C,a=Math.sin(a*b)/C,l=l*p+f*a,c=c*p+_*a,u=u*p+x*a,d=d*p+y*a}else{l=l*p+f*a,c=c*p+_*a,u=u*p+x*a,d=d*p+y*a;const b=1/Math.sqrt(l*l+c*c+u*u+d*d);l*=b,c*=b,u*=b,d*=b}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=d}static multiplyQuaternionsFlat(e,t,n,r,s,o){const a=n[r],l=n[r+1],c=n[r+2],u=n[r+3],d=s[o],f=s[o+1],_=s[o+2],x=s[o+3];return e[t]=a*x+u*d+l*_-c*f,e[t+1]=l*x+u*f+c*d-a*_,e[t+2]=c*x+u*_+a*f-l*d,e[t+3]=u*x-a*d-l*f-c*_,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,r=e._y,s=e._z,o=e._order,a=Math.cos,l=Math.sin,c=a(n/2),u=a(r/2),d=a(s/2),f=l(n/2),_=l(r/2),x=l(s/2);switch(o){case"XYZ":this._x=f*u*d+c*_*x,this._y=c*_*d-f*u*x,this._z=c*u*x+f*_*d,this._w=c*u*d-f*_*x;break;case"YXZ":this._x=f*u*d+c*_*x,this._y=c*_*d-f*u*x,this._z=c*u*x-f*_*d,this._w=c*u*d+f*_*x;break;case"ZXY":this._x=f*u*d-c*_*x,this._y=c*_*d+f*u*x,this._z=c*u*x+f*_*d,this._w=c*u*d-f*_*x;break;case"ZYX":this._x=f*u*d-c*_*x,this._y=c*_*d+f*u*x,this._z=c*u*x-f*_*d,this._w=c*u*d+f*_*x;break;case"YZX":this._x=f*u*d+c*_*x,this._y=c*_*d+f*u*x,this._z=c*u*x-f*_*d,this._w=c*u*d-f*_*x;break;case"XZY":this._x=f*u*d-c*_*x,this._y=c*_*d-f*u*x,this._z=c*u*x+f*_*d,this._w=c*u*d+f*_*x;break;default:je("Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],r=t[4],s=t[8],o=t[1],a=t[5],l=t[9],c=t[2],u=t[6],d=t[10],f=n+a+d;if(f>0){const _=.5/Math.sqrt(f+1);this._w=.25/_,this._x=(u-l)*_,this._y=(s-c)*_,this._z=(o-r)*_}else if(n>a&&n>d){const _=2*Math.sqrt(1+n-a-d);this._w=(u-l)/_,this._x=.25*_,this._y=(r+o)/_,this._z=(s+c)/_}else if(a>d){const _=2*Math.sqrt(1+a-n-d);this._w=(s-c)/_,this._x=(r+o)/_,this._y=.25*_,this._z=(l+u)/_}else{const _=2*Math.sqrt(1+d-n-a);this._w=(o-r)/_,this._x=(s+c)/_,this._y=(l+u)/_,this._z=.25*_}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(dt(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,r=e._y,s=e._z,o=e._w,a=t._x,l=t._y,c=t._z,u=t._w;return this._x=n*u+o*a+r*c-s*l,this._y=r*u+o*l+s*a-n*c,this._z=s*u+o*c+n*l-r*a,this._w=o*u-n*a-r*l-s*c,this._onChangeCallback(),this}slerp(e,t){let n=e._x,r=e._y,s=e._z,o=e._w,a=this.dot(e);a<0&&(n=-n,r=-r,s=-s,o=-o,a=-a);let l=1-t;if(a<.9995){const c=Math.acos(a),u=Math.sin(c);l=Math.sin(l*c)/u,t=Math.sin(t*c)/u,this._x=this._x*l+n*t,this._y=this._y*l+r*t,this._z=this._z*l+s*t,this._w=this._w*l+o*t,this._onChangeCallback()}else this._x=this._x*l+n*t,this._y=this._y*l+r*t,this._z=this._z*l+s*t,this._w=this._w*l+o*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class G{constructor(e=0,t=0,n=0){G.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(ll.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(ll.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*r,this.y=s[1]*t+s[4]*n+s[7]*r,this.z=s[2]*t+s[5]*n+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,r=this.z,s=e.elements,o=1/(s[3]*t+s[7]*n+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*r+s[12])*o,this.y=(s[1]*t+s[5]*n+s[9]*r+s[13])*o,this.z=(s[2]*t+s[6]*n+s[10]*r+s[14])*o,this}applyQuaternion(e){const t=this.x,n=this.y,r=this.z,s=e.x,o=e.y,a=e.z,l=e.w,c=2*(o*r-a*n),u=2*(a*t-s*r),d=2*(s*n-o*t);return this.x=t+l*c+o*d-a*u,this.y=n+l*u+a*c-s*d,this.z=r+l*d+s*u-o*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*r,this.y=s[1]*t+s[5]*n+s[9]*r,this.z=s[2]*t+s[6]*n+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=dt(this.x,e.x,t.x),this.y=dt(this.y,e.y,t.y),this.z=dt(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=dt(this.x,e,t),this.y=dt(this.y,e,t),this.z=dt(this.z,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(dt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,r=e.y,s=e.z,o=t.x,a=t.y,l=t.z;return this.x=r*l-s*a,this.y=s*o-n*l,this.z=n*a-r*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Zs.copy(this).projectOnVector(e),this.sub(Zs)}reflect(e){return this.sub(Zs.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(dt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Zs=new G,ll=new ar;class nt{constructor(e,t,n,r,s,o,a,l,c){nt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,r,s,o,a,l,c)}set(e,t,n,r,s,o,a,l,c){const u=this.elements;return u[0]=e,u[1]=r,u[2]=a,u[3]=t,u[4]=s,u[5]=l,u[6]=n,u[7]=o,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,r=t.elements,s=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],u=n[4],d=n[7],f=n[2],_=n[5],x=n[8],y=r[0],v=r[3],p=r[6],b=r[1],C=r[4],A=r[7],I=r[2],P=r[5],L=r[8];return s[0]=o*y+a*b+l*I,s[3]=o*v+a*C+l*P,s[6]=o*p+a*A+l*L,s[1]=c*y+u*b+d*I,s[4]=c*v+u*C+d*P,s[7]=c*p+u*A+d*L,s[2]=f*y+_*b+x*I,s[5]=f*v+_*C+x*P,s[8]=f*p+_*A+x*L,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8];return t*o*u-t*a*c-n*s*u+n*a*l+r*s*c-r*o*l}invert(){const e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8],d=u*o-a*c,f=a*l-u*s,_=c*s-o*l,x=t*d+n*f+r*_;if(x===0)return this.set(0,0,0,0,0,0,0,0,0);const y=1/x;return e[0]=d*y,e[1]=(r*c-u*n)*y,e[2]=(a*n-r*o)*y,e[3]=f*y,e[4]=(u*t-r*l)*y,e[5]=(r*s-a*t)*y,e[6]=_*y,e[7]=(n*l-c*t)*y,e[8]=(o*t-n*s)*y,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,s,o,a){const l=Math.cos(s),c=Math.sin(s);return this.set(n*l,n*c,-n*(l*o+c*a)+o+e,-r*c,r*l,-r*(-c*o+l*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(Js.makeScale(e,t)),this}rotate(e){return this.premultiply(Js.makeRotation(-e)),this}translate(e,t){return this.premultiply(Js.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let r=0;r<9;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Js=new nt,cl=new nt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),hl=new nt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function jh(){const i={enabled:!0,workingColorSpace:tr,spaces:{},convert:function(r,s,o){return this.enabled===!1||s===o||!s||!o||(this.spaces[s].transfer===Et&&(r.r=jn(r.r),r.g=jn(r.g),r.b=jn(r.b)),this.spaces[s].primaries!==this.spaces[o].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===Et&&(r.r=Ji(r.r),r.g=Ji(r.g),r.b=Ji(r.b))),r},workingToColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},colorSpaceToWorking:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===ai?Ss:this.spaces[r].transfer},getToneMappingMode:function(r){return this.spaces[r].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,o){return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,s){return Es("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(r,s)},toWorkingColorSpace:function(r,s){return Es("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(r,s)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[tr]:{primaries:e,whitePoint:n,transfer:Ss,toXYZ:cl,fromXYZ:hl,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:en},outputColorSpaceConfig:{drawingBufferColorSpace:en}},[en]:{primaries:e,whitePoint:n,transfer:Et,toXYZ:cl,fromXYZ:hl,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:en}}}),i}const xt=jh();function jn(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Ji(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let Oi;class Kh{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{Oi===void 0&&(Oi=ys("canvas")),Oi.width=e.width,Oi.height=e.height;const r=Oi.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),n=Oi}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=ys("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const r=n.getImageData(0,0,e.width,e.height),s=r.data;for(let o=0;o<s.length;o++)s[o]=jn(s[o]/255)*255;return n.putImageData(r,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(jn(t[n]/255)*255):t[n]=jn(t[n]);return{data:t,width:e.width,height:e.height}}else return je("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Zh=0;class Ha{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Zh++}),this.uuid=Lr(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayHeight,t.displayWidth,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let o=0,a=r.length;o<a;o++)r[o].isDataTexture?s.push(Qs(r[o].image)):s.push(Qs(r[o]))}else s=Qs(r);n.url=s}return t||(e.images[this.uuid]=n),n}}function Qs(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Kh.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(je("Texture: Unable to serialize Texture."),{})}let Jh=0;const eo=new G;class tn extends or{constructor(e=tn.DEFAULT_IMAGE,t=tn.DEFAULT_MAPPING,n=Yn,r=Yn,s=Xt,o=wi,a=Tn,l=pn,c=tn.DEFAULT_ANISOTROPY,u=ai){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Jh++}),this.uuid=Lr(),this.name="",this.source=new Ha(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=r,this.magFilter=s,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new ht(0,0),this.repeat=new ht(1,1),this.center=new ht(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new nt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(eo).x}get height(){return this.source.getSize(eo).y}get depth(){return this.source.getSize(eo).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const n=e[t];if(n===void 0){je(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){je(`Texture.setValues(): property '${t}' does not exist.`);continue}r&&n&&r.isVector2&&n.isVector2||r&&n&&r.isVector3&&n.isVector3||r&&n&&r.isMatrix3&&n.isMatrix3?r.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Rc)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case bi:e.x=e.x-Math.floor(e.x);break;case Yn:e.x=e.x<0?0:1;break;case Go:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case bi:e.y=e.y-Math.floor(e.y);break;case Yn:e.y=e.y<0?0:1;break;case Go:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}tn.DEFAULT_IMAGE=null;tn.DEFAULT_MAPPING=Rc;tn.DEFAULT_ANISOTROPY=1;class Ft{constructor(e=0,t=0,n=0,r=1){Ft.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,r=this.z,s=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*r+o[12]*s,this.y=o[1]*t+o[5]*n+o[9]*r+o[13]*s,this.z=o[2]*t+o[6]*n+o[10]*r+o[14]*s,this.w=o[3]*t+o[7]*n+o[11]*r+o[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,s;const l=e.elements,c=l[0],u=l[4],d=l[8],f=l[1],_=l[5],x=l[9],y=l[2],v=l[6],p=l[10];if(Math.abs(u-f)<.01&&Math.abs(d-y)<.01&&Math.abs(x-v)<.01){if(Math.abs(u+f)<.1&&Math.abs(d+y)<.1&&Math.abs(x+v)<.1&&Math.abs(c+_+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const C=(c+1)/2,A=(_+1)/2,I=(p+1)/2,P=(u+f)/4,L=(d+y)/4,E=(x+v)/4;return C>A&&C>I?C<.01?(n=0,r=.707106781,s=.707106781):(n=Math.sqrt(C),r=P/n,s=L/n):A>I?A<.01?(n=.707106781,r=0,s=.707106781):(r=Math.sqrt(A),n=P/r,s=E/r):I<.01?(n=.707106781,r=.707106781,s=0):(s=Math.sqrt(I),n=L/s,r=E/s),this.set(n,r,s,t),this}let b=Math.sqrt((v-x)*(v-x)+(d-y)*(d-y)+(f-u)*(f-u));return Math.abs(b)<.001&&(b=1),this.x=(v-x)/b,this.y=(d-y)/b,this.z=(f-u)/b,this.w=Math.acos((c+_+p-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=dt(this.x,e.x,t.x),this.y=dt(this.y,e.y,t.y),this.z=dt(this.z,e.z,t.z),this.w=dt(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=dt(this.x,e,t),this.y=dt(this.y,e,t),this.z=dt(this.z,e,t),this.w=dt(this.w,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(dt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Qh extends or{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Xt,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new Ft(0,0,e,t),this.scissorTest=!1,this.viewport=new Ft(0,0,e,t),this.textures=[];const r={width:e,height:t,depth:n.depth},s=new tn(r),o=n.count;for(let a=0;a<o;a++)this.textures[a]=s.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(e={}){const t={minFilter:Xt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=n,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const r=Object.assign({},e.textures[t].image);this.textures[t].source=new Ha(r)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Nn extends Qh{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class Bc extends tn{constructor(e=null,t=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=jt,this.minFilter=jt,this.wrapR=Yn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class eu extends tn{constructor(e=null,t=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=jt,this.minFilter=jt,this.wrapR=Yn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Lt{constructor(e,t,n,r,s,o,a,l,c,u,d,f,_,x,y,v){Lt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,r,s,o,a,l,c,u,d,f,_,x,y,v)}set(e,t,n,r,s,o,a,l,c,u,d,f,_,x,y,v){const p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=r,p[1]=s,p[5]=o,p[9]=a,p[13]=l,p[2]=c,p[6]=u,p[10]=d,p[14]=f,p[3]=_,p[7]=x,p[11]=y,p[15]=v,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Lt().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinant()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinant()===0)return this.identity();const t=this.elements,n=e.elements,r=1/Ni.setFromMatrixColumn(e,0).length(),s=1/Ni.setFromMatrixColumn(e,1).length(),o=1/Ni.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,r=e.y,s=e.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(r),c=Math.sin(r),u=Math.cos(s),d=Math.sin(s);if(e.order==="XYZ"){const f=o*u,_=o*d,x=a*u,y=a*d;t[0]=l*u,t[4]=-l*d,t[8]=c,t[1]=_+x*c,t[5]=f-y*c,t[9]=-a*l,t[2]=y-f*c,t[6]=x+_*c,t[10]=o*l}else if(e.order==="YXZ"){const f=l*u,_=l*d,x=c*u,y=c*d;t[0]=f+y*a,t[4]=x*a-_,t[8]=o*c,t[1]=o*d,t[5]=o*u,t[9]=-a,t[2]=_*a-x,t[6]=y+f*a,t[10]=o*l}else if(e.order==="ZXY"){const f=l*u,_=l*d,x=c*u,y=c*d;t[0]=f-y*a,t[4]=-o*d,t[8]=x+_*a,t[1]=_+x*a,t[5]=o*u,t[9]=y-f*a,t[2]=-o*c,t[6]=a,t[10]=o*l}else if(e.order==="ZYX"){const f=o*u,_=o*d,x=a*u,y=a*d;t[0]=l*u,t[4]=x*c-_,t[8]=f*c+y,t[1]=l*d,t[5]=y*c+f,t[9]=_*c-x,t[2]=-c,t[6]=a*l,t[10]=o*l}else if(e.order==="YZX"){const f=o*l,_=o*c,x=a*l,y=a*c;t[0]=l*u,t[4]=y-f*d,t[8]=x*d+_,t[1]=d,t[5]=o*u,t[9]=-a*u,t[2]=-c*u,t[6]=_*d+x,t[10]=f-y*d}else if(e.order==="XZY"){const f=o*l,_=o*c,x=a*l,y=a*c;t[0]=l*u,t[4]=-d,t[8]=c*u,t[1]=f*d+y,t[5]=o*u,t[9]=_*d-x,t[2]=x*d-_,t[6]=a*u,t[10]=y*d+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(tu,e,nu)}lookAt(e,t,n){const r=this.elements;return un.subVectors(e,t),un.lengthSq()===0&&(un.z=1),un.normalize(),ei.crossVectors(n,un),ei.lengthSq()===0&&(Math.abs(n.z)===1?un.x+=1e-4:un.z+=1e-4,un.normalize(),ei.crossVectors(n,un)),ei.normalize(),zr.crossVectors(un,ei),r[0]=ei.x,r[4]=zr.x,r[8]=un.x,r[1]=ei.y,r[5]=zr.y,r[9]=un.y,r[2]=ei.z,r[6]=zr.z,r[10]=un.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,r=t.elements,s=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],u=n[1],d=n[5],f=n[9],_=n[13],x=n[2],y=n[6],v=n[10],p=n[14],b=n[3],C=n[7],A=n[11],I=n[15],P=r[0],L=r[4],E=r[8],w=r[12],j=r[1],D=r[5],V=r[9],X=r[13],Y=r[2],$=r[6],q=r[10],H=r[14],le=r[3],ie=r[7],Ee=r[11],be=r[15];return s[0]=o*P+a*j+l*Y+c*le,s[4]=o*L+a*D+l*$+c*ie,s[8]=o*E+a*V+l*q+c*Ee,s[12]=o*w+a*X+l*H+c*be,s[1]=u*P+d*j+f*Y+_*le,s[5]=u*L+d*D+f*$+_*ie,s[9]=u*E+d*V+f*q+_*Ee,s[13]=u*w+d*X+f*H+_*be,s[2]=x*P+y*j+v*Y+p*le,s[6]=x*L+y*D+v*$+p*ie,s[10]=x*E+y*V+v*q+p*Ee,s[14]=x*w+y*X+v*H+p*be,s[3]=b*P+C*j+A*Y+I*le,s[7]=b*L+C*D+A*$+I*ie,s[11]=b*E+C*V+A*q+I*Ee,s[15]=b*w+C*X+A*H+I*be,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],r=e[8],s=e[12],o=e[1],a=e[5],l=e[9],c=e[13],u=e[2],d=e[6],f=e[10],_=e[14],x=e[3],y=e[7],v=e[11],p=e[15],b=l*_-c*f,C=a*_-c*d,A=a*f-l*d,I=o*_-c*u,P=o*f-l*u,L=o*d-a*u;return t*(y*b-v*C+p*A)-n*(x*b-v*I+p*P)+r*(x*C-y*I+p*L)-s*(x*A-y*P+v*L)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8],d=e[9],f=e[10],_=e[11],x=e[12],y=e[13],v=e[14],p=e[15],b=t*a-n*o,C=t*l-r*o,A=t*c-s*o,I=n*l-r*a,P=n*c-s*a,L=r*c-s*l,E=u*y-d*x,w=u*v-f*x,j=u*p-_*x,D=d*v-f*y,V=d*p-_*y,X=f*p-_*v,Y=b*X-C*V+A*D+I*j-P*w+L*E;if(Y===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const $=1/Y;return e[0]=(a*X-l*V+c*D)*$,e[1]=(r*V-n*X-s*D)*$,e[2]=(y*L-v*P+p*I)*$,e[3]=(f*P-d*L-_*I)*$,e[4]=(l*j-o*X-c*w)*$,e[5]=(t*X-r*j+s*w)*$,e[6]=(v*A-x*L-p*C)*$,e[7]=(u*L-f*A+_*C)*$,e[8]=(o*V-a*j+c*E)*$,e[9]=(n*j-t*V-s*E)*$,e[10]=(x*P-y*A+p*b)*$,e[11]=(d*A-u*P-_*b)*$,e[12]=(a*w-o*D-l*E)*$,e[13]=(t*D-n*w+r*E)*$,e[14]=(y*C-x*I-v*b)*$,e[15]=(u*I-d*C+f*b)*$,this}scale(e){const t=this.elements,n=e.x,r=e.y,s=e.z;return t[0]*=n,t[4]*=r,t[8]*=s,t[1]*=n,t[5]*=r,t[9]*=s,t[2]*=n,t[6]*=r,t[10]*=s,t[3]*=n,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),r=Math.sin(t),s=1-n,o=e.x,a=e.y,l=e.z,c=s*o,u=s*a;return this.set(c*o+n,c*a-r*l,c*l+r*a,0,c*a+r*l,u*a+n,u*l-r*o,0,c*l-r*a,u*l+r*o,s*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,s,o){return this.set(1,n,s,0,e,1,o,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){const r=this.elements,s=t._x,o=t._y,a=t._z,l=t._w,c=s+s,u=o+o,d=a+a,f=s*c,_=s*u,x=s*d,y=o*u,v=o*d,p=a*d,b=l*c,C=l*u,A=l*d,I=n.x,P=n.y,L=n.z;return r[0]=(1-(y+p))*I,r[1]=(_+A)*I,r[2]=(x-C)*I,r[3]=0,r[4]=(_-A)*P,r[5]=(1-(f+p))*P,r[6]=(v+b)*P,r[7]=0,r[8]=(x+C)*L,r[9]=(v-b)*L,r[10]=(1-(f+y))*L,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){const r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];const s=this.determinant();if(s===0)return n.set(1,1,1),t.identity(),this;let o=Ni.set(r[0],r[1],r[2]).length();const a=Ni.set(r[4],r[5],r[6]).length(),l=Ni.set(r[8],r[9],r[10]).length();s<0&&(o=-o),Mn.copy(this);const c=1/o,u=1/a,d=1/l;return Mn.elements[0]*=c,Mn.elements[1]*=c,Mn.elements[2]*=c,Mn.elements[4]*=u,Mn.elements[5]*=u,Mn.elements[6]*=u,Mn.elements[8]*=d,Mn.elements[9]*=d,Mn.elements[10]*=d,t.setFromRotationMatrix(Mn),n.x=o,n.y=a,n.z=l,this}makePerspective(e,t,n,r,s,o,a=Un,l=!1){const c=this.elements,u=2*s/(t-e),d=2*s/(n-r),f=(t+e)/(t-e),_=(n+r)/(n-r);let x,y;if(l)x=s/(o-s),y=o*s/(o-s);else if(a===Un)x=-(o+s)/(o-s),y=-2*o*s/(o-s);else if(a===Pr)x=-o/(o-s),y=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=u,c[4]=0,c[8]=f,c[12]=0,c[1]=0,c[5]=d,c[9]=_,c[13]=0,c[2]=0,c[6]=0,c[10]=x,c[14]=y,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,r,s,o,a=Un,l=!1){const c=this.elements,u=2/(t-e),d=2/(n-r),f=-(t+e)/(t-e),_=-(n+r)/(n-r);let x,y;if(l)x=1/(o-s),y=o/(o-s);else if(a===Un)x=-2/(o-s),y=-(o+s)/(o-s);else if(a===Pr)x=-1/(o-s),y=-s/(o-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=u,c[4]=0,c[8]=0,c[12]=f,c[1]=0,c[5]=d,c[9]=0,c[13]=_,c[2]=0,c[6]=0,c[10]=x,c[14]=y,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let r=0;r<16;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const Ni=new G,Mn=new Lt,tu=new G(0,0,0),nu=new G(1,1,1),ei=new G,zr=new G,un=new G,ul=new Lt,fl=new ar;class kn{constructor(e=0,t=0,n=0,r=kn.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const r=e.elements,s=r[0],o=r[4],a=r[8],l=r[1],c=r[5],u=r[9],d=r[2],f=r[6],_=r[10];switch(t){case"XYZ":this._y=Math.asin(dt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,_),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-dt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,_),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,s),this._z=0);break;case"ZXY":this._x=Math.asin(dt(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-d,_),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-dt(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(f,_),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(dt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-d,s)):(this._x=0,this._y=Math.atan2(a,_));break;case"XZY":this._z=Math.asin(-dt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-u,_),this._y=0);break;default:je("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return ul.makeRotationFromQuaternion(e),this.setFromRotationMatrix(ul,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return fl.setFromEuler(this),this.setFromQuaternion(fl,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}kn.DEFAULT_ORDER="XYZ";class Va{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let iu=0;const dl=new G,Fi=new ar,Hn=new Lt,Hr=new G,fr=new G,ru=new G,su=new ar,pl=new G(1,0,0),ml=new G(0,1,0),gl=new G(0,0,1),_l={type:"added"},ou={type:"removed"},Bi={type:"childadded",child:null},to={type:"childremoved",child:null};class $t extends or{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:iu++}),this.uuid=Lr(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=$t.DEFAULT_UP.clone();const e=new G,t=new kn,n=new ar,r=new G(1,1,1);function s(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(s),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new Lt},normalMatrix:{value:new nt}}),this.matrix=new Lt,this.matrixWorld=new Lt,this.matrixAutoUpdate=$t.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=$t.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Va,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Fi.setFromAxisAngle(e,t),this.quaternion.multiply(Fi),this}rotateOnWorldAxis(e,t){return Fi.setFromAxisAngle(e,t),this.quaternion.premultiply(Fi),this}rotateX(e){return this.rotateOnAxis(pl,e)}rotateY(e){return this.rotateOnAxis(ml,e)}rotateZ(e){return this.rotateOnAxis(gl,e)}translateOnAxis(e,t){return dl.copy(e).applyQuaternion(this.quaternion),this.position.add(dl.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(pl,e)}translateY(e){return this.translateOnAxis(ml,e)}translateZ(e){return this.translateOnAxis(gl,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Hn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Hr.copy(e):Hr.set(e,t,n);const r=this.parent;this.updateWorldMatrix(!0,!1),fr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Hn.lookAt(fr,Hr,this.up):Hn.lookAt(Hr,fr,this.up),this.quaternion.setFromRotationMatrix(Hn),r&&(Hn.extractRotation(r.matrixWorld),Fi.setFromRotationMatrix(Hn),this.quaternion.premultiply(Fi.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(vt("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(_l),Bi.child=e,this.dispatchEvent(Bi),Bi.child=null):vt("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(ou),to.child=e,this.dispatchEvent(to),to.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Hn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Hn.multiply(e.parent.matrixWorld)),e.applyMatrix4(Hn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(_l),Bi.child=e,this.dispatchEvent(Bi),Bi.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){const o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(fr,e,ru),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(fr,su,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const t=e.x,n=e.y,r=e.z,s=this.matrix.elements;s[12]+=t-s[0]*t-s[4]*n-s[8]*r,s[13]+=n-s[1]*t-s[5]*n-s[9]*r,s[14]+=r-s[2]*t-s[6]*n-s[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),this.static!==!1&&(r.static=this.static),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(a=>({...a})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function s(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const d=l[c];s(e.shapes,d)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(s(e.materials,this.material[l]));r.material=a}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let a=0;a<this.children.length;a++)r.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];r.animations.push(s(e.animations,l))}}if(t){const a=o(e.geometries),l=o(e.materials),c=o(e.textures),u=o(e.images),d=o(e.shapes),f=o(e.skeletons),_=o(e.animations),x=o(e.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),u.length>0&&(n.images=u),d.length>0&&(n.shapes=d),f.length>0&&(n.skeletons=f),_.length>0&&(n.animations=_),x.length>0&&(n.nodes=x)}return n.object=r,n;function o(a){const l=[];for(const c in a){const u=a[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),e.pivot!==null&&(this.pivot=e.pivot.clone()),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const r=e.children[n];this.add(r.clone())}return this}}$t.DEFAULT_UP=new G(0,1,0);$t.DEFAULT_MATRIX_AUTO_UPDATE=!0;$t.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class on extends $t{constructor(){super(),this.isGroup=!0,this.type="Group"}}const au={type:"move"};class no{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new on,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new on,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new G,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new G),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new on,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new G,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new G),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,s=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(const y of e.hand.values()){const v=t.getJointPose(y,n),p=this._getHandJoint(c,y);v!==null&&(p.matrix.fromArray(v.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=v.radius),p.visible=v!==null}const u=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],f=u.position.distanceTo(d.position),_=.02,x=.005;c.inputState.pinching&&f>_+x?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&f<=_-x&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&s!==null&&(r=s),r!==null&&(a.matrix.fromArray(r.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,r.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(r.linearVelocity)):a.hasLinearVelocity=!1,r.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(r.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(au)))}return a!==null&&(a.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new on;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}const kc={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ti={h:0,s:0,l:0},Vr={h:0,s:0,l:0};function io(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class mt{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=en){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,xt.colorSpaceToWorking(this,t),this}setRGB(e,t,n,r=xt.workingColorSpace){return this.r=e,this.g=t,this.b=n,xt.colorSpaceToWorking(this,r),this}setHSL(e,t,n,r=xt.workingColorSpace){if(e=qh(e,1),t=dt(t,0,1),n=dt(n,0,1),t===0)this.r=this.g=this.b=n;else{const s=n<=.5?n*(1+t):n+t-n*t,o=2*n-s;this.r=io(o,s,e+1/3),this.g=io(o,s,e),this.b=io(o,s,e-1/3)}return xt.colorSpaceToWorking(this,r),this}setStyle(e,t=en){function n(s){s!==void 0&&parseFloat(s)<1&&je("Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const o=r[1],a=r[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:je("Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(s,16),t);je("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=en){const n=kc[e.toLowerCase()];return n!==void 0?this.setHex(n,t):je("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=jn(e.r),this.g=jn(e.g),this.b=jn(e.b),this}copyLinearToSRGB(e){return this.r=Ji(e.r),this.g=Ji(e.g),this.b=Ji(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=en){return xt.workingToColorSpace(Jt.copy(this),e),Math.round(dt(Jt.r*255,0,255))*65536+Math.round(dt(Jt.g*255,0,255))*256+Math.round(dt(Jt.b*255,0,255))}getHexString(e=en){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=xt.workingColorSpace){xt.workingToColorSpace(Jt.copy(this),t);const n=Jt.r,r=Jt.g,s=Jt.b,o=Math.max(n,r,s),a=Math.min(n,r,s);let l,c;const u=(a+o)/2;if(a===o)l=0,c=0;else{const d=o-a;switch(c=u<=.5?d/(o+a):d/(2-o-a),o){case n:l=(r-s)/d+(r<s?6:0);break;case r:l=(s-n)/d+2;break;case s:l=(n-r)/d+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=xt.workingColorSpace){return xt.workingToColorSpace(Jt.copy(this),t),e.r=Jt.r,e.g=Jt.g,e.b=Jt.b,e}getStyle(e=en){xt.workingToColorSpace(Jt.copy(this),e);const t=Jt.r,n=Jt.g,r=Jt.b;return e!==en?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(r*255)})`}offsetHSL(e,t,n){return this.getHSL(ti),this.setHSL(ti.h+e,ti.s+t,ti.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(ti),e.getHSL(Vr);const n=Ks(ti.h,Vr.h,t),r=Ks(ti.s,Vr.s,t),s=Ks(ti.l,Vr.l,t);return this.setHSL(n,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*r,this.g=s[1]*t+s[4]*n+s[7]*r,this.b=s[2]*t+s[5]*n+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Jt=new mt;mt.NAMES=kc;class lu extends $t{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new kn,this.environmentIntensity=1,this.environmentRotation=new kn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}const Sn=new G,Vn=new G,ro=new G,Gn=new G,ki=new G,zi=new G,vl=new G,so=new G,oo=new G,ao=new G,lo=new Ft,co=new Ft,ho=new Ft;class En{constructor(e=new G,t=new G,n=new G){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),Sn.subVectors(e,t),r.cross(Sn);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,n,r,s){Sn.subVectors(r,t),Vn.subVectors(n,t),ro.subVectors(e,t);const o=Sn.dot(Sn),a=Sn.dot(Vn),l=Sn.dot(ro),c=Vn.dot(Vn),u=Vn.dot(ro),d=o*c-a*a;if(d===0)return s.set(0,0,0),null;const f=1/d,_=(c*l-a*u)*f,x=(o*u-a*l)*f;return s.set(1-_-x,x,_)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,Gn)===null?!1:Gn.x>=0&&Gn.y>=0&&Gn.x+Gn.y<=1}static getInterpolation(e,t,n,r,s,o,a,l){return this.getBarycoord(e,t,n,r,Gn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,Gn.x),l.addScaledVector(o,Gn.y),l.addScaledVector(a,Gn.z),l)}static getInterpolatedAttribute(e,t,n,r,s,o){return lo.setScalar(0),co.setScalar(0),ho.setScalar(0),lo.fromBufferAttribute(e,t),co.fromBufferAttribute(e,n),ho.fromBufferAttribute(e,r),o.setScalar(0),o.addScaledVector(lo,s.x),o.addScaledVector(co,s.y),o.addScaledVector(ho,s.z),o}static isFrontFacing(e,t,n,r){return Sn.subVectors(n,t),Vn.subVectors(e,t),Sn.cross(Vn).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Sn.subVectors(this.c,this.b),Vn.subVectors(this.a,this.b),Sn.cross(Vn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return En.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return En.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,r,s){return En.getInterpolation(e,this.a,this.b,this.c,t,n,r,s)}containsPoint(e){return En.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return En.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,r=this.b,s=this.c;let o,a;ki.subVectors(r,n),zi.subVectors(s,n),so.subVectors(e,n);const l=ki.dot(so),c=zi.dot(so);if(l<=0&&c<=0)return t.copy(n);oo.subVectors(e,r);const u=ki.dot(oo),d=zi.dot(oo);if(u>=0&&d<=u)return t.copy(r);const f=l*d-u*c;if(f<=0&&l>=0&&u<=0)return o=l/(l-u),t.copy(n).addScaledVector(ki,o);ao.subVectors(e,s);const _=ki.dot(ao),x=zi.dot(ao);if(x>=0&&_<=x)return t.copy(s);const y=_*c-l*x;if(y<=0&&c>=0&&x<=0)return a=c/(c-x),t.copy(n).addScaledVector(zi,a);const v=u*x-_*d;if(v<=0&&d-u>=0&&_-x>=0)return vl.subVectors(s,r),a=(d-u)/(d-u+(_-x)),t.copy(r).addScaledVector(vl,a);const p=1/(v+y+f);return o=y*p,a=f*p,t.copy(n).addScaledVector(ki,o).addScaledVector(zi,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class Ur{constructor(e=new G(1/0,1/0,1/0),t=new G(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(yn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(yn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=yn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const s=n.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,yn):yn.fromBufferAttribute(s,o),yn.applyMatrix4(e.matrixWorld),this.expandByPoint(yn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Gr.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Gr.copy(n.boundingBox)),Gr.applyMatrix4(e.matrixWorld),this.union(Gr)}const r=e.children;for(let s=0,o=r.length;s<o;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,yn),yn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(dr),Wr.subVectors(this.max,dr),Hi.subVectors(e.a,dr),Vi.subVectors(e.b,dr),Gi.subVectors(e.c,dr),ni.subVectors(Vi,Hi),ii.subVectors(Gi,Vi),pi.subVectors(Hi,Gi);let t=[0,-ni.z,ni.y,0,-ii.z,ii.y,0,-pi.z,pi.y,ni.z,0,-ni.x,ii.z,0,-ii.x,pi.z,0,-pi.x,-ni.y,ni.x,0,-ii.y,ii.x,0,-pi.y,pi.x,0];return!uo(t,Hi,Vi,Gi,Wr)||(t=[1,0,0,0,1,0,0,0,1],!uo(t,Hi,Vi,Gi,Wr))?!1:(Xr.crossVectors(ni,ii),t=[Xr.x,Xr.y,Xr.z],uo(t,Hi,Vi,Gi,Wr))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,yn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(yn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Wn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Wn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Wn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Wn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Wn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Wn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Wn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Wn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Wn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const Wn=[new G,new G,new G,new G,new G,new G,new G,new G],yn=new G,Gr=new Ur,Hi=new G,Vi=new G,Gi=new G,ni=new G,ii=new G,pi=new G,dr=new G,Wr=new G,Xr=new G,mi=new G;function uo(i,e,t,n,r){for(let s=0,o=i.length-3;s<=o;s+=3){mi.fromArray(i,s);const a=r.x*Math.abs(mi.x)+r.y*Math.abs(mi.y)+r.z*Math.abs(mi.z),l=e.dot(mi),c=t.dot(mi),u=n.dot(mi);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>a)return!1}return!0}const kt=new G,$r=new ht;let cu=0;class Fn{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:cu++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=rl,this.updateRanges=[],this.gpuType=Ln,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)$r.fromBufferAttribute(this,t),$r.applyMatrix3(e),this.setXY(t,$r.x,$r.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)kt.fromBufferAttribute(this,t),kt.applyMatrix3(e),this.setXYZ(t,kt.x,kt.y,kt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)kt.fromBufferAttribute(this,t),kt.applyMatrix4(e),this.setXYZ(t,kt.x,kt.y,kt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)kt.fromBufferAttribute(this,t),kt.applyNormalMatrix(e),this.setXYZ(t,kt.x,kt.y,kt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)kt.fromBufferAttribute(this,t),kt.transformDirection(e),this.setXYZ(t,kt.x,kt.y,kt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=ur(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=sn(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=ur(t,this.array)),t}setX(e,t){return this.normalized&&(t=sn(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=ur(t,this.array)),t}setY(e,t){return this.normalized&&(t=sn(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=ur(t,this.array)),t}setZ(e,t){return this.normalized&&(t=sn(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=ur(t,this.array)),t}setW(e,t){return this.normalized&&(t=sn(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=sn(t,this.array),n=sn(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=sn(t,this.array),n=sn(n,this.array),r=sn(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,s){return e*=this.itemSize,this.normalized&&(t=sn(t,this.array),n=sn(n,this.array),r=sn(r,this.array),s=sn(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==rl&&(e.usage=this.usage),e}}class zc extends Fn{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class Hc extends Fn{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class Bt extends Fn{constructor(e,t,n){super(new Float32Array(e),t,n)}}const hu=new Ur,pr=new G,fo=new G;class Ls{constructor(e=new G,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):hu.setFromPoints(e).getCenter(n);let r=0;for(let s=0,o=e.length;s<o;s++)r=Math.max(r,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;pr.subVectors(e,this.center);const t=pr.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),r=(n-this.radius)*.5;this.center.addScaledVector(pr,r/n),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(fo.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(pr.copy(e.center).add(fo)),this.expandByPoint(pr.copy(e.center).sub(fo))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let uu=0;const mn=new Lt,po=new $t,Wi=new G,fn=new Ur,mr=new Ur,Wt=new G;class rn extends or{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:uu++}),this.uuid=Lr(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Wh(e)?Hc:zc)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new nt().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return mn.makeRotationFromQuaternion(e),this.applyMatrix4(mn),this}rotateX(e){return mn.makeRotationX(e),this.applyMatrix4(mn),this}rotateY(e){return mn.makeRotationY(e),this.applyMatrix4(mn),this}rotateZ(e){return mn.makeRotationZ(e),this.applyMatrix4(mn),this}translate(e,t,n){return mn.makeTranslation(e,t,n),this.applyMatrix4(mn),this}scale(e,t,n){return mn.makeScale(e,t,n),this.applyMatrix4(mn),this}lookAt(e){return po.lookAt(e),po.updateMatrix(),this.applyMatrix4(po.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Wi).negate(),this.translate(Wi.x,Wi.y,Wi.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let r=0,s=e.length;r<s;r++){const o=e[r];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new Bt(n,3))}else{const n=Math.min(e.length,t.count);for(let r=0;r<n;r++){const s=e[r];t.setXYZ(r,s.x,s.y,s.z||0)}e.length>t.count&&je("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Ur);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){vt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new G(-1/0,-1/0,-1/0),new G(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,r=t.length;n<r;n++){const s=t[n];fn.setFromBufferAttribute(s),this.morphTargetsRelative?(Wt.addVectors(this.boundingBox.min,fn.min),this.boundingBox.expandByPoint(Wt),Wt.addVectors(this.boundingBox.max,fn.max),this.boundingBox.expandByPoint(Wt)):(this.boundingBox.expandByPoint(fn.min),this.boundingBox.expandByPoint(fn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&vt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ls);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){vt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new G,1/0);return}if(e){const n=this.boundingSphere.center;if(fn.setFromBufferAttribute(e),t)for(let s=0,o=t.length;s<o;s++){const a=t[s];mr.setFromBufferAttribute(a),this.morphTargetsRelative?(Wt.addVectors(fn.min,mr.min),fn.expandByPoint(Wt),Wt.addVectors(fn.max,mr.max),fn.expandByPoint(Wt)):(fn.expandByPoint(mr.min),fn.expandByPoint(mr.max))}fn.getCenter(n);let r=0;for(let s=0,o=e.count;s<o;s++)Wt.fromBufferAttribute(e,s),r=Math.max(r,n.distanceToSquared(Wt));if(t)for(let s=0,o=t.length;s<o;s++){const a=t[s],l=this.morphTargetsRelative;for(let c=0,u=a.count;c<u;c++)Wt.fromBufferAttribute(a,c),l&&(Wi.fromBufferAttribute(e,c),Wt.add(Wi)),r=Math.max(r,n.distanceToSquared(Wt))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&vt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){vt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,r=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Fn(new Float32Array(4*n.count),4));const o=this.getAttribute("tangent"),a=[],l=[];for(let E=0;E<n.count;E++)a[E]=new G,l[E]=new G;const c=new G,u=new G,d=new G,f=new ht,_=new ht,x=new ht,y=new G,v=new G;function p(E,w,j){c.fromBufferAttribute(n,E),u.fromBufferAttribute(n,w),d.fromBufferAttribute(n,j),f.fromBufferAttribute(s,E),_.fromBufferAttribute(s,w),x.fromBufferAttribute(s,j),u.sub(c),d.sub(c),_.sub(f),x.sub(f);const D=1/(_.x*x.y-x.x*_.y);isFinite(D)&&(y.copy(u).multiplyScalar(x.y).addScaledVector(d,-_.y).multiplyScalar(D),v.copy(d).multiplyScalar(_.x).addScaledVector(u,-x.x).multiplyScalar(D),a[E].add(y),a[w].add(y),a[j].add(y),l[E].add(v),l[w].add(v),l[j].add(v))}let b=this.groups;b.length===0&&(b=[{start:0,count:e.count}]);for(let E=0,w=b.length;E<w;++E){const j=b[E],D=j.start,V=j.count;for(let X=D,Y=D+V;X<Y;X+=3)p(e.getX(X+0),e.getX(X+1),e.getX(X+2))}const C=new G,A=new G,I=new G,P=new G;function L(E){I.fromBufferAttribute(r,E),P.copy(I);const w=a[E];C.copy(w),C.sub(I.multiplyScalar(I.dot(w))).normalize(),A.crossVectors(P,w);const D=A.dot(l[E])<0?-1:1;o.setXYZW(E,C.x,C.y,C.z,D)}for(let E=0,w=b.length;E<w;++E){const j=b[E],D=j.start,V=j.count;for(let X=D,Y=D+V;X<Y;X+=3)L(e.getX(X+0)),L(e.getX(X+1)),L(e.getX(X+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Fn(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let f=0,_=n.count;f<_;f++)n.setXYZ(f,0,0,0);const r=new G,s=new G,o=new G,a=new G,l=new G,c=new G,u=new G,d=new G;if(e)for(let f=0,_=e.count;f<_;f+=3){const x=e.getX(f+0),y=e.getX(f+1),v=e.getX(f+2);r.fromBufferAttribute(t,x),s.fromBufferAttribute(t,y),o.fromBufferAttribute(t,v),u.subVectors(o,s),d.subVectors(r,s),u.cross(d),a.fromBufferAttribute(n,x),l.fromBufferAttribute(n,y),c.fromBufferAttribute(n,v),a.add(u),l.add(u),c.add(u),n.setXYZ(x,a.x,a.y,a.z),n.setXYZ(y,l.x,l.y,l.z),n.setXYZ(v,c.x,c.y,c.z)}else for(let f=0,_=t.count;f<_;f+=3)r.fromBufferAttribute(t,f+0),s.fromBufferAttribute(t,f+1),o.fromBufferAttribute(t,f+2),u.subVectors(o,s),d.subVectors(r,s),u.cross(d),n.setXYZ(f+0,u.x,u.y,u.z),n.setXYZ(f+1,u.x,u.y,u.z),n.setXYZ(f+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Wt.fromBufferAttribute(e,t),Wt.normalize(),e.setXYZ(t,Wt.x,Wt.y,Wt.z)}toNonIndexed(){function e(a,l){const c=a.array,u=a.itemSize,d=a.normalized,f=new c.constructor(l.length*u);let _=0,x=0;for(let y=0,v=l.length;y<v;y++){a.isInterleavedBufferAttribute?_=l[y]*a.data.stride+a.offset:_=l[y]*u;for(let p=0;p<u;p++)f[x++]=c[_++]}return new Fn(f,u,d)}if(this.index===null)return je("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new rn,n=this.index.array,r=this.attributes;for(const a in r){const l=r[a],c=e(l,n);t.setAttribute(a,c)}const s=this.morphAttributes;for(const a in s){const l=[],c=s[a];for(let u=0,d=c.length;u<d;u++){const f=c[u],_=e(f,n);l.push(_)}t.morphAttributes[a]=l}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const c=n[l];e.data.attributes[l]=c.toJSON(e.data)}const r={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let d=0,f=c.length;d<f;d++){const _=c[d];u.push(_.toJSON(e.data))}u.length>0&&(r[l]=u,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere=a.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone());const r=e.attributes;for(const c in r){const u=r[c];this.setAttribute(c,u.clone(t))}const s=e.morphAttributes;for(const c in s){const u=[],d=s[c];for(let f=0,_=d.length;f<_;f++)u.push(d[f].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let c=0,u=o.length;c<u;c++){const d=o[c];this.addGroup(d.start,d.count,d.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}let fu=0;class lr extends or{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:fu++}),this.uuid=Lr(),this.name="",this.type="Material",this.blending=Zi,this.side=ui,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Oo,this.blendDst=No,this.blendEquation=Ei,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new mt(0,0,0),this.blendAlpha=0,this.depthFunc=Dn,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=il,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ui,this.stencilZFail=Ui,this.stencilZPass=Ui,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){je(`Material: parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){je(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(n):r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Zi&&(n.blending=this.blending),this.side!==ui&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Oo&&(n.blendSrc=this.blendSrc),this.blendDst!==No&&(n.blendDst=this.blendDst),this.blendEquation!==Ei&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Dn&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==il&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Ui&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Ui&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Ui&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.allowOverride===!1&&(n.allowOverride=!1),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(s){const o=[];for(const a in s){const l=s[a];delete l.metadata,o.push(l)}return o}if(t){const s=r(e.textures),o=r(e.images);s.length>0&&(n.textures=s),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const r=t.length;n=new Array(r);for(let s=0;s!==r;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}const Xn=new G,mo=new G,Yr=new G,ri=new G,go=new G,qr=new G,_o=new G;class Ga{constructor(e=new G,t=new G(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Xn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Xn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Xn.copy(this.origin).addScaledVector(this.direction,t),Xn.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){mo.copy(e).add(t).multiplyScalar(.5),Yr.copy(t).sub(e).normalize(),ri.copy(this.origin).sub(mo);const s=e.distanceTo(t)*.5,o=-this.direction.dot(Yr),a=ri.dot(this.direction),l=-ri.dot(Yr),c=ri.lengthSq(),u=Math.abs(1-o*o);let d,f,_,x;if(u>0)if(d=o*l-a,f=o*a-l,x=s*u,d>=0)if(f>=-x)if(f<=x){const y=1/u;d*=y,f*=y,_=d*(d+o*f+2*a)+f*(o*d+f+2*l)+c}else f=s,d=Math.max(0,-(o*f+a)),_=-d*d+f*(f+2*l)+c;else f=-s,d=Math.max(0,-(o*f+a)),_=-d*d+f*(f+2*l)+c;else f<=-x?(d=Math.max(0,-(-o*s+a)),f=d>0?-s:Math.min(Math.max(-s,-l),s),_=-d*d+f*(f+2*l)+c):f<=x?(d=0,f=Math.min(Math.max(-s,-l),s),_=f*(f+2*l)+c):(d=Math.max(0,-(o*s+a)),f=d>0?s:Math.min(Math.max(-s,-l),s),_=-d*d+f*(f+2*l)+c);else f=o>0?-s:s,d=Math.max(0,-(o*f+a)),_=-d*d+f*(f+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,d),r&&r.copy(mo).addScaledVector(Yr,f),_}intersectSphere(e,t){Xn.subVectors(e.center,this.origin);const n=Xn.dot(this.direction),r=Xn.dot(Xn)-n*n,s=e.radius*e.radius;if(r>s)return null;const o=Math.sqrt(s-r),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,t):this.at(a,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,s,o,a,l;const c=1/this.direction.x,u=1/this.direction.y,d=1/this.direction.z,f=this.origin;return c>=0?(n=(e.min.x-f.x)*c,r=(e.max.x-f.x)*c):(n=(e.max.x-f.x)*c,r=(e.min.x-f.x)*c),u>=0?(s=(e.min.y-f.y)*u,o=(e.max.y-f.y)*u):(s=(e.max.y-f.y)*u,o=(e.min.y-f.y)*u),n>o||s>r||((s>n||isNaN(n))&&(n=s),(o<r||isNaN(r))&&(r=o),d>=0?(a=(e.min.z-f.z)*d,l=(e.max.z-f.z)*d):(a=(e.max.z-f.z)*d,l=(e.min.z-f.z)*d),n>l||a>r)||((a>n||n!==n)&&(n=a),(l<r||r!==r)&&(r=l),r<0)?null:this.at(n>=0?n:r,t)}intersectsBox(e){return this.intersectBox(e,Xn)!==null}intersectTriangle(e,t,n,r,s){go.subVectors(t,e),qr.subVectors(n,e),_o.crossVectors(go,qr);let o=this.direction.dot(_o),a;if(o>0){if(r)return null;a=1}else if(o<0)a=-1,o=-o;else return null;ri.subVectors(this.origin,e);const l=a*this.direction.dot(qr.crossVectors(ri,qr));if(l<0)return null;const c=a*this.direction.dot(go.cross(ri));if(c<0||l+c>o)return null;const u=-a*ri.dot(_o);return u<0?null:this.at(u/o,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class $n extends lr{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new mt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new kn,this.combine=Sc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const xl=new Lt,gi=new Ga,jr=new Ls,Ml=new G,Kr=new G,Zr=new G,Jr=new G,vo=new G,Qr=new G,Sl=new G,es=new G;class He extends $t{constructor(e=new rn,t=new $n){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(e,t){const n=this.geometry,r=n.attributes.position,s=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(r,e);const a=this.morphTargetInfluences;if(s&&a){Qr.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const u=a[l],d=s[l];u!==0&&(vo.fromBufferAttribute(d,e),o?Qr.addScaledVector(vo,u):Qr.addScaledVector(vo.sub(t),u))}t.add(Qr)}return t}raycast(e,t){const n=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),jr.copy(n.boundingSphere),jr.applyMatrix4(s),gi.copy(e.ray).recast(e.near),!(jr.containsPoint(gi.origin)===!1&&(gi.intersectSphere(jr,Ml)===null||gi.origin.distanceToSquared(Ml)>(e.far-e.near)**2))&&(xl.copy(s).invert(),gi.copy(e.ray).applyMatrix4(xl),!(n.boundingBox!==null&&gi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,gi)))}_computeIntersections(e,t,n){let r;const s=this.geometry,o=this.material,a=s.index,l=s.attributes.position,c=s.attributes.uv,u=s.attributes.uv1,d=s.attributes.normal,f=s.groups,_=s.drawRange;if(a!==null)if(Array.isArray(o))for(let x=0,y=f.length;x<y;x++){const v=f[x],p=o[v.materialIndex],b=Math.max(v.start,_.start),C=Math.min(a.count,Math.min(v.start+v.count,_.start+_.count));for(let A=b,I=C;A<I;A+=3){const P=a.getX(A),L=a.getX(A+1),E=a.getX(A+2);r=ts(this,p,e,n,c,u,d,P,L,E),r&&(r.faceIndex=Math.floor(A/3),r.face.materialIndex=v.materialIndex,t.push(r))}}else{const x=Math.max(0,_.start),y=Math.min(a.count,_.start+_.count);for(let v=x,p=y;v<p;v+=3){const b=a.getX(v),C=a.getX(v+1),A=a.getX(v+2);r=ts(this,o,e,n,c,u,d,b,C,A),r&&(r.faceIndex=Math.floor(v/3),t.push(r))}}else if(l!==void 0)if(Array.isArray(o))for(let x=0,y=f.length;x<y;x++){const v=f[x],p=o[v.materialIndex],b=Math.max(v.start,_.start),C=Math.min(l.count,Math.min(v.start+v.count,_.start+_.count));for(let A=b,I=C;A<I;A+=3){const P=A,L=A+1,E=A+2;r=ts(this,p,e,n,c,u,d,P,L,E),r&&(r.faceIndex=Math.floor(A/3),r.face.materialIndex=v.materialIndex,t.push(r))}}else{const x=Math.max(0,_.start),y=Math.min(l.count,_.start+_.count);for(let v=x,p=y;v<p;v+=3){const b=v,C=v+1,A=v+2;r=ts(this,o,e,n,c,u,d,b,C,A),r&&(r.faceIndex=Math.floor(v/3),t.push(r))}}}}function du(i,e,t,n,r,s,o,a){let l;if(e.side===ln?l=n.intersectTriangle(o,s,r,!0,a):l=n.intersectTriangle(r,s,o,e.side===ui,a),l===null)return null;es.copy(a),es.applyMatrix4(i.matrixWorld);const c=t.ray.origin.distanceTo(es);return c<t.near||c>t.far?null:{distance:c,point:es.clone(),object:i}}function ts(i,e,t,n,r,s,o,a,l,c){i.getVertexPosition(a,Kr),i.getVertexPosition(l,Zr),i.getVertexPosition(c,Jr);const u=du(i,e,t,n,Kr,Zr,Jr,Sl);if(u){const d=new G;En.getBarycoord(Sl,Kr,Zr,Jr,d),r&&(u.uv=En.getInterpolatedAttribute(r,a,l,c,d,new ht)),s&&(u.uv1=En.getInterpolatedAttribute(s,a,l,c,d,new ht)),o&&(u.normal=En.getInterpolatedAttribute(o,a,l,c,d,new G),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));const f={a,b:l,c,normal:new G,materialIndex:0};En.getNormal(Kr,Zr,Jr,f.normal),u.face=f,u.barycoord=d}return u}class pu extends tn{constructor(e=null,t=1,n=1,r,s,o,a,l,c=jt,u=jt,d,f){super(null,o,a,l,c,u,r,s,d,f),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const xo=new G,mu=new G,gu=new nt;class yi{constructor(e=new G(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const r=xo.subVectors(n,t).cross(mu.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(xo),r=this.normal.dot(n);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:t.copy(e.start).addScaledVector(n,s)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||gu.getNormalMatrix(e),r=this.coplanarPoint(xo).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const _i=new Ls,_u=new ht(.5,.5),ns=new G;class Wa{constructor(e=new yi,t=new yi,n=new yi,r=new yi,s=new yi,o=new yi){this.planes=[e,t,n,r,s,o]}set(e,t,n,r,s,o){const a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(r),a[4].copy(s),a[5].copy(o),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Un,n=!1){const r=this.planes,s=e.elements,o=s[0],a=s[1],l=s[2],c=s[3],u=s[4],d=s[5],f=s[6],_=s[7],x=s[8],y=s[9],v=s[10],p=s[11],b=s[12],C=s[13],A=s[14],I=s[15];if(r[0].setComponents(c-o,_-u,p-x,I-b).normalize(),r[1].setComponents(c+o,_+u,p+x,I+b).normalize(),r[2].setComponents(c+a,_+d,p+y,I+C).normalize(),r[3].setComponents(c-a,_-d,p-y,I-C).normalize(),n)r[4].setComponents(l,f,v,A).normalize(),r[5].setComponents(c-l,_-f,p-v,I-A).normalize();else if(r[4].setComponents(c-l,_-f,p-v,I-A).normalize(),t===Un)r[5].setComponents(c+l,_+f,p+v,I+A).normalize();else if(t===Pr)r[5].setComponents(l,f,v,A).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),_i.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),_i.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(_i)}intersectsSprite(e){_i.center.set(0,0,0);const t=_u.distanceTo(e.center);return _i.radius=.7071067811865476+t,_i.applyMatrix4(e.matrixWorld),this.intersectsSphere(_i)}intersectsSphere(e){const t=this.planes,n=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const r=t[n];if(ns.x=r.normal.x>0?e.max.x:e.min.x,ns.y=r.normal.y>0?e.max.y:e.min.y,ns.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(ns)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Vc extends lr{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new mt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Ts=new G,bs=new G,yl=new Lt,gr=new Ga,is=new Ls,Mo=new G,El=new G;class vu extends $t{constructor(e=new rn,t=new Vc){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let r=1,s=t.count;r<s;r++)Ts.fromBufferAttribute(t,r-1),bs.fromBufferAttribute(t,r),n[r]=n[r-1],n[r]+=Ts.distanceTo(bs);e.setAttribute("lineDistance",new Bt(n,1))}else je("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,r=this.matrixWorld,s=e.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),is.copy(n.boundingSphere),is.applyMatrix4(r),is.radius+=s,e.ray.intersectsSphere(is)===!1)return;yl.copy(r).invert(),gr.copy(e.ray).applyMatrix4(yl);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=this.isLineSegments?2:1,u=n.index,f=n.attributes.position;if(u!==null){const _=Math.max(0,o.start),x=Math.min(u.count,o.start+o.count);for(let y=_,v=x-1;y<v;y+=c){const p=u.getX(y),b=u.getX(y+1),C=rs(this,e,gr,l,p,b,y);C&&t.push(C)}if(this.isLineLoop){const y=u.getX(x-1),v=u.getX(_),p=rs(this,e,gr,l,y,v,x-1);p&&t.push(p)}}else{const _=Math.max(0,o.start),x=Math.min(f.count,o.start+o.count);for(let y=_,v=x-1;y<v;y+=c){const p=rs(this,e,gr,l,y,y+1,y);p&&t.push(p)}if(this.isLineLoop){const y=rs(this,e,gr,l,x-1,_,x-1);y&&t.push(y)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}function rs(i,e,t,n,r,s,o){const a=i.geometry.attributes.position;if(Ts.fromBufferAttribute(a,r),bs.fromBufferAttribute(a,s),t.distanceSqToSegment(Ts,bs,Mo,El)>n)return;Mo.applyMatrix4(i.matrixWorld);const c=e.ray.origin.distanceTo(Mo);if(!(c<e.near||c>e.far))return{distance:c,point:El.clone().applyMatrix4(i.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:i}}class Gc extends tn{constructor(e=[],t=Ri,n,r,s,o,a,l,c,u){super(e,t,n,r,s,o,a,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Ea extends tn{constructor(e,t,n,r,s,o,a,l,c){super(e,t,n,r,s,o,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Ir extends tn{constructor(e,t,n=Bn,r,s,o,a=jt,l=jt,c,u=Zn,d=1){if(u!==Zn&&u!==Ai)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const f={width:e,height:t,depth:d};super(f,r,s,o,a,l,u,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Ha(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class xu extends Ir{constructor(e,t=Bn,n=Ri,r,s,o=jt,a=jt,l,c=Zn){const u={width:e,height:e,depth:1},d=[u,u,u,u,u,u];super(e,e,t,n,r,s,o,a,l,c),this.image=d,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class Wc extends tn{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class pt extends rn{constructor(e=1,t=1,n=1,r=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:s,depthSegments:o};const a=this;r=Math.floor(r),s=Math.floor(s),o=Math.floor(o);const l=[],c=[],u=[],d=[];let f=0,_=0;x("z","y","x",-1,-1,n,t,e,o,s,0),x("z","y","x",1,-1,n,t,-e,o,s,1),x("x","z","y",1,1,e,n,t,r,o,2),x("x","z","y",1,-1,e,n,-t,r,o,3),x("x","y","z",1,-1,e,t,n,r,s,4),x("x","y","z",-1,-1,e,t,-n,r,s,5),this.setIndex(l),this.setAttribute("position",new Bt(c,3)),this.setAttribute("normal",new Bt(u,3)),this.setAttribute("uv",new Bt(d,2));function x(y,v,p,b,C,A,I,P,L,E,w){const j=A/L,D=I/E,V=A/2,X=I/2,Y=P/2,$=L+1,q=E+1;let H=0,le=0;const ie=new G;for(let Ee=0;Ee<q;Ee++){const be=Ee*D-X;for(let we=0;we<$;we++){const Ze=we*j-V;ie[y]=Ze*b,ie[v]=be*C,ie[p]=Y,c.push(ie.x,ie.y,ie.z),ie[y]=0,ie[v]=0,ie[p]=P>0?1:-1,u.push(ie.x,ie.y,ie.z),d.push(we/L),d.push(1-Ee/E),H+=1}}for(let Ee=0;Ee<E;Ee++)for(let be=0;be<L;be++){const we=f+be+$*Ee,Ze=f+be+$*(Ee+1),Pt=f+(be+1)+$*(Ee+1),At=f+(be+1)+$*Ee;l.push(we,Ze,At),l.push(Ze,Pt,At),le+=6}a.addGroup(_,le,w),_+=le,f+=H}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new pt(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class ws extends rn{constructor(e=1,t=32,n=0,r=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:r},t=Math.max(3,t);const s=[],o=[],a=[],l=[],c=new G,u=new ht;o.push(0,0,0),a.push(0,0,1),l.push(.5,.5);for(let d=0,f=3;d<=t;d++,f+=3){const _=n+d/t*r;c.x=e*Math.cos(_),c.y=e*Math.sin(_),o.push(c.x,c.y,c.z),a.push(0,0,1),u.x=(o[f]/e+1)/2,u.y=(o[f+1]/e+1)/2,l.push(u.x,u.y)}for(let d=1;d<=t;d++)s.push(d,d+1,0);this.setIndex(s),this.setAttribute("position",new Bt(o,3)),this.setAttribute("normal",new Bt(a,3)),this.setAttribute("uv",new Bt(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ws(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class Xa extends rn{constructor(e=1,t=1,n=1,r=32,s=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:r,heightSegments:s,openEnded:o,thetaStart:a,thetaLength:l};const c=this;r=Math.floor(r),s=Math.floor(s);const u=[],d=[],f=[],_=[];let x=0;const y=[],v=n/2;let p=0;b(),o===!1&&(e>0&&C(!0),t>0&&C(!1)),this.setIndex(u),this.setAttribute("position",new Bt(d,3)),this.setAttribute("normal",new Bt(f,3)),this.setAttribute("uv",new Bt(_,2));function b(){const A=new G,I=new G;let P=0;const L=(t-e)/n;for(let E=0;E<=s;E++){const w=[],j=E/s,D=j*(t-e)+e;for(let V=0;V<=r;V++){const X=V/r,Y=X*l+a,$=Math.sin(Y),q=Math.cos(Y);I.x=D*$,I.y=-j*n+v,I.z=D*q,d.push(I.x,I.y,I.z),A.set($,L,q).normalize(),f.push(A.x,A.y,A.z),_.push(X,1-j),w.push(x++)}y.push(w)}for(let E=0;E<r;E++)for(let w=0;w<s;w++){const j=y[w][E],D=y[w+1][E],V=y[w+1][E+1],X=y[w][E+1];(e>0||w!==0)&&(u.push(j,D,X),P+=3),(t>0||w!==s-1)&&(u.push(D,V,X),P+=3)}c.addGroup(p,P,0),p+=P}function C(A){const I=x,P=new ht,L=new G;let E=0;const w=A===!0?e:t,j=A===!0?1:-1;for(let V=1;V<=r;V++)d.push(0,v*j,0),f.push(0,j,0),_.push(.5,.5),x++;const D=x;for(let V=0;V<=r;V++){const Y=V/r*l+a,$=Math.cos(Y),q=Math.sin(Y);L.x=w*q,L.y=v*j,L.z=w*$,d.push(L.x,L.y,L.z),f.push(0,j,0),P.x=$*.5+.5,P.y=q*.5*j+.5,_.push(P.x,P.y),x++}for(let V=0;V<r;V++){const X=I+V,Y=D+V;A===!0?u.push(Y,Y+1,X):u.push(Y+1,Y,X),E+=3}c.addGroup(p,E,A===!0?1:2),p+=E}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Xa(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class $a extends Xa{constructor(e=1,t=1,n=32,r=1,s=!1,o=0,a=Math.PI*2){super(0,e,t,n,r,s,o,a),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:r,openEnded:s,thetaStart:o,thetaLength:a}}static fromJSON(e){return new $a(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Or extends rn{constructor(e=1,t=1,n=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};const s=e/2,o=t/2,a=Math.floor(n),l=Math.floor(r),c=a+1,u=l+1,d=e/a,f=t/l,_=[],x=[],y=[],v=[];for(let p=0;p<u;p++){const b=p*f-o;for(let C=0;C<c;C++){const A=C*d-s;x.push(A,-b,0),y.push(0,0,1),v.push(C/a),v.push(1-p/l)}}for(let p=0;p<l;p++)for(let b=0;b<a;b++){const C=b+c*p,A=b+c*(p+1),I=b+1+c*(p+1),P=b+1+c*p;_.push(C,A,P),_.push(A,I,P)}this.setIndex(_),this.setAttribute("position",new Bt(x,3)),this.setAttribute("normal",new Bt(y,3)),this.setAttribute("uv",new Bt(v,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Or(e.width,e.height,e.widthSegments,e.heightSegments)}}class Ya extends rn{constructor(e=.5,t=1,n=32,r=1,s=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:r,thetaStart:s,thetaLength:o},n=Math.max(3,n),r=Math.max(1,r);const a=[],l=[],c=[],u=[];let d=e;const f=(t-e)/r,_=new G,x=new ht;for(let y=0;y<=r;y++){for(let v=0;v<=n;v++){const p=s+v/n*o;_.x=d*Math.cos(p),_.y=d*Math.sin(p),l.push(_.x,_.y,_.z),c.push(0,0,1),x.x=(_.x/t+1)/2,x.y=(_.y/t+1)/2,u.push(x.x,x.y)}d+=f}for(let y=0;y<r;y++){const v=y*(n+1);for(let p=0;p<n;p++){const b=p+v,C=b,A=b+n+1,I=b+n+2,P=b+1;a.push(C,A,P),a.push(A,I,P)}}this.setIndex(a),this.setAttribute("position",new Bt(l,3)),this.setAttribute("normal",new Bt(c,3)),this.setAttribute("uv",new Bt(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ya(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class li extends rn{constructor(e=1,t=32,n=16,r=0,s=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:r,phiLength:s,thetaStart:o,thetaLength:a},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const l=Math.min(o+a,Math.PI);let c=0;const u=[],d=new G,f=new G,_=[],x=[],y=[],v=[];for(let p=0;p<=n;p++){const b=[],C=p/n;let A=0;p===0&&o===0?A=.5/t:p===n&&l===Math.PI&&(A=-.5/t);for(let I=0;I<=t;I++){const P=I/t;d.x=-e*Math.cos(r+P*s)*Math.sin(o+C*a),d.y=e*Math.cos(o+C*a),d.z=e*Math.sin(r+P*s)*Math.sin(o+C*a),x.push(d.x,d.y,d.z),f.copy(d).normalize(),y.push(f.x,f.y,f.z),v.push(P+A,1-C),b.push(c++)}u.push(b)}for(let p=0;p<n;p++)for(let b=0;b<t;b++){const C=u[p][b+1],A=u[p][b],I=u[p+1][b],P=u[p+1][b+1];(p!==0||o>0)&&_.push(C,A,P),(p!==n-1||l<Math.PI)&&_.push(A,I,P)}this.setIndex(_),this.setAttribute("position",new Bt(x,3)),this.setAttribute("normal",new Bt(y,3)),this.setAttribute("uv",new Bt(v,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new li(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}function nr(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const r=i[t][n];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(je("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=r.clone():Array.isArray(r)?e[t][n]=r.slice():e[t][n]=r}}return e}function nn(i){const e={};for(let t=0;t<i.length;t++){const n=nr(i[t]);for(const r in n)e[r]=n[r]}return e}function Mu(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function Xc(i){const e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:xt.workingColorSpace}const Su={clone:nr,merge:nn};var yu=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Eu=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class zn extends lr{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=yu,this.fragmentShader=Eu,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=nr(e.uniforms),this.uniformsGroups=Mu(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const r in this.uniforms){const o=this.uniforms[r].value;o&&o.isTexture?t.uniforms[r]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[r]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[r]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[r]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[r]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[r]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[r]={type:"m4",value:o.toArray()}:t.uniforms[r]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const r in this.extensions)this.extensions[r]===!0&&(n[r]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class Tu extends zn{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class zt extends lr{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new mt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new mt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Nc,this.normalScale=new ht(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new kn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class bu extends lr{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Nh,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class wu extends lr{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class qa extends $t{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new mt(e),this.intensity=t}dispose(){this.dispatchEvent({type:"dispose"})}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}}class Au extends qa{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy($t.DEFAULT_UP),this.updateMatrix(),this.groundColor=new mt(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){const t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}}const So=new Lt,Tl=new G,bl=new G;class Ru{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ht(512,512),this.mapType=pn,this.map=null,this.mapPass=null,this.matrix=new Lt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Wa,this._frameExtents=new ht(1,1),this._viewportCount=1,this._viewports=[new Ft(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;Tl.setFromMatrixPosition(e.matrixWorld),t.position.copy(Tl),bl.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(bl),t.updateMatrixWorld(),So.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(So,t.coordinateSystem,t.reversedDepth),t.coordinateSystem===Pr||t.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(So)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const ss=new G,os=new ar,An=new G;class $c extends $t{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Lt,this.projectionMatrix=new Lt,this.projectionMatrixInverse=new Lt,this.coordinateSystem=Un,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(ss,os,An),An.x===1&&An.y===1&&An.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(ss,os,An.set(1,1,1)).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorld.decompose(ss,os,An),An.x===1&&An.y===1&&An.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(ss,os,An.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const si=new G,wl=new ht,Al=new ht;class gn extends $c{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=ya*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(js*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return ya*2*Math.atan(Math.tan(js*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){si.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(si.x,si.y).multiplyScalar(-e/si.z),si.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(si.x,si.y).multiplyScalar(-e/si.z)}getViewSize(e,t){return this.getViewBounds(e,wl,Al),t.subVectors(Al,wl)}setViewOffset(e,t,n,r,s,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(js*.5*this.fov)/this.zoom,n=2*t,r=this.aspect*n,s=-.5*r;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;s+=o.offsetX*r/l,t-=o.offsetY*n/c,r*=o.width/l,n*=o.height/c}const a=this.filmOffset;a!==0&&(s+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}class ja extends $c{constructor(e=-1,t=1,n=1,r=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=n-e,o=n+e,a=r+t,l=r-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,o=s+c*this.view.width,a-=u*this.view.offsetY,l=a-u*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class Cu extends Ru{constructor(){super(new ja(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Pu extends qa{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy($t.DEFAULT_UP),this.updateMatrix(),this.target=new $t,this.shadow=new Cu}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}}class Iu extends qa{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}const Xi=-90,$i=1;class Du extends $t{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new gn(Xi,$i,e,t);r.layers=this.layers,this.add(r);const s=new gn(Xi,$i,e,t);s.layers=this.layers,this.add(s);const o=new gn(Xi,$i,e,t);o.layers=this.layers,this.add(o);const a=new gn(Xi,$i,e,t);a.layers=this.layers,this.add(a);const l=new gn(Xi,$i,e,t);l.layers=this.layers,this.add(l);const c=new gn(Xi,$i,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,r,s,o,a,l]=t;for(const c of t)this.remove(c);if(e===Un)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Pr)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,o,a,l,c,u]=this.children,d=e.getRenderTarget(),f=e.getActiveCubeFace(),_=e.getActiveMipmapLevel(),x=e.xr.enabled;e.xr.enabled=!1;const y=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let v=!1;e.isWebGLRenderer===!0?v=e.state.buffers.depth.getReversed():v=e.reversedDepthBuffer,e.setRenderTarget(n,0,r),v&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(n,1,r),v&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,2,r),v&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,3,r),v&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(n,4,r),v&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),n.texture.generateMipmaps=y,e.setRenderTarget(n,5,r),v&&e.autoClear===!1&&e.clearDepth(),e.render(t,u),e.setRenderTarget(d,f,_),e.xr.enabled=x,n.texture.needsPMREMUpdate=!0}}class Lu extends gn{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}const Rl=new Lt;class Uu{constructor(e,t,n=0,r=1/0){this.ray=new Ga(e,t),this.near=n,this.far=r,this.camera=null,this.layers=new Va,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):vt("Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return Rl.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Rl),this}intersectObject(e,t=!0,n=[]){return Ta(e,this,n,t),n.sort(Cl),n}intersectObjects(e,t=!0,n=[]){for(let r=0,s=e.length;r<s;r++)Ta(e[r],this,n,t);return n.sort(Cl),n}}function Cl(i,e){return i.distance-e.distance}function Ta(i,e,t,n){let r=!0;if(i.layers.test(e.layers)&&i.raycast(e,t)===!1&&(r=!1),r===!0&&n===!0){const s=i.children;for(let o=0,a=s.length;o<a;o++)Ta(s[o],e,t,!0)}}function Pl(i,e,t,n){const r=Ou(n);switch(t){case Lc:return i*e;case Oc:return i*e/r.components*r.byteLength;case Na:return i*e/r.components*r.byteLength;case er:return i*e*2/r.components*r.byteLength;case Fa:return i*e*2/r.components*r.byteLength;case Uc:return i*e*3/r.components*r.byteLength;case Tn:return i*e*4/r.components*r.byteLength;case Ba:return i*e*4/r.components*r.byteLength;case ds:case ps:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case ms:case gs:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Xo:case Yo:return Math.max(i,16)*Math.max(e,8)/4;case Wo:case $o:return Math.max(i,8)*Math.max(e,8)/2;case qo:case jo:case Zo:case Jo:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Ko:case Qo:case ea:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case ta:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case na:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case ia:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case ra:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case sa:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case oa:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case aa:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case la:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case ca:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case ha:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case ua:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case fa:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case da:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case pa:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case ma:case ga:case _a:return Math.ceil(i/4)*Math.ceil(e/4)*16;case va:case xa:return Math.ceil(i/4)*Math.ceil(e/4)*8;case Ma:case Sa:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Ou(i){switch(i){case pn:case Cc:return{byteLength:1,components:1};case Rr:case Pc:case Kn:return{byteLength:2,components:1};case Ua:case Oa:return{byteLength:2,components:4};case Bn:case La:case Ln:return{byteLength:4,components:1};case Ic:case Dc:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Ia}}));typeof window<"u"&&(window.__THREE__?je("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Ia);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function Yc(){let i=null,e=!1,t=null,n=null;function r(s,o){t(s,o),n=i.requestAnimationFrame(r)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(r),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){i=s}}}function Nu(i){const e=new WeakMap;function t(a,l){const c=a.array,u=a.usage,d=c.byteLength,f=i.createBuffer();i.bindBuffer(l,f),i.bufferData(l,c,u),a.onUploadCallback();let _;if(c instanceof Float32Array)_=i.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)_=i.HALF_FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?_=i.HALF_FLOAT:_=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)_=i.SHORT;else if(c instanceof Uint32Array)_=i.UNSIGNED_INT;else if(c instanceof Int32Array)_=i.INT;else if(c instanceof Int8Array)_=i.BYTE;else if(c instanceof Uint8Array)_=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)_=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:f,type:_,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:d}}function n(a,l,c){const u=l.array,d=l.updateRanges;if(i.bindBuffer(c,a),d.length===0)i.bufferSubData(c,0,u);else{d.sort((_,x)=>_.start-x.start);let f=0;for(let _=1;_<d.length;_++){const x=d[f],y=d[_];y.start<=x.start+x.count+1?x.count=Math.max(x.count,y.start+y.count-x.start):(++f,d[f]=y)}d.length=f+1;for(let _=0,x=d.length;_<x;_++){const y=d[_];i.bufferSubData(c,y.start*u.BYTES_PER_ELEMENT,u,y.start,y.count)}l.clearUpdateRanges()}l.onUploadCallback()}function r(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function s(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=e.get(a);l&&(i.deleteBuffer(l.buffer),e.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const u=e.get(a);(!u||u.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const c=e.get(a);if(c===void 0)e.set(a,t(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,a,l),c.version=a.version}}return{get:r,remove:s,update:o}}var Fu=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Bu=`#ifdef USE_ALPHAHASH
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
#endif`,ku=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,zu=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Hu=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Vu=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Gu=`#ifdef USE_AOMAP
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
#endif`,Wu=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Xu=`#ifdef USE_BATCHING
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
#endif`,$u=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Yu=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,qu=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,ju=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Ku=`#ifdef USE_IRIDESCENCE
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
#endif`,Zu=`#ifdef USE_BUMPMAP
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
#endif`,Ju=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Qu=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,ef=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,tf=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,nf=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,rf=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,sf=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,of=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,af=`#define PI 3.141592653589793
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
} // validated`,lf=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,cf=`vec3 transformedNormal = objectNormal;
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
#endif`,hf=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,uf=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,ff=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,df=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,pf="gl_FragColor = linearToOutputTexel( gl_FragColor );",mf=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,gf=`#ifdef USE_ENVMAP
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
#endif`,_f=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,vf=`#ifdef USE_ENVMAP
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
#endif`,xf=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Mf=`#ifdef USE_ENVMAP
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
#endif`,Sf=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,yf=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Ef=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Tf=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,bf=`#ifdef USE_GRADIENTMAP
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
}`,wf=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Af=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Rf=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Cf=`uniform bool receiveShadow;
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
#endif`,Pf=`#ifdef USE_ENVMAP
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
#endif`,If=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Df=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Lf=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Uf=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Of=`PhysicalMaterial material;
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
#endif`,Nf=`uniform sampler2D dfgLUT;
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
}`,Ff=`
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
#endif`,Bf=`#if defined( RE_IndirectDiffuse )
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
#endif`,kf=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,zf=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Hf=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Vf=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Gf=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Wf=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Xf=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,$f=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Yf=`#if defined( USE_POINTS_UV )
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
#endif`,qf=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,jf=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Kf=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Zf=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Jf=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Qf=`#ifdef USE_MORPHTARGETS
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
#endif`,ed=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,td=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,nd=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,id=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,rd=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,sd=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,od=`#ifdef USE_NORMALMAP
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
#endif`,ad=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,ld=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,cd=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,hd=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,ud=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,fd=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,dd=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,pd=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,md=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,gd=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,_d=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,vd=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,xd=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Md=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Sd=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,yd=`float getShadowMask() {
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
}`,Ed=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Td=`#ifdef USE_SKINNING
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
#endif`,bd=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,wd=`#ifdef USE_SKINNING
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
#endif`,Ad=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Rd=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Cd=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Pd=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Id=`#ifdef USE_TRANSMISSION
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
#endif`,Dd=`#ifdef USE_TRANSMISSION
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
#endif`,Ld=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Ud=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Od=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Nd=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Fd=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Bd=`uniform sampler2D t2D;
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
}`,kd=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,zd=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Hd=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Vd=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Gd=`#include <common>
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
}`,Wd=`#if DEPTH_PACKING == 3200
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
}`,Xd=`#define DISTANCE
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
}`,$d=`#define DISTANCE
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
}`,Yd=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,qd=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,jd=`uniform float scale;
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
}`,Kd=`uniform vec3 diffuse;
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
}`,Zd=`#include <common>
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
}`,Jd=`uniform vec3 diffuse;
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
}`,Qd=`#define LAMBERT
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
}`,ep=`#define LAMBERT
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
}`,tp=`#define MATCAP
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
}`,np=`#define MATCAP
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
}`,ip=`#define NORMAL
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
}`,rp=`#define NORMAL
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
}`,sp=`#define PHONG
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
}`,op=`#define PHONG
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
}`,ap=`#define STANDARD
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
}`,lp=`#define STANDARD
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
}`,cp=`#define TOON
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
}`,hp=`#define TOON
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
}`,up=`uniform float size;
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
}`,fp=`uniform vec3 diffuse;
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
}`,dp=`#include <common>
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
}`,pp=`uniform vec3 color;
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
}`,mp=`uniform float rotation;
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
}`,gp=`uniform vec3 diffuse;
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
}`,ot={alphahash_fragment:Fu,alphahash_pars_fragment:Bu,alphamap_fragment:ku,alphamap_pars_fragment:zu,alphatest_fragment:Hu,alphatest_pars_fragment:Vu,aomap_fragment:Gu,aomap_pars_fragment:Wu,batching_pars_vertex:Xu,batching_vertex:$u,begin_vertex:Yu,beginnormal_vertex:qu,bsdfs:ju,iridescence_fragment:Ku,bumpmap_pars_fragment:Zu,clipping_planes_fragment:Ju,clipping_planes_pars_fragment:Qu,clipping_planes_pars_vertex:ef,clipping_planes_vertex:tf,color_fragment:nf,color_pars_fragment:rf,color_pars_vertex:sf,color_vertex:of,common:af,cube_uv_reflection_fragment:lf,defaultnormal_vertex:cf,displacementmap_pars_vertex:hf,displacementmap_vertex:uf,emissivemap_fragment:ff,emissivemap_pars_fragment:df,colorspace_fragment:pf,colorspace_pars_fragment:mf,envmap_fragment:gf,envmap_common_pars_fragment:_f,envmap_pars_fragment:vf,envmap_pars_vertex:xf,envmap_physical_pars_fragment:Pf,envmap_vertex:Mf,fog_vertex:Sf,fog_pars_vertex:yf,fog_fragment:Ef,fog_pars_fragment:Tf,gradientmap_pars_fragment:bf,lightmap_pars_fragment:wf,lights_lambert_fragment:Af,lights_lambert_pars_fragment:Rf,lights_pars_begin:Cf,lights_toon_fragment:If,lights_toon_pars_fragment:Df,lights_phong_fragment:Lf,lights_phong_pars_fragment:Uf,lights_physical_fragment:Of,lights_physical_pars_fragment:Nf,lights_fragment_begin:Ff,lights_fragment_maps:Bf,lights_fragment_end:kf,logdepthbuf_fragment:zf,logdepthbuf_pars_fragment:Hf,logdepthbuf_pars_vertex:Vf,logdepthbuf_vertex:Gf,map_fragment:Wf,map_pars_fragment:Xf,map_particle_fragment:$f,map_particle_pars_fragment:Yf,metalnessmap_fragment:qf,metalnessmap_pars_fragment:jf,morphinstance_vertex:Kf,morphcolor_vertex:Zf,morphnormal_vertex:Jf,morphtarget_pars_vertex:Qf,morphtarget_vertex:ed,normal_fragment_begin:td,normal_fragment_maps:nd,normal_pars_fragment:id,normal_pars_vertex:rd,normal_vertex:sd,normalmap_pars_fragment:od,clearcoat_normal_fragment_begin:ad,clearcoat_normal_fragment_maps:ld,clearcoat_pars_fragment:cd,iridescence_pars_fragment:hd,opaque_fragment:ud,packing:fd,premultiplied_alpha_fragment:dd,project_vertex:pd,dithering_fragment:md,dithering_pars_fragment:gd,roughnessmap_fragment:_d,roughnessmap_pars_fragment:vd,shadowmap_pars_fragment:xd,shadowmap_pars_vertex:Md,shadowmap_vertex:Sd,shadowmask_pars_fragment:yd,skinbase_vertex:Ed,skinning_pars_vertex:Td,skinning_vertex:bd,skinnormal_vertex:wd,specularmap_fragment:Ad,specularmap_pars_fragment:Rd,tonemapping_fragment:Cd,tonemapping_pars_fragment:Pd,transmission_fragment:Id,transmission_pars_fragment:Dd,uv_pars_fragment:Ld,uv_pars_vertex:Ud,uv_vertex:Od,worldpos_vertex:Nd,background_vert:Fd,background_frag:Bd,backgroundCube_vert:kd,backgroundCube_frag:zd,cube_vert:Hd,cube_frag:Vd,depth_vert:Gd,depth_frag:Wd,distance_vert:Xd,distance_frag:$d,equirect_vert:Yd,equirect_frag:qd,linedashed_vert:jd,linedashed_frag:Kd,meshbasic_vert:Zd,meshbasic_frag:Jd,meshlambert_vert:Qd,meshlambert_frag:ep,meshmatcap_vert:tp,meshmatcap_frag:np,meshnormal_vert:ip,meshnormal_frag:rp,meshphong_vert:sp,meshphong_frag:op,meshphysical_vert:ap,meshphysical_frag:lp,meshtoon_vert:cp,meshtoon_frag:hp,points_vert:up,points_frag:fp,shadow_vert:dp,shadow_frag:pp,sprite_vert:mp,sprite_frag:gp},ye={common:{diffuse:{value:new mt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new nt},alphaMap:{value:null},alphaMapTransform:{value:new nt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new nt}},envmap:{envMap:{value:null},envMapRotation:{value:new nt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new nt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new nt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new nt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new nt},normalScale:{value:new ht(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new nt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new nt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new nt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new nt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new mt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new mt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new nt},alphaTest:{value:0},uvTransform:{value:new nt}},sprite:{diffuse:{value:new mt(16777215)},opacity:{value:1},center:{value:new ht(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new nt},alphaMap:{value:null},alphaMapTransform:{value:new nt},alphaTest:{value:0}}},Pn={basic:{uniforms:nn([ye.common,ye.specularmap,ye.envmap,ye.aomap,ye.lightmap,ye.fog]),vertexShader:ot.meshbasic_vert,fragmentShader:ot.meshbasic_frag},lambert:{uniforms:nn([ye.common,ye.specularmap,ye.envmap,ye.aomap,ye.lightmap,ye.emissivemap,ye.bumpmap,ye.normalmap,ye.displacementmap,ye.fog,ye.lights,{emissive:{value:new mt(0)},envMapIntensity:{value:1}}]),vertexShader:ot.meshlambert_vert,fragmentShader:ot.meshlambert_frag},phong:{uniforms:nn([ye.common,ye.specularmap,ye.envmap,ye.aomap,ye.lightmap,ye.emissivemap,ye.bumpmap,ye.normalmap,ye.displacementmap,ye.fog,ye.lights,{emissive:{value:new mt(0)},specular:{value:new mt(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:ot.meshphong_vert,fragmentShader:ot.meshphong_frag},standard:{uniforms:nn([ye.common,ye.envmap,ye.aomap,ye.lightmap,ye.emissivemap,ye.bumpmap,ye.normalmap,ye.displacementmap,ye.roughnessmap,ye.metalnessmap,ye.fog,ye.lights,{emissive:{value:new mt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ot.meshphysical_vert,fragmentShader:ot.meshphysical_frag},toon:{uniforms:nn([ye.common,ye.aomap,ye.lightmap,ye.emissivemap,ye.bumpmap,ye.normalmap,ye.displacementmap,ye.gradientmap,ye.fog,ye.lights,{emissive:{value:new mt(0)}}]),vertexShader:ot.meshtoon_vert,fragmentShader:ot.meshtoon_frag},matcap:{uniforms:nn([ye.common,ye.bumpmap,ye.normalmap,ye.displacementmap,ye.fog,{matcap:{value:null}}]),vertexShader:ot.meshmatcap_vert,fragmentShader:ot.meshmatcap_frag},points:{uniforms:nn([ye.points,ye.fog]),vertexShader:ot.points_vert,fragmentShader:ot.points_frag},dashed:{uniforms:nn([ye.common,ye.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ot.linedashed_vert,fragmentShader:ot.linedashed_frag},depth:{uniforms:nn([ye.common,ye.displacementmap]),vertexShader:ot.depth_vert,fragmentShader:ot.depth_frag},normal:{uniforms:nn([ye.common,ye.bumpmap,ye.normalmap,ye.displacementmap,{opacity:{value:1}}]),vertexShader:ot.meshnormal_vert,fragmentShader:ot.meshnormal_frag},sprite:{uniforms:nn([ye.sprite,ye.fog]),vertexShader:ot.sprite_vert,fragmentShader:ot.sprite_frag},background:{uniforms:{uvTransform:{value:new nt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ot.background_vert,fragmentShader:ot.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new nt}},vertexShader:ot.backgroundCube_vert,fragmentShader:ot.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ot.cube_vert,fragmentShader:ot.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ot.equirect_vert,fragmentShader:ot.equirect_frag},distance:{uniforms:nn([ye.common,ye.displacementmap,{referencePosition:{value:new G},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ot.distance_vert,fragmentShader:ot.distance_frag},shadow:{uniforms:nn([ye.lights,ye.fog,{color:{value:new mt(0)},opacity:{value:1}}]),vertexShader:ot.shadow_vert,fragmentShader:ot.shadow_frag}};Pn.physical={uniforms:nn([Pn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new nt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new nt},clearcoatNormalScale:{value:new ht(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new nt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new nt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new nt},sheen:{value:0},sheenColor:{value:new mt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new nt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new nt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new nt},transmissionSamplerSize:{value:new ht},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new nt},attenuationDistance:{value:0},attenuationColor:{value:new mt(0)},specularColor:{value:new mt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new nt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new nt},anisotropyVector:{value:new ht},anisotropyMap:{value:null},anisotropyMapTransform:{value:new nt}}]),vertexShader:ot.meshphysical_vert,fragmentShader:ot.meshphysical_frag};const as={r:0,b:0,g:0},vi=new kn,_p=new Lt;function vp(i,e,t,n,r,s){const o=new mt(0);let a=r===!0?0:1,l,c,u=null,d=0,f=null;function _(b){let C=b.isScene===!0?b.background:null;if(C&&C.isTexture){const A=b.backgroundBlurriness>0;C=e.get(C,A)}return C}function x(b){let C=!1;const A=_(b);A===null?v(o,a):A&&A.isColor&&(v(A,1),C=!0);const I=i.xr.getEnvironmentBlendMode();I==="additive"?t.buffers.color.setClear(0,0,0,1,s):I==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,s),(i.autoClear||C)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function y(b,C){const A=_(C);A&&(A.isCubeTexture||A.mapping===Ds)?(c===void 0&&(c=new He(new pt(1,1,1),new zn({name:"BackgroundCubeMaterial",uniforms:nr(Pn.backgroundCube.uniforms),vertexShader:Pn.backgroundCube.vertexShader,fragmentShader:Pn.backgroundCube.fragmentShader,side:ln,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(I,P,L){this.matrixWorld.copyPosition(L.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(c)),vi.copy(C.backgroundRotation),vi.x*=-1,vi.y*=-1,vi.z*=-1,A.isCubeTexture&&A.isRenderTargetTexture===!1&&(vi.y*=-1,vi.z*=-1),c.material.uniforms.envMap.value=A,c.material.uniforms.flipEnvMap.value=A.isCubeTexture&&A.isRenderTargetTexture===!1?-1:1,c.material.uniforms.backgroundBlurriness.value=C.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=C.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(_p.makeRotationFromEuler(vi)),c.material.toneMapped=xt.getTransfer(A.colorSpace)!==Et,(u!==A||d!==A.version||f!==i.toneMapping)&&(c.material.needsUpdate=!0,u=A,d=A.version,f=i.toneMapping),c.layers.enableAll(),b.unshift(c,c.geometry,c.material,0,0,null)):A&&A.isTexture&&(l===void 0&&(l=new He(new Or(2,2),new zn({name:"BackgroundMaterial",uniforms:nr(Pn.background.uniforms),vertexShader:Pn.background.vertexShader,fragmentShader:Pn.background.fragmentShader,side:ui,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(l)),l.material.uniforms.t2D.value=A,l.material.uniforms.backgroundIntensity.value=C.backgroundIntensity,l.material.toneMapped=xt.getTransfer(A.colorSpace)!==Et,A.matrixAutoUpdate===!0&&A.updateMatrix(),l.material.uniforms.uvTransform.value.copy(A.matrix),(u!==A||d!==A.version||f!==i.toneMapping)&&(l.material.needsUpdate=!0,u=A,d=A.version,f=i.toneMapping),l.layers.enableAll(),b.unshift(l,l.geometry,l.material,0,0,null))}function v(b,C){b.getRGB(as,Xc(i)),t.buffers.color.setClear(as.r,as.g,as.b,C,s)}function p(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return o},setClearColor:function(b,C=1){o.set(b),a=C,v(o,a)},getClearAlpha:function(){return a},setClearAlpha:function(b){a=b,v(o,a)},render:x,addToRenderList:y,dispose:p}}function xp(i,e){const t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},r=f(null);let s=r,o=!1;function a(D,V,X,Y,$){let q=!1;const H=d(D,Y,X,V);s!==H&&(s=H,c(s.object)),q=_(D,Y,X,$),q&&x(D,Y,X,$),$!==null&&e.update($,i.ELEMENT_ARRAY_BUFFER),(q||o)&&(o=!1,A(D,V,X,Y),$!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get($).buffer))}function l(){return i.createVertexArray()}function c(D){return i.bindVertexArray(D)}function u(D){return i.deleteVertexArray(D)}function d(D,V,X,Y){const $=Y.wireframe===!0;let q=n[V.id];q===void 0&&(q={},n[V.id]=q);const H=D.isInstancedMesh===!0?D.id:0;let le=q[H];le===void 0&&(le={},q[H]=le);let ie=le[X.id];ie===void 0&&(ie={},le[X.id]=ie);let Ee=ie[$];return Ee===void 0&&(Ee=f(l()),ie[$]=Ee),Ee}function f(D){const V=[],X=[],Y=[];for(let $=0;$<t;$++)V[$]=0,X[$]=0,Y[$]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:V,enabledAttributes:X,attributeDivisors:Y,object:D,attributes:{},index:null}}function _(D,V,X,Y){const $=s.attributes,q=V.attributes;let H=0;const le=X.getAttributes();for(const ie in le)if(le[ie].location>=0){const be=$[ie];let we=q[ie];if(we===void 0&&(ie==="instanceMatrix"&&D.instanceMatrix&&(we=D.instanceMatrix),ie==="instanceColor"&&D.instanceColor&&(we=D.instanceColor)),be===void 0||be.attribute!==we||we&&be.data!==we.data)return!0;H++}return s.attributesNum!==H||s.index!==Y}function x(D,V,X,Y){const $={},q=V.attributes;let H=0;const le=X.getAttributes();for(const ie in le)if(le[ie].location>=0){let be=q[ie];be===void 0&&(ie==="instanceMatrix"&&D.instanceMatrix&&(be=D.instanceMatrix),ie==="instanceColor"&&D.instanceColor&&(be=D.instanceColor));const we={};we.attribute=be,be&&be.data&&(we.data=be.data),$[ie]=we,H++}s.attributes=$,s.attributesNum=H,s.index=Y}function y(){const D=s.newAttributes;for(let V=0,X=D.length;V<X;V++)D[V]=0}function v(D){p(D,0)}function p(D,V){const X=s.newAttributes,Y=s.enabledAttributes,$=s.attributeDivisors;X[D]=1,Y[D]===0&&(i.enableVertexAttribArray(D),Y[D]=1),$[D]!==V&&(i.vertexAttribDivisor(D,V),$[D]=V)}function b(){const D=s.newAttributes,V=s.enabledAttributes;for(let X=0,Y=V.length;X<Y;X++)V[X]!==D[X]&&(i.disableVertexAttribArray(X),V[X]=0)}function C(D,V,X,Y,$,q,H){H===!0?i.vertexAttribIPointer(D,V,X,$,q):i.vertexAttribPointer(D,V,X,Y,$,q)}function A(D,V,X,Y){y();const $=Y.attributes,q=X.getAttributes(),H=V.defaultAttributeValues;for(const le in q){const ie=q[le];if(ie.location>=0){let Ee=$[le];if(Ee===void 0&&(le==="instanceMatrix"&&D.instanceMatrix&&(Ee=D.instanceMatrix),le==="instanceColor"&&D.instanceColor&&(Ee=D.instanceColor)),Ee!==void 0){const be=Ee.normalized,we=Ee.itemSize,Ze=e.get(Ee);if(Ze===void 0)continue;const Pt=Ze.buffer,At=Ze.type,Q=Ze.bytesPerElement,me=At===i.INT||At===i.UNSIGNED_INT||Ee.gpuType===La;if(Ee.isInterleavedBufferAttribute){const ge=Ee.data,Ke=ge.stride,ze=Ee.offset;if(ge.isInstancedInterleavedBuffer){for(let Xe=0;Xe<ie.locationSize;Xe++)p(ie.location+Xe,ge.meshPerAttribute);D.isInstancedMesh!==!0&&Y._maxInstanceCount===void 0&&(Y._maxInstanceCount=ge.meshPerAttribute*ge.count)}else for(let Xe=0;Xe<ie.locationSize;Xe++)v(ie.location+Xe);i.bindBuffer(i.ARRAY_BUFFER,Pt);for(let Xe=0;Xe<ie.locationSize;Xe++)C(ie.location+Xe,we/ie.locationSize,At,be,Ke*Q,(ze+we/ie.locationSize*Xe)*Q,me)}else{if(Ee.isInstancedBufferAttribute){for(let ge=0;ge<ie.locationSize;ge++)p(ie.location+ge,Ee.meshPerAttribute);D.isInstancedMesh!==!0&&Y._maxInstanceCount===void 0&&(Y._maxInstanceCount=Ee.meshPerAttribute*Ee.count)}else for(let ge=0;ge<ie.locationSize;ge++)v(ie.location+ge);i.bindBuffer(i.ARRAY_BUFFER,Pt);for(let ge=0;ge<ie.locationSize;ge++)C(ie.location+ge,we/ie.locationSize,At,be,we*Q,we/ie.locationSize*ge*Q,me)}}else if(H!==void 0){const be=H[le];if(be!==void 0)switch(be.length){case 2:i.vertexAttrib2fv(ie.location,be);break;case 3:i.vertexAttrib3fv(ie.location,be);break;case 4:i.vertexAttrib4fv(ie.location,be);break;default:i.vertexAttrib1fv(ie.location,be)}}}}b()}function I(){w();for(const D in n){const V=n[D];for(const X in V){const Y=V[X];for(const $ in Y){const q=Y[$];for(const H in q)u(q[H].object),delete q[H];delete Y[$]}}delete n[D]}}function P(D){if(n[D.id]===void 0)return;const V=n[D.id];for(const X in V){const Y=V[X];for(const $ in Y){const q=Y[$];for(const H in q)u(q[H].object),delete q[H];delete Y[$]}}delete n[D.id]}function L(D){for(const V in n){const X=n[V];for(const Y in X){const $=X[Y];if($[D.id]===void 0)continue;const q=$[D.id];for(const H in q)u(q[H].object),delete q[H];delete $[D.id]}}}function E(D){for(const V in n){const X=n[V],Y=D.isInstancedMesh===!0?D.id:0,$=X[Y];if($!==void 0){for(const q in $){const H=$[q];for(const le in H)u(H[le].object),delete H[le];delete $[q]}delete X[Y],Object.keys(X).length===0&&delete n[V]}}}function w(){j(),o=!0,s!==r&&(s=r,c(s.object))}function j(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:a,reset:w,resetDefaultState:j,dispose:I,releaseStatesOfGeometry:P,releaseStatesOfObject:E,releaseStatesOfProgram:L,initAttributes:y,enableAttribute:v,disableUnusedAttributes:b}}function Mp(i,e,t){let n;function r(c){n=c}function s(c,u){i.drawArrays(n,c,u),t.update(u,n,1)}function o(c,u,d){d!==0&&(i.drawArraysInstanced(n,c,u,d),t.update(u,n,d))}function a(c,u,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,u,0,d);let _=0;for(let x=0;x<d;x++)_+=u[x];t.update(_,n,1)}function l(c,u,d,f){if(d===0)return;const _=e.get("WEBGL_multi_draw");if(_===null)for(let x=0;x<c.length;x++)o(c[x],u[x],f[x]);else{_.multiDrawArraysInstancedWEBGL(n,c,0,u,0,f,0,d);let x=0;for(let y=0;y<d;y++)x+=u[y]*f[y];t.update(x,n,1)}}this.setMode=r,this.render=s,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function Sp(i,e,t,n){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){const L=e.get("EXT_texture_filter_anisotropic");r=i.getParameter(L.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function o(L){return!(L!==Tn&&n.convert(L)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(L){const E=L===Kn&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(L!==pn&&n.convert(L)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&L!==Ln&&!E)}function l(L){if(L==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";L="mediump"}return L==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const u=l(c);u!==c&&(je("WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);const d=t.logarithmicDepthBuffer===!0,f=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),_=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),x=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),y=i.getParameter(i.MAX_TEXTURE_SIZE),v=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),b=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),C=i.getParameter(i.MAX_VARYING_VECTORS),A=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),I=i.getParameter(i.MAX_SAMPLES),P=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:d,reversedDepthBuffer:f,maxTextures:_,maxVertexTextures:x,maxTextureSize:y,maxCubemapSize:v,maxAttributes:p,maxVertexUniforms:b,maxVaryings:C,maxFragmentUniforms:A,maxSamples:I,samples:P}}function yp(i){const e=this;let t=null,n=0,r=!1,s=!1;const o=new yi,a=new nt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,f){const _=d.length!==0||f||n!==0||r;return r=f,n=d.length,_},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(d,f){t=u(d,f,0)},this.setState=function(d,f,_){const x=d.clippingPlanes,y=d.clipIntersection,v=d.clipShadows,p=i.get(d);if(!r||x===null||x.length===0||s&&!v)s?u(null):c();else{const b=s?0:n,C=b*4;let A=p.clippingState||null;l.value=A,A=u(x,f,C,_);for(let I=0;I!==C;++I)A[I]=t[I];p.clippingState=A,this.numIntersection=y?this.numPlanes:0,this.numPlanes+=b}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function u(d,f,_,x){const y=d!==null?d.length:0;let v=null;if(y!==0){if(v=l.value,x!==!0||v===null){const p=_+y*4,b=f.matrixWorldInverse;a.getNormalMatrix(b),(v===null||v.length<p)&&(v=new Float32Array(p));for(let C=0,A=_;C!==y;++C,A+=4)o.copy(d[C]).applyMatrix4(b,a),o.normal.toArray(v,A),v[A+3]=o.constant}l.value=v,l.needsUpdate=!0}return e.numPlanes=y,e.numIntersection=0,v}}const ci=4,Il=[.125,.215,.35,.446,.526,.582],Ti=20,Ep=256,_r=new ja,Dl=new mt;let yo=null,Eo=0,To=0,bo=!1;const Tp=new G;class Ll{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,r=100,s={}){const{size:o=256,position:a=Tp}=s;yo=this._renderer.getRenderTarget(),Eo=this._renderer.getActiveCubeFace(),To=this._renderer.getActiveMipmapLevel(),bo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,n,r,l,a),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Nl(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Ol(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(yo,Eo,To),this._renderer.xr.enabled=bo,e.scissorTest=!1,Yi(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Ri||e.mapping===Qi?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),yo=this._renderer.getRenderTarget(),Eo=this._renderer.getActiveCubeFace(),To=this._renderer.getActiveMipmapLevel(),bo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Xt,minFilter:Xt,generateMipmaps:!1,type:Kn,format:Tn,colorSpace:tr,depthBuffer:!1},r=Ul(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Ul(e,t,n);const{_lodMax:s}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=bp(s)),this._blurMaterial=Ap(s,e,t),this._ggxMaterial=wp(s,e,t)}return r}_compileMaterial(e){const t=new He(new rn,e);this._renderer.compile(t,_r)}_sceneToCubeUV(e,t,n,r,s){const l=new gn(90,1,t,n),c=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],d=this._renderer,f=d.autoClear,_=d.toneMapping;d.getClearColor(Dl),d.toneMapping=On,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(r),d.clearDepth(),d.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new He(new pt,new $n({name:"PMREM.Background",side:ln,depthWrite:!1,depthTest:!1})));const y=this._backgroundBox,v=y.material;let p=!1;const b=e.background;b?b.isColor&&(v.color.copy(b),e.background=null,p=!0):(v.color.copy(Dl),p=!0);for(let C=0;C<6;C++){const A=C%3;A===0?(l.up.set(0,c[C],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x+u[C],s.y,s.z)):A===1?(l.up.set(0,0,c[C]),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y+u[C],s.z)):(l.up.set(0,c[C],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y,s.z+u[C]));const I=this._cubeSize;Yi(r,A*I,C>2?I:0,I,I),d.setRenderTarget(r),p&&d.render(y,l),d.render(e,l)}d.toneMapping=_,d.autoClear=f,e.background=b}_textureToCubeUV(e,t){const n=this._renderer,r=e.mapping===Ri||e.mapping===Qi;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Nl()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Ol());const s=r?this._cubemapMaterial:this._equirectMaterial,o=this._lodMeshes[0];o.material=s;const a=s.uniforms;a.envMap.value=e;const l=this._cubeSize;Yi(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(o,_r)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const r=this._lodMeshes.length;for(let s=1;s<r;s++)this._applyGGXFilter(e,s-1,s);t.autoClear=n}_applyGGXFilter(e,t,n){const r=this._renderer,s=this._pingPongRenderTarget,o=this._ggxMaterial,a=this._lodMeshes[n];a.material=o;const l=o.uniforms,c=n/(this._lodMeshes.length-1),u=t/(this._lodMeshes.length-1),d=Math.sqrt(c*c-u*u),f=0+c*1.25,_=d*f,{_lodMax:x}=this,y=this._sizeLods[n],v=3*y*(n>x-ci?n-x+ci:0),p=4*(this._cubeSize-y);l.envMap.value=e.texture,l.roughness.value=_,l.mipInt.value=x-t,Yi(s,v,p,3*y,2*y),r.setRenderTarget(s),r.render(a,_r),l.envMap.value=s.texture,l.roughness.value=0,l.mipInt.value=x-n,Yi(e,v,p,3*y,2*y),r.setRenderTarget(e),r.render(a,_r)}_blur(e,t,n,r,s){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,n,r,"latitudinal",s),this._halfBlur(o,e,n,n,r,"longitudinal",s)}_halfBlur(e,t,n,r,s,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&vt("blur direction must be either latitudinal or longitudinal!");const u=3,d=this._lodMeshes[r];d.material=c;const f=c.uniforms,_=this._sizeLods[n]-1,x=isFinite(s)?Math.PI/(2*_):2*Math.PI/(2*Ti-1),y=s/x,v=isFinite(s)?1+Math.floor(u*y):Ti;v>Ti&&je(`sigmaRadians, ${s}, is too large and will clip, as it requested ${v} samples when the maximum is set to ${Ti}`);const p=[];let b=0;for(let L=0;L<Ti;++L){const E=L/y,w=Math.exp(-E*E/2);p.push(w),L===0?b+=w:L<v&&(b+=2*w)}for(let L=0;L<p.length;L++)p[L]=p[L]/b;f.envMap.value=e.texture,f.samples.value=v,f.weights.value=p,f.latitudinal.value=o==="latitudinal",a&&(f.poleAxis.value=a);const{_lodMax:C}=this;f.dTheta.value=x,f.mipInt.value=C-n;const A=this._sizeLods[r],I=3*A*(r>C-ci?r-C+ci:0),P=4*(this._cubeSize-A);Yi(t,I,P,3*A,2*A),l.setRenderTarget(t),l.render(d,_r)}}function bp(i){const e=[],t=[],n=[];let r=i;const s=i-ci+1+Il.length;for(let o=0;o<s;o++){const a=Math.pow(2,r);e.push(a);let l=1/a;o>i-ci?l=Il[o-i+ci-1]:o===0&&(l=0),t.push(l);const c=1/(a-2),u=-c,d=1+c,f=[u,u,d,u,d,d,u,u,d,d,u,d],_=6,x=6,y=3,v=2,p=1,b=new Float32Array(y*x*_),C=new Float32Array(v*x*_),A=new Float32Array(p*x*_);for(let P=0;P<_;P++){const L=P%3*2/3-1,E=P>2?0:-1,w=[L,E,0,L+2/3,E,0,L+2/3,E+1,0,L,E,0,L+2/3,E+1,0,L,E+1,0];b.set(w,y*x*P),C.set(f,v*x*P);const j=[P,P,P,P,P,P];A.set(j,p*x*P)}const I=new rn;I.setAttribute("position",new Fn(b,y)),I.setAttribute("uv",new Fn(C,v)),I.setAttribute("faceIndex",new Fn(A,p)),n.push(new He(I,null)),r>ci&&r--}return{lodMeshes:n,sizeLods:e,sigmas:t}}function Ul(i,e,t){const n=new Nn(i,e,t);return n.texture.mapping=Ds,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Yi(i,e,t,n,r){i.viewport.set(e,t,n,r),i.scissor.set(e,t,n,r)}function wp(i,e,t){return new zn({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:Ep,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Us(),fragmentShader:`

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
		`,blending:qn,depthTest:!1,depthWrite:!1})}function Ap(i,e,t){const n=new Float32Array(Ti),r=new G(0,1,0);return new zn({name:"SphericalGaussianBlur",defines:{n:Ti,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:Us(),fragmentShader:`

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
		`,blending:qn,depthTest:!1,depthWrite:!1})}function Ol(){return new zn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Us(),fragmentShader:`

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
		`,blending:qn,depthTest:!1,depthWrite:!1})}function Nl(){return new zn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Us(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:qn,depthTest:!1,depthWrite:!1})}function Us(){return`

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
	`}class qc extends Nn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];this.texture=new Gc(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new pt(5,5,5),s=new zn({name:"CubemapFromEquirect",uniforms:nr(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:ln,blending:qn});s.uniforms.tEquirect.value=t;const o=new He(r,s),a=t.minFilter;return t.minFilter===wi&&(t.minFilter=Xt),new Du(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t=!0,n=!0,r=!0){const s=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,r);e.setRenderTarget(s)}}function Rp(i){let e=new WeakMap,t=new WeakMap,n=null;function r(f,_=!1){return f==null?null:_?o(f):s(f)}function s(f){if(f&&f.isTexture){const _=f.mapping;if(_===$s||_===Ys)if(e.has(f)){const x=e.get(f).texture;return a(x,f.mapping)}else{const x=f.image;if(x&&x.height>0){const y=new qc(x.height);return y.fromEquirectangularTexture(i,f),e.set(f,y),f.addEventListener("dispose",c),a(y.texture,f.mapping)}else return null}}return f}function o(f){if(f&&f.isTexture){const _=f.mapping,x=_===$s||_===Ys,y=_===Ri||_===Qi;if(x||y){let v=t.get(f);const p=v!==void 0?v.texture.pmremVersion:0;if(f.isRenderTargetTexture&&f.pmremVersion!==p)return n===null&&(n=new Ll(i)),v=x?n.fromEquirectangular(f,v):n.fromCubemap(f,v),v.texture.pmremVersion=f.pmremVersion,t.set(f,v),v.texture;if(v!==void 0)return v.texture;{const b=f.image;return x&&b&&b.height>0||y&&b&&l(b)?(n===null&&(n=new Ll(i)),v=x?n.fromEquirectangular(f):n.fromCubemap(f),v.texture.pmremVersion=f.pmremVersion,t.set(f,v),f.addEventListener("dispose",u),v.texture):null}}}return f}function a(f,_){return _===$s?f.mapping=Ri:_===Ys&&(f.mapping=Qi),f}function l(f){let _=0;const x=6;for(let y=0;y<x;y++)f[y]!==void 0&&_++;return _===x}function c(f){const _=f.target;_.removeEventListener("dispose",c);const x=e.get(_);x!==void 0&&(e.delete(_),x.dispose())}function u(f){const _=f.target;_.removeEventListener("dispose",u);const x=t.get(_);x!==void 0&&(t.delete(_),x.dispose())}function d(){e=new WeakMap,t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:r,dispose:d}}function Cp(i){const e={};function t(n){if(e[n]!==void 0)return e[n];const r=i.getExtension(n);return e[n]=r,r}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const r=t(n);return r===null&&Es("WebGLRenderer: "+n+" extension not supported."),r}}}function Pp(i,e,t,n){const r={},s=new WeakMap;function o(d){const f=d.target;f.index!==null&&e.remove(f.index);for(const x in f.attributes)e.remove(f.attributes[x]);f.removeEventListener("dispose",o),delete r[f.id];const _=s.get(f);_&&(e.remove(_),s.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,t.memory.geometries--}function a(d,f){return r[f.id]===!0||(f.addEventListener("dispose",o),r[f.id]=!0,t.memory.geometries++),f}function l(d){const f=d.attributes;for(const _ in f)e.update(f[_],i.ARRAY_BUFFER)}function c(d){const f=[],_=d.index,x=d.attributes.position;let y=0;if(x===void 0)return;if(_!==null){const b=_.array;y=_.version;for(let C=0,A=b.length;C<A;C+=3){const I=b[C+0],P=b[C+1],L=b[C+2];f.push(I,P,P,L,L,I)}}else{const b=x.array;y=x.version;for(let C=0,A=b.length/3-1;C<A;C+=3){const I=C+0,P=C+1,L=C+2;f.push(I,P,P,L,L,I)}}const v=new(x.count>=65535?Hc:zc)(f,1);v.version=y;const p=s.get(d);p&&e.remove(p),s.set(d,v)}function u(d){const f=s.get(d);if(f){const _=d.index;_!==null&&f.version<_.version&&c(d)}else c(d);return s.get(d)}return{get:a,update:l,getWireframeAttribute:u}}function Ip(i,e,t){let n;function r(f){n=f}let s,o;function a(f){s=f.type,o=f.bytesPerElement}function l(f,_){i.drawElements(n,_,s,f*o),t.update(_,n,1)}function c(f,_,x){x!==0&&(i.drawElementsInstanced(n,_,s,f*o,x),t.update(_,n,x))}function u(f,_,x){if(x===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,_,0,s,f,0,x);let v=0;for(let p=0;p<x;p++)v+=_[p];t.update(v,n,1)}function d(f,_,x,y){if(x===0)return;const v=e.get("WEBGL_multi_draw");if(v===null)for(let p=0;p<f.length;p++)c(f[p]/o,_[p],y[p]);else{v.multiDrawElementsInstancedWEBGL(n,_,0,s,f,0,y,0,x);let p=0;for(let b=0;b<x;b++)p+=_[b]*y[b];t.update(p,n,1)}}this.setMode=r,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=u,this.renderMultiDrawInstances=d}function Dp(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,o,a){switch(t.calls++,o){case i.TRIANGLES:t.triangles+=a*(s/3);break;case i.LINES:t.lines+=a*(s/2);break;case i.LINE_STRIP:t.lines+=a*(s-1);break;case i.LINE_LOOP:t.lines+=a*s;break;case i.POINTS:t.points+=a*s;break;default:vt("WebGLInfo: Unknown draw mode:",o);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:n}}function Lp(i,e,t){const n=new WeakMap,r=new Ft;function s(o,a,l){const c=o.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,d=u!==void 0?u.length:0;let f=n.get(a);if(f===void 0||f.count!==d){let j=function(){E.dispose(),n.delete(a),a.removeEventListener("dispose",j)};var _=j;f!==void 0&&f.texture.dispose();const x=a.morphAttributes.position!==void 0,y=a.morphAttributes.normal!==void 0,v=a.morphAttributes.color!==void 0,p=a.morphAttributes.position||[],b=a.morphAttributes.normal||[],C=a.morphAttributes.color||[];let A=0;x===!0&&(A=1),y===!0&&(A=2),v===!0&&(A=3);let I=a.attributes.position.count*A,P=1;I>e.maxTextureSize&&(P=Math.ceil(I/e.maxTextureSize),I=e.maxTextureSize);const L=new Float32Array(I*P*4*d),E=new Bc(L,I,P,d);E.type=Ln,E.needsUpdate=!0;const w=A*4;for(let D=0;D<d;D++){const V=p[D],X=b[D],Y=C[D],$=I*P*4*D;for(let q=0;q<V.count;q++){const H=q*w;x===!0&&(r.fromBufferAttribute(V,q),L[$+H+0]=r.x,L[$+H+1]=r.y,L[$+H+2]=r.z,L[$+H+3]=0),y===!0&&(r.fromBufferAttribute(X,q),L[$+H+4]=r.x,L[$+H+5]=r.y,L[$+H+6]=r.z,L[$+H+7]=0),v===!0&&(r.fromBufferAttribute(Y,q),L[$+H+8]=r.x,L[$+H+9]=r.y,L[$+H+10]=r.z,L[$+H+11]=Y.itemSize===4?r.w:1)}}f={count:d,texture:E,size:new ht(I,P)},n.set(a,f),a.addEventListener("dispose",j)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",o.morphTexture,t);else{let x=0;for(let v=0;v<c.length;v++)x+=c[v];const y=a.morphTargetsRelative?1:1-x;l.getUniforms().setValue(i,"morphTargetBaseInfluence",y),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",f.texture,t),l.getUniforms().setValue(i,"morphTargetsTextureSize",f.size)}return{update:s}}function Up(i,e,t,n,r){let s=new WeakMap;function o(c){const u=r.render.frame,d=c.geometry,f=e.get(c,d);if(s.get(f)!==u&&(e.update(f),s.set(f,u)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),s.get(c)!==u&&(t.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,i.ARRAY_BUFFER),s.set(c,u))),c.isSkinnedMesh){const _=c.skeleton;s.get(_)!==u&&(_.update(),s.set(_,u))}return f}function a(){s=new WeakMap}function l(c){const u=c.target;u.removeEventListener("dispose",l),n.releaseStatesOfObject(u),t.remove(u.instanceMatrix),u.instanceColor!==null&&t.remove(u.instanceColor)}return{update:o,dispose:a}}const Op={[yc]:"LINEAR_TONE_MAPPING",[Ec]:"REINHARD_TONE_MAPPING",[Tc]:"CINEON_TONE_MAPPING",[Da]:"ACES_FILMIC_TONE_MAPPING",[wc]:"AGX_TONE_MAPPING",[Ac]:"NEUTRAL_TONE_MAPPING",[bc]:"CUSTOM_TONE_MAPPING"};function Np(i,e,t,n,r){const s=new Nn(e,t,{type:i,depthBuffer:n,stencilBuffer:r}),o=new Nn(e,t,{type:Kn,depthBuffer:!1,stencilBuffer:!1}),a=new rn;a.setAttribute("position",new Bt([-1,3,0,-1,-1,0,3,-1,0],3)),a.setAttribute("uv",new Bt([0,2,0,0,2,0],2));const l=new Tu({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),c=new He(a,l),u=new ja(-1,1,1,-1,0,1);let d=null,f=null,_=!1,x,y=null,v=[],p=!1;this.setSize=function(b,C){s.setSize(b,C),o.setSize(b,C);for(let A=0;A<v.length;A++){const I=v[A];I.setSize&&I.setSize(b,C)}},this.setEffects=function(b){v=b,p=v.length>0&&v[0].isRenderPass===!0;const C=s.width,A=s.height;for(let I=0;I<v.length;I++){const P=v[I];P.setSize&&P.setSize(C,A)}},this.begin=function(b,C){if(_||b.toneMapping===On&&v.length===0)return!1;if(y=C,C!==null){const A=C.width,I=C.height;(s.width!==A||s.height!==I)&&this.setSize(A,I)}return p===!1&&b.setRenderTarget(s),x=b.toneMapping,b.toneMapping=On,!0},this.hasRenderPass=function(){return p},this.end=function(b,C){b.toneMapping=x,_=!0;let A=s,I=o;for(let P=0;P<v.length;P++){const L=v[P];if(L.enabled!==!1&&(L.render(b,I,A,C),L.needsSwap!==!1)){const E=A;A=I,I=E}}if(d!==b.outputColorSpace||f!==b.toneMapping){d=b.outputColorSpace,f=b.toneMapping,l.defines={},xt.getTransfer(d)===Et&&(l.defines.SRGB_TRANSFER="");const P=Op[f];P&&(l.defines[P]=""),l.needsUpdate=!0}l.uniforms.tDiffuse.value=A.texture,b.setRenderTarget(y),b.render(c,u),y=null,_=!1},this.isCompositing=function(){return _},this.dispose=function(){s.dispose(),o.dispose(),a.dispose(),l.dispose()}}const jc=new tn,ba=new Ir(1,1),Kc=new Bc,Zc=new eu,Jc=new Gc,Fl=[],Bl=[],kl=new Float32Array(16),zl=new Float32Array(9),Hl=new Float32Array(4);function cr(i,e,t){const n=i[0];if(n<=0||n>0)return i;const r=e*t;let s=Fl[r];if(s===void 0&&(s=new Float32Array(r),Fl[r]=s),e!==0){n.toArray(s,0);for(let o=1,a=0;o!==e;++o)a+=t,i[o].toArray(s,a)}return s}function Ht(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function Vt(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function Os(i,e){let t=Bl[e];t===void 0&&(t=new Int32Array(e),Bl[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function Fp(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function Bp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ht(t,e))return;i.uniform2fv(this.addr,e),Vt(t,e)}}function kp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Ht(t,e))return;i.uniform3fv(this.addr,e),Vt(t,e)}}function zp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ht(t,e))return;i.uniform4fv(this.addr,e),Vt(t,e)}}function Hp(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Ht(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),Vt(t,e)}else{if(Ht(t,n))return;Hl.set(n),i.uniformMatrix2fv(this.addr,!1,Hl),Vt(t,n)}}function Vp(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Ht(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),Vt(t,e)}else{if(Ht(t,n))return;zl.set(n),i.uniformMatrix3fv(this.addr,!1,zl),Vt(t,n)}}function Gp(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Ht(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),Vt(t,e)}else{if(Ht(t,n))return;kl.set(n),i.uniformMatrix4fv(this.addr,!1,kl),Vt(t,n)}}function Wp(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function Xp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ht(t,e))return;i.uniform2iv(this.addr,e),Vt(t,e)}}function $p(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Ht(t,e))return;i.uniform3iv(this.addr,e),Vt(t,e)}}function Yp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ht(t,e))return;i.uniform4iv(this.addr,e),Vt(t,e)}}function qp(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function jp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ht(t,e))return;i.uniform2uiv(this.addr,e),Vt(t,e)}}function Kp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Ht(t,e))return;i.uniform3uiv(this.addr,e),Vt(t,e)}}function Zp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ht(t,e))return;i.uniform4uiv(this.addr,e),Vt(t,e)}}function Jp(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r);let s;this.type===i.SAMPLER_2D_SHADOW?(ba.compareFunction=t.isReversedDepthBuffer()?za:ka,s=ba):s=jc,t.setTexture2D(e||s,r)}function Qp(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture3D(e||Zc,r)}function em(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTextureCube(e||Jc,r)}function tm(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture2DArray(e||Kc,r)}function nm(i){switch(i){case 5126:return Fp;case 35664:return Bp;case 35665:return kp;case 35666:return zp;case 35674:return Hp;case 35675:return Vp;case 35676:return Gp;case 5124:case 35670:return Wp;case 35667:case 35671:return Xp;case 35668:case 35672:return $p;case 35669:case 35673:return Yp;case 5125:return qp;case 36294:return jp;case 36295:return Kp;case 36296:return Zp;case 35678:case 36198:case 36298:case 36306:case 35682:return Jp;case 35679:case 36299:case 36307:return Qp;case 35680:case 36300:case 36308:case 36293:return em;case 36289:case 36303:case 36311:case 36292:return tm}}function im(i,e){i.uniform1fv(this.addr,e)}function rm(i,e){const t=cr(e,this.size,2);i.uniform2fv(this.addr,t)}function sm(i,e){const t=cr(e,this.size,3);i.uniform3fv(this.addr,t)}function om(i,e){const t=cr(e,this.size,4);i.uniform4fv(this.addr,t)}function am(i,e){const t=cr(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function lm(i,e){const t=cr(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function cm(i,e){const t=cr(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function hm(i,e){i.uniform1iv(this.addr,e)}function um(i,e){i.uniform2iv(this.addr,e)}function fm(i,e){i.uniform3iv(this.addr,e)}function dm(i,e){i.uniform4iv(this.addr,e)}function pm(i,e){i.uniform1uiv(this.addr,e)}function mm(i,e){i.uniform2uiv(this.addr,e)}function gm(i,e){i.uniform3uiv(this.addr,e)}function _m(i,e){i.uniform4uiv(this.addr,e)}function vm(i,e,t){const n=this.cache,r=e.length,s=Os(t,r);Ht(n,s)||(i.uniform1iv(this.addr,s),Vt(n,s));let o;this.type===i.SAMPLER_2D_SHADOW?o=ba:o=jc;for(let a=0;a!==r;++a)t.setTexture2D(e[a]||o,s[a])}function xm(i,e,t){const n=this.cache,r=e.length,s=Os(t,r);Ht(n,s)||(i.uniform1iv(this.addr,s),Vt(n,s));for(let o=0;o!==r;++o)t.setTexture3D(e[o]||Zc,s[o])}function Mm(i,e,t){const n=this.cache,r=e.length,s=Os(t,r);Ht(n,s)||(i.uniform1iv(this.addr,s),Vt(n,s));for(let o=0;o!==r;++o)t.setTextureCube(e[o]||Jc,s[o])}function Sm(i,e,t){const n=this.cache,r=e.length,s=Os(t,r);Ht(n,s)||(i.uniform1iv(this.addr,s),Vt(n,s));for(let o=0;o!==r;++o)t.setTexture2DArray(e[o]||Kc,s[o])}function ym(i){switch(i){case 5126:return im;case 35664:return rm;case 35665:return sm;case 35666:return om;case 35674:return am;case 35675:return lm;case 35676:return cm;case 5124:case 35670:return hm;case 35667:case 35671:return um;case 35668:case 35672:return fm;case 35669:case 35673:return dm;case 5125:return pm;case 36294:return mm;case 36295:return gm;case 36296:return _m;case 35678:case 36198:case 36298:case 36306:case 35682:return vm;case 35679:case 36299:case 36307:return xm;case 35680:case 36300:case 36308:case 36293:return Mm;case 36289:case 36303:case 36311:case 36292:return Sm}}class Em{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=nm(t.type)}}class Tm{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=ym(t.type)}}class bm{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const r=this.seq;for(let s=0,o=r.length;s!==o;++s){const a=r[s];a.setValue(e,t[a.id],n)}}}const wo=/(\w+)(\])?(\[|\.)?/g;function Vl(i,e){i.seq.push(e),i.map[e.id]=e}function wm(i,e,t){const n=i.name,r=n.length;for(wo.lastIndex=0;;){const s=wo.exec(n),o=wo.lastIndex;let a=s[1];const l=s[2]==="]",c=s[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===r){Vl(t,c===void 0?new Em(a,i,e):new Tm(a,i,e));break}else{let d=t.map[a];d===void 0&&(d=new bm(a),Vl(t,d)),t=d}}}class _s{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let o=0;o<n;++o){const a=e.getActiveUniform(t,o),l=e.getUniformLocation(t,a.name);wm(a,l,this)}const r=[],s=[];for(const o of this.seq)o.type===e.SAMPLER_2D_SHADOW||o.type===e.SAMPLER_CUBE_SHADOW||o.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(o):s.push(o);r.length>0&&(this.seq=r.concat(s))}setValue(e,t,n,r){const s=this.map[t];s!==void 0&&s.setValue(e,n,r)}setOptional(e,t,n){const r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let s=0,o=t.length;s!==o;++s){const a=t[s],l=n[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,r)}}static seqWithValue(e,t){const n=[];for(let r=0,s=e.length;r!==s;++r){const o=e[r];o.id in t&&n.push(o)}return n}}function Gl(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const Am=37297;let Rm=0;function Cm(i,e){const t=i.split(`
`),n=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let o=r;o<s;o++){const a=o+1;n.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return n.join(`
`)}const Wl=new nt;function Pm(i){xt._getMatrix(Wl,xt.workingColorSpace,i);const e=`mat3( ${Wl.elements.map(t=>t.toFixed(4))} )`;switch(xt.getTransfer(i)){case Ss:return[e,"LinearTransferOETF"];case Et:return[e,"sRGBTransferOETF"];default:return je("WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function Xl(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),s=(i.getShaderInfoLog(e)||"").trim();if(n&&s==="")return"";const o=/ERROR: 0:(\d+)/.exec(s);if(o){const a=parseInt(o[1]);return t.toUpperCase()+`

`+s+`

`+Cm(i.getShaderSource(e),a)}else return s}function Im(i,e){const t=Pm(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}const Dm={[yc]:"Linear",[Ec]:"Reinhard",[Tc]:"Cineon",[Da]:"ACESFilmic",[wc]:"AgX",[Ac]:"Neutral",[bc]:"Custom"};function Lm(i,e){const t=Dm[e];return t===void 0?(je("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const ls=new G;function Um(){xt.getLuminanceCoefficients(ls);const i=ls.x.toFixed(4),e=ls.y.toFixed(4),t=ls.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Om(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(br).join(`
`)}function Nm(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function Fm(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let r=0;r<n;r++){const s=i.getActiveAttrib(e,r),o=s.name;let a=1;s.type===i.FLOAT_MAT2&&(a=2),s.type===i.FLOAT_MAT3&&(a=3),s.type===i.FLOAT_MAT4&&(a=4),t[o]={type:s.type,location:i.getAttribLocation(e,o),locationSize:a}}return t}function br(i){return i!==""}function $l(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Yl(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const Bm=/^[ \t]*#include +<([\w\d./]+)>/gm;function wa(i){return i.replace(Bm,zm)}const km=new Map;function zm(i,e){let t=ot[e];if(t===void 0){const n=km.get(e);if(n!==void 0)t=ot[n],je('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return wa(t)}const Hm=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function ql(i){return i.replace(Hm,Vm)}function Vm(i,e,t,n){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function jl(i){let e=`precision ${i.precision} float;
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
#define LOW_PRECISION`),e}const Gm={[wr]:"SHADOWMAP_TYPE_PCF",[Tr]:"SHADOWMAP_TYPE_VSM"};function Wm(i){return Gm[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const Xm={[Ri]:"ENVMAP_TYPE_CUBE",[Qi]:"ENVMAP_TYPE_CUBE",[Ds]:"ENVMAP_TYPE_CUBE_UV"};function $m(i){return i.envMap===!1?"ENVMAP_TYPE_CUBE":Xm[i.envMapMode]||"ENVMAP_TYPE_CUBE"}const Ym={[Qi]:"ENVMAP_MODE_REFRACTION"};function qm(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":Ym[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}const jm={[Sc]:"ENVMAP_BLENDING_MULTIPLY",[Lh]:"ENVMAP_BLENDING_MIX",[Uh]:"ENVMAP_BLENDING_ADD"};function Km(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":jm[i.combine]||"ENVMAP_BLENDING_NONE"}function Zm(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:n,maxMip:t}}function Jm(i,e,t,n){const r=i.getContext(),s=t.defines;let o=t.vertexShader,a=t.fragmentShader;const l=Wm(t),c=$m(t),u=qm(t),d=Km(t),f=Zm(t),_=Om(t),x=Nm(s),y=r.createProgram();let v,p,b=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(v=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x].filter(br).join(`
`),v.length>0&&(v+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x].filter(br).join(`
`),p.length>0&&(p+=`
`)):(v=[jl(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(br).join(`
`),p=[jl(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+d:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==On?"#define TONE_MAPPING":"",t.toneMapping!==On?ot.tonemapping_pars_fragment:"",t.toneMapping!==On?Lm("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",ot.colorspace_pars_fragment,Im("linearToOutputTexel",t.outputColorSpace),Um(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(br).join(`
`)),o=wa(o),o=$l(o,t),o=Yl(o,t),a=wa(a),a=$l(a,t),a=Yl(a,t),o=ql(o),a=ql(a),t.isRawShaderMaterial!==!0&&(b=`#version 300 es
`,v=[_,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+v,p=["#define varying in",t.glslVersion===sl?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===sl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const C=b+v+o,A=b+p+a,I=Gl(r,r.VERTEX_SHADER,C),P=Gl(r,r.FRAGMENT_SHADER,A);r.attachShader(y,I),r.attachShader(y,P),t.index0AttributeName!==void 0?r.bindAttribLocation(y,0,t.index0AttributeName):t.morphTargets===!0&&r.bindAttribLocation(y,0,"position"),r.linkProgram(y);function L(D){if(i.debug.checkShaderErrors){const V=r.getProgramInfoLog(y)||"",X=r.getShaderInfoLog(I)||"",Y=r.getShaderInfoLog(P)||"",$=V.trim(),q=X.trim(),H=Y.trim();let le=!0,ie=!0;if(r.getProgramParameter(y,r.LINK_STATUS)===!1)if(le=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(r,y,I,P);else{const Ee=Xl(r,I,"vertex"),be=Xl(r,P,"fragment");vt("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(y,r.VALIDATE_STATUS)+`

Material Name: `+D.name+`
Material Type: `+D.type+`

Program Info Log: `+$+`
`+Ee+`
`+be)}else $!==""?je("WebGLProgram: Program Info Log:",$):(q===""||H==="")&&(ie=!1);ie&&(D.diagnostics={runnable:le,programLog:$,vertexShader:{log:q,prefix:v},fragmentShader:{log:H,prefix:p}})}r.deleteShader(I),r.deleteShader(P),E=new _s(r,y),w=Fm(r,y)}let E;this.getUniforms=function(){return E===void 0&&L(this),E};let w;this.getAttributes=function(){return w===void 0&&L(this),w};let j=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return j===!1&&(j=r.getProgramParameter(y,Am)),j},this.destroy=function(){n.releaseStatesOfProgram(this),r.deleteProgram(y),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Rm++,this.cacheKey=e,this.usedTimes=1,this.program=y,this.vertexShader=I,this.fragmentShader=P,this}let Qm=0;class eg{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,r=this._getShaderStage(t),s=this._getShaderStage(n),o=this._getShaderCacheForMaterial(e);return o.has(r)===!1&&(o.add(r),r.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new tg(e),t.set(e,n)),n}}class tg{constructor(e){this.id=Qm++,this.code=e,this.usedTimes=0}}function ng(i,e,t,n,r,s){const o=new Va,a=new eg,l=new Set,c=[],u=new Map,d=n.logarithmicDepthBuffer;let f=n.precision;const _={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function x(E){return l.add(E),E===0?"uv":`uv${E}`}function y(E,w,j,D,V){const X=D.fog,Y=V.geometry,$=E.isMeshStandardMaterial||E.isMeshLambertMaterial||E.isMeshPhongMaterial?D.environment:null,q=E.isMeshStandardMaterial||E.isMeshLambertMaterial&&!E.envMap||E.isMeshPhongMaterial&&!E.envMap,H=e.get(E.envMap||$,q),le=H&&H.mapping===Ds?H.image.height:null,ie=_[E.type];E.precision!==null&&(f=n.getMaxPrecision(E.precision),f!==E.precision&&je("WebGLProgram.getParameters:",E.precision,"not supported, using",f,"instead."));const Ee=Y.morphAttributes.position||Y.morphAttributes.normal||Y.morphAttributes.color,be=Ee!==void 0?Ee.length:0;let we=0;Y.morphAttributes.position!==void 0&&(we=1),Y.morphAttributes.normal!==void 0&&(we=2),Y.morphAttributes.color!==void 0&&(we=3);let Ze,Pt,At,Q;if(ie){const tt=Pn[ie];Ze=tt.vertexShader,Pt=tt.fragmentShader}else Ze=E.vertexShader,Pt=E.fragmentShader,a.update(E),At=a.getVertexShaderID(E),Q=a.getFragmentShaderID(E);const me=i.getRenderTarget(),ge=i.state.buffers.depth.getReversed(),Ke=V.isInstancedMesh===!0,ze=V.isBatchedMesh===!0,Xe=!!E.map,Ut=!!E.matcap,We=!!H,gt=!!E.aoMap,yt=!!E.lightMap,Qe=!!E.bumpMap,Rt=!!E.normalMap,U=!!E.displacementMap,Dt=!!E.emissiveMap,ut=!!E.metalnessMap,_t=!!E.roughnessMap,Le=E.anisotropy>0,R=E.clearcoat>0,M=E.dispersion>0,k=E.iridescence>0,J=E.sheen>0,te=E.transmission>0,Z=Le&&!!E.anisotropyMap,Re=R&&!!E.clearcoatMap,fe=R&&!!E.clearcoatNormalMap,ke=R&&!!E.clearcoatRoughnessMap,Ve=k&&!!E.iridescenceMap,se=k&&!!E.iridescenceThicknessMap,ae=J&&!!E.sheenColorMap,Ie=J&&!!E.sheenRoughnessMap,De=!!E.specularMap,Te=!!E.specularColorMap,et=!!E.specularIntensityMap,O=te&&!!E.transmissionMap,de=te&&!!E.thicknessMap,ce=!!E.gradientMap,Ae=!!E.alphaMap,re=E.alphaTest>0,K=!!E.alphaHash,Ce=!!E.extensions;let Ye=On;E.toneMapped&&(me===null||me.isXRRenderTarget===!0)&&(Ye=i.toneMapping);const Tt={shaderID:ie,shaderType:E.type,shaderName:E.name,vertexShader:Ze,fragmentShader:Pt,defines:E.defines,customVertexShaderID:At,customFragmentShaderID:Q,isRawShaderMaterial:E.isRawShaderMaterial===!0,glslVersion:E.glslVersion,precision:f,batching:ze,batchingColor:ze&&V._colorsTexture!==null,instancing:Ke,instancingColor:Ke&&V.instanceColor!==null,instancingMorph:Ke&&V.morphTexture!==null,outputColorSpace:me===null?i.outputColorSpace:me.isXRRenderTarget===!0?me.texture.colorSpace:tr,alphaToCoverage:!!E.alphaToCoverage,map:Xe,matcap:Ut,envMap:We,envMapMode:We&&H.mapping,envMapCubeUVHeight:le,aoMap:gt,lightMap:yt,bumpMap:Qe,normalMap:Rt,displacementMap:U,emissiveMap:Dt,normalMapObjectSpace:Rt&&E.normalMapType===Fh,normalMapTangentSpace:Rt&&E.normalMapType===Nc,metalnessMap:ut,roughnessMap:_t,anisotropy:Le,anisotropyMap:Z,clearcoat:R,clearcoatMap:Re,clearcoatNormalMap:fe,clearcoatRoughnessMap:ke,dispersion:M,iridescence:k,iridescenceMap:Ve,iridescenceThicknessMap:se,sheen:J,sheenColorMap:ae,sheenRoughnessMap:Ie,specularMap:De,specularColorMap:Te,specularIntensityMap:et,transmission:te,transmissionMap:O,thicknessMap:de,gradientMap:ce,opaque:E.transparent===!1&&E.blending===Zi&&E.alphaToCoverage===!1,alphaMap:Ae,alphaTest:re,alphaHash:K,combine:E.combine,mapUv:Xe&&x(E.map.channel),aoMapUv:gt&&x(E.aoMap.channel),lightMapUv:yt&&x(E.lightMap.channel),bumpMapUv:Qe&&x(E.bumpMap.channel),normalMapUv:Rt&&x(E.normalMap.channel),displacementMapUv:U&&x(E.displacementMap.channel),emissiveMapUv:Dt&&x(E.emissiveMap.channel),metalnessMapUv:ut&&x(E.metalnessMap.channel),roughnessMapUv:_t&&x(E.roughnessMap.channel),anisotropyMapUv:Z&&x(E.anisotropyMap.channel),clearcoatMapUv:Re&&x(E.clearcoatMap.channel),clearcoatNormalMapUv:fe&&x(E.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ke&&x(E.clearcoatRoughnessMap.channel),iridescenceMapUv:Ve&&x(E.iridescenceMap.channel),iridescenceThicknessMapUv:se&&x(E.iridescenceThicknessMap.channel),sheenColorMapUv:ae&&x(E.sheenColorMap.channel),sheenRoughnessMapUv:Ie&&x(E.sheenRoughnessMap.channel),specularMapUv:De&&x(E.specularMap.channel),specularColorMapUv:Te&&x(E.specularColorMap.channel),specularIntensityMapUv:et&&x(E.specularIntensityMap.channel),transmissionMapUv:O&&x(E.transmissionMap.channel),thicknessMapUv:de&&x(E.thicknessMap.channel),alphaMapUv:Ae&&x(E.alphaMap.channel),vertexTangents:!!Y.attributes.tangent&&(Rt||Le),vertexColors:E.vertexColors,vertexAlphas:E.vertexColors===!0&&!!Y.attributes.color&&Y.attributes.color.itemSize===4,pointsUvs:V.isPoints===!0&&!!Y.attributes.uv&&(Xe||Ae),fog:!!X,useFog:E.fog===!0,fogExp2:!!X&&X.isFogExp2,flatShading:E.wireframe===!1&&(E.flatShading===!0||Y.attributes.normal===void 0&&Rt===!1&&(E.isMeshLambertMaterial||E.isMeshPhongMaterial||E.isMeshStandardMaterial||E.isMeshPhysicalMaterial)),sizeAttenuation:E.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:ge,skinning:V.isSkinnedMesh===!0,morphTargets:Y.morphAttributes.position!==void 0,morphNormals:Y.morphAttributes.normal!==void 0,morphColors:Y.morphAttributes.color!==void 0,morphTargetsCount:be,morphTextureStride:we,numDirLights:w.directional.length,numPointLights:w.point.length,numSpotLights:w.spot.length,numSpotLightMaps:w.spotLightMap.length,numRectAreaLights:w.rectArea.length,numHemiLights:w.hemi.length,numDirLightShadows:w.directionalShadowMap.length,numPointLightShadows:w.pointShadowMap.length,numSpotLightShadows:w.spotShadowMap.length,numSpotLightShadowsWithMaps:w.numSpotLightShadowsWithMaps,numLightProbes:w.numLightProbes,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:E.dithering,shadowMapEnabled:i.shadowMap.enabled&&j.length>0,shadowMapType:i.shadowMap.type,toneMapping:Ye,decodeVideoTexture:Xe&&E.map.isVideoTexture===!0&&xt.getTransfer(E.map.colorSpace)===Et,decodeVideoTextureEmissive:Dt&&E.emissiveMap.isVideoTexture===!0&&xt.getTransfer(E.emissiveMap.colorSpace)===Et,premultipliedAlpha:E.premultipliedAlpha,doubleSided:E.side===_n,flipSided:E.side===ln,useDepthPacking:E.depthPacking>=0,depthPacking:E.depthPacking||0,index0AttributeName:E.index0AttributeName,extensionClipCullDistance:Ce&&E.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Ce&&E.extensions.multiDraw===!0||ze)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:E.customProgramCacheKey()};return Tt.vertexUv1s=l.has(1),Tt.vertexUv2s=l.has(2),Tt.vertexUv3s=l.has(3),l.clear(),Tt}function v(E){const w=[];if(E.shaderID?w.push(E.shaderID):(w.push(E.customVertexShaderID),w.push(E.customFragmentShaderID)),E.defines!==void 0)for(const j in E.defines)w.push(j),w.push(E.defines[j]);return E.isRawShaderMaterial===!1&&(p(w,E),b(w,E),w.push(i.outputColorSpace)),w.push(E.customProgramCacheKey),w.join()}function p(E,w){E.push(w.precision),E.push(w.outputColorSpace),E.push(w.envMapMode),E.push(w.envMapCubeUVHeight),E.push(w.mapUv),E.push(w.alphaMapUv),E.push(w.lightMapUv),E.push(w.aoMapUv),E.push(w.bumpMapUv),E.push(w.normalMapUv),E.push(w.displacementMapUv),E.push(w.emissiveMapUv),E.push(w.metalnessMapUv),E.push(w.roughnessMapUv),E.push(w.anisotropyMapUv),E.push(w.clearcoatMapUv),E.push(w.clearcoatNormalMapUv),E.push(w.clearcoatRoughnessMapUv),E.push(w.iridescenceMapUv),E.push(w.iridescenceThicknessMapUv),E.push(w.sheenColorMapUv),E.push(w.sheenRoughnessMapUv),E.push(w.specularMapUv),E.push(w.specularColorMapUv),E.push(w.specularIntensityMapUv),E.push(w.transmissionMapUv),E.push(w.thicknessMapUv),E.push(w.combine),E.push(w.fogExp2),E.push(w.sizeAttenuation),E.push(w.morphTargetsCount),E.push(w.morphAttributeCount),E.push(w.numDirLights),E.push(w.numPointLights),E.push(w.numSpotLights),E.push(w.numSpotLightMaps),E.push(w.numHemiLights),E.push(w.numRectAreaLights),E.push(w.numDirLightShadows),E.push(w.numPointLightShadows),E.push(w.numSpotLightShadows),E.push(w.numSpotLightShadowsWithMaps),E.push(w.numLightProbes),E.push(w.shadowMapType),E.push(w.toneMapping),E.push(w.numClippingPlanes),E.push(w.numClipIntersection),E.push(w.depthPacking)}function b(E,w){o.disableAll(),w.instancing&&o.enable(0),w.instancingColor&&o.enable(1),w.instancingMorph&&o.enable(2),w.matcap&&o.enable(3),w.envMap&&o.enable(4),w.normalMapObjectSpace&&o.enable(5),w.normalMapTangentSpace&&o.enable(6),w.clearcoat&&o.enable(7),w.iridescence&&o.enable(8),w.alphaTest&&o.enable(9),w.vertexColors&&o.enable(10),w.vertexAlphas&&o.enable(11),w.vertexUv1s&&o.enable(12),w.vertexUv2s&&o.enable(13),w.vertexUv3s&&o.enable(14),w.vertexTangents&&o.enable(15),w.anisotropy&&o.enable(16),w.alphaHash&&o.enable(17),w.batching&&o.enable(18),w.dispersion&&o.enable(19),w.batchingColor&&o.enable(20),w.gradientMap&&o.enable(21),E.push(o.mask),o.disableAll(),w.fog&&o.enable(0),w.useFog&&o.enable(1),w.flatShading&&o.enable(2),w.logarithmicDepthBuffer&&o.enable(3),w.reversedDepthBuffer&&o.enable(4),w.skinning&&o.enable(5),w.morphTargets&&o.enable(6),w.morphNormals&&o.enable(7),w.morphColors&&o.enable(8),w.premultipliedAlpha&&o.enable(9),w.shadowMapEnabled&&o.enable(10),w.doubleSided&&o.enable(11),w.flipSided&&o.enable(12),w.useDepthPacking&&o.enable(13),w.dithering&&o.enable(14),w.transmission&&o.enable(15),w.sheen&&o.enable(16),w.opaque&&o.enable(17),w.pointsUvs&&o.enable(18),w.decodeVideoTexture&&o.enable(19),w.decodeVideoTextureEmissive&&o.enable(20),w.alphaToCoverage&&o.enable(21),E.push(o.mask)}function C(E){const w=_[E.type];let j;if(w){const D=Pn[w];j=Su.clone(D.uniforms)}else j=E.uniforms;return j}function A(E,w){let j=u.get(w);return j!==void 0?++j.usedTimes:(j=new Jm(i,w,E,r),c.push(j),u.set(w,j)),j}function I(E){if(--E.usedTimes===0){const w=c.indexOf(E);c[w]=c[c.length-1],c.pop(),u.delete(E.cacheKey),E.destroy()}}function P(E){a.remove(E)}function L(){a.dispose()}return{getParameters:y,getProgramCacheKey:v,getUniforms:C,acquireProgram:A,releaseProgram:I,releaseShaderCache:P,programs:c,dispose:L}}function ig(){let i=new WeakMap;function e(o){return i.has(o)}function t(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function r(o,a,l){i.get(o)[a]=l}function s(){i=new WeakMap}return{has:e,get:t,remove:n,update:r,dispose:s}}function rg(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.materialVariant!==e.materialVariant?i.materialVariant-e.materialVariant:i.z!==e.z?i.z-e.z:i.id-e.id}function Kl(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function Zl(){const i=[];let e=0;const t=[],n=[],r=[];function s(){e=0,t.length=0,n.length=0,r.length=0}function o(f){let _=0;return f.isInstancedMesh&&(_+=2),f.isSkinnedMesh&&(_+=1),_}function a(f,_,x,y,v,p){let b=i[e];return b===void 0?(b={id:f.id,object:f,geometry:_,material:x,materialVariant:o(f),groupOrder:y,renderOrder:f.renderOrder,z:v,group:p},i[e]=b):(b.id=f.id,b.object=f,b.geometry=_,b.material=x,b.materialVariant=o(f),b.groupOrder=y,b.renderOrder=f.renderOrder,b.z=v,b.group=p),e++,b}function l(f,_,x,y,v,p){const b=a(f,_,x,y,v,p);x.transmission>0?n.push(b):x.transparent===!0?r.push(b):t.push(b)}function c(f,_,x,y,v,p){const b=a(f,_,x,y,v,p);x.transmission>0?n.unshift(b):x.transparent===!0?r.unshift(b):t.unshift(b)}function u(f,_){t.length>1&&t.sort(f||rg),n.length>1&&n.sort(_||Kl),r.length>1&&r.sort(_||Kl)}function d(){for(let f=e,_=i.length;f<_;f++){const x=i[f];if(x.id===null)break;x.id=null,x.object=null,x.geometry=null,x.material=null,x.group=null}}return{opaque:t,transmissive:n,transparent:r,init:s,push:l,unshift:c,finish:d,sort:u}}function sg(){let i=new WeakMap;function e(n,r){const s=i.get(n);let o;return s===void 0?(o=new Zl,i.set(n,[o])):r>=s.length?(o=new Zl,s.push(o)):o=s[r],o}function t(){i=new WeakMap}return{get:e,dispose:t}}function og(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new G,color:new mt};break;case"SpotLight":t={position:new G,direction:new G,color:new mt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new G,color:new mt,distance:0,decay:0};break;case"HemisphereLight":t={direction:new G,skyColor:new mt,groundColor:new mt};break;case"RectAreaLight":t={color:new mt,position:new G,halfWidth:new G,halfHeight:new G};break}return i[e.id]=t,t}}}function ag(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ht};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ht};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ht,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let lg=0;function cg(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function hg(i){const e=new og,t=ag(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new G);const r=new G,s=new Lt,o=new Lt;function a(c){let u=0,d=0,f=0;for(let w=0;w<9;w++)n.probe[w].set(0,0,0);let _=0,x=0,y=0,v=0,p=0,b=0,C=0,A=0,I=0,P=0,L=0;c.sort(cg);for(let w=0,j=c.length;w<j;w++){const D=c[w],V=D.color,X=D.intensity,Y=D.distance;let $=null;if(D.shadow&&D.shadow.map&&(D.shadow.map.texture.format===er?$=D.shadow.map.texture:$=D.shadow.map.depthTexture||D.shadow.map.texture),D.isAmbientLight)u+=V.r*X,d+=V.g*X,f+=V.b*X;else if(D.isLightProbe){for(let q=0;q<9;q++)n.probe[q].addScaledVector(D.sh.coefficients[q],X);L++}else if(D.isDirectionalLight){const q=e.get(D);if(q.color.copy(D.color).multiplyScalar(D.intensity),D.castShadow){const H=D.shadow,le=t.get(D);le.shadowIntensity=H.intensity,le.shadowBias=H.bias,le.shadowNormalBias=H.normalBias,le.shadowRadius=H.radius,le.shadowMapSize=H.mapSize,n.directionalShadow[_]=le,n.directionalShadowMap[_]=$,n.directionalShadowMatrix[_]=D.shadow.matrix,b++}n.directional[_]=q,_++}else if(D.isSpotLight){const q=e.get(D);q.position.setFromMatrixPosition(D.matrixWorld),q.color.copy(V).multiplyScalar(X),q.distance=Y,q.coneCos=Math.cos(D.angle),q.penumbraCos=Math.cos(D.angle*(1-D.penumbra)),q.decay=D.decay,n.spot[y]=q;const H=D.shadow;if(D.map&&(n.spotLightMap[I]=D.map,I++,H.updateMatrices(D),D.castShadow&&P++),n.spotLightMatrix[y]=H.matrix,D.castShadow){const le=t.get(D);le.shadowIntensity=H.intensity,le.shadowBias=H.bias,le.shadowNormalBias=H.normalBias,le.shadowRadius=H.radius,le.shadowMapSize=H.mapSize,n.spotShadow[y]=le,n.spotShadowMap[y]=$,A++}y++}else if(D.isRectAreaLight){const q=e.get(D);q.color.copy(V).multiplyScalar(X),q.halfWidth.set(D.width*.5,0,0),q.halfHeight.set(0,D.height*.5,0),n.rectArea[v]=q,v++}else if(D.isPointLight){const q=e.get(D);if(q.color.copy(D.color).multiplyScalar(D.intensity),q.distance=D.distance,q.decay=D.decay,D.castShadow){const H=D.shadow,le=t.get(D);le.shadowIntensity=H.intensity,le.shadowBias=H.bias,le.shadowNormalBias=H.normalBias,le.shadowRadius=H.radius,le.shadowMapSize=H.mapSize,le.shadowCameraNear=H.camera.near,le.shadowCameraFar=H.camera.far,n.pointShadow[x]=le,n.pointShadowMap[x]=$,n.pointShadowMatrix[x]=D.shadow.matrix,C++}n.point[x]=q,x++}else if(D.isHemisphereLight){const q=e.get(D);q.skyColor.copy(D.color).multiplyScalar(X),q.groundColor.copy(D.groundColor).multiplyScalar(X),n.hemi[p]=q,p++}}v>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=ye.LTC_FLOAT_1,n.rectAreaLTC2=ye.LTC_FLOAT_2):(n.rectAreaLTC1=ye.LTC_HALF_1,n.rectAreaLTC2=ye.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=d,n.ambient[2]=f;const E=n.hash;(E.directionalLength!==_||E.pointLength!==x||E.spotLength!==y||E.rectAreaLength!==v||E.hemiLength!==p||E.numDirectionalShadows!==b||E.numPointShadows!==C||E.numSpotShadows!==A||E.numSpotMaps!==I||E.numLightProbes!==L)&&(n.directional.length=_,n.spot.length=y,n.rectArea.length=v,n.point.length=x,n.hemi.length=p,n.directionalShadow.length=b,n.directionalShadowMap.length=b,n.pointShadow.length=C,n.pointShadowMap.length=C,n.spotShadow.length=A,n.spotShadowMap.length=A,n.directionalShadowMatrix.length=b,n.pointShadowMatrix.length=C,n.spotLightMatrix.length=A+I-P,n.spotLightMap.length=I,n.numSpotLightShadowsWithMaps=P,n.numLightProbes=L,E.directionalLength=_,E.pointLength=x,E.spotLength=y,E.rectAreaLength=v,E.hemiLength=p,E.numDirectionalShadows=b,E.numPointShadows=C,E.numSpotShadows=A,E.numSpotMaps=I,E.numLightProbes=L,n.version=lg++)}function l(c,u){let d=0,f=0,_=0,x=0,y=0;const v=u.matrixWorldInverse;for(let p=0,b=c.length;p<b;p++){const C=c[p];if(C.isDirectionalLight){const A=n.directional[d];A.direction.setFromMatrixPosition(C.matrixWorld),r.setFromMatrixPosition(C.target.matrixWorld),A.direction.sub(r),A.direction.transformDirection(v),d++}else if(C.isSpotLight){const A=n.spot[_];A.position.setFromMatrixPosition(C.matrixWorld),A.position.applyMatrix4(v),A.direction.setFromMatrixPosition(C.matrixWorld),r.setFromMatrixPosition(C.target.matrixWorld),A.direction.sub(r),A.direction.transformDirection(v),_++}else if(C.isRectAreaLight){const A=n.rectArea[x];A.position.setFromMatrixPosition(C.matrixWorld),A.position.applyMatrix4(v),o.identity(),s.copy(C.matrixWorld),s.premultiply(v),o.extractRotation(s),A.halfWidth.set(C.width*.5,0,0),A.halfHeight.set(0,C.height*.5,0),A.halfWidth.applyMatrix4(o),A.halfHeight.applyMatrix4(o),x++}else if(C.isPointLight){const A=n.point[f];A.position.setFromMatrixPosition(C.matrixWorld),A.position.applyMatrix4(v),f++}else if(C.isHemisphereLight){const A=n.hemi[y];A.direction.setFromMatrixPosition(C.matrixWorld),A.direction.transformDirection(v),y++}}}return{setup:a,setupView:l,state:n}}function Jl(i){const e=new hg(i),t=[],n=[];function r(u){c.camera=u,t.length=0,n.length=0}function s(u){t.push(u)}function o(u){n.push(u)}function a(){e.setup(t)}function l(u){e.setupView(t,u)}const c={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:r,state:c,setupLights:a,setupLightsView:l,pushLight:s,pushShadow:o}}function ug(i){let e=new WeakMap;function t(r,s=0){const o=e.get(r);let a;return o===void 0?(a=new Jl(i),e.set(r,[a])):s>=o.length?(a=new Jl(i),o.push(a)):a=o[s],a}function n(){e=new WeakMap}return{get:t,dispose:n}}const fg=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,dg=`uniform sampler2D shadow_pass;
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
}`,pg=[new G(1,0,0),new G(-1,0,0),new G(0,1,0),new G(0,-1,0),new G(0,0,1),new G(0,0,-1)],mg=[new G(0,-1,0),new G(0,-1,0),new G(0,0,1),new G(0,0,-1),new G(0,-1,0),new G(0,-1,0)],Ql=new Lt,vr=new G,Ao=new G;function gg(i,e,t){let n=new Wa;const r=new ht,s=new ht,o=new Ft,a=new bu,l=new wu,c={},u=t.maxTextureSize,d={[ui]:ln,[ln]:ui,[_n]:_n},f=new zn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ht},radius:{value:4}},vertexShader:fg,fragmentShader:dg}),_=f.clone();_.defines.HORIZONTAL_PASS=1;const x=new rn;x.setAttribute("position",new Fn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const y=new He(x,f),v=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=wr;let p=this.type;this.render=function(P,L,E){if(v.enabled===!1||v.autoUpdate===!1&&v.needsUpdate===!1||P.length===0)return;this.type===ph&&(je("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=wr);const w=i.getRenderTarget(),j=i.getActiveCubeFace(),D=i.getActiveMipmapLevel(),V=i.state;V.setBlending(qn),V.buffers.depth.getReversed()===!0?V.buffers.color.setClear(0,0,0,0):V.buffers.color.setClear(1,1,1,1),V.buffers.depth.setTest(!0),V.setScissorTest(!1);const X=p!==this.type;X&&L.traverse(function(Y){Y.material&&(Array.isArray(Y.material)?Y.material.forEach($=>$.needsUpdate=!0):Y.material.needsUpdate=!0)});for(let Y=0,$=P.length;Y<$;Y++){const q=P[Y],H=q.shadow;if(H===void 0){je("WebGLShadowMap:",q,"has no shadow.");continue}if(H.autoUpdate===!1&&H.needsUpdate===!1)continue;r.copy(H.mapSize);const le=H.getFrameExtents();r.multiply(le),s.copy(H.mapSize),(r.x>u||r.y>u)&&(r.x>u&&(s.x=Math.floor(u/le.x),r.x=s.x*le.x,H.mapSize.x=s.x),r.y>u&&(s.y=Math.floor(u/le.y),r.y=s.y*le.y,H.mapSize.y=s.y));const ie=i.state.buffers.depth.getReversed();if(H.camera._reversedDepth=ie,H.map===null||X===!0){if(H.map!==null&&(H.map.depthTexture!==null&&(H.map.depthTexture.dispose(),H.map.depthTexture=null),H.map.dispose()),this.type===Tr){if(q.isPointLight){je("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}H.map=new Nn(r.x,r.y,{format:er,type:Kn,minFilter:Xt,magFilter:Xt,generateMipmaps:!1}),H.map.texture.name=q.name+".shadowMap",H.map.depthTexture=new Ir(r.x,r.y,Ln),H.map.depthTexture.name=q.name+".shadowMapDepth",H.map.depthTexture.format=Zn,H.map.depthTexture.compareFunction=null,H.map.depthTexture.minFilter=jt,H.map.depthTexture.magFilter=jt}else q.isPointLight?(H.map=new qc(r.x),H.map.depthTexture=new xu(r.x,Bn)):(H.map=new Nn(r.x,r.y),H.map.depthTexture=new Ir(r.x,r.y,Bn)),H.map.depthTexture.name=q.name+".shadowMap",H.map.depthTexture.format=Zn,this.type===wr?(H.map.depthTexture.compareFunction=ie?za:ka,H.map.depthTexture.minFilter=Xt,H.map.depthTexture.magFilter=Xt):(H.map.depthTexture.compareFunction=null,H.map.depthTexture.minFilter=jt,H.map.depthTexture.magFilter=jt);H.camera.updateProjectionMatrix()}const Ee=H.map.isWebGLCubeRenderTarget?6:1;for(let be=0;be<Ee;be++){if(H.map.isWebGLCubeRenderTarget)i.setRenderTarget(H.map,be),i.clear();else{be===0&&(i.setRenderTarget(H.map),i.clear());const we=H.getViewport(be);o.set(s.x*we.x,s.y*we.y,s.x*we.z,s.y*we.w),V.viewport(o)}if(q.isPointLight){const we=H.camera,Ze=H.matrix,Pt=q.distance||we.far;Pt!==we.far&&(we.far=Pt,we.updateProjectionMatrix()),vr.setFromMatrixPosition(q.matrixWorld),we.position.copy(vr),Ao.copy(we.position),Ao.add(pg[be]),we.up.copy(mg[be]),we.lookAt(Ao),we.updateMatrixWorld(),Ze.makeTranslation(-vr.x,-vr.y,-vr.z),Ql.multiplyMatrices(we.projectionMatrix,we.matrixWorldInverse),H._frustum.setFromProjectionMatrix(Ql,we.coordinateSystem,we.reversedDepth)}else H.updateMatrices(q);n=H.getFrustum(),A(L,E,H.camera,q,this.type)}H.isPointLightShadow!==!0&&this.type===Tr&&b(H,E),H.needsUpdate=!1}p=this.type,v.needsUpdate=!1,i.setRenderTarget(w,j,D)};function b(P,L){const E=e.update(y);f.defines.VSM_SAMPLES!==P.blurSamples&&(f.defines.VSM_SAMPLES=P.blurSamples,_.defines.VSM_SAMPLES=P.blurSamples,f.needsUpdate=!0,_.needsUpdate=!0),P.mapPass===null&&(P.mapPass=new Nn(r.x,r.y,{format:er,type:Kn})),f.uniforms.shadow_pass.value=P.map.depthTexture,f.uniforms.resolution.value=P.mapSize,f.uniforms.radius.value=P.radius,i.setRenderTarget(P.mapPass),i.clear(),i.renderBufferDirect(L,null,E,f,y,null),_.uniforms.shadow_pass.value=P.mapPass.texture,_.uniforms.resolution.value=P.mapSize,_.uniforms.radius.value=P.radius,i.setRenderTarget(P.map),i.clear(),i.renderBufferDirect(L,null,E,_,y,null)}function C(P,L,E,w){let j=null;const D=E.isPointLight===!0?P.customDistanceMaterial:P.customDepthMaterial;if(D!==void 0)j=D;else if(j=E.isPointLight===!0?l:a,i.localClippingEnabled&&L.clipShadows===!0&&Array.isArray(L.clippingPlanes)&&L.clippingPlanes.length!==0||L.displacementMap&&L.displacementScale!==0||L.alphaMap&&L.alphaTest>0||L.map&&L.alphaTest>0||L.alphaToCoverage===!0){const V=j.uuid,X=L.uuid;let Y=c[V];Y===void 0&&(Y={},c[V]=Y);let $=Y[X];$===void 0&&($=j.clone(),Y[X]=$,L.addEventListener("dispose",I)),j=$}if(j.visible=L.visible,j.wireframe=L.wireframe,w===Tr?j.side=L.shadowSide!==null?L.shadowSide:L.side:j.side=L.shadowSide!==null?L.shadowSide:d[L.side],j.alphaMap=L.alphaMap,j.alphaTest=L.alphaToCoverage===!0?.5:L.alphaTest,j.map=L.map,j.clipShadows=L.clipShadows,j.clippingPlanes=L.clippingPlanes,j.clipIntersection=L.clipIntersection,j.displacementMap=L.displacementMap,j.displacementScale=L.displacementScale,j.displacementBias=L.displacementBias,j.wireframeLinewidth=L.wireframeLinewidth,j.linewidth=L.linewidth,E.isPointLight===!0&&j.isMeshDistanceMaterial===!0){const V=i.properties.get(j);V.light=E}return j}function A(P,L,E,w,j){if(P.visible===!1)return;if(P.layers.test(L.layers)&&(P.isMesh||P.isLine||P.isPoints)&&(P.castShadow||P.receiveShadow&&j===Tr)&&(!P.frustumCulled||n.intersectsObject(P))){P.modelViewMatrix.multiplyMatrices(E.matrixWorldInverse,P.matrixWorld);const X=e.update(P),Y=P.material;if(Array.isArray(Y)){const $=X.groups;for(let q=0,H=$.length;q<H;q++){const le=$[q],ie=Y[le.materialIndex];if(ie&&ie.visible){const Ee=C(P,ie,w,j);P.onBeforeShadow(i,P,L,E,X,Ee,le),i.renderBufferDirect(E,null,X,Ee,P,le),P.onAfterShadow(i,P,L,E,X,Ee,le)}}}else if(Y.visible){const $=C(P,Y,w,j);P.onBeforeShadow(i,P,L,E,X,$,null),i.renderBufferDirect(E,null,X,$,P,null),P.onAfterShadow(i,P,L,E,X,$,null)}}const V=P.children;for(let X=0,Y=V.length;X<Y;X++)A(V[X],L,E,w,j)}function I(P){P.target.removeEventListener("dispose",I);for(const E in c){const w=c[E],j=P.target.uuid;j in w&&(w[j].dispose(),delete w[j])}}}function _g(i,e){function t(){let O=!1;const de=new Ft;let ce=null;const Ae=new Ft(0,0,0,0);return{setMask:function(re){ce!==re&&!O&&(i.colorMask(re,re,re,re),ce=re)},setLocked:function(re){O=re},setClear:function(re,K,Ce,Ye,Tt){Tt===!0&&(re*=Ye,K*=Ye,Ce*=Ye),de.set(re,K,Ce,Ye),Ae.equals(de)===!1&&(i.clearColor(re,K,Ce,Ye),Ae.copy(de))},reset:function(){O=!1,ce=null,Ae.set(-1,0,0,0)}}}function n(){let O=!1,de=!1,ce=null,Ae=null,re=null;return{setReversed:function(K){if(de!==K){const Ce=e.get("EXT_clip_control");K?Ce.clipControlEXT(Ce.LOWER_LEFT_EXT,Ce.ZERO_TO_ONE_EXT):Ce.clipControlEXT(Ce.LOWER_LEFT_EXT,Ce.NEGATIVE_ONE_TO_ONE_EXT),de=K;const Ye=re;re=null,this.setClear(Ye)}},getReversed:function(){return de},setTest:function(K){K?me(i.DEPTH_TEST):ge(i.DEPTH_TEST)},setMask:function(K){ce!==K&&!O&&(i.depthMask(K),ce=K)},setFunc:function(K){if(de&&(K=Yh[K]),Ae!==K){switch(K){case Fo:i.depthFunc(i.NEVER);break;case Bo:i.depthFunc(i.ALWAYS);break;case ko:i.depthFunc(i.LESS);break;case Dn:i.depthFunc(i.LEQUAL);break;case zo:i.depthFunc(i.EQUAL);break;case Ho:i.depthFunc(i.GEQUAL);break;case Ar:i.depthFunc(i.GREATER);break;case Vo:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}Ae=K}},setLocked:function(K){O=K},setClear:function(K){re!==K&&(re=K,de&&(K=1-K),i.clearDepth(K))},reset:function(){O=!1,ce=null,Ae=null,re=null,de=!1}}}function r(){let O=!1,de=null,ce=null,Ae=null,re=null,K=null,Ce=null,Ye=null,Tt=null;return{setTest:function(tt){O||(tt?me(i.STENCIL_TEST):ge(i.STENCIL_TEST))},setMask:function(tt){de!==tt&&!O&&(i.stencilMask(tt),de=tt)},setFunc:function(tt,vn,Yt){(ce!==tt||Ae!==vn||re!==Yt)&&(i.stencilFunc(tt,vn,Yt),ce=tt,Ae=vn,re=Yt)},setOp:function(tt,vn,Yt){(K!==tt||Ce!==vn||Ye!==Yt)&&(i.stencilOp(tt,vn,Yt),K=tt,Ce=vn,Ye=Yt)},setLocked:function(tt){O=tt},setClear:function(tt){Tt!==tt&&(i.clearStencil(tt),Tt=tt)},reset:function(){O=!1,de=null,ce=null,Ae=null,re=null,K=null,Ce=null,Ye=null,Tt=null}}}const s=new t,o=new n,a=new r,l=new WeakMap,c=new WeakMap;let u={},d={},f=new WeakMap,_=[],x=null,y=!1,v=null,p=null,b=null,C=null,A=null,I=null,P=null,L=new mt(0,0,0),E=0,w=!1,j=null,D=null,V=null,X=null,Y=null;const $=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let q=!1,H=0;const le=i.getParameter(i.VERSION);le.indexOf("WebGL")!==-1?(H=parseFloat(/^WebGL (\d)/.exec(le)[1]),q=H>=1):le.indexOf("OpenGL ES")!==-1&&(H=parseFloat(/^OpenGL ES (\d)/.exec(le)[1]),q=H>=2);let ie=null,Ee={};const be=i.getParameter(i.SCISSOR_BOX),we=i.getParameter(i.VIEWPORT),Ze=new Ft().fromArray(be),Pt=new Ft().fromArray(we);function At(O,de,ce,Ae){const re=new Uint8Array(4),K=i.createTexture();i.bindTexture(O,K),i.texParameteri(O,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(O,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Ce=0;Ce<ce;Ce++)O===i.TEXTURE_3D||O===i.TEXTURE_2D_ARRAY?i.texImage3D(de,0,i.RGBA,1,1,Ae,0,i.RGBA,i.UNSIGNED_BYTE,re):i.texImage2D(de+Ce,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,re);return K}const Q={};Q[i.TEXTURE_2D]=At(i.TEXTURE_2D,i.TEXTURE_2D,1),Q[i.TEXTURE_CUBE_MAP]=At(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),Q[i.TEXTURE_2D_ARRAY]=At(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),Q[i.TEXTURE_3D]=At(i.TEXTURE_3D,i.TEXTURE_3D,1,1),s.setClear(0,0,0,1),o.setClear(1),a.setClear(0),me(i.DEPTH_TEST),o.setFunc(Dn),Qe(!1),Rt(el),me(i.CULL_FACE),gt(qn);function me(O){u[O]!==!0&&(i.enable(O),u[O]=!0)}function ge(O){u[O]!==!1&&(i.disable(O),u[O]=!1)}function Ke(O,de){return d[O]!==de?(i.bindFramebuffer(O,de),d[O]=de,O===i.DRAW_FRAMEBUFFER&&(d[i.FRAMEBUFFER]=de),O===i.FRAMEBUFFER&&(d[i.DRAW_FRAMEBUFFER]=de),!0):!1}function ze(O,de){let ce=_,Ae=!1;if(O){ce=f.get(de),ce===void 0&&(ce=[],f.set(de,ce));const re=O.textures;if(ce.length!==re.length||ce[0]!==i.COLOR_ATTACHMENT0){for(let K=0,Ce=re.length;K<Ce;K++)ce[K]=i.COLOR_ATTACHMENT0+K;ce.length=re.length,Ae=!0}}else ce[0]!==i.BACK&&(ce[0]=i.BACK,Ae=!0);Ae&&i.drawBuffers(ce)}function Xe(O){return x!==O?(i.useProgram(O),x=O,!0):!1}const Ut={[Ei]:i.FUNC_ADD,[gh]:i.FUNC_SUBTRACT,[_h]:i.FUNC_REVERSE_SUBTRACT};Ut[vh]=i.MIN,Ut[xh]=i.MAX;const We={[Mh]:i.ZERO,[Sh]:i.ONE,[yh]:i.SRC_COLOR,[Oo]:i.SRC_ALPHA,[Rh]:i.SRC_ALPHA_SATURATE,[wh]:i.DST_COLOR,[Th]:i.DST_ALPHA,[Eh]:i.ONE_MINUS_SRC_COLOR,[No]:i.ONE_MINUS_SRC_ALPHA,[Ah]:i.ONE_MINUS_DST_COLOR,[bh]:i.ONE_MINUS_DST_ALPHA,[Ch]:i.CONSTANT_COLOR,[Ph]:i.ONE_MINUS_CONSTANT_COLOR,[Ih]:i.CONSTANT_ALPHA,[Dh]:i.ONE_MINUS_CONSTANT_ALPHA};function gt(O,de,ce,Ae,re,K,Ce,Ye,Tt,tt){if(O===qn){y===!0&&(ge(i.BLEND),y=!1);return}if(y===!1&&(me(i.BLEND),y=!0),O!==mh){if(O!==v||tt!==w){if((p!==Ei||A!==Ei)&&(i.blendEquation(i.FUNC_ADD),p=Ei,A=Ei),tt)switch(O){case Zi:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Ms:i.blendFunc(i.ONE,i.ONE);break;case tl:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case nl:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:vt("WebGLState: Invalid blending: ",O);break}else switch(O){case Zi:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Ms:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case tl:vt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case nl:vt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:vt("WebGLState: Invalid blending: ",O);break}b=null,C=null,I=null,P=null,L.set(0,0,0),E=0,v=O,w=tt}return}re=re||de,K=K||ce,Ce=Ce||Ae,(de!==p||re!==A)&&(i.blendEquationSeparate(Ut[de],Ut[re]),p=de,A=re),(ce!==b||Ae!==C||K!==I||Ce!==P)&&(i.blendFuncSeparate(We[ce],We[Ae],We[K],We[Ce]),b=ce,C=Ae,I=K,P=Ce),(Ye.equals(L)===!1||Tt!==E)&&(i.blendColor(Ye.r,Ye.g,Ye.b,Tt),L.copy(Ye),E=Tt),v=O,w=!1}function yt(O,de){O.side===_n?ge(i.CULL_FACE):me(i.CULL_FACE);let ce=O.side===ln;de&&(ce=!ce),Qe(ce),O.blending===Zi&&O.transparent===!1?gt(qn):gt(O.blending,O.blendEquation,O.blendSrc,O.blendDst,O.blendEquationAlpha,O.blendSrcAlpha,O.blendDstAlpha,O.blendColor,O.blendAlpha,O.premultipliedAlpha),o.setFunc(O.depthFunc),o.setTest(O.depthTest),o.setMask(O.depthWrite),s.setMask(O.colorWrite);const Ae=O.stencilWrite;a.setTest(Ae),Ae&&(a.setMask(O.stencilWriteMask),a.setFunc(O.stencilFunc,O.stencilRef,O.stencilFuncMask),a.setOp(O.stencilFail,O.stencilZFail,O.stencilZPass)),Dt(O.polygonOffset,O.polygonOffsetFactor,O.polygonOffsetUnits),O.alphaToCoverage===!0?me(i.SAMPLE_ALPHA_TO_COVERAGE):ge(i.SAMPLE_ALPHA_TO_COVERAGE)}function Qe(O){j!==O&&(O?i.frontFace(i.CW):i.frontFace(i.CCW),j=O)}function Rt(O){O!==fh?(me(i.CULL_FACE),O!==D&&(O===el?i.cullFace(i.BACK):O===dh?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):ge(i.CULL_FACE),D=O}function U(O){O!==V&&(q&&i.lineWidth(O),V=O)}function Dt(O,de,ce){O?(me(i.POLYGON_OFFSET_FILL),(X!==de||Y!==ce)&&(X=de,Y=ce,o.getReversed()&&(de=-de),i.polygonOffset(de,ce))):ge(i.POLYGON_OFFSET_FILL)}function ut(O){O?me(i.SCISSOR_TEST):ge(i.SCISSOR_TEST)}function _t(O){O===void 0&&(O=i.TEXTURE0+$-1),ie!==O&&(i.activeTexture(O),ie=O)}function Le(O,de,ce){ce===void 0&&(ie===null?ce=i.TEXTURE0+$-1:ce=ie);let Ae=Ee[ce];Ae===void 0&&(Ae={type:void 0,texture:void 0},Ee[ce]=Ae),(Ae.type!==O||Ae.texture!==de)&&(ie!==ce&&(i.activeTexture(ce),ie=ce),i.bindTexture(O,de||Q[O]),Ae.type=O,Ae.texture=de)}function R(){const O=Ee[ie];O!==void 0&&O.type!==void 0&&(i.bindTexture(O.type,null),O.type=void 0,O.texture=void 0)}function M(){try{i.compressedTexImage2D(...arguments)}catch(O){vt("WebGLState:",O)}}function k(){try{i.compressedTexImage3D(...arguments)}catch(O){vt("WebGLState:",O)}}function J(){try{i.texSubImage2D(...arguments)}catch(O){vt("WebGLState:",O)}}function te(){try{i.texSubImage3D(...arguments)}catch(O){vt("WebGLState:",O)}}function Z(){try{i.compressedTexSubImage2D(...arguments)}catch(O){vt("WebGLState:",O)}}function Re(){try{i.compressedTexSubImage3D(...arguments)}catch(O){vt("WebGLState:",O)}}function fe(){try{i.texStorage2D(...arguments)}catch(O){vt("WebGLState:",O)}}function ke(){try{i.texStorage3D(...arguments)}catch(O){vt("WebGLState:",O)}}function Ve(){try{i.texImage2D(...arguments)}catch(O){vt("WebGLState:",O)}}function se(){try{i.texImage3D(...arguments)}catch(O){vt("WebGLState:",O)}}function ae(O){Ze.equals(O)===!1&&(i.scissor(O.x,O.y,O.z,O.w),Ze.copy(O))}function Ie(O){Pt.equals(O)===!1&&(i.viewport(O.x,O.y,O.z,O.w),Pt.copy(O))}function De(O,de){let ce=c.get(de);ce===void 0&&(ce=new WeakMap,c.set(de,ce));let Ae=ce.get(O);Ae===void 0&&(Ae=i.getUniformBlockIndex(de,O.name),ce.set(O,Ae))}function Te(O,de){const Ae=c.get(de).get(O);l.get(de)!==Ae&&(i.uniformBlockBinding(de,Ae,O.__bindingPointIndex),l.set(de,Ae))}function et(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),u={},ie=null,Ee={},d={},f=new WeakMap,_=[],x=null,y=!1,v=null,p=null,b=null,C=null,A=null,I=null,P=null,L=new mt(0,0,0),E=0,w=!1,j=null,D=null,V=null,X=null,Y=null,Ze.set(0,0,i.canvas.width,i.canvas.height),Pt.set(0,0,i.canvas.width,i.canvas.height),s.reset(),o.reset(),a.reset()}return{buffers:{color:s,depth:o,stencil:a},enable:me,disable:ge,bindFramebuffer:Ke,drawBuffers:ze,useProgram:Xe,setBlending:gt,setMaterial:yt,setFlipSided:Qe,setCullFace:Rt,setLineWidth:U,setPolygonOffset:Dt,setScissorTest:ut,activeTexture:_t,bindTexture:Le,unbindTexture:R,compressedTexImage2D:M,compressedTexImage3D:k,texImage2D:Ve,texImage3D:se,updateUBOMapping:De,uniformBlockBinding:Te,texStorage2D:fe,texStorage3D:ke,texSubImage2D:J,texSubImage3D:te,compressedTexSubImage2D:Z,compressedTexSubImage3D:Re,scissor:ae,viewport:Ie,reset:et}}function vg(i,e,t,n,r,s,o){const a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new ht,u=new WeakMap;let d;const f=new WeakMap;let _=!1;try{_=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function x(R,M){return _?new OffscreenCanvas(R,M):ys("canvas")}function y(R,M,k){let J=1;const te=Le(R);if((te.width>k||te.height>k)&&(J=k/Math.max(te.width,te.height)),J<1)if(typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&R instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&R instanceof ImageBitmap||typeof VideoFrame<"u"&&R instanceof VideoFrame){const Z=Math.floor(J*te.width),Re=Math.floor(J*te.height);d===void 0&&(d=x(Z,Re));const fe=M?x(Z,Re):d;return fe.width=Z,fe.height=Re,fe.getContext("2d").drawImage(R,0,0,Z,Re),je("WebGLRenderer: Texture has been resized from ("+te.width+"x"+te.height+") to ("+Z+"x"+Re+")."),fe}else return"data"in R&&je("WebGLRenderer: Image in DataTexture is too big ("+te.width+"x"+te.height+")."),R;return R}function v(R){return R.generateMipmaps}function p(R){i.generateMipmap(R)}function b(R){return R.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:R.isWebGL3DRenderTarget?i.TEXTURE_3D:R.isWebGLArrayRenderTarget||R.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function C(R,M,k,J,te=!1){if(R!==null){if(i[R]!==void 0)return i[R];je("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+R+"'")}let Z=M;if(M===i.RED&&(k===i.FLOAT&&(Z=i.R32F),k===i.HALF_FLOAT&&(Z=i.R16F),k===i.UNSIGNED_BYTE&&(Z=i.R8)),M===i.RED_INTEGER&&(k===i.UNSIGNED_BYTE&&(Z=i.R8UI),k===i.UNSIGNED_SHORT&&(Z=i.R16UI),k===i.UNSIGNED_INT&&(Z=i.R32UI),k===i.BYTE&&(Z=i.R8I),k===i.SHORT&&(Z=i.R16I),k===i.INT&&(Z=i.R32I)),M===i.RG&&(k===i.FLOAT&&(Z=i.RG32F),k===i.HALF_FLOAT&&(Z=i.RG16F),k===i.UNSIGNED_BYTE&&(Z=i.RG8)),M===i.RG_INTEGER&&(k===i.UNSIGNED_BYTE&&(Z=i.RG8UI),k===i.UNSIGNED_SHORT&&(Z=i.RG16UI),k===i.UNSIGNED_INT&&(Z=i.RG32UI),k===i.BYTE&&(Z=i.RG8I),k===i.SHORT&&(Z=i.RG16I),k===i.INT&&(Z=i.RG32I)),M===i.RGB_INTEGER&&(k===i.UNSIGNED_BYTE&&(Z=i.RGB8UI),k===i.UNSIGNED_SHORT&&(Z=i.RGB16UI),k===i.UNSIGNED_INT&&(Z=i.RGB32UI),k===i.BYTE&&(Z=i.RGB8I),k===i.SHORT&&(Z=i.RGB16I),k===i.INT&&(Z=i.RGB32I)),M===i.RGBA_INTEGER&&(k===i.UNSIGNED_BYTE&&(Z=i.RGBA8UI),k===i.UNSIGNED_SHORT&&(Z=i.RGBA16UI),k===i.UNSIGNED_INT&&(Z=i.RGBA32UI),k===i.BYTE&&(Z=i.RGBA8I),k===i.SHORT&&(Z=i.RGBA16I),k===i.INT&&(Z=i.RGBA32I)),M===i.RGB&&(k===i.UNSIGNED_INT_5_9_9_9_REV&&(Z=i.RGB9_E5),k===i.UNSIGNED_INT_10F_11F_11F_REV&&(Z=i.R11F_G11F_B10F)),M===i.RGBA){const Re=te?Ss:xt.getTransfer(J);k===i.FLOAT&&(Z=i.RGBA32F),k===i.HALF_FLOAT&&(Z=i.RGBA16F),k===i.UNSIGNED_BYTE&&(Z=Re===Et?i.SRGB8_ALPHA8:i.RGBA8),k===i.UNSIGNED_SHORT_4_4_4_4&&(Z=i.RGBA4),k===i.UNSIGNED_SHORT_5_5_5_1&&(Z=i.RGB5_A1)}return(Z===i.R16F||Z===i.R32F||Z===i.RG16F||Z===i.RG32F||Z===i.RGBA16F||Z===i.RGBA32F)&&e.get("EXT_color_buffer_float"),Z}function A(R,M){let k;return R?M===null||M===Bn||M===Cr?k=i.DEPTH24_STENCIL8:M===Ln?k=i.DEPTH32F_STENCIL8:M===Rr&&(k=i.DEPTH24_STENCIL8,je("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):M===null||M===Bn||M===Cr?k=i.DEPTH_COMPONENT24:M===Ln?k=i.DEPTH_COMPONENT32F:M===Rr&&(k=i.DEPTH_COMPONENT16),k}function I(R,M){return v(R)===!0||R.isFramebufferTexture&&R.minFilter!==jt&&R.minFilter!==Xt?Math.log2(Math.max(M.width,M.height))+1:R.mipmaps!==void 0&&R.mipmaps.length>0?R.mipmaps.length:R.isCompressedTexture&&Array.isArray(R.image)?M.mipmaps.length:1}function P(R){const M=R.target;M.removeEventListener("dispose",P),E(M),M.isVideoTexture&&u.delete(M)}function L(R){const M=R.target;M.removeEventListener("dispose",L),j(M)}function E(R){const M=n.get(R);if(M.__webglInit===void 0)return;const k=R.source,J=f.get(k);if(J){const te=J[M.__cacheKey];te.usedTimes--,te.usedTimes===0&&w(R),Object.keys(J).length===0&&f.delete(k)}n.remove(R)}function w(R){const M=n.get(R);i.deleteTexture(M.__webglTexture);const k=R.source,J=f.get(k);delete J[M.__cacheKey],o.memory.textures--}function j(R){const M=n.get(R);if(R.depthTexture&&(R.depthTexture.dispose(),n.remove(R.depthTexture)),R.isWebGLCubeRenderTarget)for(let J=0;J<6;J++){if(Array.isArray(M.__webglFramebuffer[J]))for(let te=0;te<M.__webglFramebuffer[J].length;te++)i.deleteFramebuffer(M.__webglFramebuffer[J][te]);else i.deleteFramebuffer(M.__webglFramebuffer[J]);M.__webglDepthbuffer&&i.deleteRenderbuffer(M.__webglDepthbuffer[J])}else{if(Array.isArray(M.__webglFramebuffer))for(let J=0;J<M.__webglFramebuffer.length;J++)i.deleteFramebuffer(M.__webglFramebuffer[J]);else i.deleteFramebuffer(M.__webglFramebuffer);if(M.__webglDepthbuffer&&i.deleteRenderbuffer(M.__webglDepthbuffer),M.__webglMultisampledFramebuffer&&i.deleteFramebuffer(M.__webglMultisampledFramebuffer),M.__webglColorRenderbuffer)for(let J=0;J<M.__webglColorRenderbuffer.length;J++)M.__webglColorRenderbuffer[J]&&i.deleteRenderbuffer(M.__webglColorRenderbuffer[J]);M.__webglDepthRenderbuffer&&i.deleteRenderbuffer(M.__webglDepthRenderbuffer)}const k=R.textures;for(let J=0,te=k.length;J<te;J++){const Z=n.get(k[J]);Z.__webglTexture&&(i.deleteTexture(Z.__webglTexture),o.memory.textures--),n.remove(k[J])}n.remove(R)}let D=0;function V(){D=0}function X(){const R=D;return R>=r.maxTextures&&je("WebGLTextures: Trying to use "+R+" texture units while this GPU supports only "+r.maxTextures),D+=1,R}function Y(R){const M=[];return M.push(R.wrapS),M.push(R.wrapT),M.push(R.wrapR||0),M.push(R.magFilter),M.push(R.minFilter),M.push(R.anisotropy),M.push(R.internalFormat),M.push(R.format),M.push(R.type),M.push(R.generateMipmaps),M.push(R.premultiplyAlpha),M.push(R.flipY),M.push(R.unpackAlignment),M.push(R.colorSpace),M.join()}function $(R,M){const k=n.get(R);if(R.isVideoTexture&&ut(R),R.isRenderTargetTexture===!1&&R.isExternalTexture!==!0&&R.version>0&&k.__version!==R.version){const J=R.image;if(J===null)je("WebGLRenderer: Texture marked for update but no image data found.");else if(J.complete===!1)je("WebGLRenderer: Texture marked for update but image is incomplete");else{Q(k,R,M);return}}else R.isExternalTexture&&(k.__webglTexture=R.sourceTexture?R.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,k.__webglTexture,i.TEXTURE0+M)}function q(R,M){const k=n.get(R);if(R.isRenderTargetTexture===!1&&R.version>0&&k.__version!==R.version){Q(k,R,M);return}else R.isExternalTexture&&(k.__webglTexture=R.sourceTexture?R.sourceTexture:null);t.bindTexture(i.TEXTURE_2D_ARRAY,k.__webglTexture,i.TEXTURE0+M)}function H(R,M){const k=n.get(R);if(R.isRenderTargetTexture===!1&&R.version>0&&k.__version!==R.version){Q(k,R,M);return}t.bindTexture(i.TEXTURE_3D,k.__webglTexture,i.TEXTURE0+M)}function le(R,M){const k=n.get(R);if(R.isCubeDepthTexture!==!0&&R.version>0&&k.__version!==R.version){me(k,R,M);return}t.bindTexture(i.TEXTURE_CUBE_MAP,k.__webglTexture,i.TEXTURE0+M)}const ie={[bi]:i.REPEAT,[Yn]:i.CLAMP_TO_EDGE,[Go]:i.MIRRORED_REPEAT},Ee={[jt]:i.NEAREST,[Oh]:i.NEAREST_MIPMAP_NEAREST,[kr]:i.NEAREST_MIPMAP_LINEAR,[Xt]:i.LINEAR,[qs]:i.LINEAR_MIPMAP_NEAREST,[wi]:i.LINEAR_MIPMAP_LINEAR},be={[Bh]:i.NEVER,[Gh]:i.ALWAYS,[kh]:i.LESS,[ka]:i.LEQUAL,[zh]:i.EQUAL,[za]:i.GEQUAL,[Hh]:i.GREATER,[Vh]:i.NOTEQUAL};function we(R,M){if(M.type===Ln&&e.has("OES_texture_float_linear")===!1&&(M.magFilter===Xt||M.magFilter===qs||M.magFilter===kr||M.magFilter===wi||M.minFilter===Xt||M.minFilter===qs||M.minFilter===kr||M.minFilter===wi)&&je("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(R,i.TEXTURE_WRAP_S,ie[M.wrapS]),i.texParameteri(R,i.TEXTURE_WRAP_T,ie[M.wrapT]),(R===i.TEXTURE_3D||R===i.TEXTURE_2D_ARRAY)&&i.texParameteri(R,i.TEXTURE_WRAP_R,ie[M.wrapR]),i.texParameteri(R,i.TEXTURE_MAG_FILTER,Ee[M.magFilter]),i.texParameteri(R,i.TEXTURE_MIN_FILTER,Ee[M.minFilter]),M.compareFunction&&(i.texParameteri(R,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(R,i.TEXTURE_COMPARE_FUNC,be[M.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(M.magFilter===jt||M.minFilter!==kr&&M.minFilter!==wi||M.type===Ln&&e.has("OES_texture_float_linear")===!1)return;if(M.anisotropy>1||n.get(M).__currentAnisotropy){const k=e.get("EXT_texture_filter_anisotropic");i.texParameterf(R,k.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(M.anisotropy,r.getMaxAnisotropy())),n.get(M).__currentAnisotropy=M.anisotropy}}}function Ze(R,M){let k=!1;R.__webglInit===void 0&&(R.__webglInit=!0,M.addEventListener("dispose",P));const J=M.source;let te=f.get(J);te===void 0&&(te={},f.set(J,te));const Z=Y(M);if(Z!==R.__cacheKey){te[Z]===void 0&&(te[Z]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,k=!0),te[Z].usedTimes++;const Re=te[R.__cacheKey];Re!==void 0&&(te[R.__cacheKey].usedTimes--,Re.usedTimes===0&&w(M)),R.__cacheKey=Z,R.__webglTexture=te[Z].texture}return k}function Pt(R,M,k){return Math.floor(Math.floor(R/k)/M)}function At(R,M,k,J){const Z=R.updateRanges;if(Z.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,M.width,M.height,k,J,M.data);else{Z.sort((se,ae)=>se.start-ae.start);let Re=0;for(let se=1;se<Z.length;se++){const ae=Z[Re],Ie=Z[se],De=ae.start+ae.count,Te=Pt(Ie.start,M.width,4),et=Pt(ae.start,M.width,4);Ie.start<=De+1&&Te===et&&Pt(Ie.start+Ie.count-1,M.width,4)===Te?ae.count=Math.max(ae.count,Ie.start+Ie.count-ae.start):(++Re,Z[Re]=Ie)}Z.length=Re+1;const fe=i.getParameter(i.UNPACK_ROW_LENGTH),ke=i.getParameter(i.UNPACK_SKIP_PIXELS),Ve=i.getParameter(i.UNPACK_SKIP_ROWS);i.pixelStorei(i.UNPACK_ROW_LENGTH,M.width);for(let se=0,ae=Z.length;se<ae;se++){const Ie=Z[se],De=Math.floor(Ie.start/4),Te=Math.ceil(Ie.count/4),et=De%M.width,O=Math.floor(De/M.width),de=Te,ce=1;i.pixelStorei(i.UNPACK_SKIP_PIXELS,et),i.pixelStorei(i.UNPACK_SKIP_ROWS,O),t.texSubImage2D(i.TEXTURE_2D,0,et,O,de,ce,k,J,M.data)}R.clearUpdateRanges(),i.pixelStorei(i.UNPACK_ROW_LENGTH,fe),i.pixelStorei(i.UNPACK_SKIP_PIXELS,ke),i.pixelStorei(i.UNPACK_SKIP_ROWS,Ve)}}function Q(R,M,k){let J=i.TEXTURE_2D;(M.isDataArrayTexture||M.isCompressedArrayTexture)&&(J=i.TEXTURE_2D_ARRAY),M.isData3DTexture&&(J=i.TEXTURE_3D);const te=Ze(R,M),Z=M.source;t.bindTexture(J,R.__webglTexture,i.TEXTURE0+k);const Re=n.get(Z);if(Z.version!==Re.__version||te===!0){t.activeTexture(i.TEXTURE0+k);const fe=xt.getPrimaries(xt.workingColorSpace),ke=M.colorSpace===ai?null:xt.getPrimaries(M.colorSpace),Ve=M.colorSpace===ai||fe===ke?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,M.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,M.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ve);let se=y(M.image,!1,r.maxTextureSize);se=_t(M,se);const ae=s.convert(M.format,M.colorSpace),Ie=s.convert(M.type);let De=C(M.internalFormat,ae,Ie,M.colorSpace,M.isVideoTexture);we(J,M);let Te;const et=M.mipmaps,O=M.isVideoTexture!==!0,de=Re.__version===void 0||te===!0,ce=Z.dataReady,Ae=I(M,se);if(M.isDepthTexture)De=A(M.format===Ai,M.type),de&&(O?t.texStorage2D(i.TEXTURE_2D,1,De,se.width,se.height):t.texImage2D(i.TEXTURE_2D,0,De,se.width,se.height,0,ae,Ie,null));else if(M.isDataTexture)if(et.length>0){O&&de&&t.texStorage2D(i.TEXTURE_2D,Ae,De,et[0].width,et[0].height);for(let re=0,K=et.length;re<K;re++)Te=et[re],O?ce&&t.texSubImage2D(i.TEXTURE_2D,re,0,0,Te.width,Te.height,ae,Ie,Te.data):t.texImage2D(i.TEXTURE_2D,re,De,Te.width,Te.height,0,ae,Ie,Te.data);M.generateMipmaps=!1}else O?(de&&t.texStorage2D(i.TEXTURE_2D,Ae,De,se.width,se.height),ce&&At(M,se,ae,Ie)):t.texImage2D(i.TEXTURE_2D,0,De,se.width,se.height,0,ae,Ie,se.data);else if(M.isCompressedTexture)if(M.isCompressedArrayTexture){O&&de&&t.texStorage3D(i.TEXTURE_2D_ARRAY,Ae,De,et[0].width,et[0].height,se.depth);for(let re=0,K=et.length;re<K;re++)if(Te=et[re],M.format!==Tn)if(ae!==null)if(O){if(ce)if(M.layerUpdates.size>0){const Ce=Pl(Te.width,Te.height,M.format,M.type);for(const Ye of M.layerUpdates){const Tt=Te.data.subarray(Ye*Ce/Te.data.BYTES_PER_ELEMENT,(Ye+1)*Ce/Te.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,re,0,0,Ye,Te.width,Te.height,1,ae,Tt)}M.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,re,0,0,0,Te.width,Te.height,se.depth,ae,Te.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,re,De,Te.width,Te.height,se.depth,0,Te.data,0,0);else je("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else O?ce&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,re,0,0,0,Te.width,Te.height,se.depth,ae,Ie,Te.data):t.texImage3D(i.TEXTURE_2D_ARRAY,re,De,Te.width,Te.height,se.depth,0,ae,Ie,Te.data)}else{O&&de&&t.texStorage2D(i.TEXTURE_2D,Ae,De,et[0].width,et[0].height);for(let re=0,K=et.length;re<K;re++)Te=et[re],M.format!==Tn?ae!==null?O?ce&&t.compressedTexSubImage2D(i.TEXTURE_2D,re,0,0,Te.width,Te.height,ae,Te.data):t.compressedTexImage2D(i.TEXTURE_2D,re,De,Te.width,Te.height,0,Te.data):je("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):O?ce&&t.texSubImage2D(i.TEXTURE_2D,re,0,0,Te.width,Te.height,ae,Ie,Te.data):t.texImage2D(i.TEXTURE_2D,re,De,Te.width,Te.height,0,ae,Ie,Te.data)}else if(M.isDataArrayTexture)if(O){if(de&&t.texStorage3D(i.TEXTURE_2D_ARRAY,Ae,De,se.width,se.height,se.depth),ce)if(M.layerUpdates.size>0){const re=Pl(se.width,se.height,M.format,M.type);for(const K of M.layerUpdates){const Ce=se.data.subarray(K*re/se.data.BYTES_PER_ELEMENT,(K+1)*re/se.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,K,se.width,se.height,1,ae,Ie,Ce)}M.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,se.width,se.height,se.depth,ae,Ie,se.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,De,se.width,se.height,se.depth,0,ae,Ie,se.data);else if(M.isData3DTexture)O?(de&&t.texStorage3D(i.TEXTURE_3D,Ae,De,se.width,se.height,se.depth),ce&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,se.width,se.height,se.depth,ae,Ie,se.data)):t.texImage3D(i.TEXTURE_3D,0,De,se.width,se.height,se.depth,0,ae,Ie,se.data);else if(M.isFramebufferTexture){if(de)if(O)t.texStorage2D(i.TEXTURE_2D,Ae,De,se.width,se.height);else{let re=se.width,K=se.height;for(let Ce=0;Ce<Ae;Ce++)t.texImage2D(i.TEXTURE_2D,Ce,De,re,K,0,ae,Ie,null),re>>=1,K>>=1}}else if(et.length>0){if(O&&de){const re=Le(et[0]);t.texStorage2D(i.TEXTURE_2D,Ae,De,re.width,re.height)}for(let re=0,K=et.length;re<K;re++)Te=et[re],O?ce&&t.texSubImage2D(i.TEXTURE_2D,re,0,0,ae,Ie,Te):t.texImage2D(i.TEXTURE_2D,re,De,ae,Ie,Te);M.generateMipmaps=!1}else if(O){if(de){const re=Le(se);t.texStorage2D(i.TEXTURE_2D,Ae,De,re.width,re.height)}ce&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,ae,Ie,se)}else t.texImage2D(i.TEXTURE_2D,0,De,ae,Ie,se);v(M)&&p(J),Re.__version=Z.version,M.onUpdate&&M.onUpdate(M)}R.__version=M.version}function me(R,M,k){if(M.image.length!==6)return;const J=Ze(R,M),te=M.source;t.bindTexture(i.TEXTURE_CUBE_MAP,R.__webglTexture,i.TEXTURE0+k);const Z=n.get(te);if(te.version!==Z.__version||J===!0){t.activeTexture(i.TEXTURE0+k);const Re=xt.getPrimaries(xt.workingColorSpace),fe=M.colorSpace===ai?null:xt.getPrimaries(M.colorSpace),ke=M.colorSpace===ai||Re===fe?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,M.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,M.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,ke);const Ve=M.isCompressedTexture||M.image[0].isCompressedTexture,se=M.image[0]&&M.image[0].isDataTexture,ae=[];for(let K=0;K<6;K++)!Ve&&!se?ae[K]=y(M.image[K],!0,r.maxCubemapSize):ae[K]=se?M.image[K].image:M.image[K],ae[K]=_t(M,ae[K]);const Ie=ae[0],De=s.convert(M.format,M.colorSpace),Te=s.convert(M.type),et=C(M.internalFormat,De,Te,M.colorSpace),O=M.isVideoTexture!==!0,de=Z.__version===void 0||J===!0,ce=te.dataReady;let Ae=I(M,Ie);we(i.TEXTURE_CUBE_MAP,M);let re;if(Ve){O&&de&&t.texStorage2D(i.TEXTURE_CUBE_MAP,Ae,et,Ie.width,Ie.height);for(let K=0;K<6;K++){re=ae[K].mipmaps;for(let Ce=0;Ce<re.length;Ce++){const Ye=re[Ce];M.format!==Tn?De!==null?O?ce&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,Ce,0,0,Ye.width,Ye.height,De,Ye.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,Ce,et,Ye.width,Ye.height,0,Ye.data):je("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):O?ce&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,Ce,0,0,Ye.width,Ye.height,De,Te,Ye.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,Ce,et,Ye.width,Ye.height,0,De,Te,Ye.data)}}}else{if(re=M.mipmaps,O&&de){re.length>0&&Ae++;const K=Le(ae[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,Ae,et,K.width,K.height)}for(let K=0;K<6;K++)if(se){O?ce&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,0,0,ae[K].width,ae[K].height,De,Te,ae[K].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,et,ae[K].width,ae[K].height,0,De,Te,ae[K].data);for(let Ce=0;Ce<re.length;Ce++){const Tt=re[Ce].image[K].image;O?ce&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,Ce+1,0,0,Tt.width,Tt.height,De,Te,Tt.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,Ce+1,et,Tt.width,Tt.height,0,De,Te,Tt.data)}}else{O?ce&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,0,0,De,Te,ae[K]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,et,De,Te,ae[K]);for(let Ce=0;Ce<re.length;Ce++){const Ye=re[Ce];O?ce&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,Ce+1,0,0,De,Te,Ye.image[K]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+K,Ce+1,et,De,Te,Ye.image[K])}}}v(M)&&p(i.TEXTURE_CUBE_MAP),Z.__version=te.version,M.onUpdate&&M.onUpdate(M)}R.__version=M.version}function ge(R,M,k,J,te,Z){const Re=s.convert(k.format,k.colorSpace),fe=s.convert(k.type),ke=C(k.internalFormat,Re,fe,k.colorSpace),Ve=n.get(M),se=n.get(k);if(se.__renderTarget=M,!Ve.__hasExternalTextures){const ae=Math.max(1,M.width>>Z),Ie=Math.max(1,M.height>>Z);te===i.TEXTURE_3D||te===i.TEXTURE_2D_ARRAY?t.texImage3D(te,Z,ke,ae,Ie,M.depth,0,Re,fe,null):t.texImage2D(te,Z,ke,ae,Ie,0,Re,fe,null)}t.bindFramebuffer(i.FRAMEBUFFER,R),Dt(M)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,J,te,se.__webglTexture,0,U(M)):(te===i.TEXTURE_2D||te>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&te<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,J,te,se.__webglTexture,Z),t.bindFramebuffer(i.FRAMEBUFFER,null)}function Ke(R,M,k){if(i.bindRenderbuffer(i.RENDERBUFFER,R),M.depthBuffer){const J=M.depthTexture,te=J&&J.isDepthTexture?J.type:null,Z=A(M.stencilBuffer,te),Re=M.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;Dt(M)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,U(M),Z,M.width,M.height):k?i.renderbufferStorageMultisample(i.RENDERBUFFER,U(M),Z,M.width,M.height):i.renderbufferStorage(i.RENDERBUFFER,Z,M.width,M.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,Re,i.RENDERBUFFER,R)}else{const J=M.textures;for(let te=0;te<J.length;te++){const Z=J[te],Re=s.convert(Z.format,Z.colorSpace),fe=s.convert(Z.type),ke=C(Z.internalFormat,Re,fe,Z.colorSpace);Dt(M)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,U(M),ke,M.width,M.height):k?i.renderbufferStorageMultisample(i.RENDERBUFFER,U(M),ke,M.width,M.height):i.renderbufferStorage(i.RENDERBUFFER,ke,M.width,M.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function ze(R,M,k){const J=M.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(i.FRAMEBUFFER,R),!(M.depthTexture&&M.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const te=n.get(M.depthTexture);if(te.__renderTarget=M,(!te.__webglTexture||M.depthTexture.image.width!==M.width||M.depthTexture.image.height!==M.height)&&(M.depthTexture.image.width=M.width,M.depthTexture.image.height=M.height,M.depthTexture.needsUpdate=!0),J){if(te.__webglInit===void 0&&(te.__webglInit=!0,M.depthTexture.addEventListener("dispose",P)),te.__webglTexture===void 0){te.__webglTexture=i.createTexture(),t.bindTexture(i.TEXTURE_CUBE_MAP,te.__webglTexture),we(i.TEXTURE_CUBE_MAP,M.depthTexture);const Ve=s.convert(M.depthTexture.format),se=s.convert(M.depthTexture.type);let ae;M.depthTexture.format===Zn?ae=i.DEPTH_COMPONENT24:M.depthTexture.format===Ai&&(ae=i.DEPTH24_STENCIL8);for(let Ie=0;Ie<6;Ie++)i.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Ie,0,ae,M.width,M.height,0,Ve,se,null)}}else $(M.depthTexture,0);const Z=te.__webglTexture,Re=U(M),fe=J?i.TEXTURE_CUBE_MAP_POSITIVE_X+k:i.TEXTURE_2D,ke=M.depthTexture.format===Ai?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(M.depthTexture.format===Zn)Dt(M)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,ke,fe,Z,0,Re):i.framebufferTexture2D(i.FRAMEBUFFER,ke,fe,Z,0);else if(M.depthTexture.format===Ai)Dt(M)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,ke,fe,Z,0,Re):i.framebufferTexture2D(i.FRAMEBUFFER,ke,fe,Z,0);else throw new Error("Unknown depthTexture format")}function Xe(R){const M=n.get(R),k=R.isWebGLCubeRenderTarget===!0;if(M.__boundDepthTexture!==R.depthTexture){const J=R.depthTexture;if(M.__depthDisposeCallback&&M.__depthDisposeCallback(),J){const te=()=>{delete M.__boundDepthTexture,delete M.__depthDisposeCallback,J.removeEventListener("dispose",te)};J.addEventListener("dispose",te),M.__depthDisposeCallback=te}M.__boundDepthTexture=J}if(R.depthTexture&&!M.__autoAllocateDepthBuffer)if(k)for(let J=0;J<6;J++)ze(M.__webglFramebuffer[J],R,J);else{const J=R.texture.mipmaps;J&&J.length>0?ze(M.__webglFramebuffer[0],R,0):ze(M.__webglFramebuffer,R,0)}else if(k){M.__webglDepthbuffer=[];for(let J=0;J<6;J++)if(t.bindFramebuffer(i.FRAMEBUFFER,M.__webglFramebuffer[J]),M.__webglDepthbuffer[J]===void 0)M.__webglDepthbuffer[J]=i.createRenderbuffer(),Ke(M.__webglDepthbuffer[J],R,!1);else{const te=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Z=M.__webglDepthbuffer[J];i.bindRenderbuffer(i.RENDERBUFFER,Z),i.framebufferRenderbuffer(i.FRAMEBUFFER,te,i.RENDERBUFFER,Z)}}else{const J=R.texture.mipmaps;if(J&&J.length>0?t.bindFramebuffer(i.FRAMEBUFFER,M.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,M.__webglFramebuffer),M.__webglDepthbuffer===void 0)M.__webglDepthbuffer=i.createRenderbuffer(),Ke(M.__webglDepthbuffer,R,!1);else{const te=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Z=M.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,Z),i.framebufferRenderbuffer(i.FRAMEBUFFER,te,i.RENDERBUFFER,Z)}}t.bindFramebuffer(i.FRAMEBUFFER,null)}function Ut(R,M,k){const J=n.get(R);M!==void 0&&ge(J.__webglFramebuffer,R,R.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),k!==void 0&&Xe(R)}function We(R){const M=R.texture,k=n.get(R),J=n.get(M);R.addEventListener("dispose",L);const te=R.textures,Z=R.isWebGLCubeRenderTarget===!0,Re=te.length>1;if(Re||(J.__webglTexture===void 0&&(J.__webglTexture=i.createTexture()),J.__version=M.version,o.memory.textures++),Z){k.__webglFramebuffer=[];for(let fe=0;fe<6;fe++)if(M.mipmaps&&M.mipmaps.length>0){k.__webglFramebuffer[fe]=[];for(let ke=0;ke<M.mipmaps.length;ke++)k.__webglFramebuffer[fe][ke]=i.createFramebuffer()}else k.__webglFramebuffer[fe]=i.createFramebuffer()}else{if(M.mipmaps&&M.mipmaps.length>0){k.__webglFramebuffer=[];for(let fe=0;fe<M.mipmaps.length;fe++)k.__webglFramebuffer[fe]=i.createFramebuffer()}else k.__webglFramebuffer=i.createFramebuffer();if(Re)for(let fe=0,ke=te.length;fe<ke;fe++){const Ve=n.get(te[fe]);Ve.__webglTexture===void 0&&(Ve.__webglTexture=i.createTexture(),o.memory.textures++)}if(R.samples>0&&Dt(R)===!1){k.__webglMultisampledFramebuffer=i.createFramebuffer(),k.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,k.__webglMultisampledFramebuffer);for(let fe=0;fe<te.length;fe++){const ke=te[fe];k.__webglColorRenderbuffer[fe]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,k.__webglColorRenderbuffer[fe]);const Ve=s.convert(ke.format,ke.colorSpace),se=s.convert(ke.type),ae=C(ke.internalFormat,Ve,se,ke.colorSpace,R.isXRRenderTarget===!0),Ie=U(R);i.renderbufferStorageMultisample(i.RENDERBUFFER,Ie,ae,R.width,R.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+fe,i.RENDERBUFFER,k.__webglColorRenderbuffer[fe])}i.bindRenderbuffer(i.RENDERBUFFER,null),R.depthBuffer&&(k.__webglDepthRenderbuffer=i.createRenderbuffer(),Ke(k.__webglDepthRenderbuffer,R,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(Z){t.bindTexture(i.TEXTURE_CUBE_MAP,J.__webglTexture),we(i.TEXTURE_CUBE_MAP,M);for(let fe=0;fe<6;fe++)if(M.mipmaps&&M.mipmaps.length>0)for(let ke=0;ke<M.mipmaps.length;ke++)ge(k.__webglFramebuffer[fe][ke],R,M,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+fe,ke);else ge(k.__webglFramebuffer[fe],R,M,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+fe,0);v(M)&&p(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Re){for(let fe=0,ke=te.length;fe<ke;fe++){const Ve=te[fe],se=n.get(Ve);let ae=i.TEXTURE_2D;(R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(ae=R.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(ae,se.__webglTexture),we(ae,Ve),ge(k.__webglFramebuffer,R,Ve,i.COLOR_ATTACHMENT0+fe,ae,0),v(Ve)&&p(ae)}t.unbindTexture()}else{let fe=i.TEXTURE_2D;if((R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(fe=R.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(fe,J.__webglTexture),we(fe,M),M.mipmaps&&M.mipmaps.length>0)for(let ke=0;ke<M.mipmaps.length;ke++)ge(k.__webglFramebuffer[ke],R,M,i.COLOR_ATTACHMENT0,fe,ke);else ge(k.__webglFramebuffer,R,M,i.COLOR_ATTACHMENT0,fe,0);v(M)&&p(fe),t.unbindTexture()}R.depthBuffer&&Xe(R)}function gt(R){const M=R.textures;for(let k=0,J=M.length;k<J;k++){const te=M[k];if(v(te)){const Z=b(R),Re=n.get(te).__webglTexture;t.bindTexture(Z,Re),p(Z),t.unbindTexture()}}}const yt=[],Qe=[];function Rt(R){if(R.samples>0){if(Dt(R)===!1){const M=R.textures,k=R.width,J=R.height;let te=i.COLOR_BUFFER_BIT;const Z=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Re=n.get(R),fe=M.length>1;if(fe)for(let Ve=0;Ve<M.length;Ve++)t.bindFramebuffer(i.FRAMEBUFFER,Re.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ve,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,Re.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ve,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,Re.__webglMultisampledFramebuffer);const ke=R.texture.mipmaps;ke&&ke.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Re.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Re.__webglFramebuffer);for(let Ve=0;Ve<M.length;Ve++){if(R.resolveDepthBuffer&&(R.depthBuffer&&(te|=i.DEPTH_BUFFER_BIT),R.stencilBuffer&&R.resolveStencilBuffer&&(te|=i.STENCIL_BUFFER_BIT)),fe){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Re.__webglColorRenderbuffer[Ve]);const se=n.get(M[Ve]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,se,0)}i.blitFramebuffer(0,0,k,J,0,0,k,J,te,i.NEAREST),l===!0&&(yt.length=0,Qe.length=0,yt.push(i.COLOR_ATTACHMENT0+Ve),R.depthBuffer&&R.resolveDepthBuffer===!1&&(yt.push(Z),Qe.push(Z),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,Qe)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,yt))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),fe)for(let Ve=0;Ve<M.length;Ve++){t.bindFramebuffer(i.FRAMEBUFFER,Re.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ve,i.RENDERBUFFER,Re.__webglColorRenderbuffer[Ve]);const se=n.get(M[Ve]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,Re.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+Ve,i.TEXTURE_2D,se,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Re.__webglMultisampledFramebuffer)}else if(R.depthBuffer&&R.resolveDepthBuffer===!1&&l){const M=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[M])}}}function U(R){return Math.min(r.maxSamples,R.samples)}function Dt(R){const M=n.get(R);return R.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&M.__useRenderToTexture!==!1}function ut(R){const M=o.render.frame;u.get(R)!==M&&(u.set(R,M),R.update())}function _t(R,M){const k=R.colorSpace,J=R.format,te=R.type;return R.isCompressedTexture===!0||R.isVideoTexture===!0||k!==tr&&k!==ai&&(xt.getTransfer(k)===Et?(J!==Tn||te!==pn)&&je("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):vt("WebGLTextures: Unsupported texture color space:",k)),M}function Le(R){return typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement?(c.width=R.naturalWidth||R.width,c.height=R.naturalHeight||R.height):typeof VideoFrame<"u"&&R instanceof VideoFrame?(c.width=R.displayWidth,c.height=R.displayHeight):(c.width=R.width,c.height=R.height),c}this.allocateTextureUnit=X,this.resetTextureUnits=V,this.setTexture2D=$,this.setTexture2DArray=q,this.setTexture3D=H,this.setTextureCube=le,this.rebindTextures=Ut,this.setupRenderTarget=We,this.updateRenderTargetMipmap=gt,this.updateMultisampleRenderTarget=Rt,this.setupDepthRenderbuffer=Xe,this.setupFrameBufferTexture=ge,this.useMultisampledRTT=Dt,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function xg(i,e){function t(n,r=ai){let s;const o=xt.getTransfer(r);if(n===pn)return i.UNSIGNED_BYTE;if(n===Ua)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Oa)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Ic)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Dc)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===Cc)return i.BYTE;if(n===Pc)return i.SHORT;if(n===Rr)return i.UNSIGNED_SHORT;if(n===La)return i.INT;if(n===Bn)return i.UNSIGNED_INT;if(n===Ln)return i.FLOAT;if(n===Kn)return i.HALF_FLOAT;if(n===Lc)return i.ALPHA;if(n===Uc)return i.RGB;if(n===Tn)return i.RGBA;if(n===Zn)return i.DEPTH_COMPONENT;if(n===Ai)return i.DEPTH_STENCIL;if(n===Oc)return i.RED;if(n===Na)return i.RED_INTEGER;if(n===er)return i.RG;if(n===Fa)return i.RG_INTEGER;if(n===Ba)return i.RGBA_INTEGER;if(n===ds||n===ps||n===ms||n===gs)if(o===Et)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(n===ds)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===ps)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===ms)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===gs)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(n===ds)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===ps)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===ms)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===gs)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Wo||n===Xo||n===$o||n===Yo)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(n===Wo)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Xo)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===$o)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Yo)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===qo||n===jo||n===Ko||n===Zo||n===Jo||n===Qo||n===ea)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(n===qo||n===jo)return o===Et?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(n===Ko)return o===Et?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC;if(n===Zo)return s.COMPRESSED_R11_EAC;if(n===Jo)return s.COMPRESSED_SIGNED_R11_EAC;if(n===Qo)return s.COMPRESSED_RG11_EAC;if(n===ea)return s.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===ta||n===na||n===ia||n===ra||n===sa||n===oa||n===aa||n===la||n===ca||n===ha||n===ua||n===fa||n===da||n===pa)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(n===ta)return o===Et?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===na)return o===Et?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===ia)return o===Et?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===ra)return o===Et?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===sa)return o===Et?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===oa)return o===Et?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===aa)return o===Et?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===la)return o===Et?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===ca)return o===Et?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===ha)return o===Et?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===ua)return o===Et?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===fa)return o===Et?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===da)return o===Et?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===pa)return o===Et?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===ma||n===ga||n===_a)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(n===ma)return o===Et?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===ga)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===_a)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===va||n===xa||n===Ma||n===Sa)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(n===va)return s.COMPRESSED_RED_RGTC1_EXT;if(n===xa)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Ma)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Sa)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Cr?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}const Mg=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Sg=`
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

}`;class yg{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const n=new Wc(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new zn({vertexShader:Mg,fragmentShader:Sg,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new He(new Or(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Eg extends or{constructor(e,t){super();const n=this;let r=null,s=1,o=null,a="local-floor",l=1,c=null,u=null,d=null,f=null,_=null,x=null;const y=typeof XRWebGLBinding<"u",v=new yg,p={},b=t.getContextAttributes();let C=null,A=null;const I=[],P=[],L=new ht;let E=null;const w=new gn;w.viewport=new Ft;const j=new gn;j.viewport=new Ft;const D=[w,j],V=new Lu;let X=null,Y=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Q){let me=I[Q];return me===void 0&&(me=new no,I[Q]=me),me.getTargetRaySpace()},this.getControllerGrip=function(Q){let me=I[Q];return me===void 0&&(me=new no,I[Q]=me),me.getGripSpace()},this.getHand=function(Q){let me=I[Q];return me===void 0&&(me=new no,I[Q]=me),me.getHandSpace()};function $(Q){const me=P.indexOf(Q.inputSource);if(me===-1)return;const ge=I[me];ge!==void 0&&(ge.update(Q.inputSource,Q.frame,c||o),ge.dispatchEvent({type:Q.type,data:Q.inputSource}))}function q(){r.removeEventListener("select",$),r.removeEventListener("selectstart",$),r.removeEventListener("selectend",$),r.removeEventListener("squeeze",$),r.removeEventListener("squeezestart",$),r.removeEventListener("squeezeend",$),r.removeEventListener("end",q),r.removeEventListener("inputsourceschange",H);for(let Q=0;Q<I.length;Q++){const me=P[Q];me!==null&&(P[Q]=null,I[Q].disconnect(me))}X=null,Y=null,v.reset();for(const Q in p)delete p[Q];e.setRenderTarget(C),_=null,f=null,d=null,r=null,A=null,At.stop(),n.isPresenting=!1,e.setPixelRatio(E),e.setSize(L.width,L.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Q){s=Q,n.isPresenting===!0&&je("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Q){a=Q,n.isPresenting===!0&&je("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(Q){c=Q},this.getBaseLayer=function(){return f!==null?f:_},this.getBinding=function(){return d===null&&y&&(d=new XRWebGLBinding(r,t)),d},this.getFrame=function(){return x},this.getSession=function(){return r},this.setSession=async function(Q){if(r=Q,r!==null){if(C=e.getRenderTarget(),r.addEventListener("select",$),r.addEventListener("selectstart",$),r.addEventListener("selectend",$),r.addEventListener("squeeze",$),r.addEventListener("squeezestart",$),r.addEventListener("squeezeend",$),r.addEventListener("end",q),r.addEventListener("inputsourceschange",H),b.xrCompatible!==!0&&await t.makeXRCompatible(),E=e.getPixelRatio(),e.getSize(L),y&&"createProjectionLayer"in XRWebGLBinding.prototype){let ge=null,Ke=null,ze=null;b.depth&&(ze=b.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ge=b.stencil?Ai:Zn,Ke=b.stencil?Cr:Bn);const Xe={colorFormat:t.RGBA8,depthFormat:ze,scaleFactor:s};d=this.getBinding(),f=d.createProjectionLayer(Xe),r.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),A=new Nn(f.textureWidth,f.textureHeight,{format:Tn,type:pn,depthTexture:new Ir(f.textureWidth,f.textureHeight,Ke,void 0,void 0,void 0,void 0,void 0,void 0,ge),stencilBuffer:b.stencil,colorSpace:e.outputColorSpace,samples:b.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}else{const ge={antialias:b.antialias,alpha:!0,depth:b.depth,stencil:b.stencil,framebufferScaleFactor:s};_=new XRWebGLLayer(r,t,ge),r.updateRenderState({baseLayer:_}),e.setPixelRatio(1),e.setSize(_.framebufferWidth,_.framebufferHeight,!1),A=new Nn(_.framebufferWidth,_.framebufferHeight,{format:Tn,type:pn,colorSpace:e.outputColorSpace,stencilBuffer:b.stencil,resolveDepthBuffer:_.ignoreDepthValues===!1,resolveStencilBuffer:_.ignoreDepthValues===!1})}A.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await r.requestReferenceSpace(a),At.setContext(r),At.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return v.getDepthTexture()};function H(Q){for(let me=0;me<Q.removed.length;me++){const ge=Q.removed[me],Ke=P.indexOf(ge);Ke>=0&&(P[Ke]=null,I[Ke].disconnect(ge))}for(let me=0;me<Q.added.length;me++){const ge=Q.added[me];let Ke=P.indexOf(ge);if(Ke===-1){for(let Xe=0;Xe<I.length;Xe++)if(Xe>=P.length){P.push(ge),Ke=Xe;break}else if(P[Xe]===null){P[Xe]=ge,Ke=Xe;break}if(Ke===-1)break}const ze=I[Ke];ze&&ze.connect(ge)}}const le=new G,ie=new G;function Ee(Q,me,ge){le.setFromMatrixPosition(me.matrixWorld),ie.setFromMatrixPosition(ge.matrixWorld);const Ke=le.distanceTo(ie),ze=me.projectionMatrix.elements,Xe=ge.projectionMatrix.elements,Ut=ze[14]/(ze[10]-1),We=ze[14]/(ze[10]+1),gt=(ze[9]+1)/ze[5],yt=(ze[9]-1)/ze[5],Qe=(ze[8]-1)/ze[0],Rt=(Xe[8]+1)/Xe[0],U=Ut*Qe,Dt=Ut*Rt,ut=Ke/(-Qe+Rt),_t=ut*-Qe;if(me.matrixWorld.decompose(Q.position,Q.quaternion,Q.scale),Q.translateX(_t),Q.translateZ(ut),Q.matrixWorld.compose(Q.position,Q.quaternion,Q.scale),Q.matrixWorldInverse.copy(Q.matrixWorld).invert(),ze[10]===-1)Q.projectionMatrix.copy(me.projectionMatrix),Q.projectionMatrixInverse.copy(me.projectionMatrixInverse);else{const Le=Ut+ut,R=We+ut,M=U-_t,k=Dt+(Ke-_t),J=gt*We/R*Le,te=yt*We/R*Le;Q.projectionMatrix.makePerspective(M,k,J,te,Le,R),Q.projectionMatrixInverse.copy(Q.projectionMatrix).invert()}}function be(Q,me){me===null?Q.matrixWorld.copy(Q.matrix):Q.matrixWorld.multiplyMatrices(me.matrixWorld,Q.matrix),Q.matrixWorldInverse.copy(Q.matrixWorld).invert()}this.updateCamera=function(Q){if(r===null)return;let me=Q.near,ge=Q.far;v.texture!==null&&(v.depthNear>0&&(me=v.depthNear),v.depthFar>0&&(ge=v.depthFar)),V.near=j.near=w.near=me,V.far=j.far=w.far=ge,(X!==V.near||Y!==V.far)&&(r.updateRenderState({depthNear:V.near,depthFar:V.far}),X=V.near,Y=V.far),V.layers.mask=Q.layers.mask|6,w.layers.mask=V.layers.mask&-5,j.layers.mask=V.layers.mask&-3;const Ke=Q.parent,ze=V.cameras;be(V,Ke);for(let Xe=0;Xe<ze.length;Xe++)be(ze[Xe],Ke);ze.length===2?Ee(V,w,j):V.projectionMatrix.copy(w.projectionMatrix),we(Q,V,Ke)};function we(Q,me,ge){ge===null?Q.matrix.copy(me.matrixWorld):(Q.matrix.copy(ge.matrixWorld),Q.matrix.invert(),Q.matrix.multiply(me.matrixWorld)),Q.matrix.decompose(Q.position,Q.quaternion,Q.scale),Q.updateMatrixWorld(!0),Q.projectionMatrix.copy(me.projectionMatrix),Q.projectionMatrixInverse.copy(me.projectionMatrixInverse),Q.isPerspectiveCamera&&(Q.fov=ya*2*Math.atan(1/Q.projectionMatrix.elements[5]),Q.zoom=1)}this.getCamera=function(){return V},this.getFoveation=function(){if(!(f===null&&_===null))return l},this.setFoveation=function(Q){l=Q,f!==null&&(f.fixedFoveation=Q),_!==null&&_.fixedFoveation!==void 0&&(_.fixedFoveation=Q)},this.hasDepthSensing=function(){return v.texture!==null},this.getDepthSensingMesh=function(){return v.getMesh(V)},this.getCameraTexture=function(Q){return p[Q]};let Ze=null;function Pt(Q,me){if(u=me.getViewerPose(c||o),x=me,u!==null){const ge=u.views;_!==null&&(e.setRenderTargetFramebuffer(A,_.framebuffer),e.setRenderTarget(A));let Ke=!1;ge.length!==V.cameras.length&&(V.cameras.length=0,Ke=!0);for(let We=0;We<ge.length;We++){const gt=ge[We];let yt=null;if(_!==null)yt=_.getViewport(gt);else{const Rt=d.getViewSubImage(f,gt);yt=Rt.viewport,We===0&&(e.setRenderTargetTextures(A,Rt.colorTexture,Rt.depthStencilTexture),e.setRenderTarget(A))}let Qe=D[We];Qe===void 0&&(Qe=new gn,Qe.layers.enable(We),Qe.viewport=new Ft,D[We]=Qe),Qe.matrix.fromArray(gt.transform.matrix),Qe.matrix.decompose(Qe.position,Qe.quaternion,Qe.scale),Qe.projectionMatrix.fromArray(gt.projectionMatrix),Qe.projectionMatrixInverse.copy(Qe.projectionMatrix).invert(),Qe.viewport.set(yt.x,yt.y,yt.width,yt.height),We===0&&(V.matrix.copy(Qe.matrix),V.matrix.decompose(V.position,V.quaternion,V.scale)),Ke===!0&&V.cameras.push(Qe)}const ze=r.enabledFeatures;if(ze&&ze.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&y){d=n.getBinding();const We=d.getDepthInformation(ge[0]);We&&We.isValid&&We.texture&&v.init(We,r.renderState)}if(ze&&ze.includes("camera-access")&&y){e.state.unbindTexture(),d=n.getBinding();for(let We=0;We<ge.length;We++){const gt=ge[We].camera;if(gt){let yt=p[gt];yt||(yt=new Wc,p[gt]=yt);const Qe=d.getCameraImage(gt);yt.sourceTexture=Qe}}}}for(let ge=0;ge<I.length;ge++){const Ke=P[ge],ze=I[ge];Ke!==null&&ze!==void 0&&ze.update(Ke,me,c||o)}Ze&&Ze(Q,me),me.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:me}),x=null}const At=new Yc;At.setAnimationLoop(Pt),this.setAnimationLoop=function(Q){Ze=Q},this.dispose=function(){}}}const xi=new kn,Tg=new Lt;function bg(i,e){function t(v,p){v.matrixAutoUpdate===!0&&v.updateMatrix(),p.value.copy(v.matrix)}function n(v,p){p.color.getRGB(v.fogColor.value,Xc(i)),p.isFog?(v.fogNear.value=p.near,v.fogFar.value=p.far):p.isFogExp2&&(v.fogDensity.value=p.density)}function r(v,p,b,C,A){p.isMeshBasicMaterial?s(v,p):p.isMeshLambertMaterial?(s(v,p),p.envMap&&(v.envMapIntensity.value=p.envMapIntensity)):p.isMeshToonMaterial?(s(v,p),d(v,p)):p.isMeshPhongMaterial?(s(v,p),u(v,p),p.envMap&&(v.envMapIntensity.value=p.envMapIntensity)):p.isMeshStandardMaterial?(s(v,p),f(v,p),p.isMeshPhysicalMaterial&&_(v,p,A)):p.isMeshMatcapMaterial?(s(v,p),x(v,p)):p.isMeshDepthMaterial?s(v,p):p.isMeshDistanceMaterial?(s(v,p),y(v,p)):p.isMeshNormalMaterial?s(v,p):p.isLineBasicMaterial?(o(v,p),p.isLineDashedMaterial&&a(v,p)):p.isPointsMaterial?l(v,p,b,C):p.isSpriteMaterial?c(v,p):p.isShadowMaterial?(v.color.value.copy(p.color),v.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function s(v,p){v.opacity.value=p.opacity,p.color&&v.diffuse.value.copy(p.color),p.emissive&&v.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(v.map.value=p.map,t(p.map,v.mapTransform)),p.alphaMap&&(v.alphaMap.value=p.alphaMap,t(p.alphaMap,v.alphaMapTransform)),p.bumpMap&&(v.bumpMap.value=p.bumpMap,t(p.bumpMap,v.bumpMapTransform),v.bumpScale.value=p.bumpScale,p.side===ln&&(v.bumpScale.value*=-1)),p.normalMap&&(v.normalMap.value=p.normalMap,t(p.normalMap,v.normalMapTransform),v.normalScale.value.copy(p.normalScale),p.side===ln&&v.normalScale.value.negate()),p.displacementMap&&(v.displacementMap.value=p.displacementMap,t(p.displacementMap,v.displacementMapTransform),v.displacementScale.value=p.displacementScale,v.displacementBias.value=p.displacementBias),p.emissiveMap&&(v.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,v.emissiveMapTransform)),p.specularMap&&(v.specularMap.value=p.specularMap,t(p.specularMap,v.specularMapTransform)),p.alphaTest>0&&(v.alphaTest.value=p.alphaTest);const b=e.get(p),C=b.envMap,A=b.envMapRotation;C&&(v.envMap.value=C,xi.copy(A),xi.x*=-1,xi.y*=-1,xi.z*=-1,C.isCubeTexture&&C.isRenderTargetTexture===!1&&(xi.y*=-1,xi.z*=-1),v.envMapRotation.value.setFromMatrix4(Tg.makeRotationFromEuler(xi)),v.flipEnvMap.value=C.isCubeTexture&&C.isRenderTargetTexture===!1?-1:1,v.reflectivity.value=p.reflectivity,v.ior.value=p.ior,v.refractionRatio.value=p.refractionRatio),p.lightMap&&(v.lightMap.value=p.lightMap,v.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,v.lightMapTransform)),p.aoMap&&(v.aoMap.value=p.aoMap,v.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,v.aoMapTransform))}function o(v,p){v.diffuse.value.copy(p.color),v.opacity.value=p.opacity,p.map&&(v.map.value=p.map,t(p.map,v.mapTransform))}function a(v,p){v.dashSize.value=p.dashSize,v.totalSize.value=p.dashSize+p.gapSize,v.scale.value=p.scale}function l(v,p,b,C){v.diffuse.value.copy(p.color),v.opacity.value=p.opacity,v.size.value=p.size*b,v.scale.value=C*.5,p.map&&(v.map.value=p.map,t(p.map,v.uvTransform)),p.alphaMap&&(v.alphaMap.value=p.alphaMap,t(p.alphaMap,v.alphaMapTransform)),p.alphaTest>0&&(v.alphaTest.value=p.alphaTest)}function c(v,p){v.diffuse.value.copy(p.color),v.opacity.value=p.opacity,v.rotation.value=p.rotation,p.map&&(v.map.value=p.map,t(p.map,v.mapTransform)),p.alphaMap&&(v.alphaMap.value=p.alphaMap,t(p.alphaMap,v.alphaMapTransform)),p.alphaTest>0&&(v.alphaTest.value=p.alphaTest)}function u(v,p){v.specular.value.copy(p.specular),v.shininess.value=Math.max(p.shininess,1e-4)}function d(v,p){p.gradientMap&&(v.gradientMap.value=p.gradientMap)}function f(v,p){v.metalness.value=p.metalness,p.metalnessMap&&(v.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,v.metalnessMapTransform)),v.roughness.value=p.roughness,p.roughnessMap&&(v.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,v.roughnessMapTransform)),p.envMap&&(v.envMapIntensity.value=p.envMapIntensity)}function _(v,p,b){v.ior.value=p.ior,p.sheen>0&&(v.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),v.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(v.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,v.sheenColorMapTransform)),p.sheenRoughnessMap&&(v.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,v.sheenRoughnessMapTransform))),p.clearcoat>0&&(v.clearcoat.value=p.clearcoat,v.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(v.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,v.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(v.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,v.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(v.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,v.clearcoatNormalMapTransform),v.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===ln&&v.clearcoatNormalScale.value.negate())),p.dispersion>0&&(v.dispersion.value=p.dispersion),p.iridescence>0&&(v.iridescence.value=p.iridescence,v.iridescenceIOR.value=p.iridescenceIOR,v.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],v.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(v.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,v.iridescenceMapTransform)),p.iridescenceThicknessMap&&(v.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,v.iridescenceThicknessMapTransform))),p.transmission>0&&(v.transmission.value=p.transmission,v.transmissionSamplerMap.value=b.texture,v.transmissionSamplerSize.value.set(b.width,b.height),p.transmissionMap&&(v.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,v.transmissionMapTransform)),v.thickness.value=p.thickness,p.thicknessMap&&(v.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,v.thicknessMapTransform)),v.attenuationDistance.value=p.attenuationDistance,v.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(v.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(v.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,v.anisotropyMapTransform))),v.specularIntensity.value=p.specularIntensity,v.specularColor.value.copy(p.specularColor),p.specularColorMap&&(v.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,v.specularColorMapTransform)),p.specularIntensityMap&&(v.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,v.specularIntensityMapTransform))}function x(v,p){p.matcap&&(v.matcap.value=p.matcap)}function y(v,p){const b=e.get(p).light;v.referencePosition.value.setFromMatrixPosition(b.matrixWorld),v.nearDistance.value=b.shadow.camera.near,v.farDistance.value=b.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:r}}function wg(i,e,t,n){let r={},s={},o=[];const a=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(b,C){const A=C.program;n.uniformBlockBinding(b,A)}function c(b,C){let A=r[b.id];A===void 0&&(x(b),A=u(b),r[b.id]=A,b.addEventListener("dispose",v));const I=C.program;n.updateUBOMapping(b,I);const P=e.render.frame;s[b.id]!==P&&(f(b),s[b.id]=P)}function u(b){const C=d();b.__bindingPointIndex=C;const A=i.createBuffer(),I=b.__size,P=b.usage;return i.bindBuffer(i.UNIFORM_BUFFER,A),i.bufferData(i.UNIFORM_BUFFER,I,P),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,C,A),A}function d(){for(let b=0;b<a;b++)if(o.indexOf(b)===-1)return o.push(b),b;return vt("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(b){const C=r[b.id],A=b.uniforms,I=b.__cache;i.bindBuffer(i.UNIFORM_BUFFER,C);for(let P=0,L=A.length;P<L;P++){const E=Array.isArray(A[P])?A[P]:[A[P]];for(let w=0,j=E.length;w<j;w++){const D=E[w];if(_(D,P,w,I)===!0){const V=D.__offset,X=Array.isArray(D.value)?D.value:[D.value];let Y=0;for(let $=0;$<X.length;$++){const q=X[$],H=y(q);typeof q=="number"||typeof q=="boolean"?(D.__data[0]=q,i.bufferSubData(i.UNIFORM_BUFFER,V+Y,D.__data)):q.isMatrix3?(D.__data[0]=q.elements[0],D.__data[1]=q.elements[1],D.__data[2]=q.elements[2],D.__data[3]=0,D.__data[4]=q.elements[3],D.__data[5]=q.elements[4],D.__data[6]=q.elements[5],D.__data[7]=0,D.__data[8]=q.elements[6],D.__data[9]=q.elements[7],D.__data[10]=q.elements[8],D.__data[11]=0):(q.toArray(D.__data,Y),Y+=H.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,V,D.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function _(b,C,A,I){const P=b.value,L=C+"_"+A;if(I[L]===void 0)return typeof P=="number"||typeof P=="boolean"?I[L]=P:I[L]=P.clone(),!0;{const E=I[L];if(typeof P=="number"||typeof P=="boolean"){if(E!==P)return I[L]=P,!0}else if(E.equals(P)===!1)return E.copy(P),!0}return!1}function x(b){const C=b.uniforms;let A=0;const I=16;for(let L=0,E=C.length;L<E;L++){const w=Array.isArray(C[L])?C[L]:[C[L]];for(let j=0,D=w.length;j<D;j++){const V=w[j],X=Array.isArray(V.value)?V.value:[V.value];for(let Y=0,$=X.length;Y<$;Y++){const q=X[Y],H=y(q),le=A%I,ie=le%H.boundary,Ee=le+ie;A+=ie,Ee!==0&&I-Ee<H.storage&&(A+=I-Ee),V.__data=new Float32Array(H.storage/Float32Array.BYTES_PER_ELEMENT),V.__offset=A,A+=H.storage}}}const P=A%I;return P>0&&(A+=I-P),b.__size=A,b.__cache={},this}function y(b){const C={boundary:0,storage:0};return typeof b=="number"||typeof b=="boolean"?(C.boundary=4,C.storage=4):b.isVector2?(C.boundary=8,C.storage=8):b.isVector3||b.isColor?(C.boundary=16,C.storage=12):b.isVector4?(C.boundary=16,C.storage=16):b.isMatrix3?(C.boundary=48,C.storage=48):b.isMatrix4?(C.boundary=64,C.storage=64):b.isTexture?je("WebGLRenderer: Texture samplers can not be part of an uniforms group."):je("WebGLRenderer: Unsupported uniform value type.",b),C}function v(b){const C=b.target;C.removeEventListener("dispose",v);const A=o.indexOf(C.__bindingPointIndex);o.splice(A,1),i.deleteBuffer(r[C.id]),delete r[C.id],delete s[C.id]}function p(){for(const b in r)i.deleteBuffer(r[b]);o=[],r={},s={}}return{bind:l,update:c,dispose:p}}const Ag=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let Rn=null;function Rg(){return Rn===null&&(Rn=new pu(Ag,16,16,er,Kn),Rn.name="DFG_LUT",Rn.minFilter=Xt,Rn.magFilter=Xt,Rn.wrapS=Yn,Rn.wrapT=Yn,Rn.generateMipmaps=!1,Rn.needsUpdate=!0),Rn}class Cg{constructor(e={}){const{canvas:t=Xh(),context:n=null,depth:r=!0,stencil:s=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:f=!1,outputBufferType:_=pn}=e;this.isWebGLRenderer=!0;let x;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");x=n.getContextAttributes().alpha}else x=o;const y=_,v=new Set([Ba,Fa,Na]),p=new Set([pn,Bn,Rr,Cr,Ua,Oa]),b=new Uint32Array(4),C=new Int32Array(4);let A=null,I=null;const P=[],L=[];let E=null;this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=On,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const w=this;let j=!1;this._outputColorSpace=en;let D=0,V=0,X=null,Y=-1,$=null;const q=new Ft,H=new Ft;let le=null;const ie=new mt(0);let Ee=0,be=t.width,we=t.height,Ze=1,Pt=null,At=null;const Q=new Ft(0,0,be,we),me=new Ft(0,0,be,we);let ge=!1;const Ke=new Wa;let ze=!1,Xe=!1;const Ut=new Lt,We=new G,gt=new Ft,yt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Qe=!1;function Rt(){return X===null?Ze:1}let U=n;function Dt(S,N){return t.getContext(S,N)}try{const S={alpha:!0,depth:r,stencil:s,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Ia}`),t.addEventListener("webglcontextlost",Ce,!1),t.addEventListener("webglcontextrestored",Ye,!1),t.addEventListener("webglcontextcreationerror",Tt,!1),U===null){const N="webgl2";if(U=Dt(N,S),U===null)throw Dt(N)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(S){throw vt("WebGLRenderer: "+S.message),S}let ut,_t,Le,R,M,k,J,te,Z,Re,fe,ke,Ve,se,ae,Ie,De,Te,et,O,de,ce,Ae;function re(){ut=new Cp(U),ut.init(),de=new xg(U,ut),_t=new Sp(U,ut,e,de),Le=new _g(U,ut),_t.reversedDepthBuffer&&f&&Le.buffers.depth.setReversed(!0),R=new Dp(U),M=new ig,k=new vg(U,ut,Le,M,_t,de,R),J=new Rp(w),te=new Nu(U),ce=new xp(U,te),Z=new Pp(U,te,R,ce),Re=new Up(U,Z,te,ce,R),Te=new Lp(U,_t,k),ae=new yp(M),fe=new ng(w,J,ut,_t,ce,ae),ke=new bg(w,M),Ve=new sg,se=new ug(ut),De=new vp(w,J,Le,Re,x,l),Ie=new gg(w,Re,_t),Ae=new wg(U,R,_t,Le),et=new Mp(U,ut,R),O=new Ip(U,ut,R),R.programs=fe.programs,w.capabilities=_t,w.extensions=ut,w.properties=M,w.renderLists=Ve,w.shadowMap=Ie,w.state=Le,w.info=R}re(),y!==pn&&(E=new Np(y,t.width,t.height,r,s));const K=new Eg(w,U);this.xr=K,this.getContext=function(){return U},this.getContextAttributes=function(){return U.getContextAttributes()},this.forceContextLoss=function(){const S=ut.get("WEBGL_lose_context");S&&S.loseContext()},this.forceContextRestore=function(){const S=ut.get("WEBGL_lose_context");S&&S.restoreContext()},this.getPixelRatio=function(){return Ze},this.setPixelRatio=function(S){S!==void 0&&(Ze=S,this.setSize(be,we,!1))},this.getSize=function(S){return S.set(be,we)},this.setSize=function(S,N,W=!0){if(K.isPresenting){je("WebGLRenderer: Can't change size while VR device is presenting.");return}be=S,we=N,t.width=Math.floor(S*Ze),t.height=Math.floor(N*Ze),W===!0&&(t.style.width=S+"px",t.style.height=N+"px"),E!==null&&E.setSize(t.width,t.height),this.setViewport(0,0,S,N)},this.getDrawingBufferSize=function(S){return S.set(be*Ze,we*Ze).floor()},this.setDrawingBufferSize=function(S,N,W){be=S,we=N,Ze=W,t.width=Math.floor(S*W),t.height=Math.floor(N*W),this.setViewport(0,0,S,N)},this.setEffects=function(S){if(y===pn){console.error("THREE.WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(S){for(let N=0;N<S.length;N++)if(S[N].isOutputPass===!0){console.warn("THREE.WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}E.setEffects(S||[])},this.getCurrentViewport=function(S){return S.copy(q)},this.getViewport=function(S){return S.copy(Q)},this.setViewport=function(S,N,W,F){S.isVector4?Q.set(S.x,S.y,S.z,S.w):Q.set(S,N,W,F),Le.viewport(q.copy(Q).multiplyScalar(Ze).round())},this.getScissor=function(S){return S.copy(me)},this.setScissor=function(S,N,W,F){S.isVector4?me.set(S.x,S.y,S.z,S.w):me.set(S,N,W,F),Le.scissor(H.copy(me).multiplyScalar(Ze).round())},this.getScissorTest=function(){return ge},this.setScissorTest=function(S){Le.setScissorTest(ge=S)},this.setOpaqueSort=function(S){Pt=S},this.setTransparentSort=function(S){At=S},this.getClearColor=function(S){return S.copy(De.getClearColor())},this.setClearColor=function(){De.setClearColor(...arguments)},this.getClearAlpha=function(){return De.getClearAlpha()},this.setClearAlpha=function(){De.setClearAlpha(...arguments)},this.clear=function(S=!0,N=!0,W=!0){let F=0;if(S){let B=!1;if(X!==null){const _e=X.texture.format;B=v.has(_e)}if(B){const _e=X.texture.type,Se=p.has(_e),pe=De.getClearColor(),ve=De.getClearAlpha(),xe=pe.r,$e=pe.g,Ge=pe.b;Se?(b[0]=xe,b[1]=$e,b[2]=Ge,b[3]=ve,U.clearBufferuiv(U.COLOR,0,b)):(C[0]=xe,C[1]=$e,C[2]=Ge,C[3]=ve,U.clearBufferiv(U.COLOR,0,C))}else F|=U.COLOR_BUFFER_BIT}N&&(F|=U.DEPTH_BUFFER_BIT),W&&(F|=U.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),F!==0&&U.clear(F)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",Ce,!1),t.removeEventListener("webglcontextrestored",Ye,!1),t.removeEventListener("webglcontextcreationerror",Tt,!1),De.dispose(),Ve.dispose(),se.dispose(),M.dispose(),J.dispose(),Re.dispose(),ce.dispose(),Ae.dispose(),fe.dispose(),K.dispose(),K.removeEventListener("sessionstart",g),K.removeEventListener("sessionend",h),m.stop()};function Ce(S){S.preventDefault(),al("WebGLRenderer: Context Lost."),j=!0}function Ye(){al("WebGLRenderer: Context Restored."),j=!1;const S=R.autoReset,N=Ie.enabled,W=Ie.autoUpdate,F=Ie.needsUpdate,B=Ie.type;re(),R.autoReset=S,Ie.enabled=N,Ie.autoUpdate=W,Ie.needsUpdate=F,Ie.type=B}function Tt(S){vt("WebGLRenderer: A WebGL context could not be created. Reason: ",S.statusMessage)}function tt(S){const N=S.target;N.removeEventListener("dispose",tt),vn(N)}function vn(S){Yt(S),M.remove(S)}function Yt(S){const N=M.get(S).programs;N!==void 0&&(N.forEach(function(W){fe.releaseProgram(W)}),S.isShaderMaterial&&fe.releaseShaderCache(S))}this.renderBufferDirect=function(S,N,W,F,B,_e){N===null&&(N=yt);const Se=B.isMesh&&B.matrixWorld.determinant()<0,pe=lt(S,N,W,F,B);Le.setMaterial(F,Se);let ve=W.index,xe=1;if(F.wireframe===!0){if(ve=Z.getWireframeAttribute(W),ve===void 0)return;xe=2}const $e=W.drawRange,Ge=W.attributes.position;let Oe=$e.start*xe,ft=($e.start+$e.count)*xe;_e!==null&&(Oe=Math.max(Oe,_e.start*xe),ft=Math.min(ft,(_e.start+_e.count)*xe)),ve!==null?(Oe=Math.max(Oe,0),ft=Math.min(ft,ve.count)):Ge!=null&&(Oe=Math.max(Oe,0),ft=Math.min(ft,Ge.count));const It=ft-Oe;if(It<0||It===1/0)return;ce.setup(B,F,pe,W,ve);let Nt,bt=et;if(ve!==null&&(Nt=te.get(ve),bt=O,bt.setIndex(Nt)),B.isMesh)F.wireframe===!0?(Le.setLineWidth(F.wireframeLinewidth*Rt()),bt.setMode(U.LINES)):bt.setMode(U.TRIANGLES);else if(B.isLine){let Kt=F.linewidth;Kt===void 0&&(Kt=1),Le.setLineWidth(Kt*Rt()),B.isLineSegments?bt.setMode(U.LINES):B.isLineLoop?bt.setMode(U.LINE_LOOP):bt.setMode(U.LINE_STRIP)}else B.isPoints?bt.setMode(U.POINTS):B.isSprite&&bt.setMode(U.TRIANGLES);if(B.isBatchedMesh)if(B._multiDrawInstances!==null)Es("WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),bt.renderMultiDrawInstances(B._multiDrawStarts,B._multiDrawCounts,B._multiDrawCount,B._multiDrawInstances);else if(ut.get("WEBGL_multi_draw"))bt.renderMultiDraw(B._multiDrawStarts,B._multiDrawCounts,B._multiDrawCount);else{const Kt=B._multiDrawStarts,Ne=B._multiDrawCounts,cn=B._multiDrawCount,Mt=ve?te.get(ve).bytesPerElement:1,xn=M.get(F).currentProgram.getUniforms();for(let wn=0;wn<cn;wn++)xn.setValue(U,"_gl_DrawID",wn),bt.render(Kt[wn]/Mt,Ne[wn])}else if(B.isInstancedMesh)bt.renderInstances(Oe,It,B.count);else if(W.isInstancedBufferGeometry){const Kt=W._maxInstanceCount!==void 0?W._maxInstanceCount:1/0,Ne=Math.min(W.instanceCount,Kt);bt.renderInstances(Oe,It,Ne)}else bt.render(Oe,It)};function Ii(S,N,W){S.transparent===!0&&S.side===_n&&S.forceSinglePass===!1?(S.side=ln,S.needsUpdate=!0,it(S,N,W),S.side=ui,S.needsUpdate=!0,it(S,N,W),S.side=_n):it(S,N,W)}this.compile=function(S,N,W=null){W===null&&(W=S),I=se.get(W),I.init(N),L.push(I),W.traverseVisible(function(B){B.isLight&&B.layers.test(N.layers)&&(I.pushLight(B),B.castShadow&&I.pushShadow(B))}),S!==W&&S.traverseVisible(function(B){B.isLight&&B.layers.test(N.layers)&&(I.pushLight(B),B.castShadow&&I.pushShadow(B))}),I.setupLights();const F=new Set;return S.traverse(function(B){if(!(B.isMesh||B.isPoints||B.isLine||B.isSprite))return;const _e=B.material;if(_e)if(Array.isArray(_e))for(let Se=0;Se<_e.length;Se++){const pe=_e[Se];Ii(pe,W,B),F.add(pe)}else Ii(_e,W,B),F.add(_e)}),I=L.pop(),F},this.compileAsync=function(S,N,W=null){const F=this.compile(S,N,W);return new Promise(B=>{function _e(){if(F.forEach(function(Se){M.get(Se).currentProgram.isReady()&&F.delete(Se)}),F.size===0){B(S);return}setTimeout(_e,10)}ut.get("KHR_parallel_shader_compile")!==null?_e():setTimeout(_e,10)})};let fi=null;function Xs(S){fi&&fi(S)}function g(){m.stop()}function h(){m.start()}const m=new Yc;m.setAnimationLoop(Xs),typeof self<"u"&&m.setContext(self),this.setAnimationLoop=function(S){fi=S,K.setAnimationLoop(S),S===null?m.stop():m.start()},K.addEventListener("sessionstart",g),K.addEventListener("sessionend",h),this.render=function(S,N){if(N!==void 0&&N.isCamera!==!0){vt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(j===!0)return;const W=K.enabled===!0&&K.isPresenting===!0,F=E!==null&&(X===null||W)&&E.begin(w,X);if(S.matrixWorldAutoUpdate===!0&&S.updateMatrixWorld(),N.parent===null&&N.matrixWorldAutoUpdate===!0&&N.updateMatrixWorld(),K.enabled===!0&&K.isPresenting===!0&&(E===null||E.isCompositing()===!1)&&(K.cameraAutoUpdate===!0&&K.updateCamera(N),N=K.getCamera()),S.isScene===!0&&S.onBeforeRender(w,S,N,X),I=se.get(S,L.length),I.init(N),L.push(I),Ut.multiplyMatrices(N.projectionMatrix,N.matrixWorldInverse),Ke.setFromProjectionMatrix(Ut,Un,N.reversedDepth),Xe=this.localClippingEnabled,ze=ae.init(this.clippingPlanes,Xe),A=Ve.get(S,P.length),A.init(),P.push(A),K.enabled===!0&&K.isPresenting===!0){const Se=w.xr.getDepthSensingMesh();Se!==null&&T(Se,N,-1/0,w.sortObjects)}T(S,N,0,w.sortObjects),A.finish(),w.sortObjects===!0&&A.sort(Pt,At),Qe=K.enabled===!1||K.isPresenting===!1||K.hasDepthSensing()===!1,Qe&&De.addToRenderList(A,S),this.info.render.frame++,ze===!0&&ae.beginShadows();const B=I.state.shadowsArray;if(Ie.render(B,S,N),ze===!0&&ae.endShadows(),this.info.autoReset===!0&&this.info.reset(),(F&&E.hasRenderPass())===!1){const Se=A.opaque,pe=A.transmissive;if(I.setupLights(),N.isArrayCamera){const ve=N.cameras;if(pe.length>0)for(let xe=0,$e=ve.length;xe<$e;xe++){const Ge=ve[xe];ee(Se,pe,S,Ge)}Qe&&De.render(S);for(let xe=0,$e=ve.length;xe<$e;xe++){const Ge=ve[xe];z(A,S,Ge,Ge.viewport)}}else pe.length>0&&ee(Se,pe,S,N),Qe&&De.render(S),z(A,S,N)}X!==null&&V===0&&(k.updateMultisampleRenderTarget(X),k.updateRenderTargetMipmap(X)),F&&E.end(w),S.isScene===!0&&S.onAfterRender(w,S,N),ce.resetDefaultState(),Y=-1,$=null,L.pop(),L.length>0?(I=L[L.length-1],ze===!0&&ae.setGlobalState(w.clippingPlanes,I.state.camera)):I=null,P.pop(),P.length>0?A=P[P.length-1]:A=null};function T(S,N,W,F){if(S.visible===!1)return;if(S.layers.test(N.layers)){if(S.isGroup)W=S.renderOrder;else if(S.isLOD)S.autoUpdate===!0&&S.update(N);else if(S.isLight)I.pushLight(S),S.castShadow&&I.pushShadow(S);else if(S.isSprite){if(!S.frustumCulled||Ke.intersectsSprite(S)){F&&gt.setFromMatrixPosition(S.matrixWorld).applyMatrix4(Ut);const Se=Re.update(S),pe=S.material;pe.visible&&A.push(S,Se,pe,W,gt.z,null)}}else if((S.isMesh||S.isLine||S.isPoints)&&(!S.frustumCulled||Ke.intersectsObject(S))){const Se=Re.update(S),pe=S.material;if(F&&(S.boundingSphere!==void 0?(S.boundingSphere===null&&S.computeBoundingSphere(),gt.copy(S.boundingSphere.center)):(Se.boundingSphere===null&&Se.computeBoundingSphere(),gt.copy(Se.boundingSphere.center)),gt.applyMatrix4(S.matrixWorld).applyMatrix4(Ut)),Array.isArray(pe)){const ve=Se.groups;for(let xe=0,$e=ve.length;xe<$e;xe++){const Ge=ve[xe],Oe=pe[Ge.materialIndex];Oe&&Oe.visible&&A.push(S,Se,Oe,W,gt.z,Ge)}}else pe.visible&&A.push(S,Se,pe,W,gt.z,null)}}const _e=S.children;for(let Se=0,pe=_e.length;Se<pe;Se++)T(_e[Se],N,W,F)}function z(S,N,W,F){const{opaque:B,transmissive:_e,transparent:Se}=S;I.setupLightsView(W),ze===!0&&ae.setGlobalState(w.clippingPlanes,W),F&&Le.viewport(q.copy(F)),B.length>0&&Ue(B,N,W),_e.length>0&&Ue(_e,N,W),Se.length>0&&Ue(Se,N,W),Le.buffers.depth.setTest(!0),Le.buffers.depth.setMask(!0),Le.buffers.color.setMask(!0),Le.setPolygonOffset(!1)}function ee(S,N,W,F){if((W.isScene===!0?W.overrideMaterial:null)!==null)return;if(I.state.transmissionRenderTarget[F.id]===void 0){const Oe=ut.has("EXT_color_buffer_half_float")||ut.has("EXT_color_buffer_float");I.state.transmissionRenderTarget[F.id]=new Nn(1,1,{generateMipmaps:!0,type:Oe?Kn:pn,minFilter:wi,samples:Math.max(4,_t.samples),stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:xt.workingColorSpace})}const _e=I.state.transmissionRenderTarget[F.id],Se=F.viewport||q;_e.setSize(Se.z*w.transmissionResolutionScale,Se.w*w.transmissionResolutionScale);const pe=w.getRenderTarget(),ve=w.getActiveCubeFace(),xe=w.getActiveMipmapLevel();w.setRenderTarget(_e),w.getClearColor(ie),Ee=w.getClearAlpha(),Ee<1&&w.setClearColor(16777215,.5),w.clear(),Qe&&De.render(W);const $e=w.toneMapping;w.toneMapping=On;const Ge=F.viewport;if(F.viewport!==void 0&&(F.viewport=void 0),I.setupLightsView(F),ze===!0&&ae.setGlobalState(w.clippingPlanes,F),Ue(S,W,F),k.updateMultisampleRenderTarget(_e),k.updateRenderTargetMipmap(_e),ut.has("WEBGL_multisampled_render_to_texture")===!1){let Oe=!1;for(let ft=0,It=N.length;ft<It;ft++){const Nt=N[ft],{object:bt,geometry:Kt,material:Ne,group:cn}=Nt;if(Ne.side===_n&&bt.layers.test(F.layers)){const Mt=Ne.side;Ne.side=ln,Ne.needsUpdate=!0,Pe(bt,W,F,Kt,Ne,cn),Ne.side=Mt,Ne.needsUpdate=!0,Oe=!0}}Oe===!0&&(k.updateMultisampleRenderTarget(_e),k.updateRenderTargetMipmap(_e))}w.setRenderTarget(pe,ve,xe),w.setClearColor(ie,Ee),Ge!==void 0&&(F.viewport=Ge),w.toneMapping=$e}function Ue(S,N,W){const F=N.isScene===!0?N.overrideMaterial:null;for(let B=0,_e=S.length;B<_e;B++){const Se=S[B],{object:pe,geometry:ve,group:xe}=Se;let $e=Se.material;$e.allowOverride===!0&&F!==null&&($e=F),pe.layers.test(W.layers)&&Pe(pe,N,W,ve,$e,xe)}}function Pe(S,N,W,F,B,_e){S.onBeforeRender(w,N,W,F,B,_e),S.modelViewMatrix.multiplyMatrices(W.matrixWorldInverse,S.matrixWorld),S.normalMatrix.getNormalMatrix(S.modelViewMatrix),B.onBeforeRender(w,N,W,F,S,_e),B.transparent===!0&&B.side===_n&&B.forceSinglePass===!1?(B.side=ln,B.needsUpdate=!0,w.renderBufferDirect(W,N,F,B,S,_e),B.side=ui,B.needsUpdate=!0,w.renderBufferDirect(W,N,F,B,S,_e),B.side=_n):w.renderBufferDirect(W,N,F,B,S,_e),S.onAfterRender(w,N,W,F,B,_e)}function it(S,N,W){N.isScene!==!0&&(N=yt);const F=M.get(S),B=I.state.lights,_e=I.state.shadowsArray,Se=B.state.version,pe=fe.getParameters(S,B.state,_e,N,W),ve=fe.getProgramCacheKey(pe);let xe=F.programs;F.environment=S.isMeshStandardMaterial||S.isMeshLambertMaterial||S.isMeshPhongMaterial?N.environment:null,F.fog=N.fog;const $e=S.isMeshStandardMaterial||S.isMeshLambertMaterial&&!S.envMap||S.isMeshPhongMaterial&&!S.envMap;F.envMap=J.get(S.envMap||F.environment,$e),F.envMapRotation=F.environment!==null&&S.envMap===null?N.environmentRotation:S.envMapRotation,xe===void 0&&(S.addEventListener("dispose",tt),xe=new Map,F.programs=xe);let Ge=xe.get(ve);if(Ge!==void 0){if(F.currentProgram===Ge&&F.lightsStateVersion===Se)return Fe(S,pe),Ge}else pe.uniforms=fe.getUniforms(S),S.onBeforeCompile(pe,w),Ge=fe.acquireProgram(pe,ve),xe.set(ve,Ge),F.uniforms=pe.uniforms;const Oe=F.uniforms;return(!S.isShaderMaterial&&!S.isRawShaderMaterial||S.clipping===!0)&&(Oe.clippingPlanes=ae.uniform),Fe(S,pe),F.needsLights=st(S),F.lightsStateVersion=Se,F.needsLights&&(Oe.ambientLightColor.value=B.state.ambient,Oe.lightProbe.value=B.state.probe,Oe.directionalLights.value=B.state.directional,Oe.directionalLightShadows.value=B.state.directionalShadow,Oe.spotLights.value=B.state.spot,Oe.spotLightShadows.value=B.state.spotShadow,Oe.rectAreaLights.value=B.state.rectArea,Oe.ltc_1.value=B.state.rectAreaLTC1,Oe.ltc_2.value=B.state.rectAreaLTC2,Oe.pointLights.value=B.state.point,Oe.pointLightShadows.value=B.state.pointShadow,Oe.hemisphereLights.value=B.state.hemi,Oe.directionalShadowMatrix.value=B.state.directionalShadowMatrix,Oe.spotLightMatrix.value=B.state.spotLightMatrix,Oe.spotLightMap.value=B.state.spotLightMap,Oe.pointShadowMatrix.value=B.state.pointShadowMatrix),F.currentProgram=Ge,F.uniformsList=null,Ge}function rt(S){if(S.uniformsList===null){const N=S.currentProgram.getUniforms();S.uniformsList=_s.seqWithValue(N.seq,S.uniforms)}return S.uniformsList}function Fe(S,N){const W=M.get(S);W.outputColorSpace=N.outputColorSpace,W.batching=N.batching,W.batchingColor=N.batchingColor,W.instancing=N.instancing,W.instancingColor=N.instancingColor,W.instancingMorph=N.instancingMorph,W.skinning=N.skinning,W.morphTargets=N.morphTargets,W.morphNormals=N.morphNormals,W.morphColors=N.morphColors,W.morphTargetsCount=N.morphTargetsCount,W.numClippingPlanes=N.numClippingPlanes,W.numIntersection=N.numClipIntersection,W.vertexAlphas=N.vertexAlphas,W.vertexTangents=N.vertexTangents,W.toneMapping=N.toneMapping}function lt(S,N,W,F,B){N.isScene!==!0&&(N=yt),k.resetTextureUnits();const _e=N.fog,Se=F.isMeshStandardMaterial||F.isMeshLambertMaterial||F.isMeshPhongMaterial?N.environment:null,pe=X===null?w.outputColorSpace:X.isXRRenderTarget===!0?X.texture.colorSpace:tr,ve=F.isMeshStandardMaterial||F.isMeshLambertMaterial&&!F.envMap||F.isMeshPhongMaterial&&!F.envMap,xe=J.get(F.envMap||Se,ve),$e=F.vertexColors===!0&&!!W.attributes.color&&W.attributes.color.itemSize===4,Ge=!!W.attributes.tangent&&(!!F.normalMap||F.anisotropy>0),Oe=!!W.morphAttributes.position,ft=!!W.morphAttributes.normal,It=!!W.morphAttributes.color;let Nt=On;F.toneMapped&&(X===null||X.isXRRenderTarget===!0)&&(Nt=w.toneMapping);const bt=W.morphAttributes.position||W.morphAttributes.normal||W.morphAttributes.color,Kt=bt!==void 0?bt.length:0,Ne=M.get(F),cn=I.state.lights;if(ze===!0&&(Xe===!0||S!==$)){const Gt=S===$&&F.id===Y;ae.setState(F,S,Gt)}let Mt=!1;F.version===Ne.__version?(Ne.needsLights&&Ne.lightsStateVersion!==cn.state.version||Ne.outputColorSpace!==pe||B.isBatchedMesh&&Ne.batching===!1||!B.isBatchedMesh&&Ne.batching===!0||B.isBatchedMesh&&Ne.batchingColor===!0&&B.colorTexture===null||B.isBatchedMesh&&Ne.batchingColor===!1&&B.colorTexture!==null||B.isInstancedMesh&&Ne.instancing===!1||!B.isInstancedMesh&&Ne.instancing===!0||B.isSkinnedMesh&&Ne.skinning===!1||!B.isSkinnedMesh&&Ne.skinning===!0||B.isInstancedMesh&&Ne.instancingColor===!0&&B.instanceColor===null||B.isInstancedMesh&&Ne.instancingColor===!1&&B.instanceColor!==null||B.isInstancedMesh&&Ne.instancingMorph===!0&&B.morphTexture===null||B.isInstancedMesh&&Ne.instancingMorph===!1&&B.morphTexture!==null||Ne.envMap!==xe||F.fog===!0&&Ne.fog!==_e||Ne.numClippingPlanes!==void 0&&(Ne.numClippingPlanes!==ae.numPlanes||Ne.numIntersection!==ae.numIntersection)||Ne.vertexAlphas!==$e||Ne.vertexTangents!==Ge||Ne.morphTargets!==Oe||Ne.morphNormals!==ft||Ne.morphColors!==It||Ne.toneMapping!==Nt||Ne.morphTargetsCount!==Kt)&&(Mt=!0):(Mt=!0,Ne.__version=F.version);let xn=Ne.currentProgram;Mt===!0&&(xn=it(F,N,B));let wn=!1,di=!1,Di=!1;const Ct=xn.getUniforms(),qt=Ne.uniforms;if(Le.useProgram(xn.program)&&(wn=!0,di=!0,Di=!0),F.id!==Y&&(Y=F.id,di=!0),wn||$!==S){Le.buffers.depth.getReversed()&&S.reversedDepth!==!0&&(S._reversedDepth=!0,S.updateProjectionMatrix()),Ct.setValue(U,"projectionMatrix",S.projectionMatrix),Ct.setValue(U,"viewMatrix",S.matrixWorldInverse);const Qn=Ct.map.cameraPosition;Qn!==void 0&&Qn.setValue(U,We.setFromMatrixPosition(S.matrixWorld)),_t.logarithmicDepthBuffer&&Ct.setValue(U,"logDepthBufFC",2/(Math.log(S.far+1)/Math.LN2)),(F.isMeshPhongMaterial||F.isMeshToonMaterial||F.isMeshLambertMaterial||F.isMeshBasicMaterial||F.isMeshStandardMaterial||F.isShaderMaterial)&&Ct.setValue(U,"isOrthographic",S.isOrthographicCamera===!0),$!==S&&($=S,di=!0,Di=!0)}if(Ne.needsLights&&(cn.state.directionalShadowMap.length>0&&Ct.setValue(U,"directionalShadowMap",cn.state.directionalShadowMap,k),cn.state.spotShadowMap.length>0&&Ct.setValue(U,"spotShadowMap",cn.state.spotShadowMap,k),cn.state.pointShadowMap.length>0&&Ct.setValue(U,"pointShadowMap",cn.state.pointShadowMap,k)),B.isSkinnedMesh){Ct.setOptional(U,B,"bindMatrix"),Ct.setOptional(U,B,"bindMatrixInverse");const Gt=B.skeleton;Gt&&(Gt.boneTexture===null&&Gt.computeBoneTexture(),Ct.setValue(U,"boneTexture",Gt.boneTexture,k))}B.isBatchedMesh&&(Ct.setOptional(U,B,"batchingTexture"),Ct.setValue(U,"batchingTexture",B._matricesTexture,k),Ct.setOptional(U,B,"batchingIdTexture"),Ct.setValue(U,"batchingIdTexture",B._indirectTexture,k),Ct.setOptional(U,B,"batchingColorTexture"),B._colorsTexture!==null&&Ct.setValue(U,"batchingColorTexture",B._colorsTexture,k));const Jn=W.morphAttributes;if((Jn.position!==void 0||Jn.normal!==void 0||Jn.color!==void 0)&&Te.update(B,W,xn),(di||Ne.receiveShadow!==B.receiveShadow)&&(Ne.receiveShadow=B.receiveShadow,Ct.setValue(U,"receiveShadow",B.receiveShadow)),(F.isMeshStandardMaterial||F.isMeshLambertMaterial||F.isMeshPhongMaterial)&&F.envMap===null&&N.environment!==null&&(qt.envMapIntensity.value=N.environmentIntensity),qt.dfgLUT!==void 0&&(qt.dfgLUT.value=Rg()),di&&(Ct.setValue(U,"toneMappingExposure",w.toneMappingExposure),Ne.needsLights&&Be(qt,Di),_e&&F.fog===!0&&ke.refreshFogUniforms(qt,_e),ke.refreshMaterialUniforms(qt,F,Ze,we,I.state.transmissionRenderTarget[S.id]),_s.upload(U,rt(Ne),qt,k)),F.isShaderMaterial&&F.uniformsNeedUpdate===!0&&(_s.upload(U,rt(Ne),qt,k),F.uniformsNeedUpdate=!1),F.isSpriteMaterial&&Ct.setValue(U,"center",B.center),Ct.setValue(U,"modelViewMatrix",B.modelViewMatrix),Ct.setValue(U,"normalMatrix",B.normalMatrix),Ct.setValue(U,"modelMatrix",B.matrixWorld),F.isShaderMaterial||F.isRawShaderMaterial){const Gt=F.uniformsGroups;for(let Qn=0,Li=Gt.length;Qn<Li;Qn++){const Qa=Gt[Qn];Ae.update(Qa,xn),Ae.bind(Qa,xn)}}return xn}function Be(S,N){S.ambientLightColor.needsUpdate=N,S.lightProbe.needsUpdate=N,S.directionalLights.needsUpdate=N,S.directionalLightShadows.needsUpdate=N,S.pointLights.needsUpdate=N,S.pointLightShadows.needsUpdate=N,S.spotLights.needsUpdate=N,S.spotLightShadows.needsUpdate=N,S.rectAreaLights.needsUpdate=N,S.hemisphereLights.needsUpdate=N}function st(S){return S.isMeshLambertMaterial||S.isMeshToonMaterial||S.isMeshPhongMaterial||S.isMeshStandardMaterial||S.isShadowMaterial||S.isShaderMaterial&&S.lights===!0}this.getActiveCubeFace=function(){return D},this.getActiveMipmapLevel=function(){return V},this.getRenderTarget=function(){return X},this.setRenderTargetTextures=function(S,N,W){const F=M.get(S);F.__autoAllocateDepthBuffer=S.resolveDepthBuffer===!1,F.__autoAllocateDepthBuffer===!1&&(F.__useRenderToTexture=!1),M.get(S.texture).__webglTexture=N,M.get(S.depthTexture).__webglTexture=F.__autoAllocateDepthBuffer?void 0:W,F.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(S,N){const W=M.get(S);W.__webglFramebuffer=N,W.__useDefaultFramebuffer=N===void 0};const qe=U.createFramebuffer();this.setRenderTarget=function(S,N=0,W=0){X=S,D=N,V=W;let F=null,B=!1,_e=!1;if(S){const pe=M.get(S);if(pe.__useDefaultFramebuffer!==void 0){Le.bindFramebuffer(U.FRAMEBUFFER,pe.__webglFramebuffer),q.copy(S.viewport),H.copy(S.scissor),le=S.scissorTest,Le.viewport(q),Le.scissor(H),Le.setScissorTest(le),Y=-1;return}else if(pe.__webglFramebuffer===void 0)k.setupRenderTarget(S);else if(pe.__hasExternalTextures)k.rebindTextures(S,M.get(S.texture).__webglTexture,M.get(S.depthTexture).__webglTexture);else if(S.depthBuffer){const $e=S.depthTexture;if(pe.__boundDepthTexture!==$e){if($e!==null&&M.has($e)&&(S.width!==$e.image.width||S.height!==$e.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");k.setupDepthRenderbuffer(S)}}const ve=S.texture;(ve.isData3DTexture||ve.isDataArrayTexture||ve.isCompressedArrayTexture)&&(_e=!0);const xe=M.get(S).__webglFramebuffer;S.isWebGLCubeRenderTarget?(Array.isArray(xe[N])?F=xe[N][W]:F=xe[N],B=!0):S.samples>0&&k.useMultisampledRTT(S)===!1?F=M.get(S).__webglMultisampledFramebuffer:Array.isArray(xe)?F=xe[W]:F=xe,q.copy(S.viewport),H.copy(S.scissor),le=S.scissorTest}else q.copy(Q).multiplyScalar(Ze).floor(),H.copy(me).multiplyScalar(Ze).floor(),le=ge;if(W!==0&&(F=qe),Le.bindFramebuffer(U.FRAMEBUFFER,F)&&Le.drawBuffers(S,F),Le.viewport(q),Le.scissor(H),Le.setScissorTest(le),B){const pe=M.get(S.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_CUBE_MAP_POSITIVE_X+N,pe.__webglTexture,W)}else if(_e){const pe=N;for(let ve=0;ve<S.textures.length;ve++){const xe=M.get(S.textures[ve]);U.framebufferTextureLayer(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0+ve,xe.__webglTexture,W,pe)}}else if(S!==null&&W!==0){const pe=M.get(S.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,pe.__webglTexture,W)}Y=-1},this.readRenderTargetPixels=function(S,N,W,F,B,_e,Se,pe=0){if(!(S&&S.isWebGLRenderTarget)){vt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let ve=M.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&Se!==void 0&&(ve=ve[Se]),ve){Le.bindFramebuffer(U.FRAMEBUFFER,ve);try{const xe=S.textures[pe],$e=xe.format,Ge=xe.type;if(S.textures.length>1&&U.readBuffer(U.COLOR_ATTACHMENT0+pe),!_t.textureFormatReadable($e)){vt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!_t.textureTypeReadable(Ge)){vt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}N>=0&&N<=S.width-F&&W>=0&&W<=S.height-B&&U.readPixels(N,W,F,B,de.convert($e),de.convert(Ge),_e)}finally{const xe=X!==null?M.get(X).__webglFramebuffer:null;Le.bindFramebuffer(U.FRAMEBUFFER,xe)}}},this.readRenderTargetPixelsAsync=async function(S,N,W,F,B,_e,Se,pe=0){if(!(S&&S.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let ve=M.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&Se!==void 0&&(ve=ve[Se]),ve)if(N>=0&&N<=S.width-F&&W>=0&&W<=S.height-B){Le.bindFramebuffer(U.FRAMEBUFFER,ve);const xe=S.textures[pe],$e=xe.format,Ge=xe.type;if(S.textures.length>1&&U.readBuffer(U.COLOR_ATTACHMENT0+pe),!_t.textureFormatReadable($e))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!_t.textureTypeReadable(Ge))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Oe=U.createBuffer();U.bindBuffer(U.PIXEL_PACK_BUFFER,Oe),U.bufferData(U.PIXEL_PACK_BUFFER,_e.byteLength,U.STREAM_READ),U.readPixels(N,W,F,B,de.convert($e),de.convert(Ge),0);const ft=X!==null?M.get(X).__webglFramebuffer:null;Le.bindFramebuffer(U.FRAMEBUFFER,ft);const It=U.fenceSync(U.SYNC_GPU_COMMANDS_COMPLETE,0);return U.flush(),await $h(U,It,4),U.bindBuffer(U.PIXEL_PACK_BUFFER,Oe),U.getBufferSubData(U.PIXEL_PACK_BUFFER,0,_e),U.deleteBuffer(Oe),U.deleteSync(It),_e}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(S,N=null,W=0){const F=Math.pow(2,-W),B=Math.floor(S.image.width*F),_e=Math.floor(S.image.height*F),Se=N!==null?N.x:0,pe=N!==null?N.y:0;k.setTexture2D(S,0),U.copyTexSubImage2D(U.TEXTURE_2D,W,0,0,Se,pe,B,_e),Le.unbindTexture()};const Je=U.createFramebuffer(),ue=U.createFramebuffer();this.copyTextureToTexture=function(S,N,W=null,F=null,B=0,_e=0){let Se,pe,ve,xe,$e,Ge,Oe,ft,It;const Nt=S.isCompressedTexture?S.mipmaps[_e]:S.image;if(W!==null)Se=W.max.x-W.min.x,pe=W.max.y-W.min.y,ve=W.isBox3?W.max.z-W.min.z:1,xe=W.min.x,$e=W.min.y,Ge=W.isBox3?W.min.z:0;else{const qt=Math.pow(2,-B);Se=Math.floor(Nt.width*qt),pe=Math.floor(Nt.height*qt),S.isDataArrayTexture?ve=Nt.depth:S.isData3DTexture?ve=Math.floor(Nt.depth*qt):ve=1,xe=0,$e=0,Ge=0}F!==null?(Oe=F.x,ft=F.y,It=F.z):(Oe=0,ft=0,It=0);const bt=de.convert(N.format),Kt=de.convert(N.type);let Ne;N.isData3DTexture?(k.setTexture3D(N,0),Ne=U.TEXTURE_3D):N.isDataArrayTexture||N.isCompressedArrayTexture?(k.setTexture2DArray(N,0),Ne=U.TEXTURE_2D_ARRAY):(k.setTexture2D(N,0),Ne=U.TEXTURE_2D),U.pixelStorei(U.UNPACK_FLIP_Y_WEBGL,N.flipY),U.pixelStorei(U.UNPACK_PREMULTIPLY_ALPHA_WEBGL,N.premultiplyAlpha),U.pixelStorei(U.UNPACK_ALIGNMENT,N.unpackAlignment);const cn=U.getParameter(U.UNPACK_ROW_LENGTH),Mt=U.getParameter(U.UNPACK_IMAGE_HEIGHT),xn=U.getParameter(U.UNPACK_SKIP_PIXELS),wn=U.getParameter(U.UNPACK_SKIP_ROWS),di=U.getParameter(U.UNPACK_SKIP_IMAGES);U.pixelStorei(U.UNPACK_ROW_LENGTH,Nt.width),U.pixelStorei(U.UNPACK_IMAGE_HEIGHT,Nt.height),U.pixelStorei(U.UNPACK_SKIP_PIXELS,xe),U.pixelStorei(U.UNPACK_SKIP_ROWS,$e),U.pixelStorei(U.UNPACK_SKIP_IMAGES,Ge);const Di=S.isDataArrayTexture||S.isData3DTexture,Ct=N.isDataArrayTexture||N.isData3DTexture;if(S.isDepthTexture){const qt=M.get(S),Jn=M.get(N),Gt=M.get(qt.__renderTarget),Qn=M.get(Jn.__renderTarget);Le.bindFramebuffer(U.READ_FRAMEBUFFER,Gt.__webglFramebuffer),Le.bindFramebuffer(U.DRAW_FRAMEBUFFER,Qn.__webglFramebuffer);for(let Li=0;Li<ve;Li++)Di&&(U.framebufferTextureLayer(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,M.get(S).__webglTexture,B,Ge+Li),U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,M.get(N).__webglTexture,_e,It+Li)),U.blitFramebuffer(xe,$e,Se,pe,Oe,ft,Se,pe,U.DEPTH_BUFFER_BIT,U.NEAREST);Le.bindFramebuffer(U.READ_FRAMEBUFFER,null),Le.bindFramebuffer(U.DRAW_FRAMEBUFFER,null)}else if(B!==0||S.isRenderTargetTexture||M.has(S)){const qt=M.get(S),Jn=M.get(N);Le.bindFramebuffer(U.READ_FRAMEBUFFER,Je),Le.bindFramebuffer(U.DRAW_FRAMEBUFFER,ue);for(let Gt=0;Gt<ve;Gt++)Di?U.framebufferTextureLayer(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,qt.__webglTexture,B,Ge+Gt):U.framebufferTexture2D(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,qt.__webglTexture,B),Ct?U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,Jn.__webglTexture,_e,It+Gt):U.framebufferTexture2D(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,Jn.__webglTexture,_e),B!==0?U.blitFramebuffer(xe,$e,Se,pe,Oe,ft,Se,pe,U.COLOR_BUFFER_BIT,U.NEAREST):Ct?U.copyTexSubImage3D(Ne,_e,Oe,ft,It+Gt,xe,$e,Se,pe):U.copyTexSubImage2D(Ne,_e,Oe,ft,xe,$e,Se,pe);Le.bindFramebuffer(U.READ_FRAMEBUFFER,null),Le.bindFramebuffer(U.DRAW_FRAMEBUFFER,null)}else Ct?S.isDataTexture||S.isData3DTexture?U.texSubImage3D(Ne,_e,Oe,ft,It,Se,pe,ve,bt,Kt,Nt.data):N.isCompressedArrayTexture?U.compressedTexSubImage3D(Ne,_e,Oe,ft,It,Se,pe,ve,bt,Nt.data):U.texSubImage3D(Ne,_e,Oe,ft,It,Se,pe,ve,bt,Kt,Nt):S.isDataTexture?U.texSubImage2D(U.TEXTURE_2D,_e,Oe,ft,Se,pe,bt,Kt,Nt.data):S.isCompressedTexture?U.compressedTexSubImage2D(U.TEXTURE_2D,_e,Oe,ft,Nt.width,Nt.height,bt,Nt.data):U.texSubImage2D(U.TEXTURE_2D,_e,Oe,ft,Se,pe,bt,Kt,Nt);U.pixelStorei(U.UNPACK_ROW_LENGTH,cn),U.pixelStorei(U.UNPACK_IMAGE_HEIGHT,Mt),U.pixelStorei(U.UNPACK_SKIP_PIXELS,xn),U.pixelStorei(U.UNPACK_SKIP_ROWS,wn),U.pixelStorei(U.UNPACK_SKIP_IMAGES,di),_e===0&&N.generateMipmaps&&U.generateMipmap(Ne),Le.unbindTexture()},this.initRenderTarget=function(S){M.get(S).__webglFramebuffer===void 0&&k.setupRenderTarget(S)},this.initTexture=function(S){S.isCubeTexture?k.setTextureCube(S,0):S.isData3DTexture?k.setTexture3D(S,0):S.isDataArrayTexture||S.isCompressedArrayTexture?k.setTexture2DArray(S,0):k.setTexture2D(S,0),Le.unbindTexture()},this.resetState=function(){D=0,V=0,X=null,Le.reset(),ce.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Un}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=xt._getDrawingBufferColorSpace(e),t.unpackColorSpace=xt._getUnpackColorSpace()}}class Pg{constructor(){this.container=document.getElementById("three-game")||document.body,this.scene=new lu,this.scene.background=new mt(12184319);const{width:e,height:t}=this.getViewportSize(),n=e/t;this.camera=new gn(38,n,.5,1e3),this.cameraOffset=new G(14,13,24),this.cameraLookOffset=new G(0,.8,0),this.camera.position.copy(this.cameraOffset),this.camera.lookAt(0,0,0),this.renderer=new Cg({antialias:window.devicePixelRatio<2,alpha:!1,powerPreference:"default"}),this.renderer.setSize(e,t),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,1.5)),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=wr,this.renderer.outputColorSpace=en,this.renderer.toneMapping=Da,this.renderer.toneMappingExposure=1.08,this.container.appendChild(this.renderer.domElement),this.renderer.domElement.id="three-canvas";const r=new Au(15334399,12044425,1);this.scene.add(r);const s=new Iu(16777215,.42);this.scene.add(s);const o=new Pu(16774096,1.35);o.position.set(12,26,10),o.castShadow=!0,o.shadow.mapSize.set(1024,1024),o.shadow.camera.left=-34,o.shadow.camera.right=34,o.shadow.camera.top=34,o.shadow.camera.bottom=-34,o.shadow.camera.near=1,o.shadow.camera.far=80,o.shadow.bias=-25e-5,o.shadow.radius=3,this.scene.add(o),this.worldGroup=new on,this.scene.add(this.worldGroup),this.entityGroup=new on,this.scene.add(this.entityGroup),this.cameraZoom=1,this.raycaster=new Uu,this.pathLine=null,window.addEventListener("resize",()=>this.onWindowResize())}drawRoundRect(e,t,n,r,s,o){e.beginPath(),e.moveTo(t+o,n),e.arcTo(t+r,n,t+r,n+s,o),e.arcTo(t+r,n+s,t,n+s,o),e.arcTo(t,n+s,t,n,o),e.arcTo(t,n,t+r,n,o),e.closePath()}getViewportSize(){const e=this.container.getBoundingClientRect();return{width:Math.max(320,e.width||window.innerWidth),height:Math.max(240,e.height||window.innerHeight)}}getIntersectedTile(e){this.raycaster.setFromCamera(e,this.camera);const t=this.raycaster.intersectObjects(this.worldGroup.children);return t.length>0?t[0].object.userData.tile:null}renderPathLine(e,t){if(this.pathLine&&(this.scene.remove(this.pathLine),this.pathLine.geometry.dispose(),this.pathLine.material.dispose(),this.pathLine=null),!e||e.length<2)return;const n=[];for(const o of e){const a=t.getElevation(o.x,o.y)+1.1;n.push(new G(o.x,a,o.y))}const r=new rn().setFromPoints(n),s=new Vc({color:65484,transparent:!0,opacity:.8,depthTest:!1});this.pathLine=new vu(r,s),this.scene.add(this.pathLine)}onWindowResize(){const{width:e,height:t}=this.getViewportSize();this.camera.aspect=e/t,this.camera.updateProjectionMatrix(),this.renderer.setSize(e,t)}handleZoom(e){const t=e>0?-.1:.1;this.cameraZoom=Math.max(.5,Math.min(3,this.cameraZoom+t)),this.camera.zoom=this.cameraZoom,this.camera.updateProjectionMatrix()}updateCamera(e){const t=e.clone().add(this.cameraLookOffset);this.camera.position.copy(e).add(this.cameraOffset),this.camera.lookAt(t)}render(){this.renderer.render(this.scene,this.camera)}addToWorld(e){this.worldGroup.add(e)}addToEntities(e){this.entityGroup.add(e)}removeFromWorld(e){this.worldGroup.remove(e)}removeFromEntities(e){this.entityGroup.remove(e)}}const ne={VOID:0,GEO:1,HYDRO:2,ANEMO:3,CRYO:4,PYRO:5,STRUCTURE:6},ec={[ne.VOID]:{id:"void",label:"Void",walkable:!1,habitats:[],topColor:8226710,sideColor:6121075,roughness:.95,pattern:"blocked"},[ne.GEO]:{id:"geo",label:"Grassland",walkable:!0,habitats:["meadow","forest-edge"],topColor:9427560,sideColor:6466136,roughness:.76,moveCost:1,pattern:"grass"},[ne.HYDRO]:{id:"hydro",label:"Water",walkable:!1,habitats:["shore"],topColor:5227511,sideColor:1935039,roughness:.35,moveCost:1/0,pattern:"water"},[ne.ANEMO]:{id:"anemo",label:"Sand",walkable:!0,habitats:["shore"],topColor:16767352,sideColor:14919757,roughness:.78,moveCost:1.08,pattern:"sand"},[ne.CRYO]:{id:"cryo",label:"Snowfield",walkable:!0,habitats:["snow"],topColor:15989759,sideColor:12048874,roughness:.32,moveCost:1.18,pattern:"ice"},[ne.PYRO]:{id:"pyro",label:"Lava",walkable:!1,habitats:[],topColor:16742950,sideColor:12073496,roughness:.55,moveCost:1/0,pattern:"lava"},[ne.STRUCTURE]:{id:"structure",label:"Building Wall",walkable:!1,habitats:[],topColor:16758223,sideColor:13135245,roughness:.7,moveCost:1/0,pattern:"building"}},Ig={[`${ne.HYDRO}:4`]:{label:"Brackish Water",topColor:7840359,sideColor:4878661,pattern:"marsh"},[`${ne.GEO}:1`]:{label:"Forest Floor",topColor:6800239,sideColor:4167251,moveCost:1.2,pattern:"forest"},[`${ne.GEO}:2`]:{label:"Village Road",topColor:16308618,sideColor:13869911,moveCost:.9,pattern:"road"},[`${ne.GEO}:3`]:{label:"Hill Ledge",topColor:10999929,sideColor:5213251,moveCost:1.28,pattern:"hill"},[`${ne.GEO}:4`]:{label:"Mountain Ledge",topColor:11451532,sideColor:6911068,moveCost:1.45,pattern:"stone"},[`${ne.CRYO}:1`]:{label:"Ice Lake",topColor:12120319,sideColor:7716311,moveCost:1.24,pattern:"ice"},[`${ne.STRUCTURE}:0`]:{label:"Stone Wall",topColor:11911372,sideColor:8293273,pattern:"blocked"},[`${ne.STRUCTURE}:1`]:{label:"Town Wall",topColor:16761710,sideColor:14190908,pattern:"brick"},[`${ne.STRUCTURE}:2`]:{label:"Building Floor",walkable:!0,topColor:14137738,sideColor:10974543,moveCost:.95,pattern:"floor"},[`${ne.STRUCTURE}:3`]:{label:"Stone Building Wall",topColor:12962769,sideColor:8226704,pattern:"masonry"},[`${ne.STRUCTURE}:4`]:{label:"Timber Building Wall",topColor:13998691,sideColor:9001270,pattern:"timber"},[`${ne.STRUCTURE}:5`]:{label:"Oak Doorway",walkable:!0,topColor:10183482,sideColor:7290920,moveCost:.9,pattern:"doorOak"},[`${ne.STRUCTURE}:6`]:{label:"Stairs",walkable:!0,topColor:13150842,sideColor:9200960,moveCost:1.05,pattern:"stairs"},[`${ne.STRUCTURE}:7`]:{label:"Iron Doorway",walkable:!0,topColor:6713723,sideColor:3423042,moveCost:.9,pattern:"doorIron"},[`${ne.STRUCTURE}:8`]:{label:"Painted Doorway",walkable:!0,topColor:4161401,sideColor:2642253,moveCost:.9,pattern:"doorPainted"},[`${ne.STRUCTURE}:9`]:{label:"Stone Stairs",walkable:!0,topColor:12962769,sideColor:8226704,moveCost:1.05,pattern:"masonry"},[`${ne.STRUCTURE}:10`]:{label:"Timber Stairs",walkable:!0,topColor:13998691,sideColor:9001270,moveCost:1.05,pattern:"timber"}};function Ci(i,e=0){const t=ec[i]||ec[ne.VOID],n=Ig[`${i}:${e}`]||{};return{...t,...n}}function Dg(i,e=0){return Ci(i,e).walkable}function Lg(i,e,t){return Ci(i,e).habitats.includes(t)}const at={NONE:0,EARTH:ne.GEO,WATER:ne.HYDRO,WIND:ne.ANEMO,ICE:ne.CRYO,FIRE:ne.PYRO,STRUCTURE:ne.STRUCTURE},ct={DEFAULT:0,FOREST:1,ROAD:2,HILL:3,MOUNTAIN:4,ICE:1,DEEP_WATER:2,MARSH_WATER:4,TOWN_WALL:1,BUILDING_FLOOR:2,STONE_BUILDING_WALL:3,TIMBER_BUILDING_WALL:4,OAK_DOOR:5,STAIRS:6,IRON_DOOR:7,PAINTED_DOOR:8,STONE_STAIRS:9,TIMBER_STAIRS:10},tc={oak:ct.OAK_DOOR,iron:ct.IRON_DOOR,painted:ct.PAINTED_DOOR},oe={NONE:0,WALL:1,DOOR:2,FLOOR:3,STAIRS:4,WINDOW_LOWER_NORTH:6,WINDOW_LOWER_SOUTH:7,WINDOW_LOWER_WEST:8,WINDOW_LOWER_EAST:9,STAIRS_NORTH:10,STAIRS_SOUTH:11,STAIRS_WEST:12,STAIRS_EAST:13,WINDOW_UPPER_NORTH:14,WINDOW_UPPER_SOUTH:15,WINDOW_UPPER_WEST:16,WINDOW_UPPER_EAST:17},Aa={W:{element:ne.HYDRO,texture:ct.DEEP_WATER,effect:at.WATER,building:oe.NONE,height:0},B:{element:ne.HYDRO,texture:ct.MARSH_WATER,effect:at.WATER,building:oe.NONE,height:0},S:{element:ne.ANEMO,texture:ct.DEFAULT,effect:at.WIND,building:oe.NONE,height:0},G:{element:ne.GEO,texture:ct.DEFAULT,effect:at.EARTH,building:oe.NONE,height:0},F:{element:ne.GEO,texture:ct.FOREST,effect:at.EARTH,building:oe.NONE,height:0},H:{element:ne.GEO,texture:ct.HILL,effect:at.EARTH,building:oe.NONE,height:1},M:{element:ne.GEO,texture:ct.MOUNTAIN,effect:at.EARTH,building:oe.NONE,height:2},P:{element:ne.CRYO,texture:ct.DEFAULT,effect:at.ICE,building:oe.NONE,height:2},I:{element:ne.CRYO,texture:ct.ICE,effect:at.ICE,building:oe.NONE,height:0},L:{element:ne.PYRO,texture:ct.DEFAULT,effect:at.FIRE,building:oe.NONE,height:2},R:{element:ne.GEO,texture:ct.ROAD,effect:at.EARTH,building:oe.NONE,height:0},T:{element:ne.STRUCTURE,texture:ct.TOWN_WALL,effect:at.STRUCTURE,building:oe.WALL,height:2},X:{element:ne.STRUCTURE,texture:ct.DEFAULT,effect:at.STRUCTURE,building:oe.WALL,height:1},A:{element:ne.STRUCTURE,texture:ct.STONE_BUILDING_WALL,effect:at.STRUCTURE,building:oe.WALL,height:2},C:{element:ne.STRUCTURE,texture:ct.TIMBER_BUILDING_WALL,effect:at.STRUCTURE,building:oe.WALL,height:2},N:{element:ne.STRUCTURE,texture:ct.STONE_BUILDING_WALL,effect:at.STRUCTURE,building:oe.WINDOW_LOWER_NORTH,height:2},O:{element:ne.STRUCTURE,texture:ct.STONE_BUILDING_WALL,effect:at.STRUCTURE,building:oe.WINDOW_LOWER_SOUTH,height:2},J:{element:ne.STRUCTURE,texture:ct.STONE_BUILDING_WALL,effect:at.STRUCTURE,building:oe.WINDOW_LOWER_WEST,height:2},K:{element:ne.STRUCTURE,texture:ct.STONE_BUILDING_WALL,effect:at.STRUCTURE,building:oe.WINDOW_LOWER_EAST,height:2},Q:{element:ne.STRUCTURE,texture:ct.TIMBER_BUILDING_WALL,effect:at.STRUCTURE,building:oe.WINDOW_LOWER_NORTH,height:2},V:{element:ne.STRUCTURE,texture:ct.TIMBER_BUILDING_WALL,effect:at.STRUCTURE,building:oe.WINDOW_LOWER_SOUTH,height:2},Y:{element:ne.STRUCTURE,texture:ct.TIMBER_BUILDING_WALL,effect:at.STRUCTURE,building:oe.WINDOW_LOWER_WEST,height:2},Z:{element:ne.STRUCTURE,texture:ct.TIMBER_BUILDING_WALL,effect:at.STRUCTURE,building:oe.WINDOW_LOWER_EAST,height:2},D:{element:ne.STRUCTURE,texture:ct.BUILDING_FLOOR,effect:at.STRUCTURE,building:oe.DOOR,height:0},E:{element:ne.STRUCTURE,texture:ct.BUILDING_FLOOR,effect:at.STRUCTURE,building:oe.FLOOR,height:0},U:{element:ne.STRUCTURE,texture:ct.STAIRS,effect:at.STRUCTURE,building:oe.STAIRS,height:0},1:{element:ne.STRUCTURE,texture:ct.STONE_STAIRS,effect:at.STRUCTURE,building:oe.STAIRS_NORTH,height:0},2:{element:ne.STRUCTURE,texture:ct.STONE_STAIRS,effect:at.STRUCTURE,building:oe.STAIRS_SOUTH,height:0},3:{element:ne.STRUCTURE,texture:ct.STONE_STAIRS,effect:at.STRUCTURE,building:oe.STAIRS_WEST,height:0},4:{element:ne.STRUCTURE,texture:ct.STONE_STAIRS,effect:at.STRUCTURE,building:oe.STAIRS_EAST,height:0},5:{element:ne.STRUCTURE,texture:ct.TIMBER_STAIRS,effect:at.STRUCTURE,building:oe.STAIRS_NORTH,height:0},6:{element:ne.STRUCTURE,texture:ct.TIMBER_STAIRS,effect:at.STRUCTURE,building:oe.STAIRS_SOUTH,height:0},7:{element:ne.STRUCTURE,texture:ct.TIMBER_STAIRS,effect:at.STRUCTURE,building:oe.STAIRS_WEST,height:0},8:{element:ne.STRUCTURE,texture:ct.TIMBER_STAIRS,effect:at.STRUCTURE,building:oe.STAIRS_EAST,height:0}};function As({element:i=ne.VOID,texture:e=0,effect:t=at.NONE,building:n=oe.NONE,height:r=0}={}){return{element:In(i,ne.VOID),texture:In(e,0),effect:In(t,at.NONE),building:In(n,oe.NONE),height:In(r,0)}}function ji({element:i=ne.VOID,texture:e=0,effect:t=at.NONE,building:n=oe.NONE,z:r=0}={}){const s=In(e,0),o=In(i,ne.VOID);return{z:In(r,0),element:o,texture:s,textureValue:s,effect:In(t,at.NONE),building:In(n,oe.NONE),definition:Ci(o,s)}}function Ra(i){return As(Aa[String(i).toUpperCase()]||Aa.W)}function Rs(i){if(typeof i=="string")return Ra(i);if(Array.isArray(i))return As({element:i[0],texture:i[1],effect:i[2],building:i[3],height:i[4]});if(i&&typeof i=="object"){const e=i.element??i.e,t=i.texture??i.textureValue??i.t,n=i.effect??i.fx,r=i.building??i.b,s=i.height??i.maxZ??i.h;return As({element:e,texture:t,effect:n,building:r,height:s})}return Ra("W")}function Ug(i){const e=Rs(i),t=Ci(e.element,e.texture);return{element:e.element,textureValue:e.texture,effect:e.effect,building:e.building,maxZ:e.height,walkable:t.walkable,definition:t}}function Og(i){const e=Rs(i),t=Math.max(0,e.height),n=[];if(zg(e)){n.push(ji({z:0,element:ne.GEO,texture:ct.DEFAULT,effect:at.EARTH,building:oe.NONE}));for(let r=1;r<=t;r++)n.push(ji({z:r,element:e.element,texture:e.texture,effect:e.effect,building:Gg(e.building,r)}));return n}if(Hg(e))return n.push(ji({z:0,element:e.element,texture:e.texture,effect:e.effect,building:e.building})),t>0&&n.push(ji({z:t,element:e.element,texture:e.texture,effect:e.effect,building:e.building})),n;for(let r=0;r<=t;r++){const s=r===t;n.push(ji({z:r,element:s?e.element:ne.GEO,texture:s?e.texture:ct.DEFAULT,effect:s?e.effect:at.EARTH,building:s?e.building:oe.NONE}))}return n}function Ng(i,e={}){var s;const t=kg(i,e),n=t.length,r=((s=t[0])==null?void 0:s.length)||0;return{encoding:"voxel-matrix-v1",width:r,height:n,offsetX:Math.floor(r/2),offsetY:Math.floor(n/2),columns:t.map(o=>o.map(a=>Og(a)))}}function Fg(i,e,t){var s;if(!(i!=null&&i.columns))return null;const n=e+i.offsetX,r=t+i.offsetY;return((s=i.columns[r])==null?void 0:s[n])||null}function nc(i){return!Array.isArray(i)||i.length===0?null:i.reduce((e,t)=>t.z>e.z?t:e,i[0])}function Bg(i){return i.map(e=>[...String(e)].map(t=>Ra(t)))}function kg(i,e={}){return Array.isArray(i)?i.filter(t=>Array.isArray(t)||typeof t=="string").map(t=>typeof t=="string"?[...t.trim().toUpperCase()].map(n=>{var s;const r=e[n]||e[(s=n.toUpperCase)==null?void 0:s.call(n)];return Rs(r||n)}):t.map(n=>Rs(n))).filter(t=>t.length>0):[]}const ic=Object.fromEntries(Object.entries(Aa).map(([i,e])=>[i,Ug(e)]));function zg(i){return i.element===ne.STRUCTURE&&i.height>=2&&(i.building===oe.WALL||Qc(i.building))}function Hg(i){return i.element===ne.STRUCTURE&&i.height>0&&[oe.FLOOR,oe.STAIRS,oe.STAIRS_NORTH,oe.STAIRS_SOUTH,oe.STAIRS_WEST,oe.STAIRS_EAST].includes(i.building)}function Qc(i){return[oe.WINDOW_LOWER_NORTH,oe.WINDOW_LOWER_SOUTH,oe.WINDOW_LOWER_WEST,oe.WINDOW_LOWER_EAST].includes(i)}function Vg(i){return{[oe.WINDOW_LOWER_NORTH]:oe.WINDOW_UPPER_NORTH,[oe.WINDOW_LOWER_SOUTH]:oe.WINDOW_UPPER_SOUTH,[oe.WINDOW_LOWER_WEST]:oe.WINDOW_UPPER_WEST,[oe.WINDOW_LOWER_EAST]:oe.WINDOW_UPPER_EAST}[i]||i}function Gg(i,e){return Qc(i)&&e%2===0?Vg(i):i}function In(i,e){const t=Number(i);return Number.isFinite(t)?Math.max(0,Math.floor(t)):e}const eh=.96,Wg=eh/2,he=class he{constructor(e,t,n,r,s={}){this.threeManager=e,this.gridX=t,this.gridY=n,this.elevation=r,this.attributes=s,this.element=s.element||ne.GEO,this.textureValue=s.textureValue||0,this.effect=s.effect||0,this.building=s.building||0,this.objects=[],this.render()}setElementalType(e,t,n=0,r=0){this.element=e,this.textureValue=t,this.effect=n,this.building=r,this.mesh&&(this.restoreBaseMaterial(),this.clearObjects(),this.mesh.material=he.isSpecialBuildingShape(r)?he.getInvisibleMaterial():he.getMaterials(e,t,n,this.elevation,r),this.createObjects())}render(){const e=he.isSpecialBuildingShape(this.building)?he.getInvisibleMaterial():he.getMaterials(this.element,this.textureValue,this.effect,this.elevation,this.building);this.mesh=new He(he.geometry,e),this.mesh.castShadow=!Ci(this.element,this.textureValue).walkable,this.mesh.receiveShadow=!0,this.mesh.position.set(this.gridX,this.elevation,this.gridY),this.mesh.userData.tile=this,this.threeManager.addToWorld(this.mesh),this.createObjects()}createObjects(){this.mesh&&(he.isWindowWall(this.building)?this.addWindowWallObjects():he.isDirectionalStair(this.building)&&this.addStairObjects())}addWindowWallObjects(){const e=he.getBuildingPartDirection(this.building),t=he.getWindowGlassMaterial(),n=he.getMaterials(this.element,this.textureValue,this.effect,this.elevation,this.building),r=he.isUpperWindowWall(this.building),s=new He(new pt(.98,.48,.98),n);s.position.y=r?.24:-.24,s.castShadow=!0,s.receiveShadow=!0,s.raycast=()=>{},this.mesh.add(s),this.objects.push(s);const o=new He(new pt(e==="north"||e==="south"?.82:.045,.44,e==="north"||e==="south"?.045:.82),t),a=he.getDirectionVector(e);o.position.set(a.x*.47,r?-.25:.25,a.y*.47),o.raycast=()=>{},this.mesh.add(o),this.objects.push(o)}addStairObjects(){const e=he.getBuildingPartDirection(this.building),t=he.getDirectionVector(e),n=he.getMaterials(this.element,this.textureValue,this.effect,this.elevation,this.building),r=.3,s=new He(new pt(.82,.035,.82),he.getStairwellMaterial());s.position.y=-.49,s.raycast=()=>{},this.mesh.add(s),this.objects.push(s);for(let l=0;l<3;l++){const c=(l+1)*.32,u=new He(new pt(.9,c,r),n),d=-.3+l*r;u.position.set(t.x*d,-.48+c/2,t.y*d),u.rotation.y=e==="east"||e==="west"?Math.PI/2:0,u.castShadow=!0,u.receiveShadow=!0,u.raycast=()=>{},this.mesh.add(u),this.objects.push(u)}const o=he.getStairRailMaterial(),a=[{size:[.82,.12,.05],x:0,z:-.43},{size:[.82,.12,.05],x:0,z:.43},{size:[.05,.12,.82],x:-.43,z:0},{size:[.05,.12,.82],x:.43,z:0}];for(const l of a){const c=new He(new pt(...l.size),o);c.position.set(l.x,.08,l.z),c.castShadow=!0,c.receiveShadow=!0,c.raycast=()=>{},this.mesh.add(c),this.objects.push(c)}}clearObjects(){var e,t,n;if((e=this.objects)!=null&&e.length){for(const r of this.objects)(t=r.parent)==null||t.remove(r),(n=r.geometry)==null||n.dispose();this.objects=[]}}static isWindowWall(e){return[oe.WINDOW_LOWER_NORTH,oe.WINDOW_LOWER_SOUTH,oe.WINDOW_LOWER_WEST,oe.WINDOW_LOWER_EAST,oe.WINDOW_UPPER_NORTH,oe.WINDOW_UPPER_SOUTH,oe.WINDOW_UPPER_WEST,oe.WINDOW_UPPER_EAST].includes(e)}static isUpperWindowWall(e){return[oe.WINDOW_UPPER_NORTH,oe.WINDOW_UPPER_SOUTH,oe.WINDOW_UPPER_WEST,oe.WINDOW_UPPER_EAST].includes(e)}static isSpecialBuildingShape(e){return he.isWindowWall(e)||he.isDirectionalStair(e)}static isDirectionalStair(e){return[oe.STAIRS_NORTH,oe.STAIRS_SOUTH,oe.STAIRS_WEST,oe.STAIRS_EAST].includes(e)}static getBuildingPartDirection(e){return{[oe.WINDOW_LOWER_NORTH]:"north",[oe.WINDOW_LOWER_SOUTH]:"south",[oe.WINDOW_LOWER_WEST]:"west",[oe.WINDOW_LOWER_EAST]:"east",[oe.WINDOW_UPPER_NORTH]:"north",[oe.WINDOW_UPPER_SOUTH]:"south",[oe.WINDOW_UPPER_WEST]:"west",[oe.WINDOW_UPPER_EAST]:"east",[oe.STAIRS_NORTH]:"north",[oe.STAIRS_SOUTH]:"south",[oe.STAIRS_WEST]:"west",[oe.STAIRS_EAST]:"east"}[e]||"north"}static getDirectionVector(e){return{north:{x:0,y:-1},south:{x:0,y:1},west:{x:-1,y:0},east:{x:1,y:0}}[e]||{x:0,y:-1}}static getWindowGlassMaterial(){return he.windowGlassMaterial||(he.windowGlassMaterial=new zt({color:10348543,emissive:2251889,emissiveIntensity:.2,roughness:.18,metalness:.02,transparent:!0,opacity:.58,depthWrite:!1})),he.windowGlassMaterial}static getStairwellMaterial(){return he.stairwellMaterial||(he.stairwellMaterial=new zt({color:2040092,roughness:.96,metalness:.02})),he.stairwellMaterial}static getStairRailMaterial(){return he.stairRailMaterial||(he.stairRailMaterial=new zt({color:6636075,roughness:.82,metalness:.03})),he.stairRailMaterial}static getInvisibleMaterial(){return he.invisibleMaterial||(he.invisibleMaterial=new $n({transparent:!0,opacity:0,depthWrite:!1,colorWrite:!1})),he.invisibleMaterial}highlight(e=5592405){this.mesh&&this.mesh.material&&(this.highlightMaterial||(this.highlightMaterial=Array.isArray(this.mesh.material)?this.mesh.material.map(n=>n.clone()):this.mesh.material.clone(),this.mesh.material=this.highlightMaterial),(Array.isArray(this.mesh.material)?this.mesh.material:[this.mesh.material]).forEach(n=>{var r;return(r=n.emissive)==null?void 0:r.setHex(e)}))}clearHighlight(){this.restoreBaseMaterial()}restoreBaseMaterial(){if(!this.mesh||!this.highlightMaterial)return;(Array.isArray(this.highlightMaterial)?this.highlightMaterial:[this.highlightMaterial]).forEach(t=>t.dispose()),this.highlightMaterial=null,this.mesh.material=he.isSpecialBuildingShape(this.building)?he.getInvisibleMaterial():he.getMaterials(this.element,this.textureValue,this.effect,this.elevation,this.building)}static getMaterials(e,t=0,n=0,r=0,s=oe.NONE){const o=he.getOutdoorElevationTone(e,r,s),a=`${e}:${t}:${n}:${o}`;if(!he.materialCache.has(a)){const l=Ci(e,t),c=he.createTexture(l,n,o),u=he.createSideTexture(l,o),d=new zt({color:16777215,map:c,roughness:l.roughness,metalness:.05}),f=new zt({color:16777215,map:u,roughness:Math.min(1,l.roughness+.08),metalness:.02});he.materialCache.set(a,[f,f,d,f,f,f])}return he.materialCache.get(a)}static getOutdoorElevationTone(e,t,n){return n!==oe.NONE||![ne.GEO,ne.ANEMO,ne.CRYO].includes(e)?0:t<=0?-.14:Math.min(.3,.08+t*.11)}static createTexture(e,t=0,n=0){const r=document.createElement("canvas");r.width=96,r.height=96;const s=r.getContext("2d"),o=`#${e.topColor.toString(16).padStart(6,"0")}`,a=`#${e.sideColor.toString(16).padStart(6,"0")}`;s.fillStyle=o,s.fillRect(0,0,r.width,r.height),he.drawSoftTop(s,e),e.pattern==="grass"?he.drawGrass(s,o,a):e.pattern==="forest"?he.drawForest(s):e.pattern==="hill"?he.drawHill(s):e.pattern==="stone"?he.drawStone(s):e.pattern==="road"?he.drawRoad(s):e.pattern==="floor"?he.drawFloor(s):e.pattern==="water"?he.drawWaves(s,"#b7e6f4",.35):e.pattern==="marsh"?(he.drawWaves(s,"#7c8b48",.28),he.drawSpeckles(s,"#2f3b20",22,.45)):e.pattern==="sand"?he.drawSpeckles(s,"#f5dea0",42,.45):e.pattern==="ice"?he.drawIce(s,"#ffffff"):e.pattern==="lava"?he.drawLava(s):e.pattern==="brick"?he.drawBrick(s):e.pattern==="masonry"?he.drawMasonry(s):e.pattern==="timber"?he.drawTimber(s):e.pattern==="doorOak"?he.drawDoor(s,"oak"):e.pattern==="doorIron"?he.drawDoor(s,"iron"):e.pattern==="doorPainted"?he.drawDoor(s,"painted"):e.pattern==="stairs"?he.drawStairs(s):e.pattern==="blocked"?he.drawBlocked(s):he.drawSpeckles(s,a,28,.25),t>0&&he.drawElementEffect(s,t),he.applyElevationTone(s,n),he.drawRoundedFrame(s,e.walkable);const l=new Ea(r);return l.colorSpace=en,l.wrapS=bi,l.wrapT=bi,l.repeat.set(1,1),l.needsUpdate=!0,l}static createSideTexture(e,t=0){const n=document.createElement("canvas");n.width=96,n.height=96;const r=n.getContext("2d"),s=`#${e.topColor.toString(16).padStart(6,"0")}`,o=`#${e.sideColor.toString(16).padStart(6,"0")}`,a=r.createLinearGradient(0,0,0,96);a.addColorStop(0,s),a.addColorStop(.18,o),a.addColorStop(1,he.shadeColor(o,-34)),r.fillStyle=a,r.fillRect(0,0,96,96),r.fillStyle="rgba(255, 255, 255, 0.22)",r.fillRect(0,0,96,8),r.fillStyle="rgba(4, 9, 12, 0.26)",r.fillRect(0,84,96,12),r.strokeStyle=e.walkable?"rgba(31, 58, 35, 0.22)":"rgba(6, 9, 12, 0.38)",r.lineWidth=3;for(let c=22;c<88;c+=22)r.beginPath(),r.moveTo(0,c),r.lineTo(96,c),r.stroke();e.walkable||(r.strokeStyle="rgba(255, 255, 255, 0.2)",r.lineWidth=4,r.beginPath(),r.moveTo(18,16),r.lineTo(78,76),r.moveTo(80,18),r.lineTo(20,78),r.stroke()),he.applyElevationTone(r,t*.9);const l=new Ea(n);return l.colorSpace=en,l.wrapS=bi,l.wrapT=bi,l.needsUpdate=!0,l}static applyElevationTone(e,t){Math.abs(t)<.001||(e.save(),e.globalCompositeOperation=t>0?"screen":"multiply",e.globalAlpha=Math.min(.42,Math.abs(t)),e.fillStyle=t>0?"#ffffff":"#46513d",e.fillRect(0,0,e.canvas.width,e.canvas.height),e.restore())}static shadeColor(e,t){const n=parseInt(e.replace("#",""),16),r=Math.max(0,Math.min(255,(n>>16)+t)),s=Math.max(0,Math.min(255,(n>>8&255)+t)),o=Math.max(0,Math.min(255,(n&255)+t));return`#${((1<<24)+(r<<16)+(s<<8)+o).toString(16).slice(1)}`}static drawSoftTop(e,t){const n=e.createRadialGradient(34,26,8,48,48,72);n.addColorStop(0,"rgba(255, 255, 255, 0.34)"),n.addColorStop(.52,"rgba(255, 255, 255, 0.08)"),n.addColorStop(1,t.walkable?"rgba(45, 62, 44, 0.16)":"rgba(18, 24, 24, 0.34)"),e.fillStyle=n,e.fillRect(0,0,96,96)}static drawRoundedFrame(e,t){e.save(),e.lineWidth=t?4:6,e.strokeStyle=t?"rgba(255, 255, 255, 0.28)":"rgba(30, 24, 22, 0.42)",he.roundRect(e,7,7,82,82,15),e.stroke(),e.lineWidth=3,e.strokeStyle=t?"rgba(43, 68, 45, 0.18)":"rgba(5, 7, 8, 0.34)",he.roundRect(e,2.5,2.5,91,91,13),e.stroke(),e.restore()}static drawElementEffect(e,t){const r={[ne.GEO]:"#7ed957",[ne.HYDRO]:"#4fc3f7",[ne.ANEMO]:"#ffd978",[ne.CRYO]:"#b8f0ff",[ne.PYRO]:"#ff8a3d",[ne.STRUCTURE]:"#ffb5cf"}[t];if(r){e.save(),e.globalAlpha=.22,e.fillStyle=r,he.roundRect(e,14,14,68,68,18),e.fill(),e.globalAlpha=.5,e.strokeStyle=r,e.lineWidth=4,e.setLineDash([14,10]),e.beginPath(),e.arc(48,48,25,0,Math.PI*2),e.stroke(),e.setLineDash([]),e.globalAlpha=.38,e.lineWidth=3;for(let s=0;s<4;s++){const o=s*Math.PI*.5+Math.PI*.25,a=48+Math.cos(o)*27,l=48+Math.sin(o)*27;e.beginPath(),e.arc(a,l,4,0,Math.PI*2),e.stroke()}e.restore()}}static roundRect(e,t,n,r,s,o){e.beginPath(),e.moveTo(t+o,n),e.arcTo(t+r,n,t+r,n+s,o),e.arcTo(t+r,n+s,t,n+s,o),e.arcTo(t,n+s,t,n,o),e.arcTo(t,n,t+r,n,o),e.closePath()}static drawGrass(e,t,n){he.drawSpeckles(e,"#a4d37e",32,.5),e.strokeStyle=n,e.lineWidth=2;for(let r=0;r<18;r++){const s=r*31%92+2,o=r*47%88+5;e.beginPath(),e.moveTo(s,o+5),e.lineTo(s+3,o),e.stroke()}e.fillStyle=t,e.globalAlpha=.25,e.fillRect(0,0,96,96),e.globalAlpha=1}static drawForest(e){he.drawSpeckles(e,"#2f8d48",30,.32),e.fillStyle="rgba(20, 110, 54, 0.35)";for(let t=0;t<13;t++){const n=t*29%82+8,r=t*43%82+8;e.beginPath(),e.arc(n,r,4+t%3,0,Math.PI*2),e.fill()}}static drawHill(e){he.drawSpeckles(e,"#d4ed91",24,.36),e.strokeStyle="rgba(57, 108, 53, 0.34)",e.lineWidth=4;for(let t=20;t<86;t+=22)e.beginPath(),e.moveTo(13,t),e.bezierCurveTo(30,t-10,52,t+10,80,t-2),e.stroke()}static drawStone(e){he.drawSpeckles(e,"#dce2b2",30,.28),e.strokeStyle="rgba(75, 84, 72, 0.32)",e.lineWidth=3;for(let t=0;t<8;t++){const n=t*19%74+10,r=t*31%74+10;e.beginPath(),e.moveTo(n-8,r),e.lineTo(n,r-6),e.lineTo(n+10,r-2),e.lineTo(n+6,r+8),e.closePath(),e.stroke()}}static drawRoad(e){e.save(),e.strokeStyle="rgba(163, 112, 53, 0.28)",e.lineWidth=5,e.setLineDash([10,9]),e.beginPath(),e.moveTo(4,51),e.bezierCurveTo(24,38,50,60,92,43),e.stroke(),e.restore(),he.drawSpeckles(e,"#fff1bd",34,.38)}static drawFloor(e){e.strokeStyle="rgba(92, 58, 32, 0.26)",e.lineWidth=3;for(let t=16;t<92;t+=16)e.beginPath(),e.moveTo(5,t),e.lineTo(91,t),e.stroke();e.strokeStyle="rgba(255, 246, 206, 0.22)";for(let t=18;t<96;t+=22)e.beginPath(),e.moveTo(t,10),e.lineTo(t-6,88),e.stroke()}static drawWaves(e,t,n){e.strokeStyle=t,e.globalAlpha=n,e.lineWidth=3;for(let r=14;r<96;r+=20){e.beginPath();for(let s=-8;s<104;s+=12){const o=r+Math.sin(s*.18)*3;s===-8?e.moveTo(s,o):e.lineTo(s,o)}e.stroke()}e.globalAlpha=1}static drawSpeckles(e,t,n,r){e.fillStyle=t,e.globalAlpha=r;for(let s=0;s<n;s++){const o=s*37%92+2,a=s*53%92+2,l=1+s%3;e.fillRect(o,a,l,l)}e.globalAlpha=1}static drawIce(e,t){e.strokeStyle=t,e.globalAlpha=.5,e.lineWidth=2;for(let n=0;n<7;n++){const r=n*13%96;e.beginPath(),e.moveTo(r,4),e.lineTo(96-r/2,92),e.stroke()}e.globalAlpha=1}static drawLava(e){const t=e.createRadialGradient(48,48,4,48,48,70);t.addColorStop(0,"#ffd166"),t.addColorStop(.45,"#f97316"),t.addColorStop(1,"#7c1d12"),e.fillStyle=t,e.fillRect(0,0,96,96),e.strokeStyle="rgba(255, 224, 102, 0.65)",e.lineWidth=4,e.beginPath(),e.moveTo(8,28),e.bezierCurveTo(28,10,42,60,62,28),e.bezierCurveTo(72,12,84,30,91,18),e.stroke()}static drawBrick(e){e.strokeStyle="rgba(137, 85, 44, 0.36)",e.lineWidth=3;for(let t=18;t<96;t+=18)e.beginPath(),e.moveTo(4,t),e.lineTo(92,t),e.stroke();for(let t=9;t<96;t+=18){const n=Math.floor(t/18)%2*18;for(let r=8+n;r<96;r+=36)e.beginPath(),e.moveTo(r,t),e.lineTo(r,t+18),e.stroke()}}static drawMasonry(e){he.drawSpeckles(e,"#f1f4f0",18,.18),e.strokeStyle="rgba(76, 84, 90, 0.36)",e.lineWidth=3;for(let t=16;t<96;t+=16)e.beginPath(),e.moveTo(6,t),e.lineTo(90,t),e.stroke();for(let t=8;t<96;t+=16){const n=Math.floor(t/16)%2*18;for(let r=9+n;r<96;r+=36)e.beginPath(),e.moveTo(r,t),e.lineTo(r,t+16),e.stroke()}}static drawTimber(e){he.drawSpeckles(e,"#f3c285",18,.16),e.strokeStyle="rgba(83, 49, 27, 0.38)",e.lineWidth=5;for(let t=18;t<96;t+=24)e.beginPath(),e.moveTo(t,8),e.lineTo(t-4,88),e.stroke();e.strokeStyle="rgba(255, 232, 179, 0.26)",e.lineWidth=2;for(let t=28;t<96;t+=24)e.beginPath(),e.moveTo(t,8),e.lineTo(t-4,88),e.stroke()}static drawDoor(e,t="oak"){const n={oak:{panel:"rgba(70, 39, 24, 0.38)",frame:"rgba(255, 218, 132, 0.45)",accent:"rgba(255, 221, 128, 0.7)"},iron:{panel:"rgba(36, 43, 49, 0.52)",frame:"rgba(190, 207, 216, 0.52)",accent:"rgba(224, 191, 92, 0.78)"},painted:{panel:"rgba(25, 85, 79, 0.5)",frame:"rgba(174, 232, 207, 0.5)",accent:"rgba(244, 205, 93, 0.78)"}},r=n[t]||n.oak;e.fillStyle=r.panel,he.roundRect(e,22,14,52,68,10),e.fill(),e.strokeStyle=r.frame,e.lineWidth=4,he.roundRect(e,24,16,48,64,9),e.stroke(),e.lineWidth=t==="iron"?5:3;for(let s=32;s<=64;s+=16)e.beginPath(),e.moveTo(27,s),e.lineTo(69,s),e.stroke();e.fillStyle=r.accent,e.beginPath(),e.arc(62,48,4,0,Math.PI*2),e.fill()}static drawStairs(e){e.save(),e.fillStyle="rgba(84, 58, 35, 0.18)",e.fillRect(12,18,72,62),e.strokeStyle="rgba(255, 246, 218, 0.42)",e.lineWidth=5;for(let t=0;t<6;t++){const n=22+t*10;e.beginPath(),e.moveTo(20+t*4,n),e.lineTo(76-t*3,n),e.stroke()}e.strokeStyle="rgba(92, 58, 32, 0.34)",e.lineWidth=3,e.beginPath(),e.moveTo(20,78),e.lineTo(80,20),e.stroke(),e.restore()}static drawBlocked(e){e.save(),e.fillStyle="rgba(20, 24, 28, 0.2)",he.roundRect(e,12,12,72,72,15),e.fill(),e.strokeStyle="rgba(255, 255, 255, 0.18)",e.lineWidth=4,e.beginPath(),e.moveTo(22,28),e.lineTo(74,68),e.moveTo(72,25),e.lineTo(24,73),e.stroke(),e.restore()}destroy(){this.clearObjects(),this.mesh&&(this.restoreBaseMaterial(),this.threeManager.removeFromWorld(this.mesh),this.mesh=null)}};hn(he,"geometry",new pt(.98,eh,.98)),hn(he,"topOffset",Wg),hn(he,"materialCache",new Map);let Cs=he;const Xg=16;class Me{constructor(e,t={}){this.threeManager=e,this.chunkSize=t.chunkSize||Xg,this.tiles=[],this.tileMap=new Map,this.elevationMap=new Map,this.surfaceMap=new Map,this.chunkMap=new Map,this.voxelMatrix=null,this.voxelColumnMap=new Map,this.buildingStates=new Map,this.sightCutawayTiles=new Set,this.visibleTileRadius=t.visibleTileRadius||34,this.lastVisibilityCenter=null}generate(e,t){const n=[];for(let r=0;r<t;r++){const s=[];for(let o=0;o<e;o++){const a=o-Math.floor(e/2),l=r-Math.floor(t/2),c=Math.sqrt(a*a+l*l);let u=1,d=ne.GEO,f=0;c>e*.4?(d=ne.HYDRO,f=2,u=0,Math.abs(Math.sin(a*.2)*Math.cos(l*.2))>.7&&(f=4)):c>e*.35&&(d=ne.ANEMO,u=0),s.push(As({element:d,texture:f,effect:d,height:u}))}n.push(s)}this.generateFromArray(n)}generateFromArray(e,t){this.clear(),this.loadVoxelMatrix(Ng(e,t))}loadVoxelMatrix(e){this.voxelMatrix=e;for(let t=0;t<e.height;t++)for(let n=0;n<e.width;n++){const r=n-e.offsetX,s=t-e.offsetY,o=e.columns[t][n];this.voxelColumnMap.set(this.getColumnKey(r,s),o);for(const a of o)this.addTile(r,s,a.z,a.element,a.textureValue??a.texture??0,a.effect??0,a.building??0)}}generateFromChunkedArray(e,t,n=this.chunkSize,r={}){this.chunkSize=n,this.generateFromArray(e,t);const s=Array.isArray(r)?r:r.buildings||[];this.registerBuildingBlueprints(s)}addTile(e,t,n,r,s=0,o=0,a=0,l=!0){const c=this.getVoxelAt(e,t,n)||this.setVoxelAt(e,t,n,{element:r,texture:s,effect:o,building:a}),u=new Cs(this.threeManager,e,t,n,{element:r,textureValue:s,effect:o,building:a});this.tiles.push(u);const d=this.getTileKey(e,t,n);if(this.tileMap.set(d,u),this.registerTileInChunk(e,t,d),l){const f=this.getColumnKey(e,t),_=this.elevationMap.get(f)??-1;n>_&&(this.elevationMap.set(f,n),this.surfaceMap.set(f,{x:e,y:t,z:n,element:r,textureValue:s,effect:o,building:a,definition:Ci(r,s),voxel:c}))}return u}getTileAt(e,t,n){return this.tileMap.get(this.getTileKey(e,t,n))}getElevation(e,t){const{gridX:n,gridY:r}=this.toGridPosition(e,t);return this.elevationMap.get(this.getColumnKey(n,r))??0}getTopSurfaceOffset(){return Cs.topOffset}getSurfaceWorldY(e,t){return this.getElevation(e,t)+this.getTopSurfaceOffset()}getSurfaceAt(e,t){const{gridX:n,gridY:r}=this.toGridPosition(e,t);return this.surfaceMap.get(this.getColumnKey(n,r))}getVoxelColumnAt(e,t){const{gridX:n,gridY:r}=this.toGridPosition(e,t);return this.voxelColumnMap.get(this.getColumnKey(n,r))||Fg(this.voxelMatrix,n,r)}getTopVoxelAt(e,t){return nc(this.getVoxelColumnAt(e,t))}getVoxelAt(e,t,n){const r=this.getVoxelColumnAt(e,t);return(r==null?void 0:r.find(s=>s.z===n))||null}findHighestWalkable(){let e=null;for(const t of this.surfaceMap.values())this.isWalkable(t.x,t.y)&&(!e||t.z>e.z)&&(e=t);return e?{x:e.x,y:e.y,z:e.z}:null}hasTileColumn(e,t){const{gridX:n,gridY:r}=this.toGridPosition(e,t);return this.elevationMap.has(this.getColumnKey(n,r))}isWalkable(e,t){const n=this.getSurfaceAt(e,t);return n?Dg(n.element,n.textureValue):!1}canOccupyTile(e,t,n=e,r=t){const s=this.getSurfaceAt(e,t);if(!s||!this.isWalkable(e,t))return!1;const o=this.getSurfaceAt(n,r),a=(o==null?void 0:o.z)??s.z,c=s.z-a;return Math.abs(c)<1||Math.abs(c)===1?!0:Math.abs(c)===2&&(this.isStairSurface(s)||this.isStairSurface(o))}canMoveBetween(e,t,n,r,s=!1){const o=this.toGridPosition(e,t),a=this.toGridPosition(n,r);if(o.gridX===a.gridX&&o.gridY===a.gridY)return this.canOccupyTile(a.gridX,a.gridY,o.gridX,o.gridY);if(!this.canOccupyTile(a.gridX,a.gridY,o.gridX,o.gridY))return!1;const l=a.gridX-o.gridX,c=a.gridY-o.gridY;if(Math.abs(l)>1||Math.abs(c)>1)return!1;const u=s||Math.abs(l)===1&&Math.abs(c)===1;if(!this.canUseStairsBetween(o.gridX,o.gridY,a.gridX,a.gridY,u))return!1;if(!u)return!0;const d=this.canOccupyTile(a.gridX,o.gridY,o.gridX,o.gridY),f=this.canOccupyTile(o.gridX,a.gridY,o.gridX,o.gridY);return d&&f}canOccupyFootprint(e,t,n=e,r=t,s=.32){var f;const o=this.toGridPosition(n,r),a=this.toGridPosition(e,t),l=this.getSurfaceAt(o.gridX,o.gridY),c=this.getSurfaceAt(a.gridX,a.gridY),u=Math.abs(((c==null?void 0:c.z)??0)-((l==null?void 0:l.z)??0))===2&&(this.isStairSurface(c)||this.isStairSurface(l)),d=this.getFootprintSamples(e,t,s);for(const _ of d){const x=this.toGridPosition(_.x,_.y);if(!this.canOccupyTile(x.gridX,x.gridY,o.gridX,o.gridY)){if(u){const y=this.getSurfaceAt(x.gridX,x.gridY);if((f=y==null?void 0:y.definition)!=null&&f.walkable&&y.z===(c==null?void 0:c.z))continue}return!1}}return!0}canMoveFootprintBetween(e,t,n,r,s=.32){const o=this.toGridPosition(e,t),a=this.toGridPosition(n,r),l=o.gridX!==a.gridX&&o.gridY!==a.gridY;return this.canMoveBetween(o.gridX,o.gridY,a.gridX,a.gridY,l)?this.canOccupyFootprint(n,r,o.gridX,o.gridY,s):!1}getFootprintSamples(e,t,n=.32){const r=n*.72;return[{x:e,y:t},{x:e+n,y:t},{x:e-n,y:t},{x:e,y:t+n},{x:e,y:t-n},{x:e+r,y:t+r},{x:e+r,y:t-r},{x:e-r,y:t+r},{x:e-r,y:t-r}]}registerBuildingBlueprints(e=[]){this.clearBuildingStates();for(const t of e){const n=this.createBuildingState(t);n&&this.buildingStates.set(t.id,n)}}createBuildingState(e){var a,l;if(!(e!=null&&e.id))return null;const t={...e,wallTiles:[],interiorKeys:new Set,roof:null,doors:[],wallDecorations:null,furniture:null,roofVisibleByRange:!0,floorZ:0,isOpen:!1};let n=-1/0,r=1/0,s=1/0;for(let c=0;c<e.height;c++)for(let u=0;u<e.width;u++){const d=e.x+u,f=e.y+c,_=this.getSurfaceAt(d,f);if(!_)continue;const x=this.getSurfaceWorldY(d,f);n=Math.max(n,x);const y=u===0||c===0||u===e.width-1||c===e.height-1,v=((a=e.door)==null?void 0:a.x)===u&&((l=e.door)==null?void 0:l.y)===c,p=this.getColumnKey(d,f);if(y){const b=this.getBuildingEdge(e,u,c),C=Math.max(_.z,Math.floor(e.stories||1)*2);for(let A=1;A<=C;A++){const I=this.getTileAt(d,f,A);(I==null?void 0:I.element)===ne.STRUCTURE&&t.wallTiles.push({tile:I,edge:b})}}(!y||v)&&(t.interiorKeys.add(p),r=Math.min(r,x),s=Math.min(s,_.z))}if(n===-1/0)return null;const o=r===1/0?.48:r;return t.floorZ=s===1/0?0:s,t.roof=this.createBuildingRoof(e,n,t),t.wallDecorations=this.createBuildingWallDecorations(e,o,t),t.furniture=this.createBuildingFurniture(e,o),t}createBuildingRoof(e,t,n){const r=new on;r.position.set(e.x+(e.width-1)/2,t+.23,e.y+(e.height-1)/2),r.userData.buildingId=e.id;const s=Me.getRoofMaterial(e.style),o=Me.getTrimMaterial(e.style),a=new pt(.98,.34,.98),l=new pt(.98,.28,.16),c=new pt(.16,.28,.98),u=-(e.width-1)/2,d=-(e.height-1)/2;for(let f=0;f<e.height;f++)for(let _=0;_<e.width;_++){const x=new on;x.position.set(u+_,0,d+f),x.userData.cutawayType="roof-block";const y=new He(a,s);if(x.add(y),f===0||f===e.height-1){const v=new He(l,o);v.position.y=.3,x.add(v)}if(_===0||_===e.width-1){const v=new He(c,o);v.position.y=.3,x.add(v)}r.add(x)}return r.traverse(f=>{f.castShadow=!0,f.receiveShadow=!0,f.raycast=()=>{},f.renderOrder=12}),this.threeManager.addToWorld(r),r}createBuildingWallDecorations(e,t,n){const r=new on;if(r.userData.buildingId=e.id,e.door){const s=this.getBuildingEdge(e,e.door.x,e.door.y);if(s){const o=this.createDoorPanel(e,t,s),a=o.userData.doorPivot;n.doors.push({pivot:a,edge:s,worldX:e.x+e.door.x,worldY:e.y+e.door.y,closedRotation:0,targetRotation:0,currentRotation:0,openRotation:this.getDoorOpenRotation(s)}),r.add(o)}}return this.threeManager.addToWorld(r),r}getBuildingEdge(e,t,n){return n===0?"north":n===e.height-1?"south":t===0?"west":t===e.width-1?"east":null}createDoorPanel(e,t,n){const r=new on,s=new on,o=1.84,a=.84,l=.09,c=2.12,u=.16,d=n==="north"||n==="south",f=Me.getDoorMaterial(e.doorStyle),_=Me.getDoorAccentMaterial(e.doorStyle),x=Me.getDoorFrameMaterial(e.style),y=new He(new pt(d?a:l,o,d?l:a),f),v=e.x+e.door.x,p=e.y+e.door.y,b=.52;r.position.set(v,t,p),r.userData.cutawayType="doorway",r.userData.doorPivot=s,n==="north"?(s.position.set(-a/2,0,-b),y.position.x=a/2):n==="south"?(s.position.set(a/2,0,b),y.position.x=-a/2):n==="west"?(s.position.set(-b,0,a/2),y.position.z=-a/2):n==="east"&&(s.position.set(b,0,-a/2),y.position.z=a/2),y.position.y=o/2,y.castShadow=!0,y.raycast=()=>{},s.add(y),r.add(s);const C=new pt(u,c,u),A=new pt(d?1.08:u,.22,d?u:1.08),I=new pt(d?1.08:.18,.08,d?.18:1.08),P=n==="north"?-b:n==="south"?b:0,L=n==="west"?-b:n==="east"?b:0,E=d?[{x:-.54,z:P},{x:.54,z:P}]:[{x:L,z:-.54},{x:L,z:.54}];for(const X of E){const Y=new He(C,x);Y.position.set(X.x,c/2,X.z),Y.castShadow=!0,Y.receiveShadow=!0,Y.raycast=()=>{},r.add(Y)}const w=new He(A,x);w.position.set(L,c,P),w.castShadow=!0,w.receiveShadow=!0,w.raycast=()=>{},r.add(w);const j=new He(I,Me.getFloorAccentMaterial(e.style));j.position.set(L,.04,P),j.receiveShadow=!0,j.raycast=()=>{},r.add(j);const D=new pt(d?a*.82:l*1.25,.075,d?l*1.25:a*.82);for(const X of[.48,.92,1.36]){const Y=new He(D,_);Y.position.copy(y.position),Y.position.y=X,Y.castShadow=!0,Y.raycast=()=>{},s.add(Y)}const V=new He(new li(.055,8,6),_);return V.position.copy(y.position),V.position.y=.94,d?(V.position.x+=n==="north"?a*.22:-a*.22,V.position.z+=n==="north"?-.07:.07):(V.position.z+=n==="west"?-a*.22:a*.22,V.position.x+=n==="west"?-.07:.07),V.castShadow=!0,V.raycast=()=>{},s.add(V),r}getDoorOpenRotation(e){return(e==="north"||e==="west"?-1:1)*Math.PI*.58}createBuildingFurniture(e,t){var u,d;const n=new on;n.userData.buildingId=e.id;const r=t+.08,s=e.x+1,o=e.x+e.width-2,a=e.y+1,l=e.y+e.height-2;this.addRug(n,e.x+e.width/2-.5,r,e.y+e.height/2-.5,e.style),this.addTable(n,s+.55,r,a+.55,e.style),this.addBench(n,o-.3,r,a+.65,e.style,"x"),this.addCrateStack(n,s+.35,r,l-.35,e.style),this.addShelf(n,o-.15,r,l-.75,e.style,"z"),this.addPartition(n,e.x+Math.floor(e.width/2),r,e.y+1.2,e.style,"x",Math.max(1.4,e.width-4)),e.width>=7&&e.height>=6?(this.addCounter(n,o-.45,r,l-.25,e.style),this.addBed(n,s+1.45,r,l-.45,e.style),this.addHearth(n,s+.25,r,e.y+Math.floor(e.height/2),e.style)):this.addStool(n,o-.35,r,l-.35,e.style);const c=Math.max(1,Math.min(3,Math.floor(e.stories||1)));for(let f=1;f<c;f++){const _=t+f*2+.08,x=((u=e.stairs)==null?void 0:u[f-1])||((d=e.stairs)==null?void 0:d[0]),y=e.x+((x==null?void 0:x.x)??1),v=e.y+((x==null?void 0:x.y)??1);this.addBed(n,Math.min(o-.65,y+1.15),_,Math.min(l-.55,v+.95),e.style),this.addShelf(n,Math.max(s+.25,y-1.15),_,Math.max(a+.45,v-.8),e.style,"x"),this.addStool(n,Math.min(o-.35,y+.5),_,Math.max(a+.35,v-.65),e.style),this.addPartition(n,y+.5,_,v+.5,e.style,"z",Math.min(1.8,e.height-3))}return n.traverse(f=>{f.castShadow=!0,f.receiveShadow=!0,f.raycast=()=>{}}),this.threeManager.addToWorld(n),n}addTable(e,t,n,r,s){const o=Me.getFurnitureMaterial(s),a=new He(new pt(.92,.12,.72),o);a.position.set(t,n+.34,r),e.add(a);for(const l of[-.32,.32])for(const c of[-.24,.24]){const u=new He(new pt(.1,.34,.1),o);u.position.set(t+l,n+.17,r+c),e.add(u)}}addBench(e,t,n,r,s,o="x"){const a=Me.getFurnitureMaterial(s),l=new He(new pt(o==="x"?1.18:.28,.18,o==="x"?.28:1.18),a);l.position.set(t,n+.22,r),e.add(l)}addCounter(e,t,n,r,s){const o=Me.getFurnitureMaterial(s),a=new He(new pt(1.32,.56,.42),o);a.position.set(t,n+.28,r),e.add(a)}addBed(e,t,n,r,s){const o=Me.getFurnitureMaterial(s),a=Me.getBlanketMaterial(s),l=new He(new pt(1.42,.24,.78),o);l.position.set(t,n+.15,r),e.add(l);const c=new He(new pt(1.12,.12,.62),a);c.position.set(t+.06,n+.34,r),e.add(c)}addCrateStack(e,t,n,r,s){const o=Me.getFurnitureMaterial(s),a=new He(new pt(.42,.42,.42),o);a.position.set(t,n+.21,r),e.add(a);const l=new He(new pt(.34,.34,.34),o);l.position.set(t+.34,n+.17,r+.22),e.add(l)}addStool(e,t,n,r,s){const o=Me.getFurnitureMaterial(s),a=new He(new pt(.34,.26,.34),o);a.position.set(t,n+.13,r),e.add(a)}addRug(e,t,n,r,s){const o=Me.getRugMaterial(s),a=new He(new pt(1.65,.035,1.12),o);a.position.set(t,n+.025,r),e.add(a)}addShelf(e,t,n,r,s,o="x"){const a=Me.getFurnitureMaterial(s),l=new He(new pt(o==="x"?1.05:.24,.92,o==="x"?.24:1.05),a);l.position.set(t,n+.46,r),e.add(l);const c=Me.getShelfItemMaterial(s);for(let u=0;u<3;u++){const d=new He(new pt(.16,.18,.12),c);d.position.set(t+(o==="x"?-.32+u*.32:0),n+.28+u*.18,r+(o==="z"?-.32+u*.32:0)),e.add(d)}}addPartition(e,t,n,r,s,o="x",a=1.6){const l=Me.getTrimMaterial(s),c=new He(new pt(o==="x"?a:.08,.72,o==="x"?.08:a),l);c.position.set(t,n+.36,r),e.add(c)}addHearth(e,t,n,r,s){const o=Me.getDoorFrameMaterial(s),a=Me.getHearthFireMaterial(),l=new He(new pt(.62,.34,.38),o);l.position.set(t,n+.17,r),e.add(l);const c=new He(new pt(.28,.28,.12),a);c.position.set(t,n+.42,r),e.add(c)}static getRoofMaterial(e){Me.roofMaterialCache||(Me.roofMaterialCache=new Map);const t=e||"timber";return Me.roofMaterialCache.has(t)||Me.roofMaterialCache.set(t,new zt({color:t==="stone"?7306887:10896949,roughness:.82,metalness:.02})),Me.roofMaterialCache.get(t)}static getTrimMaterial(e){Me.trimMaterialCache||(Me.trimMaterialCache=new Map);const t=e||"timber";return Me.trimMaterialCache.has(t)||Me.trimMaterialCache.set(t,new zt({color:t==="stone"?13883858:5911585,roughness:.86,metalness:.02})),Me.trimMaterialCache.get(t)}static getDoorMaterial(e){Me.doorMaterialCache||(Me.doorMaterialCache=new Map);const t=e||"oak",n={oak:8079145,iron:4344658,painted:3110768};return Me.doorMaterialCache.has(t)||Me.doorMaterialCache.set(t,new zt({color:n[t]||n.oak,roughness:t==="iron"?.58:.84,metalness:t==="iron"?.42:.03})),Me.doorMaterialCache.get(t)}static getDoorAccentMaterial(e){Me.doorAccentMaterialCache||(Me.doorAccentMaterialCache=new Map);const t=e||"oak",n={oak:5057820,iron:11187645,painted:14137439};return Me.doorAccentMaterialCache.has(t)||Me.doorAccentMaterialCache.set(t,new zt({color:n[t]||n.oak,roughness:t==="iron"?.42:.72,metalness:t==="iron"?.62:.08})),Me.doorAccentMaterialCache.get(t)}static getDoorFrameMaterial(e){Me.doorFrameMaterialCache||(Me.doorFrameMaterialCache=new Map);const t=e||"timber";return Me.doorFrameMaterialCache.has(t)||Me.doorFrameMaterialCache.set(t,new zt({color:t==="stone"?9345442:6962468,roughness:.84,metalness:.02})),Me.doorFrameMaterialCache.get(t)}static getFloorAccentMaterial(e){Me.floorAccentMaterialCache||(Me.floorAccentMaterialCache=new Map);const t=e||"timber";return Me.floorAccentMaterialCache.has(t)||Me.floorAccentMaterialCache.set(t,new zt({color:t==="stone"?12173768:11831134,roughness:.9,metalness:.01})),Me.floorAccentMaterialCache.get(t)}static getFurnitureMaterial(e){Me.furnitureMaterialCache||(Me.furnitureMaterialCache=new Map);const t=e||"timber";return Me.furnitureMaterialCache.has(t)||Me.furnitureMaterialCache.set(t,new zt({color:t==="stone"?7622454:9132596,roughness:.88,metalness:.01})),Me.furnitureMaterialCache.get(t)}static getBlanketMaterial(e){Me.blanketMaterialCache||(Me.blanketMaterialCache=new Map);const t=e||"timber";return Me.blanketMaterialCache.has(t)||Me.blanketMaterialCache.set(t,new zt({color:t==="stone"?4745885:9387864,roughness:.72,metalness:.01})),Me.blanketMaterialCache.get(t)}static getRugMaterial(e){Me.rugMaterialCache||(Me.rugMaterialCache=new Map);const t=e||"timber";return Me.rugMaterialCache.has(t)||Me.rugMaterialCache.set(t,new zt({color:t==="stone"?8208469:3497832,roughness:.92,metalness:.01})),Me.rugMaterialCache.get(t)}static getShelfItemMaterial(e){Me.shelfItemMaterialCache||(Me.shelfItemMaterialCache=new Map);const t=e||"timber";return Me.shelfItemMaterialCache.has(t)||Me.shelfItemMaterialCache.set(t,new zt({color:t==="stone"?13021293:9415018,roughness:.75,metalness:.03})),Me.shelfItemMaterialCache.get(t)}static getHearthFireMaterial(){return Me.hearthFireMaterial||(Me.hearthFireMaterial=new zt({color:16747058,emissive:16734749,emissiveIntensity:.45,roughness:.55,metalness:.01})),Me.hearthFireMaterial}updateBuildingVisibility(e,t){const n=this.getBuildingAt(e,t);for(const r of this.buildingStates.values())this.setBuildingOpen(r,(n==null?void 0:n.id)===r.id),this.updateDoorTargetsForPlayer(r,e,t);return n}getBuildingAt(e,t){const n=this.toGridPosition(e,t),r=this.getColumnKey(n.gridX,n.gridY);for(const s of this.buildingStates.values())if(s.interiorKeys.has(r))return s;return null}setBuildingOpen(e,t){e.isOpen!==t&&(e.isOpen=t,e.wallDecorations&&(e.wallDecorations.visible=!0))}updateDoorTargetsForPlayer(e,t,n){for(const r of e.doors||[]){const s=Math.hypot(t-r.worldX,n-r.worldY);this.setDoorOpen(r,s<=1.18)}}setDoorOpen(e,t){e!=null&&e.pivot&&(e.targetRotation=t?e.openRotation:e.closedRotation,e.pivot.visible=!0)}updateDoorAnimations(e=1/60){const t=Math.min(1,e*12);for(const n of this.buildingStates.values())for(const r of n.doors||[])r!=null&&r.pivot&&(r.currentRotation+=(r.targetRotation-r.currentRotation)*t,Math.abs(r.currentRotation-r.targetRotation)<.002&&(r.currentRotation=r.targetRotation),r.pivot.rotation.y=r.currentRotation)}syncRoofVisibility(e){e!=null&&e.roof&&(e.roof.visible=e.roofVisibleByRange!==!1&&!e.roofHiddenByCutaway)}updateVisibleTilesAround(e,t,n=this.visibleTileRadius){const r=this.toGridPosition(e,t);if(this.lastVisibilityCenter&&this.lastVisibilityCenter.x===r.gridX&&this.lastVisibilityCenter.y===r.gridY&&this.lastVisibilityCenter.radius===n)return;this.lastVisibilityCenter={x:r.gridX,y:r.gridY,radius:n};const s=n*n;for(const o of this.tiles){const a=o.gridX-r.gridX,l=o.gridY-r.gridY;o.visibleByRange=a*a+l*l<=s,this.syncTileVisibility(o)}for(const o of this.buildingStates.values()){if(!o.roof)continue;const a=o.roof.position.x-r.gridX,l=o.roof.position.z-r.gridY,c=a*a+l*l<=s;o.roofVisibleByRange=c,this.syncRoofVisibility(o),o.wallDecorations&&(o.wallDecorations.visible=c),o.furniture&&(o.furniture.visible=c)}}updatePlayerSightCutaway(e,t,n,r=4){if(this.clearSightCutaway(),!n)return;const s=this.toGridPosition(e,t),o=this.getSurfaceAt(s.gridX,s.gridY);if(!o)return;const a=new ht(n.position.x-s.gridX,n.position.z-s.gridY);if(a.lengthSq()<1e-4)return;a.normalize();for(let c=s.gridX-r;c<=s.gridX+r;c++)for(let u=s.gridY-r;u<=s.gridY+r;u++){if(c===s.gridX&&u===s.gridY)continue;const d=this.getSurfaceAt(c,u);if(!d)continue;const f=new ht(c-s.gridX,u-s.gridY),_=f.length();if(_<.75||_>r)continue;const x=f.normalize().dot(a),y=Math.abs((c-s.gridX)*a.y-(u-s.gridY)*a.x);if(!(x<.36||y>1.6)&&this.shouldHideTileForSightCutaway(d,o))for(const v of this.getTerrainCutawayVoxels(d,o)){const p=this.getTileAt(d.x,d.y,v.z);!p||p.element===ne.STRUCTURE||(p.hiddenBySightCutaway=!0,this.sightCutawayTiles.add(p),this.syncTileVisibility(p))}}const l=this.getBuildingAt(s.gridX,s.gridY);l&&o.z>=l.floorZ?this.cutAwayActiveBuilding(l,n,o):this.cutAwayBuildingsInFrontOfPlayer(s.gridX,s.gridY,n,o)}clearSightCutaway(){var e;if((e=this.sightCutawayTiles)!=null&&e.size){for(const t of this.sightCutawayTiles){if(t!=null&&t.roof){t.roofHiddenByCutaway=!1,this.syncRoofVisibility(t);continue}t.hiddenBySightCutaway=!1,this.syncTileVisibility(t)}this.sightCutawayTiles.clear()}}cutAwayActiveBuilding(e,t,n){const r=e.x+(e.width-1)/2,s=e.y+(e.height-1)/2,o=new Set([t.position.x>=r?"east":"west",t.position.z>=s?"south":"north"]),a=n.z+2,l=e.floorZ+Math.max(2,Math.min(6,Math.floor(e.stories||1)*2));e.roofHiddenByCutaway=!0,this.sightCutawayTiles.add(e),this.syncRoofVisibility(e);for(const c of e.wallTiles){if(!o.has(c.edge))continue;const u=c.tile;u.elevation<a||u.elevation>l||(u.hiddenBySightCutaway=!0,this.sightCutawayTiles.add(u),this.syncTileVisibility(u))}}cutAwayBuildingsInFrontOfPlayer(e,t,n,r){const s=new ht(n.position.x,n.position.z),o=new ht(e,t);for(const a of this.buildingStates.values())if(a.floorZ===r.z&&this.segmentCrossesBuilding(s,o,a,.08)){a.roofHiddenByCutaway=!0,this.sightCutawayTiles.add(a),this.syncRoofVisibility(a);for(const l of a.wallTiles){const c=l.tile;c.elevation<=a.floorZ+1||(c.hiddenBySightCutaway=!0,this.sightCutawayTiles.add(c),this.syncTileVisibility(c))}}}segmentCrossesBuilding(e,t,n,r=0){const s=n.x-.5-r,o=n.x+n.width-.5+r,a=n.y-.5-r,l=n.y+n.height-.5+r,c=t.x-e.x,u=t.y-e.y;let d=0,f=1;if(Math.abs(c)<1e-4){if(e.x<s||e.x>o)return!1}else{const _=(s-e.x)/c,x=(o-e.x)/c;if(d=Math.max(d,Math.min(_,x)),f=Math.min(f,Math.max(_,x)),d>f)return!1}if(Math.abs(u)<1e-4){if(e.y<a||e.y>l)return!1}else{const _=(a-e.y)/u,x=(l-e.y)/u;if(d=Math.max(d,Math.min(_,x)),f=Math.min(f,Math.max(_,x)),d>f)return!1}return f>.03&&d<.94}shouldHideTileForSightCutaway(e,t){return!e||!t||e.element===ne.HYDRO||e.element===ne.STRUCTURE?!1:e.element===ne.ANEMO||e.element===ne.GEO||e.element===ne.CRYO?e.z>t.z:!1}getTerrainCutawayVoxels(e,t){const n=this.getVoxelColumnAt(e.x,e.y)||[],r=Math.max(1,t.z+1);return n.filter(s=>s.z<r||s.z>e.z||s.element===ne.STRUCTURE?!1:s.element===ne.ANEMO||s.element===ne.GEO||s.element===ne.CRYO)}canUseStairsBetween(e,t,n,r,s=!1){const o=this.getSurfaceAt(e,t),a=this.getSurfaceAt(n,r),l=((a==null?void 0:a.z)??0)-((o==null?void 0:o.z)??0);return l===0||Math.abs(l)===1?!0:Math.abs(l)===2&&(this.isStairSurface(o)||this.isStairSurface(a))}isStairSurface(e){return[oe.STAIRS,oe.STAIRS_NORTH,oe.STAIRS_SOUTH,oe.STAIRS_WEST,oe.STAIRS_EAST].includes(e==null?void 0:e.building)}syncTileVisibility(e){e!=null&&e.mesh&&(e.mesh.visible=e.visibleByRange!==!1&&!e.hiddenBySightCutaway)}supportsHabitat(e,t,n){const r=this.getSurfaceAt(e,t);return r?Lg(r.element,r.textureValue,n):!1}getMoveCost(e,t,n,r,s=!1){var x;if(!this.canMoveBetween(e,t,n,r,s))return 1/0;const o=this.getElevation(e,t),l=this.getElevation(n,r)-o,c=this.getSurfaceAt(e,t),u=this.getSurfaceAt(n,r);if(Math.abs(l)>=2&&!(Math.abs(l)===2&&(this.isStairSurface(c)||this.isStairSurface(u))))return 1/0;const d=s?1.414:1,f=((x=u==null?void 0:u.definition)==null?void 0:x.moveCost)||1,_=l>0?l*.5:l*.15;return Math.max(.1,d*f+_)}findNearestHabitat(e,t,n,r=16){const s=this.toGridPosition(e,t);let o=null;for(let a=0;a<=r;a++){for(let l=s.gridX-a;l<=s.gridX+a;l++){for(let c=s.gridY-a;c<=s.gridY+a;c++)if(!(Math.abs(l-s.gridX)!==a&&Math.abs(c-s.gridY)!==a)&&this.supportsHabitat(l,c,n)){o={x:l,y:c,z:this.getElevation(l,c)};break}if(o)break}if(o)return o}return null}findNearestWalkable(e,t,n=48){const r=this.toGridPosition(e,t);for(let s=0;s<=n;s++)for(let o=r.gridX-s;o<=r.gridX+s;o++)for(let a=r.gridY-s;a<=r.gridY+s;a++)if(!(Math.abs(o-r.gridX)!==s&&Math.abs(a-r.gridY)!==s)&&this.isWalkable(o,a))return{x:o,y:a,z:this.getElevation(o,a)};return null}modifyTile(e,t,n,r,s=0,o=0,a=0){const l=this.setVoxelAt(e,t,n,{element:r,texture:s,effect:o,building:a}),c=this.getTileAt(e,t,n);c?(console.log(`[WorldGenerator] Modifying tile at ${e},${t},${n} to Element:${r}, Var:${s}`),c.setElementalType(r,s,o,a),this.rebuildSurfaceFromColumn(e,t)):this.addTile(e,t,n,l.element,l.textureValue,l.effect,l.building)}applyIceToTile(e,t,n){const r=this.getTileAt(e,t,n);r&&r.element===ne.HYDRO&&this.modifyTile(e,t,n,ne.CRYO,0,ne.CRYO,r.building)}removeTile(e,t,n){const r=this.getTileKey(e,t,n),s=this.tileMap.get(r);if(s){s.destroy(),this.tileMap.delete(r),this.tiles=this.tiles.filter(a=>a!==s),this.unregisterTileFromChunk(e,t,r);const o=this.getVoxelColumnAt(e,t);if(o){const a=o.findIndex(l=>l.z===n);a>=0&&o.splice(a,1)}this.rebuildSurfaceFromColumn(e,t)}}setVoxelAt(e,t,n,r){const s=this.getColumnKey(e,t);let o=this.voxelColumnMap.get(s);o||(o=[],this.voxelColumnMap.set(s,o));const a=ji({...r,z:n}),l=o.findIndex(c=>c.z===n);return l>=0?o[l]=a:(o.push(a),o.sort((c,u)=>c.z-u.z)),a}rebuildSurfaceFromColumn(e,t){const n=this.getColumnKey(e,t),r=nc(this.voxelColumnMap.get(n));if(!r){this.elevationMap.delete(n),this.surfaceMap.delete(n);return}this.elevationMap.set(n,r.z),this.surfaceMap.set(n,{x:e,y:t,z:r.z,element:r.element,textureValue:r.textureValue,effect:r.effect,building:r.building,definition:r.definition,voxel:r})}clear(){this.clearSightCutaway(),this.clearBuildingStates(),this.tiles.forEach(e=>e.destroy()),this.tiles=[],this.tileMap.clear(),this.elevationMap.clear(),this.surfaceMap.clear(),this.chunkMap.clear(),this.voxelMatrix=null,this.voxelColumnMap.clear(),this.lastVisibilityCenter=null}clearBuildingStates(){if(this.buildingStates){for(const e of this.buildingStates.values())e.roof&&(Me.disposeSceneObject(e.roof,this.threeManager),e.roof=null),e.wallDecorations&&(Me.disposeSceneObject(e.wallDecorations,this.threeManager),e.wallDecorations=null),e.furniture&&(Me.disposeSceneObject(e.furniture,this.threeManager),e.furniture=null);this.buildingStates.clear()}}static disposeSceneObject(e,t){t.removeFromWorld(e),e.traverse(n=>{var r;(r=n.geometry)==null||r.dispose()})}exportWorld(){const e=this.tiles.map(t=>({gridX:t.gridX,gridY:t.gridY,elevation:t.elevation,element:t.element,variant:t.textureValue,effect:t.effect,building:t.building}));return JSON.stringify(e)}loadWorld(e){try{const t=JSON.parse(e);this.clear(),t.forEach(n=>{this.addTile(n.gridX,n.gridY,n.elevation,n.element,n.variant,n.effect,n.building)}),console.log(`[WorldGenerator] Loaded ${t.length} tiles.`)}catch(t){console.error("[WorldGenerator] Failed to load world:",t)}}getTileKey(e,t,n){return`${e},${t},${n}`}getColumnKey(e,t){return`${e},${t}`}toGridPosition(e,t){return{gridX:Math.round(e),gridY:Math.round(t)}}getChunkCoord(e){return Math.floor(e/this.chunkSize)}getChunkKey(e,t){return`${e},${t}`}getChunkKeyForTile(e,t){return this.getChunkKey(this.getChunkCoord(e),this.getChunkCoord(t))}registerTileInChunk(e,t,n){const r=this.getChunkKeyForTile(e,t);if(!this.chunkMap.has(r)){const[s,o]=r.split(",").map(Number);this.chunkMap.set(r,{chunkX:s,chunkY:o,tileKeys:new Set})}this.chunkMap.get(r).tileKeys.add(n)}unregisterTileFromChunk(e,t,n){const r=this.getChunkKeyForTile(e,t),s=this.chunkMap.get(r);s&&(s.tileKeys.delete(n),s.tileKeys.size===0&&this.chunkMap.delete(r))}getLoadedChunkSummary(){return[...this.chunkMap.values()].map(e=>({chunkX:e.chunkX,chunkY:e.chunkY,blocks:e.tileKeys.size}))}}const Mi=8,Ro=4,$g=.11,rc=96,sc=128,Yg=1.28,oc=1.86,cs=.32,qg=.025,Co={south:0,west:1,east:2,north:3},xr=new G,Mr=new G,Sr=new ht,St=class St{constructor(e,t,n,r,s,o={}){this.threeManager=e,this.inputManager=t,this.worldGenerator=n,this.isLocal=o.isLocal??!0,this.userId=o.userId||"player",this.gridX=r,this.gridY=s,this.gridZ=this.worldGenerator.getElevation(r,s),this.visualX=this.gridX,this.visualY=this.gridY,this.visualZ=this.gridZ,this.targetX=this.gridX,this.targetY=this.gridY,this.targetZ=this.gridZ,this.speed=4.8,this.currentPath=[],this.direction="south",this.frame=0,this.frameTimer=0,this.isMoving=!1,this.footRadius=cs,this.group=new on,this.shadow=new He(St.shadowGeometry,St.shadowMaterial),this.shadow.rotation.x=-Math.PI/2,this.shadow.position.y=.018,this.shadow.renderOrder=18,this.group.add(this.shadow),this.occlusionShadow=new He(St.shadowGeometry,St.occlusionShadowMaterial),this.occlusionShadow.rotation.x=-Math.PI/2,this.occlusionShadow.position.y=.022,this.occlusionShadow.renderOrder=25,this.group.add(this.occlusionShadow),this.collisionDisc=new He(St.collisionFillGeometry,St.collisionFillMaterial),this.collisionDisc.rotation.x=-Math.PI/2,this.collisionDisc.position.y=.03,this.collisionDisc.renderOrder=29,this.collisionDisc.visible=!1,this.group.add(this.collisionDisc),this.collisionRing=new He(St.collisionGeometry,St.collisionMaterial),this.collisionRing.rotation.x=-Math.PI/2,this.collisionRing.position.y=.035,this.collisionRing.renderOrder=30,this.collisionRing.visible=!1,this.group.add(this.collisionRing),this.material=new $n({transparent:!0,alphaTest:.08,depthTest:!0,depthWrite:!1,depthFunc:Dn}),this.mesh=new He(St.geometry,this.material),this.mesh.position.y=oc/2+.07,this.mesh.renderOrder=24,this.group.add(this.mesh),this.occlusionMaterial=new $n({color:10026993,transparent:!0,opacity:.42,alphaTest:.08,depthTest:!0,depthWrite:!1,depthFunc:Ar,blending:Ms}),this.occlusionMesh=new He(St.geometry,this.occlusionMaterial),this.occlusionMesh.position.copy(this.mesh.position),this.occlusionMesh.scale.set(1.08,1.08,1),this.occlusionMesh.renderOrder=26,this.group.add(this.occlusionMesh),this.threeManager.addToEntities(this.group),this.setTileOcclusionEnabled(!0),this.loadTexture(),this.syncModel()}async loadTexture(){const e=await St.getSourceTexture();this.texture=e.clone(),this.texture.needsUpdate=!0,this.texture.repeat.set(1/Mi,1/Ro),this.material.map=this.texture,this.material.needsUpdate=!0,this.occlusionMaterial.map=this.texture,this.occlusionMaterial.needsUpdate=!0,this.updateFrame(0)}static getSourceTexture(){if(!St.texturePromise){const e=St.createAnimeSpriteSheet(),t=new Ea(e);t.colorSpace=en,t.magFilter=Xt,t.minFilter=Xt,t.needsUpdate=!0,St.texturePromise=Promise.resolve(t)}return St.texturePromise}static createAnimeSpriteSheet(){const e=document.createElement("canvas");e.width=rc*Mi,e.height=sc*Ro;const t=e.getContext("2d");t.clearRect(0,0,e.width,e.height);for(const[n,r]of Object.entries(Co))for(let s=0;s<Mi;s++)St.drawAnimeFrame(t,s*rc,r*sc,s,n);return e}static drawAnimeFrame(e,t,n,r,s){const o=Math.sin(r/Mi*Math.PI*2)*2,a=Math.sin(r/Mi*Math.PI*2),l=s==="west"?-1:s==="east"?1:0,c="#ffe2cf",u="#ff9eb4",d="#4b2f7f",f="#2d214f",_="#7fd6ff",x="#3989c7",y="#5a3a55",v="rgba(42, 28, 54, 0.72)";e.save(),e.translate(t,n),e.lineCap="round",e.lineJoin="round",e.fillStyle="rgba(42, 32, 48, 0.18)",e.beginPath(),e.ellipse(48,116,18,5,0,0,Math.PI*2),e.fill();const p=66+o,b=34+o,C=l*4;e.strokeStyle=v,e.lineWidth=5,e.fillStyle=x,St.roundRect(e,31,p,34,39,13),e.fill(),e.stroke(),e.fillStyle=_,St.roundRect(e,35,p+2,26,32,11),e.fill(),e.strokeStyle=v,e.lineWidth=6,e.beginPath(),e.moveTo(35,p+13),e.lineTo(25+a*2,p+31),e.moveTo(61,p+13),e.lineTo(71-a*2,p+31),e.stroke(),e.strokeStyle=y,e.lineWidth=8,e.beginPath(),e.moveTo(39,p+37),e.lineTo(35+a*3,113),e.moveTo(57,p+37),e.lineTo(61-a*3,113),e.stroke(),e.strokeStyle=v,e.lineWidth=5,e.fillStyle=c,e.beginPath(),e.ellipse(48,b+15,22,24,0,0,Math.PI*2),e.fill(),e.stroke(),e.fillStyle=d,e.beginPath(),e.ellipse(47,b+6,24,18,-.08,0,Math.PI*2),e.fill(),e.fillStyle=f,e.beginPath(),e.ellipse(33-C*.2,b+22,8,17,.18,0,Math.PI*2),e.ellipse(63+C*.2,b+20,8,15,-.18,0,Math.PI*2),e.fill(),e.fillStyle="#2d2540",s!=="north"&&(e.beginPath(),e.ellipse(40+C,b+16,3,5,0,0,Math.PI*2),e.ellipse(55+C,b+16,3,5,0,0,Math.PI*2),e.fill(),e.fillStyle="#ffffff",e.beginPath(),e.arc(41+C,b+14,1.2,0,Math.PI*2),e.arc(56+C,b+14,1.2,0,Math.PI*2),e.fill(),e.fillStyle=u,e.globalAlpha=.42,e.beginPath(),e.ellipse(32+C,b+25,4,2,0,0,Math.PI*2),e.ellipse(64+C,b+25,4,2,0,0,Math.PI*2),e.fill(),e.globalAlpha=1),e.restore()}static roundRect(e,t,n,r,s,o){e.beginPath(),e.moveTo(t+o,n),e.arcTo(t+r,n,t+r,n+s,o),e.arcTo(t+r,n+s,t,n+s,o),e.arcTo(t,n+s,t,n,o),e.arcTo(t,n,t+r,n,o),e.closePath()}setPath(e){if(this.currentPath=[...e],this.currentPath.length>0){const t=this.currentPath[0];Math.abs(t.x-this.gridX)<.1&&Math.abs(t.y-this.gridY)<.1&&this.currentPath.shift()}}setRemoteTarget(e,t,n){this.targetX=e,this.targetY=t,this.targetZ=n}update(e=1/60){this.isLocal?this.updateLocal(e):this.updateRemote(e),this.updateAnimation(e),this.syncModel()}updateLocal(e){const t=this.speed*Math.min(e,.05);if(this.isMoving=!1,this.currentPath.length>0){const s=this.currentPath[0];this.moveToward(s.x,s.y,t),Math.abs(s.x-this.gridX)<.001&&Math.abs(s.y-this.gridY)<.001&&this.currentPath.shift();return}const n=(this.inputManager.isKeyDown("KeyD")?1:0)-(this.inputManager.isKeyDown("KeyA")?1:0),r=(this.inputManager.isKeyDown("KeyW")?1:0)-(this.inputManager.isKeyDown("KeyS")?1:0);if(n!==0||r!==0){const{mx:s,my:o}=this.getCameraRelativeMovement(n,r),a=this.gridX+s*t,l=this.gridY+o*t,c=this.tryMove(a,this.gridY,s,0),u=this.tryMove(this.gridX,l,0,o);!c&&!u&&this.tryMove(a,l,s,o)}}getCameraRelativeMovement(e,t){return xr.set(0,0,-1).applyQuaternion(this.threeManager.camera.quaternion),xr.y=0,xr.normalize(),Mr.set(1,0,0).applyQuaternion(this.threeManager.camera.quaternion),Mr.y=0,Mr.normalize(),Sr.set(Mr.x*e+xr.x*t,Mr.z*e+xr.z*t),Sr.lengthSq()>1&&Sr.normalize(),{mx:Sr.x,my:Sr.y}}moveToward(e,t,n){const r=e-this.gridX,s=t-this.gridY,o=Math.sqrt(r*r+s*s);o<=n?this.tryMove(e,t,r,s):this.tryMove(this.gridX+r/o*n,this.gridY+s/o*n,r,s)}tryMove(e,t,n,r){Math.round(this.gridX),Math.round(this.gridY);const s=Math.round(e),o=Math.round(t),a=this.worldGenerator.getElevation(s,o);return this.worldGenerator.canMoveFootprintBetween(this.gridX,this.gridY,e,t,this.footRadius)?(this.gridX=e,this.gridY=t,this.gridZ=a,this.targetX=e,this.targetY=t,this.targetZ=a,this.setDirection(n,r),this.isMoving=!0,!0):!1}setCollisionDebugVisible(e){this.collisionDisc.visible=e,this.collisionRing.visible=e}setTileOcclusionEnabled(e=!0){this.material.depthTest=e,this.material.depthFunc=Dn,this.material.needsUpdate=!0,St.shadowMaterial.depthTest=e,St.shadowMaterial.depthFunc=Dn,St.shadowMaterial.needsUpdate=!0,this.occlusionMesh.visible=e,this.occlusionShadow.visible=e}updateRemote(e){const t=Math.min(1,e*12),n=this.targetX-this.gridX,r=this.targetY-this.gridY;this.gridX+=n*t,this.gridY+=r*t,this.gridZ+=(this.targetZ-this.gridZ)*t,this.isMoving=Math.sqrt(n*n+r*r)>.01,this.isMoving&&this.setDirection(n,r)}setDirection(e,t){Math.abs(e)>Math.abs(t)?this.direction=e>0?"east":"west":this.direction=t>0?"south":"north"}updateAnimation(e){this.isMoving?(this.frameTimer+=e,this.frameTimer>=$g&&(this.frameTimer=0,this.frame=(this.frame+1)%Mi)):(this.frame=0,this.frameTimer=0),this.updateFrame(this.frame)}updateFrame(e){if(!this.texture)return;const t=Co[this.direction]??Co.south;this.texture.offset.x=e/Mi,this.texture.offset.y=1-(t+1)/Ro}syncModel(){this.visualX+=(this.gridX-this.visualX)*.45,this.visualY+=(this.gridY-this.visualY)*.45,this.visualZ+=(this.gridZ-this.visualZ)*.2;const e=this.visualZ+this.worldGenerator.getTopSurfaceOffset();this.group.position.set(this.visualX,e+qg,this.visualY),this.mesh.quaternion.copy(this.threeManager.camera.quaternion),this.occlusionMesh.quaternion.copy(this.mesh.quaternion)}getCenterPayload(){return{centerX:this.gridX,centerY:this.gridY,centerZ:this.gridZ}}applyAuthoritativeCenter(e,t,n,r,s,o){const a=Math.sqrt((e-this.gridX)**2+(t-this.gridY)**2);this.gridX=e,this.gridY=t,this.gridZ=n??o,this.targetX=e,this.targetY=t,this.targetZ=n??o,Number.isFinite(r)&&Number.isFinite(s)&&(this.gridZ=o),a>.75&&(this.visualX=this.gridX,this.visualY=this.gridY,this.visualZ=this.gridZ)}destroy(){this.threeManager.removeFromEntities(this.group),this.texture&&this.texture.dispose(),this.material.dispose(),this.occlusionMaterial.dispose()}};hn(St,"texturePromise",null),hn(St,"geometry",new Or(Yg,oc)),hn(St,"shadowGeometry",new ws(.42,28)),hn(St,"collisionGeometry",new Ya(cs*.9,cs*1.08,36)),hn(St,"collisionFillGeometry",new ws(cs,36)),hn(St,"occlusionShadowMaterial",new $n({color:10026993,transparent:!0,opacity:.34,depthTest:!0,depthWrite:!1,depthFunc:Ar,blending:Ms,side:_n})),hn(St,"shadowMaterial",new $n({color:266249,transparent:!0,opacity:.36,depthTest:!0,depthWrite:!1,depthFunc:Dn})),hn(St,"collisionMaterial",new $n({color:3342223,transparent:!0,opacity:1,depthTest:!1,depthWrite:!1,side:_n})),hn(St,"collisionFillMaterial",new $n({color:3342223,transparent:!0,opacity:.18,depthTest:!1,depthWrite:!1,side:_n}));let Ps=St;class jg{constructor(){this.keys={},this.wheelDelta=0,this.callbacks={},this.pointerTarget=window,window.addEventListener("keydown",e=>{this.keys[e.code]||this.callbacks[e.code]&&this.callbacks[e.code].forEach(t=>t(e)),this.keys[e.code]=!0}),window.addEventListener("keyup",e=>{this.keys[e.code]=!1}),window.addEventListener("wheel",e=>{this.wheelDelta=e.deltaY}),this.onClickCallbacks=[],this.mouseNDC={x:0,y:0},this.handleMouseDown=e=>{this.updateMousePosition(e),this.onClickCallbacks.forEach(t=>t(e.button,e))},this.handleMouseMove=e=>this.updateMousePosition(e),this.setPointerTarget(window)}setPointerTarget(e){this.pointerTarget&&(this.pointerTarget.removeEventListener("mousedown",this.handleMouseDown),this.pointerTarget.removeEventListener("mousemove",this.handleMouseMove)),this.pointerTarget=e||window,this.pointerTarget.addEventListener("mousedown",this.handleMouseDown),this.pointerTarget.addEventListener("mousemove",this.handleMouseMove)}updateMousePosition(e){const n=(this.pointerTarget===window?document.documentElement:this.pointerTarget).getBoundingClientRect(),r=n.width||window.innerWidth,s=n.height||window.innerHeight;this.mouseNDC.x=(e.clientX-n.left)/r*2-1,this.mouseNDC.y=-((e.clientY-n.top)/s)*2+1}isKeyDown(e){return!!this.keys[e]}getWheelDelta(){const e=this.wheelDelta;return this.wheelDelta=0,e}onLeftClick(e){this.onClickCallbacks.push(e)}onKeyDown(e,t){this.callbacks[e]||(this.callbacks[e]=[]),this.callbacks[e].push(t)}}class Kg{constructor(e){this.worldGenerator=e}findPath(e,t,n,r){const s={x:Math.round(e),y:Math.round(t)},o={x:Math.round(n),y:Math.round(r)};if(!this.worldGenerator.isWalkable(o.x,o.y))return[];const a=[s],l=new Map,c=new Set,u=new Map;u.set(`${s.x},${s.y}`,0);const d=new Map;for(d.set(`${s.x},${s.y}`,this.heuristic(s,o));a.length>0;){let f=a[0],_=0;for(let y=1;y<a.length;y++){const v=a[y];(d.get(`${v.x},${v.y}`)??1/0)<(d.get(`${f.x},${f.y}`)??1/0)&&(f=v,_=y)}if(f.x===o.x&&f.y===o.y)return this.reconstructPath(l,f);a.splice(_,1),c.add(`${f.x},${f.y}`);const x=[{x:f.x+1,y:f.y,isDiag:!1},{x:f.x-1,y:f.y,isDiag:!1},{x:f.x,y:f.y+1,isDiag:!1},{x:f.x,y:f.y-1,isDiag:!1},{x:f.x+1,y:f.y+1,isDiag:!0},{x:f.x+1,y:f.y-1,isDiag:!0},{x:f.x-1,y:f.y+1,isDiag:!0},{x:f.x-1,y:f.y-1,isDiag:!0}];for(const y of x){const v=`${y.x},${y.y}`;if(c.has(v))continue;const p=this.worldGenerator.getMoveCost(f.x,f.y,y.x,y.y,y.isDiag);if(!Number.isFinite(p))continue;const b=(u.get(`${f.x},${f.y}`)??1/0)+p;b<(u.get(v)??1/0)&&(l.set(v,f),u.set(v,b),d.set(v,b+this.heuristic(y,o)),a.find(C=>C.x===y.x&&C.y===y.y)||a.push(y))}}return[]}heuristic(e,t){const n=Math.abs(e.x-t.x),r=Math.abs(e.y-t.y);return 1*Math.max(n,r)+(1.414-1)*Math.min(n,r)}reconstructPath(e,t){const n=[t];let r=`${t.x},${t.y}`;for(;e.has(r);)t=e.get(r),n.unshift(t),r=`${t.x},${t.y}`;return n}}class Zg{constructor(e,t,n){this.threeManager=e,this.worldGenerator=t,this.id=n.id,this.species=n.species,this.habitat=n.habitat,this.homeX=n.x,this.homeY=n.y,this.leashRadius=n.leashRadius||4,this.gridX=n.x,this.gridY=n.y,this.gridZ=this.worldGenerator.getElevation(n.x,n.y),this.visualZ=this.gridZ,this.speed=1.35,this.idleTimer=.4,this.target=null,this.bobTime=Math.random()*Math.PI*2,this.group=this.createModel(),this.threeManager.addToEntities(this.group),this.syncModel()}createModel(){const e=new on,t=new zt({color:13279599,roughness:.8}),n=new zt({color:16114888,roughness:.85}),r=new zt({color:5256745,roughness:.75}),s=new He(new li(.28,16,12),t);s.scale.set(1.25,.72,.82),s.position.set(0,.22,0),e.add(s);const o=new He(new li(.16,12,8),n);o.scale.set(1.1,.7,.55),o.position.set(.15,.2,.02),e.add(o);const a=new He(new li(.16,14,10),t);a.position.set(.33,.31,0),e.add(a);const l=new $a(.045,.32,8),c=new He(l,t);c.position.set(.34,.56,-.07),c.rotation.z=-.28,e.add(c);const u=new He(l,t);u.position.set(.34,.56,.07),u.rotation.z=-.18,e.add(u);const d=new He(new li(.035,8,6),r);d.position.set(.48,.31,0),e.add(d);const f=new He(new li(.09,10,8),n);return f.position.set(-.33,.26,0),e.add(f),e.scale.set(.8,.8,.8),e.userData.wildlife=this,e}update(e){if(this.bobTime+=e*5,this.target||(this.idleTimer-=e,this.idleTimer<=0&&(this.target=this.pickTarget(),this.idleTimer=1.2+Math.random()*2.4)),this.target){const t=this.target.x-this.gridX,n=this.target.y-this.gridY,r=Math.sqrt(t*t+n*n),s=this.speed*Math.min(e,.05);if(r<=s)this.gridX=this.target.x,this.gridY=this.target.y,this.gridZ=this.worldGenerator.getElevation(this.gridX,this.gridY),this.target=null;else{this.gridX+=t/r*s,this.gridY+=n/r*s;const o=Math.round(this.gridX),a=Math.round(this.gridY);this.gridZ=this.worldGenerator.getElevation(o,a),this.group.rotation.y=t<0?Math.PI:0}}this.syncModel()}pickTarget(){const e=[];for(let t=this.homeX-this.leashRadius;t<=this.homeX+this.leashRadius;t++)for(let n=this.homeY-this.leashRadius;n<=this.homeY+this.leashRadius;n++)Math.sqrt((t-this.homeX)**2+(n-this.homeY)**2)>this.leashRadius||this.worldGenerator.supportsHabitat(t,n,this.habitat)&&e.push({x:t,y:n});return e.length===0?null:e[Math.floor(Math.random()*e.length)]}syncModel(){this.visualZ+=(this.gridZ-this.visualZ)*.18;const e=this.target?Math.abs(Math.sin(this.bobTime))*.08:0;this.group.position.set(this.gridX,this.visualZ+1.05+e,this.gridY)}destroy(){this.group.traverse(e=>{e.geometry&&e.geometry.dispose(),e.material&&e.material.dispose()}),this.threeManager.removeFromEntities(this.group)}}const Jg={meadowHare:Zg};class ac{constructor(e,t,n=[]){this.threeManager=e,this.worldGenerator=t,this.wildlife=[],this.spawnAll(n)}spawnAll(e){for(const t of e)this.spawn(t)}spawn(e){const t=Jg[e.species];if(!t)return console.warn(`[WildlifeSystem] Unknown species "${e.species}" ignored.`),null;const n=this.worldGenerator.supportsHabitat(e.x,e.y,e.habitat)?{x:e.x,y:e.y}:this.worldGenerator.findNearestHabitat(e.x,e.y,e.habitat,12);if(!n)return console.warn(`[WildlifeSystem] No "${e.habitat}" habitat found for ${e.id}.`),null;const r={...e,x:n.x,y:n.y},s=new t(this.threeManager,this.worldGenerator,r);return this.wildlife.push(s),s}update(e){for(const t of this.wildlife)t.update(e)}destroy(){this.wildlife.forEach(e=>e.destroy()),this.wildlife=[]}}const an={stoneWall:"A",timberWall:"C",stoneWindowNorth:"N",stoneWindowSouth:"O",stoneWindowWest:"J",stoneWindowEast:"K",timberWindowNorth:"Q",timberWindowSouth:"V",timberWindowWest:"Y",timberWindowEast:"Z",door:"D",floor:"E",stairs:"U",stairsNorth:"1",stairsSouth:"2",stairsWest:"3",stairsEast:"4",timberStairsNorth:"5",timberStairsSouth:"6",timberStairsWest:"7",timberStairsEast:"8",approach:"R"},Qg=[{id:"guild-hall",name:"Guild Hall",x:-11,y:-8,width:8,height:6,stories:3,style:"timber",doorStyle:"oak",door:{x:4,y:5},stairs:[{x:1,y:1,direction:"north"}]},{id:"village-inn",name:"Village Inn",x:3,y:-8,width:8,height:6,stories:1,style:"stone",doorStyle:"iron",door:{x:4,y:5},stairs:[{x:6,y:1,direction:"north"}]},{id:"craft-house",name:"Craft House",x:-10,y:3,width:7,height:6,stories:1,style:"timber",doorStyle:"painted",door:{x:3,y:0},stairs:[{x:5,y:4,direction:"south"}]},{id:"general-store",name:"General Store",x:3,y:3,width:7,height:6,stories:1,style:"stone",doorStyle:"oak",door:{x:3,y:0},stairs:[{x:1,y:4,direction:"south"}]},{id:"watch-house",name:"Watch House",x:12,y:-2,width:5,height:5,stories:2,style:"stone",doorStyle:"iron",door:{x:0,y:2},stairs:[{x:3,y:3,direction:"east"}]}];function e0(i,e=[]){var o,a,l,c;if(!Array.isArray(i)||i.length===0)return i;const t=i.length,n=((o=i[0])==null?void 0:o.length)||0,r=Math.floor(n/2),s=Math.floor(t/2);for(const u of e){const d=Math.max(1,Math.min(3,Math.floor(u.stories||1))),f=d*2,_=a0(u,d);for(let x=0;x<u.height;x++)for(let y=0;y<u.width;y++){const v=y===0||x===0||y===u.width-1||x===u.height-1,p=((a=u.door)==null?void 0:a.x)===y&&((l=u.door)==null?void 0:l.y)===x,b=u.y+x+s,C=u.x+y+r,A=(c=i[b])==null?void 0:c[C];if(A){if(v&&!p){A.height=f;continue}if(!v&&d>1){const I=_.get(`${y},${x}`)||0;I>0&&(A.height=I)}}}}return i}function t0(i,e=[]){var r,s;if(!Array.isArray(i)||i.length===0)return i;const t=Math.floor((((r=i[0])==null?void 0:r.length)||0)/2),n=Math.floor(i.length/2);for(const o of e){if(!o.door)continue;const a=o.y+o.door.y+n,l=o.x+o.door.x+t,c=(s=i[a])==null?void 0:s[l];c&&(c.texture=tc[o.doorStyle]||tc.oak,c.doorStyleTexture=c.texture,c.texture=2)}return i}function n0(i,e=Qg,t={}){if(!Array.isArray(i)||i.length===0)return i;const n=i.map(l=>l.split("")),r=n.length,s=n[0].length,o=Math.floor(s/2),a=Math.floor(r/2);i0(n,e,o,a,t);for(const l of e)o0(n,l,o,a),u0(n,l,o,a);return n.map(l=>l.join(""))}function i0(i,e,t,n,r){var s;for(const o of e){for(let l=-1;l<=o.height;l++)for(let c=-1;c<=o.width;c++){const u=o.y+l+n,d=o.x+c+t;(s=i[u])!=null&&s[d]&&(i[u][d]=an.approach)}const a=s0(o);a&&r.villageCenter&&r.connectDoors!==!1&&r0(i,a,{x:r.villageCenter.x-t,y:r.villageCenter.y-n},t,n)}}function r0(i,e,t,n,r){let s=e.x,o=e.y;for(;s!==t.x;)Po(i,s,o,n,r),s+=Math.sign(t.x-s);for(;o!==t.y;)Po(i,s,o,n,r),o+=Math.sign(t.y-o);Po(i,s,o,n,r)}function Po(i,e,t,n,r){var a;const s=t+r,o=e+n;(a=i[s])!=null&&a[o]&&(i[s][o]=an.approach)}function s0(i){if(!i.door)return null;const e=Ns(i,i.door.x,i.door.y),t=th(e);return t?{x:i.x+i.door.x+t.x,y:i.y+i.door.y+t.y}:null}function o0(i,e,t,n){var o,a,l;const r=e.style==="stone"?an.stoneWall:an.timberWall,s=new Set((e.stairs||[]).map(c=>`${c.x},${c.y}`));for(let c=0;c<e.height;c++)for(let u=0;u<e.width;u++){const d=e.y+c+n,f=e.x+u+t;if(!((o=i[d])!=null&&o[f])||!g0(i[d][f]))continue;const _=u===0||c===0||u===e.width-1||c===e.height-1,x=((a=e.door)==null?void 0:a.x)===u&&((l=e.door)==null?void 0:l.y)===c,y=s.has(`${u},${c}`),v=Ns(e,u,c);if(x)i[d][f]=an.door;else if(y){const p=(e.stairs||[]).find(b=>b.x===u&&b.y===c);i[d][f]=p0(p==null?void 0:p.direction,e.style)}else f0(e,u,c,v)?i[d][f]=d0(e.style,v):i[d][f]=_?r:an.floor}}function a0(i,e){const t=new Map;if(e<=1)return t;const n=l0(i,e),r=new Set(n.map(s=>`${s.x},${s.y}`));return n.forEach((s,o)=>{const a=(o+1)*2;t.set(`${s.x},${s.y}`,a);for(const l of c0(i,s,o))r.has(`${l.x},${l.y}`)||t.set(`${l.x},${l.y}`,Math.max(t.get(`${l.x},${l.y}`)||0,a))}),t}function l0(i,e){var r;const t=((r=i.stairs)==null?void 0:r[0])||m0(i.width,i.height,h0(i),()=>.25),n=[];for(let s=0;s<e-1;s++)n.push({...t,x:Is(t.x+s*(t.x<=i.width/2?1:-1),1,i.width-2),y:Is(t.y+s*(t.y<=i.height/2?1:-1),1,i.height-2)});return n}function c0(i,e,t){var u,d;const n=[],r=i.width>=9?3:2,s=i.height>=7?2:1,o=e.x<=i.width/2?1:-1,a=e.y<=i.height/2?1:-1,l=Is(e.x+o*t,1,i.width-2),c=Is(e.y+a*t,1,i.height-2);for(let f=c-s;f<=c+s;f++)for(let _=l-r;_<=l+r;_++)_<=0||f<=0||_>=i.width-1||f>=i.height-1||((u=i.door)==null?void 0:u.x)===_&&((d=i.door)==null?void 0:d.y)===f||n.push({x:_,y:f});return n}function h0(i){return i!=null&&i.door&&Ns(i,i.door.x,i.door.y)||"south"}function u0(i,e,t,n){var u;if(!e.door)return;const r=Ns(e,e.door.x,e.door.y),s=th(r);if(!s)return;const o=e.y+e.door.y+n,a=e.x+e.door.x+t,l=o+s.y,c=a+s.x;(u=i[l])!=null&&u[c]&&_0(i[l][c])&&(i[l][c]=an.approach)}function f0(i,e,t,n){return!n||(e===0||e===i.width-1)&&(t===0||t===i.height-1)?!1:(e+t+i.id.length)%2===0}function Ns(i,e,t){return t===0?"north":t===i.height-1?"south":e===0?"west":e===i.width-1?"east":null}function th(i){return{north:{x:0,y:-1},south:{x:0,y:1},west:{x:-1,y:0},east:{x:1,y:0}}[i]||null}function d0(i,e){const t=i==="stone"?"stone":"timber",n=e.charAt(0).toUpperCase()+e.slice(1);return an[`${t}Window${n}`]||an[`${t}Wall`]}function p0(i="north",e="stone"){const t=i.charAt(0).toUpperCase()+i.slice(1);return e==="timber"?an[`timberStairs${t}`]||an.stairs:an[`stairs${t}`]||an.stairs}function m0(i,e,t,n){const r=t==="north"?"south":t==="south"?"north":t==="west"?"east":"west",s=t==="west"?i-2:t==="east"||n()>.5?1:i-2,o=t==="north"?e-2:t==="south"||n()>.5?1:e-2;return{x:s,y:o,direction:r}}function Is(i,e,t){return Math.max(e,Math.min(t,i))}function g0(i){return["G","F","S","H","R",an.floor].includes(i)}function _0(i){return["G","F","S","H","R"].includes(i)}const nh=64,ih=48,wt={id:"static-fmg-test-world",name:"Eldoria",seed:987341,width:640,height:420,locations:[{id:"willowbrook",name:"Willowbrook",type:"capital",x:314,y:206,population:7200,culture:"stone"},{id:"ravenwatch",name:"Ravenwatch",type:"fortress",x:448,y:132,population:2100,culture:"timber"},{id:"dunmere",name:"Dunmere",type:"port",x:172,y:238,population:3600,culture:"stone"},{id:"ashford",name:"Ashford",type:"market",x:382,y:292,population:2800,culture:"timber"},{id:"elderwick",name:"Elderwick",type:"village",x:252,y:118,population:1450,culture:"timber"},{id:"stonevale",name:"Stonevale",type:"mining",x:512,y:268,population:1900,culture:"stone"},{id:"falhaven",name:"Falhaven",type:"harbor",x:92,y:156,population:2500,culture:"timber"}],routes:[["willowbrook","ravenwatch"],["willowbrook","dunmere"],["willowbrook","ashford"],["willowbrook","elderwick"],["ashford","stonevale"],["dunmere","falhaven"],["elderwick","falhaven"],["ravenwatch","stonevale"]]},lc={capital:[{id:"hall",role:"Hall",dx:-12,dy:-10,width:10,height:8,doorEdge:"south",stories:3},{id:"inn",role:"Inn",dx:5,dy:-9,width:9,height:7,doorEdge:"south",stories:2},{id:"guild",role:"Guild",dx:-17,dy:4,width:8,height:7,doorEdge:"east",stories:2},{id:"market",role:"Market",dx:6,dy:5,width:9,height:7,doorEdge:"west",stories:2},{id:"townhouse",role:"Townhouse",dx:-4,dy:13,width:8,height:7,doorEdge:"north",stories:2},{id:"watch",role:"Watch House",dx:17,dy:-1,width:7,height:7,doorEdge:"west",stories:3}],fortress:[{id:"keep",role:"Keep",dx:-7,dy:-8,width:9,height:8,doorEdge:"south",stories:3},{id:"barracks",role:"Barracks",dx:6,dy:-5,width:9,height:6,doorEdge:"south",stories:2},{id:"armory",role:"Armory",dx:-10,dy:5,width:7,height:6,doorEdge:"east",stories:2},{id:"tower",role:"Tower",dx:9,dy:6,width:6,height:6,doorEdge:"west",stories:3}],port:[{id:"harbormaster",role:"Harbormaster",dx:-9,dy:-7,width:9,height:7,doorEdge:"south",stories:2},{id:"inn",role:"Inn",dx:5,dy:-7,width:9,height:7,doorEdge:"south",stories:2},{id:"warehouse",role:"Warehouse",dx:-12,dy:5,width:10,height:6,doorEdge:"east",stories:1},{id:"market",role:"Fish Market",dx:7,dy:5,width:8,height:6,doorEdge:"west",stories:1}],default:[{id:"hall",role:"Hall",dx:-8,dy:-7,width:8,height:7,doorEdge:"south",stories:2},{id:"inn",role:"Inn",dx:5,dy:-6,width:8,height:6,doorEdge:"south",stories:2},{id:"shop",role:"Shop",dx:-9,dy:5,width:7,height:6,doorEdge:"east",stories:1},{id:"house",role:"House",dx:5,dy:6,width:7,height:6,doorEdge:"west",stories:1}]};function v0(){return wt.locations.map(i=>({...i}))}function x0(){return wt.locations.find(i=>i.id==="willowbrook")||wt.locations[0]}function M0(i,e,t={}){const n=Math.max(24,Math.floor(t.width||nh)),r=Math.max(18,Math.floor(t.height||ih)),s=Dr(Math.round(i),0,wt.width-1),o=Dr(Math.round(e),0,wt.height-1),a=s-Math.floor(n/2),l=o-Math.floor(r/2),c=[];for(let _=0;_<r;_++){const x=[];for(let y=0;y<n;y++){const v=a+y,p=l+_;x.push(w0(v,p))}c.push(x)}E0(c,a,l);const u=y0(a,l,n,r);for(const _ of u)T0(c,_,a,l);const d=c.map(_=>_.join("")),f=u.flatMap(_=>b0(_,s,o));return S0({rows:d,buildings:f,connectDoors:!0},{centerX:s,centerY:o,originX:a,originY:l,width:n,height:r,nearbyLocations:u})}function S0(i,e){return i.world={id:wt.id,name:wt.name,seed:wt.seed,centerX:e.centerX,centerY:e.centerY,originX:e.originX,originY:e.originY,locations:e.nearbyLocations.map(t=>t.id)},i.width=e.width,i.height=e.height,i.center={x:e.centerX-e.originX,y:e.centerY-e.originY},i.townName=wt.name,i.seed=wt.seed,i}function y0(i,e,t,n){return wt.locations.filter(s=>s.x>=i-24&&s.x<i+t+24&&s.y>=e-24&&s.y<e+n+24)}function E0(i,e,t){for(const[n,r]of wt.routes){const s=wt.locations.find(a=>a.id===n),o=wt.locations.find(a=>a.id===r);!s||!o||A0(i,e,t,(a,l,c,u)=>{const d=R0(c,u,s.x,s.y,o.x,o.y);d<=.7&&rh(i[a][l])&&(i[a][l]="R"),d<=1.45&&i[a][l]==="F"&&(i[a][l]="G")})}}function T0(i,e,t,n){var a;const r=Math.round(e.x-t),s=Math.round(e.y-n),o=e.type==="capital"?4:e.type==="fortress"?3:2;for(let l=s-o;l<=s+o;l++)for(let c=r-o;c<=r+o;c++)(a=i[l])!=null&&a[c]&&Math.abs(c-r)+Math.abs(l-s)<=o+1&&rh(i[l][c])&&(i[l][c]="R")}function b0(i,e,t){const n=i.x-e,r=i.y-t,s=lc[i.type]||lc.default,o=C0(wt.seed+P0(i.id));return s.map((a,l)=>{const c=a.style||(i.culture==="stone"||o()>.46?"stone":"timber"),u=I0(a.width,a.height,a.doorEdge);return{id:`${i.id}-${a.id}-${l}`,name:`${i.name} ${a.role}`,x:Math.round(n+a.dx),y:Math.round(r+a.dy),width:a.width,height:a.height,stories:a.stories,style:c,doorStyle:["oak","iron","painted"][(l+i.id.length)%3],door:u,stairs:L0(a.width,a.height,a.doorEdge,a.stories,l)}})}function w0(i,e){const t=i/wt.width,n=e/wt.height,r=Math.min(t,n,1-t,1-n),s=1.1-Math.hypot(t-.54,n-.52)*1.42,o=Math.max(0,.17-Math.abs((t-.62)*.72-(n-.48)))*3.2,a=s+o+hc(i,e,.018,wt.seed)*.35,l=.48+hc(i,e,.032,wt.seed+401)*.35,c=n<.18||a>.98&&n<.38;return r<.035||a<.06?l>.55?"B":"W":r<.06||a<.12?"S":c&&a>.8?"P":c&&l>.48?"I":a>1.18?"M":a>.92?"H":l>.64?"F":"G"}function A0(i,e,t,n){for(let r=0;r<i.length;r++)for(let s=0;s<i[r].length;s++)n(r,s,e+s,t+r)}function R0(i,e,t,n,r,s){const o=r-t,a=s-n,l=o*o+a*a;if(l===0)return Math.hypot(i-t,e-n);const c=Dr(((i-t)*o+(e-n)*a)/l,0,1);return Math.hypot(i-(t+o*c),e-(n+a*c))}function hc(i,e,t,n){return Io(i*t,e*t,n)*.55+Io(i*t*2.1,e*t*2.1,n+97)*.3+Io(i*t*4.6,e*t*4.6,n+211)*.15}function Io(i,e,t){const n=Math.sin((i+t*.013)*12.9898+(e-t*.021)*78.233)*43758.5453;return(n-Math.floor(n))*2-1}function C0(i){let e=Math.abs(Math.floor(i))||1;return()=>(e=(e*1664525+1013904223)%4294967296,e/4294967296)}function P0(i){let e=0;for(let t=0;t<i.length;t++)e=(e<<5)-e+i.charCodeAt(t)|0;return Math.abs(e)}function rh(i){return["G","F","S","H","R"].includes(i)}function I0(i,e,t){return t==="north"?{x:Math.floor(i/2),y:0}:t==="south"?{x:Math.floor(i/2),y:e-1}:t==="west"?{x:0,y:Math.floor(e/2)}:{x:i-1,y:Math.floor(e/2)}}function D0(i,e,t,n){return t==="north"?{x:n%2?1:i-2,y:e-2}:t==="south"?{x:n%2?i-2:1,y:1}:t==="west"?{x:i-2,y:n%2?1:e-2}:{x:1,y:n%2?e-2:1}}function L0(i,e,t,n,r){const s=D0(i,e,t,r),o={north:"south",south:"north",east:"west",west:"east"}[t]||"north",a=[];for(let l=0;l<Math.max(1,n-1);l++)a.push({x:Dr(s.x+l*(s.x<=i/2?1:-1),1,i-2),y:Dr(s.y+l*(s.y<=e/2?1:-1),1,e-2),direction:o});return a}function Dr(i,e,t){return Math.max(e,Math.min(t,i))}const hs=16,uc=x0(),us=sh(uc.x,uc.y),fc=[{id:"meadow-hare-01",species:"meadowHare",habitat:"meadow",x:-8,y:-4,leashRadius:4}];function sh(i,e,t={}){const n=M0(i,e,{width:t.width||nh,height:t.height||ih});return U0(n)}function U0(i){const e=i.buildings||[],t=n0(i.rows,e,{villageCenter:i.center,connectDoors:i.connectDoors??!1}),n=Bg(t);return e0(n,e),t0(n,e),n.buildings=e,n.seed=i.seed,n.townName=i.townName,n.townCenter=i.center,n.spawn={x:i.center.x-Math.floor(i.width/2),y:i.center.y-Math.floor(i.height/2)},n.generator="azgaar-inspired-small-town-v1",i.world&&(n.world=i.world),n}class O0{constructor(e){var t,n;this.onTeleport=e.onTeleport,this.onStartCombat=e.onStartCombat,this.onToggleCollisionDebug=e.onToggleCollisionDebug,this.collisionDebugEnabled=!1,this.locations=v0(),this.toggleButton=document.getElementById("admin-toggle"),this.panel=document.getElementById("admin-panel"),this.message=document.getElementById("admin-message"),this.mapCard=document.getElementById("world-map-card"),this.locationList=document.getElementById("world-location-list"),this.worldXInput=document.getElementById("world-map-x-input"),this.worldYInput=document.getElementById("world-map-y-input"),this.teleportButton=document.getElementById("world-teleport-button"),this.combatButton=document.getElementById("start-combat-button"),this.collisionButton=document.getElementById("collision-debug-button"),this.closeButton=document.getElementById("admin-close-button"),this.renderWorldMap(),this.setCoordinates(((t=this.locations[0])==null?void 0:t.x)??0,((n=this.locations[0])==null?void 0:n.y)??0),this.bindEvents()}bindEvents(){this.toggleButton.addEventListener("click",()=>this.toggle()),this.closeButton.addEventListener("click",()=>this.setOpen(!1)),this.teleportButton.addEventListener("click",()=>this.teleportToInputs()),this.collisionButton.addEventListener("click",()=>this.toggleCollisionDebug()),this.combatButton.addEventListener("click",()=>{this.setOpen(!1),this.onStartCombat()})}renderWorldMap(){if(!(!this.mapCard||!this.locationList)){this.mapCard.innerHTML="",this.locationList.innerHTML="";for(const[e,t]of wt.routes){const n=this.locations.find(s=>s.id===e),r=this.locations.find(s=>s.id===t);!n||!r||this.mapCard.appendChild(this.createRouteElement(n,r))}for(const e of this.locations){const t=document.createElement("button");t.type="button",t.className=`world-point ${e.type==="capital"?"is-major":""}`,t.title=`${e.name} (${e.x}, ${e.y})`,t.style.left=`${e.x/wt.width*100}%`,t.style.top=`${e.y/wt.height*100}%`,t.addEventListener("click",()=>this.teleportToLocation(e)),this.mapCard.appendChild(t);const n=document.createElement("button");n.type="button",n.textContent=e.name,n.addEventListener("click",()=>this.teleportToLocation(e)),this.locationList.appendChild(n)}}}createRouteElement(e,t){const n=document.createElement("div");n.className="world-route";const r=e.x/wt.width*100,s=e.y/wt.height*100,o=t.x/wt.width*100,a=t.y/wt.height*100,l=o-r,c=a-s;return n.style.left=`${r}%`,n.style.top=`${s}%`,n.style.width=`${Math.hypot(l,c)}%`,n.style.transform=`rotate(${Math.atan2(c,l)}rad)`,n}teleportToLocation(e){this.setCoordinates(e.x,e.y),this.onTeleport({worldX:e.x,worldY:e.y,location:e}),this.setMessage(`Arrived at ${e.name}.`,"success"),this.setOpen(!1)}teleportToInputs(){const e=dc(this.worldXInput.value,0,wt.width-1),t=dc(this.worldYInput.value,0,wt.height-1);this.setCoordinates(e,t),this.onTeleport({worldX:e,worldY:t}),this.setMessage(`Arrived at ${e}, ${t}.`,"success"),this.setOpen(!1)}setCoordinates(e,t){this.worldXInput&&(this.worldXInput.value=String(e)),this.worldYInput&&(this.worldYInput.value=String(t))}toggle(){this.setOpen(!this.panel.classList.contains("is-open"))}setOpen(e){this.panel.classList.toggle("is-open",e),this.toggleButton.setAttribute("aria-expanded",String(e))}toggleCollisionDebug(){this.collisionDebugEnabled=!this.collisionDebugEnabled,this.collisionButton.setAttribute("aria-pressed",String(this.collisionDebugEnabled)),this.collisionButton.classList.toggle("is-active",this.collisionDebugEnabled),this.onToggleCollisionDebug(this.collisionDebugEnabled),this.setMessage(this.collisionDebugEnabled?"Collision foot area visible.":"Collision foot area hidden.","success")}setMessage(e,t="neutral"){this.message.textContent=e,this.message.dataset.tone=t}}function dc(i,e,t){const n=Number(i);return Number.isFinite(n)?Math.max(e,Math.min(t,Math.round(n))):e}class pc{constructor(e){this.client=e.client,this.userId=e.userId,this.onExit=e.onExit,this.overlay=document.getElementById("combat-scene"),this.status=document.getElementById("combat-status"),this.roundReadout=document.getElementById("combat-round"),this.turnReadout=document.getElementById("combat-turn"),this.partyList=document.getElementById("combat-party-list"),this.enemyList=document.getElementById("combat-enemy-list"),this.log=document.getElementById("combat-log"),this.attackButton=document.getElementById("combat-attack-button"),this.guardButton=document.getElementById("combat-guard-button"),this.readyButton=document.getElementById("combat-ready-button"),this.leaveButton=document.getElementById("combat-leave-button"),this.attackButton.addEventListener("click",()=>this.sendAction("attack")),this.guardButton.addEventListener("click",()=>this.sendAction("guard")),this.readyButton.addEventListener("click",()=>this.sendAction("ready")),this.leaveButton.addEventListener("click",()=>this.leave())}async enter(e="meadow-hare-demo"){if(this.overlay.classList.add("is-open"),!this.client){this.setStatus("Combat unavailable while offline.");return}this.setStatus("Joining co-op combat...");try{this.room=await this.client.joinOrCreate("combat",{userId:this.userId,encounterId:e}),this.bindRoom(),this.setStatus("Co-op combat ready.")}catch(t){console.error("[CombatScene] Failed to join combat:",t),this.setStatus("Could not join combat room.")}}bindRoom(){this.room&&(this.room.onMessage("combat:snapshot",e=>this.renderSnapshot(e)),this.room.onMessage("combat:log",e=>this.appendLog(e.message)))}sendAction(e){if(!this.room){this.appendLog("No combat room connected.");return}const t=e==="attack"?"wildlife_meadow_hare":"";this.room.send("combat:action",{action:e,targetId:t})}renderSnapshot(e){this.roundReadout.textContent=`${e.round}`,this.turnReadout.textContent=e.activeActorId||"Waiting",this.renderList(this.partyList,e.party||[],"ally"),this.renderList(this.enemyList,e.enemies||[],"enemy"),this.setStatus(e.phase==="planning"?"Choose an action.":"Resolving turn.")}renderList(e,t,n){e.innerHTML="";for(const r of t){const s=document.createElement("li");s.className=`combat-actor ${n}`;const o=document.createElement("span");o.textContent=r.name;const a=document.createElement("meter");a.min=0,a.max=r.maxHp,a.value=r.hp;const l=document.createElement("strong");l.textContent=`${r.hp}/${r.maxHp}`,s.append(o,a,l),e.appendChild(s)}}appendLog(e){const t=document.createElement("li");for(t.textContent=e,this.log.prepend(t);this.log.children.length>5;)this.log.removeChild(this.log.lastChild)}setStatus(e){this.status.textContent=e}async leave(){var e;this.room&&(await this.room.leave(),this.room=null),this.overlay.classList.remove("is-open"),(e=this.onExit)==null||e.call(this)}}var Ot=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function N0(i){if(i.__esModule)return i;var e=i.default;if(typeof e=="function"){var t=function n(){return this instanceof n?Reflect.construct(e,arguments,this.constructor):e.apply(this,arguments)};t.prototype=e.prototype}else t={};return Object.defineProperty(t,"__esModule",{value:!0}),Object.keys(i).forEach(function(n){var r=Object.getOwnPropertyDescriptor(i,n);Object.defineProperty(t,n,r.get?r:{enumerable:!0,get:function(){return i[n]}})}),t}var oh={};ArrayBuffer.isView||(ArrayBuffer.isView=i=>i!==null&&typeof i=="object"&&i.buffer instanceof ArrayBuffer);typeof globalThis>"u"&&typeof window<"u"&&(window.globalThis=window);var ir={},Fs={};(function(i){Object.defineProperty(i,"__esModule",{value:!0}),i.ServerError=i.CloseCode=void 0,function(t){t[t.CONSENTED=4e3]="CONSENTED",t[t.DEVMODE_RESTART=4010]="DEVMODE_RESTART"}(i.CloseCode||(i.CloseCode={}));class e extends Error{constructor(n,r){super(r),this.name="ServerError",this.code=n}}i.ServerError=e})(Fs);var Nr={},rr={};Object.defineProperty(rr,"__esModule",{value:!0});rr.decode=rr.encode=void 0;function hr(i,e){if(this._offset=e,i instanceof ArrayBuffer)this._buffer=i,this._view=new DataView(this._buffer);else if(ArrayBuffer.isView(i))this._buffer=i.buffer,this._view=new DataView(this._buffer,i.byteOffset,i.byteLength);else throw new Error("Invalid argument")}function F0(i,e,t){for(var n="",r=0,s=e,o=e+t;s<o;s++){var a=i.getUint8(s);if(!(a&128)){n+=String.fromCharCode(a);continue}if((a&224)===192){n+=String.fromCharCode((a&31)<<6|i.getUint8(++s)&63);continue}if((a&240)===224){n+=String.fromCharCode((a&15)<<12|(i.getUint8(++s)&63)<<6|(i.getUint8(++s)&63)<<0);continue}if((a&248)===240){r=(a&7)<<18|(i.getUint8(++s)&63)<<12|(i.getUint8(++s)&63)<<6|(i.getUint8(++s)&63)<<0,r>=65536?(r-=65536,n+=String.fromCharCode((r>>>10)+55296,(r&1023)+56320)):n+=String.fromCharCode(r);continue}throw new Error("Invalid byte "+a.toString(16))}return n}hr.prototype._array=function(i){for(var e=new Array(i),t=0;t<i;t++)e[t]=this._parse();return e};hr.prototype._map=function(i){for(var e="",t={},n=0;n<i;n++)e=this._parse(),t[e]=this._parse();return t};hr.prototype._str=function(i){var e=F0(this._view,this._offset,i);return this._offset+=i,e};hr.prototype._bin=function(i){var e=this._buffer.slice(this._offset,this._offset+i);return this._offset+=i,e};hr.prototype._parse=function(){var i=this._view.getUint8(this._offset++),e,t=0,n=0,r=0,s=0;if(i<192)return i<128?i:i<144?this._map(i&15):i<160?this._array(i&15):this._str(i&31);if(i>223)return(255-i+1)*-1;switch(i){case 192:return null;case 194:return!1;case 195:return!0;case 196:return t=this._view.getUint8(this._offset),this._offset+=1,this._bin(t);case 197:return t=this._view.getUint16(this._offset),this._offset+=2,this._bin(t);case 198:return t=this._view.getUint32(this._offset),this._offset+=4,this._bin(t);case 199:if(t=this._view.getUint8(this._offset),n=this._view.getInt8(this._offset+1),this._offset+=2,n===-1){var o=this._view.getUint32(this._offset);return r=this._view.getInt32(this._offset+4),s=this._view.getUint32(this._offset+8),this._offset+=12,new Date((r*4294967296+s)*1e3+o/1e6)}return[n,this._bin(t)];case 200:return t=this._view.getUint16(this._offset),n=this._view.getInt8(this._offset+2),this._offset+=3,[n,this._bin(t)];case 201:return t=this._view.getUint32(this._offset),n=this._view.getInt8(this._offset+4),this._offset+=5,[n,this._bin(t)];case 202:return e=this._view.getFloat32(this._offset),this._offset+=4,e;case 203:return e=this._view.getFloat64(this._offset),this._offset+=8,e;case 204:return e=this._view.getUint8(this._offset),this._offset+=1,e;case 205:return e=this._view.getUint16(this._offset),this._offset+=2,e;case 206:return e=this._view.getUint32(this._offset),this._offset+=4,e;case 207:return r=this._view.getUint32(this._offset)*Math.pow(2,32),s=this._view.getUint32(this._offset+4),this._offset+=8,r+s;case 208:return e=this._view.getInt8(this._offset),this._offset+=1,e;case 209:return e=this._view.getInt16(this._offset),this._offset+=2,e;case 210:return e=this._view.getInt32(this._offset),this._offset+=4,e;case 211:return r=this._view.getInt32(this._offset)*Math.pow(2,32),s=this._view.getUint32(this._offset+4),this._offset+=8,r+s;case 212:if(n=this._view.getInt8(this._offset),this._offset+=1,n===0){this._offset+=1;return}return[n,this._bin(1)];case 213:return n=this._view.getInt8(this._offset),this._offset+=1,[n,this._bin(2)];case 214:return n=this._view.getInt8(this._offset),this._offset+=1,n===-1?(e=this._view.getUint32(this._offset),this._offset+=4,new Date(e*1e3)):[n,this._bin(4)];case 215:if(n=this._view.getInt8(this._offset),this._offset+=1,n===0)return r=this._view.getInt32(this._offset)*Math.pow(2,32),s=this._view.getUint32(this._offset+4),this._offset+=8,new Date(r+s);if(n===-1){r=this._view.getUint32(this._offset),s=this._view.getUint32(this._offset+4),this._offset+=8;var a=(r&3)*4294967296+s;return new Date(a*1e3+(r>>>2)/1e6)}return[n,this._bin(8)];case 216:return n=this._view.getInt8(this._offset),this._offset+=1,[n,this._bin(16)];case 217:return t=this._view.getUint8(this._offset),this._offset+=1,this._str(t);case 218:return t=this._view.getUint16(this._offset),this._offset+=2,this._str(t);case 219:return t=this._view.getUint32(this._offset),this._offset+=4,this._str(t);case 220:return t=this._view.getUint16(this._offset),this._offset+=2,this._array(t);case 221:return t=this._view.getUint32(this._offset),this._offset+=4,this._array(t);case 222:return t=this._view.getUint16(this._offset),this._offset+=2,this._map(t);case 223:return t=this._view.getUint32(this._offset),this._offset+=4,this._map(t)}throw new Error("Could not parse")};function B0(i,e=0){var t=new hr(i,e),n=t._parse();if(t._offset!==i.byteLength)throw new Error(i.byteLength-t._offset+" trailing bytes");return n}rr.decode=B0;var k0=4294967296-1,z0=17179869184-1;function H0(i,e,t){for(var n=0,r=0,s=t.length;r<s;r++)n=t.charCodeAt(r),n<128?i.setUint8(e++,n):n<2048?(i.setUint8(e++,192|n>>6),i.setUint8(e++,128|n&63)):n<55296||n>=57344?(i.setUint8(e++,224|n>>12),i.setUint8(e++,128|n>>6&63),i.setUint8(e++,128|n&63)):(r++,n=65536+((n&1023)<<10|t.charCodeAt(r)&1023),i.setUint8(e++,240|n>>18),i.setUint8(e++,128|n>>12&63),i.setUint8(e++,128|n>>6&63),i.setUint8(e++,128|n&63))}function V0(i){for(var e=0,t=0,n=0,r=i.length;n<r;n++)e=i.charCodeAt(n),e<128?t+=1:e<2048?t+=2:e<55296||e>=57344?t+=3:(n++,t+=4);return t}function Ki(i,e,t){var n=typeof t,r=0,s=0,o=0,a=0,l=0,c=0;if(n==="string"){if(l=V0(t),l<32)i.push(l|160),c=1;else if(l<256)i.push(217,l),c=2;else if(l<65536)i.push(218,l>>8,l),c=3;else if(l<4294967296)i.push(219,l>>24,l>>16,l>>8,l),c=5;else throw new Error("String too long");return e.push({_str:t,_length:l,_offset:i.length}),c+l}if(n==="number")return Math.floor(t)!==t||!isFinite(t)?(i.push(203),e.push({_float:t,_length:8,_offset:i.length}),9):t>=0?t<128?(i.push(t),1):t<256?(i.push(204,t),2):t<65536?(i.push(205,t>>8,t),3):t<4294967296?(i.push(206,t>>24,t>>16,t>>8,t),5):(o=t/Math.pow(2,32)>>0,a=t>>>0,i.push(207,o>>24,o>>16,o>>8,o,a>>24,a>>16,a>>8,a),9):t>=-32?(i.push(t),1):t>=-128?(i.push(208,t),2):t>=-32768?(i.push(209,t>>8,t),3):t>=-2147483648?(i.push(210,t>>24,t>>16,t>>8,t),5):(o=Math.floor(t/Math.pow(2,32)),a=t>>>0,i.push(211,o>>24,o>>16,o>>8,o,a>>24,a>>16,a>>8,a),9);if(n==="object"){if(t===null)return i.push(192),1;if(Array.isArray(t)){if(l=t.length,l<16)i.push(l|144),c=1;else if(l<65536)i.push(220,l>>8,l),c=3;else if(l<4294967296)i.push(221,l>>24,l>>16,l>>8,l),c=5;else throw new Error("Array too large");for(r=0;r<l;r++)c+=Ki(i,e,t[r]);return c}if(t instanceof Date){var u=t.getTime(),d=Math.floor(u/1e3),f=(u-d*1e3)*1e6;return d>=0&&f>=0&&d<=z0?f===0&&d<=k0?(i.push(214,255,d>>24,d>>16,d>>8,d),6):(o=d/4294967296,a=d&4294967295,i.push(215,255,f>>22,f>>14,f>>6,o,a>>24,a>>16,a>>8,a),10):(o=Math.floor(d/4294967296),a=d>>>0,i.push(199,12,255,f>>24,f>>16,f>>8,f,o>>24,o>>16,o>>8,o,a>>24,a>>16,a>>8,a),15)}if(t instanceof ArrayBuffer){if(l=t.byteLength,l<256)i.push(196,l),c=2;else if(l<65536)i.push(197,l>>8,l),c=3;else if(l<4294967296)i.push(198,l>>24,l>>16,l>>8,l),c=5;else throw new Error("Buffer too large");return e.push({_bin:t,_length:l,_offset:i.length}),c+l}if(typeof t.toJSON=="function")return Ki(i,e,t.toJSON());var _=[],x="",y=Object.keys(t);for(r=0,s=y.length;r<s;r++)x=y[r],t[x]!==void 0&&typeof t[x]!="function"&&_.push(x);if(l=_.length,l<16)i.push(l|128),c=1;else if(l<65536)i.push(222,l>>8,l),c=3;else if(l<4294967296)i.push(223,l>>24,l>>16,l>>8,l),c=5;else throw new Error("Object too large");for(r=0;r<l;r++)x=_[r],c+=Ki(i,e,x),c+=Ki(i,e,t[x]);return c}if(n==="boolean")return i.push(t?195:194),1;if(n==="undefined")return i.push(192),1;if(typeof t.toJSON=="function")return Ki(i,e,t.toJSON());throw new Error("Could not encode")}function G0(i){var e=[],t=[],n=Ki(e,t,i),r=new ArrayBuffer(n),s=new DataView(r),o=0,a=0,l=-1;t.length>0&&(l=t[0]._offset);for(var c,u=0,d=0,f=0,_=e.length;f<_;f++)if(s.setUint8(a+f,e[f]),f+1===l){if(c=t[o],u=c._length,d=a+l,c._bin)for(var x=new Uint8Array(c._bin),y=0;y<u;y++)s.setUint8(d+y,x[y]);else c._str?H0(s,d,c._str):c._float!==void 0&&s.setFloat64(d,c._float);o++,a+=u,t[o]&&(l=t[o]._offset)}return r}rr.encode=G0;var Bs={},ks={},W0=function(){throw new Error("ws does not work in the browser. Browser clients must use the native WebSocket object")},X0=Ot&&Ot.__importDefault||function(i){return i&&i.__esModule?i:{default:i}};Object.defineProperty(ks,"__esModule",{value:!0});ks.WebSocketTransport=void 0;const $0=X0(W0),Do=globalThis.WebSocket||$0.default;class Y0{constructor(e){this.events=e}send(e){e instanceof ArrayBuffer?this.ws.send(e):Array.isArray(e)&&this.ws.send(new Uint8Array(e).buffer)}connect(e,t){try{this.ws=new Do(e,{headers:t,protocols:this.protocols})}catch{this.ws=new Do(e,this.protocols)}this.ws.binaryType="arraybuffer",this.ws.onopen=this.events.onopen,this.ws.onmessage=this.events.onmessage,this.ws.onclose=this.events.onclose,this.ws.onerror=this.events.onerror}close(e,t){this.ws.close(e,t)}get isOpen(){return this.ws.readyState===Do.OPEN}}ks.WebSocketTransport=Y0;Object.defineProperty(Bs,"__esModule",{value:!0});Bs.Connection=void 0;const q0=ks;class j0{constructor(){this.events={},this.transport=new q0.WebSocketTransport(this.events)}send(e){this.transport.send(e)}connect(e,t){this.transport.connect(e,t)}close(e,t){this.transport.close(e,t)}get isOpen(){return this.transport.isOpen}}Bs.Connection=j0;var Ka={};(function(i){Object.defineProperty(i,"__esModule",{value:!0}),i.utf8Length=i.utf8Read=i.ErrorCode=i.Protocol=void 0,function(n){n[n.HANDSHAKE=9]="HANDSHAKE",n[n.JOIN_ROOM=10]="JOIN_ROOM",n[n.ERROR=11]="ERROR",n[n.LEAVE_ROOM=12]="LEAVE_ROOM",n[n.ROOM_DATA=13]="ROOM_DATA",n[n.ROOM_STATE=14]="ROOM_STATE",n[n.ROOM_STATE_PATCH=15]="ROOM_STATE_PATCH",n[n.ROOM_DATA_SCHEMA=16]="ROOM_DATA_SCHEMA",n[n.ROOM_DATA_BYTES=17]="ROOM_DATA_BYTES"}(i.Protocol||(i.Protocol={})),function(n){n[n.MATCHMAKE_NO_HANDLER=4210]="MATCHMAKE_NO_HANDLER",n[n.MATCHMAKE_INVALID_CRITERIA=4211]="MATCHMAKE_INVALID_CRITERIA",n[n.MATCHMAKE_INVALID_ROOM_ID=4212]="MATCHMAKE_INVALID_ROOM_ID",n[n.MATCHMAKE_UNHANDLED=4213]="MATCHMAKE_UNHANDLED",n[n.MATCHMAKE_EXPIRED=4214]="MATCHMAKE_EXPIRED",n[n.AUTH_FAILED=4215]="AUTH_FAILED",n[n.APPLICATION_ERROR=4216]="APPLICATION_ERROR"}(i.ErrorCode||(i.ErrorCode={}));function e(n,r){const s=n[r++];for(var o="",a=0,l=r,c=r+s;l<c;l++){var u=n[l];if(!(u&128)){o+=String.fromCharCode(u);continue}if((u&224)===192){o+=String.fromCharCode((u&31)<<6|n[++l]&63);continue}if((u&240)===224){o+=String.fromCharCode((u&15)<<12|(n[++l]&63)<<6|(n[++l]&63)<<0);continue}if((u&248)===240){a=(u&7)<<18|(n[++l]&63)<<12|(n[++l]&63)<<6|(n[++l]&63)<<0,a>=65536?(a-=65536,o+=String.fromCharCode((a>>>10)+55296,(a&1023)+56320)):o+=String.fromCharCode(a);continue}throw new Error("Invalid byte "+u.toString(16))}return o}i.utf8Read=e;function t(n=""){let r=0,s=0;for(let o=0,a=n.length;o<a;o++)r=n.charCodeAt(o),r<128?s+=1:r<2048?s+=2:r<55296||r>=57344?s+=3:(o++,s+=4);return s+1}i.utf8Length=t})(Ka);var Pi={};Object.defineProperty(Pi,"__esModule",{value:!0});Pi.getSerializer=Pi.registerSerializer=void 0;const ah={};function K0(i,e){ah[i]=e}Pi.registerSerializer=K0;function Z0(i){const e=ah[i];if(!e)throw new Error("missing serializer: "+i);return e}Pi.getSerializer=Z0;var Fr={};Object.defineProperty(Fr,"__esModule",{value:!0});Fr.createNanoEvents=void 0;const J0=()=>({emit(i,...e){let t=this.events[i]||[];for(let n=0,r=t.length;n<r;n++)t[n](...e)},events:{},on(i,e){var t;return!((t=this.events[i])===null||t===void 0)&&t.push(e)||(this.events[i]=[e]),()=>{var n;this.events[i]=(n=this.events[i])===null||n===void 0?void 0:n.filter(r=>e!==r)}}});Fr.createNanoEvents=J0;var sr={};Object.defineProperty(sr,"__esModule",{value:!0});sr.createSignal=sr.EventEmitter=void 0;class lh{constructor(){this.handlers=[]}register(e,t=!1){return this.handlers.push(e),this}invoke(...e){this.handlers.forEach(t=>t.apply(this,e))}invokeAsync(...e){return Promise.all(this.handlers.map(t=>t.apply(this,e)))}remove(e){const t=this.handlers.indexOf(e);this.handlers[t]=this.handlers[this.handlers.length-1],this.handlers.pop()}clear(){this.handlers=[]}}sr.EventEmitter=lh;function Q0(){const i=new lh;function e(t){return i.register(t,this===null)}return e.once=t=>{const n=function(...r){t.apply(this,r),i.remove(n)};i.register(n)},e.remove=t=>i.remove(t),e.invoke=(...t)=>i.invoke(...t),e.invokeAsync=(...t)=>i.invokeAsync(...t),e.clear=()=>i.clear(),e}sr.createSignal=Q0;var Ca={exports:{}};(function(i,e){(function(t,n){n(e)})(Ot,function(t){var n=function(g,h){return n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(m,T){m.__proto__=T}||function(m,T){for(var z in T)Object.prototype.hasOwnProperty.call(T,z)&&(m[z]=T[z])},n(g,h)};function r(g,h){if(typeof h!="function"&&h!==null)throw new TypeError("Class extends value "+String(h)+" is not a constructor or null");n(g,h);function m(){this.constructor=g}g.prototype=h===null?Object.create(h):(m.prototype=h.prototype,new m)}function s(g,h,m,T){var z=arguments.length,ee=z<3?h:T,Ue;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")ee=Reflect.decorate(g,h,m,T);else for(var Pe=g.length-1;Pe>=0;Pe--)(Ue=g[Pe])&&(ee=(z<3?Ue(ee):z>3?Ue(h,m,ee):Ue(h,m))||ee);return z>3&&ee&&Object.defineProperty(h,m,ee),ee}function o(g,h,m){if(arguments.length===2)for(var T=0,z=h.length,ee;T<z;T++)(ee||!(T in h))&&(ee||(ee=Array.prototype.slice.call(h,0,T)),ee[T]=h[T]);return g.concat(ee||Array.prototype.slice.call(h))}typeof SuppressedError=="function"&&SuppressedError;var a=255,l=213;t.OPERATION=void 0,function(g){g[g.ADD=128]="ADD",g[g.REPLACE=0]="REPLACE",g[g.DELETE=64]="DELETE",g[g.DELETE_AND_ADD=192]="DELETE_AND_ADD",g[g.TOUCH=1]="TOUCH",g[g.CLEAR=10]="CLEAR"}(t.OPERATION||(t.OPERATION={}));var c=function(){function g(h,m,T){this.changed=!1,this.changes=new Map,this.allChanges=new Set,this.caches={},this.currentCustomOperation=0,this.ref=h,this.setParent(m,T)}return g.prototype.setParent=function(h,m,T){var z=this;if(this.indexes||(this.indexes=this.ref instanceof tt?this.ref._definition.indexes:{}),this.parent=h,this.parentIndex=T,!!m)if(this.root=m,this.ref instanceof tt){var ee=this.ref._definition;for(var Ue in ee.schema){var Pe=this.ref[Ue];if(Pe&&Pe.$changes){var it=ee.indexes[Ue];Pe.$changes.setParent(this.ref,m,it)}}}else typeof this.ref=="object"&&this.ref.forEach(function(rt,Fe){if(rt instanceof tt){var lt=rt.$changes,Be=z.ref.$changes.indexes[Fe];lt.setParent(z.ref,z.root,Be)}})},g.prototype.operation=function(h){this.changes.set(--this.currentCustomOperation,h)},g.prototype.change=function(h,m){m===void 0&&(m=t.OPERATION.ADD);var T=typeof h=="number"?h:this.indexes[h];this.assertValidIndex(T,h);var z=this.changes.get(T);(!z||z.op===t.OPERATION.DELETE||z.op===t.OPERATION.TOUCH)&&this.changes.set(T,{op:z&&z.op===t.OPERATION.DELETE?t.OPERATION.DELETE_AND_ADD:m,index:T}),this.allChanges.add(T),this.changed=!0,this.touchParents()},g.prototype.touch=function(h){var m=typeof h=="number"?h:this.indexes[h];this.assertValidIndex(m,h),this.changes.has(m)||this.changes.set(m,{op:t.OPERATION.TOUCH,index:m}),this.allChanges.add(m),this.touchParents()},g.prototype.touchParents=function(){this.parent&&this.parent.$changes.touch(this.parentIndex)},g.prototype.getType=function(h){if(this.ref._definition){var m=this.ref._definition;return m.schema[m.fieldsByIndex[h]]}else{var m=this.parent._definition,T=m.schema[m.fieldsByIndex[this.parentIndex]];return Object.values(T)[0]}},g.prototype.getChildrenFilter=function(){var h=this.parent._definition.childFilters;return h&&h[this.parentIndex]},g.prototype.getValue=function(h){return this.ref.getByIndex(h)},g.prototype.delete=function(h){var m=typeof h=="number"?h:this.indexes[h];if(m===void 0){console.warn("@colyseus/schema ".concat(this.ref.constructor.name,": trying to delete non-existing index: ").concat(h," (").concat(m,")"));return}var T=this.getValue(m);this.changes.set(m,{op:t.OPERATION.DELETE,index:m}),this.allChanges.delete(m),delete this.caches[m],T&&T.$changes&&(T.$changes.parent=void 0),this.changed=!0,this.touchParents()},g.prototype.discard=function(h,m){var T=this;h===void 0&&(h=!1),m===void 0&&(m=!1),this.ref instanceof tt||this.changes.forEach(function(z){if(z.op===t.OPERATION.DELETE){var ee=T.ref.getIndex(z.index);delete T.indexes[ee]}}),this.changes.clear(),this.changed=h,m&&this.allChanges.clear(),this.currentCustomOperation=0},g.prototype.discardAll=function(){var h=this;this.changes.forEach(function(m){var T=h.getValue(m.index);T&&T.$changes&&T.$changes.discardAll()}),this.discard()},g.prototype.cache=function(h,m){this.caches[h]=m},g.prototype.clone=function(){return new g(this.ref,this.parent,this.root)},g.prototype.ensureRefId=function(){this.refId===void 0&&(this.refId=this.root.getNextUniqueId())},g.prototype.assertValidIndex=function(h,m){if(h===void 0)throw new Error('ChangeTree: missing index for field "'.concat(m,'"'))},g}();function u(g,h,m,T){return g[h]||(g[h]=[]),g[h].push(m),T==null||T.forEach(function(z,ee){return m(z,ee)}),function(){return f(g[h],g[h].indexOf(m))}}function d(g){var h=this,m=typeof this.$changes.getType()!="string";this.$items.forEach(function(T,z){g.push({refId:h.$changes.refId,op:t.OPERATION.DELETE,field:z,value:void 0,previousValue:T}),m&&h.$changes.root.removeRef(T.$changes.refId)})}function f(g,h){if(h===-1||h>=g.length)return!1;for(var m=g.length-1,T=h;T<m;T++)g[T]=g[T+1];return g.length=m,!0}var _=function(g,h){var m=g.toString(),T=h.toString();return m<T?-1:m>T?1:0};function x(g){return g.$proxy=!0,g=new Proxy(g,{get:function(h,m){return typeof m!="symbol"&&!isNaN(m)?h.at(m):h[m]},set:function(h,m,T){if(typeof m!="symbol"&&!isNaN(m)){var z=Array.from(h.$items.keys()),ee=parseInt(z[m]||m);T==null?h.deleteAt(ee):h.setAt(ee,T)}else h[m]=T;return!0},deleteProperty:function(h,m){return typeof m=="number"?h.deleteAt(m):delete h[m],!0},has:function(h,m){return typeof m!="symbol"&&!isNaN(Number(m))?h.$items.has(Number(m)):Reflect.has(h,m)}}),g}var y=function(){function g(){for(var h=[],m=0;m<arguments.length;m++)h[m]=arguments[m];this.$changes=new c(this),this.$items=new Map,this.$indexes=new Map,this.$refId=0,this.push.apply(this,h)}return g.prototype.onAdd=function(h,m){return m===void 0&&(m=!0),u(this.$callbacks||(this.$callbacks={}),t.OPERATION.ADD,h,m?this.$items:void 0)},g.prototype.onRemove=function(h){return u(this.$callbacks||(this.$callbacks={}),t.OPERATION.DELETE,h)},g.prototype.onChange=function(h){return u(this.$callbacks||(this.$callbacks={}),t.OPERATION.REPLACE,h)},g.is=function(h){return Array.isArray(h)||h.array!==void 0},Object.defineProperty(g.prototype,"length",{get:function(){return this.$items.size},set:function(h){h===0?this.clear():this.splice(h,this.length-h)},enumerable:!1,configurable:!0}),g.prototype.push=function(){for(var h=this,m=[],T=0;T<arguments.length;T++)m[T]=arguments[T];var z;return m.forEach(function(ee){z=h.$refId++,h.setAt(z,ee)}),z},g.prototype.pop=function(){var h=Array.from(this.$indexes.values()).pop();if(h!==void 0){this.$changes.delete(h),this.$indexes.delete(h);var m=this.$items.get(h);return this.$items.delete(h),m}},g.prototype.at=function(h){if(h=Math.trunc(h)||0,h<0&&(h+=this.length),!(h<0||h>=this.length)){var m=Array.from(this.$items.keys())[h];return this.$items.get(m)}},g.prototype.setAt=function(h,m){var T,z;if(m==null){console.error("ArraySchema items cannot be null nor undefined; Use `deleteAt(index)` instead.");return}if(this.$items.get(h)!==m){m.$changes!==void 0&&m.$changes.setParent(this,this.$changes.root,h);var ee=(z=(T=this.$changes.indexes[h])===null||T===void 0?void 0:T.op)!==null&&z!==void 0?z:t.OPERATION.ADD;this.$changes.indexes[h]=h,this.$indexes.set(h,h),this.$items.set(h,m),this.$changes.change(h,ee)}},g.prototype.deleteAt=function(h){var m=Array.from(this.$items.keys())[h];return m===void 0?!1:this.$deleteAt(m)},g.prototype.$deleteAt=function(h){return this.$changes.delete(h),this.$indexes.delete(h),this.$items.delete(h)},g.prototype.clear=function(h){this.$changes.discard(!0,!0),this.$changes.indexes={},this.$indexes.clear(),h&&d.call(this,h),this.$items.clear(),this.$changes.operation({index:0,op:t.OPERATION.CLEAR}),this.$changes.touchParents()},g.prototype.concat=function(){for(var h,m=[],T=0;T<arguments.length;T++)m[T]=arguments[T];return new(g.bind.apply(g,o([void 0],(h=Array.from(this.$items.values())).concat.apply(h,m),!1)))},g.prototype.join=function(h){return Array.from(this.$items.values()).join(h)},g.prototype.reverse=function(){var h=this,m=Array.from(this.$items.keys()),T=Array.from(this.$items.values()).reverse();return T.forEach(function(z,ee){h.setAt(m[ee],z)}),this},g.prototype.shift=function(){var h=Array.from(this.$items.keys()),m=h.shift();if(m!==void 0){var T=this.$items.get(m);return this.$deleteAt(m),T}},g.prototype.slice=function(h,m){var T=new g;return T.push.apply(T,Array.from(this.$items.values()).slice(h,m)),T},g.prototype.sort=function(h){var m=this;h===void 0&&(h=_);var T=Array.from(this.$items.keys()),z=Array.from(this.$items.values()).sort(h);return z.forEach(function(ee,Ue){m.setAt(T[Ue],ee)}),this},g.prototype.splice=function(h,m){m===void 0&&(m=this.length-h);for(var T=[],z=2;z<arguments.length;z++)T[z-2]=arguments[z];for(var ee=Array.from(this.$items.keys()),Ue=[],Pe=h;Pe<h+m;Pe++)Ue.push(this.$items.get(ee[Pe])),this.$deleteAt(ee[Pe]);for(var Pe=0;Pe<T.length;Pe++)this.setAt(h+Pe,T[Pe]);return Ue},g.prototype.unshift=function(){for(var h=this,m=[],T=0;T<arguments.length;T++)m[T]=arguments[T];var z=this.length,ee=m.length,Ue=Array.from(this.$items.values());return m.forEach(function(Pe,it){h.setAt(it,Pe)}),Ue.forEach(function(Pe,it){h.setAt(ee+it,Pe)}),z+ee},g.prototype.indexOf=function(h,m){return Array.from(this.$items.values()).indexOf(h,m)},g.prototype.lastIndexOf=function(h,m){return m===void 0&&(m=this.length-1),Array.from(this.$items.values()).lastIndexOf(h,m)},g.prototype.every=function(h,m){return Array.from(this.$items.values()).every(h,m)},g.prototype.some=function(h,m){return Array.from(this.$items.values()).some(h,m)},g.prototype.forEach=function(h,m){Array.from(this.$items.values()).forEach(h,m)},g.prototype.map=function(h,m){return Array.from(this.$items.values()).map(h,m)},g.prototype.filter=function(h,m){return Array.from(this.$items.values()).filter(h,m)},g.prototype.reduce=function(h,m){return Array.prototype.reduce.apply(Array.from(this.$items.values()),arguments)},g.prototype.reduceRight=function(h,m){return Array.prototype.reduceRight.apply(Array.from(this.$items.values()),arguments)},g.prototype.find=function(h,m){return Array.from(this.$items.values()).find(h,m)},g.prototype.findIndex=function(h,m){return Array.from(this.$items.values()).findIndex(h,m)},g.prototype.fill=function(h,m,T){throw new Error("ArraySchema#fill() not implemented")},g.prototype.copyWithin=function(h,m,T){throw new Error("ArraySchema#copyWithin() not implemented")},g.prototype.toString=function(){return this.$items.toString()},g.prototype.toLocaleString=function(){return this.$items.toLocaleString()},g.prototype[Symbol.iterator]=function(){return Array.from(this.$items.values())[Symbol.iterator]()},Object.defineProperty(g,Symbol.species,{get:function(){return g},enumerable:!1,configurable:!0}),g.prototype.entries=function(){return this.$items.entries()},g.prototype.keys=function(){return this.$items.keys()},g.prototype.values=function(){return this.$items.values()},g.prototype.includes=function(h,m){return Array.from(this.$items.values()).includes(h,m)},g.prototype.flatMap=function(h,m){throw new Error("ArraySchema#flatMap() is not supported.")},g.prototype.flat=function(h){throw new Error("ArraySchema#flat() is not supported.")},g.prototype.findLast=function(){var h=Array.from(this.$items.values());return h.findLast.apply(h,arguments)},g.prototype.findLastIndex=function(){var h=Array.from(this.$items.values());return h.findLastIndex.apply(h,arguments)},g.prototype.with=function(h,m){var T=Array.from(this.$items.values());return T[h]=m,new(g.bind.apply(g,o([void 0],T,!1)))},g.prototype.toReversed=function(){return Array.from(this.$items.values()).reverse()},g.prototype.toSorted=function(h){return Array.from(this.$items.values()).sort(h)},g.prototype.toSpliced=function(h,m){var T=Array.from(this.$items.values());return T.toSpliced.apply(T,arguments)},g.prototype.setIndex=function(h,m){this.$indexes.set(h,m)},g.prototype.getIndex=function(h){return this.$indexes.get(h)},g.prototype.getByIndex=function(h){return this.$items.get(this.$indexes.get(h))},g.prototype.deleteByIndex=function(h){var m=this.$indexes.get(h);this.$items.delete(m),this.$indexes.delete(h)},g.prototype.toArray=function(){return Array.from(this.$items.values())},g.prototype.toJSON=function(){return this.toArray().map(function(h){return typeof h.toJSON=="function"?h.toJSON():h})},g.prototype.clone=function(h){var m;return h?m=new(g.bind.apply(g,o([void 0],Array.from(this.$items.values()),!1))):m=new(g.bind.apply(g,o([void 0],this.map(function(T){return T.$changes?T.clone():T}),!1))),m},g}();function v(g){return g.$proxy=!0,g=new Proxy(g,{get:function(h,m){return typeof m!="symbol"&&typeof h[m]>"u"?h.get(m):h[m]},set:function(h,m,T){return typeof m!="symbol"&&m.indexOf("$")===-1&&m!=="onAdd"&&m!=="onRemove"&&m!=="onChange"?h.set(m,T):h[m]=T,!0},deleteProperty:function(h,m){return h.delete(m),!0}}),g}var p=function(){function g(h){var m=this;if(this.$changes=new c(this),this.$items=new Map,this.$indexes=new Map,this.$refId=0,h)if(h instanceof Map||h instanceof g)h.forEach(function(z,ee){return m.set(ee,z)});else for(var T in h)this.set(T,h[T])}return g.prototype.onAdd=function(h,m){return m===void 0&&(m=!0),u(this.$callbacks||(this.$callbacks={}),t.OPERATION.ADD,h,m?this.$items:void 0)},g.prototype.onRemove=function(h){return u(this.$callbacks||(this.$callbacks={}),t.OPERATION.DELETE,h)},g.prototype.onChange=function(h){return u(this.$callbacks||(this.$callbacks={}),t.OPERATION.REPLACE,h)},g.is=function(h){return h.map!==void 0},g.prototype[Symbol.iterator]=function(){return this.$items[Symbol.iterator]()},Object.defineProperty(g.prototype,Symbol.toStringTag,{get:function(){return this.$items[Symbol.toStringTag]},enumerable:!1,configurable:!0}),Object.defineProperty(g,Symbol.species,{get:function(){return g},enumerable:!1,configurable:!0}),g.prototype.set=function(h,m){if(m==null)throw new Error("MapSchema#set('".concat(h,"', ").concat(m,"): trying to set ").concat(m," value on '").concat(h,"'."));h=h.toString();var T=typeof this.$changes.indexes[h]<"u",z=T?this.$changes.indexes[h]:this.$refId++,ee=T?t.OPERATION.REPLACE:t.OPERATION.ADD,Ue=m.$changes!==void 0;if(Ue&&m.$changes.setParent(this,this.$changes.root,z),!T)this.$changes.indexes[h]=z,this.$indexes.set(z,h);else{if(!Ue&&this.$items.get(h)===m)return;Ue&&this.$items.get(h)!==m&&(ee=t.OPERATION.ADD)}return this.$items.set(h,m),this.$changes.change(h,ee),this},g.prototype.get=function(h){return this.$items.get(h)},g.prototype.delete=function(h){return this.$changes.delete(h.toString()),this.$items.delete(h)},g.prototype.clear=function(h){this.$changes.discard(!0,!0),this.$changes.indexes={},this.$indexes.clear(),h&&d.call(this,h),this.$items.clear(),this.$changes.operation({index:0,op:t.OPERATION.CLEAR}),this.$changes.touchParents()},g.prototype.has=function(h){return this.$items.has(h)},g.prototype.forEach=function(h){this.$items.forEach(h)},g.prototype.entries=function(){return this.$items.entries()},g.prototype.keys=function(){return this.$items.keys()},g.prototype.values=function(){return this.$items.values()},Object.defineProperty(g.prototype,"size",{get:function(){return this.$items.size},enumerable:!1,configurable:!0}),g.prototype.setIndex=function(h,m){this.$indexes.set(h,m)},g.prototype.getIndex=function(h){return this.$indexes.get(h)},g.prototype.getByIndex=function(h){return this.$items.get(this.$indexes.get(h))},g.prototype.deleteByIndex=function(h){var m=this.$indexes.get(h);this.$items.delete(m),this.$indexes.delete(h)},g.prototype.toJSON=function(){var h={};return this.forEach(function(m,T){h[T]=typeof m.toJSON=="function"?m.toJSON():m}),h},g.prototype.clone=function(h){var m;return h?m=Object.assign(new g,this):(m=new g,this.forEach(function(T,z){T.$changes?m.set(z,T.clone()):m.set(z,T)})),m},g}(),b={};function C(g,h){b[g]=h}function A(g){return b[g]}var I=function(){function g(){this.indexes={},this.fieldsByIndex={},this.deprecated={},this.descriptors={}}return g.create=function(h){var m=new g;return m.schema=Object.assign({},h&&h.schema||{}),m.indexes=Object.assign({},h&&h.indexes||{}),m.fieldsByIndex=Object.assign({},h&&h.fieldsByIndex||{}),m.descriptors=Object.assign({},h&&h.descriptors||{}),m.deprecated=Object.assign({},h&&h.deprecated||{}),m},g.prototype.addField=function(h,m){var T=this.getNextFieldIndex();this.fieldsByIndex[T]=h,this.indexes[h]=T,this.schema[h]=Array.isArray(m)?{array:m[0]}:m},g.prototype.hasField=function(h){return this.indexes[h]!==void 0},g.prototype.addFilter=function(h,m){return this.filters||(this.filters={},this.indexesWithFilters=[]),this.filters[this.indexes[h]]=m,this.indexesWithFilters.push(this.indexes[h]),!0},g.prototype.addChildrenFilter=function(h,m){var T=this.indexes[h],z=this.schema[h];if(A(Object.keys(z)[0]))return this.childFilters||(this.childFilters={}),this.childFilters[T]=m,!0;console.warn("@filterChildren: field '".concat(h,"' can't have children. Ignoring filter."))},g.prototype.getChildrenFilter=function(h){return this.childFilters&&this.childFilters[this.indexes[h]]},g.prototype.getNextFieldIndex=function(){return Object.keys(this.schema||{}).length},g}();function P(g){return g._context&&g._context.useFilters}var L=function(){function g(){this.types={},this.schemas=new Map,this.useFilters=!1}return g.prototype.has=function(h){return this.schemas.has(h)},g.prototype.get=function(h){return this.types[h]},g.prototype.add=function(h,m){m===void 0&&(m=this.schemas.size),h._definition=I.create(h._definition),h._typeid=m,this.types[m]=h,this.schemas.set(h,m)},g.create=function(h){return h===void 0&&(h={}),function(m){return h.context||(h.context=new g),w(m,h)}},g}(),E=new L;function w(g,h){return h===void 0&&(h={}),function(m,T){var z=h.context||E,ee=m.constructor;if(ee._context=z,!g)throw new Error("".concat(ee.name,': @type() reference provided for "').concat(T,`" is undefined. Make sure you don't have any circular dependencies.`));z.has(ee)||z.add(ee);var Ue=ee._definition;if(Ue.addField(T,g),Ue.descriptors[T]){if(Ue.deprecated[T])return;try{throw new Error("@colyseus/schema: Duplicate '".concat(T,"' definition on '").concat(ee.name,`'.
Check @type() annotation`))}catch(Be){var Pe=Be.stack.split(`
`)[4].trim();throw new Error("".concat(Be.message," ").concat(Pe))}}var it=y.is(g),rt=!it&&p.is(g);if(typeof g!="string"&&!tt.is(g)){var Fe=Object.values(g)[0];typeof Fe!="string"&&!z.has(Fe)&&z.add(Fe)}if(h.manual){Ue.descriptors[T]={enumerable:!0,configurable:!0,writable:!0};return}var lt="_".concat(T);Ue.descriptors[lt]={enumerable:!1,configurable:!1,writable:!0},Ue.descriptors[T]={get:function(){return this[lt]},set:function(Be){Be!==this[lt]&&(Be!=null?(it&&!(Be instanceof y)&&(Be=new(y.bind.apply(y,o([void 0],Be,!1)))),rt&&!(Be instanceof p)&&(Be=new p(Be)),Be.$proxy===void 0&&(rt?Be=v(Be):it&&(Be=x(Be))),this.$changes.change(T),Be.$changes&&Be.$changes.setParent(this,this.$changes.root,this._definition.indexes[T])):this[lt]!==void 0&&this.$changes.delete(T),this[lt]=Be)},enumerable:!0,configurable:!0}}}function j(g){return function(h,m){var T=h.constructor,z=T._definition;z.addFilter(m,g)&&(T._context.useFilters=!0)}}function D(g){return function(h,m){var T=h.constructor,z=T._definition;z.addChildrenFilter(m,g)&&(T._context.useFilters=!0)}}function V(g){return g===void 0&&(g=!0),function(h,m){var T=h.constructor,z=T._definition;z.deprecated[m]=!0,g&&(z.descriptors[m]={get:function(){throw new Error("".concat(m," is deprecated."))},set:function(ee){},enumerable:!1,configurable:!0})}}function X(g,h,m){m===void 0&&(m={}),m.context||(m.context=g._context||m.context||E);for(var T in h)w(h[T],m)(g.prototype,T);return g}function Y(g){for(var h=0,m=0,T=0,z=g.length;T<z;T++)h=g.charCodeAt(T),h<128?m+=1:h<2048?m+=2:h<55296||h>=57344?m+=3:(T++,m+=4);return m}function $(g,h,m){for(var T=0,z=0,ee=m.length;z<ee;z++)T=m.charCodeAt(z),T<128?g[h++]=T:T<2048?(g[h++]=192|T>>6,g[h++]=128|T&63):T<55296||T>=57344?(g[h++]=224|T>>12,g[h++]=128|T>>6&63,g[h++]=128|T&63):(z++,T=65536+((T&1023)<<10|m.charCodeAt(z)&1023),g[h++]=240|T>>18,g[h++]=128|T>>12&63,g[h++]=128|T>>6&63,g[h++]=128|T&63)}function q(g,h){g.push(h&255)}function H(g,h){g.push(h&255)}function le(g,h){g.push(h&255),g.push(h>>8&255)}function ie(g,h){g.push(h&255),g.push(h>>8&255)}function Ee(g,h){g.push(h&255),g.push(h>>8&255),g.push(h>>16&255),g.push(h>>24&255)}function be(g,h){var m=h>>24,T=h>>16,z=h>>8,ee=h;g.push(ee&255),g.push(z&255),g.push(T&255),g.push(m&255)}function we(g,h){var m=Math.floor(h/Math.pow(2,32)),T=h>>>0;be(g,T),be(g,m)}function Ze(g,h){var m=h/Math.pow(2,32)>>0,T=h>>>0;be(g,T),be(g,m)}function Pt(g,h){Ke(g,h)}function At(g,h){ze(g,h)}var Q=new Int32Array(2),me=new Float32Array(Q.buffer),ge=new Float64Array(Q.buffer);function Ke(g,h){me[0]=h,Ee(g,Q[0])}function ze(g,h){ge[0]=h,Ee(g,Q[0]),Ee(g,Q[1])}function Xe(g,h){return H(g,h?1:0)}function Ut(g,h){h||(h="");var m=Y(h),T=0;if(m<32)g.push(m|160),T=1;else if(m<256)g.push(217),H(g,m),T=2;else if(m<65536)g.push(218),ie(g,m),T=3;else if(m<4294967296)g.push(219),be(g,m),T=5;else throw new Error("String too long");return $(g,g.length,h),T+m}function We(g,h){if(isNaN(h))return We(g,0);if(isFinite(h)){if(h!==(h|0))return g.push(203),ze(g,h),9}else return We(g,h>0?Number.MAX_SAFE_INTEGER:-Number.MAX_SAFE_INTEGER);return h>=0?h<128?(H(g,h),1):h<256?(g.push(204),H(g,h),2):h<65536?(g.push(205),ie(g,h),3):h<4294967296?(g.push(206),be(g,h),5):(g.push(207),Ze(g,h),9):h>=-32?(g.push(224|h+32),1):h>=-128?(g.push(208),q(g,h),2):h>=-32768?(g.push(209),le(g,h),3):h>=-2147483648?(g.push(210),Ee(g,h),5):(g.push(211),we(g,h),9)}var gt=Object.freeze({__proto__:null,boolean:Xe,float32:Pt,float64:At,int16:le,int32:Ee,int64:we,int8:q,number:We,string:Ut,uint16:ie,uint32:be,uint64:Ze,uint8:H,utf8Write:$,writeFloat32:Ke,writeFloat64:ze});function yt(g,h,m){for(var T="",z=0,ee=h,Ue=h+m;ee<Ue;ee++){var Pe=g[ee];if(!(Pe&128)){T+=String.fromCharCode(Pe);continue}if((Pe&224)===192){T+=String.fromCharCode((Pe&31)<<6|g[++ee]&63);continue}if((Pe&240)===224){T+=String.fromCharCode((Pe&15)<<12|(g[++ee]&63)<<6|(g[++ee]&63)<<0);continue}if((Pe&248)===240){z=(Pe&7)<<18|(g[++ee]&63)<<12|(g[++ee]&63)<<6|(g[++ee]&63)<<0,z>=65536?(z-=65536,T+=String.fromCharCode((z>>>10)+55296,(z&1023)+56320)):T+=String.fromCharCode(z);continue}console.error("Invalid byte "+Pe.toString(16))}return T}function Qe(g,h){return Rt(g,h)<<24>>24}function Rt(g,h){return g[h.offset++]}function U(g,h){return Dt(g,h)<<16>>16}function Dt(g,h){return g[h.offset++]|g[h.offset++]<<8}function ut(g,h){return g[h.offset++]|g[h.offset++]<<8|g[h.offset++]<<16|g[h.offset++]<<24}function _t(g,h){return ut(g,h)>>>0}function Le(g,h){return Re(g,h)}function R(g,h){return fe(g,h)}function M(g,h){var m=_t(g,h),T=ut(g,h)*Math.pow(2,32);return T+m}function k(g,h){var m=_t(g,h),T=_t(g,h)*Math.pow(2,32);return T+m}var J=new Int32Array(2),te=new Float32Array(J.buffer),Z=new Float64Array(J.buffer);function Re(g,h){return J[0]=ut(g,h),te[0]}function fe(g,h){return J[0]=ut(g,h),J[1]=ut(g,h),Z[0]}function ke(g,h){return Rt(g,h)>0}function Ve(g,h){var m=g[h.offset++],T;m<192?T=m&31:m===217?T=Rt(g,h):m===218?T=Dt(g,h):m===219&&(T=_t(g,h));var z=yt(g,h.offset,T);return h.offset+=T,z}function se(g,h){var m=g[h.offset];return m<192&&m>160||m===217||m===218||m===219}function ae(g,h){var m=g[h.offset++];if(m<128)return m;if(m===202)return Re(g,h);if(m===203)return fe(g,h);if(m===204)return Rt(g,h);if(m===205)return Dt(g,h);if(m===206)return _t(g,h);if(m===207)return k(g,h);if(m===208)return Qe(g,h);if(m===209)return U(g,h);if(m===210)return ut(g,h);if(m===211)return M(g,h);if(m>223)return(255-m+1)*-1}function Ie(g,h){var m=g[h.offset];return m<128||m>=202&&m<=211}function De(g,h){return g[h.offset]<160}function Te(g,h){return g[h.offset-1]===a&&(g[h.offset]<128||g[h.offset]>=202&&g[h.offset]<=211)}var et=Object.freeze({__proto__:null,arrayCheck:De,boolean:ke,float32:Le,float64:R,int16:U,int32:ut,int64:M,int8:Qe,number:ae,numberCheck:Ie,readFloat32:Re,readFloat64:fe,string:Ve,stringCheck:se,switchStructureCheck:Te,uint16:Dt,uint32:_t,uint64:k,uint8:Rt}),O=function(){function g(h){var m=this;this.$changes=new c(this),this.$items=new Map,this.$indexes=new Map,this.$refId=0,h&&h.forEach(function(T){return m.add(T)})}return g.prototype.onAdd=function(h,m){return m===void 0&&(m=!0),u(this.$callbacks||(this.$callbacks=[]),t.OPERATION.ADD,h,m?this.$items:void 0)},g.prototype.onRemove=function(h){return u(this.$callbacks||(this.$callbacks=[]),t.OPERATION.DELETE,h)},g.prototype.onChange=function(h){return u(this.$callbacks||(this.$callbacks=[]),t.OPERATION.REPLACE,h)},g.is=function(h){return h.collection!==void 0},g.prototype.add=function(h){var m=this.$refId++,T=h.$changes!==void 0;return T&&h.$changes.setParent(this,this.$changes.root,m),this.$changes.indexes[m]=m,this.$indexes.set(m,m),this.$items.set(m,h),this.$changes.change(m),m},g.prototype.at=function(h){var m=Array.from(this.$items.keys())[h];return this.$items.get(m)},g.prototype.entries=function(){return this.$items.entries()},g.prototype.delete=function(h){for(var m=this.$items.entries(),T,z;(z=m.next())&&!z.done;)if(h===z.value[1]){T=z.value[0];break}return T===void 0?!1:(this.$changes.delete(T),this.$indexes.delete(T),this.$items.delete(T))},g.prototype.clear=function(h){this.$changes.discard(!0,!0),this.$changes.indexes={},this.$indexes.clear(),h&&d.call(this,h),this.$items.clear(),this.$changes.operation({index:0,op:t.OPERATION.CLEAR}),this.$changes.touchParents()},g.prototype.has=function(h){return Array.from(this.$items.values()).some(function(m){return m===h})},g.prototype.forEach=function(h){var m=this;this.$items.forEach(function(T,z,ee){return h(T,z,m)})},g.prototype.values=function(){return this.$items.values()},Object.defineProperty(g.prototype,"size",{get:function(){return this.$items.size},enumerable:!1,configurable:!0}),g.prototype.setIndex=function(h,m){this.$indexes.set(h,m)},g.prototype.getIndex=function(h){return this.$indexes.get(h)},g.prototype.getByIndex=function(h){return this.$items.get(this.$indexes.get(h))},g.prototype.deleteByIndex=function(h){var m=this.$indexes.get(h);this.$items.delete(m),this.$indexes.delete(h)},g.prototype.toArray=function(){return Array.from(this.$items.values())},g.prototype.toJSON=function(){var h=[];return this.forEach(function(m,T){h.push(typeof m.toJSON=="function"?m.toJSON():m)}),h},g.prototype.clone=function(h){var m;return h?m=Object.assign(new g,this):(m=new g,this.forEach(function(T){T.$changes?m.add(T.clone()):m.add(T)})),m},g}(),de=function(){function g(h){var m=this;this.$changes=new c(this),this.$items=new Map,this.$indexes=new Map,this.$refId=0,h&&h.forEach(function(T){return m.add(T)})}return g.prototype.onAdd=function(h,m){return m===void 0&&(m=!0),u(this.$callbacks||(this.$callbacks=[]),t.OPERATION.ADD,h,m?this.$items:void 0)},g.prototype.onRemove=function(h){return u(this.$callbacks||(this.$callbacks=[]),t.OPERATION.DELETE,h)},g.prototype.onChange=function(h){return u(this.$callbacks||(this.$callbacks=[]),t.OPERATION.REPLACE,h)},g.is=function(h){return h.set!==void 0},g.prototype.add=function(h){var m,T;if(this.has(h))return!1;var z=this.$refId++;h.$changes!==void 0&&h.$changes.setParent(this,this.$changes.root,z);var ee=(T=(m=this.$changes.indexes[z])===null||m===void 0?void 0:m.op)!==null&&T!==void 0?T:t.OPERATION.ADD;return this.$changes.indexes[z]=z,this.$indexes.set(z,z),this.$items.set(z,h),this.$changes.change(z,ee),z},g.prototype.entries=function(){return this.$items.entries()},g.prototype.delete=function(h){for(var m=this.$items.entries(),T,z;(z=m.next())&&!z.done;)if(h===z.value[1]){T=z.value[0];break}return T===void 0?!1:(this.$changes.delete(T),this.$indexes.delete(T),this.$items.delete(T))},g.prototype.clear=function(h){this.$changes.discard(!0,!0),this.$changes.indexes={},this.$indexes.clear(),h&&d.call(this,h),this.$items.clear(),this.$changes.operation({index:0,op:t.OPERATION.CLEAR}),this.$changes.touchParents()},g.prototype.has=function(h){for(var m=this.$items.values(),T=!1,z;(z=m.next())&&!z.done;)if(h===z.value){T=!0;break}return T},g.prototype.forEach=function(h){var m=this;this.$items.forEach(function(T,z,ee){return h(T,z,m)})},g.prototype.values=function(){return this.$items.values()},Object.defineProperty(g.prototype,"size",{get:function(){return this.$items.size},enumerable:!1,configurable:!0}),g.prototype.setIndex=function(h,m){this.$indexes.set(h,m)},g.prototype.getIndex=function(h){return this.$indexes.get(h)},g.prototype.getByIndex=function(h){return this.$items.get(this.$indexes.get(h))},g.prototype.deleteByIndex=function(h){var m=this.$indexes.get(h);this.$items.delete(m),this.$indexes.delete(h)},g.prototype.toArray=function(){return Array.from(this.$items.values())},g.prototype.toJSON=function(){var h=[];return this.forEach(function(m,T){h.push(typeof m.toJSON=="function"?m.toJSON():m)}),h},g.prototype.clone=function(h){var m;return h?m=Object.assign(new g,this):(m=new g,this.forEach(function(T){T.$changes?m.add(T.clone()):m.add(T)})),m},g}(),ce=function(){function g(){this.refIds=new WeakSet,this.containerIndexes=new WeakMap}return g.prototype.addRefId=function(h){this.refIds.has(h)||(this.refIds.add(h),this.containerIndexes.set(h,new Set))},g.get=function(h){return h.$filterState===void 0&&(h.$filterState=new g),h.$filterState},g}(),Ae=function(){function g(){this.refs=new Map,this.refCounts={},this.deletedRefs=new Set,this.nextUniqueId=0}return g.prototype.getNextUniqueId=function(){return this.nextUniqueId++},g.prototype.addRef=function(h,m,T){T===void 0&&(T=!0),this.refs.set(h,m),T&&(this.refCounts[h]=(this.refCounts[h]||0)+1)},g.prototype.removeRef=function(h){var m=this.refCounts[h];if(m===void 0){console.warn("trying to remove reference ".concat(h," that doesn't exist"));return}if(m===0){console.warn("trying to remove reference ".concat(h," with 0 refCount"));return}this.refCounts[h]=m-1,this.deletedRefs.add(h)},g.prototype.clearRefs=function(){this.refs.clear(),this.deletedRefs.clear(),this.refCounts={}},g.prototype.garbageCollectDeletedRefs=function(){var h=this;this.deletedRefs.forEach(function(m){if(!(h.refCounts[m]>0)){var T=h.refs.get(m);if(T instanceof tt)for(var z in T._definition.schema)typeof T._definition.schema[z]!="string"&&T[z]&&T[z].$changes&&h.removeRef(T[z].$changes.refId);else{var ee=T.$changes.parent._definition,Ue=ee.schema[ee.fieldsByIndex[T.$changes.parentIndex]];typeof Object.values(Ue)[0]=="function"&&Array.from(T.values()).forEach(function(Pe){return h.removeRef(Pe.$changes.refId)})}h.refs.delete(m),delete h.refCounts[m]}}),this.deletedRefs.clear()},g}(),re=function(g){r(h,g);function h(){return g!==null&&g.apply(this,arguments)||this}return h}(Error);function K(g,h,m,T){var z,ee=!1;switch(h){case"number":case"int8":case"uint8":case"int16":case"uint16":case"int32":case"uint32":case"int64":case"uint64":case"float32":case"float64":z="number",isNaN(g)&&console.log('trying to encode "NaN" in '.concat(m.constructor.name,"#").concat(T));break;case"string":z="string",ee=!0;break;case"boolean":return}if(typeof g!==z&&(!ee||ee&&g!==null)){var Ue="'".concat(JSON.stringify(g),"'").concat(g&&g.constructor&&" (".concat(g.constructor.name,")")||"");throw new re("a '".concat(z,"' was expected, but ").concat(Ue," was provided in ").concat(m.constructor.name,"#").concat(T))}}function Ce(g,h,m,T){if(!(g instanceof h))throw new re("a '".concat(h.name,"' was expected, but '").concat(g.constructor.name,"' was provided in ").concat(m.constructor.name,"#").concat(T))}function Ye(g,h,m,T,z){K(m,g,T,z);var ee=gt[g];if(ee)ee(h,m);else throw new re("a '".concat(g,"' was expected, but ").concat(m," was provided in ").concat(T.constructor.name,"#").concat(z))}function Tt(g,h,m){return et[g](h,m)}var tt=function(){function g(){for(var h=[],m=0;m<arguments.length;m++)h[m]=arguments[m];Object.defineProperties(this,{$changes:{value:new c(this,void 0,new Ae),enumerable:!1,writable:!0},$callbacks:{value:void 0,enumerable:!1,writable:!0}});var T=this._definition.descriptors;T&&Object.defineProperties(this,T),h[0]&&this.assign(h[0])}return g.onError=function(h){console.error(h)},g.is=function(h){return h._definition&&h._definition.schema!==void 0},g.prototype.onChange=function(h){return u(this.$callbacks||(this.$callbacks={}),t.OPERATION.REPLACE,h)},g.prototype.onRemove=function(h){return u(this.$callbacks||(this.$callbacks={}),t.OPERATION.DELETE,h)},g.prototype.assign=function(h){return Object.assign(this,h),this},Object.defineProperty(g.prototype,"_definition",{get:function(){return this.constructor._definition},enumerable:!1,configurable:!0}),g.prototype.setDirty=function(h,m){this.$changes.change(h,m)},g.prototype.listen=function(h,m,T){var z=this;return T===void 0&&(T=!0),this.$callbacks||(this.$callbacks={}),this.$callbacks[h]||(this.$callbacks[h]=[]),this.$callbacks[h].push(m),T&&this[h]!==void 0&&m(this[h],void 0),function(){return f(z.$callbacks[h],z.$callbacks[h].indexOf(m))}},g.prototype.decode=function(h,m,T){m===void 0&&(m={offset:0}),T===void 0&&(T=this);var z=[],ee=this.$changes.root,Ue=h.length,Pe=0;for(ee.refs.set(Pe,this);m.offset<Ue;){var it=h[m.offset++];if(it==a){Pe=ae(h,m);var rt=ee.refs.get(Pe);if(!rt)throw new Error('"refId" not found: '.concat(Pe));T=rt;continue}var Fe=T.$changes,lt=T._definition!==void 0,Be=lt?it>>6<<6:it;if(Be===t.OPERATION.CLEAR){T.clear(z);continue}var st=lt?it%(Be||255):ae(h,m),qe=lt?T._definition.fieldsByIndex[st]:"",Je=Fe.getType(st),ue=void 0,S=void 0,N=void 0;if(lt?S=T["_".concat(qe)]:(S=T.getByIndex(st),(Be&t.OPERATION.ADD)===t.OPERATION.ADD?(N=T instanceof p?Ve(h,m):st,T.setIndex(st,N)):N=T.getIndex(st)),(Be&t.OPERATION.DELETE)===t.OPERATION.DELETE&&(Be!==t.OPERATION.DELETE_AND_ADD&&T.deleteByIndex(st),S&&S.$changes&&ee.removeRef(S.$changes.refId),ue=null),qe===void 0){console.warn("@colyseus/schema: definition mismatch");for(var W={offset:m.offset};m.offset<Ue&&!(Te(h,m)&&(W.offset=m.offset+1,ee.refs.has(ae(h,W))));)m.offset++;continue}else if(Be!==t.OPERATION.DELETE)if(g.is(Je)){var F=ae(h,m);if(ue=ee.refs.get(F),Be!==t.OPERATION.REPLACE){var B=this.getSchemaType(h,m,Je);ue||(ue=this.createTypeInstance(B),ue.$changes.refId=F,S&&(ue.$callbacks=S.$callbacks,S.$changes.refId&&F!==S.$changes.refId&&ee.removeRef(S.$changes.refId))),ee.addRef(F,ue,ue!==S)}}else if(typeof Je=="string")ue=Tt(Je,h,m);else{var _e=A(Object.keys(Je)[0]),Se=ae(h,m),pe=ee.refs.has(Se)?S||ee.refs.get(Se):new _e.constructor;if(ue=pe.clone(!0),ue.$changes.refId=Se,S&&(ue.$callbacks=S.$callbacks,S.$changes.refId&&Se!==S.$changes.refId)){ee.removeRef(S.$changes.refId);for(var ve=S.entries(),xe=void 0;(xe=ve.next())&&!xe.done;){var $e=xe.value,Ge=$e[0],Oe=$e[1];z.push({refId:Se,op:t.OPERATION.DELETE,field:Ge,value:void 0,previousValue:Oe})}}ee.addRef(Se,ue,pe!==S)}if(ue!=null){if(ue.$changes&&ue.$changes.setParent(Fe.ref,Fe.root,st),T instanceof g)T[qe]=ue;else if(T instanceof p){var Ge=N;T.$items.set(Ge,ue),T.$changes.allChanges.add(st)}else if(T instanceof y)T.setAt(st,ue);else if(T instanceof O){var ft=T.add(ue);T.setIndex(st,ft)}else if(T instanceof de){var ft=T.add(ue);ft!==!1&&T.setIndex(st,ft)}}S!==ue&&z.push({refId:Pe,op:Be,field:qe,dynamicIndex:N,value:ue,previousValue:S})}return this._triggerChanges(z),ee.garbageCollectDeletedRefs(),z},g.prototype.encode=function(h,m,T){h===void 0&&(h=!1),m===void 0&&(m=[]),T===void 0&&(T=!1);for(var z=this.$changes,ee=new WeakSet,Ue=[z],Pe=1,it=0;it<Pe;it++){var rt=Ue[it],Fe=rt.ref,lt=Fe instanceof g;rt.ensureRefId(),ee.add(rt),rt!==z&&(rt.changed||h)&&(H(m,a),We(m,rt.refId));for(var Be=h?Array.from(rt.allChanges):Array.from(rt.changes.values()),st=0,qe=Be.length;st<qe;st++){var Je=h?{op:t.OPERATION.ADD,index:Be[st]}:Be[st],ue=Je.index,S=lt?Fe._definition.fieldsByIndex&&Fe._definition.fieldsByIndex[ue]:ue,N=m.length;if(Je.op!==t.OPERATION.TOUCH)if(lt)H(m,ue|Je.op);else{if(H(m,Je.op),Je.op===t.OPERATION.CLEAR)continue;We(m,ue)}if(!lt&&(Je.op&t.OPERATION.ADD)==t.OPERATION.ADD&&Fe instanceof p){var W=rt.ref.$indexes.get(ue);Ut(m,W)}if(Je.op!==t.OPERATION.DELETE){var F=rt.getType(ue),B=rt.getValue(ue);if(B&&B.$changes&&!ee.has(B.$changes)&&(Ue.push(B.$changes),B.$changes.ensureRefId(),Pe++),Je.op!==t.OPERATION.TOUCH){if(g.is(F))Ce(B,F,Fe,S),We(m,B.$changes.refId),(Je.op&t.OPERATION.ADD)===t.OPERATION.ADD&&this.tryEncodeTypeId(m,F,B.constructor);else if(typeof F=="string")Ye(F,m,B,Fe,S);else{var _e=A(Object.keys(F)[0]);Ce(Fe["_".concat(S)],_e.constructor,Fe,S),We(m,B.$changes.refId)}T&&rt.cache(ue,m.slice(N))}}}!h&&!T&&rt.discard()}return m},g.prototype.encodeAll=function(h){return this.encode(!0,[],h)},g.prototype.applyFilters=function(h,m){var T,z;m===void 0&&(m=!1);for(var ee=this,Ue=new Set,Pe=ce.get(h),it=[this.$changes],rt=1,Fe=[],lt=function(st){var qe=it[st];if(Ue.has(qe.refId))return"continue";var Je=qe.ref,ue=Je instanceof g;H(Fe,a),We(Fe,qe.refId);var S=Pe.refIds.has(qe),N=m||!S;Pe.addRefId(qe);var W=Pe.containerIndexes.get(qe),F=N?Array.from(qe.allChanges):Array.from(qe.changes.values());if(!m&&ue&&Je._definition.indexesWithFilters){var B=Je._definition.indexesWithFilters;B.forEach(function(It){!W.has(It)&&qe.allChanges.has(It)&&(N?F.push(It):F.push({op:t.OPERATION.ADD,index:It}))})}for(var _e=0,Se=F.length;_e<Se;_e++){var pe=N?{op:t.OPERATION.ADD,index:F[_e]}:F[_e];if(pe.op===t.OPERATION.CLEAR){H(Fe,pe.op);continue}var ve=pe.index;if(pe.op===t.OPERATION.DELETE){ue?H(Fe,pe.op|ve):(H(Fe,pe.op),We(Fe,ve));continue}var xe=qe.getValue(ve),$e=qe.getType(ve);if(ue){var Ge=Je._definition.filters&&Je._definition.filters[ve];if(Ge&&!Ge.call(Je,h,xe,ee)){xe&&xe.$changes&&Ue.add(xe.$changes.refId);continue}}else{var Oe=qe.parent,Ge=qe.getChildrenFilter();if(Ge&&!Ge.call(Oe,h,Je.$indexes.get(ve),xe,ee)){xe&&xe.$changes&&Ue.add(xe.$changes.refId);continue}}if(xe.$changes&&(it.push(xe.$changes),rt++),pe.op!==t.OPERATION.TOUCH)if(pe.op===t.OPERATION.ADD||ue)Fe.push.apply(Fe,(T=qe.caches[ve])!==null&&T!==void 0?T:[]),W.add(ve);else if(W.has(ve))Fe.push.apply(Fe,(z=qe.caches[ve])!==null&&z!==void 0?z:[]);else{if(W.add(ve),H(Fe,t.OPERATION.ADD),We(Fe,ve),Je instanceof p){var ft=qe.ref.$indexes.get(ve);Ut(Fe,ft)}xe.$changes?We(Fe,xe.$changes.refId):gt[$e](Fe,xe)}else if(xe.$changes&&!ue){if(H(Fe,t.OPERATION.ADD),We(Fe,ve),Je instanceof p){var ft=qe.ref.$indexes.get(ve);Ut(Fe,ft)}We(Fe,xe.$changes.refId)}}},Be=0;Be<rt;Be++)lt(Be);return Fe},g.prototype.clone=function(){var h,m=new this.constructor,T=this._definition.schema;for(var z in T)typeof this[z]=="object"&&typeof((h=this[z])===null||h===void 0?void 0:h.clone)=="function"?m[z]=this[z].clone():m[z]=this[z];return m},g.prototype.toJSON=function(){var h=this._definition.schema,m=this._definition.deprecated,T={};for(var z in h)!m[z]&&this[z]!==null&&typeof this[z]<"u"&&(T[z]=typeof this[z].toJSON=="function"?this[z].toJSON():this["_".concat(z)]);return T},g.prototype.discardAllChanges=function(){this.$changes.discardAll()},g.prototype.getByIndex=function(h){return this[this._definition.fieldsByIndex[h]]},g.prototype.deleteByIndex=function(h){this[this._definition.fieldsByIndex[h]]=void 0},g.prototype.tryEncodeTypeId=function(h,m,T){m._typeid!==T._typeid&&(H(h,l),We(h,T._typeid))},g.prototype.getSchemaType=function(h,m,T){var z;return h[m.offset]===l&&(m.offset++,z=this.constructor._context.get(ae(h,m))),z||T},g.prototype.createTypeInstance=function(h){var m=new h;return m.$changes.root=this.$changes.root,m},g.prototype._triggerChanges=function(h){for(var m,T,z,ee,Ue,Pe,it,rt,Fe,lt=new Set,Be=this.$changes.root.refs,st=function(Je){var ue=h[Je],S=ue.refId,N=Be.get(S),W=N.$callbacks;if((ue.op&t.OPERATION.DELETE)===t.OPERATION.DELETE&&ue.previousValue instanceof g&&((T=(m=ue.previousValue.$callbacks)===null||m===void 0?void 0:m[t.OPERATION.DELETE])===null||T===void 0||T.forEach(function(F){return F()})),!W)return"continue";if(N instanceof g){if(!lt.has(S))try{(z=W==null?void 0:W[t.OPERATION.REPLACE])===null||z===void 0||z.forEach(function(F){return F()})}catch(F){g.onError(F)}try{W.hasOwnProperty(ue.field)&&((ee=W[ue.field])===null||ee===void 0||ee.forEach(function(F){return F(ue.value,ue.previousValue)}))}catch(F){g.onError(F)}}else ue.op===t.OPERATION.ADD&&ue.previousValue===void 0?(Ue=W[t.OPERATION.ADD])===null||Ue===void 0||Ue.forEach(function(F){var B;return F(ue.value,(B=ue.dynamicIndex)!==null&&B!==void 0?B:ue.field)}):ue.op===t.OPERATION.DELETE?ue.previousValue!==void 0&&((Pe=W[t.OPERATION.DELETE])===null||Pe===void 0||Pe.forEach(function(F){var B;return F(ue.previousValue,(B=ue.dynamicIndex)!==null&&B!==void 0?B:ue.field)})):ue.op===t.OPERATION.DELETE_AND_ADD&&(ue.previousValue!==void 0&&((it=W[t.OPERATION.DELETE])===null||it===void 0||it.forEach(function(F){var B;return F(ue.previousValue,(B=ue.dynamicIndex)!==null&&B!==void 0?B:ue.field)})),(rt=W[t.OPERATION.ADD])===null||rt===void 0||rt.forEach(function(F){var B;return F(ue.value,(B=ue.dynamicIndex)!==null&&B!==void 0?B:ue.field)})),ue.value!==ue.previousValue&&((Fe=W[t.OPERATION.REPLACE])===null||Fe===void 0||Fe.forEach(function(F){var B;return F(ue.value,(B=ue.dynamicIndex)!==null&&B!==void 0?B:ue.field)}));lt.add(S)},qe=0;qe<h.length;qe++)st(qe)},g._definition=I.create(),g}();function vn(g){for(var h=[g.$changes],m=1,T={},z=T,ee=function(Pe){var it=h[Pe];it.changes.forEach(function(rt){var Fe=it.ref,lt=rt.index,Be=Fe._definition?Fe._definition.fieldsByIndex[lt]:Fe.$indexes.get(lt);z[Be]=it.getValue(lt)})},Ue=0;Ue<m;Ue++)ee(Ue);return T}var Yt={context:new L},Ii=function(g){r(h,g);function h(){return g!==null&&g.apply(this,arguments)||this}return s([w("string",Yt)],h.prototype,"name",void 0),s([w("string",Yt)],h.prototype,"type",void 0),s([w("number",Yt)],h.prototype,"referencedType",void 0),h}(tt),fi=function(g){r(h,g);function h(){var m=g!==null&&g.apply(this,arguments)||this;return m.fields=new y,m}return s([w("number",Yt)],h.prototype,"id",void 0),s([w([Ii],Yt)],h.prototype,"fields",void 0),h}(tt),Xs=function(g){r(h,g);function h(){var m=g!==null&&g.apply(this,arguments)||this;return m.types=new y,m}return h.encode=function(m){var T,z=m.constructor,ee=new h;ee.rootType=z._typeid;var Ue=function(Fe,lt){for(var Be in lt){var st=new Ii;st.name=Be;var qe=void 0;if(typeof lt[Be]=="string")qe=lt[Be];else{var Je=lt[Be],ue=void 0;tt.is(Je)?(qe="ref",ue=lt[Be]):(qe=Object.keys(Je)[0],typeof Je[qe]=="string"?qe+=":"+Je[qe]:ue=Je[qe]),st.referencedType=ue?ue._typeid:-1}st.type=qe,Fe.fields.push(st)}ee.types.push(Fe)},Pe=(T=z._context)===null||T===void 0?void 0:T.types;for(var it in Pe){var rt=new fi;rt.id=Number(it),Ue(rt,Pe[it]._definition.schema)}return ee.encodeAll()},h.decode=function(m,T){var z=new L,ee=new h;ee.decode(m,T);var Ue=ee.types.reduce(function(lt,Be){var st=function(Je){r(ue,Je);function ue(){return Je!==null&&Je.apply(this,arguments)||this}return ue}(tt),qe=Be.id;return lt[qe]=st,z.add(st,qe),lt},{});ee.types.forEach(function(lt){var Be=Ue[lt.id];lt.fields.forEach(function(st){var qe;if(st.referencedType!==void 0){var Je=st.type,ue=Ue[st.referencedType];if(!ue){var S=st.type.split(":");Je=S[0],ue=S[1]}Je==="ref"?w(ue,{context:z})(Be.prototype,st.name):w((qe={},qe[Je]=ue,qe),{context:z})(Be.prototype,st.name)}else w(st.type,{context:z})(Be.prototype,st.name)})});var Pe=Ue[ee.rootType],it=new Pe;for(var rt in Pe._definition.schema){var Fe=Pe._definition.schema[rt];typeof Fe!="string"&&(it[rt]=typeof Fe=="function"?new Fe:new(A(Object.keys(Fe)[0])).constructor)}return it},s([w([fi],Yt)],h.prototype,"types",void 0),s([w("number",Yt)],h.prototype,"rootType",void 0),h}(tt);C("map",{constructor:p}),C("array",{constructor:y}),C("set",{constructor:de}),C("collection",{constructor:O}),t.ArraySchema=y,t.CollectionSchema=O,t.Context=L,t.MapSchema=p,t.Reflection=Xs,t.ReflectionField=Ii,t.ReflectionType=fi,t.Schema=tt,t.SchemaDefinition=I,t.SetSchema=de,t.decode=et,t.defineTypes=X,t.deprecated=V,t.dumpChanges=vn,t.encode=gt,t.filter=j,t.filterChildren=D,t.hasFilter=P,t.registerType=C,t.type=w})})(Ca,Ca.exports);var ch=Ca.exports,e_=Ot&&Ot.__createBinding||(Object.create?function(i,e,t,n){n===void 0&&(n=t);var r=Object.getOwnPropertyDescriptor(e,t);(!r||("get"in r?!e.__esModule:r.writable||r.configurable))&&(r={enumerable:!0,get:function(){return e[t]}}),Object.defineProperty(i,n,r)}:function(i,e,t,n){n===void 0&&(n=t),i[n]=e[t]}),t_=Ot&&Ot.__setModuleDefault||(Object.create?function(i,e){Object.defineProperty(i,"default",{enumerable:!0,value:e})}:function(i,e){i.default=e}),n_=Ot&&Ot.__importStar||function(i){if(i&&i.__esModule)return i;var e={};if(i!=null)for(var t in i)t!=="default"&&Object.prototype.hasOwnProperty.call(i,t)&&e_(e,i,t);return t_(e,i),e};Object.defineProperty(Nr,"__esModule",{value:!0});Nr.Room=void 0;const mc=n_(rr),i_=Bs,Qt=Ka,gc=Pi,r_=Fr,fs=sr,dn=ch,_c=Fs;class Za{constructor(e,t){this.onStateChange=(0,fs.createSignal)(),this.onError=(0,fs.createSignal)(),this.onLeave=(0,fs.createSignal)(),this.onJoin=(0,fs.createSignal)(),this.hasJoined=!1,this.onMessageHandlers=(0,r_.createNanoEvents)(),this.roomId=null,this.name=e,t&&(this.serializer=new((0,gc.getSerializer)("schema")),this.rootSchema=t,this.serializer.state=new t),this.onError((n,r)=>{var s;return(s=console.warn)===null||s===void 0?void 0:s.call(console,`colyseus.js - onError => (${n}) ${r}`)}),this.onLeave(()=>this.removeAllListeners())}get id(){return this.roomId}connect(e,t,n=this,r){const s=new i_.Connection;n.connection=s,s.events.onmessage=Za.prototype.onMessageCallback.bind(n),s.events.onclose=function(o){var a;if(!n.hasJoined){(a=console.warn)===null||a===void 0||a.call(console,`Room connection was closed unexpectedly (${o.code}): ${o.reason}`),n.onError.invoke(o.code,o.reason);return}o.code===_c.CloseCode.DEVMODE_RESTART&&t?t():(n.onLeave.invoke(o.code,o.reason),n.destroy())},s.events.onerror=function(o){var a;(a=console.warn)===null||a===void 0||a.call(console,`Room, onError (${o.code}): ${o.reason}`),n.onError.invoke(o.code,o.reason)},s.connect(e,r)}leave(e=!0){return new Promise(t=>{this.onLeave(n=>t(n)),this.connection?e?this.connection.send([Qt.Protocol.LEAVE_ROOM]):this.connection.close():this.onLeave.invoke(_c.CloseCode.CONSENTED)})}onMessage(e,t){return this.onMessageHandlers.on(this.getMessageHandlerKey(e),t)}send(e,t){const n=[Qt.Protocol.ROOM_DATA];typeof e=="string"?dn.encode.string(n,e):dn.encode.number(n,e);let r;if(t!==void 0){const s=mc.encode(t);r=new Uint8Array(n.length+s.byteLength),r.set(new Uint8Array(n),0),r.set(new Uint8Array(s),n.length)}else r=new Uint8Array(n);this.connection.send(r.buffer)}sendBytes(e,t){const n=[Qt.Protocol.ROOM_DATA_BYTES];typeof e=="string"?dn.encode.string(n,e):dn.encode.number(n,e);let r;r=new Uint8Array(n.length+(t.byteLength||t.length)),r.set(new Uint8Array(n),0),r.set(new Uint8Array(t),n.length),this.connection.send(r.buffer)}get state(){return this.serializer.getState()}removeAllListeners(){this.onJoin.clear(),this.onStateChange.clear(),this.onError.clear(),this.onLeave.clear(),this.onMessageHandlers.events={}}onMessageCallback(e){const t=Array.from(new Uint8Array(e.data)),n=t[0];if(n===Qt.Protocol.JOIN_ROOM){let r=1;const s=(0,Qt.utf8Read)(t,r);if(r+=(0,Qt.utf8Length)(s),this.serializerId=(0,Qt.utf8Read)(t,r),r+=(0,Qt.utf8Length)(this.serializerId),!this.serializer){const o=(0,gc.getSerializer)(this.serializerId);this.serializer=new o}t.length>r&&this.serializer.handshake&&this.serializer.handshake(t,{offset:r}),this.reconnectionToken=`${this.roomId}:${s}`,this.hasJoined=!0,this.onJoin.invoke(),this.connection.send([Qt.Protocol.JOIN_ROOM])}else if(n===Qt.Protocol.ERROR){const r={offset:1},s=dn.decode.number(t,r),o=dn.decode.string(t,r);this.onError.invoke(s,o)}else if(n===Qt.Protocol.LEAVE_ROOM)this.leave();else if(n===Qt.Protocol.ROOM_DATA_SCHEMA){const r={offset:1},o=this.serializer.getState().constructor._context.get(dn.decode.number(t,r)),a=new o;a.decode(t,r),this.dispatchMessage(o,a)}else if(n===Qt.Protocol.ROOM_STATE)t.shift(),this.setState(t);else if(n===Qt.Protocol.ROOM_STATE_PATCH)t.shift(),this.patch(t);else if(n===Qt.Protocol.ROOM_DATA){const r={offset:1},s=dn.decode.stringCheck(t,r)?dn.decode.string(t,r):dn.decode.number(t,r),o=t.length>r.offset?mc.decode(e.data,r.offset):void 0;this.dispatchMessage(s,o)}else if(n===Qt.Protocol.ROOM_DATA_BYTES){const r={offset:1},s=dn.decode.stringCheck(t,r)?dn.decode.string(t,r):dn.decode.number(t,r);this.dispatchMessage(s,new Uint8Array(t.slice(r.offset)))}}setState(e){this.serializer.setState(e),this.onStateChange.invoke(this.serializer.getState())}patch(e){this.serializer.patch(e),this.onStateChange.invoke(this.serializer.getState())}dispatchMessage(e,t){var n;const r=this.getMessageHandlerKey(e);this.onMessageHandlers.events[r]?this.onMessageHandlers.emit(r,t):this.onMessageHandlers.events["*"]?this.onMessageHandlers.emit("*",e,t):(n=console.warn)===null||n===void 0||n.call(console,`colyseus.js: onMessage() not registered for type '${e}'.`)}destroy(){this.serializer&&this.serializer.teardown()}getMessageHandlerKey(e){switch(typeof e){case"function":return`$${e._typeid}`;case"string":return e;case"number":return`i${e}`;default:throw new Error("invalid message type.")}}}Nr.Room=Za;var zs={};function vc(i,e){e.headers=i.headers||{},e.statusMessage=i.statusText,e.statusCode=i.status,e.data=i.response}function bn(i,e,t){return new Promise(function(n,r){t=t||{};var s=new XMLHttpRequest,o,a,l,c=t.body,u=t.headers||{};t.timeout&&(s.timeout=t.timeout),s.ontimeout=s.onerror=function(d){d.timeout=d.type=="timeout",r(d)},s.open(i,e.href||e),s.onload=function(){for(l=s.getAllResponseHeaders().trim().split(/[\r\n]+/),vc(s,s);a=l.shift();)a=a.split(": "),s.headers[a.shift().toLowerCase()]=a.join(": ");if(a=s.headers["content-type"],a&&~a.indexOf("application/json"))try{s.data=JSON.parse(s.data,t.reviver)}catch(d){return vc(s,d),r(d)}(s.status>=400?r:n)(s)},typeof FormData<"u"&&c instanceof FormData||c&&typeof c=="object"&&(u["content-type"]="application/json",c=JSON.stringify(c)),s.withCredentials=!!t.withCredentials;for(o in u)s.setRequestHeader(o,u[o]);s.send(c)})}var s_=bn.bind(bn,"GET"),o_=bn.bind(bn,"POST"),a_=bn.bind(bn,"PATCH"),l_=bn.bind(bn,"DELETE"),c_=bn.bind(bn,"PUT");const h_=Object.freeze(Object.defineProperty({__proto__:null,del:l_,get:s_,patch:a_,post:o_,put:c_,send:bn},Symbol.toStringTag,{value:"Module"})),u_=N0(h_);var f_=Ot&&Ot.__createBinding||(Object.create?function(i,e,t,n){n===void 0&&(n=t);var r=Object.getOwnPropertyDescriptor(e,t);(!r||("get"in r?!e.__esModule:r.writable||r.configurable))&&(r={enumerable:!0,get:function(){return e[t]}}),Object.defineProperty(i,n,r)}:function(i,e,t,n){n===void 0&&(n=t),i[n]=e[t]}),d_=Ot&&Ot.__setModuleDefault||(Object.create?function(i,e){Object.defineProperty(i,"default",{enumerable:!0,value:e})}:function(i,e){i.default=e}),p_=Ot&&Ot.__importStar||function(i){if(i&&i.__esModule)return i;var e={};if(i!=null)for(var t in i)t!=="default"&&Object.prototype.hasOwnProperty.call(i,t)&&f_(e,i,t);return d_(e,i),e};Object.defineProperty(zs,"__esModule",{value:!0});zs.HTTP=void 0;const m_=Fs,g_=p_(u_);class __{constructor(e,t={}){this.client=e,this.headers=t}get(e,t={}){return this.request("get",e,t)}post(e,t={}){return this.request("post",e,t)}del(e,t={}){return this.request("del",e,t)}put(e,t={}){return this.request("put",e,t)}request(e,t,n={}){return g_[e](this.client.getHttpEndpoint(t),this.getOptions(n)).catch(r=>{var s;const o=r.statusCode,a=((s=r.data)===null||s===void 0?void 0:s.error)||r.statusMessage||r.message;throw!o&&!a?r:new m_.ServerError(o,a)})}getOptions(e){return e.headers=Object.assign({},this.headers,e.headers),this.authToken&&(e.headers.Authorization=`Bearer ${this.authToken}`),typeof cc<"u"&&cc.sys&&cc.sys.isNative||(e.withCredentials=!0),e}}zs.HTTP=__;var Br={},hi={};Object.defineProperty(hi,"__esModule",{value:!0});hi.getItem=hi.removeItem=hi.setItem=void 0;let yr;function Ja(){if(!yr)try{yr=typeof cc<"u"&&cc.sys&&cc.sys.localStorage?cc.sys.localStorage:window.localStorage}catch{}return yr||(yr={cache:{},setItem:function(i,e){this.cache[i]=e},getItem:function(i){this.cache[i]},removeItem:function(i){delete this.cache[i]}}),yr}function v_(i,e){Ja().setItem(i,e)}hi.setItem=v_;function x_(i){Ja().removeItem(i)}hi.removeItem=x_;function M_(i,e){const t=Ja().getItem(i);typeof Promise>"u"||!(t instanceof Promise)?e(t):t.then(n=>e(n))}hi.getItem=M_;var Si=Ot&&Ot.__awaiter||function(i,e,t,n){function r(s){return s instanceof t?s:new t(function(o){o(s)})}return new(t||(t=Promise))(function(s,o){function a(u){try{c(n.next(u))}catch(d){o(d)}}function l(u){try{c(n.throw(u))}catch(d){o(d)}}function c(u){u.done?s(u.value):r(u.value).then(a,l)}c((n=n.apply(i,e||[])).next())})},qi=Ot&&Ot.__classPrivateFieldGet||function(i,e,t,n){if(t==="a"&&!n)throw new TypeError("Private accessor was defined without a getter");if(typeof e=="function"?i!==e||!n:!e.has(i))throw new TypeError("Cannot read private member from an object whose class did not declare it");return t==="m"?n:t==="a"?n.call(i):n?n.value:e.get(i)},Er=Ot&&Ot.__classPrivateFieldSet||function(i,e,t,n,r){if(n==="m")throw new TypeError("Private method is not writable");if(n==="a"&&!r)throw new TypeError("Private accessor was defined without a setter");if(typeof e=="function"?i!==e||!r:!e.has(i))throw new TypeError("Cannot write private member to an object whose class did not declare it");return n==="a"?r.call(i,t):r?r.value=t:e.set(i,t),t},vs,Pa,oi,xs;Object.defineProperty(Br,"__esModule",{value:!0});Br.Auth=void 0;const Lo=hi,S_=Fr;class y_{constructor(e){this.http=e,this.settings={path:"/auth",key:"colyseus-auth-token"},vs.set(this,!1),Pa.set(this,void 0),oi.set(this,void 0),xs.set(this,(0,S_.createNanoEvents)()),(0,Lo.getItem)(this.settings.key,t=>this.token=t)}set token(e){this.http.authToken=e}get token(){return this.http.authToken}onChange(e){const t=qi(this,xs,"f").on("change",e);return qi(this,vs,"f")||Er(this,Pa,new Promise((n,r)=>{this.getUserData().then(s=>{this.emitChange(Object.assign(Object.assign({},s),{token:this.token}))}).catch(s=>{this.emitChange({user:null,token:void 0})}).finally(()=>{n()})}),"f"),Er(this,vs,!0,"f"),t}getUserData(){return Si(this,void 0,void 0,function*(){if(this.token)return(yield this.http.get(`${this.settings.path}/userdata`)).data;throw new Error("missing auth.token")})}registerWithEmailAndPassword(e,t,n){return Si(this,void 0,void 0,function*(){const r=(yield this.http.post(`${this.settings.path}/register`,{body:{email:e,password:t,options:n}})).data;return this.emitChange(r),r})}signInWithEmailAndPassword(e,t){return Si(this,void 0,void 0,function*(){const n=(yield this.http.post(`${this.settings.path}/login`,{body:{email:e,password:t}})).data;return this.emitChange(n),n})}signInAnonymously(e){return Si(this,void 0,void 0,function*(){const t=(yield this.http.post(`${this.settings.path}/anonymous`,{body:{options:e}})).data;return this.emitChange(t),t})}sendPasswordResetEmail(e){return Si(this,void 0,void 0,function*(){return(yield this.http.post(`${this.settings.path}/forgot-password`,{body:{email:e}})).data})}signInWithProvider(e,t={}){return Si(this,void 0,void 0,function*(){return new Promise((n,r)=>{const s=t.width||480,o=t.height||768,a=this.token?`?token=${this.token}`:"",l=`Login with ${e[0].toUpperCase()+e.substring(1)}`,c=this.http.client.getHttpEndpoint(`${t.prefix||`${this.settings.path}/provider`}/${e}${a}`),u=screen.width/2-s/2,d=screen.height/2-o/2;Er(this,oi,window.open(c,l,"toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width="+s+", height="+o+", top="+d+", left="+u),"f");const f=x=>{x.data.user===void 0&&x.data.token===void 0||(clearInterval(_),qi(this,oi,"f").close(),Er(this,oi,void 0,"f"),window.removeEventListener("message",f),x.data.error!==void 0?r(x.data.error):(n(x.data),this.emitChange(x.data)))},_=setInterval(()=>{(!qi(this,oi,"f")||qi(this,oi,"f").closed)&&(Er(this,oi,void 0,"f"),r("cancelled"),window.removeEventListener("message",f))},200);window.addEventListener("message",f)})})}signOut(){return Si(this,void 0,void 0,function*(){this.emitChange({user:null,token:null})})}emitChange(e){e.token!==void 0&&(this.token=e.token,e.token===null?(0,Lo.removeItem)(this.settings.key):(0,Lo.setItem)(this.settings.key,e.token)),qi(this,xs,"f").emit("change",e)}}Br.Auth=y_;vs=new WeakMap,Pa=new WeakMap,oi=new WeakMap,xs=new WeakMap;var Hs={};Object.defineProperty(Hs,"__esModule",{value:!0});Hs.discordURLBuilder=void 0;function E_(i){var e;const t=((e=window==null?void 0:window.location)===null||e===void 0?void 0:e.hostname)||"localhost",n=i.hostname.split("."),r=!i.hostname.includes("trycloudflare.com")&&!i.hostname.includes("discordsays.com")&&n.length>2?`/${n[0]}`:"";return i.pathname.startsWith("/.proxy")?`${i.protocol}//${t}${r}${i.pathname}${i.search}`:`${i.protocol}//${t}/.proxy/colyseus${r}${i.pathname}${i.search}`}Hs.discordURLBuilder=E_;var Cn=Ot&&Ot.__awaiter||function(i,e,t,n){function r(s){return s instanceof t?s:new t(function(o){o(s)})}return new(t||(t=Promise))(function(s,o){function a(u){try{c(n.next(u))}catch(d){o(d)}}function l(u){try{c(n.throw(u))}catch(d){o(d)}}function c(u){u.done?s(u.value):r(u.value).then(a,l)}c((n=n.apply(i,e||[])).next())})},Uo;Object.defineProperty(ir,"__esModule",{value:!0});ir.Client=ir.MatchMakeError=void 0;const T_=Fs,b_=Nr,w_=zs,A_=Br,R_=Hs;class Vs extends Error{constructor(e,t){super(e),this.code=t,Object.setPrototypeOf(this,Vs.prototype)}}ir.MatchMakeError=Vs;const xc=typeof window<"u"&&typeof((Uo=window==null?void 0:window.location)===null||Uo===void 0?void 0:Uo.hostname)<"u"?`${window.location.protocol.replace("http","ws")}//${window.location.hostname}${window.location.port&&`:${window.location.port}`}`:"ws://127.0.0.1:2567";class C_{constructor(e=xc,t){var n,r;if(typeof e=="string"){const s=e.startsWith("/")?new URL(e,xc):new URL(e),o=s.protocol==="https:"||s.protocol==="wss:",a=Number(s.port||(o?443:80));this.settings={hostname:s.hostname,pathname:s.pathname,port:a,secure:o}}else e.port===void 0&&(e.port=e.secure?443:80),e.pathname===void 0&&(e.pathname=""),this.settings=e;this.settings.pathname.endsWith("/")&&(this.settings.pathname=this.settings.pathname.slice(0,-1)),this.http=new w_.HTTP(this,(t==null?void 0:t.headers)||{}),this.auth=new A_.Auth(this.http),this.urlBuilder=t==null?void 0:t.urlBuilder,!this.urlBuilder&&typeof window<"u"&&(!((r=(n=window==null?void 0:window.location)===null||n===void 0?void 0:n.hostname)===null||r===void 0)&&r.includes("discordsays.com"))&&(this.urlBuilder=R_.discordURLBuilder,console.log("Colyseus SDK: Discord Embedded SDK detected. Using custom URL builder."))}joinOrCreate(e,t={},n){return Cn(this,void 0,void 0,function*(){return yield this.createMatchMakeRequest("joinOrCreate",e,t,n)})}create(e,t={},n){return Cn(this,void 0,void 0,function*(){return yield this.createMatchMakeRequest("create",e,t,n)})}join(e,t={},n){return Cn(this,void 0,void 0,function*(){return yield this.createMatchMakeRequest("join",e,t,n)})}joinById(e,t={},n){return Cn(this,void 0,void 0,function*(){return yield this.createMatchMakeRequest("joinById",e,t,n)})}reconnect(e,t){return Cn(this,void 0,void 0,function*(){if(typeof e=="string"&&typeof t=="string")throw new Error("DEPRECATED: .reconnect() now only accepts 'reconnectionToken' as argument.\nYou can get this token from previously connected `room.reconnectionToken`");const[n,r]=e.split(":");if(!n||!r)throw new Error(`Invalid reconnection token format.
The format should be roomId:reconnectionToken`);return yield this.createMatchMakeRequest("reconnect",n,{reconnectionToken:r},t)})}getAvailableRooms(e=""){return Cn(this,void 0,void 0,function*(){return(yield this.http.get(`matchmake/${e}`,{headers:{Accept:"application/json"}})).data})}consumeSeatReservation(e,t,n){return Cn(this,void 0,void 0,function*(){const r=this.createRoom(e.room.name,t);r.roomId=e.room.roomId,r.sessionId=e.sessionId;const s={sessionId:r.sessionId};e.reconnectionToken&&(s.reconnectionToken=e.reconnectionToken);const o=n||r;return r.connect(this.buildEndpoint(e.room,s),e.devMode&&(()=>Cn(this,void 0,void 0,function*(){console.info(`[Colyseus devMode]: ${String.fromCodePoint(128260)} Re-establishing connection with room id '${r.roomId}'...`);let a=0,l=8;const c=()=>Cn(this,void 0,void 0,function*(){a++;try{yield this.consumeSeatReservation(e,t,o),console.info(`[Colyseus devMode]: ${String.fromCodePoint(9989)} Successfully re-established connection with room '${r.roomId}'`)}catch{a<l?(console.info(`[Colyseus devMode]: ${String.fromCodePoint(128260)} retrying... (${a} out of ${l})`),setTimeout(c,2e3)):console.info(`[Colyseus devMode]: ${String.fromCodePoint(10060)} Failed to reconnect. Is your server running? Please check server logs.`)}});setTimeout(c,2e3)})),o,this.http.headers),new Promise((a,l)=>{const c=(u,d)=>l(new T_.ServerError(u,d));o.onError.once(c),o.onJoin.once(()=>{o.onError.remove(c),a(o)})})})}createMatchMakeRequest(e,t,n={},r,s){return Cn(this,void 0,void 0,function*(){const o=(yield this.http.post(`matchmake/${e}/${t}`,{headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify(n)})).data;if(o.error)throw new Vs(o.error,o.code);return e==="reconnect"&&(o.reconnectionToken=n.reconnectionToken),yield this.consumeSeatReservation(o,r,s)})}createRoom(e,t){return new b_.Room(e,t)}buildEndpoint(e,t={}){const n=[];for(const o in t)t.hasOwnProperty(o)&&n.push(`${o}=${t[o]}`);let r=this.settings.secure?"wss://":"ws://";e.publicAddress?r+=`${e.publicAddress}`:r+=`${this.settings.hostname}${this.getEndpointPort()}${this.settings.pathname}`;const s=`${r}/${e.processId}/${e.roomId}?${n.join("&")}`;return this.urlBuilder?this.urlBuilder(new URL(s)):s}getHttpEndpoint(e=""){const t=e.startsWith("/")?e:`/${e}`,n=`${this.settings.secure?"https":"http"}://${this.settings.hostname}${this.getEndpointPort()}${this.settings.pathname}${t}`;return this.urlBuilder?this.urlBuilder(new URL(n)):n}getEndpointPort(){return this.settings.port!==80&&this.settings.port!==443?`:${this.settings.port}`:""}}ir.Client=C_;var Gs={};Object.defineProperty(Gs,"__esModule",{value:!0});Gs.SchemaSerializer=void 0;const Mc=ch;class P_{setState(e){return this.state.decode(e)}getState(){return this.state}patch(e){return this.state.decode(e)}teardown(){var e,t;(t=(e=this.state)===null||e===void 0?void 0:e.$changes)===null||t===void 0||t.root.clearRefs()}handshake(e,t){this.state?new Mc.Reflection().decode(e,t):this.state=Mc.Reflection.decode(e,t)}}Gs.SchemaSerializer=P_;var Ws={};Object.defineProperty(Ws,"__esModule",{value:!0});Ws.NoneSerializer=void 0;class I_{setState(e){}getState(){return null}patch(e){}teardown(){}handshake(e){}}Ws.NoneSerializer=I_;(function(i){Object.defineProperty(i,"__esModule",{value:!0}),i.SchemaSerializer=i.registerSerializer=i.Auth=i.Room=i.ErrorCode=i.Protocol=i.MatchMakeError=i.Client=void 0;var e=ir;Object.defineProperty(i,"Client",{enumerable:!0,get:function(){return e.Client}}),Object.defineProperty(i,"MatchMakeError",{enumerable:!0,get:function(){return e.MatchMakeError}});var t=Ka;Object.defineProperty(i,"Protocol",{enumerable:!0,get:function(){return t.Protocol}}),Object.defineProperty(i,"ErrorCode",{enumerable:!0,get:function(){return t.ErrorCode}});var n=Nr;Object.defineProperty(i,"Room",{enumerable:!0,get:function(){return n.Room}});var r=Br;Object.defineProperty(i,"Auth",{enumerable:!0,get:function(){return r.Auth}});const s=Gs;Object.defineProperty(i,"SchemaSerializer",{enumerable:!0,get:function(){return s.SchemaSerializer}});const o=Ws,a=Pi;Object.defineProperty(i,"registerSerializer",{enumerable:!0,get:function(){return a.registerSerializer}}),(0,a.registerSerializer)("schema",s.SchemaSerializer),(0,a.registerSerializer)("none",o.NoneSerializer)})(oh);class D_{constructor(){this.threeManager=new Pg,this.inputManager=new jg,this.inputManager.setPointerTarget(this.threeManager.renderer.domElement),this.worldGenerator=new Me(this.threeManager,{chunkSize:hs}),this.currentMapRows=us,this.currentBuildings=us.buildings||[],this.worldGenerator.generateFromChunkedArray(us,ic,hs,{buildings:this.currentBuildings}),this.pathfinder=new Kg(this.worldGenerator),this.userId=this.generateUserId();const e=us.spawn||{x:0,y:0},t=this.worldGenerator.findNearestWalkable(e.x,e.y,16)||this.worldGenerator.findHighestWalkable()||{x:-8,y:0};this.player=new Ps(this.threeManager,this.inputManager,this.worldGenerator,t.x,t.y,{isLocal:!0,userId:this.userId}),this.worldGenerator.updateVisibleTilesAround(this.player.gridX,this.player.gridY),this.remotePlayers=new Map,this.wildlifeSystem=new ac(this.threeManager,this.worldGenerator,fc),this.hoveredTile=null,this.activePath=[],this.collisionDebugEnabled=!1,this.lastFrameTime=performance.now(),this.connectToServer(),this.inputManager.onLeftClick(n=>{if(n===0&&this.hoveredTile&&this.player){const r=this.pathfinder.findPath(this.player.gridX,this.player.gridY,this.hoveredTile.gridX,this.hoveredTile.gridY);r&&r.length>0&&this.player.setPath(r)}}),this.animate=this.animate.bind(this),this.statusPill=document.getElementById("status-pill"),this.positionReadout=document.getElementById("position-readout"),this.zoneReadout=document.getElementById("zone-readout"),this.chunkReadout=document.getElementById("chunk-readout"),this.wildlifeReadout=document.getElementById("wildlife-readout"),this.playerCountReadout=document.getElementById("player-count-readout"),this.adminPanel=new O0({onTeleport:({worldX:n,worldY:r,location:s})=>this.teleportToWorld(n,r,s),onStartCombat:()=>this.startCombatScene(),onToggleCollisionDebug:n=>this.setCollisionDebugVisible(n)}),this.inputManager.onKeyDown("KeyM",n=>{this.shouldIgnoreGlobalShortcut(n)||(n.preventDefault(),this.adminPanel.toggle())}),this.updateHud("Connecting"),requestAnimationFrame(this.animate)}async connectToServer(){try{console.log("[Game] Connecting to server...");const e=window.location.hostname;this.client=new oh.Client(`ws://${e}:2567`),this.room=await this.client.joinOrCreate("world",{userId:this.userId,x:this.player.gridX,y:this.player.gridY,z:this.player.gridZ}),console.log("[Game] Connected to room:",this.room.id),this.updateHud("Online"),this.setupNetworking(),this.syncCurrentMapToServer("client-default"),this.combatScene=new pc({client:this.client,userId:this.userId,onExit:()=>this.updateHud("Online")})}catch(e){console.error("[Game] Failed to connect to server:",e),this.updateHud("Solo")}}setupNetworking(){this.room&&(this.room.state.players.onAdd=(e,t)=>{t===this.room.sessionId?this.player.applyAuthoritativeCenter(e.centerX,e.centerY,e.centerZ,e.tileX,e.tileY,e.tileZ):this.addRemotePlayer(e,t)},this.room.state.players.onRemove=(e,t)=>{this.removeRemotePlayer(t)},this.room.onMessage("world:chunk:init",e=>{this.serverChunkInfo=e,this.updateHud("Online")}),this.room.onMessage("world:chunk:entered",e=>{this.serverChunkInfo=e,this.updateHud("Online")}),this.room.onMessage("world:map:updated",e=>{this.adminPanel.setMessage(`World ${e.source} map active: ${e.width} x ${e.height}.`,"success")}),setInterval(()=>{var e,t;if((t=(e=this.room)==null?void 0:e.connection)!=null&&t.isOpen&&this.player){const n=this.player.getCenterPayload();try{this.room.send("player:move",{centerX:n.centerX,centerY:n.centerY,centerZ:n.centerZ})}catch(r){console.warn("[Game] Skipped movement sync while connection is closing.",r)}}},100))}addRemotePlayer(e,t){if(this.remotePlayers.has(t))return;const n=new Ps(this.threeManager,null,this.worldGenerator,e.centerX,e.centerY,{isLocal:!1,userId:e.userId});n.setRemoteTarget(e.centerX,e.centerY,e.centerZ),n.setCollisionDebugVisible(this.collisionDebugEnabled),this.remotePlayers.set(t,n)}removeRemotePlayer(e){const t=this.remotePlayers.get(e);t&&(t.destroy(),this.remotePlayers.delete(e))}syncRemotePlayersFromState(){var e,t;(t=(e=this.room)==null?void 0:e.state)!=null&&t.players&&this.room.state.players.forEach((n,r)=>{if(r===this.room.sessionId){(Math.abs(n.centerX-this.player.gridX)>.8||Math.abs(n.centerY-this.player.gridY)>.8)&&this.player.applyAuthoritativeCenter(n.centerX,n.centerY,n.centerZ,n.tileX,n.tileY,n.tileZ);return}this.remotePlayers.has(r)||this.addRemotePlayer(n,r),this.remotePlayers.get(r).setRemoteTarget(n.centerX,n.centerY,n.centerZ)})}applyWorldMap(e,t){this.hoveredTile&&(this.hoveredTile.clearHighlight(),this.hoveredTile=null),this.activePath=[],this.threeManager.renderPathLine([],this.worldGenerator),this.wildlifeSystem.destroy(),this.currentMapRows=e,this.currentBuildings=t==="custom"?[]:e.buildings||[],this.worldGenerator.generateFromChunkedArray(e,ic,hs,{buildings:this.currentBuildings}),this.repositionPlayerForCurrentWorld(),this.wildlifeSystem=new ac(this.threeManager,this.worldGenerator,fc),this.syncCurrentMapToServer(t),this.updateHud()}teleportToWorld(e,t,n=null){var o;const r=sh(e,t);this.applyWorldMap(r,"world-teleport");const s=(n==null?void 0:n.name)||`${Math.round(e)}, ${Math.round(t)}`;(o=this.adminPanel)==null||o.setMessage(`Arrived at ${s}.`,"success")}repositionPlayerForCurrentWorld(){const e=this.currentMapRows.spawn||{x:this.player.gridX,y:this.player.gridY},t=this.worldGenerator.findNearestWalkable(e.x,e.y,16)||this.worldGenerator.findHighestWalkable()||this.findFirstWalkableTile();t&&(this.player.gridX=t.x,this.player.gridY=t.y,this.player.gridZ=this.worldGenerator.getElevation(t.x,t.y),this.player.targetX=this.player.gridX,this.player.targetY=this.player.gridY,this.player.targetZ=this.player.gridZ,this.player.visualX=this.player.gridX,this.player.visualY=this.player.gridY,this.player.visualZ=this.player.gridZ,this.player.currentPath=[],this.player.setCollisionDebugVisible(this.collisionDebugEnabled),this.player.syncModel(),this.worldGenerator.updateVisibleTilesAround(this.player.gridX,this.player.gridY))}syncCurrentMapToServer(e){var t;!this.room||!((t=this.currentMapRows)!=null&&t.length)||this.room.send("world:admin:map_updated",{source:e,width:this.currentMapRows[0].length,height:this.currentMapRows.length,chunkSize:hs,spawn:this.currentMapRows.spawn,world:this.currentMapRows.world,rows:this.currentMapRows})}setCollisionDebugVisible(e){var t;this.collisionDebugEnabled=e,(t=this.player)==null||t.setCollisionDebugVisible(e);for(const n of this.remotePlayers.values())n.setCollisionDebugVisible(e)}findFirstWalkableTile(){for(const e of this.worldGenerator.surfaceMap.values())if(this.worldGenerator.isWalkable(e.x,e.y))return{x:e.x,y:e.y};return null}async startCombatScene(){this.combatScene||(this.combatScene=new pc({client:this.client,userId:this.userId,onExit:()=>this.updateHud(this.room?"Online":"Solo")})),await this.combatScene.enter("meadow-hare-demo")}generateUserId(){const e=localStorage.getItem("userId");if(e)return e;const t="user_"+Math.random().toString(36).substr(2,9);return localStorage.setItem("userId",t),t}animate(){requestAnimationFrame(this.animate);const e=performance.now(),t=Math.min((e-this.lastFrameTime)/1e3,.1);this.lastFrameTime=e;const n=this.inputManager.getWheelDelta();n!==0&&this.threeManager.handleZoom(n);const r=this.threeManager.getIntersectedTile(this.inputManager.mouseNDC);if(r!==this.hoveredTile)if(this.hoveredTile&&this.hoveredTile.clearHighlight(),this.hoveredTile=r,this.hoveredTile){const s=this.worldGenerator.isWalkable(this.hoveredTile.gridX,this.hoveredTile.gridY);this.hoveredTile.highlight(s?3116878:9381424),this.player&&s?(this.activePath=this.pathfinder.findPath(this.player.gridX,this.player.gridY,this.hoveredTile.gridX,this.hoveredTile.gridY),this.threeManager.renderPathLine(this.activePath,this.worldGenerator)):(this.activePath=[],this.threeManager.renderPathLine([],this.worldGenerator))}else this.activePath=null,this.threeManager.renderPathLine([],this.worldGenerator);if(this.player){this.player.update(t),this.syncRemotePlayersFromState();for(const o of this.remotePlayers.values())o.update(t);this.wildlifeSystem.update(t);const s=this.player.group.position;this.threeManager.updateCamera(s),this.worldGenerator.updateBuildingVisibility(this.player.gridX,this.player.gridY),this.worldGenerator.updateDoorAnimations(t),this.worldGenerator.updateVisibleTilesAround(this.player.gridX,this.player.gridY),this.worldGenerator.updatePlayerSightCutaway(this.player.gridX,this.player.gridY,this.threeManager.camera),this.updateHud()}this.threeManager.render()}shouldIgnoreGlobalShortcut(e){var n,r,s;const t=(r=(n=e==null?void 0:e.target)==null?void 0:n.tagName)==null?void 0:r.toLowerCase();return t==="input"||t==="textarea"||t==="select"||((s=e==null?void 0:e.target)==null?void 0:s.isContentEditable)}updateHud(e){var a,l,c,u;if(e&&this.statusPill&&(this.statusPill.textContent=e,this.statusPill.dataset.status=e.toLowerCase()),!this.player)return;const t=Math.round(this.player.gridX),n=Math.round(this.player.gridY),r=this.worldGenerator.getSurfaceAt(t,n),s=this.worldGenerator.getChunkKeyForTile(t,n),o=this.worldGenerator.getLoadedChunkSummary().length;this.positionReadout&&(this.positionReadout.textContent=`${t}, ${n}, ${this.player.gridZ}`),this.zoneReadout&&(this.zoneReadout.textContent=((a=r==null?void 0:r.definition)==null?void 0:a.label)||"Unknown"),this.chunkReadout&&(this.chunkReadout.textContent=`${s} / ${o}`),this.wildlifeReadout&&(this.wildlifeReadout.textContent=`${this.wildlifeSystem.wildlife.length}`),this.playerCountReadout&&(this.playerCountReadout.textContent=`${((u=(c=(l=this.room)==null?void 0:l.state)==null?void 0:c.players)==null?void 0:u.size)||1}`)}}window.addEventListener("DOMContentLoaded",()=>{new D_,console.log("[Main] Game initialized with Three.js")});
