function updateOrderStatus(button, newStatus) {
  const row = button.closest("tr");
  row.cells[3].innerText = newStatus;
  alert("Trạng thái đơn hàng đã được cập nhật!");
}

function cancelOrder(button) {
  const row = button.closest("tr");
  row.remove();
  alert("Đơn hàng đã bị hủy!");
}
function addGame(event) {
  event.preventDefault();
  const name = document.getElementById("game-name").value;
  const description = document.getElementById("game-description").value;
  const price = document.getElementById("game-price").value;

  const gameList = document.getElementById("game-list-ul");
  const li = document.createElement("li");
  li.innerText = `${name} - ${description} - ${price} VND`;
  gameList.appendChild(li);

  alert("Game mới đã được thêm thành công!");
  event.target.reset();
}
function editCategory(button) {
  const row = button.closest("tr");
  const categoryName = row.cells[1].innerText;
  const newName = prompt("Nhập tên danh mục mới:", categoryName);
  if (newName) {
    row.cells[1].innerText = newName;
    alert("Danh mục đã được cập nhật!");
  }
}

function deleteCategory(button) {
  const row = button.closest("tr");
  row.remove();
  alert("Danh mục đã bị xóa!");
}

function addCategory() {
  const categoryName = prompt("Nhập tên danh mục mới:");
  if (categoryName) {
    const table = document
      .getElementById("category-management")
      .getElementsByTagName("tbody")[0];
    const newRow = table.insertRow();
    newRow.innerHTML = `
            <td>#${Date.now()}</td>
            <td>${categoryName}</td>
            <td>
                <button onclick="editCategory(this)">Sửa</button>
                <button onclick="deleteCategory(this)">Xóa</button>
            </td>`;
    alert("Danh mục mới đã được thêm!");
  }
}
// Sử dụng thư viện Chart.js để hiển thị biểu đồ
const ctx = document.getElementById("sales-chart").getContext("2d");
const chart = new Chart(ctx, {
  type: "bar",
  data: {
    labels: ["Tháng 11", "Tháng 12"],
    datasets: [
      {
        label: "Doanh thu (VND)",
        data: [50000000, 75000000],
        backgroundColor: ["#007bff", "#28a745"],
      },
    ],
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
    },
  },
});
function replyFeedback(button) {
  const row = button.closest("tr");
  const feedback = row.cells[2].innerText;
  const reply = prompt(`Trả lời phản hồi: "${feedback}"`);
  if (reply) {
    alert("Phản hồi đã được gửi!");
  }
}

function deleteFeedback(button) {
  const row = button.closest("tr");
  row.remove();
  alert("Phản hồi đã bị xóa!");
}
function editUser(button) {
  const row = button.closest("tr");
  const currentName = row.cells[1].innerText;
  const currentEmail = row.cells[2].innerText;

  const newName = prompt("Nhập tên mới:", currentName);
  const newEmail = prompt("Nhập email mới:", currentEmail);

  if (newName) row.cells[1].innerText = newName;
  if (newEmail) row.cells[2].innerText = newEmail;

  alert("Thông tin người dùng đã được cập nhật!");
}

function deleteUser(button) {
  const row = button.closest("tr");
  row.remove();
  alert("Người dùng đã bị xóa!");
}

function addUser() {
  const name = prompt("Nhập tên người dùng mới:");
  const email = prompt("Nhập email người dùng mới:");

  if (name && email) {
    const table = document
      .getElementById("user-management")
      .querySelector("tbody");
    const newRow = table.insertRow();
    newRow.innerHTML = `
            <td>#${Date.now()}</td>
            <td>${name}</td>
            <td>${email}</td>
            <td>
                <button onclick="editUser(this)">Sửa</button>
                <button onclick="deleteUser(this)">Xóa</button>
            </td>`;
    alert("Người dùng mới đã được thêm!");
  }
}
function addNotification() {
  const message = prompt("Nhập nội dung thông báo mới:");
  if (message) {
    const notifications = document.getElementById("system-notifications");
    const newNotification = document.createElement("li");
    newNotification.className = "notification";
    newNotification.innerText = `[${new Date()
      .toISOString()
      .slice(0, 10)}] ${message}`;
    notifications.prepend(newNotification);
    alert("Thông báo mới đã được thêm!");
  }
}
function sendSupportRequest(event) {
  event.preventDefault();
  const message = document.getElementById("support-message").value;

  if (message) {
    const responseDiv = document.getElementById("support-response");
    responseDiv.innerText =
      "Yêu cầu hỗ trợ của bạn đã được gửi. Chúng tôi sẽ liên hệ lại sớm nhất!";
    event.target.reset();
  }
}
function logout() {
  const confirmLogout = confirm("Bạn có chắc chắn muốn đăng xuất không?");
  if (confirmLogout) {
    alert("Bạn đã đăng xuất thành công!");
    window.location.href = "/login.html"; // Chuyển hướng đến trang đăng nhập
  }
}
function viewCustomerDetails(button) {
  const row = button.closest("tr");
  const customerName = row.cells[1].innerText;
  const customerEmail = row.cells[2].innerText;

  alert(`Chi tiết khách hàng:\nTên: ${customerName}\nEmail: ${customerEmail}`);
}
