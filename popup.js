document.getElementById("start").addEventListener("click", () => {
  const interval = parseInt(document.getElementById("interval").value);
  chrome.storage.sync.set({ interval });
  chrome.runtime.sendMessage({ action: "start", interval });
});

document.getElementById("stop").addEventListener("click", () => {
  chrome.runtime.sendMessage({ action: "stop" });
});