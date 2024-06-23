const { startBloodyHell, stopBloodyHell } = require('../utils/bloodyHell');

const bloodyHellController = {
  start: (req, res) => {
    startBloodyHell();
    res.status(200).json({ message: 'Bloody hell started' });
  },
  stop: (req, res) => {
    stopBloodyHell();
    res.status(200).json({ message: 'Bloody hell stopped' });
  }
};

module.exports = bloodyHellController;
