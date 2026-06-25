var ch=Object.defineProperty;var hh=(i,e,t)=>e in i?ch(i,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):i[e]=t;var an=(i,e,t)=>hh(i,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function t(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(r){if(r.ep)return;r.ep=!0;const s=t(r);fetch(r.href,s)}})();/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Aa="183",uh=0,Ja=1,fh=2,br=1,dh=2,yr=3,ci=0,sn=1,gn=2,$n=0,qi=1,_s=2,Qa=3,el=4,ph=5,Mi=100,mh=101,gh=102,_h=103,vh=104,xh=200,Sh=201,Mh=202,yh=203,Io=204,Do=205,Eh=206,Th=207,bh=208,wh=209,Ah=210,Rh=211,Ch=212,Ph=213,Ih=214,Lo=0,Uo=1,Oo=2,Pn=3,No=4,Fo=5,wr=6,Go=7,Sc=0,Dh=1,Lh=2,Ln=0,Mc=1,yc=2,Ec=3,Ra=4,Tc=5,bc=6,wc=7,Ac=300,wi=301,Zi=302,zs=303,Hs=304,Rs=306,Ei=1e3,Xn=1001,Bo=1002,Yt=1003,Uh=1004,Fr=1005,Wt=1006,Ws=1007,Ti=1008,un=1009,Rc=1010,Cc=1011,Ar=1012,Ca=1013,Nn=1014,In=1015,qn=1016,Pa=1017,Ia=1018,Rr=1020,Pc=35902,Ic=35899,Dc=1021,Lc=1022,En=1023,jn=1026,bi=1027,Uc=1028,Da=1029,Ki=1030,La=1031,Ua=1033,hs=33776,us=33777,fs=33778,ds=33779,ko=35840,zo=35841,Ho=35842,Wo=35843,Vo=36196,Xo=37492,$o=37496,Yo=37488,qo=37489,jo=37490,Zo=37491,Ko=37808,Jo=37809,Qo=37810,ea=37811,ta=37812,na=37813,ia=37814,ra=37815,sa=37816,oa=37817,aa=37818,la=37819,ca=37820,ha=37821,ua=36492,fa=36494,da=36495,pa=36283,ma=36284,ga=36285,_a=36286,Oh=3200,Oc=0,Nh=1,si="",Jt="srgb",Ji="srgb-linear",vs="linear",yt="srgb",Di=7680,tl=519,Fh=512,Gh=513,Bh=514,Oa=515,kh=516,zh=517,Na=518,Hh=519,nl=35044,il="300 es",Dn=2e3,Cr=2001;function Wh(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function xs(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Vh(){const i=xs("canvas");return i.style.display="block",i}const rl={};function sl(...i){const e="THREE."+i.shift();console.log(e,...i)}function Nc(i){const e=i[0];if(typeof e=="string"&&e.startsWith("TSL:")){const t=i[1];t&&t.isStackTrace?i[0]+=" "+t.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function qe(...i){i=Nc(i);const e="THREE."+i.shift();{const t=i[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...i)}}function _t(...i){i=Nc(i);const e="THREE."+i.shift();{const t=i[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...i)}}function Ss(...i){const e=i.join(" ");e in rl||(rl[e]=!0,qe(...i))}function Xh(i,e,t){return new Promise(function(n,r){function s(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:r();break;case i.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:n()}}setTimeout(s,t)})}const $h={[Lo]:Uo,[Oo]:wr,[No]:Go,[Pn]:Fo,[Uo]:Lo,[wr]:Oo,[Go]:No,[Fo]:Pn};class ir{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){const n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){const n=this._listeners;if(n===void 0)return;const r=n[e];if(r!==void 0){const s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const n=t[e.type];if(n!==void 0){e.target=this;const r=n.slice(0);for(let s=0,o=r.length;s<o;s++)r[s].call(this,e);e.target=null}}}const jt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Vs=Math.PI/180,va=180/Math.PI;function Ir(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(jt[i&255]+jt[i>>8&255]+jt[i>>16&255]+jt[i>>24&255]+"-"+jt[e&255]+jt[e>>8&255]+"-"+jt[e>>16&15|64]+jt[e>>24&255]+"-"+jt[t&63|128]+jt[t>>8&255]+"-"+jt[t>>16&255]+jt[t>>24&255]+jt[n&255]+jt[n>>8&255]+jt[n>>16&255]+jt[n>>24&255]).toLowerCase()}function dt(i,e,t){return Math.max(e,Math.min(t,i))}function Yh(i,e){return(i%e+e)%e}function Xs(i,e,t){return(1-t)*i+t*e}function lr(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function nn(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}class ct{constructor(e=0,t=0){ct.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=dt(this.x,e.x,t.x),this.y=dt(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=dt(this.x,e,t),this.y=dt(this.y,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(dt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(dt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),r=Math.sin(t),s=this.x-e.x,o=this.y-e.y;return this.x=s*n-o*r+e.x,this.y=s*r+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class rr{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,s,o,a){let l=n[r+0],c=n[r+1],u=n[r+2],d=n[r+3],f=s[o+0],v=s[o+1],x=s[o+2],y=s[o+3];if(d!==y||l!==f||c!==v||u!==x){let _=l*f+c*v+u*x+d*y;_<0&&(f=-f,v=-v,x=-x,y=-y,_=-_);let p=1-a;if(_<.9995){const b=Math.acos(_),C=Math.sin(b);p=Math.sin(p*b)/C,a=Math.sin(a*b)/C,l=l*p+f*a,c=c*p+v*a,u=u*p+x*a,d=d*p+y*a}else{l=l*p+f*a,c=c*p+v*a,u=u*p+x*a,d=d*p+y*a;const b=1/Math.sqrt(l*l+c*c+u*u+d*d);l*=b,c*=b,u*=b,d*=b}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=d}static multiplyQuaternionsFlat(e,t,n,r,s,o){const a=n[r],l=n[r+1],c=n[r+2],u=n[r+3],d=s[o],f=s[o+1],v=s[o+2],x=s[o+3];return e[t]=a*x+u*d+l*v-c*f,e[t+1]=l*x+u*f+c*d-a*v,e[t+2]=c*x+u*v+a*f-l*d,e[t+3]=u*x-a*d-l*f-c*v,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,r=e._y,s=e._z,o=e._order,a=Math.cos,l=Math.sin,c=a(n/2),u=a(r/2),d=a(s/2),f=l(n/2),v=l(r/2),x=l(s/2);switch(o){case"XYZ":this._x=f*u*d+c*v*x,this._y=c*v*d-f*u*x,this._z=c*u*x+f*v*d,this._w=c*u*d-f*v*x;break;case"YXZ":this._x=f*u*d+c*v*x,this._y=c*v*d-f*u*x,this._z=c*u*x-f*v*d,this._w=c*u*d+f*v*x;break;case"ZXY":this._x=f*u*d-c*v*x,this._y=c*v*d+f*u*x,this._z=c*u*x+f*v*d,this._w=c*u*d-f*v*x;break;case"ZYX":this._x=f*u*d-c*v*x,this._y=c*v*d+f*u*x,this._z=c*u*x-f*v*d,this._w=c*u*d+f*v*x;break;case"YZX":this._x=f*u*d+c*v*x,this._y=c*v*d+f*u*x,this._z=c*u*x-f*v*d,this._w=c*u*d-f*v*x;break;case"XZY":this._x=f*u*d-c*v*x,this._y=c*v*d-f*u*x,this._z=c*u*x+f*v*d,this._w=c*u*d+f*v*x;break;default:qe("Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],r=t[4],s=t[8],o=t[1],a=t[5],l=t[9],c=t[2],u=t[6],d=t[10],f=n+a+d;if(f>0){const v=.5/Math.sqrt(f+1);this._w=.25/v,this._x=(u-l)*v,this._y=(s-c)*v,this._z=(o-r)*v}else if(n>a&&n>d){const v=2*Math.sqrt(1+n-a-d);this._w=(u-l)/v,this._x=.25*v,this._y=(r+o)/v,this._z=(s+c)/v}else if(a>d){const v=2*Math.sqrt(1+a-n-d);this._w=(s-c)/v,this._x=(r+o)/v,this._y=.25*v,this._z=(l+u)/v}else{const v=2*Math.sqrt(1+d-n-a);this._w=(o-r)/v,this._x=(s+c)/v,this._y=(l+u)/v,this._z=.25*v}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(dt(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,r=e._y,s=e._z,o=e._w,a=t._x,l=t._y,c=t._z,u=t._w;return this._x=n*u+o*a+r*c-s*l,this._y=r*u+o*l+s*a-n*c,this._z=s*u+o*c+n*l-r*a,this._w=o*u-n*a-r*l-s*c,this._onChangeCallback(),this}slerp(e,t){let n=e._x,r=e._y,s=e._z,o=e._w,a=this.dot(e);a<0&&(n=-n,r=-r,s=-s,o=-o,a=-a);let l=1-t;if(a<.9995){const c=Math.acos(a),u=Math.sin(c);l=Math.sin(l*c)/u,t=Math.sin(t*c)/u,this._x=this._x*l+n*t,this._y=this._y*l+r*t,this._z=this._z*l+s*t,this._w=this._w*l+o*t,this._onChangeCallback()}else this._x=this._x*l+n*t,this._y=this._y*l+r*t,this._z=this._z*l+s*t,this._w=this._w*l+o*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class H{constructor(e=0,t=0,n=0){H.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(ol.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(ol.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*r,this.y=s[1]*t+s[4]*n+s[7]*r,this.z=s[2]*t+s[5]*n+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,r=this.z,s=e.elements,o=1/(s[3]*t+s[7]*n+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*r+s[12])*o,this.y=(s[1]*t+s[5]*n+s[9]*r+s[13])*o,this.z=(s[2]*t+s[6]*n+s[10]*r+s[14])*o,this}applyQuaternion(e){const t=this.x,n=this.y,r=this.z,s=e.x,o=e.y,a=e.z,l=e.w,c=2*(o*r-a*n),u=2*(a*t-s*r),d=2*(s*n-o*t);return this.x=t+l*c+o*d-a*u,this.y=n+l*u+a*c-s*d,this.z=r+l*d+s*u-o*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*r,this.y=s[1]*t+s[5]*n+s[9]*r,this.z=s[2]*t+s[6]*n+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=dt(this.x,e.x,t.x),this.y=dt(this.y,e.y,t.y),this.z=dt(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=dt(this.x,e,t),this.y=dt(this.y,e,t),this.z=dt(this.z,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(dt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,r=e.y,s=e.z,o=t.x,a=t.y,l=t.z;return this.x=r*l-s*a,this.y=s*o-n*l,this.z=n*a-r*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return $s.copy(this).projectOnVector(e),this.sub($s)}reflect(e){return this.sub($s.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(dt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const $s=new H,ol=new rr;class tt{constructor(e,t,n,r,s,o,a,l,c){tt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,r,s,o,a,l,c)}set(e,t,n,r,s,o,a,l,c){const u=this.elements;return u[0]=e,u[1]=r,u[2]=a,u[3]=t,u[4]=s,u[5]=l,u[6]=n,u[7]=o,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,r=t.elements,s=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],u=n[4],d=n[7],f=n[2],v=n[5],x=n[8],y=r[0],_=r[3],p=r[6],b=r[1],C=r[4],A=r[7],I=r[2],P=r[5],U=r[8];return s[0]=o*y+a*b+l*I,s[3]=o*_+a*C+l*P,s[6]=o*p+a*A+l*U,s[1]=c*y+u*b+d*I,s[4]=c*_+u*C+d*P,s[7]=c*p+u*A+d*U,s[2]=f*y+v*b+x*I,s[5]=f*_+v*C+x*P,s[8]=f*p+v*A+x*U,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8];return t*o*u-t*a*c-n*s*u+n*a*l+r*s*c-r*o*l}invert(){const e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8],d=u*o-a*c,f=a*l-u*s,v=c*s-o*l,x=t*d+n*f+r*v;if(x===0)return this.set(0,0,0,0,0,0,0,0,0);const y=1/x;return e[0]=d*y,e[1]=(r*c-u*n)*y,e[2]=(a*n-r*o)*y,e[3]=f*y,e[4]=(u*t-r*l)*y,e[5]=(r*s-a*t)*y,e[6]=v*y,e[7]=(n*l-c*t)*y,e[8]=(o*t-n*s)*y,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,s,o,a){const l=Math.cos(s),c=Math.sin(s);return this.set(n*l,n*c,-n*(l*o+c*a)+o+e,-r*c,r*l,-r*(-c*o+l*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(Ys.makeScale(e,t)),this}rotate(e){return this.premultiply(Ys.makeRotation(-e)),this}translate(e,t){return this.premultiply(Ys.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let r=0;r<9;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Ys=new tt,al=new tt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),ll=new tt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function qh(){const i={enabled:!0,workingColorSpace:Ji,spaces:{},convert:function(r,s,o){return this.enabled===!1||s===o||!s||!o||(this.spaces[s].transfer===yt&&(r.r=Yn(r.r),r.g=Yn(r.g),r.b=Yn(r.b)),this.spaces[s].primaries!==this.spaces[o].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===yt&&(r.r=ji(r.r),r.g=ji(r.g),r.b=ji(r.b))),r},workingToColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},colorSpaceToWorking:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===si?vs:this.spaces[r].transfer},getToneMappingMode:function(r){return this.spaces[r].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,o){return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,s){return Ss("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(r,s)},toWorkingColorSpace:function(r,s){return Ss("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(r,s)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[Ji]:{primaries:e,whitePoint:n,transfer:vs,toXYZ:al,fromXYZ:ll,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Jt},outputColorSpaceConfig:{drawingBufferColorSpace:Jt}},[Jt]:{primaries:e,whitePoint:n,transfer:yt,toXYZ:al,fromXYZ:ll,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Jt}}}),i}const vt=qh();function Yn(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function ji(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let Li;class jh{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{Li===void 0&&(Li=xs("canvas")),Li.width=e.width,Li.height=e.height;const r=Li.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),n=Li}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=xs("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const r=n.getImageData(0,0,e.width,e.height),s=r.data;for(let o=0;o<s.length;o++)s[o]=Yn(s[o]/255)*255;return n.putImageData(r,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Yn(t[n]/255)*255):t[n]=Yn(t[n]);return{data:t,width:e.width,height:e.height}}else return qe("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Zh=0;class Fa{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Zh++}),this.uuid=Ir(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayHeight,t.displayWidth,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let o=0,a=r.length;o<a;o++)r[o].isDataTexture?s.push(qs(r[o].image)):s.push(qs(r[o]))}else s=qs(r);n.url=s}return t||(e.images[this.uuid]=n),n}}function qs(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?jh.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(qe("Texture: Unable to serialize Texture."),{})}let Kh=0;const js=new H;class Qt extends ir{constructor(e=Qt.DEFAULT_IMAGE,t=Qt.DEFAULT_MAPPING,n=Xn,r=Xn,s=Wt,o=Ti,a=En,l=un,c=Qt.DEFAULT_ANISOTROPY,u=si){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Kh++}),this.uuid=Ir(),this.name="",this.source=new Fa(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=r,this.magFilter=s,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new ct(0,0),this.repeat=new ct(1,1),this.center=new ct(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new tt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(js).x}get height(){return this.source.getSize(js).y}get depth(){return this.source.getSize(js).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const n=e[t];if(n===void 0){qe(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){qe(`Texture.setValues(): property '${t}' does not exist.`);continue}r&&n&&r.isVector2&&n.isVector2||r&&n&&r.isVector3&&n.isVector3||r&&n&&r.isMatrix3&&n.isMatrix3?r.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Ac)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Ei:e.x=e.x-Math.floor(e.x);break;case Xn:e.x=e.x<0?0:1;break;case Bo:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Ei:e.y=e.y-Math.floor(e.y);break;case Xn:e.y=e.y<0?0:1;break;case Bo:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Qt.DEFAULT_IMAGE=null;Qt.DEFAULT_MAPPING=Ac;Qt.DEFAULT_ANISOTROPY=1;class Nt{constructor(e=0,t=0,n=0,r=1){Nt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,r=this.z,s=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*r+o[12]*s,this.y=o[1]*t+o[5]*n+o[9]*r+o[13]*s,this.z=o[2]*t+o[6]*n+o[10]*r+o[14]*s,this.w=o[3]*t+o[7]*n+o[11]*r+o[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,s;const l=e.elements,c=l[0],u=l[4],d=l[8],f=l[1],v=l[5],x=l[9],y=l[2],_=l[6],p=l[10];if(Math.abs(u-f)<.01&&Math.abs(d-y)<.01&&Math.abs(x-_)<.01){if(Math.abs(u+f)<.1&&Math.abs(d+y)<.1&&Math.abs(x+_)<.1&&Math.abs(c+v+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const C=(c+1)/2,A=(v+1)/2,I=(p+1)/2,P=(u+f)/4,U=(d+y)/4,E=(x+_)/4;return C>A&&C>I?C<.01?(n=0,r=.707106781,s=.707106781):(n=Math.sqrt(C),r=P/n,s=U/n):A>I?A<.01?(n=.707106781,r=0,s=.707106781):(r=Math.sqrt(A),n=P/r,s=E/r):I<.01?(n=.707106781,r=.707106781,s=0):(s=Math.sqrt(I),n=U/s,r=E/s),this.set(n,r,s,t),this}let b=Math.sqrt((_-x)*(_-x)+(d-y)*(d-y)+(f-u)*(f-u));return Math.abs(b)<.001&&(b=1),this.x=(_-x)/b,this.y=(d-y)/b,this.z=(f-u)/b,this.w=Math.acos((c+v+p-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=dt(this.x,e.x,t.x),this.y=dt(this.y,e.y,t.y),this.z=dt(this.z,e.z,t.z),this.w=dt(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=dt(this.x,e,t),this.y=dt(this.y,e,t),this.z=dt(this.z,e,t),this.w=dt(this.w,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(dt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Jh extends ir{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Wt,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new Nt(0,0,e,t),this.scissorTest=!1,this.viewport=new Nt(0,0,e,t),this.textures=[];const r={width:e,height:t,depth:n.depth},s=new Qt(r),o=n.count;for(let a=0;a<o;a++)this.textures[a]=s.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(e={}){const t={minFilter:Wt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=n,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const r=Object.assign({},e.textures[t].image);this.textures[t].source=new Fa(r)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Un extends Jh{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class Fc extends Qt{constructor(e=null,t=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=Yt,this.minFilter=Yt,this.wrapR=Xn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class Qh extends Qt{constructor(e=null,t=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=Yt,this.minFilter=Yt,this.wrapR=Xn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class It{constructor(e,t,n,r,s,o,a,l,c,u,d,f,v,x,y,_){It.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,r,s,o,a,l,c,u,d,f,v,x,y,_)}set(e,t,n,r,s,o,a,l,c,u,d,f,v,x,y,_){const p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=r,p[1]=s,p[5]=o,p[9]=a,p[13]=l,p[2]=c,p[6]=u,p[10]=d,p[14]=f,p[3]=v,p[7]=x,p[11]=y,p[15]=_,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new It().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinant()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinant()===0)return this.identity();const t=this.elements,n=e.elements,r=1/Ui.setFromMatrixColumn(e,0).length(),s=1/Ui.setFromMatrixColumn(e,1).length(),o=1/Ui.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,r=e.y,s=e.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(r),c=Math.sin(r),u=Math.cos(s),d=Math.sin(s);if(e.order==="XYZ"){const f=o*u,v=o*d,x=a*u,y=a*d;t[0]=l*u,t[4]=-l*d,t[8]=c,t[1]=v+x*c,t[5]=f-y*c,t[9]=-a*l,t[2]=y-f*c,t[6]=x+v*c,t[10]=o*l}else if(e.order==="YXZ"){const f=l*u,v=l*d,x=c*u,y=c*d;t[0]=f+y*a,t[4]=x*a-v,t[8]=o*c,t[1]=o*d,t[5]=o*u,t[9]=-a,t[2]=v*a-x,t[6]=y+f*a,t[10]=o*l}else if(e.order==="ZXY"){const f=l*u,v=l*d,x=c*u,y=c*d;t[0]=f-y*a,t[4]=-o*d,t[8]=x+v*a,t[1]=v+x*a,t[5]=o*u,t[9]=y-f*a,t[2]=-o*c,t[6]=a,t[10]=o*l}else if(e.order==="ZYX"){const f=o*u,v=o*d,x=a*u,y=a*d;t[0]=l*u,t[4]=x*c-v,t[8]=f*c+y,t[1]=l*d,t[5]=y*c+f,t[9]=v*c-x,t[2]=-c,t[6]=a*l,t[10]=o*l}else if(e.order==="YZX"){const f=o*l,v=o*c,x=a*l,y=a*c;t[0]=l*u,t[4]=y-f*d,t[8]=x*d+v,t[1]=d,t[5]=o*u,t[9]=-a*u,t[2]=-c*u,t[6]=v*d+x,t[10]=f-y*d}else if(e.order==="XZY"){const f=o*l,v=o*c,x=a*l,y=a*c;t[0]=l*u,t[4]=-d,t[8]=c*u,t[1]=f*d+y,t[5]=o*u,t[9]=v*d-x,t[2]=x*d-v,t[6]=a*u,t[10]=y*d+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(eu,e,tu)}lookAt(e,t,n){const r=this.elements;return ln.subVectors(e,t),ln.lengthSq()===0&&(ln.z=1),ln.normalize(),Jn.crossVectors(n,ln),Jn.lengthSq()===0&&(Math.abs(n.z)===1?ln.x+=1e-4:ln.z+=1e-4,ln.normalize(),Jn.crossVectors(n,ln)),Jn.normalize(),Gr.crossVectors(ln,Jn),r[0]=Jn.x,r[4]=Gr.x,r[8]=ln.x,r[1]=Jn.y,r[5]=Gr.y,r[9]=ln.y,r[2]=Jn.z,r[6]=Gr.z,r[10]=ln.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,r=t.elements,s=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],u=n[1],d=n[5],f=n[9],v=n[13],x=n[2],y=n[6],_=n[10],p=n[14],b=n[3],C=n[7],A=n[11],I=n[15],P=r[0],U=r[4],E=r[8],w=r[12],Z=r[1],D=r[5],V=r[9],$=r[13],q=r[2],X=r[6],Y=r[10],z=r[14],ae=r[3],ne=r[7],ye=r[11],Te=r[15];return s[0]=o*P+a*Z+l*q+c*ae,s[4]=o*U+a*D+l*X+c*ne,s[8]=o*E+a*V+l*Y+c*ye,s[12]=o*w+a*$+l*z+c*Te,s[1]=u*P+d*Z+f*q+v*ae,s[5]=u*U+d*D+f*X+v*ne,s[9]=u*E+d*V+f*Y+v*ye,s[13]=u*w+d*$+f*z+v*Te,s[2]=x*P+y*Z+_*q+p*ae,s[6]=x*U+y*D+_*X+p*ne,s[10]=x*E+y*V+_*Y+p*ye,s[14]=x*w+y*$+_*z+p*Te,s[3]=b*P+C*Z+A*q+I*ae,s[7]=b*U+C*D+A*X+I*ne,s[11]=b*E+C*V+A*Y+I*ye,s[15]=b*w+C*$+A*z+I*Te,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],r=e[8],s=e[12],o=e[1],a=e[5],l=e[9],c=e[13],u=e[2],d=e[6],f=e[10],v=e[14],x=e[3],y=e[7],_=e[11],p=e[15],b=l*v-c*f,C=a*v-c*d,A=a*f-l*d,I=o*v-c*u,P=o*f-l*u,U=o*d-a*u;return t*(y*b-_*C+p*A)-n*(x*b-_*I+p*P)+r*(x*C-y*I+p*U)-s*(x*A-y*P+_*U)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8],d=e[9],f=e[10],v=e[11],x=e[12],y=e[13],_=e[14],p=e[15],b=t*a-n*o,C=t*l-r*o,A=t*c-s*o,I=n*l-r*a,P=n*c-s*a,U=r*c-s*l,E=u*y-d*x,w=u*_-f*x,Z=u*p-v*x,D=d*_-f*y,V=d*p-v*y,$=f*p-v*_,q=b*$-C*V+A*D+I*Z-P*w+U*E;if(q===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const X=1/q;return e[0]=(a*$-l*V+c*D)*X,e[1]=(r*V-n*$-s*D)*X,e[2]=(y*U-_*P+p*I)*X,e[3]=(f*P-d*U-v*I)*X,e[4]=(l*Z-o*$-c*w)*X,e[5]=(t*$-r*Z+s*w)*X,e[6]=(_*A-x*U-p*C)*X,e[7]=(u*U-f*A+v*C)*X,e[8]=(o*V-a*Z+c*E)*X,e[9]=(n*Z-t*V-s*E)*X,e[10]=(x*P-y*A+p*b)*X,e[11]=(d*A-u*P-v*b)*X,e[12]=(a*w-o*D-l*E)*X,e[13]=(t*D-n*w+r*E)*X,e[14]=(y*C-x*I-_*b)*X,e[15]=(u*I-d*C+f*b)*X,this}scale(e){const t=this.elements,n=e.x,r=e.y,s=e.z;return t[0]*=n,t[4]*=r,t[8]*=s,t[1]*=n,t[5]*=r,t[9]*=s,t[2]*=n,t[6]*=r,t[10]*=s,t[3]*=n,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),r=Math.sin(t),s=1-n,o=e.x,a=e.y,l=e.z,c=s*o,u=s*a;return this.set(c*o+n,c*a-r*l,c*l+r*a,0,c*a+r*l,u*a+n,u*l-r*o,0,c*l-r*a,u*l+r*o,s*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,s,o){return this.set(1,n,s,0,e,1,o,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){const r=this.elements,s=t._x,o=t._y,a=t._z,l=t._w,c=s+s,u=o+o,d=a+a,f=s*c,v=s*u,x=s*d,y=o*u,_=o*d,p=a*d,b=l*c,C=l*u,A=l*d,I=n.x,P=n.y,U=n.z;return r[0]=(1-(y+p))*I,r[1]=(v+A)*I,r[2]=(x-C)*I,r[3]=0,r[4]=(v-A)*P,r[5]=(1-(f+p))*P,r[6]=(_+b)*P,r[7]=0,r[8]=(x+C)*U,r[9]=(_-b)*U,r[10]=(1-(f+y))*U,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){const r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];const s=this.determinant();if(s===0)return n.set(1,1,1),t.identity(),this;let o=Ui.set(r[0],r[1],r[2]).length();const a=Ui.set(r[4],r[5],r[6]).length(),l=Ui.set(r[8],r[9],r[10]).length();s<0&&(o=-o),xn.copy(this);const c=1/o,u=1/a,d=1/l;return xn.elements[0]*=c,xn.elements[1]*=c,xn.elements[2]*=c,xn.elements[4]*=u,xn.elements[5]*=u,xn.elements[6]*=u,xn.elements[8]*=d,xn.elements[9]*=d,xn.elements[10]*=d,t.setFromRotationMatrix(xn),n.x=o,n.y=a,n.z=l,this}makePerspective(e,t,n,r,s,o,a=Dn,l=!1){const c=this.elements,u=2*s/(t-e),d=2*s/(n-r),f=(t+e)/(t-e),v=(n+r)/(n-r);let x,y;if(l)x=s/(o-s),y=o*s/(o-s);else if(a===Dn)x=-(o+s)/(o-s),y=-2*o*s/(o-s);else if(a===Cr)x=-o/(o-s),y=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=u,c[4]=0,c[8]=f,c[12]=0,c[1]=0,c[5]=d,c[9]=v,c[13]=0,c[2]=0,c[6]=0,c[10]=x,c[14]=y,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,r,s,o,a=Dn,l=!1){const c=this.elements,u=2/(t-e),d=2/(n-r),f=-(t+e)/(t-e),v=-(n+r)/(n-r);let x,y;if(l)x=1/(o-s),y=o/(o-s);else if(a===Dn)x=-2/(o-s),y=-(o+s)/(o-s);else if(a===Cr)x=-1/(o-s),y=-s/(o-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=u,c[4]=0,c[8]=0,c[12]=f,c[1]=0,c[5]=d,c[9]=0,c[13]=v,c[2]=0,c[6]=0,c[10]=x,c[14]=y,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let r=0;r<16;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const Ui=new H,xn=new It,eu=new H(0,0,0),tu=new H(1,1,1),Jn=new H,Gr=new H,ln=new H,cl=new It,hl=new rr;class Fn{constructor(e=0,t=0,n=0,r=Fn.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const r=e.elements,s=r[0],o=r[4],a=r[8],l=r[1],c=r[5],u=r[9],d=r[2],f=r[6],v=r[10];switch(t){case"XYZ":this._y=Math.asin(dt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,v),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-dt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,v),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,s),this._z=0);break;case"ZXY":this._x=Math.asin(dt(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-d,v),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-dt(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(f,v),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(dt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-d,s)):(this._x=0,this._y=Math.atan2(a,v));break;case"XZY":this._z=Math.asin(-dt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-u,v),this._y=0);break;default:qe("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return cl.makeRotationFromQuaternion(e),this.setFromRotationMatrix(cl,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return hl.setFromEuler(this),this.setFromQuaternion(hl,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Fn.DEFAULT_ORDER="XYZ";class Ga{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let nu=0;const ul=new H,Oi=new rr,Bn=new It,Br=new H,cr=new H,iu=new H,ru=new rr,fl=new H(1,0,0),dl=new H(0,1,0),pl=new H(0,0,1),ml={type:"added"},su={type:"removed"},Ni={type:"childadded",child:null},Zs={type:"childremoved",child:null};class Vt extends ir{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:nu++}),this.uuid=Ir(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Vt.DEFAULT_UP.clone();const e=new H,t=new Fn,n=new rr,r=new H(1,1,1);function s(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(s),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new It},normalMatrix:{value:new tt}}),this.matrix=new It,this.matrixWorld=new It,this.matrixAutoUpdate=Vt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Vt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Ga,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Oi.setFromAxisAngle(e,t),this.quaternion.multiply(Oi),this}rotateOnWorldAxis(e,t){return Oi.setFromAxisAngle(e,t),this.quaternion.premultiply(Oi),this}rotateX(e){return this.rotateOnAxis(fl,e)}rotateY(e){return this.rotateOnAxis(dl,e)}rotateZ(e){return this.rotateOnAxis(pl,e)}translateOnAxis(e,t){return ul.copy(e).applyQuaternion(this.quaternion),this.position.add(ul.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(fl,e)}translateY(e){return this.translateOnAxis(dl,e)}translateZ(e){return this.translateOnAxis(pl,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Bn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Br.copy(e):Br.set(e,t,n);const r=this.parent;this.updateWorldMatrix(!0,!1),cr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Bn.lookAt(cr,Br,this.up):Bn.lookAt(Br,cr,this.up),this.quaternion.setFromRotationMatrix(Bn),r&&(Bn.extractRotation(r.matrixWorld),Oi.setFromRotationMatrix(Bn),this.quaternion.premultiply(Oi.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(_t("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(ml),Ni.child=e,this.dispatchEvent(Ni),Ni.child=null):_t("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(su),Zs.child=e,this.dispatchEvent(Zs),Zs.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Bn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Bn.multiply(e.parent.matrixWorld)),e.applyMatrix4(Bn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(ml),Ni.child=e,this.dispatchEvent(Ni),Ni.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){const o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(cr,e,iu),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(cr,ru,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const t=e.x,n=e.y,r=e.z,s=this.matrix.elements;s[12]+=t-s[0]*t-s[4]*n-s[8]*r,s[13]+=n-s[1]*t-s[5]*n-s[9]*r,s[14]+=r-s[2]*t-s[6]*n-s[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),this.static!==!1&&(r.static=this.static),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(a=>({...a})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function s(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const d=l[c];s(e.shapes,d)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(s(e.materials,this.material[l]));r.material=a}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let a=0;a<this.children.length;a++)r.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];r.animations.push(s(e.animations,l))}}if(t){const a=o(e.geometries),l=o(e.materials),c=o(e.textures),u=o(e.images),d=o(e.shapes),f=o(e.skeletons),v=o(e.animations),x=o(e.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),u.length>0&&(n.images=u),d.length>0&&(n.shapes=d),f.length>0&&(n.skeletons=f),v.length>0&&(n.animations=v),x.length>0&&(n.nodes=x)}return n.object=r,n;function o(a){const l=[];for(const c in a){const u=a[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),e.pivot!==null&&(this.pivot=e.pivot.clone()),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const r=e.children[n];this.add(r.clone())}return this}}Vt.DEFAULT_UP=new H(0,1,0);Vt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Vt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class fn extends Vt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const ou={type:"move"};class Ks{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new fn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new fn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new H,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new H),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new fn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new H,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new H),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,s=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(const y of e.hand.values()){const _=t.getJointPose(y,n),p=this._getHandJoint(c,y);_!==null&&(p.matrix.fromArray(_.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=_.radius),p.visible=_!==null}const u=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],f=u.position.distanceTo(d.position),v=.02,x=.005;c.inputState.pinching&&f>v+x?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&f<=v-x&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&s!==null&&(r=s),r!==null&&(a.matrix.fromArray(r.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,r.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(r.linearVelocity)):a.hasLinearVelocity=!1,r.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(r.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(ou)))}return a!==null&&(a.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new fn;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}const Gc={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Qn={h:0,s:0,l:0},kr={h:0,s:0,l:0};function Js(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class pt{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Jt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,vt.colorSpaceToWorking(this,t),this}setRGB(e,t,n,r=vt.workingColorSpace){return this.r=e,this.g=t,this.b=n,vt.colorSpaceToWorking(this,r),this}setHSL(e,t,n,r=vt.workingColorSpace){if(e=Yh(e,1),t=dt(t,0,1),n=dt(n,0,1),t===0)this.r=this.g=this.b=n;else{const s=n<=.5?n*(1+t):n+t-n*t,o=2*n-s;this.r=Js(o,s,e+1/3),this.g=Js(o,s,e),this.b=Js(o,s,e-1/3)}return vt.colorSpaceToWorking(this,r),this}setStyle(e,t=Jt){function n(s){s!==void 0&&parseFloat(s)<1&&qe("Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const o=r[1],a=r[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:qe("Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(s,16),t);qe("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Jt){const n=Gc[e.toLowerCase()];return n!==void 0?this.setHex(n,t):qe("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Yn(e.r),this.g=Yn(e.g),this.b=Yn(e.b),this}copyLinearToSRGB(e){return this.r=ji(e.r),this.g=ji(e.g),this.b=ji(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Jt){return vt.workingToColorSpace(Zt.copy(this),e),Math.round(dt(Zt.r*255,0,255))*65536+Math.round(dt(Zt.g*255,0,255))*256+Math.round(dt(Zt.b*255,0,255))}getHexString(e=Jt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=vt.workingColorSpace){vt.workingToColorSpace(Zt.copy(this),t);const n=Zt.r,r=Zt.g,s=Zt.b,o=Math.max(n,r,s),a=Math.min(n,r,s);let l,c;const u=(a+o)/2;if(a===o)l=0,c=0;else{const d=o-a;switch(c=u<=.5?d/(o+a):d/(2-o-a),o){case n:l=(r-s)/d+(r<s?6:0);break;case r:l=(s-n)/d+2;break;case s:l=(n-r)/d+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=vt.workingColorSpace){return vt.workingToColorSpace(Zt.copy(this),t),e.r=Zt.r,e.g=Zt.g,e.b=Zt.b,e}getStyle(e=Jt){vt.workingToColorSpace(Zt.copy(this),e);const t=Zt.r,n=Zt.g,r=Zt.b;return e!==Jt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(r*255)})`}offsetHSL(e,t,n){return this.getHSL(Qn),this.setHSL(Qn.h+e,Qn.s+t,Qn.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Qn),e.getHSL(kr);const n=Xs(Qn.h,kr.h,t),r=Xs(Qn.s,kr.s,t),s=Xs(Qn.l,kr.l,t);return this.setHSL(n,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*r,this.g=s[1]*t+s[4]*n+s[7]*r,this.b=s[2]*t+s[5]*n+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Zt=new pt;pt.NAMES=Gc;class au extends Vt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Fn,this.environmentIntensity=1,this.environmentRotation=new Fn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}const Sn=new H,kn=new H,Qs=new H,zn=new H,Fi=new H,Gi=new H,gl=new H,eo=new H,to=new H,no=new H,io=new Nt,ro=new Nt,so=new Nt;class yn{constructor(e=new H,t=new H,n=new H){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),Sn.subVectors(e,t),r.cross(Sn);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,n,r,s){Sn.subVectors(r,t),kn.subVectors(n,t),Qs.subVectors(e,t);const o=Sn.dot(Sn),a=Sn.dot(kn),l=Sn.dot(Qs),c=kn.dot(kn),u=kn.dot(Qs),d=o*c-a*a;if(d===0)return s.set(0,0,0),null;const f=1/d,v=(c*l-a*u)*f,x=(o*u-a*l)*f;return s.set(1-v-x,x,v)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,zn)===null?!1:zn.x>=0&&zn.y>=0&&zn.x+zn.y<=1}static getInterpolation(e,t,n,r,s,o,a,l){return this.getBarycoord(e,t,n,r,zn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,zn.x),l.addScaledVector(o,zn.y),l.addScaledVector(a,zn.z),l)}static getInterpolatedAttribute(e,t,n,r,s,o){return io.setScalar(0),ro.setScalar(0),so.setScalar(0),io.fromBufferAttribute(e,t),ro.fromBufferAttribute(e,n),so.fromBufferAttribute(e,r),o.setScalar(0),o.addScaledVector(io,s.x),o.addScaledVector(ro,s.y),o.addScaledVector(so,s.z),o}static isFrontFacing(e,t,n,r){return Sn.subVectors(n,t),kn.subVectors(e,t),Sn.cross(kn).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Sn.subVectors(this.c,this.b),kn.subVectors(this.a,this.b),Sn.cross(kn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return yn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return yn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,r,s){return yn.getInterpolation(e,this.a,this.b,this.c,t,n,r,s)}containsPoint(e){return yn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return yn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,r=this.b,s=this.c;let o,a;Fi.subVectors(r,n),Gi.subVectors(s,n),eo.subVectors(e,n);const l=Fi.dot(eo),c=Gi.dot(eo);if(l<=0&&c<=0)return t.copy(n);to.subVectors(e,r);const u=Fi.dot(to),d=Gi.dot(to);if(u>=0&&d<=u)return t.copy(r);const f=l*d-u*c;if(f<=0&&l>=0&&u<=0)return o=l/(l-u),t.copy(n).addScaledVector(Fi,o);no.subVectors(e,s);const v=Fi.dot(no),x=Gi.dot(no);if(x>=0&&v<=x)return t.copy(s);const y=v*c-l*x;if(y<=0&&c>=0&&x<=0)return a=c/(c-x),t.copy(n).addScaledVector(Gi,a);const _=u*x-v*d;if(_<=0&&d-u>=0&&v-x>=0)return gl.subVectors(s,r),a=(d-u)/(d-u+(v-x)),t.copy(r).addScaledVector(gl,a);const p=1/(_+y+f);return o=y*p,a=f*p,t.copy(n).addScaledVector(Fi,o).addScaledVector(Gi,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class Dr{constructor(e=new H(1/0,1/0,1/0),t=new H(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Mn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Mn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=Mn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const s=n.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,Mn):Mn.fromBufferAttribute(s,o),Mn.applyMatrix4(e.matrixWorld),this.expandByPoint(Mn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),zr.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),zr.copy(n.boundingBox)),zr.applyMatrix4(e.matrixWorld),this.union(zr)}const r=e.children;for(let s=0,o=r.length;s<o;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Mn),Mn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(hr),Hr.subVectors(this.max,hr),Bi.subVectors(e.a,hr),ki.subVectors(e.b,hr),zi.subVectors(e.c,hr),ei.subVectors(ki,Bi),ti.subVectors(zi,ki),fi.subVectors(Bi,zi);let t=[0,-ei.z,ei.y,0,-ti.z,ti.y,0,-fi.z,fi.y,ei.z,0,-ei.x,ti.z,0,-ti.x,fi.z,0,-fi.x,-ei.y,ei.x,0,-ti.y,ti.x,0,-fi.y,fi.x,0];return!oo(t,Bi,ki,zi,Hr)||(t=[1,0,0,0,1,0,0,0,1],!oo(t,Bi,ki,zi,Hr))?!1:(Wr.crossVectors(ei,ti),t=[Wr.x,Wr.y,Wr.z],oo(t,Bi,ki,zi,Hr))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Mn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Mn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Hn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Hn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Hn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Hn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Hn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Hn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Hn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Hn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Hn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const Hn=[new H,new H,new H,new H,new H,new H,new H,new H],Mn=new H,zr=new Dr,Bi=new H,ki=new H,zi=new H,ei=new H,ti=new H,fi=new H,hr=new H,Hr=new H,Wr=new H,di=new H;function oo(i,e,t,n,r){for(let s=0,o=i.length-3;s<=o;s+=3){di.fromArray(i,s);const a=r.x*Math.abs(di.x)+r.y*Math.abs(di.y)+r.z*Math.abs(di.z),l=e.dot(di),c=t.dot(di),u=n.dot(di);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>a)return!1}return!0}const Gt=new H,Vr=new ct;let lu=0;class On{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:lu++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=nl,this.updateRanges=[],this.gpuType=In,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Vr.fromBufferAttribute(this,t),Vr.applyMatrix3(e),this.setXY(t,Vr.x,Vr.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Gt.fromBufferAttribute(this,t),Gt.applyMatrix3(e),this.setXYZ(t,Gt.x,Gt.y,Gt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Gt.fromBufferAttribute(this,t),Gt.applyMatrix4(e),this.setXYZ(t,Gt.x,Gt.y,Gt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Gt.fromBufferAttribute(this,t),Gt.applyNormalMatrix(e),this.setXYZ(t,Gt.x,Gt.y,Gt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Gt.fromBufferAttribute(this,t),Gt.transformDirection(e),this.setXYZ(t,Gt.x,Gt.y,Gt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=lr(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=nn(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=lr(t,this.array)),t}setX(e,t){return this.normalized&&(t=nn(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=lr(t,this.array)),t}setY(e,t){return this.normalized&&(t=nn(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=lr(t,this.array)),t}setZ(e,t){return this.normalized&&(t=nn(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=lr(t,this.array)),t}setW(e,t){return this.normalized&&(t=nn(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=nn(t,this.array),n=nn(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=nn(t,this.array),n=nn(n,this.array),r=nn(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,s){return e*=this.itemSize,this.normalized&&(t=nn(t,this.array),n=nn(n,this.array),r=nn(r,this.array),s=nn(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==nl&&(e.usage=this.usage),e}}class Bc extends On{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class kc extends On{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class Ft extends On{constructor(e,t,n){super(new Float32Array(e),t,n)}}const cu=new Dr,ur=new H,ao=new H;class Cs{constructor(e=new H,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):cu.setFromPoints(e).getCenter(n);let r=0;for(let s=0,o=e.length;s<o;s++)r=Math.max(r,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;ur.subVectors(e,this.center);const t=ur.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),r=(n-this.radius)*.5;this.center.addScaledVector(ur,r/n),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(ao.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(ur.copy(e.center).add(ao)),this.expandByPoint(ur.copy(e.center).sub(ao))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let hu=0;const dn=new It,lo=new Vt,Hi=new H,cn=new Dr,fr=new Dr,Ht=new H;class tn extends ir{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:hu++}),this.uuid=Ir(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Wh(e)?kc:Bc)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new tt().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return dn.makeRotationFromQuaternion(e),this.applyMatrix4(dn),this}rotateX(e){return dn.makeRotationX(e),this.applyMatrix4(dn),this}rotateY(e){return dn.makeRotationY(e),this.applyMatrix4(dn),this}rotateZ(e){return dn.makeRotationZ(e),this.applyMatrix4(dn),this}translate(e,t,n){return dn.makeTranslation(e,t,n),this.applyMatrix4(dn),this}scale(e,t,n){return dn.makeScale(e,t,n),this.applyMatrix4(dn),this}lookAt(e){return lo.lookAt(e),lo.updateMatrix(),this.applyMatrix4(lo.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Hi).negate(),this.translate(Hi.x,Hi.y,Hi.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let r=0,s=e.length;r<s;r++){const o=e[r];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new Ft(n,3))}else{const n=Math.min(e.length,t.count);for(let r=0;r<n;r++){const s=e[r];t.setXYZ(r,s.x,s.y,s.z||0)}e.length>t.count&&qe("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Dr);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){_t("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new H(-1/0,-1/0,-1/0),new H(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,r=t.length;n<r;n++){const s=t[n];cn.setFromBufferAttribute(s),this.morphTargetsRelative?(Ht.addVectors(this.boundingBox.min,cn.min),this.boundingBox.expandByPoint(Ht),Ht.addVectors(this.boundingBox.max,cn.max),this.boundingBox.expandByPoint(Ht)):(this.boundingBox.expandByPoint(cn.min),this.boundingBox.expandByPoint(cn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&_t('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Cs);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){_t("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new H,1/0);return}if(e){const n=this.boundingSphere.center;if(cn.setFromBufferAttribute(e),t)for(let s=0,o=t.length;s<o;s++){const a=t[s];fr.setFromBufferAttribute(a),this.morphTargetsRelative?(Ht.addVectors(cn.min,fr.min),cn.expandByPoint(Ht),Ht.addVectors(cn.max,fr.max),cn.expandByPoint(Ht)):(cn.expandByPoint(fr.min),cn.expandByPoint(fr.max))}cn.getCenter(n);let r=0;for(let s=0,o=e.count;s<o;s++)Ht.fromBufferAttribute(e,s),r=Math.max(r,n.distanceToSquared(Ht));if(t)for(let s=0,o=t.length;s<o;s++){const a=t[s],l=this.morphTargetsRelative;for(let c=0,u=a.count;c<u;c++)Ht.fromBufferAttribute(a,c),l&&(Hi.fromBufferAttribute(e,c),Ht.add(Hi)),r=Math.max(r,n.distanceToSquared(Ht))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&_t('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){_t("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,r=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new On(new Float32Array(4*n.count),4));const o=this.getAttribute("tangent"),a=[],l=[];for(let E=0;E<n.count;E++)a[E]=new H,l[E]=new H;const c=new H,u=new H,d=new H,f=new ct,v=new ct,x=new ct,y=new H,_=new H;function p(E,w,Z){c.fromBufferAttribute(n,E),u.fromBufferAttribute(n,w),d.fromBufferAttribute(n,Z),f.fromBufferAttribute(s,E),v.fromBufferAttribute(s,w),x.fromBufferAttribute(s,Z),u.sub(c),d.sub(c),v.sub(f),x.sub(f);const D=1/(v.x*x.y-x.x*v.y);isFinite(D)&&(y.copy(u).multiplyScalar(x.y).addScaledVector(d,-v.y).multiplyScalar(D),_.copy(d).multiplyScalar(v.x).addScaledVector(u,-x.x).multiplyScalar(D),a[E].add(y),a[w].add(y),a[Z].add(y),l[E].add(_),l[w].add(_),l[Z].add(_))}let b=this.groups;b.length===0&&(b=[{start:0,count:e.count}]);for(let E=0,w=b.length;E<w;++E){const Z=b[E],D=Z.start,V=Z.count;for(let $=D,q=D+V;$<q;$+=3)p(e.getX($+0),e.getX($+1),e.getX($+2))}const C=new H,A=new H,I=new H,P=new H;function U(E){I.fromBufferAttribute(r,E),P.copy(I);const w=a[E];C.copy(w),C.sub(I.multiplyScalar(I.dot(w))).normalize(),A.crossVectors(P,w);const D=A.dot(l[E])<0?-1:1;o.setXYZW(E,C.x,C.y,C.z,D)}for(let E=0,w=b.length;E<w;++E){const Z=b[E],D=Z.start,V=Z.count;for(let $=D,q=D+V;$<q;$+=3)U(e.getX($+0)),U(e.getX($+1)),U(e.getX($+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new On(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let f=0,v=n.count;f<v;f++)n.setXYZ(f,0,0,0);const r=new H,s=new H,o=new H,a=new H,l=new H,c=new H,u=new H,d=new H;if(e)for(let f=0,v=e.count;f<v;f+=3){const x=e.getX(f+0),y=e.getX(f+1),_=e.getX(f+2);r.fromBufferAttribute(t,x),s.fromBufferAttribute(t,y),o.fromBufferAttribute(t,_),u.subVectors(o,s),d.subVectors(r,s),u.cross(d),a.fromBufferAttribute(n,x),l.fromBufferAttribute(n,y),c.fromBufferAttribute(n,_),a.add(u),l.add(u),c.add(u),n.setXYZ(x,a.x,a.y,a.z),n.setXYZ(y,l.x,l.y,l.z),n.setXYZ(_,c.x,c.y,c.z)}else for(let f=0,v=t.count;f<v;f+=3)r.fromBufferAttribute(t,f+0),s.fromBufferAttribute(t,f+1),o.fromBufferAttribute(t,f+2),u.subVectors(o,s),d.subVectors(r,s),u.cross(d),n.setXYZ(f+0,u.x,u.y,u.z),n.setXYZ(f+1,u.x,u.y,u.z),n.setXYZ(f+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Ht.fromBufferAttribute(e,t),Ht.normalize(),e.setXYZ(t,Ht.x,Ht.y,Ht.z)}toNonIndexed(){function e(a,l){const c=a.array,u=a.itemSize,d=a.normalized,f=new c.constructor(l.length*u);let v=0,x=0;for(let y=0,_=l.length;y<_;y++){a.isInterleavedBufferAttribute?v=l[y]*a.data.stride+a.offset:v=l[y]*u;for(let p=0;p<u;p++)f[x++]=c[v++]}return new On(f,u,d)}if(this.index===null)return qe("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new tn,n=this.index.array,r=this.attributes;for(const a in r){const l=r[a],c=e(l,n);t.setAttribute(a,c)}const s=this.morphAttributes;for(const a in s){const l=[],c=s[a];for(let u=0,d=c.length;u<d;u++){const f=c[u],v=e(f,n);l.push(v)}t.morphAttributes[a]=l}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const c=n[l];e.data.attributes[l]=c.toJSON(e.data)}const r={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let d=0,f=c.length;d<f;d++){const v=c[d];u.push(v.toJSON(e.data))}u.length>0&&(r[l]=u,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere=a.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone());const r=e.attributes;for(const c in r){const u=r[c];this.setAttribute(c,u.clone(t))}const s=e.morphAttributes;for(const c in s){const u=[],d=s[c];for(let f=0,v=d.length;f<v;f++)u.push(d[f].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let c=0,u=o.length;c<u;c++){const d=o[c];this.addGroup(d.start,d.count,d.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}let uu=0;class sr extends ir{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:uu++}),this.uuid=Ir(),this.name="",this.type="Material",this.blending=qi,this.side=ci,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Io,this.blendDst=Do,this.blendEquation=Mi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new pt(0,0,0),this.blendAlpha=0,this.depthFunc=Pn,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=tl,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Di,this.stencilZFail=Di,this.stencilZPass=Di,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){qe(`Material: parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){qe(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(n):r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==qi&&(n.blending=this.blending),this.side!==ci&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Io&&(n.blendSrc=this.blendSrc),this.blendDst!==Do&&(n.blendDst=this.blendDst),this.blendEquation!==Mi&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Pn&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==tl&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Di&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Di&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Di&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.allowOverride===!1&&(n.allowOverride=!1),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(s){const o=[];for(const a in s){const l=s[a];delete l.metadata,o.push(l)}return o}if(t){const s=r(e.textures),o=r(e.images);s.length>0&&(n.textures=s),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const r=t.length;n=new Array(r);for(let s=0;s!==r;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}const Wn=new H,co=new H,Xr=new H,ni=new H,ho=new H,$r=new H,uo=new H;class Ba{constructor(e=new H,t=new H(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Wn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Wn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Wn.copy(this.origin).addScaledVector(this.direction,t),Wn.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){co.copy(e).add(t).multiplyScalar(.5),Xr.copy(t).sub(e).normalize(),ni.copy(this.origin).sub(co);const s=e.distanceTo(t)*.5,o=-this.direction.dot(Xr),a=ni.dot(this.direction),l=-ni.dot(Xr),c=ni.lengthSq(),u=Math.abs(1-o*o);let d,f,v,x;if(u>0)if(d=o*l-a,f=o*a-l,x=s*u,d>=0)if(f>=-x)if(f<=x){const y=1/u;d*=y,f*=y,v=d*(d+o*f+2*a)+f*(o*d+f+2*l)+c}else f=s,d=Math.max(0,-(o*f+a)),v=-d*d+f*(f+2*l)+c;else f=-s,d=Math.max(0,-(o*f+a)),v=-d*d+f*(f+2*l)+c;else f<=-x?(d=Math.max(0,-(-o*s+a)),f=d>0?-s:Math.min(Math.max(-s,-l),s),v=-d*d+f*(f+2*l)+c):f<=x?(d=0,f=Math.min(Math.max(-s,-l),s),v=f*(f+2*l)+c):(d=Math.max(0,-(o*s+a)),f=d>0?s:Math.min(Math.max(-s,-l),s),v=-d*d+f*(f+2*l)+c);else f=o>0?-s:s,d=Math.max(0,-(o*f+a)),v=-d*d+f*(f+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,d),r&&r.copy(co).addScaledVector(Xr,f),v}intersectSphere(e,t){Wn.subVectors(e.center,this.origin);const n=Wn.dot(this.direction),r=Wn.dot(Wn)-n*n,s=e.radius*e.radius;if(r>s)return null;const o=Math.sqrt(s-r),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,t):this.at(a,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,s,o,a,l;const c=1/this.direction.x,u=1/this.direction.y,d=1/this.direction.z,f=this.origin;return c>=0?(n=(e.min.x-f.x)*c,r=(e.max.x-f.x)*c):(n=(e.max.x-f.x)*c,r=(e.min.x-f.x)*c),u>=0?(s=(e.min.y-f.y)*u,o=(e.max.y-f.y)*u):(s=(e.max.y-f.y)*u,o=(e.min.y-f.y)*u),n>o||s>r||((s>n||isNaN(n))&&(n=s),(o<r||isNaN(r))&&(r=o),d>=0?(a=(e.min.z-f.z)*d,l=(e.max.z-f.z)*d):(a=(e.max.z-f.z)*d,l=(e.min.z-f.z)*d),n>l||a>r)||((a>n||n!==n)&&(n=a),(l<r||r!==r)&&(r=l),r<0)?null:this.at(n>=0?n:r,t)}intersectsBox(e){return this.intersectBox(e,Wn)!==null}intersectTriangle(e,t,n,r,s){ho.subVectors(t,e),$r.subVectors(n,e),uo.crossVectors(ho,$r);let o=this.direction.dot(uo),a;if(o>0){if(r)return null;a=1}else if(o<0)a=-1,o=-o;else return null;ni.subVectors(this.origin,e);const l=a*this.direction.dot($r.crossVectors(ni,$r));if(l<0)return null;const c=a*this.direction.dot(ho.cross(ni));if(c<0||l+c>o)return null;const u=-a*ni.dot(uo);return u<0?null:this.at(u/o,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Vn extends sr{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new pt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Fn,this.combine=Sc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const _l=new It,pi=new Ba,Yr=new Cs,vl=new H,qr=new H,jr=new H,Zr=new H,fo=new H,Kr=new H,xl=new H,Jr=new H;class nt extends Vt{constructor(e=new tn,t=new Vn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(e,t){const n=this.geometry,r=n.attributes.position,s=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(r,e);const a=this.morphTargetInfluences;if(s&&a){Kr.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const u=a[l],d=s[l];u!==0&&(fo.fromBufferAttribute(d,e),o?Kr.addScaledVector(fo,u):Kr.addScaledVector(fo.sub(t),u))}t.add(Kr)}return t}raycast(e,t){const n=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Yr.copy(n.boundingSphere),Yr.applyMatrix4(s),pi.copy(e.ray).recast(e.near),!(Yr.containsPoint(pi.origin)===!1&&(pi.intersectSphere(Yr,vl)===null||pi.origin.distanceToSquared(vl)>(e.far-e.near)**2))&&(_l.copy(s).invert(),pi.copy(e.ray).applyMatrix4(_l),!(n.boundingBox!==null&&pi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,pi)))}_computeIntersections(e,t,n){let r;const s=this.geometry,o=this.material,a=s.index,l=s.attributes.position,c=s.attributes.uv,u=s.attributes.uv1,d=s.attributes.normal,f=s.groups,v=s.drawRange;if(a!==null)if(Array.isArray(o))for(let x=0,y=f.length;x<y;x++){const _=f[x],p=o[_.materialIndex],b=Math.max(_.start,v.start),C=Math.min(a.count,Math.min(_.start+_.count,v.start+v.count));for(let A=b,I=C;A<I;A+=3){const P=a.getX(A),U=a.getX(A+1),E=a.getX(A+2);r=Qr(this,p,e,n,c,u,d,P,U,E),r&&(r.faceIndex=Math.floor(A/3),r.face.materialIndex=_.materialIndex,t.push(r))}}else{const x=Math.max(0,v.start),y=Math.min(a.count,v.start+v.count);for(let _=x,p=y;_<p;_+=3){const b=a.getX(_),C=a.getX(_+1),A=a.getX(_+2);r=Qr(this,o,e,n,c,u,d,b,C,A),r&&(r.faceIndex=Math.floor(_/3),t.push(r))}}else if(l!==void 0)if(Array.isArray(o))for(let x=0,y=f.length;x<y;x++){const _=f[x],p=o[_.materialIndex],b=Math.max(_.start,v.start),C=Math.min(l.count,Math.min(_.start+_.count,v.start+v.count));for(let A=b,I=C;A<I;A+=3){const P=A,U=A+1,E=A+2;r=Qr(this,p,e,n,c,u,d,P,U,E),r&&(r.faceIndex=Math.floor(A/3),r.face.materialIndex=_.materialIndex,t.push(r))}}else{const x=Math.max(0,v.start),y=Math.min(l.count,v.start+v.count);for(let _=x,p=y;_<p;_+=3){const b=_,C=_+1,A=_+2;r=Qr(this,o,e,n,c,u,d,b,C,A),r&&(r.faceIndex=Math.floor(_/3),t.push(r))}}}}function fu(i,e,t,n,r,s,o,a){let l;if(e.side===sn?l=n.intersectTriangle(o,s,r,!0,a):l=n.intersectTriangle(r,s,o,e.side===ci,a),l===null)return null;Jr.copy(a),Jr.applyMatrix4(i.matrixWorld);const c=t.ray.origin.distanceTo(Jr);return c<t.near||c>t.far?null:{distance:c,point:Jr.clone(),object:i}}function Qr(i,e,t,n,r,s,o,a,l,c){i.getVertexPosition(a,qr),i.getVertexPosition(l,jr),i.getVertexPosition(c,Zr);const u=fu(i,e,t,n,qr,jr,Zr,xl);if(u){const d=new H;yn.getBarycoord(xl,qr,jr,Zr,d),r&&(u.uv=yn.getInterpolatedAttribute(r,a,l,c,d,new ct)),s&&(u.uv1=yn.getInterpolatedAttribute(s,a,l,c,d,new ct)),o&&(u.normal=yn.getInterpolatedAttribute(o,a,l,c,d,new H),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));const f={a,b:l,c,normal:new H,materialIndex:0};yn.getNormal(qr,jr,Zr,f.normal),u.face=f,u.barycoord=d}return u}class du extends Qt{constructor(e=null,t=1,n=1,r,s,o,a,l,c=Yt,u=Yt,d,f){super(null,o,a,l,c,u,r,s,d,f),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const po=new H,pu=new H,mu=new tt;class Si{constructor(e=new H(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const r=po.subVectors(n,t).cross(pu.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(po),r=this.normal.dot(n);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:t.copy(e.start).addScaledVector(n,s)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||mu.getNormalMatrix(e),r=this.coplanarPoint(po).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const mi=new Cs,gu=new ct(.5,.5),es=new H;class ka{constructor(e=new Si,t=new Si,n=new Si,r=new Si,s=new Si,o=new Si){this.planes=[e,t,n,r,s,o]}set(e,t,n,r,s,o){const a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(r),a[4].copy(s),a[5].copy(o),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Dn,n=!1){const r=this.planes,s=e.elements,o=s[0],a=s[1],l=s[2],c=s[3],u=s[4],d=s[5],f=s[6],v=s[7],x=s[8],y=s[9],_=s[10],p=s[11],b=s[12],C=s[13],A=s[14],I=s[15];if(r[0].setComponents(c-o,v-u,p-x,I-b).normalize(),r[1].setComponents(c+o,v+u,p+x,I+b).normalize(),r[2].setComponents(c+a,v+d,p+y,I+C).normalize(),r[3].setComponents(c-a,v-d,p-y,I-C).normalize(),n)r[4].setComponents(l,f,_,A).normalize(),r[5].setComponents(c-l,v-f,p-_,I-A).normalize();else if(r[4].setComponents(c-l,v-f,p-_,I-A).normalize(),t===Dn)r[5].setComponents(c+l,v+f,p+_,I+A).normalize();else if(t===Cr)r[5].setComponents(l,f,_,A).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),mi.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),mi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(mi)}intersectsSprite(e){mi.center.set(0,0,0);const t=gu.distanceTo(e.center);return mi.radius=.7071067811865476+t,mi.applyMatrix4(e.matrixWorld),this.intersectsSphere(mi)}intersectsSphere(e){const t=this.planes,n=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const r=t[n];if(es.x=r.normal.x>0?e.max.x:e.min.x,es.y=r.normal.y>0?e.max.y:e.min.y,es.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(es)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class zc extends sr{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new pt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Ms=new H,ys=new H,Sl=new It,dr=new Ba,ts=new Cs,mo=new H,Ml=new H;class _u extends Vt{constructor(e=new tn,t=new zc){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let r=1,s=t.count;r<s;r++)Ms.fromBufferAttribute(t,r-1),ys.fromBufferAttribute(t,r),n[r]=n[r-1],n[r]+=Ms.distanceTo(ys);e.setAttribute("lineDistance",new Ft(n,1))}else qe("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,r=this.matrixWorld,s=e.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),ts.copy(n.boundingSphere),ts.applyMatrix4(r),ts.radius+=s,e.ray.intersectsSphere(ts)===!1)return;Sl.copy(r).invert(),dr.copy(e.ray).applyMatrix4(Sl);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=this.isLineSegments?2:1,u=n.index,f=n.attributes.position;if(u!==null){const v=Math.max(0,o.start),x=Math.min(u.count,o.start+o.count);for(let y=v,_=x-1;y<_;y+=c){const p=u.getX(y),b=u.getX(y+1),C=ns(this,e,dr,l,p,b,y);C&&t.push(C)}if(this.isLineLoop){const y=u.getX(x-1),_=u.getX(v),p=ns(this,e,dr,l,y,_,x-1);p&&t.push(p)}}else{const v=Math.max(0,o.start),x=Math.min(f.count,o.start+o.count);for(let y=v,_=x-1;y<_;y+=c){const p=ns(this,e,dr,l,y,y+1,y);p&&t.push(p)}if(this.isLineLoop){const y=ns(this,e,dr,l,x-1,v,x-1);y&&t.push(y)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}function ns(i,e,t,n,r,s,o){const a=i.geometry.attributes.position;if(Ms.fromBufferAttribute(a,r),ys.fromBufferAttribute(a,s),t.distanceSqToSegment(Ms,ys,mo,Ml)>n)return;mo.applyMatrix4(i.matrixWorld);const c=e.ray.origin.distanceTo(mo);if(!(c<e.near||c>e.far))return{distance:c,point:Ml.clone().applyMatrix4(i.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:i}}class Hc extends Qt{constructor(e=[],t=wi,n,r,s,o,a,l,c,u){super(e,t,n,r,s,o,a,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class xa extends Qt{constructor(e,t,n,r,s,o,a,l,c){super(e,t,n,r,s,o,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Pr extends Qt{constructor(e,t,n=Nn,r,s,o,a=Yt,l=Yt,c,u=jn,d=1){if(u!==jn&&u!==bi)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const f={width:e,height:t,depth:d};super(f,r,s,o,a,l,u,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Fa(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class vu extends Pr{constructor(e,t=Nn,n=wi,r,s,o=Yt,a=Yt,l,c=jn){const u={width:e,height:e,depth:1},d=[u,u,u,u,u,u];super(e,e,t,n,r,s,o,a,l,c),this.image=d,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class Wc extends Qt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class Lt extends tn{constructor(e=1,t=1,n=1,r=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:s,depthSegments:o};const a=this;r=Math.floor(r),s=Math.floor(s),o=Math.floor(o);const l=[],c=[],u=[],d=[];let f=0,v=0;x("z","y","x",-1,-1,n,t,e,o,s,0),x("z","y","x",1,-1,n,t,-e,o,s,1),x("x","z","y",1,1,e,n,t,r,o,2),x("x","z","y",1,-1,e,n,-t,r,o,3),x("x","y","z",1,-1,e,t,n,r,s,4),x("x","y","z",-1,-1,e,t,-n,r,s,5),this.setIndex(l),this.setAttribute("position",new Ft(c,3)),this.setAttribute("normal",new Ft(u,3)),this.setAttribute("uv",new Ft(d,2));function x(y,_,p,b,C,A,I,P,U,E,w){const Z=A/U,D=I/E,V=A/2,$=I/2,q=P/2,X=U+1,Y=E+1;let z=0,ae=0;const ne=new H;for(let ye=0;ye<Y;ye++){const Te=ye*D-$;for(let be=0;be<X;be++){const Ze=be*Z-V;ne[y]=Ze*b,ne[_]=Te*C,ne[p]=q,c.push(ne.x,ne.y,ne.z),ne[y]=0,ne[_]=0,ne[p]=P>0?1:-1,u.push(ne.x,ne.y,ne.z),d.push(be/U),d.push(1-ye/E),z+=1}}for(let ye=0;ye<E;ye++)for(let Te=0;Te<U;Te++){const be=f+Te+X*ye,Ze=f+Te+X*(ye+1),Rt=f+(Te+1)+X*(ye+1),bt=f+(Te+1)+X*ye;l.push(be,Ze,bt),l.push(Ze,Rt,bt),ae+=6}a.addGroup(v,ae,w),v+=ae,f+=z}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Lt(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class Es extends tn{constructor(e=1,t=32,n=0,r=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:r},t=Math.max(3,t);const s=[],o=[],a=[],l=[],c=new H,u=new ct;o.push(0,0,0),a.push(0,0,1),l.push(.5,.5);for(let d=0,f=3;d<=t;d++,f+=3){const v=n+d/t*r;c.x=e*Math.cos(v),c.y=e*Math.sin(v),o.push(c.x,c.y,c.z),a.push(0,0,1),u.x=(o[f]/e+1)/2,u.y=(o[f+1]/e+1)/2,l.push(u.x,u.y)}for(let d=1;d<=t;d++)s.push(d,d+1,0);this.setIndex(s),this.setAttribute("position",new Ft(o,3)),this.setAttribute("normal",new Ft(a,3)),this.setAttribute("uv",new Ft(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Es(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class za extends tn{constructor(e=1,t=1,n=1,r=32,s=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:r,heightSegments:s,openEnded:o,thetaStart:a,thetaLength:l};const c=this;r=Math.floor(r),s=Math.floor(s);const u=[],d=[],f=[],v=[];let x=0;const y=[],_=n/2;let p=0;b(),o===!1&&(e>0&&C(!0),t>0&&C(!1)),this.setIndex(u),this.setAttribute("position",new Ft(d,3)),this.setAttribute("normal",new Ft(f,3)),this.setAttribute("uv",new Ft(v,2));function b(){const A=new H,I=new H;let P=0;const U=(t-e)/n;for(let E=0;E<=s;E++){const w=[],Z=E/s,D=Z*(t-e)+e;for(let V=0;V<=r;V++){const $=V/r,q=$*l+a,X=Math.sin(q),Y=Math.cos(q);I.x=D*X,I.y=-Z*n+_,I.z=D*Y,d.push(I.x,I.y,I.z),A.set(X,U,Y).normalize(),f.push(A.x,A.y,A.z),v.push($,1-Z),w.push(x++)}y.push(w)}for(let E=0;E<r;E++)for(let w=0;w<s;w++){const Z=y[w][E],D=y[w+1][E],V=y[w+1][E+1],$=y[w][E+1];(e>0||w!==0)&&(u.push(Z,D,$),P+=3),(t>0||w!==s-1)&&(u.push(D,V,$),P+=3)}c.addGroup(p,P,0),p+=P}function C(A){const I=x,P=new ct,U=new H;let E=0;const w=A===!0?e:t,Z=A===!0?1:-1;for(let V=1;V<=r;V++)d.push(0,_*Z,0),f.push(0,Z,0),v.push(.5,.5),x++;const D=x;for(let V=0;V<=r;V++){const q=V/r*l+a,X=Math.cos(q),Y=Math.sin(q);U.x=w*Y,U.y=_*Z,U.z=w*X,d.push(U.x,U.y,U.z),f.push(0,Z,0),P.x=X*.5+.5,P.y=Y*.5*Z+.5,v.push(P.x,P.y),x++}for(let V=0;V<r;V++){const $=I+V,q=D+V;A===!0?u.push(q,q+1,$):u.push(q+1,q,$),E+=3}c.addGroup(p,E,A===!0?1:2),p+=E}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new za(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Ha extends za{constructor(e=1,t=1,n=32,r=1,s=!1,o=0,a=Math.PI*2){super(0,e,t,n,r,s,o,a),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:r,openEnded:s,thetaStart:o,thetaLength:a}}static fromJSON(e){return new Ha(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Lr extends tn{constructor(e=1,t=1,n=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};const s=e/2,o=t/2,a=Math.floor(n),l=Math.floor(r),c=a+1,u=l+1,d=e/a,f=t/l,v=[],x=[],y=[],_=[];for(let p=0;p<u;p++){const b=p*f-o;for(let C=0;C<c;C++){const A=C*d-s;x.push(A,-b,0),y.push(0,0,1),_.push(C/a),_.push(1-p/l)}}for(let p=0;p<l;p++)for(let b=0;b<a;b++){const C=b+c*p,A=b+c*(p+1),I=b+1+c*(p+1),P=b+1+c*p;v.push(C,A,P),v.push(A,I,P)}this.setIndex(v),this.setAttribute("position",new Ft(x,3)),this.setAttribute("normal",new Ft(y,3)),this.setAttribute("uv",new Ft(_,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Lr(e.width,e.height,e.widthSegments,e.heightSegments)}}class Wa extends tn{constructor(e=.5,t=1,n=32,r=1,s=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:r,thetaStart:s,thetaLength:o},n=Math.max(3,n),r=Math.max(1,r);const a=[],l=[],c=[],u=[];let d=e;const f=(t-e)/r,v=new H,x=new ct;for(let y=0;y<=r;y++){for(let _=0;_<=n;_++){const p=s+_/n*o;v.x=d*Math.cos(p),v.y=d*Math.sin(p),l.push(v.x,v.y,v.z),c.push(0,0,1),x.x=(v.x/t+1)/2,x.y=(v.y/t+1)/2,u.push(x.x,x.y)}d+=f}for(let y=0;y<r;y++){const _=y*(n+1);for(let p=0;p<n;p++){const b=p+_,C=b,A=b+n+1,I=b+n+2,P=b+1;a.push(C,A,P),a.push(A,I,P)}}this.setIndex(a),this.setAttribute("position",new Ft(l,3)),this.setAttribute("normal",new Ft(c,3)),this.setAttribute("uv",new Ft(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Wa(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class oi extends tn{constructor(e=1,t=32,n=16,r=0,s=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:r,phiLength:s,thetaStart:o,thetaLength:a},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const l=Math.min(o+a,Math.PI);let c=0;const u=[],d=new H,f=new H,v=[],x=[],y=[],_=[];for(let p=0;p<=n;p++){const b=[],C=p/n;let A=0;p===0&&o===0?A=.5/t:p===n&&l===Math.PI&&(A=-.5/t);for(let I=0;I<=t;I++){const P=I/t;d.x=-e*Math.cos(r+P*s)*Math.sin(o+C*a),d.y=e*Math.cos(o+C*a),d.z=e*Math.sin(r+P*s)*Math.sin(o+C*a),x.push(d.x,d.y,d.z),f.copy(d).normalize(),y.push(f.x,f.y,f.z),_.push(P+A,1-C),b.push(c++)}u.push(b)}for(let p=0;p<n;p++)for(let b=0;b<t;b++){const C=u[p][b+1],A=u[p][b],I=u[p+1][b],P=u[p+1][b+1];(p!==0||o>0)&&v.push(C,A,P),(p!==n-1||l<Math.PI)&&v.push(A,I,P)}this.setIndex(v),this.setAttribute("position",new Ft(x,3)),this.setAttribute("normal",new Ft(y,3)),this.setAttribute("uv",new Ft(_,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new oi(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}function Qi(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const r=i[t][n];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(qe("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=r.clone():Array.isArray(r)?e[t][n]=r.slice():e[t][n]=r}}return e}function en(i){const e={};for(let t=0;t<i.length;t++){const n=Qi(i[t]);for(const r in n)e[r]=n[r]}return e}function xu(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function Vc(i){const e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:vt.workingColorSpace}const Su={clone:Qi,merge:en};var Mu=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,yu=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Gn extends sr{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Mu,this.fragmentShader=yu,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Qi(e.uniforms),this.uniformsGroups=xu(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const r in this.uniforms){const o=this.uniforms[r].value;o&&o.isTexture?t.uniforms[r]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[r]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[r]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[r]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[r]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[r]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[r]={type:"m4",value:o.toArray()}:t.uniforms[r]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const r in this.extensions)this.extensions[r]===!0&&(n[r]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class Eu extends Gn{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class pn extends sr{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new pt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new pt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Oc,this.normalScale=new ct(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Fn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Tu extends sr{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Oh,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class bu extends sr{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class Va extends Vt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new pt(e),this.intensity=t}dispose(){this.dispatchEvent({type:"dispose"})}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}}class wu extends Va{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Vt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new pt(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){const t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}}const go=new It,yl=new H,El=new H;class Au{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ct(512,512),this.mapType=un,this.map=null,this.mapPass=null,this.matrix=new It,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new ka,this._frameExtents=new ct(1,1),this._viewportCount=1,this._viewports=[new Nt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;yl.setFromMatrixPosition(e.matrixWorld),t.position.copy(yl),El.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(El),t.updateMatrixWorld(),go.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(go,t.coordinateSystem,t.reversedDepth),t.coordinateSystem===Cr||t.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(go)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const is=new H,rs=new rr,wn=new H;class Xc extends Vt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new It,this.projectionMatrix=new It,this.projectionMatrixInverse=new It,this.coordinateSystem=Dn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(is,rs,wn),wn.x===1&&wn.y===1&&wn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(is,rs,wn.set(1,1,1)).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorld.decompose(is,rs,wn),wn.x===1&&wn.y===1&&wn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(is,rs,wn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const ii=new H,Tl=new ct,bl=new ct;class mn extends Xc{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=va*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Vs*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return va*2*Math.atan(Math.tan(Vs*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){ii.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(ii.x,ii.y).multiplyScalar(-e/ii.z),ii.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(ii.x,ii.y).multiplyScalar(-e/ii.z)}getViewSize(e,t){return this.getViewBounds(e,Tl,bl),t.subVectors(bl,Tl)}setViewOffset(e,t,n,r,s,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Vs*.5*this.fov)/this.zoom,n=2*t,r=this.aspect*n,s=-.5*r;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;s+=o.offsetX*r/l,t-=o.offsetY*n/c,r*=o.width/l,n*=o.height/c}const a=this.filmOffset;a!==0&&(s+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}class Xa extends Xc{constructor(e=-1,t=1,n=1,r=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=n-e,o=n+e,a=r+t,l=r-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,o=s+c*this.view.width,a-=u*this.view.offsetY,l=a-u*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class Ru extends Au{constructor(){super(new Xa(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Cu extends Va{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Vt.DEFAULT_UP),this.updateMatrix(),this.target=new Vt,this.shadow=new Ru}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}}class Pu extends Va{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}const Wi=-90,Vi=1;class Iu extends Vt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new mn(Wi,Vi,e,t);r.layers=this.layers,this.add(r);const s=new mn(Wi,Vi,e,t);s.layers=this.layers,this.add(s);const o=new mn(Wi,Vi,e,t);o.layers=this.layers,this.add(o);const a=new mn(Wi,Vi,e,t);a.layers=this.layers,this.add(a);const l=new mn(Wi,Vi,e,t);l.layers=this.layers,this.add(l);const c=new mn(Wi,Vi,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,r,s,o,a,l]=t;for(const c of t)this.remove(c);if(e===Dn)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Cr)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,o,a,l,c,u]=this.children,d=e.getRenderTarget(),f=e.getActiveCubeFace(),v=e.getActiveMipmapLevel(),x=e.xr.enabled;e.xr.enabled=!1;const y=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let _=!1;e.isWebGLRenderer===!0?_=e.state.buffers.depth.getReversed():_=e.reversedDepthBuffer,e.setRenderTarget(n,0,r),_&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(n,1,r),_&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,2,r),_&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,3,r),_&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(n,4,r),_&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),n.texture.generateMipmaps=y,e.setRenderTarget(n,5,r),_&&e.autoClear===!1&&e.clearDepth(),e.render(t,u),e.setRenderTarget(d,f,v),e.xr.enabled=x,n.texture.needsPMREMUpdate=!0}}class Du extends mn{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}const wl=new It;class Lu{constructor(e,t,n=0,r=1/0){this.ray=new Ba(e,t),this.near=n,this.far=r,this.camera=null,this.layers=new Ga,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):_t("Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return wl.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(wl),this}intersectObject(e,t=!0,n=[]){return Sa(e,this,n,t),n.sort(Al),n}intersectObjects(e,t=!0,n=[]){for(let r=0,s=e.length;r<s;r++)Sa(e[r],this,n,t);return n.sort(Al),n}}function Al(i,e){return i.distance-e.distance}function Sa(i,e,t,n){let r=!0;if(i.layers.test(e.layers)&&i.raycast(e,t)===!1&&(r=!1),r===!0&&n===!0){const s=i.children;for(let o=0,a=s.length;o<a;o++)Sa(s[o],e,t,!0)}}function Rl(i,e,t,n){const r=Uu(n);switch(t){case Dc:return i*e;case Uc:return i*e/r.components*r.byteLength;case Da:return i*e/r.components*r.byteLength;case Ki:return i*e*2/r.components*r.byteLength;case La:return i*e*2/r.components*r.byteLength;case Lc:return i*e*3/r.components*r.byteLength;case En:return i*e*4/r.components*r.byteLength;case Ua:return i*e*4/r.components*r.byteLength;case hs:case us:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case fs:case ds:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case zo:case Wo:return Math.max(i,16)*Math.max(e,8)/4;case ko:case Ho:return Math.max(i,8)*Math.max(e,8)/2;case Vo:case Xo:case Yo:case qo:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case $o:case jo:case Zo:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Ko:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Jo:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case Qo:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case ea:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case ta:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case na:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case ia:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case ra:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case sa:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case oa:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case aa:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case la:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case ca:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case ha:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case ua:case fa:case da:return Math.ceil(i/4)*Math.ceil(e/4)*16;case pa:case ma:return Math.ceil(i/4)*Math.ceil(e/4)*8;case ga:case _a:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Uu(i){switch(i){case un:case Rc:return{byteLength:1,components:1};case Ar:case Cc:case qn:return{byteLength:2,components:1};case Pa:case Ia:return{byteLength:2,components:4};case Nn:case Ca:case In:return{byteLength:4,components:1};case Pc:case Ic:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Aa}}));typeof window<"u"&&(window.__THREE__?qe("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Aa);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function $c(){let i=null,e=!1,t=null,n=null;function r(s,o){t(s,o),n=i.requestAnimationFrame(r)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(r),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){i=s}}}function Ou(i){const e=new WeakMap;function t(a,l){const c=a.array,u=a.usage,d=c.byteLength,f=i.createBuffer();i.bindBuffer(l,f),i.bufferData(l,c,u),a.onUploadCallback();let v;if(c instanceof Float32Array)v=i.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)v=i.HALF_FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?v=i.HALF_FLOAT:v=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)v=i.SHORT;else if(c instanceof Uint32Array)v=i.UNSIGNED_INT;else if(c instanceof Int32Array)v=i.INT;else if(c instanceof Int8Array)v=i.BYTE;else if(c instanceof Uint8Array)v=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)v=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:f,type:v,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:d}}function n(a,l,c){const u=l.array,d=l.updateRanges;if(i.bindBuffer(c,a),d.length===0)i.bufferSubData(c,0,u);else{d.sort((v,x)=>v.start-x.start);let f=0;for(let v=1;v<d.length;v++){const x=d[f],y=d[v];y.start<=x.start+x.count+1?x.count=Math.max(x.count,y.start+y.count-x.start):(++f,d[f]=y)}d.length=f+1;for(let v=0,x=d.length;v<x;v++){const y=d[v];i.bufferSubData(c,y.start*u.BYTES_PER_ELEMENT,u,y.start,y.count)}l.clearUpdateRanges()}l.onUploadCallback()}function r(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function s(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=e.get(a);l&&(i.deleteBuffer(l.buffer),e.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const u=e.get(a);(!u||u.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const c=e.get(a);if(c===void 0)e.set(a,t(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,a,l),c.version=a.version}}return{get:r,remove:s,update:o}}var Nu=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Fu=`#ifdef USE_ALPHAHASH
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
#endif`,Gu=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Bu=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,ku=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,zu=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Hu=`#ifdef USE_AOMAP
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
#endif`,Vu=`#ifdef USE_BATCHING
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
#endif`,Xu=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,$u=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Yu=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,qu=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,ju=`#ifdef USE_IRIDESCENCE
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
#endif`,Ku=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Ju=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Qu=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,ef=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,tf=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,nf=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,rf=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,sf=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,of=`#define PI 3.141592653589793
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
} // validated`,af=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,lf=`vec3 transformedNormal = objectNormal;
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
#endif`,cf=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,hf=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,uf=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,ff=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,df="gl_FragColor = linearToOutputTexel( gl_FragColor );",pf=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,mf=`#ifdef USE_ENVMAP
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
#endif`,gf=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,_f=`#ifdef USE_ENVMAP
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
#endif`,vf=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,xf=`#ifdef USE_ENVMAP
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
#endif`,Mf=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,yf=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Ef=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Tf=`#ifdef USE_GRADIENTMAP
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
}`,bf=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,wf=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Af=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Rf=`uniform bool receiveShadow;
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
#endif`,Cf=`#ifdef USE_ENVMAP
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
#endif`,Pf=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,If=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Df=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Lf=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Uf=`PhysicalMaterial material;
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
#endif`,Of=`uniform sampler2D dfgLUT;
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
}`,Nf=`
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
#endif`,Ff=`#if defined( RE_IndirectDiffuse )
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
#endif`,Gf=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Bf=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,kf=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,zf=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Hf=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Wf=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Vf=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Xf=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,$f=`#if defined( USE_POINTS_UV )
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
#endif`,Yf=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,qf=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,jf=`#ifdef USE_INSTANCING_MORPH
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
#endif`,Kf=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Jf=`#ifdef USE_MORPHTARGETS
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
#endif`,Qf=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,ed=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,td=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,nd=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,id=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,rd=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,sd=`#ifdef USE_NORMALMAP
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
#endif`,od=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,ad=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,ld=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,cd=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,hd=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,ud=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,fd=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,dd=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,pd=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,md=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,gd=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,_d=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,vd=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,xd=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Md=`float getShadowMask() {
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
}`,yd=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Ed=`#ifdef USE_SKINNING
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
#endif`,Td=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,bd=`#ifdef USE_SKINNING
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
#endif`,wd=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Ad=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Rd=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Cd=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Pd=`#ifdef USE_TRANSMISSION
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
#endif`,Id=`#ifdef USE_TRANSMISSION
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
#endif`,Dd=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Ld=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Ud=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Od=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Nd=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Fd=`uniform sampler2D t2D;
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
}`,Gd=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Bd=`#ifdef ENVMAP_TYPE_CUBE
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
}`,kd=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,zd=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Hd=`#include <common>
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
}`,Vd=`#define DISTANCE
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
}`,Xd=`#define DISTANCE
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
}`,$d=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Yd=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,qd=`uniform float scale;
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
}`,jd=`uniform vec3 diffuse;
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
}`,Kd=`uniform vec3 diffuse;
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
}`,Jd=`#define LAMBERT
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
}`,Qd=`#define LAMBERT
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
}`,ep=`#define MATCAP
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
}`,tp=`#define MATCAP
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
}`,np=`#define NORMAL
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
}`,ip=`#define NORMAL
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
}`,rp=`#define PHONG
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
}`,sp=`#define PHONG
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
}`,op=`#define STANDARD
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
}`,ap=`#define STANDARD
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
}`,lp=`#define TOON
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
}`,cp=`#define TOON
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
}`,hp=`uniform float size;
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
}`,up=`uniform vec3 diffuse;
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
}`,fp=`#include <common>
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
}`,dp=`uniform vec3 color;
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
}`,pp=`uniform float rotation;
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
}`,mp=`uniform vec3 diffuse;
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
}`,ot={alphahash_fragment:Nu,alphahash_pars_fragment:Fu,alphamap_fragment:Gu,alphamap_pars_fragment:Bu,alphatest_fragment:ku,alphatest_pars_fragment:zu,aomap_fragment:Hu,aomap_pars_fragment:Wu,batching_pars_vertex:Vu,batching_vertex:Xu,begin_vertex:$u,beginnormal_vertex:Yu,bsdfs:qu,iridescence_fragment:ju,bumpmap_pars_fragment:Zu,clipping_planes_fragment:Ku,clipping_planes_pars_fragment:Ju,clipping_planes_pars_vertex:Qu,clipping_planes_vertex:ef,color_fragment:tf,color_pars_fragment:nf,color_pars_vertex:rf,color_vertex:sf,common:of,cube_uv_reflection_fragment:af,defaultnormal_vertex:lf,displacementmap_pars_vertex:cf,displacementmap_vertex:hf,emissivemap_fragment:uf,emissivemap_pars_fragment:ff,colorspace_fragment:df,colorspace_pars_fragment:pf,envmap_fragment:mf,envmap_common_pars_fragment:gf,envmap_pars_fragment:_f,envmap_pars_vertex:vf,envmap_physical_pars_fragment:Cf,envmap_vertex:xf,fog_vertex:Sf,fog_pars_vertex:Mf,fog_fragment:yf,fog_pars_fragment:Ef,gradientmap_pars_fragment:Tf,lightmap_pars_fragment:bf,lights_lambert_fragment:wf,lights_lambert_pars_fragment:Af,lights_pars_begin:Rf,lights_toon_fragment:Pf,lights_toon_pars_fragment:If,lights_phong_fragment:Df,lights_phong_pars_fragment:Lf,lights_physical_fragment:Uf,lights_physical_pars_fragment:Of,lights_fragment_begin:Nf,lights_fragment_maps:Ff,lights_fragment_end:Gf,logdepthbuf_fragment:Bf,logdepthbuf_pars_fragment:kf,logdepthbuf_pars_vertex:zf,logdepthbuf_vertex:Hf,map_fragment:Wf,map_pars_fragment:Vf,map_particle_fragment:Xf,map_particle_pars_fragment:$f,metalnessmap_fragment:Yf,metalnessmap_pars_fragment:qf,morphinstance_vertex:jf,morphcolor_vertex:Zf,morphnormal_vertex:Kf,morphtarget_pars_vertex:Jf,morphtarget_vertex:Qf,normal_fragment_begin:ed,normal_fragment_maps:td,normal_pars_fragment:nd,normal_pars_vertex:id,normal_vertex:rd,normalmap_pars_fragment:sd,clearcoat_normal_fragment_begin:od,clearcoat_normal_fragment_maps:ad,clearcoat_pars_fragment:ld,iridescence_pars_fragment:cd,opaque_fragment:hd,packing:ud,premultiplied_alpha_fragment:fd,project_vertex:dd,dithering_fragment:pd,dithering_pars_fragment:md,roughnessmap_fragment:gd,roughnessmap_pars_fragment:_d,shadowmap_pars_fragment:vd,shadowmap_pars_vertex:xd,shadowmap_vertex:Sd,shadowmask_pars_fragment:Md,skinbase_vertex:yd,skinning_pars_vertex:Ed,skinning_vertex:Td,skinnormal_vertex:bd,specularmap_fragment:wd,specularmap_pars_fragment:Ad,tonemapping_fragment:Rd,tonemapping_pars_fragment:Cd,transmission_fragment:Pd,transmission_pars_fragment:Id,uv_pars_fragment:Dd,uv_pars_vertex:Ld,uv_vertex:Ud,worldpos_vertex:Od,background_vert:Nd,background_frag:Fd,backgroundCube_vert:Gd,backgroundCube_frag:Bd,cube_vert:kd,cube_frag:zd,depth_vert:Hd,depth_frag:Wd,distance_vert:Vd,distance_frag:Xd,equirect_vert:$d,equirect_frag:Yd,linedashed_vert:qd,linedashed_frag:jd,meshbasic_vert:Zd,meshbasic_frag:Kd,meshlambert_vert:Jd,meshlambert_frag:Qd,meshmatcap_vert:ep,meshmatcap_frag:tp,meshnormal_vert:np,meshnormal_frag:ip,meshphong_vert:rp,meshphong_frag:sp,meshphysical_vert:op,meshphysical_frag:ap,meshtoon_vert:lp,meshtoon_frag:cp,points_vert:hp,points_frag:up,shadow_vert:fp,shadow_frag:dp,sprite_vert:pp,sprite_frag:mp},Me={common:{diffuse:{value:new pt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new tt},alphaMap:{value:null},alphaMapTransform:{value:new tt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new tt}},envmap:{envMap:{value:null},envMapRotation:{value:new tt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new tt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new tt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new tt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new tt},normalScale:{value:new ct(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new tt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new tt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new tt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new tt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new pt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new pt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new tt},alphaTest:{value:0},uvTransform:{value:new tt}},sprite:{diffuse:{value:new pt(16777215)},opacity:{value:1},center:{value:new ct(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new tt},alphaMap:{value:null},alphaMapTransform:{value:new tt},alphaTest:{value:0}}},Cn={basic:{uniforms:en([Me.common,Me.specularmap,Me.envmap,Me.aomap,Me.lightmap,Me.fog]),vertexShader:ot.meshbasic_vert,fragmentShader:ot.meshbasic_frag},lambert:{uniforms:en([Me.common,Me.specularmap,Me.envmap,Me.aomap,Me.lightmap,Me.emissivemap,Me.bumpmap,Me.normalmap,Me.displacementmap,Me.fog,Me.lights,{emissive:{value:new pt(0)},envMapIntensity:{value:1}}]),vertexShader:ot.meshlambert_vert,fragmentShader:ot.meshlambert_frag},phong:{uniforms:en([Me.common,Me.specularmap,Me.envmap,Me.aomap,Me.lightmap,Me.emissivemap,Me.bumpmap,Me.normalmap,Me.displacementmap,Me.fog,Me.lights,{emissive:{value:new pt(0)},specular:{value:new pt(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:ot.meshphong_vert,fragmentShader:ot.meshphong_frag},standard:{uniforms:en([Me.common,Me.envmap,Me.aomap,Me.lightmap,Me.emissivemap,Me.bumpmap,Me.normalmap,Me.displacementmap,Me.roughnessmap,Me.metalnessmap,Me.fog,Me.lights,{emissive:{value:new pt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ot.meshphysical_vert,fragmentShader:ot.meshphysical_frag},toon:{uniforms:en([Me.common,Me.aomap,Me.lightmap,Me.emissivemap,Me.bumpmap,Me.normalmap,Me.displacementmap,Me.gradientmap,Me.fog,Me.lights,{emissive:{value:new pt(0)}}]),vertexShader:ot.meshtoon_vert,fragmentShader:ot.meshtoon_frag},matcap:{uniforms:en([Me.common,Me.bumpmap,Me.normalmap,Me.displacementmap,Me.fog,{matcap:{value:null}}]),vertexShader:ot.meshmatcap_vert,fragmentShader:ot.meshmatcap_frag},points:{uniforms:en([Me.points,Me.fog]),vertexShader:ot.points_vert,fragmentShader:ot.points_frag},dashed:{uniforms:en([Me.common,Me.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ot.linedashed_vert,fragmentShader:ot.linedashed_frag},depth:{uniforms:en([Me.common,Me.displacementmap]),vertexShader:ot.depth_vert,fragmentShader:ot.depth_frag},normal:{uniforms:en([Me.common,Me.bumpmap,Me.normalmap,Me.displacementmap,{opacity:{value:1}}]),vertexShader:ot.meshnormal_vert,fragmentShader:ot.meshnormal_frag},sprite:{uniforms:en([Me.sprite,Me.fog]),vertexShader:ot.sprite_vert,fragmentShader:ot.sprite_frag},background:{uniforms:{uvTransform:{value:new tt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ot.background_vert,fragmentShader:ot.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new tt}},vertexShader:ot.backgroundCube_vert,fragmentShader:ot.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ot.cube_vert,fragmentShader:ot.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ot.equirect_vert,fragmentShader:ot.equirect_frag},distance:{uniforms:en([Me.common,Me.displacementmap,{referencePosition:{value:new H},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ot.distance_vert,fragmentShader:ot.distance_frag},shadow:{uniforms:en([Me.lights,Me.fog,{color:{value:new pt(0)},opacity:{value:1}}]),vertexShader:ot.shadow_vert,fragmentShader:ot.shadow_frag}};Cn.physical={uniforms:en([Cn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new tt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new tt},clearcoatNormalScale:{value:new ct(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new tt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new tt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new tt},sheen:{value:0},sheenColor:{value:new pt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new tt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new tt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new tt},transmissionSamplerSize:{value:new ct},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new tt},attenuationDistance:{value:0},attenuationColor:{value:new pt(0)},specularColor:{value:new pt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new tt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new tt},anisotropyVector:{value:new ct},anisotropyMap:{value:null},anisotropyMapTransform:{value:new tt}}]),vertexShader:ot.meshphysical_vert,fragmentShader:ot.meshphysical_frag};const ss={r:0,b:0,g:0},gi=new Fn,gp=new It;function _p(i,e,t,n,r,s){const o=new pt(0);let a=r===!0?0:1,l,c,u=null,d=0,f=null;function v(b){let C=b.isScene===!0?b.background:null;if(C&&C.isTexture){const A=b.backgroundBlurriness>0;C=e.get(C,A)}return C}function x(b){let C=!1;const A=v(b);A===null?_(o,a):A&&A.isColor&&(_(A,1),C=!0);const I=i.xr.getEnvironmentBlendMode();I==="additive"?t.buffers.color.setClear(0,0,0,1,s):I==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,s),(i.autoClear||C)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function y(b,C){const A=v(C);A&&(A.isCubeTexture||A.mapping===Rs)?(c===void 0&&(c=new nt(new Lt(1,1,1),new Gn({name:"BackgroundCubeMaterial",uniforms:Qi(Cn.backgroundCube.uniforms),vertexShader:Cn.backgroundCube.vertexShader,fragmentShader:Cn.backgroundCube.fragmentShader,side:sn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(I,P,U){this.matrixWorld.copyPosition(U.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(c)),gi.copy(C.backgroundRotation),gi.x*=-1,gi.y*=-1,gi.z*=-1,A.isCubeTexture&&A.isRenderTargetTexture===!1&&(gi.y*=-1,gi.z*=-1),c.material.uniforms.envMap.value=A,c.material.uniforms.flipEnvMap.value=A.isCubeTexture&&A.isRenderTargetTexture===!1?-1:1,c.material.uniforms.backgroundBlurriness.value=C.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=C.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(gp.makeRotationFromEuler(gi)),c.material.toneMapped=vt.getTransfer(A.colorSpace)!==yt,(u!==A||d!==A.version||f!==i.toneMapping)&&(c.material.needsUpdate=!0,u=A,d=A.version,f=i.toneMapping),c.layers.enableAll(),b.unshift(c,c.geometry,c.material,0,0,null)):A&&A.isTexture&&(l===void 0&&(l=new nt(new Lr(2,2),new Gn({name:"BackgroundMaterial",uniforms:Qi(Cn.background.uniforms),vertexShader:Cn.background.vertexShader,fragmentShader:Cn.background.fragmentShader,side:ci,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(l)),l.material.uniforms.t2D.value=A,l.material.uniforms.backgroundIntensity.value=C.backgroundIntensity,l.material.toneMapped=vt.getTransfer(A.colorSpace)!==yt,A.matrixAutoUpdate===!0&&A.updateMatrix(),l.material.uniforms.uvTransform.value.copy(A.matrix),(u!==A||d!==A.version||f!==i.toneMapping)&&(l.material.needsUpdate=!0,u=A,d=A.version,f=i.toneMapping),l.layers.enableAll(),b.unshift(l,l.geometry,l.material,0,0,null))}function _(b,C){b.getRGB(ss,Vc(i)),t.buffers.color.setClear(ss.r,ss.g,ss.b,C,s)}function p(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return o},setClearColor:function(b,C=1){o.set(b),a=C,_(o,a)},getClearAlpha:function(){return a},setClearAlpha:function(b){a=b,_(o,a)},render:x,addToRenderList:y,dispose:p}}function vp(i,e){const t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},r=f(null);let s=r,o=!1;function a(D,V,$,q,X){let Y=!1;const z=d(D,q,$,V);s!==z&&(s=z,c(s.object)),Y=v(D,q,$,X),Y&&x(D,q,$,X),X!==null&&e.update(X,i.ELEMENT_ARRAY_BUFFER),(Y||o)&&(o=!1,A(D,V,$,q),X!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(X).buffer))}function l(){return i.createVertexArray()}function c(D){return i.bindVertexArray(D)}function u(D){return i.deleteVertexArray(D)}function d(D,V,$,q){const X=q.wireframe===!0;let Y=n[V.id];Y===void 0&&(Y={},n[V.id]=Y);const z=D.isInstancedMesh===!0?D.id:0;let ae=Y[z];ae===void 0&&(ae={},Y[z]=ae);let ne=ae[$.id];ne===void 0&&(ne={},ae[$.id]=ne);let ye=ne[X];return ye===void 0&&(ye=f(l()),ne[X]=ye),ye}function f(D){const V=[],$=[],q=[];for(let X=0;X<t;X++)V[X]=0,$[X]=0,q[X]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:V,enabledAttributes:$,attributeDivisors:q,object:D,attributes:{},index:null}}function v(D,V,$,q){const X=s.attributes,Y=V.attributes;let z=0;const ae=$.getAttributes();for(const ne in ae)if(ae[ne].location>=0){const Te=X[ne];let be=Y[ne];if(be===void 0&&(ne==="instanceMatrix"&&D.instanceMatrix&&(be=D.instanceMatrix),ne==="instanceColor"&&D.instanceColor&&(be=D.instanceColor)),Te===void 0||Te.attribute!==be||be&&Te.data!==be.data)return!0;z++}return s.attributesNum!==z||s.index!==q}function x(D,V,$,q){const X={},Y=V.attributes;let z=0;const ae=$.getAttributes();for(const ne in ae)if(ae[ne].location>=0){let Te=Y[ne];Te===void 0&&(ne==="instanceMatrix"&&D.instanceMatrix&&(Te=D.instanceMatrix),ne==="instanceColor"&&D.instanceColor&&(Te=D.instanceColor));const be={};be.attribute=Te,Te&&Te.data&&(be.data=Te.data),X[ne]=be,z++}s.attributes=X,s.attributesNum=z,s.index=q}function y(){const D=s.newAttributes;for(let V=0,$=D.length;V<$;V++)D[V]=0}function _(D){p(D,0)}function p(D,V){const $=s.newAttributes,q=s.enabledAttributes,X=s.attributeDivisors;$[D]=1,q[D]===0&&(i.enableVertexAttribArray(D),q[D]=1),X[D]!==V&&(i.vertexAttribDivisor(D,V),X[D]=V)}function b(){const D=s.newAttributes,V=s.enabledAttributes;for(let $=0,q=V.length;$<q;$++)V[$]!==D[$]&&(i.disableVertexAttribArray($),V[$]=0)}function C(D,V,$,q,X,Y,z){z===!0?i.vertexAttribIPointer(D,V,$,X,Y):i.vertexAttribPointer(D,V,$,q,X,Y)}function A(D,V,$,q){y();const X=q.attributes,Y=$.getAttributes(),z=V.defaultAttributeValues;for(const ae in Y){const ne=Y[ae];if(ne.location>=0){let ye=X[ae];if(ye===void 0&&(ae==="instanceMatrix"&&D.instanceMatrix&&(ye=D.instanceMatrix),ae==="instanceColor"&&D.instanceColor&&(ye=D.instanceColor)),ye!==void 0){const Te=ye.normalized,be=ye.itemSize,Ze=e.get(ye);if(Ze===void 0)continue;const Rt=Ze.buffer,bt=Ze.type,Q=Ze.bytesPerElement,de=bt===i.INT||bt===i.UNSIGNED_INT||ye.gpuType===Ca;if(ye.isInterleavedBufferAttribute){const pe=ye.data,je=pe.stride,Be=ye.offset;if(pe.isInstancedInterleavedBuffer){for(let We=0;We<ne.locationSize;We++)p(ne.location+We,pe.meshPerAttribute);D.isInstancedMesh!==!0&&q._maxInstanceCount===void 0&&(q._maxInstanceCount=pe.meshPerAttribute*pe.count)}else for(let We=0;We<ne.locationSize;We++)_(ne.location+We);i.bindBuffer(i.ARRAY_BUFFER,Rt);for(let We=0;We<ne.locationSize;We++)C(ne.location+We,be/ne.locationSize,bt,Te,je*Q,(Be+be/ne.locationSize*We)*Q,de)}else{if(ye.isInstancedBufferAttribute){for(let pe=0;pe<ne.locationSize;pe++)p(ne.location+pe,ye.meshPerAttribute);D.isInstancedMesh!==!0&&q._maxInstanceCount===void 0&&(q._maxInstanceCount=ye.meshPerAttribute*ye.count)}else for(let pe=0;pe<ne.locationSize;pe++)_(ne.location+pe);i.bindBuffer(i.ARRAY_BUFFER,Rt);for(let pe=0;pe<ne.locationSize;pe++)C(ne.location+pe,be/ne.locationSize,bt,Te,be*Q,be/ne.locationSize*pe*Q,de)}}else if(z!==void 0){const Te=z[ae];if(Te!==void 0)switch(Te.length){case 2:i.vertexAttrib2fv(ne.location,Te);break;case 3:i.vertexAttrib3fv(ne.location,Te);break;case 4:i.vertexAttrib4fv(ne.location,Te);break;default:i.vertexAttrib1fv(ne.location,Te)}}}}b()}function I(){w();for(const D in n){const V=n[D];for(const $ in V){const q=V[$];for(const X in q){const Y=q[X];for(const z in Y)u(Y[z].object),delete Y[z];delete q[X]}}delete n[D]}}function P(D){if(n[D.id]===void 0)return;const V=n[D.id];for(const $ in V){const q=V[$];for(const X in q){const Y=q[X];for(const z in Y)u(Y[z].object),delete Y[z];delete q[X]}}delete n[D.id]}function U(D){for(const V in n){const $=n[V];for(const q in $){const X=$[q];if(X[D.id]===void 0)continue;const Y=X[D.id];for(const z in Y)u(Y[z].object),delete Y[z];delete X[D.id]}}}function E(D){for(const V in n){const $=n[V],q=D.isInstancedMesh===!0?D.id:0,X=$[q];if(X!==void 0){for(const Y in X){const z=X[Y];for(const ae in z)u(z[ae].object),delete z[ae];delete X[Y]}delete $[q],Object.keys($).length===0&&delete n[V]}}}function w(){Z(),o=!0,s!==r&&(s=r,c(s.object))}function Z(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:a,reset:w,resetDefaultState:Z,dispose:I,releaseStatesOfGeometry:P,releaseStatesOfObject:E,releaseStatesOfProgram:U,initAttributes:y,enableAttribute:_,disableUnusedAttributes:b}}function xp(i,e,t){let n;function r(c){n=c}function s(c,u){i.drawArrays(n,c,u),t.update(u,n,1)}function o(c,u,d){d!==0&&(i.drawArraysInstanced(n,c,u,d),t.update(u,n,d))}function a(c,u,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,u,0,d);let v=0;for(let x=0;x<d;x++)v+=u[x];t.update(v,n,1)}function l(c,u,d,f){if(d===0)return;const v=e.get("WEBGL_multi_draw");if(v===null)for(let x=0;x<c.length;x++)o(c[x],u[x],f[x]);else{v.multiDrawArraysInstancedWEBGL(n,c,0,u,0,f,0,d);let x=0;for(let y=0;y<d;y++)x+=u[y]*f[y];t.update(x,n,1)}}this.setMode=r,this.render=s,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function Sp(i,e,t,n){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){const U=e.get("EXT_texture_filter_anisotropic");r=i.getParameter(U.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function o(U){return!(U!==En&&n.convert(U)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(U){const E=U===qn&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(U!==un&&n.convert(U)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&U!==In&&!E)}function l(U){if(U==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";U="mediump"}return U==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const u=l(c);u!==c&&(qe("WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);const d=t.logarithmicDepthBuffer===!0,f=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),v=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),x=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),y=i.getParameter(i.MAX_TEXTURE_SIZE),_=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),b=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),C=i.getParameter(i.MAX_VARYING_VECTORS),A=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),I=i.getParameter(i.MAX_SAMPLES),P=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:d,reversedDepthBuffer:f,maxTextures:v,maxVertexTextures:x,maxTextureSize:y,maxCubemapSize:_,maxAttributes:p,maxVertexUniforms:b,maxVaryings:C,maxFragmentUniforms:A,maxSamples:I,samples:P}}function Mp(i){const e=this;let t=null,n=0,r=!1,s=!1;const o=new Si,a=new tt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,f){const v=d.length!==0||f||n!==0||r;return r=f,n=d.length,v},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(d,f){t=u(d,f,0)},this.setState=function(d,f,v){const x=d.clippingPlanes,y=d.clipIntersection,_=d.clipShadows,p=i.get(d);if(!r||x===null||x.length===0||s&&!_)s?u(null):c();else{const b=s?0:n,C=b*4;let A=p.clippingState||null;l.value=A,A=u(x,f,C,v);for(let I=0;I!==C;++I)A[I]=t[I];p.clippingState=A,this.numIntersection=y?this.numPlanes:0,this.numPlanes+=b}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function u(d,f,v,x){const y=d!==null?d.length:0;let _=null;if(y!==0){if(_=l.value,x!==!0||_===null){const p=v+y*4,b=f.matrixWorldInverse;a.getNormalMatrix(b),(_===null||_.length<p)&&(_=new Float32Array(p));for(let C=0,A=v;C!==y;++C,A+=4)o.copy(d[C]).applyMatrix4(b,a),o.normal.toArray(_,A),_[A+3]=o.constant}l.value=_,l.needsUpdate=!0}return e.numPlanes=y,e.numIntersection=0,_}}const ai=4,Cl=[.125,.215,.35,.446,.526,.582],yi=20,yp=256,pr=new Xa,Pl=new pt;let _o=null,vo=0,xo=0,So=!1;const Ep=new H;class Il{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,r=100,s={}){const{size:o=256,position:a=Ep}=s;_o=this._renderer.getRenderTarget(),vo=this._renderer.getActiveCubeFace(),xo=this._renderer.getActiveMipmapLevel(),So=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,n,r,l,a),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Ul(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Ll(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(_o,vo,xo),this._renderer.xr.enabled=So,e.scissorTest=!1,Xi(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===wi||e.mapping===Zi?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),_o=this._renderer.getRenderTarget(),vo=this._renderer.getActiveCubeFace(),xo=this._renderer.getActiveMipmapLevel(),So=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Wt,minFilter:Wt,generateMipmaps:!1,type:qn,format:En,colorSpace:Ji,depthBuffer:!1},r=Dl(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Dl(e,t,n);const{_lodMax:s}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=Tp(s)),this._blurMaterial=wp(s,e,t),this._ggxMaterial=bp(s,e,t)}return r}_compileMaterial(e){const t=new nt(new tn,e);this._renderer.compile(t,pr)}_sceneToCubeUV(e,t,n,r,s){const l=new mn(90,1,t,n),c=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],d=this._renderer,f=d.autoClear,v=d.toneMapping;d.getClearColor(Pl),d.toneMapping=Ln,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(r),d.clearDepth(),d.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new nt(new Lt,new Vn({name:"PMREM.Background",side:sn,depthWrite:!1,depthTest:!1})));const y=this._backgroundBox,_=y.material;let p=!1;const b=e.background;b?b.isColor&&(_.color.copy(b),e.background=null,p=!0):(_.color.copy(Pl),p=!0);for(let C=0;C<6;C++){const A=C%3;A===0?(l.up.set(0,c[C],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x+u[C],s.y,s.z)):A===1?(l.up.set(0,0,c[C]),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y+u[C],s.z)):(l.up.set(0,c[C],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y,s.z+u[C]));const I=this._cubeSize;Xi(r,A*I,C>2?I:0,I,I),d.setRenderTarget(r),p&&d.render(y,l),d.render(e,l)}d.toneMapping=v,d.autoClear=f,e.background=b}_textureToCubeUV(e,t){const n=this._renderer,r=e.mapping===wi||e.mapping===Zi;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Ul()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Ll());const s=r?this._cubemapMaterial:this._equirectMaterial,o=this._lodMeshes[0];o.material=s;const a=s.uniforms;a.envMap.value=e;const l=this._cubeSize;Xi(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(o,pr)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const r=this._lodMeshes.length;for(let s=1;s<r;s++)this._applyGGXFilter(e,s-1,s);t.autoClear=n}_applyGGXFilter(e,t,n){const r=this._renderer,s=this._pingPongRenderTarget,o=this._ggxMaterial,a=this._lodMeshes[n];a.material=o;const l=o.uniforms,c=n/(this._lodMeshes.length-1),u=t/(this._lodMeshes.length-1),d=Math.sqrt(c*c-u*u),f=0+c*1.25,v=d*f,{_lodMax:x}=this,y=this._sizeLods[n],_=3*y*(n>x-ai?n-x+ai:0),p=4*(this._cubeSize-y);l.envMap.value=e.texture,l.roughness.value=v,l.mipInt.value=x-t,Xi(s,_,p,3*y,2*y),r.setRenderTarget(s),r.render(a,pr),l.envMap.value=s.texture,l.roughness.value=0,l.mipInt.value=x-n,Xi(e,_,p,3*y,2*y),r.setRenderTarget(e),r.render(a,pr)}_blur(e,t,n,r,s){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,n,r,"latitudinal",s),this._halfBlur(o,e,n,n,r,"longitudinal",s)}_halfBlur(e,t,n,r,s,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&_t("blur direction must be either latitudinal or longitudinal!");const u=3,d=this._lodMeshes[r];d.material=c;const f=c.uniforms,v=this._sizeLods[n]-1,x=isFinite(s)?Math.PI/(2*v):2*Math.PI/(2*yi-1),y=s/x,_=isFinite(s)?1+Math.floor(u*y):yi;_>yi&&qe(`sigmaRadians, ${s}, is too large and will clip, as it requested ${_} samples when the maximum is set to ${yi}`);const p=[];let b=0;for(let U=0;U<yi;++U){const E=U/y,w=Math.exp(-E*E/2);p.push(w),U===0?b+=w:U<_&&(b+=2*w)}for(let U=0;U<p.length;U++)p[U]=p[U]/b;f.envMap.value=e.texture,f.samples.value=_,f.weights.value=p,f.latitudinal.value=o==="latitudinal",a&&(f.poleAxis.value=a);const{_lodMax:C}=this;f.dTheta.value=x,f.mipInt.value=C-n;const A=this._sizeLods[r],I=3*A*(r>C-ai?r-C+ai:0),P=4*(this._cubeSize-A);Xi(t,I,P,3*A,2*A),l.setRenderTarget(t),l.render(d,pr)}}function Tp(i){const e=[],t=[],n=[];let r=i;const s=i-ai+1+Cl.length;for(let o=0;o<s;o++){const a=Math.pow(2,r);e.push(a);let l=1/a;o>i-ai?l=Cl[o-i+ai-1]:o===0&&(l=0),t.push(l);const c=1/(a-2),u=-c,d=1+c,f=[u,u,d,u,d,d,u,u,d,d,u,d],v=6,x=6,y=3,_=2,p=1,b=new Float32Array(y*x*v),C=new Float32Array(_*x*v),A=new Float32Array(p*x*v);for(let P=0;P<v;P++){const U=P%3*2/3-1,E=P>2?0:-1,w=[U,E,0,U+2/3,E,0,U+2/3,E+1,0,U,E,0,U+2/3,E+1,0,U,E+1,0];b.set(w,y*x*P),C.set(f,_*x*P);const Z=[P,P,P,P,P,P];A.set(Z,p*x*P)}const I=new tn;I.setAttribute("position",new On(b,y)),I.setAttribute("uv",new On(C,_)),I.setAttribute("faceIndex",new On(A,p)),n.push(new nt(I,null)),r>ai&&r--}return{lodMeshes:n,sizeLods:e,sigmas:t}}function Dl(i,e,t){const n=new Un(i,e,t);return n.texture.mapping=Rs,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Xi(i,e,t,n,r){i.viewport.set(e,t,n,r),i.scissor.set(e,t,n,r)}function bp(i,e,t){return new Gn({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:yp,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Ps(),fragmentShader:`

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
		`,blending:$n,depthTest:!1,depthWrite:!1})}function wp(i,e,t){const n=new Float32Array(yi),r=new H(0,1,0);return new Gn({name:"SphericalGaussianBlur",defines:{n:yi,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:Ps(),fragmentShader:`

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
		`,blending:$n,depthTest:!1,depthWrite:!1})}function Ll(){return new Gn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Ps(),fragmentShader:`

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
		`,blending:$n,depthTest:!1,depthWrite:!1})}function Ul(){return new Gn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Ps(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:$n,depthTest:!1,depthWrite:!1})}function Ps(){return`

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
	`}class Yc extends Un{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];this.texture=new Hc(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new Lt(5,5,5),s=new Gn({name:"CubemapFromEquirect",uniforms:Qi(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:sn,blending:$n});s.uniforms.tEquirect.value=t;const o=new nt(r,s),a=t.minFilter;return t.minFilter===Ti&&(t.minFilter=Wt),new Iu(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t=!0,n=!0,r=!0){const s=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,r);e.setRenderTarget(s)}}function Ap(i){let e=new WeakMap,t=new WeakMap,n=null;function r(f,v=!1){return f==null?null:v?o(f):s(f)}function s(f){if(f&&f.isTexture){const v=f.mapping;if(v===zs||v===Hs)if(e.has(f)){const x=e.get(f).texture;return a(x,f.mapping)}else{const x=f.image;if(x&&x.height>0){const y=new Yc(x.height);return y.fromEquirectangularTexture(i,f),e.set(f,y),f.addEventListener("dispose",c),a(y.texture,f.mapping)}else return null}}return f}function o(f){if(f&&f.isTexture){const v=f.mapping,x=v===zs||v===Hs,y=v===wi||v===Zi;if(x||y){let _=t.get(f);const p=_!==void 0?_.texture.pmremVersion:0;if(f.isRenderTargetTexture&&f.pmremVersion!==p)return n===null&&(n=new Il(i)),_=x?n.fromEquirectangular(f,_):n.fromCubemap(f,_),_.texture.pmremVersion=f.pmremVersion,t.set(f,_),_.texture;if(_!==void 0)return _.texture;{const b=f.image;return x&&b&&b.height>0||y&&b&&l(b)?(n===null&&(n=new Il(i)),_=x?n.fromEquirectangular(f):n.fromCubemap(f),_.texture.pmremVersion=f.pmremVersion,t.set(f,_),f.addEventListener("dispose",u),_.texture):null}}}return f}function a(f,v){return v===zs?f.mapping=wi:v===Hs&&(f.mapping=Zi),f}function l(f){let v=0;const x=6;for(let y=0;y<x;y++)f[y]!==void 0&&v++;return v===x}function c(f){const v=f.target;v.removeEventListener("dispose",c);const x=e.get(v);x!==void 0&&(e.delete(v),x.dispose())}function u(f){const v=f.target;v.removeEventListener("dispose",u);const x=t.get(v);x!==void 0&&(t.delete(v),x.dispose())}function d(){e=new WeakMap,t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:r,dispose:d}}function Rp(i){const e={};function t(n){if(e[n]!==void 0)return e[n];const r=i.getExtension(n);return e[n]=r,r}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const r=t(n);return r===null&&Ss("WebGLRenderer: "+n+" extension not supported."),r}}}function Cp(i,e,t,n){const r={},s=new WeakMap;function o(d){const f=d.target;f.index!==null&&e.remove(f.index);for(const x in f.attributes)e.remove(f.attributes[x]);f.removeEventListener("dispose",o),delete r[f.id];const v=s.get(f);v&&(e.remove(v),s.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,t.memory.geometries--}function a(d,f){return r[f.id]===!0||(f.addEventListener("dispose",o),r[f.id]=!0,t.memory.geometries++),f}function l(d){const f=d.attributes;for(const v in f)e.update(f[v],i.ARRAY_BUFFER)}function c(d){const f=[],v=d.index,x=d.attributes.position;let y=0;if(x===void 0)return;if(v!==null){const b=v.array;y=v.version;for(let C=0,A=b.length;C<A;C+=3){const I=b[C+0],P=b[C+1],U=b[C+2];f.push(I,P,P,U,U,I)}}else{const b=x.array;y=x.version;for(let C=0,A=b.length/3-1;C<A;C+=3){const I=C+0,P=C+1,U=C+2;f.push(I,P,P,U,U,I)}}const _=new(x.count>=65535?kc:Bc)(f,1);_.version=y;const p=s.get(d);p&&e.remove(p),s.set(d,_)}function u(d){const f=s.get(d);if(f){const v=d.index;v!==null&&f.version<v.version&&c(d)}else c(d);return s.get(d)}return{get:a,update:l,getWireframeAttribute:u}}function Pp(i,e,t){let n;function r(f){n=f}let s,o;function a(f){s=f.type,o=f.bytesPerElement}function l(f,v){i.drawElements(n,v,s,f*o),t.update(v,n,1)}function c(f,v,x){x!==0&&(i.drawElementsInstanced(n,v,s,f*o,x),t.update(v,n,x))}function u(f,v,x){if(x===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,v,0,s,f,0,x);let _=0;for(let p=0;p<x;p++)_+=v[p];t.update(_,n,1)}function d(f,v,x,y){if(x===0)return;const _=e.get("WEBGL_multi_draw");if(_===null)for(let p=0;p<f.length;p++)c(f[p]/o,v[p],y[p]);else{_.multiDrawElementsInstancedWEBGL(n,v,0,s,f,0,y,0,x);let p=0;for(let b=0;b<x;b++)p+=v[b]*y[b];t.update(p,n,1)}}this.setMode=r,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=u,this.renderMultiDrawInstances=d}function Ip(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,o,a){switch(t.calls++,o){case i.TRIANGLES:t.triangles+=a*(s/3);break;case i.LINES:t.lines+=a*(s/2);break;case i.LINE_STRIP:t.lines+=a*(s-1);break;case i.LINE_LOOP:t.lines+=a*s;break;case i.POINTS:t.points+=a*s;break;default:_t("WebGLInfo: Unknown draw mode:",o);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:n}}function Dp(i,e,t){const n=new WeakMap,r=new Nt;function s(o,a,l){const c=o.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,d=u!==void 0?u.length:0;let f=n.get(a);if(f===void 0||f.count!==d){let Z=function(){E.dispose(),n.delete(a),a.removeEventListener("dispose",Z)};var v=Z;f!==void 0&&f.texture.dispose();const x=a.morphAttributes.position!==void 0,y=a.morphAttributes.normal!==void 0,_=a.morphAttributes.color!==void 0,p=a.morphAttributes.position||[],b=a.morphAttributes.normal||[],C=a.morphAttributes.color||[];let A=0;x===!0&&(A=1),y===!0&&(A=2),_===!0&&(A=3);let I=a.attributes.position.count*A,P=1;I>e.maxTextureSize&&(P=Math.ceil(I/e.maxTextureSize),I=e.maxTextureSize);const U=new Float32Array(I*P*4*d),E=new Fc(U,I,P,d);E.type=In,E.needsUpdate=!0;const w=A*4;for(let D=0;D<d;D++){const V=p[D],$=b[D],q=C[D],X=I*P*4*D;for(let Y=0;Y<V.count;Y++){const z=Y*w;x===!0&&(r.fromBufferAttribute(V,Y),U[X+z+0]=r.x,U[X+z+1]=r.y,U[X+z+2]=r.z,U[X+z+3]=0),y===!0&&(r.fromBufferAttribute($,Y),U[X+z+4]=r.x,U[X+z+5]=r.y,U[X+z+6]=r.z,U[X+z+7]=0),_===!0&&(r.fromBufferAttribute(q,Y),U[X+z+8]=r.x,U[X+z+9]=r.y,U[X+z+10]=r.z,U[X+z+11]=q.itemSize===4?r.w:1)}}f={count:d,texture:E,size:new ct(I,P)},n.set(a,f),a.addEventListener("dispose",Z)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",o.morphTexture,t);else{let x=0;for(let _=0;_<c.length;_++)x+=c[_];const y=a.morphTargetsRelative?1:1-x;l.getUniforms().setValue(i,"morphTargetBaseInfluence",y),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",f.texture,t),l.getUniforms().setValue(i,"morphTargetsTextureSize",f.size)}return{update:s}}function Lp(i,e,t,n,r){let s=new WeakMap;function o(c){const u=r.render.frame,d=c.geometry,f=e.get(c,d);if(s.get(f)!==u&&(e.update(f),s.set(f,u)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),s.get(c)!==u&&(t.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,i.ARRAY_BUFFER),s.set(c,u))),c.isSkinnedMesh){const v=c.skeleton;s.get(v)!==u&&(v.update(),s.set(v,u))}return f}function a(){s=new WeakMap}function l(c){const u=c.target;u.removeEventListener("dispose",l),n.releaseStatesOfObject(u),t.remove(u.instanceMatrix),u.instanceColor!==null&&t.remove(u.instanceColor)}return{update:o,dispose:a}}const Up={[Mc]:"LINEAR_TONE_MAPPING",[yc]:"REINHARD_TONE_MAPPING",[Ec]:"CINEON_TONE_MAPPING",[Ra]:"ACES_FILMIC_TONE_MAPPING",[bc]:"AGX_TONE_MAPPING",[wc]:"NEUTRAL_TONE_MAPPING",[Tc]:"CUSTOM_TONE_MAPPING"};function Op(i,e,t,n,r){const s=new Un(e,t,{type:i,depthBuffer:n,stencilBuffer:r}),o=new Un(e,t,{type:qn,depthBuffer:!1,stencilBuffer:!1}),a=new tn;a.setAttribute("position",new Ft([-1,3,0,-1,-1,0,3,-1,0],3)),a.setAttribute("uv",new Ft([0,2,0,0,2,0],2));const l=new Eu({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),c=new nt(a,l),u=new Xa(-1,1,1,-1,0,1);let d=null,f=null,v=!1,x,y=null,_=[],p=!1;this.setSize=function(b,C){s.setSize(b,C),o.setSize(b,C);for(let A=0;A<_.length;A++){const I=_[A];I.setSize&&I.setSize(b,C)}},this.setEffects=function(b){_=b,p=_.length>0&&_[0].isRenderPass===!0;const C=s.width,A=s.height;for(let I=0;I<_.length;I++){const P=_[I];P.setSize&&P.setSize(C,A)}},this.begin=function(b,C){if(v||b.toneMapping===Ln&&_.length===0)return!1;if(y=C,C!==null){const A=C.width,I=C.height;(s.width!==A||s.height!==I)&&this.setSize(A,I)}return p===!1&&b.setRenderTarget(s),x=b.toneMapping,b.toneMapping=Ln,!0},this.hasRenderPass=function(){return p},this.end=function(b,C){b.toneMapping=x,v=!0;let A=s,I=o;for(let P=0;P<_.length;P++){const U=_[P];if(U.enabled!==!1&&(U.render(b,I,A,C),U.needsSwap!==!1)){const E=A;A=I,I=E}}if(d!==b.outputColorSpace||f!==b.toneMapping){d=b.outputColorSpace,f=b.toneMapping,l.defines={},vt.getTransfer(d)===yt&&(l.defines.SRGB_TRANSFER="");const P=Up[f];P&&(l.defines[P]=""),l.needsUpdate=!0}l.uniforms.tDiffuse.value=A.texture,b.setRenderTarget(y),b.render(c,u),y=null,v=!1},this.isCompositing=function(){return v},this.dispose=function(){s.dispose(),o.dispose(),a.dispose(),l.dispose()}}const qc=new Qt,Ma=new Pr(1,1),jc=new Fc,Zc=new Qh,Kc=new Hc,Ol=[],Nl=[],Fl=new Float32Array(16),Gl=new Float32Array(9),Bl=new Float32Array(4);function or(i,e,t){const n=i[0];if(n<=0||n>0)return i;const r=e*t;let s=Ol[r];if(s===void 0&&(s=new Float32Array(r),Ol[r]=s),e!==0){n.toArray(s,0);for(let o=1,a=0;o!==e;++o)a+=t,i[o].toArray(s,a)}return s}function Bt(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function kt(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function Is(i,e){let t=Nl[e];t===void 0&&(t=new Int32Array(e),Nl[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function Np(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function Fp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Bt(t,e))return;i.uniform2fv(this.addr,e),kt(t,e)}}function Gp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Bt(t,e))return;i.uniform3fv(this.addr,e),kt(t,e)}}function Bp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Bt(t,e))return;i.uniform4fv(this.addr,e),kt(t,e)}}function kp(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Bt(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),kt(t,e)}else{if(Bt(t,n))return;Bl.set(n),i.uniformMatrix2fv(this.addr,!1,Bl),kt(t,n)}}function zp(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Bt(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),kt(t,e)}else{if(Bt(t,n))return;Gl.set(n),i.uniformMatrix3fv(this.addr,!1,Gl),kt(t,n)}}function Hp(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Bt(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),kt(t,e)}else{if(Bt(t,n))return;Fl.set(n),i.uniformMatrix4fv(this.addr,!1,Fl),kt(t,n)}}function Wp(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function Vp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Bt(t,e))return;i.uniform2iv(this.addr,e),kt(t,e)}}function Xp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Bt(t,e))return;i.uniform3iv(this.addr,e),kt(t,e)}}function $p(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Bt(t,e))return;i.uniform4iv(this.addr,e),kt(t,e)}}function Yp(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function qp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Bt(t,e))return;i.uniform2uiv(this.addr,e),kt(t,e)}}function jp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Bt(t,e))return;i.uniform3uiv(this.addr,e),kt(t,e)}}function Zp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Bt(t,e))return;i.uniform4uiv(this.addr,e),kt(t,e)}}function Kp(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r);let s;this.type===i.SAMPLER_2D_SHADOW?(Ma.compareFunction=t.isReversedDepthBuffer()?Na:Oa,s=Ma):s=qc,t.setTexture2D(e||s,r)}function Jp(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture3D(e||Zc,r)}function Qp(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTextureCube(e||Kc,r)}function em(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture2DArray(e||jc,r)}function tm(i){switch(i){case 5126:return Np;case 35664:return Fp;case 35665:return Gp;case 35666:return Bp;case 35674:return kp;case 35675:return zp;case 35676:return Hp;case 5124:case 35670:return Wp;case 35667:case 35671:return Vp;case 35668:case 35672:return Xp;case 35669:case 35673:return $p;case 5125:return Yp;case 36294:return qp;case 36295:return jp;case 36296:return Zp;case 35678:case 36198:case 36298:case 36306:case 35682:return Kp;case 35679:case 36299:case 36307:return Jp;case 35680:case 36300:case 36308:case 36293:return Qp;case 36289:case 36303:case 36311:case 36292:return em}}function nm(i,e){i.uniform1fv(this.addr,e)}function im(i,e){const t=or(e,this.size,2);i.uniform2fv(this.addr,t)}function rm(i,e){const t=or(e,this.size,3);i.uniform3fv(this.addr,t)}function sm(i,e){const t=or(e,this.size,4);i.uniform4fv(this.addr,t)}function om(i,e){const t=or(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function am(i,e){const t=or(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function lm(i,e){const t=or(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function cm(i,e){i.uniform1iv(this.addr,e)}function hm(i,e){i.uniform2iv(this.addr,e)}function um(i,e){i.uniform3iv(this.addr,e)}function fm(i,e){i.uniform4iv(this.addr,e)}function dm(i,e){i.uniform1uiv(this.addr,e)}function pm(i,e){i.uniform2uiv(this.addr,e)}function mm(i,e){i.uniform3uiv(this.addr,e)}function gm(i,e){i.uniform4uiv(this.addr,e)}function _m(i,e,t){const n=this.cache,r=e.length,s=Is(t,r);Bt(n,s)||(i.uniform1iv(this.addr,s),kt(n,s));let o;this.type===i.SAMPLER_2D_SHADOW?o=Ma:o=qc;for(let a=0;a!==r;++a)t.setTexture2D(e[a]||o,s[a])}function vm(i,e,t){const n=this.cache,r=e.length,s=Is(t,r);Bt(n,s)||(i.uniform1iv(this.addr,s),kt(n,s));for(let o=0;o!==r;++o)t.setTexture3D(e[o]||Zc,s[o])}function xm(i,e,t){const n=this.cache,r=e.length,s=Is(t,r);Bt(n,s)||(i.uniform1iv(this.addr,s),kt(n,s));for(let o=0;o!==r;++o)t.setTextureCube(e[o]||Kc,s[o])}function Sm(i,e,t){const n=this.cache,r=e.length,s=Is(t,r);Bt(n,s)||(i.uniform1iv(this.addr,s),kt(n,s));for(let o=0;o!==r;++o)t.setTexture2DArray(e[o]||jc,s[o])}function Mm(i){switch(i){case 5126:return nm;case 35664:return im;case 35665:return rm;case 35666:return sm;case 35674:return om;case 35675:return am;case 35676:return lm;case 5124:case 35670:return cm;case 35667:case 35671:return hm;case 35668:case 35672:return um;case 35669:case 35673:return fm;case 5125:return dm;case 36294:return pm;case 36295:return mm;case 36296:return gm;case 35678:case 36198:case 36298:case 36306:case 35682:return _m;case 35679:case 36299:case 36307:return vm;case 35680:case 36300:case 36308:case 36293:return xm;case 36289:case 36303:case 36311:case 36292:return Sm}}class ym{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=tm(t.type)}}class Em{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Mm(t.type)}}class Tm{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const r=this.seq;for(let s=0,o=r.length;s!==o;++s){const a=r[s];a.setValue(e,t[a.id],n)}}}const Mo=/(\w+)(\])?(\[|\.)?/g;function kl(i,e){i.seq.push(e),i.map[e.id]=e}function bm(i,e,t){const n=i.name,r=n.length;for(Mo.lastIndex=0;;){const s=Mo.exec(n),o=Mo.lastIndex;let a=s[1];const l=s[2]==="]",c=s[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===r){kl(t,c===void 0?new ym(a,i,e):new Em(a,i,e));break}else{let d=t.map[a];d===void 0&&(d=new Tm(a),kl(t,d)),t=d}}}class ps{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let o=0;o<n;++o){const a=e.getActiveUniform(t,o),l=e.getUniformLocation(t,a.name);bm(a,l,this)}const r=[],s=[];for(const o of this.seq)o.type===e.SAMPLER_2D_SHADOW||o.type===e.SAMPLER_CUBE_SHADOW||o.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(o):s.push(o);r.length>0&&(this.seq=r.concat(s))}setValue(e,t,n,r){const s=this.map[t];s!==void 0&&s.setValue(e,n,r)}setOptional(e,t,n){const r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let s=0,o=t.length;s!==o;++s){const a=t[s],l=n[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,r)}}static seqWithValue(e,t){const n=[];for(let r=0,s=e.length;r!==s;++r){const o=e[r];o.id in t&&n.push(o)}return n}}function zl(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const wm=37297;let Am=0;function Rm(i,e){const t=i.split(`
`),n=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let o=r;o<s;o++){const a=o+1;n.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return n.join(`
`)}const Hl=new tt;function Cm(i){vt._getMatrix(Hl,vt.workingColorSpace,i);const e=`mat3( ${Hl.elements.map(t=>t.toFixed(4))} )`;switch(vt.getTransfer(i)){case vs:return[e,"LinearTransferOETF"];case yt:return[e,"sRGBTransferOETF"];default:return qe("WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function Wl(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),s=(i.getShaderInfoLog(e)||"").trim();if(n&&s==="")return"";const o=/ERROR: 0:(\d+)/.exec(s);if(o){const a=parseInt(o[1]);return t.toUpperCase()+`

`+s+`

`+Rm(i.getShaderSource(e),a)}else return s}function Pm(i,e){const t=Cm(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}const Im={[Mc]:"Linear",[yc]:"Reinhard",[Ec]:"Cineon",[Ra]:"ACESFilmic",[bc]:"AgX",[wc]:"Neutral",[Tc]:"Custom"};function Dm(i,e){const t=Im[e];return t===void 0?(qe("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const os=new H;function Lm(){vt.getLuminanceCoefficients(os);const i=os.x.toFixed(4),e=os.y.toFixed(4),t=os.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Um(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Er).join(`
`)}function Om(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function Nm(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let r=0;r<n;r++){const s=i.getActiveAttrib(e,r),o=s.name;let a=1;s.type===i.FLOAT_MAT2&&(a=2),s.type===i.FLOAT_MAT3&&(a=3),s.type===i.FLOAT_MAT4&&(a=4),t[o]={type:s.type,location:i.getAttribLocation(e,o),locationSize:a}}return t}function Er(i){return i!==""}function Vl(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Xl(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const Fm=/^[ \t]*#include +<([\w\d./]+)>/gm;function ya(i){return i.replace(Fm,Bm)}const Gm=new Map;function Bm(i,e){let t=ot[e];if(t===void 0){const n=Gm.get(e);if(n!==void 0)t=ot[n],qe('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return ya(t)}const km=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function $l(i){return i.replace(km,zm)}function zm(i,e,t,n){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function Yl(i){let e=`precision ${i.precision} float;
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
#define LOW_PRECISION`),e}const Hm={[br]:"SHADOWMAP_TYPE_PCF",[yr]:"SHADOWMAP_TYPE_VSM"};function Wm(i){return Hm[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const Vm={[wi]:"ENVMAP_TYPE_CUBE",[Zi]:"ENVMAP_TYPE_CUBE",[Rs]:"ENVMAP_TYPE_CUBE_UV"};function Xm(i){return i.envMap===!1?"ENVMAP_TYPE_CUBE":Vm[i.envMapMode]||"ENVMAP_TYPE_CUBE"}const $m={[Zi]:"ENVMAP_MODE_REFRACTION"};function Ym(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":$m[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}const qm={[Sc]:"ENVMAP_BLENDING_MULTIPLY",[Dh]:"ENVMAP_BLENDING_MIX",[Lh]:"ENVMAP_BLENDING_ADD"};function jm(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":qm[i.combine]||"ENVMAP_BLENDING_NONE"}function Zm(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:n,maxMip:t}}function Km(i,e,t,n){const r=i.getContext(),s=t.defines;let o=t.vertexShader,a=t.fragmentShader;const l=Wm(t),c=Xm(t),u=Ym(t),d=jm(t),f=Zm(t),v=Um(t),x=Om(s),y=r.createProgram();let _,p,b=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(_=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x].filter(Er).join(`
`),_.length>0&&(_+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x].filter(Er).join(`
`),p.length>0&&(p+=`
`)):(_=[Yl(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Er).join(`
`),p=[Yl(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+d:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Ln?"#define TONE_MAPPING":"",t.toneMapping!==Ln?ot.tonemapping_pars_fragment:"",t.toneMapping!==Ln?Dm("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",ot.colorspace_pars_fragment,Pm("linearToOutputTexel",t.outputColorSpace),Lm(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Er).join(`
`)),o=ya(o),o=Vl(o,t),o=Xl(o,t),a=ya(a),a=Vl(a,t),a=Xl(a,t),o=$l(o),a=$l(a),t.isRawShaderMaterial!==!0&&(b=`#version 300 es
`,_=[v,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+_,p=["#define varying in",t.glslVersion===il?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===il?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const C=b+_+o,A=b+p+a,I=zl(r,r.VERTEX_SHADER,C),P=zl(r,r.FRAGMENT_SHADER,A);r.attachShader(y,I),r.attachShader(y,P),t.index0AttributeName!==void 0?r.bindAttribLocation(y,0,t.index0AttributeName):t.morphTargets===!0&&r.bindAttribLocation(y,0,"position"),r.linkProgram(y);function U(D){if(i.debug.checkShaderErrors){const V=r.getProgramInfoLog(y)||"",$=r.getShaderInfoLog(I)||"",q=r.getShaderInfoLog(P)||"",X=V.trim(),Y=$.trim(),z=q.trim();let ae=!0,ne=!0;if(r.getProgramParameter(y,r.LINK_STATUS)===!1)if(ae=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(r,y,I,P);else{const ye=Wl(r,I,"vertex"),Te=Wl(r,P,"fragment");_t("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(y,r.VALIDATE_STATUS)+`

Material Name: `+D.name+`
Material Type: `+D.type+`

Program Info Log: `+X+`
`+ye+`
`+Te)}else X!==""?qe("WebGLProgram: Program Info Log:",X):(Y===""||z==="")&&(ne=!1);ne&&(D.diagnostics={runnable:ae,programLog:X,vertexShader:{log:Y,prefix:_},fragmentShader:{log:z,prefix:p}})}r.deleteShader(I),r.deleteShader(P),E=new ps(r,y),w=Nm(r,y)}let E;this.getUniforms=function(){return E===void 0&&U(this),E};let w;this.getAttributes=function(){return w===void 0&&U(this),w};let Z=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return Z===!1&&(Z=r.getProgramParameter(y,wm)),Z},this.destroy=function(){n.releaseStatesOfProgram(this),r.deleteProgram(y),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Am++,this.cacheKey=e,this.usedTimes=1,this.program=y,this.vertexShader=I,this.fragmentShader=P,this}let Jm=0;class Qm{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,r=this._getShaderStage(t),s=this._getShaderStage(n),o=this._getShaderCacheForMaterial(e);return o.has(r)===!1&&(o.add(r),r.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new eg(e),t.set(e,n)),n}}class eg{constructor(e){this.id=Jm++,this.code=e,this.usedTimes=0}}function tg(i,e,t,n,r,s){const o=new Ga,a=new Qm,l=new Set,c=[],u=new Map,d=n.logarithmicDepthBuffer;let f=n.precision;const v={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function x(E){return l.add(E),E===0?"uv":`uv${E}`}function y(E,w,Z,D,V){const $=D.fog,q=V.geometry,X=E.isMeshStandardMaterial||E.isMeshLambertMaterial||E.isMeshPhongMaterial?D.environment:null,Y=E.isMeshStandardMaterial||E.isMeshLambertMaterial&&!E.envMap||E.isMeshPhongMaterial&&!E.envMap,z=e.get(E.envMap||X,Y),ae=z&&z.mapping===Rs?z.image.height:null,ne=v[E.type];E.precision!==null&&(f=n.getMaxPrecision(E.precision),f!==E.precision&&qe("WebGLProgram.getParameters:",E.precision,"not supported, using",f,"instead."));const ye=q.morphAttributes.position||q.morphAttributes.normal||q.morphAttributes.color,Te=ye!==void 0?ye.length:0;let be=0;q.morphAttributes.position!==void 0&&(be=1),q.morphAttributes.normal!==void 0&&(be=2),q.morphAttributes.color!==void 0&&(be=3);let Ze,Rt,bt,Q;if(ne){const et=Cn[ne];Ze=et.vertexShader,Rt=et.fragmentShader}else Ze=E.vertexShader,Rt=E.fragmentShader,a.update(E),bt=a.getVertexShaderID(E),Q=a.getFragmentShaderID(E);const de=i.getRenderTarget(),pe=i.state.buffers.depth.getReversed(),je=V.isInstancedMesh===!0,Be=V.isBatchedMesh===!0,We=!!E.map,Dt=!!E.matcap,He=!!z,mt=!!E.aoMap,Mt=!!E.lightMap,Je=!!E.bumpMap,wt=!!E.normalMap,L=!!E.displacementMap,Pt=!!E.emissiveMap,ht=!!E.metalnessMap,gt=!!E.roughnessMap,De=E.anisotropy>0,R=E.clearcoat>0,S=E.dispersion>0,B=E.iridescence>0,J=E.sheen>0,te=E.transmission>0,K=De&&!!E.anisotropyMap,Ae=R&&!!E.clearcoatMap,he=R&&!!E.clearcoatNormalMap,Ge=R&&!!E.clearcoatRoughnessMap,ke=B&&!!E.iridescenceMap,se=B&&!!E.iridescenceThicknessMap,oe=J&&!!E.sheenColorMap,Pe=J&&!!E.sheenRoughnessMap,Ie=!!E.specularMap,Ee=!!E.specularColorMap,Qe=!!E.specularIntensityMap,O=te&&!!E.transmissionMap,ue=te&&!!E.thicknessMap,le=!!E.gradientMap,we=!!E.alphaMap,re=E.alphaTest>0,j=!!E.alphaHash,Re=!!E.extensions;let Xe=Ln;E.toneMapped&&(de===null||de.isXRRenderTarget===!0)&&(Xe=i.toneMapping);const Et={shaderID:ne,shaderType:E.type,shaderName:E.name,vertexShader:Ze,fragmentShader:Rt,defines:E.defines,customVertexShaderID:bt,customFragmentShaderID:Q,isRawShaderMaterial:E.isRawShaderMaterial===!0,glslVersion:E.glslVersion,precision:f,batching:Be,batchingColor:Be&&V._colorsTexture!==null,instancing:je,instancingColor:je&&V.instanceColor!==null,instancingMorph:je&&V.morphTexture!==null,outputColorSpace:de===null?i.outputColorSpace:de.isXRRenderTarget===!0?de.texture.colorSpace:Ji,alphaToCoverage:!!E.alphaToCoverage,map:We,matcap:Dt,envMap:He,envMapMode:He&&z.mapping,envMapCubeUVHeight:ae,aoMap:mt,lightMap:Mt,bumpMap:Je,normalMap:wt,displacementMap:L,emissiveMap:Pt,normalMapObjectSpace:wt&&E.normalMapType===Nh,normalMapTangentSpace:wt&&E.normalMapType===Oc,metalnessMap:ht,roughnessMap:gt,anisotropy:De,anisotropyMap:K,clearcoat:R,clearcoatMap:Ae,clearcoatNormalMap:he,clearcoatRoughnessMap:Ge,dispersion:S,iridescence:B,iridescenceMap:ke,iridescenceThicknessMap:se,sheen:J,sheenColorMap:oe,sheenRoughnessMap:Pe,specularMap:Ie,specularColorMap:Ee,specularIntensityMap:Qe,transmission:te,transmissionMap:O,thicknessMap:ue,gradientMap:le,opaque:E.transparent===!1&&E.blending===qi&&E.alphaToCoverage===!1,alphaMap:we,alphaTest:re,alphaHash:j,combine:E.combine,mapUv:We&&x(E.map.channel),aoMapUv:mt&&x(E.aoMap.channel),lightMapUv:Mt&&x(E.lightMap.channel),bumpMapUv:Je&&x(E.bumpMap.channel),normalMapUv:wt&&x(E.normalMap.channel),displacementMapUv:L&&x(E.displacementMap.channel),emissiveMapUv:Pt&&x(E.emissiveMap.channel),metalnessMapUv:ht&&x(E.metalnessMap.channel),roughnessMapUv:gt&&x(E.roughnessMap.channel),anisotropyMapUv:K&&x(E.anisotropyMap.channel),clearcoatMapUv:Ae&&x(E.clearcoatMap.channel),clearcoatNormalMapUv:he&&x(E.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Ge&&x(E.clearcoatRoughnessMap.channel),iridescenceMapUv:ke&&x(E.iridescenceMap.channel),iridescenceThicknessMapUv:se&&x(E.iridescenceThicknessMap.channel),sheenColorMapUv:oe&&x(E.sheenColorMap.channel),sheenRoughnessMapUv:Pe&&x(E.sheenRoughnessMap.channel),specularMapUv:Ie&&x(E.specularMap.channel),specularColorMapUv:Ee&&x(E.specularColorMap.channel),specularIntensityMapUv:Qe&&x(E.specularIntensityMap.channel),transmissionMapUv:O&&x(E.transmissionMap.channel),thicknessMapUv:ue&&x(E.thicknessMap.channel),alphaMapUv:we&&x(E.alphaMap.channel),vertexTangents:!!q.attributes.tangent&&(wt||De),vertexColors:E.vertexColors,vertexAlphas:E.vertexColors===!0&&!!q.attributes.color&&q.attributes.color.itemSize===4,pointsUvs:V.isPoints===!0&&!!q.attributes.uv&&(We||we),fog:!!$,useFog:E.fog===!0,fogExp2:!!$&&$.isFogExp2,flatShading:E.wireframe===!1&&(E.flatShading===!0||q.attributes.normal===void 0&&wt===!1&&(E.isMeshLambertMaterial||E.isMeshPhongMaterial||E.isMeshStandardMaterial||E.isMeshPhysicalMaterial)),sizeAttenuation:E.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:pe,skinning:V.isSkinnedMesh===!0,morphTargets:q.morphAttributes.position!==void 0,morphNormals:q.morphAttributes.normal!==void 0,morphColors:q.morphAttributes.color!==void 0,morphTargetsCount:Te,morphTextureStride:be,numDirLights:w.directional.length,numPointLights:w.point.length,numSpotLights:w.spot.length,numSpotLightMaps:w.spotLightMap.length,numRectAreaLights:w.rectArea.length,numHemiLights:w.hemi.length,numDirLightShadows:w.directionalShadowMap.length,numPointLightShadows:w.pointShadowMap.length,numSpotLightShadows:w.spotShadowMap.length,numSpotLightShadowsWithMaps:w.numSpotLightShadowsWithMaps,numLightProbes:w.numLightProbes,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:E.dithering,shadowMapEnabled:i.shadowMap.enabled&&Z.length>0,shadowMapType:i.shadowMap.type,toneMapping:Xe,decodeVideoTexture:We&&E.map.isVideoTexture===!0&&vt.getTransfer(E.map.colorSpace)===yt,decodeVideoTextureEmissive:Pt&&E.emissiveMap.isVideoTexture===!0&&vt.getTransfer(E.emissiveMap.colorSpace)===yt,premultipliedAlpha:E.premultipliedAlpha,doubleSided:E.side===gn,flipSided:E.side===sn,useDepthPacking:E.depthPacking>=0,depthPacking:E.depthPacking||0,index0AttributeName:E.index0AttributeName,extensionClipCullDistance:Re&&E.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Re&&E.extensions.multiDraw===!0||Be)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:E.customProgramCacheKey()};return Et.vertexUv1s=l.has(1),Et.vertexUv2s=l.has(2),Et.vertexUv3s=l.has(3),l.clear(),Et}function _(E){const w=[];if(E.shaderID?w.push(E.shaderID):(w.push(E.customVertexShaderID),w.push(E.customFragmentShaderID)),E.defines!==void 0)for(const Z in E.defines)w.push(Z),w.push(E.defines[Z]);return E.isRawShaderMaterial===!1&&(p(w,E),b(w,E),w.push(i.outputColorSpace)),w.push(E.customProgramCacheKey),w.join()}function p(E,w){E.push(w.precision),E.push(w.outputColorSpace),E.push(w.envMapMode),E.push(w.envMapCubeUVHeight),E.push(w.mapUv),E.push(w.alphaMapUv),E.push(w.lightMapUv),E.push(w.aoMapUv),E.push(w.bumpMapUv),E.push(w.normalMapUv),E.push(w.displacementMapUv),E.push(w.emissiveMapUv),E.push(w.metalnessMapUv),E.push(w.roughnessMapUv),E.push(w.anisotropyMapUv),E.push(w.clearcoatMapUv),E.push(w.clearcoatNormalMapUv),E.push(w.clearcoatRoughnessMapUv),E.push(w.iridescenceMapUv),E.push(w.iridescenceThicknessMapUv),E.push(w.sheenColorMapUv),E.push(w.sheenRoughnessMapUv),E.push(w.specularMapUv),E.push(w.specularColorMapUv),E.push(w.specularIntensityMapUv),E.push(w.transmissionMapUv),E.push(w.thicknessMapUv),E.push(w.combine),E.push(w.fogExp2),E.push(w.sizeAttenuation),E.push(w.morphTargetsCount),E.push(w.morphAttributeCount),E.push(w.numDirLights),E.push(w.numPointLights),E.push(w.numSpotLights),E.push(w.numSpotLightMaps),E.push(w.numHemiLights),E.push(w.numRectAreaLights),E.push(w.numDirLightShadows),E.push(w.numPointLightShadows),E.push(w.numSpotLightShadows),E.push(w.numSpotLightShadowsWithMaps),E.push(w.numLightProbes),E.push(w.shadowMapType),E.push(w.toneMapping),E.push(w.numClippingPlanes),E.push(w.numClipIntersection),E.push(w.depthPacking)}function b(E,w){o.disableAll(),w.instancing&&o.enable(0),w.instancingColor&&o.enable(1),w.instancingMorph&&o.enable(2),w.matcap&&o.enable(3),w.envMap&&o.enable(4),w.normalMapObjectSpace&&o.enable(5),w.normalMapTangentSpace&&o.enable(6),w.clearcoat&&o.enable(7),w.iridescence&&o.enable(8),w.alphaTest&&o.enable(9),w.vertexColors&&o.enable(10),w.vertexAlphas&&o.enable(11),w.vertexUv1s&&o.enable(12),w.vertexUv2s&&o.enable(13),w.vertexUv3s&&o.enable(14),w.vertexTangents&&o.enable(15),w.anisotropy&&o.enable(16),w.alphaHash&&o.enable(17),w.batching&&o.enable(18),w.dispersion&&o.enable(19),w.batchingColor&&o.enable(20),w.gradientMap&&o.enable(21),E.push(o.mask),o.disableAll(),w.fog&&o.enable(0),w.useFog&&o.enable(1),w.flatShading&&o.enable(2),w.logarithmicDepthBuffer&&o.enable(3),w.reversedDepthBuffer&&o.enable(4),w.skinning&&o.enable(5),w.morphTargets&&o.enable(6),w.morphNormals&&o.enable(7),w.morphColors&&o.enable(8),w.premultipliedAlpha&&o.enable(9),w.shadowMapEnabled&&o.enable(10),w.doubleSided&&o.enable(11),w.flipSided&&o.enable(12),w.useDepthPacking&&o.enable(13),w.dithering&&o.enable(14),w.transmission&&o.enable(15),w.sheen&&o.enable(16),w.opaque&&o.enable(17),w.pointsUvs&&o.enable(18),w.decodeVideoTexture&&o.enable(19),w.decodeVideoTextureEmissive&&o.enable(20),w.alphaToCoverage&&o.enable(21),E.push(o.mask)}function C(E){const w=v[E.type];let Z;if(w){const D=Cn[w];Z=Su.clone(D.uniforms)}else Z=E.uniforms;return Z}function A(E,w){let Z=u.get(w);return Z!==void 0?++Z.usedTimes:(Z=new Km(i,w,E,r),c.push(Z),u.set(w,Z)),Z}function I(E){if(--E.usedTimes===0){const w=c.indexOf(E);c[w]=c[c.length-1],c.pop(),u.delete(E.cacheKey),E.destroy()}}function P(E){a.remove(E)}function U(){a.dispose()}return{getParameters:y,getProgramCacheKey:_,getUniforms:C,acquireProgram:A,releaseProgram:I,releaseShaderCache:P,programs:c,dispose:U}}function ng(){let i=new WeakMap;function e(o){return i.has(o)}function t(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function r(o,a,l){i.get(o)[a]=l}function s(){i=new WeakMap}return{has:e,get:t,remove:n,update:r,dispose:s}}function ig(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.materialVariant!==e.materialVariant?i.materialVariant-e.materialVariant:i.z!==e.z?i.z-e.z:i.id-e.id}function ql(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function jl(){const i=[];let e=0;const t=[],n=[],r=[];function s(){e=0,t.length=0,n.length=0,r.length=0}function o(f){let v=0;return f.isInstancedMesh&&(v+=2),f.isSkinnedMesh&&(v+=1),v}function a(f,v,x,y,_,p){let b=i[e];return b===void 0?(b={id:f.id,object:f,geometry:v,material:x,materialVariant:o(f),groupOrder:y,renderOrder:f.renderOrder,z:_,group:p},i[e]=b):(b.id=f.id,b.object=f,b.geometry=v,b.material=x,b.materialVariant=o(f),b.groupOrder=y,b.renderOrder=f.renderOrder,b.z=_,b.group=p),e++,b}function l(f,v,x,y,_,p){const b=a(f,v,x,y,_,p);x.transmission>0?n.push(b):x.transparent===!0?r.push(b):t.push(b)}function c(f,v,x,y,_,p){const b=a(f,v,x,y,_,p);x.transmission>0?n.unshift(b):x.transparent===!0?r.unshift(b):t.unshift(b)}function u(f,v){t.length>1&&t.sort(f||ig),n.length>1&&n.sort(v||ql),r.length>1&&r.sort(v||ql)}function d(){for(let f=e,v=i.length;f<v;f++){const x=i[f];if(x.id===null)break;x.id=null,x.object=null,x.geometry=null,x.material=null,x.group=null}}return{opaque:t,transmissive:n,transparent:r,init:s,push:l,unshift:c,finish:d,sort:u}}function rg(){let i=new WeakMap;function e(n,r){const s=i.get(n);let o;return s===void 0?(o=new jl,i.set(n,[o])):r>=s.length?(o=new jl,s.push(o)):o=s[r],o}function t(){i=new WeakMap}return{get:e,dispose:t}}function sg(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new H,color:new pt};break;case"SpotLight":t={position:new H,direction:new H,color:new pt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new H,color:new pt,distance:0,decay:0};break;case"HemisphereLight":t={direction:new H,skyColor:new pt,groundColor:new pt};break;case"RectAreaLight":t={color:new pt,position:new H,halfWidth:new H,halfHeight:new H};break}return i[e.id]=t,t}}}function og(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ct};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ct};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ct,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let ag=0;function lg(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function cg(i){const e=new sg,t=og(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new H);const r=new H,s=new It,o=new It;function a(c){let u=0,d=0,f=0;for(let w=0;w<9;w++)n.probe[w].set(0,0,0);let v=0,x=0,y=0,_=0,p=0,b=0,C=0,A=0,I=0,P=0,U=0;c.sort(lg);for(let w=0,Z=c.length;w<Z;w++){const D=c[w],V=D.color,$=D.intensity,q=D.distance;let X=null;if(D.shadow&&D.shadow.map&&(D.shadow.map.texture.format===Ki?X=D.shadow.map.texture:X=D.shadow.map.depthTexture||D.shadow.map.texture),D.isAmbientLight)u+=V.r*$,d+=V.g*$,f+=V.b*$;else if(D.isLightProbe){for(let Y=0;Y<9;Y++)n.probe[Y].addScaledVector(D.sh.coefficients[Y],$);U++}else if(D.isDirectionalLight){const Y=e.get(D);if(Y.color.copy(D.color).multiplyScalar(D.intensity),D.castShadow){const z=D.shadow,ae=t.get(D);ae.shadowIntensity=z.intensity,ae.shadowBias=z.bias,ae.shadowNormalBias=z.normalBias,ae.shadowRadius=z.radius,ae.shadowMapSize=z.mapSize,n.directionalShadow[v]=ae,n.directionalShadowMap[v]=X,n.directionalShadowMatrix[v]=D.shadow.matrix,b++}n.directional[v]=Y,v++}else if(D.isSpotLight){const Y=e.get(D);Y.position.setFromMatrixPosition(D.matrixWorld),Y.color.copy(V).multiplyScalar($),Y.distance=q,Y.coneCos=Math.cos(D.angle),Y.penumbraCos=Math.cos(D.angle*(1-D.penumbra)),Y.decay=D.decay,n.spot[y]=Y;const z=D.shadow;if(D.map&&(n.spotLightMap[I]=D.map,I++,z.updateMatrices(D),D.castShadow&&P++),n.spotLightMatrix[y]=z.matrix,D.castShadow){const ae=t.get(D);ae.shadowIntensity=z.intensity,ae.shadowBias=z.bias,ae.shadowNormalBias=z.normalBias,ae.shadowRadius=z.radius,ae.shadowMapSize=z.mapSize,n.spotShadow[y]=ae,n.spotShadowMap[y]=X,A++}y++}else if(D.isRectAreaLight){const Y=e.get(D);Y.color.copy(V).multiplyScalar($),Y.halfWidth.set(D.width*.5,0,0),Y.halfHeight.set(0,D.height*.5,0),n.rectArea[_]=Y,_++}else if(D.isPointLight){const Y=e.get(D);if(Y.color.copy(D.color).multiplyScalar(D.intensity),Y.distance=D.distance,Y.decay=D.decay,D.castShadow){const z=D.shadow,ae=t.get(D);ae.shadowIntensity=z.intensity,ae.shadowBias=z.bias,ae.shadowNormalBias=z.normalBias,ae.shadowRadius=z.radius,ae.shadowMapSize=z.mapSize,ae.shadowCameraNear=z.camera.near,ae.shadowCameraFar=z.camera.far,n.pointShadow[x]=ae,n.pointShadowMap[x]=X,n.pointShadowMatrix[x]=D.shadow.matrix,C++}n.point[x]=Y,x++}else if(D.isHemisphereLight){const Y=e.get(D);Y.skyColor.copy(D.color).multiplyScalar($),Y.groundColor.copy(D.groundColor).multiplyScalar($),n.hemi[p]=Y,p++}}_>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Me.LTC_FLOAT_1,n.rectAreaLTC2=Me.LTC_FLOAT_2):(n.rectAreaLTC1=Me.LTC_HALF_1,n.rectAreaLTC2=Me.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=d,n.ambient[2]=f;const E=n.hash;(E.directionalLength!==v||E.pointLength!==x||E.spotLength!==y||E.rectAreaLength!==_||E.hemiLength!==p||E.numDirectionalShadows!==b||E.numPointShadows!==C||E.numSpotShadows!==A||E.numSpotMaps!==I||E.numLightProbes!==U)&&(n.directional.length=v,n.spot.length=y,n.rectArea.length=_,n.point.length=x,n.hemi.length=p,n.directionalShadow.length=b,n.directionalShadowMap.length=b,n.pointShadow.length=C,n.pointShadowMap.length=C,n.spotShadow.length=A,n.spotShadowMap.length=A,n.directionalShadowMatrix.length=b,n.pointShadowMatrix.length=C,n.spotLightMatrix.length=A+I-P,n.spotLightMap.length=I,n.numSpotLightShadowsWithMaps=P,n.numLightProbes=U,E.directionalLength=v,E.pointLength=x,E.spotLength=y,E.rectAreaLength=_,E.hemiLength=p,E.numDirectionalShadows=b,E.numPointShadows=C,E.numSpotShadows=A,E.numSpotMaps=I,E.numLightProbes=U,n.version=ag++)}function l(c,u){let d=0,f=0,v=0,x=0,y=0;const _=u.matrixWorldInverse;for(let p=0,b=c.length;p<b;p++){const C=c[p];if(C.isDirectionalLight){const A=n.directional[d];A.direction.setFromMatrixPosition(C.matrixWorld),r.setFromMatrixPosition(C.target.matrixWorld),A.direction.sub(r),A.direction.transformDirection(_),d++}else if(C.isSpotLight){const A=n.spot[v];A.position.setFromMatrixPosition(C.matrixWorld),A.position.applyMatrix4(_),A.direction.setFromMatrixPosition(C.matrixWorld),r.setFromMatrixPosition(C.target.matrixWorld),A.direction.sub(r),A.direction.transformDirection(_),v++}else if(C.isRectAreaLight){const A=n.rectArea[x];A.position.setFromMatrixPosition(C.matrixWorld),A.position.applyMatrix4(_),o.identity(),s.copy(C.matrixWorld),s.premultiply(_),o.extractRotation(s),A.halfWidth.set(C.width*.5,0,0),A.halfHeight.set(0,C.height*.5,0),A.halfWidth.applyMatrix4(o),A.halfHeight.applyMatrix4(o),x++}else if(C.isPointLight){const A=n.point[f];A.position.setFromMatrixPosition(C.matrixWorld),A.position.applyMatrix4(_),f++}else if(C.isHemisphereLight){const A=n.hemi[y];A.direction.setFromMatrixPosition(C.matrixWorld),A.direction.transformDirection(_),y++}}}return{setup:a,setupView:l,state:n}}function Zl(i){const e=new cg(i),t=[],n=[];function r(u){c.camera=u,t.length=0,n.length=0}function s(u){t.push(u)}function o(u){n.push(u)}function a(){e.setup(t)}function l(u){e.setupView(t,u)}const c={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:r,state:c,setupLights:a,setupLightsView:l,pushLight:s,pushShadow:o}}function hg(i){let e=new WeakMap;function t(r,s=0){const o=e.get(r);let a;return o===void 0?(a=new Zl(i),e.set(r,[a])):s>=o.length?(a=new Zl(i),o.push(a)):a=o[s],a}function n(){e=new WeakMap}return{get:t,dispose:n}}const ug=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,fg=`uniform sampler2D shadow_pass;
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
}`,dg=[new H(1,0,0),new H(-1,0,0),new H(0,1,0),new H(0,-1,0),new H(0,0,1),new H(0,0,-1)],pg=[new H(0,-1,0),new H(0,-1,0),new H(0,0,1),new H(0,0,-1),new H(0,-1,0),new H(0,-1,0)],Kl=new It,mr=new H,yo=new H;function mg(i,e,t){let n=new ka;const r=new ct,s=new ct,o=new Nt,a=new Tu,l=new bu,c={},u=t.maxTextureSize,d={[ci]:sn,[sn]:ci,[gn]:gn},f=new Gn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ct},radius:{value:4}},vertexShader:ug,fragmentShader:fg}),v=f.clone();v.defines.HORIZONTAL_PASS=1;const x=new tn;x.setAttribute("position",new On(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const y=new nt(x,f),_=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=br;let p=this.type;this.render=function(P,U,E){if(_.enabled===!1||_.autoUpdate===!1&&_.needsUpdate===!1||P.length===0)return;this.type===dh&&(qe("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=br);const w=i.getRenderTarget(),Z=i.getActiveCubeFace(),D=i.getActiveMipmapLevel(),V=i.state;V.setBlending($n),V.buffers.depth.getReversed()===!0?V.buffers.color.setClear(0,0,0,0):V.buffers.color.setClear(1,1,1,1),V.buffers.depth.setTest(!0),V.setScissorTest(!1);const $=p!==this.type;$&&U.traverse(function(q){q.material&&(Array.isArray(q.material)?q.material.forEach(X=>X.needsUpdate=!0):q.material.needsUpdate=!0)});for(let q=0,X=P.length;q<X;q++){const Y=P[q],z=Y.shadow;if(z===void 0){qe("WebGLShadowMap:",Y,"has no shadow.");continue}if(z.autoUpdate===!1&&z.needsUpdate===!1)continue;r.copy(z.mapSize);const ae=z.getFrameExtents();r.multiply(ae),s.copy(z.mapSize),(r.x>u||r.y>u)&&(r.x>u&&(s.x=Math.floor(u/ae.x),r.x=s.x*ae.x,z.mapSize.x=s.x),r.y>u&&(s.y=Math.floor(u/ae.y),r.y=s.y*ae.y,z.mapSize.y=s.y));const ne=i.state.buffers.depth.getReversed();if(z.camera._reversedDepth=ne,z.map===null||$===!0){if(z.map!==null&&(z.map.depthTexture!==null&&(z.map.depthTexture.dispose(),z.map.depthTexture=null),z.map.dispose()),this.type===yr){if(Y.isPointLight){qe("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}z.map=new Un(r.x,r.y,{format:Ki,type:qn,minFilter:Wt,magFilter:Wt,generateMipmaps:!1}),z.map.texture.name=Y.name+".shadowMap",z.map.depthTexture=new Pr(r.x,r.y,In),z.map.depthTexture.name=Y.name+".shadowMapDepth",z.map.depthTexture.format=jn,z.map.depthTexture.compareFunction=null,z.map.depthTexture.minFilter=Yt,z.map.depthTexture.magFilter=Yt}else Y.isPointLight?(z.map=new Yc(r.x),z.map.depthTexture=new vu(r.x,Nn)):(z.map=new Un(r.x,r.y),z.map.depthTexture=new Pr(r.x,r.y,Nn)),z.map.depthTexture.name=Y.name+".shadowMap",z.map.depthTexture.format=jn,this.type===br?(z.map.depthTexture.compareFunction=ne?Na:Oa,z.map.depthTexture.minFilter=Wt,z.map.depthTexture.magFilter=Wt):(z.map.depthTexture.compareFunction=null,z.map.depthTexture.minFilter=Yt,z.map.depthTexture.magFilter=Yt);z.camera.updateProjectionMatrix()}const ye=z.map.isWebGLCubeRenderTarget?6:1;for(let Te=0;Te<ye;Te++){if(z.map.isWebGLCubeRenderTarget)i.setRenderTarget(z.map,Te),i.clear();else{Te===0&&(i.setRenderTarget(z.map),i.clear());const be=z.getViewport(Te);o.set(s.x*be.x,s.y*be.y,s.x*be.z,s.y*be.w),V.viewport(o)}if(Y.isPointLight){const be=z.camera,Ze=z.matrix,Rt=Y.distance||be.far;Rt!==be.far&&(be.far=Rt,be.updateProjectionMatrix()),mr.setFromMatrixPosition(Y.matrixWorld),be.position.copy(mr),yo.copy(be.position),yo.add(dg[Te]),be.up.copy(pg[Te]),be.lookAt(yo),be.updateMatrixWorld(),Ze.makeTranslation(-mr.x,-mr.y,-mr.z),Kl.multiplyMatrices(be.projectionMatrix,be.matrixWorldInverse),z._frustum.setFromProjectionMatrix(Kl,be.coordinateSystem,be.reversedDepth)}else z.updateMatrices(Y);n=z.getFrustum(),A(U,E,z.camera,Y,this.type)}z.isPointLightShadow!==!0&&this.type===yr&&b(z,E),z.needsUpdate=!1}p=this.type,_.needsUpdate=!1,i.setRenderTarget(w,Z,D)};function b(P,U){const E=e.update(y);f.defines.VSM_SAMPLES!==P.blurSamples&&(f.defines.VSM_SAMPLES=P.blurSamples,v.defines.VSM_SAMPLES=P.blurSamples,f.needsUpdate=!0,v.needsUpdate=!0),P.mapPass===null&&(P.mapPass=new Un(r.x,r.y,{format:Ki,type:qn})),f.uniforms.shadow_pass.value=P.map.depthTexture,f.uniforms.resolution.value=P.mapSize,f.uniforms.radius.value=P.radius,i.setRenderTarget(P.mapPass),i.clear(),i.renderBufferDirect(U,null,E,f,y,null),v.uniforms.shadow_pass.value=P.mapPass.texture,v.uniforms.resolution.value=P.mapSize,v.uniforms.radius.value=P.radius,i.setRenderTarget(P.map),i.clear(),i.renderBufferDirect(U,null,E,v,y,null)}function C(P,U,E,w){let Z=null;const D=E.isPointLight===!0?P.customDistanceMaterial:P.customDepthMaterial;if(D!==void 0)Z=D;else if(Z=E.isPointLight===!0?l:a,i.localClippingEnabled&&U.clipShadows===!0&&Array.isArray(U.clippingPlanes)&&U.clippingPlanes.length!==0||U.displacementMap&&U.displacementScale!==0||U.alphaMap&&U.alphaTest>0||U.map&&U.alphaTest>0||U.alphaToCoverage===!0){const V=Z.uuid,$=U.uuid;let q=c[V];q===void 0&&(q={},c[V]=q);let X=q[$];X===void 0&&(X=Z.clone(),q[$]=X,U.addEventListener("dispose",I)),Z=X}if(Z.visible=U.visible,Z.wireframe=U.wireframe,w===yr?Z.side=U.shadowSide!==null?U.shadowSide:U.side:Z.side=U.shadowSide!==null?U.shadowSide:d[U.side],Z.alphaMap=U.alphaMap,Z.alphaTest=U.alphaToCoverage===!0?.5:U.alphaTest,Z.map=U.map,Z.clipShadows=U.clipShadows,Z.clippingPlanes=U.clippingPlanes,Z.clipIntersection=U.clipIntersection,Z.displacementMap=U.displacementMap,Z.displacementScale=U.displacementScale,Z.displacementBias=U.displacementBias,Z.wireframeLinewidth=U.wireframeLinewidth,Z.linewidth=U.linewidth,E.isPointLight===!0&&Z.isMeshDistanceMaterial===!0){const V=i.properties.get(Z);V.light=E}return Z}function A(P,U,E,w,Z){if(P.visible===!1)return;if(P.layers.test(U.layers)&&(P.isMesh||P.isLine||P.isPoints)&&(P.castShadow||P.receiveShadow&&Z===yr)&&(!P.frustumCulled||n.intersectsObject(P))){P.modelViewMatrix.multiplyMatrices(E.matrixWorldInverse,P.matrixWorld);const $=e.update(P),q=P.material;if(Array.isArray(q)){const X=$.groups;for(let Y=0,z=X.length;Y<z;Y++){const ae=X[Y],ne=q[ae.materialIndex];if(ne&&ne.visible){const ye=C(P,ne,w,Z);P.onBeforeShadow(i,P,U,E,$,ye,ae),i.renderBufferDirect(E,null,$,ye,P,ae),P.onAfterShadow(i,P,U,E,$,ye,ae)}}}else if(q.visible){const X=C(P,q,w,Z);P.onBeforeShadow(i,P,U,E,$,X,null),i.renderBufferDirect(E,null,$,X,P,null),P.onAfterShadow(i,P,U,E,$,X,null)}}const V=P.children;for(let $=0,q=V.length;$<q;$++)A(V[$],U,E,w,Z)}function I(P){P.target.removeEventListener("dispose",I);for(const E in c){const w=c[E],Z=P.target.uuid;Z in w&&(w[Z].dispose(),delete w[Z])}}}function gg(i,e){function t(){let O=!1;const ue=new Nt;let le=null;const we=new Nt(0,0,0,0);return{setMask:function(re){le!==re&&!O&&(i.colorMask(re,re,re,re),le=re)},setLocked:function(re){O=re},setClear:function(re,j,Re,Xe,Et){Et===!0&&(re*=Xe,j*=Xe,Re*=Xe),ue.set(re,j,Re,Xe),we.equals(ue)===!1&&(i.clearColor(re,j,Re,Xe),we.copy(ue))},reset:function(){O=!1,le=null,we.set(-1,0,0,0)}}}function n(){let O=!1,ue=!1,le=null,we=null,re=null;return{setReversed:function(j){if(ue!==j){const Re=e.get("EXT_clip_control");j?Re.clipControlEXT(Re.LOWER_LEFT_EXT,Re.ZERO_TO_ONE_EXT):Re.clipControlEXT(Re.LOWER_LEFT_EXT,Re.NEGATIVE_ONE_TO_ONE_EXT),ue=j;const Xe=re;re=null,this.setClear(Xe)}},getReversed:function(){return ue},setTest:function(j){j?de(i.DEPTH_TEST):pe(i.DEPTH_TEST)},setMask:function(j){le!==j&&!O&&(i.depthMask(j),le=j)},setFunc:function(j){if(ue&&(j=$h[j]),we!==j){switch(j){case Lo:i.depthFunc(i.NEVER);break;case Uo:i.depthFunc(i.ALWAYS);break;case Oo:i.depthFunc(i.LESS);break;case Pn:i.depthFunc(i.LEQUAL);break;case No:i.depthFunc(i.EQUAL);break;case Fo:i.depthFunc(i.GEQUAL);break;case wr:i.depthFunc(i.GREATER);break;case Go:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}we=j}},setLocked:function(j){O=j},setClear:function(j){re!==j&&(re=j,ue&&(j=1-j),i.clearDepth(j))},reset:function(){O=!1,le=null,we=null,re=null,ue=!1}}}function r(){let O=!1,ue=null,le=null,we=null,re=null,j=null,Re=null,Xe=null,Et=null;return{setTest:function(et){O||(et?de(i.STENCIL_TEST):pe(i.STENCIL_TEST))},setMask:function(et){ue!==et&&!O&&(i.stencilMask(et),ue=et)},setFunc:function(et,_n,Xt){(le!==et||we!==_n||re!==Xt)&&(i.stencilFunc(et,_n,Xt),le=et,we=_n,re=Xt)},setOp:function(et,_n,Xt){(j!==et||Re!==_n||Xe!==Xt)&&(i.stencilOp(et,_n,Xt),j=et,Re=_n,Xe=Xt)},setLocked:function(et){O=et},setClear:function(et){Et!==et&&(i.clearStencil(et),Et=et)},reset:function(){O=!1,ue=null,le=null,we=null,re=null,j=null,Re=null,Xe=null,Et=null}}}const s=new t,o=new n,a=new r,l=new WeakMap,c=new WeakMap;let u={},d={},f=new WeakMap,v=[],x=null,y=!1,_=null,p=null,b=null,C=null,A=null,I=null,P=null,U=new pt(0,0,0),E=0,w=!1,Z=null,D=null,V=null,$=null,q=null;const X=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let Y=!1,z=0;const ae=i.getParameter(i.VERSION);ae.indexOf("WebGL")!==-1?(z=parseFloat(/^WebGL (\d)/.exec(ae)[1]),Y=z>=1):ae.indexOf("OpenGL ES")!==-1&&(z=parseFloat(/^OpenGL ES (\d)/.exec(ae)[1]),Y=z>=2);let ne=null,ye={};const Te=i.getParameter(i.SCISSOR_BOX),be=i.getParameter(i.VIEWPORT),Ze=new Nt().fromArray(Te),Rt=new Nt().fromArray(be);function bt(O,ue,le,we){const re=new Uint8Array(4),j=i.createTexture();i.bindTexture(O,j),i.texParameteri(O,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(O,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Re=0;Re<le;Re++)O===i.TEXTURE_3D||O===i.TEXTURE_2D_ARRAY?i.texImage3D(ue,0,i.RGBA,1,1,we,0,i.RGBA,i.UNSIGNED_BYTE,re):i.texImage2D(ue+Re,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,re);return j}const Q={};Q[i.TEXTURE_2D]=bt(i.TEXTURE_2D,i.TEXTURE_2D,1),Q[i.TEXTURE_CUBE_MAP]=bt(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),Q[i.TEXTURE_2D_ARRAY]=bt(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),Q[i.TEXTURE_3D]=bt(i.TEXTURE_3D,i.TEXTURE_3D,1,1),s.setClear(0,0,0,1),o.setClear(1),a.setClear(0),de(i.DEPTH_TEST),o.setFunc(Pn),Je(!1),wt(Ja),de(i.CULL_FACE),mt($n);function de(O){u[O]!==!0&&(i.enable(O),u[O]=!0)}function pe(O){u[O]!==!1&&(i.disable(O),u[O]=!1)}function je(O,ue){return d[O]!==ue?(i.bindFramebuffer(O,ue),d[O]=ue,O===i.DRAW_FRAMEBUFFER&&(d[i.FRAMEBUFFER]=ue),O===i.FRAMEBUFFER&&(d[i.DRAW_FRAMEBUFFER]=ue),!0):!1}function Be(O,ue){let le=v,we=!1;if(O){le=f.get(ue),le===void 0&&(le=[],f.set(ue,le));const re=O.textures;if(le.length!==re.length||le[0]!==i.COLOR_ATTACHMENT0){for(let j=0,Re=re.length;j<Re;j++)le[j]=i.COLOR_ATTACHMENT0+j;le.length=re.length,we=!0}}else le[0]!==i.BACK&&(le[0]=i.BACK,we=!0);we&&i.drawBuffers(le)}function We(O){return x!==O?(i.useProgram(O),x=O,!0):!1}const Dt={[Mi]:i.FUNC_ADD,[mh]:i.FUNC_SUBTRACT,[gh]:i.FUNC_REVERSE_SUBTRACT};Dt[_h]=i.MIN,Dt[vh]=i.MAX;const He={[xh]:i.ZERO,[Sh]:i.ONE,[Mh]:i.SRC_COLOR,[Io]:i.SRC_ALPHA,[Ah]:i.SRC_ALPHA_SATURATE,[bh]:i.DST_COLOR,[Eh]:i.DST_ALPHA,[yh]:i.ONE_MINUS_SRC_COLOR,[Do]:i.ONE_MINUS_SRC_ALPHA,[wh]:i.ONE_MINUS_DST_COLOR,[Th]:i.ONE_MINUS_DST_ALPHA,[Rh]:i.CONSTANT_COLOR,[Ch]:i.ONE_MINUS_CONSTANT_COLOR,[Ph]:i.CONSTANT_ALPHA,[Ih]:i.ONE_MINUS_CONSTANT_ALPHA};function mt(O,ue,le,we,re,j,Re,Xe,Et,et){if(O===$n){y===!0&&(pe(i.BLEND),y=!1);return}if(y===!1&&(de(i.BLEND),y=!0),O!==ph){if(O!==_||et!==w){if((p!==Mi||A!==Mi)&&(i.blendEquation(i.FUNC_ADD),p=Mi,A=Mi),et)switch(O){case qi:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case _s:i.blendFunc(i.ONE,i.ONE);break;case Qa:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case el:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:_t("WebGLState: Invalid blending: ",O);break}else switch(O){case qi:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case _s:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case Qa:_t("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case el:_t("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:_t("WebGLState: Invalid blending: ",O);break}b=null,C=null,I=null,P=null,U.set(0,0,0),E=0,_=O,w=et}return}re=re||ue,j=j||le,Re=Re||we,(ue!==p||re!==A)&&(i.blendEquationSeparate(Dt[ue],Dt[re]),p=ue,A=re),(le!==b||we!==C||j!==I||Re!==P)&&(i.blendFuncSeparate(He[le],He[we],He[j],He[Re]),b=le,C=we,I=j,P=Re),(Xe.equals(U)===!1||Et!==E)&&(i.blendColor(Xe.r,Xe.g,Xe.b,Et),U.copy(Xe),E=Et),_=O,w=!1}function Mt(O,ue){O.side===gn?pe(i.CULL_FACE):de(i.CULL_FACE);let le=O.side===sn;ue&&(le=!le),Je(le),O.blending===qi&&O.transparent===!1?mt($n):mt(O.blending,O.blendEquation,O.blendSrc,O.blendDst,O.blendEquationAlpha,O.blendSrcAlpha,O.blendDstAlpha,O.blendColor,O.blendAlpha,O.premultipliedAlpha),o.setFunc(O.depthFunc),o.setTest(O.depthTest),o.setMask(O.depthWrite),s.setMask(O.colorWrite);const we=O.stencilWrite;a.setTest(we),we&&(a.setMask(O.stencilWriteMask),a.setFunc(O.stencilFunc,O.stencilRef,O.stencilFuncMask),a.setOp(O.stencilFail,O.stencilZFail,O.stencilZPass)),Pt(O.polygonOffset,O.polygonOffsetFactor,O.polygonOffsetUnits),O.alphaToCoverage===!0?de(i.SAMPLE_ALPHA_TO_COVERAGE):pe(i.SAMPLE_ALPHA_TO_COVERAGE)}function Je(O){Z!==O&&(O?i.frontFace(i.CW):i.frontFace(i.CCW),Z=O)}function wt(O){O!==uh?(de(i.CULL_FACE),O!==D&&(O===Ja?i.cullFace(i.BACK):O===fh?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):pe(i.CULL_FACE),D=O}function L(O){O!==V&&(Y&&i.lineWidth(O),V=O)}function Pt(O,ue,le){O?(de(i.POLYGON_OFFSET_FILL),($!==ue||q!==le)&&($=ue,q=le,o.getReversed()&&(ue=-ue),i.polygonOffset(ue,le))):pe(i.POLYGON_OFFSET_FILL)}function ht(O){O?de(i.SCISSOR_TEST):pe(i.SCISSOR_TEST)}function gt(O){O===void 0&&(O=i.TEXTURE0+X-1),ne!==O&&(i.activeTexture(O),ne=O)}function De(O,ue,le){le===void 0&&(ne===null?le=i.TEXTURE0+X-1:le=ne);let we=ye[le];we===void 0&&(we={type:void 0,texture:void 0},ye[le]=we),(we.type!==O||we.texture!==ue)&&(ne!==le&&(i.activeTexture(le),ne=le),i.bindTexture(O,ue||Q[O]),we.type=O,we.texture=ue)}function R(){const O=ye[ne];O!==void 0&&O.type!==void 0&&(i.bindTexture(O.type,null),O.type=void 0,O.texture=void 0)}function S(){try{i.compressedTexImage2D(...arguments)}catch(O){_t("WebGLState:",O)}}function B(){try{i.compressedTexImage3D(...arguments)}catch(O){_t("WebGLState:",O)}}function J(){try{i.texSubImage2D(...arguments)}catch(O){_t("WebGLState:",O)}}function te(){try{i.texSubImage3D(...arguments)}catch(O){_t("WebGLState:",O)}}function K(){try{i.compressedTexSubImage2D(...arguments)}catch(O){_t("WebGLState:",O)}}function Ae(){try{i.compressedTexSubImage3D(...arguments)}catch(O){_t("WebGLState:",O)}}function he(){try{i.texStorage2D(...arguments)}catch(O){_t("WebGLState:",O)}}function Ge(){try{i.texStorage3D(...arguments)}catch(O){_t("WebGLState:",O)}}function ke(){try{i.texImage2D(...arguments)}catch(O){_t("WebGLState:",O)}}function se(){try{i.texImage3D(...arguments)}catch(O){_t("WebGLState:",O)}}function oe(O){Ze.equals(O)===!1&&(i.scissor(O.x,O.y,O.z,O.w),Ze.copy(O))}function Pe(O){Rt.equals(O)===!1&&(i.viewport(O.x,O.y,O.z,O.w),Rt.copy(O))}function Ie(O,ue){let le=c.get(ue);le===void 0&&(le=new WeakMap,c.set(ue,le));let we=le.get(O);we===void 0&&(we=i.getUniformBlockIndex(ue,O.name),le.set(O,we))}function Ee(O,ue){const we=c.get(ue).get(O);l.get(ue)!==we&&(i.uniformBlockBinding(ue,we,O.__bindingPointIndex),l.set(ue,we))}function Qe(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),u={},ne=null,ye={},d={},f=new WeakMap,v=[],x=null,y=!1,_=null,p=null,b=null,C=null,A=null,I=null,P=null,U=new pt(0,0,0),E=0,w=!1,Z=null,D=null,V=null,$=null,q=null,Ze.set(0,0,i.canvas.width,i.canvas.height),Rt.set(0,0,i.canvas.width,i.canvas.height),s.reset(),o.reset(),a.reset()}return{buffers:{color:s,depth:o,stencil:a},enable:de,disable:pe,bindFramebuffer:je,drawBuffers:Be,useProgram:We,setBlending:mt,setMaterial:Mt,setFlipSided:Je,setCullFace:wt,setLineWidth:L,setPolygonOffset:Pt,setScissorTest:ht,activeTexture:gt,bindTexture:De,unbindTexture:R,compressedTexImage2D:S,compressedTexImage3D:B,texImage2D:ke,texImage3D:se,updateUBOMapping:Ie,uniformBlockBinding:Ee,texStorage2D:he,texStorage3D:Ge,texSubImage2D:J,texSubImage3D:te,compressedTexSubImage2D:K,compressedTexSubImage3D:Ae,scissor:oe,viewport:Pe,reset:Qe}}function _g(i,e,t,n,r,s,o){const a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new ct,u=new WeakMap;let d;const f=new WeakMap;let v=!1;try{v=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function x(R,S){return v?new OffscreenCanvas(R,S):xs("canvas")}function y(R,S,B){let J=1;const te=De(R);if((te.width>B||te.height>B)&&(J=B/Math.max(te.width,te.height)),J<1)if(typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&R instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&R instanceof ImageBitmap||typeof VideoFrame<"u"&&R instanceof VideoFrame){const K=Math.floor(J*te.width),Ae=Math.floor(J*te.height);d===void 0&&(d=x(K,Ae));const he=S?x(K,Ae):d;return he.width=K,he.height=Ae,he.getContext("2d").drawImage(R,0,0,K,Ae),qe("WebGLRenderer: Texture has been resized from ("+te.width+"x"+te.height+") to ("+K+"x"+Ae+")."),he}else return"data"in R&&qe("WebGLRenderer: Image in DataTexture is too big ("+te.width+"x"+te.height+")."),R;return R}function _(R){return R.generateMipmaps}function p(R){i.generateMipmap(R)}function b(R){return R.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:R.isWebGL3DRenderTarget?i.TEXTURE_3D:R.isWebGLArrayRenderTarget||R.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function C(R,S,B,J,te=!1){if(R!==null){if(i[R]!==void 0)return i[R];qe("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+R+"'")}let K=S;if(S===i.RED&&(B===i.FLOAT&&(K=i.R32F),B===i.HALF_FLOAT&&(K=i.R16F),B===i.UNSIGNED_BYTE&&(K=i.R8)),S===i.RED_INTEGER&&(B===i.UNSIGNED_BYTE&&(K=i.R8UI),B===i.UNSIGNED_SHORT&&(K=i.R16UI),B===i.UNSIGNED_INT&&(K=i.R32UI),B===i.BYTE&&(K=i.R8I),B===i.SHORT&&(K=i.R16I),B===i.INT&&(K=i.R32I)),S===i.RG&&(B===i.FLOAT&&(K=i.RG32F),B===i.HALF_FLOAT&&(K=i.RG16F),B===i.UNSIGNED_BYTE&&(K=i.RG8)),S===i.RG_INTEGER&&(B===i.UNSIGNED_BYTE&&(K=i.RG8UI),B===i.UNSIGNED_SHORT&&(K=i.RG16UI),B===i.UNSIGNED_INT&&(K=i.RG32UI),B===i.BYTE&&(K=i.RG8I),B===i.SHORT&&(K=i.RG16I),B===i.INT&&(K=i.RG32I)),S===i.RGB_INTEGER&&(B===i.UNSIGNED_BYTE&&(K=i.RGB8UI),B===i.UNSIGNED_SHORT&&(K=i.RGB16UI),B===i.UNSIGNED_INT&&(K=i.RGB32UI),B===i.BYTE&&(K=i.RGB8I),B===i.SHORT&&(K=i.RGB16I),B===i.INT&&(K=i.RGB32I)),S===i.RGBA_INTEGER&&(B===i.UNSIGNED_BYTE&&(K=i.RGBA8UI),B===i.UNSIGNED_SHORT&&(K=i.RGBA16UI),B===i.UNSIGNED_INT&&(K=i.RGBA32UI),B===i.BYTE&&(K=i.RGBA8I),B===i.SHORT&&(K=i.RGBA16I),B===i.INT&&(K=i.RGBA32I)),S===i.RGB&&(B===i.UNSIGNED_INT_5_9_9_9_REV&&(K=i.RGB9_E5),B===i.UNSIGNED_INT_10F_11F_11F_REV&&(K=i.R11F_G11F_B10F)),S===i.RGBA){const Ae=te?vs:vt.getTransfer(J);B===i.FLOAT&&(K=i.RGBA32F),B===i.HALF_FLOAT&&(K=i.RGBA16F),B===i.UNSIGNED_BYTE&&(K=Ae===yt?i.SRGB8_ALPHA8:i.RGBA8),B===i.UNSIGNED_SHORT_4_4_4_4&&(K=i.RGBA4),B===i.UNSIGNED_SHORT_5_5_5_1&&(K=i.RGB5_A1)}return(K===i.R16F||K===i.R32F||K===i.RG16F||K===i.RG32F||K===i.RGBA16F||K===i.RGBA32F)&&e.get("EXT_color_buffer_float"),K}function A(R,S){let B;return R?S===null||S===Nn||S===Rr?B=i.DEPTH24_STENCIL8:S===In?B=i.DEPTH32F_STENCIL8:S===Ar&&(B=i.DEPTH24_STENCIL8,qe("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):S===null||S===Nn||S===Rr?B=i.DEPTH_COMPONENT24:S===In?B=i.DEPTH_COMPONENT32F:S===Ar&&(B=i.DEPTH_COMPONENT16),B}function I(R,S){return _(R)===!0||R.isFramebufferTexture&&R.minFilter!==Yt&&R.minFilter!==Wt?Math.log2(Math.max(S.width,S.height))+1:R.mipmaps!==void 0&&R.mipmaps.length>0?R.mipmaps.length:R.isCompressedTexture&&Array.isArray(R.image)?S.mipmaps.length:1}function P(R){const S=R.target;S.removeEventListener("dispose",P),E(S),S.isVideoTexture&&u.delete(S)}function U(R){const S=R.target;S.removeEventListener("dispose",U),Z(S)}function E(R){const S=n.get(R);if(S.__webglInit===void 0)return;const B=R.source,J=f.get(B);if(J){const te=J[S.__cacheKey];te.usedTimes--,te.usedTimes===0&&w(R),Object.keys(J).length===0&&f.delete(B)}n.remove(R)}function w(R){const S=n.get(R);i.deleteTexture(S.__webglTexture);const B=R.source,J=f.get(B);delete J[S.__cacheKey],o.memory.textures--}function Z(R){const S=n.get(R);if(R.depthTexture&&(R.depthTexture.dispose(),n.remove(R.depthTexture)),R.isWebGLCubeRenderTarget)for(let J=0;J<6;J++){if(Array.isArray(S.__webglFramebuffer[J]))for(let te=0;te<S.__webglFramebuffer[J].length;te++)i.deleteFramebuffer(S.__webglFramebuffer[J][te]);else i.deleteFramebuffer(S.__webglFramebuffer[J]);S.__webglDepthbuffer&&i.deleteRenderbuffer(S.__webglDepthbuffer[J])}else{if(Array.isArray(S.__webglFramebuffer))for(let J=0;J<S.__webglFramebuffer.length;J++)i.deleteFramebuffer(S.__webglFramebuffer[J]);else i.deleteFramebuffer(S.__webglFramebuffer);if(S.__webglDepthbuffer&&i.deleteRenderbuffer(S.__webglDepthbuffer),S.__webglMultisampledFramebuffer&&i.deleteFramebuffer(S.__webglMultisampledFramebuffer),S.__webglColorRenderbuffer)for(let J=0;J<S.__webglColorRenderbuffer.length;J++)S.__webglColorRenderbuffer[J]&&i.deleteRenderbuffer(S.__webglColorRenderbuffer[J]);S.__webglDepthRenderbuffer&&i.deleteRenderbuffer(S.__webglDepthRenderbuffer)}const B=R.textures;for(let J=0,te=B.length;J<te;J++){const K=n.get(B[J]);K.__webglTexture&&(i.deleteTexture(K.__webglTexture),o.memory.textures--),n.remove(B[J])}n.remove(R)}let D=0;function V(){D=0}function $(){const R=D;return R>=r.maxTextures&&qe("WebGLTextures: Trying to use "+R+" texture units while this GPU supports only "+r.maxTextures),D+=1,R}function q(R){const S=[];return S.push(R.wrapS),S.push(R.wrapT),S.push(R.wrapR||0),S.push(R.magFilter),S.push(R.minFilter),S.push(R.anisotropy),S.push(R.internalFormat),S.push(R.format),S.push(R.type),S.push(R.generateMipmaps),S.push(R.premultiplyAlpha),S.push(R.flipY),S.push(R.unpackAlignment),S.push(R.colorSpace),S.join()}function X(R,S){const B=n.get(R);if(R.isVideoTexture&&ht(R),R.isRenderTargetTexture===!1&&R.isExternalTexture!==!0&&R.version>0&&B.__version!==R.version){const J=R.image;if(J===null)qe("WebGLRenderer: Texture marked for update but no image data found.");else if(J.complete===!1)qe("WebGLRenderer: Texture marked for update but image is incomplete");else{Q(B,R,S);return}}else R.isExternalTexture&&(B.__webglTexture=R.sourceTexture?R.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,B.__webglTexture,i.TEXTURE0+S)}function Y(R,S){const B=n.get(R);if(R.isRenderTargetTexture===!1&&R.version>0&&B.__version!==R.version){Q(B,R,S);return}else R.isExternalTexture&&(B.__webglTexture=R.sourceTexture?R.sourceTexture:null);t.bindTexture(i.TEXTURE_2D_ARRAY,B.__webglTexture,i.TEXTURE0+S)}function z(R,S){const B=n.get(R);if(R.isRenderTargetTexture===!1&&R.version>0&&B.__version!==R.version){Q(B,R,S);return}t.bindTexture(i.TEXTURE_3D,B.__webglTexture,i.TEXTURE0+S)}function ae(R,S){const B=n.get(R);if(R.isCubeDepthTexture!==!0&&R.version>0&&B.__version!==R.version){de(B,R,S);return}t.bindTexture(i.TEXTURE_CUBE_MAP,B.__webglTexture,i.TEXTURE0+S)}const ne={[Ei]:i.REPEAT,[Xn]:i.CLAMP_TO_EDGE,[Bo]:i.MIRRORED_REPEAT},ye={[Yt]:i.NEAREST,[Uh]:i.NEAREST_MIPMAP_NEAREST,[Fr]:i.NEAREST_MIPMAP_LINEAR,[Wt]:i.LINEAR,[Ws]:i.LINEAR_MIPMAP_NEAREST,[Ti]:i.LINEAR_MIPMAP_LINEAR},Te={[Fh]:i.NEVER,[Hh]:i.ALWAYS,[Gh]:i.LESS,[Oa]:i.LEQUAL,[Bh]:i.EQUAL,[Na]:i.GEQUAL,[kh]:i.GREATER,[zh]:i.NOTEQUAL};function be(R,S){if(S.type===In&&e.has("OES_texture_float_linear")===!1&&(S.magFilter===Wt||S.magFilter===Ws||S.magFilter===Fr||S.magFilter===Ti||S.minFilter===Wt||S.minFilter===Ws||S.minFilter===Fr||S.minFilter===Ti)&&qe("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(R,i.TEXTURE_WRAP_S,ne[S.wrapS]),i.texParameteri(R,i.TEXTURE_WRAP_T,ne[S.wrapT]),(R===i.TEXTURE_3D||R===i.TEXTURE_2D_ARRAY)&&i.texParameteri(R,i.TEXTURE_WRAP_R,ne[S.wrapR]),i.texParameteri(R,i.TEXTURE_MAG_FILTER,ye[S.magFilter]),i.texParameteri(R,i.TEXTURE_MIN_FILTER,ye[S.minFilter]),S.compareFunction&&(i.texParameteri(R,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(R,i.TEXTURE_COMPARE_FUNC,Te[S.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(S.magFilter===Yt||S.minFilter!==Fr&&S.minFilter!==Ti||S.type===In&&e.has("OES_texture_float_linear")===!1)return;if(S.anisotropy>1||n.get(S).__currentAnisotropy){const B=e.get("EXT_texture_filter_anisotropic");i.texParameterf(R,B.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(S.anisotropy,r.getMaxAnisotropy())),n.get(S).__currentAnisotropy=S.anisotropy}}}function Ze(R,S){let B=!1;R.__webglInit===void 0&&(R.__webglInit=!0,S.addEventListener("dispose",P));const J=S.source;let te=f.get(J);te===void 0&&(te={},f.set(J,te));const K=q(S);if(K!==R.__cacheKey){te[K]===void 0&&(te[K]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,B=!0),te[K].usedTimes++;const Ae=te[R.__cacheKey];Ae!==void 0&&(te[R.__cacheKey].usedTimes--,Ae.usedTimes===0&&w(S)),R.__cacheKey=K,R.__webglTexture=te[K].texture}return B}function Rt(R,S,B){return Math.floor(Math.floor(R/B)/S)}function bt(R,S,B,J){const K=R.updateRanges;if(K.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,S.width,S.height,B,J,S.data);else{K.sort((se,oe)=>se.start-oe.start);let Ae=0;for(let se=1;se<K.length;se++){const oe=K[Ae],Pe=K[se],Ie=oe.start+oe.count,Ee=Rt(Pe.start,S.width,4),Qe=Rt(oe.start,S.width,4);Pe.start<=Ie+1&&Ee===Qe&&Rt(Pe.start+Pe.count-1,S.width,4)===Ee?oe.count=Math.max(oe.count,Pe.start+Pe.count-oe.start):(++Ae,K[Ae]=Pe)}K.length=Ae+1;const he=i.getParameter(i.UNPACK_ROW_LENGTH),Ge=i.getParameter(i.UNPACK_SKIP_PIXELS),ke=i.getParameter(i.UNPACK_SKIP_ROWS);i.pixelStorei(i.UNPACK_ROW_LENGTH,S.width);for(let se=0,oe=K.length;se<oe;se++){const Pe=K[se],Ie=Math.floor(Pe.start/4),Ee=Math.ceil(Pe.count/4),Qe=Ie%S.width,O=Math.floor(Ie/S.width),ue=Ee,le=1;i.pixelStorei(i.UNPACK_SKIP_PIXELS,Qe),i.pixelStorei(i.UNPACK_SKIP_ROWS,O),t.texSubImage2D(i.TEXTURE_2D,0,Qe,O,ue,le,B,J,S.data)}R.clearUpdateRanges(),i.pixelStorei(i.UNPACK_ROW_LENGTH,he),i.pixelStorei(i.UNPACK_SKIP_PIXELS,Ge),i.pixelStorei(i.UNPACK_SKIP_ROWS,ke)}}function Q(R,S,B){let J=i.TEXTURE_2D;(S.isDataArrayTexture||S.isCompressedArrayTexture)&&(J=i.TEXTURE_2D_ARRAY),S.isData3DTexture&&(J=i.TEXTURE_3D);const te=Ze(R,S),K=S.source;t.bindTexture(J,R.__webglTexture,i.TEXTURE0+B);const Ae=n.get(K);if(K.version!==Ae.__version||te===!0){t.activeTexture(i.TEXTURE0+B);const he=vt.getPrimaries(vt.workingColorSpace),Ge=S.colorSpace===si?null:vt.getPrimaries(S.colorSpace),ke=S.colorSpace===si||he===Ge?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,S.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,S.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,ke);let se=y(S.image,!1,r.maxTextureSize);se=gt(S,se);const oe=s.convert(S.format,S.colorSpace),Pe=s.convert(S.type);let Ie=C(S.internalFormat,oe,Pe,S.colorSpace,S.isVideoTexture);be(J,S);let Ee;const Qe=S.mipmaps,O=S.isVideoTexture!==!0,ue=Ae.__version===void 0||te===!0,le=K.dataReady,we=I(S,se);if(S.isDepthTexture)Ie=A(S.format===bi,S.type),ue&&(O?t.texStorage2D(i.TEXTURE_2D,1,Ie,se.width,se.height):t.texImage2D(i.TEXTURE_2D,0,Ie,se.width,se.height,0,oe,Pe,null));else if(S.isDataTexture)if(Qe.length>0){O&&ue&&t.texStorage2D(i.TEXTURE_2D,we,Ie,Qe[0].width,Qe[0].height);for(let re=0,j=Qe.length;re<j;re++)Ee=Qe[re],O?le&&t.texSubImage2D(i.TEXTURE_2D,re,0,0,Ee.width,Ee.height,oe,Pe,Ee.data):t.texImage2D(i.TEXTURE_2D,re,Ie,Ee.width,Ee.height,0,oe,Pe,Ee.data);S.generateMipmaps=!1}else O?(ue&&t.texStorage2D(i.TEXTURE_2D,we,Ie,se.width,se.height),le&&bt(S,se,oe,Pe)):t.texImage2D(i.TEXTURE_2D,0,Ie,se.width,se.height,0,oe,Pe,se.data);else if(S.isCompressedTexture)if(S.isCompressedArrayTexture){O&&ue&&t.texStorage3D(i.TEXTURE_2D_ARRAY,we,Ie,Qe[0].width,Qe[0].height,se.depth);for(let re=0,j=Qe.length;re<j;re++)if(Ee=Qe[re],S.format!==En)if(oe!==null)if(O){if(le)if(S.layerUpdates.size>0){const Re=Rl(Ee.width,Ee.height,S.format,S.type);for(const Xe of S.layerUpdates){const Et=Ee.data.subarray(Xe*Re/Ee.data.BYTES_PER_ELEMENT,(Xe+1)*Re/Ee.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,re,0,0,Xe,Ee.width,Ee.height,1,oe,Et)}S.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,re,0,0,0,Ee.width,Ee.height,se.depth,oe,Ee.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,re,Ie,Ee.width,Ee.height,se.depth,0,Ee.data,0,0);else qe("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else O?le&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,re,0,0,0,Ee.width,Ee.height,se.depth,oe,Pe,Ee.data):t.texImage3D(i.TEXTURE_2D_ARRAY,re,Ie,Ee.width,Ee.height,se.depth,0,oe,Pe,Ee.data)}else{O&&ue&&t.texStorage2D(i.TEXTURE_2D,we,Ie,Qe[0].width,Qe[0].height);for(let re=0,j=Qe.length;re<j;re++)Ee=Qe[re],S.format!==En?oe!==null?O?le&&t.compressedTexSubImage2D(i.TEXTURE_2D,re,0,0,Ee.width,Ee.height,oe,Ee.data):t.compressedTexImage2D(i.TEXTURE_2D,re,Ie,Ee.width,Ee.height,0,Ee.data):qe("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):O?le&&t.texSubImage2D(i.TEXTURE_2D,re,0,0,Ee.width,Ee.height,oe,Pe,Ee.data):t.texImage2D(i.TEXTURE_2D,re,Ie,Ee.width,Ee.height,0,oe,Pe,Ee.data)}else if(S.isDataArrayTexture)if(O){if(ue&&t.texStorage3D(i.TEXTURE_2D_ARRAY,we,Ie,se.width,se.height,se.depth),le)if(S.layerUpdates.size>0){const re=Rl(se.width,se.height,S.format,S.type);for(const j of S.layerUpdates){const Re=se.data.subarray(j*re/se.data.BYTES_PER_ELEMENT,(j+1)*re/se.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,j,se.width,se.height,1,oe,Pe,Re)}S.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,se.width,se.height,se.depth,oe,Pe,se.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,Ie,se.width,se.height,se.depth,0,oe,Pe,se.data);else if(S.isData3DTexture)O?(ue&&t.texStorage3D(i.TEXTURE_3D,we,Ie,se.width,se.height,se.depth),le&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,se.width,se.height,se.depth,oe,Pe,se.data)):t.texImage3D(i.TEXTURE_3D,0,Ie,se.width,se.height,se.depth,0,oe,Pe,se.data);else if(S.isFramebufferTexture){if(ue)if(O)t.texStorage2D(i.TEXTURE_2D,we,Ie,se.width,se.height);else{let re=se.width,j=se.height;for(let Re=0;Re<we;Re++)t.texImage2D(i.TEXTURE_2D,Re,Ie,re,j,0,oe,Pe,null),re>>=1,j>>=1}}else if(Qe.length>0){if(O&&ue){const re=De(Qe[0]);t.texStorage2D(i.TEXTURE_2D,we,Ie,re.width,re.height)}for(let re=0,j=Qe.length;re<j;re++)Ee=Qe[re],O?le&&t.texSubImage2D(i.TEXTURE_2D,re,0,0,oe,Pe,Ee):t.texImage2D(i.TEXTURE_2D,re,Ie,oe,Pe,Ee);S.generateMipmaps=!1}else if(O){if(ue){const re=De(se);t.texStorage2D(i.TEXTURE_2D,we,Ie,re.width,re.height)}le&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,oe,Pe,se)}else t.texImage2D(i.TEXTURE_2D,0,Ie,oe,Pe,se);_(S)&&p(J),Ae.__version=K.version,S.onUpdate&&S.onUpdate(S)}R.__version=S.version}function de(R,S,B){if(S.image.length!==6)return;const J=Ze(R,S),te=S.source;t.bindTexture(i.TEXTURE_CUBE_MAP,R.__webglTexture,i.TEXTURE0+B);const K=n.get(te);if(te.version!==K.__version||J===!0){t.activeTexture(i.TEXTURE0+B);const Ae=vt.getPrimaries(vt.workingColorSpace),he=S.colorSpace===si?null:vt.getPrimaries(S.colorSpace),Ge=S.colorSpace===si||Ae===he?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,S.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,S.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ge);const ke=S.isCompressedTexture||S.image[0].isCompressedTexture,se=S.image[0]&&S.image[0].isDataTexture,oe=[];for(let j=0;j<6;j++)!ke&&!se?oe[j]=y(S.image[j],!0,r.maxCubemapSize):oe[j]=se?S.image[j].image:S.image[j],oe[j]=gt(S,oe[j]);const Pe=oe[0],Ie=s.convert(S.format,S.colorSpace),Ee=s.convert(S.type),Qe=C(S.internalFormat,Ie,Ee,S.colorSpace),O=S.isVideoTexture!==!0,ue=K.__version===void 0||J===!0,le=te.dataReady;let we=I(S,Pe);be(i.TEXTURE_CUBE_MAP,S);let re;if(ke){O&&ue&&t.texStorage2D(i.TEXTURE_CUBE_MAP,we,Qe,Pe.width,Pe.height);for(let j=0;j<6;j++){re=oe[j].mipmaps;for(let Re=0;Re<re.length;Re++){const Xe=re[Re];S.format!==En?Ie!==null?O?le&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,Re,0,0,Xe.width,Xe.height,Ie,Xe.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,Re,Qe,Xe.width,Xe.height,0,Xe.data):qe("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):O?le&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,Re,0,0,Xe.width,Xe.height,Ie,Ee,Xe.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,Re,Qe,Xe.width,Xe.height,0,Ie,Ee,Xe.data)}}}else{if(re=S.mipmaps,O&&ue){re.length>0&&we++;const j=De(oe[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,we,Qe,j.width,j.height)}for(let j=0;j<6;j++)if(se){O?le&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,0,0,oe[j].width,oe[j].height,Ie,Ee,oe[j].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,Qe,oe[j].width,oe[j].height,0,Ie,Ee,oe[j].data);for(let Re=0;Re<re.length;Re++){const Et=re[Re].image[j].image;O?le&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,Re+1,0,0,Et.width,Et.height,Ie,Ee,Et.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,Re+1,Qe,Et.width,Et.height,0,Ie,Ee,Et.data)}}else{O?le&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,0,0,Ie,Ee,oe[j]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,Qe,Ie,Ee,oe[j]);for(let Re=0;Re<re.length;Re++){const Xe=re[Re];O?le&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,Re+1,0,0,Ie,Ee,Xe.image[j]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,Re+1,Qe,Ie,Ee,Xe.image[j])}}}_(S)&&p(i.TEXTURE_CUBE_MAP),K.__version=te.version,S.onUpdate&&S.onUpdate(S)}R.__version=S.version}function pe(R,S,B,J,te,K){const Ae=s.convert(B.format,B.colorSpace),he=s.convert(B.type),Ge=C(B.internalFormat,Ae,he,B.colorSpace),ke=n.get(S),se=n.get(B);if(se.__renderTarget=S,!ke.__hasExternalTextures){const oe=Math.max(1,S.width>>K),Pe=Math.max(1,S.height>>K);te===i.TEXTURE_3D||te===i.TEXTURE_2D_ARRAY?t.texImage3D(te,K,Ge,oe,Pe,S.depth,0,Ae,he,null):t.texImage2D(te,K,Ge,oe,Pe,0,Ae,he,null)}t.bindFramebuffer(i.FRAMEBUFFER,R),Pt(S)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,J,te,se.__webglTexture,0,L(S)):(te===i.TEXTURE_2D||te>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&te<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,J,te,se.__webglTexture,K),t.bindFramebuffer(i.FRAMEBUFFER,null)}function je(R,S,B){if(i.bindRenderbuffer(i.RENDERBUFFER,R),S.depthBuffer){const J=S.depthTexture,te=J&&J.isDepthTexture?J.type:null,K=A(S.stencilBuffer,te),Ae=S.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;Pt(S)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,L(S),K,S.width,S.height):B?i.renderbufferStorageMultisample(i.RENDERBUFFER,L(S),K,S.width,S.height):i.renderbufferStorage(i.RENDERBUFFER,K,S.width,S.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,Ae,i.RENDERBUFFER,R)}else{const J=S.textures;for(let te=0;te<J.length;te++){const K=J[te],Ae=s.convert(K.format,K.colorSpace),he=s.convert(K.type),Ge=C(K.internalFormat,Ae,he,K.colorSpace);Pt(S)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,L(S),Ge,S.width,S.height):B?i.renderbufferStorageMultisample(i.RENDERBUFFER,L(S),Ge,S.width,S.height):i.renderbufferStorage(i.RENDERBUFFER,Ge,S.width,S.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Be(R,S,B){const J=S.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(i.FRAMEBUFFER,R),!(S.depthTexture&&S.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const te=n.get(S.depthTexture);if(te.__renderTarget=S,(!te.__webglTexture||S.depthTexture.image.width!==S.width||S.depthTexture.image.height!==S.height)&&(S.depthTexture.image.width=S.width,S.depthTexture.image.height=S.height,S.depthTexture.needsUpdate=!0),J){if(te.__webglInit===void 0&&(te.__webglInit=!0,S.depthTexture.addEventListener("dispose",P)),te.__webglTexture===void 0){te.__webglTexture=i.createTexture(),t.bindTexture(i.TEXTURE_CUBE_MAP,te.__webglTexture),be(i.TEXTURE_CUBE_MAP,S.depthTexture);const ke=s.convert(S.depthTexture.format),se=s.convert(S.depthTexture.type);let oe;S.depthTexture.format===jn?oe=i.DEPTH_COMPONENT24:S.depthTexture.format===bi&&(oe=i.DEPTH24_STENCIL8);for(let Pe=0;Pe<6;Pe++)i.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Pe,0,oe,S.width,S.height,0,ke,se,null)}}else X(S.depthTexture,0);const K=te.__webglTexture,Ae=L(S),he=J?i.TEXTURE_CUBE_MAP_POSITIVE_X+B:i.TEXTURE_2D,Ge=S.depthTexture.format===bi?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(S.depthTexture.format===jn)Pt(S)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,Ge,he,K,0,Ae):i.framebufferTexture2D(i.FRAMEBUFFER,Ge,he,K,0);else if(S.depthTexture.format===bi)Pt(S)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,Ge,he,K,0,Ae):i.framebufferTexture2D(i.FRAMEBUFFER,Ge,he,K,0);else throw new Error("Unknown depthTexture format")}function We(R){const S=n.get(R),B=R.isWebGLCubeRenderTarget===!0;if(S.__boundDepthTexture!==R.depthTexture){const J=R.depthTexture;if(S.__depthDisposeCallback&&S.__depthDisposeCallback(),J){const te=()=>{delete S.__boundDepthTexture,delete S.__depthDisposeCallback,J.removeEventListener("dispose",te)};J.addEventListener("dispose",te),S.__depthDisposeCallback=te}S.__boundDepthTexture=J}if(R.depthTexture&&!S.__autoAllocateDepthBuffer)if(B)for(let J=0;J<6;J++)Be(S.__webglFramebuffer[J],R,J);else{const J=R.texture.mipmaps;J&&J.length>0?Be(S.__webglFramebuffer[0],R,0):Be(S.__webglFramebuffer,R,0)}else if(B){S.__webglDepthbuffer=[];for(let J=0;J<6;J++)if(t.bindFramebuffer(i.FRAMEBUFFER,S.__webglFramebuffer[J]),S.__webglDepthbuffer[J]===void 0)S.__webglDepthbuffer[J]=i.createRenderbuffer(),je(S.__webglDepthbuffer[J],R,!1);else{const te=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,K=S.__webglDepthbuffer[J];i.bindRenderbuffer(i.RENDERBUFFER,K),i.framebufferRenderbuffer(i.FRAMEBUFFER,te,i.RENDERBUFFER,K)}}else{const J=R.texture.mipmaps;if(J&&J.length>0?t.bindFramebuffer(i.FRAMEBUFFER,S.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,S.__webglFramebuffer),S.__webglDepthbuffer===void 0)S.__webglDepthbuffer=i.createRenderbuffer(),je(S.__webglDepthbuffer,R,!1);else{const te=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,K=S.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,K),i.framebufferRenderbuffer(i.FRAMEBUFFER,te,i.RENDERBUFFER,K)}}t.bindFramebuffer(i.FRAMEBUFFER,null)}function Dt(R,S,B){const J=n.get(R);S!==void 0&&pe(J.__webglFramebuffer,R,R.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),B!==void 0&&We(R)}function He(R){const S=R.texture,B=n.get(R),J=n.get(S);R.addEventListener("dispose",U);const te=R.textures,K=R.isWebGLCubeRenderTarget===!0,Ae=te.length>1;if(Ae||(J.__webglTexture===void 0&&(J.__webglTexture=i.createTexture()),J.__version=S.version,o.memory.textures++),K){B.__webglFramebuffer=[];for(let he=0;he<6;he++)if(S.mipmaps&&S.mipmaps.length>0){B.__webglFramebuffer[he]=[];for(let Ge=0;Ge<S.mipmaps.length;Ge++)B.__webglFramebuffer[he][Ge]=i.createFramebuffer()}else B.__webglFramebuffer[he]=i.createFramebuffer()}else{if(S.mipmaps&&S.mipmaps.length>0){B.__webglFramebuffer=[];for(let he=0;he<S.mipmaps.length;he++)B.__webglFramebuffer[he]=i.createFramebuffer()}else B.__webglFramebuffer=i.createFramebuffer();if(Ae)for(let he=0,Ge=te.length;he<Ge;he++){const ke=n.get(te[he]);ke.__webglTexture===void 0&&(ke.__webglTexture=i.createTexture(),o.memory.textures++)}if(R.samples>0&&Pt(R)===!1){B.__webglMultisampledFramebuffer=i.createFramebuffer(),B.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,B.__webglMultisampledFramebuffer);for(let he=0;he<te.length;he++){const Ge=te[he];B.__webglColorRenderbuffer[he]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,B.__webglColorRenderbuffer[he]);const ke=s.convert(Ge.format,Ge.colorSpace),se=s.convert(Ge.type),oe=C(Ge.internalFormat,ke,se,Ge.colorSpace,R.isXRRenderTarget===!0),Pe=L(R);i.renderbufferStorageMultisample(i.RENDERBUFFER,Pe,oe,R.width,R.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+he,i.RENDERBUFFER,B.__webglColorRenderbuffer[he])}i.bindRenderbuffer(i.RENDERBUFFER,null),R.depthBuffer&&(B.__webglDepthRenderbuffer=i.createRenderbuffer(),je(B.__webglDepthRenderbuffer,R,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(K){t.bindTexture(i.TEXTURE_CUBE_MAP,J.__webglTexture),be(i.TEXTURE_CUBE_MAP,S);for(let he=0;he<6;he++)if(S.mipmaps&&S.mipmaps.length>0)for(let Ge=0;Ge<S.mipmaps.length;Ge++)pe(B.__webglFramebuffer[he][Ge],R,S,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+he,Ge);else pe(B.__webglFramebuffer[he],R,S,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+he,0);_(S)&&p(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Ae){for(let he=0,Ge=te.length;he<Ge;he++){const ke=te[he],se=n.get(ke);let oe=i.TEXTURE_2D;(R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(oe=R.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(oe,se.__webglTexture),be(oe,ke),pe(B.__webglFramebuffer,R,ke,i.COLOR_ATTACHMENT0+he,oe,0),_(ke)&&p(oe)}t.unbindTexture()}else{let he=i.TEXTURE_2D;if((R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(he=R.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(he,J.__webglTexture),be(he,S),S.mipmaps&&S.mipmaps.length>0)for(let Ge=0;Ge<S.mipmaps.length;Ge++)pe(B.__webglFramebuffer[Ge],R,S,i.COLOR_ATTACHMENT0,he,Ge);else pe(B.__webglFramebuffer,R,S,i.COLOR_ATTACHMENT0,he,0);_(S)&&p(he),t.unbindTexture()}R.depthBuffer&&We(R)}function mt(R){const S=R.textures;for(let B=0,J=S.length;B<J;B++){const te=S[B];if(_(te)){const K=b(R),Ae=n.get(te).__webglTexture;t.bindTexture(K,Ae),p(K),t.unbindTexture()}}}const Mt=[],Je=[];function wt(R){if(R.samples>0){if(Pt(R)===!1){const S=R.textures,B=R.width,J=R.height;let te=i.COLOR_BUFFER_BIT;const K=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Ae=n.get(R),he=S.length>1;if(he)for(let ke=0;ke<S.length;ke++)t.bindFramebuffer(i.FRAMEBUFFER,Ae.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ke,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,Ae.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+ke,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,Ae.__webglMultisampledFramebuffer);const Ge=R.texture.mipmaps;Ge&&Ge.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Ae.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Ae.__webglFramebuffer);for(let ke=0;ke<S.length;ke++){if(R.resolveDepthBuffer&&(R.depthBuffer&&(te|=i.DEPTH_BUFFER_BIT),R.stencilBuffer&&R.resolveStencilBuffer&&(te|=i.STENCIL_BUFFER_BIT)),he){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Ae.__webglColorRenderbuffer[ke]);const se=n.get(S[ke]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,se,0)}i.blitFramebuffer(0,0,B,J,0,0,B,J,te,i.NEAREST),l===!0&&(Mt.length=0,Je.length=0,Mt.push(i.COLOR_ATTACHMENT0+ke),R.depthBuffer&&R.resolveDepthBuffer===!1&&(Mt.push(K),Je.push(K),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,Je)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,Mt))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),he)for(let ke=0;ke<S.length;ke++){t.bindFramebuffer(i.FRAMEBUFFER,Ae.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ke,i.RENDERBUFFER,Ae.__webglColorRenderbuffer[ke]);const se=n.get(S[ke]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,Ae.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+ke,i.TEXTURE_2D,se,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Ae.__webglMultisampledFramebuffer)}else if(R.depthBuffer&&R.resolveDepthBuffer===!1&&l){const S=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[S])}}}function L(R){return Math.min(r.maxSamples,R.samples)}function Pt(R){const S=n.get(R);return R.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&S.__useRenderToTexture!==!1}function ht(R){const S=o.render.frame;u.get(R)!==S&&(u.set(R,S),R.update())}function gt(R,S){const B=R.colorSpace,J=R.format,te=R.type;return R.isCompressedTexture===!0||R.isVideoTexture===!0||B!==Ji&&B!==si&&(vt.getTransfer(B)===yt?(J!==En||te!==un)&&qe("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):_t("WebGLTextures: Unsupported texture color space:",B)),S}function De(R){return typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement?(c.width=R.naturalWidth||R.width,c.height=R.naturalHeight||R.height):typeof VideoFrame<"u"&&R instanceof VideoFrame?(c.width=R.displayWidth,c.height=R.displayHeight):(c.width=R.width,c.height=R.height),c}this.allocateTextureUnit=$,this.resetTextureUnits=V,this.setTexture2D=X,this.setTexture2DArray=Y,this.setTexture3D=z,this.setTextureCube=ae,this.rebindTextures=Dt,this.setupRenderTarget=He,this.updateRenderTargetMipmap=mt,this.updateMultisampleRenderTarget=wt,this.setupDepthRenderbuffer=We,this.setupFrameBufferTexture=pe,this.useMultisampledRTT=Pt,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function vg(i,e){function t(n,r=si){let s;const o=vt.getTransfer(r);if(n===un)return i.UNSIGNED_BYTE;if(n===Pa)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Ia)return i.UNSIGNED_SHORT_5_5_5_1;if(n===Pc)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===Ic)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===Rc)return i.BYTE;if(n===Cc)return i.SHORT;if(n===Ar)return i.UNSIGNED_SHORT;if(n===Ca)return i.INT;if(n===Nn)return i.UNSIGNED_INT;if(n===In)return i.FLOAT;if(n===qn)return i.HALF_FLOAT;if(n===Dc)return i.ALPHA;if(n===Lc)return i.RGB;if(n===En)return i.RGBA;if(n===jn)return i.DEPTH_COMPONENT;if(n===bi)return i.DEPTH_STENCIL;if(n===Uc)return i.RED;if(n===Da)return i.RED_INTEGER;if(n===Ki)return i.RG;if(n===La)return i.RG_INTEGER;if(n===Ua)return i.RGBA_INTEGER;if(n===hs||n===us||n===fs||n===ds)if(o===yt)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(n===hs)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===us)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===fs)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===ds)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(n===hs)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===us)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===fs)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===ds)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===ko||n===zo||n===Ho||n===Wo)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(n===ko)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===zo)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Ho)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Wo)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Vo||n===Xo||n===$o||n===Yo||n===qo||n===jo||n===Zo)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(n===Vo||n===Xo)return o===yt?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(n===$o)return o===yt?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC;if(n===Yo)return s.COMPRESSED_R11_EAC;if(n===qo)return s.COMPRESSED_SIGNED_R11_EAC;if(n===jo)return s.COMPRESSED_RG11_EAC;if(n===Zo)return s.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===Ko||n===Jo||n===Qo||n===ea||n===ta||n===na||n===ia||n===ra||n===sa||n===oa||n===aa||n===la||n===ca||n===ha)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(n===Ko)return o===yt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Jo)return o===yt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Qo)return o===yt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===ea)return o===yt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===ta)return o===yt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===na)return o===yt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===ia)return o===yt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===ra)return o===yt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===sa)return o===yt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===oa)return o===yt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===aa)return o===yt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===la)return o===yt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===ca)return o===yt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===ha)return o===yt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===ua||n===fa||n===da)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(n===ua)return o===yt?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===fa)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===da)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===pa||n===ma||n===ga||n===_a)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(n===pa)return s.COMPRESSED_RED_RGTC1_EXT;if(n===ma)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===ga)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===_a)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Rr?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}const xg=`
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

}`;class Mg{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const n=new Wc(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new Gn({vertexShader:xg,fragmentShader:Sg,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new nt(new Lr(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class yg extends ir{constructor(e,t){super();const n=this;let r=null,s=1,o=null,a="local-floor",l=1,c=null,u=null,d=null,f=null,v=null,x=null;const y=typeof XRWebGLBinding<"u",_=new Mg,p={},b=t.getContextAttributes();let C=null,A=null;const I=[],P=[],U=new ct;let E=null;const w=new mn;w.viewport=new Nt;const Z=new mn;Z.viewport=new Nt;const D=[w,Z],V=new Du;let $=null,q=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Q){let de=I[Q];return de===void 0&&(de=new Ks,I[Q]=de),de.getTargetRaySpace()},this.getControllerGrip=function(Q){let de=I[Q];return de===void 0&&(de=new Ks,I[Q]=de),de.getGripSpace()},this.getHand=function(Q){let de=I[Q];return de===void 0&&(de=new Ks,I[Q]=de),de.getHandSpace()};function X(Q){const de=P.indexOf(Q.inputSource);if(de===-1)return;const pe=I[de];pe!==void 0&&(pe.update(Q.inputSource,Q.frame,c||o),pe.dispatchEvent({type:Q.type,data:Q.inputSource}))}function Y(){r.removeEventListener("select",X),r.removeEventListener("selectstart",X),r.removeEventListener("selectend",X),r.removeEventListener("squeeze",X),r.removeEventListener("squeezestart",X),r.removeEventListener("squeezeend",X),r.removeEventListener("end",Y),r.removeEventListener("inputsourceschange",z);for(let Q=0;Q<I.length;Q++){const de=P[Q];de!==null&&(P[Q]=null,I[Q].disconnect(de))}$=null,q=null,_.reset();for(const Q in p)delete p[Q];e.setRenderTarget(C),v=null,f=null,d=null,r=null,A=null,bt.stop(),n.isPresenting=!1,e.setPixelRatio(E),e.setSize(U.width,U.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Q){s=Q,n.isPresenting===!0&&qe("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Q){a=Q,n.isPresenting===!0&&qe("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(Q){c=Q},this.getBaseLayer=function(){return f!==null?f:v},this.getBinding=function(){return d===null&&y&&(d=new XRWebGLBinding(r,t)),d},this.getFrame=function(){return x},this.getSession=function(){return r},this.setSession=async function(Q){if(r=Q,r!==null){if(C=e.getRenderTarget(),r.addEventListener("select",X),r.addEventListener("selectstart",X),r.addEventListener("selectend",X),r.addEventListener("squeeze",X),r.addEventListener("squeezestart",X),r.addEventListener("squeezeend",X),r.addEventListener("end",Y),r.addEventListener("inputsourceschange",z),b.xrCompatible!==!0&&await t.makeXRCompatible(),E=e.getPixelRatio(),e.getSize(U),y&&"createProjectionLayer"in XRWebGLBinding.prototype){let pe=null,je=null,Be=null;b.depth&&(Be=b.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,pe=b.stencil?bi:jn,je=b.stencil?Rr:Nn);const We={colorFormat:t.RGBA8,depthFormat:Be,scaleFactor:s};d=this.getBinding(),f=d.createProjectionLayer(We),r.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),A=new Un(f.textureWidth,f.textureHeight,{format:En,type:un,depthTexture:new Pr(f.textureWidth,f.textureHeight,je,void 0,void 0,void 0,void 0,void 0,void 0,pe),stencilBuffer:b.stencil,colorSpace:e.outputColorSpace,samples:b.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}else{const pe={antialias:b.antialias,alpha:!0,depth:b.depth,stencil:b.stencil,framebufferScaleFactor:s};v=new XRWebGLLayer(r,t,pe),r.updateRenderState({baseLayer:v}),e.setPixelRatio(1),e.setSize(v.framebufferWidth,v.framebufferHeight,!1),A=new Un(v.framebufferWidth,v.framebufferHeight,{format:En,type:un,colorSpace:e.outputColorSpace,stencilBuffer:b.stencil,resolveDepthBuffer:v.ignoreDepthValues===!1,resolveStencilBuffer:v.ignoreDepthValues===!1})}A.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await r.requestReferenceSpace(a),bt.setContext(r),bt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function z(Q){for(let de=0;de<Q.removed.length;de++){const pe=Q.removed[de],je=P.indexOf(pe);je>=0&&(P[je]=null,I[je].disconnect(pe))}for(let de=0;de<Q.added.length;de++){const pe=Q.added[de];let je=P.indexOf(pe);if(je===-1){for(let We=0;We<I.length;We++)if(We>=P.length){P.push(pe),je=We;break}else if(P[We]===null){P[We]=pe,je=We;break}if(je===-1)break}const Be=I[je];Be&&Be.connect(pe)}}const ae=new H,ne=new H;function ye(Q,de,pe){ae.setFromMatrixPosition(de.matrixWorld),ne.setFromMatrixPosition(pe.matrixWorld);const je=ae.distanceTo(ne),Be=de.projectionMatrix.elements,We=pe.projectionMatrix.elements,Dt=Be[14]/(Be[10]-1),He=Be[14]/(Be[10]+1),mt=(Be[9]+1)/Be[5],Mt=(Be[9]-1)/Be[5],Je=(Be[8]-1)/Be[0],wt=(We[8]+1)/We[0],L=Dt*Je,Pt=Dt*wt,ht=je/(-Je+wt),gt=ht*-Je;if(de.matrixWorld.decompose(Q.position,Q.quaternion,Q.scale),Q.translateX(gt),Q.translateZ(ht),Q.matrixWorld.compose(Q.position,Q.quaternion,Q.scale),Q.matrixWorldInverse.copy(Q.matrixWorld).invert(),Be[10]===-1)Q.projectionMatrix.copy(de.projectionMatrix),Q.projectionMatrixInverse.copy(de.projectionMatrixInverse);else{const De=Dt+ht,R=He+ht,S=L-gt,B=Pt+(je-gt),J=mt*He/R*De,te=Mt*He/R*De;Q.projectionMatrix.makePerspective(S,B,J,te,De,R),Q.projectionMatrixInverse.copy(Q.projectionMatrix).invert()}}function Te(Q,de){de===null?Q.matrixWorld.copy(Q.matrix):Q.matrixWorld.multiplyMatrices(de.matrixWorld,Q.matrix),Q.matrixWorldInverse.copy(Q.matrixWorld).invert()}this.updateCamera=function(Q){if(r===null)return;let de=Q.near,pe=Q.far;_.texture!==null&&(_.depthNear>0&&(de=_.depthNear),_.depthFar>0&&(pe=_.depthFar)),V.near=Z.near=w.near=de,V.far=Z.far=w.far=pe,($!==V.near||q!==V.far)&&(r.updateRenderState({depthNear:V.near,depthFar:V.far}),$=V.near,q=V.far),V.layers.mask=Q.layers.mask|6,w.layers.mask=V.layers.mask&-5,Z.layers.mask=V.layers.mask&-3;const je=Q.parent,Be=V.cameras;Te(V,je);for(let We=0;We<Be.length;We++)Te(Be[We],je);Be.length===2?ye(V,w,Z):V.projectionMatrix.copy(w.projectionMatrix),be(Q,V,je)};function be(Q,de,pe){pe===null?Q.matrix.copy(de.matrixWorld):(Q.matrix.copy(pe.matrixWorld),Q.matrix.invert(),Q.matrix.multiply(de.matrixWorld)),Q.matrix.decompose(Q.position,Q.quaternion,Q.scale),Q.updateMatrixWorld(!0),Q.projectionMatrix.copy(de.projectionMatrix),Q.projectionMatrixInverse.copy(de.projectionMatrixInverse),Q.isPerspectiveCamera&&(Q.fov=va*2*Math.atan(1/Q.projectionMatrix.elements[5]),Q.zoom=1)}this.getCamera=function(){return V},this.getFoveation=function(){if(!(f===null&&v===null))return l},this.setFoveation=function(Q){l=Q,f!==null&&(f.fixedFoveation=Q),v!==null&&v.fixedFoveation!==void 0&&(v.fixedFoveation=Q)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(V)},this.getCameraTexture=function(Q){return p[Q]};let Ze=null;function Rt(Q,de){if(u=de.getViewerPose(c||o),x=de,u!==null){const pe=u.views;v!==null&&(e.setRenderTargetFramebuffer(A,v.framebuffer),e.setRenderTarget(A));let je=!1;pe.length!==V.cameras.length&&(V.cameras.length=0,je=!0);for(let He=0;He<pe.length;He++){const mt=pe[He];let Mt=null;if(v!==null)Mt=v.getViewport(mt);else{const wt=d.getViewSubImage(f,mt);Mt=wt.viewport,He===0&&(e.setRenderTargetTextures(A,wt.colorTexture,wt.depthStencilTexture),e.setRenderTarget(A))}let Je=D[He];Je===void 0&&(Je=new mn,Je.layers.enable(He),Je.viewport=new Nt,D[He]=Je),Je.matrix.fromArray(mt.transform.matrix),Je.matrix.decompose(Je.position,Je.quaternion,Je.scale),Je.projectionMatrix.fromArray(mt.projectionMatrix),Je.projectionMatrixInverse.copy(Je.projectionMatrix).invert(),Je.viewport.set(Mt.x,Mt.y,Mt.width,Mt.height),He===0&&(V.matrix.copy(Je.matrix),V.matrix.decompose(V.position,V.quaternion,V.scale)),je===!0&&V.cameras.push(Je)}const Be=r.enabledFeatures;if(Be&&Be.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&y){d=n.getBinding();const He=d.getDepthInformation(pe[0]);He&&He.isValid&&He.texture&&_.init(He,r.renderState)}if(Be&&Be.includes("camera-access")&&y){e.state.unbindTexture(),d=n.getBinding();for(let He=0;He<pe.length;He++){const mt=pe[He].camera;if(mt){let Mt=p[mt];Mt||(Mt=new Wc,p[mt]=Mt);const Je=d.getCameraImage(mt);Mt.sourceTexture=Je}}}}for(let pe=0;pe<I.length;pe++){const je=P[pe],Be=I[pe];je!==null&&Be!==void 0&&Be.update(je,de,c||o)}Ze&&Ze(Q,de),de.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:de}),x=null}const bt=new $c;bt.setAnimationLoop(Rt),this.setAnimationLoop=function(Q){Ze=Q},this.dispose=function(){}}}const _i=new Fn,Eg=new It;function Tg(i,e){function t(_,p){_.matrixAutoUpdate===!0&&_.updateMatrix(),p.value.copy(_.matrix)}function n(_,p){p.color.getRGB(_.fogColor.value,Vc(i)),p.isFog?(_.fogNear.value=p.near,_.fogFar.value=p.far):p.isFogExp2&&(_.fogDensity.value=p.density)}function r(_,p,b,C,A){p.isMeshBasicMaterial?s(_,p):p.isMeshLambertMaterial?(s(_,p),p.envMap&&(_.envMapIntensity.value=p.envMapIntensity)):p.isMeshToonMaterial?(s(_,p),d(_,p)):p.isMeshPhongMaterial?(s(_,p),u(_,p),p.envMap&&(_.envMapIntensity.value=p.envMapIntensity)):p.isMeshStandardMaterial?(s(_,p),f(_,p),p.isMeshPhysicalMaterial&&v(_,p,A)):p.isMeshMatcapMaterial?(s(_,p),x(_,p)):p.isMeshDepthMaterial?s(_,p):p.isMeshDistanceMaterial?(s(_,p),y(_,p)):p.isMeshNormalMaterial?s(_,p):p.isLineBasicMaterial?(o(_,p),p.isLineDashedMaterial&&a(_,p)):p.isPointsMaterial?l(_,p,b,C):p.isSpriteMaterial?c(_,p):p.isShadowMaterial?(_.color.value.copy(p.color),_.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function s(_,p){_.opacity.value=p.opacity,p.color&&_.diffuse.value.copy(p.color),p.emissive&&_.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(_.map.value=p.map,t(p.map,_.mapTransform)),p.alphaMap&&(_.alphaMap.value=p.alphaMap,t(p.alphaMap,_.alphaMapTransform)),p.bumpMap&&(_.bumpMap.value=p.bumpMap,t(p.bumpMap,_.bumpMapTransform),_.bumpScale.value=p.bumpScale,p.side===sn&&(_.bumpScale.value*=-1)),p.normalMap&&(_.normalMap.value=p.normalMap,t(p.normalMap,_.normalMapTransform),_.normalScale.value.copy(p.normalScale),p.side===sn&&_.normalScale.value.negate()),p.displacementMap&&(_.displacementMap.value=p.displacementMap,t(p.displacementMap,_.displacementMapTransform),_.displacementScale.value=p.displacementScale,_.displacementBias.value=p.displacementBias),p.emissiveMap&&(_.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,_.emissiveMapTransform)),p.specularMap&&(_.specularMap.value=p.specularMap,t(p.specularMap,_.specularMapTransform)),p.alphaTest>0&&(_.alphaTest.value=p.alphaTest);const b=e.get(p),C=b.envMap,A=b.envMapRotation;C&&(_.envMap.value=C,_i.copy(A),_i.x*=-1,_i.y*=-1,_i.z*=-1,C.isCubeTexture&&C.isRenderTargetTexture===!1&&(_i.y*=-1,_i.z*=-1),_.envMapRotation.value.setFromMatrix4(Eg.makeRotationFromEuler(_i)),_.flipEnvMap.value=C.isCubeTexture&&C.isRenderTargetTexture===!1?-1:1,_.reflectivity.value=p.reflectivity,_.ior.value=p.ior,_.refractionRatio.value=p.refractionRatio),p.lightMap&&(_.lightMap.value=p.lightMap,_.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,_.lightMapTransform)),p.aoMap&&(_.aoMap.value=p.aoMap,_.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,_.aoMapTransform))}function o(_,p){_.diffuse.value.copy(p.color),_.opacity.value=p.opacity,p.map&&(_.map.value=p.map,t(p.map,_.mapTransform))}function a(_,p){_.dashSize.value=p.dashSize,_.totalSize.value=p.dashSize+p.gapSize,_.scale.value=p.scale}function l(_,p,b,C){_.diffuse.value.copy(p.color),_.opacity.value=p.opacity,_.size.value=p.size*b,_.scale.value=C*.5,p.map&&(_.map.value=p.map,t(p.map,_.uvTransform)),p.alphaMap&&(_.alphaMap.value=p.alphaMap,t(p.alphaMap,_.alphaMapTransform)),p.alphaTest>0&&(_.alphaTest.value=p.alphaTest)}function c(_,p){_.diffuse.value.copy(p.color),_.opacity.value=p.opacity,_.rotation.value=p.rotation,p.map&&(_.map.value=p.map,t(p.map,_.mapTransform)),p.alphaMap&&(_.alphaMap.value=p.alphaMap,t(p.alphaMap,_.alphaMapTransform)),p.alphaTest>0&&(_.alphaTest.value=p.alphaTest)}function u(_,p){_.specular.value.copy(p.specular),_.shininess.value=Math.max(p.shininess,1e-4)}function d(_,p){p.gradientMap&&(_.gradientMap.value=p.gradientMap)}function f(_,p){_.metalness.value=p.metalness,p.metalnessMap&&(_.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,_.metalnessMapTransform)),_.roughness.value=p.roughness,p.roughnessMap&&(_.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,_.roughnessMapTransform)),p.envMap&&(_.envMapIntensity.value=p.envMapIntensity)}function v(_,p,b){_.ior.value=p.ior,p.sheen>0&&(_.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),_.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(_.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,_.sheenColorMapTransform)),p.sheenRoughnessMap&&(_.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,_.sheenRoughnessMapTransform))),p.clearcoat>0&&(_.clearcoat.value=p.clearcoat,_.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(_.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,_.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(_.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,_.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(_.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,_.clearcoatNormalMapTransform),_.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===sn&&_.clearcoatNormalScale.value.negate())),p.dispersion>0&&(_.dispersion.value=p.dispersion),p.iridescence>0&&(_.iridescence.value=p.iridescence,_.iridescenceIOR.value=p.iridescenceIOR,_.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],_.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(_.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,_.iridescenceMapTransform)),p.iridescenceThicknessMap&&(_.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,_.iridescenceThicknessMapTransform))),p.transmission>0&&(_.transmission.value=p.transmission,_.transmissionSamplerMap.value=b.texture,_.transmissionSamplerSize.value.set(b.width,b.height),p.transmissionMap&&(_.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,_.transmissionMapTransform)),_.thickness.value=p.thickness,p.thicknessMap&&(_.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,_.thicknessMapTransform)),_.attenuationDistance.value=p.attenuationDistance,_.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(_.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(_.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,_.anisotropyMapTransform))),_.specularIntensity.value=p.specularIntensity,_.specularColor.value.copy(p.specularColor),p.specularColorMap&&(_.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,_.specularColorMapTransform)),p.specularIntensityMap&&(_.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,_.specularIntensityMapTransform))}function x(_,p){p.matcap&&(_.matcap.value=p.matcap)}function y(_,p){const b=e.get(p).light;_.referencePosition.value.setFromMatrixPosition(b.matrixWorld),_.nearDistance.value=b.shadow.camera.near,_.farDistance.value=b.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:r}}function bg(i,e,t,n){let r={},s={},o=[];const a=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(b,C){const A=C.program;n.uniformBlockBinding(b,A)}function c(b,C){let A=r[b.id];A===void 0&&(x(b),A=u(b),r[b.id]=A,b.addEventListener("dispose",_));const I=C.program;n.updateUBOMapping(b,I);const P=e.render.frame;s[b.id]!==P&&(f(b),s[b.id]=P)}function u(b){const C=d();b.__bindingPointIndex=C;const A=i.createBuffer(),I=b.__size,P=b.usage;return i.bindBuffer(i.UNIFORM_BUFFER,A),i.bufferData(i.UNIFORM_BUFFER,I,P),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,C,A),A}function d(){for(let b=0;b<a;b++)if(o.indexOf(b)===-1)return o.push(b),b;return _t("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(b){const C=r[b.id],A=b.uniforms,I=b.__cache;i.bindBuffer(i.UNIFORM_BUFFER,C);for(let P=0,U=A.length;P<U;P++){const E=Array.isArray(A[P])?A[P]:[A[P]];for(let w=0,Z=E.length;w<Z;w++){const D=E[w];if(v(D,P,w,I)===!0){const V=D.__offset,$=Array.isArray(D.value)?D.value:[D.value];let q=0;for(let X=0;X<$.length;X++){const Y=$[X],z=y(Y);typeof Y=="number"||typeof Y=="boolean"?(D.__data[0]=Y,i.bufferSubData(i.UNIFORM_BUFFER,V+q,D.__data)):Y.isMatrix3?(D.__data[0]=Y.elements[0],D.__data[1]=Y.elements[1],D.__data[2]=Y.elements[2],D.__data[3]=0,D.__data[4]=Y.elements[3],D.__data[5]=Y.elements[4],D.__data[6]=Y.elements[5],D.__data[7]=0,D.__data[8]=Y.elements[6],D.__data[9]=Y.elements[7],D.__data[10]=Y.elements[8],D.__data[11]=0):(Y.toArray(D.__data,q),q+=z.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,V,D.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function v(b,C,A,I){const P=b.value,U=C+"_"+A;if(I[U]===void 0)return typeof P=="number"||typeof P=="boolean"?I[U]=P:I[U]=P.clone(),!0;{const E=I[U];if(typeof P=="number"||typeof P=="boolean"){if(E!==P)return I[U]=P,!0}else if(E.equals(P)===!1)return E.copy(P),!0}return!1}function x(b){const C=b.uniforms;let A=0;const I=16;for(let U=0,E=C.length;U<E;U++){const w=Array.isArray(C[U])?C[U]:[C[U]];for(let Z=0,D=w.length;Z<D;Z++){const V=w[Z],$=Array.isArray(V.value)?V.value:[V.value];for(let q=0,X=$.length;q<X;q++){const Y=$[q],z=y(Y),ae=A%I,ne=ae%z.boundary,ye=ae+ne;A+=ne,ye!==0&&I-ye<z.storage&&(A+=I-ye),V.__data=new Float32Array(z.storage/Float32Array.BYTES_PER_ELEMENT),V.__offset=A,A+=z.storage}}}const P=A%I;return P>0&&(A+=I-P),b.__size=A,b.__cache={},this}function y(b){const C={boundary:0,storage:0};return typeof b=="number"||typeof b=="boolean"?(C.boundary=4,C.storage=4):b.isVector2?(C.boundary=8,C.storage=8):b.isVector3||b.isColor?(C.boundary=16,C.storage=12):b.isVector4?(C.boundary=16,C.storage=16):b.isMatrix3?(C.boundary=48,C.storage=48):b.isMatrix4?(C.boundary=64,C.storage=64):b.isTexture?qe("WebGLRenderer: Texture samplers can not be part of an uniforms group."):qe("WebGLRenderer: Unsupported uniform value type.",b),C}function _(b){const C=b.target;C.removeEventListener("dispose",_);const A=o.indexOf(C.__bindingPointIndex);o.splice(A,1),i.deleteBuffer(r[C.id]),delete r[C.id],delete s[C.id]}function p(){for(const b in r)i.deleteBuffer(r[b]);o=[],r={},s={}}return{bind:l,update:c,dispose:p}}const wg=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let An=null;function Ag(){return An===null&&(An=new du(wg,16,16,Ki,qn),An.name="DFG_LUT",An.minFilter=Wt,An.magFilter=Wt,An.wrapS=Xn,An.wrapT=Xn,An.generateMipmaps=!1,An.needsUpdate=!0),An}class Rg{constructor(e={}){const{canvas:t=Vh(),context:n=null,depth:r=!0,stencil:s=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:f=!1,outputBufferType:v=un}=e;this.isWebGLRenderer=!0;let x;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");x=n.getContextAttributes().alpha}else x=o;const y=v,_=new Set([Ua,La,Da]),p=new Set([un,Nn,Ar,Rr,Pa,Ia]),b=new Uint32Array(4),C=new Int32Array(4);let A=null,I=null;const P=[],U=[];let E=null;this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Ln,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const w=this;let Z=!1;this._outputColorSpace=Jt;let D=0,V=0,$=null,q=-1,X=null;const Y=new Nt,z=new Nt;let ae=null;const ne=new pt(0);let ye=0,Te=t.width,be=t.height,Ze=1,Rt=null,bt=null;const Q=new Nt(0,0,Te,be),de=new Nt(0,0,Te,be);let pe=!1;const je=new ka;let Be=!1,We=!1;const Dt=new It,He=new H,mt=new Nt,Mt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Je=!1;function wt(){return $===null?Ze:1}let L=n;function Pt(M,N){return t.getContext(M,N)}try{const M={alpha:!0,depth:r,stencil:s,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Aa}`),t.addEventListener("webglcontextlost",Re,!1),t.addEventListener("webglcontextrestored",Xe,!1),t.addEventListener("webglcontextcreationerror",Et,!1),L===null){const N="webgl2";if(L=Pt(N,M),L===null)throw Pt(N)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(M){throw _t("WebGLRenderer: "+M.message),M}let ht,gt,De,R,S,B,J,te,K,Ae,he,Ge,ke,se,oe,Pe,Ie,Ee,Qe,O,ue,le,we;function re(){ht=new Rp(L),ht.init(),ue=new vg(L,ht),gt=new Sp(L,ht,e,ue),De=new gg(L,ht),gt.reversedDepthBuffer&&f&&De.buffers.depth.setReversed(!0),R=new Ip(L),S=new ng,B=new _g(L,ht,De,S,gt,ue,R),J=new Ap(w),te=new Ou(L),le=new vp(L,te),K=new Cp(L,te,R,le),Ae=new Lp(L,K,te,le,R),Ee=new Dp(L,gt,B),oe=new Mp(S),he=new tg(w,J,ht,gt,le,oe),Ge=new Tg(w,S),ke=new rg,se=new hg(ht),Ie=new _p(w,J,De,Ae,x,l),Pe=new mg(w,Ae,gt),we=new bg(L,R,gt,De),Qe=new xp(L,ht,R),O=new Pp(L,ht,R),R.programs=he.programs,w.capabilities=gt,w.extensions=ht,w.properties=S,w.renderLists=ke,w.shadowMap=Pe,w.state=De,w.info=R}re(),y!==un&&(E=new Op(y,t.width,t.height,r,s));const j=new yg(w,L);this.xr=j,this.getContext=function(){return L},this.getContextAttributes=function(){return L.getContextAttributes()},this.forceContextLoss=function(){const M=ht.get("WEBGL_lose_context");M&&M.loseContext()},this.forceContextRestore=function(){const M=ht.get("WEBGL_lose_context");M&&M.restoreContext()},this.getPixelRatio=function(){return Ze},this.setPixelRatio=function(M){M!==void 0&&(Ze=M,this.setSize(Te,be,!1))},this.getSize=function(M){return M.set(Te,be)},this.setSize=function(M,N,W=!0){if(j.isPresenting){qe("WebGLRenderer: Can't change size while VR device is presenting.");return}Te=M,be=N,t.width=Math.floor(M*Ze),t.height=Math.floor(N*Ze),W===!0&&(t.style.width=M+"px",t.style.height=N+"px"),E!==null&&E.setSize(t.width,t.height),this.setViewport(0,0,M,N)},this.getDrawingBufferSize=function(M){return M.set(Te*Ze,be*Ze).floor()},this.setDrawingBufferSize=function(M,N,W){Te=M,be=N,Ze=W,t.width=Math.floor(M*W),t.height=Math.floor(N*W),this.setViewport(0,0,M,N)},this.setEffects=function(M){if(y===un){console.error("THREE.WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(M){for(let N=0;N<M.length;N++)if(M[N].isOutputPass===!0){console.warn("THREE.WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}E.setEffects(M||[])},this.getCurrentViewport=function(M){return M.copy(Y)},this.getViewport=function(M){return M.copy(Q)},this.setViewport=function(M,N,W,F){M.isVector4?Q.set(M.x,M.y,M.z,M.w):Q.set(M,N,W,F),De.viewport(Y.copy(Q).multiplyScalar(Ze).round())},this.getScissor=function(M){return M.copy(de)},this.setScissor=function(M,N,W,F){M.isVector4?de.set(M.x,M.y,M.z,M.w):de.set(M,N,W,F),De.scissor(z.copy(de).multiplyScalar(Ze).round())},this.getScissorTest=function(){return pe},this.setScissorTest=function(M){De.setScissorTest(pe=M)},this.setOpaqueSort=function(M){Rt=M},this.setTransparentSort=function(M){bt=M},this.getClearColor=function(M){return M.copy(Ie.getClearColor())},this.setClearColor=function(){Ie.setClearColor(...arguments)},this.getClearAlpha=function(){return Ie.getClearAlpha()},this.setClearAlpha=function(){Ie.setClearAlpha(...arguments)},this.clear=function(M=!0,N=!0,W=!0){let F=0;if(M){let G=!1;if($!==null){const me=$.texture.format;G=_.has(me)}if(G){const me=$.texture.type,Se=p.has(me),fe=Ie.getClearColor(),ve=Ie.getClearAlpha(),xe=fe.r,Ve=fe.g,ze=fe.b;Se?(b[0]=xe,b[1]=Ve,b[2]=ze,b[3]=ve,L.clearBufferuiv(L.COLOR,0,b)):(C[0]=xe,C[1]=Ve,C[2]=ze,C[3]=ve,L.clearBufferiv(L.COLOR,0,C))}else F|=L.COLOR_BUFFER_BIT}N&&(F|=L.DEPTH_BUFFER_BIT),W&&(F|=L.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),F!==0&&L.clear(F)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",Re,!1),t.removeEventListener("webglcontextrestored",Xe,!1),t.removeEventListener("webglcontextcreationerror",Et,!1),Ie.dispose(),ke.dispose(),se.dispose(),S.dispose(),J.dispose(),Ae.dispose(),le.dispose(),we.dispose(),he.dispose(),j.dispose(),j.removeEventListener("sessionstart",g),j.removeEventListener("sessionend",h),m.stop()};function Re(M){M.preventDefault(),sl("WebGLRenderer: Context Lost."),Z=!0}function Xe(){sl("WebGLRenderer: Context Restored."),Z=!1;const M=R.autoReset,N=Pe.enabled,W=Pe.autoUpdate,F=Pe.needsUpdate,G=Pe.type;re(),R.autoReset=M,Pe.enabled=N,Pe.autoUpdate=W,Pe.needsUpdate=F,Pe.type=G}function Et(M){_t("WebGLRenderer: A WebGL context could not be created. Reason: ",M.statusMessage)}function et(M){const N=M.target;N.removeEventListener("dispose",et),_n(N)}function _n(M){Xt(M),S.remove(M)}function Xt(M){const N=S.get(M).programs;N!==void 0&&(N.forEach(function(W){he.releaseProgram(W)}),M.isShaderMaterial&&he.releaseShaderCache(M))}this.renderBufferDirect=function(M,N,W,F,G,me){N===null&&(N=Mt);const Se=G.isMesh&&G.matrixWorld.determinant()<0,fe=at(M,N,W,F,G);De.setMaterial(F,Se);let ve=W.index,xe=1;if(F.wireframe===!0){if(ve=K.getWireframeAttribute(W),ve===void 0)return;xe=2}const Ve=W.drawRange,ze=W.attributes.position;let Ue=Ve.start*xe,ut=(Ve.start+Ve.count)*xe;me!==null&&(Ue=Math.max(Ue,me.start*xe),ut=Math.min(ut,(me.start+me.count)*xe)),ve!==null?(Ue=Math.max(Ue,0),ut=Math.min(ut,ve.count)):ze!=null&&(Ue=Math.max(Ue,0),ut=Math.min(ut,ze.count));const Ct=ut-Ue;if(Ct<0||Ct===1/0)return;le.setup(G,F,fe,W,ve);let Ot,Tt=Qe;if(ve!==null&&(Ot=te.get(ve),Tt=O,Tt.setIndex(Ot)),G.isMesh)F.wireframe===!0?(De.setLineWidth(F.wireframeLinewidth*wt()),Tt.setMode(L.LINES)):Tt.setMode(L.TRIANGLES);else if(G.isLine){let qt=F.linewidth;qt===void 0&&(qt=1),De.setLineWidth(qt*wt()),G.isLineSegments?Tt.setMode(L.LINES):G.isLineLoop?Tt.setMode(L.LINE_LOOP):Tt.setMode(L.LINE_STRIP)}else G.isPoints?Tt.setMode(L.POINTS):G.isSprite&&Tt.setMode(L.TRIANGLES);if(G.isBatchedMesh)if(G._multiDrawInstances!==null)Ss("WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),Tt.renderMultiDrawInstances(G._multiDrawStarts,G._multiDrawCounts,G._multiDrawCount,G._multiDrawInstances);else if(ht.get("WEBGL_multi_draw"))Tt.renderMultiDraw(G._multiDrawStarts,G._multiDrawCounts,G._multiDrawCount);else{const qt=G._multiDrawStarts,Oe=G._multiDrawCounts,on=G._multiDrawCount,xt=ve?te.get(ve).bytesPerElement:1,vn=S.get(F).currentProgram.getUniforms();for(let bn=0;bn<on;bn++)vn.setValue(L,"_gl_DrawID",bn),Tt.render(qt[bn]/xt,Oe[bn])}else if(G.isInstancedMesh)Tt.renderInstances(Ue,Ct,G.count);else if(W.isInstancedBufferGeometry){const qt=W._maxInstanceCount!==void 0?W._maxInstanceCount:1/0,Oe=Math.min(W.instanceCount,qt);Tt.renderInstances(Ue,Ct,Oe)}else Tt.render(Ue,Ct)};function Ci(M,N,W){M.transparent===!0&&M.side===gn&&M.forceSinglePass===!1?(M.side=sn,M.needsUpdate=!0,it(M,N,W),M.side=ci,M.needsUpdate=!0,it(M,N,W),M.side=gn):it(M,N,W)}this.compile=function(M,N,W=null){W===null&&(W=M),I=se.get(W),I.init(N),U.push(I),W.traverseVisible(function(G){G.isLight&&G.layers.test(N.layers)&&(I.pushLight(G),G.castShadow&&I.pushShadow(G))}),M!==W&&M.traverseVisible(function(G){G.isLight&&G.layers.test(N.layers)&&(I.pushLight(G),G.castShadow&&I.pushShadow(G))}),I.setupLights();const F=new Set;return M.traverse(function(G){if(!(G.isMesh||G.isPoints||G.isLine||G.isSprite))return;const me=G.material;if(me)if(Array.isArray(me))for(let Se=0;Se<me.length;Se++){const fe=me[Se];Ci(fe,W,G),F.add(fe)}else Ci(me,W,G),F.add(me)}),I=U.pop(),F},this.compileAsync=function(M,N,W=null){const F=this.compile(M,N,W);return new Promise(G=>{function me(){if(F.forEach(function(Se){S.get(Se).currentProgram.isReady()&&F.delete(Se)}),F.size===0){G(M);return}setTimeout(me,10)}ht.get("KHR_parallel_shader_compile")!==null?me():setTimeout(me,10)})};let hi=null;function ks(M){hi&&hi(M)}function g(){m.stop()}function h(){m.start()}const m=new $c;m.setAnimationLoop(ks),typeof self<"u"&&m.setContext(self),this.setAnimationLoop=function(M){hi=M,j.setAnimationLoop(M),M===null?m.stop():m.start()},j.addEventListener("sessionstart",g),j.addEventListener("sessionend",h),this.render=function(M,N){if(N!==void 0&&N.isCamera!==!0){_t("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(Z===!0)return;const W=j.enabled===!0&&j.isPresenting===!0,F=E!==null&&($===null||W)&&E.begin(w,$);if(M.matrixWorldAutoUpdate===!0&&M.updateMatrixWorld(),N.parent===null&&N.matrixWorldAutoUpdate===!0&&N.updateMatrixWorld(),j.enabled===!0&&j.isPresenting===!0&&(E===null||E.isCompositing()===!1)&&(j.cameraAutoUpdate===!0&&j.updateCamera(N),N=j.getCamera()),M.isScene===!0&&M.onBeforeRender(w,M,N,$),I=se.get(M,U.length),I.init(N),U.push(I),Dt.multiplyMatrices(N.projectionMatrix,N.matrixWorldInverse),je.setFromProjectionMatrix(Dt,Dn,N.reversedDepth),We=this.localClippingEnabled,Be=oe.init(this.clippingPlanes,We),A=ke.get(M,P.length),A.init(),P.push(A),j.enabled===!0&&j.isPresenting===!0){const Se=w.xr.getDepthSensingMesh();Se!==null&&T(Se,N,-1/0,w.sortObjects)}T(M,N,0,w.sortObjects),A.finish(),w.sortObjects===!0&&A.sort(Rt,bt),Je=j.enabled===!1||j.isPresenting===!1||j.hasDepthSensing()===!1,Je&&Ie.addToRenderList(A,M),this.info.render.frame++,Be===!0&&oe.beginShadows();const G=I.state.shadowsArray;if(Pe.render(G,M,N),Be===!0&&oe.endShadows(),this.info.autoReset===!0&&this.info.reset(),(F&&E.hasRenderPass())===!1){const Se=A.opaque,fe=A.transmissive;if(I.setupLights(),N.isArrayCamera){const ve=N.cameras;if(fe.length>0)for(let xe=0,Ve=ve.length;xe<Ve;xe++){const ze=ve[xe];ee(Se,fe,M,ze)}Je&&Ie.render(M);for(let xe=0,Ve=ve.length;xe<Ve;xe++){const ze=ve[xe];k(A,M,ze,ze.viewport)}}else fe.length>0&&ee(Se,fe,M,N),Je&&Ie.render(M),k(A,M,N)}$!==null&&V===0&&(B.updateMultisampleRenderTarget($),B.updateRenderTargetMipmap($)),F&&E.end(w),M.isScene===!0&&M.onAfterRender(w,M,N),le.resetDefaultState(),q=-1,X=null,U.pop(),U.length>0?(I=U[U.length-1],Be===!0&&oe.setGlobalState(w.clippingPlanes,I.state.camera)):I=null,P.pop(),P.length>0?A=P[P.length-1]:A=null};function T(M,N,W,F){if(M.visible===!1)return;if(M.layers.test(N.layers)){if(M.isGroup)W=M.renderOrder;else if(M.isLOD)M.autoUpdate===!0&&M.update(N);else if(M.isLight)I.pushLight(M),M.castShadow&&I.pushShadow(M);else if(M.isSprite){if(!M.frustumCulled||je.intersectsSprite(M)){F&&mt.setFromMatrixPosition(M.matrixWorld).applyMatrix4(Dt);const Se=Ae.update(M),fe=M.material;fe.visible&&A.push(M,Se,fe,W,mt.z,null)}}else if((M.isMesh||M.isLine||M.isPoints)&&(!M.frustumCulled||je.intersectsObject(M))){const Se=Ae.update(M),fe=M.material;if(F&&(M.boundingSphere!==void 0?(M.boundingSphere===null&&M.computeBoundingSphere(),mt.copy(M.boundingSphere.center)):(Se.boundingSphere===null&&Se.computeBoundingSphere(),mt.copy(Se.boundingSphere.center)),mt.applyMatrix4(M.matrixWorld).applyMatrix4(Dt)),Array.isArray(fe)){const ve=Se.groups;for(let xe=0,Ve=ve.length;xe<Ve;xe++){const ze=ve[xe],Ue=fe[ze.materialIndex];Ue&&Ue.visible&&A.push(M,Se,Ue,W,mt.z,ze)}}else fe.visible&&A.push(M,Se,fe,W,mt.z,null)}}const me=M.children;for(let Se=0,fe=me.length;Se<fe;Se++)T(me[Se],N,W,F)}function k(M,N,W,F){const{opaque:G,transmissive:me,transparent:Se}=M;I.setupLightsView(W),Be===!0&&oe.setGlobalState(w.clippingPlanes,W),F&&De.viewport(Y.copy(F)),G.length>0&&Le(G,N,W),me.length>0&&Le(me,N,W),Se.length>0&&Le(Se,N,W),De.buffers.depth.setTest(!0),De.buffers.depth.setMask(!0),De.buffers.color.setMask(!0),De.setPolygonOffset(!1)}function ee(M,N,W,F){if((W.isScene===!0?W.overrideMaterial:null)!==null)return;if(I.state.transmissionRenderTarget[F.id]===void 0){const Ue=ht.has("EXT_color_buffer_half_float")||ht.has("EXT_color_buffer_float");I.state.transmissionRenderTarget[F.id]=new Un(1,1,{generateMipmaps:!0,type:Ue?qn:un,minFilter:Ti,samples:Math.max(4,gt.samples),stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:vt.workingColorSpace})}const me=I.state.transmissionRenderTarget[F.id],Se=F.viewport||Y;me.setSize(Se.z*w.transmissionResolutionScale,Se.w*w.transmissionResolutionScale);const fe=w.getRenderTarget(),ve=w.getActiveCubeFace(),xe=w.getActiveMipmapLevel();w.setRenderTarget(me),w.getClearColor(ne),ye=w.getClearAlpha(),ye<1&&w.setClearColor(16777215,.5),w.clear(),Je&&Ie.render(W);const Ve=w.toneMapping;w.toneMapping=Ln;const ze=F.viewport;if(F.viewport!==void 0&&(F.viewport=void 0),I.setupLightsView(F),Be===!0&&oe.setGlobalState(w.clippingPlanes,F),Le(M,W,F),B.updateMultisampleRenderTarget(me),B.updateRenderTargetMipmap(me),ht.has("WEBGL_multisampled_render_to_texture")===!1){let Ue=!1;for(let ut=0,Ct=N.length;ut<Ct;ut++){const Ot=N[ut],{object:Tt,geometry:qt,material:Oe,group:on}=Ot;if(Oe.side===gn&&Tt.layers.test(F.layers)){const xt=Oe.side;Oe.side=sn,Oe.needsUpdate=!0,Ce(Tt,W,F,qt,Oe,on),Oe.side=xt,Oe.needsUpdate=!0,Ue=!0}}Ue===!0&&(B.updateMultisampleRenderTarget(me),B.updateRenderTargetMipmap(me))}w.setRenderTarget(fe,ve,xe),w.setClearColor(ne,ye),ze!==void 0&&(F.viewport=ze),w.toneMapping=Ve}function Le(M,N,W){const F=N.isScene===!0?N.overrideMaterial:null;for(let G=0,me=M.length;G<me;G++){const Se=M[G],{object:fe,geometry:ve,group:xe}=Se;let Ve=Se.material;Ve.allowOverride===!0&&F!==null&&(Ve=F),fe.layers.test(W.layers)&&Ce(fe,N,W,ve,Ve,xe)}}function Ce(M,N,W,F,G,me){M.onBeforeRender(w,N,W,F,G,me),M.modelViewMatrix.multiplyMatrices(W.matrixWorldInverse,M.matrixWorld),M.normalMatrix.getNormalMatrix(M.modelViewMatrix),G.onBeforeRender(w,N,W,F,M,me),G.transparent===!0&&G.side===gn&&G.forceSinglePass===!1?(G.side=sn,G.needsUpdate=!0,w.renderBufferDirect(W,N,F,G,M,me),G.side=ci,G.needsUpdate=!0,w.renderBufferDirect(W,N,F,G,M,me),G.side=gn):w.renderBufferDirect(W,N,F,G,M,me),M.onAfterRender(w,N,W,F,G,me)}function it(M,N,W){N.isScene!==!0&&(N=Mt);const F=S.get(M),G=I.state.lights,me=I.state.shadowsArray,Se=G.state.version,fe=he.getParameters(M,G.state,me,N,W),ve=he.getProgramCacheKey(fe);let xe=F.programs;F.environment=M.isMeshStandardMaterial||M.isMeshLambertMaterial||M.isMeshPhongMaterial?N.environment:null,F.fog=N.fog;const Ve=M.isMeshStandardMaterial||M.isMeshLambertMaterial&&!M.envMap||M.isMeshPhongMaterial&&!M.envMap;F.envMap=J.get(M.envMap||F.environment,Ve),F.envMapRotation=F.environment!==null&&M.envMap===null?N.environmentRotation:M.envMapRotation,xe===void 0&&(M.addEventListener("dispose",et),xe=new Map,F.programs=xe);let ze=xe.get(ve);if(ze!==void 0){if(F.currentProgram===ze&&F.lightsStateVersion===Se)return Ne(M,fe),ze}else fe.uniforms=he.getUniforms(M),M.onBeforeCompile(fe,w),ze=he.acquireProgram(fe,ve),xe.set(ve,ze),F.uniforms=fe.uniforms;const Ue=F.uniforms;return(!M.isShaderMaterial&&!M.isRawShaderMaterial||M.clipping===!0)&&(Ue.clippingPlanes=oe.uniform),Ne(M,fe),F.needsLights=st(M),F.lightsStateVersion=Se,F.needsLights&&(Ue.ambientLightColor.value=G.state.ambient,Ue.lightProbe.value=G.state.probe,Ue.directionalLights.value=G.state.directional,Ue.directionalLightShadows.value=G.state.directionalShadow,Ue.spotLights.value=G.state.spot,Ue.spotLightShadows.value=G.state.spotShadow,Ue.rectAreaLights.value=G.state.rectArea,Ue.ltc_1.value=G.state.rectAreaLTC1,Ue.ltc_2.value=G.state.rectAreaLTC2,Ue.pointLights.value=G.state.point,Ue.pointLightShadows.value=G.state.pointShadow,Ue.hemisphereLights.value=G.state.hemi,Ue.directionalShadowMatrix.value=G.state.directionalShadowMatrix,Ue.spotLightMatrix.value=G.state.spotLightMatrix,Ue.spotLightMap.value=G.state.spotLightMap,Ue.pointShadowMatrix.value=G.state.pointShadowMatrix),F.currentProgram=ze,F.uniformsList=null,ze}function rt(M){if(M.uniformsList===null){const N=M.currentProgram.getUniforms();M.uniformsList=ps.seqWithValue(N.seq,M.uniforms)}return M.uniformsList}function Ne(M,N){const W=S.get(M);W.outputColorSpace=N.outputColorSpace,W.batching=N.batching,W.batchingColor=N.batchingColor,W.instancing=N.instancing,W.instancingColor=N.instancingColor,W.instancingMorph=N.instancingMorph,W.skinning=N.skinning,W.morphTargets=N.morphTargets,W.morphNormals=N.morphNormals,W.morphColors=N.morphColors,W.morphTargetsCount=N.morphTargetsCount,W.numClippingPlanes=N.numClippingPlanes,W.numIntersection=N.numClipIntersection,W.vertexAlphas=N.vertexAlphas,W.vertexTangents=N.vertexTangents,W.toneMapping=N.toneMapping}function at(M,N,W,F,G){N.isScene!==!0&&(N=Mt),B.resetTextureUnits();const me=N.fog,Se=F.isMeshStandardMaterial||F.isMeshLambertMaterial||F.isMeshPhongMaterial?N.environment:null,fe=$===null?w.outputColorSpace:$.isXRRenderTarget===!0?$.texture.colorSpace:Ji,ve=F.isMeshStandardMaterial||F.isMeshLambertMaterial&&!F.envMap||F.isMeshPhongMaterial&&!F.envMap,xe=J.get(F.envMap||Se,ve),Ve=F.vertexColors===!0&&!!W.attributes.color&&W.attributes.color.itemSize===4,ze=!!W.attributes.tangent&&(!!F.normalMap||F.anisotropy>0),Ue=!!W.morphAttributes.position,ut=!!W.morphAttributes.normal,Ct=!!W.morphAttributes.color;let Ot=Ln;F.toneMapped&&($===null||$.isXRRenderTarget===!0)&&(Ot=w.toneMapping);const Tt=W.morphAttributes.position||W.morphAttributes.normal||W.morphAttributes.color,qt=Tt!==void 0?Tt.length:0,Oe=S.get(F),on=I.state.lights;if(Be===!0&&(We===!0||M!==X)){const zt=M===X&&F.id===q;oe.setState(F,M,zt)}let xt=!1;F.version===Oe.__version?(Oe.needsLights&&Oe.lightsStateVersion!==on.state.version||Oe.outputColorSpace!==fe||G.isBatchedMesh&&Oe.batching===!1||!G.isBatchedMesh&&Oe.batching===!0||G.isBatchedMesh&&Oe.batchingColor===!0&&G.colorTexture===null||G.isBatchedMesh&&Oe.batchingColor===!1&&G.colorTexture!==null||G.isInstancedMesh&&Oe.instancing===!1||!G.isInstancedMesh&&Oe.instancing===!0||G.isSkinnedMesh&&Oe.skinning===!1||!G.isSkinnedMesh&&Oe.skinning===!0||G.isInstancedMesh&&Oe.instancingColor===!0&&G.instanceColor===null||G.isInstancedMesh&&Oe.instancingColor===!1&&G.instanceColor!==null||G.isInstancedMesh&&Oe.instancingMorph===!0&&G.morphTexture===null||G.isInstancedMesh&&Oe.instancingMorph===!1&&G.morphTexture!==null||Oe.envMap!==xe||F.fog===!0&&Oe.fog!==me||Oe.numClippingPlanes!==void 0&&(Oe.numClippingPlanes!==oe.numPlanes||Oe.numIntersection!==oe.numIntersection)||Oe.vertexAlphas!==Ve||Oe.vertexTangents!==ze||Oe.morphTargets!==Ue||Oe.morphNormals!==ut||Oe.morphColors!==Ct||Oe.toneMapping!==Ot||Oe.morphTargetsCount!==qt)&&(xt=!0):(xt=!0,Oe.__version=F.version);let vn=Oe.currentProgram;xt===!0&&(vn=it(F,N,G));let bn=!1,ui=!1,Pi=!1;const At=vn.getUniforms(),$t=Oe.uniforms;if(De.useProgram(vn.program)&&(bn=!0,ui=!0,Pi=!0),F.id!==q&&(q=F.id,ui=!0),bn||X!==M){De.buffers.depth.getReversed()&&M.reversedDepth!==!0&&(M._reversedDepth=!0,M.updateProjectionMatrix()),At.setValue(L,"projectionMatrix",M.projectionMatrix),At.setValue(L,"viewMatrix",M.matrixWorldInverse);const Kn=At.map.cameraPosition;Kn!==void 0&&Kn.setValue(L,He.setFromMatrixPosition(M.matrixWorld)),gt.logarithmicDepthBuffer&&At.setValue(L,"logDepthBufFC",2/(Math.log(M.far+1)/Math.LN2)),(F.isMeshPhongMaterial||F.isMeshToonMaterial||F.isMeshLambertMaterial||F.isMeshBasicMaterial||F.isMeshStandardMaterial||F.isShaderMaterial)&&At.setValue(L,"isOrthographic",M.isOrthographicCamera===!0),X!==M&&(X=M,ui=!0,Pi=!0)}if(Oe.needsLights&&(on.state.directionalShadowMap.length>0&&At.setValue(L,"directionalShadowMap",on.state.directionalShadowMap,B),on.state.spotShadowMap.length>0&&At.setValue(L,"spotShadowMap",on.state.spotShadowMap,B),on.state.pointShadowMap.length>0&&At.setValue(L,"pointShadowMap",on.state.pointShadowMap,B)),G.isSkinnedMesh){At.setOptional(L,G,"bindMatrix"),At.setOptional(L,G,"bindMatrixInverse");const zt=G.skeleton;zt&&(zt.boneTexture===null&&zt.computeBoneTexture(),At.setValue(L,"boneTexture",zt.boneTexture,B))}G.isBatchedMesh&&(At.setOptional(L,G,"batchingTexture"),At.setValue(L,"batchingTexture",G._matricesTexture,B),At.setOptional(L,G,"batchingIdTexture"),At.setValue(L,"batchingIdTexture",G._indirectTexture,B),At.setOptional(L,G,"batchingColorTexture"),G._colorsTexture!==null&&At.setValue(L,"batchingColorTexture",G._colorsTexture,B));const Zn=W.morphAttributes;if((Zn.position!==void 0||Zn.normal!==void 0||Zn.color!==void 0)&&Ee.update(G,W,vn),(ui||Oe.receiveShadow!==G.receiveShadow)&&(Oe.receiveShadow=G.receiveShadow,At.setValue(L,"receiveShadow",G.receiveShadow)),(F.isMeshStandardMaterial||F.isMeshLambertMaterial||F.isMeshPhongMaterial)&&F.envMap===null&&N.environment!==null&&($t.envMapIntensity.value=N.environmentIntensity),$t.dfgLUT!==void 0&&($t.dfgLUT.value=Ag()),ui&&(At.setValue(L,"toneMappingExposure",w.toneMappingExposure),Oe.needsLights&&Fe($t,Pi),me&&F.fog===!0&&Ge.refreshFogUniforms($t,me),Ge.refreshMaterialUniforms($t,F,Ze,be,I.state.transmissionRenderTarget[M.id]),ps.upload(L,rt(Oe),$t,B)),F.isShaderMaterial&&F.uniformsNeedUpdate===!0&&(ps.upload(L,rt(Oe),$t,B),F.uniformsNeedUpdate=!1),F.isSpriteMaterial&&At.setValue(L,"center",G.center),At.setValue(L,"modelViewMatrix",G.modelViewMatrix),At.setValue(L,"normalMatrix",G.normalMatrix),At.setValue(L,"modelMatrix",G.matrixWorld),F.isShaderMaterial||F.isRawShaderMaterial){const zt=F.uniformsGroups;for(let Kn=0,Ii=zt.length;Kn<Ii;Kn++){const Ka=zt[Kn];we.update(Ka,vn),we.bind(Ka,vn)}}return vn}function Fe(M,N){M.ambientLightColor.needsUpdate=N,M.lightProbe.needsUpdate=N,M.directionalLights.needsUpdate=N,M.directionalLightShadows.needsUpdate=N,M.pointLights.needsUpdate=N,M.pointLightShadows.needsUpdate=N,M.spotLights.needsUpdate=N,M.spotLightShadows.needsUpdate=N,M.rectAreaLights.needsUpdate=N,M.hemisphereLights.needsUpdate=N}function st(M){return M.isMeshLambertMaterial||M.isMeshToonMaterial||M.isMeshPhongMaterial||M.isMeshStandardMaterial||M.isShadowMaterial||M.isShaderMaterial&&M.lights===!0}this.getActiveCubeFace=function(){return D},this.getActiveMipmapLevel=function(){return V},this.getRenderTarget=function(){return $},this.setRenderTargetTextures=function(M,N,W){const F=S.get(M);F.__autoAllocateDepthBuffer=M.resolveDepthBuffer===!1,F.__autoAllocateDepthBuffer===!1&&(F.__useRenderToTexture=!1),S.get(M.texture).__webglTexture=N,S.get(M.depthTexture).__webglTexture=F.__autoAllocateDepthBuffer?void 0:W,F.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(M,N){const W=S.get(M);W.__webglFramebuffer=N,W.__useDefaultFramebuffer=N===void 0};const $e=L.createFramebuffer();this.setRenderTarget=function(M,N=0,W=0){$=M,D=N,V=W;let F=null,G=!1,me=!1;if(M){const fe=S.get(M);if(fe.__useDefaultFramebuffer!==void 0){De.bindFramebuffer(L.FRAMEBUFFER,fe.__webglFramebuffer),Y.copy(M.viewport),z.copy(M.scissor),ae=M.scissorTest,De.viewport(Y),De.scissor(z),De.setScissorTest(ae),q=-1;return}else if(fe.__webglFramebuffer===void 0)B.setupRenderTarget(M);else if(fe.__hasExternalTextures)B.rebindTextures(M,S.get(M.texture).__webglTexture,S.get(M.depthTexture).__webglTexture);else if(M.depthBuffer){const Ve=M.depthTexture;if(fe.__boundDepthTexture!==Ve){if(Ve!==null&&S.has(Ve)&&(M.width!==Ve.image.width||M.height!==Ve.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");B.setupDepthRenderbuffer(M)}}const ve=M.texture;(ve.isData3DTexture||ve.isDataArrayTexture||ve.isCompressedArrayTexture)&&(me=!0);const xe=S.get(M).__webglFramebuffer;M.isWebGLCubeRenderTarget?(Array.isArray(xe[N])?F=xe[N][W]:F=xe[N],G=!0):M.samples>0&&B.useMultisampledRTT(M)===!1?F=S.get(M).__webglMultisampledFramebuffer:Array.isArray(xe)?F=xe[W]:F=xe,Y.copy(M.viewport),z.copy(M.scissor),ae=M.scissorTest}else Y.copy(Q).multiplyScalar(Ze).floor(),z.copy(de).multiplyScalar(Ze).floor(),ae=pe;if(W!==0&&(F=$e),De.bindFramebuffer(L.FRAMEBUFFER,F)&&De.drawBuffers(M,F),De.viewport(Y),De.scissor(z),De.setScissorTest(ae),G){const fe=S.get(M.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_CUBE_MAP_POSITIVE_X+N,fe.__webglTexture,W)}else if(me){const fe=N;for(let ve=0;ve<M.textures.length;ve++){const xe=S.get(M.textures[ve]);L.framebufferTextureLayer(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0+ve,xe.__webglTexture,W,fe)}}else if(M!==null&&W!==0){const fe=S.get(M.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,fe.__webglTexture,W)}q=-1},this.readRenderTargetPixels=function(M,N,W,F,G,me,Se,fe=0){if(!(M&&M.isWebGLRenderTarget)){_t("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let ve=S.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&Se!==void 0&&(ve=ve[Se]),ve){De.bindFramebuffer(L.FRAMEBUFFER,ve);try{const xe=M.textures[fe],Ve=xe.format,ze=xe.type;if(M.textures.length>1&&L.readBuffer(L.COLOR_ATTACHMENT0+fe),!gt.textureFormatReadable(Ve)){_t("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!gt.textureTypeReadable(ze)){_t("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}N>=0&&N<=M.width-F&&W>=0&&W<=M.height-G&&L.readPixels(N,W,F,G,ue.convert(Ve),ue.convert(ze),me)}finally{const xe=$!==null?S.get($).__webglFramebuffer:null;De.bindFramebuffer(L.FRAMEBUFFER,xe)}}},this.readRenderTargetPixelsAsync=async function(M,N,W,F,G,me,Se,fe=0){if(!(M&&M.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let ve=S.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&Se!==void 0&&(ve=ve[Se]),ve)if(N>=0&&N<=M.width-F&&W>=0&&W<=M.height-G){De.bindFramebuffer(L.FRAMEBUFFER,ve);const xe=M.textures[fe],Ve=xe.format,ze=xe.type;if(M.textures.length>1&&L.readBuffer(L.COLOR_ATTACHMENT0+fe),!gt.textureFormatReadable(Ve))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!gt.textureTypeReadable(ze))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Ue=L.createBuffer();L.bindBuffer(L.PIXEL_PACK_BUFFER,Ue),L.bufferData(L.PIXEL_PACK_BUFFER,me.byteLength,L.STREAM_READ),L.readPixels(N,W,F,G,ue.convert(Ve),ue.convert(ze),0);const ut=$!==null?S.get($).__webglFramebuffer:null;De.bindFramebuffer(L.FRAMEBUFFER,ut);const Ct=L.fenceSync(L.SYNC_GPU_COMMANDS_COMPLETE,0);return L.flush(),await Xh(L,Ct,4),L.bindBuffer(L.PIXEL_PACK_BUFFER,Ue),L.getBufferSubData(L.PIXEL_PACK_BUFFER,0,me),L.deleteBuffer(Ue),L.deleteSync(Ct),me}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(M,N=null,W=0){const F=Math.pow(2,-W),G=Math.floor(M.image.width*F),me=Math.floor(M.image.height*F),Se=N!==null?N.x:0,fe=N!==null?N.y:0;B.setTexture2D(M,0),L.copyTexSubImage2D(L.TEXTURE_2D,W,0,0,Se,fe,G,me),De.unbindTexture()};const Ke=L.createFramebuffer(),ce=L.createFramebuffer();this.copyTextureToTexture=function(M,N,W=null,F=null,G=0,me=0){let Se,fe,ve,xe,Ve,ze,Ue,ut,Ct;const Ot=M.isCompressedTexture?M.mipmaps[me]:M.image;if(W!==null)Se=W.max.x-W.min.x,fe=W.max.y-W.min.y,ve=W.isBox3?W.max.z-W.min.z:1,xe=W.min.x,Ve=W.min.y,ze=W.isBox3?W.min.z:0;else{const $t=Math.pow(2,-G);Se=Math.floor(Ot.width*$t),fe=Math.floor(Ot.height*$t),M.isDataArrayTexture?ve=Ot.depth:M.isData3DTexture?ve=Math.floor(Ot.depth*$t):ve=1,xe=0,Ve=0,ze=0}F!==null?(Ue=F.x,ut=F.y,Ct=F.z):(Ue=0,ut=0,Ct=0);const Tt=ue.convert(N.format),qt=ue.convert(N.type);let Oe;N.isData3DTexture?(B.setTexture3D(N,0),Oe=L.TEXTURE_3D):N.isDataArrayTexture||N.isCompressedArrayTexture?(B.setTexture2DArray(N,0),Oe=L.TEXTURE_2D_ARRAY):(B.setTexture2D(N,0),Oe=L.TEXTURE_2D),L.pixelStorei(L.UNPACK_FLIP_Y_WEBGL,N.flipY),L.pixelStorei(L.UNPACK_PREMULTIPLY_ALPHA_WEBGL,N.premultiplyAlpha),L.pixelStorei(L.UNPACK_ALIGNMENT,N.unpackAlignment);const on=L.getParameter(L.UNPACK_ROW_LENGTH),xt=L.getParameter(L.UNPACK_IMAGE_HEIGHT),vn=L.getParameter(L.UNPACK_SKIP_PIXELS),bn=L.getParameter(L.UNPACK_SKIP_ROWS),ui=L.getParameter(L.UNPACK_SKIP_IMAGES);L.pixelStorei(L.UNPACK_ROW_LENGTH,Ot.width),L.pixelStorei(L.UNPACK_IMAGE_HEIGHT,Ot.height),L.pixelStorei(L.UNPACK_SKIP_PIXELS,xe),L.pixelStorei(L.UNPACK_SKIP_ROWS,Ve),L.pixelStorei(L.UNPACK_SKIP_IMAGES,ze);const Pi=M.isDataArrayTexture||M.isData3DTexture,At=N.isDataArrayTexture||N.isData3DTexture;if(M.isDepthTexture){const $t=S.get(M),Zn=S.get(N),zt=S.get($t.__renderTarget),Kn=S.get(Zn.__renderTarget);De.bindFramebuffer(L.READ_FRAMEBUFFER,zt.__webglFramebuffer),De.bindFramebuffer(L.DRAW_FRAMEBUFFER,Kn.__webglFramebuffer);for(let Ii=0;Ii<ve;Ii++)Pi&&(L.framebufferTextureLayer(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,S.get(M).__webglTexture,G,ze+Ii),L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,S.get(N).__webglTexture,me,Ct+Ii)),L.blitFramebuffer(xe,Ve,Se,fe,Ue,ut,Se,fe,L.DEPTH_BUFFER_BIT,L.NEAREST);De.bindFramebuffer(L.READ_FRAMEBUFFER,null),De.bindFramebuffer(L.DRAW_FRAMEBUFFER,null)}else if(G!==0||M.isRenderTargetTexture||S.has(M)){const $t=S.get(M),Zn=S.get(N);De.bindFramebuffer(L.READ_FRAMEBUFFER,Ke),De.bindFramebuffer(L.DRAW_FRAMEBUFFER,ce);for(let zt=0;zt<ve;zt++)Pi?L.framebufferTextureLayer(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,$t.__webglTexture,G,ze+zt):L.framebufferTexture2D(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,$t.__webglTexture,G),At?L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,Zn.__webglTexture,me,Ct+zt):L.framebufferTexture2D(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,Zn.__webglTexture,me),G!==0?L.blitFramebuffer(xe,Ve,Se,fe,Ue,ut,Se,fe,L.COLOR_BUFFER_BIT,L.NEAREST):At?L.copyTexSubImage3D(Oe,me,Ue,ut,Ct+zt,xe,Ve,Se,fe):L.copyTexSubImage2D(Oe,me,Ue,ut,xe,Ve,Se,fe);De.bindFramebuffer(L.READ_FRAMEBUFFER,null),De.bindFramebuffer(L.DRAW_FRAMEBUFFER,null)}else At?M.isDataTexture||M.isData3DTexture?L.texSubImage3D(Oe,me,Ue,ut,Ct,Se,fe,ve,Tt,qt,Ot.data):N.isCompressedArrayTexture?L.compressedTexSubImage3D(Oe,me,Ue,ut,Ct,Se,fe,ve,Tt,Ot.data):L.texSubImage3D(Oe,me,Ue,ut,Ct,Se,fe,ve,Tt,qt,Ot):M.isDataTexture?L.texSubImage2D(L.TEXTURE_2D,me,Ue,ut,Se,fe,Tt,qt,Ot.data):M.isCompressedTexture?L.compressedTexSubImage2D(L.TEXTURE_2D,me,Ue,ut,Ot.width,Ot.height,Tt,Ot.data):L.texSubImage2D(L.TEXTURE_2D,me,Ue,ut,Se,fe,Tt,qt,Ot);L.pixelStorei(L.UNPACK_ROW_LENGTH,on),L.pixelStorei(L.UNPACK_IMAGE_HEIGHT,xt),L.pixelStorei(L.UNPACK_SKIP_PIXELS,vn),L.pixelStorei(L.UNPACK_SKIP_ROWS,bn),L.pixelStorei(L.UNPACK_SKIP_IMAGES,ui),me===0&&N.generateMipmaps&&L.generateMipmap(Oe),De.unbindTexture()},this.initRenderTarget=function(M){S.get(M).__webglFramebuffer===void 0&&B.setupRenderTarget(M)},this.initTexture=function(M){M.isCubeTexture?B.setTextureCube(M,0):M.isData3DTexture?B.setTexture3D(M,0):M.isDataArrayTexture||M.isCompressedArrayTexture?B.setTexture2DArray(M,0):B.setTexture2D(M,0),De.unbindTexture()},this.resetState=function(){D=0,V=0,$=null,De.reset(),le.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Dn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=vt._getDrawingBufferColorSpace(e),t.unpackColorSpace=vt._getUnpackColorSpace()}}class Cg{constructor(){this.container=document.getElementById("three-game")||document.body,this.scene=new au,this.scene.background=new pt(12184319);const{width:e,height:t}=this.getViewportSize(),n=e/t;this.camera=new mn(38,n,.5,1e3),this.cameraOffset=new H(14,13,24),this.cameraLookOffset=new H(0,.8,0),this.camera.position.copy(this.cameraOffset),this.camera.lookAt(0,0,0),this.renderer=new Rg({antialias:window.devicePixelRatio<2,alpha:!1,powerPreference:"default"}),this.renderer.setSize(e,t),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,1.5)),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=br,this.renderer.outputColorSpace=Jt,this.renderer.toneMapping=Ra,this.renderer.toneMappingExposure=1.08,this.container.appendChild(this.renderer.domElement),this.renderer.domElement.id="three-canvas";const r=new wu(15334399,12044425,1);this.scene.add(r);const s=new Pu(16777215,.42);this.scene.add(s);const o=new Cu(16774096,1.35);o.position.set(12,26,10),o.castShadow=!0,o.shadow.mapSize.set(1024,1024),o.shadow.camera.left=-34,o.shadow.camera.right=34,o.shadow.camera.top=34,o.shadow.camera.bottom=-34,o.shadow.camera.near=1,o.shadow.camera.far=80,o.shadow.bias=-25e-5,o.shadow.radius=3,this.scene.add(o),this.worldGroup=new fn,this.scene.add(this.worldGroup),this.entityGroup=new fn,this.scene.add(this.entityGroup),this.cameraZoom=1,this.raycaster=new Lu,this.pathLine=null,window.addEventListener("resize",()=>this.onWindowResize())}drawRoundRect(e,t,n,r,s,o){e.beginPath(),e.moveTo(t+o,n),e.arcTo(t+r,n,t+r,n+s,o),e.arcTo(t+r,n+s,t,n+s,o),e.arcTo(t,n+s,t,n,o),e.arcTo(t,n,t+r,n,o),e.closePath()}getViewportSize(){const e=this.container.getBoundingClientRect();return{width:Math.max(320,e.width||window.innerWidth),height:Math.max(240,e.height||window.innerHeight)}}getIntersectedTile(e){this.raycaster.setFromCamera(e,this.camera);const t=this.raycaster.intersectObjects(this.worldGroup.children);return t.length>0?t[0].object.userData.tile:null}renderPathLine(e,t){if(this.pathLine&&(this.scene.remove(this.pathLine),this.pathLine.geometry.dispose(),this.pathLine.material.dispose(),this.pathLine=null),!e||e.length<2)return;const n=[];for(const o of e){const a=t.getElevation(o.x,o.y)+1.1;n.push(new H(o.x,a,o.y))}const r=new tn().setFromPoints(n),s=new zc({color:65484,transparent:!0,opacity:.8,depthTest:!1});this.pathLine=new _u(r,s),this.scene.add(this.pathLine)}onWindowResize(){const{width:e,height:t}=this.getViewportSize();this.camera.aspect=e/t,this.camera.updateProjectionMatrix(),this.renderer.setSize(e,t)}handleZoom(e){const t=e>0?-.1:.1;this.cameraZoom=Math.max(.5,Math.min(3,this.cameraZoom+t)),this.camera.zoom=this.cameraZoom,this.camera.updateProjectionMatrix()}updateCamera(e){const t=e.clone().add(this.cameraLookOffset);this.camera.position.copy(e).add(this.cameraOffset),this.camera.lookAt(t)}render(){this.renderer.render(this.scene,this.camera)}addToWorld(e){this.worldGroup.add(e)}addToEntities(e){this.entityGroup.add(e)}removeFromWorld(e){this.worldGroup.remove(e)}removeFromEntities(e){this.entityGroup.remove(e)}}const ie={VOID:0,GEO:1,HYDRO:2,ANEMO:3,CRYO:4,PYRO:5,STRUCTURE:6},Jl={[ie.VOID]:{id:"void",label:"Void",walkable:!1,habitats:[],topColor:8226710,sideColor:6121075,roughness:.95,pattern:"blocked"},[ie.GEO]:{id:"geo",label:"Grassland",walkable:!0,habitats:["meadow","forest-edge"],topColor:9427560,sideColor:6466136,roughness:.76,moveCost:1,pattern:"grass"},[ie.HYDRO]:{id:"hydro",label:"Water",walkable:!1,habitats:["shore"],topColor:5227511,sideColor:1935039,roughness:.35,moveCost:1/0,pattern:"water"},[ie.ANEMO]:{id:"anemo",label:"Sand",walkable:!0,habitats:["shore"],topColor:16767352,sideColor:14919757,roughness:.78,moveCost:1.08,pattern:"sand"},[ie.CRYO]:{id:"cryo",label:"Snowfield",walkable:!0,habitats:["snow"],topColor:15989759,sideColor:12048874,roughness:.32,moveCost:1.18,pattern:"ice"},[ie.PYRO]:{id:"pyro",label:"Lava",walkable:!1,habitats:[],topColor:16742950,sideColor:12073496,roughness:.55,moveCost:1/0,pattern:"lava"},[ie.STRUCTURE]:{id:"structure",label:"Building Wall",walkable:!1,habitats:[],topColor:16758223,sideColor:13135245,roughness:.7,moveCost:1/0,pattern:"building"}},Pg={[`${ie.HYDRO}:4`]:{label:"Brackish Water",topColor:7840359,sideColor:4878661,pattern:"marsh"},[`${ie.GEO}:1`]:{label:"Forest Floor",topColor:6800239,sideColor:4167251,moveCost:1.2,pattern:"forest"},[`${ie.GEO}:2`]:{label:"Village Road",topColor:16308618,sideColor:13869911,moveCost:.9,pattern:"road"},[`${ie.GEO}:3`]:{label:"Hill Ledge",topColor:10999929,sideColor:5213251,moveCost:1.28,pattern:"hill"},[`${ie.GEO}:4`]:{label:"Mountain Ledge",topColor:11451532,sideColor:6911068,moveCost:1.45,pattern:"stone"},[`${ie.CRYO}:1`]:{label:"Ice Lake",topColor:12120319,sideColor:7716311,moveCost:1.24,pattern:"ice"},[`${ie.STRUCTURE}:0`]:{label:"Stone Wall",topColor:11911372,sideColor:8293273,pattern:"blocked"},[`${ie.STRUCTURE}:1`]:{label:"Town Wall",topColor:16761710,sideColor:14190908,pattern:"brick"},[`${ie.STRUCTURE}:2`]:{label:"Building Floor",walkable:!0,topColor:14137738,sideColor:10974543,moveCost:.95,pattern:"floor"},[`${ie.STRUCTURE}:3`]:{label:"Stone Building Wall",topColor:12962769,sideColor:8226704,pattern:"masonry"},[`${ie.STRUCTURE}:4`]:{label:"Timber Building Wall",topColor:13998691,sideColor:9001270,pattern:"timber"},[`${ie.STRUCTURE}:5`]:{label:"Oak Doorway",walkable:!0,topColor:10183482,sideColor:7290920,moveCost:.9,pattern:"doorOak"},[`${ie.STRUCTURE}:6`]:{label:"Stairs",walkable:!0,topColor:13150842,sideColor:9200960,moveCost:1.05,pattern:"stairs"},[`${ie.STRUCTURE}:7`]:{label:"Iron Doorway",walkable:!0,topColor:6713723,sideColor:3423042,moveCost:.9,pattern:"doorIron"},[`${ie.STRUCTURE}:8`]:{label:"Painted Doorway",walkable:!0,topColor:4161401,sideColor:2642253,moveCost:.9,pattern:"doorPainted"},[`${ie.STRUCTURE}:9`]:{label:"Stone Stairs",walkable:!0,topColor:12962769,sideColor:8226704,moveCost:1.05,pattern:"masonry"},[`${ie.STRUCTURE}:10`]:{label:"Timber Stairs",walkable:!0,topColor:13998691,sideColor:9001270,moveCost:1.05,pattern:"timber"}};function Ai(i,e=0){const t=Jl[i]||Jl[ie.VOID],n=Pg[`${i}:${e}`]||{};return{...t,...n}}function Ig(i,e=0){return Ai(i,e).walkable}function Dg(i,e,t){return Ai(i,e).habitats.includes(t)}const ft={NONE:0,EARTH:ie.GEO,WATER:ie.HYDRO,WIND:ie.ANEMO,ICE:ie.CRYO,FIRE:ie.PYRO,STRUCTURE:ie.STRUCTURE},lt={DEFAULT:0,FOREST:1,ROAD:2,HILL:3,MOUNTAIN:4,ICE:1,DEEP_WATER:2,MARSH_WATER:4,TOWN_WALL:1,BUILDING_FLOOR:2,STONE_BUILDING_WALL:3,TIMBER_BUILDING_WALL:4,DOOR:5,OAK_DOOR:5,STAIRS:6,IRON_DOOR:7,PAINTED_DOOR:8,STONE_STAIRS:9,TIMBER_STAIRS:10},Ql={oak:lt.OAK_DOOR,iron:lt.IRON_DOOR,painted:lt.PAINTED_DOOR},ge={NONE:0,WALL:1,DOOR:2,FLOOR:3,STAIRS:4,WINDOW_LOWER_NORTH:6,WINDOW_LOWER_SOUTH:7,WINDOW_LOWER_WEST:8,WINDOW_LOWER_EAST:9,STAIRS_NORTH:10,STAIRS_SOUTH:11,STAIRS_WEST:12,STAIRS_EAST:13,WINDOW_UPPER_NORTH:14,WINDOW_UPPER_SOUTH:15,WINDOW_UPPER_WEST:16,WINDOW_UPPER_EAST:17},Ts={W:{element:ie.HYDRO,texture:lt.DEEP_WATER,effect:ft.WATER,building:ge.NONE,height:0},B:{element:ie.HYDRO,texture:lt.MARSH_WATER,effect:ft.WATER,building:ge.NONE,height:0},S:{element:ie.ANEMO,texture:lt.DEFAULT,effect:ft.WIND,building:ge.NONE,height:0},G:{element:ie.GEO,texture:lt.DEFAULT,effect:ft.EARTH,building:ge.NONE,height:0},F:{element:ie.GEO,texture:lt.FOREST,effect:ft.EARTH,building:ge.NONE,height:0},H:{element:ie.GEO,texture:lt.HILL,effect:ft.EARTH,building:ge.NONE,height:1},M:{element:ie.GEO,texture:lt.MOUNTAIN,effect:ft.EARTH,building:ge.NONE,height:2},P:{element:ie.CRYO,texture:lt.DEFAULT,effect:ft.ICE,building:ge.NONE,height:2},I:{element:ie.CRYO,texture:lt.ICE,effect:ft.ICE,building:ge.NONE,height:0},L:{element:ie.PYRO,texture:lt.DEFAULT,effect:ft.FIRE,building:ge.NONE,height:2},R:{element:ie.GEO,texture:lt.ROAD,effect:ft.EARTH,building:ge.NONE,height:0},T:{element:ie.STRUCTURE,texture:lt.TOWN_WALL,effect:ft.STRUCTURE,building:ge.WALL,height:2},X:{element:ie.STRUCTURE,texture:lt.DEFAULT,effect:ft.STRUCTURE,building:ge.WALL,height:1},A:{element:ie.STRUCTURE,texture:lt.STONE_BUILDING_WALL,effect:ft.STRUCTURE,building:ge.WALL,height:2},C:{element:ie.STRUCTURE,texture:lt.TIMBER_BUILDING_WALL,effect:ft.STRUCTURE,building:ge.WALL,height:2},N:{element:ie.STRUCTURE,texture:lt.STONE_BUILDING_WALL,effect:ft.STRUCTURE,building:ge.WINDOW_LOWER_NORTH,height:2},O:{element:ie.STRUCTURE,texture:lt.STONE_BUILDING_WALL,effect:ft.STRUCTURE,building:ge.WINDOW_LOWER_SOUTH,height:2},J:{element:ie.STRUCTURE,texture:lt.STONE_BUILDING_WALL,effect:ft.STRUCTURE,building:ge.WINDOW_LOWER_WEST,height:2},K:{element:ie.STRUCTURE,texture:lt.STONE_BUILDING_WALL,effect:ft.STRUCTURE,building:ge.WINDOW_LOWER_EAST,height:2},Q:{element:ie.STRUCTURE,texture:lt.TIMBER_BUILDING_WALL,effect:ft.STRUCTURE,building:ge.WINDOW_LOWER_NORTH,height:2},V:{element:ie.STRUCTURE,texture:lt.TIMBER_BUILDING_WALL,effect:ft.STRUCTURE,building:ge.WINDOW_LOWER_SOUTH,height:2},Y:{element:ie.STRUCTURE,texture:lt.TIMBER_BUILDING_WALL,effect:ft.STRUCTURE,building:ge.WINDOW_LOWER_WEST,height:2},Z:{element:ie.STRUCTURE,texture:lt.TIMBER_BUILDING_WALL,effect:ft.STRUCTURE,building:ge.WINDOW_LOWER_EAST,height:2},D:{element:ie.STRUCTURE,texture:lt.DOOR,effect:ft.STRUCTURE,building:ge.DOOR,height:0},E:{element:ie.STRUCTURE,texture:lt.BUILDING_FLOOR,effect:ft.STRUCTURE,building:ge.FLOOR,height:0},U:{element:ie.STRUCTURE,texture:lt.STAIRS,effect:ft.STRUCTURE,building:ge.STAIRS,height:0},1:{element:ie.STRUCTURE,texture:lt.STONE_STAIRS,effect:ft.STRUCTURE,building:ge.STAIRS_NORTH,height:0},2:{element:ie.STRUCTURE,texture:lt.STONE_STAIRS,effect:ft.STRUCTURE,building:ge.STAIRS_SOUTH,height:0},3:{element:ie.STRUCTURE,texture:lt.STONE_STAIRS,effect:ft.STRUCTURE,building:ge.STAIRS_WEST,height:0},4:{element:ie.STRUCTURE,texture:lt.STONE_STAIRS,effect:ft.STRUCTURE,building:ge.STAIRS_EAST,height:0},5:{element:ie.STRUCTURE,texture:lt.TIMBER_STAIRS,effect:ft.STRUCTURE,building:ge.STAIRS_NORTH,height:0},6:{element:ie.STRUCTURE,texture:lt.TIMBER_STAIRS,effect:ft.STRUCTURE,building:ge.STAIRS_SOUTH,height:0},7:{element:ie.STRUCTURE,texture:lt.TIMBER_STAIRS,effect:ft.STRUCTURE,building:ge.STAIRS_WEST,height:0},8:{element:ie.STRUCTURE,texture:lt.TIMBER_STAIRS,effect:ft.STRUCTURE,building:ge.STAIRS_EAST,height:0}},Lg=Object.keys(Ts);function Ea({element:i=ie.VOID,texture:e=0,effect:t=ft.NONE,building:n=ge.NONE,height:r=0}={}){return{element:gr(i,ie.VOID),texture:gr(e,0),effect:gr(t,ft.NONE),building:gr(n,ge.NONE),height:gr(r,0)}}function bs(i){return Ea(Ts[String(i).toUpperCase()]||Ts.W)}function $a(i){if(typeof i=="string")return bs(i);if(Array.isArray(i))return Ea({element:i[0],texture:i[1],effect:i[2],building:i[3],height:i[4]});if(i&&typeof i=="object"){const e=i.element??i.e,t=i.texture??i.textureValue??i.t,n=i.effect??i.fx,r=i.building??i.b,s=i.height??i.maxZ??i.h;return Ea({element:e,texture:t,effect:n,building:r,height:s})}return bs("W")}function Ta(i){const e=$a(i),t=Ai(e.element,e.texture);return{element:e.element,textureValue:e.texture,effect:e.effect,building:e.building,maxZ:e.height,walkable:t.walkable,definition:t}}function Jc(i){return i.map(e=>[...String(e)].map(t=>bs(t)))}function Qc(i){return Array.isArray(i)?i.filter(e=>Array.isArray(e)||typeof e=="string").map(e=>typeof e=="string"?[...e.trim().toUpperCase()].map(t=>bs(t)):e.map(t=>$a(t))).filter(e=>e.length>0):[]}function Eo(i){const e=Qc(i);return JSON.stringify(e,null,2)}const ec=Object.fromEntries(Object.entries(Ts).map(([i,e])=>[i,Ta(e)]));function gr(i,e){const t=Number(i);return Number.isFinite(t)?Math.max(0,Math.floor(t)):e}const eh=.96,Ug=eh/2,_e=class _e{constructor(e,t,n,r,s={}){this.threeManager=e,this.gridX=t,this.gridY=n,this.elevation=r,this.attributes=s,this.element=s.element||ie.GEO,this.textureValue=s.textureValue||0,this.effect=s.effect||0,this.building=s.building||0,this.objects=[],this.render()}setElementalType(e,t,n=0,r=0){this.element=e,this.textureValue=t,this.effect=n,this.building=r,this.mesh&&(this.restoreBaseMaterial(),this.clearObjects(),this.mesh.material=_e.isSpecialBuildingShape(r)?_e.getInvisibleMaterial():_e.getMaterials(e,t,n,this.elevation,r),this.createObjects())}render(){const e=_e.isSpecialBuildingShape(this.building)?_e.getInvisibleMaterial():_e.getMaterials(this.element,this.textureValue,this.effect,this.elevation,this.building);this.mesh=new nt(_e.geometry,e),this.mesh.castShadow=!Ai(this.element,this.textureValue).walkable,this.mesh.receiveShadow=!0,this.mesh.position.set(this.gridX,this.elevation,this.gridY),this.mesh.userData.tile=this,this.threeManager.addToWorld(this.mesh),this.createObjects()}createObjects(){this.mesh&&(_e.isWindowWall(this.building)?this.addWindowWallObjects():_e.isDirectionalStair(this.building)&&this.addStairObjects())}addWindowWallObjects(){const e=_e.getBuildingPartDirection(this.building),t=_e.getWindowGlassMaterial(),n=_e.getMaterials(this.element,this.textureValue,this.effect,this.elevation,this.building),r=_e.isUpperWindowWall(this.building),s=new nt(new Lt(.98,.48,.98),n);s.position.y=r?.24:-.24,s.castShadow=!0,s.receiveShadow=!0,s.raycast=()=>{},this.mesh.add(s),this.objects.push(s);const o=new nt(new Lt(e==="north"||e==="south"?.82:.045,.44,e==="north"||e==="south"?.045:.82),t),a=_e.getDirectionVector(e);o.position.set(a.x*.47,r?-.25:.25,a.y*.47),o.raycast=()=>{},this.mesh.add(o),this.objects.push(o)}addStairObjects(){const e=_e.getBuildingPartDirection(this.building),t=_e.getDirectionVector(e),n=_e.getMaterials(this.element,this.textureValue,this.effect,this.elevation,this.building),r=.3;for(let s=0;s<3;s++){const o=(s+1)*.32,a=new nt(new Lt(.9,o,r),n),l=-.3+s*r;a.position.set(t.x*l,-.48+o/2,t.y*l),a.rotation.y=e==="east"||e==="west"?Math.PI/2:0,a.castShadow=!0,a.receiveShadow=!0,a.raycast=()=>{},this.mesh.add(a),this.objects.push(a)}}clearObjects(){var e,t,n;if((e=this.objects)!=null&&e.length){for(const r of this.objects)(t=r.parent)==null||t.remove(r),(n=r.geometry)==null||n.dispose();this.objects=[]}}static isWindowWall(e){return[ge.WINDOW_LOWER_NORTH,ge.WINDOW_LOWER_SOUTH,ge.WINDOW_LOWER_WEST,ge.WINDOW_LOWER_EAST,ge.WINDOW_UPPER_NORTH,ge.WINDOW_UPPER_SOUTH,ge.WINDOW_UPPER_WEST,ge.WINDOW_UPPER_EAST].includes(e)}static isUpperWindowWall(e){return[ge.WINDOW_UPPER_NORTH,ge.WINDOW_UPPER_SOUTH,ge.WINDOW_UPPER_WEST,ge.WINDOW_UPPER_EAST].includes(e)}static isSpecialBuildingShape(e){return _e.isWindowWall(e)||_e.isDirectionalStair(e)}static isDirectionalStair(e){return[ge.STAIRS_NORTH,ge.STAIRS_SOUTH,ge.STAIRS_WEST,ge.STAIRS_EAST].includes(e)}static getBuildingPartDirection(e){return{[ge.WINDOW_LOWER_NORTH]:"north",[ge.WINDOW_LOWER_SOUTH]:"south",[ge.WINDOW_LOWER_WEST]:"west",[ge.WINDOW_LOWER_EAST]:"east",[ge.WINDOW_UPPER_NORTH]:"north",[ge.WINDOW_UPPER_SOUTH]:"south",[ge.WINDOW_UPPER_WEST]:"west",[ge.WINDOW_UPPER_EAST]:"east",[ge.STAIRS_NORTH]:"north",[ge.STAIRS_SOUTH]:"south",[ge.STAIRS_WEST]:"west",[ge.STAIRS_EAST]:"east"}[e]||"north"}static getDirectionVector(e){return{north:{x:0,y:-1},south:{x:0,y:1},west:{x:-1,y:0},east:{x:1,y:0}}[e]||{x:0,y:-1}}static getWindowGlassMaterial(){return _e.windowGlassMaterial||(_e.windowGlassMaterial=new pn({color:10348543,emissive:2251889,emissiveIntensity:.2,roughness:.18,metalness:.02,transparent:!0,opacity:.58,depthWrite:!1})),_e.windowGlassMaterial}static getInvisibleMaterial(){return _e.invisibleMaterial||(_e.invisibleMaterial=new Vn({transparent:!0,opacity:0,depthWrite:!1,colorWrite:!1})),_e.invisibleMaterial}highlight(e=5592405){this.mesh&&this.mesh.material&&(this.highlightMaterial||(this.highlightMaterial=Array.isArray(this.mesh.material)?this.mesh.material.map(n=>n.clone()):this.mesh.material.clone(),this.mesh.material=this.highlightMaterial),(Array.isArray(this.mesh.material)?this.mesh.material:[this.mesh.material]).forEach(n=>{var r;return(r=n.emissive)==null?void 0:r.setHex(e)}))}clearHighlight(){this.restoreBaseMaterial()}restoreBaseMaterial(){if(!this.mesh||!this.highlightMaterial)return;(Array.isArray(this.highlightMaterial)?this.highlightMaterial:[this.highlightMaterial]).forEach(t=>t.dispose()),this.highlightMaterial=null,this.mesh.material=_e.isSpecialBuildingShape(this.building)?_e.getInvisibleMaterial():_e.getMaterials(this.element,this.textureValue,this.effect,this.elevation,this.building)}static getMaterials(e,t=0,n=0,r=0,s=ge.NONE){const o=_e.getOutdoorElevationTone(e,r,s),a=`${e}:${t}:${n}:${o}`;if(!_e.materialCache.has(a)){const l=Ai(e,t),c=_e.createTexture(l,n,o),u=_e.createSideTexture(l,o),d=new pn({color:16777215,map:c,roughness:l.roughness,metalness:.05}),f=new pn({color:16777215,map:u,roughness:Math.min(1,l.roughness+.08),metalness:.02});_e.materialCache.set(a,[f,f,d,f,f,f])}return _e.materialCache.get(a)}static getOutdoorElevationTone(e,t,n){return n!==ge.NONE||![ie.GEO,ie.ANEMO,ie.CRYO].includes(e)?0:t<=0?-.14:Math.min(.3,.08+t*.11)}static createTexture(e,t=0,n=0){const r=document.createElement("canvas");r.width=96,r.height=96;const s=r.getContext("2d"),o=`#${e.topColor.toString(16).padStart(6,"0")}`,a=`#${e.sideColor.toString(16).padStart(6,"0")}`;s.fillStyle=o,s.fillRect(0,0,r.width,r.height),_e.drawSoftTop(s,e),e.pattern==="grass"?_e.drawGrass(s,o,a):e.pattern==="forest"?_e.drawForest(s):e.pattern==="hill"?_e.drawHill(s):e.pattern==="stone"?_e.drawStone(s):e.pattern==="road"?_e.drawRoad(s):e.pattern==="floor"?_e.drawFloor(s):e.pattern==="water"?_e.drawWaves(s,"#b7e6f4",.35):e.pattern==="marsh"?(_e.drawWaves(s,"#7c8b48",.28),_e.drawSpeckles(s,"#2f3b20",22,.45)):e.pattern==="sand"?_e.drawSpeckles(s,"#f5dea0",42,.45):e.pattern==="ice"?_e.drawIce(s,"#ffffff"):e.pattern==="lava"?_e.drawLava(s):e.pattern==="brick"?_e.drawBrick(s):e.pattern==="masonry"?_e.drawMasonry(s):e.pattern==="timber"?_e.drawTimber(s):e.pattern==="doorOak"?_e.drawDoor(s,"oak"):e.pattern==="doorIron"?_e.drawDoor(s,"iron"):e.pattern==="doorPainted"?_e.drawDoor(s,"painted"):e.pattern==="stairs"?_e.drawStairs(s):e.pattern==="blocked"?_e.drawBlocked(s):_e.drawSpeckles(s,a,28,.25),t>0&&_e.drawElementEffect(s,t),_e.applyElevationTone(s,n),_e.drawRoundedFrame(s,e.walkable);const l=new xa(r);return l.colorSpace=Jt,l.wrapS=Ei,l.wrapT=Ei,l.repeat.set(1,1),l.needsUpdate=!0,l}static createSideTexture(e,t=0){const n=document.createElement("canvas");n.width=96,n.height=96;const r=n.getContext("2d"),s=`#${e.topColor.toString(16).padStart(6,"0")}`,o=`#${e.sideColor.toString(16).padStart(6,"0")}`,a=r.createLinearGradient(0,0,0,96);a.addColorStop(0,s),a.addColorStop(.18,o),a.addColorStop(1,_e.shadeColor(o,-34)),r.fillStyle=a,r.fillRect(0,0,96,96),r.fillStyle="rgba(255, 255, 255, 0.22)",r.fillRect(0,0,96,8),r.fillStyle="rgba(4, 9, 12, 0.26)",r.fillRect(0,84,96,12),r.strokeStyle=e.walkable?"rgba(31, 58, 35, 0.22)":"rgba(6, 9, 12, 0.38)",r.lineWidth=3;for(let c=22;c<88;c+=22)r.beginPath(),r.moveTo(0,c),r.lineTo(96,c),r.stroke();e.walkable||(r.strokeStyle="rgba(255, 255, 255, 0.2)",r.lineWidth=4,r.beginPath(),r.moveTo(18,16),r.lineTo(78,76),r.moveTo(80,18),r.lineTo(20,78),r.stroke()),_e.applyElevationTone(r,t*.9);const l=new xa(n);return l.colorSpace=Jt,l.wrapS=Ei,l.wrapT=Ei,l.needsUpdate=!0,l}static applyElevationTone(e,t){Math.abs(t)<.001||(e.save(),e.globalCompositeOperation=t>0?"screen":"multiply",e.globalAlpha=Math.min(.42,Math.abs(t)),e.fillStyle=t>0?"#ffffff":"#46513d",e.fillRect(0,0,e.canvas.width,e.canvas.height),e.restore())}static shadeColor(e,t){const n=parseInt(e.replace("#",""),16),r=Math.max(0,Math.min(255,(n>>16)+t)),s=Math.max(0,Math.min(255,(n>>8&255)+t)),o=Math.max(0,Math.min(255,(n&255)+t));return`#${((1<<24)+(r<<16)+(s<<8)+o).toString(16).slice(1)}`}static drawSoftTop(e,t){const n=e.createRadialGradient(34,26,8,48,48,72);n.addColorStop(0,"rgba(255, 255, 255, 0.34)"),n.addColorStop(.52,"rgba(255, 255, 255, 0.08)"),n.addColorStop(1,t.walkable?"rgba(45, 62, 44, 0.16)":"rgba(18, 24, 24, 0.34)"),e.fillStyle=n,e.fillRect(0,0,96,96)}static drawRoundedFrame(e,t){e.save(),e.lineWidth=t?4:6,e.strokeStyle=t?"rgba(255, 255, 255, 0.28)":"rgba(30, 24, 22, 0.42)",_e.roundRect(e,7,7,82,82,15),e.stroke(),e.lineWidth=3,e.strokeStyle=t?"rgba(43, 68, 45, 0.18)":"rgba(5, 7, 8, 0.34)",_e.roundRect(e,2.5,2.5,91,91,13),e.stroke(),e.restore()}static drawElementEffect(e,t){const r={[ie.GEO]:"#7ed957",[ie.HYDRO]:"#4fc3f7",[ie.ANEMO]:"#ffd978",[ie.CRYO]:"#b8f0ff",[ie.PYRO]:"#ff8a3d",[ie.STRUCTURE]:"#ffb5cf"}[t];if(r){e.save(),e.globalAlpha=.22,e.fillStyle=r,_e.roundRect(e,14,14,68,68,18),e.fill(),e.globalAlpha=.5,e.strokeStyle=r,e.lineWidth=4,e.setLineDash([14,10]),e.beginPath(),e.arc(48,48,25,0,Math.PI*2),e.stroke(),e.setLineDash([]),e.globalAlpha=.38,e.lineWidth=3;for(let s=0;s<4;s++){const o=s*Math.PI*.5+Math.PI*.25,a=48+Math.cos(o)*27,l=48+Math.sin(o)*27;e.beginPath(),e.arc(a,l,4,0,Math.PI*2),e.stroke()}e.restore()}}static roundRect(e,t,n,r,s,o){e.beginPath(),e.moveTo(t+o,n),e.arcTo(t+r,n,t+r,n+s,o),e.arcTo(t+r,n+s,t,n+s,o),e.arcTo(t,n+s,t,n,o),e.arcTo(t,n,t+r,n,o),e.closePath()}static drawGrass(e,t,n){_e.drawSpeckles(e,"#a4d37e",32,.5),e.strokeStyle=n,e.lineWidth=2;for(let r=0;r<18;r++){const s=r*31%92+2,o=r*47%88+5;e.beginPath(),e.moveTo(s,o+5),e.lineTo(s+3,o),e.stroke()}e.fillStyle=t,e.globalAlpha=.25,e.fillRect(0,0,96,96),e.globalAlpha=1}static drawForest(e){_e.drawSpeckles(e,"#2f8d48",30,.32),e.fillStyle="rgba(20, 110, 54, 0.35)";for(let t=0;t<13;t++){const n=t*29%82+8,r=t*43%82+8;e.beginPath(),e.arc(n,r,4+t%3,0,Math.PI*2),e.fill()}}static drawHill(e){_e.drawSpeckles(e,"#d4ed91",24,.36),e.strokeStyle="rgba(57, 108, 53, 0.34)",e.lineWidth=4;for(let t=20;t<86;t+=22)e.beginPath(),e.moveTo(13,t),e.bezierCurveTo(30,t-10,52,t+10,80,t-2),e.stroke()}static drawStone(e){_e.drawSpeckles(e,"#dce2b2",30,.28),e.strokeStyle="rgba(75, 84, 72, 0.32)",e.lineWidth=3;for(let t=0;t<8;t++){const n=t*19%74+10,r=t*31%74+10;e.beginPath(),e.moveTo(n-8,r),e.lineTo(n,r-6),e.lineTo(n+10,r-2),e.lineTo(n+6,r+8),e.closePath(),e.stroke()}}static drawRoad(e){e.save(),e.strokeStyle="rgba(163, 112, 53, 0.28)",e.lineWidth=5,e.setLineDash([10,9]),e.beginPath(),e.moveTo(4,51),e.bezierCurveTo(24,38,50,60,92,43),e.stroke(),e.restore(),_e.drawSpeckles(e,"#fff1bd",34,.38)}static drawFloor(e){e.strokeStyle="rgba(92, 58, 32, 0.26)",e.lineWidth=3;for(let t=16;t<92;t+=16)e.beginPath(),e.moveTo(5,t),e.lineTo(91,t),e.stroke();e.strokeStyle="rgba(255, 246, 206, 0.22)";for(let t=18;t<96;t+=22)e.beginPath(),e.moveTo(t,10),e.lineTo(t-6,88),e.stroke()}static drawWaves(e,t,n){e.strokeStyle=t,e.globalAlpha=n,e.lineWidth=3;for(let r=14;r<96;r+=20){e.beginPath();for(let s=-8;s<104;s+=12){const o=r+Math.sin(s*.18)*3;s===-8?e.moveTo(s,o):e.lineTo(s,o)}e.stroke()}e.globalAlpha=1}static drawSpeckles(e,t,n,r){e.fillStyle=t,e.globalAlpha=r;for(let s=0;s<n;s++){const o=s*37%92+2,a=s*53%92+2,l=1+s%3;e.fillRect(o,a,l,l)}e.globalAlpha=1}static drawIce(e,t){e.strokeStyle=t,e.globalAlpha=.5,e.lineWidth=2;for(let n=0;n<7;n++){const r=n*13%96;e.beginPath(),e.moveTo(r,4),e.lineTo(96-r/2,92),e.stroke()}e.globalAlpha=1}static drawLava(e){const t=e.createRadialGradient(48,48,4,48,48,70);t.addColorStop(0,"#ffd166"),t.addColorStop(.45,"#f97316"),t.addColorStop(1,"#7c1d12"),e.fillStyle=t,e.fillRect(0,0,96,96),e.strokeStyle="rgba(255, 224, 102, 0.65)",e.lineWidth=4,e.beginPath(),e.moveTo(8,28),e.bezierCurveTo(28,10,42,60,62,28),e.bezierCurveTo(72,12,84,30,91,18),e.stroke()}static drawBrick(e){e.strokeStyle="rgba(137, 85, 44, 0.36)",e.lineWidth=3;for(let t=18;t<96;t+=18)e.beginPath(),e.moveTo(4,t),e.lineTo(92,t),e.stroke();for(let t=9;t<96;t+=18){const n=Math.floor(t/18)%2*18;for(let r=8+n;r<96;r+=36)e.beginPath(),e.moveTo(r,t),e.lineTo(r,t+18),e.stroke()}}static drawMasonry(e){_e.drawSpeckles(e,"#f1f4f0",18,.18),e.strokeStyle="rgba(76, 84, 90, 0.36)",e.lineWidth=3;for(let t=16;t<96;t+=16)e.beginPath(),e.moveTo(6,t),e.lineTo(90,t),e.stroke();for(let t=8;t<96;t+=16){const n=Math.floor(t/16)%2*18;for(let r=9+n;r<96;r+=36)e.beginPath(),e.moveTo(r,t),e.lineTo(r,t+16),e.stroke()}}static drawTimber(e){_e.drawSpeckles(e,"#f3c285",18,.16),e.strokeStyle="rgba(83, 49, 27, 0.38)",e.lineWidth=5;for(let t=18;t<96;t+=24)e.beginPath(),e.moveTo(t,8),e.lineTo(t-4,88),e.stroke();e.strokeStyle="rgba(255, 232, 179, 0.26)",e.lineWidth=2;for(let t=28;t<96;t+=24)e.beginPath(),e.moveTo(t,8),e.lineTo(t-4,88),e.stroke()}static drawDoor(e,t="oak"){const n={oak:{panel:"rgba(70, 39, 24, 0.38)",frame:"rgba(255, 218, 132, 0.45)",accent:"rgba(255, 221, 128, 0.7)"},iron:{panel:"rgba(36, 43, 49, 0.52)",frame:"rgba(190, 207, 216, 0.52)",accent:"rgba(224, 191, 92, 0.78)"},painted:{panel:"rgba(25, 85, 79, 0.5)",frame:"rgba(174, 232, 207, 0.5)",accent:"rgba(244, 205, 93, 0.78)"}},r=n[t]||n.oak;e.fillStyle=r.panel,_e.roundRect(e,22,14,52,68,10),e.fill(),e.strokeStyle=r.frame,e.lineWidth=4,_e.roundRect(e,24,16,48,64,9),e.stroke(),e.lineWidth=t==="iron"?5:3;for(let s=32;s<=64;s+=16)e.beginPath(),e.moveTo(27,s),e.lineTo(69,s),e.stroke();e.fillStyle=r.accent,e.beginPath(),e.arc(62,48,4,0,Math.PI*2),e.fill()}static drawStairs(e){e.save(),e.fillStyle="rgba(84, 58, 35, 0.18)",e.fillRect(12,18,72,62),e.strokeStyle="rgba(255, 246, 218, 0.42)",e.lineWidth=5;for(let t=0;t<6;t++){const n=22+t*10;e.beginPath(),e.moveTo(20+t*4,n),e.lineTo(76-t*3,n),e.stroke()}e.strokeStyle="rgba(92, 58, 32, 0.34)",e.lineWidth=3,e.beginPath(),e.moveTo(20,78),e.lineTo(80,20),e.stroke(),e.restore()}static drawBlocked(e){e.save(),e.fillStyle="rgba(20, 24, 28, 0.2)",_e.roundRect(e,12,12,72,72,15),e.fill(),e.strokeStyle="rgba(255, 255, 255, 0.18)",e.lineWidth=4,e.beginPath(),e.moveTo(22,28),e.lineTo(74,68),e.moveTo(72,25),e.lineTo(24,73),e.stroke(),e.restore()}destroy(){this.clearObjects(),this.mesh&&(this.restoreBaseMaterial(),this.threeManager.removeFromWorld(this.mesh),this.mesh=null)}};an(_e,"geometry",new Lt(.98,eh,.98)),an(_e,"topOffset",Ug),an(_e,"materialCache",new Map);let ws=_e;const Og=16;class Ye{constructor(e,t={}){this.threeManager=e,this.chunkSize=t.chunkSize||Og,this.tiles=[],this.tileMap=new Map,this.elevationMap=new Map,this.surfaceMap=new Map,this.chunkMap=new Map,this.buildingStates=new Map,this.sightCutawayTiles=new Set,this.visibleTileRadius=t.visibleTileRadius||34,this.lastVisibilityCenter=null}generate(e,t){this.clear();for(let n=-e/2;n<e/2;n++)for(let r=-t/2;r<t/2;r++){const s=Math.sqrt(n*n+r*r);let o=1,a=ie.GEO,l=0;s>e*.4?(a=ie.HYDRO,l=2,o=0,Math.abs(Math.sin(n*.2)*Math.cos(r*.2))>.7&&(l=4)):s>e*.35&&(a=ie.ANEMO,o=0);for(let c=0;c<=o;c++){const u=c===o?a:ie.GEO,d=c===o?l:0;this.addTile(n,r,c,u,d)}}}generateFromArray(e,t){var a;this.clear();const n=e.length,r=((a=e[0])==null?void 0:a.length)||0,s=Math.floor(r/2),o=Math.floor(n/2);for(let l=0;l<n;l++){const c=e[l];for(let u=0;u<r;u++){const d=c[u],f=this.resolveBlockInfo(d,t),v=u-s,x=l-o;if(this.isTwoBlockBuildingWall(f)){this.addTile(v,x,0,ie.GEO,0,0,ge.NONE);for(let y=1;y<=f.maxZ;y++){const _=this.getBuildingPartAtElevation(f.building,y);this.addTile(v,x,y,f.element,f.textureValue??0,f.effect??0,_)}continue}for(let y=0;y<=f.maxZ;y++){const _=y===f.maxZ?f.element:ie.GEO,p=y===f.maxZ?f.textureValue??0:0,b=y===f.maxZ?f.effect??0:0,C=y===f.maxZ?f.building??0:0;this.addTile(v,x,y,_,p,b,C)}}}}resolveBlockInfo(e,t={}){var n;if(typeof e=="string"){const r=t[e]||t[(n=e.toUpperCase)==null?void 0:n.call(e)]||null;if(r)return Ta(r)}return Ta(e)}isTwoBlockBuildingWall(e){return(e==null?void 0:e.element)===ie.STRUCTURE&&e.maxZ>=2&&(e.building===ge.WALL||this.isLowerWindowPart(e.building))}isLowerWindowPart(e){return[ge.WINDOW_LOWER_NORTH,ge.WINDOW_LOWER_SOUTH,ge.WINDOW_LOWER_WEST,ge.WINDOW_LOWER_EAST].includes(e)}getUpperWindowPart(e){return{[ge.WINDOW_LOWER_NORTH]:ge.WINDOW_UPPER_NORTH,[ge.WINDOW_LOWER_SOUTH]:ge.WINDOW_UPPER_SOUTH,[ge.WINDOW_LOWER_WEST]:ge.WINDOW_UPPER_WEST,[ge.WINDOW_LOWER_EAST]:ge.WINDOW_UPPER_EAST}[e]||e}getBuildingPartAtElevation(e,t){return this.isLowerWindowPart(e)&&t%2===0?this.getUpperWindowPart(e):e}generateFromChunkedArray(e,t,n=this.chunkSize,r={}){this.chunkSize=n,this.generateFromArray(e,t);const s=Array.isArray(r)?r:r.buildings||[];this.registerBuildingBlueprints(s)}addTile(e,t,n,r,s=0,o=0,a=0,l=!0){const c=new ws(this.threeManager,e,t,n,{element:r,textureValue:s,effect:o,building:a});this.tiles.push(c);const u=this.getTileKey(e,t,n);if(this.tileMap.set(u,c),this.registerTileInChunk(e,t,u),l){const d=this.getColumnKey(e,t),f=this.elevationMap.get(d)??-1;n>f&&(this.elevationMap.set(d,n),this.surfaceMap.set(d,{x:e,y:t,z:n,element:r,textureValue:s,effect:o,building:a,definition:Ai(r,s)}))}return c}getTileAt(e,t,n){return this.tileMap.get(this.getTileKey(e,t,n))}getElevation(e,t){const{gridX:n,gridY:r}=this.toGridPosition(e,t);return this.elevationMap.get(this.getColumnKey(n,r))??0}getTopSurfaceOffset(){return ws.topOffset}getSurfaceWorldY(e,t){return this.getElevation(e,t)+this.getTopSurfaceOffset()}getSurfaceAt(e,t){const{gridX:n,gridY:r}=this.toGridPosition(e,t);return this.surfaceMap.get(this.getColumnKey(n,r))}findHighestWalkable(){let e=null;for(const t of this.surfaceMap.values())this.isWalkable(t.x,t.y)&&(!e||t.z>e.z)&&(e=t);return e?{x:e.x,y:e.y,z:e.z}:null}hasTileColumn(e,t){const{gridX:n,gridY:r}=this.toGridPosition(e,t);return this.elevationMap.has(this.getColumnKey(n,r))}isWalkable(e,t){const n=this.getSurfaceAt(e,t);return n?Ig(n.element,n.textureValue):!1}canOccupyTile(e,t,n=e,r=t){if(!this.isWalkable(e,t))return!1;const s=this.getElevation(n,r),a=this.getElevation(e,t)-s;return Math.abs(a)<1?!0:Math.abs(a)===1}canMoveBetween(e,t,n,r,s=!1){const o=this.toGridPosition(e,t),a=this.toGridPosition(n,r);if(o.gridX===a.gridX&&o.gridY===a.gridY)return this.canOccupyTile(a.gridX,a.gridY,o.gridX,o.gridY);if(!this.canOccupyTile(a.gridX,a.gridY,o.gridX,o.gridY))return!1;const l=a.gridX-o.gridX,c=a.gridY-o.gridY;if(Math.abs(l)>1||Math.abs(c)>1)return!1;const u=s||Math.abs(l)===1&&Math.abs(c)===1;if(!this.canUseStairsBetween(o.gridX,o.gridY,a.gridX,a.gridY,u))return!1;if(!u)return!0;const d=this.canOccupyTile(a.gridX,o.gridY,o.gridX,o.gridY),f=this.canOccupyTile(o.gridX,a.gridY,o.gridX,o.gridY);return d&&f}canOccupyFootprint(e,t,n=e,r=t,s=.32){const o=this.toGridPosition(n,r),a=this.getFootprintSamples(e,t,s);for(const l of a){const c=this.toGridPosition(l.x,l.y);if(!this.canOccupyTile(c.gridX,c.gridY,o.gridX,o.gridY))return!1}return!0}canMoveFootprintBetween(e,t,n,r,s=.32){const o=this.toGridPosition(e,t),a=this.toGridPosition(n,r),l=o.gridX!==a.gridX&&o.gridY!==a.gridY;return this.canMoveBetween(o.gridX,o.gridY,a.gridX,a.gridY,l)?this.canOccupyFootprint(n,r,o.gridX,o.gridY,s):!1}getFootprintSamples(e,t,n=.32){const r=n*.72;return[{x:e,y:t},{x:e+n,y:t},{x:e-n,y:t},{x:e,y:t+n},{x:e,y:t-n},{x:e+r,y:t+r},{x:e+r,y:t-r},{x:e-r,y:t+r},{x:e-r,y:t-r}]}registerBuildingBlueprints(e=[]){this.clearBuildingStates();for(const t of e){this.addUpperDoorBlocks(t);const n=this.createBuildingState(t);n&&this.buildingStates.set(t.id,n)}}addUpperDoorBlocks(e){if(!(e!=null&&e.door))return;const t=Math.max(2,Math.min(6,Math.floor(e.stories||1)*2)),n=e.x+e.door.x,r=e.y+e.door.y,s=e.style==="stone"?lt.STONE_BUILDING_WALL:lt.TIMBER_BUILDING_WALL;for(let o=1;o<=t;o++)this.getTileAt(n,r,o)||this.addTile(n,r,o,ie.STRUCTURE,s,ie.STRUCTURE,ge.WALL,!1)}createBuildingState(e){var a,l;if(!(e!=null&&e.id))return null;const t={...e,wallTiles:[],interiorKeys:new Set,roof:null,doors:[],wallDecorations:null,furniture:null,roofVisibleByRange:!0,floorZ:0,isOpen:!1};let n=-1/0,r=1/0,s=1/0;for(let c=0;c<e.height;c++)for(let u=0;u<e.width;u++){const d=e.x+u,f=e.y+c,v=this.getSurfaceAt(d,f);if(!v)continue;const x=this.getSurfaceWorldY(d,f);n=Math.max(n,x);const y=u===0||c===0||u===e.width-1||c===e.height-1,_=((a=e.door)==null?void 0:a.x)===u&&((l=e.door)==null?void 0:l.y)===c,p=this.getColumnKey(d,f);if(y){const b=this.getBuildingEdge(e,u,c),C=Math.max(v.z,Math.floor(e.stories||1)*2);for(let A=1;A<=C;A++){const I=this.getTileAt(d,f,A);(I==null?void 0:I.element)===ie.STRUCTURE&&t.wallTiles.push({tile:I,edge:b})}}(!y||_)&&(t.interiorKeys.add(p),r=Math.min(r,x),s=Math.min(s,v.z))}if(n===-1/0)return null;const o=r===1/0?.48:r;return t.floorZ=s===1/0?0:s,t.roof=this.createBuildingRoof(e,n,t),t.wallDecorations=this.createBuildingWallDecorations(e,o,t),t.furniture=this.createBuildingFurniture(e,o),t}createBuildingRoof(e,t,n){const r=new fn;r.position.set(e.x+(e.width-1)/2,t+.23,e.y+(e.height-1)/2),r.userData.buildingId=e.id;const s=Ye.getRoofMaterial(e.style),o=Ye.getTrimMaterial(e.style),a=new Lt(.98,.34,.98),l=new Lt(.98,.28,.16),c=new Lt(.16,.28,.98),u=-(e.width-1)/2,d=-(e.height-1)/2;for(let f=0;f<e.height;f++)for(let v=0;v<e.width;v++){const x=new fn;x.position.set(u+v,0,d+f),x.userData.cutawayType="roof-block";const y=new nt(a,s);if(x.add(y),f===0||f===e.height-1){const _=new nt(l,o);_.position.y=.3,x.add(_)}if(v===0||v===e.width-1){const _=new nt(c,o);_.position.y=.3,x.add(_)}r.add(x)}return r.traverse(f=>{f.castShadow=!0,f.receiveShadow=!0,f.raycast=()=>{},f.renderOrder=12}),this.threeManager.addToWorld(r),r}createBuildingWallDecorations(e,t,n){const r=new fn;if(r.userData.buildingId=e.id,e.door){const s=this.getBuildingEdge(e,e.door.x,e.door.y);if(s){const o=this.createDoorPanel(e,t,s);n.doors.push({pivot:o,edge:s}),r.add(o)}}return this.threeManager.addToWorld(r),r}getBuildingEdge(e,t,n){return n===0?"north":n===e.height-1?"south":t===0?"west":t===e.width-1?"east":null}createDoorPanel(e,t,n){const r=new fn,s=1.82,o=.64,a=.1,l=n==="north"||n==="south",c=Ye.getDoorMaterial(e.doorStyle),u=Ye.getDoorAccentMaterial(e.doorStyle),d=new nt(new Lt(l?o:a,s,l?a:o),c),f=e.x+e.door.x,v=e.y+e.door.y;r.position.set(f,t,v),n==="north"?(r.position.z-=.52,d.position.x=o/2):n==="south"?(r.position.z+=.52,d.position.x=-o/2):n==="west"?(r.position.x-=.52,d.position.z=-o/2):n==="east"&&(r.position.x+=.52,d.position.z=o/2),d.position.y=s/2,d.castShadow=!0,d.raycast=()=>{},r.add(d);const x=new Lt(l?o*.82:a*1.25,.075,l?a*1.25:o*.82);for(const _ of[.48,.92,1.36]){const p=new nt(x,u);p.position.copy(d.position),p.position.y=_,p.castShadow=!0,p.raycast=()=>{},r.add(p)}const y=new nt(new oi(.055,8,6),u);return y.position.copy(d.position),y.position.y=.94,l?(y.position.x+=n==="north"?o*.22:-o*.22,y.position.z+=n==="north"?-.07:.07):(y.position.z+=n==="west"?-o*.22:o*.22,y.position.x+=n==="west"?-.07:.07),y.castShadow=!0,y.raycast=()=>{},r.add(y),r}createBuildingFurniture(e,t){const n=new fn;n.userData.buildingId=e.id;const r=t+.08,s=e.x+1,o=e.x+e.width-2,a=e.y+1,l=e.y+e.height-2;return this.addTable(n,s+.55,r,a+.55,e.style),this.addBench(n,o-.3,r,a+.65,e.style,"x"),this.addCrateStack(n,s+.35,r,l-.35,e.style),e.width>=7&&e.height>=6?(this.addCounter(n,o-.45,r,l-.25,e.style),this.addBed(n,s+1.45,r,l-.45,e.style)):this.addStool(n,o-.35,r,l-.35,e.style),n.traverse(c=>{c.castShadow=!0,c.receiveShadow=!0,c.raycast=()=>{}}),this.threeManager.addToWorld(n),n}addTable(e,t,n,r,s){const o=Ye.getFurnitureMaterial(s),a=new nt(new Lt(.92,.12,.72),o);a.position.set(t,n+.34,r),e.add(a);for(const l of[-.32,.32])for(const c of[-.24,.24]){const u=new nt(new Lt(.1,.34,.1),o);u.position.set(t+l,n+.17,r+c),e.add(u)}}addBench(e,t,n,r,s,o="x"){const a=Ye.getFurnitureMaterial(s),l=new nt(new Lt(o==="x"?1.18:.28,.18,o==="x"?.28:1.18),a);l.position.set(t,n+.22,r),e.add(l)}addCounter(e,t,n,r,s){const o=Ye.getFurnitureMaterial(s),a=new nt(new Lt(1.32,.56,.42),o);a.position.set(t,n+.28,r),e.add(a)}addBed(e,t,n,r,s){const o=Ye.getFurnitureMaterial(s),a=Ye.getBlanketMaterial(s),l=new nt(new Lt(1.42,.24,.78),o);l.position.set(t,n+.15,r),e.add(l);const c=new nt(new Lt(1.12,.12,.62),a);c.position.set(t+.06,n+.34,r),e.add(c)}addCrateStack(e,t,n,r,s){const o=Ye.getFurnitureMaterial(s),a=new nt(new Lt(.42,.42,.42),o);a.position.set(t,n+.21,r),e.add(a);const l=new nt(new Lt(.34,.34,.34),o);l.position.set(t+.34,n+.17,r+.22),e.add(l)}addStool(e,t,n,r,s){const o=Ye.getFurnitureMaterial(s),a=new nt(new Lt(.34,.26,.34),o);a.position.set(t,n+.13,r),e.add(a)}static getRoofMaterial(e){Ye.roofMaterialCache||(Ye.roofMaterialCache=new Map);const t=e||"timber";return Ye.roofMaterialCache.has(t)||Ye.roofMaterialCache.set(t,new pn({color:t==="stone"?7306887:10896949,roughness:.82,metalness:.02})),Ye.roofMaterialCache.get(t)}static getTrimMaterial(e){Ye.trimMaterialCache||(Ye.trimMaterialCache=new Map);const t=e||"timber";return Ye.trimMaterialCache.has(t)||Ye.trimMaterialCache.set(t,new pn({color:t==="stone"?13883858:5911585,roughness:.86,metalness:.02})),Ye.trimMaterialCache.get(t)}static getDoorMaterial(e){Ye.doorMaterialCache||(Ye.doorMaterialCache=new Map);const t=e||"oak",n={oak:8079145,iron:4344658,painted:3110768};return Ye.doorMaterialCache.has(t)||Ye.doorMaterialCache.set(t,new pn({color:n[t]||n.oak,roughness:t==="iron"?.58:.84,metalness:t==="iron"?.42:.03})),Ye.doorMaterialCache.get(t)}static getDoorAccentMaterial(e){Ye.doorAccentMaterialCache||(Ye.doorAccentMaterialCache=new Map);const t=e||"oak",n={oak:5057820,iron:11187645,painted:14137439};return Ye.doorAccentMaterialCache.has(t)||Ye.doorAccentMaterialCache.set(t,new pn({color:n[t]||n.oak,roughness:t==="iron"?.42:.72,metalness:t==="iron"?.62:.08})),Ye.doorAccentMaterialCache.get(t)}static getFurnitureMaterial(e){Ye.furnitureMaterialCache||(Ye.furnitureMaterialCache=new Map);const t=e||"timber";return Ye.furnitureMaterialCache.has(t)||Ye.furnitureMaterialCache.set(t,new pn({color:t==="stone"?7622454:9132596,roughness:.88,metalness:.01})),Ye.furnitureMaterialCache.get(t)}static getBlanketMaterial(e){Ye.blanketMaterialCache||(Ye.blanketMaterialCache=new Map);const t=e||"timber";return Ye.blanketMaterialCache.has(t)||Ye.blanketMaterialCache.set(t,new pn({color:t==="stone"?4745885:9387864,roughness:.72,metalness:.01})),Ye.blanketMaterialCache.get(t)}updateBuildingVisibility(e,t){const n=this.getBuildingAt(e,t);for(const r of this.buildingStates.values())this.setBuildingOpen(r,(n==null?void 0:n.id)===r.id);return n}getBuildingAt(e,t){const n=this.toGridPosition(e,t),r=this.getColumnKey(n.gridX,n.gridY);for(const s of this.buildingStates.values())if(s.interiorKeys.has(r))return s;return null}setBuildingOpen(e,t){e.isOpen!==t&&(e.isOpen=t,e.wallDecorations&&(e.wallDecorations.visible=!0),this.setDoorOpen(e,t))}setDoorOpen(e,t){for(const n of e.doors||[]){const r=n.edge==="north"||n.edge==="west"?-1:1;n.pivot.rotation.y=t?r*Math.PI*.58:0,n.pivot.visible=!0}}syncRoofVisibility(e){e!=null&&e.roof&&(e.roof.visible=e.roofVisibleByRange!==!1&&!e.roofHiddenByCutaway)}updateVisibleTilesAround(e,t,n=this.visibleTileRadius){const r=this.toGridPosition(e,t);if(this.lastVisibilityCenter&&this.lastVisibilityCenter.x===r.gridX&&this.lastVisibilityCenter.y===r.gridY&&this.lastVisibilityCenter.radius===n)return;this.lastVisibilityCenter={x:r.gridX,y:r.gridY,radius:n};const s=n*n;for(const o of this.tiles){const a=o.gridX-r.gridX,l=o.gridY-r.gridY;o.visibleByRange=a*a+l*l<=s,this.syncTileVisibility(o)}for(const o of this.buildingStates.values()){if(!o.roof)continue;const a=o.roof.position.x-r.gridX,l=o.roof.position.z-r.gridY,c=a*a+l*l<=s;o.roofVisibleByRange=c,this.syncRoofVisibility(o),o.wallDecorations&&(o.wallDecorations.visible=c),o.furniture&&(o.furniture.visible=c)}}updatePlayerSightCutaway(e,t,n,r=4){if(this.clearSightCutaway(),!n)return;const s=this.toGridPosition(e,t),o=this.getSurfaceAt(s.gridX,s.gridY);if(!o)return;const a=new ct(n.position.x-s.gridX,n.position.z-s.gridY);if(a.lengthSq()<1e-4)return;a.normalize();for(let c=s.gridX-r;c<=s.gridX+r;c++)for(let u=s.gridY-r;u<=s.gridY+r;u++){if(c===s.gridX&&u===s.gridY)continue;const d=this.getSurfaceAt(c,u);if(!d)continue;const f=new ct(c-s.gridX,u-s.gridY),v=f.length();if(v<.75||v>r)continue;const x=f.normalize().dot(a),y=Math.abs((c-s.gridX)*a.y-(u-s.gridY)*a.x);if(x<.36||y>1.6||!this.shouldHideTileForSightCutaway(d,o))continue;const _=Math.max(1,o.z+1);for(let p=_;p<=d.z;p++){const b=this.getTileAt(d.x,d.y,p);!b||b.element===ie.STRUCTURE||(b.hiddenBySightCutaway=!0,this.sightCutawayTiles.add(b),this.syncTileVisibility(b))}}const l=this.getBuildingAt(s.gridX,s.gridY);l&&l.floorZ===o.z?this.cutAwayActiveBuilding(l,n,o):this.cutAwayBuildingsInFrontOfPlayer(s.gridX,s.gridY,n,o)}clearSightCutaway(){var e;if((e=this.sightCutawayTiles)!=null&&e.size){for(const t of this.sightCutawayTiles){if(t!=null&&t.roof){t.roofHiddenByCutaway=!1,this.syncRoofVisibility(t);continue}t.hiddenBySightCutaway=!1,this.syncTileVisibility(t)}this.sightCutawayTiles.clear()}}cutAwayActiveBuilding(e,t,n){const r=e.x+(e.width-1)/2,s=e.y+(e.height-1)/2,o=new Set([t.position.x>=r?"east":"west",t.position.z>=s?"south":"north"]),a=n.z+2,l=e.floorZ+Math.max(2,Math.min(6,Math.floor(e.stories||1)*2));e.roofHiddenByCutaway=!0,this.sightCutawayTiles.add(e),this.syncRoofVisibility(e);for(const c of e.wallTiles){if(!o.has(c.edge))continue;const u=c.tile;u.elevation<a||u.elevation>l||(u.hiddenBySightCutaway=!0,this.sightCutawayTiles.add(u),this.syncTileVisibility(u))}}cutAwayBuildingsInFrontOfPlayer(e,t,n,r){const s=new ct(n.position.x,n.position.z),o=new ct(e,t);for(const a of this.buildingStates.values())if(a.floorZ===r.z&&this.segmentCrossesBuilding(s,o,a,.08)){a.roofHiddenByCutaway=!0,this.sightCutawayTiles.add(a),this.syncRoofVisibility(a);for(const l of a.wallTiles){const c=l.tile;c.elevation<=a.floorZ+1||(c.hiddenBySightCutaway=!0,this.sightCutawayTiles.add(c),this.syncTileVisibility(c))}}}segmentCrossesBuilding(e,t,n,r=0){const s=n.x-.5-r,o=n.x+n.width-.5+r,a=n.y-.5-r,l=n.y+n.height-.5+r,c=t.x-e.x,u=t.y-e.y;let d=0,f=1;if(Math.abs(c)<1e-4){if(e.x<s||e.x>o)return!1}else{const v=(s-e.x)/c,x=(o-e.x)/c;if(d=Math.max(d,Math.min(v,x)),f=Math.min(f,Math.max(v,x)),d>f)return!1}if(Math.abs(u)<1e-4){if(e.y<a||e.y>l)return!1}else{const v=(a-e.y)/u,x=(l-e.y)/u;if(d=Math.max(d,Math.min(v,x)),f=Math.min(f,Math.max(v,x)),d>f)return!1}return f>.03&&d<.94}shouldHideTileForSightCutaway(e,t){return!e||!t||e.element===ie.HYDRO||e.element===ie.STRUCTURE?!1:e.element===ie.ANEMO||e.element===ie.GEO||e.element===ie.CRYO?e.z>t.z:!1}canUseStairsBetween(e,t,n,r,s=!1){const o=this.getSurfaceAt(e,t),a=this.getSurfaceAt(n,r),l=((a==null?void 0:a.z)??0)-((o==null?void 0:o.z)??0);return l===0?!0:Math.abs(l)===1}syncTileVisibility(e){e!=null&&e.mesh&&(e.mesh.visible=e.visibleByRange!==!1&&!e.hiddenBySightCutaway)}supportsHabitat(e,t,n){const r=this.getSurfaceAt(e,t);return r?Dg(r.element,r.textureValue,n):!1}getMoveCost(e,t,n,r,s=!1){var v;if(!this.canMoveBetween(e,t,n,r,s))return 1/0;const o=this.getElevation(e,t),l=this.getElevation(n,r)-o;if(l>=2)return 1/0;const c=this.getSurfaceAt(n,r),u=s?1.414:1,d=((v=c==null?void 0:c.definition)==null?void 0:v.moveCost)||1,f=l>0?l*.5:l*.15;return Math.max(.1,u*d+f)}findNearestHabitat(e,t,n,r=16){const s=this.toGridPosition(e,t);let o=null;for(let a=0;a<=r;a++){for(let l=s.gridX-a;l<=s.gridX+a;l++){for(let c=s.gridY-a;c<=s.gridY+a;c++)if(!(Math.abs(l-s.gridX)!==a&&Math.abs(c-s.gridY)!==a)&&this.supportsHabitat(l,c,n)){o={x:l,y:c,z:this.getElevation(l,c)};break}if(o)break}if(o)return o}return null}findNearestWalkable(e,t,n=48){const r=this.toGridPosition(e,t);for(let s=0;s<=n;s++)for(let o=r.gridX-s;o<=r.gridX+s;o++)for(let a=r.gridY-s;a<=r.gridY+s;a++)if(!(Math.abs(o-r.gridX)!==s&&Math.abs(a-r.gridY)!==s)&&this.isWalkable(o,a))return{x:o,y:a,z:this.getElevation(o,a)};return null}modifyTile(e,t,n,r,s=0,o=0,a=0){const l=this.getTileAt(e,t,n);l?(console.log(`[WorldGenerator] Modifying tile at ${e},${t},${n} to Element:${r}, Var:${s}`),l.setElementalType(r,s,o,a)):this.addTile(e,t,n,r,s,o,a)}applyIceToTile(e,t,n){const r=this.getTileAt(e,t,n);r&&r.element===ie.HYDRO&&this.modifyTile(e,t,n,ie.CRYO,0,ie.CRYO,r.building)}removeTile(e,t,n){const r=this.getTileKey(e,t,n),s=this.tileMap.get(r);if(s){s.destroy(),this.tileMap.delete(r),this.tiles=this.tiles.filter(c=>c!==s),this.unregisterTileFromChunk(e,t,r);let o=-1,a=null;for(let c=n+10;c>=0;c--){const u=this.tileMap.get(this.getTileKey(e,t,c));if(u){o=c,a=u;break}}const l=this.getColumnKey(e,t);o===-1?(this.elevationMap.delete(l),this.surfaceMap.delete(l)):(this.elevationMap.set(l,o),this.surfaceMap.set(l,{x:e,y:t,z:o,element:a.element,textureValue:a.textureValue,effect:a.effect,building:a.building,definition:Ai(a.element,a.textureValue)}))}}clear(){this.clearSightCutaway(),this.clearBuildingStates(),this.tiles.forEach(e=>e.destroy()),this.tiles=[],this.tileMap.clear(),this.elevationMap.clear(),this.surfaceMap.clear(),this.chunkMap.clear(),this.lastVisibilityCenter=null}clearBuildingStates(){if(this.buildingStates){for(const e of this.buildingStates.values())e.roof&&(Ye.disposeSceneObject(e.roof,this.threeManager),e.roof=null),e.wallDecorations&&(Ye.disposeSceneObject(e.wallDecorations,this.threeManager),e.wallDecorations=null),e.furniture&&(Ye.disposeSceneObject(e.furniture,this.threeManager),e.furniture=null);this.buildingStates.clear()}}static disposeSceneObject(e,t){t.removeFromWorld(e),e.traverse(n=>{var r;(r=n.geometry)==null||r.dispose()})}exportWorld(){const e=this.tiles.map(t=>({gridX:t.gridX,gridY:t.gridY,elevation:t.elevation,element:t.element,variant:t.textureValue,effect:t.effect,building:t.building}));return JSON.stringify(e)}loadWorld(e){try{const t=JSON.parse(e);this.clear(),t.forEach(n=>{this.addTile(n.gridX,n.gridY,n.elevation,n.element,n.variant,n.effect,n.building)}),console.log(`[WorldGenerator] Loaded ${t.length} tiles.`)}catch(t){console.error("[WorldGenerator] Failed to load world:",t)}}getTileKey(e,t,n){return`${e},${t},${n}`}getColumnKey(e,t){return`${e},${t}`}toGridPosition(e,t){return{gridX:Math.round(e),gridY:Math.round(t)}}getChunkCoord(e){return Math.floor(e/this.chunkSize)}getChunkKey(e,t){return`${e},${t}`}getChunkKeyForTile(e,t){return this.getChunkKey(this.getChunkCoord(e),this.getChunkCoord(t))}registerTileInChunk(e,t,n){const r=this.getChunkKeyForTile(e,t);if(!this.chunkMap.has(r)){const[s,o]=r.split(",").map(Number);this.chunkMap.set(r,{chunkX:s,chunkY:o,tileKeys:new Set})}this.chunkMap.get(r).tileKeys.add(n)}unregisterTileFromChunk(e,t,n){const r=this.getChunkKeyForTile(e,t),s=this.chunkMap.get(r);s&&(s.tileKeys.delete(n),s.tileKeys.size===0&&this.chunkMap.delete(r))}getLoadedChunkSummary(){return[...this.chunkMap.values()].map(e=>({chunkX:e.chunkX,chunkY:e.chunkY,blocks:e.tileKeys.size}))}}const vi=8,To=4,Ng=.11,tc=96,nc=128,Fg=1.28,ic=1.86,as=.32,Gg=.025,bo={south:0,west:1,east:2,north:3},_r=new H,vr=new H,xr=new ct,St=class St{constructor(e,t,n,r,s,o={}){this.threeManager=e,this.inputManager=t,this.worldGenerator=n,this.isLocal=o.isLocal??!0,this.userId=o.userId||"player",this.gridX=r,this.gridY=s,this.gridZ=this.worldGenerator.getElevation(r,s),this.visualX=this.gridX,this.visualY=this.gridY,this.visualZ=this.gridZ,this.targetX=this.gridX,this.targetY=this.gridY,this.targetZ=this.gridZ,this.speed=4.8,this.currentPath=[],this.direction="south",this.frame=0,this.frameTimer=0,this.isMoving=!1,this.footRadius=as,this.group=new fn,this.shadow=new nt(St.shadowGeometry,St.shadowMaterial),this.shadow.rotation.x=-Math.PI/2,this.shadow.position.y=.018,this.shadow.renderOrder=18,this.group.add(this.shadow),this.occlusionShadow=new nt(St.shadowGeometry,St.occlusionShadowMaterial),this.occlusionShadow.rotation.x=-Math.PI/2,this.occlusionShadow.position.y=.022,this.occlusionShadow.renderOrder=25,this.group.add(this.occlusionShadow),this.collisionDisc=new nt(St.collisionFillGeometry,St.collisionFillMaterial),this.collisionDisc.rotation.x=-Math.PI/2,this.collisionDisc.position.y=.03,this.collisionDisc.renderOrder=29,this.collisionDisc.visible=!1,this.group.add(this.collisionDisc),this.collisionRing=new nt(St.collisionGeometry,St.collisionMaterial),this.collisionRing.rotation.x=-Math.PI/2,this.collisionRing.position.y=.035,this.collisionRing.renderOrder=30,this.collisionRing.visible=!1,this.group.add(this.collisionRing),this.material=new Vn({transparent:!0,alphaTest:.08,depthTest:!0,depthWrite:!1,depthFunc:Pn}),this.mesh=new nt(St.geometry,this.material),this.mesh.position.y=ic/2+.07,this.mesh.renderOrder=24,this.group.add(this.mesh),this.occlusionMaterial=new Vn({color:10026993,transparent:!0,opacity:.42,alphaTest:.08,depthTest:!0,depthWrite:!1,depthFunc:wr,blending:_s}),this.occlusionMesh=new nt(St.geometry,this.occlusionMaterial),this.occlusionMesh.position.copy(this.mesh.position),this.occlusionMesh.scale.set(1.08,1.08,1),this.occlusionMesh.renderOrder=26,this.group.add(this.occlusionMesh),this.threeManager.addToEntities(this.group),this.setTileOcclusionEnabled(!0),this.loadTexture(),this.syncModel()}async loadTexture(){const e=await St.getSourceTexture();this.texture=e.clone(),this.texture.needsUpdate=!0,this.texture.repeat.set(1/vi,1/To),this.material.map=this.texture,this.material.needsUpdate=!0,this.occlusionMaterial.map=this.texture,this.occlusionMaterial.needsUpdate=!0,this.updateFrame(0)}static getSourceTexture(){if(!St.texturePromise){const e=St.createAnimeSpriteSheet(),t=new xa(e);t.colorSpace=Jt,t.magFilter=Wt,t.minFilter=Wt,t.needsUpdate=!0,St.texturePromise=Promise.resolve(t)}return St.texturePromise}static createAnimeSpriteSheet(){const e=document.createElement("canvas");e.width=tc*vi,e.height=nc*To;const t=e.getContext("2d");t.clearRect(0,0,e.width,e.height);for(const[n,r]of Object.entries(bo))for(let s=0;s<vi;s++)St.drawAnimeFrame(t,s*tc,r*nc,s,n);return e}static drawAnimeFrame(e,t,n,r,s){const o=Math.sin(r/vi*Math.PI*2)*2,a=Math.sin(r/vi*Math.PI*2),l=s==="west"?-1:s==="east"?1:0,c="#ffe2cf",u="#ff9eb4",d="#4b2f7f",f="#2d214f",v="#7fd6ff",x="#3989c7",y="#5a3a55",_="rgba(42, 28, 54, 0.72)";e.save(),e.translate(t,n),e.lineCap="round",e.lineJoin="round",e.fillStyle="rgba(42, 32, 48, 0.18)",e.beginPath(),e.ellipse(48,116,18,5,0,0,Math.PI*2),e.fill();const p=66+o,b=34+o,C=l*4;e.strokeStyle=_,e.lineWidth=5,e.fillStyle=x,St.roundRect(e,31,p,34,39,13),e.fill(),e.stroke(),e.fillStyle=v,St.roundRect(e,35,p+2,26,32,11),e.fill(),e.strokeStyle=_,e.lineWidth=6,e.beginPath(),e.moveTo(35,p+13),e.lineTo(25+a*2,p+31),e.moveTo(61,p+13),e.lineTo(71-a*2,p+31),e.stroke(),e.strokeStyle=y,e.lineWidth=8,e.beginPath(),e.moveTo(39,p+37),e.lineTo(35+a*3,113),e.moveTo(57,p+37),e.lineTo(61-a*3,113),e.stroke(),e.strokeStyle=_,e.lineWidth=5,e.fillStyle=c,e.beginPath(),e.ellipse(48,b+15,22,24,0,0,Math.PI*2),e.fill(),e.stroke(),e.fillStyle=d,e.beginPath(),e.ellipse(47,b+6,24,18,-.08,0,Math.PI*2),e.fill(),e.fillStyle=f,e.beginPath(),e.ellipse(33-C*.2,b+22,8,17,.18,0,Math.PI*2),e.ellipse(63+C*.2,b+20,8,15,-.18,0,Math.PI*2),e.fill(),e.fillStyle="#2d2540",s!=="north"&&(e.beginPath(),e.ellipse(40+C,b+16,3,5,0,0,Math.PI*2),e.ellipse(55+C,b+16,3,5,0,0,Math.PI*2),e.fill(),e.fillStyle="#ffffff",e.beginPath(),e.arc(41+C,b+14,1.2,0,Math.PI*2),e.arc(56+C,b+14,1.2,0,Math.PI*2),e.fill(),e.fillStyle=u,e.globalAlpha=.42,e.beginPath(),e.ellipse(32+C,b+25,4,2,0,0,Math.PI*2),e.ellipse(64+C,b+25,4,2,0,0,Math.PI*2),e.fill(),e.globalAlpha=1),e.restore()}static roundRect(e,t,n,r,s,o){e.beginPath(),e.moveTo(t+o,n),e.arcTo(t+r,n,t+r,n+s,o),e.arcTo(t+r,n+s,t,n+s,o),e.arcTo(t,n+s,t,n,o),e.arcTo(t,n,t+r,n,o),e.closePath()}setPath(e){if(this.currentPath=[...e],this.currentPath.length>0){const t=this.currentPath[0];Math.abs(t.x-this.gridX)<.1&&Math.abs(t.y-this.gridY)<.1&&this.currentPath.shift()}}setRemoteTarget(e,t,n){this.targetX=e,this.targetY=t,this.targetZ=n}update(e=1/60){this.isLocal?this.updateLocal(e):this.updateRemote(e),this.updateAnimation(e),this.syncModel()}updateLocal(e){const t=this.speed*Math.min(e,.05);if(this.isMoving=!1,this.currentPath.length>0){const s=this.currentPath[0];this.moveToward(s.x,s.y,t),Math.abs(s.x-this.gridX)<.001&&Math.abs(s.y-this.gridY)<.001&&this.currentPath.shift();return}const n=(this.inputManager.isKeyDown("KeyD")?1:0)-(this.inputManager.isKeyDown("KeyA")?1:0),r=(this.inputManager.isKeyDown("KeyW")?1:0)-(this.inputManager.isKeyDown("KeyS")?1:0);if(n!==0||r!==0){const{mx:s,my:o}=this.getCameraRelativeMovement(n,r),a=this.gridX+s*t,l=this.gridY+o*t,c=this.tryMove(a,this.gridY,s,0),u=this.tryMove(this.gridX,l,0,o);!c&&!u&&this.tryMove(a,l,s,o)}}getCameraRelativeMovement(e,t){return _r.set(0,0,-1).applyQuaternion(this.threeManager.camera.quaternion),_r.y=0,_r.normalize(),vr.set(1,0,0).applyQuaternion(this.threeManager.camera.quaternion),vr.y=0,vr.normalize(),xr.set(vr.x*e+_r.x*t,vr.z*e+_r.z*t),xr.lengthSq()>1&&xr.normalize(),{mx:xr.x,my:xr.y}}moveToward(e,t,n){const r=e-this.gridX,s=t-this.gridY,o=Math.sqrt(r*r+s*s);o<=n?this.tryMove(e,t,r,s):this.tryMove(this.gridX+r/o*n,this.gridY+s/o*n,r,s)}tryMove(e,t,n,r){Math.round(this.gridX),Math.round(this.gridY);const s=Math.round(e),o=Math.round(t),a=this.worldGenerator.getElevation(s,o);return this.worldGenerator.canMoveFootprintBetween(this.gridX,this.gridY,e,t,this.footRadius)?(this.gridX=e,this.gridY=t,this.gridZ=a,this.targetX=e,this.targetY=t,this.targetZ=a,this.setDirection(n,r),this.isMoving=!0,!0):!1}setCollisionDebugVisible(e){this.collisionDisc.visible=e,this.collisionRing.visible=e}setTileOcclusionEnabled(e=!0){this.material.depthTest=e,this.material.depthFunc=Pn,this.material.needsUpdate=!0,St.shadowMaterial.depthTest=e,St.shadowMaterial.depthFunc=Pn,St.shadowMaterial.needsUpdate=!0,this.occlusionMesh.visible=e,this.occlusionShadow.visible=e}updateRemote(e){const t=Math.min(1,e*12),n=this.targetX-this.gridX,r=this.targetY-this.gridY;this.gridX+=n*t,this.gridY+=r*t,this.gridZ+=(this.targetZ-this.gridZ)*t,this.isMoving=Math.sqrt(n*n+r*r)>.01,this.isMoving&&this.setDirection(n,r)}setDirection(e,t){Math.abs(e)>Math.abs(t)?this.direction=e>0?"east":"west":this.direction=t>0?"south":"north"}updateAnimation(e){this.isMoving?(this.frameTimer+=e,this.frameTimer>=Ng&&(this.frameTimer=0,this.frame=(this.frame+1)%vi)):(this.frame=0,this.frameTimer=0),this.updateFrame(this.frame)}updateFrame(e){if(!this.texture)return;const t=bo[this.direction]??bo.south;this.texture.offset.x=e/vi,this.texture.offset.y=1-(t+1)/To}syncModel(){this.visualX+=(this.gridX-this.visualX)*.45,this.visualY+=(this.gridY-this.visualY)*.45,this.visualZ+=(this.gridZ-this.visualZ)*.2;const e=this.visualZ+this.worldGenerator.getTopSurfaceOffset();this.group.position.set(this.visualX,e+Gg,this.visualY),this.mesh.quaternion.copy(this.threeManager.camera.quaternion),this.occlusionMesh.quaternion.copy(this.mesh.quaternion)}getCenterPayload(){return{centerX:this.gridX,centerY:this.gridY,centerZ:this.gridZ}}applyAuthoritativeCenter(e,t,n,r,s,o){const a=Math.sqrt((e-this.gridX)**2+(t-this.gridY)**2);this.gridX=e,this.gridY=t,this.gridZ=n??o,this.targetX=e,this.targetY=t,this.targetZ=n??o,Number.isFinite(r)&&Number.isFinite(s)&&(this.gridZ=o),a>.75&&(this.visualX=this.gridX,this.visualY=this.gridY,this.visualZ=this.gridZ)}destroy(){this.threeManager.removeFromEntities(this.group),this.texture&&this.texture.dispose(),this.material.dispose(),this.occlusionMaterial.dispose()}};an(St,"texturePromise",null),an(St,"geometry",new Lr(Fg,ic)),an(St,"shadowGeometry",new Es(.42,28)),an(St,"collisionGeometry",new Wa(as*.9,as*1.08,36)),an(St,"collisionFillGeometry",new Es(as,36)),an(St,"occlusionShadowMaterial",new Vn({color:10026993,transparent:!0,opacity:.34,depthTest:!0,depthWrite:!1,depthFunc:wr,blending:_s,side:gn})),an(St,"shadowMaterial",new Vn({color:266249,transparent:!0,opacity:.36,depthTest:!0,depthWrite:!1,depthFunc:Pn})),an(St,"collisionMaterial",new Vn({color:3342223,transparent:!0,opacity:1,depthTest:!1,depthWrite:!1,side:gn})),an(St,"collisionFillMaterial",new Vn({color:3342223,transparent:!0,opacity:.18,depthTest:!1,depthWrite:!1,side:gn}));let As=St;class Bg{constructor(){this.keys={},this.wheelDelta=0,this.callbacks={},this.pointerTarget=window,window.addEventListener("keydown",e=>{this.keys[e.code]||this.callbacks[e.code]&&this.callbacks[e.code].forEach(t=>t()),this.keys[e.code]=!0}),window.addEventListener("keyup",e=>{this.keys[e.code]=!1}),window.addEventListener("wheel",e=>{this.wheelDelta=e.deltaY}),this.onClickCallbacks=[],this.mouseNDC={x:0,y:0},this.handleMouseDown=e=>{this.updateMousePosition(e),this.onClickCallbacks.forEach(t=>t(e.button,e))},this.handleMouseMove=e=>this.updateMousePosition(e),this.setPointerTarget(window)}setPointerTarget(e){this.pointerTarget&&(this.pointerTarget.removeEventListener("mousedown",this.handleMouseDown),this.pointerTarget.removeEventListener("mousemove",this.handleMouseMove)),this.pointerTarget=e||window,this.pointerTarget.addEventListener("mousedown",this.handleMouseDown),this.pointerTarget.addEventListener("mousemove",this.handleMouseMove)}updateMousePosition(e){const n=(this.pointerTarget===window?document.documentElement:this.pointerTarget).getBoundingClientRect(),r=n.width||window.innerWidth,s=n.height||window.innerHeight;this.mouseNDC.x=(e.clientX-n.left)/r*2-1,this.mouseNDC.y=-((e.clientY-n.top)/s)*2+1}isKeyDown(e){return!!this.keys[e]}getWheelDelta(){const e=this.wheelDelta;return this.wheelDelta=0,e}onLeftClick(e){this.onClickCallbacks.push(e)}onKeyDown(e,t){this.callbacks[e]||(this.callbacks[e]=[]),this.callbacks[e].push(t)}}class kg{constructor(e){this.worldGenerator=e}findPath(e,t,n,r){const s={x:Math.round(e),y:Math.round(t)},o={x:Math.round(n),y:Math.round(r)};if(!this.worldGenerator.isWalkable(o.x,o.y))return[];const a=[s],l=new Map,c=new Set,u=new Map;u.set(`${s.x},${s.y}`,0);const d=new Map;for(d.set(`${s.x},${s.y}`,this.heuristic(s,o));a.length>0;){let f=a[0],v=0;for(let y=1;y<a.length;y++){const _=a[y];(d.get(`${_.x},${_.y}`)??1/0)<(d.get(`${f.x},${f.y}`)??1/0)&&(f=_,v=y)}if(f.x===o.x&&f.y===o.y)return this.reconstructPath(l,f);a.splice(v,1),c.add(`${f.x},${f.y}`);const x=[{x:f.x+1,y:f.y,isDiag:!1},{x:f.x-1,y:f.y,isDiag:!1},{x:f.x,y:f.y+1,isDiag:!1},{x:f.x,y:f.y-1,isDiag:!1},{x:f.x+1,y:f.y+1,isDiag:!0},{x:f.x+1,y:f.y-1,isDiag:!0},{x:f.x-1,y:f.y+1,isDiag:!0},{x:f.x-1,y:f.y-1,isDiag:!0}];for(const y of x){const _=`${y.x},${y.y}`;if(c.has(_))continue;const p=this.worldGenerator.getMoveCost(f.x,f.y,y.x,y.y,y.isDiag);if(!Number.isFinite(p))continue;const b=(u.get(`${f.x},${f.y}`)??1/0)+p;b<(u.get(_)??1/0)&&(l.set(_,f),u.set(_,b),d.set(_,b+this.heuristic(y,o)),a.find(C=>C.x===y.x&&C.y===y.y)||a.push(y))}}return[]}heuristic(e,t){const n=Math.abs(e.x-t.x),r=Math.abs(e.y-t.y);return 1*Math.max(n,r)+(1.414-1)*Math.min(n,r)}reconstructPath(e,t){const n=[t];let r=`${t.x},${t.y}`;for(;e.has(r);)t=e.get(r),n.unshift(t),r=`${t.x},${t.y}`;return n}}class zg{constructor(e,t,n){this.threeManager=e,this.worldGenerator=t,this.id=n.id,this.species=n.species,this.habitat=n.habitat,this.homeX=n.x,this.homeY=n.y,this.leashRadius=n.leashRadius||4,this.gridX=n.x,this.gridY=n.y,this.gridZ=this.worldGenerator.getElevation(n.x,n.y),this.visualZ=this.gridZ,this.speed=1.35,this.idleTimer=.4,this.target=null,this.bobTime=Math.random()*Math.PI*2,this.group=this.createModel(),this.threeManager.addToEntities(this.group),this.syncModel()}createModel(){const e=new fn,t=new pn({color:13279599,roughness:.8}),n=new pn({color:16114888,roughness:.85}),r=new pn({color:5256745,roughness:.75}),s=new nt(new oi(.28,16,12),t);s.scale.set(1.25,.72,.82),s.position.set(0,.22,0),e.add(s);const o=new nt(new oi(.16,12,8),n);o.scale.set(1.1,.7,.55),o.position.set(.15,.2,.02),e.add(o);const a=new nt(new oi(.16,14,10),t);a.position.set(.33,.31,0),e.add(a);const l=new Ha(.045,.32,8),c=new nt(l,t);c.position.set(.34,.56,-.07),c.rotation.z=-.28,e.add(c);const u=new nt(l,t);u.position.set(.34,.56,.07),u.rotation.z=-.18,e.add(u);const d=new nt(new oi(.035,8,6),r);d.position.set(.48,.31,0),e.add(d);const f=new nt(new oi(.09,10,8),n);return f.position.set(-.33,.26,0),e.add(f),e.scale.set(.8,.8,.8),e.userData.wildlife=this,e}update(e){if(this.bobTime+=e*5,this.target||(this.idleTimer-=e,this.idleTimer<=0&&(this.target=this.pickTarget(),this.idleTimer=1.2+Math.random()*2.4)),this.target){const t=this.target.x-this.gridX,n=this.target.y-this.gridY,r=Math.sqrt(t*t+n*n),s=this.speed*Math.min(e,.05);if(r<=s)this.gridX=this.target.x,this.gridY=this.target.y,this.gridZ=this.worldGenerator.getElevation(this.gridX,this.gridY),this.target=null;else{this.gridX+=t/r*s,this.gridY+=n/r*s;const o=Math.round(this.gridX),a=Math.round(this.gridY);this.gridZ=this.worldGenerator.getElevation(o,a),this.group.rotation.y=t<0?Math.PI:0}}this.syncModel()}pickTarget(){const e=[];for(let t=this.homeX-this.leashRadius;t<=this.homeX+this.leashRadius;t++)for(let n=this.homeY-this.leashRadius;n<=this.homeY+this.leashRadius;n++)Math.sqrt((t-this.homeX)**2+(n-this.homeY)**2)>this.leashRadius||this.worldGenerator.supportsHabitat(t,n,this.habitat)&&e.push({x:t,y:n});return e.length===0?null:e[Math.floor(Math.random()*e.length)]}syncModel(){this.visualZ+=(this.gridZ-this.visualZ)*.18;const e=this.target?Math.abs(Math.sin(this.bobTime))*.08:0;this.group.position.set(this.gridX,this.visualZ+1.05+e,this.gridY)}destroy(){this.group.traverse(e=>{e.geometry&&e.geometry.dispose(),e.material&&e.material.dispose()}),this.threeManager.removeFromEntities(this.group)}}const Hg={meadowHare:zg};class rc{constructor(e,t,n=[]){this.threeManager=e,this.worldGenerator=t,this.wildlife=[],this.spawnAll(n)}spawnAll(e){for(const t of e)this.spawn(t)}spawn(e){const t=Hg[e.species];if(!t)return console.warn(`[WildlifeSystem] Unknown species "${e.species}" ignored.`),null;const n=this.worldGenerator.supportsHabitat(e.x,e.y,e.habitat)?{x:e.x,y:e.y}:this.worldGenerator.findNearestHabitat(e.x,e.y,e.habitat,12);if(!n)return console.warn(`[WildlifeSystem] No "${e.habitat}" habitat found for ${e.id}.`),null;const r={...e,x:n.x,y:n.y},s=new t(this.threeManager,this.worldGenerator,r);return this.wildlife.push(s),s}update(e){for(const t of this.wildlife)t.update(e)}destroy(){this.wildlife.forEach(e=>e.destroy()),this.wildlife=[]}}const rn={stoneWall:"A",timberWall:"C",stoneWindowNorth:"N",stoneWindowSouth:"O",stoneWindowWest:"J",stoneWindowEast:"K",timberWindowNorth:"Q",timberWindowSouth:"V",timberWindowWest:"Y",timberWindowEast:"Z",door:"D",floor:"E",stairs:"U",stairsNorth:"1",stairsSouth:"2",stairsWest:"3",stairsEast:"4",timberStairsNorth:"5",timberStairsSouth:"6",timberStairsWest:"7",timberStairsEast:"8",approach:"R"},Wg=[{id:"guild-hall",name:"Guild Hall",x:-11,y:-8,width:8,height:6,stories:3,style:"timber",doorStyle:"oak",door:{x:4,y:5},stairs:[{x:1,y:1,direction:"north"}]},{id:"village-inn",name:"Village Inn",x:3,y:-8,width:8,height:6,stories:1,style:"stone",doorStyle:"iron",door:{x:4,y:5},stairs:[{x:6,y:1,direction:"north"}]},{id:"craft-house",name:"Craft House",x:-10,y:3,width:7,height:6,stories:1,style:"timber",doorStyle:"painted",door:{x:3,y:0},stairs:[{x:5,y:4,direction:"south"}]},{id:"general-store",name:"General Store",x:3,y:3,width:7,height:6,stories:1,style:"stone",doorStyle:"oak",door:{x:3,y:0},stairs:[{x:1,y:4,direction:"south"}]},{id:"watch-house",name:"Watch House",x:12,y:-2,width:5,height:5,stories:2,style:"stone",doorStyle:"iron",door:{x:0,y:2},stairs:[{x:3,y:3,direction:"east"}]}];function Vg(i,e=[]){var o,a,l,c;if(!Array.isArray(i)||i.length===0)return i;const t=i.length,n=((o=i[0])==null?void 0:o.length)||0,r=Math.floor(n/2),s=Math.floor(t/2);for(const u of e){const d=Math.max(2,Math.min(6,Math.floor(u.stories||1)*2));for(let f=0;f<u.height;f++)for(let v=0;v<u.width;v++){const x=v===0||f===0||v===u.width-1||f===u.height-1,y=((a=u.door)==null?void 0:a.x)===v&&((l=u.door)==null?void 0:l.y)===f;if(!x||y)continue;const _=u.y+f+s,p=u.x+v+r;(c=i[_])!=null&&c[p]&&(i[_][p].height=d)}}return i}function Xg(i,e=[]){var r,s;if(!Array.isArray(i)||i.length===0)return i;const t=Math.floor((((r=i[0])==null?void 0:r.length)||0)/2),n=Math.floor(i.length/2);for(const o of e){if(!o.door)continue;const a=o.y+o.door.y+n,l=o.x+o.door.x+t,c=(s=i[a])==null?void 0:s[l];c&&(c.texture=Ql[o.doorStyle]||Ql.oak)}return i}function $g(i,e=Wg,t={}){if(!Array.isArray(i)||i.length===0)return i;const n=i.map(l=>l.split("")),r=n.length,s=n[0].length,o=Math.floor(s/2),a=Math.floor(r/2);Yg(n,e,o,a,t);for(const l of e)Zg(n,l,o,a),Kg(n,l,o,a);return n.map(l=>l.join(""))}function Yg(i,e,t,n,r){var s;for(const o of e){for(let l=-1;l<=o.height;l++)for(let c=-1;c<=o.width;c++){const u=o.y+l+n,d=o.x+c+t;(s=i[u])!=null&&s[d]&&(i[u][d]=rn.approach)}const a=jg(o);a&&r.villageCenter&&r.connectDoors!==!1&&qg(i,a,{x:r.villageCenter.x-t,y:r.villageCenter.y-n},t,n)}}function qg(i,e,t,n,r){let s=e.x,o=e.y;for(;s!==t.x;)wo(i,s,o,n,r),s+=Math.sign(t.x-s);for(;o!==t.y;)wo(i,s,o,n,r),o+=Math.sign(t.y-o);wo(i,s,o,n,r)}function wo(i,e,t,n,r){var a;const s=t+r,o=e+n;(a=i[s])!=null&&a[o]&&(i[s][o]=rn.approach)}function jg(i){if(!i.door)return null;const e=Ya(i,i.door.x,i.door.y),t=th(e);return t?{x:i.x+i.door.x+t.x,y:i.y+i.door.y+t.y}:null}function Zg(i,e,t,n){var o,a,l;const r=e.style==="stone"?rn.stoneWall:rn.timberWall,s=new Set((e.stairs||[]).map(c=>`${c.x},${c.y}`));for(let c=0;c<e.height;c++)for(let u=0;u<e.width;u++){const d=e.y+c+n,f=e.x+u+t;if(!((o=i[d])!=null&&o[f])||!t0(i[d][f]))continue;const v=u===0||c===0||u===e.width-1||c===e.height-1,x=((a=e.door)==null?void 0:a.x)===u&&((l=e.door)==null?void 0:l.y)===c,y=s.has(`${u},${c}`),_=Ya(e,u,c);if(x)i[d][f]=rn.door;else if(y){const p=(e.stairs||[]).find(b=>b.x===u&&b.y===c);i[d][f]=e0(p==null?void 0:p.direction,e.style)}else Jg(e,u,c,_)?i[d][f]=Qg(e.style,_):i[d][f]=v?r:rn.floor}}function Kg(i,e,t,n){var u;if(!e.door)return;const r=Ya(e,e.door.x,e.door.y),s=th(r);if(!s)return;const o=e.y+e.door.y+n,a=e.x+e.door.x+t,l=o+s.y,c=a+s.x;(u=i[l])!=null&&u[c]&&n0(i[l][c])&&(i[l][c]=rn.approach)}function Jg(i,e,t,n){return!n||(e===0||e===i.width-1)&&(t===0||t===i.height-1)?!1:(e+t+i.id.length)%2===0}function Ya(i,e,t){return t===0?"north":t===i.height-1?"south":e===0?"west":e===i.width-1?"east":null}function th(i){return{north:{x:0,y:-1},south:{x:0,y:1},west:{x:-1,y:0},east:{x:1,y:0}}[i]||null}function Qg(i,e){const t=i==="stone"?"stone":"timber",n=e.charAt(0).toUpperCase()+e.slice(1);return rn[`${t}Window${n}`]||rn[`${t}Wall`]}function e0(i="north",e="stone"){const t=i.charAt(0).toUpperCase()+i.slice(1);return e==="timber"?rn[`timberStairs${t}`]||rn.stairs:rn[`stairs${t}`]||rn.stairs}function t0(i){return["G","F","S","H","R",rn.floor].includes(i)}function n0(i){return["G","F","S","H","R"].includes(i)}const i0={seed:20260625,width:40,height:32,center:{x:22,y:11},townName:"Aldermere",rows:["WBSSGSGGSGGGSGGGGGSGSGGGGGSGGGGSSGGGGGGS","WWSSGGGSGGGSGGSGGGSGSGGGSGGGSSGGGGGGGGGG","WSSGGGGGGGGGGGGGGGGGGGRGGGGGGGGGGGGGGGGG","WSSGGGGGGGGGGGGGGGGGGGRGGGGGGGGGGGGHGGGS","WBSGGGGFGGGGGGFGGFGGFGRGGGFGGGGGFGGHGGGG","WBSSFGGGGGGGGGGFFGGGGFRGGGFGFHGGGFGGGGHG","WWWSGFGFFGGGGGFFGGGGGFRGGFGGGGFGGGGGGGGS","WWBSSGGGGGFGGFFGFGGGGGRGGGFGGGGGGGGGGGSG","BWBWSGGGGFGGGGGGGGGGGGRFGGGGGHFGGGGGGGSS","WBWBSFGGFGFGGGGGRGGGRRRRRGFGRHGFGGGGGGGG","WBWWBWGGGFGGGFGFRFGGRRRRRGGFRFHFGGGGGGGG","BBWBBWRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRGS","BWBWWGGGGGFGFGGGGRGGRRRRRFGGGGGFRGGGGGGG","WWBBBGGGGGFFGGGGGRGGRRRRRRGGGGGGGGGFGGGG","WWSSGGGFGGFGGGGGGRGGGGRGFRGFFGGGGGGFGGSG","WBSSGGGGGGGFGGGGGRGGGGRFGRGGGGFGGGGFGGHG","WWSGGFGGFGGGGGGGGFGFGGRGGGGGGFGGGGGGGGGG","WSSGGFGGGFGFGGGGFGGGGRRGFGGGGGFGGFGGGGSG","WBSGGGGGGGFGGGGGFFGGGGRGGGGGGFGGGGGGGGSG","BBSGGGFGGFFGGGGGGGGGGGRGFGGGGFGGGGFHGGSS","BWSSGFFGGGFGGGGFGGFFFGRGGGGGGGFGGHGGGGSS","WBBSFFGGGGFGGGFGGFGGFGRGGGGGGGGGGGGGHGGG","WBWSSGGGGGGFGGFFGGGGGGRGGGFGGGGGGGGGGGGG","WWWWSGFGGGGGGGGFGGGGGGRFFFGFGGGGGGGGGGGG","WBBWSSGGGFFGGGFGFGFFGGRGFGGGFGGFGGGGGGGG","WBBBSSGGGGGGGGGGGGGGGGRGGFGGGGFFGGFGHGSG","BWBBSGGGGGGFFFGGGGGGGFRGGGGGGGGGFGFGGGGG","BBBSSGGFGFGFFGGGGGGFFGRGFFGGFFGGFGFGHGGG","BWWSGHGGGGGGGGGGGGGHGGRGGGHGGHGGGGGGGGGS","WWSSGGGGGGHGGGHGGGGGGGRGGGGGHGGGGGGGGGGG","WWSGGGGGGGGGGSGGGGGGGGGGGGGGGGGGGGGGHGSG","WWSGSSGGSGGSGGGGSGSSGSSSGSSGGGGGGGGGGHGS"],buildings:[{id:"hall-0",name:"Aldermere Hall",x:-7,y:-13,width:7,height:6,stories:3,style:"stone",doorStyle:"oak",door:{x:3,y:5},stairs:[{x:1,y:1,direction:"north"}]},{id:"inn-1",name:"Aldermere Inn",x:5,y:-12,width:7,height:5,stories:2,style:"timber",doorStyle:"iron",door:{x:3,y:4},stairs:[{x:5,y:1,direction:"north"}]},{id:"smithy-2",name:"Aldermere Smithy",x:-9,y:-3,width:6,height:5,stories:1,style:"timber",doorStyle:"painted",door:{x:5,y:2},stairs:[{x:1,y:1,direction:"west"}]},{id:"market-3",name:"Aldermere Market",x:6,y:-3,width:6,height:5,stories:2,style:"stone",doorStyle:"oak",door:{x:0,y:2},stairs:[{x:4,y:1,direction:"east"}]},{id:"house-4",name:"Aldermere House",x:-2,y:2,width:6,height:5,stories:1,style:"timber",doorStyle:"iron",door:{x:3,y:0},stairs:[{x:4,y:3,direction:"south"}]},{id:"watch-5",name:"Aldermere Watch House",x:13,y:-6,width:5,height:5,stories:2,style:"stone",doorStyle:"painted",door:{x:0,y:2},stairs:[{x:3,y:1,direction:"east"}]}]},sc=40,oc=32,r0=[{id:"hall",role:"Hall",dx:-9,dy:-8,width:7,height:6,doorEdge:"south",stories:3},{id:"inn",role:"Inn",dx:3,dy:-7,width:7,height:5,doorEdge:"south",stories:2},{id:"smithy",role:"Smithy",dx:-11,dy:2,width:6,height:5,doorEdge:"east",stories:1},{id:"market",role:"Market",dx:4,dy:2,width:6,height:5,doorEdge:"west",stories:2},{id:"house",role:"House",dx:-4,dy:7,width:6,height:5,doorEdge:"north",stories:1},{id:"watch",role:"Watch House",dx:11,dy:-1,width:5,height:5,doorEdge:"west",stories:2}],ac=["Ash","Alder","Briar","Dun","Elder","Fal","Green","High","Oak","Raven","Stone","Willow"],lc=["bridge","brook","ford","haven","mere","ridge","stead","vale","watch","wick"],hc=["oak","iron","painted"];function s0(i={}){const e=Math.max(sc,Math.floor(i.width||sc)),t=Math.max(oc,Math.floor(i.height||oc)),n=v0(i.seed),r=x0(n),s=o0(e,t,n),o=a0(s,r),a=_0(r),l=l0(e,t,o,a,r);return c0(s,o,l),{seed:n,width:e,height:t,center:o,townName:a,rows:s.map(c=>c.join("")),buildings:l}}function o0(i,e,t){const n=Array.from({length:e},()=>Array(i).fill("G")),r=e*.36;for(let s=0;s<e;s++)for(let o=0;o<i;o++){const a=Math.min(o,s,i-o-1,e-s-1),l=2.2+Math.sin(s*.43+t*.001)*1.25,c=l+1.6,u=Ao(o,s,t+191),d=Ao(o,s,t+557)+Ao(o*.42,s*.42,t+811)*.55;o<l||o<l+2&&Math.abs(s-r)<2?n[s][o]=u>.25?"B":"W":o<c||a<=1&&d<-.42?n[s][o]="S":d>1.08&&(o>i*.72||s>e*.76)?n[s][o]="H":u>.57&&a>3&&(n[s][o]="F")}return n}function a0(i,e){var s;const t=i.length,n=i[0].length;let r={x:Math.floor(n/2),y:Math.floor(t/2),score:-1/0};for(let o=10;o<t-10;o++)for(let a=13;a<n-14;a++){let l=e()*.2;for(let c=-9;c<=9;c++)for(let u=-12;u<=12;u++){const d=(s=i[o+c])==null?void 0:s[a+u];d==="G"?l+=1:d==="F"?l+=.58:d==="S"?l+=.18:d==="H"?l-=.8:(d==="W"||d==="B")&&(l-=3)}l-=Math.abs(a-n*.54)*.3,l-=Math.abs(o-t*.5)*.2,l>r.score&&(r={x:a,y:o,score:l})}return{x:r.x,y:r.y}}function l0(i,e,t,n,r){const s=Math.floor(i/2),o=Math.floor(e/2),a=t.x-s,l=t.y-o;return r0.map((c,u)=>{const d=p0(c.width,c.height,c.doorEdge);return{id:`${c.id}-${u}`,name:c.role==="Hall"?`${n} Hall`:`${n} ${c.role}`,x:a+c.dx,y:l+c.dy,width:c.width,height:c.height,stories:c.stories,style:u%3===0||r()>.56?"stone":"timber",doorStyle:hc[u%hc.length],door:d,stairs:[{...m0(c.width,c.height,c.doorEdge,u),direction:g0(c.doorEdge)}]}})}function c0(i,e,t){var c;const n=i.length,r=i[0].length,s=Math.floor(r/2),o=Math.floor(n/2),a=2;for(let u=e.y-a;u<=e.y+a;u++)for(let d=e.x-a;d<=e.x+a;d++)nh((c=i[u])==null?void 0:c[d])&&(i[u][d]="R");const l=[{x:Math.max(4,Math.floor(r*.16)),y:e.y},{x:r-3,y:e.y},{x:e.x,y:2},{x:e.x,y:n-3}];for(const u of l)uc(i,e,u);for(const u of t){const d=f0(u);d&&uc(i,{x:d.x+s,y:d.y+o},e)}}function uc(i,e,t){var r;const n=h0(i,e,t);for(const s of n)nh((r=i[s.y])==null?void 0:r[s.x])&&(i[s.y][s.x]="R")}function h0(i,e,t){const n=i.length,r=i[0].length,s=`${e.x},${e.y}`,o=[{...e,priority:0}],a=new Map,l=new Map([[s,0]]);for(;o.length>0;){o.sort((f,v)=>f.priority-v.priority);const d=o.shift();if(d.x===t.x&&d.y===t.y)break;for(const f of ih){const v={x:d.x+f.x,y:d.y+f.y};if(v.x<1||v.y<1||v.x>=r-1||v.y>=n-1)continue;const x=u0(i[v.y][v.x]);if(!Number.isFinite(x))continue;const y=`${v.x},${v.y}`,_=(l.get(`${d.x},${d.y}`)||0)+x;_>=(l.get(y)??1/0)||(l.set(y,_),a.set(y,d),v.priority=_+Math.abs(t.x-v.x)+Math.abs(t.y-v.y),o.push(v))}}const c=[];let u=t;for(;u&&`${u.x},${u.y}`!==s;)c.push(u),u=a.get(`${u.x},${u.y}`);return u&&c.push(e),c.reverse()}function u0(i){return i==="W"||i==="B"?1/0:i==="R"?.45:i==="H"?4.2:i==="F"?1.35:i==="S"?1.2:1}function f0(i){const e=d0(i),t=ih.find(n=>n.name===e);return t?{x:i.x+i.door.x+t.x,y:i.y+i.door.y+t.y}:null}function d0(i){return i.door.y===0?"north":i.door.y===i.height-1?"south":i.door.x===0?"west":"east"}function p0(i,e,t){return t==="north"?{x:Math.floor(i/2),y:0}:t==="south"?{x:Math.floor(i/2),y:e-1}:t==="west"?{x:0,y:Math.floor(e/2)}:{x:i-1,y:Math.floor(e/2)}}function m0(i,e,t,n){return t==="north"?{x:n%2?1:i-2,y:e-2}:t==="south"?{x:n%2?i-2:1,y:1}:t==="west"?{x:i-2,y:n%2?1:e-2}:{x:1,y:n%2?e-2:1}}function g0(i){return{north:"south",south:"north",east:"west",west:"east"}[i]||"north"}function _0(i){const e=ac[Math.floor(i()*ac.length)],t=lc[Math.floor(i()*lc.length)];return`${e}${t}`}function v0(i){const e=Number(i);return Number.isFinite(e)?Math.abs(Math.floor(e))||1:Date.now()}function x0(i){let e=i;return()=>(e=(e*1664525+1013904223)%4294967296,e/4294967296)}function Ao(i,e,t){const n=Math.sin((i+t*.017)*12.9898+(e-t*.011)*78.233)*43758.5453;return(n-Math.floor(n))*2-1}function nh(i){return["G","F","S","H","R"].includes(i)}const ih=[{name:"north",x:0,y:-1},{name:"south",x:0,y:1},{name:"west",x:-1,y:0},{name:"east",x:1,y:0}],ls=16,Tr=rh(i0),fc=[{id:"meadow-hare-01",species:"meadowHare",habitat:"meadow",x:-8,y:-4,leashRadius:4}];function S0(i=40,e=32,t=Date.now(),n={}){const r=s0({width:i,height:e,seed:t,...n});return rh(r)}function rh(i){const e=i.buildings||[],t=$g(i.rows,e,{villageCenter:i.center,connectDoors:!1}),n=Jc(t);return Vg(n,e),Xg(n,e),n.buildings=e,n.seed=i.seed,n.townName=i.townName,n.townCenter=i.center,n.spawn={x:i.center.x-Math.floor(i.width/2),y:i.center.y-Math.floor(i.height/2)},n.generator="azgaar-inspired-small-town-v1",n}class M0{constructor(e){this.onApplyMap=e.onApplyMap,this.onRandomizeMap=e.onRandomizeMap,this.onStartCombat=e.onStartCombat,this.onToggleCollisionDebug=e.onToggleCollisionDebug,this.collisionDebugEnabled=!1,this.toggleButton=document.getElementById("admin-toggle"),this.panel=document.getElementById("admin-panel"),this.mapInput=document.getElementById("map-array-input"),this.message=document.getElementById("admin-message"),this.applyButton=document.getElementById("apply-map-button"),this.randomButton=document.getElementById("random-map-button"),this.combatButton=document.getElementById("start-combat-button"),this.collisionButton=document.getElementById("collision-debug-button"),this.closeButton=document.getElementById("admin-close-button"),this.mapInput.value=Eo(Tr),this.bindEvents()}bindEvents(){this.toggleButton.addEventListener("click",()=>this.setOpen(!this.panel.classList.contains("is-open"))),this.closeButton.addEventListener("click",()=>this.setOpen(!1)),this.applyButton.addEventListener("click",()=>this.applyCurrentMap()),this.randomButton.addEventListener("click",()=>this.randomizeMap()),this.collisionButton.addEventListener("click",()=>this.toggleCollisionDebug()),this.combatButton.addEventListener("click",()=>{this.setOpen(!1),this.onStartCombat()})}setOpen(e){this.panel.classList.toggle("is-open",e),this.toggleButton.setAttribute("aria-expanded",String(e))}applyCurrentMap(){try{const e=this.parseMapRows(this.mapInput.value);this.onApplyMap(e),this.setMessage(`Applied ${e[0].length} x ${e.length} array map.`,"success")}catch(e){this.setMessage(e.message,"error")}}randomizeMap(){const e=S0();this.mapInput.value=Eo(e),this.onRandomizeMap(e),this.setMessage(`Randomized ${e[0].length} x ${e.length} world.`,"success")}toggleCollisionDebug(){this.collisionDebugEnabled=!this.collisionDebugEnabled,this.collisionButton.setAttribute("aria-pressed",String(this.collisionDebugEnabled)),this.collisionButton.classList.toggle("is-active",this.collisionDebugEnabled),this.onToggleCollisionDebug(this.collisionDebugEnabled),this.setMessage(this.collisionDebugEnabled?"Collision foot area visible.":"Collision foot area hidden.","success")}parseMapRows(e){const t=e.trim(),n=t.startsWith("[")?this.parseJsonMapRows(t):this.parseSymbolMapRows(t);return this.validateRectangularRows(n),n}parseJsonMapRows(e){let t;try{t=JSON.parse(e)}catch(r){throw new Error(`Map JSON is invalid: ${r.message}`)}if(!Array.isArray(t))throw new Error("Map JSON must be an array of rows.");const n=t.map(r=>{if(!Array.isArray(r))throw new Error("Each map row in JSON must be an array.");return r.map(s=>$a(s))});return Qc(n)}parseSymbolMapRows(e){const t=e.split(`
`).map(s=>s.trim().toUpperCase()).filter(Boolean);if(t.length<4)throw new Error("Map needs at least 4 rows.");const n=t[0].length;if(n<4)throw new Error("Map rows need at least 4 columns.");const r=new Set(Lg);for(const s of t){if(s.length!==n)throw new Error("Every map row must have the same width.");for(const o of s)if(!r.has(o))throw new Error(`Unknown map symbol "${o}".`)}return Jc(t)}validateRectangularRows(e){var n;if(e.length<4)throw new Error("Map needs at least 4 rows.");const t=((n=e[0])==null?void 0:n.length)||0;if(t<4)throw new Error("Map rows need at least 4 columns.");if(e.some(r=>r.length!==t))throw new Error("Every map row must have the same width.")}setMapRows(e){this.mapInput.value=Eo(e)}setMessage(e,t="neutral"){this.message.textContent=e,this.message.dataset.tone=t}}class dc{constructor(e){this.client=e.client,this.userId=e.userId,this.onExit=e.onExit,this.overlay=document.getElementById("combat-scene"),this.status=document.getElementById("combat-status"),this.roundReadout=document.getElementById("combat-round"),this.turnReadout=document.getElementById("combat-turn"),this.partyList=document.getElementById("combat-party-list"),this.enemyList=document.getElementById("combat-enemy-list"),this.log=document.getElementById("combat-log"),this.attackButton=document.getElementById("combat-attack-button"),this.guardButton=document.getElementById("combat-guard-button"),this.readyButton=document.getElementById("combat-ready-button"),this.leaveButton=document.getElementById("combat-leave-button"),this.attackButton.addEventListener("click",()=>this.sendAction("attack")),this.guardButton.addEventListener("click",()=>this.sendAction("guard")),this.readyButton.addEventListener("click",()=>this.sendAction("ready")),this.leaveButton.addEventListener("click",()=>this.leave())}async enter(e="meadow-hare-demo"){if(this.overlay.classList.add("is-open"),!this.client){this.setStatus("Combat unavailable while offline.");return}this.setStatus("Joining co-op combat...");try{this.room=await this.client.joinOrCreate("combat",{userId:this.userId,encounterId:e}),this.bindRoom(),this.setStatus("Co-op combat ready.")}catch(t){console.error("[CombatScene] Failed to join combat:",t),this.setStatus("Could not join combat room.")}}bindRoom(){this.room&&(this.room.onMessage("combat:snapshot",e=>this.renderSnapshot(e)),this.room.onMessage("combat:log",e=>this.appendLog(e.message)))}sendAction(e){if(!this.room){this.appendLog("No combat room connected.");return}const t=e==="attack"?"wildlife_meadow_hare":"";this.room.send("combat:action",{action:e,targetId:t})}renderSnapshot(e){this.roundReadout.textContent=`${e.round}`,this.turnReadout.textContent=e.activeActorId||"Waiting",this.renderList(this.partyList,e.party||[],"ally"),this.renderList(this.enemyList,e.enemies||[],"enemy"),this.setStatus(e.phase==="planning"?"Choose an action.":"Resolving turn.")}renderList(e,t,n){e.innerHTML="";for(const r of t){const s=document.createElement("li");s.className=`combat-actor ${n}`;const o=document.createElement("span");o.textContent=r.name;const a=document.createElement("meter");a.min=0,a.max=r.maxHp,a.value=r.hp;const l=document.createElement("strong");l.textContent=`${r.hp}/${r.maxHp}`,s.append(o,a,l),e.appendChild(s)}}appendLog(e){const t=document.createElement("li");for(t.textContent=e,this.log.prepend(t);this.log.children.length>5;)this.log.removeChild(this.log.lastChild)}setStatus(e){this.status.textContent=e}async leave(){var e;this.room&&(await this.room.leave(),this.room=null),this.overlay.classList.remove("is-open"),(e=this.onExit)==null||e.call(this)}}var Ut=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function y0(i){if(i.__esModule)return i;var e=i.default;if(typeof e=="function"){var t=function n(){return this instanceof n?Reflect.construct(e,arguments,this.constructor):e.apply(this,arguments)};t.prototype=e.prototype}else t={};return Object.defineProperty(t,"__esModule",{value:!0}),Object.keys(i).forEach(function(n){var r=Object.getOwnPropertyDescriptor(i,n);Object.defineProperty(t,n,r.get?r:{enumerable:!0,get:function(){return i[n]}})}),t}var sh={};ArrayBuffer.isView||(ArrayBuffer.isView=i=>i!==null&&typeof i=="object"&&i.buffer instanceof ArrayBuffer);typeof globalThis>"u"&&typeof window<"u"&&(window.globalThis=window);var er={},Ds={};(function(i){Object.defineProperty(i,"__esModule",{value:!0}),i.ServerError=i.CloseCode=void 0,function(t){t[t.CONSENTED=4e3]="CONSENTED",t[t.DEVMODE_RESTART=4010]="DEVMODE_RESTART"}(i.CloseCode||(i.CloseCode={}));class e extends Error{constructor(n,r){super(r),this.name="ServerError",this.code=n}}i.ServerError=e})(Ds);var Ur={},tr={};Object.defineProperty(tr,"__esModule",{value:!0});tr.decode=tr.encode=void 0;function ar(i,e){if(this._offset=e,i instanceof ArrayBuffer)this._buffer=i,this._view=new DataView(this._buffer);else if(ArrayBuffer.isView(i))this._buffer=i.buffer,this._view=new DataView(this._buffer,i.byteOffset,i.byteLength);else throw new Error("Invalid argument")}function E0(i,e,t){for(var n="",r=0,s=e,o=e+t;s<o;s++){var a=i.getUint8(s);if(!(a&128)){n+=String.fromCharCode(a);continue}if((a&224)===192){n+=String.fromCharCode((a&31)<<6|i.getUint8(++s)&63);continue}if((a&240)===224){n+=String.fromCharCode((a&15)<<12|(i.getUint8(++s)&63)<<6|(i.getUint8(++s)&63)<<0);continue}if((a&248)===240){r=(a&7)<<18|(i.getUint8(++s)&63)<<12|(i.getUint8(++s)&63)<<6|(i.getUint8(++s)&63)<<0,r>=65536?(r-=65536,n+=String.fromCharCode((r>>>10)+55296,(r&1023)+56320)):n+=String.fromCharCode(r);continue}throw new Error("Invalid byte "+a.toString(16))}return n}ar.prototype._array=function(i){for(var e=new Array(i),t=0;t<i;t++)e[t]=this._parse();return e};ar.prototype._map=function(i){for(var e="",t={},n=0;n<i;n++)e=this._parse(),t[e]=this._parse();return t};ar.prototype._str=function(i){var e=E0(this._view,this._offset,i);return this._offset+=i,e};ar.prototype._bin=function(i){var e=this._buffer.slice(this._offset,this._offset+i);return this._offset+=i,e};ar.prototype._parse=function(){var i=this._view.getUint8(this._offset++),e,t=0,n=0,r=0,s=0;if(i<192)return i<128?i:i<144?this._map(i&15):i<160?this._array(i&15):this._str(i&31);if(i>223)return(255-i+1)*-1;switch(i){case 192:return null;case 194:return!1;case 195:return!0;case 196:return t=this._view.getUint8(this._offset),this._offset+=1,this._bin(t);case 197:return t=this._view.getUint16(this._offset),this._offset+=2,this._bin(t);case 198:return t=this._view.getUint32(this._offset),this._offset+=4,this._bin(t);case 199:if(t=this._view.getUint8(this._offset),n=this._view.getInt8(this._offset+1),this._offset+=2,n===-1){var o=this._view.getUint32(this._offset);return r=this._view.getInt32(this._offset+4),s=this._view.getUint32(this._offset+8),this._offset+=12,new Date((r*4294967296+s)*1e3+o/1e6)}return[n,this._bin(t)];case 200:return t=this._view.getUint16(this._offset),n=this._view.getInt8(this._offset+2),this._offset+=3,[n,this._bin(t)];case 201:return t=this._view.getUint32(this._offset),n=this._view.getInt8(this._offset+4),this._offset+=5,[n,this._bin(t)];case 202:return e=this._view.getFloat32(this._offset),this._offset+=4,e;case 203:return e=this._view.getFloat64(this._offset),this._offset+=8,e;case 204:return e=this._view.getUint8(this._offset),this._offset+=1,e;case 205:return e=this._view.getUint16(this._offset),this._offset+=2,e;case 206:return e=this._view.getUint32(this._offset),this._offset+=4,e;case 207:return r=this._view.getUint32(this._offset)*Math.pow(2,32),s=this._view.getUint32(this._offset+4),this._offset+=8,r+s;case 208:return e=this._view.getInt8(this._offset),this._offset+=1,e;case 209:return e=this._view.getInt16(this._offset),this._offset+=2,e;case 210:return e=this._view.getInt32(this._offset),this._offset+=4,e;case 211:return r=this._view.getInt32(this._offset)*Math.pow(2,32),s=this._view.getUint32(this._offset+4),this._offset+=8,r+s;case 212:if(n=this._view.getInt8(this._offset),this._offset+=1,n===0){this._offset+=1;return}return[n,this._bin(1)];case 213:return n=this._view.getInt8(this._offset),this._offset+=1,[n,this._bin(2)];case 214:return n=this._view.getInt8(this._offset),this._offset+=1,n===-1?(e=this._view.getUint32(this._offset),this._offset+=4,new Date(e*1e3)):[n,this._bin(4)];case 215:if(n=this._view.getInt8(this._offset),this._offset+=1,n===0)return r=this._view.getInt32(this._offset)*Math.pow(2,32),s=this._view.getUint32(this._offset+4),this._offset+=8,new Date(r+s);if(n===-1){r=this._view.getUint32(this._offset),s=this._view.getUint32(this._offset+4),this._offset+=8;var a=(r&3)*4294967296+s;return new Date(a*1e3+(r>>>2)/1e6)}return[n,this._bin(8)];case 216:return n=this._view.getInt8(this._offset),this._offset+=1,[n,this._bin(16)];case 217:return t=this._view.getUint8(this._offset),this._offset+=1,this._str(t);case 218:return t=this._view.getUint16(this._offset),this._offset+=2,this._str(t);case 219:return t=this._view.getUint32(this._offset),this._offset+=4,this._str(t);case 220:return t=this._view.getUint16(this._offset),this._offset+=2,this._array(t);case 221:return t=this._view.getUint32(this._offset),this._offset+=4,this._array(t);case 222:return t=this._view.getUint16(this._offset),this._offset+=2,this._map(t);case 223:return t=this._view.getUint32(this._offset),this._offset+=4,this._map(t)}throw new Error("Could not parse")};function T0(i,e=0){var t=new ar(i,e),n=t._parse();if(t._offset!==i.byteLength)throw new Error(i.byteLength-t._offset+" trailing bytes");return n}tr.decode=T0;var b0=4294967296-1,w0=17179869184-1;function A0(i,e,t){for(var n=0,r=0,s=t.length;r<s;r++)n=t.charCodeAt(r),n<128?i.setUint8(e++,n):n<2048?(i.setUint8(e++,192|n>>6),i.setUint8(e++,128|n&63)):n<55296||n>=57344?(i.setUint8(e++,224|n>>12),i.setUint8(e++,128|n>>6&63),i.setUint8(e++,128|n&63)):(r++,n=65536+((n&1023)<<10|t.charCodeAt(r)&1023),i.setUint8(e++,240|n>>18),i.setUint8(e++,128|n>>12&63),i.setUint8(e++,128|n>>6&63),i.setUint8(e++,128|n&63))}function R0(i){for(var e=0,t=0,n=0,r=i.length;n<r;n++)e=i.charCodeAt(n),e<128?t+=1:e<2048?t+=2:e<55296||e>=57344?t+=3:(n++,t+=4);return t}function Yi(i,e,t){var n=typeof t,r=0,s=0,o=0,a=0,l=0,c=0;if(n==="string"){if(l=R0(t),l<32)i.push(l|160),c=1;else if(l<256)i.push(217,l),c=2;else if(l<65536)i.push(218,l>>8,l),c=3;else if(l<4294967296)i.push(219,l>>24,l>>16,l>>8,l),c=5;else throw new Error("String too long");return e.push({_str:t,_length:l,_offset:i.length}),c+l}if(n==="number")return Math.floor(t)!==t||!isFinite(t)?(i.push(203),e.push({_float:t,_length:8,_offset:i.length}),9):t>=0?t<128?(i.push(t),1):t<256?(i.push(204,t),2):t<65536?(i.push(205,t>>8,t),3):t<4294967296?(i.push(206,t>>24,t>>16,t>>8,t),5):(o=t/Math.pow(2,32)>>0,a=t>>>0,i.push(207,o>>24,o>>16,o>>8,o,a>>24,a>>16,a>>8,a),9):t>=-32?(i.push(t),1):t>=-128?(i.push(208,t),2):t>=-32768?(i.push(209,t>>8,t),3):t>=-2147483648?(i.push(210,t>>24,t>>16,t>>8,t),5):(o=Math.floor(t/Math.pow(2,32)),a=t>>>0,i.push(211,o>>24,o>>16,o>>8,o,a>>24,a>>16,a>>8,a),9);if(n==="object"){if(t===null)return i.push(192),1;if(Array.isArray(t)){if(l=t.length,l<16)i.push(l|144),c=1;else if(l<65536)i.push(220,l>>8,l),c=3;else if(l<4294967296)i.push(221,l>>24,l>>16,l>>8,l),c=5;else throw new Error("Array too large");for(r=0;r<l;r++)c+=Yi(i,e,t[r]);return c}if(t instanceof Date){var u=t.getTime(),d=Math.floor(u/1e3),f=(u-d*1e3)*1e6;return d>=0&&f>=0&&d<=w0?f===0&&d<=b0?(i.push(214,255,d>>24,d>>16,d>>8,d),6):(o=d/4294967296,a=d&4294967295,i.push(215,255,f>>22,f>>14,f>>6,o,a>>24,a>>16,a>>8,a),10):(o=Math.floor(d/4294967296),a=d>>>0,i.push(199,12,255,f>>24,f>>16,f>>8,f,o>>24,o>>16,o>>8,o,a>>24,a>>16,a>>8,a),15)}if(t instanceof ArrayBuffer){if(l=t.byteLength,l<256)i.push(196,l),c=2;else if(l<65536)i.push(197,l>>8,l),c=3;else if(l<4294967296)i.push(198,l>>24,l>>16,l>>8,l),c=5;else throw new Error("Buffer too large");return e.push({_bin:t,_length:l,_offset:i.length}),c+l}if(typeof t.toJSON=="function")return Yi(i,e,t.toJSON());var v=[],x="",y=Object.keys(t);for(r=0,s=y.length;r<s;r++)x=y[r],t[x]!==void 0&&typeof t[x]!="function"&&v.push(x);if(l=v.length,l<16)i.push(l|128),c=1;else if(l<65536)i.push(222,l>>8,l),c=3;else if(l<4294967296)i.push(223,l>>24,l>>16,l>>8,l),c=5;else throw new Error("Object too large");for(r=0;r<l;r++)x=v[r],c+=Yi(i,e,x),c+=Yi(i,e,t[x]);return c}if(n==="boolean")return i.push(t?195:194),1;if(n==="undefined")return i.push(192),1;if(typeof t.toJSON=="function")return Yi(i,e,t.toJSON());throw new Error("Could not encode")}function C0(i){var e=[],t=[],n=Yi(e,t,i),r=new ArrayBuffer(n),s=new DataView(r),o=0,a=0,l=-1;t.length>0&&(l=t[0]._offset);for(var c,u=0,d=0,f=0,v=e.length;f<v;f++)if(s.setUint8(a+f,e[f]),f+1===l){if(c=t[o],u=c._length,d=a+l,c._bin)for(var x=new Uint8Array(c._bin),y=0;y<u;y++)s.setUint8(d+y,x[y]);else c._str?A0(s,d,c._str):c._float!==void 0&&s.setFloat64(d,c._float);o++,a+=u,t[o]&&(l=t[o]._offset)}return r}tr.encode=C0;var Ls={},Us={},P0=function(){throw new Error("ws does not work in the browser. Browser clients must use the native WebSocket object")},I0=Ut&&Ut.__importDefault||function(i){return i&&i.__esModule?i:{default:i}};Object.defineProperty(Us,"__esModule",{value:!0});Us.WebSocketTransport=void 0;const D0=I0(P0),Ro=globalThis.WebSocket||D0.default;class L0{constructor(e){this.events=e}send(e){e instanceof ArrayBuffer?this.ws.send(e):Array.isArray(e)&&this.ws.send(new Uint8Array(e).buffer)}connect(e,t){try{this.ws=new Ro(e,{headers:t,protocols:this.protocols})}catch{this.ws=new Ro(e,this.protocols)}this.ws.binaryType="arraybuffer",this.ws.onopen=this.events.onopen,this.ws.onmessage=this.events.onmessage,this.ws.onclose=this.events.onclose,this.ws.onerror=this.events.onerror}close(e,t){this.ws.close(e,t)}get isOpen(){return this.ws.readyState===Ro.OPEN}}Us.WebSocketTransport=L0;Object.defineProperty(Ls,"__esModule",{value:!0});Ls.Connection=void 0;const U0=Us;class O0{constructor(){this.events={},this.transport=new U0.WebSocketTransport(this.events)}send(e){this.transport.send(e)}connect(e,t){this.transport.connect(e,t)}close(e,t){this.transport.close(e,t)}get isOpen(){return this.transport.isOpen}}Ls.Connection=O0;var qa={};(function(i){Object.defineProperty(i,"__esModule",{value:!0}),i.utf8Length=i.utf8Read=i.ErrorCode=i.Protocol=void 0,function(n){n[n.HANDSHAKE=9]="HANDSHAKE",n[n.JOIN_ROOM=10]="JOIN_ROOM",n[n.ERROR=11]="ERROR",n[n.LEAVE_ROOM=12]="LEAVE_ROOM",n[n.ROOM_DATA=13]="ROOM_DATA",n[n.ROOM_STATE=14]="ROOM_STATE",n[n.ROOM_STATE_PATCH=15]="ROOM_STATE_PATCH",n[n.ROOM_DATA_SCHEMA=16]="ROOM_DATA_SCHEMA",n[n.ROOM_DATA_BYTES=17]="ROOM_DATA_BYTES"}(i.Protocol||(i.Protocol={})),function(n){n[n.MATCHMAKE_NO_HANDLER=4210]="MATCHMAKE_NO_HANDLER",n[n.MATCHMAKE_INVALID_CRITERIA=4211]="MATCHMAKE_INVALID_CRITERIA",n[n.MATCHMAKE_INVALID_ROOM_ID=4212]="MATCHMAKE_INVALID_ROOM_ID",n[n.MATCHMAKE_UNHANDLED=4213]="MATCHMAKE_UNHANDLED",n[n.MATCHMAKE_EXPIRED=4214]="MATCHMAKE_EXPIRED",n[n.AUTH_FAILED=4215]="AUTH_FAILED",n[n.APPLICATION_ERROR=4216]="APPLICATION_ERROR"}(i.ErrorCode||(i.ErrorCode={}));function e(n,r){const s=n[r++];for(var o="",a=0,l=r,c=r+s;l<c;l++){var u=n[l];if(!(u&128)){o+=String.fromCharCode(u);continue}if((u&224)===192){o+=String.fromCharCode((u&31)<<6|n[++l]&63);continue}if((u&240)===224){o+=String.fromCharCode((u&15)<<12|(n[++l]&63)<<6|(n[++l]&63)<<0);continue}if((u&248)===240){a=(u&7)<<18|(n[++l]&63)<<12|(n[++l]&63)<<6|(n[++l]&63)<<0,a>=65536?(a-=65536,o+=String.fromCharCode((a>>>10)+55296,(a&1023)+56320)):o+=String.fromCharCode(a);continue}throw new Error("Invalid byte "+u.toString(16))}return o}i.utf8Read=e;function t(n=""){let r=0,s=0;for(let o=0,a=n.length;o<a;o++)r=n.charCodeAt(o),r<128?s+=1:r<2048?s+=2:r<55296||r>=57344?s+=3:(o++,s+=4);return s+1}i.utf8Length=t})(qa);var Ri={};Object.defineProperty(Ri,"__esModule",{value:!0});Ri.getSerializer=Ri.registerSerializer=void 0;const oh={};function N0(i,e){oh[i]=e}Ri.registerSerializer=N0;function F0(i){const e=oh[i];if(!e)throw new Error("missing serializer: "+i);return e}Ri.getSerializer=F0;var Or={};Object.defineProperty(Or,"__esModule",{value:!0});Or.createNanoEvents=void 0;const G0=()=>({emit(i,...e){let t=this.events[i]||[];for(let n=0,r=t.length;n<r;n++)t[n](...e)},events:{},on(i,e){var t;return!((t=this.events[i])===null||t===void 0)&&t.push(e)||(this.events[i]=[e]),()=>{var n;this.events[i]=(n=this.events[i])===null||n===void 0?void 0:n.filter(r=>e!==r)}}});Or.createNanoEvents=G0;var nr={};Object.defineProperty(nr,"__esModule",{value:!0});nr.createSignal=nr.EventEmitter=void 0;class ah{constructor(){this.handlers=[]}register(e,t=!1){return this.handlers.push(e),this}invoke(...e){this.handlers.forEach(t=>t.apply(this,e))}invokeAsync(...e){return Promise.all(this.handlers.map(t=>t.apply(this,e)))}remove(e){const t=this.handlers.indexOf(e);this.handlers[t]=this.handlers[this.handlers.length-1],this.handlers.pop()}clear(){this.handlers=[]}}nr.EventEmitter=ah;function B0(){const i=new ah;function e(t){return i.register(t,this===null)}return e.once=t=>{const n=function(...r){t.apply(this,r),i.remove(n)};i.register(n)},e.remove=t=>i.remove(t),e.invoke=(...t)=>i.invoke(...t),e.invokeAsync=(...t)=>i.invokeAsync(...t),e.clear=()=>i.clear(),e}nr.createSignal=B0;var ba={exports:{}};(function(i,e){(function(t,n){n(e)})(Ut,function(t){var n=function(g,h){return n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(m,T){m.__proto__=T}||function(m,T){for(var k in T)Object.prototype.hasOwnProperty.call(T,k)&&(m[k]=T[k])},n(g,h)};function r(g,h){if(typeof h!="function"&&h!==null)throw new TypeError("Class extends value "+String(h)+" is not a constructor or null");n(g,h);function m(){this.constructor=g}g.prototype=h===null?Object.create(h):(m.prototype=h.prototype,new m)}function s(g,h,m,T){var k=arguments.length,ee=k<3?h:T,Le;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")ee=Reflect.decorate(g,h,m,T);else for(var Ce=g.length-1;Ce>=0;Ce--)(Le=g[Ce])&&(ee=(k<3?Le(ee):k>3?Le(h,m,ee):Le(h,m))||ee);return k>3&&ee&&Object.defineProperty(h,m,ee),ee}function o(g,h,m){if(arguments.length===2)for(var T=0,k=h.length,ee;T<k;T++)(ee||!(T in h))&&(ee||(ee=Array.prototype.slice.call(h,0,T)),ee[T]=h[T]);return g.concat(ee||Array.prototype.slice.call(h))}typeof SuppressedError=="function"&&SuppressedError;var a=255,l=213;t.OPERATION=void 0,function(g){g[g.ADD=128]="ADD",g[g.REPLACE=0]="REPLACE",g[g.DELETE=64]="DELETE",g[g.DELETE_AND_ADD=192]="DELETE_AND_ADD",g[g.TOUCH=1]="TOUCH",g[g.CLEAR=10]="CLEAR"}(t.OPERATION||(t.OPERATION={}));var c=function(){function g(h,m,T){this.changed=!1,this.changes=new Map,this.allChanges=new Set,this.caches={},this.currentCustomOperation=0,this.ref=h,this.setParent(m,T)}return g.prototype.setParent=function(h,m,T){var k=this;if(this.indexes||(this.indexes=this.ref instanceof et?this.ref._definition.indexes:{}),this.parent=h,this.parentIndex=T,!!m)if(this.root=m,this.ref instanceof et){var ee=this.ref._definition;for(var Le in ee.schema){var Ce=this.ref[Le];if(Ce&&Ce.$changes){var it=ee.indexes[Le];Ce.$changes.setParent(this.ref,m,it)}}}else typeof this.ref=="object"&&this.ref.forEach(function(rt,Ne){if(rt instanceof et){var at=rt.$changes,Fe=k.ref.$changes.indexes[Ne];at.setParent(k.ref,k.root,Fe)}})},g.prototype.operation=function(h){this.changes.set(--this.currentCustomOperation,h)},g.prototype.change=function(h,m){m===void 0&&(m=t.OPERATION.ADD);var T=typeof h=="number"?h:this.indexes[h];this.assertValidIndex(T,h);var k=this.changes.get(T);(!k||k.op===t.OPERATION.DELETE||k.op===t.OPERATION.TOUCH)&&this.changes.set(T,{op:k&&k.op===t.OPERATION.DELETE?t.OPERATION.DELETE_AND_ADD:m,index:T}),this.allChanges.add(T),this.changed=!0,this.touchParents()},g.prototype.touch=function(h){var m=typeof h=="number"?h:this.indexes[h];this.assertValidIndex(m,h),this.changes.has(m)||this.changes.set(m,{op:t.OPERATION.TOUCH,index:m}),this.allChanges.add(m),this.touchParents()},g.prototype.touchParents=function(){this.parent&&this.parent.$changes.touch(this.parentIndex)},g.prototype.getType=function(h){if(this.ref._definition){var m=this.ref._definition;return m.schema[m.fieldsByIndex[h]]}else{var m=this.parent._definition,T=m.schema[m.fieldsByIndex[this.parentIndex]];return Object.values(T)[0]}},g.prototype.getChildrenFilter=function(){var h=this.parent._definition.childFilters;return h&&h[this.parentIndex]},g.prototype.getValue=function(h){return this.ref.getByIndex(h)},g.prototype.delete=function(h){var m=typeof h=="number"?h:this.indexes[h];if(m===void 0){console.warn("@colyseus/schema ".concat(this.ref.constructor.name,": trying to delete non-existing index: ").concat(h," (").concat(m,")"));return}var T=this.getValue(m);this.changes.set(m,{op:t.OPERATION.DELETE,index:m}),this.allChanges.delete(m),delete this.caches[m],T&&T.$changes&&(T.$changes.parent=void 0),this.changed=!0,this.touchParents()},g.prototype.discard=function(h,m){var T=this;h===void 0&&(h=!1),m===void 0&&(m=!1),this.ref instanceof et||this.changes.forEach(function(k){if(k.op===t.OPERATION.DELETE){var ee=T.ref.getIndex(k.index);delete T.indexes[ee]}}),this.changes.clear(),this.changed=h,m&&this.allChanges.clear(),this.currentCustomOperation=0},g.prototype.discardAll=function(){var h=this;this.changes.forEach(function(m){var T=h.getValue(m.index);T&&T.$changes&&T.$changes.discardAll()}),this.discard()},g.prototype.cache=function(h,m){this.caches[h]=m},g.prototype.clone=function(){return new g(this.ref,this.parent,this.root)},g.prototype.ensureRefId=function(){this.refId===void 0&&(this.refId=this.root.getNextUniqueId())},g.prototype.assertValidIndex=function(h,m){if(h===void 0)throw new Error('ChangeTree: missing index for field "'.concat(m,'"'))},g}();function u(g,h,m,T){return g[h]||(g[h]=[]),g[h].push(m),T==null||T.forEach(function(k,ee){return m(k,ee)}),function(){return f(g[h],g[h].indexOf(m))}}function d(g){var h=this,m=typeof this.$changes.getType()!="string";this.$items.forEach(function(T,k){g.push({refId:h.$changes.refId,op:t.OPERATION.DELETE,field:k,value:void 0,previousValue:T}),m&&h.$changes.root.removeRef(T.$changes.refId)})}function f(g,h){if(h===-1||h>=g.length)return!1;for(var m=g.length-1,T=h;T<m;T++)g[T]=g[T+1];return g.length=m,!0}var v=function(g,h){var m=g.toString(),T=h.toString();return m<T?-1:m>T?1:0};function x(g){return g.$proxy=!0,g=new Proxy(g,{get:function(h,m){return typeof m!="symbol"&&!isNaN(m)?h.at(m):h[m]},set:function(h,m,T){if(typeof m!="symbol"&&!isNaN(m)){var k=Array.from(h.$items.keys()),ee=parseInt(k[m]||m);T==null?h.deleteAt(ee):h.setAt(ee,T)}else h[m]=T;return!0},deleteProperty:function(h,m){return typeof m=="number"?h.deleteAt(m):delete h[m],!0},has:function(h,m){return typeof m!="symbol"&&!isNaN(Number(m))?h.$items.has(Number(m)):Reflect.has(h,m)}}),g}var y=function(){function g(){for(var h=[],m=0;m<arguments.length;m++)h[m]=arguments[m];this.$changes=new c(this),this.$items=new Map,this.$indexes=new Map,this.$refId=0,this.push.apply(this,h)}return g.prototype.onAdd=function(h,m){return m===void 0&&(m=!0),u(this.$callbacks||(this.$callbacks={}),t.OPERATION.ADD,h,m?this.$items:void 0)},g.prototype.onRemove=function(h){return u(this.$callbacks||(this.$callbacks={}),t.OPERATION.DELETE,h)},g.prototype.onChange=function(h){return u(this.$callbacks||(this.$callbacks={}),t.OPERATION.REPLACE,h)},g.is=function(h){return Array.isArray(h)||h.array!==void 0},Object.defineProperty(g.prototype,"length",{get:function(){return this.$items.size},set:function(h){h===0?this.clear():this.splice(h,this.length-h)},enumerable:!1,configurable:!0}),g.prototype.push=function(){for(var h=this,m=[],T=0;T<arguments.length;T++)m[T]=arguments[T];var k;return m.forEach(function(ee){k=h.$refId++,h.setAt(k,ee)}),k},g.prototype.pop=function(){var h=Array.from(this.$indexes.values()).pop();if(h!==void 0){this.$changes.delete(h),this.$indexes.delete(h);var m=this.$items.get(h);return this.$items.delete(h),m}},g.prototype.at=function(h){if(h=Math.trunc(h)||0,h<0&&(h+=this.length),!(h<0||h>=this.length)){var m=Array.from(this.$items.keys())[h];return this.$items.get(m)}},g.prototype.setAt=function(h,m){var T,k;if(m==null){console.error("ArraySchema items cannot be null nor undefined; Use `deleteAt(index)` instead.");return}if(this.$items.get(h)!==m){m.$changes!==void 0&&m.$changes.setParent(this,this.$changes.root,h);var ee=(k=(T=this.$changes.indexes[h])===null||T===void 0?void 0:T.op)!==null&&k!==void 0?k:t.OPERATION.ADD;this.$changes.indexes[h]=h,this.$indexes.set(h,h),this.$items.set(h,m),this.$changes.change(h,ee)}},g.prototype.deleteAt=function(h){var m=Array.from(this.$items.keys())[h];return m===void 0?!1:this.$deleteAt(m)},g.prototype.$deleteAt=function(h){return this.$changes.delete(h),this.$indexes.delete(h),this.$items.delete(h)},g.prototype.clear=function(h){this.$changes.discard(!0,!0),this.$changes.indexes={},this.$indexes.clear(),h&&d.call(this,h),this.$items.clear(),this.$changes.operation({index:0,op:t.OPERATION.CLEAR}),this.$changes.touchParents()},g.prototype.concat=function(){for(var h,m=[],T=0;T<arguments.length;T++)m[T]=arguments[T];return new(g.bind.apply(g,o([void 0],(h=Array.from(this.$items.values())).concat.apply(h,m),!1)))},g.prototype.join=function(h){return Array.from(this.$items.values()).join(h)},g.prototype.reverse=function(){var h=this,m=Array.from(this.$items.keys()),T=Array.from(this.$items.values()).reverse();return T.forEach(function(k,ee){h.setAt(m[ee],k)}),this},g.prototype.shift=function(){var h=Array.from(this.$items.keys()),m=h.shift();if(m!==void 0){var T=this.$items.get(m);return this.$deleteAt(m),T}},g.prototype.slice=function(h,m){var T=new g;return T.push.apply(T,Array.from(this.$items.values()).slice(h,m)),T},g.prototype.sort=function(h){var m=this;h===void 0&&(h=v);var T=Array.from(this.$items.keys()),k=Array.from(this.$items.values()).sort(h);return k.forEach(function(ee,Le){m.setAt(T[Le],ee)}),this},g.prototype.splice=function(h,m){m===void 0&&(m=this.length-h);for(var T=[],k=2;k<arguments.length;k++)T[k-2]=arguments[k];for(var ee=Array.from(this.$items.keys()),Le=[],Ce=h;Ce<h+m;Ce++)Le.push(this.$items.get(ee[Ce])),this.$deleteAt(ee[Ce]);for(var Ce=0;Ce<T.length;Ce++)this.setAt(h+Ce,T[Ce]);return Le},g.prototype.unshift=function(){for(var h=this,m=[],T=0;T<arguments.length;T++)m[T]=arguments[T];var k=this.length,ee=m.length,Le=Array.from(this.$items.values());return m.forEach(function(Ce,it){h.setAt(it,Ce)}),Le.forEach(function(Ce,it){h.setAt(ee+it,Ce)}),k+ee},g.prototype.indexOf=function(h,m){return Array.from(this.$items.values()).indexOf(h,m)},g.prototype.lastIndexOf=function(h,m){return m===void 0&&(m=this.length-1),Array.from(this.$items.values()).lastIndexOf(h,m)},g.prototype.every=function(h,m){return Array.from(this.$items.values()).every(h,m)},g.prototype.some=function(h,m){return Array.from(this.$items.values()).some(h,m)},g.prototype.forEach=function(h,m){Array.from(this.$items.values()).forEach(h,m)},g.prototype.map=function(h,m){return Array.from(this.$items.values()).map(h,m)},g.prototype.filter=function(h,m){return Array.from(this.$items.values()).filter(h,m)},g.prototype.reduce=function(h,m){return Array.prototype.reduce.apply(Array.from(this.$items.values()),arguments)},g.prototype.reduceRight=function(h,m){return Array.prototype.reduceRight.apply(Array.from(this.$items.values()),arguments)},g.prototype.find=function(h,m){return Array.from(this.$items.values()).find(h,m)},g.prototype.findIndex=function(h,m){return Array.from(this.$items.values()).findIndex(h,m)},g.prototype.fill=function(h,m,T){throw new Error("ArraySchema#fill() not implemented")},g.prototype.copyWithin=function(h,m,T){throw new Error("ArraySchema#copyWithin() not implemented")},g.prototype.toString=function(){return this.$items.toString()},g.prototype.toLocaleString=function(){return this.$items.toLocaleString()},g.prototype[Symbol.iterator]=function(){return Array.from(this.$items.values())[Symbol.iterator]()},Object.defineProperty(g,Symbol.species,{get:function(){return g},enumerable:!1,configurable:!0}),g.prototype.entries=function(){return this.$items.entries()},g.prototype.keys=function(){return this.$items.keys()},g.prototype.values=function(){return this.$items.values()},g.prototype.includes=function(h,m){return Array.from(this.$items.values()).includes(h,m)},g.prototype.flatMap=function(h,m){throw new Error("ArraySchema#flatMap() is not supported.")},g.prototype.flat=function(h){throw new Error("ArraySchema#flat() is not supported.")},g.prototype.findLast=function(){var h=Array.from(this.$items.values());return h.findLast.apply(h,arguments)},g.prototype.findLastIndex=function(){var h=Array.from(this.$items.values());return h.findLastIndex.apply(h,arguments)},g.prototype.with=function(h,m){var T=Array.from(this.$items.values());return T[h]=m,new(g.bind.apply(g,o([void 0],T,!1)))},g.prototype.toReversed=function(){return Array.from(this.$items.values()).reverse()},g.prototype.toSorted=function(h){return Array.from(this.$items.values()).sort(h)},g.prototype.toSpliced=function(h,m){var T=Array.from(this.$items.values());return T.toSpliced.apply(T,arguments)},g.prototype.setIndex=function(h,m){this.$indexes.set(h,m)},g.prototype.getIndex=function(h){return this.$indexes.get(h)},g.prototype.getByIndex=function(h){return this.$items.get(this.$indexes.get(h))},g.prototype.deleteByIndex=function(h){var m=this.$indexes.get(h);this.$items.delete(m),this.$indexes.delete(h)},g.prototype.toArray=function(){return Array.from(this.$items.values())},g.prototype.toJSON=function(){return this.toArray().map(function(h){return typeof h.toJSON=="function"?h.toJSON():h})},g.prototype.clone=function(h){var m;return h?m=new(g.bind.apply(g,o([void 0],Array.from(this.$items.values()),!1))):m=new(g.bind.apply(g,o([void 0],this.map(function(T){return T.$changes?T.clone():T}),!1))),m},g}();function _(g){return g.$proxy=!0,g=new Proxy(g,{get:function(h,m){return typeof m!="symbol"&&typeof h[m]>"u"?h.get(m):h[m]},set:function(h,m,T){return typeof m!="symbol"&&m.indexOf("$")===-1&&m!=="onAdd"&&m!=="onRemove"&&m!=="onChange"?h.set(m,T):h[m]=T,!0},deleteProperty:function(h,m){return h.delete(m),!0}}),g}var p=function(){function g(h){var m=this;if(this.$changes=new c(this),this.$items=new Map,this.$indexes=new Map,this.$refId=0,h)if(h instanceof Map||h instanceof g)h.forEach(function(k,ee){return m.set(ee,k)});else for(var T in h)this.set(T,h[T])}return g.prototype.onAdd=function(h,m){return m===void 0&&(m=!0),u(this.$callbacks||(this.$callbacks={}),t.OPERATION.ADD,h,m?this.$items:void 0)},g.prototype.onRemove=function(h){return u(this.$callbacks||(this.$callbacks={}),t.OPERATION.DELETE,h)},g.prototype.onChange=function(h){return u(this.$callbacks||(this.$callbacks={}),t.OPERATION.REPLACE,h)},g.is=function(h){return h.map!==void 0},g.prototype[Symbol.iterator]=function(){return this.$items[Symbol.iterator]()},Object.defineProperty(g.prototype,Symbol.toStringTag,{get:function(){return this.$items[Symbol.toStringTag]},enumerable:!1,configurable:!0}),Object.defineProperty(g,Symbol.species,{get:function(){return g},enumerable:!1,configurable:!0}),g.prototype.set=function(h,m){if(m==null)throw new Error("MapSchema#set('".concat(h,"', ").concat(m,"): trying to set ").concat(m," value on '").concat(h,"'."));h=h.toString();var T=typeof this.$changes.indexes[h]<"u",k=T?this.$changes.indexes[h]:this.$refId++,ee=T?t.OPERATION.REPLACE:t.OPERATION.ADD,Le=m.$changes!==void 0;if(Le&&m.$changes.setParent(this,this.$changes.root,k),!T)this.$changes.indexes[h]=k,this.$indexes.set(k,h);else{if(!Le&&this.$items.get(h)===m)return;Le&&this.$items.get(h)!==m&&(ee=t.OPERATION.ADD)}return this.$items.set(h,m),this.$changes.change(h,ee),this},g.prototype.get=function(h){return this.$items.get(h)},g.prototype.delete=function(h){return this.$changes.delete(h.toString()),this.$items.delete(h)},g.prototype.clear=function(h){this.$changes.discard(!0,!0),this.$changes.indexes={},this.$indexes.clear(),h&&d.call(this,h),this.$items.clear(),this.$changes.operation({index:0,op:t.OPERATION.CLEAR}),this.$changes.touchParents()},g.prototype.has=function(h){return this.$items.has(h)},g.prototype.forEach=function(h){this.$items.forEach(h)},g.prototype.entries=function(){return this.$items.entries()},g.prototype.keys=function(){return this.$items.keys()},g.prototype.values=function(){return this.$items.values()},Object.defineProperty(g.prototype,"size",{get:function(){return this.$items.size},enumerable:!1,configurable:!0}),g.prototype.setIndex=function(h,m){this.$indexes.set(h,m)},g.prototype.getIndex=function(h){return this.$indexes.get(h)},g.prototype.getByIndex=function(h){return this.$items.get(this.$indexes.get(h))},g.prototype.deleteByIndex=function(h){var m=this.$indexes.get(h);this.$items.delete(m),this.$indexes.delete(h)},g.prototype.toJSON=function(){var h={};return this.forEach(function(m,T){h[T]=typeof m.toJSON=="function"?m.toJSON():m}),h},g.prototype.clone=function(h){var m;return h?m=Object.assign(new g,this):(m=new g,this.forEach(function(T,k){T.$changes?m.set(k,T.clone()):m.set(k,T)})),m},g}(),b={};function C(g,h){b[g]=h}function A(g){return b[g]}var I=function(){function g(){this.indexes={},this.fieldsByIndex={},this.deprecated={},this.descriptors={}}return g.create=function(h){var m=new g;return m.schema=Object.assign({},h&&h.schema||{}),m.indexes=Object.assign({},h&&h.indexes||{}),m.fieldsByIndex=Object.assign({},h&&h.fieldsByIndex||{}),m.descriptors=Object.assign({},h&&h.descriptors||{}),m.deprecated=Object.assign({},h&&h.deprecated||{}),m},g.prototype.addField=function(h,m){var T=this.getNextFieldIndex();this.fieldsByIndex[T]=h,this.indexes[h]=T,this.schema[h]=Array.isArray(m)?{array:m[0]}:m},g.prototype.hasField=function(h){return this.indexes[h]!==void 0},g.prototype.addFilter=function(h,m){return this.filters||(this.filters={},this.indexesWithFilters=[]),this.filters[this.indexes[h]]=m,this.indexesWithFilters.push(this.indexes[h]),!0},g.prototype.addChildrenFilter=function(h,m){var T=this.indexes[h],k=this.schema[h];if(A(Object.keys(k)[0]))return this.childFilters||(this.childFilters={}),this.childFilters[T]=m,!0;console.warn("@filterChildren: field '".concat(h,"' can't have children. Ignoring filter."))},g.prototype.getChildrenFilter=function(h){return this.childFilters&&this.childFilters[this.indexes[h]]},g.prototype.getNextFieldIndex=function(){return Object.keys(this.schema||{}).length},g}();function P(g){return g._context&&g._context.useFilters}var U=function(){function g(){this.types={},this.schemas=new Map,this.useFilters=!1}return g.prototype.has=function(h){return this.schemas.has(h)},g.prototype.get=function(h){return this.types[h]},g.prototype.add=function(h,m){m===void 0&&(m=this.schemas.size),h._definition=I.create(h._definition),h._typeid=m,this.types[m]=h,this.schemas.set(h,m)},g.create=function(h){return h===void 0&&(h={}),function(m){return h.context||(h.context=new g),w(m,h)}},g}(),E=new U;function w(g,h){return h===void 0&&(h={}),function(m,T){var k=h.context||E,ee=m.constructor;if(ee._context=k,!g)throw new Error("".concat(ee.name,': @type() reference provided for "').concat(T,`" is undefined. Make sure you don't have any circular dependencies.`));k.has(ee)||k.add(ee);var Le=ee._definition;if(Le.addField(T,g),Le.descriptors[T]){if(Le.deprecated[T])return;try{throw new Error("@colyseus/schema: Duplicate '".concat(T,"' definition on '").concat(ee.name,`'.
Check @type() annotation`))}catch(Fe){var Ce=Fe.stack.split(`
`)[4].trim();throw new Error("".concat(Fe.message," ").concat(Ce))}}var it=y.is(g),rt=!it&&p.is(g);if(typeof g!="string"&&!et.is(g)){var Ne=Object.values(g)[0];typeof Ne!="string"&&!k.has(Ne)&&k.add(Ne)}if(h.manual){Le.descriptors[T]={enumerable:!0,configurable:!0,writable:!0};return}var at="_".concat(T);Le.descriptors[at]={enumerable:!1,configurable:!1,writable:!0},Le.descriptors[T]={get:function(){return this[at]},set:function(Fe){Fe!==this[at]&&(Fe!=null?(it&&!(Fe instanceof y)&&(Fe=new(y.bind.apply(y,o([void 0],Fe,!1)))),rt&&!(Fe instanceof p)&&(Fe=new p(Fe)),Fe.$proxy===void 0&&(rt?Fe=_(Fe):it&&(Fe=x(Fe))),this.$changes.change(T),Fe.$changes&&Fe.$changes.setParent(this,this.$changes.root,this._definition.indexes[T])):this[at]!==void 0&&this.$changes.delete(T),this[at]=Fe)},enumerable:!0,configurable:!0}}}function Z(g){return function(h,m){var T=h.constructor,k=T._definition;k.addFilter(m,g)&&(T._context.useFilters=!0)}}function D(g){return function(h,m){var T=h.constructor,k=T._definition;k.addChildrenFilter(m,g)&&(T._context.useFilters=!0)}}function V(g){return g===void 0&&(g=!0),function(h,m){var T=h.constructor,k=T._definition;k.deprecated[m]=!0,g&&(k.descriptors[m]={get:function(){throw new Error("".concat(m," is deprecated."))},set:function(ee){},enumerable:!1,configurable:!0})}}function $(g,h,m){m===void 0&&(m={}),m.context||(m.context=g._context||m.context||E);for(var T in h)w(h[T],m)(g.prototype,T);return g}function q(g){for(var h=0,m=0,T=0,k=g.length;T<k;T++)h=g.charCodeAt(T),h<128?m+=1:h<2048?m+=2:h<55296||h>=57344?m+=3:(T++,m+=4);return m}function X(g,h,m){for(var T=0,k=0,ee=m.length;k<ee;k++)T=m.charCodeAt(k),T<128?g[h++]=T:T<2048?(g[h++]=192|T>>6,g[h++]=128|T&63):T<55296||T>=57344?(g[h++]=224|T>>12,g[h++]=128|T>>6&63,g[h++]=128|T&63):(k++,T=65536+((T&1023)<<10|m.charCodeAt(k)&1023),g[h++]=240|T>>18,g[h++]=128|T>>12&63,g[h++]=128|T>>6&63,g[h++]=128|T&63)}function Y(g,h){g.push(h&255)}function z(g,h){g.push(h&255)}function ae(g,h){g.push(h&255),g.push(h>>8&255)}function ne(g,h){g.push(h&255),g.push(h>>8&255)}function ye(g,h){g.push(h&255),g.push(h>>8&255),g.push(h>>16&255),g.push(h>>24&255)}function Te(g,h){var m=h>>24,T=h>>16,k=h>>8,ee=h;g.push(ee&255),g.push(k&255),g.push(T&255),g.push(m&255)}function be(g,h){var m=Math.floor(h/Math.pow(2,32)),T=h>>>0;Te(g,T),Te(g,m)}function Ze(g,h){var m=h/Math.pow(2,32)>>0,T=h>>>0;Te(g,T),Te(g,m)}function Rt(g,h){je(g,h)}function bt(g,h){Be(g,h)}var Q=new Int32Array(2),de=new Float32Array(Q.buffer),pe=new Float64Array(Q.buffer);function je(g,h){de[0]=h,ye(g,Q[0])}function Be(g,h){pe[0]=h,ye(g,Q[0]),ye(g,Q[1])}function We(g,h){return z(g,h?1:0)}function Dt(g,h){h||(h="");var m=q(h),T=0;if(m<32)g.push(m|160),T=1;else if(m<256)g.push(217),z(g,m),T=2;else if(m<65536)g.push(218),ne(g,m),T=3;else if(m<4294967296)g.push(219),Te(g,m),T=5;else throw new Error("String too long");return X(g,g.length,h),T+m}function He(g,h){if(isNaN(h))return He(g,0);if(isFinite(h)){if(h!==(h|0))return g.push(203),Be(g,h),9}else return He(g,h>0?Number.MAX_SAFE_INTEGER:-Number.MAX_SAFE_INTEGER);return h>=0?h<128?(z(g,h),1):h<256?(g.push(204),z(g,h),2):h<65536?(g.push(205),ne(g,h),3):h<4294967296?(g.push(206),Te(g,h),5):(g.push(207),Ze(g,h),9):h>=-32?(g.push(224|h+32),1):h>=-128?(g.push(208),Y(g,h),2):h>=-32768?(g.push(209),ae(g,h),3):h>=-2147483648?(g.push(210),ye(g,h),5):(g.push(211),be(g,h),9)}var mt=Object.freeze({__proto__:null,boolean:We,float32:Rt,float64:bt,int16:ae,int32:ye,int64:be,int8:Y,number:He,string:Dt,uint16:ne,uint32:Te,uint64:Ze,uint8:z,utf8Write:X,writeFloat32:je,writeFloat64:Be});function Mt(g,h,m){for(var T="",k=0,ee=h,Le=h+m;ee<Le;ee++){var Ce=g[ee];if(!(Ce&128)){T+=String.fromCharCode(Ce);continue}if((Ce&224)===192){T+=String.fromCharCode((Ce&31)<<6|g[++ee]&63);continue}if((Ce&240)===224){T+=String.fromCharCode((Ce&15)<<12|(g[++ee]&63)<<6|(g[++ee]&63)<<0);continue}if((Ce&248)===240){k=(Ce&7)<<18|(g[++ee]&63)<<12|(g[++ee]&63)<<6|(g[++ee]&63)<<0,k>=65536?(k-=65536,T+=String.fromCharCode((k>>>10)+55296,(k&1023)+56320)):T+=String.fromCharCode(k);continue}console.error("Invalid byte "+Ce.toString(16))}return T}function Je(g,h){return wt(g,h)<<24>>24}function wt(g,h){return g[h.offset++]}function L(g,h){return Pt(g,h)<<16>>16}function Pt(g,h){return g[h.offset++]|g[h.offset++]<<8}function ht(g,h){return g[h.offset++]|g[h.offset++]<<8|g[h.offset++]<<16|g[h.offset++]<<24}function gt(g,h){return ht(g,h)>>>0}function De(g,h){return Ae(g,h)}function R(g,h){return he(g,h)}function S(g,h){var m=gt(g,h),T=ht(g,h)*Math.pow(2,32);return T+m}function B(g,h){var m=gt(g,h),T=gt(g,h)*Math.pow(2,32);return T+m}var J=new Int32Array(2),te=new Float32Array(J.buffer),K=new Float64Array(J.buffer);function Ae(g,h){return J[0]=ht(g,h),te[0]}function he(g,h){return J[0]=ht(g,h),J[1]=ht(g,h),K[0]}function Ge(g,h){return wt(g,h)>0}function ke(g,h){var m=g[h.offset++],T;m<192?T=m&31:m===217?T=wt(g,h):m===218?T=Pt(g,h):m===219&&(T=gt(g,h));var k=Mt(g,h.offset,T);return h.offset+=T,k}function se(g,h){var m=g[h.offset];return m<192&&m>160||m===217||m===218||m===219}function oe(g,h){var m=g[h.offset++];if(m<128)return m;if(m===202)return Ae(g,h);if(m===203)return he(g,h);if(m===204)return wt(g,h);if(m===205)return Pt(g,h);if(m===206)return gt(g,h);if(m===207)return B(g,h);if(m===208)return Je(g,h);if(m===209)return L(g,h);if(m===210)return ht(g,h);if(m===211)return S(g,h);if(m>223)return(255-m+1)*-1}function Pe(g,h){var m=g[h.offset];return m<128||m>=202&&m<=211}function Ie(g,h){return g[h.offset]<160}function Ee(g,h){return g[h.offset-1]===a&&(g[h.offset]<128||g[h.offset]>=202&&g[h.offset]<=211)}var Qe=Object.freeze({__proto__:null,arrayCheck:Ie,boolean:Ge,float32:De,float64:R,int16:L,int32:ht,int64:S,int8:Je,number:oe,numberCheck:Pe,readFloat32:Ae,readFloat64:he,string:ke,stringCheck:se,switchStructureCheck:Ee,uint16:Pt,uint32:gt,uint64:B,uint8:wt}),O=function(){function g(h){var m=this;this.$changes=new c(this),this.$items=new Map,this.$indexes=new Map,this.$refId=0,h&&h.forEach(function(T){return m.add(T)})}return g.prototype.onAdd=function(h,m){return m===void 0&&(m=!0),u(this.$callbacks||(this.$callbacks=[]),t.OPERATION.ADD,h,m?this.$items:void 0)},g.prototype.onRemove=function(h){return u(this.$callbacks||(this.$callbacks=[]),t.OPERATION.DELETE,h)},g.prototype.onChange=function(h){return u(this.$callbacks||(this.$callbacks=[]),t.OPERATION.REPLACE,h)},g.is=function(h){return h.collection!==void 0},g.prototype.add=function(h){var m=this.$refId++,T=h.$changes!==void 0;return T&&h.$changes.setParent(this,this.$changes.root,m),this.$changes.indexes[m]=m,this.$indexes.set(m,m),this.$items.set(m,h),this.$changes.change(m),m},g.prototype.at=function(h){var m=Array.from(this.$items.keys())[h];return this.$items.get(m)},g.prototype.entries=function(){return this.$items.entries()},g.prototype.delete=function(h){for(var m=this.$items.entries(),T,k;(k=m.next())&&!k.done;)if(h===k.value[1]){T=k.value[0];break}return T===void 0?!1:(this.$changes.delete(T),this.$indexes.delete(T),this.$items.delete(T))},g.prototype.clear=function(h){this.$changes.discard(!0,!0),this.$changes.indexes={},this.$indexes.clear(),h&&d.call(this,h),this.$items.clear(),this.$changes.operation({index:0,op:t.OPERATION.CLEAR}),this.$changes.touchParents()},g.prototype.has=function(h){return Array.from(this.$items.values()).some(function(m){return m===h})},g.prototype.forEach=function(h){var m=this;this.$items.forEach(function(T,k,ee){return h(T,k,m)})},g.prototype.values=function(){return this.$items.values()},Object.defineProperty(g.prototype,"size",{get:function(){return this.$items.size},enumerable:!1,configurable:!0}),g.prototype.setIndex=function(h,m){this.$indexes.set(h,m)},g.prototype.getIndex=function(h){return this.$indexes.get(h)},g.prototype.getByIndex=function(h){return this.$items.get(this.$indexes.get(h))},g.prototype.deleteByIndex=function(h){var m=this.$indexes.get(h);this.$items.delete(m),this.$indexes.delete(h)},g.prototype.toArray=function(){return Array.from(this.$items.values())},g.prototype.toJSON=function(){var h=[];return this.forEach(function(m,T){h.push(typeof m.toJSON=="function"?m.toJSON():m)}),h},g.prototype.clone=function(h){var m;return h?m=Object.assign(new g,this):(m=new g,this.forEach(function(T){T.$changes?m.add(T.clone()):m.add(T)})),m},g}(),ue=function(){function g(h){var m=this;this.$changes=new c(this),this.$items=new Map,this.$indexes=new Map,this.$refId=0,h&&h.forEach(function(T){return m.add(T)})}return g.prototype.onAdd=function(h,m){return m===void 0&&(m=!0),u(this.$callbacks||(this.$callbacks=[]),t.OPERATION.ADD,h,m?this.$items:void 0)},g.prototype.onRemove=function(h){return u(this.$callbacks||(this.$callbacks=[]),t.OPERATION.DELETE,h)},g.prototype.onChange=function(h){return u(this.$callbacks||(this.$callbacks=[]),t.OPERATION.REPLACE,h)},g.is=function(h){return h.set!==void 0},g.prototype.add=function(h){var m,T;if(this.has(h))return!1;var k=this.$refId++;h.$changes!==void 0&&h.$changes.setParent(this,this.$changes.root,k);var ee=(T=(m=this.$changes.indexes[k])===null||m===void 0?void 0:m.op)!==null&&T!==void 0?T:t.OPERATION.ADD;return this.$changes.indexes[k]=k,this.$indexes.set(k,k),this.$items.set(k,h),this.$changes.change(k,ee),k},g.prototype.entries=function(){return this.$items.entries()},g.prototype.delete=function(h){for(var m=this.$items.entries(),T,k;(k=m.next())&&!k.done;)if(h===k.value[1]){T=k.value[0];break}return T===void 0?!1:(this.$changes.delete(T),this.$indexes.delete(T),this.$items.delete(T))},g.prototype.clear=function(h){this.$changes.discard(!0,!0),this.$changes.indexes={},this.$indexes.clear(),h&&d.call(this,h),this.$items.clear(),this.$changes.operation({index:0,op:t.OPERATION.CLEAR}),this.$changes.touchParents()},g.prototype.has=function(h){for(var m=this.$items.values(),T=!1,k;(k=m.next())&&!k.done;)if(h===k.value){T=!0;break}return T},g.prototype.forEach=function(h){var m=this;this.$items.forEach(function(T,k,ee){return h(T,k,m)})},g.prototype.values=function(){return this.$items.values()},Object.defineProperty(g.prototype,"size",{get:function(){return this.$items.size},enumerable:!1,configurable:!0}),g.prototype.setIndex=function(h,m){this.$indexes.set(h,m)},g.prototype.getIndex=function(h){return this.$indexes.get(h)},g.prototype.getByIndex=function(h){return this.$items.get(this.$indexes.get(h))},g.prototype.deleteByIndex=function(h){var m=this.$indexes.get(h);this.$items.delete(m),this.$indexes.delete(h)},g.prototype.toArray=function(){return Array.from(this.$items.values())},g.prototype.toJSON=function(){var h=[];return this.forEach(function(m,T){h.push(typeof m.toJSON=="function"?m.toJSON():m)}),h},g.prototype.clone=function(h){var m;return h?m=Object.assign(new g,this):(m=new g,this.forEach(function(T){T.$changes?m.add(T.clone()):m.add(T)})),m},g}(),le=function(){function g(){this.refIds=new WeakSet,this.containerIndexes=new WeakMap}return g.prototype.addRefId=function(h){this.refIds.has(h)||(this.refIds.add(h),this.containerIndexes.set(h,new Set))},g.get=function(h){return h.$filterState===void 0&&(h.$filterState=new g),h.$filterState},g}(),we=function(){function g(){this.refs=new Map,this.refCounts={},this.deletedRefs=new Set,this.nextUniqueId=0}return g.prototype.getNextUniqueId=function(){return this.nextUniqueId++},g.prototype.addRef=function(h,m,T){T===void 0&&(T=!0),this.refs.set(h,m),T&&(this.refCounts[h]=(this.refCounts[h]||0)+1)},g.prototype.removeRef=function(h){var m=this.refCounts[h];if(m===void 0){console.warn("trying to remove reference ".concat(h," that doesn't exist"));return}if(m===0){console.warn("trying to remove reference ".concat(h," with 0 refCount"));return}this.refCounts[h]=m-1,this.deletedRefs.add(h)},g.prototype.clearRefs=function(){this.refs.clear(),this.deletedRefs.clear(),this.refCounts={}},g.prototype.garbageCollectDeletedRefs=function(){var h=this;this.deletedRefs.forEach(function(m){if(!(h.refCounts[m]>0)){var T=h.refs.get(m);if(T instanceof et)for(var k in T._definition.schema)typeof T._definition.schema[k]!="string"&&T[k]&&T[k].$changes&&h.removeRef(T[k].$changes.refId);else{var ee=T.$changes.parent._definition,Le=ee.schema[ee.fieldsByIndex[T.$changes.parentIndex]];typeof Object.values(Le)[0]=="function"&&Array.from(T.values()).forEach(function(Ce){return h.removeRef(Ce.$changes.refId)})}h.refs.delete(m),delete h.refCounts[m]}}),this.deletedRefs.clear()},g}(),re=function(g){r(h,g);function h(){return g!==null&&g.apply(this,arguments)||this}return h}(Error);function j(g,h,m,T){var k,ee=!1;switch(h){case"number":case"int8":case"uint8":case"int16":case"uint16":case"int32":case"uint32":case"int64":case"uint64":case"float32":case"float64":k="number",isNaN(g)&&console.log('trying to encode "NaN" in '.concat(m.constructor.name,"#").concat(T));break;case"string":k="string",ee=!0;break;case"boolean":return}if(typeof g!==k&&(!ee||ee&&g!==null)){var Le="'".concat(JSON.stringify(g),"'").concat(g&&g.constructor&&" (".concat(g.constructor.name,")")||"");throw new re("a '".concat(k,"' was expected, but ").concat(Le," was provided in ").concat(m.constructor.name,"#").concat(T))}}function Re(g,h,m,T){if(!(g instanceof h))throw new re("a '".concat(h.name,"' was expected, but '").concat(g.constructor.name,"' was provided in ").concat(m.constructor.name,"#").concat(T))}function Xe(g,h,m,T,k){j(m,g,T,k);var ee=mt[g];if(ee)ee(h,m);else throw new re("a '".concat(g,"' was expected, but ").concat(m," was provided in ").concat(T.constructor.name,"#").concat(k))}function Et(g,h,m){return Qe[g](h,m)}var et=function(){function g(){for(var h=[],m=0;m<arguments.length;m++)h[m]=arguments[m];Object.defineProperties(this,{$changes:{value:new c(this,void 0,new we),enumerable:!1,writable:!0},$callbacks:{value:void 0,enumerable:!1,writable:!0}});var T=this._definition.descriptors;T&&Object.defineProperties(this,T),h[0]&&this.assign(h[0])}return g.onError=function(h){console.error(h)},g.is=function(h){return h._definition&&h._definition.schema!==void 0},g.prototype.onChange=function(h){return u(this.$callbacks||(this.$callbacks={}),t.OPERATION.REPLACE,h)},g.prototype.onRemove=function(h){return u(this.$callbacks||(this.$callbacks={}),t.OPERATION.DELETE,h)},g.prototype.assign=function(h){return Object.assign(this,h),this},Object.defineProperty(g.prototype,"_definition",{get:function(){return this.constructor._definition},enumerable:!1,configurable:!0}),g.prototype.setDirty=function(h,m){this.$changes.change(h,m)},g.prototype.listen=function(h,m,T){var k=this;return T===void 0&&(T=!0),this.$callbacks||(this.$callbacks={}),this.$callbacks[h]||(this.$callbacks[h]=[]),this.$callbacks[h].push(m),T&&this[h]!==void 0&&m(this[h],void 0),function(){return f(k.$callbacks[h],k.$callbacks[h].indexOf(m))}},g.prototype.decode=function(h,m,T){m===void 0&&(m={offset:0}),T===void 0&&(T=this);var k=[],ee=this.$changes.root,Le=h.length,Ce=0;for(ee.refs.set(Ce,this);m.offset<Le;){var it=h[m.offset++];if(it==a){Ce=oe(h,m);var rt=ee.refs.get(Ce);if(!rt)throw new Error('"refId" not found: '.concat(Ce));T=rt;continue}var Ne=T.$changes,at=T._definition!==void 0,Fe=at?it>>6<<6:it;if(Fe===t.OPERATION.CLEAR){T.clear(k);continue}var st=at?it%(Fe||255):oe(h,m),$e=at?T._definition.fieldsByIndex[st]:"",Ke=Ne.getType(st),ce=void 0,M=void 0,N=void 0;if(at?M=T["_".concat($e)]:(M=T.getByIndex(st),(Fe&t.OPERATION.ADD)===t.OPERATION.ADD?(N=T instanceof p?ke(h,m):st,T.setIndex(st,N)):N=T.getIndex(st)),(Fe&t.OPERATION.DELETE)===t.OPERATION.DELETE&&(Fe!==t.OPERATION.DELETE_AND_ADD&&T.deleteByIndex(st),M&&M.$changes&&ee.removeRef(M.$changes.refId),ce=null),$e===void 0){console.warn("@colyseus/schema: definition mismatch");for(var W={offset:m.offset};m.offset<Le&&!(Ee(h,m)&&(W.offset=m.offset+1,ee.refs.has(oe(h,W))));)m.offset++;continue}else if(Fe!==t.OPERATION.DELETE)if(g.is(Ke)){var F=oe(h,m);if(ce=ee.refs.get(F),Fe!==t.OPERATION.REPLACE){var G=this.getSchemaType(h,m,Ke);ce||(ce=this.createTypeInstance(G),ce.$changes.refId=F,M&&(ce.$callbacks=M.$callbacks,M.$changes.refId&&F!==M.$changes.refId&&ee.removeRef(M.$changes.refId))),ee.addRef(F,ce,ce!==M)}}else if(typeof Ke=="string")ce=Et(Ke,h,m);else{var me=A(Object.keys(Ke)[0]),Se=oe(h,m),fe=ee.refs.has(Se)?M||ee.refs.get(Se):new me.constructor;if(ce=fe.clone(!0),ce.$changes.refId=Se,M&&(ce.$callbacks=M.$callbacks,M.$changes.refId&&Se!==M.$changes.refId)){ee.removeRef(M.$changes.refId);for(var ve=M.entries(),xe=void 0;(xe=ve.next())&&!xe.done;){var Ve=xe.value,ze=Ve[0],Ue=Ve[1];k.push({refId:Se,op:t.OPERATION.DELETE,field:ze,value:void 0,previousValue:Ue})}}ee.addRef(Se,ce,fe!==M)}if(ce!=null){if(ce.$changes&&ce.$changes.setParent(Ne.ref,Ne.root,st),T instanceof g)T[$e]=ce;else if(T instanceof p){var ze=N;T.$items.set(ze,ce),T.$changes.allChanges.add(st)}else if(T instanceof y)T.setAt(st,ce);else if(T instanceof O){var ut=T.add(ce);T.setIndex(st,ut)}else if(T instanceof ue){var ut=T.add(ce);ut!==!1&&T.setIndex(st,ut)}}M!==ce&&k.push({refId:Ce,op:Fe,field:$e,dynamicIndex:N,value:ce,previousValue:M})}return this._triggerChanges(k),ee.garbageCollectDeletedRefs(),k},g.prototype.encode=function(h,m,T){h===void 0&&(h=!1),m===void 0&&(m=[]),T===void 0&&(T=!1);for(var k=this.$changes,ee=new WeakSet,Le=[k],Ce=1,it=0;it<Ce;it++){var rt=Le[it],Ne=rt.ref,at=Ne instanceof g;rt.ensureRefId(),ee.add(rt),rt!==k&&(rt.changed||h)&&(z(m,a),He(m,rt.refId));for(var Fe=h?Array.from(rt.allChanges):Array.from(rt.changes.values()),st=0,$e=Fe.length;st<$e;st++){var Ke=h?{op:t.OPERATION.ADD,index:Fe[st]}:Fe[st],ce=Ke.index,M=at?Ne._definition.fieldsByIndex&&Ne._definition.fieldsByIndex[ce]:ce,N=m.length;if(Ke.op!==t.OPERATION.TOUCH)if(at)z(m,ce|Ke.op);else{if(z(m,Ke.op),Ke.op===t.OPERATION.CLEAR)continue;He(m,ce)}if(!at&&(Ke.op&t.OPERATION.ADD)==t.OPERATION.ADD&&Ne instanceof p){var W=rt.ref.$indexes.get(ce);Dt(m,W)}if(Ke.op!==t.OPERATION.DELETE){var F=rt.getType(ce),G=rt.getValue(ce);if(G&&G.$changes&&!ee.has(G.$changes)&&(Le.push(G.$changes),G.$changes.ensureRefId(),Ce++),Ke.op!==t.OPERATION.TOUCH){if(g.is(F))Re(G,F,Ne,M),He(m,G.$changes.refId),(Ke.op&t.OPERATION.ADD)===t.OPERATION.ADD&&this.tryEncodeTypeId(m,F,G.constructor);else if(typeof F=="string")Xe(F,m,G,Ne,M);else{var me=A(Object.keys(F)[0]);Re(Ne["_".concat(M)],me.constructor,Ne,M),He(m,G.$changes.refId)}T&&rt.cache(ce,m.slice(N))}}}!h&&!T&&rt.discard()}return m},g.prototype.encodeAll=function(h){return this.encode(!0,[],h)},g.prototype.applyFilters=function(h,m){var T,k;m===void 0&&(m=!1);for(var ee=this,Le=new Set,Ce=le.get(h),it=[this.$changes],rt=1,Ne=[],at=function(st){var $e=it[st];if(Le.has($e.refId))return"continue";var Ke=$e.ref,ce=Ke instanceof g;z(Ne,a),He(Ne,$e.refId);var M=Ce.refIds.has($e),N=m||!M;Ce.addRefId($e);var W=Ce.containerIndexes.get($e),F=N?Array.from($e.allChanges):Array.from($e.changes.values());if(!m&&ce&&Ke._definition.indexesWithFilters){var G=Ke._definition.indexesWithFilters;G.forEach(function(Ct){!W.has(Ct)&&$e.allChanges.has(Ct)&&(N?F.push(Ct):F.push({op:t.OPERATION.ADD,index:Ct}))})}for(var me=0,Se=F.length;me<Se;me++){var fe=N?{op:t.OPERATION.ADD,index:F[me]}:F[me];if(fe.op===t.OPERATION.CLEAR){z(Ne,fe.op);continue}var ve=fe.index;if(fe.op===t.OPERATION.DELETE){ce?z(Ne,fe.op|ve):(z(Ne,fe.op),He(Ne,ve));continue}var xe=$e.getValue(ve),Ve=$e.getType(ve);if(ce){var ze=Ke._definition.filters&&Ke._definition.filters[ve];if(ze&&!ze.call(Ke,h,xe,ee)){xe&&xe.$changes&&Le.add(xe.$changes.refId);continue}}else{var Ue=$e.parent,ze=$e.getChildrenFilter();if(ze&&!ze.call(Ue,h,Ke.$indexes.get(ve),xe,ee)){xe&&xe.$changes&&Le.add(xe.$changes.refId);continue}}if(xe.$changes&&(it.push(xe.$changes),rt++),fe.op!==t.OPERATION.TOUCH)if(fe.op===t.OPERATION.ADD||ce)Ne.push.apply(Ne,(T=$e.caches[ve])!==null&&T!==void 0?T:[]),W.add(ve);else if(W.has(ve))Ne.push.apply(Ne,(k=$e.caches[ve])!==null&&k!==void 0?k:[]);else{if(W.add(ve),z(Ne,t.OPERATION.ADD),He(Ne,ve),Ke instanceof p){var ut=$e.ref.$indexes.get(ve);Dt(Ne,ut)}xe.$changes?He(Ne,xe.$changes.refId):mt[Ve](Ne,xe)}else if(xe.$changes&&!ce){if(z(Ne,t.OPERATION.ADD),He(Ne,ve),Ke instanceof p){var ut=$e.ref.$indexes.get(ve);Dt(Ne,ut)}He(Ne,xe.$changes.refId)}}},Fe=0;Fe<rt;Fe++)at(Fe);return Ne},g.prototype.clone=function(){var h,m=new this.constructor,T=this._definition.schema;for(var k in T)typeof this[k]=="object"&&typeof((h=this[k])===null||h===void 0?void 0:h.clone)=="function"?m[k]=this[k].clone():m[k]=this[k];return m},g.prototype.toJSON=function(){var h=this._definition.schema,m=this._definition.deprecated,T={};for(var k in h)!m[k]&&this[k]!==null&&typeof this[k]<"u"&&(T[k]=typeof this[k].toJSON=="function"?this[k].toJSON():this["_".concat(k)]);return T},g.prototype.discardAllChanges=function(){this.$changes.discardAll()},g.prototype.getByIndex=function(h){return this[this._definition.fieldsByIndex[h]]},g.prototype.deleteByIndex=function(h){this[this._definition.fieldsByIndex[h]]=void 0},g.prototype.tryEncodeTypeId=function(h,m,T){m._typeid!==T._typeid&&(z(h,l),He(h,T._typeid))},g.prototype.getSchemaType=function(h,m,T){var k;return h[m.offset]===l&&(m.offset++,k=this.constructor._context.get(oe(h,m))),k||T},g.prototype.createTypeInstance=function(h){var m=new h;return m.$changes.root=this.$changes.root,m},g.prototype._triggerChanges=function(h){for(var m,T,k,ee,Le,Ce,it,rt,Ne,at=new Set,Fe=this.$changes.root.refs,st=function(Ke){var ce=h[Ke],M=ce.refId,N=Fe.get(M),W=N.$callbacks;if((ce.op&t.OPERATION.DELETE)===t.OPERATION.DELETE&&ce.previousValue instanceof g&&((T=(m=ce.previousValue.$callbacks)===null||m===void 0?void 0:m[t.OPERATION.DELETE])===null||T===void 0||T.forEach(function(F){return F()})),!W)return"continue";if(N instanceof g){if(!at.has(M))try{(k=W==null?void 0:W[t.OPERATION.REPLACE])===null||k===void 0||k.forEach(function(F){return F()})}catch(F){g.onError(F)}try{W.hasOwnProperty(ce.field)&&((ee=W[ce.field])===null||ee===void 0||ee.forEach(function(F){return F(ce.value,ce.previousValue)}))}catch(F){g.onError(F)}}else ce.op===t.OPERATION.ADD&&ce.previousValue===void 0?(Le=W[t.OPERATION.ADD])===null||Le===void 0||Le.forEach(function(F){var G;return F(ce.value,(G=ce.dynamicIndex)!==null&&G!==void 0?G:ce.field)}):ce.op===t.OPERATION.DELETE?ce.previousValue!==void 0&&((Ce=W[t.OPERATION.DELETE])===null||Ce===void 0||Ce.forEach(function(F){var G;return F(ce.previousValue,(G=ce.dynamicIndex)!==null&&G!==void 0?G:ce.field)})):ce.op===t.OPERATION.DELETE_AND_ADD&&(ce.previousValue!==void 0&&((it=W[t.OPERATION.DELETE])===null||it===void 0||it.forEach(function(F){var G;return F(ce.previousValue,(G=ce.dynamicIndex)!==null&&G!==void 0?G:ce.field)})),(rt=W[t.OPERATION.ADD])===null||rt===void 0||rt.forEach(function(F){var G;return F(ce.value,(G=ce.dynamicIndex)!==null&&G!==void 0?G:ce.field)})),ce.value!==ce.previousValue&&((Ne=W[t.OPERATION.REPLACE])===null||Ne===void 0||Ne.forEach(function(F){var G;return F(ce.value,(G=ce.dynamicIndex)!==null&&G!==void 0?G:ce.field)}));at.add(M)},$e=0;$e<h.length;$e++)st($e)},g._definition=I.create(),g}();function _n(g){for(var h=[g.$changes],m=1,T={},k=T,ee=function(Ce){var it=h[Ce];it.changes.forEach(function(rt){var Ne=it.ref,at=rt.index,Fe=Ne._definition?Ne._definition.fieldsByIndex[at]:Ne.$indexes.get(at);k[Fe]=it.getValue(at)})},Le=0;Le<m;Le++)ee(Le);return T}var Xt={context:new U},Ci=function(g){r(h,g);function h(){return g!==null&&g.apply(this,arguments)||this}return s([w("string",Xt)],h.prototype,"name",void 0),s([w("string",Xt)],h.prototype,"type",void 0),s([w("number",Xt)],h.prototype,"referencedType",void 0),h}(et),hi=function(g){r(h,g);function h(){var m=g!==null&&g.apply(this,arguments)||this;return m.fields=new y,m}return s([w("number",Xt)],h.prototype,"id",void 0),s([w([Ci],Xt)],h.prototype,"fields",void 0),h}(et),ks=function(g){r(h,g);function h(){var m=g!==null&&g.apply(this,arguments)||this;return m.types=new y,m}return h.encode=function(m){var T,k=m.constructor,ee=new h;ee.rootType=k._typeid;var Le=function(Ne,at){for(var Fe in at){var st=new Ci;st.name=Fe;var $e=void 0;if(typeof at[Fe]=="string")$e=at[Fe];else{var Ke=at[Fe],ce=void 0;et.is(Ke)?($e="ref",ce=at[Fe]):($e=Object.keys(Ke)[0],typeof Ke[$e]=="string"?$e+=":"+Ke[$e]:ce=Ke[$e]),st.referencedType=ce?ce._typeid:-1}st.type=$e,Ne.fields.push(st)}ee.types.push(Ne)},Ce=(T=k._context)===null||T===void 0?void 0:T.types;for(var it in Ce){var rt=new hi;rt.id=Number(it),Le(rt,Ce[it]._definition.schema)}return ee.encodeAll()},h.decode=function(m,T){var k=new U,ee=new h;ee.decode(m,T);var Le=ee.types.reduce(function(at,Fe){var st=function(Ke){r(ce,Ke);function ce(){return Ke!==null&&Ke.apply(this,arguments)||this}return ce}(et),$e=Fe.id;return at[$e]=st,k.add(st,$e),at},{});ee.types.forEach(function(at){var Fe=Le[at.id];at.fields.forEach(function(st){var $e;if(st.referencedType!==void 0){var Ke=st.type,ce=Le[st.referencedType];if(!ce){var M=st.type.split(":");Ke=M[0],ce=M[1]}Ke==="ref"?w(ce,{context:k})(Fe.prototype,st.name):w(($e={},$e[Ke]=ce,$e),{context:k})(Fe.prototype,st.name)}else w(st.type,{context:k})(Fe.prototype,st.name)})});var Ce=Le[ee.rootType],it=new Ce;for(var rt in Ce._definition.schema){var Ne=Ce._definition.schema[rt];typeof Ne!="string"&&(it[rt]=typeof Ne=="function"?new Ne:new(A(Object.keys(Ne)[0])).constructor)}return it},s([w([hi],Xt)],h.prototype,"types",void 0),s([w("number",Xt)],h.prototype,"rootType",void 0),h}(et);C("map",{constructor:p}),C("array",{constructor:y}),C("set",{constructor:ue}),C("collection",{constructor:O}),t.ArraySchema=y,t.CollectionSchema=O,t.Context=U,t.MapSchema=p,t.Reflection=ks,t.ReflectionField=Ci,t.ReflectionType=hi,t.Schema=et,t.SchemaDefinition=I,t.SetSchema=ue,t.decode=Qe,t.defineTypes=$,t.deprecated=V,t.dumpChanges=_n,t.encode=mt,t.filter=Z,t.filterChildren=D,t.hasFilter=P,t.registerType=C,t.type=w})})(ba,ba.exports);var lh=ba.exports,k0=Ut&&Ut.__createBinding||(Object.create?function(i,e,t,n){n===void 0&&(n=t);var r=Object.getOwnPropertyDescriptor(e,t);(!r||("get"in r?!e.__esModule:r.writable||r.configurable))&&(r={enumerable:!0,get:function(){return e[t]}}),Object.defineProperty(i,n,r)}:function(i,e,t,n){n===void 0&&(n=t),i[n]=e[t]}),z0=Ut&&Ut.__setModuleDefault||(Object.create?function(i,e){Object.defineProperty(i,"default",{enumerable:!0,value:e})}:function(i,e){i.default=e}),H0=Ut&&Ut.__importStar||function(i){if(i&&i.__esModule)return i;var e={};if(i!=null)for(var t in i)t!=="default"&&Object.prototype.hasOwnProperty.call(i,t)&&k0(e,i,t);return z0(e,i),e};Object.defineProperty(Ur,"__esModule",{value:!0});Ur.Room=void 0;const pc=H0(tr),W0=Ls,Kt=qa,mc=Ri,V0=Or,cs=nr,hn=lh,gc=Ds;class ja{constructor(e,t){this.onStateChange=(0,cs.createSignal)(),this.onError=(0,cs.createSignal)(),this.onLeave=(0,cs.createSignal)(),this.onJoin=(0,cs.createSignal)(),this.hasJoined=!1,this.onMessageHandlers=(0,V0.createNanoEvents)(),this.roomId=null,this.name=e,t&&(this.serializer=new((0,mc.getSerializer)("schema")),this.rootSchema=t,this.serializer.state=new t),this.onError((n,r)=>{var s;return(s=console.warn)===null||s===void 0?void 0:s.call(console,`colyseus.js - onError => (${n}) ${r}`)}),this.onLeave(()=>this.removeAllListeners())}get id(){return this.roomId}connect(e,t,n=this,r){const s=new W0.Connection;n.connection=s,s.events.onmessage=ja.prototype.onMessageCallback.bind(n),s.events.onclose=function(o){var a;if(!n.hasJoined){(a=console.warn)===null||a===void 0||a.call(console,`Room connection was closed unexpectedly (${o.code}): ${o.reason}`),n.onError.invoke(o.code,o.reason);return}o.code===gc.CloseCode.DEVMODE_RESTART&&t?t():(n.onLeave.invoke(o.code,o.reason),n.destroy())},s.events.onerror=function(o){var a;(a=console.warn)===null||a===void 0||a.call(console,`Room, onError (${o.code}): ${o.reason}`),n.onError.invoke(o.code,o.reason)},s.connect(e,r)}leave(e=!0){return new Promise(t=>{this.onLeave(n=>t(n)),this.connection?e?this.connection.send([Kt.Protocol.LEAVE_ROOM]):this.connection.close():this.onLeave.invoke(gc.CloseCode.CONSENTED)})}onMessage(e,t){return this.onMessageHandlers.on(this.getMessageHandlerKey(e),t)}send(e,t){const n=[Kt.Protocol.ROOM_DATA];typeof e=="string"?hn.encode.string(n,e):hn.encode.number(n,e);let r;if(t!==void 0){const s=pc.encode(t);r=new Uint8Array(n.length+s.byteLength),r.set(new Uint8Array(n),0),r.set(new Uint8Array(s),n.length)}else r=new Uint8Array(n);this.connection.send(r.buffer)}sendBytes(e,t){const n=[Kt.Protocol.ROOM_DATA_BYTES];typeof e=="string"?hn.encode.string(n,e):hn.encode.number(n,e);let r;r=new Uint8Array(n.length+(t.byteLength||t.length)),r.set(new Uint8Array(n),0),r.set(new Uint8Array(t),n.length),this.connection.send(r.buffer)}get state(){return this.serializer.getState()}removeAllListeners(){this.onJoin.clear(),this.onStateChange.clear(),this.onError.clear(),this.onLeave.clear(),this.onMessageHandlers.events={}}onMessageCallback(e){const t=Array.from(new Uint8Array(e.data)),n=t[0];if(n===Kt.Protocol.JOIN_ROOM){let r=1;const s=(0,Kt.utf8Read)(t,r);if(r+=(0,Kt.utf8Length)(s),this.serializerId=(0,Kt.utf8Read)(t,r),r+=(0,Kt.utf8Length)(this.serializerId),!this.serializer){const o=(0,mc.getSerializer)(this.serializerId);this.serializer=new o}t.length>r&&this.serializer.handshake&&this.serializer.handshake(t,{offset:r}),this.reconnectionToken=`${this.roomId}:${s}`,this.hasJoined=!0,this.onJoin.invoke(),this.connection.send([Kt.Protocol.JOIN_ROOM])}else if(n===Kt.Protocol.ERROR){const r={offset:1},s=hn.decode.number(t,r),o=hn.decode.string(t,r);this.onError.invoke(s,o)}else if(n===Kt.Protocol.LEAVE_ROOM)this.leave();else if(n===Kt.Protocol.ROOM_DATA_SCHEMA){const r={offset:1},o=this.serializer.getState().constructor._context.get(hn.decode.number(t,r)),a=new o;a.decode(t,r),this.dispatchMessage(o,a)}else if(n===Kt.Protocol.ROOM_STATE)t.shift(),this.setState(t);else if(n===Kt.Protocol.ROOM_STATE_PATCH)t.shift(),this.patch(t);else if(n===Kt.Protocol.ROOM_DATA){const r={offset:1},s=hn.decode.stringCheck(t,r)?hn.decode.string(t,r):hn.decode.number(t,r),o=t.length>r.offset?pc.decode(e.data,r.offset):void 0;this.dispatchMessage(s,o)}else if(n===Kt.Protocol.ROOM_DATA_BYTES){const r={offset:1},s=hn.decode.stringCheck(t,r)?hn.decode.string(t,r):hn.decode.number(t,r);this.dispatchMessage(s,new Uint8Array(t.slice(r.offset)))}}setState(e){this.serializer.setState(e),this.onStateChange.invoke(this.serializer.getState())}patch(e){this.serializer.patch(e),this.onStateChange.invoke(this.serializer.getState())}dispatchMessage(e,t){var n;const r=this.getMessageHandlerKey(e);this.onMessageHandlers.events[r]?this.onMessageHandlers.emit(r,t):this.onMessageHandlers.events["*"]?this.onMessageHandlers.emit("*",e,t):(n=console.warn)===null||n===void 0||n.call(console,`colyseus.js: onMessage() not registered for type '${e}'.`)}destroy(){this.serializer&&this.serializer.teardown()}getMessageHandlerKey(e){switch(typeof e){case"function":return`$${e._typeid}`;case"string":return e;case"number":return`i${e}`;default:throw new Error("invalid message type.")}}}Ur.Room=ja;var Os={};function _c(i,e){e.headers=i.headers||{},e.statusMessage=i.statusText,e.statusCode=i.status,e.data=i.response}function Tn(i,e,t){return new Promise(function(n,r){t=t||{};var s=new XMLHttpRequest,o,a,l,c=t.body,u=t.headers||{};t.timeout&&(s.timeout=t.timeout),s.ontimeout=s.onerror=function(d){d.timeout=d.type=="timeout",r(d)},s.open(i,e.href||e),s.onload=function(){for(l=s.getAllResponseHeaders().trim().split(/[\r\n]+/),_c(s,s);a=l.shift();)a=a.split(": "),s.headers[a.shift().toLowerCase()]=a.join(": ");if(a=s.headers["content-type"],a&&~a.indexOf("application/json"))try{s.data=JSON.parse(s.data,t.reviver)}catch(d){return _c(s,d),r(d)}(s.status>=400?r:n)(s)},typeof FormData<"u"&&c instanceof FormData||c&&typeof c=="object"&&(u["content-type"]="application/json",c=JSON.stringify(c)),s.withCredentials=!!t.withCredentials;for(o in u)s.setRequestHeader(o,u[o]);s.send(c)})}var X0=Tn.bind(Tn,"GET"),$0=Tn.bind(Tn,"POST"),Y0=Tn.bind(Tn,"PATCH"),q0=Tn.bind(Tn,"DELETE"),j0=Tn.bind(Tn,"PUT");const Z0=Object.freeze(Object.defineProperty({__proto__:null,del:q0,get:X0,patch:Y0,post:$0,put:j0,send:Tn},Symbol.toStringTag,{value:"Module"})),K0=y0(Z0);var J0=Ut&&Ut.__createBinding||(Object.create?function(i,e,t,n){n===void 0&&(n=t);var r=Object.getOwnPropertyDescriptor(e,t);(!r||("get"in r?!e.__esModule:r.writable||r.configurable))&&(r={enumerable:!0,get:function(){return e[t]}}),Object.defineProperty(i,n,r)}:function(i,e,t,n){n===void 0&&(n=t),i[n]=e[t]}),Q0=Ut&&Ut.__setModuleDefault||(Object.create?function(i,e){Object.defineProperty(i,"default",{enumerable:!0,value:e})}:function(i,e){i.default=e}),e_=Ut&&Ut.__importStar||function(i){if(i&&i.__esModule)return i;var e={};if(i!=null)for(var t in i)t!=="default"&&Object.prototype.hasOwnProperty.call(i,t)&&J0(e,i,t);return Q0(e,i),e};Object.defineProperty(Os,"__esModule",{value:!0});Os.HTTP=void 0;const t_=Ds,n_=e_(K0);class i_{constructor(e,t={}){this.client=e,this.headers=t}get(e,t={}){return this.request("get",e,t)}post(e,t={}){return this.request("post",e,t)}del(e,t={}){return this.request("del",e,t)}put(e,t={}){return this.request("put",e,t)}request(e,t,n={}){return n_[e](this.client.getHttpEndpoint(t),this.getOptions(n)).catch(r=>{var s;const o=r.statusCode,a=((s=r.data)===null||s===void 0?void 0:s.error)||r.statusMessage||r.message;throw!o&&!a?r:new t_.ServerError(o,a)})}getOptions(e){return e.headers=Object.assign({},this.headers,e.headers),this.authToken&&(e.headers.Authorization=`Bearer ${this.authToken}`),typeof cc<"u"&&cc.sys&&cc.sys.isNative||(e.withCredentials=!0),e}}Os.HTTP=i_;var Nr={},li={};Object.defineProperty(li,"__esModule",{value:!0});li.getItem=li.removeItem=li.setItem=void 0;let Sr;function Za(){if(!Sr)try{Sr=typeof cc<"u"&&cc.sys&&cc.sys.localStorage?cc.sys.localStorage:window.localStorage}catch{}return Sr||(Sr={cache:{},setItem:function(i,e){this.cache[i]=e},getItem:function(i){this.cache[i]},removeItem:function(i){delete this.cache[i]}}),Sr}function r_(i,e){Za().setItem(i,e)}li.setItem=r_;function s_(i){Za().removeItem(i)}li.removeItem=s_;function o_(i,e){const t=Za().getItem(i);typeof Promise>"u"||!(t instanceof Promise)?e(t):t.then(n=>e(n))}li.getItem=o_;var xi=Ut&&Ut.__awaiter||function(i,e,t,n){function r(s){return s instanceof t?s:new t(function(o){o(s)})}return new(t||(t=Promise))(function(s,o){function a(u){try{c(n.next(u))}catch(d){o(d)}}function l(u){try{c(n.throw(u))}catch(d){o(d)}}function c(u){u.done?s(u.value):r(u.value).then(a,l)}c((n=n.apply(i,e||[])).next())})},$i=Ut&&Ut.__classPrivateFieldGet||function(i,e,t,n){if(t==="a"&&!n)throw new TypeError("Private accessor was defined without a getter");if(typeof e=="function"?i!==e||!n:!e.has(i))throw new TypeError("Cannot read private member from an object whose class did not declare it");return t==="m"?n:t==="a"?n.call(i):n?n.value:e.get(i)},Mr=Ut&&Ut.__classPrivateFieldSet||function(i,e,t,n,r){if(n==="m")throw new TypeError("Private method is not writable");if(n==="a"&&!r)throw new TypeError("Private accessor was defined without a setter");if(typeof e=="function"?i!==e||!r:!e.has(i))throw new TypeError("Cannot write private member to an object whose class did not declare it");return n==="a"?r.call(i,t):r?r.value=t:e.set(i,t),t},ms,wa,ri,gs;Object.defineProperty(Nr,"__esModule",{value:!0});Nr.Auth=void 0;const Co=li,a_=Or;class l_{constructor(e){this.http=e,this.settings={path:"/auth",key:"colyseus-auth-token"},ms.set(this,!1),wa.set(this,void 0),ri.set(this,void 0),gs.set(this,(0,a_.createNanoEvents)()),(0,Co.getItem)(this.settings.key,t=>this.token=t)}set token(e){this.http.authToken=e}get token(){return this.http.authToken}onChange(e){const t=$i(this,gs,"f").on("change",e);return $i(this,ms,"f")||Mr(this,wa,new Promise((n,r)=>{this.getUserData().then(s=>{this.emitChange(Object.assign(Object.assign({},s),{token:this.token}))}).catch(s=>{this.emitChange({user:null,token:void 0})}).finally(()=>{n()})}),"f"),Mr(this,ms,!0,"f"),t}getUserData(){return xi(this,void 0,void 0,function*(){if(this.token)return(yield this.http.get(`${this.settings.path}/userdata`)).data;throw new Error("missing auth.token")})}registerWithEmailAndPassword(e,t,n){return xi(this,void 0,void 0,function*(){const r=(yield this.http.post(`${this.settings.path}/register`,{body:{email:e,password:t,options:n}})).data;return this.emitChange(r),r})}signInWithEmailAndPassword(e,t){return xi(this,void 0,void 0,function*(){const n=(yield this.http.post(`${this.settings.path}/login`,{body:{email:e,password:t}})).data;return this.emitChange(n),n})}signInAnonymously(e){return xi(this,void 0,void 0,function*(){const t=(yield this.http.post(`${this.settings.path}/anonymous`,{body:{options:e}})).data;return this.emitChange(t),t})}sendPasswordResetEmail(e){return xi(this,void 0,void 0,function*(){return(yield this.http.post(`${this.settings.path}/forgot-password`,{body:{email:e}})).data})}signInWithProvider(e,t={}){return xi(this,void 0,void 0,function*(){return new Promise((n,r)=>{const s=t.width||480,o=t.height||768,a=this.token?`?token=${this.token}`:"",l=`Login with ${e[0].toUpperCase()+e.substring(1)}`,c=this.http.client.getHttpEndpoint(`${t.prefix||`${this.settings.path}/provider`}/${e}${a}`),u=screen.width/2-s/2,d=screen.height/2-o/2;Mr(this,ri,window.open(c,l,"toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width="+s+", height="+o+", top="+d+", left="+u),"f");const f=x=>{x.data.user===void 0&&x.data.token===void 0||(clearInterval(v),$i(this,ri,"f").close(),Mr(this,ri,void 0,"f"),window.removeEventListener("message",f),x.data.error!==void 0?r(x.data.error):(n(x.data),this.emitChange(x.data)))},v=setInterval(()=>{(!$i(this,ri,"f")||$i(this,ri,"f").closed)&&(Mr(this,ri,void 0,"f"),r("cancelled"),window.removeEventListener("message",f))},200);window.addEventListener("message",f)})})}signOut(){return xi(this,void 0,void 0,function*(){this.emitChange({user:null,token:null})})}emitChange(e){e.token!==void 0&&(this.token=e.token,e.token===null?(0,Co.removeItem)(this.settings.key):(0,Co.setItem)(this.settings.key,e.token)),$i(this,gs,"f").emit("change",e)}}Nr.Auth=l_;ms=new WeakMap,wa=new WeakMap,ri=new WeakMap,gs=new WeakMap;var Ns={};Object.defineProperty(Ns,"__esModule",{value:!0});Ns.discordURLBuilder=void 0;function c_(i){var e;const t=((e=window==null?void 0:window.location)===null||e===void 0?void 0:e.hostname)||"localhost",n=i.hostname.split("."),r=!i.hostname.includes("trycloudflare.com")&&!i.hostname.includes("discordsays.com")&&n.length>2?`/${n[0]}`:"";return i.pathname.startsWith("/.proxy")?`${i.protocol}//${t}${r}${i.pathname}${i.search}`:`${i.protocol}//${t}/.proxy/colyseus${r}${i.pathname}${i.search}`}Ns.discordURLBuilder=c_;var Rn=Ut&&Ut.__awaiter||function(i,e,t,n){function r(s){return s instanceof t?s:new t(function(o){o(s)})}return new(t||(t=Promise))(function(s,o){function a(u){try{c(n.next(u))}catch(d){o(d)}}function l(u){try{c(n.throw(u))}catch(d){o(d)}}function c(u){u.done?s(u.value):r(u.value).then(a,l)}c((n=n.apply(i,e||[])).next())})},Po;Object.defineProperty(er,"__esModule",{value:!0});er.Client=er.MatchMakeError=void 0;const h_=Ds,u_=Ur,f_=Os,d_=Nr,p_=Ns;class Fs extends Error{constructor(e,t){super(e),this.code=t,Object.setPrototypeOf(this,Fs.prototype)}}er.MatchMakeError=Fs;const vc=typeof window<"u"&&typeof((Po=window==null?void 0:window.location)===null||Po===void 0?void 0:Po.hostname)<"u"?`${window.location.protocol.replace("http","ws")}//${window.location.hostname}${window.location.port&&`:${window.location.port}`}`:"ws://127.0.0.1:2567";class m_{constructor(e=vc,t){var n,r;if(typeof e=="string"){const s=e.startsWith("/")?new URL(e,vc):new URL(e),o=s.protocol==="https:"||s.protocol==="wss:",a=Number(s.port||(o?443:80));this.settings={hostname:s.hostname,pathname:s.pathname,port:a,secure:o}}else e.port===void 0&&(e.port=e.secure?443:80),e.pathname===void 0&&(e.pathname=""),this.settings=e;this.settings.pathname.endsWith("/")&&(this.settings.pathname=this.settings.pathname.slice(0,-1)),this.http=new f_.HTTP(this,(t==null?void 0:t.headers)||{}),this.auth=new d_.Auth(this.http),this.urlBuilder=t==null?void 0:t.urlBuilder,!this.urlBuilder&&typeof window<"u"&&(!((r=(n=window==null?void 0:window.location)===null||n===void 0?void 0:n.hostname)===null||r===void 0)&&r.includes("discordsays.com"))&&(this.urlBuilder=p_.discordURLBuilder,console.log("Colyseus SDK: Discord Embedded SDK detected. Using custom URL builder."))}joinOrCreate(e,t={},n){return Rn(this,void 0,void 0,function*(){return yield this.createMatchMakeRequest("joinOrCreate",e,t,n)})}create(e,t={},n){return Rn(this,void 0,void 0,function*(){return yield this.createMatchMakeRequest("create",e,t,n)})}join(e,t={},n){return Rn(this,void 0,void 0,function*(){return yield this.createMatchMakeRequest("join",e,t,n)})}joinById(e,t={},n){return Rn(this,void 0,void 0,function*(){return yield this.createMatchMakeRequest("joinById",e,t,n)})}reconnect(e,t){return Rn(this,void 0,void 0,function*(){if(typeof e=="string"&&typeof t=="string")throw new Error("DEPRECATED: .reconnect() now only accepts 'reconnectionToken' as argument.\nYou can get this token from previously connected `room.reconnectionToken`");const[n,r]=e.split(":");if(!n||!r)throw new Error(`Invalid reconnection token format.
The format should be roomId:reconnectionToken`);return yield this.createMatchMakeRequest("reconnect",n,{reconnectionToken:r},t)})}getAvailableRooms(e=""){return Rn(this,void 0,void 0,function*(){return(yield this.http.get(`matchmake/${e}`,{headers:{Accept:"application/json"}})).data})}consumeSeatReservation(e,t,n){return Rn(this,void 0,void 0,function*(){const r=this.createRoom(e.room.name,t);r.roomId=e.room.roomId,r.sessionId=e.sessionId;const s={sessionId:r.sessionId};e.reconnectionToken&&(s.reconnectionToken=e.reconnectionToken);const o=n||r;return r.connect(this.buildEndpoint(e.room,s),e.devMode&&(()=>Rn(this,void 0,void 0,function*(){console.info(`[Colyseus devMode]: ${String.fromCodePoint(128260)} Re-establishing connection with room id '${r.roomId}'...`);let a=0,l=8;const c=()=>Rn(this,void 0,void 0,function*(){a++;try{yield this.consumeSeatReservation(e,t,o),console.info(`[Colyseus devMode]: ${String.fromCodePoint(9989)} Successfully re-established connection with room '${r.roomId}'`)}catch{a<l?(console.info(`[Colyseus devMode]: ${String.fromCodePoint(128260)} retrying... (${a} out of ${l})`),setTimeout(c,2e3)):console.info(`[Colyseus devMode]: ${String.fromCodePoint(10060)} Failed to reconnect. Is your server running? Please check server logs.`)}});setTimeout(c,2e3)})),o,this.http.headers),new Promise((a,l)=>{const c=(u,d)=>l(new h_.ServerError(u,d));o.onError.once(c),o.onJoin.once(()=>{o.onError.remove(c),a(o)})})})}createMatchMakeRequest(e,t,n={},r,s){return Rn(this,void 0,void 0,function*(){const o=(yield this.http.post(`matchmake/${e}/${t}`,{headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify(n)})).data;if(o.error)throw new Fs(o.error,o.code);return e==="reconnect"&&(o.reconnectionToken=n.reconnectionToken),yield this.consumeSeatReservation(o,r,s)})}createRoom(e,t){return new u_.Room(e,t)}buildEndpoint(e,t={}){const n=[];for(const o in t)t.hasOwnProperty(o)&&n.push(`${o}=${t[o]}`);let r=this.settings.secure?"wss://":"ws://";e.publicAddress?r+=`${e.publicAddress}`:r+=`${this.settings.hostname}${this.getEndpointPort()}${this.settings.pathname}`;const s=`${r}/${e.processId}/${e.roomId}?${n.join("&")}`;return this.urlBuilder?this.urlBuilder(new URL(s)):s}getHttpEndpoint(e=""){const t=e.startsWith("/")?e:`/${e}`,n=`${this.settings.secure?"https":"http"}://${this.settings.hostname}${this.getEndpointPort()}${this.settings.pathname}${t}`;return this.urlBuilder?this.urlBuilder(new URL(n)):n}getEndpointPort(){return this.settings.port!==80&&this.settings.port!==443?`:${this.settings.port}`:""}}er.Client=m_;var Gs={};Object.defineProperty(Gs,"__esModule",{value:!0});Gs.SchemaSerializer=void 0;const xc=lh;class g_{setState(e){return this.state.decode(e)}getState(){return this.state}patch(e){return this.state.decode(e)}teardown(){var e,t;(t=(e=this.state)===null||e===void 0?void 0:e.$changes)===null||t===void 0||t.root.clearRefs()}handshake(e,t){this.state?new xc.Reflection().decode(e,t):this.state=xc.Reflection.decode(e,t)}}Gs.SchemaSerializer=g_;var Bs={};Object.defineProperty(Bs,"__esModule",{value:!0});Bs.NoneSerializer=void 0;class __{setState(e){}getState(){return null}patch(e){}teardown(){}handshake(e){}}Bs.NoneSerializer=__;(function(i){Object.defineProperty(i,"__esModule",{value:!0}),i.SchemaSerializer=i.registerSerializer=i.Auth=i.Room=i.ErrorCode=i.Protocol=i.MatchMakeError=i.Client=void 0;var e=er;Object.defineProperty(i,"Client",{enumerable:!0,get:function(){return e.Client}}),Object.defineProperty(i,"MatchMakeError",{enumerable:!0,get:function(){return e.MatchMakeError}});var t=qa;Object.defineProperty(i,"Protocol",{enumerable:!0,get:function(){return t.Protocol}}),Object.defineProperty(i,"ErrorCode",{enumerable:!0,get:function(){return t.ErrorCode}});var n=Ur;Object.defineProperty(i,"Room",{enumerable:!0,get:function(){return n.Room}});var r=Nr;Object.defineProperty(i,"Auth",{enumerable:!0,get:function(){return r.Auth}});const s=Gs;Object.defineProperty(i,"SchemaSerializer",{enumerable:!0,get:function(){return s.SchemaSerializer}});const o=Bs,a=Ri;Object.defineProperty(i,"registerSerializer",{enumerable:!0,get:function(){return a.registerSerializer}}),(0,a.registerSerializer)("schema",s.SchemaSerializer),(0,a.registerSerializer)("none",o.NoneSerializer)})(sh);class v_{constructor(){this.threeManager=new Cg,this.inputManager=new Bg,this.inputManager.setPointerTarget(this.threeManager.renderer.domElement),this.worldGenerator=new Ye(this.threeManager,{chunkSize:ls}),this.currentMapRows=Tr,this.currentBuildings=Tr.buildings||[],this.worldGenerator.generateFromChunkedArray(Tr,ec,ls,{buildings:this.currentBuildings}),this.pathfinder=new kg(this.worldGenerator),this.userId=this.generateUserId();const e=Tr.spawn||{x:0,y:0},t=this.worldGenerator.findNearestWalkable(e.x,e.y,16)||this.worldGenerator.findHighestWalkable()||{x:-8,y:0};this.player=new As(this.threeManager,this.inputManager,this.worldGenerator,t.x,t.y,{isLocal:!0,userId:this.userId}),this.worldGenerator.updateVisibleTilesAround(this.player.gridX,this.player.gridY),this.remotePlayers=new Map,this.wildlifeSystem=new rc(this.threeManager,this.worldGenerator,fc),this.hoveredTile=null,this.activePath=[],this.collisionDebugEnabled=!1,this.lastFrameTime=performance.now(),this.connectToServer(),this.inputManager.onLeftClick(n=>{if(n===0&&this.hoveredTile&&this.player){const r=this.pathfinder.findPath(this.player.gridX,this.player.gridY,this.hoveredTile.gridX,this.hoveredTile.gridY);r&&r.length>0&&this.player.setPath(r)}}),this.animate=this.animate.bind(this),this.statusPill=document.getElementById("status-pill"),this.positionReadout=document.getElementById("position-readout"),this.zoneReadout=document.getElementById("zone-readout"),this.chunkReadout=document.getElementById("chunk-readout"),this.wildlifeReadout=document.getElementById("wildlife-readout"),this.playerCountReadout=document.getElementById("player-count-readout"),this.adminPanel=new M0({onApplyMap:n=>this.applyWorldMap(n,"custom"),onRandomizeMap:n=>this.applyWorldMap(n,"random"),onStartCombat:()=>this.startCombatScene(),onToggleCollisionDebug:n=>this.setCollisionDebugVisible(n)}),this.updateHud("Connecting"),requestAnimationFrame(this.animate)}async connectToServer(){try{console.log("[Game] Connecting to server...");const e=window.location.hostname;this.client=new sh.Client(`ws://${e}:2567`),this.room=await this.client.joinOrCreate("world",{userId:this.userId,x:this.player.gridX,y:this.player.gridY,z:this.player.gridZ}),console.log("[Game] Connected to room:",this.room.id),this.updateHud("Online"),this.setupNetworking(),this.syncCurrentMapToServer("client-default"),this.combatScene=new dc({client:this.client,userId:this.userId,onExit:()=>this.updateHud("Online")})}catch(e){console.error("[Game] Failed to connect to server:",e),this.updateHud("Solo")}}setupNetworking(){this.room&&(this.room.state.players.onAdd=(e,t)=>{t===this.room.sessionId?this.player.applyAuthoritativeCenter(e.centerX,e.centerY,e.centerZ,e.tileX,e.tileY,e.tileZ):this.addRemotePlayer(e,t)},this.room.state.players.onRemove=(e,t)=>{this.removeRemotePlayer(t)},this.room.onMessage("world:chunk:init",e=>{this.serverChunkInfo=e,this.updateHud("Online")}),this.room.onMessage("world:chunk:entered",e=>{this.serverChunkInfo=e,this.updateHud("Online")}),this.room.onMessage("world:map:updated",e=>{this.adminPanel.setMessage(`World ${e.source} map active: ${e.width} x ${e.height}.`,"success")}),setInterval(()=>{var e,t;if((t=(e=this.room)==null?void 0:e.connection)!=null&&t.isOpen&&this.player){const n=this.player.getCenterPayload();try{this.room.send("player:move",{centerX:n.centerX,centerY:n.centerY,centerZ:n.centerZ})}catch(r){console.warn("[Game] Skipped movement sync while connection is closing.",r)}}},100))}addRemotePlayer(e,t){if(this.remotePlayers.has(t))return;const n=new As(this.threeManager,null,this.worldGenerator,e.centerX,e.centerY,{isLocal:!1,userId:e.userId});n.setRemoteTarget(e.centerX,e.centerY,e.centerZ),n.setCollisionDebugVisible(this.collisionDebugEnabled),this.remotePlayers.set(t,n)}removeRemotePlayer(e){const t=this.remotePlayers.get(e);t&&(t.destroy(),this.remotePlayers.delete(e))}syncRemotePlayersFromState(){var e,t;(t=(e=this.room)==null?void 0:e.state)!=null&&t.players&&this.room.state.players.forEach((n,r)=>{if(r===this.room.sessionId){(Math.abs(n.centerX-this.player.gridX)>.8||Math.abs(n.centerY-this.player.gridY)>.8)&&this.player.applyAuthoritativeCenter(n.centerX,n.centerY,n.centerZ,n.tileX,n.tileY,n.tileZ);return}this.remotePlayers.has(r)||this.addRemotePlayer(n,r),this.remotePlayers.get(r).setRemoteTarget(n.centerX,n.centerY,n.centerZ)})}applyWorldMap(e,t){this.hoveredTile&&(this.hoveredTile.clearHighlight(),this.hoveredTile=null),this.activePath=[],this.threeManager.renderPathLine([],this.worldGenerator),this.wildlifeSystem.destroy(),this.currentMapRows=e,this.currentBuildings=t==="custom"?[]:e.buildings||[],this.worldGenerator.generateFromChunkedArray(e,ec,ls,{buildings:this.currentBuildings}),this.repositionPlayerForCurrentWorld(),this.wildlifeSystem=new rc(this.threeManager,this.worldGenerator,fc),this.syncCurrentMapToServer(t),this.updateHud()}repositionPlayerForCurrentWorld(){const e=this.currentMapRows.spawn||{x:this.player.gridX,y:this.player.gridY},t=this.worldGenerator.findNearestWalkable(e.x,e.y,16)||this.worldGenerator.findHighestWalkable()||this.findFirstWalkableTile();t&&(this.player.gridX=t.x,this.player.gridY=t.y,this.player.gridZ=this.worldGenerator.getElevation(t.x,t.y),this.player.targetX=this.player.gridX,this.player.targetY=this.player.gridY,this.player.targetZ=this.player.gridZ,this.player.visualX=this.player.gridX,this.player.visualY=this.player.gridY,this.player.visualZ=this.player.gridZ,this.player.currentPath=[],this.player.setCollisionDebugVisible(this.collisionDebugEnabled),this.player.syncModel(),this.worldGenerator.updateVisibleTilesAround(this.player.gridX,this.player.gridY))}syncCurrentMapToServer(e){var t;!this.room||!((t=this.currentMapRows)!=null&&t.length)||this.room.send("world:admin:map_updated",{source:e,width:this.currentMapRows[0].length,height:this.currentMapRows.length,chunkSize:ls,spawn:this.currentMapRows.spawn,rows:this.currentMapRows})}setCollisionDebugVisible(e){var t;this.collisionDebugEnabled=e,(t=this.player)==null||t.setCollisionDebugVisible(e);for(const n of this.remotePlayers.values())n.setCollisionDebugVisible(e)}findFirstWalkableTile(){for(const e of this.worldGenerator.surfaceMap.values())if(this.worldGenerator.isWalkable(e.x,e.y))return{x:e.x,y:e.y};return null}async startCombatScene(){this.combatScene||(this.combatScene=new dc({client:this.client,userId:this.userId,onExit:()=>this.updateHud(this.room?"Online":"Solo")})),await this.combatScene.enter("meadow-hare-demo")}generateUserId(){const e=localStorage.getItem("userId");if(e)return e;const t="user_"+Math.random().toString(36).substr(2,9);return localStorage.setItem("userId",t),t}animate(){requestAnimationFrame(this.animate);const e=performance.now(),t=Math.min((e-this.lastFrameTime)/1e3,.1);this.lastFrameTime=e;const n=this.inputManager.getWheelDelta();n!==0&&this.threeManager.handleZoom(n);const r=this.threeManager.getIntersectedTile(this.inputManager.mouseNDC);if(r!==this.hoveredTile)if(this.hoveredTile&&this.hoveredTile.clearHighlight(),this.hoveredTile=r,this.hoveredTile){const s=this.worldGenerator.isWalkable(this.hoveredTile.gridX,this.hoveredTile.gridY);this.hoveredTile.highlight(s?3116878:9381424),this.player&&s?(this.activePath=this.pathfinder.findPath(this.player.gridX,this.player.gridY,this.hoveredTile.gridX,this.hoveredTile.gridY),this.threeManager.renderPathLine(this.activePath,this.worldGenerator)):(this.activePath=[],this.threeManager.renderPathLine([],this.worldGenerator))}else this.activePath=null,this.threeManager.renderPathLine([],this.worldGenerator);if(this.player){this.player.update(t),this.syncRemotePlayersFromState();for(const o of this.remotePlayers.values())o.update(t);this.wildlifeSystem.update(t);const s=this.player.group.position;this.threeManager.updateCamera(s),this.worldGenerator.updateBuildingVisibility(this.player.gridX,this.player.gridY),this.worldGenerator.updateVisibleTilesAround(this.player.gridX,this.player.gridY),this.worldGenerator.updatePlayerSightCutaway(this.player.gridX,this.player.gridY,this.threeManager.camera),this.updateHud()}this.threeManager.render()}updateHud(e){var a,l,c,u;if(e&&this.statusPill&&(this.statusPill.textContent=e,this.statusPill.dataset.status=e.toLowerCase()),!this.player)return;const t=Math.round(this.player.gridX),n=Math.round(this.player.gridY),r=this.worldGenerator.getSurfaceAt(t,n),s=this.worldGenerator.getChunkKeyForTile(t,n),o=this.worldGenerator.getLoadedChunkSummary().length;this.positionReadout&&(this.positionReadout.textContent=`${t}, ${n}, ${this.player.gridZ}`),this.zoneReadout&&(this.zoneReadout.textContent=((a=r==null?void 0:r.definition)==null?void 0:a.label)||"Unknown"),this.chunkReadout&&(this.chunkReadout.textContent=`${s} / ${o}`),this.wildlifeReadout&&(this.wildlifeReadout.textContent=`${this.wildlifeSystem.wildlife.length}`),this.playerCountReadout&&(this.playerCountReadout.textContent=`${((u=(c=(l=this.room)==null?void 0:l.state)==null?void 0:c.players)==null?void 0:u.size)||1}`)}}window.addEventListener("DOMContentLoaded",()=>{new v_,console.log("[Main] Game initialized with Three.js")});
