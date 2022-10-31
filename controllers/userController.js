
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { loginValidate, registerValidate } = require('./validate')


const userController = {

    register: async function (req, res) {

        const { error } = registerValidate(req.body)
        if (error) {
            return res.status(400).send(error)
        }

        const seletedUser = await User.findOne({ email: req.body.email })

        if (seletedUser) {
            return res.status(400).send("Email já registrado no banco de dados!")
        }

        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password)
        })
        try {
            const saveUser = await user.save()
            res.send(saveUser)
        } catch (error) {
            res.status(400).send(error)
        }
    },

    login: async function (req, res) {

        const { error } = loginValidate(req.body)
        if (error) {
            return res.status(400).send(error)
        }

        const seletedUser = await User.findOne({ email: req.body.email })
        if (!seletedUser) return res.status(400).send("Email ou Senha incorreta!")

        const passwordAndUserMatch = bcrypt.compareSync(req.body.password, seletedUser.password)
        if (!passwordAndUserMatch) return res.status(400).send("Email ou Senha incorreta!")

        const token = jwt.sign({ _id: seletedUser._id, admin: seletedUser.admin }, process.env.TOKEN_SECRET)

        res.header('authorization-token', token)

        res.send("User Logged")
    }
}

module.exports = userController