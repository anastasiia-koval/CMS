export const fields = [
  {
    id: "email",
    type: "email",
    name: "Adres e-mail",
  },
  {
    id: "username",
    name: "Nazwa użytkownika",
  },
  {
    id: "password",
    type: "password",
    name: "Hasło",
    autocomplete: "new-password",
  },
  {
    id: "repeatPassword",
    type: "password",
    name: "Powtórz hasło",
    autocomplete: "new-password",
    sameAs: "password",
    sameAsError: "Podane hasła nie są takie same"
  },
];
