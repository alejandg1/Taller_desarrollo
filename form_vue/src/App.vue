<template>
  <router-view />
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
}

.page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
}

.card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.15);
  padding: 32px;
  width: 100%;
  max-width: 600px;
}

h2 {
  color: #333;
  margin-bottom: 24px;
  text-align: center;
}

form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

label {
  color: #555;
  font-weight: 500;
  font-size: 14px;
}

input, select {
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  transition: border 0.3s;
}

input:focus, select:focus {
  outline: none;
  border-color: #667eea;
}

button {
  padding: 12px 24px;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s;
}

button:hover {
  background: #5568d3;
}

button.logout {
  background: #e74c3c;
}

button.logout:hover {
  background: #c0392b;
}

button.btn-edit {
  background: #3498db;
  padding: 8px 16px;
  font-size: 12px;
}

button.btn-edit:hover {
  background: #2980b9;
}

button.btn-del {
  background: #e74c3c;
  padding: 8px 16px;
  font-size: 12px;
  margin-left: 8px;
}

button.btn-del:hover {
  background: #c0392b;
}

.actions {
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
}

.link {
  text-align: center;
  margin-top: 16px;
  color: #666;
  font-size: 14px;
}

.link a {
  color: #667eea;
  text-decoration: none;
  font-weight: 600;
}

.link a:hover {
  text-decoration: underline;
}

.error {
  color: #e74c3c;
  background: #fadbd8;
  padding: 12px;
  border-radius: 6px;
  font-size: 14px;
  margin-top: 12px;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

th, td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #eee;
}

th {
  background: #f8f9fa;
  color: #555;
  font-weight: 600;
  font-size: 14px;
}

td {
  color: #666;
  font-size: 14px;
}

tr:hover {
  background: #f8f9fa;
}
</style>
