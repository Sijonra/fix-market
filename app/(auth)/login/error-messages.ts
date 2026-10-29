const ERROR_MESSAGES: Record<string, string> = {
  invalid_credentials: 'Неверный email или пароль',
  missing_fields: 'Заполните все поля корректно',
};

export function getErrorMessage(code?: string): string | null {
  if (!code) return null;
  return ERROR_MESSAGES[code] || 'Произошла ошибка. Попробуйте снова.';
}
