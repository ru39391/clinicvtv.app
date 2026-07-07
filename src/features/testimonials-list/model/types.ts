import { type TTestimonialData, type TTestimonialStore } from "@/entities/testimonial";

export interface ITestimonialsList {
  arr: TTestimonialStore["data"];
  isLoading: TTestimonialStore["isLoading"];
  setCurrData: TTestimonialStore["setCurrItemData"]
  showRemoveModal: ({ id, name }: Pick<TTestimonialData, "id" | "name">) => void;
}

export interface ITestimonialRows {
  values: { key: keyof TTestimonialData; value: string; }[];
}
