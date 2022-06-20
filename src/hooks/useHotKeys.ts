import { concat, without } from "ramda";
import { ForwardedRef, MutableRefObject, useCallback, useEffect, useMemo } from "react";
import { useForwardedRef } from "./useForwardedRef.js";

const deepDifference = <T = unknown>(arr1: T[], arr2: T[]): T[] =>
	concat(without(arr1, arr2), without(arr2, arr1));

type KeyboardEventHandler = (event: KeyboardEvent) => void;

/**
 * @see https://github.com/reecelucas/react-use-hotkeys
 * @see https://github.com/palantir/blueprint/blob/develop/packages/core/src/hooks/hotkeys/useHotkeys.ts (v4)
 */

// After KEY_SEQUENCE_TIMEOUT we consider the key stroke sequence invalid
const KEY_SEQUENCE_TIMEOUT = 1000;

// Use ESCAPE_HATCH_KEY ot react to all key strokes
const ESCAPE_HATCH_KEY = "*";

// TODO Probably also need support for iPad + keyboard, etc.
//      Is detecting Safari enough in these iPhone/iPad platforms as the browser engine is always Safari-based?
// Supports of Mac
const IS_MAC = navigator.platform.toLowerCase().indexOf("mac") >= 0;

/**
 * Define an application wide keyboard shortcut ("Control, Alt, Shift, Meta")
 * Supports Mac by default:
 *   - Use "Control" for the Command/Meta key on Mac and the usual Control key on PC keyboards
 *   - Use "Ctrl" for "ctrl" key on Mac
 * If you explicitely deactivate the Mac support, use the JS key names: "Control" and "Meta"
 *
 * @param keys Separate Keys by a "+" sign or a space. To use the space bar, you can also use " " (Shift+" ")
 * @param callback Usual Keyboard Event Handler
 * @param ref A React DOM reference to attach the event to. If undefined, we attach the event to the window.
 *            Set the ref to null to force it to be local
 * @param continuePropagation Continue propagation of the keyboard event
 * @param convertForMac Mac support to convert "Meta" to "Control" like on PC (the usual way of using Mac keyboards)
 */
const useHotKeys = (
	keys: string,
	callback: KeyboardEventHandler,
	ref?: MutableRefObject<Element> | ForwardedRef<Element>,
	continuePropagation?: boolean,
	convertForMac = true,
) => {
	// Make ref compatible with old and new ref/forwardRef code
	const fRef = useForwardedRef(ref);

	// The same callback as defined + preventDefaut & stopPropagation
	const cb = useCallback(
		(event: KeyboardEvent) => {
			callback(event);

			// Usually we don't want something else to happen next
			event.preventDefault();
			if (continuePropagation !== true) event.stopPropagation();
		},
		[callback],
	);

	// Parse the keys string
	const hotkeysArray = useMemo(() => getHotkeysArray(keys.trim()), [keys]);

	// Get the onKeydown event
	const onKeyDown = useMemo(
		() => getOnKeyDown(hotkeysArray, cb, convertForMac),
		[cb, hotkeysArray],
	);

	useEffect(() => {
		// ref may be null. React needs to render first.
		const element = fRef === undefined ? window : fRef?.current;

		if (element) element.addEventListener("keydown", onKeyDown, { capture: true });

		return () => {
			if (element) element.removeEventListener("keydown", onKeyDown);
		};
	}, [fRef, onKeyDown]);
};

