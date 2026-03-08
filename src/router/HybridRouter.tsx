import { BrowserRouter, HashRouter } from "react-router-dom";
import { isWebView } from "../utils/router";

export default function HybridRouter({ children }: { children: React.ReactNode }) {
  const Router = isWebView() ? HashRouter : BrowserRouter;

  return <Router>{children}</Router>;
}