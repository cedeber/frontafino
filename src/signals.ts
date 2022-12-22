// @see https://github.com/WebReflection/signal

type EffectFn = () => unknown;

// a stack of running effects with a root no-op function
// to simplify the rest of the logic without needing to
// worry about no-op executions
const effects: EffectFn[] = [];

// a weakly related list of effects that cannot be freed
// until signals that registered these effects are updated
const disposed = new WeakSet();

class Signal<T = any> {
	private __value: T;
	private __effects: Set<EffectFn> = new Set();

	constructor(value: T) {
		this.__value = value;
	}

	get value() {
		// add (once) whatever effect is currently running
		// no effects means add (once) the root no-op
		const lastEffect = effects.at(-1);
		if (lastEffect) this.__effects.add(lastEffect);
		return this.__value;
	}

	set value(value: T) {
		// trigger effects only when a new value to wrap is passed along
		// which is usually the most desirable use-case to deal with
		if (this.__value !== value) {
			this.__value = value;

			// for all subscribed effects, including the no-op
			for (const effect of this.__effects) {
				// verify that the effect was not flagged for disposal
				if (disposed.has(effect)) {
					// if that's the case, delete it and never bother again with it
					this.__effects.delete(effect);
				} // if not disposed, invoke the effect which will reach again this signal
				// it won't be added as already known once the value is reached
				// and it will simply use the latest value the signal provides
				else effect();
			}
		}
	}

	// used to *not* subscribe effects (avoid seppuku)
	peek() {
		return this.__value;
	}

	// there could be more but these are handy for
	// automatic string conversion (DOM attributes, text, etc)
	// or automatic numeric operations: symbol(1) + symbol(2)
	then() {
		return this.value;
	}

	toJSON() {
		return this.value;
	}

	toString() {
		return this.value;
	}

	valueOf() {
		return this.value;
	}
}

export const signal = <T>(value: T) => new Signal<T>(value);

export const effect = (fn: EffectFn) => {
	// add the callback to the stack
	effects.push(fn);

	try {
		// execute it and return a way to dispose it
		fn();
		return () => {
			disposed.add(fn);
		};
	} finally {
		// no matter what, free the stack once the fn has been executed
		// propagating possible errors through the program but not messing up
		// the whole stack of callbacks
		effects.pop();
	}
};

export const computed = (fn: EffectFn) => {
	// create a void wrapper
	const signal = new Signal<any>(undefined);
	// create an effect that updates the signal
	// with the value returned by the callback
	const dispose = effect(() => {
		signal.value = fn();
	});
	// return the signal augmented with the `dispose` helper
	return Object.assign(signal, { dispose });
};
