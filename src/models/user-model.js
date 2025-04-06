import promisePool from '../utils/database.js';

const listAllUsers = async () => {
  const [rows] = await promisePool.query('SELECT * FROM users');
  console.log('rows', rows);
  return rows;
};

const findUserById = async (id) => {
  const [rows] = await promisePool.execute('SELECT * FROM users WHERE user_id = ?', [id]);
  console.log('rows', rows);
  if (rows.length === 0) {
    return false;
  }
  return rows[0];
};

const addUser = async (user) => {
  const { username, email, password } = user;
  const sql = `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`;
  const params = [username, email, password];
  const rows = await promisePool.execute(sql, params);
  console.log('rows', rows);
  if (rows[0].affectedRows === 0) {
    return false;
  }
  return { user_id: rows[0].insertId };
};

const modifyUser = async (user, id) => {
  const sql = promisePool.format(`UPDATE users SET ? WHERE user_id = ?`, [user, id]);
  const rows = await promisePool.execute(sql);
  console.log('rows', rows);
  if (rows[0].affectedRows === 0) {
    return false;
  }
  return { message: 'success' };
};

const removeUser = async (id) => {
  const connection = await promisePool.getConnection();
  try {
    await connection.beginTransaction();
    await connection.execute('DELETE FROM wsk_cats WHERE owner = ?', [id]);
    const [rows] = await connection.execute('DELETE FROM users WHERE user_id = ?', [id]);
    await connection.commit();
    console.log('rows', rows);
    if (rows.affectedRows === 0) {
      return false;
    }
    return { message: 'success' };
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};

const getUserByUsername = async (username) => {
  const sql = `SELECT * FROM users WHERE username = ?`;
};

export { getUserByUsername, listAllUsers, findUserById, addUser, modifyUser, removeUser };
