let intervalId;

chrome.runtime.onMessage.addListener((message) => {
  if (message.action === "start") {
    const interval = message.interval * 1000;
    clearInterval(intervalId);
    intervalId = setInterval(() => {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs.length > 0 && tabs[0].id !== undefined) {
          chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            func: () => window.location.reload(),
          });
        } else {
          console.error("No active tab found or tab ID is undefined.");
        }
      });
    }, interval);
  } else if (message.action === "stop") {
    clearInterval(intervalId);
  }
});