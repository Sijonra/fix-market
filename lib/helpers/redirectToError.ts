import { redirect } from 'next/navigation';
import type { TErrorCode } from '../errors';

export const redirectToError: (path: string, errorCode: TErrorCode) => never = (
  path,
  errorCode
) => {
  redirect(`${path}?error=${errorCode}`);
};
