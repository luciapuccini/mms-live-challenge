// Minimal JSX fallback for TypeScript when React namespace isn't resolved
import type React from "react";

declare global {
  namespace JSX {
    // Link JSX Element to React's types
    type Element = React.ReactElement | null;
    interface IntrinsicElements {
      [elem: string]: unknown;
    }
  }
}
