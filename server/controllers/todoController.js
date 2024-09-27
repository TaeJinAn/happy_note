import pool from "../config/db.js";

export const getTodos = async (req, res) => {
  const { user_code } = req.params;
  console.log(user_code);
  const [rows] = await pool.query(
    `
    select *
    from todo
    where user_code = ? and is_deleted = 0
    `,
    [user_code]
  );
  res.json({
    resultCode: "S",
    msg: "success",
    data: rows,
  });
};

export const addTodo = async (req, res) => {
  const { user_code } = req.params;
  const { createDate, regDate: performDate, content, checked } = req.body;

  console.log(user_code);
  console.log(createDate, performDate, content, checked);

  if (!content) {
    res.status(400).json({
      resultCode: "F-1",
      msg: "content required",
    });
    return;
  }

  if (!performDate) {
    res.status(400).json({
      resultCode: "F-1",
      msg: "performDate required",
    });
    return;
  }

  const [[lastTodoRow]] = await pool.query(
    `
    SELECT no
    FROM todo
    WHERE user_code = ?
    ORDER BY id DESC
    LIMIT 1
    `,
    [user_code]
  );

  const no = lastTodoRow?.no + 1 || 1;

  const [insertTodoRs] = await pool.query(
    `
    INSERT INTO todo
    SET reg_date = NOW(),
    user_code = ?,
    content = ?,
    perform_date = ?,
    is_completed = ?,
    no = ?
    `,
    [user_code, content, performDate, checked, no]
  );

  const [[justCreatedTodoRow]] = await pool.query(
    `
    SELECT *
    FROM todo
    WHERE id = ?
    `,
    [insertTodoRs.insertId]
  );

  res.json({
    resultCode: "S-1",
    msg: `${justCreatedTodoRow.id}번 할일을 생성하였습니다`,
    data: justCreatedTodoRow,
  });
};

export const checkTodo = async (req, res) => {
  const { user_code, id } = req.params;
  const { checked } = req.body;
  console.log(user_code, id, checked);
  const [[updateTargetRow]] = await pool.query(
    `
    SELECT no
    FROM todo
    WHERE user_code = ? and
    id = ?
    `,
    [user_code, id]
  );

  if (!updateTargetRow) {
    res.status(400).json({
      resultCode: "F-1",
      msg: "cannot find target row",
    });
    return;
  }

  await pool.query(
    `
    UPDATE todo
    SET is_completed = ?
    WHERE user_code = ?
    AND id = ?
    `,
    [checked ? 1 : 0, user_code, id]
  );

  const [[justModifiedTodoRow]] = await pool.query(
    `
    SELECT *
    FROM todo
    WHERE user_code = ?
    AND id = ?
    `,
    [user_code, id]
  );
  res.json({
    resultCode: "S-1",
    msg: "성공",
    data: justModifiedTodoRow,
  });
};

export const updateTodo = async (req, res) => {
  const { user_code, id } = req.params;
  const { regDate: performDate, content } = req.body;

  console.log(user_code, id);
  console.log(performDate, content);

  if (!content) {
    res.status(400).json({
      resultCode: "F-1",
      msg: "content required",
    });
    return;
  }

  if (!performDate) {
    res.status(400).json({
      resultCode: "F-1",
      msg: "performDate required",
    });
    return;
  }

  const [[updateTargetRow]] = await pool.query(
    `
    SELECT no
    FROM todo
    WHERE user_code = ? AND id = ?
    `,
    [user_code, id]
  );

  if (!updateTargetRow) {
    res.status(400).json({
      resultCode: "F-1",
      msg: "cannot find target row",
    });
    return;
  }

  await pool.query(
    `
    UPDATE todo
    SET content = ?,
    perform_date = ?
    WHERE user_code = ?
    AND id = ?
    `,
    [content, performDate, user_code, id]
  );

  const [[justModifiedTodoRow]] = await pool.query(
    `
    SELECT *
    FROM todo
    WHERE user_code = ?
    AND id = ?
    `,
    [user_code, id]
  );
  res.json({
    resultCode: "S-1",
    msg: "성공",
    data: justModifiedTodoRow,
  });
};

export const deleteTodo = async (req, res) => {
  const { user_code, id } = req.params;
  console.log(user_code, id);

  const [[updateTargetRow]] = await pool.query(
    `
    SELECT no
    FROM todo
    WHERE user_code = ? AND id = ?
    `,
    [user_code, id]
  );

  if (!updateTargetRow) {
    res.status(400).json({
      resultCode: "F-1",
      msg: "cannot find target row",
    });
    return;
  }

  await pool.query(
    `
    UPDATE todo
    SET is_deleted = ?
    WHERE user_code = ?
    AND id = ?
    `,
    [1, user_code, id]
  );

  const [[justModifiedTodoRow]] = await pool.query(
    `
    SELECT *
    FROM todo
    WHERE user_code = ?
    AND id = ?
    `,
    [user_code, id]
  );
  res.json({
    resultCode: "S-1",
    msg: "성공",
    data: justModifiedTodoRow,
  });
};
