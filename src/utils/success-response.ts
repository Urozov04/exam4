export const sucResponse = (message: string, data: object) => {
  return {
    status: 'success',
    message,
    data,
  };
};
