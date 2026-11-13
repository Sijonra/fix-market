export const ERROR_MESSAGES = {
  // auth
  invalid_credentials: 'Неверный email или пароль.',
  missing_fields: 'Пожалуйста, заполните все поля.',

  // categories
  invalid_form: 'Заполните все обязательные поля формы.',
  invalid_name_length:
    'Название категории должно содержать от 1 до 50 символов.',
  invalid_parent: 'Выбрана некорректная родительская категория.',
  database_error: 'Не удалось сохранить данные. Попробуйте позже.',
} as const;

export type TErrorCode = keyof typeof ERROR_MESSAGES;

export function getErrorMessage(code?: string): string | null {
  if (!code) return null;

  if (Object.hasOwn(ERROR_MESSAGES, code)) {
    return ERROR_MESSAGES[code as TErrorCode];
  }

  return 'Произошла неизвестная ошибка.';
}
