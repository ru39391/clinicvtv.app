import { Button, Loader } from "@/shared/ui";
import { ResetIcon } from "@/shared/icons";
import { resetPositions } from "../lib/reset-positions";
import type { IResetPositionsBtn } from "../model/types";

const ResetPositionsBtn = <T,>({
  fetchItems,
  isLoading,
  type
}: IResetPositionsBtn<T>) => (
  <Button
    handleClick={() => resetPositions(fetchItems, type)}
    isDisabled={isLoading}
    style="plain"
  >
    {isLoading ? <Loader isVisible={isLoading} size="xs" /> : <ResetIcon />}
  </Button>
);

export default ResetPositionsBtn;
