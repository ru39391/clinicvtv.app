import { useEffect, type FC } from "react";
import { GoBackBtn  } from "@/features/go-back-btn";
import { Heading } from "@/entities/heading";
import { Layout } from "@/shared/ui";
import { PricelistWrapper } from "@/widgets/price";
import { PriceSearchForm } from "@/features/price-search-form";

const Price: FC = () => {
  const props = {
    title: "Прайслист",
    aside: <GoBackBtn />
  };

  useEffect(() => {
    document.title = props.title;
  }, []);

  return (
    <Layout>
      <Heading {...props}><PriceSearchForm /></Heading>
      <PricelistWrapper />
    </Layout>
  )
};

export default Price;
