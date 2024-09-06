Object.defineProperty(String.prototype, "capitalize", {
  value: function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
  },
  enumerable: false,
});

const warningBanner = document.getElementsByClassName("warning")[0];
addCloseEventToWarningBanner(warningBanner);

function addCloseEventToWarningBanner(element) {
  const closeImg = element.querySelector("img[src*=close]");
  closeImg.addEventListener("click", (event) => {
    event.target.closest(".warning").classList.add("hidden");
  });
}

const bins = document.querySelectorAll("div[role=listitem] > img");

bins.forEach((element) => addRemoveEventToBin(element));

function addRemoveEventToBin(element) {
  element.addEventListener("click", (event) => {
    warningBanner.classList.remove("hidden");

    const item = warningBanner.querySelector("span.item");
    const listitem = event.target.closest("div[role=listitem]");
    const spanText = listitem.querySelector("& > span").textContent;
    item.textContent = `'${spanText}'`;

    event.target.closest("div[role=listitem]").remove();
  });
}

const form = document.querySelector("form");

form.onsubmit = (event) => {
  event.preventDefault();

  const input = document.querySelector(".input-wrapper > div > input");
  const inputWarning = document.querySelector(
    ".input-wrapper > span.input-warning"
  );

  if (input.value.trim() == "") {
    input.classList.add("warning-border-color");
    inputWarning.classList.remove("hidden");
    input.value = "";
    return;
  } else {
    input.classList.remove("warning-border-color");
    inputWarning.classList.add("hidden");
  }

  const list = document.querySelector("div[role=list]");

  const listitem = document.createElement("div");
  listitem.setAttribute("role", "listitem");

  const listitemCheckbox = document.createElement("input");
  listitemCheckbox.setAttribute("type", "checkbox");
  listitem.append(listitemCheckbox);

  const listitemSpan = document.createElement("span");
  listitemSpan.textContent = input.value.capitalize();
  listitem.append(listitemSpan);

  const listitemBinImg = document.createElement("img");
  listitemBinImg.setAttribute("src", "./assets/rubbish-bin.svg");
  listitemBinImg.setAttribute("alt", "lixeira");
  addRemoveEventToBin(listitemBinImg);
  listitem.append(listitemBinImg);

  list.prepend(listitem);

  input.value = "";
};
