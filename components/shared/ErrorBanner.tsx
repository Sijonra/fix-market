interface IErrorBanner {
  message: string | null;
}

export function ErrorBanner({ message }: IErrorBanner) {
  if (!message) {
    return null;
  }

  return (
    <div
      role="alert"
      className="mb-6 rounded-lg bg-destructive/15 p-4 text-sm text-destructive font-medium"
    >
      {message}
    </div>
  );
}
