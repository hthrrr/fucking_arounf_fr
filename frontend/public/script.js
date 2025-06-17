


const list = document.getElementById("list-id")
const cart = document.getElementById("add-cart-text")
const addBtn = document.getElementById("add-cart-btn")

addBtn.addEventListener('click', (event) => {
  const li = addItem()
  const pendingElement = document.createElement('img')
  pendingElement.src = "/images/pending.png"
  li.appendChild(pendingElement)
  
  additemToDatabase(cart.value)
    .then(data => {
      console.log(data.message);
      pendingElement.remove()
    })
    .catch(err => {
      alert('Error: ' + err);
      li.remove()
    });
});

const addItem = () => {
  const name = cart.value
  if (name.trim() !== '') {
    const li = document.createElement('li')
    li.classList.add("list-item")
    
    // Create text node for the item name
    const textNode = document.createTextNode(name)
    li.appendChild(textNode)
    
    // Create delete button
    const deleteBtn = document.createElement('button')
    deleteBtn.innerText = "Delete"
    deleteBtn.classList.add("delete-btn")
    
    // Add event listener to delete button
    deleteBtn.addEventListener('click', () => {
      //add deleteItemFromDatabase call
      li.remove()
    })
    
    // Add button to list item
    li.appendChild(deleteBtn)
    
    // Add list item to the list
    list.appendChild(li)
    
    // Clear input
    cart.value = ''
    return li
  }
}

const deleteItemFromDatabase = (item) => {
  fetch('/api/delete', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ item })
  })
  .then(res => res.json())
  .then(data => {
    console.log(data.message);
  })
  .catch(err => {
    alert('Error: ' + err);
  });
}

const additemToDatabase = (item) => {
  // Simulate database latency (1 second)
  return fetch('/api/tasks', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ item })
  })
  .then(res => res.json())
  .then(data => {
    console.log(data.message);
    return data
  });
}

const createDropdown = () => {
  const dropdown = document.createElement('select')
  dropdown.classList.add("dropdown")

  const option1 = document.createElement('option')
  option1.value = "option1"
  option1.text = "Option 1"
  dropdown.appendChild(option1)

  const option2 = document.createElement('option')
  option2.value = "option2"
  option2.text = "Option 2"
  dropdown.appendChild(option2)

  const option3 = document.createElement('option')
  option3.value = "option3"
  option3.text = "Option 3"
  dropdown.appendChild(option3)

  return dropdown
}