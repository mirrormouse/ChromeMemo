let minimizeBtn = document.getElementById('minimizeBtn');
let list = document.getElementById('list');
let addBtn = document.getElementById('addBtn');


addBtn.addEventListener('click', function() {
  // TODOを追加する
  let input = document.querySelector('#add input');
  let title = input.value;
  if (title) {
    chrome.storage.local.get(['todos'], function(result) {
      let todos = result.todos || [];
      todos.push({ title: title });
      chrome.storage.local.set({ todos: todos }, function() {
        input.value = '';
        renderList(todos);
      });
    });
  }
});

function renderList(todos) {
  let ul = list.querySelector('ul');
  ul.innerHTML = '';
  for (let todo of todos) {
    let li = document.createElement('li');
    li.textContent = todo.title;
    li.addEventListener('click', function() {
      // TODOを表示する
      alert(todo.title);
    });
    ul.appendChild(li);
  }
}

// 初期化処理
chrome.storage.local.get(['todos'], function(result) {
  let todos = result.todos || [];
  renderList(todos);
});

function renderList(todos) {
    let ul = list.querySelector('ul');
    ul.innerHTML = '';
    for (let todo of todos) {
      let li = document.createElement('li');
      li.textContent = todo.title;
      li.addEventListener('click', function() {
        // TODOを表示する
        alert(todo.title);
      });
      let deleteBtn = document.createElement('button');
      deleteBtn.textContent = '×';
      deleteBtn.addEventListener('click', function(event) {
        event.stopPropagation();
        chrome.runtime.sendMessage({ action: 'deleteTodo', title: todo.title }, function(response) {
          if (response.success) {
            let index = todos.findIndex(t => t.title === todo.title);
            if (index >= 0) {
              todos.splice(index, 1);
              renderList(todos);
            }
          } else {
            alert('削除に失敗しました');
          }
        });
      });
      li.appendChild(deleteBtn);
      ul.appendChild(li);
    }
  }
  
