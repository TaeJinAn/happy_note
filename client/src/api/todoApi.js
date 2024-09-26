const API_URL = "http://localhost:3005/localhost/todos";

export const initTodos = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error("failed to init todos");
  }
  return response.json();
};

export const addTodo = async (newTodo) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newTodo),
  });
  if (!response.ok) {
    throw new Error("Failed to add todo");
  }
  return response.json();
};

export const updateTodo = async ({ id, content, regDate }) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ content, regDate }),
  });

  if (!response.ok) {
    throw new Error("Failed to update todo");
  }

  return response.json();
};

export const checkTodo = async ({ id, checked }) => {
  console.log("checktodo fetch checked:::::", checked);
  const response = await fetch(`${API_URL}/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ checked: checked }),
  });

  if (!response.ok) {
    throw new Error("Failed to check todo");
  }

  return response.json();
};

export const deleteTodo = async (id) => {
  console.log("delete id : ", id);
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to check todo");
  }

  return response.json();
};
