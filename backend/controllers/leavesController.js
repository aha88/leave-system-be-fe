const db = require('../db');


const getAllLeave = async (req,res) => {
 if (req.userAccess != 1) {
    return res.status(405).json('You dont have the authorization');
  }

  return res.json(
    {
      status: res.statusCode,
    }
  )
}

const getAllLeaveByCompany = async (req,res) => {

}


module.exports = {
    getAllLeave,
    getAllLeaveByCompany

 
  };