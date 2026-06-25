var nh=Object.defineProperty;var ih=(i,e,t)=>e in i?nh(i,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):i[e]=t;var on=(i,e,t)=>ih(i,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function t(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(r){if(r.ep)return;r.ep=!0;const s=t(r);fetch(r.href,s)}})();/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Aa="183",rh=0,Ka=1,sh=2,br=1,oh=2,Er=3,li=0,rn=1,pn=2,$n=0,qi=1,xs=2,Ja=3,Qa=4,ah=5,Mi=100,lh=101,ch=102,hh=103,uh=104,fh=200,dh=201,ph=202,mh=203,Io=204,Do=205,gh=206,_h=207,vh=208,xh=209,Mh=210,Sh=211,yh=212,Eh=213,Th=214,Lo=0,Uo=1,Oo=2,Cn=3,No=4,Fo=5,wr=6,Bo=7,mc=0,bh=1,wh=2,Ln=0,gc=1,_c=2,vc=3,Ra=4,xc=5,Mc=6,Sc=7,yc=300,wi=301,Zi=302,Vs=303,Ws=304,Ps=306,Ei=1e3,Xn=1001,ko=1002,Yt=1003,Ah=1004,Fr=1005,Vt=1006,Xs=1007,Ti=1008,hn=1009,Ec=1010,Tc=1011,Ar=1012,Ca=1013,Nn=1014,Pn=1015,qn=1016,Pa=1017,Ia=1018,Rr=1020,bc=35902,wc=35899,Ac=1021,Rc=1022,yn=1023,jn=1026,bi=1027,Cc=1028,Da=1029,Ki=1030,La=1031,Ua=1033,us=33776,fs=33777,ds=33778,ps=33779,zo=35840,Ho=35841,Go=35842,Vo=35843,Wo=36196,Xo=37492,$o=37496,Yo=37488,qo=37489,jo=37490,Zo=37491,Ko=37808,Jo=37809,Qo=37810,ea=37811,ta=37812,na=37813,ia=37814,ra=37815,sa=37816,oa=37817,aa=37818,la=37819,ca=37820,ha=37821,ua=36492,fa=36494,da=36495,pa=36283,ma=36284,ga=36285,_a=36286,Rh=3200,Pc=0,Ch=1,si="",Jt="srgb",Ji="srgb-linear",Ms="linear",yt="srgb",Di=7680,el=519,Ph=512,Ih=513,Dh=514,Oa=515,Lh=516,Uh=517,Na=518,Oh=519,tl=35044,nl="300 es",In=2e3,Cr=2001;function Nh(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function Ss(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Fh(){const i=Ss("canvas");return i.style.display="block",i}const il={};function rl(...i){const e="THREE."+i.shift();console.log(e,...i)}function Ic(i){const e=i[0];if(typeof e=="string"&&e.startsWith("TSL:")){const t=i[1];t&&t.isStackTrace?i[0]+=" "+t.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function Ye(...i){i=Ic(i);const e="THREE."+i.shift();{const t=i[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...i)}}function _t(...i){i=Ic(i);const e="THREE."+i.shift();{const t=i[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...i)}}function ys(...i){const e=i.join(" ");e in il||(il[e]=!0,Ye(...i))}function Bh(i,e,t){return new Promise(function(n,r){function s(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:r();break;case i.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:n()}}setTimeout(s,t)})}const kh={[Lo]:Uo,[Oo]:wr,[No]:Bo,[Cn]:Fo,[Uo]:Lo,[wr]:Oo,[Bo]:No,[Fo]:Cn};class ir{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){const n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){const n=this._listeners;if(n===void 0)return;const r=n[e];if(r!==void 0){const s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const n=t[e.type];if(n!==void 0){e.target=this;const r=n.slice(0);for(let s=0,o=r.length;s<o;s++)r[s].call(this,e);e.target=null}}}const jt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],$s=Math.PI/180,va=180/Math.PI;function Ir(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(jt[i&255]+jt[i>>8&255]+jt[i>>16&255]+jt[i>>24&255]+"-"+jt[e&255]+jt[e>>8&255]+"-"+jt[e>>16&15|64]+jt[e>>24&255]+"-"+jt[t&63|128]+jt[t>>8&255]+"-"+jt[t>>16&255]+jt[t>>24&255]+jt[n&255]+jt[n>>8&255]+jt[n>>16&255]+jt[n>>24&255]).toLowerCase()}function ft(i,e,t){return Math.max(e,Math.min(t,i))}function zh(i,e){return(i%e+e)%e}function Ys(i,e,t){return(1-t)*i+t*e}function lr(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function nn(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}class ct{constructor(e=0,t=0){ct.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=ft(this.x,e.x,t.x),this.y=ft(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=ft(this.x,e,t),this.y=ft(this.y,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(ft(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(ft(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),r=Math.sin(t),s=this.x-e.x,o=this.y-e.y;return this.x=s*n-o*r+e.x,this.y=s*r+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class rr{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,s,o,a){let l=n[r+0],c=n[r+1],u=n[r+2],d=n[r+3],f=s[o+0],v=s[o+1],x=s[o+2],y=s[o+3];if(d!==y||l!==f||c!==v||u!==x){let _=l*f+c*v+u*x+d*y;_<0&&(f=-f,v=-v,x=-x,y=-y,_=-_);let p=1-a;if(_<.9995){const b=Math.acos(_),C=Math.sin(b);p=Math.sin(p*b)/C,a=Math.sin(a*b)/C,l=l*p+f*a,c=c*p+v*a,u=u*p+x*a,d=d*p+y*a}else{l=l*p+f*a,c=c*p+v*a,u=u*p+x*a,d=d*p+y*a;const b=1/Math.sqrt(l*l+c*c+u*u+d*d);l*=b,c*=b,u*=b,d*=b}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=d}static multiplyQuaternionsFlat(e,t,n,r,s,o){const a=n[r],l=n[r+1],c=n[r+2],u=n[r+3],d=s[o],f=s[o+1],v=s[o+2],x=s[o+3];return e[t]=a*x+u*d+l*v-c*f,e[t+1]=l*x+u*f+c*d-a*v,e[t+2]=c*x+u*v+a*f-l*d,e[t+3]=u*x-a*d-l*f-c*v,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,r=e._y,s=e._z,o=e._order,a=Math.cos,l=Math.sin,c=a(n/2),u=a(r/2),d=a(s/2),f=l(n/2),v=l(r/2),x=l(s/2);switch(o){case"XYZ":this._x=f*u*d+c*v*x,this._y=c*v*d-f*u*x,this._z=c*u*x+f*v*d,this._w=c*u*d-f*v*x;break;case"YXZ":this._x=f*u*d+c*v*x,this._y=c*v*d-f*u*x,this._z=c*u*x-f*v*d,this._w=c*u*d+f*v*x;break;case"ZXY":this._x=f*u*d-c*v*x,this._y=c*v*d+f*u*x,this._z=c*u*x+f*v*d,this._w=c*u*d-f*v*x;break;case"ZYX":this._x=f*u*d-c*v*x,this._y=c*v*d+f*u*x,this._z=c*u*x-f*v*d,this._w=c*u*d+f*v*x;break;case"YZX":this._x=f*u*d+c*v*x,this._y=c*v*d+f*u*x,this._z=c*u*x-f*v*d,this._w=c*u*d-f*v*x;break;case"XZY":this._x=f*u*d-c*v*x,this._y=c*v*d-f*u*x,this._z=c*u*x+f*v*d,this._w=c*u*d+f*v*x;break;default:Ye("Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],r=t[4],s=t[8],o=t[1],a=t[5],l=t[9],c=t[2],u=t[6],d=t[10],f=n+a+d;if(f>0){const v=.5/Math.sqrt(f+1);this._w=.25/v,this._x=(u-l)*v,this._y=(s-c)*v,this._z=(o-r)*v}else if(n>a&&n>d){const v=2*Math.sqrt(1+n-a-d);this._w=(u-l)/v,this._x=.25*v,this._y=(r+o)/v,this._z=(s+c)/v}else if(a>d){const v=2*Math.sqrt(1+a-n-d);this._w=(s-c)/v,this._x=(r+o)/v,this._y=.25*v,this._z=(l+u)/v}else{const v=2*Math.sqrt(1+d-n-a);this._w=(o-r)/v,this._x=(s+c)/v,this._y=(l+u)/v,this._z=.25*v}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(ft(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,r=e._y,s=e._z,o=e._w,a=t._x,l=t._y,c=t._z,u=t._w;return this._x=n*u+o*a+r*c-s*l,this._y=r*u+o*l+s*a-n*c,this._z=s*u+o*c+n*l-r*a,this._w=o*u-n*a-r*l-s*c,this._onChangeCallback(),this}slerp(e,t){let n=e._x,r=e._y,s=e._z,o=e._w,a=this.dot(e);a<0&&(n=-n,r=-r,s=-s,o=-o,a=-a);let l=1-t;if(a<.9995){const c=Math.acos(a),u=Math.sin(c);l=Math.sin(l*c)/u,t=Math.sin(t*c)/u,this._x=this._x*l+n*t,this._y=this._y*l+r*t,this._z=this._z*l+s*t,this._w=this._w*l+o*t,this._onChangeCallback()}else this._x=this._x*l+n*t,this._y=this._y*l+r*t,this._z=this._z*l+s*t,this._w=this._w*l+o*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class G{constructor(e=0,t=0,n=0){G.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(sl.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(sl.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*r,this.y=s[1]*t+s[4]*n+s[7]*r,this.z=s[2]*t+s[5]*n+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,r=this.z,s=e.elements,o=1/(s[3]*t+s[7]*n+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*r+s[12])*o,this.y=(s[1]*t+s[5]*n+s[9]*r+s[13])*o,this.z=(s[2]*t+s[6]*n+s[10]*r+s[14])*o,this}applyQuaternion(e){const t=this.x,n=this.y,r=this.z,s=e.x,o=e.y,a=e.z,l=e.w,c=2*(o*r-a*n),u=2*(a*t-s*r),d=2*(s*n-o*t);return this.x=t+l*c+o*d-a*u,this.y=n+l*u+a*c-s*d,this.z=r+l*d+s*u-o*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*r,this.y=s[1]*t+s[5]*n+s[9]*r,this.z=s[2]*t+s[6]*n+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=ft(this.x,e.x,t.x),this.y=ft(this.y,e.y,t.y),this.z=ft(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=ft(this.x,e,t),this.y=ft(this.y,e,t),this.z=ft(this.z,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(ft(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,r=e.y,s=e.z,o=t.x,a=t.y,l=t.z;return this.x=r*l-s*a,this.y=s*o-n*l,this.z=n*a-r*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return qs.copy(this).projectOnVector(e),this.sub(qs)}reflect(e){return this.sub(qs.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(ft(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const qs=new G,sl=new rr;class et{constructor(e,t,n,r,s,o,a,l,c){et.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,r,s,o,a,l,c)}set(e,t,n,r,s,o,a,l,c){const u=this.elements;return u[0]=e,u[1]=r,u[2]=a,u[3]=t,u[4]=s,u[5]=l,u[6]=n,u[7]=o,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,r=t.elements,s=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],u=n[4],d=n[7],f=n[2],v=n[5],x=n[8],y=r[0],_=r[3],p=r[6],b=r[1],C=r[4],A=r[7],D=r[2],P=r[5],U=r[8];return s[0]=o*y+a*b+l*D,s[3]=o*_+a*C+l*P,s[6]=o*p+a*A+l*U,s[1]=c*y+u*b+d*D,s[4]=c*_+u*C+d*P,s[7]=c*p+u*A+d*U,s[2]=f*y+v*b+x*D,s[5]=f*_+v*C+x*P,s[8]=f*p+v*A+x*U,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8];return t*o*u-t*a*c-n*s*u+n*a*l+r*s*c-r*o*l}invert(){const e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8],d=u*o-a*c,f=a*l-u*s,v=c*s-o*l,x=t*d+n*f+r*v;if(x===0)return this.set(0,0,0,0,0,0,0,0,0);const y=1/x;return e[0]=d*y,e[1]=(r*c-u*n)*y,e[2]=(a*n-r*o)*y,e[3]=f*y,e[4]=(u*t-r*l)*y,e[5]=(r*s-a*t)*y,e[6]=v*y,e[7]=(n*l-c*t)*y,e[8]=(o*t-n*s)*y,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,s,o,a){const l=Math.cos(s),c=Math.sin(s);return this.set(n*l,n*c,-n*(l*o+c*a)+o+e,-r*c,r*l,-r*(-c*o+l*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(js.makeScale(e,t)),this}rotate(e){return this.premultiply(js.makeRotation(-e)),this}translate(e,t){return this.premultiply(js.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let r=0;r<9;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const js=new et,ol=new et().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),al=new et().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Hh(){const i={enabled:!0,workingColorSpace:Ji,spaces:{},convert:function(r,s,o){return this.enabled===!1||s===o||!s||!o||(this.spaces[s].transfer===yt&&(r.r=Yn(r.r),r.g=Yn(r.g),r.b=Yn(r.b)),this.spaces[s].primaries!==this.spaces[o].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===yt&&(r.r=ji(r.r),r.g=ji(r.g),r.b=ji(r.b))),r},workingToColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},colorSpaceToWorking:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===si?Ms:this.spaces[r].transfer},getToneMappingMode:function(r){return this.spaces[r].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,o){return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,s){return ys("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),i.workingToColorSpace(r,s)},toWorkingColorSpace:function(r,s){return ys("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),i.colorSpaceToWorking(r,s)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[Ji]:{primaries:e,whitePoint:n,transfer:Ms,toXYZ:ol,fromXYZ:al,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Jt},outputColorSpaceConfig:{drawingBufferColorSpace:Jt}},[Jt]:{primaries:e,whitePoint:n,transfer:yt,toXYZ:ol,fromXYZ:al,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Jt}}}),i}const vt=Hh();function Yn(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function ji(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let Li;class Gh{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{Li===void 0&&(Li=Ss("canvas")),Li.width=e.width,Li.height=e.height;const r=Li.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),n=Li}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Ss("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const r=n.getImageData(0,0,e.width,e.height),s=r.data;for(let o=0;o<s.length;o++)s[o]=Yn(s[o]/255)*255;return n.putImageData(r,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Yn(t[n]/255)*255):t[n]=Yn(t[n]);return{data:t,width:e.width,height:e.height}}else return Ye("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Vh=0;class Fa{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Vh++}),this.uuid=Ir(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayHeight,t.displayWidth,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let o=0,a=r.length;o<a;o++)r[o].isDataTexture?s.push(Zs(r[o].image)):s.push(Zs(r[o]))}else s=Zs(r);n.url=s}return t||(e.images[this.uuid]=n),n}}function Zs(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Gh.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(Ye("Texture: Unable to serialize Texture."),{})}let Wh=0;const Ks=new G;class Qt extends ir{constructor(e=Qt.DEFAULT_IMAGE,t=Qt.DEFAULT_MAPPING,n=Xn,r=Xn,s=Vt,o=Ti,a=yn,l=hn,c=Qt.DEFAULT_ANISOTROPY,u=si){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Wh++}),this.uuid=Ir(),this.name="",this.source=new Fa(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=r,this.magFilter=s,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new ct(0,0),this.repeat=new ct(1,1),this.center=new ct(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new et,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(Ks).x}get height(){return this.source.getSize(Ks).y}get depth(){return this.source.getSize(Ks).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const n=e[t];if(n===void 0){Ye(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){Ye(`Texture.setValues(): property '${t}' does not exist.`);continue}r&&n&&r.isVector2&&n.isVector2||r&&n&&r.isVector3&&n.isVector3||r&&n&&r.isMatrix3&&n.isMatrix3?r.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==yc)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Ei:e.x=e.x-Math.floor(e.x);break;case Xn:e.x=e.x<0?0:1;break;case ko:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Ei:e.y=e.y-Math.floor(e.y);break;case Xn:e.y=e.y<0?0:1;break;case ko:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Qt.DEFAULT_IMAGE=null;Qt.DEFAULT_MAPPING=yc;Qt.DEFAULT_ANISOTROPY=1;class Nt{constructor(e=0,t=0,n=0,r=1){Nt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,r=this.z,s=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*r+o[12]*s,this.y=o[1]*t+o[5]*n+o[9]*r+o[13]*s,this.z=o[2]*t+o[6]*n+o[10]*r+o[14]*s,this.w=o[3]*t+o[7]*n+o[11]*r+o[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,s;const l=e.elements,c=l[0],u=l[4],d=l[8],f=l[1],v=l[5],x=l[9],y=l[2],_=l[6],p=l[10];if(Math.abs(u-f)<.01&&Math.abs(d-y)<.01&&Math.abs(x-_)<.01){if(Math.abs(u+f)<.1&&Math.abs(d+y)<.1&&Math.abs(x+_)<.1&&Math.abs(c+v+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const C=(c+1)/2,A=(v+1)/2,D=(p+1)/2,P=(u+f)/4,U=(d+y)/4,E=(x+_)/4;return C>A&&C>D?C<.01?(n=0,r=.707106781,s=.707106781):(n=Math.sqrt(C),r=P/n,s=U/n):A>D?A<.01?(n=.707106781,r=0,s=.707106781):(r=Math.sqrt(A),n=P/r,s=E/r):D<.01?(n=.707106781,r=.707106781,s=0):(s=Math.sqrt(D),n=U/s,r=E/s),this.set(n,r,s,t),this}let b=Math.sqrt((_-x)*(_-x)+(d-y)*(d-y)+(f-u)*(f-u));return Math.abs(b)<.001&&(b=1),this.x=(_-x)/b,this.y=(d-y)/b,this.z=(f-u)/b,this.w=Math.acos((c+v+p-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=ft(this.x,e.x,t.x),this.y=ft(this.y,e.y,t.y),this.z=ft(this.z,e.z,t.z),this.w=ft(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=ft(this.x,e,t),this.y=ft(this.y,e,t),this.z=ft(this.z,e,t),this.w=ft(this.w,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(ft(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Xh extends ir{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Vt,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new Nt(0,0,e,t),this.scissorTest=!1,this.viewport=new Nt(0,0,e,t),this.textures=[];const r={width:e,height:t,depth:n.depth},s=new Qt(r),o=n.count;for(let a=0;a<o;a++)this.textures[a]=s.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(e={}){const t={minFilter:Vt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=n,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const r=Object.assign({},e.textures[t].image);this.textures[t].source=new Fa(r)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Un extends Xh{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class Dc extends Qt{constructor(e=null,t=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=Yt,this.minFilter=Yt,this.wrapR=Xn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class $h extends Qt{constructor(e=null,t=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=Yt,this.minFilter=Yt,this.wrapR=Xn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class It{constructor(e,t,n,r,s,o,a,l,c,u,d,f,v,x,y,_){It.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,r,s,o,a,l,c,u,d,f,v,x,y,_)}set(e,t,n,r,s,o,a,l,c,u,d,f,v,x,y,_){const p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=r,p[1]=s,p[5]=o,p[9]=a,p[13]=l,p[2]=c,p[6]=u,p[10]=d,p[14]=f,p[3]=v,p[7]=x,p[11]=y,p[15]=_,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new It().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinant()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinant()===0)return this.identity();const t=this.elements,n=e.elements,r=1/Ui.setFromMatrixColumn(e,0).length(),s=1/Ui.setFromMatrixColumn(e,1).length(),o=1/Ui.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,r=e.y,s=e.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(r),c=Math.sin(r),u=Math.cos(s),d=Math.sin(s);if(e.order==="XYZ"){const f=o*u,v=o*d,x=a*u,y=a*d;t[0]=l*u,t[4]=-l*d,t[8]=c,t[1]=v+x*c,t[5]=f-y*c,t[9]=-a*l,t[2]=y-f*c,t[6]=x+v*c,t[10]=o*l}else if(e.order==="YXZ"){const f=l*u,v=l*d,x=c*u,y=c*d;t[0]=f+y*a,t[4]=x*a-v,t[8]=o*c,t[1]=o*d,t[5]=o*u,t[9]=-a,t[2]=v*a-x,t[6]=y+f*a,t[10]=o*l}else if(e.order==="ZXY"){const f=l*u,v=l*d,x=c*u,y=c*d;t[0]=f-y*a,t[4]=-o*d,t[8]=x+v*a,t[1]=v+x*a,t[5]=o*u,t[9]=y-f*a,t[2]=-o*c,t[6]=a,t[10]=o*l}else if(e.order==="ZYX"){const f=o*u,v=o*d,x=a*u,y=a*d;t[0]=l*u,t[4]=x*c-v,t[8]=f*c+y,t[1]=l*d,t[5]=y*c+f,t[9]=v*c-x,t[2]=-c,t[6]=a*l,t[10]=o*l}else if(e.order==="YZX"){const f=o*l,v=o*c,x=a*l,y=a*c;t[0]=l*u,t[4]=y-f*d,t[8]=x*d+v,t[1]=d,t[5]=o*u,t[9]=-a*u,t[2]=-c*u,t[6]=v*d+x,t[10]=f-y*d}else if(e.order==="XZY"){const f=o*l,v=o*c,x=a*l,y=a*c;t[0]=l*u,t[4]=-d,t[8]=c*u,t[1]=f*d+y,t[5]=o*u,t[9]=v*d-x,t[2]=x*d-v,t[6]=a*u,t[10]=y*d+f}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Yh,e,qh)}lookAt(e,t,n){const r=this.elements;return an.subVectors(e,t),an.lengthSq()===0&&(an.z=1),an.normalize(),Jn.crossVectors(n,an),Jn.lengthSq()===0&&(Math.abs(n.z)===1?an.x+=1e-4:an.z+=1e-4,an.normalize(),Jn.crossVectors(n,an)),Jn.normalize(),Br.crossVectors(an,Jn),r[0]=Jn.x,r[4]=Br.x,r[8]=an.x,r[1]=Jn.y,r[5]=Br.y,r[9]=an.y,r[2]=Jn.z,r[6]=Br.z,r[10]=an.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,r=t.elements,s=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],u=n[1],d=n[5],f=n[9],v=n[13],x=n[2],y=n[6],_=n[10],p=n[14],b=n[3],C=n[7],A=n[11],D=n[15],P=r[0],U=r[4],E=r[8],w=r[12],Z=r[1],I=r[5],W=r[9],$=r[13],q=r[2],X=r[6],Y=r[10],H=r[14],oe=r[3],ne=r[7],Se=r[11],Te=r[15];return s[0]=o*P+a*Z+l*q+c*oe,s[4]=o*U+a*I+l*X+c*ne,s[8]=o*E+a*W+l*Y+c*Se,s[12]=o*w+a*$+l*H+c*Te,s[1]=u*P+d*Z+f*q+v*oe,s[5]=u*U+d*I+f*X+v*ne,s[9]=u*E+d*W+f*Y+v*Se,s[13]=u*w+d*$+f*H+v*Te,s[2]=x*P+y*Z+_*q+p*oe,s[6]=x*U+y*I+_*X+p*ne,s[10]=x*E+y*W+_*Y+p*Se,s[14]=x*w+y*$+_*H+p*Te,s[3]=b*P+C*Z+A*q+D*oe,s[7]=b*U+C*I+A*X+D*ne,s[11]=b*E+C*W+A*Y+D*Se,s[15]=b*w+C*$+A*H+D*Te,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],r=e[8],s=e[12],o=e[1],a=e[5],l=e[9],c=e[13],u=e[2],d=e[6],f=e[10],v=e[14],x=e[3],y=e[7],_=e[11],p=e[15],b=l*v-c*f,C=a*v-c*d,A=a*f-l*d,D=o*v-c*u,P=o*f-l*u,U=o*d-a*u;return t*(y*b-_*C+p*A)-n*(x*b-_*D+p*P)+r*(x*C-y*D+p*U)-s*(x*A-y*P+_*U)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8],d=e[9],f=e[10],v=e[11],x=e[12],y=e[13],_=e[14],p=e[15],b=t*a-n*o,C=t*l-r*o,A=t*c-s*o,D=n*l-r*a,P=n*c-s*a,U=r*c-s*l,E=u*y-d*x,w=u*_-f*x,Z=u*p-v*x,I=d*_-f*y,W=d*p-v*y,$=f*p-v*_,q=b*$-C*W+A*I+D*Z-P*w+U*E;if(q===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const X=1/q;return e[0]=(a*$-l*W+c*I)*X,e[1]=(r*W-n*$-s*I)*X,e[2]=(y*U-_*P+p*D)*X,e[3]=(f*P-d*U-v*D)*X,e[4]=(l*Z-o*$-c*w)*X,e[5]=(t*$-r*Z+s*w)*X,e[6]=(_*A-x*U-p*C)*X,e[7]=(u*U-f*A+v*C)*X,e[8]=(o*W-a*Z+c*E)*X,e[9]=(n*Z-t*W-s*E)*X,e[10]=(x*P-y*A+p*b)*X,e[11]=(d*A-u*P-v*b)*X,e[12]=(a*w-o*I-l*E)*X,e[13]=(t*I-n*w+r*E)*X,e[14]=(y*C-x*D-_*b)*X,e[15]=(u*D-d*C+f*b)*X,this}scale(e){const t=this.elements,n=e.x,r=e.y,s=e.z;return t[0]*=n,t[4]*=r,t[8]*=s,t[1]*=n,t[5]*=r,t[9]*=s,t[2]*=n,t[6]*=r,t[10]*=s,t[3]*=n,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),r=Math.sin(t),s=1-n,o=e.x,a=e.y,l=e.z,c=s*o,u=s*a;return this.set(c*o+n,c*a-r*l,c*l+r*a,0,c*a+r*l,u*a+n,u*l-r*o,0,c*l-r*a,u*l+r*o,s*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,s,o){return this.set(1,n,s,0,e,1,o,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){const r=this.elements,s=t._x,o=t._y,a=t._z,l=t._w,c=s+s,u=o+o,d=a+a,f=s*c,v=s*u,x=s*d,y=o*u,_=o*d,p=a*d,b=l*c,C=l*u,A=l*d,D=n.x,P=n.y,U=n.z;return r[0]=(1-(y+p))*D,r[1]=(v+A)*D,r[2]=(x-C)*D,r[3]=0,r[4]=(v-A)*P,r[5]=(1-(f+p))*P,r[6]=(_+b)*P,r[7]=0,r[8]=(x+C)*U,r[9]=(_-b)*U,r[10]=(1-(f+y))*U,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){const r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];const s=this.determinant();if(s===0)return n.set(1,1,1),t.identity(),this;let o=Ui.set(r[0],r[1],r[2]).length();const a=Ui.set(r[4],r[5],r[6]).length(),l=Ui.set(r[8],r[9],r[10]).length();s<0&&(o=-o),vn.copy(this);const c=1/o,u=1/a,d=1/l;return vn.elements[0]*=c,vn.elements[1]*=c,vn.elements[2]*=c,vn.elements[4]*=u,vn.elements[5]*=u,vn.elements[6]*=u,vn.elements[8]*=d,vn.elements[9]*=d,vn.elements[10]*=d,t.setFromRotationMatrix(vn),n.x=o,n.y=a,n.z=l,this}makePerspective(e,t,n,r,s,o,a=In,l=!1){const c=this.elements,u=2*s/(t-e),d=2*s/(n-r),f=(t+e)/(t-e),v=(n+r)/(n-r);let x,y;if(l)x=s/(o-s),y=o*s/(o-s);else if(a===In)x=-(o+s)/(o-s),y=-2*o*s/(o-s);else if(a===Cr)x=-o/(o-s),y=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=u,c[4]=0,c[8]=f,c[12]=0,c[1]=0,c[5]=d,c[9]=v,c[13]=0,c[2]=0,c[6]=0,c[10]=x,c[14]=y,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,r,s,o,a=In,l=!1){const c=this.elements,u=2/(t-e),d=2/(n-r),f=-(t+e)/(t-e),v=-(n+r)/(n-r);let x,y;if(l)x=1/(o-s),y=o/(o-s);else if(a===In)x=-2/(o-s),y=-(o+s)/(o-s);else if(a===Cr)x=-1/(o-s),y=-s/(o-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=u,c[4]=0,c[8]=0,c[12]=f,c[1]=0,c[5]=d,c[9]=0,c[13]=v,c[2]=0,c[6]=0,c[10]=x,c[14]=y,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let r=0;r<16;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const Ui=new G,vn=new It,Yh=new G(0,0,0),qh=new G(1,1,1),Jn=new G,Br=new G,an=new G,ll=new It,cl=new rr;class Fn{constructor(e=0,t=0,n=0,r=Fn.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const r=e.elements,s=r[0],o=r[4],a=r[8],l=r[1],c=r[5],u=r[9],d=r[2],f=r[6],v=r[10];switch(t){case"XYZ":this._y=Math.asin(ft(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,v),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(f,c),this._z=0);break;case"YXZ":this._x=Math.asin(-ft(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,v),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,s),this._z=0);break;case"ZXY":this._x=Math.asin(ft(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-d,v),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-ft(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(f,v),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(ft(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-d,s)):(this._x=0,this._y=Math.atan2(a,v));break;case"XZY":this._z=Math.asin(-ft(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(f,c),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-u,v),this._y=0);break;default:Ye("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return ll.makeRotationFromQuaternion(e),this.setFromRotationMatrix(ll,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return cl.setFromEuler(this),this.setFromQuaternion(cl,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Fn.DEFAULT_ORDER="XYZ";class Ba{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let jh=0;const hl=new G,Oi=new rr,kn=new It,kr=new G,cr=new G,Zh=new G,Kh=new rr,ul=new G(1,0,0),fl=new G(0,1,0),dl=new G(0,0,1),pl={type:"added"},Jh={type:"removed"},Ni={type:"childadded",child:null},Js={type:"childremoved",child:null};class Wt extends ir{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:jh++}),this.uuid=Ir(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Wt.DEFAULT_UP.clone();const e=new G,t=new Fn,n=new rr,r=new G(1,1,1);function s(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(s),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new It},normalMatrix:{value:new et}}),this.matrix=new It,this.matrixWorld=new It,this.matrixAutoUpdate=Wt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Wt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Ba,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Oi.setFromAxisAngle(e,t),this.quaternion.multiply(Oi),this}rotateOnWorldAxis(e,t){return Oi.setFromAxisAngle(e,t),this.quaternion.premultiply(Oi),this}rotateX(e){return this.rotateOnAxis(ul,e)}rotateY(e){return this.rotateOnAxis(fl,e)}rotateZ(e){return this.rotateOnAxis(dl,e)}translateOnAxis(e,t){return hl.copy(e).applyQuaternion(this.quaternion),this.position.add(hl.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(ul,e)}translateY(e){return this.translateOnAxis(fl,e)}translateZ(e){return this.translateOnAxis(dl,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(kn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?kr.copy(e):kr.set(e,t,n);const r=this.parent;this.updateWorldMatrix(!0,!1),cr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?kn.lookAt(cr,kr,this.up):kn.lookAt(kr,cr,this.up),this.quaternion.setFromRotationMatrix(kn),r&&(kn.extractRotation(r.matrixWorld),Oi.setFromRotationMatrix(kn),this.quaternion.premultiply(Oi.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(_t("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(pl),Ni.child=e,this.dispatchEvent(Ni),Ni.child=null):_t("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Jh),Js.child=e,this.dispatchEvent(Js),Js.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),kn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),kn.multiply(e.parent.matrixWorld)),e.applyMatrix4(kn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(pl),Ni.child=e,this.dispatchEvent(Ni),Ni.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){const o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(cr,e,Zh),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(cr,Kh,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const t=e.x,n=e.y,r=e.z,s=this.matrix.elements;s[12]+=t-s[0]*t-s[4]*n-s[8]*r,s[13]+=n-s[1]*t-s[5]*n-s[9]*r,s[14]+=r-s[2]*t-s[6]*n-s[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),this.static!==!1&&(r.static=this.static),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(a=>({...a})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function s(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const d=l[c];s(e.shapes,d)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(s(e.materials,this.material[l]));r.material=a}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let a=0;a<this.children.length;a++)r.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];r.animations.push(s(e.animations,l))}}if(t){const a=o(e.geometries),l=o(e.materials),c=o(e.textures),u=o(e.images),d=o(e.shapes),f=o(e.skeletons),v=o(e.animations),x=o(e.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),u.length>0&&(n.images=u),d.length>0&&(n.shapes=d),f.length>0&&(n.skeletons=f),v.length>0&&(n.animations=v),x.length>0&&(n.nodes=x)}return n.object=r,n;function o(a){const l=[];for(const c in a){const u=a[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),e.pivot!==null&&(this.pivot=e.pivot.clone()),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const r=e.children[n];this.add(r.clone())}return this}}Wt.DEFAULT_UP=new G(0,1,0);Wt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Wt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class un extends Wt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Qh={type:"move"};class Qs{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new un,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new un,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new G,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new G),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new un,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new G,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new G),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,s=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(const y of e.hand.values()){const _=t.getJointPose(y,n),p=this._getHandJoint(c,y);_!==null&&(p.matrix.fromArray(_.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=_.radius),p.visible=_!==null}const u=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],f=u.position.distanceTo(d.position),v=.02,x=.005;c.inputState.pinching&&f>v+x?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&f<=v-x&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&s!==null&&(r=s),r!==null&&(a.matrix.fromArray(r.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,r.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(r.linearVelocity)):a.hasLinearVelocity=!1,r.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(r.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Qh)))}return a!==null&&(a.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new un;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}const Lc={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Qn={h:0,s:0,l:0},zr={h:0,s:0,l:0};function eo(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class pt{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Jt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,vt.colorSpaceToWorking(this,t),this}setRGB(e,t,n,r=vt.workingColorSpace){return this.r=e,this.g=t,this.b=n,vt.colorSpaceToWorking(this,r),this}setHSL(e,t,n,r=vt.workingColorSpace){if(e=zh(e,1),t=ft(t,0,1),n=ft(n,0,1),t===0)this.r=this.g=this.b=n;else{const s=n<=.5?n*(1+t):n+t-n*t,o=2*n-s;this.r=eo(o,s,e+1/3),this.g=eo(o,s,e),this.b=eo(o,s,e-1/3)}return vt.colorSpaceToWorking(this,r),this}setStyle(e,t=Jt){function n(s){s!==void 0&&parseFloat(s)<1&&Ye("Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const o=r[1],a=r[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:Ye("Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(s,16),t);Ye("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Jt){const n=Lc[e.toLowerCase()];return n!==void 0?this.setHex(n,t):Ye("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Yn(e.r),this.g=Yn(e.g),this.b=Yn(e.b),this}copyLinearToSRGB(e){return this.r=ji(e.r),this.g=ji(e.g),this.b=ji(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Jt){return vt.workingToColorSpace(Zt.copy(this),e),Math.round(ft(Zt.r*255,0,255))*65536+Math.round(ft(Zt.g*255,0,255))*256+Math.round(ft(Zt.b*255,0,255))}getHexString(e=Jt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=vt.workingColorSpace){vt.workingToColorSpace(Zt.copy(this),t);const n=Zt.r,r=Zt.g,s=Zt.b,o=Math.max(n,r,s),a=Math.min(n,r,s);let l,c;const u=(a+o)/2;if(a===o)l=0,c=0;else{const d=o-a;switch(c=u<=.5?d/(o+a):d/(2-o-a),o){case n:l=(r-s)/d+(r<s?6:0);break;case r:l=(s-n)/d+2;break;case s:l=(n-r)/d+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=vt.workingColorSpace){return vt.workingToColorSpace(Zt.copy(this),t),e.r=Zt.r,e.g=Zt.g,e.b=Zt.b,e}getStyle(e=Jt){vt.workingToColorSpace(Zt.copy(this),e);const t=Zt.r,n=Zt.g,r=Zt.b;return e!==Jt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(r*255)})`}offsetHSL(e,t,n){return this.getHSL(Qn),this.setHSL(Qn.h+e,Qn.s+t,Qn.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Qn),e.getHSL(zr);const n=Ys(Qn.h,zr.h,t),r=Ys(Qn.s,zr.s,t),s=Ys(Qn.l,zr.l,t);return this.setHSL(n,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*r,this.g=s[1]*t+s[4]*n+s[7]*r,this.b=s[2]*t+s[5]*n+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Zt=new pt;pt.NAMES=Lc;class eu extends Wt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Fn,this.environmentIntensity=1,this.environmentRotation=new Fn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}const xn=new G,zn=new G,to=new G,Hn=new G,Fi=new G,Bi=new G,ml=new G,no=new G,io=new G,ro=new G,so=new Nt,oo=new Nt,ao=new Nt;class Sn{constructor(e=new G,t=new G,n=new G){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),xn.subVectors(e,t),r.cross(xn);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,n,r,s){xn.subVectors(r,t),zn.subVectors(n,t),to.subVectors(e,t);const o=xn.dot(xn),a=xn.dot(zn),l=xn.dot(to),c=zn.dot(zn),u=zn.dot(to),d=o*c-a*a;if(d===0)return s.set(0,0,0),null;const f=1/d,v=(c*l-a*u)*f,x=(o*u-a*l)*f;return s.set(1-v-x,x,v)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,Hn)===null?!1:Hn.x>=0&&Hn.y>=0&&Hn.x+Hn.y<=1}static getInterpolation(e,t,n,r,s,o,a,l){return this.getBarycoord(e,t,n,r,Hn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,Hn.x),l.addScaledVector(o,Hn.y),l.addScaledVector(a,Hn.z),l)}static getInterpolatedAttribute(e,t,n,r,s,o){return so.setScalar(0),oo.setScalar(0),ao.setScalar(0),so.fromBufferAttribute(e,t),oo.fromBufferAttribute(e,n),ao.fromBufferAttribute(e,r),o.setScalar(0),o.addScaledVector(so,s.x),o.addScaledVector(oo,s.y),o.addScaledVector(ao,s.z),o}static isFrontFacing(e,t,n,r){return xn.subVectors(n,t),zn.subVectors(e,t),xn.cross(zn).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return xn.subVectors(this.c,this.b),zn.subVectors(this.a,this.b),xn.cross(zn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Sn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Sn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,r,s){return Sn.getInterpolation(e,this.a,this.b,this.c,t,n,r,s)}containsPoint(e){return Sn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Sn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,r=this.b,s=this.c;let o,a;Fi.subVectors(r,n),Bi.subVectors(s,n),no.subVectors(e,n);const l=Fi.dot(no),c=Bi.dot(no);if(l<=0&&c<=0)return t.copy(n);io.subVectors(e,r);const u=Fi.dot(io),d=Bi.dot(io);if(u>=0&&d<=u)return t.copy(r);const f=l*d-u*c;if(f<=0&&l>=0&&u<=0)return o=l/(l-u),t.copy(n).addScaledVector(Fi,o);ro.subVectors(e,s);const v=Fi.dot(ro),x=Bi.dot(ro);if(x>=0&&v<=x)return t.copy(s);const y=v*c-l*x;if(y<=0&&c>=0&&x<=0)return a=c/(c-x),t.copy(n).addScaledVector(Bi,a);const _=u*x-v*d;if(_<=0&&d-u>=0&&v-x>=0)return ml.subVectors(s,r),a=(d-u)/(d-u+(v-x)),t.copy(r).addScaledVector(ml,a);const p=1/(_+y+f);return o=y*p,a=f*p,t.copy(n).addScaledVector(Fi,o).addScaledVector(Bi,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class Dr{constructor(e=new G(1/0,1/0,1/0),t=new G(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Mn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Mn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=Mn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const s=n.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,Mn):Mn.fromBufferAttribute(s,o),Mn.applyMatrix4(e.matrixWorld),this.expandByPoint(Mn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Hr.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Hr.copy(n.boundingBox)),Hr.applyMatrix4(e.matrixWorld),this.union(Hr)}const r=e.children;for(let s=0,o=r.length;s<o;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Mn),Mn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(hr),Gr.subVectors(this.max,hr),ki.subVectors(e.a,hr),zi.subVectors(e.b,hr),Hi.subVectors(e.c,hr),ei.subVectors(zi,ki),ti.subVectors(Hi,zi),ui.subVectors(ki,Hi);let t=[0,-ei.z,ei.y,0,-ti.z,ti.y,0,-ui.z,ui.y,ei.z,0,-ei.x,ti.z,0,-ti.x,ui.z,0,-ui.x,-ei.y,ei.x,0,-ti.y,ti.x,0,-ui.y,ui.x,0];return!lo(t,ki,zi,Hi,Gr)||(t=[1,0,0,0,1,0,0,0,1],!lo(t,ki,zi,Hi,Gr))?!1:(Vr.crossVectors(ei,ti),t=[Vr.x,Vr.y,Vr.z],lo(t,ki,zi,Hi,Gr))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Mn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Mn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Gn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Gn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Gn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Gn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Gn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Gn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Gn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Gn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Gn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const Gn=[new G,new G,new G,new G,new G,new G,new G,new G],Mn=new G,Hr=new Dr,ki=new G,zi=new G,Hi=new G,ei=new G,ti=new G,ui=new G,hr=new G,Gr=new G,Vr=new G,fi=new G;function lo(i,e,t,n,r){for(let s=0,o=i.length-3;s<=o;s+=3){fi.fromArray(i,s);const a=r.x*Math.abs(fi.x)+r.y*Math.abs(fi.y)+r.z*Math.abs(fi.z),l=e.dot(fi),c=t.dot(fi),u=n.dot(fi);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>a)return!1}return!0}const Bt=new G,Wr=new ct;let tu=0;class On{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:tu++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=tl,this.updateRanges=[],this.gpuType=Pn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Wr.fromBufferAttribute(this,t),Wr.applyMatrix3(e),this.setXY(t,Wr.x,Wr.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Bt.fromBufferAttribute(this,t),Bt.applyMatrix3(e),this.setXYZ(t,Bt.x,Bt.y,Bt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Bt.fromBufferAttribute(this,t),Bt.applyMatrix4(e),this.setXYZ(t,Bt.x,Bt.y,Bt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Bt.fromBufferAttribute(this,t),Bt.applyNormalMatrix(e),this.setXYZ(t,Bt.x,Bt.y,Bt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Bt.fromBufferAttribute(this,t),Bt.transformDirection(e),this.setXYZ(t,Bt.x,Bt.y,Bt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=lr(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=nn(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=lr(t,this.array)),t}setX(e,t){return this.normalized&&(t=nn(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=lr(t,this.array)),t}setY(e,t){return this.normalized&&(t=nn(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=lr(t,this.array)),t}setZ(e,t){return this.normalized&&(t=nn(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=lr(t,this.array)),t}setW(e,t){return this.normalized&&(t=nn(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=nn(t,this.array),n=nn(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=nn(t,this.array),n=nn(n,this.array),r=nn(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,s){return e*=this.itemSize,this.normalized&&(t=nn(t,this.array),n=nn(n,this.array),r=nn(r,this.array),s=nn(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==tl&&(e.usage=this.usage),e}}class Uc extends On{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class Oc extends On{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class Ft extends On{constructor(e,t,n){super(new Float32Array(e),t,n)}}const nu=new Dr,ur=new G,co=new G;class Is{constructor(e=new G,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):nu.setFromPoints(e).getCenter(n);let r=0;for(let s=0,o=e.length;s<o;s++)r=Math.max(r,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;ur.subVectors(e,this.center);const t=ur.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),r=(n-this.radius)*.5;this.center.addScaledVector(ur,r/n),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(co.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(ur.copy(e.center).add(co)),this.expandByPoint(ur.copy(e.center).sub(co))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let iu=0;const fn=new It,ho=new Wt,Gi=new G,ln=new Dr,fr=new Dr,Gt=new G;class tn extends ir{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:iu++}),this.uuid=Ir(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Nh(e)?Oc:Uc)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new et().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return fn.makeRotationFromQuaternion(e),this.applyMatrix4(fn),this}rotateX(e){return fn.makeRotationX(e),this.applyMatrix4(fn),this}rotateY(e){return fn.makeRotationY(e),this.applyMatrix4(fn),this}rotateZ(e){return fn.makeRotationZ(e),this.applyMatrix4(fn),this}translate(e,t,n){return fn.makeTranslation(e,t,n),this.applyMatrix4(fn),this}scale(e,t,n){return fn.makeScale(e,t,n),this.applyMatrix4(fn),this}lookAt(e){return ho.lookAt(e),ho.updateMatrix(),this.applyMatrix4(ho.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Gi).negate(),this.translate(Gi.x,Gi.y,Gi.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let r=0,s=e.length;r<s;r++){const o=e[r];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new Ft(n,3))}else{const n=Math.min(e.length,t.count);for(let r=0;r<n;r++){const s=e[r];t.setXYZ(r,s.x,s.y,s.z||0)}e.length>t.count&&Ye("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Dr);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){_t("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new G(-1/0,-1/0,-1/0),new G(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,r=t.length;n<r;n++){const s=t[n];ln.setFromBufferAttribute(s),this.morphTargetsRelative?(Gt.addVectors(this.boundingBox.min,ln.min),this.boundingBox.expandByPoint(Gt),Gt.addVectors(this.boundingBox.max,ln.max),this.boundingBox.expandByPoint(Gt)):(this.boundingBox.expandByPoint(ln.min),this.boundingBox.expandByPoint(ln.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&_t('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Is);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){_t("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new G,1/0);return}if(e){const n=this.boundingSphere.center;if(ln.setFromBufferAttribute(e),t)for(let s=0,o=t.length;s<o;s++){const a=t[s];fr.setFromBufferAttribute(a),this.morphTargetsRelative?(Gt.addVectors(ln.min,fr.min),ln.expandByPoint(Gt),Gt.addVectors(ln.max,fr.max),ln.expandByPoint(Gt)):(ln.expandByPoint(fr.min),ln.expandByPoint(fr.max))}ln.getCenter(n);let r=0;for(let s=0,o=e.count;s<o;s++)Gt.fromBufferAttribute(e,s),r=Math.max(r,n.distanceToSquared(Gt));if(t)for(let s=0,o=t.length;s<o;s++){const a=t[s],l=this.morphTargetsRelative;for(let c=0,u=a.count;c<u;c++)Gt.fromBufferAttribute(a,c),l&&(Gi.fromBufferAttribute(e,c),Gt.add(Gi)),r=Math.max(r,n.distanceToSquared(Gt))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&_t('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){_t("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,r=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new On(new Float32Array(4*n.count),4));const o=this.getAttribute("tangent"),a=[],l=[];for(let E=0;E<n.count;E++)a[E]=new G,l[E]=new G;const c=new G,u=new G,d=new G,f=new ct,v=new ct,x=new ct,y=new G,_=new G;function p(E,w,Z){c.fromBufferAttribute(n,E),u.fromBufferAttribute(n,w),d.fromBufferAttribute(n,Z),f.fromBufferAttribute(s,E),v.fromBufferAttribute(s,w),x.fromBufferAttribute(s,Z),u.sub(c),d.sub(c),v.sub(f),x.sub(f);const I=1/(v.x*x.y-x.x*v.y);isFinite(I)&&(y.copy(u).multiplyScalar(x.y).addScaledVector(d,-v.y).multiplyScalar(I),_.copy(d).multiplyScalar(v.x).addScaledVector(u,-x.x).multiplyScalar(I),a[E].add(y),a[w].add(y),a[Z].add(y),l[E].add(_),l[w].add(_),l[Z].add(_))}let b=this.groups;b.length===0&&(b=[{start:0,count:e.count}]);for(let E=0,w=b.length;E<w;++E){const Z=b[E],I=Z.start,W=Z.count;for(let $=I,q=I+W;$<q;$+=3)p(e.getX($+0),e.getX($+1),e.getX($+2))}const C=new G,A=new G,D=new G,P=new G;function U(E){D.fromBufferAttribute(r,E),P.copy(D);const w=a[E];C.copy(w),C.sub(D.multiplyScalar(D.dot(w))).normalize(),A.crossVectors(P,w);const I=A.dot(l[E])<0?-1:1;o.setXYZW(E,C.x,C.y,C.z,I)}for(let E=0,w=b.length;E<w;++E){const Z=b[E],I=Z.start,W=Z.count;for(let $=I,q=I+W;$<q;$+=3)U(e.getX($+0)),U(e.getX($+1)),U(e.getX($+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new On(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let f=0,v=n.count;f<v;f++)n.setXYZ(f,0,0,0);const r=new G,s=new G,o=new G,a=new G,l=new G,c=new G,u=new G,d=new G;if(e)for(let f=0,v=e.count;f<v;f+=3){const x=e.getX(f+0),y=e.getX(f+1),_=e.getX(f+2);r.fromBufferAttribute(t,x),s.fromBufferAttribute(t,y),o.fromBufferAttribute(t,_),u.subVectors(o,s),d.subVectors(r,s),u.cross(d),a.fromBufferAttribute(n,x),l.fromBufferAttribute(n,y),c.fromBufferAttribute(n,_),a.add(u),l.add(u),c.add(u),n.setXYZ(x,a.x,a.y,a.z),n.setXYZ(y,l.x,l.y,l.z),n.setXYZ(_,c.x,c.y,c.z)}else for(let f=0,v=t.count;f<v;f+=3)r.fromBufferAttribute(t,f+0),s.fromBufferAttribute(t,f+1),o.fromBufferAttribute(t,f+2),u.subVectors(o,s),d.subVectors(r,s),u.cross(d),n.setXYZ(f+0,u.x,u.y,u.z),n.setXYZ(f+1,u.x,u.y,u.z),n.setXYZ(f+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Gt.fromBufferAttribute(e,t),Gt.normalize(),e.setXYZ(t,Gt.x,Gt.y,Gt.z)}toNonIndexed(){function e(a,l){const c=a.array,u=a.itemSize,d=a.normalized,f=new c.constructor(l.length*u);let v=0,x=0;for(let y=0,_=l.length;y<_;y++){a.isInterleavedBufferAttribute?v=l[y]*a.data.stride+a.offset:v=l[y]*u;for(let p=0;p<u;p++)f[x++]=c[v++]}return new On(f,u,d)}if(this.index===null)return Ye("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new tn,n=this.index.array,r=this.attributes;for(const a in r){const l=r[a],c=e(l,n);t.setAttribute(a,c)}const s=this.morphAttributes;for(const a in s){const l=[],c=s[a];for(let u=0,d=c.length;u<d;u++){const f=c[u],v=e(f,n);l.push(v)}t.morphAttributes[a]=l}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const c=n[l];e.data.attributes[l]=c.toJSON(e.data)}const r={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let d=0,f=c.length;d<f;d++){const v=c[d];u.push(v.toJSON(e.data))}u.length>0&&(r[l]=u,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere=a.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone());const r=e.attributes;for(const c in r){const u=r[c];this.setAttribute(c,u.clone(t))}const s=e.morphAttributes;for(const c in s){const u=[],d=s[c];for(let f=0,v=d.length;f<v;f++)u.push(d[f].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let c=0,u=o.length;c<u;c++){const d=o[c];this.addGroup(d.start,d.count,d.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}let ru=0;class sr extends ir{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:ru++}),this.uuid=Ir(),this.name="",this.type="Material",this.blending=qi,this.side=li,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Io,this.blendDst=Do,this.blendEquation=Mi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new pt(0,0,0),this.blendAlpha=0,this.depthFunc=Cn,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=el,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Di,this.stencilZFail=Di,this.stencilZPass=Di,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){Ye(`Material: parameter '${t}' has value of undefined.`);continue}const r=this[t];if(r===void 0){Ye(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(n):r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==qi&&(n.blending=this.blending),this.side!==li&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Io&&(n.blendSrc=this.blendSrc),this.blendDst!==Do&&(n.blendDst=this.blendDst),this.blendEquation!==Mi&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Cn&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==el&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Di&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Di&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Di&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.allowOverride===!1&&(n.allowOverride=!1),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(s){const o=[];for(const a in s){const l=s[a];delete l.metadata,o.push(l)}return o}if(t){const s=r(e.textures),o=r(e.images);s.length>0&&(n.textures=s),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const r=t.length;n=new Array(r);for(let s=0;s!==r;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}const Vn=new G,uo=new G,Xr=new G,ni=new G,fo=new G,$r=new G,po=new G;class ka{constructor(e=new G,t=new G(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Vn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Vn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Vn.copy(this.origin).addScaledVector(this.direction,t),Vn.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){uo.copy(e).add(t).multiplyScalar(.5),Xr.copy(t).sub(e).normalize(),ni.copy(this.origin).sub(uo);const s=e.distanceTo(t)*.5,o=-this.direction.dot(Xr),a=ni.dot(this.direction),l=-ni.dot(Xr),c=ni.lengthSq(),u=Math.abs(1-o*o);let d,f,v,x;if(u>0)if(d=o*l-a,f=o*a-l,x=s*u,d>=0)if(f>=-x)if(f<=x){const y=1/u;d*=y,f*=y,v=d*(d+o*f+2*a)+f*(o*d+f+2*l)+c}else f=s,d=Math.max(0,-(o*f+a)),v=-d*d+f*(f+2*l)+c;else f=-s,d=Math.max(0,-(o*f+a)),v=-d*d+f*(f+2*l)+c;else f<=-x?(d=Math.max(0,-(-o*s+a)),f=d>0?-s:Math.min(Math.max(-s,-l),s),v=-d*d+f*(f+2*l)+c):f<=x?(d=0,f=Math.min(Math.max(-s,-l),s),v=f*(f+2*l)+c):(d=Math.max(0,-(o*s+a)),f=d>0?s:Math.min(Math.max(-s,-l),s),v=-d*d+f*(f+2*l)+c);else f=o>0?-s:s,d=Math.max(0,-(o*f+a)),v=-d*d+f*(f+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,d),r&&r.copy(uo).addScaledVector(Xr,f),v}intersectSphere(e,t){Vn.subVectors(e.center,this.origin);const n=Vn.dot(this.direction),r=Vn.dot(Vn)-n*n,s=e.radius*e.radius;if(r>s)return null;const o=Math.sqrt(s-r),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,t):this.at(a,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,s,o,a,l;const c=1/this.direction.x,u=1/this.direction.y,d=1/this.direction.z,f=this.origin;return c>=0?(n=(e.min.x-f.x)*c,r=(e.max.x-f.x)*c):(n=(e.max.x-f.x)*c,r=(e.min.x-f.x)*c),u>=0?(s=(e.min.y-f.y)*u,o=(e.max.y-f.y)*u):(s=(e.max.y-f.y)*u,o=(e.min.y-f.y)*u),n>o||s>r||((s>n||isNaN(n))&&(n=s),(o<r||isNaN(r))&&(r=o),d>=0?(a=(e.min.z-f.z)*d,l=(e.max.z-f.z)*d):(a=(e.max.z-f.z)*d,l=(e.min.z-f.z)*d),n>l||a>r)||((a>n||n!==n)&&(n=a),(l<r||r!==r)&&(r=l),r<0)?null:this.at(n>=0?n:r,t)}intersectsBox(e){return this.intersectBox(e,Vn)!==null}intersectTriangle(e,t,n,r,s){fo.subVectors(t,e),$r.subVectors(n,e),po.crossVectors(fo,$r);let o=this.direction.dot(po),a;if(o>0){if(r)return null;a=1}else if(o<0)a=-1,o=-o;else return null;ni.subVectors(this.origin,e);const l=a*this.direction.dot($r.crossVectors(ni,$r));if(l<0)return null;const c=a*this.direction.dot(fo.cross(ni));if(c<0||l+c>o)return null;const u=-a*ni.dot(po);return u<0?null:this.at(u/o,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Wn extends sr{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new pt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Fn,this.combine=mc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const gl=new It,di=new ka,Yr=new Is,_l=new G,qr=new G,jr=new G,Zr=new G,mo=new G,Kr=new G,vl=new G,Jr=new G;class ot extends Wt{constructor(e=new tn,t=new Wn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(e,t){const n=this.geometry,r=n.attributes.position,s=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(r,e);const a=this.morphTargetInfluences;if(s&&a){Kr.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const u=a[l],d=s[l];u!==0&&(mo.fromBufferAttribute(d,e),o?Kr.addScaledVector(mo,u):Kr.addScaledVector(mo.sub(t),u))}t.add(Kr)}return t}raycast(e,t){const n=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Yr.copy(n.boundingSphere),Yr.applyMatrix4(s),di.copy(e.ray).recast(e.near),!(Yr.containsPoint(di.origin)===!1&&(di.intersectSphere(Yr,_l)===null||di.origin.distanceToSquared(_l)>(e.far-e.near)**2))&&(gl.copy(s).invert(),di.copy(e.ray).applyMatrix4(gl),!(n.boundingBox!==null&&di.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,di)))}_computeIntersections(e,t,n){let r;const s=this.geometry,o=this.material,a=s.index,l=s.attributes.position,c=s.attributes.uv,u=s.attributes.uv1,d=s.attributes.normal,f=s.groups,v=s.drawRange;if(a!==null)if(Array.isArray(o))for(let x=0,y=f.length;x<y;x++){const _=f[x],p=o[_.materialIndex],b=Math.max(_.start,v.start),C=Math.min(a.count,Math.min(_.start+_.count,v.start+v.count));for(let A=b,D=C;A<D;A+=3){const P=a.getX(A),U=a.getX(A+1),E=a.getX(A+2);r=Qr(this,p,e,n,c,u,d,P,U,E),r&&(r.faceIndex=Math.floor(A/3),r.face.materialIndex=_.materialIndex,t.push(r))}}else{const x=Math.max(0,v.start),y=Math.min(a.count,v.start+v.count);for(let _=x,p=y;_<p;_+=3){const b=a.getX(_),C=a.getX(_+1),A=a.getX(_+2);r=Qr(this,o,e,n,c,u,d,b,C,A),r&&(r.faceIndex=Math.floor(_/3),t.push(r))}}else if(l!==void 0)if(Array.isArray(o))for(let x=0,y=f.length;x<y;x++){const _=f[x],p=o[_.materialIndex],b=Math.max(_.start,v.start),C=Math.min(l.count,Math.min(_.start+_.count,v.start+v.count));for(let A=b,D=C;A<D;A+=3){const P=A,U=A+1,E=A+2;r=Qr(this,p,e,n,c,u,d,P,U,E),r&&(r.faceIndex=Math.floor(A/3),r.face.materialIndex=_.materialIndex,t.push(r))}}else{const x=Math.max(0,v.start),y=Math.min(l.count,v.start+v.count);for(let _=x,p=y;_<p;_+=3){const b=_,C=_+1,A=_+2;r=Qr(this,o,e,n,c,u,d,b,C,A),r&&(r.faceIndex=Math.floor(_/3),t.push(r))}}}}function su(i,e,t,n,r,s,o,a){let l;if(e.side===rn?l=n.intersectTriangle(o,s,r,!0,a):l=n.intersectTriangle(r,s,o,e.side===li,a),l===null)return null;Jr.copy(a),Jr.applyMatrix4(i.matrixWorld);const c=t.ray.origin.distanceTo(Jr);return c<t.near||c>t.far?null:{distance:c,point:Jr.clone(),object:i}}function Qr(i,e,t,n,r,s,o,a,l,c){i.getVertexPosition(a,qr),i.getVertexPosition(l,jr),i.getVertexPosition(c,Zr);const u=su(i,e,t,n,qr,jr,Zr,vl);if(u){const d=new G;Sn.getBarycoord(vl,qr,jr,Zr,d),r&&(u.uv=Sn.getInterpolatedAttribute(r,a,l,c,d,new ct)),s&&(u.uv1=Sn.getInterpolatedAttribute(s,a,l,c,d,new ct)),o&&(u.normal=Sn.getInterpolatedAttribute(o,a,l,c,d,new G),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));const f={a,b:l,c,normal:new G,materialIndex:0};Sn.getNormal(qr,jr,Zr,f.normal),u.face=f,u.barycoord=d}return u}class ou extends Qt{constructor(e=null,t=1,n=1,r,s,o,a,l,c=Yt,u=Yt,d,f){super(null,o,a,l,c,u,r,s,d,f),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const go=new G,au=new G,lu=new et;class xi{constructor(e=new G(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const r=go.subVectors(n,t).cross(au.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(go),r=this.normal.dot(n);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:t.copy(e.start).addScaledVector(n,s)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||lu.getNormalMatrix(e),r=this.coplanarPoint(go).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const pi=new Is,cu=new ct(.5,.5),es=new G;class za{constructor(e=new xi,t=new xi,n=new xi,r=new xi,s=new xi,o=new xi){this.planes=[e,t,n,r,s,o]}set(e,t,n,r,s,o){const a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(r),a[4].copy(s),a[5].copy(o),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=In,n=!1){const r=this.planes,s=e.elements,o=s[0],a=s[1],l=s[2],c=s[3],u=s[4],d=s[5],f=s[6],v=s[7],x=s[8],y=s[9],_=s[10],p=s[11],b=s[12],C=s[13],A=s[14],D=s[15];if(r[0].setComponents(c-o,v-u,p-x,D-b).normalize(),r[1].setComponents(c+o,v+u,p+x,D+b).normalize(),r[2].setComponents(c+a,v+d,p+y,D+C).normalize(),r[3].setComponents(c-a,v-d,p-y,D-C).normalize(),n)r[4].setComponents(l,f,_,A).normalize(),r[5].setComponents(c-l,v-f,p-_,D-A).normalize();else if(r[4].setComponents(c-l,v-f,p-_,D-A).normalize(),t===In)r[5].setComponents(c+l,v+f,p+_,D+A).normalize();else if(t===Cr)r[5].setComponents(l,f,_,A).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),pi.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),pi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(pi)}intersectsSprite(e){pi.center.set(0,0,0);const t=cu.distanceTo(e.center);return pi.radius=.7071067811865476+t,pi.applyMatrix4(e.matrixWorld),this.intersectsSphere(pi)}intersectsSphere(e){const t=this.planes,n=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const r=t[n];if(es.x=r.normal.x>0?e.max.x:e.min.x,es.y=r.normal.y>0?e.max.y:e.min.y,es.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(es)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Nc extends sr{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new pt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Es=new G,Ts=new G,xl=new It,dr=new ka,ts=new Is,_o=new G,Ml=new G;class hu extends Wt{constructor(e=new tn,t=new Nc){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let r=1,s=t.count;r<s;r++)Es.fromBufferAttribute(t,r-1),Ts.fromBufferAttribute(t,r),n[r]=n[r-1],n[r]+=Es.distanceTo(Ts);e.setAttribute("lineDistance",new Ft(n,1))}else Ye("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,r=this.matrixWorld,s=e.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),ts.copy(n.boundingSphere),ts.applyMatrix4(r),ts.radius+=s,e.ray.intersectsSphere(ts)===!1)return;xl.copy(r).invert(),dr.copy(e.ray).applyMatrix4(xl);const a=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=this.isLineSegments?2:1,u=n.index,f=n.attributes.position;if(u!==null){const v=Math.max(0,o.start),x=Math.min(u.count,o.start+o.count);for(let y=v,_=x-1;y<_;y+=c){const p=u.getX(y),b=u.getX(y+1),C=ns(this,e,dr,l,p,b,y);C&&t.push(C)}if(this.isLineLoop){const y=u.getX(x-1),_=u.getX(v),p=ns(this,e,dr,l,y,_,x-1);p&&t.push(p)}}else{const v=Math.max(0,o.start),x=Math.min(f.count,o.start+o.count);for(let y=v,_=x-1;y<_;y+=c){const p=ns(this,e,dr,l,y,y+1,y);p&&t.push(p)}if(this.isLineLoop){const y=ns(this,e,dr,l,x-1,v,x-1);y&&t.push(y)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const r=t[n[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){const a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}}function ns(i,e,t,n,r,s,o){const a=i.geometry.attributes.position;if(Es.fromBufferAttribute(a,r),Ts.fromBufferAttribute(a,s),t.distanceSqToSegment(Es,Ts,_o,Ml)>n)return;_o.applyMatrix4(i.matrixWorld);const c=e.ray.origin.distanceTo(_o);if(!(c<e.near||c>e.far))return{distance:c,point:Ml.clone().applyMatrix4(i.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:i}}class Fc extends Qt{constructor(e=[],t=wi,n,r,s,o,a,l,c,u){super(e,t,n,r,s,o,a,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class xa extends Qt{constructor(e,t,n,r,s,o,a,l,c){super(e,t,n,r,s,o,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Pr extends Qt{constructor(e,t,n=Nn,r,s,o,a=Yt,l=Yt,c,u=jn,d=1){if(u!==jn&&u!==bi)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const f={width:e,height:t,depth:d};super(f,r,s,o,a,l,u,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Fa(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class uu extends Pr{constructor(e,t=Nn,n=wi,r,s,o=Yt,a=Yt,l,c=jn){const u={width:e,height:e,depth:1},d=[u,u,u,u,u,u];super(e,e,t,n,r,s,o,a,l,c),this.image=d,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class Bc extends Qt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class Ot extends tn{constructor(e=1,t=1,n=1,r=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:s,depthSegments:o};const a=this;r=Math.floor(r),s=Math.floor(s),o=Math.floor(o);const l=[],c=[],u=[],d=[];let f=0,v=0;x("z","y","x",-1,-1,n,t,e,o,s,0),x("z","y","x",1,-1,n,t,-e,o,s,1),x("x","z","y",1,1,e,n,t,r,o,2),x("x","z","y",1,-1,e,n,-t,r,o,3),x("x","y","z",1,-1,e,t,n,r,s,4),x("x","y","z",-1,-1,e,t,-n,r,s,5),this.setIndex(l),this.setAttribute("position",new Ft(c,3)),this.setAttribute("normal",new Ft(u,3)),this.setAttribute("uv",new Ft(d,2));function x(y,_,p,b,C,A,D,P,U,E,w){const Z=A/U,I=D/E,W=A/2,$=D/2,q=P/2,X=U+1,Y=E+1;let H=0,oe=0;const ne=new G;for(let Se=0;Se<Y;Se++){const Te=Se*I-$;for(let be=0;be<X;be++){const je=be*Z-W;ne[y]=je*b,ne[_]=Te*C,ne[p]=q,c.push(ne.x,ne.y,ne.z),ne[y]=0,ne[_]=0,ne[p]=P>0?1:-1,u.push(ne.x,ne.y,ne.z),d.push(be/U),d.push(1-Se/E),H+=1}}for(let Se=0;Se<E;Se++)for(let Te=0;Te<U;Te++){const be=f+Te+X*Se,je=f+Te+X*(Se+1),Rt=f+(Te+1)+X*(Se+1),bt=f+(Te+1)+X*Se;l.push(be,je,bt),l.push(je,Rt,bt),oe+=6}a.addGroup(v,oe,w),v+=oe,f+=H}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ot(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class bs extends tn{constructor(e=1,t=32,n=0,r=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:r},t=Math.max(3,t);const s=[],o=[],a=[],l=[],c=new G,u=new ct;o.push(0,0,0),a.push(0,0,1),l.push(.5,.5);for(let d=0,f=3;d<=t;d++,f+=3){const v=n+d/t*r;c.x=e*Math.cos(v),c.y=e*Math.sin(v),o.push(c.x,c.y,c.z),a.push(0,0,1),u.x=(o[f]/e+1)/2,u.y=(o[f+1]/e+1)/2,l.push(u.x,u.y)}for(let d=1;d<=t;d++)s.push(d,d+1,0);this.setIndex(s),this.setAttribute("position",new Ft(o,3)),this.setAttribute("normal",new Ft(a,3)),this.setAttribute("uv",new Ft(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new bs(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class Ha extends tn{constructor(e=1,t=1,n=1,r=32,s=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:r,heightSegments:s,openEnded:o,thetaStart:a,thetaLength:l};const c=this;r=Math.floor(r),s=Math.floor(s);const u=[],d=[],f=[],v=[];let x=0;const y=[],_=n/2;let p=0;b(),o===!1&&(e>0&&C(!0),t>0&&C(!1)),this.setIndex(u),this.setAttribute("position",new Ft(d,3)),this.setAttribute("normal",new Ft(f,3)),this.setAttribute("uv",new Ft(v,2));function b(){const A=new G,D=new G;let P=0;const U=(t-e)/n;for(let E=0;E<=s;E++){const w=[],Z=E/s,I=Z*(t-e)+e;for(let W=0;W<=r;W++){const $=W/r,q=$*l+a,X=Math.sin(q),Y=Math.cos(q);D.x=I*X,D.y=-Z*n+_,D.z=I*Y,d.push(D.x,D.y,D.z),A.set(X,U,Y).normalize(),f.push(A.x,A.y,A.z),v.push($,1-Z),w.push(x++)}y.push(w)}for(let E=0;E<r;E++)for(let w=0;w<s;w++){const Z=y[w][E],I=y[w+1][E],W=y[w+1][E+1],$=y[w][E+1];(e>0||w!==0)&&(u.push(Z,I,$),P+=3),(t>0||w!==s-1)&&(u.push(I,W,$),P+=3)}c.addGroup(p,P,0),p+=P}function C(A){const D=x,P=new ct,U=new G;let E=0;const w=A===!0?e:t,Z=A===!0?1:-1;for(let W=1;W<=r;W++)d.push(0,_*Z,0),f.push(0,Z,0),v.push(.5,.5),x++;const I=x;for(let W=0;W<=r;W++){const q=W/r*l+a,X=Math.cos(q),Y=Math.sin(q);U.x=w*Y,U.y=_*Z,U.z=w*X,d.push(U.x,U.y,U.z),f.push(0,Z,0),P.x=X*.5+.5,P.y=Y*.5*Z+.5,v.push(P.x,P.y),x++}for(let W=0;W<r;W++){const $=D+W,q=I+W;A===!0?u.push(q,q+1,$):u.push(q+1,q,$),E+=3}c.addGroup(p,E,A===!0?1:2),p+=E}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ha(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Ga extends Ha{constructor(e=1,t=1,n=32,r=1,s=!1,o=0,a=Math.PI*2){super(0,e,t,n,r,s,o,a),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:r,openEnded:s,thetaStart:o,thetaLength:a}}static fromJSON(e){return new Ga(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Lr extends tn{constructor(e=1,t=1,n=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};const s=e/2,o=t/2,a=Math.floor(n),l=Math.floor(r),c=a+1,u=l+1,d=e/a,f=t/l,v=[],x=[],y=[],_=[];for(let p=0;p<u;p++){const b=p*f-o;for(let C=0;C<c;C++){const A=C*d-s;x.push(A,-b,0),y.push(0,0,1),_.push(C/a),_.push(1-p/l)}}for(let p=0;p<l;p++)for(let b=0;b<a;b++){const C=b+c*p,A=b+c*(p+1),D=b+1+c*(p+1),P=b+1+c*p;v.push(C,A,P),v.push(A,D,P)}this.setIndex(v),this.setAttribute("position",new Ft(x,3)),this.setAttribute("normal",new Ft(y,3)),this.setAttribute("uv",new Ft(_,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Lr(e.width,e.height,e.widthSegments,e.heightSegments)}}class Va extends tn{constructor(e=.5,t=1,n=32,r=1,s=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:r,thetaStart:s,thetaLength:o},n=Math.max(3,n),r=Math.max(1,r);const a=[],l=[],c=[],u=[];let d=e;const f=(t-e)/r,v=new G,x=new ct;for(let y=0;y<=r;y++){for(let _=0;_<=n;_++){const p=s+_/n*o;v.x=d*Math.cos(p),v.y=d*Math.sin(p),l.push(v.x,v.y,v.z),c.push(0,0,1),x.x=(v.x/t+1)/2,x.y=(v.y/t+1)/2,u.push(x.x,x.y)}d+=f}for(let y=0;y<r;y++){const _=y*(n+1);for(let p=0;p<n;p++){const b=p+_,C=b,A=b+n+1,D=b+n+2,P=b+1;a.push(C,A,P),a.push(A,D,P)}}this.setIndex(a),this.setAttribute("position",new Ft(l,3)),this.setAttribute("normal",new Ft(c,3)),this.setAttribute("uv",new Ft(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Va(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class Si extends tn{constructor(e=1,t=32,n=16,r=0,s=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:r,phiLength:s,thetaStart:o,thetaLength:a},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const l=Math.min(o+a,Math.PI);let c=0;const u=[],d=new G,f=new G,v=[],x=[],y=[],_=[];for(let p=0;p<=n;p++){const b=[],C=p/n;let A=0;p===0&&o===0?A=.5/t:p===n&&l===Math.PI&&(A=-.5/t);for(let D=0;D<=t;D++){const P=D/t;d.x=-e*Math.cos(r+P*s)*Math.sin(o+C*a),d.y=e*Math.cos(o+C*a),d.z=e*Math.sin(r+P*s)*Math.sin(o+C*a),x.push(d.x,d.y,d.z),f.copy(d).normalize(),y.push(f.x,f.y,f.z),_.push(P+A,1-C),b.push(c++)}u.push(b)}for(let p=0;p<n;p++)for(let b=0;b<t;b++){const C=u[p][b+1],A=u[p][b],D=u[p+1][b],P=u[p+1][b+1];(p!==0||o>0)&&v.push(C,A,P),(p!==n-1||l<Math.PI)&&v.push(A,D,P)}this.setIndex(v),this.setAttribute("position",new Ft(x,3)),this.setAttribute("normal",new Ft(y,3)),this.setAttribute("uv",new Ft(_,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Si(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}function Qi(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const r=i[t][n];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(Ye("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=r.clone():Array.isArray(r)?e[t][n]=r.slice():e[t][n]=r}}return e}function en(i){const e={};for(let t=0;t<i.length;t++){const n=Qi(i[t]);for(const r in n)e[r]=n[r]}return e}function fu(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function kc(i){const e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:vt.workingColorSpace}const du={clone:Qi,merge:en};var pu=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,mu=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Bn extends sr{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=pu,this.fragmentShader=mu,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Qi(e.uniforms),this.uniformsGroups=fu(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const r in this.uniforms){const o=this.uniforms[r].value;o&&o.isTexture?t.uniforms[r]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[r]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[r]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[r]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[r]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[r]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[r]={type:"m4",value:o.toArray()}:t.uniforms[r]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const r in this.extensions)this.extensions[r]===!0&&(n[r]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class gu extends Bn{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class Dn extends sr{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new pt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new pt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Pc,this.normalScale=new ct(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Fn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class _u extends sr{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Rh,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class vu extends sr{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class Wa extends Wt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new pt(e),this.intensity=t}dispose(){this.dispatchEvent({type:"dispose"})}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}}class xu extends Wa{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Wt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new pt(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){const t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}}const vo=new It,Sl=new G,yl=new G;class Mu{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ct(512,512),this.mapType=hn,this.map=null,this.mapPass=null,this.matrix=new It,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new za,this._frameExtents=new ct(1,1),this._viewportCount=1,this._viewports=[new Nt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;Sl.setFromMatrixPosition(e.matrixWorld),t.position.copy(Sl),yl.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(yl),t.updateMatrixWorld(),vo.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(vo,t.coordinateSystem,t.reversedDepth),t.coordinateSystem===Cr||t.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(vo)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const is=new G,rs=new rr,bn=new G;class zc extends Wt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new It,this.projectionMatrix=new It,this.projectionMatrixInverse=new It,this.coordinateSystem=In,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(is,rs,bn),bn.x===1&&bn.y===1&&bn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(is,rs,bn.set(1,1,1)).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorld.decompose(is,rs,bn),bn.x===1&&bn.y===1&&bn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(is,rs,bn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const ii=new G,El=new ct,Tl=new ct;class dn extends zc{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=va*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan($s*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return va*2*Math.atan(Math.tan($s*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){ii.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(ii.x,ii.y).multiplyScalar(-e/ii.z),ii.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(ii.x,ii.y).multiplyScalar(-e/ii.z)}getViewSize(e,t){return this.getViewBounds(e,El,Tl),t.subVectors(Tl,El)}setViewOffset(e,t,n,r,s,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan($s*.5*this.fov)/this.zoom,n=2*t,r=this.aspect*n,s=-.5*r;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;s+=o.offsetX*r/l,t-=o.offsetY*n/c,r*=o.width/l,n*=o.height/c}const a=this.filmOffset;a!==0&&(s+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}class Xa extends zc{constructor(e=-1,t=1,n=1,r=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=n-e,o=n+e,a=r+t,l=r-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,o=s+c*this.view.width,a-=u*this.view.offsetY,l=a-u*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class Su extends Mu{constructor(){super(new Xa(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class yu extends Wa{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Wt.DEFAULT_UP),this.updateMatrix(),this.target=new Wt,this.shadow=new Su}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}}class Eu extends Wa{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}const Vi=-90,Wi=1;class Tu extends Wt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new dn(Vi,Wi,e,t);r.layers=this.layers,this.add(r);const s=new dn(Vi,Wi,e,t);s.layers=this.layers,this.add(s);const o=new dn(Vi,Wi,e,t);o.layers=this.layers,this.add(o);const a=new dn(Vi,Wi,e,t);a.layers=this.layers,this.add(a);const l=new dn(Vi,Wi,e,t);l.layers=this.layers,this.add(l);const c=new dn(Vi,Wi,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,r,s,o,a,l]=t;for(const c of t)this.remove(c);if(e===In)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Cr)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,o,a,l,c,u]=this.children,d=e.getRenderTarget(),f=e.getActiveCubeFace(),v=e.getActiveMipmapLevel(),x=e.xr.enabled;e.xr.enabled=!1;const y=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let _=!1;e.isWebGLRenderer===!0?_=e.state.buffers.depth.getReversed():_=e.reversedDepthBuffer,e.setRenderTarget(n,0,r),_&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(n,1,r),_&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,2,r),_&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,3,r),_&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(n,4,r),_&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),n.texture.generateMipmaps=y,e.setRenderTarget(n,5,r),_&&e.autoClear===!1&&e.clearDepth(),e.render(t,u),e.setRenderTarget(d,f,v),e.xr.enabled=x,n.texture.needsPMREMUpdate=!0}}class bu extends dn{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}const bl=new It;class wu{constructor(e,t,n=0,r=1/0){this.ray=new ka(e,t),this.near=n,this.far=r,this.camera=null,this.layers=new Ba,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):_t("Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return bl.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(bl),this}intersectObject(e,t=!0,n=[]){return Ma(e,this,n,t),n.sort(wl),n}intersectObjects(e,t=!0,n=[]){for(let r=0,s=e.length;r<s;r++)Ma(e[r],this,n,t);return n.sort(wl),n}}function wl(i,e){return i.distance-e.distance}function Ma(i,e,t,n){let r=!0;if(i.layers.test(e.layers)&&i.raycast(e,t)===!1&&(r=!1),r===!0&&n===!0){const s=i.children;for(let o=0,a=s.length;o<a;o++)Ma(s[o],e,t,!0)}}function Al(i,e,t,n){const r=Au(n);switch(t){case Ac:return i*e;case Cc:return i*e/r.components*r.byteLength;case Da:return i*e/r.components*r.byteLength;case Ki:return i*e*2/r.components*r.byteLength;case La:return i*e*2/r.components*r.byteLength;case Rc:return i*e*3/r.components*r.byteLength;case yn:return i*e*4/r.components*r.byteLength;case Ua:return i*e*4/r.components*r.byteLength;case us:case fs:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case ds:case ps:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Ho:case Vo:return Math.max(i,16)*Math.max(e,8)/4;case zo:case Go:return Math.max(i,8)*Math.max(e,8)/2;case Wo:case Xo:case Yo:case qo:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case $o:case jo:case Zo:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Ko:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Jo:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case Qo:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case ea:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case ta:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case na:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case ia:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case ra:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case sa:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case oa:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case aa:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case la:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case ca:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case ha:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case ua:case fa:case da:return Math.ceil(i/4)*Math.ceil(e/4)*16;case pa:case ma:return Math.ceil(i/4)*Math.ceil(e/4)*8;case ga:case _a:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Au(i){switch(i){case hn:case Ec:return{byteLength:1,components:1};case Ar:case Tc:case qn:return{byteLength:2,components:1};case Pa:case Ia:return{byteLength:2,components:4};case Nn:case Ca:case Pn:return{byteLength:4,components:1};case bc:case wc:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Aa}}));typeof window<"u"&&(window.__THREE__?Ye("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Aa);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function Hc(){let i=null,e=!1,t=null,n=null;function r(s,o){t(s,o),n=i.requestAnimationFrame(r)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(r),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){i=s}}}function Ru(i){const e=new WeakMap;function t(a,l){const c=a.array,u=a.usage,d=c.byteLength,f=i.createBuffer();i.bindBuffer(l,f),i.bufferData(l,c,u),a.onUploadCallback();let v;if(c instanceof Float32Array)v=i.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)v=i.HALF_FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?v=i.HALF_FLOAT:v=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)v=i.SHORT;else if(c instanceof Uint32Array)v=i.UNSIGNED_INT;else if(c instanceof Int32Array)v=i.INT;else if(c instanceof Int8Array)v=i.BYTE;else if(c instanceof Uint8Array)v=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)v=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:f,type:v,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:d}}function n(a,l,c){const u=l.array,d=l.updateRanges;if(i.bindBuffer(c,a),d.length===0)i.bufferSubData(c,0,u);else{d.sort((v,x)=>v.start-x.start);let f=0;for(let v=1;v<d.length;v++){const x=d[f],y=d[v];y.start<=x.start+x.count+1?x.count=Math.max(x.count,y.start+y.count-x.start):(++f,d[f]=y)}d.length=f+1;for(let v=0,x=d.length;v<x;v++){const y=d[v];i.bufferSubData(c,y.start*u.BYTES_PER_ELEMENT,u,y.start,y.count)}l.clearUpdateRanges()}l.onUploadCallback()}function r(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function s(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=e.get(a);l&&(i.deleteBuffer(l.buffer),e.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const u=e.get(a);(!u||u.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const c=e.get(a);if(c===void 0)e.set(a,t(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,a,l),c.version=a.version}}return{get:r,remove:s,update:o}}var Cu=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Pu=`#ifdef USE_ALPHAHASH
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
#endif`,Iu=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Du=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Lu=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Uu=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Ou=`#ifdef USE_AOMAP
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
#endif`,Nu=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Fu=`#ifdef USE_BATCHING
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
#endif`,Bu=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,ku=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,zu=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Hu=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Gu=`#ifdef USE_IRIDESCENCE
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
#endif`,Vu=`#ifdef USE_BUMPMAP
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
#endif`,Wu=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Xu=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,$u=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Yu=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,qu=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,ju=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Zu=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,Ku=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,Ju=`#define PI 3.141592653589793
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
} // validated`,Qu=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,ef=`vec3 transformedNormal = objectNormal;
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
#endif`,tf=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,nf=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,rf=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,sf=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,of="gl_FragColor = linearToOutputTexel( gl_FragColor );",af=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,lf=`#ifdef USE_ENVMAP
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
#endif`,cf=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,hf=`#ifdef USE_ENVMAP
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
#endif`,uf=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,ff=`#ifdef USE_ENVMAP
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
#endif`,df=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,pf=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,mf=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,gf=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,_f=`#ifdef USE_GRADIENTMAP
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
}`,vf=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,xf=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Mf=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Sf=`uniform bool receiveShadow;
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
#endif`,yf=`#ifdef USE_ENVMAP
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
#endif`,Ef=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Tf=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,bf=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,wf=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Af=`PhysicalMaterial material;
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
#endif`,Rf=`uniform sampler2D dfgLUT;
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
}`,Cf=`
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
#endif`,Pf=`#if defined( RE_IndirectDiffuse )
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
#endif`,If=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Df=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Lf=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Uf=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Of=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Nf=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Ff=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Bf=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,kf=`#if defined( USE_POINTS_UV )
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
#endif`,zf=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Hf=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Gf=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Vf=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Wf=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Xf=`#ifdef USE_MORPHTARGETS
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
#endif`,$f=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Yf=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,qf=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,jf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Zf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Kf=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Jf=`#ifdef USE_NORMALMAP
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
#endif`,Qf=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,ed=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,td=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,nd=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,id=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,rd=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,sd=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,od=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,ad=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,ld=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,cd=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,hd=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,ud=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,fd=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,dd=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,pd=`float getShadowMask() {
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
}`,md=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,gd=`#ifdef USE_SKINNING
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
#endif`,_d=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,vd=`#ifdef USE_SKINNING
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
#endif`,xd=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Md=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Sd=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,yd=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Ed=`#ifdef USE_TRANSMISSION
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
#endif`,Td=`#ifdef USE_TRANSMISSION
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
#endif`,bd=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,wd=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Ad=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Rd=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Cd=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Pd=`uniform sampler2D t2D;
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
}`,Id=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Dd=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Ld=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Ud=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Od=`#include <common>
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
}`,Nd=`#if DEPTH_PACKING == 3200
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
}`,Fd=`#define DISTANCE
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
}`,Bd=`#define DISTANCE
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
}`,kd=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,zd=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Hd=`uniform float scale;
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
}`,Gd=`uniform vec3 diffuse;
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
}`,Vd=`#include <common>
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
}`,Wd=`uniform vec3 diffuse;
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
}`,Xd=`#define LAMBERT
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
}`,$d=`#define LAMBERT
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
}`,Yd=`#define MATCAP
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
}`,qd=`#define MATCAP
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
}`,jd=`#define NORMAL
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
}`,Zd=`#define NORMAL
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
}`,Kd=`#define PHONG
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
}`,Jd=`#define PHONG
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
}`,Qd=`#define STANDARD
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
}`,ep=`#define STANDARD
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
}`,tp=`#define TOON
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
}`,np=`#define TOON
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
}`,ip=`uniform float size;
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
}`,rp=`uniform vec3 diffuse;
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
}`,sp=`#include <common>
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
}`,op=`uniform vec3 color;
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
}`,ap=`uniform float rotation;
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
}`,lp=`uniform vec3 diffuse;
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
}`,rt={alphahash_fragment:Cu,alphahash_pars_fragment:Pu,alphamap_fragment:Iu,alphamap_pars_fragment:Du,alphatest_fragment:Lu,alphatest_pars_fragment:Uu,aomap_fragment:Ou,aomap_pars_fragment:Nu,batching_pars_vertex:Fu,batching_vertex:Bu,begin_vertex:ku,beginnormal_vertex:zu,bsdfs:Hu,iridescence_fragment:Gu,bumpmap_pars_fragment:Vu,clipping_planes_fragment:Wu,clipping_planes_pars_fragment:Xu,clipping_planes_pars_vertex:$u,clipping_planes_vertex:Yu,color_fragment:qu,color_pars_fragment:ju,color_pars_vertex:Zu,color_vertex:Ku,common:Ju,cube_uv_reflection_fragment:Qu,defaultnormal_vertex:ef,displacementmap_pars_vertex:tf,displacementmap_vertex:nf,emissivemap_fragment:rf,emissivemap_pars_fragment:sf,colorspace_fragment:of,colorspace_pars_fragment:af,envmap_fragment:lf,envmap_common_pars_fragment:cf,envmap_pars_fragment:hf,envmap_pars_vertex:uf,envmap_physical_pars_fragment:yf,envmap_vertex:ff,fog_vertex:df,fog_pars_vertex:pf,fog_fragment:mf,fog_pars_fragment:gf,gradientmap_pars_fragment:_f,lightmap_pars_fragment:vf,lights_lambert_fragment:xf,lights_lambert_pars_fragment:Mf,lights_pars_begin:Sf,lights_toon_fragment:Ef,lights_toon_pars_fragment:Tf,lights_phong_fragment:bf,lights_phong_pars_fragment:wf,lights_physical_fragment:Af,lights_physical_pars_fragment:Rf,lights_fragment_begin:Cf,lights_fragment_maps:Pf,lights_fragment_end:If,logdepthbuf_fragment:Df,logdepthbuf_pars_fragment:Lf,logdepthbuf_pars_vertex:Uf,logdepthbuf_vertex:Of,map_fragment:Nf,map_pars_fragment:Ff,map_particle_fragment:Bf,map_particle_pars_fragment:kf,metalnessmap_fragment:zf,metalnessmap_pars_fragment:Hf,morphinstance_vertex:Gf,morphcolor_vertex:Vf,morphnormal_vertex:Wf,morphtarget_pars_vertex:Xf,morphtarget_vertex:$f,normal_fragment_begin:Yf,normal_fragment_maps:qf,normal_pars_fragment:jf,normal_pars_vertex:Zf,normal_vertex:Kf,normalmap_pars_fragment:Jf,clearcoat_normal_fragment_begin:Qf,clearcoat_normal_fragment_maps:ed,clearcoat_pars_fragment:td,iridescence_pars_fragment:nd,opaque_fragment:id,packing:rd,premultiplied_alpha_fragment:sd,project_vertex:od,dithering_fragment:ad,dithering_pars_fragment:ld,roughnessmap_fragment:cd,roughnessmap_pars_fragment:hd,shadowmap_pars_fragment:ud,shadowmap_pars_vertex:fd,shadowmap_vertex:dd,shadowmask_pars_fragment:pd,skinbase_vertex:md,skinning_pars_vertex:gd,skinning_vertex:_d,skinnormal_vertex:vd,specularmap_fragment:xd,specularmap_pars_fragment:Md,tonemapping_fragment:Sd,tonemapping_pars_fragment:yd,transmission_fragment:Ed,transmission_pars_fragment:Td,uv_pars_fragment:bd,uv_pars_vertex:wd,uv_vertex:Ad,worldpos_vertex:Rd,background_vert:Cd,background_frag:Pd,backgroundCube_vert:Id,backgroundCube_frag:Dd,cube_vert:Ld,cube_frag:Ud,depth_vert:Od,depth_frag:Nd,distance_vert:Fd,distance_frag:Bd,equirect_vert:kd,equirect_frag:zd,linedashed_vert:Hd,linedashed_frag:Gd,meshbasic_vert:Vd,meshbasic_frag:Wd,meshlambert_vert:Xd,meshlambert_frag:$d,meshmatcap_vert:Yd,meshmatcap_frag:qd,meshnormal_vert:jd,meshnormal_frag:Zd,meshphong_vert:Kd,meshphong_frag:Jd,meshphysical_vert:Qd,meshphysical_frag:ep,meshtoon_vert:tp,meshtoon_frag:np,points_vert:ip,points_frag:rp,shadow_vert:sp,shadow_frag:op,sprite_vert:ap,sprite_frag:lp},Me={common:{diffuse:{value:new pt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new et},alphaMap:{value:null},alphaMapTransform:{value:new et},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new et}},envmap:{envMap:{value:null},envMapRotation:{value:new et},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new et}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new et}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new et},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new et},normalScale:{value:new ct(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new et},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new et}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new et}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new et}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new pt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new pt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new et},alphaTest:{value:0},uvTransform:{value:new et}},sprite:{diffuse:{value:new pt(16777215)},opacity:{value:1},center:{value:new ct(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new et},alphaMap:{value:null},alphaMapTransform:{value:new et},alphaTest:{value:0}}},Rn={basic:{uniforms:en([Me.common,Me.specularmap,Me.envmap,Me.aomap,Me.lightmap,Me.fog]),vertexShader:rt.meshbasic_vert,fragmentShader:rt.meshbasic_frag},lambert:{uniforms:en([Me.common,Me.specularmap,Me.envmap,Me.aomap,Me.lightmap,Me.emissivemap,Me.bumpmap,Me.normalmap,Me.displacementmap,Me.fog,Me.lights,{emissive:{value:new pt(0)},envMapIntensity:{value:1}}]),vertexShader:rt.meshlambert_vert,fragmentShader:rt.meshlambert_frag},phong:{uniforms:en([Me.common,Me.specularmap,Me.envmap,Me.aomap,Me.lightmap,Me.emissivemap,Me.bumpmap,Me.normalmap,Me.displacementmap,Me.fog,Me.lights,{emissive:{value:new pt(0)},specular:{value:new pt(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:rt.meshphong_vert,fragmentShader:rt.meshphong_frag},standard:{uniforms:en([Me.common,Me.envmap,Me.aomap,Me.lightmap,Me.emissivemap,Me.bumpmap,Me.normalmap,Me.displacementmap,Me.roughnessmap,Me.metalnessmap,Me.fog,Me.lights,{emissive:{value:new pt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:rt.meshphysical_vert,fragmentShader:rt.meshphysical_frag},toon:{uniforms:en([Me.common,Me.aomap,Me.lightmap,Me.emissivemap,Me.bumpmap,Me.normalmap,Me.displacementmap,Me.gradientmap,Me.fog,Me.lights,{emissive:{value:new pt(0)}}]),vertexShader:rt.meshtoon_vert,fragmentShader:rt.meshtoon_frag},matcap:{uniforms:en([Me.common,Me.bumpmap,Me.normalmap,Me.displacementmap,Me.fog,{matcap:{value:null}}]),vertexShader:rt.meshmatcap_vert,fragmentShader:rt.meshmatcap_frag},points:{uniforms:en([Me.points,Me.fog]),vertexShader:rt.points_vert,fragmentShader:rt.points_frag},dashed:{uniforms:en([Me.common,Me.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:rt.linedashed_vert,fragmentShader:rt.linedashed_frag},depth:{uniforms:en([Me.common,Me.displacementmap]),vertexShader:rt.depth_vert,fragmentShader:rt.depth_frag},normal:{uniforms:en([Me.common,Me.bumpmap,Me.normalmap,Me.displacementmap,{opacity:{value:1}}]),vertexShader:rt.meshnormal_vert,fragmentShader:rt.meshnormal_frag},sprite:{uniforms:en([Me.sprite,Me.fog]),vertexShader:rt.sprite_vert,fragmentShader:rt.sprite_frag},background:{uniforms:{uvTransform:{value:new et},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:rt.background_vert,fragmentShader:rt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new et}},vertexShader:rt.backgroundCube_vert,fragmentShader:rt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:rt.cube_vert,fragmentShader:rt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:rt.equirect_vert,fragmentShader:rt.equirect_frag},distance:{uniforms:en([Me.common,Me.displacementmap,{referencePosition:{value:new G},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:rt.distance_vert,fragmentShader:rt.distance_frag},shadow:{uniforms:en([Me.lights,Me.fog,{color:{value:new pt(0)},opacity:{value:1}}]),vertexShader:rt.shadow_vert,fragmentShader:rt.shadow_frag}};Rn.physical={uniforms:en([Rn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new et},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new et},clearcoatNormalScale:{value:new ct(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new et},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new et},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new et},sheen:{value:0},sheenColor:{value:new pt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new et},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new et},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new et},transmissionSamplerSize:{value:new ct},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new et},attenuationDistance:{value:0},attenuationColor:{value:new pt(0)},specularColor:{value:new pt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new et},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new et},anisotropyVector:{value:new ct},anisotropyMap:{value:null},anisotropyMapTransform:{value:new et}}]),vertexShader:rt.meshphysical_vert,fragmentShader:rt.meshphysical_frag};const ss={r:0,b:0,g:0},mi=new Fn,cp=new It;function hp(i,e,t,n,r,s){const o=new pt(0);let a=r===!0?0:1,l,c,u=null,d=0,f=null;function v(b){let C=b.isScene===!0?b.background:null;if(C&&C.isTexture){const A=b.backgroundBlurriness>0;C=e.get(C,A)}return C}function x(b){let C=!1;const A=v(b);A===null?_(o,a):A&&A.isColor&&(_(A,1),C=!0);const D=i.xr.getEnvironmentBlendMode();D==="additive"?t.buffers.color.setClear(0,0,0,1,s):D==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,s),(i.autoClear||C)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function y(b,C){const A=v(C);A&&(A.isCubeTexture||A.mapping===Ps)?(c===void 0&&(c=new ot(new Ot(1,1,1),new Bn({name:"BackgroundCubeMaterial",uniforms:Qi(Rn.backgroundCube.uniforms),vertexShader:Rn.backgroundCube.vertexShader,fragmentShader:Rn.backgroundCube.fragmentShader,side:rn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(D,P,U){this.matrixWorld.copyPosition(U.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(c)),mi.copy(C.backgroundRotation),mi.x*=-1,mi.y*=-1,mi.z*=-1,A.isCubeTexture&&A.isRenderTargetTexture===!1&&(mi.y*=-1,mi.z*=-1),c.material.uniforms.envMap.value=A,c.material.uniforms.flipEnvMap.value=A.isCubeTexture&&A.isRenderTargetTexture===!1?-1:1,c.material.uniforms.backgroundBlurriness.value=C.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=C.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(cp.makeRotationFromEuler(mi)),c.material.toneMapped=vt.getTransfer(A.colorSpace)!==yt,(u!==A||d!==A.version||f!==i.toneMapping)&&(c.material.needsUpdate=!0,u=A,d=A.version,f=i.toneMapping),c.layers.enableAll(),b.unshift(c,c.geometry,c.material,0,0,null)):A&&A.isTexture&&(l===void 0&&(l=new ot(new Lr(2,2),new Bn({name:"BackgroundMaterial",uniforms:Qi(Rn.background.uniforms),vertexShader:Rn.background.vertexShader,fragmentShader:Rn.background.fragmentShader,side:li,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(l)),l.material.uniforms.t2D.value=A,l.material.uniforms.backgroundIntensity.value=C.backgroundIntensity,l.material.toneMapped=vt.getTransfer(A.colorSpace)!==yt,A.matrixAutoUpdate===!0&&A.updateMatrix(),l.material.uniforms.uvTransform.value.copy(A.matrix),(u!==A||d!==A.version||f!==i.toneMapping)&&(l.material.needsUpdate=!0,u=A,d=A.version,f=i.toneMapping),l.layers.enableAll(),b.unshift(l,l.geometry,l.material,0,0,null))}function _(b,C){b.getRGB(ss,kc(i)),t.buffers.color.setClear(ss.r,ss.g,ss.b,C,s)}function p(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return o},setClearColor:function(b,C=1){o.set(b),a=C,_(o,a)},getClearAlpha:function(){return a},setClearAlpha:function(b){a=b,_(o,a)},render:x,addToRenderList:y,dispose:p}}function up(i,e){const t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},r=f(null);let s=r,o=!1;function a(I,W,$,q,X){let Y=!1;const H=d(I,q,$,W);s!==H&&(s=H,c(s.object)),Y=v(I,q,$,X),Y&&x(I,q,$,X),X!==null&&e.update(X,i.ELEMENT_ARRAY_BUFFER),(Y||o)&&(o=!1,A(I,W,$,q),X!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(X).buffer))}function l(){return i.createVertexArray()}function c(I){return i.bindVertexArray(I)}function u(I){return i.deleteVertexArray(I)}function d(I,W,$,q){const X=q.wireframe===!0;let Y=n[W.id];Y===void 0&&(Y={},n[W.id]=Y);const H=I.isInstancedMesh===!0?I.id:0;let oe=Y[H];oe===void 0&&(oe={},Y[H]=oe);let ne=oe[$.id];ne===void 0&&(ne={},oe[$.id]=ne);let Se=ne[X];return Se===void 0&&(Se=f(l()),ne[X]=Se),Se}function f(I){const W=[],$=[],q=[];for(let X=0;X<t;X++)W[X]=0,$[X]=0,q[X]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:W,enabledAttributes:$,attributeDivisors:q,object:I,attributes:{},index:null}}function v(I,W,$,q){const X=s.attributes,Y=W.attributes;let H=0;const oe=$.getAttributes();for(const ne in oe)if(oe[ne].location>=0){const Te=X[ne];let be=Y[ne];if(be===void 0&&(ne==="instanceMatrix"&&I.instanceMatrix&&(be=I.instanceMatrix),ne==="instanceColor"&&I.instanceColor&&(be=I.instanceColor)),Te===void 0||Te.attribute!==be||be&&Te.data!==be.data)return!0;H++}return s.attributesNum!==H||s.index!==q}function x(I,W,$,q){const X={},Y=W.attributes;let H=0;const oe=$.getAttributes();for(const ne in oe)if(oe[ne].location>=0){let Te=Y[ne];Te===void 0&&(ne==="instanceMatrix"&&I.instanceMatrix&&(Te=I.instanceMatrix),ne==="instanceColor"&&I.instanceColor&&(Te=I.instanceColor));const be={};be.attribute=Te,Te&&Te.data&&(be.data=Te.data),X[ne]=be,H++}s.attributes=X,s.attributesNum=H,s.index=q}function y(){const I=s.newAttributes;for(let W=0,$=I.length;W<$;W++)I[W]=0}function _(I){p(I,0)}function p(I,W){const $=s.newAttributes,q=s.enabledAttributes,X=s.attributeDivisors;$[I]=1,q[I]===0&&(i.enableVertexAttribArray(I),q[I]=1),X[I]!==W&&(i.vertexAttribDivisor(I,W),X[I]=W)}function b(){const I=s.newAttributes,W=s.enabledAttributes;for(let $=0,q=W.length;$<q;$++)W[$]!==I[$]&&(i.disableVertexAttribArray($),W[$]=0)}function C(I,W,$,q,X,Y,H){H===!0?i.vertexAttribIPointer(I,W,$,X,Y):i.vertexAttribPointer(I,W,$,q,X,Y)}function A(I,W,$,q){y();const X=q.attributes,Y=$.getAttributes(),H=W.defaultAttributeValues;for(const oe in Y){const ne=Y[oe];if(ne.location>=0){let Se=X[oe];if(Se===void 0&&(oe==="instanceMatrix"&&I.instanceMatrix&&(Se=I.instanceMatrix),oe==="instanceColor"&&I.instanceColor&&(Se=I.instanceColor)),Se!==void 0){const Te=Se.normalized,be=Se.itemSize,je=e.get(Se);if(je===void 0)continue;const Rt=je.buffer,bt=je.type,Q=je.bytesPerElement,de=bt===i.INT||bt===i.UNSIGNED_INT||Se.gpuType===Ca;if(Se.isInterleavedBufferAttribute){const pe=Se.data,qe=pe.stride,ke=Se.offset;if(pe.isInstancedInterleavedBuffer){for(let Ve=0;Ve<ne.locationSize;Ve++)p(ne.location+Ve,pe.meshPerAttribute);I.isInstancedMesh!==!0&&q._maxInstanceCount===void 0&&(q._maxInstanceCount=pe.meshPerAttribute*pe.count)}else for(let Ve=0;Ve<ne.locationSize;Ve++)_(ne.location+Ve);i.bindBuffer(i.ARRAY_BUFFER,Rt);for(let Ve=0;Ve<ne.locationSize;Ve++)C(ne.location+Ve,be/ne.locationSize,bt,Te,qe*Q,(ke+be/ne.locationSize*Ve)*Q,de)}else{if(Se.isInstancedBufferAttribute){for(let pe=0;pe<ne.locationSize;pe++)p(ne.location+pe,Se.meshPerAttribute);I.isInstancedMesh!==!0&&q._maxInstanceCount===void 0&&(q._maxInstanceCount=Se.meshPerAttribute*Se.count)}else for(let pe=0;pe<ne.locationSize;pe++)_(ne.location+pe);i.bindBuffer(i.ARRAY_BUFFER,Rt);for(let pe=0;pe<ne.locationSize;pe++)C(ne.location+pe,be/ne.locationSize,bt,Te,be*Q,be/ne.locationSize*pe*Q,de)}}else if(H!==void 0){const Te=H[oe];if(Te!==void 0)switch(Te.length){case 2:i.vertexAttrib2fv(ne.location,Te);break;case 3:i.vertexAttrib3fv(ne.location,Te);break;case 4:i.vertexAttrib4fv(ne.location,Te);break;default:i.vertexAttrib1fv(ne.location,Te)}}}}b()}function D(){w();for(const I in n){const W=n[I];for(const $ in W){const q=W[$];for(const X in q){const Y=q[X];for(const H in Y)u(Y[H].object),delete Y[H];delete q[X]}}delete n[I]}}function P(I){if(n[I.id]===void 0)return;const W=n[I.id];for(const $ in W){const q=W[$];for(const X in q){const Y=q[X];for(const H in Y)u(Y[H].object),delete Y[H];delete q[X]}}delete n[I.id]}function U(I){for(const W in n){const $=n[W];for(const q in $){const X=$[q];if(X[I.id]===void 0)continue;const Y=X[I.id];for(const H in Y)u(Y[H].object),delete Y[H];delete X[I.id]}}}function E(I){for(const W in n){const $=n[W],q=I.isInstancedMesh===!0?I.id:0,X=$[q];if(X!==void 0){for(const Y in X){const H=X[Y];for(const oe in H)u(H[oe].object),delete H[oe];delete X[Y]}delete $[q],Object.keys($).length===0&&delete n[W]}}}function w(){Z(),o=!0,s!==r&&(s=r,c(s.object))}function Z(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:a,reset:w,resetDefaultState:Z,dispose:D,releaseStatesOfGeometry:P,releaseStatesOfObject:E,releaseStatesOfProgram:U,initAttributes:y,enableAttribute:_,disableUnusedAttributes:b}}function fp(i,e,t){let n;function r(c){n=c}function s(c,u){i.drawArrays(n,c,u),t.update(u,n,1)}function o(c,u,d){d!==0&&(i.drawArraysInstanced(n,c,u,d),t.update(u,n,d))}function a(c,u,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,u,0,d);let v=0;for(let x=0;x<d;x++)v+=u[x];t.update(v,n,1)}function l(c,u,d,f){if(d===0)return;const v=e.get("WEBGL_multi_draw");if(v===null)for(let x=0;x<c.length;x++)o(c[x],u[x],f[x]);else{v.multiDrawArraysInstancedWEBGL(n,c,0,u,0,f,0,d);let x=0;for(let y=0;y<d;y++)x+=u[y]*f[y];t.update(x,n,1)}}this.setMode=r,this.render=s,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function dp(i,e,t,n){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){const U=e.get("EXT_texture_filter_anisotropic");r=i.getParameter(U.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function o(U){return!(U!==yn&&n.convert(U)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(U){const E=U===qn&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(U!==hn&&n.convert(U)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&U!==Pn&&!E)}function l(U){if(U==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";U="mediump"}return U==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const u=l(c);u!==c&&(Ye("WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);const d=t.logarithmicDepthBuffer===!0,f=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),v=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),x=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),y=i.getParameter(i.MAX_TEXTURE_SIZE),_=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),b=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),C=i.getParameter(i.MAX_VARYING_VECTORS),A=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),D=i.getParameter(i.MAX_SAMPLES),P=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:d,reversedDepthBuffer:f,maxTextures:v,maxVertexTextures:x,maxTextureSize:y,maxCubemapSize:_,maxAttributes:p,maxVertexUniforms:b,maxVaryings:C,maxFragmentUniforms:A,maxSamples:D,samples:P}}function pp(i){const e=this;let t=null,n=0,r=!1,s=!1;const o=new xi,a=new et,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,f){const v=d.length!==0||f||n!==0||r;return r=f,n=d.length,v},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(d,f){t=u(d,f,0)},this.setState=function(d,f,v){const x=d.clippingPlanes,y=d.clipIntersection,_=d.clipShadows,p=i.get(d);if(!r||x===null||x.length===0||s&&!_)s?u(null):c();else{const b=s?0:n,C=b*4;let A=p.clippingState||null;l.value=A,A=u(x,f,C,v);for(let D=0;D!==C;++D)A[D]=t[D];p.clippingState=A,this.numIntersection=y?this.numPlanes:0,this.numPlanes+=b}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function u(d,f,v,x){const y=d!==null?d.length:0;let _=null;if(y!==0){if(_=l.value,x!==!0||_===null){const p=v+y*4,b=f.matrixWorldInverse;a.getNormalMatrix(b),(_===null||_.length<p)&&(_=new Float32Array(p));for(let C=0,A=v;C!==y;++C,A+=4)o.copy(d[C]).applyMatrix4(b,a),o.normal.toArray(_,A),_[A+3]=o.constant}l.value=_,l.needsUpdate=!0}return e.numPlanes=y,e.numIntersection=0,_}}const oi=4,Rl=[.125,.215,.35,.446,.526,.582],yi=20,mp=256,pr=new Xa,Cl=new pt;let xo=null,Mo=0,So=0,yo=!1;const gp=new G;class Pl{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,r=100,s={}){const{size:o=256,position:a=gp}=s;xo=this._renderer.getRenderTarget(),Mo=this._renderer.getActiveCubeFace(),So=this._renderer.getActiveMipmapLevel(),yo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,n,r,l,a),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Ll(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Dl(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(xo,Mo,So),this._renderer.xr.enabled=yo,e.scissorTest=!1,Xi(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===wi||e.mapping===Zi?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),xo=this._renderer.getRenderTarget(),Mo=this._renderer.getActiveCubeFace(),So=this._renderer.getActiveMipmapLevel(),yo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Vt,minFilter:Vt,generateMipmaps:!1,type:qn,format:yn,colorSpace:Ji,depthBuffer:!1},r=Il(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Il(e,t,n);const{_lodMax:s}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=_p(s)),this._blurMaterial=xp(s,e,t),this._ggxMaterial=vp(s,e,t)}return r}_compileMaterial(e){const t=new ot(new tn,e);this._renderer.compile(t,pr)}_sceneToCubeUV(e,t,n,r,s){const l=new dn(90,1,t,n),c=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],d=this._renderer,f=d.autoClear,v=d.toneMapping;d.getClearColor(Cl),d.toneMapping=Ln,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(r),d.clearDepth(),d.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new ot(new Ot,new Wn({name:"PMREM.Background",side:rn,depthWrite:!1,depthTest:!1})));const y=this._backgroundBox,_=y.material;let p=!1;const b=e.background;b?b.isColor&&(_.color.copy(b),e.background=null,p=!0):(_.color.copy(Cl),p=!0);for(let C=0;C<6;C++){const A=C%3;A===0?(l.up.set(0,c[C],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x+u[C],s.y,s.z)):A===1?(l.up.set(0,0,c[C]),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y+u[C],s.z)):(l.up.set(0,c[C],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y,s.z+u[C]));const D=this._cubeSize;Xi(r,A*D,C>2?D:0,D,D),d.setRenderTarget(r),p&&d.render(y,l),d.render(e,l)}d.toneMapping=v,d.autoClear=f,e.background=b}_textureToCubeUV(e,t){const n=this._renderer,r=e.mapping===wi||e.mapping===Zi;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Ll()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Dl());const s=r?this._cubemapMaterial:this._equirectMaterial,o=this._lodMeshes[0];o.material=s;const a=s.uniforms;a.envMap.value=e;const l=this._cubeSize;Xi(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(o,pr)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const r=this._lodMeshes.length;for(let s=1;s<r;s++)this._applyGGXFilter(e,s-1,s);t.autoClear=n}_applyGGXFilter(e,t,n){const r=this._renderer,s=this._pingPongRenderTarget,o=this._ggxMaterial,a=this._lodMeshes[n];a.material=o;const l=o.uniforms,c=n/(this._lodMeshes.length-1),u=t/(this._lodMeshes.length-1),d=Math.sqrt(c*c-u*u),f=0+c*1.25,v=d*f,{_lodMax:x}=this,y=this._sizeLods[n],_=3*y*(n>x-oi?n-x+oi:0),p=4*(this._cubeSize-y);l.envMap.value=e.texture,l.roughness.value=v,l.mipInt.value=x-t,Xi(s,_,p,3*y,2*y),r.setRenderTarget(s),r.render(a,pr),l.envMap.value=s.texture,l.roughness.value=0,l.mipInt.value=x-n,Xi(e,_,p,3*y,2*y),r.setRenderTarget(e),r.render(a,pr)}_blur(e,t,n,r,s){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,n,r,"latitudinal",s),this._halfBlur(o,e,n,n,r,"longitudinal",s)}_halfBlur(e,t,n,r,s,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&_t("blur direction must be either latitudinal or longitudinal!");const u=3,d=this._lodMeshes[r];d.material=c;const f=c.uniforms,v=this._sizeLods[n]-1,x=isFinite(s)?Math.PI/(2*v):2*Math.PI/(2*yi-1),y=s/x,_=isFinite(s)?1+Math.floor(u*y):yi;_>yi&&Ye(`sigmaRadians, ${s}, is too large and will clip, as it requested ${_} samples when the maximum is set to ${yi}`);const p=[];let b=0;for(let U=0;U<yi;++U){const E=U/y,w=Math.exp(-E*E/2);p.push(w),U===0?b+=w:U<_&&(b+=2*w)}for(let U=0;U<p.length;U++)p[U]=p[U]/b;f.envMap.value=e.texture,f.samples.value=_,f.weights.value=p,f.latitudinal.value=o==="latitudinal",a&&(f.poleAxis.value=a);const{_lodMax:C}=this;f.dTheta.value=x,f.mipInt.value=C-n;const A=this._sizeLods[r],D=3*A*(r>C-oi?r-C+oi:0),P=4*(this._cubeSize-A);Xi(t,D,P,3*A,2*A),l.setRenderTarget(t),l.render(d,pr)}}function _p(i){const e=[],t=[],n=[];let r=i;const s=i-oi+1+Rl.length;for(let o=0;o<s;o++){const a=Math.pow(2,r);e.push(a);let l=1/a;o>i-oi?l=Rl[o-i+oi-1]:o===0&&(l=0),t.push(l);const c=1/(a-2),u=-c,d=1+c,f=[u,u,d,u,d,d,u,u,d,d,u,d],v=6,x=6,y=3,_=2,p=1,b=new Float32Array(y*x*v),C=new Float32Array(_*x*v),A=new Float32Array(p*x*v);for(let P=0;P<v;P++){const U=P%3*2/3-1,E=P>2?0:-1,w=[U,E,0,U+2/3,E,0,U+2/3,E+1,0,U,E,0,U+2/3,E+1,0,U,E+1,0];b.set(w,y*x*P),C.set(f,_*x*P);const Z=[P,P,P,P,P,P];A.set(Z,p*x*P)}const D=new tn;D.setAttribute("position",new On(b,y)),D.setAttribute("uv",new On(C,_)),D.setAttribute("faceIndex",new On(A,p)),n.push(new ot(D,null)),r>oi&&r--}return{lodMeshes:n,sizeLods:e,sigmas:t}}function Il(i,e,t){const n=new Un(i,e,t);return n.texture.mapping=Ps,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Xi(i,e,t,n,r){i.viewport.set(e,t,n,r),i.scissor.set(e,t,n,r)}function vp(i,e,t){return new Bn({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:mp,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Ds(),fragmentShader:`

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
		`,blending:$n,depthTest:!1,depthWrite:!1})}function xp(i,e,t){const n=new Float32Array(yi),r=new G(0,1,0);return new Bn({name:"SphericalGaussianBlur",defines:{n:yi,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:Ds(),fragmentShader:`

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
		`,blending:$n,depthTest:!1,depthWrite:!1})}function Dl(){return new Bn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Ds(),fragmentShader:`

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
		`,blending:$n,depthTest:!1,depthWrite:!1})}function Ll(){return new Bn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Ds(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:$n,depthTest:!1,depthWrite:!1})}function Ds(){return`

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
	`}class Gc extends Un{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];this.texture=new Fc(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new Ot(5,5,5),s=new Bn({name:"CubemapFromEquirect",uniforms:Qi(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:rn,blending:$n});s.uniforms.tEquirect.value=t;const o=new ot(r,s),a=t.minFilter;return t.minFilter===Ti&&(t.minFilter=Vt),new Tu(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t=!0,n=!0,r=!0){const s=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,r);e.setRenderTarget(s)}}function Mp(i){let e=new WeakMap,t=new WeakMap,n=null;function r(f,v=!1){return f==null?null:v?o(f):s(f)}function s(f){if(f&&f.isTexture){const v=f.mapping;if(v===Vs||v===Ws)if(e.has(f)){const x=e.get(f).texture;return a(x,f.mapping)}else{const x=f.image;if(x&&x.height>0){const y=new Gc(x.height);return y.fromEquirectangularTexture(i,f),e.set(f,y),f.addEventListener("dispose",c),a(y.texture,f.mapping)}else return null}}return f}function o(f){if(f&&f.isTexture){const v=f.mapping,x=v===Vs||v===Ws,y=v===wi||v===Zi;if(x||y){let _=t.get(f);const p=_!==void 0?_.texture.pmremVersion:0;if(f.isRenderTargetTexture&&f.pmremVersion!==p)return n===null&&(n=new Pl(i)),_=x?n.fromEquirectangular(f,_):n.fromCubemap(f,_),_.texture.pmremVersion=f.pmremVersion,t.set(f,_),_.texture;if(_!==void 0)return _.texture;{const b=f.image;return x&&b&&b.height>0||y&&b&&l(b)?(n===null&&(n=new Pl(i)),_=x?n.fromEquirectangular(f):n.fromCubemap(f),_.texture.pmremVersion=f.pmremVersion,t.set(f,_),f.addEventListener("dispose",u),_.texture):null}}}return f}function a(f,v){return v===Vs?f.mapping=wi:v===Ws&&(f.mapping=Zi),f}function l(f){let v=0;const x=6;for(let y=0;y<x;y++)f[y]!==void 0&&v++;return v===x}function c(f){const v=f.target;v.removeEventListener("dispose",c);const x=e.get(v);x!==void 0&&(e.delete(v),x.dispose())}function u(f){const v=f.target;v.removeEventListener("dispose",u);const x=t.get(v);x!==void 0&&(t.delete(v),x.dispose())}function d(){e=new WeakMap,t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:r,dispose:d}}function Sp(i){const e={};function t(n){if(e[n]!==void 0)return e[n];const r=i.getExtension(n);return e[n]=r,r}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const r=t(n);return r===null&&ys("WebGLRenderer: "+n+" extension not supported."),r}}}function yp(i,e,t,n){const r={},s=new WeakMap;function o(d){const f=d.target;f.index!==null&&e.remove(f.index);for(const x in f.attributes)e.remove(f.attributes[x]);f.removeEventListener("dispose",o),delete r[f.id];const v=s.get(f);v&&(e.remove(v),s.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,t.memory.geometries--}function a(d,f){return r[f.id]===!0||(f.addEventListener("dispose",o),r[f.id]=!0,t.memory.geometries++),f}function l(d){const f=d.attributes;for(const v in f)e.update(f[v],i.ARRAY_BUFFER)}function c(d){const f=[],v=d.index,x=d.attributes.position;let y=0;if(x===void 0)return;if(v!==null){const b=v.array;y=v.version;for(let C=0,A=b.length;C<A;C+=3){const D=b[C+0],P=b[C+1],U=b[C+2];f.push(D,P,P,U,U,D)}}else{const b=x.array;y=x.version;for(let C=0,A=b.length/3-1;C<A;C+=3){const D=C+0,P=C+1,U=C+2;f.push(D,P,P,U,U,D)}}const _=new(x.count>=65535?Oc:Uc)(f,1);_.version=y;const p=s.get(d);p&&e.remove(p),s.set(d,_)}function u(d){const f=s.get(d);if(f){const v=d.index;v!==null&&f.version<v.version&&c(d)}else c(d);return s.get(d)}return{get:a,update:l,getWireframeAttribute:u}}function Ep(i,e,t){let n;function r(f){n=f}let s,o;function a(f){s=f.type,o=f.bytesPerElement}function l(f,v){i.drawElements(n,v,s,f*o),t.update(v,n,1)}function c(f,v,x){x!==0&&(i.drawElementsInstanced(n,v,s,f*o,x),t.update(v,n,x))}function u(f,v,x){if(x===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,v,0,s,f,0,x);let _=0;for(let p=0;p<x;p++)_+=v[p];t.update(_,n,1)}function d(f,v,x,y){if(x===0)return;const _=e.get("WEBGL_multi_draw");if(_===null)for(let p=0;p<f.length;p++)c(f[p]/o,v[p],y[p]);else{_.multiDrawElementsInstancedWEBGL(n,v,0,s,f,0,y,0,x);let p=0;for(let b=0;b<x;b++)p+=v[b]*y[b];t.update(p,n,1)}}this.setMode=r,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=u,this.renderMultiDrawInstances=d}function Tp(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,o,a){switch(t.calls++,o){case i.TRIANGLES:t.triangles+=a*(s/3);break;case i.LINES:t.lines+=a*(s/2);break;case i.LINE_STRIP:t.lines+=a*(s-1);break;case i.LINE_LOOP:t.lines+=a*s;break;case i.POINTS:t.points+=a*s;break;default:_t("WebGLInfo: Unknown draw mode:",o);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:n}}function bp(i,e,t){const n=new WeakMap,r=new Nt;function s(o,a,l){const c=o.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,d=u!==void 0?u.length:0;let f=n.get(a);if(f===void 0||f.count!==d){let Z=function(){E.dispose(),n.delete(a),a.removeEventListener("dispose",Z)};var v=Z;f!==void 0&&f.texture.dispose();const x=a.morphAttributes.position!==void 0,y=a.morphAttributes.normal!==void 0,_=a.morphAttributes.color!==void 0,p=a.morphAttributes.position||[],b=a.morphAttributes.normal||[],C=a.morphAttributes.color||[];let A=0;x===!0&&(A=1),y===!0&&(A=2),_===!0&&(A=3);let D=a.attributes.position.count*A,P=1;D>e.maxTextureSize&&(P=Math.ceil(D/e.maxTextureSize),D=e.maxTextureSize);const U=new Float32Array(D*P*4*d),E=new Dc(U,D,P,d);E.type=Pn,E.needsUpdate=!0;const w=A*4;for(let I=0;I<d;I++){const W=p[I],$=b[I],q=C[I],X=D*P*4*I;for(let Y=0;Y<W.count;Y++){const H=Y*w;x===!0&&(r.fromBufferAttribute(W,Y),U[X+H+0]=r.x,U[X+H+1]=r.y,U[X+H+2]=r.z,U[X+H+3]=0),y===!0&&(r.fromBufferAttribute($,Y),U[X+H+4]=r.x,U[X+H+5]=r.y,U[X+H+6]=r.z,U[X+H+7]=0),_===!0&&(r.fromBufferAttribute(q,Y),U[X+H+8]=r.x,U[X+H+9]=r.y,U[X+H+10]=r.z,U[X+H+11]=q.itemSize===4?r.w:1)}}f={count:d,texture:E,size:new ct(D,P)},n.set(a,f),a.addEventListener("dispose",Z)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",o.morphTexture,t);else{let x=0;for(let _=0;_<c.length;_++)x+=c[_];const y=a.morphTargetsRelative?1:1-x;l.getUniforms().setValue(i,"morphTargetBaseInfluence",y),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",f.texture,t),l.getUniforms().setValue(i,"morphTargetsTextureSize",f.size)}return{update:s}}function wp(i,e,t,n,r){let s=new WeakMap;function o(c){const u=r.render.frame,d=c.geometry,f=e.get(c,d);if(s.get(f)!==u&&(e.update(f),s.set(f,u)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),s.get(c)!==u&&(t.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,i.ARRAY_BUFFER),s.set(c,u))),c.isSkinnedMesh){const v=c.skeleton;s.get(v)!==u&&(v.update(),s.set(v,u))}return f}function a(){s=new WeakMap}function l(c){const u=c.target;u.removeEventListener("dispose",l),n.releaseStatesOfObject(u),t.remove(u.instanceMatrix),u.instanceColor!==null&&t.remove(u.instanceColor)}return{update:o,dispose:a}}const Ap={[gc]:"LINEAR_TONE_MAPPING",[_c]:"REINHARD_TONE_MAPPING",[vc]:"CINEON_TONE_MAPPING",[Ra]:"ACES_FILMIC_TONE_MAPPING",[Mc]:"AGX_TONE_MAPPING",[Sc]:"NEUTRAL_TONE_MAPPING",[xc]:"CUSTOM_TONE_MAPPING"};function Rp(i,e,t,n,r){const s=new Un(e,t,{type:i,depthBuffer:n,stencilBuffer:r}),o=new Un(e,t,{type:qn,depthBuffer:!1,stencilBuffer:!1}),a=new tn;a.setAttribute("position",new Ft([-1,3,0,-1,-1,0,3,-1,0],3)),a.setAttribute("uv",new Ft([0,2,0,0,2,0],2));const l=new gu({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),c=new ot(a,l),u=new Xa(-1,1,1,-1,0,1);let d=null,f=null,v=!1,x,y=null,_=[],p=!1;this.setSize=function(b,C){s.setSize(b,C),o.setSize(b,C);for(let A=0;A<_.length;A++){const D=_[A];D.setSize&&D.setSize(b,C)}},this.setEffects=function(b){_=b,p=_.length>0&&_[0].isRenderPass===!0;const C=s.width,A=s.height;for(let D=0;D<_.length;D++){const P=_[D];P.setSize&&P.setSize(C,A)}},this.begin=function(b,C){if(v||b.toneMapping===Ln&&_.length===0)return!1;if(y=C,C!==null){const A=C.width,D=C.height;(s.width!==A||s.height!==D)&&this.setSize(A,D)}return p===!1&&b.setRenderTarget(s),x=b.toneMapping,b.toneMapping=Ln,!0},this.hasRenderPass=function(){return p},this.end=function(b,C){b.toneMapping=x,v=!0;let A=s,D=o;for(let P=0;P<_.length;P++){const U=_[P];if(U.enabled!==!1&&(U.render(b,D,A,C),U.needsSwap!==!1)){const E=A;A=D,D=E}}if(d!==b.outputColorSpace||f!==b.toneMapping){d=b.outputColorSpace,f=b.toneMapping,l.defines={},vt.getTransfer(d)===yt&&(l.defines.SRGB_TRANSFER="");const P=Ap[f];P&&(l.defines[P]=""),l.needsUpdate=!0}l.uniforms.tDiffuse.value=A.texture,b.setRenderTarget(y),b.render(c,u),y=null,v=!1},this.isCompositing=function(){return v},this.dispose=function(){s.dispose(),o.dispose(),a.dispose(),l.dispose()}}const Vc=new Qt,Sa=new Pr(1,1),Wc=new Dc,Xc=new $h,$c=new Fc,Ul=[],Ol=[],Nl=new Float32Array(16),Fl=new Float32Array(9),Bl=new Float32Array(4);function or(i,e,t){const n=i[0];if(n<=0||n>0)return i;const r=e*t;let s=Ul[r];if(s===void 0&&(s=new Float32Array(r),Ul[r]=s),e!==0){n.toArray(s,0);for(let o=1,a=0;o!==e;++o)a+=t,i[o].toArray(s,a)}return s}function kt(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function zt(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function Ls(i,e){let t=Ol[e];t===void 0&&(t=new Int32Array(e),Ol[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function Cp(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function Pp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(kt(t,e))return;i.uniform2fv(this.addr,e),zt(t,e)}}function Ip(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(kt(t,e))return;i.uniform3fv(this.addr,e),zt(t,e)}}function Dp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(kt(t,e))return;i.uniform4fv(this.addr,e),zt(t,e)}}function Lp(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(kt(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),zt(t,e)}else{if(kt(t,n))return;Bl.set(n),i.uniformMatrix2fv(this.addr,!1,Bl),zt(t,n)}}function Up(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(kt(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),zt(t,e)}else{if(kt(t,n))return;Fl.set(n),i.uniformMatrix3fv(this.addr,!1,Fl),zt(t,n)}}function Op(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(kt(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),zt(t,e)}else{if(kt(t,n))return;Nl.set(n),i.uniformMatrix4fv(this.addr,!1,Nl),zt(t,n)}}function Np(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function Fp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(kt(t,e))return;i.uniform2iv(this.addr,e),zt(t,e)}}function Bp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(kt(t,e))return;i.uniform3iv(this.addr,e),zt(t,e)}}function kp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(kt(t,e))return;i.uniform4iv(this.addr,e),zt(t,e)}}function zp(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function Hp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(kt(t,e))return;i.uniform2uiv(this.addr,e),zt(t,e)}}function Gp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(kt(t,e))return;i.uniform3uiv(this.addr,e),zt(t,e)}}function Vp(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(kt(t,e))return;i.uniform4uiv(this.addr,e),zt(t,e)}}function Wp(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r);let s;this.type===i.SAMPLER_2D_SHADOW?(Sa.compareFunction=t.isReversedDepthBuffer()?Na:Oa,s=Sa):s=Vc,t.setTexture2D(e||s,r)}function Xp(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture3D(e||Xc,r)}function $p(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTextureCube(e||$c,r)}function Yp(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture2DArray(e||Wc,r)}function qp(i){switch(i){case 5126:return Cp;case 35664:return Pp;case 35665:return Ip;case 35666:return Dp;case 35674:return Lp;case 35675:return Up;case 35676:return Op;case 5124:case 35670:return Np;case 35667:case 35671:return Fp;case 35668:case 35672:return Bp;case 35669:case 35673:return kp;case 5125:return zp;case 36294:return Hp;case 36295:return Gp;case 36296:return Vp;case 35678:case 36198:case 36298:case 36306:case 35682:return Wp;case 35679:case 36299:case 36307:return Xp;case 35680:case 36300:case 36308:case 36293:return $p;case 36289:case 36303:case 36311:case 36292:return Yp}}function jp(i,e){i.uniform1fv(this.addr,e)}function Zp(i,e){const t=or(e,this.size,2);i.uniform2fv(this.addr,t)}function Kp(i,e){const t=or(e,this.size,3);i.uniform3fv(this.addr,t)}function Jp(i,e){const t=or(e,this.size,4);i.uniform4fv(this.addr,t)}function Qp(i,e){const t=or(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function em(i,e){const t=or(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function tm(i,e){const t=or(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function nm(i,e){i.uniform1iv(this.addr,e)}function im(i,e){i.uniform2iv(this.addr,e)}function rm(i,e){i.uniform3iv(this.addr,e)}function sm(i,e){i.uniform4iv(this.addr,e)}function om(i,e){i.uniform1uiv(this.addr,e)}function am(i,e){i.uniform2uiv(this.addr,e)}function lm(i,e){i.uniform3uiv(this.addr,e)}function cm(i,e){i.uniform4uiv(this.addr,e)}function hm(i,e,t){const n=this.cache,r=e.length,s=Ls(t,r);kt(n,s)||(i.uniform1iv(this.addr,s),zt(n,s));let o;this.type===i.SAMPLER_2D_SHADOW?o=Sa:o=Vc;for(let a=0;a!==r;++a)t.setTexture2D(e[a]||o,s[a])}function um(i,e,t){const n=this.cache,r=e.length,s=Ls(t,r);kt(n,s)||(i.uniform1iv(this.addr,s),zt(n,s));for(let o=0;o!==r;++o)t.setTexture3D(e[o]||Xc,s[o])}function fm(i,e,t){const n=this.cache,r=e.length,s=Ls(t,r);kt(n,s)||(i.uniform1iv(this.addr,s),zt(n,s));for(let o=0;o!==r;++o)t.setTextureCube(e[o]||$c,s[o])}function dm(i,e,t){const n=this.cache,r=e.length,s=Ls(t,r);kt(n,s)||(i.uniform1iv(this.addr,s),zt(n,s));for(let o=0;o!==r;++o)t.setTexture2DArray(e[o]||Wc,s[o])}function pm(i){switch(i){case 5126:return jp;case 35664:return Zp;case 35665:return Kp;case 35666:return Jp;case 35674:return Qp;case 35675:return em;case 35676:return tm;case 5124:case 35670:return nm;case 35667:case 35671:return im;case 35668:case 35672:return rm;case 35669:case 35673:return sm;case 5125:return om;case 36294:return am;case 36295:return lm;case 36296:return cm;case 35678:case 36198:case 36298:case 36306:case 35682:return hm;case 35679:case 36299:case 36307:return um;case 35680:case 36300:case 36308:case 36293:return fm;case 36289:case 36303:case 36311:case 36292:return dm}}class mm{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=qp(t.type)}}class gm{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=pm(t.type)}}class _m{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const r=this.seq;for(let s=0,o=r.length;s!==o;++s){const a=r[s];a.setValue(e,t[a.id],n)}}}const Eo=/(\w+)(\])?(\[|\.)?/g;function kl(i,e){i.seq.push(e),i.map[e.id]=e}function vm(i,e,t){const n=i.name,r=n.length;for(Eo.lastIndex=0;;){const s=Eo.exec(n),o=Eo.lastIndex;let a=s[1];const l=s[2]==="]",c=s[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===r){kl(t,c===void 0?new mm(a,i,e):new gm(a,i,e));break}else{let d=t.map[a];d===void 0&&(d=new _m(a),kl(t,d)),t=d}}}class ms{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let o=0;o<n;++o){const a=e.getActiveUniform(t,o),l=e.getUniformLocation(t,a.name);vm(a,l,this)}const r=[],s=[];for(const o of this.seq)o.type===e.SAMPLER_2D_SHADOW||o.type===e.SAMPLER_CUBE_SHADOW||o.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(o):s.push(o);r.length>0&&(this.seq=r.concat(s))}setValue(e,t,n,r){const s=this.map[t];s!==void 0&&s.setValue(e,n,r)}setOptional(e,t,n){const r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let s=0,o=t.length;s!==o;++s){const a=t[s],l=n[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,r)}}static seqWithValue(e,t){const n=[];for(let r=0,s=e.length;r!==s;++r){const o=e[r];o.id in t&&n.push(o)}return n}}function zl(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const xm=37297;let Mm=0;function Sm(i,e){const t=i.split(`
`),n=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let o=r;o<s;o++){const a=o+1;n.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return n.join(`
`)}const Hl=new et;function ym(i){vt._getMatrix(Hl,vt.workingColorSpace,i);const e=`mat3( ${Hl.elements.map(t=>t.toFixed(4))} )`;switch(vt.getTransfer(i)){case Ms:return[e,"LinearTransferOETF"];case yt:return[e,"sRGBTransferOETF"];default:return Ye("WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function Gl(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),s=(i.getShaderInfoLog(e)||"").trim();if(n&&s==="")return"";const o=/ERROR: 0:(\d+)/.exec(s);if(o){const a=parseInt(o[1]);return t.toUpperCase()+`

`+s+`

`+Sm(i.getShaderSource(e),a)}else return s}function Em(i,e){const t=ym(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}const Tm={[gc]:"Linear",[_c]:"Reinhard",[vc]:"Cineon",[Ra]:"ACESFilmic",[Mc]:"AgX",[Sc]:"Neutral",[xc]:"Custom"};function bm(i,e){const t=Tm[e];return t===void 0?(Ye("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const os=new G;function wm(){vt.getLuminanceCoefficients(os);const i=os.x.toFixed(4),e=os.y.toFixed(4),t=os.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Am(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Tr).join(`
`)}function Rm(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function Cm(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let r=0;r<n;r++){const s=i.getActiveAttrib(e,r),o=s.name;let a=1;s.type===i.FLOAT_MAT2&&(a=2),s.type===i.FLOAT_MAT3&&(a=3),s.type===i.FLOAT_MAT4&&(a=4),t[o]={type:s.type,location:i.getAttribLocation(e,o),locationSize:a}}return t}function Tr(i){return i!==""}function Vl(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Wl(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const Pm=/^[ \t]*#include +<([\w\d./]+)>/gm;function ya(i){return i.replace(Pm,Dm)}const Im=new Map;function Dm(i,e){let t=rt[e];if(t===void 0){const n=Im.get(e);if(n!==void 0)t=rt[n],Ye('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return ya(t)}const Lm=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Xl(i){return i.replace(Lm,Um)}function Um(i,e,t,n){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function $l(i){let e=`precision ${i.precision} float;
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
#define LOW_PRECISION`),e}const Om={[br]:"SHADOWMAP_TYPE_PCF",[Er]:"SHADOWMAP_TYPE_VSM"};function Nm(i){return Om[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const Fm={[wi]:"ENVMAP_TYPE_CUBE",[Zi]:"ENVMAP_TYPE_CUBE",[Ps]:"ENVMAP_TYPE_CUBE_UV"};function Bm(i){return i.envMap===!1?"ENVMAP_TYPE_CUBE":Fm[i.envMapMode]||"ENVMAP_TYPE_CUBE"}const km={[Zi]:"ENVMAP_MODE_REFRACTION"};function zm(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":km[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}const Hm={[mc]:"ENVMAP_BLENDING_MULTIPLY",[bh]:"ENVMAP_BLENDING_MIX",[wh]:"ENVMAP_BLENDING_ADD"};function Gm(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":Hm[i.combine]||"ENVMAP_BLENDING_NONE"}function Vm(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:n,maxMip:t}}function Wm(i,e,t,n){const r=i.getContext(),s=t.defines;let o=t.vertexShader,a=t.fragmentShader;const l=Nm(t),c=Bm(t),u=zm(t),d=Gm(t),f=Vm(t),v=Am(t),x=Rm(s),y=r.createProgram();let _,p,b=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(_=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x].filter(Tr).join(`
`),_.length>0&&(_+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x].filter(Tr).join(`
`),p.length>0&&(p+=`
`)):(_=[$l(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Tr).join(`
`),p=[$l(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,x,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+d:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Ln?"#define TONE_MAPPING":"",t.toneMapping!==Ln?rt.tonemapping_pars_fragment:"",t.toneMapping!==Ln?bm("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",rt.colorspace_pars_fragment,Em("linearToOutputTexel",t.outputColorSpace),wm(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Tr).join(`
`)),o=ya(o),o=Vl(o,t),o=Wl(o,t),a=ya(a),a=Vl(a,t),a=Wl(a,t),o=Xl(o),a=Xl(a),t.isRawShaderMaterial!==!0&&(b=`#version 300 es
`,_=[v,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+_,p=["#define varying in",t.glslVersion===nl?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===nl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const C=b+_+o,A=b+p+a,D=zl(r,r.VERTEX_SHADER,C),P=zl(r,r.FRAGMENT_SHADER,A);r.attachShader(y,D),r.attachShader(y,P),t.index0AttributeName!==void 0?r.bindAttribLocation(y,0,t.index0AttributeName):t.morphTargets===!0&&r.bindAttribLocation(y,0,"position"),r.linkProgram(y);function U(I){if(i.debug.checkShaderErrors){const W=r.getProgramInfoLog(y)||"",$=r.getShaderInfoLog(D)||"",q=r.getShaderInfoLog(P)||"",X=W.trim(),Y=$.trim(),H=q.trim();let oe=!0,ne=!0;if(r.getProgramParameter(y,r.LINK_STATUS)===!1)if(oe=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(r,y,D,P);else{const Se=Gl(r,D,"vertex"),Te=Gl(r,P,"fragment");_t("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(y,r.VALIDATE_STATUS)+`

Material Name: `+I.name+`
Material Type: `+I.type+`

Program Info Log: `+X+`
`+Se+`
`+Te)}else X!==""?Ye("WebGLProgram: Program Info Log:",X):(Y===""||H==="")&&(ne=!1);ne&&(I.diagnostics={runnable:oe,programLog:X,vertexShader:{log:Y,prefix:_},fragmentShader:{log:H,prefix:p}})}r.deleteShader(D),r.deleteShader(P),E=new ms(r,y),w=Cm(r,y)}let E;this.getUniforms=function(){return E===void 0&&U(this),E};let w;this.getAttributes=function(){return w===void 0&&U(this),w};let Z=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return Z===!1&&(Z=r.getProgramParameter(y,xm)),Z},this.destroy=function(){n.releaseStatesOfProgram(this),r.deleteProgram(y),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Mm++,this.cacheKey=e,this.usedTimes=1,this.program=y,this.vertexShader=D,this.fragmentShader=P,this}let Xm=0;class $m{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,r=this._getShaderStage(t),s=this._getShaderStage(n),o=this._getShaderCacheForMaterial(e);return o.has(r)===!1&&(o.add(r),r.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new Ym(e),t.set(e,n)),n}}class Ym{constructor(e){this.id=Xm++,this.code=e,this.usedTimes=0}}function qm(i,e,t,n,r,s){const o=new Ba,a=new $m,l=new Set,c=[],u=new Map,d=n.logarithmicDepthBuffer;let f=n.precision;const v={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function x(E){return l.add(E),E===0?"uv":`uv${E}`}function y(E,w,Z,I,W){const $=I.fog,q=W.geometry,X=E.isMeshStandardMaterial||E.isMeshLambertMaterial||E.isMeshPhongMaterial?I.environment:null,Y=E.isMeshStandardMaterial||E.isMeshLambertMaterial&&!E.envMap||E.isMeshPhongMaterial&&!E.envMap,H=e.get(E.envMap||X,Y),oe=H&&H.mapping===Ps?H.image.height:null,ne=v[E.type];E.precision!==null&&(f=n.getMaxPrecision(E.precision),f!==E.precision&&Ye("WebGLProgram.getParameters:",E.precision,"not supported, using",f,"instead."));const Se=q.morphAttributes.position||q.morphAttributes.normal||q.morphAttributes.color,Te=Se!==void 0?Se.length:0;let be=0;q.morphAttributes.position!==void 0&&(be=1),q.morphAttributes.normal!==void 0&&(be=2),q.morphAttributes.color!==void 0&&(be=3);let je,Rt,bt,Q;if(ne){const Qe=Rn[ne];je=Qe.vertexShader,Rt=Qe.fragmentShader}else je=E.vertexShader,Rt=E.fragmentShader,a.update(E),bt=a.getVertexShaderID(E),Q=a.getFragmentShaderID(E);const de=i.getRenderTarget(),pe=i.state.buffers.depth.getReversed(),qe=W.isInstancedMesh===!0,ke=W.isBatchedMesh===!0,Ve=!!E.map,Dt=!!E.matcap,Ge=!!H,mt=!!E.aoMap,St=!!E.lightMap,Ke=!!E.bumpMap,wt=!!E.normalMap,L=!!E.displacementMap,Pt=!!E.emissiveMap,at=!!E.metalnessMap,gt=!!E.roughnessMap,De=E.anisotropy>0,R=E.clearcoat>0,M=E.dispersion>0,k=E.iridescence>0,J=E.sheen>0,te=E.transmission>0,K=De&&!!E.anisotropyMap,Ae=R&&!!E.clearcoatMap,he=R&&!!E.clearcoatNormalMap,Be=R&&!!E.clearcoatRoughnessMap,ze=k&&!!E.iridescenceMap,re=k&&!!E.iridescenceThicknessMap,se=J&&!!E.sheenColorMap,Pe=J&&!!E.sheenRoughnessMap,Ie=!!E.specularMap,Ee=!!E.specularColorMap,Je=!!E.specularIntensityMap,O=te&&!!E.transmissionMap,ue=te&&!!E.thicknessMap,le=!!E.gradientMap,we=!!E.alphaMap,ie=E.alphaTest>0,j=!!E.alphaHash,Re=!!E.extensions;let Xe=Ln;E.toneMapped&&(de===null||de.isXRRenderTarget===!0)&&(Xe=i.toneMapping);const Et={shaderID:ne,shaderType:E.type,shaderName:E.name,vertexShader:je,fragmentShader:Rt,defines:E.defines,customVertexShaderID:bt,customFragmentShaderID:Q,isRawShaderMaterial:E.isRawShaderMaterial===!0,glslVersion:E.glslVersion,precision:f,batching:ke,batchingColor:ke&&W._colorsTexture!==null,instancing:qe,instancingColor:qe&&W.instanceColor!==null,instancingMorph:qe&&W.morphTexture!==null,outputColorSpace:de===null?i.outputColorSpace:de.isXRRenderTarget===!0?de.texture.colorSpace:Ji,alphaToCoverage:!!E.alphaToCoverage,map:Ve,matcap:Dt,envMap:Ge,envMapMode:Ge&&H.mapping,envMapCubeUVHeight:oe,aoMap:mt,lightMap:St,bumpMap:Ke,normalMap:wt,displacementMap:L,emissiveMap:Pt,normalMapObjectSpace:wt&&E.normalMapType===Ch,normalMapTangentSpace:wt&&E.normalMapType===Pc,metalnessMap:at,roughnessMap:gt,anisotropy:De,anisotropyMap:K,clearcoat:R,clearcoatMap:Ae,clearcoatNormalMap:he,clearcoatRoughnessMap:Be,dispersion:M,iridescence:k,iridescenceMap:ze,iridescenceThicknessMap:re,sheen:J,sheenColorMap:se,sheenRoughnessMap:Pe,specularMap:Ie,specularColorMap:Ee,specularIntensityMap:Je,transmission:te,transmissionMap:O,thicknessMap:ue,gradientMap:le,opaque:E.transparent===!1&&E.blending===qi&&E.alphaToCoverage===!1,alphaMap:we,alphaTest:ie,alphaHash:j,combine:E.combine,mapUv:Ve&&x(E.map.channel),aoMapUv:mt&&x(E.aoMap.channel),lightMapUv:St&&x(E.lightMap.channel),bumpMapUv:Ke&&x(E.bumpMap.channel),normalMapUv:wt&&x(E.normalMap.channel),displacementMapUv:L&&x(E.displacementMap.channel),emissiveMapUv:Pt&&x(E.emissiveMap.channel),metalnessMapUv:at&&x(E.metalnessMap.channel),roughnessMapUv:gt&&x(E.roughnessMap.channel),anisotropyMapUv:K&&x(E.anisotropyMap.channel),clearcoatMapUv:Ae&&x(E.clearcoatMap.channel),clearcoatNormalMapUv:he&&x(E.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Be&&x(E.clearcoatRoughnessMap.channel),iridescenceMapUv:ze&&x(E.iridescenceMap.channel),iridescenceThicknessMapUv:re&&x(E.iridescenceThicknessMap.channel),sheenColorMapUv:se&&x(E.sheenColorMap.channel),sheenRoughnessMapUv:Pe&&x(E.sheenRoughnessMap.channel),specularMapUv:Ie&&x(E.specularMap.channel),specularColorMapUv:Ee&&x(E.specularColorMap.channel),specularIntensityMapUv:Je&&x(E.specularIntensityMap.channel),transmissionMapUv:O&&x(E.transmissionMap.channel),thicknessMapUv:ue&&x(E.thicknessMap.channel),alphaMapUv:we&&x(E.alphaMap.channel),vertexTangents:!!q.attributes.tangent&&(wt||De),vertexColors:E.vertexColors,vertexAlphas:E.vertexColors===!0&&!!q.attributes.color&&q.attributes.color.itemSize===4,pointsUvs:W.isPoints===!0&&!!q.attributes.uv&&(Ve||we),fog:!!$,useFog:E.fog===!0,fogExp2:!!$&&$.isFogExp2,flatShading:E.wireframe===!1&&(E.flatShading===!0||q.attributes.normal===void 0&&wt===!1&&(E.isMeshLambertMaterial||E.isMeshPhongMaterial||E.isMeshStandardMaterial||E.isMeshPhysicalMaterial)),sizeAttenuation:E.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:pe,skinning:W.isSkinnedMesh===!0,morphTargets:q.morphAttributes.position!==void 0,morphNormals:q.morphAttributes.normal!==void 0,morphColors:q.morphAttributes.color!==void 0,morphTargetsCount:Te,morphTextureStride:be,numDirLights:w.directional.length,numPointLights:w.point.length,numSpotLights:w.spot.length,numSpotLightMaps:w.spotLightMap.length,numRectAreaLights:w.rectArea.length,numHemiLights:w.hemi.length,numDirLightShadows:w.directionalShadowMap.length,numPointLightShadows:w.pointShadowMap.length,numSpotLightShadows:w.spotShadowMap.length,numSpotLightShadowsWithMaps:w.numSpotLightShadowsWithMaps,numLightProbes:w.numLightProbes,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:E.dithering,shadowMapEnabled:i.shadowMap.enabled&&Z.length>0,shadowMapType:i.shadowMap.type,toneMapping:Xe,decodeVideoTexture:Ve&&E.map.isVideoTexture===!0&&vt.getTransfer(E.map.colorSpace)===yt,decodeVideoTextureEmissive:Pt&&E.emissiveMap.isVideoTexture===!0&&vt.getTransfer(E.emissiveMap.colorSpace)===yt,premultipliedAlpha:E.premultipliedAlpha,doubleSided:E.side===pn,flipSided:E.side===rn,useDepthPacking:E.depthPacking>=0,depthPacking:E.depthPacking||0,index0AttributeName:E.index0AttributeName,extensionClipCullDistance:Re&&E.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Re&&E.extensions.multiDraw===!0||ke)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:E.customProgramCacheKey()};return Et.vertexUv1s=l.has(1),Et.vertexUv2s=l.has(2),Et.vertexUv3s=l.has(3),l.clear(),Et}function _(E){const w=[];if(E.shaderID?w.push(E.shaderID):(w.push(E.customVertexShaderID),w.push(E.customFragmentShaderID)),E.defines!==void 0)for(const Z in E.defines)w.push(Z),w.push(E.defines[Z]);return E.isRawShaderMaterial===!1&&(p(w,E),b(w,E),w.push(i.outputColorSpace)),w.push(E.customProgramCacheKey),w.join()}function p(E,w){E.push(w.precision),E.push(w.outputColorSpace),E.push(w.envMapMode),E.push(w.envMapCubeUVHeight),E.push(w.mapUv),E.push(w.alphaMapUv),E.push(w.lightMapUv),E.push(w.aoMapUv),E.push(w.bumpMapUv),E.push(w.normalMapUv),E.push(w.displacementMapUv),E.push(w.emissiveMapUv),E.push(w.metalnessMapUv),E.push(w.roughnessMapUv),E.push(w.anisotropyMapUv),E.push(w.clearcoatMapUv),E.push(w.clearcoatNormalMapUv),E.push(w.clearcoatRoughnessMapUv),E.push(w.iridescenceMapUv),E.push(w.iridescenceThicknessMapUv),E.push(w.sheenColorMapUv),E.push(w.sheenRoughnessMapUv),E.push(w.specularMapUv),E.push(w.specularColorMapUv),E.push(w.specularIntensityMapUv),E.push(w.transmissionMapUv),E.push(w.thicknessMapUv),E.push(w.combine),E.push(w.fogExp2),E.push(w.sizeAttenuation),E.push(w.morphTargetsCount),E.push(w.morphAttributeCount),E.push(w.numDirLights),E.push(w.numPointLights),E.push(w.numSpotLights),E.push(w.numSpotLightMaps),E.push(w.numHemiLights),E.push(w.numRectAreaLights),E.push(w.numDirLightShadows),E.push(w.numPointLightShadows),E.push(w.numSpotLightShadows),E.push(w.numSpotLightShadowsWithMaps),E.push(w.numLightProbes),E.push(w.shadowMapType),E.push(w.toneMapping),E.push(w.numClippingPlanes),E.push(w.numClipIntersection),E.push(w.depthPacking)}function b(E,w){o.disableAll(),w.instancing&&o.enable(0),w.instancingColor&&o.enable(1),w.instancingMorph&&o.enable(2),w.matcap&&o.enable(3),w.envMap&&o.enable(4),w.normalMapObjectSpace&&o.enable(5),w.normalMapTangentSpace&&o.enable(6),w.clearcoat&&o.enable(7),w.iridescence&&o.enable(8),w.alphaTest&&o.enable(9),w.vertexColors&&o.enable(10),w.vertexAlphas&&o.enable(11),w.vertexUv1s&&o.enable(12),w.vertexUv2s&&o.enable(13),w.vertexUv3s&&o.enable(14),w.vertexTangents&&o.enable(15),w.anisotropy&&o.enable(16),w.alphaHash&&o.enable(17),w.batching&&o.enable(18),w.dispersion&&o.enable(19),w.batchingColor&&o.enable(20),w.gradientMap&&o.enable(21),E.push(o.mask),o.disableAll(),w.fog&&o.enable(0),w.useFog&&o.enable(1),w.flatShading&&o.enable(2),w.logarithmicDepthBuffer&&o.enable(3),w.reversedDepthBuffer&&o.enable(4),w.skinning&&o.enable(5),w.morphTargets&&o.enable(6),w.morphNormals&&o.enable(7),w.morphColors&&o.enable(8),w.premultipliedAlpha&&o.enable(9),w.shadowMapEnabled&&o.enable(10),w.doubleSided&&o.enable(11),w.flipSided&&o.enable(12),w.useDepthPacking&&o.enable(13),w.dithering&&o.enable(14),w.transmission&&o.enable(15),w.sheen&&o.enable(16),w.opaque&&o.enable(17),w.pointsUvs&&o.enable(18),w.decodeVideoTexture&&o.enable(19),w.decodeVideoTextureEmissive&&o.enable(20),w.alphaToCoverage&&o.enable(21),E.push(o.mask)}function C(E){const w=v[E.type];let Z;if(w){const I=Rn[w];Z=du.clone(I.uniforms)}else Z=E.uniforms;return Z}function A(E,w){let Z=u.get(w);return Z!==void 0?++Z.usedTimes:(Z=new Wm(i,w,E,r),c.push(Z),u.set(w,Z)),Z}function D(E){if(--E.usedTimes===0){const w=c.indexOf(E);c[w]=c[c.length-1],c.pop(),u.delete(E.cacheKey),E.destroy()}}function P(E){a.remove(E)}function U(){a.dispose()}return{getParameters:y,getProgramCacheKey:_,getUniforms:C,acquireProgram:A,releaseProgram:D,releaseShaderCache:P,programs:c,dispose:U}}function jm(){let i=new WeakMap;function e(o){return i.has(o)}function t(o){let a=i.get(o);return a===void 0&&(a={},i.set(o,a)),a}function n(o){i.delete(o)}function r(o,a,l){i.get(o)[a]=l}function s(){i=new WeakMap}return{has:e,get:t,remove:n,update:r,dispose:s}}function Zm(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.materialVariant!==e.materialVariant?i.materialVariant-e.materialVariant:i.z!==e.z?i.z-e.z:i.id-e.id}function Yl(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function ql(){const i=[];let e=0;const t=[],n=[],r=[];function s(){e=0,t.length=0,n.length=0,r.length=0}function o(f){let v=0;return f.isInstancedMesh&&(v+=2),f.isSkinnedMesh&&(v+=1),v}function a(f,v,x,y,_,p){let b=i[e];return b===void 0?(b={id:f.id,object:f,geometry:v,material:x,materialVariant:o(f),groupOrder:y,renderOrder:f.renderOrder,z:_,group:p},i[e]=b):(b.id=f.id,b.object=f,b.geometry=v,b.material=x,b.materialVariant=o(f),b.groupOrder=y,b.renderOrder=f.renderOrder,b.z=_,b.group=p),e++,b}function l(f,v,x,y,_,p){const b=a(f,v,x,y,_,p);x.transmission>0?n.push(b):x.transparent===!0?r.push(b):t.push(b)}function c(f,v,x,y,_,p){const b=a(f,v,x,y,_,p);x.transmission>0?n.unshift(b):x.transparent===!0?r.unshift(b):t.unshift(b)}function u(f,v){t.length>1&&t.sort(f||Zm),n.length>1&&n.sort(v||Yl),r.length>1&&r.sort(v||Yl)}function d(){for(let f=e,v=i.length;f<v;f++){const x=i[f];if(x.id===null)break;x.id=null,x.object=null,x.geometry=null,x.material=null,x.group=null}}return{opaque:t,transmissive:n,transparent:r,init:s,push:l,unshift:c,finish:d,sort:u}}function Km(){let i=new WeakMap;function e(n,r){const s=i.get(n);let o;return s===void 0?(o=new ql,i.set(n,[o])):r>=s.length?(o=new ql,s.push(o)):o=s[r],o}function t(){i=new WeakMap}return{get:e,dispose:t}}function Jm(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new G,color:new pt};break;case"SpotLight":t={position:new G,direction:new G,color:new pt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new G,color:new pt,distance:0,decay:0};break;case"HemisphereLight":t={direction:new G,skyColor:new pt,groundColor:new pt};break;case"RectAreaLight":t={color:new pt,position:new G,halfWidth:new G,halfHeight:new G};break}return i[e.id]=t,t}}}function Qm(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ct};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ct};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ct,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let eg=0;function tg(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function ng(i){const e=new Jm,t=Qm(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new G);const r=new G,s=new It,o=new It;function a(c){let u=0,d=0,f=0;for(let w=0;w<9;w++)n.probe[w].set(0,0,0);let v=0,x=0,y=0,_=0,p=0,b=0,C=0,A=0,D=0,P=0,U=0;c.sort(tg);for(let w=0,Z=c.length;w<Z;w++){const I=c[w],W=I.color,$=I.intensity,q=I.distance;let X=null;if(I.shadow&&I.shadow.map&&(I.shadow.map.texture.format===Ki?X=I.shadow.map.texture:X=I.shadow.map.depthTexture||I.shadow.map.texture),I.isAmbientLight)u+=W.r*$,d+=W.g*$,f+=W.b*$;else if(I.isLightProbe){for(let Y=0;Y<9;Y++)n.probe[Y].addScaledVector(I.sh.coefficients[Y],$);U++}else if(I.isDirectionalLight){const Y=e.get(I);if(Y.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){const H=I.shadow,oe=t.get(I);oe.shadowIntensity=H.intensity,oe.shadowBias=H.bias,oe.shadowNormalBias=H.normalBias,oe.shadowRadius=H.radius,oe.shadowMapSize=H.mapSize,n.directionalShadow[v]=oe,n.directionalShadowMap[v]=X,n.directionalShadowMatrix[v]=I.shadow.matrix,b++}n.directional[v]=Y,v++}else if(I.isSpotLight){const Y=e.get(I);Y.position.setFromMatrixPosition(I.matrixWorld),Y.color.copy(W).multiplyScalar($),Y.distance=q,Y.coneCos=Math.cos(I.angle),Y.penumbraCos=Math.cos(I.angle*(1-I.penumbra)),Y.decay=I.decay,n.spot[y]=Y;const H=I.shadow;if(I.map&&(n.spotLightMap[D]=I.map,D++,H.updateMatrices(I),I.castShadow&&P++),n.spotLightMatrix[y]=H.matrix,I.castShadow){const oe=t.get(I);oe.shadowIntensity=H.intensity,oe.shadowBias=H.bias,oe.shadowNormalBias=H.normalBias,oe.shadowRadius=H.radius,oe.shadowMapSize=H.mapSize,n.spotShadow[y]=oe,n.spotShadowMap[y]=X,A++}y++}else if(I.isRectAreaLight){const Y=e.get(I);Y.color.copy(W).multiplyScalar($),Y.halfWidth.set(I.width*.5,0,0),Y.halfHeight.set(0,I.height*.5,0),n.rectArea[_]=Y,_++}else if(I.isPointLight){const Y=e.get(I);if(Y.color.copy(I.color).multiplyScalar(I.intensity),Y.distance=I.distance,Y.decay=I.decay,I.castShadow){const H=I.shadow,oe=t.get(I);oe.shadowIntensity=H.intensity,oe.shadowBias=H.bias,oe.shadowNormalBias=H.normalBias,oe.shadowRadius=H.radius,oe.shadowMapSize=H.mapSize,oe.shadowCameraNear=H.camera.near,oe.shadowCameraFar=H.camera.far,n.pointShadow[x]=oe,n.pointShadowMap[x]=X,n.pointShadowMatrix[x]=I.shadow.matrix,C++}n.point[x]=Y,x++}else if(I.isHemisphereLight){const Y=e.get(I);Y.skyColor.copy(I.color).multiplyScalar($),Y.groundColor.copy(I.groundColor).multiplyScalar($),n.hemi[p]=Y,p++}}_>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Me.LTC_FLOAT_1,n.rectAreaLTC2=Me.LTC_FLOAT_2):(n.rectAreaLTC1=Me.LTC_HALF_1,n.rectAreaLTC2=Me.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=d,n.ambient[2]=f;const E=n.hash;(E.directionalLength!==v||E.pointLength!==x||E.spotLength!==y||E.rectAreaLength!==_||E.hemiLength!==p||E.numDirectionalShadows!==b||E.numPointShadows!==C||E.numSpotShadows!==A||E.numSpotMaps!==D||E.numLightProbes!==U)&&(n.directional.length=v,n.spot.length=y,n.rectArea.length=_,n.point.length=x,n.hemi.length=p,n.directionalShadow.length=b,n.directionalShadowMap.length=b,n.pointShadow.length=C,n.pointShadowMap.length=C,n.spotShadow.length=A,n.spotShadowMap.length=A,n.directionalShadowMatrix.length=b,n.pointShadowMatrix.length=C,n.spotLightMatrix.length=A+D-P,n.spotLightMap.length=D,n.numSpotLightShadowsWithMaps=P,n.numLightProbes=U,E.directionalLength=v,E.pointLength=x,E.spotLength=y,E.rectAreaLength=_,E.hemiLength=p,E.numDirectionalShadows=b,E.numPointShadows=C,E.numSpotShadows=A,E.numSpotMaps=D,E.numLightProbes=U,n.version=eg++)}function l(c,u){let d=0,f=0,v=0,x=0,y=0;const _=u.matrixWorldInverse;for(let p=0,b=c.length;p<b;p++){const C=c[p];if(C.isDirectionalLight){const A=n.directional[d];A.direction.setFromMatrixPosition(C.matrixWorld),r.setFromMatrixPosition(C.target.matrixWorld),A.direction.sub(r),A.direction.transformDirection(_),d++}else if(C.isSpotLight){const A=n.spot[v];A.position.setFromMatrixPosition(C.matrixWorld),A.position.applyMatrix4(_),A.direction.setFromMatrixPosition(C.matrixWorld),r.setFromMatrixPosition(C.target.matrixWorld),A.direction.sub(r),A.direction.transformDirection(_),v++}else if(C.isRectAreaLight){const A=n.rectArea[x];A.position.setFromMatrixPosition(C.matrixWorld),A.position.applyMatrix4(_),o.identity(),s.copy(C.matrixWorld),s.premultiply(_),o.extractRotation(s),A.halfWidth.set(C.width*.5,0,0),A.halfHeight.set(0,C.height*.5,0),A.halfWidth.applyMatrix4(o),A.halfHeight.applyMatrix4(o),x++}else if(C.isPointLight){const A=n.point[f];A.position.setFromMatrixPosition(C.matrixWorld),A.position.applyMatrix4(_),f++}else if(C.isHemisphereLight){const A=n.hemi[y];A.direction.setFromMatrixPosition(C.matrixWorld),A.direction.transformDirection(_),y++}}}return{setup:a,setupView:l,state:n}}function jl(i){const e=new ng(i),t=[],n=[];function r(u){c.camera=u,t.length=0,n.length=0}function s(u){t.push(u)}function o(u){n.push(u)}function a(){e.setup(t)}function l(u){e.setupView(t,u)}const c={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:r,state:c,setupLights:a,setupLightsView:l,pushLight:s,pushShadow:o}}function ig(i){let e=new WeakMap;function t(r,s=0){const o=e.get(r);let a;return o===void 0?(a=new jl(i),e.set(r,[a])):s>=o.length?(a=new jl(i),o.push(a)):a=o[s],a}function n(){e=new WeakMap}return{get:t,dispose:n}}const rg=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,sg=`uniform sampler2D shadow_pass;
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
}`,og=[new G(1,0,0),new G(-1,0,0),new G(0,1,0),new G(0,-1,0),new G(0,0,1),new G(0,0,-1)],ag=[new G(0,-1,0),new G(0,-1,0),new G(0,0,1),new G(0,0,-1),new G(0,-1,0),new G(0,-1,0)],Zl=new It,mr=new G,To=new G;function lg(i,e,t){let n=new za;const r=new ct,s=new ct,o=new Nt,a=new _u,l=new vu,c={},u=t.maxTextureSize,d={[li]:rn,[rn]:li,[pn]:pn},f=new Bn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ct},radius:{value:4}},vertexShader:rg,fragmentShader:sg}),v=f.clone();v.defines.HORIZONTAL_PASS=1;const x=new tn;x.setAttribute("position",new On(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const y=new ot(x,f),_=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=br;let p=this.type;this.render=function(P,U,E){if(_.enabled===!1||_.autoUpdate===!1&&_.needsUpdate===!1||P.length===0)return;this.type===oh&&(Ye("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=br);const w=i.getRenderTarget(),Z=i.getActiveCubeFace(),I=i.getActiveMipmapLevel(),W=i.state;W.setBlending($n),W.buffers.depth.getReversed()===!0?W.buffers.color.setClear(0,0,0,0):W.buffers.color.setClear(1,1,1,1),W.buffers.depth.setTest(!0),W.setScissorTest(!1);const $=p!==this.type;$&&U.traverse(function(q){q.material&&(Array.isArray(q.material)?q.material.forEach(X=>X.needsUpdate=!0):q.material.needsUpdate=!0)});for(let q=0,X=P.length;q<X;q++){const Y=P[q],H=Y.shadow;if(H===void 0){Ye("WebGLShadowMap:",Y,"has no shadow.");continue}if(H.autoUpdate===!1&&H.needsUpdate===!1)continue;r.copy(H.mapSize);const oe=H.getFrameExtents();r.multiply(oe),s.copy(H.mapSize),(r.x>u||r.y>u)&&(r.x>u&&(s.x=Math.floor(u/oe.x),r.x=s.x*oe.x,H.mapSize.x=s.x),r.y>u&&(s.y=Math.floor(u/oe.y),r.y=s.y*oe.y,H.mapSize.y=s.y));const ne=i.state.buffers.depth.getReversed();if(H.camera._reversedDepth=ne,H.map===null||$===!0){if(H.map!==null&&(H.map.depthTexture!==null&&(H.map.depthTexture.dispose(),H.map.depthTexture=null),H.map.dispose()),this.type===Er){if(Y.isPointLight){Ye("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}H.map=new Un(r.x,r.y,{format:Ki,type:qn,minFilter:Vt,magFilter:Vt,generateMipmaps:!1}),H.map.texture.name=Y.name+".shadowMap",H.map.depthTexture=new Pr(r.x,r.y,Pn),H.map.depthTexture.name=Y.name+".shadowMapDepth",H.map.depthTexture.format=jn,H.map.depthTexture.compareFunction=null,H.map.depthTexture.minFilter=Yt,H.map.depthTexture.magFilter=Yt}else Y.isPointLight?(H.map=new Gc(r.x),H.map.depthTexture=new uu(r.x,Nn)):(H.map=new Un(r.x,r.y),H.map.depthTexture=new Pr(r.x,r.y,Nn)),H.map.depthTexture.name=Y.name+".shadowMap",H.map.depthTexture.format=jn,this.type===br?(H.map.depthTexture.compareFunction=ne?Na:Oa,H.map.depthTexture.minFilter=Vt,H.map.depthTexture.magFilter=Vt):(H.map.depthTexture.compareFunction=null,H.map.depthTexture.minFilter=Yt,H.map.depthTexture.magFilter=Yt);H.camera.updateProjectionMatrix()}const Se=H.map.isWebGLCubeRenderTarget?6:1;for(let Te=0;Te<Se;Te++){if(H.map.isWebGLCubeRenderTarget)i.setRenderTarget(H.map,Te),i.clear();else{Te===0&&(i.setRenderTarget(H.map),i.clear());const be=H.getViewport(Te);o.set(s.x*be.x,s.y*be.y,s.x*be.z,s.y*be.w),W.viewport(o)}if(Y.isPointLight){const be=H.camera,je=H.matrix,Rt=Y.distance||be.far;Rt!==be.far&&(be.far=Rt,be.updateProjectionMatrix()),mr.setFromMatrixPosition(Y.matrixWorld),be.position.copy(mr),To.copy(be.position),To.add(og[Te]),be.up.copy(ag[Te]),be.lookAt(To),be.updateMatrixWorld(),je.makeTranslation(-mr.x,-mr.y,-mr.z),Zl.multiplyMatrices(be.projectionMatrix,be.matrixWorldInverse),H._frustum.setFromProjectionMatrix(Zl,be.coordinateSystem,be.reversedDepth)}else H.updateMatrices(Y);n=H.getFrustum(),A(U,E,H.camera,Y,this.type)}H.isPointLightShadow!==!0&&this.type===Er&&b(H,E),H.needsUpdate=!1}p=this.type,_.needsUpdate=!1,i.setRenderTarget(w,Z,I)};function b(P,U){const E=e.update(y);f.defines.VSM_SAMPLES!==P.blurSamples&&(f.defines.VSM_SAMPLES=P.blurSamples,v.defines.VSM_SAMPLES=P.blurSamples,f.needsUpdate=!0,v.needsUpdate=!0),P.mapPass===null&&(P.mapPass=new Un(r.x,r.y,{format:Ki,type:qn})),f.uniforms.shadow_pass.value=P.map.depthTexture,f.uniforms.resolution.value=P.mapSize,f.uniforms.radius.value=P.radius,i.setRenderTarget(P.mapPass),i.clear(),i.renderBufferDirect(U,null,E,f,y,null),v.uniforms.shadow_pass.value=P.mapPass.texture,v.uniforms.resolution.value=P.mapSize,v.uniforms.radius.value=P.radius,i.setRenderTarget(P.map),i.clear(),i.renderBufferDirect(U,null,E,v,y,null)}function C(P,U,E,w){let Z=null;const I=E.isPointLight===!0?P.customDistanceMaterial:P.customDepthMaterial;if(I!==void 0)Z=I;else if(Z=E.isPointLight===!0?l:a,i.localClippingEnabled&&U.clipShadows===!0&&Array.isArray(U.clippingPlanes)&&U.clippingPlanes.length!==0||U.displacementMap&&U.displacementScale!==0||U.alphaMap&&U.alphaTest>0||U.map&&U.alphaTest>0||U.alphaToCoverage===!0){const W=Z.uuid,$=U.uuid;let q=c[W];q===void 0&&(q={},c[W]=q);let X=q[$];X===void 0&&(X=Z.clone(),q[$]=X,U.addEventListener("dispose",D)),Z=X}if(Z.visible=U.visible,Z.wireframe=U.wireframe,w===Er?Z.side=U.shadowSide!==null?U.shadowSide:U.side:Z.side=U.shadowSide!==null?U.shadowSide:d[U.side],Z.alphaMap=U.alphaMap,Z.alphaTest=U.alphaToCoverage===!0?.5:U.alphaTest,Z.map=U.map,Z.clipShadows=U.clipShadows,Z.clippingPlanes=U.clippingPlanes,Z.clipIntersection=U.clipIntersection,Z.displacementMap=U.displacementMap,Z.displacementScale=U.displacementScale,Z.displacementBias=U.displacementBias,Z.wireframeLinewidth=U.wireframeLinewidth,Z.linewidth=U.linewidth,E.isPointLight===!0&&Z.isMeshDistanceMaterial===!0){const W=i.properties.get(Z);W.light=E}return Z}function A(P,U,E,w,Z){if(P.visible===!1)return;if(P.layers.test(U.layers)&&(P.isMesh||P.isLine||P.isPoints)&&(P.castShadow||P.receiveShadow&&Z===Er)&&(!P.frustumCulled||n.intersectsObject(P))){P.modelViewMatrix.multiplyMatrices(E.matrixWorldInverse,P.matrixWorld);const $=e.update(P),q=P.material;if(Array.isArray(q)){const X=$.groups;for(let Y=0,H=X.length;Y<H;Y++){const oe=X[Y],ne=q[oe.materialIndex];if(ne&&ne.visible){const Se=C(P,ne,w,Z);P.onBeforeShadow(i,P,U,E,$,Se,oe),i.renderBufferDirect(E,null,$,Se,P,oe),P.onAfterShadow(i,P,U,E,$,Se,oe)}}}else if(q.visible){const X=C(P,q,w,Z);P.onBeforeShadow(i,P,U,E,$,X,null),i.renderBufferDirect(E,null,$,X,P,null),P.onAfterShadow(i,P,U,E,$,X,null)}}const W=P.children;for(let $=0,q=W.length;$<q;$++)A(W[$],U,E,w,Z)}function D(P){P.target.removeEventListener("dispose",D);for(const E in c){const w=c[E],Z=P.target.uuid;Z in w&&(w[Z].dispose(),delete w[Z])}}}function cg(i,e){function t(){let O=!1;const ue=new Nt;let le=null;const we=new Nt(0,0,0,0);return{setMask:function(ie){le!==ie&&!O&&(i.colorMask(ie,ie,ie,ie),le=ie)},setLocked:function(ie){O=ie},setClear:function(ie,j,Re,Xe,Et){Et===!0&&(ie*=Xe,j*=Xe,Re*=Xe),ue.set(ie,j,Re,Xe),we.equals(ue)===!1&&(i.clearColor(ie,j,Re,Xe),we.copy(ue))},reset:function(){O=!1,le=null,we.set(-1,0,0,0)}}}function n(){let O=!1,ue=!1,le=null,we=null,ie=null;return{setReversed:function(j){if(ue!==j){const Re=e.get("EXT_clip_control");j?Re.clipControlEXT(Re.LOWER_LEFT_EXT,Re.ZERO_TO_ONE_EXT):Re.clipControlEXT(Re.LOWER_LEFT_EXT,Re.NEGATIVE_ONE_TO_ONE_EXT),ue=j;const Xe=ie;ie=null,this.setClear(Xe)}},getReversed:function(){return ue},setTest:function(j){j?de(i.DEPTH_TEST):pe(i.DEPTH_TEST)},setMask:function(j){le!==j&&!O&&(i.depthMask(j),le=j)},setFunc:function(j){if(ue&&(j=kh[j]),we!==j){switch(j){case Lo:i.depthFunc(i.NEVER);break;case Uo:i.depthFunc(i.ALWAYS);break;case Oo:i.depthFunc(i.LESS);break;case Cn:i.depthFunc(i.LEQUAL);break;case No:i.depthFunc(i.EQUAL);break;case Fo:i.depthFunc(i.GEQUAL);break;case wr:i.depthFunc(i.GREATER);break;case Bo:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}we=j}},setLocked:function(j){O=j},setClear:function(j){ie!==j&&(ie=j,ue&&(j=1-j),i.clearDepth(j))},reset:function(){O=!1,le=null,we=null,ie=null,ue=!1}}}function r(){let O=!1,ue=null,le=null,we=null,ie=null,j=null,Re=null,Xe=null,Et=null;return{setTest:function(Qe){O||(Qe?de(i.STENCIL_TEST):pe(i.STENCIL_TEST))},setMask:function(Qe){ue!==Qe&&!O&&(i.stencilMask(Qe),ue=Qe)},setFunc:function(Qe,gn,Xt){(le!==Qe||we!==gn||ie!==Xt)&&(i.stencilFunc(Qe,gn,Xt),le=Qe,we=gn,ie=Xt)},setOp:function(Qe,gn,Xt){(j!==Qe||Re!==gn||Xe!==Xt)&&(i.stencilOp(Qe,gn,Xt),j=Qe,Re=gn,Xe=Xt)},setLocked:function(Qe){O=Qe},setClear:function(Qe){Et!==Qe&&(i.clearStencil(Qe),Et=Qe)},reset:function(){O=!1,ue=null,le=null,we=null,ie=null,j=null,Re=null,Xe=null,Et=null}}}const s=new t,o=new n,a=new r,l=new WeakMap,c=new WeakMap;let u={},d={},f=new WeakMap,v=[],x=null,y=!1,_=null,p=null,b=null,C=null,A=null,D=null,P=null,U=new pt(0,0,0),E=0,w=!1,Z=null,I=null,W=null,$=null,q=null;const X=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let Y=!1,H=0;const oe=i.getParameter(i.VERSION);oe.indexOf("WebGL")!==-1?(H=parseFloat(/^WebGL (\d)/.exec(oe)[1]),Y=H>=1):oe.indexOf("OpenGL ES")!==-1&&(H=parseFloat(/^OpenGL ES (\d)/.exec(oe)[1]),Y=H>=2);let ne=null,Se={};const Te=i.getParameter(i.SCISSOR_BOX),be=i.getParameter(i.VIEWPORT),je=new Nt().fromArray(Te),Rt=new Nt().fromArray(be);function bt(O,ue,le,we){const ie=new Uint8Array(4),j=i.createTexture();i.bindTexture(O,j),i.texParameteri(O,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(O,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Re=0;Re<le;Re++)O===i.TEXTURE_3D||O===i.TEXTURE_2D_ARRAY?i.texImage3D(ue,0,i.RGBA,1,1,we,0,i.RGBA,i.UNSIGNED_BYTE,ie):i.texImage2D(ue+Re,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,ie);return j}const Q={};Q[i.TEXTURE_2D]=bt(i.TEXTURE_2D,i.TEXTURE_2D,1),Q[i.TEXTURE_CUBE_MAP]=bt(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),Q[i.TEXTURE_2D_ARRAY]=bt(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),Q[i.TEXTURE_3D]=bt(i.TEXTURE_3D,i.TEXTURE_3D,1,1),s.setClear(0,0,0,1),o.setClear(1),a.setClear(0),de(i.DEPTH_TEST),o.setFunc(Cn),Ke(!1),wt(Ka),de(i.CULL_FACE),mt($n);function de(O){u[O]!==!0&&(i.enable(O),u[O]=!0)}function pe(O){u[O]!==!1&&(i.disable(O),u[O]=!1)}function qe(O,ue){return d[O]!==ue?(i.bindFramebuffer(O,ue),d[O]=ue,O===i.DRAW_FRAMEBUFFER&&(d[i.FRAMEBUFFER]=ue),O===i.FRAMEBUFFER&&(d[i.DRAW_FRAMEBUFFER]=ue),!0):!1}function ke(O,ue){let le=v,we=!1;if(O){le=f.get(ue),le===void 0&&(le=[],f.set(ue,le));const ie=O.textures;if(le.length!==ie.length||le[0]!==i.COLOR_ATTACHMENT0){for(let j=0,Re=ie.length;j<Re;j++)le[j]=i.COLOR_ATTACHMENT0+j;le.length=ie.length,we=!0}}else le[0]!==i.BACK&&(le[0]=i.BACK,we=!0);we&&i.drawBuffers(le)}function Ve(O){return x!==O?(i.useProgram(O),x=O,!0):!1}const Dt={[Mi]:i.FUNC_ADD,[lh]:i.FUNC_SUBTRACT,[ch]:i.FUNC_REVERSE_SUBTRACT};Dt[hh]=i.MIN,Dt[uh]=i.MAX;const Ge={[fh]:i.ZERO,[dh]:i.ONE,[ph]:i.SRC_COLOR,[Io]:i.SRC_ALPHA,[Mh]:i.SRC_ALPHA_SATURATE,[vh]:i.DST_COLOR,[gh]:i.DST_ALPHA,[mh]:i.ONE_MINUS_SRC_COLOR,[Do]:i.ONE_MINUS_SRC_ALPHA,[xh]:i.ONE_MINUS_DST_COLOR,[_h]:i.ONE_MINUS_DST_ALPHA,[Sh]:i.CONSTANT_COLOR,[yh]:i.ONE_MINUS_CONSTANT_COLOR,[Eh]:i.CONSTANT_ALPHA,[Th]:i.ONE_MINUS_CONSTANT_ALPHA};function mt(O,ue,le,we,ie,j,Re,Xe,Et,Qe){if(O===$n){y===!0&&(pe(i.BLEND),y=!1);return}if(y===!1&&(de(i.BLEND),y=!0),O!==ah){if(O!==_||Qe!==w){if((p!==Mi||A!==Mi)&&(i.blendEquation(i.FUNC_ADD),p=Mi,A=Mi),Qe)switch(O){case qi:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case xs:i.blendFunc(i.ONE,i.ONE);break;case Ja:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Qa:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:_t("WebGLState: Invalid blending: ",O);break}else switch(O){case qi:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case xs:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case Ja:_t("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Qa:_t("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:_t("WebGLState: Invalid blending: ",O);break}b=null,C=null,D=null,P=null,U.set(0,0,0),E=0,_=O,w=Qe}return}ie=ie||ue,j=j||le,Re=Re||we,(ue!==p||ie!==A)&&(i.blendEquationSeparate(Dt[ue],Dt[ie]),p=ue,A=ie),(le!==b||we!==C||j!==D||Re!==P)&&(i.blendFuncSeparate(Ge[le],Ge[we],Ge[j],Ge[Re]),b=le,C=we,D=j,P=Re),(Xe.equals(U)===!1||Et!==E)&&(i.blendColor(Xe.r,Xe.g,Xe.b,Et),U.copy(Xe),E=Et),_=O,w=!1}function St(O,ue){O.side===pn?pe(i.CULL_FACE):de(i.CULL_FACE);let le=O.side===rn;ue&&(le=!le),Ke(le),O.blending===qi&&O.transparent===!1?mt($n):mt(O.blending,O.blendEquation,O.blendSrc,O.blendDst,O.blendEquationAlpha,O.blendSrcAlpha,O.blendDstAlpha,O.blendColor,O.blendAlpha,O.premultipliedAlpha),o.setFunc(O.depthFunc),o.setTest(O.depthTest),o.setMask(O.depthWrite),s.setMask(O.colorWrite);const we=O.stencilWrite;a.setTest(we),we&&(a.setMask(O.stencilWriteMask),a.setFunc(O.stencilFunc,O.stencilRef,O.stencilFuncMask),a.setOp(O.stencilFail,O.stencilZFail,O.stencilZPass)),Pt(O.polygonOffset,O.polygonOffsetFactor,O.polygonOffsetUnits),O.alphaToCoverage===!0?de(i.SAMPLE_ALPHA_TO_COVERAGE):pe(i.SAMPLE_ALPHA_TO_COVERAGE)}function Ke(O){Z!==O&&(O?i.frontFace(i.CW):i.frontFace(i.CCW),Z=O)}function wt(O){O!==rh?(de(i.CULL_FACE),O!==I&&(O===Ka?i.cullFace(i.BACK):O===sh?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):pe(i.CULL_FACE),I=O}function L(O){O!==W&&(Y&&i.lineWidth(O),W=O)}function Pt(O,ue,le){O?(de(i.POLYGON_OFFSET_FILL),($!==ue||q!==le)&&($=ue,q=le,o.getReversed()&&(ue=-ue),i.polygonOffset(ue,le))):pe(i.POLYGON_OFFSET_FILL)}function at(O){O?de(i.SCISSOR_TEST):pe(i.SCISSOR_TEST)}function gt(O){O===void 0&&(O=i.TEXTURE0+X-1),ne!==O&&(i.activeTexture(O),ne=O)}function De(O,ue,le){le===void 0&&(ne===null?le=i.TEXTURE0+X-1:le=ne);let we=Se[le];we===void 0&&(we={type:void 0,texture:void 0},Se[le]=we),(we.type!==O||we.texture!==ue)&&(ne!==le&&(i.activeTexture(le),ne=le),i.bindTexture(O,ue||Q[O]),we.type=O,we.texture=ue)}function R(){const O=Se[ne];O!==void 0&&O.type!==void 0&&(i.bindTexture(O.type,null),O.type=void 0,O.texture=void 0)}function M(){try{i.compressedTexImage2D(...arguments)}catch(O){_t("WebGLState:",O)}}function k(){try{i.compressedTexImage3D(...arguments)}catch(O){_t("WebGLState:",O)}}function J(){try{i.texSubImage2D(...arguments)}catch(O){_t("WebGLState:",O)}}function te(){try{i.texSubImage3D(...arguments)}catch(O){_t("WebGLState:",O)}}function K(){try{i.compressedTexSubImage2D(...arguments)}catch(O){_t("WebGLState:",O)}}function Ae(){try{i.compressedTexSubImage3D(...arguments)}catch(O){_t("WebGLState:",O)}}function he(){try{i.texStorage2D(...arguments)}catch(O){_t("WebGLState:",O)}}function Be(){try{i.texStorage3D(...arguments)}catch(O){_t("WebGLState:",O)}}function ze(){try{i.texImage2D(...arguments)}catch(O){_t("WebGLState:",O)}}function re(){try{i.texImage3D(...arguments)}catch(O){_t("WebGLState:",O)}}function se(O){je.equals(O)===!1&&(i.scissor(O.x,O.y,O.z,O.w),je.copy(O))}function Pe(O){Rt.equals(O)===!1&&(i.viewport(O.x,O.y,O.z,O.w),Rt.copy(O))}function Ie(O,ue){let le=c.get(ue);le===void 0&&(le=new WeakMap,c.set(ue,le));let we=le.get(O);we===void 0&&(we=i.getUniformBlockIndex(ue,O.name),le.set(O,we))}function Ee(O,ue){const we=c.get(ue).get(O);l.get(ue)!==we&&(i.uniformBlockBinding(ue,we,O.__bindingPointIndex),l.set(ue,we))}function Je(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),o.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),u={},ne=null,Se={},d={},f=new WeakMap,v=[],x=null,y=!1,_=null,p=null,b=null,C=null,A=null,D=null,P=null,U=new pt(0,0,0),E=0,w=!1,Z=null,I=null,W=null,$=null,q=null,je.set(0,0,i.canvas.width,i.canvas.height),Rt.set(0,0,i.canvas.width,i.canvas.height),s.reset(),o.reset(),a.reset()}return{buffers:{color:s,depth:o,stencil:a},enable:de,disable:pe,bindFramebuffer:qe,drawBuffers:ke,useProgram:Ve,setBlending:mt,setMaterial:St,setFlipSided:Ke,setCullFace:wt,setLineWidth:L,setPolygonOffset:Pt,setScissorTest:at,activeTexture:gt,bindTexture:De,unbindTexture:R,compressedTexImage2D:M,compressedTexImage3D:k,texImage2D:ze,texImage3D:re,updateUBOMapping:Ie,uniformBlockBinding:Ee,texStorage2D:he,texStorage3D:Be,texSubImage2D:J,texSubImage3D:te,compressedTexSubImage2D:K,compressedTexSubImage3D:Ae,scissor:se,viewport:Pe,reset:Je}}function hg(i,e,t,n,r,s,o){const a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new ct,u=new WeakMap;let d;const f=new WeakMap;let v=!1;try{v=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function x(R,M){return v?new OffscreenCanvas(R,M):Ss("canvas")}function y(R,M,k){let J=1;const te=De(R);if((te.width>k||te.height>k)&&(J=k/Math.max(te.width,te.height)),J<1)if(typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&R instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&R instanceof ImageBitmap||typeof VideoFrame<"u"&&R instanceof VideoFrame){const K=Math.floor(J*te.width),Ae=Math.floor(J*te.height);d===void 0&&(d=x(K,Ae));const he=M?x(K,Ae):d;return he.width=K,he.height=Ae,he.getContext("2d").drawImage(R,0,0,K,Ae),Ye("WebGLRenderer: Texture has been resized from ("+te.width+"x"+te.height+") to ("+K+"x"+Ae+")."),he}else return"data"in R&&Ye("WebGLRenderer: Image in DataTexture is too big ("+te.width+"x"+te.height+")."),R;return R}function _(R){return R.generateMipmaps}function p(R){i.generateMipmap(R)}function b(R){return R.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:R.isWebGL3DRenderTarget?i.TEXTURE_3D:R.isWebGLArrayRenderTarget||R.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function C(R,M,k,J,te=!1){if(R!==null){if(i[R]!==void 0)return i[R];Ye("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+R+"'")}let K=M;if(M===i.RED&&(k===i.FLOAT&&(K=i.R32F),k===i.HALF_FLOAT&&(K=i.R16F),k===i.UNSIGNED_BYTE&&(K=i.R8)),M===i.RED_INTEGER&&(k===i.UNSIGNED_BYTE&&(K=i.R8UI),k===i.UNSIGNED_SHORT&&(K=i.R16UI),k===i.UNSIGNED_INT&&(K=i.R32UI),k===i.BYTE&&(K=i.R8I),k===i.SHORT&&(K=i.R16I),k===i.INT&&(K=i.R32I)),M===i.RG&&(k===i.FLOAT&&(K=i.RG32F),k===i.HALF_FLOAT&&(K=i.RG16F),k===i.UNSIGNED_BYTE&&(K=i.RG8)),M===i.RG_INTEGER&&(k===i.UNSIGNED_BYTE&&(K=i.RG8UI),k===i.UNSIGNED_SHORT&&(K=i.RG16UI),k===i.UNSIGNED_INT&&(K=i.RG32UI),k===i.BYTE&&(K=i.RG8I),k===i.SHORT&&(K=i.RG16I),k===i.INT&&(K=i.RG32I)),M===i.RGB_INTEGER&&(k===i.UNSIGNED_BYTE&&(K=i.RGB8UI),k===i.UNSIGNED_SHORT&&(K=i.RGB16UI),k===i.UNSIGNED_INT&&(K=i.RGB32UI),k===i.BYTE&&(K=i.RGB8I),k===i.SHORT&&(K=i.RGB16I),k===i.INT&&(K=i.RGB32I)),M===i.RGBA_INTEGER&&(k===i.UNSIGNED_BYTE&&(K=i.RGBA8UI),k===i.UNSIGNED_SHORT&&(K=i.RGBA16UI),k===i.UNSIGNED_INT&&(K=i.RGBA32UI),k===i.BYTE&&(K=i.RGBA8I),k===i.SHORT&&(K=i.RGBA16I),k===i.INT&&(K=i.RGBA32I)),M===i.RGB&&(k===i.UNSIGNED_INT_5_9_9_9_REV&&(K=i.RGB9_E5),k===i.UNSIGNED_INT_10F_11F_11F_REV&&(K=i.R11F_G11F_B10F)),M===i.RGBA){const Ae=te?Ms:vt.getTransfer(J);k===i.FLOAT&&(K=i.RGBA32F),k===i.HALF_FLOAT&&(K=i.RGBA16F),k===i.UNSIGNED_BYTE&&(K=Ae===yt?i.SRGB8_ALPHA8:i.RGBA8),k===i.UNSIGNED_SHORT_4_4_4_4&&(K=i.RGBA4),k===i.UNSIGNED_SHORT_5_5_5_1&&(K=i.RGB5_A1)}return(K===i.R16F||K===i.R32F||K===i.RG16F||K===i.RG32F||K===i.RGBA16F||K===i.RGBA32F)&&e.get("EXT_color_buffer_float"),K}function A(R,M){let k;return R?M===null||M===Nn||M===Rr?k=i.DEPTH24_STENCIL8:M===Pn?k=i.DEPTH32F_STENCIL8:M===Ar&&(k=i.DEPTH24_STENCIL8,Ye("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):M===null||M===Nn||M===Rr?k=i.DEPTH_COMPONENT24:M===Pn?k=i.DEPTH_COMPONENT32F:M===Ar&&(k=i.DEPTH_COMPONENT16),k}function D(R,M){return _(R)===!0||R.isFramebufferTexture&&R.minFilter!==Yt&&R.minFilter!==Vt?Math.log2(Math.max(M.width,M.height))+1:R.mipmaps!==void 0&&R.mipmaps.length>0?R.mipmaps.length:R.isCompressedTexture&&Array.isArray(R.image)?M.mipmaps.length:1}function P(R){const M=R.target;M.removeEventListener("dispose",P),E(M),M.isVideoTexture&&u.delete(M)}function U(R){const M=R.target;M.removeEventListener("dispose",U),Z(M)}function E(R){const M=n.get(R);if(M.__webglInit===void 0)return;const k=R.source,J=f.get(k);if(J){const te=J[M.__cacheKey];te.usedTimes--,te.usedTimes===0&&w(R),Object.keys(J).length===0&&f.delete(k)}n.remove(R)}function w(R){const M=n.get(R);i.deleteTexture(M.__webglTexture);const k=R.source,J=f.get(k);delete J[M.__cacheKey],o.memory.textures--}function Z(R){const M=n.get(R);if(R.depthTexture&&(R.depthTexture.dispose(),n.remove(R.depthTexture)),R.isWebGLCubeRenderTarget)for(let J=0;J<6;J++){if(Array.isArray(M.__webglFramebuffer[J]))for(let te=0;te<M.__webglFramebuffer[J].length;te++)i.deleteFramebuffer(M.__webglFramebuffer[J][te]);else i.deleteFramebuffer(M.__webglFramebuffer[J]);M.__webglDepthbuffer&&i.deleteRenderbuffer(M.__webglDepthbuffer[J])}else{if(Array.isArray(M.__webglFramebuffer))for(let J=0;J<M.__webglFramebuffer.length;J++)i.deleteFramebuffer(M.__webglFramebuffer[J]);else i.deleteFramebuffer(M.__webglFramebuffer);if(M.__webglDepthbuffer&&i.deleteRenderbuffer(M.__webglDepthbuffer),M.__webglMultisampledFramebuffer&&i.deleteFramebuffer(M.__webglMultisampledFramebuffer),M.__webglColorRenderbuffer)for(let J=0;J<M.__webglColorRenderbuffer.length;J++)M.__webglColorRenderbuffer[J]&&i.deleteRenderbuffer(M.__webglColorRenderbuffer[J]);M.__webglDepthRenderbuffer&&i.deleteRenderbuffer(M.__webglDepthRenderbuffer)}const k=R.textures;for(let J=0,te=k.length;J<te;J++){const K=n.get(k[J]);K.__webglTexture&&(i.deleteTexture(K.__webglTexture),o.memory.textures--),n.remove(k[J])}n.remove(R)}let I=0;function W(){I=0}function $(){const R=I;return R>=r.maxTextures&&Ye("WebGLTextures: Trying to use "+R+" texture units while this GPU supports only "+r.maxTextures),I+=1,R}function q(R){const M=[];return M.push(R.wrapS),M.push(R.wrapT),M.push(R.wrapR||0),M.push(R.magFilter),M.push(R.minFilter),M.push(R.anisotropy),M.push(R.internalFormat),M.push(R.format),M.push(R.type),M.push(R.generateMipmaps),M.push(R.premultiplyAlpha),M.push(R.flipY),M.push(R.unpackAlignment),M.push(R.colorSpace),M.join()}function X(R,M){const k=n.get(R);if(R.isVideoTexture&&at(R),R.isRenderTargetTexture===!1&&R.isExternalTexture!==!0&&R.version>0&&k.__version!==R.version){const J=R.image;if(J===null)Ye("WebGLRenderer: Texture marked for update but no image data found.");else if(J.complete===!1)Ye("WebGLRenderer: Texture marked for update but image is incomplete");else{Q(k,R,M);return}}else R.isExternalTexture&&(k.__webglTexture=R.sourceTexture?R.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,k.__webglTexture,i.TEXTURE0+M)}function Y(R,M){const k=n.get(R);if(R.isRenderTargetTexture===!1&&R.version>0&&k.__version!==R.version){Q(k,R,M);return}else R.isExternalTexture&&(k.__webglTexture=R.sourceTexture?R.sourceTexture:null);t.bindTexture(i.TEXTURE_2D_ARRAY,k.__webglTexture,i.TEXTURE0+M)}function H(R,M){const k=n.get(R);if(R.isRenderTargetTexture===!1&&R.version>0&&k.__version!==R.version){Q(k,R,M);return}t.bindTexture(i.TEXTURE_3D,k.__webglTexture,i.TEXTURE0+M)}function oe(R,M){const k=n.get(R);if(R.isCubeDepthTexture!==!0&&R.version>0&&k.__version!==R.version){de(k,R,M);return}t.bindTexture(i.TEXTURE_CUBE_MAP,k.__webglTexture,i.TEXTURE0+M)}const ne={[Ei]:i.REPEAT,[Xn]:i.CLAMP_TO_EDGE,[ko]:i.MIRRORED_REPEAT},Se={[Yt]:i.NEAREST,[Ah]:i.NEAREST_MIPMAP_NEAREST,[Fr]:i.NEAREST_MIPMAP_LINEAR,[Vt]:i.LINEAR,[Xs]:i.LINEAR_MIPMAP_NEAREST,[Ti]:i.LINEAR_MIPMAP_LINEAR},Te={[Ph]:i.NEVER,[Oh]:i.ALWAYS,[Ih]:i.LESS,[Oa]:i.LEQUAL,[Dh]:i.EQUAL,[Na]:i.GEQUAL,[Lh]:i.GREATER,[Uh]:i.NOTEQUAL};function be(R,M){if(M.type===Pn&&e.has("OES_texture_float_linear")===!1&&(M.magFilter===Vt||M.magFilter===Xs||M.magFilter===Fr||M.magFilter===Ti||M.minFilter===Vt||M.minFilter===Xs||M.minFilter===Fr||M.minFilter===Ti)&&Ye("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(R,i.TEXTURE_WRAP_S,ne[M.wrapS]),i.texParameteri(R,i.TEXTURE_WRAP_T,ne[M.wrapT]),(R===i.TEXTURE_3D||R===i.TEXTURE_2D_ARRAY)&&i.texParameteri(R,i.TEXTURE_WRAP_R,ne[M.wrapR]),i.texParameteri(R,i.TEXTURE_MAG_FILTER,Se[M.magFilter]),i.texParameteri(R,i.TEXTURE_MIN_FILTER,Se[M.minFilter]),M.compareFunction&&(i.texParameteri(R,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(R,i.TEXTURE_COMPARE_FUNC,Te[M.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(M.magFilter===Yt||M.minFilter!==Fr&&M.minFilter!==Ti||M.type===Pn&&e.has("OES_texture_float_linear")===!1)return;if(M.anisotropy>1||n.get(M).__currentAnisotropy){const k=e.get("EXT_texture_filter_anisotropic");i.texParameterf(R,k.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(M.anisotropy,r.getMaxAnisotropy())),n.get(M).__currentAnisotropy=M.anisotropy}}}function je(R,M){let k=!1;R.__webglInit===void 0&&(R.__webglInit=!0,M.addEventListener("dispose",P));const J=M.source;let te=f.get(J);te===void 0&&(te={},f.set(J,te));const K=q(M);if(K!==R.__cacheKey){te[K]===void 0&&(te[K]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,k=!0),te[K].usedTimes++;const Ae=te[R.__cacheKey];Ae!==void 0&&(te[R.__cacheKey].usedTimes--,Ae.usedTimes===0&&w(M)),R.__cacheKey=K,R.__webglTexture=te[K].texture}return k}function Rt(R,M,k){return Math.floor(Math.floor(R/k)/M)}function bt(R,M,k,J){const K=R.updateRanges;if(K.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,M.width,M.height,k,J,M.data);else{K.sort((re,se)=>re.start-se.start);let Ae=0;for(let re=1;re<K.length;re++){const se=K[Ae],Pe=K[re],Ie=se.start+se.count,Ee=Rt(Pe.start,M.width,4),Je=Rt(se.start,M.width,4);Pe.start<=Ie+1&&Ee===Je&&Rt(Pe.start+Pe.count-1,M.width,4)===Ee?se.count=Math.max(se.count,Pe.start+Pe.count-se.start):(++Ae,K[Ae]=Pe)}K.length=Ae+1;const he=i.getParameter(i.UNPACK_ROW_LENGTH),Be=i.getParameter(i.UNPACK_SKIP_PIXELS),ze=i.getParameter(i.UNPACK_SKIP_ROWS);i.pixelStorei(i.UNPACK_ROW_LENGTH,M.width);for(let re=0,se=K.length;re<se;re++){const Pe=K[re],Ie=Math.floor(Pe.start/4),Ee=Math.ceil(Pe.count/4),Je=Ie%M.width,O=Math.floor(Ie/M.width),ue=Ee,le=1;i.pixelStorei(i.UNPACK_SKIP_PIXELS,Je),i.pixelStorei(i.UNPACK_SKIP_ROWS,O),t.texSubImage2D(i.TEXTURE_2D,0,Je,O,ue,le,k,J,M.data)}R.clearUpdateRanges(),i.pixelStorei(i.UNPACK_ROW_LENGTH,he),i.pixelStorei(i.UNPACK_SKIP_PIXELS,Be),i.pixelStorei(i.UNPACK_SKIP_ROWS,ze)}}function Q(R,M,k){let J=i.TEXTURE_2D;(M.isDataArrayTexture||M.isCompressedArrayTexture)&&(J=i.TEXTURE_2D_ARRAY),M.isData3DTexture&&(J=i.TEXTURE_3D);const te=je(R,M),K=M.source;t.bindTexture(J,R.__webglTexture,i.TEXTURE0+k);const Ae=n.get(K);if(K.version!==Ae.__version||te===!0){t.activeTexture(i.TEXTURE0+k);const he=vt.getPrimaries(vt.workingColorSpace),Be=M.colorSpace===si?null:vt.getPrimaries(M.colorSpace),ze=M.colorSpace===si||he===Be?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,M.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,M.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,ze);let re=y(M.image,!1,r.maxTextureSize);re=gt(M,re);const se=s.convert(M.format,M.colorSpace),Pe=s.convert(M.type);let Ie=C(M.internalFormat,se,Pe,M.colorSpace,M.isVideoTexture);be(J,M);let Ee;const Je=M.mipmaps,O=M.isVideoTexture!==!0,ue=Ae.__version===void 0||te===!0,le=K.dataReady,we=D(M,re);if(M.isDepthTexture)Ie=A(M.format===bi,M.type),ue&&(O?t.texStorage2D(i.TEXTURE_2D,1,Ie,re.width,re.height):t.texImage2D(i.TEXTURE_2D,0,Ie,re.width,re.height,0,se,Pe,null));else if(M.isDataTexture)if(Je.length>0){O&&ue&&t.texStorage2D(i.TEXTURE_2D,we,Ie,Je[0].width,Je[0].height);for(let ie=0,j=Je.length;ie<j;ie++)Ee=Je[ie],O?le&&t.texSubImage2D(i.TEXTURE_2D,ie,0,0,Ee.width,Ee.height,se,Pe,Ee.data):t.texImage2D(i.TEXTURE_2D,ie,Ie,Ee.width,Ee.height,0,se,Pe,Ee.data);M.generateMipmaps=!1}else O?(ue&&t.texStorage2D(i.TEXTURE_2D,we,Ie,re.width,re.height),le&&bt(M,re,se,Pe)):t.texImage2D(i.TEXTURE_2D,0,Ie,re.width,re.height,0,se,Pe,re.data);else if(M.isCompressedTexture)if(M.isCompressedArrayTexture){O&&ue&&t.texStorage3D(i.TEXTURE_2D_ARRAY,we,Ie,Je[0].width,Je[0].height,re.depth);for(let ie=0,j=Je.length;ie<j;ie++)if(Ee=Je[ie],M.format!==yn)if(se!==null)if(O){if(le)if(M.layerUpdates.size>0){const Re=Al(Ee.width,Ee.height,M.format,M.type);for(const Xe of M.layerUpdates){const Et=Ee.data.subarray(Xe*Re/Ee.data.BYTES_PER_ELEMENT,(Xe+1)*Re/Ee.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ie,0,0,Xe,Ee.width,Ee.height,1,se,Et)}M.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ie,0,0,0,Ee.width,Ee.height,re.depth,se,Ee.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,ie,Ie,Ee.width,Ee.height,re.depth,0,Ee.data,0,0);else Ye("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else O?le&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,ie,0,0,0,Ee.width,Ee.height,re.depth,se,Pe,Ee.data):t.texImage3D(i.TEXTURE_2D_ARRAY,ie,Ie,Ee.width,Ee.height,re.depth,0,se,Pe,Ee.data)}else{O&&ue&&t.texStorage2D(i.TEXTURE_2D,we,Ie,Je[0].width,Je[0].height);for(let ie=0,j=Je.length;ie<j;ie++)Ee=Je[ie],M.format!==yn?se!==null?O?le&&t.compressedTexSubImage2D(i.TEXTURE_2D,ie,0,0,Ee.width,Ee.height,se,Ee.data):t.compressedTexImage2D(i.TEXTURE_2D,ie,Ie,Ee.width,Ee.height,0,Ee.data):Ye("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):O?le&&t.texSubImage2D(i.TEXTURE_2D,ie,0,0,Ee.width,Ee.height,se,Pe,Ee.data):t.texImage2D(i.TEXTURE_2D,ie,Ie,Ee.width,Ee.height,0,se,Pe,Ee.data)}else if(M.isDataArrayTexture)if(O){if(ue&&t.texStorage3D(i.TEXTURE_2D_ARRAY,we,Ie,re.width,re.height,re.depth),le)if(M.layerUpdates.size>0){const ie=Al(re.width,re.height,M.format,M.type);for(const j of M.layerUpdates){const Re=re.data.subarray(j*ie/re.data.BYTES_PER_ELEMENT,(j+1)*ie/re.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,j,re.width,re.height,1,se,Pe,Re)}M.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,re.width,re.height,re.depth,se,Pe,re.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,Ie,re.width,re.height,re.depth,0,se,Pe,re.data);else if(M.isData3DTexture)O?(ue&&t.texStorage3D(i.TEXTURE_3D,we,Ie,re.width,re.height,re.depth),le&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,re.width,re.height,re.depth,se,Pe,re.data)):t.texImage3D(i.TEXTURE_3D,0,Ie,re.width,re.height,re.depth,0,se,Pe,re.data);else if(M.isFramebufferTexture){if(ue)if(O)t.texStorage2D(i.TEXTURE_2D,we,Ie,re.width,re.height);else{let ie=re.width,j=re.height;for(let Re=0;Re<we;Re++)t.texImage2D(i.TEXTURE_2D,Re,Ie,ie,j,0,se,Pe,null),ie>>=1,j>>=1}}else if(Je.length>0){if(O&&ue){const ie=De(Je[0]);t.texStorage2D(i.TEXTURE_2D,we,Ie,ie.width,ie.height)}for(let ie=0,j=Je.length;ie<j;ie++)Ee=Je[ie],O?le&&t.texSubImage2D(i.TEXTURE_2D,ie,0,0,se,Pe,Ee):t.texImage2D(i.TEXTURE_2D,ie,Ie,se,Pe,Ee);M.generateMipmaps=!1}else if(O){if(ue){const ie=De(re);t.texStorage2D(i.TEXTURE_2D,we,Ie,ie.width,ie.height)}le&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,se,Pe,re)}else t.texImage2D(i.TEXTURE_2D,0,Ie,se,Pe,re);_(M)&&p(J),Ae.__version=K.version,M.onUpdate&&M.onUpdate(M)}R.__version=M.version}function de(R,M,k){if(M.image.length!==6)return;const J=je(R,M),te=M.source;t.bindTexture(i.TEXTURE_CUBE_MAP,R.__webglTexture,i.TEXTURE0+k);const K=n.get(te);if(te.version!==K.__version||J===!0){t.activeTexture(i.TEXTURE0+k);const Ae=vt.getPrimaries(vt.workingColorSpace),he=M.colorSpace===si?null:vt.getPrimaries(M.colorSpace),Be=M.colorSpace===si||Ae===he?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,M.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,M.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Be);const ze=M.isCompressedTexture||M.image[0].isCompressedTexture,re=M.image[0]&&M.image[0].isDataTexture,se=[];for(let j=0;j<6;j++)!ze&&!re?se[j]=y(M.image[j],!0,r.maxCubemapSize):se[j]=re?M.image[j].image:M.image[j],se[j]=gt(M,se[j]);const Pe=se[0],Ie=s.convert(M.format,M.colorSpace),Ee=s.convert(M.type),Je=C(M.internalFormat,Ie,Ee,M.colorSpace),O=M.isVideoTexture!==!0,ue=K.__version===void 0||J===!0,le=te.dataReady;let we=D(M,Pe);be(i.TEXTURE_CUBE_MAP,M);let ie;if(ze){O&&ue&&t.texStorage2D(i.TEXTURE_CUBE_MAP,we,Je,Pe.width,Pe.height);for(let j=0;j<6;j++){ie=se[j].mipmaps;for(let Re=0;Re<ie.length;Re++){const Xe=ie[Re];M.format!==yn?Ie!==null?O?le&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,Re,0,0,Xe.width,Xe.height,Ie,Xe.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,Re,Je,Xe.width,Xe.height,0,Xe.data):Ye("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):O?le&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,Re,0,0,Xe.width,Xe.height,Ie,Ee,Xe.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,Re,Je,Xe.width,Xe.height,0,Ie,Ee,Xe.data)}}}else{if(ie=M.mipmaps,O&&ue){ie.length>0&&we++;const j=De(se[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,we,Je,j.width,j.height)}for(let j=0;j<6;j++)if(re){O?le&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,0,0,se[j].width,se[j].height,Ie,Ee,se[j].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,Je,se[j].width,se[j].height,0,Ie,Ee,se[j].data);for(let Re=0;Re<ie.length;Re++){const Et=ie[Re].image[j].image;O?le&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,Re+1,0,0,Et.width,Et.height,Ie,Ee,Et.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,Re+1,Je,Et.width,Et.height,0,Ie,Ee,Et.data)}}else{O?le&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,0,0,Ie,Ee,se[j]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,0,Je,Ie,Ee,se[j]);for(let Re=0;Re<ie.length;Re++){const Xe=ie[Re];O?le&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,Re+1,0,0,Ie,Ee,Xe.image[j]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+j,Re+1,Je,Ie,Ee,Xe.image[j])}}}_(M)&&p(i.TEXTURE_CUBE_MAP),K.__version=te.version,M.onUpdate&&M.onUpdate(M)}R.__version=M.version}function pe(R,M,k,J,te,K){const Ae=s.convert(k.format,k.colorSpace),he=s.convert(k.type),Be=C(k.internalFormat,Ae,he,k.colorSpace),ze=n.get(M),re=n.get(k);if(re.__renderTarget=M,!ze.__hasExternalTextures){const se=Math.max(1,M.width>>K),Pe=Math.max(1,M.height>>K);te===i.TEXTURE_3D||te===i.TEXTURE_2D_ARRAY?t.texImage3D(te,K,Be,se,Pe,M.depth,0,Ae,he,null):t.texImage2D(te,K,Be,se,Pe,0,Ae,he,null)}t.bindFramebuffer(i.FRAMEBUFFER,R),Pt(M)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,J,te,re.__webglTexture,0,L(M)):(te===i.TEXTURE_2D||te>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&te<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,J,te,re.__webglTexture,K),t.bindFramebuffer(i.FRAMEBUFFER,null)}function qe(R,M,k){if(i.bindRenderbuffer(i.RENDERBUFFER,R),M.depthBuffer){const J=M.depthTexture,te=J&&J.isDepthTexture?J.type:null,K=A(M.stencilBuffer,te),Ae=M.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;Pt(M)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,L(M),K,M.width,M.height):k?i.renderbufferStorageMultisample(i.RENDERBUFFER,L(M),K,M.width,M.height):i.renderbufferStorage(i.RENDERBUFFER,K,M.width,M.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,Ae,i.RENDERBUFFER,R)}else{const J=M.textures;for(let te=0;te<J.length;te++){const K=J[te],Ae=s.convert(K.format,K.colorSpace),he=s.convert(K.type),Be=C(K.internalFormat,Ae,he,K.colorSpace);Pt(M)?a.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,L(M),Be,M.width,M.height):k?i.renderbufferStorageMultisample(i.RENDERBUFFER,L(M),Be,M.width,M.height):i.renderbufferStorage(i.RENDERBUFFER,Be,M.width,M.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function ke(R,M,k){const J=M.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(i.FRAMEBUFFER,R),!(M.depthTexture&&M.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const te=n.get(M.depthTexture);if(te.__renderTarget=M,(!te.__webglTexture||M.depthTexture.image.width!==M.width||M.depthTexture.image.height!==M.height)&&(M.depthTexture.image.width=M.width,M.depthTexture.image.height=M.height,M.depthTexture.needsUpdate=!0),J){if(te.__webglInit===void 0&&(te.__webglInit=!0,M.depthTexture.addEventListener("dispose",P)),te.__webglTexture===void 0){te.__webglTexture=i.createTexture(),t.bindTexture(i.TEXTURE_CUBE_MAP,te.__webglTexture),be(i.TEXTURE_CUBE_MAP,M.depthTexture);const ze=s.convert(M.depthTexture.format),re=s.convert(M.depthTexture.type);let se;M.depthTexture.format===jn?se=i.DEPTH_COMPONENT24:M.depthTexture.format===bi&&(se=i.DEPTH24_STENCIL8);for(let Pe=0;Pe<6;Pe++)i.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Pe,0,se,M.width,M.height,0,ze,re,null)}}else X(M.depthTexture,0);const K=te.__webglTexture,Ae=L(M),he=J?i.TEXTURE_CUBE_MAP_POSITIVE_X+k:i.TEXTURE_2D,Be=M.depthTexture.format===bi?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(M.depthTexture.format===jn)Pt(M)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,Be,he,K,0,Ae):i.framebufferTexture2D(i.FRAMEBUFFER,Be,he,K,0);else if(M.depthTexture.format===bi)Pt(M)?a.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,Be,he,K,0,Ae):i.framebufferTexture2D(i.FRAMEBUFFER,Be,he,K,0);else throw new Error("Unknown depthTexture format")}function Ve(R){const M=n.get(R),k=R.isWebGLCubeRenderTarget===!0;if(M.__boundDepthTexture!==R.depthTexture){const J=R.depthTexture;if(M.__depthDisposeCallback&&M.__depthDisposeCallback(),J){const te=()=>{delete M.__boundDepthTexture,delete M.__depthDisposeCallback,J.removeEventListener("dispose",te)};J.addEventListener("dispose",te),M.__depthDisposeCallback=te}M.__boundDepthTexture=J}if(R.depthTexture&&!M.__autoAllocateDepthBuffer)if(k)for(let J=0;J<6;J++)ke(M.__webglFramebuffer[J],R,J);else{const J=R.texture.mipmaps;J&&J.length>0?ke(M.__webglFramebuffer[0],R,0):ke(M.__webglFramebuffer,R,0)}else if(k){M.__webglDepthbuffer=[];for(let J=0;J<6;J++)if(t.bindFramebuffer(i.FRAMEBUFFER,M.__webglFramebuffer[J]),M.__webglDepthbuffer[J]===void 0)M.__webglDepthbuffer[J]=i.createRenderbuffer(),qe(M.__webglDepthbuffer[J],R,!1);else{const te=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,K=M.__webglDepthbuffer[J];i.bindRenderbuffer(i.RENDERBUFFER,K),i.framebufferRenderbuffer(i.FRAMEBUFFER,te,i.RENDERBUFFER,K)}}else{const J=R.texture.mipmaps;if(J&&J.length>0?t.bindFramebuffer(i.FRAMEBUFFER,M.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,M.__webglFramebuffer),M.__webglDepthbuffer===void 0)M.__webglDepthbuffer=i.createRenderbuffer(),qe(M.__webglDepthbuffer,R,!1);else{const te=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,K=M.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,K),i.framebufferRenderbuffer(i.FRAMEBUFFER,te,i.RENDERBUFFER,K)}}t.bindFramebuffer(i.FRAMEBUFFER,null)}function Dt(R,M,k){const J=n.get(R);M!==void 0&&pe(J.__webglFramebuffer,R,R.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),k!==void 0&&Ve(R)}function Ge(R){const M=R.texture,k=n.get(R),J=n.get(M);R.addEventListener("dispose",U);const te=R.textures,K=R.isWebGLCubeRenderTarget===!0,Ae=te.length>1;if(Ae||(J.__webglTexture===void 0&&(J.__webglTexture=i.createTexture()),J.__version=M.version,o.memory.textures++),K){k.__webglFramebuffer=[];for(let he=0;he<6;he++)if(M.mipmaps&&M.mipmaps.length>0){k.__webglFramebuffer[he]=[];for(let Be=0;Be<M.mipmaps.length;Be++)k.__webglFramebuffer[he][Be]=i.createFramebuffer()}else k.__webglFramebuffer[he]=i.createFramebuffer()}else{if(M.mipmaps&&M.mipmaps.length>0){k.__webglFramebuffer=[];for(let he=0;he<M.mipmaps.length;he++)k.__webglFramebuffer[he]=i.createFramebuffer()}else k.__webglFramebuffer=i.createFramebuffer();if(Ae)for(let he=0,Be=te.length;he<Be;he++){const ze=n.get(te[he]);ze.__webglTexture===void 0&&(ze.__webglTexture=i.createTexture(),o.memory.textures++)}if(R.samples>0&&Pt(R)===!1){k.__webglMultisampledFramebuffer=i.createFramebuffer(),k.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,k.__webglMultisampledFramebuffer);for(let he=0;he<te.length;he++){const Be=te[he];k.__webglColorRenderbuffer[he]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,k.__webglColorRenderbuffer[he]);const ze=s.convert(Be.format,Be.colorSpace),re=s.convert(Be.type),se=C(Be.internalFormat,ze,re,Be.colorSpace,R.isXRRenderTarget===!0),Pe=L(R);i.renderbufferStorageMultisample(i.RENDERBUFFER,Pe,se,R.width,R.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+he,i.RENDERBUFFER,k.__webglColorRenderbuffer[he])}i.bindRenderbuffer(i.RENDERBUFFER,null),R.depthBuffer&&(k.__webglDepthRenderbuffer=i.createRenderbuffer(),qe(k.__webglDepthRenderbuffer,R,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(K){t.bindTexture(i.TEXTURE_CUBE_MAP,J.__webglTexture),be(i.TEXTURE_CUBE_MAP,M);for(let he=0;he<6;he++)if(M.mipmaps&&M.mipmaps.length>0)for(let Be=0;Be<M.mipmaps.length;Be++)pe(k.__webglFramebuffer[he][Be],R,M,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+he,Be);else pe(k.__webglFramebuffer[he],R,M,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+he,0);_(M)&&p(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Ae){for(let he=0,Be=te.length;he<Be;he++){const ze=te[he],re=n.get(ze);let se=i.TEXTURE_2D;(R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(se=R.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(se,re.__webglTexture),be(se,ze),pe(k.__webglFramebuffer,R,ze,i.COLOR_ATTACHMENT0+he,se,0),_(ze)&&p(se)}t.unbindTexture()}else{let he=i.TEXTURE_2D;if((R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(he=R.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(he,J.__webglTexture),be(he,M),M.mipmaps&&M.mipmaps.length>0)for(let Be=0;Be<M.mipmaps.length;Be++)pe(k.__webglFramebuffer[Be],R,M,i.COLOR_ATTACHMENT0,he,Be);else pe(k.__webglFramebuffer,R,M,i.COLOR_ATTACHMENT0,he,0);_(M)&&p(he),t.unbindTexture()}R.depthBuffer&&Ve(R)}function mt(R){const M=R.textures;for(let k=0,J=M.length;k<J;k++){const te=M[k];if(_(te)){const K=b(R),Ae=n.get(te).__webglTexture;t.bindTexture(K,Ae),p(K),t.unbindTexture()}}}const St=[],Ke=[];function wt(R){if(R.samples>0){if(Pt(R)===!1){const M=R.textures,k=R.width,J=R.height;let te=i.COLOR_BUFFER_BIT;const K=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Ae=n.get(R),he=M.length>1;if(he)for(let ze=0;ze<M.length;ze++)t.bindFramebuffer(i.FRAMEBUFFER,Ae.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ze,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,Ae.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+ze,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,Ae.__webglMultisampledFramebuffer);const Be=R.texture.mipmaps;Be&&Be.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Ae.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Ae.__webglFramebuffer);for(let ze=0;ze<M.length;ze++){if(R.resolveDepthBuffer&&(R.depthBuffer&&(te|=i.DEPTH_BUFFER_BIT),R.stencilBuffer&&R.resolveStencilBuffer&&(te|=i.STENCIL_BUFFER_BIT)),he){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Ae.__webglColorRenderbuffer[ze]);const re=n.get(M[ze]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,re,0)}i.blitFramebuffer(0,0,k,J,0,0,k,J,te,i.NEAREST),l===!0&&(St.length=0,Ke.length=0,St.push(i.COLOR_ATTACHMENT0+ze),R.depthBuffer&&R.resolveDepthBuffer===!1&&(St.push(K),Ke.push(K),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,Ke)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,St))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),he)for(let ze=0;ze<M.length;ze++){t.bindFramebuffer(i.FRAMEBUFFER,Ae.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ze,i.RENDERBUFFER,Ae.__webglColorRenderbuffer[ze]);const re=n.get(M[ze]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,Ae.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+ze,i.TEXTURE_2D,re,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Ae.__webglMultisampledFramebuffer)}else if(R.depthBuffer&&R.resolveDepthBuffer===!1&&l){const M=R.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[M])}}}function L(R){return Math.min(r.maxSamples,R.samples)}function Pt(R){const M=n.get(R);return R.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&M.__useRenderToTexture!==!1}function at(R){const M=o.render.frame;u.get(R)!==M&&(u.set(R,M),R.update())}function gt(R,M){const k=R.colorSpace,J=R.format,te=R.type;return R.isCompressedTexture===!0||R.isVideoTexture===!0||k!==Ji&&k!==si&&(vt.getTransfer(k)===yt?(J!==yn||te!==hn)&&Ye("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):_t("WebGLTextures: Unsupported texture color space:",k)),M}function De(R){return typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement?(c.width=R.naturalWidth||R.width,c.height=R.naturalHeight||R.height):typeof VideoFrame<"u"&&R instanceof VideoFrame?(c.width=R.displayWidth,c.height=R.displayHeight):(c.width=R.width,c.height=R.height),c}this.allocateTextureUnit=$,this.resetTextureUnits=W,this.setTexture2D=X,this.setTexture2DArray=Y,this.setTexture3D=H,this.setTextureCube=oe,this.rebindTextures=Dt,this.setupRenderTarget=Ge,this.updateRenderTargetMipmap=mt,this.updateMultisampleRenderTarget=wt,this.setupDepthRenderbuffer=Ve,this.setupFrameBufferTexture=pe,this.useMultisampledRTT=Pt,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function ug(i,e){function t(n,r=si){let s;const o=vt.getTransfer(r);if(n===hn)return i.UNSIGNED_BYTE;if(n===Pa)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Ia)return i.UNSIGNED_SHORT_5_5_5_1;if(n===bc)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===wc)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===Ec)return i.BYTE;if(n===Tc)return i.SHORT;if(n===Ar)return i.UNSIGNED_SHORT;if(n===Ca)return i.INT;if(n===Nn)return i.UNSIGNED_INT;if(n===Pn)return i.FLOAT;if(n===qn)return i.HALF_FLOAT;if(n===Ac)return i.ALPHA;if(n===Rc)return i.RGB;if(n===yn)return i.RGBA;if(n===jn)return i.DEPTH_COMPONENT;if(n===bi)return i.DEPTH_STENCIL;if(n===Cc)return i.RED;if(n===Da)return i.RED_INTEGER;if(n===Ki)return i.RG;if(n===La)return i.RG_INTEGER;if(n===Ua)return i.RGBA_INTEGER;if(n===us||n===fs||n===ds||n===ps)if(o===yt)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(n===us)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===fs)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===ds)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===ps)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(n===us)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===fs)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===ds)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===ps)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===zo||n===Ho||n===Go||n===Vo)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(n===zo)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Ho)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Go)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Vo)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Wo||n===Xo||n===$o||n===Yo||n===qo||n===jo||n===Zo)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(n===Wo||n===Xo)return o===yt?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(n===$o)return o===yt?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC;if(n===Yo)return s.COMPRESSED_R11_EAC;if(n===qo)return s.COMPRESSED_SIGNED_R11_EAC;if(n===jo)return s.COMPRESSED_RG11_EAC;if(n===Zo)return s.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===Ko||n===Jo||n===Qo||n===ea||n===ta||n===na||n===ia||n===ra||n===sa||n===oa||n===aa||n===la||n===ca||n===ha)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(n===Ko)return o===yt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Jo)return o===yt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Qo)return o===yt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===ea)return o===yt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===ta)return o===yt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===na)return o===yt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===ia)return o===yt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===ra)return o===yt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===sa)return o===yt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===oa)return o===yt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===aa)return o===yt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===la)return o===yt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===ca)return o===yt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===ha)return o===yt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===ua||n===fa||n===da)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(n===ua)return o===yt?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===fa)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===da)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===pa||n===ma||n===ga||n===_a)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(n===pa)return s.COMPRESSED_RED_RGTC1_EXT;if(n===ma)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===ga)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===_a)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Rr?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}const fg=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,dg=`
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

}`;class pg{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const n=new Bc(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new Bn({vertexShader:fg,fragmentShader:dg,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new ot(new Lr(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class mg extends ir{constructor(e,t){super();const n=this;let r=null,s=1,o=null,a="local-floor",l=1,c=null,u=null,d=null,f=null,v=null,x=null;const y=typeof XRWebGLBinding<"u",_=new pg,p={},b=t.getContextAttributes();let C=null,A=null;const D=[],P=[],U=new ct;let E=null;const w=new dn;w.viewport=new Nt;const Z=new dn;Z.viewport=new Nt;const I=[w,Z],W=new bu;let $=null,q=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Q){let de=D[Q];return de===void 0&&(de=new Qs,D[Q]=de),de.getTargetRaySpace()},this.getControllerGrip=function(Q){let de=D[Q];return de===void 0&&(de=new Qs,D[Q]=de),de.getGripSpace()},this.getHand=function(Q){let de=D[Q];return de===void 0&&(de=new Qs,D[Q]=de),de.getHandSpace()};function X(Q){const de=P.indexOf(Q.inputSource);if(de===-1)return;const pe=D[de];pe!==void 0&&(pe.update(Q.inputSource,Q.frame,c||o),pe.dispatchEvent({type:Q.type,data:Q.inputSource}))}function Y(){r.removeEventListener("select",X),r.removeEventListener("selectstart",X),r.removeEventListener("selectend",X),r.removeEventListener("squeeze",X),r.removeEventListener("squeezestart",X),r.removeEventListener("squeezeend",X),r.removeEventListener("end",Y),r.removeEventListener("inputsourceschange",H);for(let Q=0;Q<D.length;Q++){const de=P[Q];de!==null&&(P[Q]=null,D[Q].disconnect(de))}$=null,q=null,_.reset();for(const Q in p)delete p[Q];e.setRenderTarget(C),v=null,f=null,d=null,r=null,A=null,bt.stop(),n.isPresenting=!1,e.setPixelRatio(E),e.setSize(U.width,U.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Q){s=Q,n.isPresenting===!0&&Ye("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Q){a=Q,n.isPresenting===!0&&Ye("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(Q){c=Q},this.getBaseLayer=function(){return f!==null?f:v},this.getBinding=function(){return d===null&&y&&(d=new XRWebGLBinding(r,t)),d},this.getFrame=function(){return x},this.getSession=function(){return r},this.setSession=async function(Q){if(r=Q,r!==null){if(C=e.getRenderTarget(),r.addEventListener("select",X),r.addEventListener("selectstart",X),r.addEventListener("selectend",X),r.addEventListener("squeeze",X),r.addEventListener("squeezestart",X),r.addEventListener("squeezeend",X),r.addEventListener("end",Y),r.addEventListener("inputsourceschange",H),b.xrCompatible!==!0&&await t.makeXRCompatible(),E=e.getPixelRatio(),e.getSize(U),y&&"createProjectionLayer"in XRWebGLBinding.prototype){let pe=null,qe=null,ke=null;b.depth&&(ke=b.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,pe=b.stencil?bi:jn,qe=b.stencil?Rr:Nn);const Ve={colorFormat:t.RGBA8,depthFormat:ke,scaleFactor:s};d=this.getBinding(),f=d.createProjectionLayer(Ve),r.updateRenderState({layers:[f]}),e.setPixelRatio(1),e.setSize(f.textureWidth,f.textureHeight,!1),A=new Un(f.textureWidth,f.textureHeight,{format:yn,type:hn,depthTexture:new Pr(f.textureWidth,f.textureHeight,qe,void 0,void 0,void 0,void 0,void 0,void 0,pe),stencilBuffer:b.stencil,colorSpace:e.outputColorSpace,samples:b.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}else{const pe={antialias:b.antialias,alpha:!0,depth:b.depth,stencil:b.stencil,framebufferScaleFactor:s};v=new XRWebGLLayer(r,t,pe),r.updateRenderState({baseLayer:v}),e.setPixelRatio(1),e.setSize(v.framebufferWidth,v.framebufferHeight,!1),A=new Un(v.framebufferWidth,v.framebufferHeight,{format:yn,type:hn,colorSpace:e.outputColorSpace,stencilBuffer:b.stencil,resolveDepthBuffer:v.ignoreDepthValues===!1,resolveStencilBuffer:v.ignoreDepthValues===!1})}A.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await r.requestReferenceSpace(a),bt.setContext(r),bt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function H(Q){for(let de=0;de<Q.removed.length;de++){const pe=Q.removed[de],qe=P.indexOf(pe);qe>=0&&(P[qe]=null,D[qe].disconnect(pe))}for(let de=0;de<Q.added.length;de++){const pe=Q.added[de];let qe=P.indexOf(pe);if(qe===-1){for(let Ve=0;Ve<D.length;Ve++)if(Ve>=P.length){P.push(pe),qe=Ve;break}else if(P[Ve]===null){P[Ve]=pe,qe=Ve;break}if(qe===-1)break}const ke=D[qe];ke&&ke.connect(pe)}}const oe=new G,ne=new G;function Se(Q,de,pe){oe.setFromMatrixPosition(de.matrixWorld),ne.setFromMatrixPosition(pe.matrixWorld);const qe=oe.distanceTo(ne),ke=de.projectionMatrix.elements,Ve=pe.projectionMatrix.elements,Dt=ke[14]/(ke[10]-1),Ge=ke[14]/(ke[10]+1),mt=(ke[9]+1)/ke[5],St=(ke[9]-1)/ke[5],Ke=(ke[8]-1)/ke[0],wt=(Ve[8]+1)/Ve[0],L=Dt*Ke,Pt=Dt*wt,at=qe/(-Ke+wt),gt=at*-Ke;if(de.matrixWorld.decompose(Q.position,Q.quaternion,Q.scale),Q.translateX(gt),Q.translateZ(at),Q.matrixWorld.compose(Q.position,Q.quaternion,Q.scale),Q.matrixWorldInverse.copy(Q.matrixWorld).invert(),ke[10]===-1)Q.projectionMatrix.copy(de.projectionMatrix),Q.projectionMatrixInverse.copy(de.projectionMatrixInverse);else{const De=Dt+at,R=Ge+at,M=L-gt,k=Pt+(qe-gt),J=mt*Ge/R*De,te=St*Ge/R*De;Q.projectionMatrix.makePerspective(M,k,J,te,De,R),Q.projectionMatrixInverse.copy(Q.projectionMatrix).invert()}}function Te(Q,de){de===null?Q.matrixWorld.copy(Q.matrix):Q.matrixWorld.multiplyMatrices(de.matrixWorld,Q.matrix),Q.matrixWorldInverse.copy(Q.matrixWorld).invert()}this.updateCamera=function(Q){if(r===null)return;let de=Q.near,pe=Q.far;_.texture!==null&&(_.depthNear>0&&(de=_.depthNear),_.depthFar>0&&(pe=_.depthFar)),W.near=Z.near=w.near=de,W.far=Z.far=w.far=pe,($!==W.near||q!==W.far)&&(r.updateRenderState({depthNear:W.near,depthFar:W.far}),$=W.near,q=W.far),W.layers.mask=Q.layers.mask|6,w.layers.mask=W.layers.mask&-5,Z.layers.mask=W.layers.mask&-3;const qe=Q.parent,ke=W.cameras;Te(W,qe);for(let Ve=0;Ve<ke.length;Ve++)Te(ke[Ve],qe);ke.length===2?Se(W,w,Z):W.projectionMatrix.copy(w.projectionMatrix),be(Q,W,qe)};function be(Q,de,pe){pe===null?Q.matrix.copy(de.matrixWorld):(Q.matrix.copy(pe.matrixWorld),Q.matrix.invert(),Q.matrix.multiply(de.matrixWorld)),Q.matrix.decompose(Q.position,Q.quaternion,Q.scale),Q.updateMatrixWorld(!0),Q.projectionMatrix.copy(de.projectionMatrix),Q.projectionMatrixInverse.copy(de.projectionMatrixInverse),Q.isPerspectiveCamera&&(Q.fov=va*2*Math.atan(1/Q.projectionMatrix.elements[5]),Q.zoom=1)}this.getCamera=function(){return W},this.getFoveation=function(){if(!(f===null&&v===null))return l},this.setFoveation=function(Q){l=Q,f!==null&&(f.fixedFoveation=Q),v!==null&&v.fixedFoveation!==void 0&&(v.fixedFoveation=Q)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(W)},this.getCameraTexture=function(Q){return p[Q]};let je=null;function Rt(Q,de){if(u=de.getViewerPose(c||o),x=de,u!==null){const pe=u.views;v!==null&&(e.setRenderTargetFramebuffer(A,v.framebuffer),e.setRenderTarget(A));let qe=!1;pe.length!==W.cameras.length&&(W.cameras.length=0,qe=!0);for(let Ge=0;Ge<pe.length;Ge++){const mt=pe[Ge];let St=null;if(v!==null)St=v.getViewport(mt);else{const wt=d.getViewSubImage(f,mt);St=wt.viewport,Ge===0&&(e.setRenderTargetTextures(A,wt.colorTexture,wt.depthStencilTexture),e.setRenderTarget(A))}let Ke=I[Ge];Ke===void 0&&(Ke=new dn,Ke.layers.enable(Ge),Ke.viewport=new Nt,I[Ge]=Ke),Ke.matrix.fromArray(mt.transform.matrix),Ke.matrix.decompose(Ke.position,Ke.quaternion,Ke.scale),Ke.projectionMatrix.fromArray(mt.projectionMatrix),Ke.projectionMatrixInverse.copy(Ke.projectionMatrix).invert(),Ke.viewport.set(St.x,St.y,St.width,St.height),Ge===0&&(W.matrix.copy(Ke.matrix),W.matrix.decompose(W.position,W.quaternion,W.scale)),qe===!0&&W.cameras.push(Ke)}const ke=r.enabledFeatures;if(ke&&ke.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&y){d=n.getBinding();const Ge=d.getDepthInformation(pe[0]);Ge&&Ge.isValid&&Ge.texture&&_.init(Ge,r.renderState)}if(ke&&ke.includes("camera-access")&&y){e.state.unbindTexture(),d=n.getBinding();for(let Ge=0;Ge<pe.length;Ge++){const mt=pe[Ge].camera;if(mt){let St=p[mt];St||(St=new Bc,p[mt]=St);const Ke=d.getCameraImage(mt);St.sourceTexture=Ke}}}}for(let pe=0;pe<D.length;pe++){const qe=P[pe],ke=D[pe];qe!==null&&ke!==void 0&&ke.update(qe,de,c||o)}je&&je(Q,de),de.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:de}),x=null}const bt=new Hc;bt.setAnimationLoop(Rt),this.setAnimationLoop=function(Q){je=Q},this.dispose=function(){}}}const gi=new Fn,gg=new It;function _g(i,e){function t(_,p){_.matrixAutoUpdate===!0&&_.updateMatrix(),p.value.copy(_.matrix)}function n(_,p){p.color.getRGB(_.fogColor.value,kc(i)),p.isFog?(_.fogNear.value=p.near,_.fogFar.value=p.far):p.isFogExp2&&(_.fogDensity.value=p.density)}function r(_,p,b,C,A){p.isMeshBasicMaterial?s(_,p):p.isMeshLambertMaterial?(s(_,p),p.envMap&&(_.envMapIntensity.value=p.envMapIntensity)):p.isMeshToonMaterial?(s(_,p),d(_,p)):p.isMeshPhongMaterial?(s(_,p),u(_,p),p.envMap&&(_.envMapIntensity.value=p.envMapIntensity)):p.isMeshStandardMaterial?(s(_,p),f(_,p),p.isMeshPhysicalMaterial&&v(_,p,A)):p.isMeshMatcapMaterial?(s(_,p),x(_,p)):p.isMeshDepthMaterial?s(_,p):p.isMeshDistanceMaterial?(s(_,p),y(_,p)):p.isMeshNormalMaterial?s(_,p):p.isLineBasicMaterial?(o(_,p),p.isLineDashedMaterial&&a(_,p)):p.isPointsMaterial?l(_,p,b,C):p.isSpriteMaterial?c(_,p):p.isShadowMaterial?(_.color.value.copy(p.color),_.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function s(_,p){_.opacity.value=p.opacity,p.color&&_.diffuse.value.copy(p.color),p.emissive&&_.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(_.map.value=p.map,t(p.map,_.mapTransform)),p.alphaMap&&(_.alphaMap.value=p.alphaMap,t(p.alphaMap,_.alphaMapTransform)),p.bumpMap&&(_.bumpMap.value=p.bumpMap,t(p.bumpMap,_.bumpMapTransform),_.bumpScale.value=p.bumpScale,p.side===rn&&(_.bumpScale.value*=-1)),p.normalMap&&(_.normalMap.value=p.normalMap,t(p.normalMap,_.normalMapTransform),_.normalScale.value.copy(p.normalScale),p.side===rn&&_.normalScale.value.negate()),p.displacementMap&&(_.displacementMap.value=p.displacementMap,t(p.displacementMap,_.displacementMapTransform),_.displacementScale.value=p.displacementScale,_.displacementBias.value=p.displacementBias),p.emissiveMap&&(_.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,_.emissiveMapTransform)),p.specularMap&&(_.specularMap.value=p.specularMap,t(p.specularMap,_.specularMapTransform)),p.alphaTest>0&&(_.alphaTest.value=p.alphaTest);const b=e.get(p),C=b.envMap,A=b.envMapRotation;C&&(_.envMap.value=C,gi.copy(A),gi.x*=-1,gi.y*=-1,gi.z*=-1,C.isCubeTexture&&C.isRenderTargetTexture===!1&&(gi.y*=-1,gi.z*=-1),_.envMapRotation.value.setFromMatrix4(gg.makeRotationFromEuler(gi)),_.flipEnvMap.value=C.isCubeTexture&&C.isRenderTargetTexture===!1?-1:1,_.reflectivity.value=p.reflectivity,_.ior.value=p.ior,_.refractionRatio.value=p.refractionRatio),p.lightMap&&(_.lightMap.value=p.lightMap,_.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,_.lightMapTransform)),p.aoMap&&(_.aoMap.value=p.aoMap,_.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,_.aoMapTransform))}function o(_,p){_.diffuse.value.copy(p.color),_.opacity.value=p.opacity,p.map&&(_.map.value=p.map,t(p.map,_.mapTransform))}function a(_,p){_.dashSize.value=p.dashSize,_.totalSize.value=p.dashSize+p.gapSize,_.scale.value=p.scale}function l(_,p,b,C){_.diffuse.value.copy(p.color),_.opacity.value=p.opacity,_.size.value=p.size*b,_.scale.value=C*.5,p.map&&(_.map.value=p.map,t(p.map,_.uvTransform)),p.alphaMap&&(_.alphaMap.value=p.alphaMap,t(p.alphaMap,_.alphaMapTransform)),p.alphaTest>0&&(_.alphaTest.value=p.alphaTest)}function c(_,p){_.diffuse.value.copy(p.color),_.opacity.value=p.opacity,_.rotation.value=p.rotation,p.map&&(_.map.value=p.map,t(p.map,_.mapTransform)),p.alphaMap&&(_.alphaMap.value=p.alphaMap,t(p.alphaMap,_.alphaMapTransform)),p.alphaTest>0&&(_.alphaTest.value=p.alphaTest)}function u(_,p){_.specular.value.copy(p.specular),_.shininess.value=Math.max(p.shininess,1e-4)}function d(_,p){p.gradientMap&&(_.gradientMap.value=p.gradientMap)}function f(_,p){_.metalness.value=p.metalness,p.metalnessMap&&(_.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,_.metalnessMapTransform)),_.roughness.value=p.roughness,p.roughnessMap&&(_.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,_.roughnessMapTransform)),p.envMap&&(_.envMapIntensity.value=p.envMapIntensity)}function v(_,p,b){_.ior.value=p.ior,p.sheen>0&&(_.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),_.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(_.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,_.sheenColorMapTransform)),p.sheenRoughnessMap&&(_.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,_.sheenRoughnessMapTransform))),p.clearcoat>0&&(_.clearcoat.value=p.clearcoat,_.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(_.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,_.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(_.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,_.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(_.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,_.clearcoatNormalMapTransform),_.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===rn&&_.clearcoatNormalScale.value.negate())),p.dispersion>0&&(_.dispersion.value=p.dispersion),p.iridescence>0&&(_.iridescence.value=p.iridescence,_.iridescenceIOR.value=p.iridescenceIOR,_.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],_.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(_.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,_.iridescenceMapTransform)),p.iridescenceThicknessMap&&(_.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,_.iridescenceThicknessMapTransform))),p.transmission>0&&(_.transmission.value=p.transmission,_.transmissionSamplerMap.value=b.texture,_.transmissionSamplerSize.value.set(b.width,b.height),p.transmissionMap&&(_.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,_.transmissionMapTransform)),_.thickness.value=p.thickness,p.thicknessMap&&(_.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,_.thicknessMapTransform)),_.attenuationDistance.value=p.attenuationDistance,_.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(_.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(_.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,_.anisotropyMapTransform))),_.specularIntensity.value=p.specularIntensity,_.specularColor.value.copy(p.specularColor),p.specularColorMap&&(_.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,_.specularColorMapTransform)),p.specularIntensityMap&&(_.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,_.specularIntensityMapTransform))}function x(_,p){p.matcap&&(_.matcap.value=p.matcap)}function y(_,p){const b=e.get(p).light;_.referencePosition.value.setFromMatrixPosition(b.matrixWorld),_.nearDistance.value=b.shadow.camera.near,_.farDistance.value=b.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:r}}function vg(i,e,t,n){let r={},s={},o=[];const a=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(b,C){const A=C.program;n.uniformBlockBinding(b,A)}function c(b,C){let A=r[b.id];A===void 0&&(x(b),A=u(b),r[b.id]=A,b.addEventListener("dispose",_));const D=C.program;n.updateUBOMapping(b,D);const P=e.render.frame;s[b.id]!==P&&(f(b),s[b.id]=P)}function u(b){const C=d();b.__bindingPointIndex=C;const A=i.createBuffer(),D=b.__size,P=b.usage;return i.bindBuffer(i.UNIFORM_BUFFER,A),i.bufferData(i.UNIFORM_BUFFER,D,P),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,C,A),A}function d(){for(let b=0;b<a;b++)if(o.indexOf(b)===-1)return o.push(b),b;return _t("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(b){const C=r[b.id],A=b.uniforms,D=b.__cache;i.bindBuffer(i.UNIFORM_BUFFER,C);for(let P=0,U=A.length;P<U;P++){const E=Array.isArray(A[P])?A[P]:[A[P]];for(let w=0,Z=E.length;w<Z;w++){const I=E[w];if(v(I,P,w,D)===!0){const W=I.__offset,$=Array.isArray(I.value)?I.value:[I.value];let q=0;for(let X=0;X<$.length;X++){const Y=$[X],H=y(Y);typeof Y=="number"||typeof Y=="boolean"?(I.__data[0]=Y,i.bufferSubData(i.UNIFORM_BUFFER,W+q,I.__data)):Y.isMatrix3?(I.__data[0]=Y.elements[0],I.__data[1]=Y.elements[1],I.__data[2]=Y.elements[2],I.__data[3]=0,I.__data[4]=Y.elements[3],I.__data[5]=Y.elements[4],I.__data[6]=Y.elements[5],I.__data[7]=0,I.__data[8]=Y.elements[6],I.__data[9]=Y.elements[7],I.__data[10]=Y.elements[8],I.__data[11]=0):(Y.toArray(I.__data,q),q+=H.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,W,I.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function v(b,C,A,D){const P=b.value,U=C+"_"+A;if(D[U]===void 0)return typeof P=="number"||typeof P=="boolean"?D[U]=P:D[U]=P.clone(),!0;{const E=D[U];if(typeof P=="number"||typeof P=="boolean"){if(E!==P)return D[U]=P,!0}else if(E.equals(P)===!1)return E.copy(P),!0}return!1}function x(b){const C=b.uniforms;let A=0;const D=16;for(let U=0,E=C.length;U<E;U++){const w=Array.isArray(C[U])?C[U]:[C[U]];for(let Z=0,I=w.length;Z<I;Z++){const W=w[Z],$=Array.isArray(W.value)?W.value:[W.value];for(let q=0,X=$.length;q<X;q++){const Y=$[q],H=y(Y),oe=A%D,ne=oe%H.boundary,Se=oe+ne;A+=ne,Se!==0&&D-Se<H.storage&&(A+=D-Se),W.__data=new Float32Array(H.storage/Float32Array.BYTES_PER_ELEMENT),W.__offset=A,A+=H.storage}}}const P=A%D;return P>0&&(A+=D-P),b.__size=A,b.__cache={},this}function y(b){const C={boundary:0,storage:0};return typeof b=="number"||typeof b=="boolean"?(C.boundary=4,C.storage=4):b.isVector2?(C.boundary=8,C.storage=8):b.isVector3||b.isColor?(C.boundary=16,C.storage=12):b.isVector4?(C.boundary=16,C.storage=16):b.isMatrix3?(C.boundary=48,C.storage=48):b.isMatrix4?(C.boundary=64,C.storage=64):b.isTexture?Ye("WebGLRenderer: Texture samplers can not be part of an uniforms group."):Ye("WebGLRenderer: Unsupported uniform value type.",b),C}function _(b){const C=b.target;C.removeEventListener("dispose",_);const A=o.indexOf(C.__bindingPointIndex);o.splice(A,1),i.deleteBuffer(r[C.id]),delete r[C.id],delete s[C.id]}function p(){for(const b in r)i.deleteBuffer(r[b]);o=[],r={},s={}}return{bind:l,update:c,dispose:p}}const xg=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let wn=null;function Mg(){return wn===null&&(wn=new ou(xg,16,16,Ki,qn),wn.name="DFG_LUT",wn.minFilter=Vt,wn.magFilter=Vt,wn.wrapS=Xn,wn.wrapT=Xn,wn.generateMipmaps=!1,wn.needsUpdate=!0),wn}class Sg{constructor(e={}){const{canvas:t=Fh(),context:n=null,depth:r=!0,stencil:s=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:f=!1,outputBufferType:v=hn}=e;this.isWebGLRenderer=!0;let x;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");x=n.getContextAttributes().alpha}else x=o;const y=v,_=new Set([Ua,La,Da]),p=new Set([hn,Nn,Ar,Rr,Pa,Ia]),b=new Uint32Array(4),C=new Int32Array(4);let A=null,D=null;const P=[],U=[];let E=null;this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Ln,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const w=this;let Z=!1;this._outputColorSpace=Jt;let I=0,W=0,$=null,q=-1,X=null;const Y=new Nt,H=new Nt;let oe=null;const ne=new pt(0);let Se=0,Te=t.width,be=t.height,je=1,Rt=null,bt=null;const Q=new Nt(0,0,Te,be),de=new Nt(0,0,Te,be);let pe=!1;const qe=new za;let ke=!1,Ve=!1;const Dt=new It,Ge=new G,mt=new Nt,St={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Ke=!1;function wt(){return $===null?je:1}let L=n;function Pt(S,N){return t.getContext(S,N)}try{const S={alpha:!0,depth:r,stencil:s,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Aa}`),t.addEventListener("webglcontextlost",Re,!1),t.addEventListener("webglcontextrestored",Xe,!1),t.addEventListener("webglcontextcreationerror",Et,!1),L===null){const N="webgl2";if(L=Pt(N,S),L===null)throw Pt(N)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(S){throw _t("WebGLRenderer: "+S.message),S}let at,gt,De,R,M,k,J,te,K,Ae,he,Be,ze,re,se,Pe,Ie,Ee,Je,O,ue,le,we;function ie(){at=new Sp(L),at.init(),ue=new ug(L,at),gt=new dp(L,at,e,ue),De=new cg(L,at),gt.reversedDepthBuffer&&f&&De.buffers.depth.setReversed(!0),R=new Tp(L),M=new jm,k=new hg(L,at,De,M,gt,ue,R),J=new Mp(w),te=new Ru(L),le=new up(L,te),K=new yp(L,te,R,le),Ae=new wp(L,K,te,le,R),Ee=new bp(L,gt,k),se=new pp(M),he=new qm(w,J,at,gt,le,se),Be=new _g(w,M),ze=new Km,re=new ig(at),Ie=new hp(w,J,De,Ae,x,l),Pe=new lg(w,Ae,gt),we=new vg(L,R,gt,De),Je=new fp(L,at,R),O=new Ep(L,at,R),R.programs=he.programs,w.capabilities=gt,w.extensions=at,w.properties=M,w.renderLists=ze,w.shadowMap=Pe,w.state=De,w.info=R}ie(),y!==hn&&(E=new Rp(y,t.width,t.height,r,s));const j=new mg(w,L);this.xr=j,this.getContext=function(){return L},this.getContextAttributes=function(){return L.getContextAttributes()},this.forceContextLoss=function(){const S=at.get("WEBGL_lose_context");S&&S.loseContext()},this.forceContextRestore=function(){const S=at.get("WEBGL_lose_context");S&&S.restoreContext()},this.getPixelRatio=function(){return je},this.setPixelRatio=function(S){S!==void 0&&(je=S,this.setSize(Te,be,!1))},this.getSize=function(S){return S.set(Te,be)},this.setSize=function(S,N,V=!0){if(j.isPresenting){Ye("WebGLRenderer: Can't change size while VR device is presenting.");return}Te=S,be=N,t.width=Math.floor(S*je),t.height=Math.floor(N*je),V===!0&&(t.style.width=S+"px",t.style.height=N+"px"),E!==null&&E.setSize(t.width,t.height),this.setViewport(0,0,S,N)},this.getDrawingBufferSize=function(S){return S.set(Te*je,be*je).floor()},this.setDrawingBufferSize=function(S,N,V){Te=S,be=N,je=V,t.width=Math.floor(S*V),t.height=Math.floor(N*V),this.setViewport(0,0,S,N)},this.setEffects=function(S){if(y===hn){console.error("THREE.WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(S){for(let N=0;N<S.length;N++)if(S[N].isOutputPass===!0){console.warn("THREE.WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}E.setEffects(S||[])},this.getCurrentViewport=function(S){return S.copy(Y)},this.getViewport=function(S){return S.copy(Q)},this.setViewport=function(S,N,V,F){S.isVector4?Q.set(S.x,S.y,S.z,S.w):Q.set(S,N,V,F),De.viewport(Y.copy(Q).multiplyScalar(je).round())},this.getScissor=function(S){return S.copy(de)},this.setScissor=function(S,N,V,F){S.isVector4?de.set(S.x,S.y,S.z,S.w):de.set(S,N,V,F),De.scissor(H.copy(de).multiplyScalar(je).round())},this.getScissorTest=function(){return pe},this.setScissorTest=function(S){De.setScissorTest(pe=S)},this.setOpaqueSort=function(S){Rt=S},this.setTransparentSort=function(S){bt=S},this.getClearColor=function(S){return S.copy(Ie.getClearColor())},this.setClearColor=function(){Ie.setClearColor(...arguments)},this.getClearAlpha=function(){return Ie.getClearAlpha()},this.setClearAlpha=function(){Ie.setClearAlpha(...arguments)},this.clear=function(S=!0,N=!0,V=!0){let F=0;if(S){let B=!1;if($!==null){const me=$.texture.format;B=_.has(me)}if(B){const me=$.texture.type,xe=p.has(me),fe=Ie.getClearColor(),ge=Ie.getClearAlpha(),ve=fe.r,We=fe.g,He=fe.b;xe?(b[0]=ve,b[1]=We,b[2]=He,b[3]=ge,L.clearBufferuiv(L.COLOR,0,b)):(C[0]=ve,C[1]=We,C[2]=He,C[3]=ge,L.clearBufferiv(L.COLOR,0,C))}else F|=L.COLOR_BUFFER_BIT}N&&(F|=L.DEPTH_BUFFER_BIT),V&&(F|=L.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),F!==0&&L.clear(F)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",Re,!1),t.removeEventListener("webglcontextrestored",Xe,!1),t.removeEventListener("webglcontextcreationerror",Et,!1),Ie.dispose(),ze.dispose(),re.dispose(),M.dispose(),J.dispose(),Ae.dispose(),le.dispose(),we.dispose(),he.dispose(),j.dispose(),j.removeEventListener("sessionstart",g),j.removeEventListener("sessionend",h),m.stop()};function Re(S){S.preventDefault(),rl("WebGLRenderer: Context Lost."),Z=!0}function Xe(){rl("WebGLRenderer: Context Restored."),Z=!1;const S=R.autoReset,N=Pe.enabled,V=Pe.autoUpdate,F=Pe.needsUpdate,B=Pe.type;ie(),R.autoReset=S,Pe.enabled=N,Pe.autoUpdate=V,Pe.needsUpdate=F,Pe.type=B}function Et(S){_t("WebGLRenderer: A WebGL context could not be created. Reason: ",S.statusMessage)}function Qe(S){const N=S.target;N.removeEventListener("dispose",Qe),gn(N)}function gn(S){Xt(S),M.remove(S)}function Xt(S){const N=M.get(S).programs;N!==void 0&&(N.forEach(function(V){he.releaseProgram(V)}),S.isShaderMaterial&&he.releaseShaderCache(S))}this.renderBufferDirect=function(S,N,V,F,B,me){N===null&&(N=St);const xe=B.isMesh&&B.matrixWorld.determinant()<0,fe=st(S,N,V,F,B);De.setMaterial(F,xe);let ge=V.index,ve=1;if(F.wireframe===!0){if(ge=K.getWireframeAttribute(V),ge===void 0)return;ve=2}const We=V.drawRange,He=V.attributes.position;let Ue=We.start*ve,lt=(We.start+We.count)*ve;me!==null&&(Ue=Math.max(Ue,me.start*ve),lt=Math.min(lt,(me.start+me.count)*ve)),ge!==null?(Ue=Math.max(Ue,0),lt=Math.min(lt,ge.count)):He!=null&&(Ue=Math.max(Ue,0),lt=Math.min(lt,He.count));const Ct=lt-Ue;if(Ct<0||Ct===1/0)return;le.setup(B,F,fe,V,ge);let Ut,Tt=Je;if(ge!==null&&(Ut=te.get(ge),Tt=O,Tt.setIndex(Ut)),B.isMesh)F.wireframe===!0?(De.setLineWidth(F.wireframeLinewidth*wt()),Tt.setMode(L.LINES)):Tt.setMode(L.TRIANGLES);else if(B.isLine){let qt=F.linewidth;qt===void 0&&(qt=1),De.setLineWidth(qt*wt()),B.isLineSegments?Tt.setMode(L.LINES):B.isLineLoop?Tt.setMode(L.LINE_LOOP):Tt.setMode(L.LINE_STRIP)}else B.isPoints?Tt.setMode(L.POINTS):B.isSprite&&Tt.setMode(L.TRIANGLES);if(B.isBatchedMesh)if(B._multiDrawInstances!==null)ys("WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),Tt.renderMultiDrawInstances(B._multiDrawStarts,B._multiDrawCounts,B._multiDrawCount,B._multiDrawInstances);else if(at.get("WEBGL_multi_draw"))Tt.renderMultiDraw(B._multiDrawStarts,B._multiDrawCounts,B._multiDrawCount);else{const qt=B._multiDrawStarts,Oe=B._multiDrawCounts,sn=B._multiDrawCount,xt=ge?te.get(ge).bytesPerElement:1,_n=M.get(F).currentProgram.getUniforms();for(let Tn=0;Tn<sn;Tn++)_n.setValue(L,"_gl_DrawID",Tn),Tt.render(qt[Tn]/xt,Oe[Tn])}else if(B.isInstancedMesh)Tt.renderInstances(Ue,Ct,B.count);else if(V.isInstancedBufferGeometry){const qt=V._maxInstanceCount!==void 0?V._maxInstanceCount:1/0,Oe=Math.min(V.instanceCount,qt);Tt.renderInstances(Ue,Ct,Oe)}else Tt.render(Ue,Ct)};function Ci(S,N,V){S.transparent===!0&&S.side===pn&&S.forceSinglePass===!1?(S.side=rn,S.needsUpdate=!0,tt(S,N,V),S.side=li,S.needsUpdate=!0,tt(S,N,V),S.side=pn):tt(S,N,V)}this.compile=function(S,N,V=null){V===null&&(V=S),D=re.get(V),D.init(N),U.push(D),V.traverseVisible(function(B){B.isLight&&B.layers.test(N.layers)&&(D.pushLight(B),B.castShadow&&D.pushShadow(B))}),S!==V&&S.traverseVisible(function(B){B.isLight&&B.layers.test(N.layers)&&(D.pushLight(B),B.castShadow&&D.pushShadow(B))}),D.setupLights();const F=new Set;return S.traverse(function(B){if(!(B.isMesh||B.isPoints||B.isLine||B.isSprite))return;const me=B.material;if(me)if(Array.isArray(me))for(let xe=0;xe<me.length;xe++){const fe=me[xe];Ci(fe,V,B),F.add(fe)}else Ci(me,V,B),F.add(me)}),D=U.pop(),F},this.compileAsync=function(S,N,V=null){const F=this.compile(S,N,V);return new Promise(B=>{function me(){if(F.forEach(function(xe){M.get(xe).currentProgram.isReady()&&F.delete(xe)}),F.size===0){B(S);return}setTimeout(me,10)}at.get("KHR_parallel_shader_compile")!==null?me():setTimeout(me,10)})};let ci=null;function Gs(S){ci&&ci(S)}function g(){m.stop()}function h(){m.start()}const m=new Hc;m.setAnimationLoop(Gs),typeof self<"u"&&m.setContext(self),this.setAnimationLoop=function(S){ci=S,j.setAnimationLoop(S),S===null?m.stop():m.start()},j.addEventListener("sessionstart",g),j.addEventListener("sessionend",h),this.render=function(S,N){if(N!==void 0&&N.isCamera!==!0){_t("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(Z===!0)return;const V=j.enabled===!0&&j.isPresenting===!0,F=E!==null&&($===null||V)&&E.begin(w,$);if(S.matrixWorldAutoUpdate===!0&&S.updateMatrixWorld(),N.parent===null&&N.matrixWorldAutoUpdate===!0&&N.updateMatrixWorld(),j.enabled===!0&&j.isPresenting===!0&&(E===null||E.isCompositing()===!1)&&(j.cameraAutoUpdate===!0&&j.updateCamera(N),N=j.getCamera()),S.isScene===!0&&S.onBeforeRender(w,S,N,$),D=re.get(S,U.length),D.init(N),U.push(D),Dt.multiplyMatrices(N.projectionMatrix,N.matrixWorldInverse),qe.setFromProjectionMatrix(Dt,In,N.reversedDepth),Ve=this.localClippingEnabled,ke=se.init(this.clippingPlanes,Ve),A=ze.get(S,P.length),A.init(),P.push(A),j.enabled===!0&&j.isPresenting===!0){const xe=w.xr.getDepthSensingMesh();xe!==null&&T(xe,N,-1/0,w.sortObjects)}T(S,N,0,w.sortObjects),A.finish(),w.sortObjects===!0&&A.sort(Rt,bt),Ke=j.enabled===!1||j.isPresenting===!1||j.hasDepthSensing()===!1,Ke&&Ie.addToRenderList(A,S),this.info.render.frame++,ke===!0&&se.beginShadows();const B=D.state.shadowsArray;if(Pe.render(B,S,N),ke===!0&&se.endShadows(),this.info.autoReset===!0&&this.info.reset(),(F&&E.hasRenderPass())===!1){const xe=A.opaque,fe=A.transmissive;if(D.setupLights(),N.isArrayCamera){const ge=N.cameras;if(fe.length>0)for(let ve=0,We=ge.length;ve<We;ve++){const He=ge[ve];ee(xe,fe,S,He)}Ke&&Ie.render(S);for(let ve=0,We=ge.length;ve<We;ve++){const He=ge[ve];z(A,S,He,He.viewport)}}else fe.length>0&&ee(xe,fe,S,N),Ke&&Ie.render(S),z(A,S,N)}$!==null&&W===0&&(k.updateMultisampleRenderTarget($),k.updateRenderTargetMipmap($)),F&&E.end(w),S.isScene===!0&&S.onAfterRender(w,S,N),le.resetDefaultState(),q=-1,X=null,U.pop(),U.length>0?(D=U[U.length-1],ke===!0&&se.setGlobalState(w.clippingPlanes,D.state.camera)):D=null,P.pop(),P.length>0?A=P[P.length-1]:A=null};function T(S,N,V,F){if(S.visible===!1)return;if(S.layers.test(N.layers)){if(S.isGroup)V=S.renderOrder;else if(S.isLOD)S.autoUpdate===!0&&S.update(N);else if(S.isLight)D.pushLight(S),S.castShadow&&D.pushShadow(S);else if(S.isSprite){if(!S.frustumCulled||qe.intersectsSprite(S)){F&&mt.setFromMatrixPosition(S.matrixWorld).applyMatrix4(Dt);const xe=Ae.update(S),fe=S.material;fe.visible&&A.push(S,xe,fe,V,mt.z,null)}}else if((S.isMesh||S.isLine||S.isPoints)&&(!S.frustumCulled||qe.intersectsObject(S))){const xe=Ae.update(S),fe=S.material;if(F&&(S.boundingSphere!==void 0?(S.boundingSphere===null&&S.computeBoundingSphere(),mt.copy(S.boundingSphere.center)):(xe.boundingSphere===null&&xe.computeBoundingSphere(),mt.copy(xe.boundingSphere.center)),mt.applyMatrix4(S.matrixWorld).applyMatrix4(Dt)),Array.isArray(fe)){const ge=xe.groups;for(let ve=0,We=ge.length;ve<We;ve++){const He=ge[ve],Ue=fe[He.materialIndex];Ue&&Ue.visible&&A.push(S,xe,Ue,V,mt.z,He)}}else fe.visible&&A.push(S,xe,fe,V,mt.z,null)}}const me=S.children;for(let xe=0,fe=me.length;xe<fe;xe++)T(me[xe],N,V,F)}function z(S,N,V,F){const{opaque:B,transmissive:me,transparent:xe}=S;D.setupLightsView(V),ke===!0&&se.setGlobalState(w.clippingPlanes,V),F&&De.viewport(Y.copy(F)),B.length>0&&Le(B,N,V),me.length>0&&Le(me,N,V),xe.length>0&&Le(xe,N,V),De.buffers.depth.setTest(!0),De.buffers.depth.setMask(!0),De.buffers.color.setMask(!0),De.setPolygonOffset(!1)}function ee(S,N,V,F){if((V.isScene===!0?V.overrideMaterial:null)!==null)return;if(D.state.transmissionRenderTarget[F.id]===void 0){const Ue=at.has("EXT_color_buffer_half_float")||at.has("EXT_color_buffer_float");D.state.transmissionRenderTarget[F.id]=new Un(1,1,{generateMipmaps:!0,type:Ue?qn:hn,minFilter:Ti,samples:Math.max(4,gt.samples),stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:vt.workingColorSpace})}const me=D.state.transmissionRenderTarget[F.id],xe=F.viewport||Y;me.setSize(xe.z*w.transmissionResolutionScale,xe.w*w.transmissionResolutionScale);const fe=w.getRenderTarget(),ge=w.getActiveCubeFace(),ve=w.getActiveMipmapLevel();w.setRenderTarget(me),w.getClearColor(ne),Se=w.getClearAlpha(),Se<1&&w.setClearColor(16777215,.5),w.clear(),Ke&&Ie.render(V);const We=w.toneMapping;w.toneMapping=Ln;const He=F.viewport;if(F.viewport!==void 0&&(F.viewport=void 0),D.setupLightsView(F),ke===!0&&se.setGlobalState(w.clippingPlanes,F),Le(S,V,F),k.updateMultisampleRenderTarget(me),k.updateRenderTargetMipmap(me),at.has("WEBGL_multisampled_render_to_texture")===!1){let Ue=!1;for(let lt=0,Ct=N.length;lt<Ct;lt++){const Ut=N[lt],{object:Tt,geometry:qt,material:Oe,group:sn}=Ut;if(Oe.side===pn&&Tt.layers.test(F.layers)){const xt=Oe.side;Oe.side=rn,Oe.needsUpdate=!0,Ce(Tt,V,F,qt,Oe,sn),Oe.side=xt,Oe.needsUpdate=!0,Ue=!0}}Ue===!0&&(k.updateMultisampleRenderTarget(me),k.updateRenderTargetMipmap(me))}w.setRenderTarget(fe,ge,ve),w.setClearColor(ne,Se),He!==void 0&&(F.viewport=He),w.toneMapping=We}function Le(S,N,V){const F=N.isScene===!0?N.overrideMaterial:null;for(let B=0,me=S.length;B<me;B++){const xe=S[B],{object:fe,geometry:ge,group:ve}=xe;let We=xe.material;We.allowOverride===!0&&F!==null&&(We=F),fe.layers.test(V.layers)&&Ce(fe,N,V,ge,We,ve)}}function Ce(S,N,V,F,B,me){S.onBeforeRender(w,N,V,F,B,me),S.modelViewMatrix.multiplyMatrices(V.matrixWorldInverse,S.matrixWorld),S.normalMatrix.getNormalMatrix(S.modelViewMatrix),B.onBeforeRender(w,N,V,F,S,me),B.transparent===!0&&B.side===pn&&B.forceSinglePass===!1?(B.side=rn,B.needsUpdate=!0,w.renderBufferDirect(V,N,F,B,S,me),B.side=li,B.needsUpdate=!0,w.renderBufferDirect(V,N,F,B,S,me),B.side=pn):w.renderBufferDirect(V,N,F,B,S,me),S.onAfterRender(w,N,V,F,B,me)}function tt(S,N,V){N.isScene!==!0&&(N=St);const F=M.get(S),B=D.state.lights,me=D.state.shadowsArray,xe=B.state.version,fe=he.getParameters(S,B.state,me,N,V),ge=he.getProgramCacheKey(fe);let ve=F.programs;F.environment=S.isMeshStandardMaterial||S.isMeshLambertMaterial||S.isMeshPhongMaterial?N.environment:null,F.fog=N.fog;const We=S.isMeshStandardMaterial||S.isMeshLambertMaterial&&!S.envMap||S.isMeshPhongMaterial&&!S.envMap;F.envMap=J.get(S.envMap||F.environment,We),F.envMapRotation=F.environment!==null&&S.envMap===null?N.environmentRotation:S.envMapRotation,ve===void 0&&(S.addEventListener("dispose",Qe),ve=new Map,F.programs=ve);let He=ve.get(ge);if(He!==void 0){if(F.currentProgram===He&&F.lightsStateVersion===xe)return Ne(S,fe),He}else fe.uniforms=he.getUniforms(S),S.onBeforeCompile(fe,w),He=he.acquireProgram(fe,ge),ve.set(ge,He),F.uniforms=fe.uniforms;const Ue=F.uniforms;return(!S.isShaderMaterial&&!S.isRawShaderMaterial||S.clipping===!0)&&(Ue.clippingPlanes=se.uniform),Ne(S,fe),F.needsLights=it(S),F.lightsStateVersion=xe,F.needsLights&&(Ue.ambientLightColor.value=B.state.ambient,Ue.lightProbe.value=B.state.probe,Ue.directionalLights.value=B.state.directional,Ue.directionalLightShadows.value=B.state.directionalShadow,Ue.spotLights.value=B.state.spot,Ue.spotLightShadows.value=B.state.spotShadow,Ue.rectAreaLights.value=B.state.rectArea,Ue.ltc_1.value=B.state.rectAreaLTC1,Ue.ltc_2.value=B.state.rectAreaLTC2,Ue.pointLights.value=B.state.point,Ue.pointLightShadows.value=B.state.pointShadow,Ue.hemisphereLights.value=B.state.hemi,Ue.directionalShadowMatrix.value=B.state.directionalShadowMatrix,Ue.spotLightMatrix.value=B.state.spotLightMatrix,Ue.spotLightMap.value=B.state.spotLightMap,Ue.pointShadowMatrix.value=B.state.pointShadowMatrix),F.currentProgram=He,F.uniformsList=null,He}function nt(S){if(S.uniformsList===null){const N=S.currentProgram.getUniforms();S.uniformsList=ms.seqWithValue(N.seq,S.uniforms)}return S.uniformsList}function Ne(S,N){const V=M.get(S);V.outputColorSpace=N.outputColorSpace,V.batching=N.batching,V.batchingColor=N.batchingColor,V.instancing=N.instancing,V.instancingColor=N.instancingColor,V.instancingMorph=N.instancingMorph,V.skinning=N.skinning,V.morphTargets=N.morphTargets,V.morphNormals=N.morphNormals,V.morphColors=N.morphColors,V.morphTargetsCount=N.morphTargetsCount,V.numClippingPlanes=N.numClippingPlanes,V.numIntersection=N.numClipIntersection,V.vertexAlphas=N.vertexAlphas,V.vertexTangents=N.vertexTangents,V.toneMapping=N.toneMapping}function st(S,N,V,F,B){N.isScene!==!0&&(N=St),k.resetTextureUnits();const me=N.fog,xe=F.isMeshStandardMaterial||F.isMeshLambertMaterial||F.isMeshPhongMaterial?N.environment:null,fe=$===null?w.outputColorSpace:$.isXRRenderTarget===!0?$.texture.colorSpace:Ji,ge=F.isMeshStandardMaterial||F.isMeshLambertMaterial&&!F.envMap||F.isMeshPhongMaterial&&!F.envMap,ve=J.get(F.envMap||xe,ge),We=F.vertexColors===!0&&!!V.attributes.color&&V.attributes.color.itemSize===4,He=!!V.attributes.tangent&&(!!F.normalMap||F.anisotropy>0),Ue=!!V.morphAttributes.position,lt=!!V.morphAttributes.normal,Ct=!!V.morphAttributes.color;let Ut=Ln;F.toneMapped&&($===null||$.isXRRenderTarget===!0)&&(Ut=w.toneMapping);const Tt=V.morphAttributes.position||V.morphAttributes.normal||V.morphAttributes.color,qt=Tt!==void 0?Tt.length:0,Oe=M.get(F),sn=D.state.lights;if(ke===!0&&(Ve===!0||S!==X)){const Ht=S===X&&F.id===q;se.setState(F,S,Ht)}let xt=!1;F.version===Oe.__version?(Oe.needsLights&&Oe.lightsStateVersion!==sn.state.version||Oe.outputColorSpace!==fe||B.isBatchedMesh&&Oe.batching===!1||!B.isBatchedMesh&&Oe.batching===!0||B.isBatchedMesh&&Oe.batchingColor===!0&&B.colorTexture===null||B.isBatchedMesh&&Oe.batchingColor===!1&&B.colorTexture!==null||B.isInstancedMesh&&Oe.instancing===!1||!B.isInstancedMesh&&Oe.instancing===!0||B.isSkinnedMesh&&Oe.skinning===!1||!B.isSkinnedMesh&&Oe.skinning===!0||B.isInstancedMesh&&Oe.instancingColor===!0&&B.instanceColor===null||B.isInstancedMesh&&Oe.instancingColor===!1&&B.instanceColor!==null||B.isInstancedMesh&&Oe.instancingMorph===!0&&B.morphTexture===null||B.isInstancedMesh&&Oe.instancingMorph===!1&&B.morphTexture!==null||Oe.envMap!==ve||F.fog===!0&&Oe.fog!==me||Oe.numClippingPlanes!==void 0&&(Oe.numClippingPlanes!==se.numPlanes||Oe.numIntersection!==se.numIntersection)||Oe.vertexAlphas!==We||Oe.vertexTangents!==He||Oe.morphTargets!==Ue||Oe.morphNormals!==lt||Oe.morphColors!==Ct||Oe.toneMapping!==Ut||Oe.morphTargetsCount!==qt)&&(xt=!0):(xt=!0,Oe.__version=F.version);let _n=Oe.currentProgram;xt===!0&&(_n=tt(F,N,B));let Tn=!1,hi=!1,Pi=!1;const At=_n.getUniforms(),$t=Oe.uniforms;if(De.useProgram(_n.program)&&(Tn=!0,hi=!0,Pi=!0),F.id!==q&&(q=F.id,hi=!0),Tn||X!==S){De.buffers.depth.getReversed()&&S.reversedDepth!==!0&&(S._reversedDepth=!0,S.updateProjectionMatrix()),At.setValue(L,"projectionMatrix",S.projectionMatrix),At.setValue(L,"viewMatrix",S.matrixWorldInverse);const Kn=At.map.cameraPosition;Kn!==void 0&&Kn.setValue(L,Ge.setFromMatrixPosition(S.matrixWorld)),gt.logarithmicDepthBuffer&&At.setValue(L,"logDepthBufFC",2/(Math.log(S.far+1)/Math.LN2)),(F.isMeshPhongMaterial||F.isMeshToonMaterial||F.isMeshLambertMaterial||F.isMeshBasicMaterial||F.isMeshStandardMaterial||F.isShaderMaterial)&&At.setValue(L,"isOrthographic",S.isOrthographicCamera===!0),X!==S&&(X=S,hi=!0,Pi=!0)}if(Oe.needsLights&&(sn.state.directionalShadowMap.length>0&&At.setValue(L,"directionalShadowMap",sn.state.directionalShadowMap,k),sn.state.spotShadowMap.length>0&&At.setValue(L,"spotShadowMap",sn.state.spotShadowMap,k),sn.state.pointShadowMap.length>0&&At.setValue(L,"pointShadowMap",sn.state.pointShadowMap,k)),B.isSkinnedMesh){At.setOptional(L,B,"bindMatrix"),At.setOptional(L,B,"bindMatrixInverse");const Ht=B.skeleton;Ht&&(Ht.boneTexture===null&&Ht.computeBoneTexture(),At.setValue(L,"boneTexture",Ht.boneTexture,k))}B.isBatchedMesh&&(At.setOptional(L,B,"batchingTexture"),At.setValue(L,"batchingTexture",B._matricesTexture,k),At.setOptional(L,B,"batchingIdTexture"),At.setValue(L,"batchingIdTexture",B._indirectTexture,k),At.setOptional(L,B,"batchingColorTexture"),B._colorsTexture!==null&&At.setValue(L,"batchingColorTexture",B._colorsTexture,k));const Zn=V.morphAttributes;if((Zn.position!==void 0||Zn.normal!==void 0||Zn.color!==void 0)&&Ee.update(B,V,_n),(hi||Oe.receiveShadow!==B.receiveShadow)&&(Oe.receiveShadow=B.receiveShadow,At.setValue(L,"receiveShadow",B.receiveShadow)),(F.isMeshStandardMaterial||F.isMeshLambertMaterial||F.isMeshPhongMaterial)&&F.envMap===null&&N.environment!==null&&($t.envMapIntensity.value=N.environmentIntensity),$t.dfgLUT!==void 0&&($t.dfgLUT.value=Mg()),hi&&(At.setValue(L,"toneMappingExposure",w.toneMappingExposure),Oe.needsLights&&Fe($t,Pi),me&&F.fog===!0&&Be.refreshFogUniforms($t,me),Be.refreshMaterialUniforms($t,F,je,be,D.state.transmissionRenderTarget[S.id]),ms.upload(L,nt(Oe),$t,k)),F.isShaderMaterial&&F.uniformsNeedUpdate===!0&&(ms.upload(L,nt(Oe),$t,k),F.uniformsNeedUpdate=!1),F.isSpriteMaterial&&At.setValue(L,"center",B.center),At.setValue(L,"modelViewMatrix",B.modelViewMatrix),At.setValue(L,"normalMatrix",B.normalMatrix),At.setValue(L,"modelMatrix",B.matrixWorld),F.isShaderMaterial||F.isRawShaderMaterial){const Ht=F.uniformsGroups;for(let Kn=0,Ii=Ht.length;Kn<Ii;Kn++){const Za=Ht[Kn];we.update(Za,_n),we.bind(Za,_n)}}return _n}function Fe(S,N){S.ambientLightColor.needsUpdate=N,S.lightProbe.needsUpdate=N,S.directionalLights.needsUpdate=N,S.directionalLightShadows.needsUpdate=N,S.pointLights.needsUpdate=N,S.pointLightShadows.needsUpdate=N,S.spotLights.needsUpdate=N,S.spotLightShadows.needsUpdate=N,S.rectAreaLights.needsUpdate=N,S.hemisphereLights.needsUpdate=N}function it(S){return S.isMeshLambertMaterial||S.isMeshToonMaterial||S.isMeshPhongMaterial||S.isMeshStandardMaterial||S.isShadowMaterial||S.isShaderMaterial&&S.lights===!0}this.getActiveCubeFace=function(){return I},this.getActiveMipmapLevel=function(){return W},this.getRenderTarget=function(){return $},this.setRenderTargetTextures=function(S,N,V){const F=M.get(S);F.__autoAllocateDepthBuffer=S.resolveDepthBuffer===!1,F.__autoAllocateDepthBuffer===!1&&(F.__useRenderToTexture=!1),M.get(S.texture).__webglTexture=N,M.get(S.depthTexture).__webglTexture=F.__autoAllocateDepthBuffer?void 0:V,F.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(S,N){const V=M.get(S);V.__webglFramebuffer=N,V.__useDefaultFramebuffer=N===void 0};const $e=L.createFramebuffer();this.setRenderTarget=function(S,N=0,V=0){$=S,I=N,W=V;let F=null,B=!1,me=!1;if(S){const fe=M.get(S);if(fe.__useDefaultFramebuffer!==void 0){De.bindFramebuffer(L.FRAMEBUFFER,fe.__webglFramebuffer),Y.copy(S.viewport),H.copy(S.scissor),oe=S.scissorTest,De.viewport(Y),De.scissor(H),De.setScissorTest(oe),q=-1;return}else if(fe.__webglFramebuffer===void 0)k.setupRenderTarget(S);else if(fe.__hasExternalTextures)k.rebindTextures(S,M.get(S.texture).__webglTexture,M.get(S.depthTexture).__webglTexture);else if(S.depthBuffer){const We=S.depthTexture;if(fe.__boundDepthTexture!==We){if(We!==null&&M.has(We)&&(S.width!==We.image.width||S.height!==We.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");k.setupDepthRenderbuffer(S)}}const ge=S.texture;(ge.isData3DTexture||ge.isDataArrayTexture||ge.isCompressedArrayTexture)&&(me=!0);const ve=M.get(S).__webglFramebuffer;S.isWebGLCubeRenderTarget?(Array.isArray(ve[N])?F=ve[N][V]:F=ve[N],B=!0):S.samples>0&&k.useMultisampledRTT(S)===!1?F=M.get(S).__webglMultisampledFramebuffer:Array.isArray(ve)?F=ve[V]:F=ve,Y.copy(S.viewport),H.copy(S.scissor),oe=S.scissorTest}else Y.copy(Q).multiplyScalar(je).floor(),H.copy(de).multiplyScalar(je).floor(),oe=pe;if(V!==0&&(F=$e),De.bindFramebuffer(L.FRAMEBUFFER,F)&&De.drawBuffers(S,F),De.viewport(Y),De.scissor(H),De.setScissorTest(oe),B){const fe=M.get(S.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_CUBE_MAP_POSITIVE_X+N,fe.__webglTexture,V)}else if(me){const fe=N;for(let ge=0;ge<S.textures.length;ge++){const ve=M.get(S.textures[ge]);L.framebufferTextureLayer(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0+ge,ve.__webglTexture,V,fe)}}else if(S!==null&&V!==0){const fe=M.get(S.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,fe.__webglTexture,V)}q=-1},this.readRenderTargetPixels=function(S,N,V,F,B,me,xe,fe=0){if(!(S&&S.isWebGLRenderTarget)){_t("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let ge=M.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&xe!==void 0&&(ge=ge[xe]),ge){De.bindFramebuffer(L.FRAMEBUFFER,ge);try{const ve=S.textures[fe],We=ve.format,He=ve.type;if(S.textures.length>1&&L.readBuffer(L.COLOR_ATTACHMENT0+fe),!gt.textureFormatReadable(We)){_t("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!gt.textureTypeReadable(He)){_t("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}N>=0&&N<=S.width-F&&V>=0&&V<=S.height-B&&L.readPixels(N,V,F,B,ue.convert(We),ue.convert(He),me)}finally{const ve=$!==null?M.get($).__webglFramebuffer:null;De.bindFramebuffer(L.FRAMEBUFFER,ve)}}},this.readRenderTargetPixelsAsync=async function(S,N,V,F,B,me,xe,fe=0){if(!(S&&S.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let ge=M.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&xe!==void 0&&(ge=ge[xe]),ge)if(N>=0&&N<=S.width-F&&V>=0&&V<=S.height-B){De.bindFramebuffer(L.FRAMEBUFFER,ge);const ve=S.textures[fe],We=ve.format,He=ve.type;if(S.textures.length>1&&L.readBuffer(L.COLOR_ATTACHMENT0+fe),!gt.textureFormatReadable(We))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!gt.textureTypeReadable(He))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Ue=L.createBuffer();L.bindBuffer(L.PIXEL_PACK_BUFFER,Ue),L.bufferData(L.PIXEL_PACK_BUFFER,me.byteLength,L.STREAM_READ),L.readPixels(N,V,F,B,ue.convert(We),ue.convert(He),0);const lt=$!==null?M.get($).__webglFramebuffer:null;De.bindFramebuffer(L.FRAMEBUFFER,lt);const Ct=L.fenceSync(L.SYNC_GPU_COMMANDS_COMPLETE,0);return L.flush(),await Bh(L,Ct,4),L.bindBuffer(L.PIXEL_PACK_BUFFER,Ue),L.getBufferSubData(L.PIXEL_PACK_BUFFER,0,me),L.deleteBuffer(Ue),L.deleteSync(Ct),me}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(S,N=null,V=0){const F=Math.pow(2,-V),B=Math.floor(S.image.width*F),me=Math.floor(S.image.height*F),xe=N!==null?N.x:0,fe=N!==null?N.y:0;k.setTexture2D(S,0),L.copyTexSubImage2D(L.TEXTURE_2D,V,0,0,xe,fe,B,me),De.unbindTexture()};const Ze=L.createFramebuffer(),ce=L.createFramebuffer();this.copyTextureToTexture=function(S,N,V=null,F=null,B=0,me=0){let xe,fe,ge,ve,We,He,Ue,lt,Ct;const Ut=S.isCompressedTexture?S.mipmaps[me]:S.image;if(V!==null)xe=V.max.x-V.min.x,fe=V.max.y-V.min.y,ge=V.isBox3?V.max.z-V.min.z:1,ve=V.min.x,We=V.min.y,He=V.isBox3?V.min.z:0;else{const $t=Math.pow(2,-B);xe=Math.floor(Ut.width*$t),fe=Math.floor(Ut.height*$t),S.isDataArrayTexture?ge=Ut.depth:S.isData3DTexture?ge=Math.floor(Ut.depth*$t):ge=1,ve=0,We=0,He=0}F!==null?(Ue=F.x,lt=F.y,Ct=F.z):(Ue=0,lt=0,Ct=0);const Tt=ue.convert(N.format),qt=ue.convert(N.type);let Oe;N.isData3DTexture?(k.setTexture3D(N,0),Oe=L.TEXTURE_3D):N.isDataArrayTexture||N.isCompressedArrayTexture?(k.setTexture2DArray(N,0),Oe=L.TEXTURE_2D_ARRAY):(k.setTexture2D(N,0),Oe=L.TEXTURE_2D),L.pixelStorei(L.UNPACK_FLIP_Y_WEBGL,N.flipY),L.pixelStorei(L.UNPACK_PREMULTIPLY_ALPHA_WEBGL,N.premultiplyAlpha),L.pixelStorei(L.UNPACK_ALIGNMENT,N.unpackAlignment);const sn=L.getParameter(L.UNPACK_ROW_LENGTH),xt=L.getParameter(L.UNPACK_IMAGE_HEIGHT),_n=L.getParameter(L.UNPACK_SKIP_PIXELS),Tn=L.getParameter(L.UNPACK_SKIP_ROWS),hi=L.getParameter(L.UNPACK_SKIP_IMAGES);L.pixelStorei(L.UNPACK_ROW_LENGTH,Ut.width),L.pixelStorei(L.UNPACK_IMAGE_HEIGHT,Ut.height),L.pixelStorei(L.UNPACK_SKIP_PIXELS,ve),L.pixelStorei(L.UNPACK_SKIP_ROWS,We),L.pixelStorei(L.UNPACK_SKIP_IMAGES,He);const Pi=S.isDataArrayTexture||S.isData3DTexture,At=N.isDataArrayTexture||N.isData3DTexture;if(S.isDepthTexture){const $t=M.get(S),Zn=M.get(N),Ht=M.get($t.__renderTarget),Kn=M.get(Zn.__renderTarget);De.bindFramebuffer(L.READ_FRAMEBUFFER,Ht.__webglFramebuffer),De.bindFramebuffer(L.DRAW_FRAMEBUFFER,Kn.__webglFramebuffer);for(let Ii=0;Ii<ge;Ii++)Pi&&(L.framebufferTextureLayer(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,M.get(S).__webglTexture,B,He+Ii),L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,M.get(N).__webglTexture,me,Ct+Ii)),L.blitFramebuffer(ve,We,xe,fe,Ue,lt,xe,fe,L.DEPTH_BUFFER_BIT,L.NEAREST);De.bindFramebuffer(L.READ_FRAMEBUFFER,null),De.bindFramebuffer(L.DRAW_FRAMEBUFFER,null)}else if(B!==0||S.isRenderTargetTexture||M.has(S)){const $t=M.get(S),Zn=M.get(N);De.bindFramebuffer(L.READ_FRAMEBUFFER,Ze),De.bindFramebuffer(L.DRAW_FRAMEBUFFER,ce);for(let Ht=0;Ht<ge;Ht++)Pi?L.framebufferTextureLayer(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,$t.__webglTexture,B,He+Ht):L.framebufferTexture2D(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,$t.__webglTexture,B),At?L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,Zn.__webglTexture,me,Ct+Ht):L.framebufferTexture2D(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,Zn.__webglTexture,me),B!==0?L.blitFramebuffer(ve,We,xe,fe,Ue,lt,xe,fe,L.COLOR_BUFFER_BIT,L.NEAREST):At?L.copyTexSubImage3D(Oe,me,Ue,lt,Ct+Ht,ve,We,xe,fe):L.copyTexSubImage2D(Oe,me,Ue,lt,ve,We,xe,fe);De.bindFramebuffer(L.READ_FRAMEBUFFER,null),De.bindFramebuffer(L.DRAW_FRAMEBUFFER,null)}else At?S.isDataTexture||S.isData3DTexture?L.texSubImage3D(Oe,me,Ue,lt,Ct,xe,fe,ge,Tt,qt,Ut.data):N.isCompressedArrayTexture?L.compressedTexSubImage3D(Oe,me,Ue,lt,Ct,xe,fe,ge,Tt,Ut.data):L.texSubImage3D(Oe,me,Ue,lt,Ct,xe,fe,ge,Tt,qt,Ut):S.isDataTexture?L.texSubImage2D(L.TEXTURE_2D,me,Ue,lt,xe,fe,Tt,qt,Ut.data):S.isCompressedTexture?L.compressedTexSubImage2D(L.TEXTURE_2D,me,Ue,lt,Ut.width,Ut.height,Tt,Ut.data):L.texSubImage2D(L.TEXTURE_2D,me,Ue,lt,xe,fe,Tt,qt,Ut);L.pixelStorei(L.UNPACK_ROW_LENGTH,sn),L.pixelStorei(L.UNPACK_IMAGE_HEIGHT,xt),L.pixelStorei(L.UNPACK_SKIP_PIXELS,_n),L.pixelStorei(L.UNPACK_SKIP_ROWS,Tn),L.pixelStorei(L.UNPACK_SKIP_IMAGES,hi),me===0&&N.generateMipmaps&&L.generateMipmap(Oe),De.unbindTexture()},this.initRenderTarget=function(S){M.get(S).__webglFramebuffer===void 0&&k.setupRenderTarget(S)},this.initTexture=function(S){S.isCubeTexture?k.setTextureCube(S,0):S.isData3DTexture?k.setTexture3D(S,0):S.isDataArrayTexture||S.isCompressedArrayTexture?k.setTexture2DArray(S,0):k.setTexture2D(S,0),De.unbindTexture()},this.resetState=function(){I=0,W=0,$=null,De.reset(),le.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return In}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=vt._getDrawingBufferColorSpace(e),t.unpackColorSpace=vt._getUnpackColorSpace()}}class yg{constructor(){this.container=document.getElementById("three-game")||document.body,this.scene=new eu,this.scene.background=new pt(12184319);const{width:e,height:t}=this.getViewportSize(),n=e/t;this.camera=new dn(38,n,.5,1e3),this.cameraOffset=new G(14,13,24),this.cameraLookOffset=new G(0,.8,0),this.camera.position.copy(this.cameraOffset),this.camera.lookAt(0,0,0),this.renderer=new Sg({antialias:window.devicePixelRatio<2,alpha:!1,powerPreference:"default"}),this.renderer.setSize(e,t),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,1.5)),this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=br,this.renderer.outputColorSpace=Jt,this.renderer.toneMapping=Ra,this.renderer.toneMappingExposure=1.08,this.container.appendChild(this.renderer.domElement),this.renderer.domElement.id="three-canvas";const r=new xu(15334399,12044425,1);this.scene.add(r);const s=new Eu(16777215,.42);this.scene.add(s);const o=new yu(16774096,1.35);o.position.set(12,26,10),o.castShadow=!0,o.shadow.mapSize.set(1024,1024),o.shadow.camera.left=-34,o.shadow.camera.right=34,o.shadow.camera.top=34,o.shadow.camera.bottom=-34,o.shadow.camera.near=1,o.shadow.camera.far=80,o.shadow.bias=-25e-5,o.shadow.radius=3,this.scene.add(o),this.worldGroup=new un,this.scene.add(this.worldGroup),this.entityGroup=new un,this.scene.add(this.entityGroup),this.cameraZoom=1,this.raycaster=new wu,this.pathLine=null,window.addEventListener("resize",()=>this.onWindowResize())}drawRoundRect(e,t,n,r,s,o){e.beginPath(),e.moveTo(t+o,n),e.arcTo(t+r,n,t+r,n+s,o),e.arcTo(t+r,n+s,t,n+s,o),e.arcTo(t,n+s,t,n,o),e.arcTo(t,n,t+r,n,o),e.closePath()}getViewportSize(){const e=this.container.getBoundingClientRect();return{width:Math.max(320,e.width||window.innerWidth),height:Math.max(240,e.height||window.innerHeight)}}getIntersectedTile(e){this.raycaster.setFromCamera(e,this.camera);const t=this.raycaster.intersectObjects(this.worldGroup.children);return t.length>0?t[0].object.userData.tile:null}renderPathLine(e,t){if(this.pathLine&&(this.scene.remove(this.pathLine),this.pathLine.geometry.dispose(),this.pathLine.material.dispose(),this.pathLine=null),!e||e.length<2)return;const n=[];for(const o of e){const a=t.getElevation(o.x,o.y)+1.1;n.push(new G(o.x,a,o.y))}const r=new tn().setFromPoints(n),s=new Nc({color:65484,transparent:!0,opacity:.8,depthTest:!1});this.pathLine=new hu(r,s),this.scene.add(this.pathLine)}onWindowResize(){const{width:e,height:t}=this.getViewportSize();this.camera.aspect=e/t,this.camera.updateProjectionMatrix(),this.renderer.setSize(e,t)}handleZoom(e){const t=e>0?-.1:.1;this.cameraZoom=Math.max(.5,Math.min(3,this.cameraZoom+t)),this.camera.zoom=this.cameraZoom,this.camera.updateProjectionMatrix()}updateCamera(e){const t=e.clone().add(this.cameraLookOffset);this.camera.position.copy(e).add(this.cameraOffset),this.camera.lookAt(t)}render(){this.renderer.render(this.scene,this.camera)}addToWorld(e){this.worldGroup.add(e)}addToEntities(e){this.entityGroup.add(e)}removeFromWorld(e){this.worldGroup.remove(e)}removeFromEntities(e){this.entityGroup.remove(e)}}const ae={VOID:0,GEO:1,HYDRO:2,ANEMO:3,CRYO:4,PYRO:5,STRUCTURE:6},Kl={[ae.VOID]:{id:"void",label:"Void",walkable:!1,habitats:[],topColor:8226710,sideColor:6121075,roughness:.95,pattern:"blocked"},[ae.GEO]:{id:"geo",label:"Grassland",walkable:!0,habitats:["meadow","forest-edge"],topColor:9427560,sideColor:6466136,roughness:.76,moveCost:1,pattern:"grass"},[ae.HYDRO]:{id:"hydro",label:"Water",walkable:!1,habitats:["shore"],topColor:5227511,sideColor:1935039,roughness:.35,moveCost:1/0,pattern:"water"},[ae.ANEMO]:{id:"anemo",label:"Sand",walkable:!0,habitats:["shore"],topColor:16767352,sideColor:14919757,roughness:.78,moveCost:1.08,pattern:"sand"},[ae.CRYO]:{id:"cryo",label:"Snowfield",walkable:!0,habitats:["snow"],topColor:15989759,sideColor:12048874,roughness:.32,moveCost:1.18,pattern:"ice"},[ae.PYRO]:{id:"pyro",label:"Lava",walkable:!1,habitats:[],topColor:16742950,sideColor:12073496,roughness:.55,moveCost:1/0,pattern:"lava"},[ae.STRUCTURE]:{id:"structure",label:"Building Wall",walkable:!1,habitats:[],topColor:16758223,sideColor:13135245,roughness:.7,moveCost:1/0,pattern:"building"}},Eg={[`${ae.HYDRO}:4`]:{label:"Brackish Water",topColor:7840359,sideColor:4878661,pattern:"marsh"},[`${ae.GEO}:1`]:{label:"Forest Floor",topColor:6800239,sideColor:4167251,moveCost:1.2,pattern:"forest"},[`${ae.GEO}:2`]:{label:"Village Road",topColor:16308618,sideColor:13869911,moveCost:.9,pattern:"road"},[`${ae.GEO}:3`]:{label:"Hill Ledge",topColor:10999929,sideColor:5213251,moveCost:1.28,pattern:"hill"},[`${ae.GEO}:4`]:{label:"Mountain Ledge",topColor:11451532,sideColor:6911068,moveCost:1.45,pattern:"stone"},[`${ae.CRYO}:1`]:{label:"Ice Lake",topColor:12120319,sideColor:7716311,moveCost:1.24,pattern:"ice"},[`${ae.STRUCTURE}:0`]:{label:"Stone Wall",topColor:11911372,sideColor:8293273,pattern:"blocked"},[`${ae.STRUCTURE}:1`]:{label:"Town Wall",topColor:16761710,sideColor:14190908,pattern:"brick"},[`${ae.STRUCTURE}:2`]:{label:"Building Floor",walkable:!0,topColor:14137738,sideColor:10974543,moveCost:.95,pattern:"floor"},[`${ae.STRUCTURE}:3`]:{label:"Stone Building Wall",topColor:12962769,sideColor:8226704,pattern:"masonry"},[`${ae.STRUCTURE}:4`]:{label:"Timber Building Wall",topColor:13998691,sideColor:9001270,pattern:"timber"},[`${ae.STRUCTURE}:5`]:{label:"Doorway",walkable:!0,topColor:10183482,sideColor:7290920,moveCost:.9,pattern:"door"},[`${ae.STRUCTURE}:6`]:{label:"Stairs",walkable:!0,topColor:13150842,sideColor:9200960,moveCost:1.05,pattern:"stairs"},[`${ae.STRUCTURE}:9`]:{label:"Stone Stairs",walkable:!0,topColor:12962769,sideColor:8226704,moveCost:1.05,pattern:"masonry"},[`${ae.STRUCTURE}:10`]:{label:"Timber Stairs",walkable:!0,topColor:13998691,sideColor:9001270,moveCost:1.05,pattern:"timber"}};function Ai(i,e=0){const t=Kl[i]||Kl[ae.VOID],n=Eg[`${i}:${e}`]||{};return{...t,...n}}function Tg(i,e=0){return Ai(i,e).walkable}function bg(i,e,t){return Ai(i,e).habitats.includes(t)}const ht={NONE:0,EARTH:ae.GEO,WATER:ae.HYDRO,WIND:ae.ANEMO,ICE:ae.CRYO,FIRE:ae.PYRO,STRUCTURE:ae.STRUCTURE},dt={DEFAULT:0,FOREST:1,ROAD:2,HILL:3,MOUNTAIN:4,ICE:1,DEEP_WATER:2,MARSH_WATER:4,TOWN_WALL:1,BUILDING_FLOOR:2,STONE_BUILDING_WALL:3,TIMBER_BUILDING_WALL:4,DOOR:5,STAIRS:6,STONE_STAIRS:9,TIMBER_STAIRS:10},_e={NONE:0,WALL:1,DOOR:2,FLOOR:3,STAIRS:4,WINDOW_LOWER_NORTH:6,WINDOW_LOWER_SOUTH:7,WINDOW_LOWER_WEST:8,WINDOW_LOWER_EAST:9,STAIRS_NORTH:10,STAIRS_SOUTH:11,STAIRS_WEST:12,STAIRS_EAST:13,WINDOW_UPPER_NORTH:14,WINDOW_UPPER_SOUTH:15,WINDOW_UPPER_WEST:16,WINDOW_UPPER_EAST:17},ws={W:{element:ae.HYDRO,texture:dt.DEEP_WATER,effect:ht.WATER,building:_e.NONE,height:0},B:{element:ae.HYDRO,texture:dt.MARSH_WATER,effect:ht.WATER,building:_e.NONE,height:0},S:{element:ae.ANEMO,texture:dt.DEFAULT,effect:ht.WIND,building:_e.NONE,height:0},G:{element:ae.GEO,texture:dt.DEFAULT,effect:ht.EARTH,building:_e.NONE,height:0},F:{element:ae.GEO,texture:dt.FOREST,effect:ht.EARTH,building:_e.NONE,height:0},H:{element:ae.GEO,texture:dt.HILL,effect:ht.EARTH,building:_e.NONE,height:1},M:{element:ae.GEO,texture:dt.MOUNTAIN,effect:ht.EARTH,building:_e.NONE,height:2},P:{element:ae.CRYO,texture:dt.DEFAULT,effect:ht.ICE,building:_e.NONE,height:2},I:{element:ae.CRYO,texture:dt.ICE,effect:ht.ICE,building:_e.NONE,height:0},L:{element:ae.PYRO,texture:dt.DEFAULT,effect:ht.FIRE,building:_e.NONE,height:2},R:{element:ae.GEO,texture:dt.ROAD,effect:ht.EARTH,building:_e.NONE,height:0},T:{element:ae.STRUCTURE,texture:dt.TOWN_WALL,effect:ht.STRUCTURE,building:_e.WALL,height:2},X:{element:ae.STRUCTURE,texture:dt.DEFAULT,effect:ht.STRUCTURE,building:_e.WALL,height:1},A:{element:ae.STRUCTURE,texture:dt.STONE_BUILDING_WALL,effect:ht.STRUCTURE,building:_e.WALL,height:2},C:{element:ae.STRUCTURE,texture:dt.TIMBER_BUILDING_WALL,effect:ht.STRUCTURE,building:_e.WALL,height:2},N:{element:ae.STRUCTURE,texture:dt.STONE_BUILDING_WALL,effect:ht.STRUCTURE,building:_e.WINDOW_LOWER_NORTH,height:2},O:{element:ae.STRUCTURE,texture:dt.STONE_BUILDING_WALL,effect:ht.STRUCTURE,building:_e.WINDOW_LOWER_SOUTH,height:2},J:{element:ae.STRUCTURE,texture:dt.STONE_BUILDING_WALL,effect:ht.STRUCTURE,building:_e.WINDOW_LOWER_WEST,height:2},K:{element:ae.STRUCTURE,texture:dt.STONE_BUILDING_WALL,effect:ht.STRUCTURE,building:_e.WINDOW_LOWER_EAST,height:2},Q:{element:ae.STRUCTURE,texture:dt.TIMBER_BUILDING_WALL,effect:ht.STRUCTURE,building:_e.WINDOW_LOWER_NORTH,height:2},V:{element:ae.STRUCTURE,texture:dt.TIMBER_BUILDING_WALL,effect:ht.STRUCTURE,building:_e.WINDOW_LOWER_SOUTH,height:2},Y:{element:ae.STRUCTURE,texture:dt.TIMBER_BUILDING_WALL,effect:ht.STRUCTURE,building:_e.WINDOW_LOWER_WEST,height:2},Z:{element:ae.STRUCTURE,texture:dt.TIMBER_BUILDING_WALL,effect:ht.STRUCTURE,building:_e.WINDOW_LOWER_EAST,height:2},D:{element:ae.STRUCTURE,texture:dt.DOOR,effect:ht.STRUCTURE,building:_e.DOOR,height:0},E:{element:ae.STRUCTURE,texture:dt.BUILDING_FLOOR,effect:ht.STRUCTURE,building:_e.FLOOR,height:0},U:{element:ae.STRUCTURE,texture:dt.STAIRS,effect:ht.STRUCTURE,building:_e.STAIRS,height:0},1:{element:ae.STRUCTURE,texture:dt.STONE_STAIRS,effect:ht.STRUCTURE,building:_e.STAIRS_NORTH,height:0},2:{element:ae.STRUCTURE,texture:dt.STONE_STAIRS,effect:ht.STRUCTURE,building:_e.STAIRS_SOUTH,height:0},3:{element:ae.STRUCTURE,texture:dt.STONE_STAIRS,effect:ht.STRUCTURE,building:_e.STAIRS_WEST,height:0},4:{element:ae.STRUCTURE,texture:dt.STONE_STAIRS,effect:ht.STRUCTURE,building:_e.STAIRS_EAST,height:0},5:{element:ae.STRUCTURE,texture:dt.TIMBER_STAIRS,effect:ht.STRUCTURE,building:_e.STAIRS_NORTH,height:0},6:{element:ae.STRUCTURE,texture:dt.TIMBER_STAIRS,effect:ht.STRUCTURE,building:_e.STAIRS_SOUTH,height:0},7:{element:ae.STRUCTURE,texture:dt.TIMBER_STAIRS,effect:ht.STRUCTURE,building:_e.STAIRS_WEST,height:0},8:{element:ae.STRUCTURE,texture:dt.TIMBER_STAIRS,effect:ht.STRUCTURE,building:_e.STAIRS_EAST,height:0}},wg=Object.keys(ws);function Ea({element:i=ae.VOID,texture:e=0,effect:t=ht.NONE,building:n=_e.NONE,height:r=0}={}){return{element:gr(i,ae.VOID),texture:gr(e,0),effect:gr(t,ht.NONE),building:gr(n,_e.NONE),height:gr(r,0)}}function As(i){return Ea(ws[String(i).toUpperCase()]||ws.W)}function $a(i){if(typeof i=="string")return As(i);if(Array.isArray(i))return Ea({element:i[0],texture:i[1],effect:i[2],building:i[3],height:i[4]});if(i&&typeof i=="object"){const e=i.element??i.e,t=i.texture??i.textureValue??i.t,n=i.effect??i.fx,r=i.building??i.b,s=i.height??i.maxZ??i.h;return Ea({element:e,texture:t,effect:n,building:r,height:s})}return As("W")}function Ta(i){const e=$a(i),t=Ai(e.element,e.texture);return{element:e.element,textureValue:e.texture,effect:e.effect,building:e.building,maxZ:e.height,walkable:t.walkable,definition:t}}function Yc(i){return i.map(e=>[...String(e)].map(t=>As(t)))}function qc(i){return Array.isArray(i)?i.filter(e=>Array.isArray(e)||typeof e=="string").map(e=>typeof e=="string"?[...e.trim().toUpperCase()].map(t=>As(t)):e.map(t=>$a(t))).filter(e=>e.length>0):[]}function bo(i){const e=qc(i);return JSON.stringify(e,null,2)}const Jl=Object.fromEntries(Object.entries(ws).map(([i,e])=>[i,Ta(e)]));function gr(i,e){const t=Number(i);return Number.isFinite(t)?Math.max(0,Math.floor(t)):e}const jc=.96,Ag=jc/2,ye=class ye{constructor(e,t,n,r,s={}){this.threeManager=e,this.gridX=t,this.gridY=n,this.elevation=r,this.attributes=s,this.element=s.element||ae.GEO,this.textureValue=s.textureValue||0,this.effect=s.effect||0,this.building=s.building||0,this.objects=[],this.render()}setElementalType(e,t,n=0,r=0){this.element=e,this.textureValue=t,this.effect=n,this.building=r,this.mesh&&(this.restoreBaseMaterial(),this.clearObjects(),this.mesh.material=ye.isSpecialBuildingShape(r)?ye.getInvisibleMaterial():ye.getMaterials(e,t,n),this.createObjects())}render(){const e=ye.isSpecialBuildingShape(this.building)?ye.getInvisibleMaterial():ye.getMaterials(this.element,this.textureValue,this.effect);this.mesh=new ot(ye.geometry,e),this.mesh.castShadow=!Ai(this.element,this.textureValue).walkable,this.mesh.receiveShadow=!0,this.mesh.position.set(this.gridX,this.elevation,this.gridY),this.mesh.userData.tile=this,this.threeManager.addToWorld(this.mesh),this.createObjects()}createObjects(){this.mesh&&(ye.isWindowWall(this.building)?this.addWindowWallObjects():ye.isDirectionalStair(this.building)&&this.addStairObjects())}addWindowWallObjects(){const e=ye.getBuildingPartDirection(this.building),t=ye.getWindowGlassMaterial(),n=ye.getMaterials(this.element,this.textureValue,this.effect),r=ye.isUpperWindowWall(this.building),s=new ot(new Ot(.98,.48,.98),n);s.position.y=r?.24:-.24,s.castShadow=!0,s.receiveShadow=!0,s.raycast=()=>{},this.mesh.add(s),this.objects.push(s);const o=new ot(new Ot(e==="north"||e==="south"?.82:.045,.44,e==="north"||e==="south"?.045:.82),t),a=ye.getDirectionVector(e);o.position.set(a.x*.47,r?-.25:.25,a.y*.47),o.raycast=()=>{},this.mesh.add(o),this.objects.push(o)}addStairObjects(){const e=ye.getBuildingPartDirection(this.building),t=ye.getDirectionVector(e),n=ye.getMaterials(this.element,this.textureValue,this.effect),r=.3;for(let s=0;s<3;s++){const o=(s+1)*.32,a=new ot(new Ot(.9,o,r),n),l=-.3+s*r;a.position.set(t.x*l,-.48+o/2,t.y*l),a.rotation.y=e==="east"||e==="west"?Math.PI/2:0,a.castShadow=!0,a.receiveShadow=!0,a.raycast=()=>{},this.mesh.add(a),this.objects.push(a)}}clearObjects(){var e,t,n;if((e=this.objects)!=null&&e.length){for(const r of this.objects)(t=r.parent)==null||t.remove(r),(n=r.geometry)==null||n.dispose();this.objects=[]}}static isWindowWall(e){return[_e.WINDOW_LOWER_NORTH,_e.WINDOW_LOWER_SOUTH,_e.WINDOW_LOWER_WEST,_e.WINDOW_LOWER_EAST,_e.WINDOW_UPPER_NORTH,_e.WINDOW_UPPER_SOUTH,_e.WINDOW_UPPER_WEST,_e.WINDOW_UPPER_EAST].includes(e)}static isUpperWindowWall(e){return[_e.WINDOW_UPPER_NORTH,_e.WINDOW_UPPER_SOUTH,_e.WINDOW_UPPER_WEST,_e.WINDOW_UPPER_EAST].includes(e)}static isSpecialBuildingShape(e){return ye.isWindowWall(e)||ye.isDirectionalStair(e)}static isDirectionalStair(e){return[_e.STAIRS_NORTH,_e.STAIRS_SOUTH,_e.STAIRS_WEST,_e.STAIRS_EAST].includes(e)}static getBuildingPartDirection(e){return{[_e.WINDOW_LOWER_NORTH]:"north",[_e.WINDOW_LOWER_SOUTH]:"south",[_e.WINDOW_LOWER_WEST]:"west",[_e.WINDOW_LOWER_EAST]:"east",[_e.WINDOW_UPPER_NORTH]:"north",[_e.WINDOW_UPPER_SOUTH]:"south",[_e.WINDOW_UPPER_WEST]:"west",[_e.WINDOW_UPPER_EAST]:"east",[_e.STAIRS_NORTH]:"north",[_e.STAIRS_SOUTH]:"south",[_e.STAIRS_WEST]:"west",[_e.STAIRS_EAST]:"east"}[e]||"north"}static getDirectionVector(e){return{north:{x:0,y:-1},south:{x:0,y:1},west:{x:-1,y:0},east:{x:1,y:0}}[e]||{x:0,y:-1}}static getWindowGlassMaterial(){return ye.windowGlassMaterial||(ye.windowGlassMaterial=new Dn({color:10348543,emissive:2251889,emissiveIntensity:.2,roughness:.18,metalness:.02,transparent:!0,opacity:.58,depthWrite:!1})),ye.windowGlassMaterial}static getInvisibleMaterial(){return ye.invisibleMaterial||(ye.invisibleMaterial=new Wn({transparent:!0,opacity:0,depthWrite:!1,colorWrite:!1})),ye.invisibleMaterial}highlight(e=5592405){this.mesh&&this.mesh.material&&(this.highlightMaterial||(this.highlightMaterial=Array.isArray(this.mesh.material)?this.mesh.material.map(n=>n.clone()):this.mesh.material.clone(),this.mesh.material=this.highlightMaterial),(Array.isArray(this.mesh.material)?this.mesh.material:[this.mesh.material]).forEach(n=>{var r;return(r=n.emissive)==null?void 0:r.setHex(e)}))}clearHighlight(){this.restoreBaseMaterial()}restoreBaseMaterial(){if(!this.mesh||!this.highlightMaterial)return;(Array.isArray(this.highlightMaterial)?this.highlightMaterial:[this.highlightMaterial]).forEach(t=>t.dispose()),this.highlightMaterial=null,this.mesh.material=ye.isSpecialBuildingShape(this.building)?ye.getInvisibleMaterial():ye.getMaterials(this.element,this.textureValue,this.effect)}static getMaterials(e,t=0,n=0){const r=`${e}:${t}:${n}`;if(!ye.materialCache.has(r)){const s=Ai(e,t),o=ye.createTexture(s,n),a=ye.createSideTexture(s),l=new Dn({color:16777215,map:o,roughness:s.roughness,metalness:.05}),c=new Dn({color:16777215,map:a,roughness:Math.min(1,s.roughness+.08),metalness:.02});ye.materialCache.set(r,[c,c,l,c,c,c])}return ye.materialCache.get(r)}static createTexture(e,t=0){const n=document.createElement("canvas");n.width=96,n.height=96;const r=n.getContext("2d"),s=`#${e.topColor.toString(16).padStart(6,"0")}`,o=`#${e.sideColor.toString(16).padStart(6,"0")}`;r.fillStyle=s,r.fillRect(0,0,n.width,n.height),ye.drawSoftTop(r,e),e.pattern==="grass"?ye.drawGrass(r,s,o):e.pattern==="forest"?ye.drawForest(r):e.pattern==="hill"?ye.drawHill(r):e.pattern==="stone"?ye.drawStone(r):e.pattern==="road"?ye.drawRoad(r):e.pattern==="floor"?ye.drawFloor(r):e.pattern==="water"?ye.drawWaves(r,"#b7e6f4",.35):e.pattern==="marsh"?(ye.drawWaves(r,"#7c8b48",.28),ye.drawSpeckles(r,"#2f3b20",22,.45)):e.pattern==="sand"?ye.drawSpeckles(r,"#f5dea0",42,.45):e.pattern==="ice"?ye.drawIce(r,"#ffffff"):e.pattern==="lava"?ye.drawLava(r):e.pattern==="brick"?ye.drawBrick(r):e.pattern==="masonry"?ye.drawMasonry(r):e.pattern==="timber"?ye.drawTimber(r):e.pattern==="door"?ye.drawDoor(r):e.pattern==="stairs"?ye.drawStairs(r):e.pattern==="blocked"?ye.drawBlocked(r):ye.drawSpeckles(r,o,28,.25),t>0&&ye.drawElementEffect(r,t),ye.drawRoundedFrame(r,e.walkable);const a=new xa(n);return a.colorSpace=Jt,a.wrapS=Ei,a.wrapT=Ei,a.repeat.set(1,1),a.needsUpdate=!0,a}static createSideTexture(e){const t=document.createElement("canvas");t.width=96,t.height=96;const n=t.getContext("2d"),r=`#${e.topColor.toString(16).padStart(6,"0")}`,s=`#${e.sideColor.toString(16).padStart(6,"0")}`,o=n.createLinearGradient(0,0,0,96);o.addColorStop(0,r),o.addColorStop(.18,s),o.addColorStop(1,ye.shadeColor(s,-34)),n.fillStyle=o,n.fillRect(0,0,96,96),n.fillStyle="rgba(255, 255, 255, 0.22)",n.fillRect(0,0,96,8),n.fillStyle="rgba(4, 9, 12, 0.26)",n.fillRect(0,84,96,12),n.strokeStyle=e.walkable?"rgba(31, 58, 35, 0.22)":"rgba(6, 9, 12, 0.38)",n.lineWidth=3;for(let l=22;l<88;l+=22)n.beginPath(),n.moveTo(0,l),n.lineTo(96,l),n.stroke();e.walkable||(n.strokeStyle="rgba(255, 255, 255, 0.2)",n.lineWidth=4,n.beginPath(),n.moveTo(18,16),n.lineTo(78,76),n.moveTo(80,18),n.lineTo(20,78),n.stroke());const a=new xa(t);return a.colorSpace=Jt,a.wrapS=Ei,a.wrapT=Ei,a.needsUpdate=!0,a}static shadeColor(e,t){const n=parseInt(e.replace("#",""),16),r=Math.max(0,Math.min(255,(n>>16)+t)),s=Math.max(0,Math.min(255,(n>>8&255)+t)),o=Math.max(0,Math.min(255,(n&255)+t));return`#${((1<<24)+(r<<16)+(s<<8)+o).toString(16).slice(1)}`}static drawSoftTop(e,t){const n=e.createRadialGradient(34,26,8,48,48,72);n.addColorStop(0,"rgba(255, 255, 255, 0.34)"),n.addColorStop(.52,"rgba(255, 255, 255, 0.08)"),n.addColorStop(1,t.walkable?"rgba(45, 62, 44, 0.16)":"rgba(18, 24, 24, 0.34)"),e.fillStyle=n,e.fillRect(0,0,96,96)}static drawRoundedFrame(e,t){e.save(),e.lineWidth=t?4:6,e.strokeStyle=t?"rgba(255, 255, 255, 0.28)":"rgba(30, 24, 22, 0.42)",ye.roundRect(e,7,7,82,82,15),e.stroke(),e.lineWidth=3,e.strokeStyle=t?"rgba(43, 68, 45, 0.18)":"rgba(5, 7, 8, 0.34)",ye.roundRect(e,2.5,2.5,91,91,13),e.stroke(),e.restore()}static drawElementEffect(e,t){const r={[ae.GEO]:"#7ed957",[ae.HYDRO]:"#4fc3f7",[ae.ANEMO]:"#ffd978",[ae.CRYO]:"#b8f0ff",[ae.PYRO]:"#ff8a3d",[ae.STRUCTURE]:"#ffb5cf"}[t];if(r){e.save(),e.globalAlpha=.22,e.fillStyle=r,ye.roundRect(e,14,14,68,68,18),e.fill(),e.globalAlpha=.5,e.strokeStyle=r,e.lineWidth=4,e.setLineDash([14,10]),e.beginPath(),e.arc(48,48,25,0,Math.PI*2),e.stroke(),e.setLineDash([]),e.globalAlpha=.38,e.lineWidth=3;for(let s=0;s<4;s++){const o=s*Math.PI*.5+Math.PI*.25,a=48+Math.cos(o)*27,l=48+Math.sin(o)*27;e.beginPath(),e.arc(a,l,4,0,Math.PI*2),e.stroke()}e.restore()}}static roundRect(e,t,n,r,s,o){e.beginPath(),e.moveTo(t+o,n),e.arcTo(t+r,n,t+r,n+s,o),e.arcTo(t+r,n+s,t,n+s,o),e.arcTo(t,n+s,t,n,o),e.arcTo(t,n,t+r,n,o),e.closePath()}static drawGrass(e,t,n){ye.drawSpeckles(e,"#a4d37e",32,.5),e.strokeStyle=n,e.lineWidth=2;for(let r=0;r<18;r++){const s=r*31%92+2,o=r*47%88+5;e.beginPath(),e.moveTo(s,o+5),e.lineTo(s+3,o),e.stroke()}e.fillStyle=t,e.globalAlpha=.25,e.fillRect(0,0,96,96),e.globalAlpha=1}static drawForest(e){ye.drawSpeckles(e,"#2f8d48",30,.32),e.fillStyle="rgba(20, 110, 54, 0.35)";for(let t=0;t<13;t++){const n=t*29%82+8,r=t*43%82+8;e.beginPath(),e.arc(n,r,4+t%3,0,Math.PI*2),e.fill()}}static drawHill(e){ye.drawSpeckles(e,"#d4ed91",24,.36),e.strokeStyle="rgba(57, 108, 53, 0.34)",e.lineWidth=4;for(let t=20;t<86;t+=22)e.beginPath(),e.moveTo(13,t),e.bezierCurveTo(30,t-10,52,t+10,80,t-2),e.stroke()}static drawStone(e){ye.drawSpeckles(e,"#dce2b2",30,.28),e.strokeStyle="rgba(75, 84, 72, 0.32)",e.lineWidth=3;for(let t=0;t<8;t++){const n=t*19%74+10,r=t*31%74+10;e.beginPath(),e.moveTo(n-8,r),e.lineTo(n,r-6),e.lineTo(n+10,r-2),e.lineTo(n+6,r+8),e.closePath(),e.stroke()}}static drawRoad(e){e.save(),e.strokeStyle="rgba(163, 112, 53, 0.28)",e.lineWidth=5,e.setLineDash([10,9]),e.beginPath(),e.moveTo(4,51),e.bezierCurveTo(24,38,50,60,92,43),e.stroke(),e.restore(),ye.drawSpeckles(e,"#fff1bd",34,.38)}static drawFloor(e){e.strokeStyle="rgba(92, 58, 32, 0.26)",e.lineWidth=3;for(let t=16;t<92;t+=16)e.beginPath(),e.moveTo(5,t),e.lineTo(91,t),e.stroke();e.strokeStyle="rgba(255, 246, 206, 0.22)";for(let t=18;t<96;t+=22)e.beginPath(),e.moveTo(t,10),e.lineTo(t-6,88),e.stroke()}static drawWaves(e,t,n){e.strokeStyle=t,e.globalAlpha=n,e.lineWidth=3;for(let r=14;r<96;r+=20){e.beginPath();for(let s=-8;s<104;s+=12){const o=r+Math.sin(s*.18)*3;s===-8?e.moveTo(s,o):e.lineTo(s,o)}e.stroke()}e.globalAlpha=1}static drawSpeckles(e,t,n,r){e.fillStyle=t,e.globalAlpha=r;for(let s=0;s<n;s++){const o=s*37%92+2,a=s*53%92+2,l=1+s%3;e.fillRect(o,a,l,l)}e.globalAlpha=1}static drawIce(e,t){e.strokeStyle=t,e.globalAlpha=.5,e.lineWidth=2;for(let n=0;n<7;n++){const r=n*13%96;e.beginPath(),e.moveTo(r,4),e.lineTo(96-r/2,92),e.stroke()}e.globalAlpha=1}static drawLava(e){const t=e.createRadialGradient(48,48,4,48,48,70);t.addColorStop(0,"#ffd166"),t.addColorStop(.45,"#f97316"),t.addColorStop(1,"#7c1d12"),e.fillStyle=t,e.fillRect(0,0,96,96),e.strokeStyle="rgba(255, 224, 102, 0.65)",e.lineWidth=4,e.beginPath(),e.moveTo(8,28),e.bezierCurveTo(28,10,42,60,62,28),e.bezierCurveTo(72,12,84,30,91,18),e.stroke()}static drawBrick(e){e.strokeStyle="rgba(137, 85, 44, 0.36)",e.lineWidth=3;for(let t=18;t<96;t+=18)e.beginPath(),e.moveTo(4,t),e.lineTo(92,t),e.stroke();for(let t=9;t<96;t+=18){const n=Math.floor(t/18)%2*18;for(let r=8+n;r<96;r+=36)e.beginPath(),e.moveTo(r,t),e.lineTo(r,t+18),e.stroke()}}static drawMasonry(e){ye.drawSpeckles(e,"#f1f4f0",18,.18),e.strokeStyle="rgba(76, 84, 90, 0.36)",e.lineWidth=3;for(let t=16;t<96;t+=16)e.beginPath(),e.moveTo(6,t),e.lineTo(90,t),e.stroke();for(let t=8;t<96;t+=16){const n=Math.floor(t/16)%2*18;for(let r=9+n;r<96;r+=36)e.beginPath(),e.moveTo(r,t),e.lineTo(r,t+16),e.stroke()}}static drawTimber(e){ye.drawSpeckles(e,"#f3c285",18,.16),e.strokeStyle="rgba(83, 49, 27, 0.38)",e.lineWidth=5;for(let t=18;t<96;t+=24)e.beginPath(),e.moveTo(t,8),e.lineTo(t-4,88),e.stroke();e.strokeStyle="rgba(255, 232, 179, 0.26)",e.lineWidth=2;for(let t=28;t<96;t+=24)e.beginPath(),e.moveTo(t,8),e.lineTo(t-4,88),e.stroke()}static drawDoor(e){e.fillStyle="rgba(70, 39, 24, 0.34)",ye.roundRect(e,22,14,52,68,10),e.fill(),e.strokeStyle="rgba(255, 218, 132, 0.45)",e.lineWidth=4,ye.roundRect(e,24,16,48,64,9),e.stroke(),e.fillStyle="rgba(255, 221, 128, 0.7)",e.beginPath(),e.arc(62,48,4,0,Math.PI*2),e.fill()}static drawStairs(e){e.save(),e.fillStyle="rgba(84, 58, 35, 0.18)",e.fillRect(12,18,72,62),e.strokeStyle="rgba(255, 246, 218, 0.42)",e.lineWidth=5;for(let t=0;t<6;t++){const n=22+t*10;e.beginPath(),e.moveTo(20+t*4,n),e.lineTo(76-t*3,n),e.stroke()}e.strokeStyle="rgba(92, 58, 32, 0.34)",e.lineWidth=3,e.beginPath(),e.moveTo(20,78),e.lineTo(80,20),e.stroke(),e.restore()}static drawBlocked(e){e.save(),e.fillStyle="rgba(20, 24, 28, 0.2)",ye.roundRect(e,12,12,72,72,15),e.fill(),e.strokeStyle="rgba(255, 255, 255, 0.18)",e.lineWidth=4,e.beginPath(),e.moveTo(22,28),e.lineTo(74,68),e.moveTo(72,25),e.lineTo(24,73),e.stroke(),e.restore()}destroy(){this.clearObjects(),this.mesh&&(this.restoreBaseMaterial(),this.threeManager.removeFromWorld(this.mesh),this.mesh=null)}};on(ye,"geometry",new Ot(.98,jc,.98)),on(ye,"topOffset",Ag),on(ye,"materialCache",new Map);let Rs=ye;const Rg=16;class ut{constructor(e,t={}){this.threeManager=e,this.chunkSize=t.chunkSize||Rg,this.tiles=[],this.tileMap=new Map,this.elevationMap=new Map,this.surfaceMap=new Map,this.chunkMap=new Map,this.buildingStates=new Map,this.sightCutawayTiles=new Set,this.visibleTileRadius=t.visibleTileRadius||34,this.lastVisibilityCenter=null}generate(e,t){this.clear();for(let n=-e/2;n<e/2;n++)for(let r=-t/2;r<t/2;r++){const s=Math.sqrt(n*n+r*r);let o=1,a=ae.GEO,l=0;s>e*.4?(a=ae.HYDRO,l=2,o=0,Math.abs(Math.sin(n*.2)*Math.cos(r*.2))>.7&&(l=4)):s>e*.35&&(a=ae.ANEMO,o=0);for(let c=0;c<=o;c++){const u=c===o?a:ae.GEO,d=c===o?l:0;this.addTile(n,r,c,u,d)}}}generateFromArray(e,t){var a;this.clear();const n=e.length,r=((a=e[0])==null?void 0:a.length)||0,s=Math.floor(r/2),o=Math.floor(n/2);for(let l=0;l<n;l++){const c=e[l];for(let u=0;u<r;u++){const d=c[u],f=this.resolveBlockInfo(d,t),v=u-s,x=l-o;if(this.isTwoBlockBuildingWall(f)){this.addTile(v,x,0,ae.GEO,0,0,_e.NONE);for(let y=1;y<=f.maxZ;y++){const _=y===f.maxZ?this.getUpperWindowPart(f.building):f.building;this.addTile(v,x,y,f.element,f.textureValue??0,f.effect??0,_)}continue}for(let y=0;y<=f.maxZ;y++){const _=y===f.maxZ?f.element:ae.GEO,p=y===f.maxZ?f.textureValue??0:0,b=y===f.maxZ?f.effect??0:0,C=y===f.maxZ?f.building??0:0;this.addTile(v,x,y,_,p,b,C)}}}}resolveBlockInfo(e,t={}){var n;if(typeof e=="string"){const r=t[e]||t[(n=e.toUpperCase)==null?void 0:n.call(e)]||null;if(r)return Ta(r)}return Ta(e)}isTwoBlockBuildingWall(e){return(e==null?void 0:e.element)===ae.STRUCTURE&&e.maxZ>=2&&(e.building===_e.WALL||this.isLowerWindowPart(e.building))}isLowerWindowPart(e){return[_e.WINDOW_LOWER_NORTH,_e.WINDOW_LOWER_SOUTH,_e.WINDOW_LOWER_WEST,_e.WINDOW_LOWER_EAST].includes(e)}getUpperWindowPart(e){return{[_e.WINDOW_LOWER_NORTH]:_e.WINDOW_UPPER_NORTH,[_e.WINDOW_LOWER_SOUTH]:_e.WINDOW_UPPER_SOUTH,[_e.WINDOW_LOWER_WEST]:_e.WINDOW_UPPER_WEST,[_e.WINDOW_LOWER_EAST]:_e.WINDOW_UPPER_EAST}[e]||e}generateFromChunkedArray(e,t,n=this.chunkSize,r={}){this.chunkSize=n,this.generateFromArray(e,t);const s=Array.isArray(r)?r:r.buildings||[];this.registerBuildingBlueprints(s)}addTile(e,t,n,r,s=0,o=0,a=0){const l=new Rs(this.threeManager,e,t,n,{element:r,textureValue:s,effect:o,building:a});this.tiles.push(l);const c=this.getTileKey(e,t,n);this.tileMap.set(c,l),this.registerTileInChunk(e,t,c);const u=this.getColumnKey(e,t),d=this.elevationMap.get(u)??-1;return n>d&&(this.elevationMap.set(u,n),this.surfaceMap.set(u,{x:e,y:t,z:n,element:r,textureValue:s,effect:o,building:a,definition:Ai(r,s)})),l}getTileAt(e,t,n){return this.tileMap.get(this.getTileKey(e,t,n))}getElevation(e,t){const{gridX:n,gridY:r}=this.toGridPosition(e,t);return this.elevationMap.get(this.getColumnKey(n,r))??0}getTopSurfaceOffset(){return Rs.topOffset}getSurfaceWorldY(e,t){return this.getElevation(e,t)+this.getTopSurfaceOffset()}getSurfaceAt(e,t){const{gridX:n,gridY:r}=this.toGridPosition(e,t);return this.surfaceMap.get(this.getColumnKey(n,r))}findHighestWalkable(){let e=null;for(const t of this.surfaceMap.values())this.isWalkable(t.x,t.y)&&(!e||t.z>e.z)&&(e=t);return e?{x:e.x,y:e.y,z:e.z}:null}hasTileColumn(e,t){const{gridX:n,gridY:r}=this.toGridPosition(e,t);return this.elevationMap.has(this.getColumnKey(n,r))}isWalkable(e,t){const n=this.getSurfaceAt(e,t);return n?Tg(n.element,n.textureValue):!1}canOccupyTile(e,t,n=e,r=t){if(!this.isWalkable(e,t))return!1;const s=this.getElevation(n,r),a=this.getElevation(e,t)-s;return Math.abs(a)<1?!0:Math.abs(a)===1}canMoveBetween(e,t,n,r,s=!1){const o=this.toGridPosition(e,t),a=this.toGridPosition(n,r);if(o.gridX===a.gridX&&o.gridY===a.gridY)return this.canOccupyTile(a.gridX,a.gridY,o.gridX,o.gridY);if(!this.canOccupyTile(a.gridX,a.gridY,o.gridX,o.gridY))return!1;const l=a.gridX-o.gridX,c=a.gridY-o.gridY;if(Math.abs(l)>1||Math.abs(c)>1)return!1;const u=s||Math.abs(l)===1&&Math.abs(c)===1;if(!this.canUseStairsBetween(o.gridX,o.gridY,a.gridX,a.gridY,u))return!1;if(!u)return!0;const d=this.canOccupyTile(a.gridX,o.gridY,o.gridX,o.gridY),f=this.canOccupyTile(o.gridX,a.gridY,o.gridX,o.gridY);return d&&f}canOccupyFootprint(e,t,n=e,r=t,s=.32){const o=this.toGridPosition(n,r),a=this.getFootprintSamples(e,t,s);for(const l of a){const c=this.toGridPosition(l.x,l.y);if(!this.canOccupyTile(c.gridX,c.gridY,o.gridX,o.gridY))return!1}return!0}canMoveFootprintBetween(e,t,n,r,s=.32){const o=this.toGridPosition(e,t),a=this.toGridPosition(n,r),l=o.gridX!==a.gridX&&o.gridY!==a.gridY;return this.canMoveBetween(o.gridX,o.gridY,a.gridX,a.gridY,l)?this.canOccupyFootprint(n,r,o.gridX,o.gridY,s):!1}getFootprintSamples(e,t,n=.32){const r=n*.72;return[{x:e,y:t},{x:e+n,y:t},{x:e-n,y:t},{x:e,y:t+n},{x:e,y:t-n},{x:e+r,y:t+r},{x:e+r,y:t-r},{x:e-r,y:t+r},{x:e-r,y:t-r}]}registerBuildingBlueprints(e=[]){this.clearBuildingStates();for(const t of e){const n=this.createBuildingState(t);n&&this.buildingStates.set(t.id,n)}}createBuildingState(e){var a,l;if(!(e!=null&&e.id))return null;const t={...e,wallTiles:[],interiorKeys:new Set,roof:null,roofTiles:[],doors:[],wallDecorations:null,furniture:null,roofVisibleByRange:!0,floorZ:0,isOpen:!1};let n=-1/0,r=1/0,s=1/0;for(let c=0;c<e.height;c++)for(let u=0;u<e.width;u++){const d=e.x+u,f=e.y+c,v=this.getSurfaceAt(d,f);if(!v)continue;const x=this.getSurfaceWorldY(d,f);n=Math.max(n,x);const y=u===0||c===0||u===e.width-1||c===e.height-1,_=((a=e.door)==null?void 0:a.x)===u&&((l=e.door)==null?void 0:l.y)===c,p=this.getColumnKey(d,f);if(y&&!_)for(let b=1;b<=v.z;b++){const C=this.getTileAt(d,f,b);(C==null?void 0:C.element)===ae.STRUCTURE&&t.wallTiles.push(C)}else t.interiorKeys.add(p),r=Math.min(r,x),s=Math.min(s,v.z)}if(n===-1/0)return null;const o=r===1/0?.48:r;return t.floorZ=s===1/0?0:s,t.roof=this.createBuildingRoof(e,n,t),t.wallDecorations=this.createBuildingWallDecorations(e,o,t),t.furniture=this.createBuildingFurniture(e,o),t}createBuildingRoof(e,t,n){const r=new un;r.position.set(e.x+(e.width-1)/2,t+.23,e.y+(e.height-1)/2),r.userData.buildingId=e.id;const s=ut.getRoofMaterial(e.style),o=ut.getTrimMaterial(e.style),a=new Ot(.98,.34,.98),l=new Ot(.98,.28,.16),c=new Ot(.16,.28,.98),u=-(e.width-1)/2,d=-(e.height-1)/2;for(let f=0;f<e.height;f++)for(let v=0;v<e.width;v++){const x=new un;x.position.set(u+v,0,d+f),x.userData.cutawayType="roof-block";const y=new ot(a,s);if(x.add(y),f===0||f===e.height-1){const _=new ot(l,o);_.position.y=.3,x.add(_)}if(v===0||v===e.width-1){const _=new ot(c,o);_.position.y=.3,x.add(_)}r.add(x),n.roofTiles.push({mesh:x,x:e.x+v,y:e.y+f,worldY:r.position.y})}return r.traverse(f=>{f.castShadow=!0,f.receiveShadow=!0,f.raycast=()=>{},f.renderOrder=12}),this.threeManager.addToWorld(r),r}createBuildingWallDecorations(e,t,n){const r=new un;r.userData.buildingId=e.id;const s=ut.getTrimMaterial(e.style);if(e.door){const o=this.getBuildingEdge(e,e.door.x,e.door.y);if(o){const a=this.createDoorPanel(e,t,o,s);n.doors.push({pivot:a,edge:o}),r.add(a)}}return this.threeManager.addToWorld(r),r}getBuildingEdge(e,t,n){return n===0?"north":n===e.height-1?"south":t===0?"west":t===e.width-1?"east":null}createDoorPanel(e,t,n,r){const s=new un,o=1.82,a=.64,l=.1,c=n==="north"||n==="south",u=new ot(new Ot(c?a:l,o,c?l:a),r),d=e.x+e.door.x,f=e.y+e.door.y;return s.position.set(d,t,f),n==="north"?(s.position.z-=.52,u.position.x=a/2):n==="south"?(s.position.z+=.52,u.position.x=-a/2):n==="west"?(s.position.x-=.52,u.position.z=-a/2):n==="east"&&(s.position.x+=.52,u.position.z=a/2),u.position.y=o/2,u.castShadow=!0,u.raycast=()=>{},s.add(u),s}createBuildingFurniture(e,t){const n=new un;n.userData.buildingId=e.id;const r=t+.08,s=e.x+1,o=e.x+e.width-2,a=e.y+1,l=e.y+e.height-2;return this.addTable(n,s+.55,r,a+.55,e.style),this.addBench(n,o-.3,r,a+.65,e.style,"x"),this.addCrateStack(n,s+.35,r,l-.35,e.style),e.width>=7&&e.height>=6?(this.addCounter(n,o-.45,r,l-.25,e.style),this.addBed(n,s+1.45,r,l-.45,e.style)):this.addStool(n,o-.35,r,l-.35,e.style),n.traverse(c=>{c.castShadow=!0,c.receiveShadow=!0,c.raycast=()=>{}}),this.threeManager.addToWorld(n),n}addTable(e,t,n,r,s){const o=ut.getFurnitureMaterial(s),a=new ot(new Ot(.92,.12,.72),o);a.position.set(t,n+.34,r),e.add(a);for(const l of[-.32,.32])for(const c of[-.24,.24]){const u=new ot(new Ot(.1,.34,.1),o);u.position.set(t+l,n+.17,r+c),e.add(u)}}addBench(e,t,n,r,s,o="x"){const a=ut.getFurnitureMaterial(s),l=new ot(new Ot(o==="x"?1.18:.28,.18,o==="x"?.28:1.18),a);l.position.set(t,n+.22,r),e.add(l)}addCounter(e,t,n,r,s){const o=ut.getFurnitureMaterial(s),a=new ot(new Ot(1.32,.56,.42),o);a.position.set(t,n+.28,r),e.add(a)}addBed(e,t,n,r,s){const o=ut.getFurnitureMaterial(s),a=ut.getBlanketMaterial(s),l=new ot(new Ot(1.42,.24,.78),o);l.position.set(t,n+.15,r),e.add(l);const c=new ot(new Ot(1.12,.12,.62),a);c.position.set(t+.06,n+.34,r),e.add(c)}addCrateStack(e,t,n,r,s){const o=ut.getFurnitureMaterial(s),a=new ot(new Ot(.42,.42,.42),o);a.position.set(t,n+.21,r),e.add(a);const l=new ot(new Ot(.34,.34,.34),o);l.position.set(t+.34,n+.17,r+.22),e.add(l)}addStool(e,t,n,r,s){const o=ut.getFurnitureMaterial(s),a=new ot(new Ot(.34,.26,.34),o);a.position.set(t,n+.13,r),e.add(a)}static getRoofMaterial(e){ut.roofMaterialCache||(ut.roofMaterialCache=new Map);const t=e||"timber";return ut.roofMaterialCache.has(t)||ut.roofMaterialCache.set(t,new Dn({color:t==="stone"?7306887:10896949,roughness:.82,metalness:.02})),ut.roofMaterialCache.get(t)}static getTrimMaterial(e){ut.trimMaterialCache||(ut.trimMaterialCache=new Map);const t=e||"timber";return ut.trimMaterialCache.has(t)||ut.trimMaterialCache.set(t,new Dn({color:t==="stone"?13883858:5911585,roughness:.86,metalness:.02})),ut.trimMaterialCache.get(t)}static getFurnitureMaterial(e){ut.furnitureMaterialCache||(ut.furnitureMaterialCache=new Map);const t=e||"timber";return ut.furnitureMaterialCache.has(t)||ut.furnitureMaterialCache.set(t,new Dn({color:t==="stone"?7622454:9132596,roughness:.88,metalness:.01})),ut.furnitureMaterialCache.get(t)}static getBlanketMaterial(e){ut.blanketMaterialCache||(ut.blanketMaterialCache=new Map);const t=e||"timber";return ut.blanketMaterialCache.has(t)||ut.blanketMaterialCache.set(t,new Dn({color:t==="stone"?4745885:9387864,roughness:.72,metalness:.01})),ut.blanketMaterialCache.get(t)}updateBuildingVisibility(e,t){const n=this.getBuildingAt(e,t);for(const r of this.buildingStates.values())this.setBuildingOpen(r,(n==null?void 0:n.id)===r.id);return n}getBuildingAt(e,t){const n=this.toGridPosition(e,t),r=this.getColumnKey(n.gridX,n.gridY);for(const s of this.buildingStates.values())if(s.interiorKeys.has(r))return s;return null}setBuildingOpen(e,t){e.isOpen!==t&&(e.isOpen=t,e.wallDecorations&&(e.wallDecorations.visible=!0),this.setDoorOpen(e,t))}setDoorOpen(e,t){for(const n of e.doors||[]){const r=n.edge==="north"||n.edge==="west"?-1:1;n.pivot.rotation.y=t?r*Math.PI*.58:0,n.pivot.visible=!0}}syncRoofVisibility(e){e!=null&&e.roof&&(e.roof.visible=e.roofVisibleByRange!==!1)}updateVisibleTilesAround(e,t,n=this.visibleTileRadius){const r=this.toGridPosition(e,t);if(this.lastVisibilityCenter&&this.lastVisibilityCenter.x===r.gridX&&this.lastVisibilityCenter.y===r.gridY&&this.lastVisibilityCenter.radius===n)return;this.lastVisibilityCenter={x:r.gridX,y:r.gridY,radius:n};const s=n*n;for(const o of this.tiles){const a=o.gridX-r.gridX,l=o.gridY-r.gridY;o.visibleByRange=a*a+l*l<=s,this.syncTileVisibility(o)}for(const o of this.buildingStates.values()){if(!o.roof)continue;const a=o.roof.position.x-r.gridX,l=o.roof.position.z-r.gridY,c=a*a+l*l<=s;o.roofVisibleByRange=c,this.syncRoofVisibility(o),o.wallDecorations&&(o.wallDecorations.visible=c),o.furniture&&(o.furniture.visible=c)}}updatePlayerSightCutaway(e,t,n,r=4){if(this.clearSightCutaway(),!n)return;const s=this.toGridPosition(e,t),o=this.getSurfaceAt(s.gridX,s.gridY);if(!o)return;const a=new ct(n.position.x-s.gridX,n.position.z-s.gridY);if(a.lengthSq()<1e-4)return;a.normalize();for(let u=s.gridX-r;u<=s.gridX+r;u++)for(let d=s.gridY-r;d<=s.gridY+r;d++){if(u===s.gridX&&d===s.gridY)continue;const f=this.getSurfaceAt(u,d);if(!f)continue;const v=new ct(u-s.gridX,d-s.gridY),x=v.length();if(x<.75||x>r)continue;const y=v.normalize().dot(a),_=Math.abs((u-s.gridX)*a.y-(d-s.gridY)*a.x);if(y<.36||_>1.6||!this.shouldHideTileForSightCutaway(f,o))continue;const p=this.getTileAt(f.x,f.y,f.z);p&&(p.hiddenBySightCutaway=!0,this.sightCutawayTiles.add(p),this.syncTileVisibility(p))}const l=this.getSurfaceWorldY(s.gridX,s.gridY),c=this.createPlayerSightRays(n,s.gridX,s.gridY,l);for(const u of this.buildingStates.values())u.floorZ===o.z&&(this.cutAwayObstructingWalls(u,o,c),this.cutAwayObstructingRoofBlocks(u,c))}clearSightCutaway(){var e,t;if((e=this.sightCutawayTiles)!=null&&e.size){for(const n of this.sightCutawayTiles){if(((t=n==null?void 0:n.userData)==null?void 0:t.cutawayType)==="roof-block"){n.visible=!0;continue}n.hiddenBySightCutaway=!1,this.syncTileVisibility(n)}this.sightCutawayTiles.clear()}}createPlayerSightRays(e,t,n,r){const s=new G(t-e.position.x,0,n-e.position.z);if(s.lengthSq()<1e-4)return[];s.normalize();const o=new G(-s.z,0,s.x),a=[];for(const l of[.22,.92,1.62])for(const c of[-.34,0,.34])a.push({from:e.position,to:new G(t+o.x*c,r+l,n+o.z*c)});return a}cutAwayObstructingWalls(e,t,n){const r=t.z+1,s=t.z+2;for(const o of e.wallTiles)o.elevation<r||o.elevation>s||this.sightRaysIntersectBox(n,o.gridX-.49,o.elevation-.48,o.gridY-.49,o.gridX+.49,o.elevation+.48,o.gridY+.49)&&(o.hiddenBySightCutaway=!0,this.sightCutawayTiles.add(o),this.syncTileVisibility(o))}cutAwayObstructingRoofBlocks(e,t){for(const n of e.roofTiles)this.sightRaysIntersectBox(t,n.x-.49,n.worldY-.18,n.y-.49,n.x+.49,n.worldY+.46,n.y+.49)&&(n.mesh.visible=!1,this.sightCutawayTiles.add(n.mesh))}sightRaysIntersectBox(e,t,n,r,s,o,a){return e.some(l=>this.segmentIntersectsBox(l.from,l.to,t,n,r,s,o,a))}segmentIntersectsBox(e,t,n,r,s,o,a,l){let c=0,u=1;const d=t.x-e.x,f=t.y-e.y,v=t.z-e.z;if(Math.abs(d)<1e-4){if(e.x<n||e.x>o)return!1}else{const x=1/d,y=(n-e.x)*x,_=(o-e.x)*x;if(c=Math.max(c,Math.min(y,_)),u=Math.min(u,Math.max(y,_)),c>u)return!1}if(Math.abs(f)<1e-4){if(e.y<r||e.y>a)return!1}else{const x=1/f,y=(r-e.y)*x,_=(a-e.y)*x;if(c=Math.max(c,Math.min(y,_)),u=Math.min(u,Math.max(y,_)),c>u)return!1}if(Math.abs(v)<1e-4){if(e.z<s||e.z>l)return!1}else{const x=1/v,y=(s-e.z)*x,_=(l-e.z)*x;if(c=Math.max(c,Math.min(y,_)),u=Math.min(u,Math.max(y,_)),c>u)return!1}return u>=0&&c<=.985}shouldHideTileForSightCutaway(e,t){return!e||!t||e.element===ae.HYDRO||e.element===ae.STRUCTURE?!1:e.element===ae.ANEMO||e.element===ae.GEO||e.element===ae.CRYO?e.z>t.z:!1}canUseStairsBetween(e,t,n,r,s=!1){const o=this.getSurfaceAt(e,t),a=this.getSurfaceAt(n,r),l=((a==null?void 0:a.z)??0)-((o==null?void 0:o.z)??0);return l===0?!0:Math.abs(l)===1}syncTileVisibility(e){e!=null&&e.mesh&&(e.mesh.visible=e.visibleByRange!==!1&&!e.hiddenBySightCutaway)}supportsHabitat(e,t,n){const r=this.getSurfaceAt(e,t);return r?bg(r.element,r.textureValue,n):!1}getMoveCost(e,t,n,r,s=!1){var v;if(!this.canMoveBetween(e,t,n,r,s))return 1/0;const o=this.getElevation(e,t),l=this.getElevation(n,r)-o;if(l>=2)return 1/0;const c=this.getSurfaceAt(n,r),u=s?1.414:1,d=((v=c==null?void 0:c.definition)==null?void 0:v.moveCost)||1,f=l>0?l*.5:l*.15;return Math.max(.1,u*d+f)}findNearestHabitat(e,t,n,r=16){const s=this.toGridPosition(e,t);let o=null;for(let a=0;a<=r;a++){for(let l=s.gridX-a;l<=s.gridX+a;l++){for(let c=s.gridY-a;c<=s.gridY+a;c++)if(!(Math.abs(l-s.gridX)!==a&&Math.abs(c-s.gridY)!==a)&&this.supportsHabitat(l,c,n)){o={x:l,y:c,z:this.getElevation(l,c)};break}if(o)break}if(o)return o}return null}findNearestWalkable(e,t,n=48){const r=this.toGridPosition(e,t);for(let s=0;s<=n;s++)for(let o=r.gridX-s;o<=r.gridX+s;o++)for(let a=r.gridY-s;a<=r.gridY+s;a++)if(!(Math.abs(o-r.gridX)!==s&&Math.abs(a-r.gridY)!==s)&&this.isWalkable(o,a))return{x:o,y:a,z:this.getElevation(o,a)};return null}modifyTile(e,t,n,r,s=0,o=0,a=0){const l=this.getTileAt(e,t,n);l?(console.log(`[WorldGenerator] Modifying tile at ${e},${t},${n} to Element:${r}, Var:${s}`),l.setElementalType(r,s,o,a)):this.addTile(e,t,n,r,s,o,a)}applyIceToTile(e,t,n){const r=this.getTileAt(e,t,n);r&&r.element===ae.HYDRO&&this.modifyTile(e,t,n,ae.CRYO,0,ae.CRYO,r.building)}removeTile(e,t,n){const r=this.getTileKey(e,t,n),s=this.tileMap.get(r);if(s){s.destroy(),this.tileMap.delete(r),this.tiles=this.tiles.filter(c=>c!==s),this.unregisterTileFromChunk(e,t,r);let o=-1,a=null;for(let c=n+10;c>=0;c--){const u=this.tileMap.get(this.getTileKey(e,t,c));if(u){o=c,a=u;break}}const l=this.getColumnKey(e,t);o===-1?(this.elevationMap.delete(l),this.surfaceMap.delete(l)):(this.elevationMap.set(l,o),this.surfaceMap.set(l,{x:e,y:t,z:o,element:a.element,textureValue:a.textureValue,effect:a.effect,building:a.building,definition:Ai(a.element,a.textureValue)}))}}clear(){this.clearSightCutaway(),this.clearBuildingStates(),this.tiles.forEach(e=>e.destroy()),this.tiles=[],this.tileMap.clear(),this.elevationMap.clear(),this.surfaceMap.clear(),this.chunkMap.clear(),this.lastVisibilityCenter=null}clearBuildingStates(){if(this.buildingStates){for(const e of this.buildingStates.values())e.roof&&(ut.disposeSceneObject(e.roof,this.threeManager),e.roof=null),e.wallDecorations&&(ut.disposeSceneObject(e.wallDecorations,this.threeManager),e.wallDecorations=null),e.furniture&&(ut.disposeSceneObject(e.furniture,this.threeManager),e.furniture=null);this.buildingStates.clear()}}static disposeSceneObject(e,t){t.removeFromWorld(e),e.traverse(n=>{var r;(r=n.geometry)==null||r.dispose()})}exportWorld(){const e=this.tiles.map(t=>({gridX:t.gridX,gridY:t.gridY,elevation:t.elevation,element:t.element,variant:t.textureValue,effect:t.effect,building:t.building}));return JSON.stringify(e)}loadWorld(e){try{const t=JSON.parse(e);this.clear(),t.forEach(n=>{this.addTile(n.gridX,n.gridY,n.elevation,n.element,n.variant,n.effect,n.building)}),console.log(`[WorldGenerator] Loaded ${t.length} tiles.`)}catch(t){console.error("[WorldGenerator] Failed to load world:",t)}}getTileKey(e,t,n){return`${e},${t},${n}`}getColumnKey(e,t){return`${e},${t}`}toGridPosition(e,t){return{gridX:Math.round(e),gridY:Math.round(t)}}getChunkCoord(e){return Math.floor(e/this.chunkSize)}getChunkKey(e,t){return`${e},${t}`}getChunkKeyForTile(e,t){return this.getChunkKey(this.getChunkCoord(e),this.getChunkCoord(t))}registerTileInChunk(e,t,n){const r=this.getChunkKeyForTile(e,t);if(!this.chunkMap.has(r)){const[s,o]=r.split(",").map(Number);this.chunkMap.set(r,{chunkX:s,chunkY:o,tileKeys:new Set})}this.chunkMap.get(r).tileKeys.add(n)}unregisterTileFromChunk(e,t,n){const r=this.getChunkKeyForTile(e,t),s=this.chunkMap.get(r);s&&(s.tileKeys.delete(n),s.tileKeys.size===0&&this.chunkMap.delete(r))}getLoadedChunkSummary(){return[...this.chunkMap.values()].map(e=>({chunkX:e.chunkX,chunkY:e.chunkY,blocks:e.tileKeys.size}))}}const _i=8,wo=4,Cg=.11,Ql=96,ec=128,Pg=1.28,tc=1.86,as=.32,Ig=.025,Ao={south:0,west:1,east:2,north:3},_r=new G,vr=new G,xr=new ct,Mt=class Mt{constructor(e,t,n,r,s,o={}){this.threeManager=e,this.inputManager=t,this.worldGenerator=n,this.isLocal=o.isLocal??!0,this.userId=o.userId||"player",this.gridX=r,this.gridY=s,this.gridZ=this.worldGenerator.getElevation(r,s),this.visualX=this.gridX,this.visualY=this.gridY,this.visualZ=this.gridZ,this.targetX=this.gridX,this.targetY=this.gridY,this.targetZ=this.gridZ,this.speed=4.8,this.currentPath=[],this.direction="south",this.frame=0,this.frameTimer=0,this.isMoving=!1,this.footRadius=as,this.group=new un,this.shadow=new ot(Mt.shadowGeometry,Mt.shadowMaterial),this.shadow.rotation.x=-Math.PI/2,this.shadow.position.y=.018,this.shadow.renderOrder=18,this.group.add(this.shadow),this.occlusionShadow=new ot(Mt.shadowGeometry,Mt.occlusionShadowMaterial),this.occlusionShadow.rotation.x=-Math.PI/2,this.occlusionShadow.position.y=.022,this.occlusionShadow.renderOrder=25,this.group.add(this.occlusionShadow),this.collisionDisc=new ot(Mt.collisionFillGeometry,Mt.collisionFillMaterial),this.collisionDisc.rotation.x=-Math.PI/2,this.collisionDisc.position.y=.03,this.collisionDisc.renderOrder=29,this.collisionDisc.visible=!1,this.group.add(this.collisionDisc),this.collisionRing=new ot(Mt.collisionGeometry,Mt.collisionMaterial),this.collisionRing.rotation.x=-Math.PI/2,this.collisionRing.position.y=.035,this.collisionRing.renderOrder=30,this.collisionRing.visible=!1,this.group.add(this.collisionRing),this.material=new Wn({transparent:!0,alphaTest:.08,depthTest:!0,depthWrite:!1,depthFunc:Cn}),this.mesh=new ot(Mt.geometry,this.material),this.mesh.position.y=tc/2+.07,this.mesh.renderOrder=24,this.group.add(this.mesh),this.occlusionMaterial=new Wn({color:10026993,transparent:!0,opacity:.42,alphaTest:.08,depthTest:!0,depthWrite:!1,depthFunc:wr,blending:xs}),this.occlusionMesh=new ot(Mt.geometry,this.occlusionMaterial),this.occlusionMesh.position.copy(this.mesh.position),this.occlusionMesh.scale.set(1.08,1.08,1),this.occlusionMesh.renderOrder=26,this.group.add(this.occlusionMesh),this.threeManager.addToEntities(this.group),this.setTileOcclusionEnabled(!0),this.loadTexture(),this.syncModel()}async loadTexture(){const e=await Mt.getSourceTexture();this.texture=e.clone(),this.texture.needsUpdate=!0,this.texture.repeat.set(1/_i,1/wo),this.material.map=this.texture,this.material.needsUpdate=!0,this.occlusionMaterial.map=this.texture,this.occlusionMaterial.needsUpdate=!0,this.updateFrame(0)}static getSourceTexture(){if(!Mt.texturePromise){const e=Mt.createAnimeSpriteSheet(),t=new xa(e);t.colorSpace=Jt,t.magFilter=Vt,t.minFilter=Vt,t.needsUpdate=!0,Mt.texturePromise=Promise.resolve(t)}return Mt.texturePromise}static createAnimeSpriteSheet(){const e=document.createElement("canvas");e.width=Ql*_i,e.height=ec*wo;const t=e.getContext("2d");t.clearRect(0,0,e.width,e.height);for(const[n,r]of Object.entries(Ao))for(let s=0;s<_i;s++)Mt.drawAnimeFrame(t,s*Ql,r*ec,s,n);return e}static drawAnimeFrame(e,t,n,r,s){const o=Math.sin(r/_i*Math.PI*2)*2,a=Math.sin(r/_i*Math.PI*2),l=s==="west"?-1:s==="east"?1:0,c="#ffe2cf",u="#ff9eb4",d="#4b2f7f",f="#2d214f",v="#7fd6ff",x="#3989c7",y="#5a3a55",_="rgba(42, 28, 54, 0.72)";e.save(),e.translate(t,n),e.lineCap="round",e.lineJoin="round",e.fillStyle="rgba(42, 32, 48, 0.18)",e.beginPath(),e.ellipse(48,116,18,5,0,0,Math.PI*2),e.fill();const p=66+o,b=34+o,C=l*4;e.strokeStyle=_,e.lineWidth=5,e.fillStyle=x,Mt.roundRect(e,31,p,34,39,13),e.fill(),e.stroke(),e.fillStyle=v,Mt.roundRect(e,35,p+2,26,32,11),e.fill(),e.strokeStyle=_,e.lineWidth=6,e.beginPath(),e.moveTo(35,p+13),e.lineTo(25+a*2,p+31),e.moveTo(61,p+13),e.lineTo(71-a*2,p+31),e.stroke(),e.strokeStyle=y,e.lineWidth=8,e.beginPath(),e.moveTo(39,p+37),e.lineTo(35+a*3,113),e.moveTo(57,p+37),e.lineTo(61-a*3,113),e.stroke(),e.strokeStyle=_,e.lineWidth=5,e.fillStyle=c,e.beginPath(),e.ellipse(48,b+15,22,24,0,0,Math.PI*2),e.fill(),e.stroke(),e.fillStyle=d,e.beginPath(),e.ellipse(47,b+6,24,18,-.08,0,Math.PI*2),e.fill(),e.fillStyle=f,e.beginPath(),e.ellipse(33-C*.2,b+22,8,17,.18,0,Math.PI*2),e.ellipse(63+C*.2,b+20,8,15,-.18,0,Math.PI*2),e.fill(),e.fillStyle="#2d2540",s!=="north"&&(e.beginPath(),e.ellipse(40+C,b+16,3,5,0,0,Math.PI*2),e.ellipse(55+C,b+16,3,5,0,0,Math.PI*2),e.fill(),e.fillStyle="#ffffff",e.beginPath(),e.arc(41+C,b+14,1.2,0,Math.PI*2),e.arc(56+C,b+14,1.2,0,Math.PI*2),e.fill(),e.fillStyle=u,e.globalAlpha=.42,e.beginPath(),e.ellipse(32+C,b+25,4,2,0,0,Math.PI*2),e.ellipse(64+C,b+25,4,2,0,0,Math.PI*2),e.fill(),e.globalAlpha=1),e.restore()}static roundRect(e,t,n,r,s,o){e.beginPath(),e.moveTo(t+o,n),e.arcTo(t+r,n,t+r,n+s,o),e.arcTo(t+r,n+s,t,n+s,o),e.arcTo(t,n+s,t,n,o),e.arcTo(t,n,t+r,n,o),e.closePath()}setPath(e){if(this.currentPath=[...e],this.currentPath.length>0){const t=this.currentPath[0];Math.abs(t.x-this.gridX)<.1&&Math.abs(t.y-this.gridY)<.1&&this.currentPath.shift()}}setRemoteTarget(e,t,n){this.targetX=e,this.targetY=t,this.targetZ=n}update(e=1/60){this.isLocal?this.updateLocal(e):this.updateRemote(e),this.updateAnimation(e),this.syncModel()}updateLocal(e){const t=this.speed*Math.min(e,.05);if(this.isMoving=!1,this.currentPath.length>0){const s=this.currentPath[0];this.moveToward(s.x,s.y,t),Math.abs(s.x-this.gridX)<.001&&Math.abs(s.y-this.gridY)<.001&&this.currentPath.shift();return}const n=(this.inputManager.isKeyDown("KeyD")?1:0)-(this.inputManager.isKeyDown("KeyA")?1:0),r=(this.inputManager.isKeyDown("KeyW")?1:0)-(this.inputManager.isKeyDown("KeyS")?1:0);if(n!==0||r!==0){const{mx:s,my:o}=this.getCameraRelativeMovement(n,r),a=this.gridX+s*t,l=this.gridY+o*t,c=this.tryMove(a,this.gridY,s,0),u=this.tryMove(this.gridX,l,0,o);!c&&!u&&this.tryMove(a,l,s,o)}}getCameraRelativeMovement(e,t){return _r.set(0,0,-1).applyQuaternion(this.threeManager.camera.quaternion),_r.y=0,_r.normalize(),vr.set(1,0,0).applyQuaternion(this.threeManager.camera.quaternion),vr.y=0,vr.normalize(),xr.set(vr.x*e+_r.x*t,vr.z*e+_r.z*t),xr.lengthSq()>1&&xr.normalize(),{mx:xr.x,my:xr.y}}moveToward(e,t,n){const r=e-this.gridX,s=t-this.gridY,o=Math.sqrt(r*r+s*s);o<=n?this.tryMove(e,t,r,s):this.tryMove(this.gridX+r/o*n,this.gridY+s/o*n,r,s)}tryMove(e,t,n,r){Math.round(this.gridX),Math.round(this.gridY);const s=Math.round(e),o=Math.round(t),a=this.worldGenerator.getElevation(s,o);return this.worldGenerator.canMoveFootprintBetween(this.gridX,this.gridY,e,t,this.footRadius)?(this.gridX=e,this.gridY=t,this.gridZ=a,this.targetX=e,this.targetY=t,this.targetZ=a,this.setDirection(n,r),this.isMoving=!0,!0):!1}setCollisionDebugVisible(e){this.collisionDisc.visible=e,this.collisionRing.visible=e}setTileOcclusionEnabled(e=!0){this.material.depthTest=e,this.material.depthFunc=Cn,this.material.needsUpdate=!0,Mt.shadowMaterial.depthTest=e,Mt.shadowMaterial.depthFunc=Cn,Mt.shadowMaterial.needsUpdate=!0,this.occlusionMesh.visible=e,this.occlusionShadow.visible=e}updateRemote(e){const t=Math.min(1,e*12),n=this.targetX-this.gridX,r=this.targetY-this.gridY;this.gridX+=n*t,this.gridY+=r*t,this.gridZ+=(this.targetZ-this.gridZ)*t,this.isMoving=Math.sqrt(n*n+r*r)>.01,this.isMoving&&this.setDirection(n,r)}setDirection(e,t){Math.abs(e)>Math.abs(t)?this.direction=e>0?"east":"west":this.direction=t>0?"south":"north"}updateAnimation(e){this.isMoving?(this.frameTimer+=e,this.frameTimer>=Cg&&(this.frameTimer=0,this.frame=(this.frame+1)%_i)):(this.frame=0,this.frameTimer=0),this.updateFrame(this.frame)}updateFrame(e){if(!this.texture)return;const t=Ao[this.direction]??Ao.south;this.texture.offset.x=e/_i,this.texture.offset.y=1-(t+1)/wo}syncModel(){this.visualX+=(this.gridX-this.visualX)*.45,this.visualY+=(this.gridY-this.visualY)*.45,this.visualZ+=(this.gridZ-this.visualZ)*.2;const e=this.visualZ+this.worldGenerator.getTopSurfaceOffset();this.group.position.set(this.visualX,e+Ig,this.visualY),this.mesh.quaternion.copy(this.threeManager.camera.quaternion),this.occlusionMesh.quaternion.copy(this.mesh.quaternion)}getCenterPayload(){return{centerX:this.gridX,centerY:this.gridY,centerZ:this.gridZ}}applyAuthoritativeCenter(e,t,n,r,s,o){const a=Math.sqrt((e-this.gridX)**2+(t-this.gridY)**2);this.gridX=e,this.gridY=t,this.gridZ=n??o,this.targetX=e,this.targetY=t,this.targetZ=n??o,Number.isFinite(r)&&Number.isFinite(s)&&(this.gridZ=o),a>.75&&(this.visualX=this.gridX,this.visualY=this.gridY,this.visualZ=this.gridZ)}destroy(){this.threeManager.removeFromEntities(this.group),this.texture&&this.texture.dispose(),this.material.dispose(),this.occlusionMaterial.dispose()}};on(Mt,"texturePromise",null),on(Mt,"geometry",new Lr(Pg,tc)),on(Mt,"shadowGeometry",new bs(.42,28)),on(Mt,"collisionGeometry",new Va(as*.9,as*1.08,36)),on(Mt,"collisionFillGeometry",new bs(as,36)),on(Mt,"occlusionShadowMaterial",new Wn({color:10026993,transparent:!0,opacity:.34,depthTest:!0,depthWrite:!1,depthFunc:wr,blending:xs,side:pn})),on(Mt,"shadowMaterial",new Wn({color:266249,transparent:!0,opacity:.36,depthTest:!0,depthWrite:!1,depthFunc:Cn})),on(Mt,"collisionMaterial",new Wn({color:3342223,transparent:!0,opacity:1,depthTest:!1,depthWrite:!1,side:pn})),on(Mt,"collisionFillMaterial",new Wn({color:3342223,transparent:!0,opacity:.18,depthTest:!1,depthWrite:!1,side:pn}));let Cs=Mt;class Dg{constructor(){this.keys={},this.wheelDelta=0,this.callbacks={},this.pointerTarget=window,window.addEventListener("keydown",e=>{this.keys[e.code]||this.callbacks[e.code]&&this.callbacks[e.code].forEach(t=>t()),this.keys[e.code]=!0}),window.addEventListener("keyup",e=>{this.keys[e.code]=!1}),window.addEventListener("wheel",e=>{this.wheelDelta=e.deltaY}),this.onClickCallbacks=[],this.mouseNDC={x:0,y:0},this.handleMouseDown=e=>{this.updateMousePosition(e),this.onClickCallbacks.forEach(t=>t(e.button,e))},this.handleMouseMove=e=>this.updateMousePosition(e),this.setPointerTarget(window)}setPointerTarget(e){this.pointerTarget&&(this.pointerTarget.removeEventListener("mousedown",this.handleMouseDown),this.pointerTarget.removeEventListener("mousemove",this.handleMouseMove)),this.pointerTarget=e||window,this.pointerTarget.addEventListener("mousedown",this.handleMouseDown),this.pointerTarget.addEventListener("mousemove",this.handleMouseMove)}updateMousePosition(e){const n=(this.pointerTarget===window?document.documentElement:this.pointerTarget).getBoundingClientRect(),r=n.width||window.innerWidth,s=n.height||window.innerHeight;this.mouseNDC.x=(e.clientX-n.left)/r*2-1,this.mouseNDC.y=-((e.clientY-n.top)/s)*2+1}isKeyDown(e){return!!this.keys[e]}getWheelDelta(){const e=this.wheelDelta;return this.wheelDelta=0,e}onLeftClick(e){this.onClickCallbacks.push(e)}onKeyDown(e,t){this.callbacks[e]||(this.callbacks[e]=[]),this.callbacks[e].push(t)}}class Lg{constructor(e){this.worldGenerator=e}findPath(e,t,n,r){const s={x:Math.round(e),y:Math.round(t)},o={x:Math.round(n),y:Math.round(r)};if(!this.worldGenerator.isWalkable(o.x,o.y))return[];const a=[s],l=new Map,c=new Set,u=new Map;u.set(`${s.x},${s.y}`,0);const d=new Map;for(d.set(`${s.x},${s.y}`,this.heuristic(s,o));a.length>0;){let f=a[0],v=0;for(let y=1;y<a.length;y++){const _=a[y];(d.get(`${_.x},${_.y}`)??1/0)<(d.get(`${f.x},${f.y}`)??1/0)&&(f=_,v=y)}if(f.x===o.x&&f.y===o.y)return this.reconstructPath(l,f);a.splice(v,1),c.add(`${f.x},${f.y}`);const x=[{x:f.x+1,y:f.y,isDiag:!1},{x:f.x-1,y:f.y,isDiag:!1},{x:f.x,y:f.y+1,isDiag:!1},{x:f.x,y:f.y-1,isDiag:!1},{x:f.x+1,y:f.y+1,isDiag:!0},{x:f.x+1,y:f.y-1,isDiag:!0},{x:f.x-1,y:f.y+1,isDiag:!0},{x:f.x-1,y:f.y-1,isDiag:!0}];for(const y of x){const _=`${y.x},${y.y}`;if(c.has(_))continue;const p=this.worldGenerator.getMoveCost(f.x,f.y,y.x,y.y,y.isDiag);if(!Number.isFinite(p))continue;const b=(u.get(`${f.x},${f.y}`)??1/0)+p;b<(u.get(_)??1/0)&&(l.set(_,f),u.set(_,b),d.set(_,b+this.heuristic(y,o)),a.find(C=>C.x===y.x&&C.y===y.y)||a.push(y))}}return[]}heuristic(e,t){const n=Math.abs(e.x-t.x),r=Math.abs(e.y-t.y);return 1*Math.max(n,r)+(1.414-1)*Math.min(n,r)}reconstructPath(e,t){const n=[t];let r=`${t.x},${t.y}`;for(;e.has(r);)t=e.get(r),n.unshift(t),r=`${t.x},${t.y}`;return n}}class Ug{constructor(e,t,n){this.threeManager=e,this.worldGenerator=t,this.id=n.id,this.species=n.species,this.habitat=n.habitat,this.homeX=n.x,this.homeY=n.y,this.leashRadius=n.leashRadius||4,this.gridX=n.x,this.gridY=n.y,this.gridZ=this.worldGenerator.getElevation(n.x,n.y),this.visualZ=this.gridZ,this.speed=1.35,this.idleTimer=.4,this.target=null,this.bobTime=Math.random()*Math.PI*2,this.group=this.createModel(),this.threeManager.addToEntities(this.group),this.syncModel()}createModel(){const e=new un,t=new Dn({color:13279599,roughness:.8}),n=new Dn({color:16114888,roughness:.85}),r=new Dn({color:5256745,roughness:.75}),s=new ot(new Si(.28,16,12),t);s.scale.set(1.25,.72,.82),s.position.set(0,.22,0),e.add(s);const o=new ot(new Si(.16,12,8),n);o.scale.set(1.1,.7,.55),o.position.set(.15,.2,.02),e.add(o);const a=new ot(new Si(.16,14,10),t);a.position.set(.33,.31,0),e.add(a);const l=new Ga(.045,.32,8),c=new ot(l,t);c.position.set(.34,.56,-.07),c.rotation.z=-.28,e.add(c);const u=new ot(l,t);u.position.set(.34,.56,.07),u.rotation.z=-.18,e.add(u);const d=new ot(new Si(.035,8,6),r);d.position.set(.48,.31,0),e.add(d);const f=new ot(new Si(.09,10,8),n);return f.position.set(-.33,.26,0),e.add(f),e.scale.set(.8,.8,.8),e.userData.wildlife=this,e}update(e){if(this.bobTime+=e*5,this.target||(this.idleTimer-=e,this.idleTimer<=0&&(this.target=this.pickTarget(),this.idleTimer=1.2+Math.random()*2.4)),this.target){const t=this.target.x-this.gridX,n=this.target.y-this.gridY,r=Math.sqrt(t*t+n*n),s=this.speed*Math.min(e,.05);if(r<=s)this.gridX=this.target.x,this.gridY=this.target.y,this.gridZ=this.worldGenerator.getElevation(this.gridX,this.gridY),this.target=null;else{this.gridX+=t/r*s,this.gridY+=n/r*s;const o=Math.round(this.gridX),a=Math.round(this.gridY);this.gridZ=this.worldGenerator.getElevation(o,a),this.group.rotation.y=t<0?Math.PI:0}}this.syncModel()}pickTarget(){const e=[];for(let t=this.homeX-this.leashRadius;t<=this.homeX+this.leashRadius;t++)for(let n=this.homeY-this.leashRadius;n<=this.homeY+this.leashRadius;n++)Math.sqrt((t-this.homeX)**2+(n-this.homeY)**2)>this.leashRadius||this.worldGenerator.supportsHabitat(t,n,this.habitat)&&e.push({x:t,y:n});return e.length===0?null:e[Math.floor(Math.random()*e.length)]}syncModel(){this.visualZ+=(this.gridZ-this.visualZ)*.18;const e=this.target?Math.abs(Math.sin(this.bobTime))*.08:0;this.group.position.set(this.gridX,this.visualZ+1.05+e,this.gridY)}destroy(){this.group.traverse(e=>{e.geometry&&e.geometry.dispose(),e.material&&e.material.dispose()}),this.threeManager.removeFromEntities(this.group)}}const Og={meadowHare:Ug};class nc{constructor(e,t,n=[]){this.threeManager=e,this.worldGenerator=t,this.wildlife=[],this.spawnAll(n)}spawnAll(e){for(const t of e)this.spawn(t)}spawn(e){const t=Og[e.species];if(!t)return console.warn(`[WildlifeSystem] Unknown species "${e.species}" ignored.`),null;const n=this.worldGenerator.supportsHabitat(e.x,e.y,e.habitat)?{x:e.x,y:e.y}:this.worldGenerator.findNearestHabitat(e.x,e.y,e.habitat,12);if(!n)return console.warn(`[WildlifeSystem] No "${e.habitat}" habitat found for ${e.id}.`),null;const r={...e,x:n.x,y:n.y},s=new t(this.threeManager,this.worldGenerator,r);return this.wildlife.push(s),s}update(e){for(const t of this.wildlife)t.update(e)}destroy(){this.wildlife.forEach(e=>e.destroy()),this.wildlife=[]}}const mn={stoneWall:"A",timberWall:"C",stoneWindowNorth:"N",stoneWindowSouth:"O",stoneWindowWest:"J",stoneWindowEast:"K",timberWindowNorth:"Q",timberWindowSouth:"V",timberWindowWest:"Y",timberWindowEast:"Z",door:"D",floor:"E",stairs:"U",stairsNorth:"1",stairsSouth:"2",stairsWest:"3",stairsEast:"4",timberStairsNorth:"5",timberStairsSouth:"6",timberStairsWest:"7",timberStairsEast:"8",approach:"R"},Ng=[{id:"market-hall",name:"Market Hall",x:-11,y:-7,width:8,height:6,style:"timber",door:{x:3,y:5},stairs:[{x:5,y:2,direction:"north"}]},{id:"stone-inn",name:"Stone Inn",x:3,y:-8,width:9,height:7,style:"stone",door:{x:4,y:6},stairs:[{x:6,y:2,direction:"north"}]},{id:"ridge-house",name:"Ridge House",x:-5,y:5,width:7,height:6,style:"timber",door:{x:3,y:0},stairs:[{x:1,y:3,direction:"south"}]},{id:"watch-tower",name:"Watch Tower",x:10,y:5,width:5,height:5,style:"stone",door:{x:2,y:4},stairs:[{x:2,y:2,direction:"north"}]}];function Fg(i,e,t,n,r=[]){const s=Yg(t),o=n.x-Math.floor(i/2),a=n.y-Math.floor(e/2),l=new Set;return[{id:"hall",name:"Guild Hall",dx:-11,dy:-8,width:8,height:6,doorEdge:"south"},{id:"inn",name:"Village Inn",dx:3,dy:-9,width:9,height:7,doorEdge:"south"},{id:"house",name:"Craft House",dx:-7,dy:5,width:7,height:6,doorEdge:"north"},{id:"store",name:"General Store",dx:3,dy:5,width:7,height:6,doorEdge:"north"},{id:"tower",name:"Watch House",dx:11,dy:2,width:5,height:5,doorEdge:"west"}].map((u,d)=>{const f=s()>.48?"stone":"timber",v=Xg(u.width,u.height,u.doorEdge),x=$g(u.width,u.height,u.doorEdge,s),y={id:`${u.id}-${Math.abs(Math.floor(t))}-${d}`,name:u.name,x:ic(u.dx+o,-Math.floor(i/2)+2,Math.floor(i/2)-u.width-2),y:ic(u.dy+a,-Math.floor(e/2)+2,Math.floor(e/2)-u.height-2),width:u.width,height:u.height,style:f,door:v,stairs:[x]},_=qg(y,r,i,e,l);return _?(y.x=_.x,y.y=_.y,Zg(y,l),y):null}).filter(Boolean)}function Bg(i,e=Ng){if(!Array.isArray(i)||i.length===0)return i;const t=i.map(a=>a.split("")),n=t.length,r=t[0].length,s=Math.floor(r/2),o=Math.floor(n/2);for(const a of e)kg(t,a,s,o),zg(t,a,s,o);return t.map(a=>a.join(""))}function kg(i,e,t,n){var o,a,l;const r=e.style==="stone"?mn.stoneWall:mn.timberWall,s=new Set((e.stairs||[]).map(c=>`${c.x},${c.y}`));for(let c=0;c<e.height;c++)for(let u=0;u<e.width;u++){const d=e.y+c+n,f=e.x+u+t;if(!((o=i[d])!=null&&o[f])||!Kg(i[d][f]))continue;const v=u===0||c===0||u===e.width-1||c===e.height-1,x=((a=e.door)==null?void 0:a.x)===u&&((l=e.door)==null?void 0:l.y)===c,y=s.has(`${u},${c}`),_=Zc(e,u,c);if(x)i[d][f]=mn.door;else if(y){const p=(e.stairs||[]).find(b=>b.x===u&&b.y===c);i[d][f]=Wg(p==null?void 0:p.direction,e.style)}else Hg(e,u,c,_)?i[d][f]=Vg(e.style,_):i[d][f]=v?r:mn.floor}}function zg(i,e,t,n){var u;if(!e.door)return;const r=Zc(e,e.door.x,e.door.y),s=Gg(r);if(!s)return;const o=e.y+e.door.y+n,a=e.x+e.door.x+t,l=o+s.y,c=a+s.x;(u=i[l])!=null&&u[c]&&Jg(i[l][c])&&(i[l][c]=mn.approach)}function Hg(i,e,t,n){return!n||(e===0||e===i.width-1)&&(t===0||t===i.height-1)?!1:(e+t+i.id.length)%2===0}function Zc(i,e,t){return t===0?"north":t===i.height-1?"south":e===0?"west":e===i.width-1?"east":null}function Gg(i){return{north:{x:0,y:-1},south:{x:0,y:1},west:{x:-1,y:0},east:{x:1,y:0}}[i]||null}function Vg(i,e){const t=i==="stone"?"stone":"timber",n=e.charAt(0).toUpperCase()+e.slice(1);return mn[`${t}Window${n}`]||mn[`${t}Wall`]}function Wg(i="north",e="stone"){const t=i.charAt(0).toUpperCase()+i.slice(1);return e==="timber"?mn[`timberStairs${t}`]||mn.stairs:mn[`stairs${t}`]||mn.stairs}function Xg(i,e,t){return t==="north"?{x:Math.floor(i/2),y:0}:t==="south"?{x:Math.floor(i/2),y:e-1}:t==="west"?{x:0,y:Math.floor(e/2)}:{x:i-1,y:Math.floor(e/2)}}function $g(i,e,t,n){const r=t==="north"?"south":t==="south"?"north":t==="west"?"east":"west",s=t==="west"?i-2:t==="east"||n()>.5?1:i-2,o=t==="north"?e-2:t==="south"||n()>.5?1:e-2;return{x:s,y:o,direction:r}}function Yg(i){let e=Math.abs(Math.floor(i))||1;return()=>(e=(e*1103515245+12345)%2147483648,e/2147483648)}function qg(i,e,t,n,r){if(!e.length)return{x:i.x,y:i.y};const s=[{x:i.x,y:i.y}];for(let o=1;o<=8;o++)for(let a=-o;a<=o;a++)s.push({x:i.x+a,y:i.y-o},{x:i.x+a,y:i.y+o},{x:i.x-o,y:i.y+a},{x:i.x+o,y:i.y+a});return s.find(o=>jg({...i,...o},e,t,n,r))||null}function jg(i,e,t,n,r){var a;const s=Math.floor(t/2),o=Math.floor(n/2);for(let l=-1;l<=i.height;l++)for(let c=-1;c<=i.width;c++){const u=i.x+c,d=i.y+l,f=d+o,v=u+s,x=(a=e[f])==null?void 0:a[v];if(!x||!["G","F","S","H","R"].includes(x)||r.has(`${u},${d}`))return!1}return!0}function Zg(i,e){for(let t=-1;t<=i.height;t++)for(let n=-1;n<=i.width;n++)e.add(`${i.x+n},${i.y+t}`)}function ic(i,e,t){return Math.max(e,Math.min(t,i))}function Kg(i){return["G","F","S","H","R",mn.floor].includes(i)}function Jg(i){return["G","F","S","H","R"].includes(i)}const ls=16,gs=Kc(72,60,20260620,{seaLevel:.29,moistureBias:.02,temperatureBias:.02,volcanicBias:.02}),rc=[{id:"meadow-hare-01",species:"meadowHare",habitat:"meadow",x:-8,y:-4,leashRadius:4}];function Kc(i=80,e=64,t=Date.now(),n={}){const r=Qg(t),s=e0(i,e,t,r,n),o=[];for(let y=0;y<e;y++){let _="";for(let p=0;p<i;p++)_+=n0(t0(p,y,s,t));o.push(_)}const a=sc(o,2),l=s0(a,s,r),c=o0(l,i,e,r),u=r0(l,c,r),d=sc(u,1,{keepSettlements:!0}),f=n.buildings||Fg(i,e,t,c,d),v=Bg(d,f),x=Yc(v);return x.buildings=f,x.seed=t,x}function Qg(i){let e=Math.abs(Math.floor(i))||1;return()=>(e=(e*1664525+1013904223)%4294967296,e/4294967296)}function e0(i,e,t,n,r){const s=r.ridgeAngle??n()*Math.PI,o=n()>.5;return{width:i,height:e,seed:t,centerX:i/2,centerY:e/2,seaLevel:r.seaLevel??.3,ridgeCos:Math.cos(s),ridgeSin:Math.sin(s),moistureBias:r.moistureBias??n()*.12-.04,temperatureBias:r.temperatureBias??n()*.12-.06,volcanicBias:r.volcanicBias??n()*.08,riverSource:{x:Math.floor(i*(.38+n()*.24)),y:Math.floor(e*(o?.22:.78))},riverTarget:{x:Math.floor(i*(n()>.5?.08:.92)),y:Math.floor(e*(.36+n()*.28))}}}function t0(i,e,t,n){const r=(i-t.centerX)/t.centerX,s=(e-t.centerY)/t.centerY,o=Math.min(i,e,t.width-i-1,t.height-e-1),a=Math.sqrt(r*r+s*s),l=Math.abs(r*t.ridgeCos+s*t.ridgeSin),c=1.02-a*.9,u=Math.max(0,.2-l)*.72,d=Mr(i,e,n,.045)*.12,f=Mr(i,e,n+97,.11)*.035,v=Mr(i,e,n+223,.1),x=c+u+d+f+v*.15,_=1-Math.abs(e/t.height-.5)*2*.78-Math.max(0,x-.7)*.48+Mr(i,e,n+421,.04)*.1+t.temperatureBias,p=.48+Mr(i,e,n+641,.075)*.28-Math.max(0,x-.78)*.18+t.moistureBias;return{x:i,y:e,edge:o,heightScore:x,mountainNoise:v,temperature:_,moisture:p,seaLevel:t.seaLevel,volcanicBias:t.volcanicBias}}function n0(i){const{edge:e,heightScore:t,mountainNoise:n,temperature:r,moisture:s,seaLevel:o,volcanicBias:a}=i;if(e<=1||t<o-.16)return s>.58?"B":"W";if(t<o-.04)return s>.66?"B":"W";if(t<o+.08)return"S";if(r<.1&&t<.66&&s>.5)return"I";if(t>1.16&&r<.34)return"P";const l=n+a+Math.max(0,t-.92);return t>1.02&&l>1.34&&r>.32?"L":t>1.08?n>.16?"M":"H":t>.86?"H":s>.64&&r>.24?"F":"G"}function sc(i,e=1,t={}){let n=i;for(let r=0;r<e;r++){const s=n.map(o=>o.split(""));for(let o=1;o<n.length-1;o++)for(let a=1;a<n[o].length-1;a++){const l=n[o][a];if(t.keepSettlements&&["R","T","A","C","D","E","U"].includes(l))continue;const c=i0(n,a,o,l);c&&(s[o][a]=c)}n=s.map(o=>o.join(""))}return n}function i0(i,e,t,n){var c;const r=new Map;for(let u=-1;u<=1;u++)for(let d=-1;d<=1;d++){if(d===0&&u===0)continue;const f=(c=i[t+u])==null?void 0:c[e+d];f&&r.set(f,(r.get(f)||0)+1)}const s=[...r.entries()].sort((u,d)=>d[1]-u[1]),[o,a]=s[0]||[],l=r.get(n)||0;return!o||o===n?null:a>=5&&l<=2||["H","M","P","L","I","F"].includes(n)&&a>=4?o:null}function r0(i,e,t){var r,s,o;const n=i.map(a=>a.split(""));for(let a=e.x-11;a<=e.x+11;a++)(r=n[e.y])!=null&&r[a]&&oc(n[e.y][a])&&(n[e.y][a]="R");for(let a=e.y-8;a<=e.y+8;a++)(s=n[a])!=null&&s[e.x]&&oc(n[a][e.x])&&(n[a][e.x]="R");for(let a=0;a<18;a++){const l=e.x+Math.floor(t()*20)-10,c=e.y+Math.floor(t()*14)-7;(o=n[c])!=null&&o[l]&&n[c][l]==="G"&&(n[c][l]="F")}return n.map(a=>a.join(""))}function oc(i){return["G","F","S","H","R"].includes(i)}function s0(i,e,t){var a;const n=i.map(l=>l.split(""));let r=e.riverSource.x,s=e.riverSource.y;const o=e.width+e.height;for(let l=0;l<o&&((a=n[s])!=null&&a[r]);l++){const c=n[s][r];if(["M","P","L"].includes(c)||(n[s][r]=c==="S"?"W":"B",cs(n,r+1,s),cs(n,r-1,s),cs(n,r,s+1),cs(n,r,s-1)),r<=2||s<=2||r>=e.width-3||s>=e.height-3)break;const u=Math.sign(e.riverTarget.x-r),d=Math.sign(e.riverTarget.y-s);t()>.52&&(r+=u||(t()>.5?1:-1)),t()>.42&&(s+=d||(t()>.5?1:-1)),t()>.76&&(r+=t()>.5?1:-1),t()>.84&&(s+=t()>.5?1:-1),r=Math.max(1,Math.min(e.width-2,r)),s=Math.max(1,Math.min(e.height-2,s))}return n.map(l=>l.join(""))}function cs(i,e,t){var n;(n=i[t])!=null&&n[e]&&["G","F","H"].includes(i[t][e])&&(i[t][e]="S")}function o0(i,e,t,n){var s;let r={x:Math.floor(e/2),y:Math.floor(t/2),score:-1/0};for(let o=8;o<t-8;o++)for(let a=8;a<e-8;a++){let l=n()*.8;for(let u=-4;u<=4;u++)for(let d=-4;d<=4;d++){const f=(s=i[o+u])==null?void 0:s[a+d];["G","F","S"].includes(f)&&(l+=2),f==="H"&&(l+=.4),["W","B","I","L","M","P"].includes(f)&&(l-=3.2)}const c=Math.min(a,o,e-a-1,t-o-1);l+=Math.min(c,14)*.18,l>r.score&&(r={x:a,y:o,score:l})}return{x:r.x,y:r.y}}function Mr(i,e,t,n){const r=Math.sin((i*n+t*.013)*12.9898+(e*n-t*.007)*78.233)*43758.5453;return(r-Math.floor(r))*2-1}class a0{constructor(e){this.onApplyMap=e.onApplyMap,this.onRandomizeMap=e.onRandomizeMap,this.onStartCombat=e.onStartCombat,this.onToggleCollisionDebug=e.onToggleCollisionDebug,this.collisionDebugEnabled=!1,this.toggleButton=document.getElementById("admin-toggle"),this.panel=document.getElementById("admin-panel"),this.mapInput=document.getElementById("map-array-input"),this.message=document.getElementById("admin-message"),this.applyButton=document.getElementById("apply-map-button"),this.randomButton=document.getElementById("random-map-button"),this.combatButton=document.getElementById("start-combat-button"),this.collisionButton=document.getElementById("collision-debug-button"),this.closeButton=document.getElementById("admin-close-button"),this.mapInput.value=bo(gs),this.bindEvents()}bindEvents(){this.toggleButton.addEventListener("click",()=>this.setOpen(!this.panel.classList.contains("is-open"))),this.closeButton.addEventListener("click",()=>this.setOpen(!1)),this.applyButton.addEventListener("click",()=>this.applyCurrentMap()),this.randomButton.addEventListener("click",()=>this.randomizeMap()),this.collisionButton.addEventListener("click",()=>this.toggleCollisionDebug()),this.combatButton.addEventListener("click",()=>{this.setOpen(!1),this.onStartCombat()})}setOpen(e){this.panel.classList.toggle("is-open",e),this.toggleButton.setAttribute("aria-expanded",String(e))}applyCurrentMap(){try{const e=this.parseMapRows(this.mapInput.value);this.onApplyMap(e),this.setMessage(`Applied ${e[0].length} x ${e.length} array map.`,"success")}catch(e){this.setMessage(e.message,"error")}}randomizeMap(){const e=Kc();this.mapInput.value=bo(e),this.onRandomizeMap(e),this.setMessage(`Randomized ${e[0].length} x ${e.length} world.`,"success")}toggleCollisionDebug(){this.collisionDebugEnabled=!this.collisionDebugEnabled,this.collisionButton.setAttribute("aria-pressed",String(this.collisionDebugEnabled)),this.collisionButton.classList.toggle("is-active",this.collisionDebugEnabled),this.onToggleCollisionDebug(this.collisionDebugEnabled),this.setMessage(this.collisionDebugEnabled?"Collision foot area visible.":"Collision foot area hidden.","success")}parseMapRows(e){const t=e.trim(),n=t.startsWith("[")?this.parseJsonMapRows(t):this.parseSymbolMapRows(t);return this.validateRectangularRows(n),n}parseJsonMapRows(e){let t;try{t=JSON.parse(e)}catch(r){throw new Error(`Map JSON is invalid: ${r.message}`)}if(!Array.isArray(t))throw new Error("Map JSON must be an array of rows.");const n=t.map(r=>{if(!Array.isArray(r))throw new Error("Each map row in JSON must be an array.");return r.map(s=>$a(s))});return qc(n)}parseSymbolMapRows(e){const t=e.split(`
`).map(s=>s.trim().toUpperCase()).filter(Boolean);if(t.length<4)throw new Error("Map needs at least 4 rows.");const n=t[0].length;if(n<4)throw new Error("Map rows need at least 4 columns.");const r=new Set(wg);for(const s of t){if(s.length!==n)throw new Error("Every map row must have the same width.");for(const o of s)if(!r.has(o))throw new Error(`Unknown map symbol "${o}".`)}return Yc(t)}validateRectangularRows(e){var n;if(e.length<4)throw new Error("Map needs at least 4 rows.");const t=((n=e[0])==null?void 0:n.length)||0;if(t<4)throw new Error("Map rows need at least 4 columns.");if(e.some(r=>r.length!==t))throw new Error("Every map row must have the same width.")}setMapRows(e){this.mapInput.value=bo(e)}setMessage(e,t="neutral"){this.message.textContent=e,this.message.dataset.tone=t}}class ac{constructor(e){this.client=e.client,this.userId=e.userId,this.onExit=e.onExit,this.overlay=document.getElementById("combat-scene"),this.status=document.getElementById("combat-status"),this.roundReadout=document.getElementById("combat-round"),this.turnReadout=document.getElementById("combat-turn"),this.partyList=document.getElementById("combat-party-list"),this.enemyList=document.getElementById("combat-enemy-list"),this.log=document.getElementById("combat-log"),this.attackButton=document.getElementById("combat-attack-button"),this.guardButton=document.getElementById("combat-guard-button"),this.readyButton=document.getElementById("combat-ready-button"),this.leaveButton=document.getElementById("combat-leave-button"),this.attackButton.addEventListener("click",()=>this.sendAction("attack")),this.guardButton.addEventListener("click",()=>this.sendAction("guard")),this.readyButton.addEventListener("click",()=>this.sendAction("ready")),this.leaveButton.addEventListener("click",()=>this.leave())}async enter(e="meadow-hare-demo"){if(this.overlay.classList.add("is-open"),!this.client){this.setStatus("Combat unavailable while offline.");return}this.setStatus("Joining co-op combat...");try{this.room=await this.client.joinOrCreate("combat",{userId:this.userId,encounterId:e}),this.bindRoom(),this.setStatus("Co-op combat ready.")}catch(t){console.error("[CombatScene] Failed to join combat:",t),this.setStatus("Could not join combat room.")}}bindRoom(){this.room&&(this.room.onMessage("combat:snapshot",e=>this.renderSnapshot(e)),this.room.onMessage("combat:log",e=>this.appendLog(e.message)))}sendAction(e){if(!this.room){this.appendLog("No combat room connected.");return}const t=e==="attack"?"wildlife_meadow_hare":"";this.room.send("combat:action",{action:e,targetId:t})}renderSnapshot(e){this.roundReadout.textContent=`${e.round}`,this.turnReadout.textContent=e.activeActorId||"Waiting",this.renderList(this.partyList,e.party||[],"ally"),this.renderList(this.enemyList,e.enemies||[],"enemy"),this.setStatus(e.phase==="planning"?"Choose an action.":"Resolving turn.")}renderList(e,t,n){e.innerHTML="";for(const r of t){const s=document.createElement("li");s.className=`combat-actor ${n}`;const o=document.createElement("span");o.textContent=r.name;const a=document.createElement("meter");a.min=0,a.max=r.maxHp,a.value=r.hp;const l=document.createElement("strong");l.textContent=`${r.hp}/${r.maxHp}`,s.append(o,a,l),e.appendChild(s)}}appendLog(e){const t=document.createElement("li");for(t.textContent=e,this.log.prepend(t);this.log.children.length>5;)this.log.removeChild(this.log.lastChild)}setStatus(e){this.status.textContent=e}async leave(){var e;this.room&&(await this.room.leave(),this.room=null),this.overlay.classList.remove("is-open"),(e=this.onExit)==null||e.call(this)}}var Lt=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function l0(i){if(i.__esModule)return i;var e=i.default;if(typeof e=="function"){var t=function n(){return this instanceof n?Reflect.construct(e,arguments,this.constructor):e.apply(this,arguments)};t.prototype=e.prototype}else t={};return Object.defineProperty(t,"__esModule",{value:!0}),Object.keys(i).forEach(function(n){var r=Object.getOwnPropertyDescriptor(i,n);Object.defineProperty(t,n,r.get?r:{enumerable:!0,get:function(){return i[n]}})}),t}var Jc={};ArrayBuffer.isView||(ArrayBuffer.isView=i=>i!==null&&typeof i=="object"&&i.buffer instanceof ArrayBuffer);typeof globalThis>"u"&&typeof window<"u"&&(window.globalThis=window);var er={},Us={};(function(i){Object.defineProperty(i,"__esModule",{value:!0}),i.ServerError=i.CloseCode=void 0,function(t){t[t.CONSENTED=4e3]="CONSENTED",t[t.DEVMODE_RESTART=4010]="DEVMODE_RESTART"}(i.CloseCode||(i.CloseCode={}));class e extends Error{constructor(n,r){super(r),this.name="ServerError",this.code=n}}i.ServerError=e})(Us);var Ur={},tr={};Object.defineProperty(tr,"__esModule",{value:!0});tr.decode=tr.encode=void 0;function ar(i,e){if(this._offset=e,i instanceof ArrayBuffer)this._buffer=i,this._view=new DataView(this._buffer);else if(ArrayBuffer.isView(i))this._buffer=i.buffer,this._view=new DataView(this._buffer,i.byteOffset,i.byteLength);else throw new Error("Invalid argument")}function c0(i,e,t){for(var n="",r=0,s=e,o=e+t;s<o;s++){var a=i.getUint8(s);if(!(a&128)){n+=String.fromCharCode(a);continue}if((a&224)===192){n+=String.fromCharCode((a&31)<<6|i.getUint8(++s)&63);continue}if((a&240)===224){n+=String.fromCharCode((a&15)<<12|(i.getUint8(++s)&63)<<6|(i.getUint8(++s)&63)<<0);continue}if((a&248)===240){r=(a&7)<<18|(i.getUint8(++s)&63)<<12|(i.getUint8(++s)&63)<<6|(i.getUint8(++s)&63)<<0,r>=65536?(r-=65536,n+=String.fromCharCode((r>>>10)+55296,(r&1023)+56320)):n+=String.fromCharCode(r);continue}throw new Error("Invalid byte "+a.toString(16))}return n}ar.prototype._array=function(i){for(var e=new Array(i),t=0;t<i;t++)e[t]=this._parse();return e};ar.prototype._map=function(i){for(var e="",t={},n=0;n<i;n++)e=this._parse(),t[e]=this._parse();return t};ar.prototype._str=function(i){var e=c0(this._view,this._offset,i);return this._offset+=i,e};ar.prototype._bin=function(i){var e=this._buffer.slice(this._offset,this._offset+i);return this._offset+=i,e};ar.prototype._parse=function(){var i=this._view.getUint8(this._offset++),e,t=0,n=0,r=0,s=0;if(i<192)return i<128?i:i<144?this._map(i&15):i<160?this._array(i&15):this._str(i&31);if(i>223)return(255-i+1)*-1;switch(i){case 192:return null;case 194:return!1;case 195:return!0;case 196:return t=this._view.getUint8(this._offset),this._offset+=1,this._bin(t);case 197:return t=this._view.getUint16(this._offset),this._offset+=2,this._bin(t);case 198:return t=this._view.getUint32(this._offset),this._offset+=4,this._bin(t);case 199:if(t=this._view.getUint8(this._offset),n=this._view.getInt8(this._offset+1),this._offset+=2,n===-1){var o=this._view.getUint32(this._offset);return r=this._view.getInt32(this._offset+4),s=this._view.getUint32(this._offset+8),this._offset+=12,new Date((r*4294967296+s)*1e3+o/1e6)}return[n,this._bin(t)];case 200:return t=this._view.getUint16(this._offset),n=this._view.getInt8(this._offset+2),this._offset+=3,[n,this._bin(t)];case 201:return t=this._view.getUint32(this._offset),n=this._view.getInt8(this._offset+4),this._offset+=5,[n,this._bin(t)];case 202:return e=this._view.getFloat32(this._offset),this._offset+=4,e;case 203:return e=this._view.getFloat64(this._offset),this._offset+=8,e;case 204:return e=this._view.getUint8(this._offset),this._offset+=1,e;case 205:return e=this._view.getUint16(this._offset),this._offset+=2,e;case 206:return e=this._view.getUint32(this._offset),this._offset+=4,e;case 207:return r=this._view.getUint32(this._offset)*Math.pow(2,32),s=this._view.getUint32(this._offset+4),this._offset+=8,r+s;case 208:return e=this._view.getInt8(this._offset),this._offset+=1,e;case 209:return e=this._view.getInt16(this._offset),this._offset+=2,e;case 210:return e=this._view.getInt32(this._offset),this._offset+=4,e;case 211:return r=this._view.getInt32(this._offset)*Math.pow(2,32),s=this._view.getUint32(this._offset+4),this._offset+=8,r+s;case 212:if(n=this._view.getInt8(this._offset),this._offset+=1,n===0){this._offset+=1;return}return[n,this._bin(1)];case 213:return n=this._view.getInt8(this._offset),this._offset+=1,[n,this._bin(2)];case 214:return n=this._view.getInt8(this._offset),this._offset+=1,n===-1?(e=this._view.getUint32(this._offset),this._offset+=4,new Date(e*1e3)):[n,this._bin(4)];case 215:if(n=this._view.getInt8(this._offset),this._offset+=1,n===0)return r=this._view.getInt32(this._offset)*Math.pow(2,32),s=this._view.getUint32(this._offset+4),this._offset+=8,new Date(r+s);if(n===-1){r=this._view.getUint32(this._offset),s=this._view.getUint32(this._offset+4),this._offset+=8;var a=(r&3)*4294967296+s;return new Date(a*1e3+(r>>>2)/1e6)}return[n,this._bin(8)];case 216:return n=this._view.getInt8(this._offset),this._offset+=1,[n,this._bin(16)];case 217:return t=this._view.getUint8(this._offset),this._offset+=1,this._str(t);case 218:return t=this._view.getUint16(this._offset),this._offset+=2,this._str(t);case 219:return t=this._view.getUint32(this._offset),this._offset+=4,this._str(t);case 220:return t=this._view.getUint16(this._offset),this._offset+=2,this._array(t);case 221:return t=this._view.getUint32(this._offset),this._offset+=4,this._array(t);case 222:return t=this._view.getUint16(this._offset),this._offset+=2,this._map(t);case 223:return t=this._view.getUint32(this._offset),this._offset+=4,this._map(t)}throw new Error("Could not parse")};function h0(i,e=0){var t=new ar(i,e),n=t._parse();if(t._offset!==i.byteLength)throw new Error(i.byteLength-t._offset+" trailing bytes");return n}tr.decode=h0;var u0=4294967296-1,f0=17179869184-1;function d0(i,e,t){for(var n=0,r=0,s=t.length;r<s;r++)n=t.charCodeAt(r),n<128?i.setUint8(e++,n):n<2048?(i.setUint8(e++,192|n>>6),i.setUint8(e++,128|n&63)):n<55296||n>=57344?(i.setUint8(e++,224|n>>12),i.setUint8(e++,128|n>>6&63),i.setUint8(e++,128|n&63)):(r++,n=65536+((n&1023)<<10|t.charCodeAt(r)&1023),i.setUint8(e++,240|n>>18),i.setUint8(e++,128|n>>12&63),i.setUint8(e++,128|n>>6&63),i.setUint8(e++,128|n&63))}function p0(i){for(var e=0,t=0,n=0,r=i.length;n<r;n++)e=i.charCodeAt(n),e<128?t+=1:e<2048?t+=2:e<55296||e>=57344?t+=3:(n++,t+=4);return t}function Yi(i,e,t){var n=typeof t,r=0,s=0,o=0,a=0,l=0,c=0;if(n==="string"){if(l=p0(t),l<32)i.push(l|160),c=1;else if(l<256)i.push(217,l),c=2;else if(l<65536)i.push(218,l>>8,l),c=3;else if(l<4294967296)i.push(219,l>>24,l>>16,l>>8,l),c=5;else throw new Error("String too long");return e.push({_str:t,_length:l,_offset:i.length}),c+l}if(n==="number")return Math.floor(t)!==t||!isFinite(t)?(i.push(203),e.push({_float:t,_length:8,_offset:i.length}),9):t>=0?t<128?(i.push(t),1):t<256?(i.push(204,t),2):t<65536?(i.push(205,t>>8,t),3):t<4294967296?(i.push(206,t>>24,t>>16,t>>8,t),5):(o=t/Math.pow(2,32)>>0,a=t>>>0,i.push(207,o>>24,o>>16,o>>8,o,a>>24,a>>16,a>>8,a),9):t>=-32?(i.push(t),1):t>=-128?(i.push(208,t),2):t>=-32768?(i.push(209,t>>8,t),3):t>=-2147483648?(i.push(210,t>>24,t>>16,t>>8,t),5):(o=Math.floor(t/Math.pow(2,32)),a=t>>>0,i.push(211,o>>24,o>>16,o>>8,o,a>>24,a>>16,a>>8,a),9);if(n==="object"){if(t===null)return i.push(192),1;if(Array.isArray(t)){if(l=t.length,l<16)i.push(l|144),c=1;else if(l<65536)i.push(220,l>>8,l),c=3;else if(l<4294967296)i.push(221,l>>24,l>>16,l>>8,l),c=5;else throw new Error("Array too large");for(r=0;r<l;r++)c+=Yi(i,e,t[r]);return c}if(t instanceof Date){var u=t.getTime(),d=Math.floor(u/1e3),f=(u-d*1e3)*1e6;return d>=0&&f>=0&&d<=f0?f===0&&d<=u0?(i.push(214,255,d>>24,d>>16,d>>8,d),6):(o=d/4294967296,a=d&4294967295,i.push(215,255,f>>22,f>>14,f>>6,o,a>>24,a>>16,a>>8,a),10):(o=Math.floor(d/4294967296),a=d>>>0,i.push(199,12,255,f>>24,f>>16,f>>8,f,o>>24,o>>16,o>>8,o,a>>24,a>>16,a>>8,a),15)}if(t instanceof ArrayBuffer){if(l=t.byteLength,l<256)i.push(196,l),c=2;else if(l<65536)i.push(197,l>>8,l),c=3;else if(l<4294967296)i.push(198,l>>24,l>>16,l>>8,l),c=5;else throw new Error("Buffer too large");return e.push({_bin:t,_length:l,_offset:i.length}),c+l}if(typeof t.toJSON=="function")return Yi(i,e,t.toJSON());var v=[],x="",y=Object.keys(t);for(r=0,s=y.length;r<s;r++)x=y[r],t[x]!==void 0&&typeof t[x]!="function"&&v.push(x);if(l=v.length,l<16)i.push(l|128),c=1;else if(l<65536)i.push(222,l>>8,l),c=3;else if(l<4294967296)i.push(223,l>>24,l>>16,l>>8,l),c=5;else throw new Error("Object too large");for(r=0;r<l;r++)x=v[r],c+=Yi(i,e,x),c+=Yi(i,e,t[x]);return c}if(n==="boolean")return i.push(t?195:194),1;if(n==="undefined")return i.push(192),1;if(typeof t.toJSON=="function")return Yi(i,e,t.toJSON());throw new Error("Could not encode")}function m0(i){var e=[],t=[],n=Yi(e,t,i),r=new ArrayBuffer(n),s=new DataView(r),o=0,a=0,l=-1;t.length>0&&(l=t[0]._offset);for(var c,u=0,d=0,f=0,v=e.length;f<v;f++)if(s.setUint8(a+f,e[f]),f+1===l){if(c=t[o],u=c._length,d=a+l,c._bin)for(var x=new Uint8Array(c._bin),y=0;y<u;y++)s.setUint8(d+y,x[y]);else c._str?d0(s,d,c._str):c._float!==void 0&&s.setFloat64(d,c._float);o++,a+=u,t[o]&&(l=t[o]._offset)}return r}tr.encode=m0;var Os={},Ns={},g0=function(){throw new Error("ws does not work in the browser. Browser clients must use the native WebSocket object")},_0=Lt&&Lt.__importDefault||function(i){return i&&i.__esModule?i:{default:i}};Object.defineProperty(Ns,"__esModule",{value:!0});Ns.WebSocketTransport=void 0;const v0=_0(g0),Ro=globalThis.WebSocket||v0.default;class x0{constructor(e){this.events=e}send(e){e instanceof ArrayBuffer?this.ws.send(e):Array.isArray(e)&&this.ws.send(new Uint8Array(e).buffer)}connect(e,t){try{this.ws=new Ro(e,{headers:t,protocols:this.protocols})}catch{this.ws=new Ro(e,this.protocols)}this.ws.binaryType="arraybuffer",this.ws.onopen=this.events.onopen,this.ws.onmessage=this.events.onmessage,this.ws.onclose=this.events.onclose,this.ws.onerror=this.events.onerror}close(e,t){this.ws.close(e,t)}get isOpen(){return this.ws.readyState===Ro.OPEN}}Ns.WebSocketTransport=x0;Object.defineProperty(Os,"__esModule",{value:!0});Os.Connection=void 0;const M0=Ns;class S0{constructor(){this.events={},this.transport=new M0.WebSocketTransport(this.events)}send(e){this.transport.send(e)}connect(e,t){this.transport.connect(e,t)}close(e,t){this.transport.close(e,t)}get isOpen(){return this.transport.isOpen}}Os.Connection=S0;var Ya={};(function(i){Object.defineProperty(i,"__esModule",{value:!0}),i.utf8Length=i.utf8Read=i.ErrorCode=i.Protocol=void 0,function(n){n[n.HANDSHAKE=9]="HANDSHAKE",n[n.JOIN_ROOM=10]="JOIN_ROOM",n[n.ERROR=11]="ERROR",n[n.LEAVE_ROOM=12]="LEAVE_ROOM",n[n.ROOM_DATA=13]="ROOM_DATA",n[n.ROOM_STATE=14]="ROOM_STATE",n[n.ROOM_STATE_PATCH=15]="ROOM_STATE_PATCH",n[n.ROOM_DATA_SCHEMA=16]="ROOM_DATA_SCHEMA",n[n.ROOM_DATA_BYTES=17]="ROOM_DATA_BYTES"}(i.Protocol||(i.Protocol={})),function(n){n[n.MATCHMAKE_NO_HANDLER=4210]="MATCHMAKE_NO_HANDLER",n[n.MATCHMAKE_INVALID_CRITERIA=4211]="MATCHMAKE_INVALID_CRITERIA",n[n.MATCHMAKE_INVALID_ROOM_ID=4212]="MATCHMAKE_INVALID_ROOM_ID",n[n.MATCHMAKE_UNHANDLED=4213]="MATCHMAKE_UNHANDLED",n[n.MATCHMAKE_EXPIRED=4214]="MATCHMAKE_EXPIRED",n[n.AUTH_FAILED=4215]="AUTH_FAILED",n[n.APPLICATION_ERROR=4216]="APPLICATION_ERROR"}(i.ErrorCode||(i.ErrorCode={}));function e(n,r){const s=n[r++];for(var o="",a=0,l=r,c=r+s;l<c;l++){var u=n[l];if(!(u&128)){o+=String.fromCharCode(u);continue}if((u&224)===192){o+=String.fromCharCode((u&31)<<6|n[++l]&63);continue}if((u&240)===224){o+=String.fromCharCode((u&15)<<12|(n[++l]&63)<<6|(n[++l]&63)<<0);continue}if((u&248)===240){a=(u&7)<<18|(n[++l]&63)<<12|(n[++l]&63)<<6|(n[++l]&63)<<0,a>=65536?(a-=65536,o+=String.fromCharCode((a>>>10)+55296,(a&1023)+56320)):o+=String.fromCharCode(a);continue}throw new Error("Invalid byte "+u.toString(16))}return o}i.utf8Read=e;function t(n=""){let r=0,s=0;for(let o=0,a=n.length;o<a;o++)r=n.charCodeAt(o),r<128?s+=1:r<2048?s+=2:r<55296||r>=57344?s+=3:(o++,s+=4);return s+1}i.utf8Length=t})(Ya);var Ri={};Object.defineProperty(Ri,"__esModule",{value:!0});Ri.getSerializer=Ri.registerSerializer=void 0;const Qc={};function y0(i,e){Qc[i]=e}Ri.registerSerializer=y0;function E0(i){const e=Qc[i];if(!e)throw new Error("missing serializer: "+i);return e}Ri.getSerializer=E0;var Or={};Object.defineProperty(Or,"__esModule",{value:!0});Or.createNanoEvents=void 0;const T0=()=>({emit(i,...e){let t=this.events[i]||[];for(let n=0,r=t.length;n<r;n++)t[n](...e)},events:{},on(i,e){var t;return!((t=this.events[i])===null||t===void 0)&&t.push(e)||(this.events[i]=[e]),()=>{var n;this.events[i]=(n=this.events[i])===null||n===void 0?void 0:n.filter(r=>e!==r)}}});Or.createNanoEvents=T0;var nr={};Object.defineProperty(nr,"__esModule",{value:!0});nr.createSignal=nr.EventEmitter=void 0;class eh{constructor(){this.handlers=[]}register(e,t=!1){return this.handlers.push(e),this}invoke(...e){this.handlers.forEach(t=>t.apply(this,e))}invokeAsync(...e){return Promise.all(this.handlers.map(t=>t.apply(this,e)))}remove(e){const t=this.handlers.indexOf(e);this.handlers[t]=this.handlers[this.handlers.length-1],this.handlers.pop()}clear(){this.handlers=[]}}nr.EventEmitter=eh;function b0(){const i=new eh;function e(t){return i.register(t,this===null)}return e.once=t=>{const n=function(...r){t.apply(this,r),i.remove(n)};i.register(n)},e.remove=t=>i.remove(t),e.invoke=(...t)=>i.invoke(...t),e.invokeAsync=(...t)=>i.invokeAsync(...t),e.clear=()=>i.clear(),e}nr.createSignal=b0;var ba={exports:{}};(function(i,e){(function(t,n){n(e)})(Lt,function(t){var n=function(g,h){return n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(m,T){m.__proto__=T}||function(m,T){for(var z in T)Object.prototype.hasOwnProperty.call(T,z)&&(m[z]=T[z])},n(g,h)};function r(g,h){if(typeof h!="function"&&h!==null)throw new TypeError("Class extends value "+String(h)+" is not a constructor or null");n(g,h);function m(){this.constructor=g}g.prototype=h===null?Object.create(h):(m.prototype=h.prototype,new m)}function s(g,h,m,T){var z=arguments.length,ee=z<3?h:T,Le;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")ee=Reflect.decorate(g,h,m,T);else for(var Ce=g.length-1;Ce>=0;Ce--)(Le=g[Ce])&&(ee=(z<3?Le(ee):z>3?Le(h,m,ee):Le(h,m))||ee);return z>3&&ee&&Object.defineProperty(h,m,ee),ee}function o(g,h,m){if(arguments.length===2)for(var T=0,z=h.length,ee;T<z;T++)(ee||!(T in h))&&(ee||(ee=Array.prototype.slice.call(h,0,T)),ee[T]=h[T]);return g.concat(ee||Array.prototype.slice.call(h))}typeof SuppressedError=="function"&&SuppressedError;var a=255,l=213;t.OPERATION=void 0,function(g){g[g.ADD=128]="ADD",g[g.REPLACE=0]="REPLACE",g[g.DELETE=64]="DELETE",g[g.DELETE_AND_ADD=192]="DELETE_AND_ADD",g[g.TOUCH=1]="TOUCH",g[g.CLEAR=10]="CLEAR"}(t.OPERATION||(t.OPERATION={}));var c=function(){function g(h,m,T){this.changed=!1,this.changes=new Map,this.allChanges=new Set,this.caches={},this.currentCustomOperation=0,this.ref=h,this.setParent(m,T)}return g.prototype.setParent=function(h,m,T){var z=this;if(this.indexes||(this.indexes=this.ref instanceof Qe?this.ref._definition.indexes:{}),this.parent=h,this.parentIndex=T,!!m)if(this.root=m,this.ref instanceof Qe){var ee=this.ref._definition;for(var Le in ee.schema){var Ce=this.ref[Le];if(Ce&&Ce.$changes){var tt=ee.indexes[Le];Ce.$changes.setParent(this.ref,m,tt)}}}else typeof this.ref=="object"&&this.ref.forEach(function(nt,Ne){if(nt instanceof Qe){var st=nt.$changes,Fe=z.ref.$changes.indexes[Ne];st.setParent(z.ref,z.root,Fe)}})},g.prototype.operation=function(h){this.changes.set(--this.currentCustomOperation,h)},g.prototype.change=function(h,m){m===void 0&&(m=t.OPERATION.ADD);var T=typeof h=="number"?h:this.indexes[h];this.assertValidIndex(T,h);var z=this.changes.get(T);(!z||z.op===t.OPERATION.DELETE||z.op===t.OPERATION.TOUCH)&&this.changes.set(T,{op:z&&z.op===t.OPERATION.DELETE?t.OPERATION.DELETE_AND_ADD:m,index:T}),this.allChanges.add(T),this.changed=!0,this.touchParents()},g.prototype.touch=function(h){var m=typeof h=="number"?h:this.indexes[h];this.assertValidIndex(m,h),this.changes.has(m)||this.changes.set(m,{op:t.OPERATION.TOUCH,index:m}),this.allChanges.add(m),this.touchParents()},g.prototype.touchParents=function(){this.parent&&this.parent.$changes.touch(this.parentIndex)},g.prototype.getType=function(h){if(this.ref._definition){var m=this.ref._definition;return m.schema[m.fieldsByIndex[h]]}else{var m=this.parent._definition,T=m.schema[m.fieldsByIndex[this.parentIndex]];return Object.values(T)[0]}},g.prototype.getChildrenFilter=function(){var h=this.parent._definition.childFilters;return h&&h[this.parentIndex]},g.prototype.getValue=function(h){return this.ref.getByIndex(h)},g.prototype.delete=function(h){var m=typeof h=="number"?h:this.indexes[h];if(m===void 0){console.warn("@colyseus/schema ".concat(this.ref.constructor.name,": trying to delete non-existing index: ").concat(h," (").concat(m,")"));return}var T=this.getValue(m);this.changes.set(m,{op:t.OPERATION.DELETE,index:m}),this.allChanges.delete(m),delete this.caches[m],T&&T.$changes&&(T.$changes.parent=void 0),this.changed=!0,this.touchParents()},g.prototype.discard=function(h,m){var T=this;h===void 0&&(h=!1),m===void 0&&(m=!1),this.ref instanceof Qe||this.changes.forEach(function(z){if(z.op===t.OPERATION.DELETE){var ee=T.ref.getIndex(z.index);delete T.indexes[ee]}}),this.changes.clear(),this.changed=h,m&&this.allChanges.clear(),this.currentCustomOperation=0},g.prototype.discardAll=function(){var h=this;this.changes.forEach(function(m){var T=h.getValue(m.index);T&&T.$changes&&T.$changes.discardAll()}),this.discard()},g.prototype.cache=function(h,m){this.caches[h]=m},g.prototype.clone=function(){return new g(this.ref,this.parent,this.root)},g.prototype.ensureRefId=function(){this.refId===void 0&&(this.refId=this.root.getNextUniqueId())},g.prototype.assertValidIndex=function(h,m){if(h===void 0)throw new Error('ChangeTree: missing index for field "'.concat(m,'"'))},g}();function u(g,h,m,T){return g[h]||(g[h]=[]),g[h].push(m),T==null||T.forEach(function(z,ee){return m(z,ee)}),function(){return f(g[h],g[h].indexOf(m))}}function d(g){var h=this,m=typeof this.$changes.getType()!="string";this.$items.forEach(function(T,z){g.push({refId:h.$changes.refId,op:t.OPERATION.DELETE,field:z,value:void 0,previousValue:T}),m&&h.$changes.root.removeRef(T.$changes.refId)})}function f(g,h){if(h===-1||h>=g.length)return!1;for(var m=g.length-1,T=h;T<m;T++)g[T]=g[T+1];return g.length=m,!0}var v=function(g,h){var m=g.toString(),T=h.toString();return m<T?-1:m>T?1:0};function x(g){return g.$proxy=!0,g=new Proxy(g,{get:function(h,m){return typeof m!="symbol"&&!isNaN(m)?h.at(m):h[m]},set:function(h,m,T){if(typeof m!="symbol"&&!isNaN(m)){var z=Array.from(h.$items.keys()),ee=parseInt(z[m]||m);T==null?h.deleteAt(ee):h.setAt(ee,T)}else h[m]=T;return!0},deleteProperty:function(h,m){return typeof m=="number"?h.deleteAt(m):delete h[m],!0},has:function(h,m){return typeof m!="symbol"&&!isNaN(Number(m))?h.$items.has(Number(m)):Reflect.has(h,m)}}),g}var y=function(){function g(){for(var h=[],m=0;m<arguments.length;m++)h[m]=arguments[m];this.$changes=new c(this),this.$items=new Map,this.$indexes=new Map,this.$refId=0,this.push.apply(this,h)}return g.prototype.onAdd=function(h,m){return m===void 0&&(m=!0),u(this.$callbacks||(this.$callbacks={}),t.OPERATION.ADD,h,m?this.$items:void 0)},g.prototype.onRemove=function(h){return u(this.$callbacks||(this.$callbacks={}),t.OPERATION.DELETE,h)},g.prototype.onChange=function(h){return u(this.$callbacks||(this.$callbacks={}),t.OPERATION.REPLACE,h)},g.is=function(h){return Array.isArray(h)||h.array!==void 0},Object.defineProperty(g.prototype,"length",{get:function(){return this.$items.size},set:function(h){h===0?this.clear():this.splice(h,this.length-h)},enumerable:!1,configurable:!0}),g.prototype.push=function(){for(var h=this,m=[],T=0;T<arguments.length;T++)m[T]=arguments[T];var z;return m.forEach(function(ee){z=h.$refId++,h.setAt(z,ee)}),z},g.prototype.pop=function(){var h=Array.from(this.$indexes.values()).pop();if(h!==void 0){this.$changes.delete(h),this.$indexes.delete(h);var m=this.$items.get(h);return this.$items.delete(h),m}},g.prototype.at=function(h){if(h=Math.trunc(h)||0,h<0&&(h+=this.length),!(h<0||h>=this.length)){var m=Array.from(this.$items.keys())[h];return this.$items.get(m)}},g.prototype.setAt=function(h,m){var T,z;if(m==null){console.error("ArraySchema items cannot be null nor undefined; Use `deleteAt(index)` instead.");return}if(this.$items.get(h)!==m){m.$changes!==void 0&&m.$changes.setParent(this,this.$changes.root,h);var ee=(z=(T=this.$changes.indexes[h])===null||T===void 0?void 0:T.op)!==null&&z!==void 0?z:t.OPERATION.ADD;this.$changes.indexes[h]=h,this.$indexes.set(h,h),this.$items.set(h,m),this.$changes.change(h,ee)}},g.prototype.deleteAt=function(h){var m=Array.from(this.$items.keys())[h];return m===void 0?!1:this.$deleteAt(m)},g.prototype.$deleteAt=function(h){return this.$changes.delete(h),this.$indexes.delete(h),this.$items.delete(h)},g.prototype.clear=function(h){this.$changes.discard(!0,!0),this.$changes.indexes={},this.$indexes.clear(),h&&d.call(this,h),this.$items.clear(),this.$changes.operation({index:0,op:t.OPERATION.CLEAR}),this.$changes.touchParents()},g.prototype.concat=function(){for(var h,m=[],T=0;T<arguments.length;T++)m[T]=arguments[T];return new(g.bind.apply(g,o([void 0],(h=Array.from(this.$items.values())).concat.apply(h,m),!1)))},g.prototype.join=function(h){return Array.from(this.$items.values()).join(h)},g.prototype.reverse=function(){var h=this,m=Array.from(this.$items.keys()),T=Array.from(this.$items.values()).reverse();return T.forEach(function(z,ee){h.setAt(m[ee],z)}),this},g.prototype.shift=function(){var h=Array.from(this.$items.keys()),m=h.shift();if(m!==void 0){var T=this.$items.get(m);return this.$deleteAt(m),T}},g.prototype.slice=function(h,m){var T=new g;return T.push.apply(T,Array.from(this.$items.values()).slice(h,m)),T},g.prototype.sort=function(h){var m=this;h===void 0&&(h=v);var T=Array.from(this.$items.keys()),z=Array.from(this.$items.values()).sort(h);return z.forEach(function(ee,Le){m.setAt(T[Le],ee)}),this},g.prototype.splice=function(h,m){m===void 0&&(m=this.length-h);for(var T=[],z=2;z<arguments.length;z++)T[z-2]=arguments[z];for(var ee=Array.from(this.$items.keys()),Le=[],Ce=h;Ce<h+m;Ce++)Le.push(this.$items.get(ee[Ce])),this.$deleteAt(ee[Ce]);for(var Ce=0;Ce<T.length;Ce++)this.setAt(h+Ce,T[Ce]);return Le},g.prototype.unshift=function(){for(var h=this,m=[],T=0;T<arguments.length;T++)m[T]=arguments[T];var z=this.length,ee=m.length,Le=Array.from(this.$items.values());return m.forEach(function(Ce,tt){h.setAt(tt,Ce)}),Le.forEach(function(Ce,tt){h.setAt(ee+tt,Ce)}),z+ee},g.prototype.indexOf=function(h,m){return Array.from(this.$items.values()).indexOf(h,m)},g.prototype.lastIndexOf=function(h,m){return m===void 0&&(m=this.length-1),Array.from(this.$items.values()).lastIndexOf(h,m)},g.prototype.every=function(h,m){return Array.from(this.$items.values()).every(h,m)},g.prototype.some=function(h,m){return Array.from(this.$items.values()).some(h,m)},g.prototype.forEach=function(h,m){Array.from(this.$items.values()).forEach(h,m)},g.prototype.map=function(h,m){return Array.from(this.$items.values()).map(h,m)},g.prototype.filter=function(h,m){return Array.from(this.$items.values()).filter(h,m)},g.prototype.reduce=function(h,m){return Array.prototype.reduce.apply(Array.from(this.$items.values()),arguments)},g.prototype.reduceRight=function(h,m){return Array.prototype.reduceRight.apply(Array.from(this.$items.values()),arguments)},g.prototype.find=function(h,m){return Array.from(this.$items.values()).find(h,m)},g.prototype.findIndex=function(h,m){return Array.from(this.$items.values()).findIndex(h,m)},g.prototype.fill=function(h,m,T){throw new Error("ArraySchema#fill() not implemented")},g.prototype.copyWithin=function(h,m,T){throw new Error("ArraySchema#copyWithin() not implemented")},g.prototype.toString=function(){return this.$items.toString()},g.prototype.toLocaleString=function(){return this.$items.toLocaleString()},g.prototype[Symbol.iterator]=function(){return Array.from(this.$items.values())[Symbol.iterator]()},Object.defineProperty(g,Symbol.species,{get:function(){return g},enumerable:!1,configurable:!0}),g.prototype.entries=function(){return this.$items.entries()},g.prototype.keys=function(){return this.$items.keys()},g.prototype.values=function(){return this.$items.values()},g.prototype.includes=function(h,m){return Array.from(this.$items.values()).includes(h,m)},g.prototype.flatMap=function(h,m){throw new Error("ArraySchema#flatMap() is not supported.")},g.prototype.flat=function(h){throw new Error("ArraySchema#flat() is not supported.")},g.prototype.findLast=function(){var h=Array.from(this.$items.values());return h.findLast.apply(h,arguments)},g.prototype.findLastIndex=function(){var h=Array.from(this.$items.values());return h.findLastIndex.apply(h,arguments)},g.prototype.with=function(h,m){var T=Array.from(this.$items.values());return T[h]=m,new(g.bind.apply(g,o([void 0],T,!1)))},g.prototype.toReversed=function(){return Array.from(this.$items.values()).reverse()},g.prototype.toSorted=function(h){return Array.from(this.$items.values()).sort(h)},g.prototype.toSpliced=function(h,m){var T=Array.from(this.$items.values());return T.toSpliced.apply(T,arguments)},g.prototype.setIndex=function(h,m){this.$indexes.set(h,m)},g.prototype.getIndex=function(h){return this.$indexes.get(h)},g.prototype.getByIndex=function(h){return this.$items.get(this.$indexes.get(h))},g.prototype.deleteByIndex=function(h){var m=this.$indexes.get(h);this.$items.delete(m),this.$indexes.delete(h)},g.prototype.toArray=function(){return Array.from(this.$items.values())},g.prototype.toJSON=function(){return this.toArray().map(function(h){return typeof h.toJSON=="function"?h.toJSON():h})},g.prototype.clone=function(h){var m;return h?m=new(g.bind.apply(g,o([void 0],Array.from(this.$items.values()),!1))):m=new(g.bind.apply(g,o([void 0],this.map(function(T){return T.$changes?T.clone():T}),!1))),m},g}();function _(g){return g.$proxy=!0,g=new Proxy(g,{get:function(h,m){return typeof m!="symbol"&&typeof h[m]>"u"?h.get(m):h[m]},set:function(h,m,T){return typeof m!="symbol"&&m.indexOf("$")===-1&&m!=="onAdd"&&m!=="onRemove"&&m!=="onChange"?h.set(m,T):h[m]=T,!0},deleteProperty:function(h,m){return h.delete(m),!0}}),g}var p=function(){function g(h){var m=this;if(this.$changes=new c(this),this.$items=new Map,this.$indexes=new Map,this.$refId=0,h)if(h instanceof Map||h instanceof g)h.forEach(function(z,ee){return m.set(ee,z)});else for(var T in h)this.set(T,h[T])}return g.prototype.onAdd=function(h,m){return m===void 0&&(m=!0),u(this.$callbacks||(this.$callbacks={}),t.OPERATION.ADD,h,m?this.$items:void 0)},g.prototype.onRemove=function(h){return u(this.$callbacks||(this.$callbacks={}),t.OPERATION.DELETE,h)},g.prototype.onChange=function(h){return u(this.$callbacks||(this.$callbacks={}),t.OPERATION.REPLACE,h)},g.is=function(h){return h.map!==void 0},g.prototype[Symbol.iterator]=function(){return this.$items[Symbol.iterator]()},Object.defineProperty(g.prototype,Symbol.toStringTag,{get:function(){return this.$items[Symbol.toStringTag]},enumerable:!1,configurable:!0}),Object.defineProperty(g,Symbol.species,{get:function(){return g},enumerable:!1,configurable:!0}),g.prototype.set=function(h,m){if(m==null)throw new Error("MapSchema#set('".concat(h,"', ").concat(m,"): trying to set ").concat(m," value on '").concat(h,"'."));h=h.toString();var T=typeof this.$changes.indexes[h]<"u",z=T?this.$changes.indexes[h]:this.$refId++,ee=T?t.OPERATION.REPLACE:t.OPERATION.ADD,Le=m.$changes!==void 0;if(Le&&m.$changes.setParent(this,this.$changes.root,z),!T)this.$changes.indexes[h]=z,this.$indexes.set(z,h);else{if(!Le&&this.$items.get(h)===m)return;Le&&this.$items.get(h)!==m&&(ee=t.OPERATION.ADD)}return this.$items.set(h,m),this.$changes.change(h,ee),this},g.prototype.get=function(h){return this.$items.get(h)},g.prototype.delete=function(h){return this.$changes.delete(h.toString()),this.$items.delete(h)},g.prototype.clear=function(h){this.$changes.discard(!0,!0),this.$changes.indexes={},this.$indexes.clear(),h&&d.call(this,h),this.$items.clear(),this.$changes.operation({index:0,op:t.OPERATION.CLEAR}),this.$changes.touchParents()},g.prototype.has=function(h){return this.$items.has(h)},g.prototype.forEach=function(h){this.$items.forEach(h)},g.prototype.entries=function(){return this.$items.entries()},g.prototype.keys=function(){return this.$items.keys()},g.prototype.values=function(){return this.$items.values()},Object.defineProperty(g.prototype,"size",{get:function(){return this.$items.size},enumerable:!1,configurable:!0}),g.prototype.setIndex=function(h,m){this.$indexes.set(h,m)},g.prototype.getIndex=function(h){return this.$indexes.get(h)},g.prototype.getByIndex=function(h){return this.$items.get(this.$indexes.get(h))},g.prototype.deleteByIndex=function(h){var m=this.$indexes.get(h);this.$items.delete(m),this.$indexes.delete(h)},g.prototype.toJSON=function(){var h={};return this.forEach(function(m,T){h[T]=typeof m.toJSON=="function"?m.toJSON():m}),h},g.prototype.clone=function(h){var m;return h?m=Object.assign(new g,this):(m=new g,this.forEach(function(T,z){T.$changes?m.set(z,T.clone()):m.set(z,T)})),m},g}(),b={};function C(g,h){b[g]=h}function A(g){return b[g]}var D=function(){function g(){this.indexes={},this.fieldsByIndex={},this.deprecated={},this.descriptors={}}return g.create=function(h){var m=new g;return m.schema=Object.assign({},h&&h.schema||{}),m.indexes=Object.assign({},h&&h.indexes||{}),m.fieldsByIndex=Object.assign({},h&&h.fieldsByIndex||{}),m.descriptors=Object.assign({},h&&h.descriptors||{}),m.deprecated=Object.assign({},h&&h.deprecated||{}),m},g.prototype.addField=function(h,m){var T=this.getNextFieldIndex();this.fieldsByIndex[T]=h,this.indexes[h]=T,this.schema[h]=Array.isArray(m)?{array:m[0]}:m},g.prototype.hasField=function(h){return this.indexes[h]!==void 0},g.prototype.addFilter=function(h,m){return this.filters||(this.filters={},this.indexesWithFilters=[]),this.filters[this.indexes[h]]=m,this.indexesWithFilters.push(this.indexes[h]),!0},g.prototype.addChildrenFilter=function(h,m){var T=this.indexes[h],z=this.schema[h];if(A(Object.keys(z)[0]))return this.childFilters||(this.childFilters={}),this.childFilters[T]=m,!0;console.warn("@filterChildren: field '".concat(h,"' can't have children. Ignoring filter."))},g.prototype.getChildrenFilter=function(h){return this.childFilters&&this.childFilters[this.indexes[h]]},g.prototype.getNextFieldIndex=function(){return Object.keys(this.schema||{}).length},g}();function P(g){return g._context&&g._context.useFilters}var U=function(){function g(){this.types={},this.schemas=new Map,this.useFilters=!1}return g.prototype.has=function(h){return this.schemas.has(h)},g.prototype.get=function(h){return this.types[h]},g.prototype.add=function(h,m){m===void 0&&(m=this.schemas.size),h._definition=D.create(h._definition),h._typeid=m,this.types[m]=h,this.schemas.set(h,m)},g.create=function(h){return h===void 0&&(h={}),function(m){return h.context||(h.context=new g),w(m,h)}},g}(),E=new U;function w(g,h){return h===void 0&&(h={}),function(m,T){var z=h.context||E,ee=m.constructor;if(ee._context=z,!g)throw new Error("".concat(ee.name,': @type() reference provided for "').concat(T,`" is undefined. Make sure you don't have any circular dependencies.`));z.has(ee)||z.add(ee);var Le=ee._definition;if(Le.addField(T,g),Le.descriptors[T]){if(Le.deprecated[T])return;try{throw new Error("@colyseus/schema: Duplicate '".concat(T,"' definition on '").concat(ee.name,`'.
Check @type() annotation`))}catch(Fe){var Ce=Fe.stack.split(`
`)[4].trim();throw new Error("".concat(Fe.message," ").concat(Ce))}}var tt=y.is(g),nt=!tt&&p.is(g);if(typeof g!="string"&&!Qe.is(g)){var Ne=Object.values(g)[0];typeof Ne!="string"&&!z.has(Ne)&&z.add(Ne)}if(h.manual){Le.descriptors[T]={enumerable:!0,configurable:!0,writable:!0};return}var st="_".concat(T);Le.descriptors[st]={enumerable:!1,configurable:!1,writable:!0},Le.descriptors[T]={get:function(){return this[st]},set:function(Fe){Fe!==this[st]&&(Fe!=null?(tt&&!(Fe instanceof y)&&(Fe=new(y.bind.apply(y,o([void 0],Fe,!1)))),nt&&!(Fe instanceof p)&&(Fe=new p(Fe)),Fe.$proxy===void 0&&(nt?Fe=_(Fe):tt&&(Fe=x(Fe))),this.$changes.change(T),Fe.$changes&&Fe.$changes.setParent(this,this.$changes.root,this._definition.indexes[T])):this[st]!==void 0&&this.$changes.delete(T),this[st]=Fe)},enumerable:!0,configurable:!0}}}function Z(g){return function(h,m){var T=h.constructor,z=T._definition;z.addFilter(m,g)&&(T._context.useFilters=!0)}}function I(g){return function(h,m){var T=h.constructor,z=T._definition;z.addChildrenFilter(m,g)&&(T._context.useFilters=!0)}}function W(g){return g===void 0&&(g=!0),function(h,m){var T=h.constructor,z=T._definition;z.deprecated[m]=!0,g&&(z.descriptors[m]={get:function(){throw new Error("".concat(m," is deprecated."))},set:function(ee){},enumerable:!1,configurable:!0})}}function $(g,h,m){m===void 0&&(m={}),m.context||(m.context=g._context||m.context||E);for(var T in h)w(h[T],m)(g.prototype,T);return g}function q(g){for(var h=0,m=0,T=0,z=g.length;T<z;T++)h=g.charCodeAt(T),h<128?m+=1:h<2048?m+=2:h<55296||h>=57344?m+=3:(T++,m+=4);return m}function X(g,h,m){for(var T=0,z=0,ee=m.length;z<ee;z++)T=m.charCodeAt(z),T<128?g[h++]=T:T<2048?(g[h++]=192|T>>6,g[h++]=128|T&63):T<55296||T>=57344?(g[h++]=224|T>>12,g[h++]=128|T>>6&63,g[h++]=128|T&63):(z++,T=65536+((T&1023)<<10|m.charCodeAt(z)&1023),g[h++]=240|T>>18,g[h++]=128|T>>12&63,g[h++]=128|T>>6&63,g[h++]=128|T&63)}function Y(g,h){g.push(h&255)}function H(g,h){g.push(h&255)}function oe(g,h){g.push(h&255),g.push(h>>8&255)}function ne(g,h){g.push(h&255),g.push(h>>8&255)}function Se(g,h){g.push(h&255),g.push(h>>8&255),g.push(h>>16&255),g.push(h>>24&255)}function Te(g,h){var m=h>>24,T=h>>16,z=h>>8,ee=h;g.push(ee&255),g.push(z&255),g.push(T&255),g.push(m&255)}function be(g,h){var m=Math.floor(h/Math.pow(2,32)),T=h>>>0;Te(g,T),Te(g,m)}function je(g,h){var m=h/Math.pow(2,32)>>0,T=h>>>0;Te(g,T),Te(g,m)}function Rt(g,h){qe(g,h)}function bt(g,h){ke(g,h)}var Q=new Int32Array(2),de=new Float32Array(Q.buffer),pe=new Float64Array(Q.buffer);function qe(g,h){de[0]=h,Se(g,Q[0])}function ke(g,h){pe[0]=h,Se(g,Q[0]),Se(g,Q[1])}function Ve(g,h){return H(g,h?1:0)}function Dt(g,h){h||(h="");var m=q(h),T=0;if(m<32)g.push(m|160),T=1;else if(m<256)g.push(217),H(g,m),T=2;else if(m<65536)g.push(218),ne(g,m),T=3;else if(m<4294967296)g.push(219),Te(g,m),T=5;else throw new Error("String too long");return X(g,g.length,h),T+m}function Ge(g,h){if(isNaN(h))return Ge(g,0);if(isFinite(h)){if(h!==(h|0))return g.push(203),ke(g,h),9}else return Ge(g,h>0?Number.MAX_SAFE_INTEGER:-Number.MAX_SAFE_INTEGER);return h>=0?h<128?(H(g,h),1):h<256?(g.push(204),H(g,h),2):h<65536?(g.push(205),ne(g,h),3):h<4294967296?(g.push(206),Te(g,h),5):(g.push(207),je(g,h),9):h>=-32?(g.push(224|h+32),1):h>=-128?(g.push(208),Y(g,h),2):h>=-32768?(g.push(209),oe(g,h),3):h>=-2147483648?(g.push(210),Se(g,h),5):(g.push(211),be(g,h),9)}var mt=Object.freeze({__proto__:null,boolean:Ve,float32:Rt,float64:bt,int16:oe,int32:Se,int64:be,int8:Y,number:Ge,string:Dt,uint16:ne,uint32:Te,uint64:je,uint8:H,utf8Write:X,writeFloat32:qe,writeFloat64:ke});function St(g,h,m){for(var T="",z=0,ee=h,Le=h+m;ee<Le;ee++){var Ce=g[ee];if(!(Ce&128)){T+=String.fromCharCode(Ce);continue}if((Ce&224)===192){T+=String.fromCharCode((Ce&31)<<6|g[++ee]&63);continue}if((Ce&240)===224){T+=String.fromCharCode((Ce&15)<<12|(g[++ee]&63)<<6|(g[++ee]&63)<<0);continue}if((Ce&248)===240){z=(Ce&7)<<18|(g[++ee]&63)<<12|(g[++ee]&63)<<6|(g[++ee]&63)<<0,z>=65536?(z-=65536,T+=String.fromCharCode((z>>>10)+55296,(z&1023)+56320)):T+=String.fromCharCode(z);continue}console.error("Invalid byte "+Ce.toString(16))}return T}function Ke(g,h){return wt(g,h)<<24>>24}function wt(g,h){return g[h.offset++]}function L(g,h){return Pt(g,h)<<16>>16}function Pt(g,h){return g[h.offset++]|g[h.offset++]<<8}function at(g,h){return g[h.offset++]|g[h.offset++]<<8|g[h.offset++]<<16|g[h.offset++]<<24}function gt(g,h){return at(g,h)>>>0}function De(g,h){return Ae(g,h)}function R(g,h){return he(g,h)}function M(g,h){var m=gt(g,h),T=at(g,h)*Math.pow(2,32);return T+m}function k(g,h){var m=gt(g,h),T=gt(g,h)*Math.pow(2,32);return T+m}var J=new Int32Array(2),te=new Float32Array(J.buffer),K=new Float64Array(J.buffer);function Ae(g,h){return J[0]=at(g,h),te[0]}function he(g,h){return J[0]=at(g,h),J[1]=at(g,h),K[0]}function Be(g,h){return wt(g,h)>0}function ze(g,h){var m=g[h.offset++],T;m<192?T=m&31:m===217?T=wt(g,h):m===218?T=Pt(g,h):m===219&&(T=gt(g,h));var z=St(g,h.offset,T);return h.offset+=T,z}function re(g,h){var m=g[h.offset];return m<192&&m>160||m===217||m===218||m===219}function se(g,h){var m=g[h.offset++];if(m<128)return m;if(m===202)return Ae(g,h);if(m===203)return he(g,h);if(m===204)return wt(g,h);if(m===205)return Pt(g,h);if(m===206)return gt(g,h);if(m===207)return k(g,h);if(m===208)return Ke(g,h);if(m===209)return L(g,h);if(m===210)return at(g,h);if(m===211)return M(g,h);if(m>223)return(255-m+1)*-1}function Pe(g,h){var m=g[h.offset];return m<128||m>=202&&m<=211}function Ie(g,h){return g[h.offset]<160}function Ee(g,h){return g[h.offset-1]===a&&(g[h.offset]<128||g[h.offset]>=202&&g[h.offset]<=211)}var Je=Object.freeze({__proto__:null,arrayCheck:Ie,boolean:Be,float32:De,float64:R,int16:L,int32:at,int64:M,int8:Ke,number:se,numberCheck:Pe,readFloat32:Ae,readFloat64:he,string:ze,stringCheck:re,switchStructureCheck:Ee,uint16:Pt,uint32:gt,uint64:k,uint8:wt}),O=function(){function g(h){var m=this;this.$changes=new c(this),this.$items=new Map,this.$indexes=new Map,this.$refId=0,h&&h.forEach(function(T){return m.add(T)})}return g.prototype.onAdd=function(h,m){return m===void 0&&(m=!0),u(this.$callbacks||(this.$callbacks=[]),t.OPERATION.ADD,h,m?this.$items:void 0)},g.prototype.onRemove=function(h){return u(this.$callbacks||(this.$callbacks=[]),t.OPERATION.DELETE,h)},g.prototype.onChange=function(h){return u(this.$callbacks||(this.$callbacks=[]),t.OPERATION.REPLACE,h)},g.is=function(h){return h.collection!==void 0},g.prototype.add=function(h){var m=this.$refId++,T=h.$changes!==void 0;return T&&h.$changes.setParent(this,this.$changes.root,m),this.$changes.indexes[m]=m,this.$indexes.set(m,m),this.$items.set(m,h),this.$changes.change(m),m},g.prototype.at=function(h){var m=Array.from(this.$items.keys())[h];return this.$items.get(m)},g.prototype.entries=function(){return this.$items.entries()},g.prototype.delete=function(h){for(var m=this.$items.entries(),T,z;(z=m.next())&&!z.done;)if(h===z.value[1]){T=z.value[0];break}return T===void 0?!1:(this.$changes.delete(T),this.$indexes.delete(T),this.$items.delete(T))},g.prototype.clear=function(h){this.$changes.discard(!0,!0),this.$changes.indexes={},this.$indexes.clear(),h&&d.call(this,h),this.$items.clear(),this.$changes.operation({index:0,op:t.OPERATION.CLEAR}),this.$changes.touchParents()},g.prototype.has=function(h){return Array.from(this.$items.values()).some(function(m){return m===h})},g.prototype.forEach=function(h){var m=this;this.$items.forEach(function(T,z,ee){return h(T,z,m)})},g.prototype.values=function(){return this.$items.values()},Object.defineProperty(g.prototype,"size",{get:function(){return this.$items.size},enumerable:!1,configurable:!0}),g.prototype.setIndex=function(h,m){this.$indexes.set(h,m)},g.prototype.getIndex=function(h){return this.$indexes.get(h)},g.prototype.getByIndex=function(h){return this.$items.get(this.$indexes.get(h))},g.prototype.deleteByIndex=function(h){var m=this.$indexes.get(h);this.$items.delete(m),this.$indexes.delete(h)},g.prototype.toArray=function(){return Array.from(this.$items.values())},g.prototype.toJSON=function(){var h=[];return this.forEach(function(m,T){h.push(typeof m.toJSON=="function"?m.toJSON():m)}),h},g.prototype.clone=function(h){var m;return h?m=Object.assign(new g,this):(m=new g,this.forEach(function(T){T.$changes?m.add(T.clone()):m.add(T)})),m},g}(),ue=function(){function g(h){var m=this;this.$changes=new c(this),this.$items=new Map,this.$indexes=new Map,this.$refId=0,h&&h.forEach(function(T){return m.add(T)})}return g.prototype.onAdd=function(h,m){return m===void 0&&(m=!0),u(this.$callbacks||(this.$callbacks=[]),t.OPERATION.ADD,h,m?this.$items:void 0)},g.prototype.onRemove=function(h){return u(this.$callbacks||(this.$callbacks=[]),t.OPERATION.DELETE,h)},g.prototype.onChange=function(h){return u(this.$callbacks||(this.$callbacks=[]),t.OPERATION.REPLACE,h)},g.is=function(h){return h.set!==void 0},g.prototype.add=function(h){var m,T;if(this.has(h))return!1;var z=this.$refId++;h.$changes!==void 0&&h.$changes.setParent(this,this.$changes.root,z);var ee=(T=(m=this.$changes.indexes[z])===null||m===void 0?void 0:m.op)!==null&&T!==void 0?T:t.OPERATION.ADD;return this.$changes.indexes[z]=z,this.$indexes.set(z,z),this.$items.set(z,h),this.$changes.change(z,ee),z},g.prototype.entries=function(){return this.$items.entries()},g.prototype.delete=function(h){for(var m=this.$items.entries(),T,z;(z=m.next())&&!z.done;)if(h===z.value[1]){T=z.value[0];break}return T===void 0?!1:(this.$changes.delete(T),this.$indexes.delete(T),this.$items.delete(T))},g.prototype.clear=function(h){this.$changes.discard(!0,!0),this.$changes.indexes={},this.$indexes.clear(),h&&d.call(this,h),this.$items.clear(),this.$changes.operation({index:0,op:t.OPERATION.CLEAR}),this.$changes.touchParents()},g.prototype.has=function(h){for(var m=this.$items.values(),T=!1,z;(z=m.next())&&!z.done;)if(h===z.value){T=!0;break}return T},g.prototype.forEach=function(h){var m=this;this.$items.forEach(function(T,z,ee){return h(T,z,m)})},g.prototype.values=function(){return this.$items.values()},Object.defineProperty(g.prototype,"size",{get:function(){return this.$items.size},enumerable:!1,configurable:!0}),g.prototype.setIndex=function(h,m){this.$indexes.set(h,m)},g.prototype.getIndex=function(h){return this.$indexes.get(h)},g.prototype.getByIndex=function(h){return this.$items.get(this.$indexes.get(h))},g.prototype.deleteByIndex=function(h){var m=this.$indexes.get(h);this.$items.delete(m),this.$indexes.delete(h)},g.prototype.toArray=function(){return Array.from(this.$items.values())},g.prototype.toJSON=function(){var h=[];return this.forEach(function(m,T){h.push(typeof m.toJSON=="function"?m.toJSON():m)}),h},g.prototype.clone=function(h){var m;return h?m=Object.assign(new g,this):(m=new g,this.forEach(function(T){T.$changes?m.add(T.clone()):m.add(T)})),m},g}(),le=function(){function g(){this.refIds=new WeakSet,this.containerIndexes=new WeakMap}return g.prototype.addRefId=function(h){this.refIds.has(h)||(this.refIds.add(h),this.containerIndexes.set(h,new Set))},g.get=function(h){return h.$filterState===void 0&&(h.$filterState=new g),h.$filterState},g}(),we=function(){function g(){this.refs=new Map,this.refCounts={},this.deletedRefs=new Set,this.nextUniqueId=0}return g.prototype.getNextUniqueId=function(){return this.nextUniqueId++},g.prototype.addRef=function(h,m,T){T===void 0&&(T=!0),this.refs.set(h,m),T&&(this.refCounts[h]=(this.refCounts[h]||0)+1)},g.prototype.removeRef=function(h){var m=this.refCounts[h];if(m===void 0){console.warn("trying to remove reference ".concat(h," that doesn't exist"));return}if(m===0){console.warn("trying to remove reference ".concat(h," with 0 refCount"));return}this.refCounts[h]=m-1,this.deletedRefs.add(h)},g.prototype.clearRefs=function(){this.refs.clear(),this.deletedRefs.clear(),this.refCounts={}},g.prototype.garbageCollectDeletedRefs=function(){var h=this;this.deletedRefs.forEach(function(m){if(!(h.refCounts[m]>0)){var T=h.refs.get(m);if(T instanceof Qe)for(var z in T._definition.schema)typeof T._definition.schema[z]!="string"&&T[z]&&T[z].$changes&&h.removeRef(T[z].$changes.refId);else{var ee=T.$changes.parent._definition,Le=ee.schema[ee.fieldsByIndex[T.$changes.parentIndex]];typeof Object.values(Le)[0]=="function"&&Array.from(T.values()).forEach(function(Ce){return h.removeRef(Ce.$changes.refId)})}h.refs.delete(m),delete h.refCounts[m]}}),this.deletedRefs.clear()},g}(),ie=function(g){r(h,g);function h(){return g!==null&&g.apply(this,arguments)||this}return h}(Error);function j(g,h,m,T){var z,ee=!1;switch(h){case"number":case"int8":case"uint8":case"int16":case"uint16":case"int32":case"uint32":case"int64":case"uint64":case"float32":case"float64":z="number",isNaN(g)&&console.log('trying to encode "NaN" in '.concat(m.constructor.name,"#").concat(T));break;case"string":z="string",ee=!0;break;case"boolean":return}if(typeof g!==z&&(!ee||ee&&g!==null)){var Le="'".concat(JSON.stringify(g),"'").concat(g&&g.constructor&&" (".concat(g.constructor.name,")")||"");throw new ie("a '".concat(z,"' was expected, but ").concat(Le," was provided in ").concat(m.constructor.name,"#").concat(T))}}function Re(g,h,m,T){if(!(g instanceof h))throw new ie("a '".concat(h.name,"' was expected, but '").concat(g.constructor.name,"' was provided in ").concat(m.constructor.name,"#").concat(T))}function Xe(g,h,m,T,z){j(m,g,T,z);var ee=mt[g];if(ee)ee(h,m);else throw new ie("a '".concat(g,"' was expected, but ").concat(m," was provided in ").concat(T.constructor.name,"#").concat(z))}function Et(g,h,m){return Je[g](h,m)}var Qe=function(){function g(){for(var h=[],m=0;m<arguments.length;m++)h[m]=arguments[m];Object.defineProperties(this,{$changes:{value:new c(this,void 0,new we),enumerable:!1,writable:!0},$callbacks:{value:void 0,enumerable:!1,writable:!0}});var T=this._definition.descriptors;T&&Object.defineProperties(this,T),h[0]&&this.assign(h[0])}return g.onError=function(h){console.error(h)},g.is=function(h){return h._definition&&h._definition.schema!==void 0},g.prototype.onChange=function(h){return u(this.$callbacks||(this.$callbacks={}),t.OPERATION.REPLACE,h)},g.prototype.onRemove=function(h){return u(this.$callbacks||(this.$callbacks={}),t.OPERATION.DELETE,h)},g.prototype.assign=function(h){return Object.assign(this,h),this},Object.defineProperty(g.prototype,"_definition",{get:function(){return this.constructor._definition},enumerable:!1,configurable:!0}),g.prototype.setDirty=function(h,m){this.$changes.change(h,m)},g.prototype.listen=function(h,m,T){var z=this;return T===void 0&&(T=!0),this.$callbacks||(this.$callbacks={}),this.$callbacks[h]||(this.$callbacks[h]=[]),this.$callbacks[h].push(m),T&&this[h]!==void 0&&m(this[h],void 0),function(){return f(z.$callbacks[h],z.$callbacks[h].indexOf(m))}},g.prototype.decode=function(h,m,T){m===void 0&&(m={offset:0}),T===void 0&&(T=this);var z=[],ee=this.$changes.root,Le=h.length,Ce=0;for(ee.refs.set(Ce,this);m.offset<Le;){var tt=h[m.offset++];if(tt==a){Ce=se(h,m);var nt=ee.refs.get(Ce);if(!nt)throw new Error('"refId" not found: '.concat(Ce));T=nt;continue}var Ne=T.$changes,st=T._definition!==void 0,Fe=st?tt>>6<<6:tt;if(Fe===t.OPERATION.CLEAR){T.clear(z);continue}var it=st?tt%(Fe||255):se(h,m),$e=st?T._definition.fieldsByIndex[it]:"",Ze=Ne.getType(it),ce=void 0,S=void 0,N=void 0;if(st?S=T["_".concat($e)]:(S=T.getByIndex(it),(Fe&t.OPERATION.ADD)===t.OPERATION.ADD?(N=T instanceof p?ze(h,m):it,T.setIndex(it,N)):N=T.getIndex(it)),(Fe&t.OPERATION.DELETE)===t.OPERATION.DELETE&&(Fe!==t.OPERATION.DELETE_AND_ADD&&T.deleteByIndex(it),S&&S.$changes&&ee.removeRef(S.$changes.refId),ce=null),$e===void 0){console.warn("@colyseus/schema: definition mismatch");for(var V={offset:m.offset};m.offset<Le&&!(Ee(h,m)&&(V.offset=m.offset+1,ee.refs.has(se(h,V))));)m.offset++;continue}else if(Fe!==t.OPERATION.DELETE)if(g.is(Ze)){var F=se(h,m);if(ce=ee.refs.get(F),Fe!==t.OPERATION.REPLACE){var B=this.getSchemaType(h,m,Ze);ce||(ce=this.createTypeInstance(B),ce.$changes.refId=F,S&&(ce.$callbacks=S.$callbacks,S.$changes.refId&&F!==S.$changes.refId&&ee.removeRef(S.$changes.refId))),ee.addRef(F,ce,ce!==S)}}else if(typeof Ze=="string")ce=Et(Ze,h,m);else{var me=A(Object.keys(Ze)[0]),xe=se(h,m),fe=ee.refs.has(xe)?S||ee.refs.get(xe):new me.constructor;if(ce=fe.clone(!0),ce.$changes.refId=xe,S&&(ce.$callbacks=S.$callbacks,S.$changes.refId&&xe!==S.$changes.refId)){ee.removeRef(S.$changes.refId);for(var ge=S.entries(),ve=void 0;(ve=ge.next())&&!ve.done;){var We=ve.value,He=We[0],Ue=We[1];z.push({refId:xe,op:t.OPERATION.DELETE,field:He,value:void 0,previousValue:Ue})}}ee.addRef(xe,ce,fe!==S)}if(ce!=null){if(ce.$changes&&ce.$changes.setParent(Ne.ref,Ne.root,it),T instanceof g)T[$e]=ce;else if(T instanceof p){var He=N;T.$items.set(He,ce),T.$changes.allChanges.add(it)}else if(T instanceof y)T.setAt(it,ce);else if(T instanceof O){var lt=T.add(ce);T.setIndex(it,lt)}else if(T instanceof ue){var lt=T.add(ce);lt!==!1&&T.setIndex(it,lt)}}S!==ce&&z.push({refId:Ce,op:Fe,field:$e,dynamicIndex:N,value:ce,previousValue:S})}return this._triggerChanges(z),ee.garbageCollectDeletedRefs(),z},g.prototype.encode=function(h,m,T){h===void 0&&(h=!1),m===void 0&&(m=[]),T===void 0&&(T=!1);for(var z=this.$changes,ee=new WeakSet,Le=[z],Ce=1,tt=0;tt<Ce;tt++){var nt=Le[tt],Ne=nt.ref,st=Ne instanceof g;nt.ensureRefId(),ee.add(nt),nt!==z&&(nt.changed||h)&&(H(m,a),Ge(m,nt.refId));for(var Fe=h?Array.from(nt.allChanges):Array.from(nt.changes.values()),it=0,$e=Fe.length;it<$e;it++){var Ze=h?{op:t.OPERATION.ADD,index:Fe[it]}:Fe[it],ce=Ze.index,S=st?Ne._definition.fieldsByIndex&&Ne._definition.fieldsByIndex[ce]:ce,N=m.length;if(Ze.op!==t.OPERATION.TOUCH)if(st)H(m,ce|Ze.op);else{if(H(m,Ze.op),Ze.op===t.OPERATION.CLEAR)continue;Ge(m,ce)}if(!st&&(Ze.op&t.OPERATION.ADD)==t.OPERATION.ADD&&Ne instanceof p){var V=nt.ref.$indexes.get(ce);Dt(m,V)}if(Ze.op!==t.OPERATION.DELETE){var F=nt.getType(ce),B=nt.getValue(ce);if(B&&B.$changes&&!ee.has(B.$changes)&&(Le.push(B.$changes),B.$changes.ensureRefId(),Ce++),Ze.op!==t.OPERATION.TOUCH){if(g.is(F))Re(B,F,Ne,S),Ge(m,B.$changes.refId),(Ze.op&t.OPERATION.ADD)===t.OPERATION.ADD&&this.tryEncodeTypeId(m,F,B.constructor);else if(typeof F=="string")Xe(F,m,B,Ne,S);else{var me=A(Object.keys(F)[0]);Re(Ne["_".concat(S)],me.constructor,Ne,S),Ge(m,B.$changes.refId)}T&&nt.cache(ce,m.slice(N))}}}!h&&!T&&nt.discard()}return m},g.prototype.encodeAll=function(h){return this.encode(!0,[],h)},g.prototype.applyFilters=function(h,m){var T,z;m===void 0&&(m=!1);for(var ee=this,Le=new Set,Ce=le.get(h),tt=[this.$changes],nt=1,Ne=[],st=function(it){var $e=tt[it];if(Le.has($e.refId))return"continue";var Ze=$e.ref,ce=Ze instanceof g;H(Ne,a),Ge(Ne,$e.refId);var S=Ce.refIds.has($e),N=m||!S;Ce.addRefId($e);var V=Ce.containerIndexes.get($e),F=N?Array.from($e.allChanges):Array.from($e.changes.values());if(!m&&ce&&Ze._definition.indexesWithFilters){var B=Ze._definition.indexesWithFilters;B.forEach(function(Ct){!V.has(Ct)&&$e.allChanges.has(Ct)&&(N?F.push(Ct):F.push({op:t.OPERATION.ADD,index:Ct}))})}for(var me=0,xe=F.length;me<xe;me++){var fe=N?{op:t.OPERATION.ADD,index:F[me]}:F[me];if(fe.op===t.OPERATION.CLEAR){H(Ne,fe.op);continue}var ge=fe.index;if(fe.op===t.OPERATION.DELETE){ce?H(Ne,fe.op|ge):(H(Ne,fe.op),Ge(Ne,ge));continue}var ve=$e.getValue(ge),We=$e.getType(ge);if(ce){var He=Ze._definition.filters&&Ze._definition.filters[ge];if(He&&!He.call(Ze,h,ve,ee)){ve&&ve.$changes&&Le.add(ve.$changes.refId);continue}}else{var Ue=$e.parent,He=$e.getChildrenFilter();if(He&&!He.call(Ue,h,Ze.$indexes.get(ge),ve,ee)){ve&&ve.$changes&&Le.add(ve.$changes.refId);continue}}if(ve.$changes&&(tt.push(ve.$changes),nt++),fe.op!==t.OPERATION.TOUCH)if(fe.op===t.OPERATION.ADD||ce)Ne.push.apply(Ne,(T=$e.caches[ge])!==null&&T!==void 0?T:[]),V.add(ge);else if(V.has(ge))Ne.push.apply(Ne,(z=$e.caches[ge])!==null&&z!==void 0?z:[]);else{if(V.add(ge),H(Ne,t.OPERATION.ADD),Ge(Ne,ge),Ze instanceof p){var lt=$e.ref.$indexes.get(ge);Dt(Ne,lt)}ve.$changes?Ge(Ne,ve.$changes.refId):mt[We](Ne,ve)}else if(ve.$changes&&!ce){if(H(Ne,t.OPERATION.ADD),Ge(Ne,ge),Ze instanceof p){var lt=$e.ref.$indexes.get(ge);Dt(Ne,lt)}Ge(Ne,ve.$changes.refId)}}},Fe=0;Fe<nt;Fe++)st(Fe);return Ne},g.prototype.clone=function(){var h,m=new this.constructor,T=this._definition.schema;for(var z in T)typeof this[z]=="object"&&typeof((h=this[z])===null||h===void 0?void 0:h.clone)=="function"?m[z]=this[z].clone():m[z]=this[z];return m},g.prototype.toJSON=function(){var h=this._definition.schema,m=this._definition.deprecated,T={};for(var z in h)!m[z]&&this[z]!==null&&typeof this[z]<"u"&&(T[z]=typeof this[z].toJSON=="function"?this[z].toJSON():this["_".concat(z)]);return T},g.prototype.discardAllChanges=function(){this.$changes.discardAll()},g.prototype.getByIndex=function(h){return this[this._definition.fieldsByIndex[h]]},g.prototype.deleteByIndex=function(h){this[this._definition.fieldsByIndex[h]]=void 0},g.prototype.tryEncodeTypeId=function(h,m,T){m._typeid!==T._typeid&&(H(h,l),Ge(h,T._typeid))},g.prototype.getSchemaType=function(h,m,T){var z;return h[m.offset]===l&&(m.offset++,z=this.constructor._context.get(se(h,m))),z||T},g.prototype.createTypeInstance=function(h){var m=new h;return m.$changes.root=this.$changes.root,m},g.prototype._triggerChanges=function(h){for(var m,T,z,ee,Le,Ce,tt,nt,Ne,st=new Set,Fe=this.$changes.root.refs,it=function(Ze){var ce=h[Ze],S=ce.refId,N=Fe.get(S),V=N.$callbacks;if((ce.op&t.OPERATION.DELETE)===t.OPERATION.DELETE&&ce.previousValue instanceof g&&((T=(m=ce.previousValue.$callbacks)===null||m===void 0?void 0:m[t.OPERATION.DELETE])===null||T===void 0||T.forEach(function(F){return F()})),!V)return"continue";if(N instanceof g){if(!st.has(S))try{(z=V==null?void 0:V[t.OPERATION.REPLACE])===null||z===void 0||z.forEach(function(F){return F()})}catch(F){g.onError(F)}try{V.hasOwnProperty(ce.field)&&((ee=V[ce.field])===null||ee===void 0||ee.forEach(function(F){return F(ce.value,ce.previousValue)}))}catch(F){g.onError(F)}}else ce.op===t.OPERATION.ADD&&ce.previousValue===void 0?(Le=V[t.OPERATION.ADD])===null||Le===void 0||Le.forEach(function(F){var B;return F(ce.value,(B=ce.dynamicIndex)!==null&&B!==void 0?B:ce.field)}):ce.op===t.OPERATION.DELETE?ce.previousValue!==void 0&&((Ce=V[t.OPERATION.DELETE])===null||Ce===void 0||Ce.forEach(function(F){var B;return F(ce.previousValue,(B=ce.dynamicIndex)!==null&&B!==void 0?B:ce.field)})):ce.op===t.OPERATION.DELETE_AND_ADD&&(ce.previousValue!==void 0&&((tt=V[t.OPERATION.DELETE])===null||tt===void 0||tt.forEach(function(F){var B;return F(ce.previousValue,(B=ce.dynamicIndex)!==null&&B!==void 0?B:ce.field)})),(nt=V[t.OPERATION.ADD])===null||nt===void 0||nt.forEach(function(F){var B;return F(ce.value,(B=ce.dynamicIndex)!==null&&B!==void 0?B:ce.field)})),ce.value!==ce.previousValue&&((Ne=V[t.OPERATION.REPLACE])===null||Ne===void 0||Ne.forEach(function(F){var B;return F(ce.value,(B=ce.dynamicIndex)!==null&&B!==void 0?B:ce.field)}));st.add(S)},$e=0;$e<h.length;$e++)it($e)},g._definition=D.create(),g}();function gn(g){for(var h=[g.$changes],m=1,T={},z=T,ee=function(Ce){var tt=h[Ce];tt.changes.forEach(function(nt){var Ne=tt.ref,st=nt.index,Fe=Ne._definition?Ne._definition.fieldsByIndex[st]:Ne.$indexes.get(st);z[Fe]=tt.getValue(st)})},Le=0;Le<m;Le++)ee(Le);return T}var Xt={context:new U},Ci=function(g){r(h,g);function h(){return g!==null&&g.apply(this,arguments)||this}return s([w("string",Xt)],h.prototype,"name",void 0),s([w("string",Xt)],h.prototype,"type",void 0),s([w("number",Xt)],h.prototype,"referencedType",void 0),h}(Qe),ci=function(g){r(h,g);function h(){var m=g!==null&&g.apply(this,arguments)||this;return m.fields=new y,m}return s([w("number",Xt)],h.prototype,"id",void 0),s([w([Ci],Xt)],h.prototype,"fields",void 0),h}(Qe),Gs=function(g){r(h,g);function h(){var m=g!==null&&g.apply(this,arguments)||this;return m.types=new y,m}return h.encode=function(m){var T,z=m.constructor,ee=new h;ee.rootType=z._typeid;var Le=function(Ne,st){for(var Fe in st){var it=new Ci;it.name=Fe;var $e=void 0;if(typeof st[Fe]=="string")$e=st[Fe];else{var Ze=st[Fe],ce=void 0;Qe.is(Ze)?($e="ref",ce=st[Fe]):($e=Object.keys(Ze)[0],typeof Ze[$e]=="string"?$e+=":"+Ze[$e]:ce=Ze[$e]),it.referencedType=ce?ce._typeid:-1}it.type=$e,Ne.fields.push(it)}ee.types.push(Ne)},Ce=(T=z._context)===null||T===void 0?void 0:T.types;for(var tt in Ce){var nt=new ci;nt.id=Number(tt),Le(nt,Ce[tt]._definition.schema)}return ee.encodeAll()},h.decode=function(m,T){var z=new U,ee=new h;ee.decode(m,T);var Le=ee.types.reduce(function(st,Fe){var it=function(Ze){r(ce,Ze);function ce(){return Ze!==null&&Ze.apply(this,arguments)||this}return ce}(Qe),$e=Fe.id;return st[$e]=it,z.add(it,$e),st},{});ee.types.forEach(function(st){var Fe=Le[st.id];st.fields.forEach(function(it){var $e;if(it.referencedType!==void 0){var Ze=it.type,ce=Le[it.referencedType];if(!ce){var S=it.type.split(":");Ze=S[0],ce=S[1]}Ze==="ref"?w(ce,{context:z})(Fe.prototype,it.name):w(($e={},$e[Ze]=ce,$e),{context:z})(Fe.prototype,it.name)}else w(it.type,{context:z})(Fe.prototype,it.name)})});var Ce=Le[ee.rootType],tt=new Ce;for(var nt in Ce._definition.schema){var Ne=Ce._definition.schema[nt];typeof Ne!="string"&&(tt[nt]=typeof Ne=="function"?new Ne:new(A(Object.keys(Ne)[0])).constructor)}return tt},s([w([ci],Xt)],h.prototype,"types",void 0),s([w("number",Xt)],h.prototype,"rootType",void 0),h}(Qe);C("map",{constructor:p}),C("array",{constructor:y}),C("set",{constructor:ue}),C("collection",{constructor:O}),t.ArraySchema=y,t.CollectionSchema=O,t.Context=U,t.MapSchema=p,t.Reflection=Gs,t.ReflectionField=Ci,t.ReflectionType=ci,t.Schema=Qe,t.SchemaDefinition=D,t.SetSchema=ue,t.decode=Je,t.defineTypes=$,t.deprecated=W,t.dumpChanges=gn,t.encode=mt,t.filter=Z,t.filterChildren=I,t.hasFilter=P,t.registerType=C,t.type=w})})(ba,ba.exports);var th=ba.exports,w0=Lt&&Lt.__createBinding||(Object.create?function(i,e,t,n){n===void 0&&(n=t);var r=Object.getOwnPropertyDescriptor(e,t);(!r||("get"in r?!e.__esModule:r.writable||r.configurable))&&(r={enumerable:!0,get:function(){return e[t]}}),Object.defineProperty(i,n,r)}:function(i,e,t,n){n===void 0&&(n=t),i[n]=e[t]}),A0=Lt&&Lt.__setModuleDefault||(Object.create?function(i,e){Object.defineProperty(i,"default",{enumerable:!0,value:e})}:function(i,e){i.default=e}),R0=Lt&&Lt.__importStar||function(i){if(i&&i.__esModule)return i;var e={};if(i!=null)for(var t in i)t!=="default"&&Object.prototype.hasOwnProperty.call(i,t)&&w0(e,i,t);return A0(e,i),e};Object.defineProperty(Ur,"__esModule",{value:!0});Ur.Room=void 0;const lc=R0(tr),C0=Os,Kt=Ya,hc=Ri,P0=Or,hs=nr,cn=th,uc=Us;class qa{constructor(e,t){this.onStateChange=(0,hs.createSignal)(),this.onError=(0,hs.createSignal)(),this.onLeave=(0,hs.createSignal)(),this.onJoin=(0,hs.createSignal)(),this.hasJoined=!1,this.onMessageHandlers=(0,P0.createNanoEvents)(),this.roomId=null,this.name=e,t&&(this.serializer=new((0,hc.getSerializer)("schema")),this.rootSchema=t,this.serializer.state=new t),this.onError((n,r)=>{var s;return(s=console.warn)===null||s===void 0?void 0:s.call(console,`colyseus.js - onError => (${n}) ${r}`)}),this.onLeave(()=>this.removeAllListeners())}get id(){return this.roomId}connect(e,t,n=this,r){const s=new C0.Connection;n.connection=s,s.events.onmessage=qa.prototype.onMessageCallback.bind(n),s.events.onclose=function(o){var a;if(!n.hasJoined){(a=console.warn)===null||a===void 0||a.call(console,`Room connection was closed unexpectedly (${o.code}): ${o.reason}`),n.onError.invoke(o.code,o.reason);return}o.code===uc.CloseCode.DEVMODE_RESTART&&t?t():(n.onLeave.invoke(o.code,o.reason),n.destroy())},s.events.onerror=function(o){var a;(a=console.warn)===null||a===void 0||a.call(console,`Room, onError (${o.code}): ${o.reason}`),n.onError.invoke(o.code,o.reason)},s.connect(e,r)}leave(e=!0){return new Promise(t=>{this.onLeave(n=>t(n)),this.connection?e?this.connection.send([Kt.Protocol.LEAVE_ROOM]):this.connection.close():this.onLeave.invoke(uc.CloseCode.CONSENTED)})}onMessage(e,t){return this.onMessageHandlers.on(this.getMessageHandlerKey(e),t)}send(e,t){const n=[Kt.Protocol.ROOM_DATA];typeof e=="string"?cn.encode.string(n,e):cn.encode.number(n,e);let r;if(t!==void 0){const s=lc.encode(t);r=new Uint8Array(n.length+s.byteLength),r.set(new Uint8Array(n),0),r.set(new Uint8Array(s),n.length)}else r=new Uint8Array(n);this.connection.send(r.buffer)}sendBytes(e,t){const n=[Kt.Protocol.ROOM_DATA_BYTES];typeof e=="string"?cn.encode.string(n,e):cn.encode.number(n,e);let r;r=new Uint8Array(n.length+(t.byteLength||t.length)),r.set(new Uint8Array(n),0),r.set(new Uint8Array(t),n.length),this.connection.send(r.buffer)}get state(){return this.serializer.getState()}removeAllListeners(){this.onJoin.clear(),this.onStateChange.clear(),this.onError.clear(),this.onLeave.clear(),this.onMessageHandlers.events={}}onMessageCallback(e){const t=Array.from(new Uint8Array(e.data)),n=t[0];if(n===Kt.Protocol.JOIN_ROOM){let r=1;const s=(0,Kt.utf8Read)(t,r);if(r+=(0,Kt.utf8Length)(s),this.serializerId=(0,Kt.utf8Read)(t,r),r+=(0,Kt.utf8Length)(this.serializerId),!this.serializer){const o=(0,hc.getSerializer)(this.serializerId);this.serializer=new o}t.length>r&&this.serializer.handshake&&this.serializer.handshake(t,{offset:r}),this.reconnectionToken=`${this.roomId}:${s}`,this.hasJoined=!0,this.onJoin.invoke(),this.connection.send([Kt.Protocol.JOIN_ROOM])}else if(n===Kt.Protocol.ERROR){const r={offset:1},s=cn.decode.number(t,r),o=cn.decode.string(t,r);this.onError.invoke(s,o)}else if(n===Kt.Protocol.LEAVE_ROOM)this.leave();else if(n===Kt.Protocol.ROOM_DATA_SCHEMA){const r={offset:1},o=this.serializer.getState().constructor._context.get(cn.decode.number(t,r)),a=new o;a.decode(t,r),this.dispatchMessage(o,a)}else if(n===Kt.Protocol.ROOM_STATE)t.shift(),this.setState(t);else if(n===Kt.Protocol.ROOM_STATE_PATCH)t.shift(),this.patch(t);else if(n===Kt.Protocol.ROOM_DATA){const r={offset:1},s=cn.decode.stringCheck(t,r)?cn.decode.string(t,r):cn.decode.number(t,r),o=t.length>r.offset?lc.decode(e.data,r.offset):void 0;this.dispatchMessage(s,o)}else if(n===Kt.Protocol.ROOM_DATA_BYTES){const r={offset:1},s=cn.decode.stringCheck(t,r)?cn.decode.string(t,r):cn.decode.number(t,r);this.dispatchMessage(s,new Uint8Array(t.slice(r.offset)))}}setState(e){this.serializer.setState(e),this.onStateChange.invoke(this.serializer.getState())}patch(e){this.serializer.patch(e),this.onStateChange.invoke(this.serializer.getState())}dispatchMessage(e,t){var n;const r=this.getMessageHandlerKey(e);this.onMessageHandlers.events[r]?this.onMessageHandlers.emit(r,t):this.onMessageHandlers.events["*"]?this.onMessageHandlers.emit("*",e,t):(n=console.warn)===null||n===void 0||n.call(console,`colyseus.js: onMessage() not registered for type '${e}'.`)}destroy(){this.serializer&&this.serializer.teardown()}getMessageHandlerKey(e){switch(typeof e){case"function":return`$${e._typeid}`;case"string":return e;case"number":return`i${e}`;default:throw new Error("invalid message type.")}}}Ur.Room=qa;var Fs={};function fc(i,e){e.headers=i.headers||{},e.statusMessage=i.statusText,e.statusCode=i.status,e.data=i.response}function En(i,e,t){return new Promise(function(n,r){t=t||{};var s=new XMLHttpRequest,o,a,l,c=t.body,u=t.headers||{};t.timeout&&(s.timeout=t.timeout),s.ontimeout=s.onerror=function(d){d.timeout=d.type=="timeout",r(d)},s.open(i,e.href||e),s.onload=function(){for(l=s.getAllResponseHeaders().trim().split(/[\r\n]+/),fc(s,s);a=l.shift();)a=a.split(": "),s.headers[a.shift().toLowerCase()]=a.join(": ");if(a=s.headers["content-type"],a&&~a.indexOf("application/json"))try{s.data=JSON.parse(s.data,t.reviver)}catch(d){return fc(s,d),r(d)}(s.status>=400?r:n)(s)},typeof FormData<"u"&&c instanceof FormData||c&&typeof c=="object"&&(u["content-type"]="application/json",c=JSON.stringify(c)),s.withCredentials=!!t.withCredentials;for(o in u)s.setRequestHeader(o,u[o]);s.send(c)})}var I0=En.bind(En,"GET"),D0=En.bind(En,"POST"),L0=En.bind(En,"PATCH"),U0=En.bind(En,"DELETE"),O0=En.bind(En,"PUT");const N0=Object.freeze(Object.defineProperty({__proto__:null,del:U0,get:I0,patch:L0,post:D0,put:O0,send:En},Symbol.toStringTag,{value:"Module"})),F0=l0(N0);var B0=Lt&&Lt.__createBinding||(Object.create?function(i,e,t,n){n===void 0&&(n=t);var r=Object.getOwnPropertyDescriptor(e,t);(!r||("get"in r?!e.__esModule:r.writable||r.configurable))&&(r={enumerable:!0,get:function(){return e[t]}}),Object.defineProperty(i,n,r)}:function(i,e,t,n){n===void 0&&(n=t),i[n]=e[t]}),k0=Lt&&Lt.__setModuleDefault||(Object.create?function(i,e){Object.defineProperty(i,"default",{enumerable:!0,value:e})}:function(i,e){i.default=e}),z0=Lt&&Lt.__importStar||function(i){if(i&&i.__esModule)return i;var e={};if(i!=null)for(var t in i)t!=="default"&&Object.prototype.hasOwnProperty.call(i,t)&&B0(e,i,t);return k0(e,i),e};Object.defineProperty(Fs,"__esModule",{value:!0});Fs.HTTP=void 0;const H0=Us,G0=z0(F0);class V0{constructor(e,t={}){this.client=e,this.headers=t}get(e,t={}){return this.request("get",e,t)}post(e,t={}){return this.request("post",e,t)}del(e,t={}){return this.request("del",e,t)}put(e,t={}){return this.request("put",e,t)}request(e,t,n={}){return G0[e](this.client.getHttpEndpoint(t),this.getOptions(n)).catch(r=>{var s;const o=r.statusCode,a=((s=r.data)===null||s===void 0?void 0:s.error)||r.statusMessage||r.message;throw!o&&!a?r:new H0.ServerError(o,a)})}getOptions(e){return e.headers=Object.assign({},this.headers,e.headers),this.authToken&&(e.headers.Authorization=`Bearer ${this.authToken}`),typeof cc<"u"&&cc.sys&&cc.sys.isNative||(e.withCredentials=!0),e}}Fs.HTTP=V0;var Nr={},ai={};Object.defineProperty(ai,"__esModule",{value:!0});ai.getItem=ai.removeItem=ai.setItem=void 0;let Sr;function ja(){if(!Sr)try{Sr=typeof cc<"u"&&cc.sys&&cc.sys.localStorage?cc.sys.localStorage:window.localStorage}catch{}return Sr||(Sr={cache:{},setItem:function(i,e){this.cache[i]=e},getItem:function(i){this.cache[i]},removeItem:function(i){delete this.cache[i]}}),Sr}function W0(i,e){ja().setItem(i,e)}ai.setItem=W0;function X0(i){ja().removeItem(i)}ai.removeItem=X0;function $0(i,e){const t=ja().getItem(i);typeof Promise>"u"||!(t instanceof Promise)?e(t):t.then(n=>e(n))}ai.getItem=$0;var vi=Lt&&Lt.__awaiter||function(i,e,t,n){function r(s){return s instanceof t?s:new t(function(o){o(s)})}return new(t||(t=Promise))(function(s,o){function a(u){try{c(n.next(u))}catch(d){o(d)}}function l(u){try{c(n.throw(u))}catch(d){o(d)}}function c(u){u.done?s(u.value):r(u.value).then(a,l)}c((n=n.apply(i,e||[])).next())})},$i=Lt&&Lt.__classPrivateFieldGet||function(i,e,t,n){if(t==="a"&&!n)throw new TypeError("Private accessor was defined without a getter");if(typeof e=="function"?i!==e||!n:!e.has(i))throw new TypeError("Cannot read private member from an object whose class did not declare it");return t==="m"?n:t==="a"?n.call(i):n?n.value:e.get(i)},yr=Lt&&Lt.__classPrivateFieldSet||function(i,e,t,n,r){if(n==="m")throw new TypeError("Private method is not writable");if(n==="a"&&!r)throw new TypeError("Private accessor was defined without a setter");if(typeof e=="function"?i!==e||!r:!e.has(i))throw new TypeError("Cannot write private member to an object whose class did not declare it");return n==="a"?r.call(i,t):r?r.value=t:e.set(i,t),t},_s,wa,ri,vs;Object.defineProperty(Nr,"__esModule",{value:!0});Nr.Auth=void 0;const Co=ai,Y0=Or;class q0{constructor(e){this.http=e,this.settings={path:"/auth",key:"colyseus-auth-token"},_s.set(this,!1),wa.set(this,void 0),ri.set(this,void 0),vs.set(this,(0,Y0.createNanoEvents)()),(0,Co.getItem)(this.settings.key,t=>this.token=t)}set token(e){this.http.authToken=e}get token(){return this.http.authToken}onChange(e){const t=$i(this,vs,"f").on("change",e);return $i(this,_s,"f")||yr(this,wa,new Promise((n,r)=>{this.getUserData().then(s=>{this.emitChange(Object.assign(Object.assign({},s),{token:this.token}))}).catch(s=>{this.emitChange({user:null,token:void 0})}).finally(()=>{n()})}),"f"),yr(this,_s,!0,"f"),t}getUserData(){return vi(this,void 0,void 0,function*(){if(this.token)return(yield this.http.get(`${this.settings.path}/userdata`)).data;throw new Error("missing auth.token")})}registerWithEmailAndPassword(e,t,n){return vi(this,void 0,void 0,function*(){const r=(yield this.http.post(`${this.settings.path}/register`,{body:{email:e,password:t,options:n}})).data;return this.emitChange(r),r})}signInWithEmailAndPassword(e,t){return vi(this,void 0,void 0,function*(){const n=(yield this.http.post(`${this.settings.path}/login`,{body:{email:e,password:t}})).data;return this.emitChange(n),n})}signInAnonymously(e){return vi(this,void 0,void 0,function*(){const t=(yield this.http.post(`${this.settings.path}/anonymous`,{body:{options:e}})).data;return this.emitChange(t),t})}sendPasswordResetEmail(e){return vi(this,void 0,void 0,function*(){return(yield this.http.post(`${this.settings.path}/forgot-password`,{body:{email:e}})).data})}signInWithProvider(e,t={}){return vi(this,void 0,void 0,function*(){return new Promise((n,r)=>{const s=t.width||480,o=t.height||768,a=this.token?`?token=${this.token}`:"",l=`Login with ${e[0].toUpperCase()+e.substring(1)}`,c=this.http.client.getHttpEndpoint(`${t.prefix||`${this.settings.path}/provider`}/${e}${a}`),u=screen.width/2-s/2,d=screen.height/2-o/2;yr(this,ri,window.open(c,l,"toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width="+s+", height="+o+", top="+d+", left="+u),"f");const f=x=>{x.data.user===void 0&&x.data.token===void 0||(clearInterval(v),$i(this,ri,"f").close(),yr(this,ri,void 0,"f"),window.removeEventListener("message",f),x.data.error!==void 0?r(x.data.error):(n(x.data),this.emitChange(x.data)))},v=setInterval(()=>{(!$i(this,ri,"f")||$i(this,ri,"f").closed)&&(yr(this,ri,void 0,"f"),r("cancelled"),window.removeEventListener("message",f))},200);window.addEventListener("message",f)})})}signOut(){return vi(this,void 0,void 0,function*(){this.emitChange({user:null,token:null})})}emitChange(e){e.token!==void 0&&(this.token=e.token,e.token===null?(0,Co.removeItem)(this.settings.key):(0,Co.setItem)(this.settings.key,e.token)),$i(this,vs,"f").emit("change",e)}}Nr.Auth=q0;_s=new WeakMap,wa=new WeakMap,ri=new WeakMap,vs=new WeakMap;var Bs={};Object.defineProperty(Bs,"__esModule",{value:!0});Bs.discordURLBuilder=void 0;function j0(i){var e;const t=((e=window==null?void 0:window.location)===null||e===void 0?void 0:e.hostname)||"localhost",n=i.hostname.split("."),r=!i.hostname.includes("trycloudflare.com")&&!i.hostname.includes("discordsays.com")&&n.length>2?`/${n[0]}`:"";return i.pathname.startsWith("/.proxy")?`${i.protocol}//${t}${r}${i.pathname}${i.search}`:`${i.protocol}//${t}/.proxy/colyseus${r}${i.pathname}${i.search}`}Bs.discordURLBuilder=j0;var An=Lt&&Lt.__awaiter||function(i,e,t,n){function r(s){return s instanceof t?s:new t(function(o){o(s)})}return new(t||(t=Promise))(function(s,o){function a(u){try{c(n.next(u))}catch(d){o(d)}}function l(u){try{c(n.throw(u))}catch(d){o(d)}}function c(u){u.done?s(u.value):r(u.value).then(a,l)}c((n=n.apply(i,e||[])).next())})},Po;Object.defineProperty(er,"__esModule",{value:!0});er.Client=er.MatchMakeError=void 0;const Z0=Us,K0=Ur,J0=Fs,Q0=Nr,e_=Bs;class ks extends Error{constructor(e,t){super(e),this.code=t,Object.setPrototypeOf(this,ks.prototype)}}er.MatchMakeError=ks;const dc=typeof window<"u"&&typeof((Po=window==null?void 0:window.location)===null||Po===void 0?void 0:Po.hostname)<"u"?`${window.location.protocol.replace("http","ws")}//${window.location.hostname}${window.location.port&&`:${window.location.port}`}`:"ws://127.0.0.1:2567";class t_{constructor(e=dc,t){var n,r;if(typeof e=="string"){const s=e.startsWith("/")?new URL(e,dc):new URL(e),o=s.protocol==="https:"||s.protocol==="wss:",a=Number(s.port||(o?443:80));this.settings={hostname:s.hostname,pathname:s.pathname,port:a,secure:o}}else e.port===void 0&&(e.port=e.secure?443:80),e.pathname===void 0&&(e.pathname=""),this.settings=e;this.settings.pathname.endsWith("/")&&(this.settings.pathname=this.settings.pathname.slice(0,-1)),this.http=new J0.HTTP(this,(t==null?void 0:t.headers)||{}),this.auth=new Q0.Auth(this.http),this.urlBuilder=t==null?void 0:t.urlBuilder,!this.urlBuilder&&typeof window<"u"&&(!((r=(n=window==null?void 0:window.location)===null||n===void 0?void 0:n.hostname)===null||r===void 0)&&r.includes("discordsays.com"))&&(this.urlBuilder=e_.discordURLBuilder,console.log("Colyseus SDK: Discord Embedded SDK detected. Using custom URL builder."))}joinOrCreate(e,t={},n){return An(this,void 0,void 0,function*(){return yield this.createMatchMakeRequest("joinOrCreate",e,t,n)})}create(e,t={},n){return An(this,void 0,void 0,function*(){return yield this.createMatchMakeRequest("create",e,t,n)})}join(e,t={},n){return An(this,void 0,void 0,function*(){return yield this.createMatchMakeRequest("join",e,t,n)})}joinById(e,t={},n){return An(this,void 0,void 0,function*(){return yield this.createMatchMakeRequest("joinById",e,t,n)})}reconnect(e,t){return An(this,void 0,void 0,function*(){if(typeof e=="string"&&typeof t=="string")throw new Error("DEPRECATED: .reconnect() now only accepts 'reconnectionToken' as argument.\nYou can get this token from previously connected `room.reconnectionToken`");const[n,r]=e.split(":");if(!n||!r)throw new Error(`Invalid reconnection token format.
The format should be roomId:reconnectionToken`);return yield this.createMatchMakeRequest("reconnect",n,{reconnectionToken:r},t)})}getAvailableRooms(e=""){return An(this,void 0,void 0,function*(){return(yield this.http.get(`matchmake/${e}`,{headers:{Accept:"application/json"}})).data})}consumeSeatReservation(e,t,n){return An(this,void 0,void 0,function*(){const r=this.createRoom(e.room.name,t);r.roomId=e.room.roomId,r.sessionId=e.sessionId;const s={sessionId:r.sessionId};e.reconnectionToken&&(s.reconnectionToken=e.reconnectionToken);const o=n||r;return r.connect(this.buildEndpoint(e.room,s),e.devMode&&(()=>An(this,void 0,void 0,function*(){console.info(`[Colyseus devMode]: ${String.fromCodePoint(128260)} Re-establishing connection with room id '${r.roomId}'...`);let a=0,l=8;const c=()=>An(this,void 0,void 0,function*(){a++;try{yield this.consumeSeatReservation(e,t,o),console.info(`[Colyseus devMode]: ${String.fromCodePoint(9989)} Successfully re-established connection with room '${r.roomId}'`)}catch{a<l?(console.info(`[Colyseus devMode]: ${String.fromCodePoint(128260)} retrying... (${a} out of ${l})`),setTimeout(c,2e3)):console.info(`[Colyseus devMode]: ${String.fromCodePoint(10060)} Failed to reconnect. Is your server running? Please check server logs.`)}});setTimeout(c,2e3)})),o,this.http.headers),new Promise((a,l)=>{const c=(u,d)=>l(new Z0.ServerError(u,d));o.onError.once(c),o.onJoin.once(()=>{o.onError.remove(c),a(o)})})})}createMatchMakeRequest(e,t,n={},r,s){return An(this,void 0,void 0,function*(){const o=(yield this.http.post(`matchmake/${e}/${t}`,{headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify(n)})).data;if(o.error)throw new ks(o.error,o.code);return e==="reconnect"&&(o.reconnectionToken=n.reconnectionToken),yield this.consumeSeatReservation(o,r,s)})}createRoom(e,t){return new K0.Room(e,t)}buildEndpoint(e,t={}){const n=[];for(const o in t)t.hasOwnProperty(o)&&n.push(`${o}=${t[o]}`);let r=this.settings.secure?"wss://":"ws://";e.publicAddress?r+=`${e.publicAddress}`:r+=`${this.settings.hostname}${this.getEndpointPort()}${this.settings.pathname}`;const s=`${r}/${e.processId}/${e.roomId}?${n.join("&")}`;return this.urlBuilder?this.urlBuilder(new URL(s)):s}getHttpEndpoint(e=""){const t=e.startsWith("/")?e:`/${e}`,n=`${this.settings.secure?"https":"http"}://${this.settings.hostname}${this.getEndpointPort()}${this.settings.pathname}${t}`;return this.urlBuilder?this.urlBuilder(new URL(n)):n}getEndpointPort(){return this.settings.port!==80&&this.settings.port!==443?`:${this.settings.port}`:""}}er.Client=t_;var zs={};Object.defineProperty(zs,"__esModule",{value:!0});zs.SchemaSerializer=void 0;const pc=th;class n_{setState(e){return this.state.decode(e)}getState(){return this.state}patch(e){return this.state.decode(e)}teardown(){var e,t;(t=(e=this.state)===null||e===void 0?void 0:e.$changes)===null||t===void 0||t.root.clearRefs()}handshake(e,t){this.state?new pc.Reflection().decode(e,t):this.state=pc.Reflection.decode(e,t)}}zs.SchemaSerializer=n_;var Hs={};Object.defineProperty(Hs,"__esModule",{value:!0});Hs.NoneSerializer=void 0;class i_{setState(e){}getState(){return null}patch(e){}teardown(){}handshake(e){}}Hs.NoneSerializer=i_;(function(i){Object.defineProperty(i,"__esModule",{value:!0}),i.SchemaSerializer=i.registerSerializer=i.Auth=i.Room=i.ErrorCode=i.Protocol=i.MatchMakeError=i.Client=void 0;var e=er;Object.defineProperty(i,"Client",{enumerable:!0,get:function(){return e.Client}}),Object.defineProperty(i,"MatchMakeError",{enumerable:!0,get:function(){return e.MatchMakeError}});var t=Ya;Object.defineProperty(i,"Protocol",{enumerable:!0,get:function(){return t.Protocol}}),Object.defineProperty(i,"ErrorCode",{enumerable:!0,get:function(){return t.ErrorCode}});var n=Ur;Object.defineProperty(i,"Room",{enumerable:!0,get:function(){return n.Room}});var r=Nr;Object.defineProperty(i,"Auth",{enumerable:!0,get:function(){return r.Auth}});const s=zs;Object.defineProperty(i,"SchemaSerializer",{enumerable:!0,get:function(){return s.SchemaSerializer}});const o=Hs,a=Ri;Object.defineProperty(i,"registerSerializer",{enumerable:!0,get:function(){return a.registerSerializer}}),(0,a.registerSerializer)("schema",s.SchemaSerializer),(0,a.registerSerializer)("none",o.NoneSerializer)})(Jc);class r_{constructor(){this.threeManager=new yg,this.inputManager=new Dg,this.inputManager.setPointerTarget(this.threeManager.renderer.domElement),this.worldGenerator=new ut(this.threeManager,{chunkSize:ls}),this.currentMapRows=gs,this.currentBuildings=gs.buildings||[],this.worldGenerator.generateFromChunkedArray(gs,Jl,ls,{buildings:this.currentBuildings}),this.pathfinder=new Lg(this.worldGenerator),this.userId=this.generateUserId();const e=this.worldGenerator.findHighestWalkable()||this.worldGenerator.findNearestWalkable(0,0,64)||{x:-8,y:0};this.player=new Cs(this.threeManager,this.inputManager,this.worldGenerator,e.x,e.y,{isLocal:!0,userId:this.userId}),this.worldGenerator.updateVisibleTilesAround(this.player.gridX,this.player.gridY),this.remotePlayers=new Map,this.wildlifeSystem=new nc(this.threeManager,this.worldGenerator,rc),this.hoveredTile=null,this.activePath=[],this.collisionDebugEnabled=!1,this.lastFrameTime=performance.now(),this.connectToServer(),this.inputManager.onLeftClick(t=>{if(t===0&&this.hoveredTile&&this.player){const n=this.pathfinder.findPath(this.player.gridX,this.player.gridY,this.hoveredTile.gridX,this.hoveredTile.gridY);n&&n.length>0&&this.player.setPath(n)}}),this.animate=this.animate.bind(this),this.statusPill=document.getElementById("status-pill"),this.positionReadout=document.getElementById("position-readout"),this.zoneReadout=document.getElementById("zone-readout"),this.chunkReadout=document.getElementById("chunk-readout"),this.wildlifeReadout=document.getElementById("wildlife-readout"),this.playerCountReadout=document.getElementById("player-count-readout"),this.adminPanel=new a0({onApplyMap:t=>this.applyWorldMap(t,"custom"),onRandomizeMap:t=>this.applyWorldMap(t,"random"),onStartCombat:()=>this.startCombatScene(),onToggleCollisionDebug:t=>this.setCollisionDebugVisible(t)}),this.updateHud("Connecting"),requestAnimationFrame(this.animate)}async connectToServer(){try{console.log("[Game] Connecting to server...");const e=window.location.hostname;this.client=new Jc.Client(`ws://${e}:2567`),this.room=await this.client.joinOrCreate("world",{userId:this.userId,x:0,y:0,z:0}),console.log("[Game] Connected to room:",this.room.id),this.updateHud("Online"),this.setupNetworking(),this.syncCurrentMapToServer("client-default"),this.combatScene=new ac({client:this.client,userId:this.userId,onExit:()=>this.updateHud("Online")})}catch(e){console.error("[Game] Failed to connect to server:",e),this.updateHud("Solo")}}setupNetworking(){this.room&&(this.room.state.players.onAdd=(e,t)=>{t===this.room.sessionId?this.player.applyAuthoritativeCenter(e.centerX,e.centerY,e.centerZ,e.tileX,e.tileY,e.tileZ):this.addRemotePlayer(e,t)},this.room.state.players.onRemove=(e,t)=>{this.removeRemotePlayer(t)},this.room.onMessage("world:chunk:init",e=>{this.serverChunkInfo=e,this.updateHud("Online")}),this.room.onMessage("world:chunk:entered",e=>{this.serverChunkInfo=e,this.updateHud("Online")}),this.room.onMessage("world:map:updated",e=>{this.adminPanel.setMessage(`World ${e.source} map active: ${e.width} x ${e.height}.`,"success")}),setInterval(()=>{var e,t;if((t=(e=this.room)==null?void 0:e.connection)!=null&&t.isOpen&&this.player){const n=this.player.getCenterPayload();try{this.room.send("player:move",{centerX:n.centerX,centerY:n.centerY,centerZ:n.centerZ})}catch(r){console.warn("[Game] Skipped movement sync while connection is closing.",r)}}},100))}addRemotePlayer(e,t){if(this.remotePlayers.has(t))return;const n=new Cs(this.threeManager,null,this.worldGenerator,e.centerX,e.centerY,{isLocal:!1,userId:e.userId});n.setRemoteTarget(e.centerX,e.centerY,e.centerZ),n.setCollisionDebugVisible(this.collisionDebugEnabled),this.remotePlayers.set(t,n)}removeRemotePlayer(e){const t=this.remotePlayers.get(e);t&&(t.destroy(),this.remotePlayers.delete(e))}syncRemotePlayersFromState(){var e,t;(t=(e=this.room)==null?void 0:e.state)!=null&&t.players&&this.room.state.players.forEach((n,r)=>{if(r===this.room.sessionId){(Math.abs(n.centerX-this.player.gridX)>.8||Math.abs(n.centerY-this.player.gridY)>.8)&&this.player.applyAuthoritativeCenter(n.centerX,n.centerY,n.centerZ,n.tileX,n.tileY,n.tileZ);return}this.remotePlayers.has(r)||this.addRemotePlayer(n,r),this.remotePlayers.get(r).setRemoteTarget(n.centerX,n.centerY,n.centerZ)})}applyWorldMap(e,t){this.hoveredTile&&(this.hoveredTile.clearHighlight(),this.hoveredTile=null),this.activePath=[],this.threeManager.renderPathLine([],this.worldGenerator),this.wildlifeSystem.destroy(),this.currentMapRows=e,this.currentBuildings=t==="custom"?[]:e.buildings||[],this.worldGenerator.generateFromChunkedArray(e,Jl,ls,{buildings:this.currentBuildings}),this.repositionPlayerForCurrentWorld(),this.wildlifeSystem=new nc(this.threeManager,this.worldGenerator,rc),this.syncCurrentMapToServer(t),this.updateHud()}repositionPlayerForCurrentWorld(){const t=this.worldGenerator.findHighestWalkable()||this.worldGenerator.findNearestWalkable(this.player.gridX,this.player.gridY,64)||this.findFirstWalkableTile();t&&(this.player.gridX=t.x,this.player.gridY=t.y,this.player.gridZ=this.worldGenerator.getElevation(t.x,t.y),this.player.targetX=this.player.gridX,this.player.targetY=this.player.gridY,this.player.targetZ=this.player.gridZ,this.player.visualX=this.player.gridX,this.player.visualY=this.player.gridY,this.player.visualZ=this.player.gridZ,this.player.currentPath=[],this.player.setCollisionDebugVisible(this.collisionDebugEnabled),this.player.syncModel(),this.worldGenerator.updateVisibleTilesAround(this.player.gridX,this.player.gridY))}syncCurrentMapToServer(e){var t;!this.room||!((t=this.currentMapRows)!=null&&t.length)||this.room.send("world:admin:map_updated",{source:e,width:this.currentMapRows[0].length,height:this.currentMapRows.length,chunkSize:ls,rows:this.currentMapRows})}setCollisionDebugVisible(e){var t;this.collisionDebugEnabled=e,(t=this.player)==null||t.setCollisionDebugVisible(e);for(const n of this.remotePlayers.values())n.setCollisionDebugVisible(e)}findFirstWalkableTile(){for(const e of this.worldGenerator.surfaceMap.values())if(this.worldGenerator.isWalkable(e.x,e.y))return{x:e.x,y:e.y};return null}async startCombatScene(){this.combatScene||(this.combatScene=new ac({client:this.client,userId:this.userId,onExit:()=>this.updateHud(this.room?"Online":"Solo")})),await this.combatScene.enter("meadow-hare-demo")}generateUserId(){const e=localStorage.getItem("userId");if(e)return e;const t="user_"+Math.random().toString(36).substr(2,9);return localStorage.setItem("userId",t),t}animate(){requestAnimationFrame(this.animate);const e=performance.now(),t=Math.min((e-this.lastFrameTime)/1e3,.1);this.lastFrameTime=e;const n=this.inputManager.getWheelDelta();n!==0&&this.threeManager.handleZoom(n);const r=this.threeManager.getIntersectedTile(this.inputManager.mouseNDC);if(r!==this.hoveredTile)if(this.hoveredTile&&this.hoveredTile.clearHighlight(),this.hoveredTile=r,this.hoveredTile){const s=this.worldGenerator.isWalkable(this.hoveredTile.gridX,this.hoveredTile.gridY);this.hoveredTile.highlight(s?3116878:9381424),this.player&&s?(this.activePath=this.pathfinder.findPath(this.player.gridX,this.player.gridY,this.hoveredTile.gridX,this.hoveredTile.gridY),this.threeManager.renderPathLine(this.activePath,this.worldGenerator)):(this.activePath=[],this.threeManager.renderPathLine([],this.worldGenerator))}else this.activePath=null,this.threeManager.renderPathLine([],this.worldGenerator);if(this.player){this.player.update(t),this.syncRemotePlayersFromState();for(const o of this.remotePlayers.values())o.update(t);this.wildlifeSystem.update(t);const s=this.player.group.position;this.threeManager.updateCamera(s),this.worldGenerator.updateBuildingVisibility(this.player.gridX,this.player.gridY),this.worldGenerator.updateVisibleTilesAround(this.player.gridX,this.player.gridY),this.worldGenerator.updatePlayerSightCutaway(this.player.gridX,this.player.gridY,this.threeManager.camera),this.updateHud()}this.threeManager.render()}updateHud(e){var a,l,c,u;if(e&&this.statusPill&&(this.statusPill.textContent=e,this.statusPill.dataset.status=e.toLowerCase()),!this.player)return;const t=Math.round(this.player.gridX),n=Math.round(this.player.gridY),r=this.worldGenerator.getSurfaceAt(t,n),s=this.worldGenerator.getChunkKeyForTile(t,n),o=this.worldGenerator.getLoadedChunkSummary().length;this.positionReadout&&(this.positionReadout.textContent=`${t}, ${n}, ${this.player.gridZ}`),this.zoneReadout&&(this.zoneReadout.textContent=((a=r==null?void 0:r.definition)==null?void 0:a.label)||"Unknown"),this.chunkReadout&&(this.chunkReadout.textContent=`${s} / ${o}`),this.wildlifeReadout&&(this.wildlifeReadout.textContent=`${this.wildlifeSystem.wildlife.length}`),this.playerCountReadout&&(this.playerCountReadout.textContent=`${((u=(c=(l=this.room)==null?void 0:l.state)==null?void 0:c.players)==null?void 0:u.size)||1}`)}}window.addEventListener("DOMContentLoaded",()=>{new r_,console.log("[Main] Game initialized with Three.js")});
