import User from '../models/Users.js'
import jwt from 'jsonwebtoken'

export const singup = async (req, res) => {
  try {
    const {username, email, password} = req.body

    if(!username || !email || !password)
      return res.json({msg: 'All fields are required'})

    const userExists = await User.findOne({ $or: [{username}, {email}] })

    if(userExists)
      return res.json('Username is not available')
    
    const data = new User({ username, email, password })
    await data.save()

    res.status(201).json({
      msg: "User created successfully",
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
        isActive: newUser.isActive
      }
    })

  } catch (error) {
    res.status(500).json({ msg: 'Error creating user', error })    
  }
}

export const login = async (req, res) => {
  try {

    const { identifier, password } = req.body

    if(!password || !identifier)
      res.json({msg: 'Incomplete credentials'})

    const user = await User.findOne({
      $or: [{username: identifier}, {email: identifier} ]
    })

    if (!user) {
      return res.status(400).json({ 
        msg: "Sorry, we couldn't find your account."
      })
    }

    if(!user.isActive)
      return res.status(403).json({msg: 'User disabled'})

    const isMatch = await user.comparePassword(password)

    if (!isMatch) return res.status(400).json({msg: 'Password incorrect'})
    
    const token = jwt.sign(
      { id: user._id, role: user.role},
      process.env.JWT_SECRET,
      { expiresIn: "1d"}
    )
    
    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    })

  } catch (error) {
    res.status(500).json({msg: 'Error server internal', error })
    console.log(error);
  }
}

