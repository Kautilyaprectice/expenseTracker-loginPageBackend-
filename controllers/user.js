const User = require('../modles/user');

exports.createUser = async (req, res, next) => {
    
    const { name, email, password } = req.body;
    try{
        const existingUser = await User.findOne({ where: { email: email }});
        if(existingUser){
            // console.log('User already exists');
            return res.status(403).json({ error: "User already exists "});
        }

        const newUser = await User.create({ name, email, password });
        res.status(201).json({ newUser });
    }catch(err){
        res.status(500).json({ error: err.message });
    }
};

exports.loginUser = async (req, res, next) => {

    const { email, password } = req.body;
    try{
        const user = await User.findOne({ where: { email: email }});
        if(!user){
            return res.status(404).json({ error: "User does not exist" });
        }
        if(user.password !== password){
            return res.status(401).json({ error: "Incorrect password" });
        }
        res.status(200).json({ message: "Login successful" });
    }catch(err) {
        res.status(500).json({ error: err.message });
    }
};

