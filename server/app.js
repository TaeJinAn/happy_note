import express from "express";
import cors from "cors";
import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "root",
  database: "happy_note_20240922",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  dateStrings: true,
});

const app = express();

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());

const port = 3005;

app.get("/:user_code/todos", async (req, res) => {
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
});

app.post("/:user_code/todos", async (req, res) => {
  const { user_code } = req.params;
  console.log(user_code);
  const { createDate, regDate: performDate, content, checked } = req.body;
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
});

app.post("/:user_code/todos/:id", async (req, res) => {
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
});

app.patch("/:user_code/todos/:id", async (req, res) => {
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
});

app.delete("/:user_code/todos/:id", async (req, res) => {
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
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
