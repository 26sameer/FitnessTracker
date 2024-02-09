const router = require('express').Router()
let Goal = require('../models/goal.model')

router.route('/').get((req, res) => {
  Goal.find()
    .then((goal) => res.json(goal))
    .catch((err) => res.status(400).json('Error: ' + err))
})

router.route('/add').post((req, res) => {
  const username = req.body.username
  const goalName = req.body.goalName
  const description = req.body.description
  const date = Date.parse(req.body.date)

  const newGoal = new Goal({
    username,
    goalName,
    description,
    date,
  })

  newGoal
    .save()
    .then(() => res.json('Goal added!'))
    .catch((err) => res.status(400).json('Error: ' + err))
})

router.route('/:username').get((req, res) => {
  Goal.find({ username: req.params.username })
    .then((goal) => res.json(goal))
    .catch((err) => res.status(400).json('Error: ' + err))
})

router.route('/:id').delete((req, res) => {
  Goal.findByIdAndDelete({ _id: req.params.id })
    .then(() => res.json('Goal deleted.'))
    .catch((err) => res.status(400).json('Error: ' + err))
})

router.route('/update/:id').post((req, res) => {
  Goal.findByIdAndUpdate({ _id: req.params.id })
    .then((goal) => {
      goal.username = req.body.username
      goal.goalName = req.body.goalName
      goal.description = req.body.description
      goal.date = Date.parse(req.body.date)

      goal
        .save()
        .then(() => res.json('Goal updated!'))
        .catch((err) => res.status(400).json('Error: ' + err))
    })
    .catch((err) => res.status(400).json('Error: ' + err))
})

module.exports = router
