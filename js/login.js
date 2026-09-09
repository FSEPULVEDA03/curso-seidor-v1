const DEMO_USER = {
  email: "demo@seidor.com",
  password: "123456"
};

const form = document.querySelector("#loginForm");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const emailError = document.querySelector("#emailError");
const passwordError = document.querySelector("#passwordError");
const formMessage = document.querySelector("#formMessage");
const togglePassword = document.querySelector("#togglePassword");
const forgotButton = document.querySelector("#forgotButton");

if (sessionStorage.getItem("novaraSession") || localStorage.getItem("novaraSession")) {
  window.location.replace("dashboard.html");
}

function clearErrors() {
  [emailInput, passwordInput].forEach((input) => input.classList.remove("is-invalid"));
  emailError.textContent = "";
  passwordError.textContent = "";
  formMessage.textContent = "";
  formMessage.style.color = "";
}

function validateForm() {
  let isValid = true;
  clearErrors();

  if (!emailInput.value.trim()) {
    emailInput.classList.add("is-invalid");
    emailError.textContent = "Ingresa tu correo electrónico.";
    isValid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value)) {
    emailInput.classList.add("is-invalid");
    emailError.textContent = "Ingresa un correo válido.";
    isValid = false;
  }

  if (!passwordInput.value) {
    passwordInput.classList.add("is-invalid");
    passwordError.textContent = "Ingresa tu contraseña.";
    isValid = false;
  }

  return isValid;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!validateForm()) return;

  const button = form.querySelector("button[type='submit']");

  if (emailInput.value.trim().toLowerCase() !== DEMO_USER.email || passwordInput.value !== DEMO_USER.password) {
    formMessage.textContent = "Correo o contraseña incorrectos. Utiliza los datos de demostración.";
    return;
  }

  button.disabled = true;
  button.querySelector("span").textContent = "Ingresando…";

  const storage = document.querySelector("#remember").checked ? localStorage : sessionStorage;
  storage.setItem("novaraSession", JSON.stringify({ email: DEMO_USER.email, loggedAt: Date.now() }));

  window.setTimeout(() => window.location.assign("dashboard.html"), 450);
});

togglePassword.addEventListener("click", () => {
  const isHidden = passwordInput.type === "password";
  passwordInput.type = isHidden ? "text" : "password";
  togglePassword.setAttribute("aria-label", isHidden ? "Ocultar contraseña" : "Mostrar contraseña");
});

forgotButton.addEventListener("click", () => {
  formMessage.style.color = "var(--navy-700)";
  formMessage.textContent = "En un sistema real, aquí se iniciaría la recuperación de contraseña.";
});

[emailInput, passwordInput].forEach((input) => {
  input.addEventListener("input", () => {
    input.classList.remove("is-invalid");
    if (input === emailInput) emailError.textContent = "";
    if (input === passwordInput) passwordError.textContent = "";
    formMessage.textContent = "";
    formMessage.style.color = "";
  });
});
