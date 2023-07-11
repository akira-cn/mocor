module.exports = (mock, fn) => {
  return async (params, context) => {
    const mockingjay = context.headers['x-mocor'];
    if(mockingjay) {
      return await mock(params, context);
    }
    return await fn(params, context);
  };
};
