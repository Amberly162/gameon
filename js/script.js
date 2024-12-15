document.addEventListener("DOMContentLoaded", function () {
  const params = new URLSearchParams(window.location.search);
  const gameFile = params.get("game");
  const gameFrame = document.getElementById("game-frame");

  if (gameFile) {
    gameFrame.src = `games/${gameFile}`;
  } else {
    gameFrame.src = "error.html"; // Hiển thị trang lỗi nếu không có game.
  }
});
// DOM Elements
const favoriteBtn = document.querySelector(".favorite-btn");
const gameInfo = document.querySelector(".game-info");

// Simulate data (you can replace it with real backend data)
let gameData = {
  id: 2340, // Unique ID for the game
  name: "Đặt Bom It 5",
  isFavorite: false,
  playCount: 1234567, // Example play count
};

// Function to update play count (simulate backend request)
function incrementPlayCount() {
  gameData.playCount++;
  const playCountElement = gameInfo.querySelector("p:nth-of-type(2)");
  playCountElement.textContent = `Lượt chơi: ${gameData.playCount.toLocaleString()}`;
}

// Function to toggle favorite state
function toggleFavorite() {
  gameData.isFavorite = !gameData.isFavorite;
  favoriteBtn.textContent = gameData.isFavorite
    ? "💔 Bỏ yêu thích"
    : "❤️ Yêu thích";
  showNotification(
    gameData.isFavorite
      ? "Đã thêm vào danh sách yêu thích!"
      : "Đã bỏ khỏi danh sách yêu thích!"
  );
}

// Function to show a temporary notification
function showNotification(message) {
  const notification = document.createElement("div");
  notification.className = "notification";
  notification.textContent = message;
  document.body.appendChild(notification);

  // Remove the notification after 2 seconds
  setTimeout(() => {
    document.body.removeChild(notification);
  }, 2000);
}

// Initialize the page
function initPage() {
  incrementPlayCount(); // Simulate a play count increment on page load
  favoriteBtn.addEventListener("click", toggleFavorite); // Attach favorite button handler
}

// Run the initialization
initPage();
// Giả sử bạn lưu thông tin người dùng vào localStorage (có thể thay bằng backend sau này)

const loginForm = document.getElementById("login-form");
const registerForm = document.getElementById("register-form");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  // Kiểm tra thông tin người dùng trong localStorage (hoặc backend)
  if (localStorage.getItem(username) === password) {
    alert("Đăng nhập thành công!");
    // Chuyển hướng đến trang game hoặc trang chủ
    window.location.href = "index2.html";
  } else {
    alert("Sai tên đăng nhập hoặc mật khẩu.");
  }
});

registerForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const username = document.getElementById("new-username").value;
  const password = document.getElementById("new-password").value;

  // Lưu thông tin người dùng vào localStorage
  localStorage.setItem(username, password);
  alert("Đăng ký thành công! Bạn có thể đăng nhập ngay.");
  window.location.href = "singandlogin.html";
});
// Lưu trạng thái yêu thích game vào localStorage (có thể thay thế bằng backend sau này)
function toggleFavorite() {
  const username = localStorage.getItem("currentUsername"); // Tên người dùng đăng nhập
  let favorites =
    JSON.parse(localStorage.getItem(username + "_favorites")) || [];

  if (gameData.isFavorite) {
    gameData.isFavorite = false;
    favorites = favorites.filter((game) => game.id !== gameData.id);
  } else {
    gameData.isFavorite = true;
    favorites.push(gameData);
  }

  // Cập nhật lại thông tin yêu thích
  localStorage.setItem(username + "_favorites", JSON.stringify(favorites));

  favoriteBtn.textContent = gameData.isFavorite
    ? "💔 Bỏ yêu thích"
    : "❤️ Yêu thích";
  showNotification(
    gameData.isFavorite
      ? "Đã thêm vào danh sách yêu thích!"
      : "Đã bỏ khỏi danh sách yêu thích!"
  );
}
document.getElementById("submit-comment").addEventListener("click", () => {
  const comment = document.getElementById("comment").value;
  const commentsList = document.getElementById("comments-list");

  // Lưu bình luận vào localStorage (hoặc backend)
  let comments = JSON.parse(localStorage.getItem("comments")) || [];
  comments.push(comment);
  localStorage.setItem("comments", JSON.stringify(comments));

  // Hiển thị bình luận
  commentsList.innerHTML = comments.map((c) => `<p>${c}</p>`).join("");
});

document.getElementById("rate-game").addEventListener("click", () => {
  const rating = Math.floor(Math.random() * 5) + 1; // Tạo một điểm đánh giá ngẫu nhiên từ 1 đến 5
  document.getElementById("rating").textContent = rating;

  // Lưu điểm đánh giá vào localStorage
  localStorage.setItem("gameRating", rating);
});
function submitReview() {
  alert("Cảm ơn bạn đã đánh giá!");
}
