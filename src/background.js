chrome.runtime.onInstalled.addListener(() => {
  const scriptExec = (tabId, scriptName) => {
    return new Promise((resolve, reject) => {
      if (tabId && scriptName) {
        return chrome.scripting.executeScript({ target: {tabId: tabId}, files: [scriptName]}, (result) => {
          console.log(`${scriptName} executed`);
          resolve(result);
        });
      } else {
        reject(null);
      }
    });
  }

  const reloadTab = (tabId) => {
    return new Promise((resolve, reject) => {
        if (tabId) {
          return chrome.tabs.reload(tabId, (result) => {
            console.log(`tab ${tabId} reload`);
            resolve(result);
          });
        } else {
            reject(null);
        }
    });
  }

  const read = (key) => {
    return new Promise((resolve, reject) => {
      if (key != null) {
        chrome.storage.local.get(key, (item) => {
          console.log(`${key} item read`);
          resolve(item);
        });
      } else {
        reject(null);
      }
    });
  }

  chrome.storage.onChanged.addListener((changes, namespace) => {
    for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
      console.log(
        `Storage key "${key}" in namespace "${namespace}" changed.`,
        `Old value was "${oldValue}", new value is "${newValue}".`
      );
    }
  });

  chrome.action.onClicked.addListener((tab) => {
    chrome.storage.local.set({'clicked': true});

    let url = tab.url;

    console.log("tab is: " + url);

    chrome.storage.local.set({'clicked': true}, () => {
      console.log("CALLBACK 1: saved");
      return scriptExec(tab.id, 'before.js')
        .then(() => {
          console.log("PROMISE 2: before script");
          return reloadTab(tab.id);
        });
    });
  });

  chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
    console.log(`${tabId} updated`);

    if (changeInfo.status === 'complete') {
      return read('clicked')
          .then((result) => {
            if (result.clicked) {
              return scriptExec(tabId, 'after.js');
            }
          });
    }
  });
});



