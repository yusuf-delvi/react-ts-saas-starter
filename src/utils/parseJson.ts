export const parseJson = (jsonString: string) => {
  try {
    const parsedJson = JSON.parse(jsonString);
    return parsedJson;
  } catch (error) {
    return null;
  }
};
