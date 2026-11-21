type FormControl = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

function isControl(element: Element): element is FormControl {
  return (
    element instanceof HTMLInputElement ||
    element instanceof HTMLTextAreaElement ||
    element instanceof HTMLSelectElement
  );
}

function showValidity(control: FormControl): boolean {
  const errorId = control.getAttribute("aria-describedby");
  const error = errorId ? document.getElementById(errorId) : null;
  const valid = control.checkValidity();

  if (valid) {
    control.removeAttribute("aria-invalid");
  } else {
    control.setAttribute("aria-invalid", "true");
  }

  if (error) {
    error.textContent = valid ? "" : control.validationMessage;
    error.hidden = valid;
  }

  return valid;
}

export function initContactForm(form: HTMLFormElement): void {
  const controls = [...form.elements].filter(
    (element): element is FormControl =>
      isControl(element) && element.hasAttribute("aria-describedby"),
  );
  const submit = form.querySelector<HTMLButtonElement>('[type="submit"]');

  form.noValidate = true;

  controls.forEach((control) => {
    control.addEventListener("blur", () => {
      if (control.value !== "") {
        showValidity(control);
      }
    });

    control.addEventListener("input", () => {
      if (control.hasAttribute("aria-invalid")) {
        showValidity(control);
      }
    });
  });

  form.addEventListener("submit", (event) => {
    if (submit?.getAttribute("aria-busy") === "true") {
      event.preventDefault();
      return;
    }

    const invalid = controls.filter((control) => !showValidity(control));

    if (invalid.length > 0) {
      event.preventDefault();
      invalid[0]?.focus();
      return;
    }

    if (submit) {
      submit.setAttribute("aria-busy", "true");
      submit.setAttribute("aria-disabled", "true");
      submit.textContent = form.dataset.sendingLabel ?? submit.textContent;
    }
  });
}
