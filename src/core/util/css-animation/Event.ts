const EVENT_NAME_MAP = {
    transitionend: {
        transition: 'transitionend',
        WebkitTransition: 'webkitTransitionEnd',
        MozTransition: 'mozTransitionEnd',
        OTransition: 'oTransitionEnd',
        msTransition: 'MSTransitionEnd'
    },

    animationend: {
        animation: 'animationend',
        WebkitAnimation: 'webkitAnimationEnd',
        MozAnimation: 'mozAnimationEnd',
        OAnimation: 'oAnimationEnd',
        msAnimation: 'MSAnimationEnd'
    }
} as const;

type Mutable<T> = {
    -readonly [P in keyof T]: Mutable<T[P]>;
};

type Partialble<T> = {
    [P in keyof T]: Partial<T[P]>
}

// Event
type EventName = keyof typeof EVENT_NAME_MAP;
type EventNameMap = Partialble<Mutable<typeof EVENT_NAME_MAP>>;
export type EventType = GlobalEventHandlersEventMap[EventName];
export type EventHandler = (this: HTMLElement, event: EventType) => void;
// export type AnimationEventTarget = EventTarget & Element;

function isTransitionendEvents(event: string): event is 'transitionend' {
    return event === 'transitionend';
}

function isAnimationendEvents(event: string): event is 'animationend' {
    return event === 'animationend';
}

function isTransitionStyle(styleName: string): styleName is 'transition' {
    return styleName.toUpperCase().indexOf('TRANSITION') >= 0;
}

function isAnimationStyle(styleName: string): styleName is 'animation' {
    return styleName.toUpperCase().indexOf('ANIMATION') >= 0;
}

const endEvents: Array<EventName> = [];

function detectEvents() {
    const testEl = document.createElement('div');
    const style = testEl.style;
    let dectectEventMap: EventNameMap = EVENT_NAME_MAP;

    if (!('AnimationEvent' in window)) {
        delete dectectEventMap.animationend.animation;
    }

    if (!('TransitionEvent' in window)) {
        delete dectectEventMap.transitionend.transition;
    }

    for (const baseEventName in dectectEventMap) {
        if (EVENT_NAME_MAP.hasOwnProperty(baseEventName)) {
            if (isTransitionendEvents(baseEventName)) {
                const baseEvents = EVENT_NAME_MAP[baseEventName];
                for (const styleName in baseEvents) {
                    if (styleName in style) {
                        if (isTransitionStyle(styleName)) {
                            endEvents.push(baseEvents[styleName]);
                        }
                        break;
                    }
                }
            }
            else if (isAnimationendEvents(baseEventName)) {
                const baseEvents = EVENT_NAME_MAP[baseEventName];
                for (const styleName in baseEvents) {
                    if (styleName in style) {
                        if (isAnimationStyle(styleName)) {
                            endEvents.push(baseEvents[styleName]);
                        }
                        break;
                    }
                }
            }
        }
    }
}

if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    detectEvents();
}

function addEventListener(node: HTMLElement, eventName: EventName, eventListener: EventHandler) {
    node.addEventListener(eventName, eventListener, false);
}

function removeEventListener(node: HTMLElement, eventName: EventName, eventListener: EventHandler) {
    node.removeEventListener(eventName, eventListener, false);
}

export default {
    addEndEventListener(node: HTMLElement, eventListener: EventHandler) {
        if (endEvents.length === 0) {
            window.setTimeout(eventListener, 0);
            return;
        }

        endEvents.forEach(endEvent => {
            addEventListener(node, endEvent, eventListener);
        });
    },

    endEvents,

    removeEndEventListener(node: HTMLElement, eventListener: EventHandler) {
        if (endEvents.length === 0) {
            return;
        }

        endEvents.forEach(endEvent => {
            removeEventListener(node, endEvent, eventListener);
        });
    },

    isAnimationEvent(e: EventType): e is AnimationEvent {
        const animationendKeys = Object.keys(EVENT_NAME_MAP.animationend);
        return animationendKeys.some(key => key.toLowerCase() === e.type.toLowerCase());
    }
};
