import { BrowserRouter } from "react-router";
import { APP_ROOT } from "@/shared/api";
import AppRouter from "../router/app-router";

const RouterProvider = () => (
  <BrowserRouter basename={APP_ROOT}>
    <AppRouter />
  </BrowserRouter>
);

export default RouterProvider;
