export const loginUser = async (email, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === "test@example.com" && password === "password123") {
        resolve({ success: true, token: "mock-jwt-token" });
      } else {
        reject(new Error("Invalid email or password"));
      }
    }, 1000);
  });
};

export const registerUser = async (name, email, password, age, gender) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!name) {
        reject(new Error("Name is required"));
      } else if (email === "test@example.com") {
        reject(new Error("Email already exists"));
      } else if (!email || !password) {
        reject(new Error("Email and password are required"));
      } else if (age < 18) {
        reject(new Error("Age must be at least 18"));
      } else if (!gender) {
        reject(new Error("Gender is required"));
      } else {
        resolve({ success: true, token: "mock-jwt-token" });
      }
    }, 1000);
  });
};

export const fetchHealthLogs = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, date: "2025-06-01", type: "Sleep", value: "8 hours" },
        { id: 2, date: "2025-06-02", type: "Water Intake", value: "2 liters" },
        { id: 3, date: "2025-06-03", type: "Steps", value: "10,000" },
      ]);
    }, 1000);
  });
};

export const deleteHealthLog = async (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, id });
    }, 500);
  });
};