import { useEffect, type FC } from "react";
import { CreatePositionBtn } from "@/features/create-position-btn";
import { CreateExampleItemForm } from "@/features/create-example-item-form";
import { PaginationCounter, PaginationNav } from "@/features/pagination";
import { PositionsWrapper } from "@/features/positions";
import { RemovePositionModal } from "@/features/remove-position-modal";
import { ResetPositionsBtn } from "@/features/reset-positions-btn";
import { ExamplesList } from "@/features/examples-list";
import { useModalStore } from "@/shared/store";
import { useExampleStore, type TExampleData, type TExampleQueryData } from "@/entities/example";

const ExamplesWrapper: FC = () => {
  const { open } = useModalStore();
  const {
    data: arr,
    current: currData,
    fetchItems,
    removeItem,
    setCurrItemData: setCurrData,
    isLoading,
    pagination,
  } = useExampleStore();

  useEffect(() => {
    fetchItems(null);
  }, []);

  return (
    <PositionsWrapper<TExampleData>
      {...{
        aside: (
          <>
            <ResetPositionsBtn<TExampleQueryData> {...{ fetchItems, isLoading }} />
            <CreatePositionBtn<TExampleData> {...{ setCurrData }}>
              <CreateExampleItemForm />
            </CreatePositionBtn>
          </>
        ),
        currData,
        form: <CreateExampleItemForm />,
        footer: (
          <>
            <PaginationCounter {...{ isLoading, pagination }} />
            <PaginationNav<TExampleData> {...{ fetchItems, isLoading, pagination }} />
          </>
        ),
        isLoading,
        setCurrData
      }}
    >
      <ExamplesList
        showRemoveModal={({ id, name }: Pick<TExampleData, "id" | "name">) => open({
          content: <RemovePositionModal<TExampleData> {...{ id, isLoading, name, removeItem }} />
        })}
        {...{
          arr,
          isLoading,
          setCurrData,
        }}
      />
    </PositionsWrapper>
  )
};

export default ExamplesWrapper;
