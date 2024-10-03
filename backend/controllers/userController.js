const db = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const postLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await db('users').where({ email }).first();

    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const getEcypt = `${user.id}${user.name}${user.email}${password}`
    const isMatch = await bcrypt.compare(getEcypt, user.password);

    if (!isMatch) {
      return res.status(400).json({  status: 'unsuccess', message: 'Invalid email or password' });
    }

    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
    //  sessionStorage.setItem('tkn',token);

    res.json({
      status: res.statusCode,
      message: 'Login successful',
      userID: user.id,
      token: token,
    });

  } catch (error) {
    console.error(error);
      res.status(500).json({
         status: 'invalid',
         message: 'Server error' 
      });
  }

};

// Get all users
const getAllUsers = async (req, res) => {
  if ([2, 3, 4].includes(req.userAccess.role_id)) {
    return res.status(405).json('You don\'t have the authorization');
  }

  try {
    const users = await db('users').select('*');

    const dt = {
      status: res.statusCode,
      data: users,
      lenght: users.length
  };

    res.json(dt);

  } catch (error) {
    console.error('Error retrieving users:', error);
    res.status(500).send('Error retrieving users');
  }
};


// Get all users with  suffix (example function)
const getUserId = async (req, res) => {
  const id = req.params.id;
  
  try {
    const user = await db('users').select('*').where({id});
    const data= [{
      'status': res.statusCode,
      'data': user,
      'lenght': user.length
      
    }];

    res.json(data);
  
  } catch (error) {
    console.error('Error retrieving users:', error);
    res.status(500).send('Error retrieving users');
  }
};

const addUserAccess = async (req, res) => {
  if ([2, 4].includes(req.userAccess.role_id)) {
    return res.status(405).json('You don\'t have the authorization');
  }
  const {
    name,
    email,
    password,
    status,
    role_id,
  } = req.body;

  try {

 

    const existing = await db('users')
    .select('*')
    .where('email', email)
    .first();

  if (existing) {
    res.status(405).json({msg :'This email is already registered!'})
  }else{
    
    const user = { name: name,
      email: email,
      status: status,
      role_id: role_id,
    };
    const [id] =  await db('users').insert(user);
    
    const getId = await db('users')
    .max('id as id')  
    .first();
    const newid = (parseFloat(getId.id));

    const passwordString = `${newid}${name}${email}${password}`;
    const encryptedPassword = await bcrypt.hash(passwordString, 10); 
    
    await db('users')
    .where('id', newid)
    .update({ password: encryptedPassword });

    res.status(201).json({ id, name, email });

  }

  } catch(error) {
    res.status(500).send('Error add user');
  }


}


const deleteUserAccess = async (req, res) => {
   if ([2, 4].includes(req.userAccess.role_id)) {
    return res.status(405).json('You don\'t have the authorization');
  }

}



module.exports = {
  postLogin,
  getAllUsers,
  getUserId,
  addUserAccess,
  deleteUserAccess
};