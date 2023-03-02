chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.local.set({ todos: [] });
  });
  
  chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.action === 'deleteTodo') {
      chrome.storage.local.get(['todos'], function(result) {
        let todos = result.todos || [];
        let index = todos.findIndex(todo => todo.title === message.title);
        if (index >= 0) {
          todos.splice(index, 1);
          chrome.storage.local.set({ todos: todos }, function() {
            sendResponse({ success: true });
          });
        } else {
          sendResponse({ success: false });
        }
      });
      return true;
    }
  });
  