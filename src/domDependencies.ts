

export type DomDependencies = {
    ResizeObserver: typeof ResizeObserver;
    MouseEvent: typeof MouseEvent;
    Range: typeof Range;
    Element: typeof Element;
};

let injectedDomDependencies: DomDependencies | undefined = undefined;

export function getResizeObserver() {
    return { ResizeObserver: injectedDomDependencies?.ResizeObserver ?? ResizeObserver };
}

function getMouseEvent(){
    return { MouseEvent: injectedDomDependencies?.MouseEvent ?? MouseEvent };
}

export function getMouseEventClientXOrY(event: MouseEvent, axis: 'x' | 'y'): number {

    const { MouseEvent } = getMouseEvent();

    const pd = Object.getOwnPropertyDescriptor(MouseEvent.prototype, `client${axis.toUpperCase()}`);

    if( pd === undefined ){
        throw new Error("Assertion error");
    }

    const { get } = pd;

    if( get === undefined ){
        throw new Error("Assertion error");
    }

    return get.call(event) as number;

}


export function getBoundingClientRect_Range(target: Range): DOMRect {

    const methodName = 'getBoundingClientRect';
    const Constructor = Range;

    if( injectedDomDependencies === undefined ){
        return target[methodName]();
    }

    const originalPd = Object.getOwnPropertyDescriptor(Constructor.prototype, methodName);

    if( originalPd === undefined ){
        throw new Error("Assertion error");
    }

    {
        const dpPd = Object.getOwnPropertyDescriptor(injectedDomDependencies[Constructor.name].prototype, methodName);
        if( dpPd === undefined ){
            throw new Error("Assertion error");
        }
        Object.defineProperty(Constructor.prototype, methodName, dpPd);
    }

    const domRect = target[methodName]();

    Object.defineProperty(Constructor.prototype, methodName, originalPd);

    return domRect;

}

export function getBoundingClientRect_Element(target: Element): DOMRect {

    const methodName = 'getBoundingClientRect';
    const Constructor = Element;

    if( injectedDomDependencies === undefined ){
        return target[methodName]();
    }

    const originalPd = Object.getOwnPropertyDescriptor(Constructor.prototype, methodName);

    if( originalPd === undefined ){
        throw new Error("Assertion error");
    }

    {
        const dpPd = Object.getOwnPropertyDescriptor(injectedDomDependencies[Constructor.name].prototype, methodName);
        if( dpPd === undefined ){
            throw new Error("Assertion error");
        }
        Object.defineProperty(Constructor.prototype, methodName, dpPd);
    }

    const domRect = target[methodName]();

    Object.defineProperty(Constructor.prototype, methodName, originalPd);

    return domRect;

}


export function injectDomDependencies(domDependencies: DomDependencies): void {
    injectedDomDependencies = domDependencies;
}


