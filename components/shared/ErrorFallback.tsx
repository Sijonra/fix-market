interface IErrorFallback {
  errorMessage?: string;
}

export function ErrorFallback({
  errorMessage = 'Произошла ошибка при загрузке данных.',
}: IErrorFallback) {
  return (
    <div
      role="alert"
      className="rounded-xl border border-destructive/30 bg-destructive/10 p-6 text-destructive"
    >
      <p className="text-base font-medium">{errorMessage}</p>
    </div>
  );
}

export default ErrorFallback;
