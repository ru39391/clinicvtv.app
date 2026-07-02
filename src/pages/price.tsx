import { useEffect, type FC } from "react";
//import { Layout } from "@/shared/ui";
//import { PositionsHeader, PositionsWrapper } from "@/widgets/positions";

const Price: FC = () => {
  useEffect(() => {
    document.title = "Прайслист";
  }, []);

  return 'price';//<Layout><PositionsHeader /><PositionsWrapper /></Layout>
};

export default Price;
