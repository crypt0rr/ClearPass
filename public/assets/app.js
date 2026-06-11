const CHARACTER_GROUPS = {
  lower: "abcdefghjkmnpqrstuvwxyz",
  upper: "ABCDEFGHJKLMNPQRSTUVWXYZ",
  numbers: "23456789",
  symbols: "!?",
};

const form = document.querySelector("#generator-form");
const results = document.querySelector("#results");
const status = document.querySelector("#status");
const lengthInput = document.querySelector("#length");
const countInput = document.querySelector("#count");
const entropy = document.querySelector("#entropy");

function clampNumber(value, min, max, fallback) {
  const number = Number.parseInt(value, 10);

  if (Number.isNaN(number)) {
    return fallback;
  }

  return Math.min(Math.max(number, min), max);
}

function getRandomIndex(max) {
  const randomValue = new Uint32Array(1);
  const limit = Math.floor(0x100000000 / max) * max;

  do {
    crypto.getRandomValues(randomValue);
  } while (randomValue[0] >= limit);

  return randomValue[0] % max;
}

function getSelectedGroups() {
  return [...form.querySelectorAll("input[name='group']:checked")].map(
    (input) => CHARACTER_GROUPS[input.value]
  );
}

function shuffleSecurely(characters) {
  const shuffled = [...characters];

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const randomIndex = getRandomIndex(index + 1);
    [shuffled[index], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[index]];
  }

  return shuffled.join("");
}

function generatePassword(length, selectedGroups) {
  const characters = selectedGroups.join("");
  const passwordCharacters = selectedGroups.map(
    (group) => group[getRandomIndex(group.length)]
  );

  for (let index = passwordCharacters.length; index < length; index += 1) {
    passwordCharacters.push(characters[getRandomIndex(characters.length)]);
  }

  return shuffleSecurely(passwordCharacters);
}

function updateEntropy() {
  const selectedGroups = getSelectedGroups();
  const characters = selectedGroups.join("");
  const length = clampNumber(lengthInput.value, 8, 128, 20);

  if (characters.length === 0) {
    entropy.textContent = "Choose at least one group to estimate entropy.";
    return;
  }

  const bits = Math.round(length * Math.log2(characters.length));
  entropy.textContent = `About ${bits} bits of entropy with the current settings.`;
}

function setStatus(message, isError = false) {
  status.textContent = message;
  status.classList.toggle("error", isError);
}

function copyWithFallback(password) {
  const textarea = document.createElement("textarea");
  textarea.value = password;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.top = "-1000px";
  document.body.append(textarea);
  textarea.select();

  const copied = document.execCommand("copy");
  textarea.remove();

  if (!copied) {
    throw new Error("Fallback copy failed");
  }
}

async function copyPassword(password, button) {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(password);
    } else {
      copyWithFallback(password);
    }

    button.textContent = "Copied";
    button.classList.add("copied");
    setTimeout(() => {
      button.textContent = "Copy";
      button.classList.remove("copied");
    }, 1400);
  } catch {
    setStatus("Copy failed. Select the password text instead.", true);
  }
}

function renderPasswords(passwords) {
  results.replaceChildren();

  passwords.forEach((password) => {
    const row = document.createElement("div");
    row.className = "password-row";

    const passwordText = document.createElement("span");
    passwordText.className = "password";
    passwordText.textContent = password;

    const copyButton = document.createElement("button");
    copyButton.className = "copy-button";
    copyButton.type = "button";
    copyButton.textContent = "Copy";
    copyButton.addEventListener("click", () => copyPassword(password, copyButton));

    row.append(passwordText, copyButton);
    results.append(row);
  });
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const selectedGroups = getSelectedGroups();
  const length = clampNumber(lengthInput.value, 8, 128, 20);
  const count = clampNumber(countInput.value, 1, 20, 5);

  lengthInput.value = length;
  countInput.value = count;

  if (selectedGroups.length === 0) {
    setStatus("Choose at least one character group.", true);
    updateEntropy();
    return;
  }

  const passwords = Array.from({ length: count }, () =>
    generatePassword(length, selectedGroups)
  );

  renderPasswords(passwords);
  updateEntropy();
  setStatus(`Generated ${count} password${count === 1 ? "" : "s"}.`);
});

form.addEventListener("input", updateEntropy);
updateEntropy();
