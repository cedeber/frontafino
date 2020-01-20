export default class EventEmitter {
    constructor() {
        /** @type {Map<string, Function[]>} */
        this.listeners = new Map();

        /** @type {Set<string>} */
        this.onceLabels = new Set(); // all listeners names that will trigger only once
    }

    /**
     * Delete events which run only once
     * @private
     * @param {string} label Event name
     * @returns {boolean} true if removed
     */
    __deleteOnce(label) {
        if (this.onceLabels.has(label)) {
            this.listeners.delete(label);
            this.onceLabels.delete(label);

            return true;
        }

        return false;
    }

    /**
     * Set up an event callback
     * @param {string} label Event name
     * @param {Function} callback An event callback
     */
    on(label, callback) {
        let labelListeners = this.listeners.get(label);

        if (labelListeners === undefined) {
            this.listeners.set(label, []);
            labelListeners = this.listeners.get(label);
        }

        if (labelListeners !== undefined) {
            labelListeners.push(callback);
        }
    }

    /**
     * Set up an event callback which will only run once
     * @param {string} label Event name
     * @param {Function} callback An event callback
     */
    once(label, callback) {
        this.on(label, callback);
        this.onceLabels.add(label);
    }

    /**
     * Remove an event callback
     * @param {string} label Event name
     * @param {Function} callback An event callback
     */
    remove(label, callback) {
        const listeners = this.listeners.get(label);

        if (this.__deleteOnce(label)) {
            return;
        }

        if (listeners) {
            const index = listeners.indexOf(callback);

            if (index === -1) {
                return;
            }

            listeners.splice(index, 1);

            if (listeners.length > 0) {
                this.listeners.set(label, listeners);
            } else {
                this.listeners.delete(label);
            }
        }
    }

    /**
     * Emit an event
     * @param {string} label Event name
     * @param {...*} args Callback parameters
     */
    emit(label, ...args) {
        const listeners = this.listeners.get(label);

        if (listeners) {
            listeners.forEach(listener => listener(...args));
            this.__deleteOnce(label);
        }
    }
}
