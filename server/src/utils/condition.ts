const conditionMap: Record<string, string> = {
  "New": "new",
  "Like New": "like_new",
  "Used": "Used",
};

export const toDbCondition = (c: string) => conditionMap[c] ?? "used";