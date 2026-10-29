import { z } from 'zod';

type EnumObject = Readonly<Record<string, string>>;

function normalizeEnumToken(value: string): string {
  return value.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
}

export function enumQueryParam<const T extends EnumObject>(
  values: T,
  message = 'Invalid enum value',
) {
  const normalizedValues = new Map(
    Object.values(values).map((value) => [normalizeEnumToken(value), value]),
  );

  return z.preprocess(
    (value) => {
      if (typeof value !== 'string') return value;
      if (!value.trim()) return undefined;

      return normalizedValues.get(normalizeEnumToken(value)) ?? value;
    },
    z.enum(values, { error: message }).optional(),
  );
}

export function booleanQueryParam(message = 'Must be true or false') {
  return z.preprocess(
    (value) => {
      if (typeof value === 'boolean') return value;
      if (typeof value !== 'string') return value;

      const normalized = value.trim().toLowerCase();
      if (!normalized) return undefined;
      if (normalized === 'true') return true;
      if (normalized === 'false') return false;
      return value;
    },
    z.boolean({ error: message }).optional(),
  );
}
