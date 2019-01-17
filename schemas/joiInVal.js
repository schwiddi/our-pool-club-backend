const Joi = require('joi');

const schemas = {
  new_user: {
    u_name: Joi.string()
      .min(2)
      .max(255)
      .required(),
    u_mail: Joi.string()
      .email({ minDomainAtoms: 2, })
      .min(3)
      .max(255)
      .required(),
    u_password: Joi.string()
      .min(3)
      .max(1024)
      .required(),
  },
  new_club: {
    c_name: Joi.string()
      .min(2)
      .max(255)
      .required(),
    c_description: Joi.string()
      .min(2)
      .max(255)
      .required(),
    c_iniator: Joi.number()
      .required(),
  },
  new_table: {
    t_name: Joi.string()
      .min(2)
      .max(255)
      .required(),
    t_c_id: Joi.number()
      .required(),
  },
  new_login: {
    mail: Joi.string()
      .email({ minDomainAtoms: 2, })
      .min(3)
      .max(255)
      .required(),
    password: Joi.string()
      .min(3)
      .max(255)
      .required(),
  },
};

module.exports = {
  new_user: schemas.new_user,
  new_club: schemas.new_club,
  new_table: schemas.new_table,
  new_login: schemas.new_login,
};
