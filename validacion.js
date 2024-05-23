//Haz tú validación en javascript acá

const boton = document.querySelector("#btn");

const inputs = {
  nombre: document.querySelector("#nombre"),
  email: document.querySelector("#email"),
  asunto: document.querySelector("#asunto"),
  mensaje: document.querySelector("#mensaje")
};

const errorMessages = {
  nombre: { message: "agregue su nombre" },
  email: { message: "email no es valido" },
  asunto: { message: "agregue un asunto" },
  mensaje: { message: "agregue un mensaje" },
  error: { message: "longitud maxima" },
};

function createElement() {
  const element = document.createElement("p");
  element.classList.add("error");
  return element;
}

function handleInput(input, message, condition) {
  const error = input.labels[0].nextElementSibling;
  if (error && error.classList.contains('error')) error.remove();

  if (!input.value || condition) {
    const errorElement = createElement();
    errorElement.textContent = !input.value ? errorMessages[input.name]?.message : message;
    input.labels[0].insertAdjacentElement("afterend", errorElement);
    addStyles(input, true);
    return true;
  } else {
    addStyles(input, false);
    return false;
  }
}

function addStyles(element, status) {
  if (status) {
    element.labels[0].style.color = "red";
    element.style.borderBottom = "2px solid red";
  } else {
    element.labels[0].style.color = "var(--cor-de-btn)";
    element.style.borderBottom = "2px solid var(--cor-de-btn)";
    element.addEventListener("focus", resetStyles);
    element.addEventListener("blur", setBlurStyles);
  }
}

function resetStyles() {
  this.labels[0].style.color = "var(--cor-de-btn)";
  this.style.borderBottom = "2px solid var(--cor-de-btn)";
}

function setBlurStyles() {
  this.labels[0].style.color = "#4b4a4ad9";
  this.style.borderBottom = "2px solid #4b4a4ad9";
}

const inputHandlers = {
  nombre: () => handleInput(inputs.nombre, errorMessages.error.message, parseInt(inputs.nombre.attributes.maxlength.value) === inputs.nombre.value.length),
  email: () => handleInput(inputs.email, errorMessages.email.message, !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputs.email.value)),
  asunto: () => handleInput(inputs.asunto, errorMessages.error.message, parseInt(inputs.asunto.attributes.maxlength.value) === inputs.asunto.value.length),
  mensaje: () => handleInput(inputs.mensaje, errorMessages.error.message, parseInt(inputs.mensaje.attributes.maxlength.value) === inputs.mensaje.value.length)
};

Object.keys(inputs).forEach(key => {
  inputs[key].addEventListener('input', inputHandlers[key]);
  inputs[key].addEventListener('input', checkInputs);
});

function checkInputs() {
  const areFull = Object.values(inputs).every(input => input.value);
  const areValid = Object.values(inputs).some(input => input.labels[0].nextElementSibling && input.labels[0].nextElementSibling.classList.contains('error'));
  boton.disabled = !(areFull && !areValid);
}

boton.addEventListener("click", (e) => {
  e.preventDefault();
  checkInputs();

  const existingResult = boton.nextElementSibling;
  if (existingResult && existingResult.nodeName === "P") {
    existingResult.remove();
  }

  const result = document.createElement('p');
  result.classList.add('result');
  result.textContent = 'informacion enviada ✓';

  boton.insertAdjacentElement('afterend', result);
});
