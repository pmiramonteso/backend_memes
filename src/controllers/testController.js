function allAccess(req, res) {
    res.status(200).json({
      code: 1,
      message: 'Public Content.'
    });
  }
  
  function userBoard(req, res) {
    res.status(200).json({
      code: 1,
      message: 'Usuario Content.'
    });
  }
  
  function adminBoard(req, res) {
    res.status(200).json({
      code: 1,
      message: 'Admin Content.'
    });
  }
  
  function moderatorBoard(req, res) {
    res.status(200).json({
      code: 1,
      message: 'Moderator Content.'
    });
  }
  
  module.exports = {
    allAccess,
    userBoard,
    adminBoard,
    moderatorBoard
  };
  