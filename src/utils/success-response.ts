export const sucResponse = (message: string, data: object | null) => {
  return {
    status: 'success',
    message,
    data,
  };
};
