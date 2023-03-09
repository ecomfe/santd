/**
 * @file base component
 * @author okaychen
 */

import {Component} from 'san';
import type {ComponentNewOptions} from 'san';

type GetReturnType<C> = {[K in keyof C]: C[K] extends (...args: any[]) => infer R ? R : never};

interface SourceSlots {
    named: {
        [key: string]: JSONValue
    };
    noname: string[];
};

export default class Base<
    State = {},
    Props extends {} = {},
    Computed = {}
> extends Component<
    State
    & Props
    & GetReturnType<Computed>
> {
    static template = /* html */ `
        <div>this is base component</div>
    `;

    constructor(options?: ComponentNewOptions<Props>) {
        super(options as State & Props & GetReturnType<Computed>);
    };

    attached(): void {};

    initData?(): State extends {} ? State : {};

    sourceSlots!: SourceSlots;
};
