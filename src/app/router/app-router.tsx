import type { FC } from "react";
import { Navigate, Route, Routes } from "react-router";
import {
  Examples,
  Price,
  Testimonials,
} from "@/pages";
import {
  routes,
  EXAMPLE_KEY,
  PRICE_KEY,
  TESTIMONIAL_KEY
} from "@/shared/constants";

const AppRouter: FC = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate to={routes.protected[PRICE_KEY]} replace />}
      />
      {[
        {
          path: routes.protected[EXAMPLE_KEY],
          element: <Examples />,
        },
        {
          path: routes.protected[PRICE_KEY],
          element: <Price />,
        },
        {
          path: routes.protected[TESTIMONIAL_KEY],
          element: <Testimonials />,
        },
      ].map((props, index) => (
        <Route key={index.toString()} {...props} />
      ))}
    </Routes>
  );
};

export default AppRouter;
