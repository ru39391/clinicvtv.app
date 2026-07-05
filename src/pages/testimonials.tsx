import { useEffect, type FC } from "react";
import { Heading } from "@/entities/heading";
import { GoBackBtn  } from "@/features/go-back-btn";
import { Layout } from "@/shared/ui";
import { PaginationCounter, PaginationNav } from "@/features/pagination";
import { PositionsList } from "@/widgets/positions-list";
import { useTestimonialStore, type TTestimonialQueryData } from "@/entities/testimonial";

const Testimonials: FC = () => {
  const props = {
    title: "Отзывы",
    aside: <GoBackBtn />
  };

  const {
    current: currData,
    fetchItems,
    isLoading,
    pagination,
    setCurrItemData: setCurrData
  } = useTestimonialStore();

  useEffect(() => {
    fetchItems(null);
    document.title = props.title;
  }, []);

  return (
    <Layout>
      <Heading {...props}>TestimonialsSearchForm</Heading>
      <PositionsList
        {...{
          aside: '<aside />',
          currData,
          form: '<CreatePriceItemForm />',
          footer: (
            <>
              <PaginationCounter {...{ isLoading, pagination }} />
              <PaginationNav<TTestimonialQueryData> {...{ fetchItems, isLoading, pagination }} />
            </>
          ),
          isLoading,
          setCurrData
        }}
      >
        testimonials
      </PositionsList>
    </Layout>
  )
};

export default Testimonials;
