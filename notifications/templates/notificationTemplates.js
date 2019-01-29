function completeRegistration(receiver) {
  return {
    from: 'r21billard@gmail.com',
    to: receiver,
    subject: 'this is the register mail',
    text: 'That was easy!',
  };
}

function someTest(receiver) {
  return {
    from: 'r21billard@gmail.com',
    to: receiver,
    subject: 'this is the second notification someTest',
    text: 'someTest',
  };
}

module.exports = { completeRegistration, someTest, };