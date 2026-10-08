import { describe, expect, it } from "vitest";
import { AuthApiError, AuthRetryableFetchError } from "@supabase/supabase-js";
import { getLoginErrorMessage } from "./loginError";

describe("getLoginErrorMessage", () => {
  it.each([
    new AuthRetryableFetchError("Failed to fetch", 0),
    new AuthApiError("Service unavailable", 503, undefined),
    new AuthApiError("Internal server error", 500, undefined),
    new AuthApiError("Bad gateway", 502, undefined),
    new AuthApiError("Gateway timeout", 504, undefined),
    new TypeError("Failed to fetch"),
    new TypeError("Load failed"),
    { message: "TypeError: fetch failed", details: "", code: "" },
    { message: "This project is paused" },
    { name: "AbortError", message: "The operation was aborted" },
  ])("orienta tentar mais tarde e avisar o suporte em falhas de serviço: %s", (error) => {
    const message = getLoginErrorMessage(error);
    expect(message).toContain("temporariamente indisponível");
    expect(message).toContain("Tente novamente mais tarde");
    expect(message).toContain("avise o time de suporte");
    expect(message).not.toContain("senha incorretos");
  });

  it.each([
    new AuthApiError("Invalid login credentials", 400, "invalid_credentials"),
    new AuthApiError("Invalid login credentials", 400, undefined),
  ])("identifica credenciais inválidas: %s", (error) => {
    expect(getLoginErrorMessage(error)).toBe("E-mail ou senha incorretos.");
  });

  it("não confunde outros erros 400 com senha incorreta", () => {
    expect(getLoginErrorMessage(new AuthApiError("Unexpected response", 400, undefined)))
      .toContain("Não foi possível entrar");
  });

  it("orienta aguardar quando há limite de tentativas", () => {
    expect(getLoginErrorMessage(new AuthApiError("Too many requests", 429, undefined)))
      .toContain("Muitas tentativas");
  });

  it("orienta confirmar o e-mail", () => {
    expect(getLoginErrorMessage(new AuthApiError("Email not confirmed", 400, "email_not_confirmed")))
      .toContain("Confirme seu e-mail");
  });

  it("preserva o aviso de conta desativada", () => {
    expect(getLoginErrorMessage(new Error("Esta conta está desativada.")))
      .toContain("Esta conta está desativada. Contate o time de suporte");
  });

  it.each([undefined, null, "internal error", { message: "sensitive internal details" }])(
    "usa uma mensagem genérica sem expor detalhes para erros desconhecidos: %s",
    (error) => {
      expect(getLoginErrorMessage(error)).toBe(
        "Não foi possível entrar. Tente novamente mais tarde e avise o time de suporte se o problema persistir.",
      );
    },
  );
});
