export class InputManager {
    constructor() {
        this.keys = {};
        this.wheelDelta = 0;
        this.callbacks = {};
        this.pointerTarget = window;

        window.addEventListener('keydown', (e) => {
            if (!this.keys[e.code]) {
                // Key just pressed, trigger callbacks if any
                if (this.callbacks[e.code]) {
                    this.callbacks[e.code].forEach(cb => cb(e));
                }
            }
            this.keys[e.code] = true;
        });

        window.addEventListener('keyup', (e) => {
            this.keys[e.code] = false;
        });

        window.addEventListener('wheel', (e) => {
            this.wheelDelta = e.deltaY;
        });

        this.onClickCallbacks = [];

        this.mouseNDC = { x: 0, y: 0 };
        this.handleMouseDown = (e) => {
            this.updateMousePosition(e);
            this.onClickCallbacks.forEach(cb => cb(e.button, e));
        };
        this.handleMouseMove = (e) => this.updateMousePosition(e);
        this.setPointerTarget(window);
    }

    setPointerTarget(element) {
        if (this.pointerTarget) {
            this.pointerTarget.removeEventListener('mousedown', this.handleMouseDown);
            this.pointerTarget.removeEventListener('mousemove', this.handleMouseMove);
        }
        this.pointerTarget = element || window;
        this.pointerTarget.addEventListener('mousedown', this.handleMouseDown);
        this.pointerTarget.addEventListener('mousemove', this.handleMouseMove);
    }

    updateMousePosition(e) {
        const target = this.pointerTarget === window ? document.documentElement : this.pointerTarget;
        const rect = target.getBoundingClientRect();
        const width = rect.width || window.innerWidth;
        const height = rect.height || window.innerHeight;
        this.mouseNDC.x = ((e.clientX - rect.left) / width) * 2 - 1;
        this.mouseNDC.y = -((e.clientY - rect.top) / height) * 2 + 1;
    }

    isKeyDown(code) {
        return !!this.keys[code];
    }

    getWheelDelta() {
        const delta = this.wheelDelta;
        this.wheelDelta = 0; // reset after reading
        return delta;
    }

    onLeftClick(callback) {
        this.onClickCallbacks.push(callback);
    }

    onKeyDown(code, callback) {
        if (!this.callbacks[code]) {
            this.callbacks[code] = [];
        }
        this.callbacks[code].push(callback);
    }
}
