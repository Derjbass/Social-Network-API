//import router
const router = require('express').Router();

const { createThought,
    updateThought,
    createReaction,
    deleteReaction,
    allThoughts,
    thoughtById,
    deleteThought
} = require('../controllers/thoughts');
const { createUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser,
    createFriend,
    deleteFriend
} = require('../controllers/users')

//all queries on /users routes
router
    .route('/users')
    .post(createUser)
    .get(getUsers);

//all queries on /users routes with params
router
    .route('/users/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);

//query to add/delete friend
router
    .route('/users/:id/friends/:frId')
    .post(createFriend)
    .delete(deleteFriend);

//all queries on /thoughts routes
router
    .route('/thoughts')
    .post(createThought)
    .get(allThoughts);

//all queries on /thoughts routes with params
router
    .route('/thoughts/:id')
    .put(updateThought)
    .get(thoughtById)
    .delete(deleteThought);

//all queries on /reactions routes
router
    .route('/:id/reactions')
    .post(createReaction);

//all queries on /reactions routes with params
router
    .route('/:id/reactions/:reacId')
    .delete(deleteReaction);

module.exports = router;