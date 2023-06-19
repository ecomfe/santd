import Mention from './Mention';

export interface Messages {
    santd_mention_itemSelect: (this: Mention, e: {value: string}) => void;

}

export interface State {
    placeholder: string,
    readOnly: boolean,
    disabled: boolean,
    suggestions: string[],
    filteredSuggestions: string[],
    isShowSug: boolean,
    notFoundContent: string,
    multiLines: boolean,
    placement: string,
    prefix: string | string[],
    value: string,
    split: string
}

export interface Props {
    start: number,
    end: number,
    defaultValue: string,
    defaultSuggestions: string[],
    autoFocus: boolean,
    validateSearch: (input: string) => boolean,
    filterOption: boolean| ((input: string, option: string) => boolean)
}