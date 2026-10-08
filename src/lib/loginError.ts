const SERVICE_UNAVAILABLE_MESSAGE =
  "O serviço de acesso está temporariamente indisponível. Tente novamente mais tarde e avise o time de suporte.";

/** Translates structured SDK errors without exposing internal service details. */
export function getLoginErrorMessage(error: unknown): string {
  const details = error && typeof error === "object"
    ? error as { code?: string; status?: number; name?: string; message?: string }
    : {};
  const { code, status, name, message = "" } = details;

  if (
    (typeof status === "number" && status >= 500) ||
    status === 0 ||
    name === "AuthRetryableFetchError" ||
    name === "AbortError" ||
    name === "TimeoutError" ||
    /failed to fetch|fetch failed|networkerror|network request failed|load failed|timeout|timed out|service unavailable|project.*paused/i.test(message)
  ) {
    return SERVICE_UNAVAILABLE_MESSAGE;
  }

  if (status === 429 || code === "over_request_rate_limit") {
    return "Muitas tentativas de acesso. Aguarde alguns minutos e tente novamente.";
  }

  if (code === "invalid_credentials" || message === "Invalid login credentials") {
    return "E-mail ou senha incorretos.";
  }

  if (code === "email_not_confirmed") {
    return "Confirme seu e-mail antes de entrar. Se precisar de ajuda, contate o time de suporte.";
  }

  if (message === "Esta conta está desativada.") {
    return "Esta conta está desativada. Contate o time de suporte.";
  }

  return "Não foi possível entrar. Tente novamente mais tarde e avise o time de suporte se o problema persistir.";
}
