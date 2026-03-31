export class InputManager {
    constructor() {
        this.keys = {};
        this.wheelDelta = 0;
        this.callbacks = {};

        window.addEventListener('keydown', (e) => {
            if (!this.keys[e.code]) {
                // Key just pressed, trigger callbacks if any
                if (this.callbacks[e.code]) {
                    this.callbacks[e.code].forEach(cb => cb());
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
    }

    isKeyDown(code) {
        return !!this.keys[code];
    }

    getWheelDelta() {
        const delta = this.wheelDelta;
        this.wheelDelta = 0; // reset after reading
        return delta;
    }

    onKeyDown(code, callback) {
        if (!this.callbacks[code]) {
            this.callbacks[code] = [];
        }
        this.callbacks[code].push(callback);
    }
}
