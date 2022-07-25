const db = require("../models");
const Contact = db.contacts;



exports.create = (req, res) => {
  // Validate request
  
  if (!req.body.name || !req.body.firstname || !req.body.phone_number || !req.body.email) {
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
    Contact.find({})
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

