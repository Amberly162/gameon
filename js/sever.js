const mysql = require("mysql");

// Cấu hình kết nối MySQL
const db = mysql.createConnection({
  host: "localhost", // Địa chỉ MySQL (thường là localhost)
  user: "root", // Tài khoản MySQL
  password: "", // Mật khẩu MySQL (để trống nếu không có)
  database: "user_auth", // Tên cơ sở dữ liệu
});
const bcrypt = require("bcrypt"); // Thư viện mã hóa mật khẩu

// Endpoint đăng ký
app.post("/register", (req, res) => {
  const { username, emailOrPhone, password } = req.body;

  // Kiểm tra thông tin
  if (!username || !emailOrPhone || !password) {
    return res.status(400).json({ error: "Vui lòng nhập đầy đủ thông tin!" });
  }

  // Mã hóa mật khẩu
  const saltRounds = 10;
  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      return res.status(500).json({ error: "Lỗi khi mã hóa mật khẩu!" });
    }

    // Lưu thông tin vào cơ sở dữ liệu
    const sql =
      "INSERT INTO users (username, email_or_phone, password_hash) VALUES (?, ?, ?)";
    db.query(sql, [username, emailOrPhone, hash], (err, result) => {
      if (err) {
        if (err.code === "ER_DUP_ENTRY") {
          return res.status(400).json({ error: "Tên người dùng đã tồn tại!" });
        }
        return res.status(500).json({ error: "Lỗi khi thêm dữ liệu!" });
      }
      res.status(201).json({ message: "Đăng ký thành công!" });
    });
  });
});

// Kết nối
db.connect((err) => {
  if (err) {
    console.error("Kết nối MySQL thất bại:", err);
  } else {
    console.log("Kết nối MySQL thành công!");
  }
});

// Hàm kiểm tra email hoặc số điện thoại
function isValidEmailOrPhone(input) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Kiểm tra email
  const phoneRegex = /^[0-9]{10,11}$/; // Kiểm tra số điện thoại
  return emailRegex.test(input) || phoneRegex.test(input);
}

// Đăng ký
document
  .getElementById("register-form")
  .addEventListener("submit", async (event) => {
    event.preventDefault(); // Ngăn reload trang

    // Lấy giá trị từ các trường nhập
    const username = document.getElementById("register-username").value;
    const emailOrPhone = document.getElementById("register-email").value;
    const password = document.getElementById("register-password").value;
    const confirmPassword = document.getElementById(
      "register-confirm-password"
    ).value;
    const errorDiv = document.getElementById("register-error");

    // Kiểm tra dữ liệu
    if (!isValidEmailOrPhone(emailOrPhone)) {
      errorDiv.textContent = "Email hoặc số điện thoại không hợp lệ!";
      return;
    }

    if (password !== confirmPassword) {
      errorDiv.textContent = "Mật khẩu và xác nhận mật khẩu không khớp!";
      return;
    }

    errorDiv.textContent = ""; // Xóa lỗi nếu có

    // Gửi dữ liệu tới server
    try {
      const response = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, emailOrPhone, password }),
      });

      const result = await response.json();
      alert(result.message || result.error);
    } catch (error) {
      console.error("Lỗi:", error);
    }
  });

// Đăng nhập
document
  .getElementById("login-form")
  .addEventListener("submit", async (event) => {
    event.preventDefault(); // Ngăn reload trang

    // Lấy giá trị từ các trường nhập
    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;
    const errorDiv = document.getElementById("login-error");

    // Gửi dữ liệu tới server
    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const result = await response.json();
      if (result.error) {
        errorDiv.textContent = result.error;
      } else {
        alert(result.message);
        errorDiv.textContent = "";
      }
    } catch (error) {
      console.error("Lỗi:", error);
    }
  });
// Endpoint đăng nhập
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  // Kiểm tra thông tin
  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "Vui lòng nhập tên người dùng và mật khẩu!" });
  }

  // Lấy thông tin từ cơ sở dữ liệu
  const sql = "SELECT * FROM users WHERE username = ?";
  db.query(sql, [username], (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Lỗi khi truy vấn dữ liệu!" });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: "Tên người dùng không tồn tại!" });
    }

    const user = results[0];

    // So sánh mật khẩu
    bcrypt.compare(password, user.password_hash, (err, isMatch) => {
      if (err) {
        return res.status(500).json({ error: "Lỗi khi xác minh mật khẩu!" });
      }

      if (!isMatch) {
        return res.status(401).json({ error: "Sai mật khẩu!" });
      }

      res.status(200).json({ message: "Đăng nhập thành công!" });
    });
  });
});
const bcrypt = require("bcrypt"); // Thư viện mã hóa mật khẩu

// Endpoint đăng ký
app.post("/register", (req, res) => {
  const { username, emailOrPhone, password } = req.body;

  // Kiểm tra thông tin
  if (!username || !emailOrPhone || !password) {
    return res.status(400).json({ error: "Vui lòng nhập đầy đủ thông tin!" });
  }

  // Mã hóa mật khẩu
  const saltRounds = 10;
  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      return res.status(500).json({ error: "Lỗi khi mã hóa mật khẩu!" });
    }

    // Lưu thông tin vào cơ sở dữ liệu
    const sql =
      "INSERT INTO users (username, email_or_phone, password_hash) VALUES (?, ?, ?)";
    db.query(sql, [username, emailOrPhone, hash], (err, result) => {
      if (err) {
        if (err.code === "ER_DUP_ENTRY") {
          return res.status(400).json({ error: "Tên người dùng đã tồn tại!" });
        }
        return res.status(500).json({ error: "Lỗi khi thêm dữ liệu!" });
      }
      res.status(201).json({ message: "Đăng ký thành công!" });
    });
  });
});
