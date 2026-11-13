import { redirect } from 'next/navigation';
import { TErrorCode } from '../errors';

export const redirectToError = (path: string, errorCode: TErrorCode) => [
  redirect(`${path}?error=${errorCode}`),
];
