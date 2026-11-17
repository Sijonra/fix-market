import {
  NO_PARENT_VALUE,
  CATEGORY_NAME_MAX_LENGTH,
} from '@/lib/constants/categories';
import { TErrorCode } from '@/lib/errors';
import { UUID_REGEX } from '@/lib/helpers/regex';

export interface IValidatedCategoryData {
  name: string;
  parent_id: string | null;
}

type ValidationResult =
  { ok: true; data: IValidatedCategoryData } | { ok: false; error: TErrorCode };

export function validateCategoryFormData(formData: FormData): ValidationResult {
  const rawName = formData.get('name');
  const rawParentId = formData.get('parentId');

  if (typeof rawName !== 'string' || typeof rawParentId !== 'string') {
    return { ok: false, error: 'invalid_form' };
  }

  const name = rawName.trim();
  if (name.length < 1 || name.length > CATEGORY_NAME_MAX_LENGTH) {
    return { ok: false, error: 'invalid_name_length' };
  }

  if (rawParentId === NO_PARENT_VALUE) {
    return { ok: true, data: { name, parent_id: null } };
  }

  if (!UUID_REGEX.test(rawParentId)) {
    return { ok: false, error: 'invalid_parent' };
  }

  return { ok: true, data: { name, parent_id: rawParentId } };
}
