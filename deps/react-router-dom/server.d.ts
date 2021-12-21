import * as React from "https://cdn.esm.sh/v58/@types/react@17.0.37/index.d.ts";
import { Location } from "https://cdn.esm.sh/v58/history@5.1.0/index.d.ts";
export interface StaticRouterProps {
    basename?: string;
    children?: React.ReactNode;
    location: Partial<Location> | string;
}
/**
 * A <Router> that may not transition to any other location. This is useful
 * on the server where there is no stateful UI.
 */
export declare function StaticRouter({ basename, children, location: locationProp }: StaticRouterProps): JSX.Element;
