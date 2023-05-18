/**
 * @file Santd responsive observe file
 **/

let enquire: Enquire;

if (typeof window !== 'undefined') {
    const matchMediaPolyfill = (mediaQuery: string) => {
        return {
            media: mediaQuery,
            matches: false,
            addListener() {},
            removeListener() {}
        };
    };
    window.matchMedia = window.matchMedia || matchMediaPolyfill;
    enquire = require('enquire.js');
}

export const responsiveArray = ['xxl', 'xl', 'lg', 'md', 'sm', 'xs'];

export const responsiveMap = {
    xs: '(max-width: 575px)',
    sm: '(min-width: 576px)',
    md: '(min-width: 768px)',
    lg: '(min-width: 992px)',
    xl: '(min-width: 1200px)',
    xxl: '(min-width: 1600px)'
} as const;

type Token = string;

type Func = (screens: Screens) => void;

interface Subscriber {
    token: Token;
    func: Func;
}

type TScreen = keyof typeof responsiveMap;

export type Screens = {
    [key in TScreen]?: string;
}

let subscribers: Array<Subscriber> = [];
let subUid: number = -1;
let screens: Screens = {};

export default {
    dispatch(pointMap: Screens) {
        screens = pointMap;
        if (subscribers.length < 1) {
            return false;
        }

        subscribers.forEach(item => {
            item.func(screens);
        });

        return true;
    },
    subscribe(func: Func ) {
        if (subscribers.length === 0) {
            this.register();
        }
        const token = (++subUid).toString();
        subscribers.push({
            token,
            func
        });
        func(screens);
        return token;
    },
    unsubscribe(token: Token) {
        subscribers = subscribers.filter(item => item.token !== token);
        if (subscribers.length === 0) {
            this.unregister();
        }
    },
    unregister() {
        Object.keys(responsiveMap).map(screen =>
            enquire?.unregister(responsiveMap[screen as TScreen]),
        );
    },
    register() {
        Object.keys(responsiveMap).map(screen =>
            enquire?.register(responsiveMap[screen as TScreen], {
                match: () => {
                    const pointMap = {
                        ...screens,
                        [screen]: true
                    };
                    this.dispatch(pointMap);
                },
                unmatch: () => {
                    const pointMap = {
                        ...screens,
                        [screen]: false
                    };
                    this.dispatch(pointMap);
                },
                // Keep a empty destory to avoid triggering unmatch when unregister
                destroy() {}
            })
        );
    }
};
