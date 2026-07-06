import { useEffect, type FC } from "react";
import { GoBackBtn  } from "@/features/go-back-btn";
import { Heading } from "@/entities/heading";
import { Layout } from "@/shared/ui";
import { TestimonialsWrapper } from "@/widgets/testimonials";

const Testimonials: FC = () => {
  const props = {
    title: "Отзывы",
    aside: <GoBackBtn />
  };

  useEffect(() => {
    document.title = props.title;
  }, []);

  return (
    <Layout>
      <Heading {...props}>TestimonialsSearchForm</Heading>
      <TestimonialsWrapper />
    </Layout>
  )
};

export default Testimonials;
