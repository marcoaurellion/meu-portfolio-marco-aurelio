// Ano automático no rodapé
document.getElementById("ano").textContent = new Date().getFullYear();

// Carrossel do portfólio
const trilho = document.getElementById("trilho");
function passo() { return trilho.querySelector(".cartao").offsetWidth + 16; }
document.getElementById("anterior").addEventListener("click", () => trilho.scrollBy({ left: -passo(), behavior: "smooth" }));
document.getElementById("proximo").addEventListener("click", () => trilho.scrollBy({ left: passo(), behavior: "smooth" }));

// Validação do formulário de contato
const form = document.getElementById("form");
const campos = {
  nome: { el: document.getElementById("nome"), erro: document.getElementById("erro-nome") },
  email: { el: document.getElementById("email"), erro: document.getElementById("erro-email") },
  mensagem: { el: document.getElementById("mensagem"), erro: document.getElementById("erro-mensagem") },
};
const sucesso = document.getElementById("sucesso");
const emailValido = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);

function validar(nome) {
  const { el, erro } = campos[nome];
  const v = el.value.trim();
  let msg = "";
  if (!v) msg = "Este campo é obrigatório.";
  else if (nome === "nome" && v.length < 3) msg = "Informe seu nome (mínimo de 3 letras).";
  else if (nome === "email" && !emailValido(v)) msg = "Informe um e-mail válido, como nome@exemplo.com.";
  else if (nome === "mensagem" && v.length < 10) msg = "A mensagem deve ter pelo menos 10 caracteres.";
  erro.textContent = msg;
  el.classList.toggle("invalido", Boolean(msg));
  el.setAttribute("aria-invalid", msg ? "true" : "false");
  return !msg;
}

Object.keys(campos).forEach((n) => campos[n].el.addEventListener("blur", () => validar(n)));

form.addEventListener("submit", (e) => {
  e.preventDefault();
  sucesso.textContent = "";
  const resultados = Object.keys(campos).map(validar);
  if (resultados.includes(false)) {
    const primeiro = Object.keys(campos).find((n) => campos[n].el.classList.contains("invalido"));
    campos[primeiro].el.focus();
    return;
  }
  // Demonstração: não há servidor, então a mensagem não é enviada de fato.
  sucesso.textContent = "Mensagem enviada com sucesso! Obrigado pelo contato.";
  form.reset();
});
