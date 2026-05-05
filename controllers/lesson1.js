const emilyRoute = (req, res) => {
  res.send('Emily is here!');
};

const johnRoute = (req, res) => {
    res.send('John is here!');
};

module.exports = {
  emilyRoute,
  johnRoute
};
