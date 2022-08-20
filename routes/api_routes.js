//import router
const router = require('express').Router();

const { createThought,
    updateThought,
    createReaction,
    deleteReaction,
    allThoughts,
    thoughtById
} = require('../controllers/thoughts');
const { createUser,
    getUsers
} = require('../controllers/users')

//all queries on /users routes
router
    .route('/users')
    .post(createUser)
    .get(getUsers);

//all queries on /users routes with params
router
    .route('/users/:id')

//all queries on /thoughts routes
router
    .route('/thoughts')
    .post(createThought)
    .get(allThoughts);

//all queries on /thoughts routes with params
router
    .route('/thoughts/:id')
    .put(updateThought)
    .get(thoughtById);

//all queries on /reactions routes
router
    .route('/:id/reactions')
    .post(createReaction);

//all quires on /reactions routes with params
router
    .route('/:id/reaction/:reacId')
    .delete(deleteReaction);
module.exports = router;