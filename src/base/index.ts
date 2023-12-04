/**
 * @file base component
 * @author okaychen
 */

import {Component, NodeType, TemplateComponent} from 'san';
import type {ComponentNewOptions} from 'san';

export type GetReturnType<C> = {[K in keyof C]: C[K] extends (...args: any[]) => infer R ? R : never};

// 暂时简单定义各种node的类型，之后可完善
export interface TextNode {
    nodeType: NodeType.TEXT;
    content: string;
}

interface IFNode {
    nodeType: NodeType.IF;
}

interface FORNode {
    nodeType: NodeType.FOR;
}
interface ELEMNode {
    nodeType: NodeType.ELEM;
}
interface SLOTNode {
    nodeType: NodeType.SLOT;
}
interface LOADERNode {
    nodeType: NodeType.LOADER;
}

interface ISNode {
    nodeType: NodeType.IS;
}


export interface SourceSlots {
    named: {
        [key: string]: JSONValue
    };
    noname: Record<string, JSONValue>[];
};

export type NodeChild =
    | Base
    | TemplateComponent
    | TextNode
    | IFNode
    | FORNode
    | ELEMNode
    | SLOTNode
    | LOADERNode
    | ISNode;

export interface SlotChild {
    children: Array<NodeChild>;
    nodeType: NodeType;
}

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

    slotChildren!: SlotChild[];

    parent!: Base;

    children!: any[];

    owner!: Base;

    id!: string;

};
