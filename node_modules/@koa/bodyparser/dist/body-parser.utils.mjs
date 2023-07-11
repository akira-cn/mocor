// src/body-parser.utils.ts
import deepMerge from "lodash.merge";
import typeis from "type-is";

// src/body-parser.types.ts
var supportedBodyTypes = ["json", "form", "text", "xml"];

// src/body-parser.utils.ts
var UnsupportedBodyTypeError = class extends Error {
  constructor(wrongType) {
    super();
    this.name = "UnsupportedBodyTypeError";
    this.message = `Invalid enabled type '${wrongType}'. make sure to pass an array contains supported types ([${supportedBodyTypes}]).`;
  }
};
function getIsEnabledBodyAs(enableTypes) {
  for (const enabledType of enableTypes) {
    if (!supportedBodyTypes.includes(enabledType)) {
      throw new UnsupportedBodyTypeError(enabledType);
    }
  }
  const isEnabledBodyAs = supportedBodyTypes.reduce(
    (prevResult, currentType) => ({
      ...prevResult,
      [currentType]: enableTypes.includes(currentType)
    }),
    {}
  );
  return isEnabledBodyAs;
}
function getMimeTypes(extendTypes) {
  for (const extendedTypeKey of Object.keys(extendTypes)) {
    const extendedType = extendTypes[extendedTypeKey];
    if (!supportedBodyTypes.includes(extendedTypeKey) || !Array.isArray(extendedType)) {
      throw new UnsupportedBodyTypeError(extendedTypeKey);
    }
  }
  const defaultMimeTypes = {
    // default json mime types
    json: [
      "application/json",
      "application/json-patch+json",
      "application/vnd.api+json",
      "application/csp-report",
      "application/reports+json",
      "application/scim+json"
    ],
    // default form mime types
    form: ["application/x-www-form-urlencoded"],
    // default text mime types
    text: ["text/plain"],
    // default xml mime types
    xml: ["text/xml", "application/xml"]
  };
  const mimeTypes = deepMerge(defaultMimeTypes, extendTypes);
  return mimeTypes;
}
function isTypes(contentTypeValue, types) {
  if (typeof contentTypeValue === "string") {
    contentTypeValue = contentTypeValue.replace(/;$/, "");
  }
  return typeis.is(contentTypeValue, types);
}
export {
  UnsupportedBodyTypeError,
  getIsEnabledBodyAs,
  getMimeTypes,
  isTypes
};
