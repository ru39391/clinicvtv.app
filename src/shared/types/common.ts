export type TItemData = { id: number; name: string; is_hidden: 1 | 0; };

export type TIntroData = Record<"desc" | "introtext", string>;

export type TDatesData = Record<"createdAt" | "updatedAt", string>;

export type TPicsData = Record<"webp" | "thumb", string>;

export type TDeptsData = Record<"spec_id" | "dept_id" | "subdept_id", number>;
