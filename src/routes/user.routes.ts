import express, { Router } from 'express';
import User from '../user.model';

const router = Router();
const app = express();


router.get('/', async (req, res) => {
  try {
    const users = await User.find().maxTimeMS(30000);
    res.send(users);
    //res.render('users', { users });
    
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

router.post('/', async (req, res) => {
  const { name, email, password } = req.body;
  const newUser = new User({ name, email, password });
  await newUser.save();
  res.send(newUser);
});

export default router;
