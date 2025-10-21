const form = document.getElementById("contactForm");
const username = document.getElementById("username");
const email = document.getElementById("email");
const subject = document.getElementById("subject");
const message = document.getElementById("message");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  validateInputs();
});

const setError = (element, messages) => {
  if (!element) return;
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector(".error");
  const errorId = element.getAttribute("aria-describedby");

  if (errorDisplay && errorId) {
    errorDisplay.id = errorId;
    errorDisplay.innerText = messages;
  }
  inputControl.classList.add("error");
  inputControl.classList.remove("success");
};

const setSuccess = (element) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector(".error");

  if (errorDisplay) {
    errorDisplay.innerText = "";
  }
  inputControl.classList.add("success");
  inputControl.classList.remove("error");
};

const isValidEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};

const validateInputs = () => {
  const successDiv = document.getElementById("success");
  if (successDiv) successDiv.textContent = "";

  const usernameValue = username?.value?.trim() || "";
  const emailValue = email?.value?.trim() || "";
  const subjectValue = subject?.value?.trim() || "";
  const messageValue = message?.value?.trim() || "";

  let isValid = true;

  if (usernameValue === "") {
    setError(username, "Name is required");
    isValid = false;
  } else {
    setSuccess(username);
  }

  if (emailValue === "") {
    setError(email, "Email is required");
    isValid = false;
  } else if (!isValidEmail(emailValue)) {
    setError(email, "please enter a valid email (example: you@example.com)");
    isValid = false;
  } else {
    setSuccess(email);
  }

  if (subjectValue === "") {
    setError(subject, "Subject is required");
    isValid = false;
  } else {
    setSuccess(subject);
  }

  if (messageValue === "") {
    setError(message, "Message is required");
    isValid = false;
  } else if (messageValue.length < 10) {
    setError(message, "Message must be at least 10 characters");
    isValid = false;
  } else {
    setSuccess(message);
  }

  if (isValid && form) {
    const successDiv = document.getElementById("success");
    if (successDiv) {
      successDiv.textContent = "Message sent successfully!";
      form.reset();
    }
  }
};
