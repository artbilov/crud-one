const createForm = addCreateForm()
const editForm = addEditForm()
const strList = addStrList()

refresh()
show(createForm)

createForm.onsubmit = handleCreate
editForm.onsubmit = handleUpdate
strList.onclick = handleClick
crud.onchange = refresh

function refresh() {
  const strings = crud.r()
  updateStrList(strings)
}

function addCreateForm() {
  const form = document.createElement('form')
  const input = document.createElement('input')
  const btn = document.createElement('button')

  form.className = 'create'
  form.hidden = true
  form.append(input, btn)
  btn.append('Add')
  document.body.append(form)

  return form
}

function addEditForm() {
  const form = document.createElement('form')
  const input = document.createElement('input')
  const saveBtn = document.createElement('button')
  const cancelBtn = document.createElement('button')

  form.hidden = true
  form.className = 'edit-form'
  saveBtn.className = 'save-btn'
  cancelBtn.className = 'cancel-btn'
  form.append(input, saveBtn, cancelBtn)
  saveBtn.append('Save')
  cancelBtn.append('Cancel')
  document.body.append(form)

  return form
}

function addStrList() {
  const ul = document.createElement('ul')

  document.body.append(ul)

  return ul
}

function updateStrList(arr) {
  const items = arr.map(createStrItem)

  strList.replaceChildren(...items)
}

function createStrItem(str) {
  const li = document.createElement('li')
  const editBtn = document.createElement('button')
  const delBtn = document.createElement('button')

  editBtn.className = 'edit-btn'
  delBtn.className = 'del-btn'
  delBtn.append('❌')
  editBtn.append('📝')

  li.append(delBtn, editBtn, str)

  return li
}

function show(form) {
  form.hidden = false
}

function hide(form) {
  form.hidden = true
}

function handleCreate(e) {
  e.preventDefault()

  const str = createForm[0].value.trim()

  if (!str) return

  crud.c(str)
  createForm.reset()

  refresh()
}

function handleUpdate(e) {
  e.preventDefault()
  const btn = e.submitter

  if (btn.className == 'save-btn') {
    const oldStr = editForm[0].getAttribute('value')
    const newStr = editForm[0].value

    crud.u(oldStr, newStr)

    refresh()
  }
  disableEditMode()
}

function handleClick(e) {
  const btn = e.target.closest('button')

  if (!btn) return

  if (btn.className == 'edit-btn') {
    const str = btn.nextSibling.textContent
    enableEditMode(str)
  }

  if (btn.className == 'del-btn') {
    const str = btn.nextSibling.nextSibling.textContent
    removeItem(str)
  }
}

function removeItem(str) {
  crud.d(str)

  refresh()
}

function enableEditMode(str) {
  hide(createForm)
  show(editForm)
  editForm[0].setAttribute('value', str)
}

function disableEditMode() {
  editForm.reset()
  hide(editForm)
  show(createForm)
}