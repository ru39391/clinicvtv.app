import type { FC } from "react";
import { Navigate, Route, Routes } from "react-router";
import {
  Examples,
  Price,
  Testimonials,
} from "@/pages";

import { routes } from "@/shared/constants";

const AppRouter: FC = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate to={routes.protected.price} replace />}
      />
      {[
        {
          path: routes.protected.examples,
          element: <Examples />,
        },
        {
          path: routes.protected.price,
          element: <Price />,
        },
        {
          path: routes.protected.testimonials,
          element: <Testimonials />,
        },
      ].map((props, index) => (
        <Route key={index.toString()} {...props} />
      ))}
    </Routes>
  );
};

export default AppRouter;
