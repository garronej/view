

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


export function injectDomDependencies(domDependencies: DomDependencies): void {
    injectedDomDependencies = domDependencies;
}


