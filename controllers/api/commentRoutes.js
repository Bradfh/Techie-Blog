const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
try {
  const newComment = await Comment.create({
    ...req.body,
    user_id: req.session.user_id,
  });
  res.status(200).json(newComment);
} catch (err) {
  res.status(400).json(err);
}
});

router.put('/:id', withAuth, async (req, res) => {
try {
  const commentUpdate = await Comment.update({
    content: req.body.content,
  },
  {
    where: {
      id: req.params.id,
    },
  });
  res.status(200).json(commentUpdate);
} catch (err) {
  res.status(400).json(err);
}
});

router.delete('/:id', withAuth, async (req, res) => {
try {
  const commentDelete = await Comment.destroy({
    where: {
      id: req.params.id,
    },
  });
  res.status(200).json(commentDelete);
} catch (err) {
  res.status(400).json(err);
}
});

module.exports = router;