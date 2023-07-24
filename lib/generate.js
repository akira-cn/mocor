module.exports = function generate(schema, extras = {}) {
  if(schema == null) return null;
  if(Array.isArray(schema)) {
    return schema.map((s, i) => generate(s, {...extras, index: i}));
  }
  if(typeof schema === 'function') {
    return generate(schema(extras), extras);  
  }
  if(typeof schema === 'object') {
    if(schema instanceof Date) {
      return schema.toISOString();
    }
    if(schema instanceof RegExp) {
      return schema.toString();
    }
    const ret = {};
    for(const [k, v] of Object.entries(schema)) {
      ret[k] = generate(v, extras);
    }
    return ret;
  }
  return schema;
};
