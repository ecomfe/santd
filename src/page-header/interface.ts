import { SlotChild } from "santd/base";
import {TBreadcrumb} from '../breadcrumb';

export interface Props {
    title?: string;
    subTitle?: string;
    avatar?: object;
    backIcon?: SlotChild | boolean;
    tags?: SlotChild;
    extra?: SlotChild;
    breadcrumb?: TBreadcrumb;
    footer?: SlotChild;
    onBack?: ()=>void;
}