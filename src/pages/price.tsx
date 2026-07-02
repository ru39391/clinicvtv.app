import { useEffect, type FC } from "react";
import { Layout } from "@/shared/ui";
import { Heading } from "@/entities/heading";
import { GoBackBtn  } from "@/features/go-back-btn";
import { PriceSearchForm } from "@/features/price-search-form";
import { PositionsWrapper } from "@/widgets/positions";

const Price: FC = () => {
  const props = {
    title: "Прайслист",
    aside: <GoBackBtn />
  };

  useEffect(() => {
    document.title = props.title;
  }, []);

  return <Layout><Heading {...props}><PriceSearchForm /></Heading><PositionsWrapper /></Layout>;
};

export default Price;
