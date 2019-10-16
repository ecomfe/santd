/**
 * @file Santd slider utils file
 **/
import keyCode from '../../core/util/keyCode';

function findDOMNode(instance) {
    return instance && instance.el || null;
}

export function isEventFromHandle(e, handles) {
    try {
        return Object.keys(handles).some(key => e.target === findDOMNode(handles[key]));
    }
    catch (error) {
        return false;
    }
}


export function getClosestPoint(val, {marks, step, min, max}) {
    const points = Object.keys(marks).map(parseFloat);
    if (step !== null) {
        const maxSteps = Math.floor((max - min) / step);
        const steps = Math.min((val - min) / step, maxSteps);
        const closestStep = Math.round(steps) * step + min;
        points.push(closestStep);
    }
    const diffs = points.map(point => Math.abs(val - point));
    return points[diffs.indexOf(Math.min(...diffs))];
}

export function getPrecision(step) {
    const stepString = step.toString();
    let precision = 0;
    if (stepString.indexOf('.') >= 0) {
        precision = stepString.length - stepString.indexOf('.') - 1;
    }
    return precision;
}

export function getMousePosition(vertical, e) {
    return vertical ? e.clientY : e.pageX;
}


export function getHandleCenterPosition(vertical, handle) {
    const coords = handle.getBoundingClientRect();
    return vertical
        ? coords.top + (coords.height * 0.5)
        : window.pageXOffset + coords.left + (coords.width * 0.5);
}

export function ensureValueInRange(val, {max, min}) {
    if (val <= min) {
        return min;
    }
    if (val >= max) {
        return max;
    }
    return val;
}

export function ensureValuePrecision(val, props) {
    const step = props.step;
    const closestPoint = isFinite(getClosestPoint(val, props)) ? getClosestPoint(val, props) : 0; // eslint-disable-line
    return step === null ? closestPoint : parseFloat(closestPoint.toFixed(getPrecision(step)));
}