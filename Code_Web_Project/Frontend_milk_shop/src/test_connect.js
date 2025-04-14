// test_connect.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TestConnect = () => {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    // Gửi yêu cầu GET đến backend để kiểm tra kết nối
    axios.get('http://localhost:8000/api/test-connection/')
      .then(response => {
        setMessage(response.data.message); // Hiển thị thông báo từ backend
        setLoading(false);
      })
      .catch(err => {
        setError(true); // Nếu có lỗi, setError thành true
        setLoading(false);
      });
  }, []);

  return (
    <div className="test-connect">
      {loading && <p>Loading...</p>} {/* Hiển thị khi đang tải */}
      {error && <p style={{ color: 'red' }}>Error connecting to the backend!</p>} {/* Hiển thị thông báo lỗi */}
      {!loading && !error && <p>{message}</p>} {/* Hiển thị thông báo thành công */}
    </div>
  );
};

export default TestConnect;
