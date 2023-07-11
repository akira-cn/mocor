module.exports = (mock, fn) => {
  return async (params, context) => {
    const mockingjay = context.headers['x-mockingjay'];
    if(mockingjay) {
      return await mock.execute(params, context);
    }
    return await fn(params, context);
  };
};
