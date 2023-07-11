var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/body-parser.utils.ts
var body_parser_utils_exports = {};
__export(body_parser_utils_exports, {
  UnsupportedBodyTypeError: () => UnsupportedBodyTypeError,
  getIsEnabledBodyAs: () => getIsEnabledBodyAs,
  getMimeTypes: () => getMimeTypes,
  isTypes: () => isTypes
});
module.exports = __toCommonJS(body_parser_utils_exports);
var import_lodash = __toESM(require("lodash.merge"));
var import_type_is = __toESM(require("type-is"));

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
  const mimeTypes = (0, import_lodash.default)(defaultMimeTypes, extendTypes);
  return mimeTypes;
}
function isTypes(contentTypeValue, types) {
  if (typeof contentTypeValue === "string") {
    contentTypeValue = contentTypeValue.replace(/;$/, "");
  }
  return import_type_is.default.is(contentTypeValue, types);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  UnsupportedBodyTypeError,
  getIsEnabledBodyAs,
  getMimeTypes,
  isTypes
});
