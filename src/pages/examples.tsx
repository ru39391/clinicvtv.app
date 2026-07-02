import { useEffect, type FC } from "react";
//import { Layout } from "@/shared/ui";
//import { PositionsHeader, PositionsWrapper } from "@/widgets/positions";

const Examples: FC = () => {
  useEffect(() => {
    document.title = "Примеры работ";
  }, []);

  return 'examples';//<Layout><PositionsHeader /><PositionsWrapper /></Layout>
};

export default Examples;
