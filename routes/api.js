const express = require('express')
const router = express.Router()
const controllers = require('../controllers')

// Get all of a resource (where optional 'params')
router.get('/:resource', (req, res) => {
  const { resource } = req.params
  const controller = controllers[resource]

  if (controller == null) {
    res.json({
      confirmation: 'fail',
      message: `Invalid resource: '${resource}'`
    })
  }

  controller.get(req.query, false)
  .then((results) => {
    res.json({
      confirmation: 'success',
      results: results
    })
  })
  .catch((err) => {
    res.json({
      confirmation: 'fail',
      message: err
    })
  })

})

// Get a specific resource by its id
router.get('/:resource/:id', (req, res) => {
  const { resource, id } = req.params
  const controller = controllers[resource]

  if (controller == null) {
    res.json({
      confirmation: 'fail',
      message: `Invalid resource: '${resource}'`
    })
  }

  controller.getById(id, false)
  .then((result) => {
    res.json({
      confirmation: 'success',
      result: result
    })
  })
  .catch((err) => {
    res.json({
      confirmation: 'fail',
      message: `'${resource}' with id '${id}' was not found`
    })
  })

})

// Create a new resource
router.post('/:resource/', (req, res) => {
  const { resource } = req.params
  const controller = controllers[resource]

  if (controller == null) {
    res.json({
      confirmation: 'fail',
      message: `Invalid resource: '${resource}'`
    })
  }

  controller.create(req.body, false)
  .then((result) => {
    res.json({
      confirmation: 'success',
      result: result
    })
  })
  .catch((err) => {
    res.json({
      confirmation: 'fail',
      message: `err`
    })
  })

})

module.exports = router