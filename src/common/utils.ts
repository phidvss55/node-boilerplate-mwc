export const asJson = (success = true, data: any = [], msg = 'Success', errors: any = null) => {
  return {
    success,
    msg,
    data,
    errors,
  };
};
