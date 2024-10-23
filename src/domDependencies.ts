

export type DomDependencies = {
    getResizeObserver: () => typeof ResizeObserver;
    getMouseEventClientXOrY: (event: MouseEvent, axis: 'x' | 'y') => number;
    getBoundingClientRect_Range: (target: Range) => DOMRect;
    getBoundingClientRect_Element: (target: Element) => DOMRect;
    getClientRects_Range: (target: Range) => DOMRectList;
    getClientRects_Element: (target: Element) => DOMRectList;
};

let injectedDomDependencies: DomDependencies | undefined = undefined;

export function getResizeObserver(): typeof ResizeObserver {
    if( injectedDomDependencies === undefined ){
        return ResizeObserver;
    }

    return injectedDomDependencies.getResizeObserver();

}


export function getMouseEventClientXOrY(event: MouseEvent, axis: 'x' | 'y'): number {

    if( injectedDomDependencies === undefined ){
        switch(axis){
            case 'x': return event.clientX;
            case 'y': return event.clientY;
        }
    }

    return injectedDomDependencies.getMouseEventClientXOrY(event, axis);

}


export function getBoundingClientRect_Range(target: Range): DOMRect {

    if( injectedDomDependencies === undefined ){
        return target.getBoundingClientRect();
    }

    return injectedDomDependencies.getBoundingClientRect_Range(target);


}

export function getBoundingClientRect_Element(target: Element): DOMRect {

    if( injectedDomDependencies === undefined ){
        return target.getBoundingClientRect();
    }

    return injectedDomDependencies.getBoundingClientRect_Element(target);


}

export function getClientRects_Range(target: Range): DOMRectList {

    if( injectedDomDependencies === undefined ){
        return target.getClientRects();
    }

    return injectedDomDependencies.getClientRects_Range(target);

}

export function getClientRects_Element(target: Element): DOMRectList {

    if( injectedDomDependencies === undefined ){
        return target.getClientRects();
    }

    return injectedDomDependencies.getClientRects_Element(target);

}

export function injectDomDependencies(domDependencies: DomDependencies): void {
    injectedDomDependencies = domDependencies;
}


