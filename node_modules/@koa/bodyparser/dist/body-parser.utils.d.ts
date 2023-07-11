import { BodyType, BodyParserOptions } from './body-parser.types.js';
import 'co-body';
import 'koa';

declare class UnsupportedBodyTypeError extends Error {
    constructor(wrongType: string);
}
declare function getIsEnabledBodyAs(enableTypes: BodyType[]): {
    json?: string[] | undefined;
    form?: string[] | undefined;
    text?: string[] | undefined;
    xml?: string[] | undefined;
};
declare function getMimeTypes(extendTypes: NonNullable<BodyParserOptions['extendTypes']>): {
    json: string[];
    form: string[];
    text: string[];
    xml: string[];
} & {
    json?: string[] | undefined;
    form?: string[] | undefined;
    text?: string[] | undefined;
    xml?: string[] | undefined;
};
declare function isTypes(contentTypeValue: string, types: string[]): string | false;

export { UnsupportedBodyTypeError, getIsEnabledBodyAs, getMimeTypes, isTypes };
