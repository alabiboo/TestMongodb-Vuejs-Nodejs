const db = require("../models");
const Contact = db.contacts;



exports.create = (req, res) => {
  // Validate request
  
  if (!req.body.email) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  
  const contact = new Contact({
    name: req.body.name,
    firstname: req.body.firstname,
    phone_number: req.body.phone_number,
    email: req.body.email,
  });
  
  contact
    .save(contact)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Contact."
      });
    });
};


exports.findAll = (req, res) => {
    const email = req.query.email;
    var condition = email ? { email: { $regex: new RegExp(email), $options: "i" } } : {};
    Contact.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving contact."
        });
      });
};

exports.findOne = (req, res) => {
    const id = req.params.id;
    Contact.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found Contact with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving Contact with id=" + id });
      });
};

exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
          message: "Data to update can not be empty!"
        });
      }
      const id = req.params.id;
      Contact.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
          if (!data) {
            res.status(404).send({
              message: `Cannot update Contact with id=${id}. Maybe Contact was not found!`
            });
          } else res.send({ message: "Contact was updated successfully." });
        })
        .catch(err => {
          res.status(500).send({
            message: "Error updating Contact with id=" + id
          });
        });
}; 



exports.delete = (req, res) => {
    const id = req.params.id;
    Contact.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Contact with id=${id}. Maybe Contact was not found!`
          });
        } else {
          res.send({
            message: "Contact was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Contact with id=" + id
        });
      });
};

