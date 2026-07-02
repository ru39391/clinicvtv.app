import { useEffect, type FC } from "react";
//import { Layout } from "@/shared/ui";
//import { PositionsHeader, PositionsWrapper } from "@/widgets/positions";

const Testimonials: FC = () => {
  useEffect(() => {
    document.title = "Отзывы";
  }, []);

  return 'testimonials';//<Layout><PositionsHeader /><PositionsWrapper /></Layout>
};

export default Testimonials;
