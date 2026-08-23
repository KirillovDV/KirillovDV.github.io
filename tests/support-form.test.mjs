import test from "node:test";
import assert from "node:assert/strict";
import { validateSupportMessage } from "../Static/support-form.mjs";

test("принимает заполненное обращение", () => {
  assert.deepEqual(
    validateSupportMessage({
      name: "Alex Morgan",
      email: "alex@example.com",
      social: "https://t.me/alexmorgan",
      message: "I would like to report an issue with the website.",
    }),
    {},
  );
});

test("сообщает об ошибках на русском", () => {
  assert.deepEqual(
    validateSupportMessage({
      name: "",
      email: "not-an-email",
      social: "alexmorgan",
      message: "",
    }),
    {
      name: "Укажите ваше имя.",
      email: "Укажите корректный адрес электронной почты.",
      social: "Укажите полную ссылку на профиль в соцсети.",
      message: "Введите сообщение.",
    },
  );
});
