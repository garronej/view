

export type DomDependencies = {
    ResizeObserver: typeof ResizeObserver;
    MouseEvent: typeof MouseEvent;
    Range: typeof Range;
    Element: typeof Element;
};

let injectedDomDependencies: DomDependencies | undefined = undefined;

export function getDomDependencies(): DomDependencies {
    if (injectedDomDependencies === undefined) {
        return {
            ResizeObserver: ResizeObserver,
            MouseEvent: MouseEvent,
            Range: Range,
            Element: Element,
        };
    }
    return injectedDomDependencies;
}

export function injectDomDependencies(domDependencies: DomDependencies): void {
    injectedDomDependencies = domDependencies;
}


