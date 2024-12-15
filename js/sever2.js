const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt"); // Thư viện mã hóa mật khẩu
const fs = require("fs"); // Thư viện đọc/ghi file

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// Đường dẫn file lưu dữ liệu
const DATA_FILE = "./users.json";

// Đọc dữ liệu từ file
function readUsers() {
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify([])); // Tạo file nếu chưa tồn tại
  }
  const data = fs.readFileSync(DATA_FILE, "utf8");
  return JSON.parse(data);
}

// Ghi dữ liệu vào file
function writeUsers(users) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(users, null, 2)); // Lưu với định dạng đẹp
}

// Endpoint đăng ký
app.post("/register", (req, res) => {
  const { username, emailOrPhone, password } = req.body;

  // Kiểm tra dữ liệu đầu vào
  if (!username || !emailOrPhone || !password) {
    return res.status(400).json({ error: "Vui lòng nhập đầy đủ thông tin!" });
  }

  // Đọc dữ liệu hiện tại từ file
  const users = readUsers();

  // Kiểm tra xem username đã tồn tại chưa
  const existingUser = users.find((user) => user.username === username);
  if (existingUser) {
    return res.status(400).json({ error: "Tên người dùng đã tồn tại!" });
  }

  // Mã hóa mật khẩu
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      return res.status(500).json({ error: "Lỗi khi mã hóa mật khẩu!" });
    }

    // Thêm người dùng mới vào danh sách
    const newUser = { username, emailOrPhone, passwordHash: hash };
    users.push(newUser);

    // Ghi lại danh sách vào file
    writeUsers(users);

    res.status(201).json({ message: "Đăng ký thành công!" });
  });
});

// Endpoint đăng nhập
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  // Kiểm tra dữ liệu đầu vào
  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "Vui lòng nhập tên người dùng và mật khẩu!" });
  }

  // Đọc dữ liệu hiện tại từ file
  const users = readUsers();

  // Tìm người dùng theo username
  const user = users.find((user) => user.username === username);
  if (!user) {
    return res.status(401).json({ error: "Tên người dùng không tồn tại!" });
  }

  // So sánh mật khẩu
  bcrypt.compare(password, user.passwordHash, (err, isMatch) => {
    if (err) {
      return res.status(500).json({ error: "Lỗi khi xác minh mật khẩu!" });
    }

    if (!isMatch) {
      return res.status(401).json({ error: "Sai mật khẩu!" });
    }

    res.status(200).json({ message: "Đăng nhập thành công!" });
  });
});

// Bắt đầu server
app.listen(PORT, () => {
  console.log(`Server đang chạy tại http://localhost:${PORT}`);
});
