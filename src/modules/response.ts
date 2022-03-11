export const response = (data: any, msg: string, code: number) => {
  return {
    doc: data,
    msg,
    code,
    isError: code > 399,
  };
};
