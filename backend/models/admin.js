const express = require('express');
const router = express.Router();

document.addEventListener('DOMContentLoaded', () => {
  loadUsers();
  loadMenus();
  loadOrders();

  document.getElementById('new-user-form').addEventListener('submit', addUser);
  document.getElementById('new-menu-form').addEventListener('submit', addMenu);
});

async function loadUsers() {
  const response = await fetch('/users');
  const users = await response.json();
  const userList = document.getElementById('user-list');
  userList.innerHTML = '';
  users.forEach(user => {
    const userDiv = document.createElement('div');
    userDiv.classList.add('user');
    if (!user.active) {
      userDiv.classList.add('inactive');
    }
    userDiv.innerHTML = `
      <span>${user.username} (${user.role})</span>
      <button onclick="toggleUser(${user.id})">${user.active ? 'Deactivate' : 'Activate'}</button>
    `;
    userList.appendChild(userDiv);
  });
}

async function loadMenus() {
  const response = await fetch('/menus');
  const menus = await response.json();
  const menuList = document.getElementById('menu-list');
  menuList.innerHTML = '';
  menus.forEach(menu => {
    const menuDiv = document.createElement('div');
    menuDiv.classList.add('menu');
    menuDiv.innerHTML = `
      <span>${menu.name} - $${menu.price} (${menu.discount}% off)</span>
      <button onclick="deleteMenu(${menu.id})">Delete</button>
      <button onclick="showEditMenuForm(${menu.id}, '${menu.name}', ${menu.price}, ${menu.discount})">Edit</button>
    `;
    menuList.appendChild(menuDiv);
  });
}

async function loadOrders() {
  const response = await fetch('/orders');
  const orders = await response.json();
  const orderList = document.getElementById('order-list');
  orderList.innerHTML = '';
  orders.forEach(order => {
    const orderDiv = document.createElement('div');
    orderDiv.classList.add('order');
    orderDiv.innerHTML = `
      <span>${order.user}: ${order.items.join(', ')} - ${order.status}</span>
      <button onclick="completeOrder(${order.id})">Mark as Completed</button>
    `;
    orderList.appendChild(orderDiv);
  });
}

function showAddUserForm() {
  document.getElementById('add-user-form').style.display = 'block';
}

async function addUser(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const newUser = {
    username: formData.get('username'),
    password: formData.get('password'),
    role: formData.get('role'),
  };
  const response = await fetch('/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newUser)
  });
  if (response.ok) {
    loadUsers();
    e.target.reset();
    document.getElementById('add-user-form').style.display = 'none';
  }
}

async function toggleUser(userId) {
  const response = await fetch(`/users/${userId}`, {
    method: 'PUT',
  });
  if (response.ok) {
    loadUsers();
  }
}

function showAddMenuForm() {
  document.getElementById('add-menu-form').style.display = 'block';
}

async function addMenu(e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const newMenu = {
    name: formData.get('name'),
    price: formData.get('price'),
    discount: formData.get('discount'),
  };
  const response = await fetch('/menus', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newMenu)
  });
  if (response.ok) {
    loadMenus();
    e.target.reset();
    document.getElementById('add-menu-form').style.display = 'none';
  }
}

async function deleteMenu(menuId) {
  const response = await fetch(`/menus/${menuId}`, {
    method: 'DELETE',
  });
  if (response.ok) {
    loadMenus();
  }
}

function showEditMenuForm(id, name, price, discount) {
  const editForm = document.createElement('form');
  editForm.innerHTML = `
    <input type="text" name="name" value="${name}" required>
    <input type="number" name="price" value="${price}" required>
    <input type="number" name="discount" value="${discount}" required>
    <button type="submit">Update Menu</button>
  `;
  editForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const updatedMenu = {
      name: formData.get('name'),
      price: formData.get('price'),
      discount: formData.get('discount'),
    };
    const response = await fetch(`/menus/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedMenu)
    });
    if (response.ok) {
      loadMenus();
    }
  });
  const menuList = document.getElementById('menu-list');
  const menuDiv = menuList.querySelector(`.menu[data-id="${id}"]`);
  menuDiv.appendChild(editForm);
}

async function completeOrder(orderId) {
  const response = await fetch(`/orders/${orderId}`, {
    method: 'PUT',
  });
  if (response.ok) {
    loadOrders();
  }
}

async function loadTableData() {
  try {
    // Fetch data from your backend (adjust the URL as needed)
    const [usersResponse, menusResponse, ordersResponse] = await Promise.all([
      fetch('/users'),
      fetch('/menus'),
      fetch('/orders')
    ]);

    const users = await usersResponse.json();
    const menus = await menusResponse.json();
    const orders = await ordersResponse.json();

    const tableBody = document.getElementById('data-table-body');
    tableBody.innerHTML = ''; // Clear existing rows

    orders.forEach(order => {
      const user = users.find(u => u.id === order.userId);
      const menuItems = order.items.map(itemId => menus.find(m => m.id === itemId).name).join(', ');

      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${user.username}</td>
        <td>${menuItems}</td>
        <td>Order #${order.id}</td>
      `;
      tableBody.appendChild(row);
    });
  } catch (error) {
    console.error('Error loading table data:', error);
  }
}

const registerBtn = document.getElementById('register-btn');
  const deactivateBtn = document.getElementById('deactivate-btn');

  registerBtn.addEventListener('click', () => {
    // Enviar solicitud al backend para registrar el usuario
    fetch('/register_user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userId: 1
      })
    })
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));
  });

  deactivateBtn.addEventListener('click', () => {
    // Enviar solicitud al backend para desactivar el usuario
    fetch('/deactivate_user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userId: 1
      })
    })
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));
  });

  router.post('/register_user', (req, res) => {
  });
  
  router.post('/deactivate_user', (req, res) => {
  });
  
  module.exports = router;


