export const missingFields = (
  data: Record<string, any>,
  requiredFields: string[],
): string[] => {
  try {
    const missingFields: string[] = [];

    for (const f of requiredFields) {
      if (data[f] === undefined || data[f] === null || !data[f]) {
        missingFields.push(f);
      }
    }

    if (missingFields.length > 0) {
      throw new Error(`Campos faltando: ${missingFields.join(", ")}`);
    }

    return missingFields;
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message);
    }

    throw err;
  }
};
