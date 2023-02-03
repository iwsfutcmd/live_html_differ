requirejs(["htmldiff"], function (diff) {
  const diffContainers = {
    old: document.createElement("div"),
    new: document.createElement("div"),
    diff: document.createElement("div"),
  };
  [...document.body.childNodes].forEach((node) => diffContainers.new.appendChild(node));
  const oldIframe = document.createElement("iframe");
  oldIframe.classList.add("diff-iframe");
  oldIframe.src = original_file_url;
  diffContainers.old.appendChild(oldIframe);
  const switcherBar = document.createElement("div");
  switcherBar.classList.add("diff-switcher-bar");
  let buttons = {};
  ["old", "new", "diff"].forEach((t) => {
    document.body.appendChild(diffContainers[t]);
    const label = document.createElement("label");
    label.classList.add("diff-switcher");
    buttons[t] = document.createElement("input");
    buttons[t].type = "radio";
    buttons[t].name = "diff-switcher";
    buttons[t].addEventListener("change", (e) => {
      ["old", "new", "diff"].forEach((tag) => (diffContainers[tag].style.display = "none"));
      diffContainers[t].style.display = "block";
    });
    label.appendChild(buttons[t]);
    const labelText = document.createElement("span");
    labelText.innerText = t;
    label.appendChild(labelText);
    switcherBar.appendChild(label);
  });
  buttons.diff.addEventListener("change", () => {
    diffContainers.diff.innerHTML = diff(oldIframe.contentDocument.body.innerHTML, diffContainers.new.innerHTML, "diff-change");
  });
  document.body.prepend(switcherBar);
  const differStyle = document.createElement("style");
  differStyle.innerHTML = `
.diff-iframe {
  border: none;
  inline-size: 100%;
  block-size: 100vh;
  position: absolute;
  left: 0;
}
.diff-switcher-bar {
  position: sticky;
  top: 0;
}
.diff-switcher input {
  appearance: none;
  position: absolute;
  top: 0;
  left: 0;
  visibility: hidden;
  pointer-events: none;
}
.diff-switcher span {
  padding: 11px 21px;
  border: 1px solid #ccc;
  display: inline-block;
  color: #202020;
  border-radius: 6px;
  margin: 7px;
  background: #f5f5f5;
  user-select: none;
}
.diff-switcher input:checked + span {
  box-shadow: inset 1px 2px 5px #777;
  transform: translateY(1px);
  background: #e5e5e5;
}
.diff-switcher {
  cursor: pointer;
}
`;
  document.body.appendChild(differStyle);

  buttons.new.dispatchEvent(new Event("change"));
  buttons.new.checked = true;
});
