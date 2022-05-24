type UnknownFn = (...args: unknown[]) => unknown;

class EventEmitter {
	listeners: Map<string, UnknownFn[]> = new Map();
	onceLabels: Set<string> = new Set(); // all listeners names that will trigger only once

	/**
	 * Delete events which run only once
	 * @private
	 * @param label Event name
	 * @returns true if removed
	 */
	__deleteOnce(label: string): boolean {
		if (this.onceLabels.has(label)) {
			this.listeners.delete(label);
			this.onceLabels.delete(label);

			return true;
		}

		return false;
	}

	/**
	 * Set up an event callback
	 * @param label Event name
	 * @param callback An event callback
	 */
	on(label: string, callback: UnknownFn): void {
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
	 * @param label Event name
	 * @param callback An event callback
	 */
	once(label: string, callback: UnknownFn): void {
		this.on(label, callback);
		this.onceLabels.add(label);
	}

	/**
	 * Remove an event callback
	 * @param label Event name
	 * @param callback An event callback
	 */
	remove(label: string, callback: UnknownFn): void {
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
	 * @param label Event name
	 * @param args Callback parameters
	 */
	emit(label: string, ...args: unknown[]): void {
		const listeners = this.listeners.get(label);

		if (listeners) {
			listeners.forEach((listener) => listener(...args));
			this.__deleteOnce(label);
		}
	}
}

export { EventEmitter };
