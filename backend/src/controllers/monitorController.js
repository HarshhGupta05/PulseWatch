import Monitor from "../models/Monitor.js";


export const getMonitors = async (req, res) => {
    try{
        const monitors = await Monitor.find({ userId : req.user.id});
        res.json(monitors);
    }
    catch(error){
        res.status(500).json({ message : 'Server Error',
                               error   : error.message
        });
    }
};

export const createMonitor = async (req, res) => {
  try {
    const { name, url, alertEmail } = req.body;
    const monitor = await Monitor.create({ name, url, alertEmail, userId: req.user.id });
    res.status(201).json(monitor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteMonitor = async (req, res) => {
  try {
    const monitor = await Monitor.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!monitor) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

