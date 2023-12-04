// import receiver from "./receiver";
import localeProvider from './index';

export interface ReceiverComputed {
    // locale: (this: receiver) => {};

    // localeCode: (this: receiver) => string;
};

export interface Messages {
    santd_add_locale_receiver: (this: localeProvider, payload: {value: never}) => void;
};

export interface State {
    locale: {
        [key: string]: JSONValue;
    };

    localeProvider: boolean;
};