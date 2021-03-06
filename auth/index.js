const express = require('express');
const router = express.Router();
const User = require('../db/models/user');
const passport = require('../passport');
const Session = require("../auth/session");
console.log("auth index");

module.exports = (sessions) => {

	router.get('/google', passport.authenticate('google', { scope: ['profile'] }))

	router.get('/google/callback',
		passport.authenticate('google', {
			successRedirect: '/user',
			failureRedirect: '/login'
		})
	)

	// this route is just used to get the user basic info
	router.get('/user', (req, res, next) => {
		console.log('===== user!!======')
		console.log(req.user)
		if (req.user) {
			return res.json({ user: req.user })
		} else {
			return res.json({ user: null })
		}
	})

	router.post(
		'/login',
		function (req, res, next) {
			console.log(req.body)
			console.log('================')
			next()
		},
		passport.authenticate('local'),
		(req, res) => {
			console.log('POST to /login')
			const user = JSON.parse(JSON.stringify(req.user)) // hack
			const cleanUser = Object.assign({}, user)
			if (cleanUser.local) {
				console.log(`Deleting ${cleanUser.local.password}`)
				delete cleanUser.local.password
			}
			res.json(cleanUser)
		}
	)

	router.get('/logout', (req, res) => {
		if (req.user) {
			req.session.destroy()
			res.clearCookie('connect.sid') // clean up!
			return res.json({ msg: 'logging you out' })
		} else {
			return res.json({ msg: 'no user to log out!' })
		}
	})

	router.get('/leaderBoard', (req, res) => {
		User.find({}, (err, users) => {
            if(users) {
				let sortedUsers = users.sort((user1, user2) => {
					return user2.local.userWins - user1.local.userWins;
				})
				return res.json(sortedUsers)
				
            } else {
                return res.json(err)
            }
        });
	})

	router.post('/signup', (req, res) => {
		const { username, password } = req.body
		// ADD VALIDATION
		User.findOne({ 'local.username': username }, (err, userMatch) => {
			if (userMatch) {
				return res.json({
					error: `Sorry, already a user with the username: ${username}`
				})
			}

			const newUser = new User({
				'local.username': username,
				'local.password': password,
				'local.userWins': 0,
				'local.userScores': 0
			})
			newUser.save((err, savedUser) => {
				if (err) return res.json(err)
				return res.json(savedUser)
			})
		})
	})
	return router;
}