// Utilities
const getOnKeyDown = (
	hotkeysArray: string[],
	callback: KeyboardEventHandler,
	convertForMac: boolean,
): EventListener => {
	let sequenceTimer: number;
	let keySequence: string[] = [];

	// Used to check the key strokes in order and compare it to the keys string defined in the hook
	const handleKeySequence = (event: KeyboardEvent, hotkeys: string[]) => {
		const key = event.key
			.toLowerCase()
			.normalize("NFD")
			.replace(/\p{Diacritic}/gu, "");

		clearTimeout(sequenceTimer);

		// The key strokes sequence becomes invalid after KEY_SEQUENCE_TIMEOUT
		sequenceTimer = window.setTimeout(() => {
			keySequence = []; // reset
		}, KEY_SEQUENCE_TIMEOUT);

		// Add new key stroke to the registered sequence
		keySequence.push(key);

		// Check key strokes in order
		if (isArraysEqualInOrder(keySequence, hotkeys)) {
			keySequence = []; // reset
			clearTimeout(sequenceTimer);
			callback(event);
		}
	};

	// Used when modifier keys (Control, Shift...) are used
	const handleModifierCombo = (event: KeyboardEvent, hotkeys: string[]) => {
		// Clone and Remove the last item, the action key. We will keep the modKeys only (control, shift...)
		const modKeys = [...hotkeys];
		const actionKey = modKeys.pop();

		// Get currently pressed modKeys
		const pressedModKeys = getPressedModifierKeys(event, convertForMac);

		// Compare if modKeys arrays matches, not necessarily in the same order
		// We don't compare the length, as [Control, Control] === [Control]. We don't care about double modKeys.
		const isAllModKeysPressed = deepDifference(modKeys, pressedModKeys).length === 0;

		// Check that the last key stroke of the sequence is the correct sign, like in Control+Shift+C
		// TODO key
		if (isAllModKeysPressed && event.key.toLowerCase() === actionKey?.toLowerCase()) {
			callback(event);
		}
	};

	// Return the onKeydown event
	return ((event: KeyboardEvent) => {
		// Chrome autocomplete triggers `keydown` event but event.key will be undefined
		// @see https://bugs.chromium.org/p/chromium/issues/detail?id=581537.
		if (!event.key && !modifierKeyPressed(event)) return;

		// If the focus is on an editable element, we do nothing
		if (isTargetEditable(event)) return;

		// Provide escape hatch so that the user can perform
		// some custom logic not supported by the API.
		if (hotkeysArray.length === 1 && hotkeysArray[0] === ESCAPE_HATCH_KEY) {
			callback(event);
			return;
		}

		if (modifierKeyPressed(event)) {
			// Handle modifier key combos
			handleModifierCombo(event, hotkeysArray);
		} else {
			// TODO key
			if (hotkeysArray.length > 1) {
				// Handle key sequences
				handleKeySequence(event, hotkeysArray);
			} else if (event.key.toLowerCase() === hotkeysArray[0].toLowerCase()) {
				// Handle the basic case; a single hotkey
				callback(event);
			}
		}
	}) as EventListener;
};

// Check is the current active element is not an editable element (input, textarea...)
// If the current active element is editable, we don't execute the shortcut
const isTargetEditable = (event: KeyboardEvent) => {
	const activeElement = event.target as HTMLElement;

	// Check if the parent is not editable neither (like an icon in a input...)
	const editable = activeElement.closest("input, textarea, [contenteditable=true]");

	if (editable == null) {
		return false;
	}

	// don't let checkboxes, switches, and radio buttons prevent hotkey behavior
	if (editable.tagName.toLowerCase() === "input") {
		const inputType = (editable as HTMLInputElement).type;
		if (inputType === "checkbox" || inputType === "radio") {
			return false;
		}
	}

	// don't let read-only fields prevent hotkey behavior
	return !(editable as HTMLInputElement).readOnly;
};

// Parse keys string: "Control+V" => ["control", "v"]
const getHotkeysArray = (hotkeys: string): string[] => {
	const hkeys = hotkeys.toLowerCase();

	if (hkeys.length === 1) {
		// We're dealing with a single key
		return [hkeys];
	}

	if (hkeys.includes("+")) {
		// We're dealing with a modifier-key combination
		return hkeys.replace(/\s+/g, "").split("+");
	}

	/**
	 * We're dealing with a key sequence, so split on spaces.
	 * If the whitespace character is within quotation marks (" " or ' ')
	 * it signifies a space key and not a delimiter.
	 */
	return [...(hkeys.match(/[^\s"']+|"([^"]*)"|'([^']*)'/g) || [])].map((key) =>
		key.replace(/(["']).*?(["'])/, " "),
	);
};

// Control, Shift... pressed
const modifierKeyPressed = (event: KeyboardEvent): boolean =>
	event.altKey || event.ctrlKey || event.shiftKey || event.metaKey;

// Map key stroke to the corresponding keys string names
const getPressedModifierKeys = (event: KeyboardEvent, convertForMac: boolean): string[] => {
	const doMacConvert = IS_MAC && convertForMac;
	const modifiers: string[] = [];

	if (event.ctrlKey) modifiers.push(doMacConvert ? "ctrl" : "control");
	if (event.shiftKey) modifiers.push("shift");
	if (event.altKey) modifiers.push("alt");
	if (event.metaKey) modifiers.push(doMacConvert ? "control" : "meta");

	return modifiers;
};

// Compare array in order: [1, 2] != [2, 1]
const isArraysEqualInOrder = (arr1: string[], arr2: string[]) =>
	arr1.length === arr2.length && arr1.every((item, i) => item === arr2[i]);

export { useHotKeys };
