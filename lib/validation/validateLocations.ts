import type { TErrorCode } from '@/lib/errors';
import { LOCATION_NAME_MAX_LENGTH } from '@/lib/constants/locations';

export interface IValidatedLocationData {
  name: string;
}

type ValidationResult =
  { ok: true; data: IValidatedLocationData } | { ok: false; error: TErrorCode };

export function validatedLocationData(formData: FormData): ValidationResult {
  const rawName = formData.get('name');

  if (typeof rawName !== 'string') {
    return { ok: false, error: 'invalid_form' };
  }

  const name = rawName.trim();
  if (name.length < 1 || name.length > LOCATION_NAME_MAX_LENGTH) {
    return { ok: false, error: 'invalid_name_length' };
  }

  return { ok: true, data: { name } };
}
