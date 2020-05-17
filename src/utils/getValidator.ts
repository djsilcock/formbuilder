import {
  ValidationOption,
  ValidationOptions,
  Validate,
  Message,
  ValidationValueMessage,
} from "react-hook-form";

type ValidationProps = Partial<{
  required: Message | ValidationOption<boolean>;
  min: ValidationOption<number | string>;
  max: ValidationOption<number | string>;
  maxLength: ValidationOption<number | string>;
  minLength: ValidationOption<number | string>;
  pattern: ValidationOption<RegExp | string>;
  validate: Validate | Record<string, Validate>;
}>;

function toRegExp(pattern: any): RegExp {
  return new RegExp(pattern);
}
export function getValidator({
  required = false,
  min,
  max,
  maxLength,
  minLength,
  pattern,
  validate,
}: ValidationProps): ValidationOptions {
  return {
    required,
    min,
    max,
    maxLength,
    minLength,
    pattern: toRegExp(pattern),
    validate,
  };
}
