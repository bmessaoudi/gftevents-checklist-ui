export type Authentication = 'auth' | 'no-auth' | 'any';

export type PageOptions = {
    authenticated: Authentication;
};

export type PageOptionsParams = {
    authenticated: Authentication;
};

export type PageComponent = (() => JSX.Element) & PageOptions;

export default function withRouting(ReactComponent: () => JSX.Element, options: PageOptionsParams): PageComponent {
    const { authenticated = [] } = options;
    // @ts-ignore
    ReactComponent.authenticated = authenticated;

    return ReactComponent as PageComponent;
}