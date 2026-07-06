import { useEffect, type FC } from "react";
import { GoBackBtn  } from "@/features/go-back-btn";
import { Heading } from "@/entities/heading";
import { Layout } from "@/shared/ui";
import { ExamplesWrapper } from "@/widgets/examples";
//import { ExamplesSearchForm } from "@/features/examples-search-form";

const Examples: FC = () => {
  const props = {
    title: "Примеры работ",
    aside: <GoBackBtn />
  };

  useEffect(() => {
    document.title = props.title;
  }, []);

  return (
    <Layout>
      <Heading {...props}>ExamplesSearchForm</Heading>
      <ExamplesWrapper />
    </Layout>
  )
};

export default Examples;
