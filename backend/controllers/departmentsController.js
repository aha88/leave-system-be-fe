const db = require('../db');


const getAllDepartment = async (req,res) => {
    if ([2, 3, 4].includes(req.userAccess.role_id)) {
        return res.status(405).json('You don\'t have the authorization');
    }

  try {
      const employeeLeaves = await db('departments')
          .select(
            'departments.*',
            'companies.name AS company_name',
          )
          .leftJoin('companies', 'companies.id', 'departments.company_id');
     
      const transformedEmployeeLeaves = employeeLeaves.map(emp =>
         ({
            id: emp.id, 
            name: emp.name,  
            company_id: emp.company_id,  
            company_name: emp.company_name,
        })
      );
        
      const dt = {
        status: res.statusCode,
        data: transformedEmployeeLeaves,
        length: transformedEmployeeLeaves.length
      };

      res.json(dt);
  
    } catch (error) {
      console.error('Error retrieving departments:', error);
      res.status(500).send('Error retrieving departments');
    }
  

}

const getAllDepartmentByCompany = async (req, res) => {
    if ([2, 4].includes(req.userAccess.role_id)) {
        return res.status(405).json('You don\'t have the authorization');
    }

    try {
       const employeeLeaves = await db('departments')
          .select(
            'departments.*',
            'companies.name AS company_name',
          )
          .leftJoin('companies', 'companies.id', 'departments.company_id')
          .where('departments.company_id', req.userAccess.company_id);
     
      const transformedEmployeeLeaves = employeeLeaves.map(emp =>
         ({
            id: emp.id, 
            name: emp.name,  
            company_id: emp.company_id,  
            company_name: emp.company_name,
        })
      );
        
      const dt = {
        status: res.statusCode,
        data: transformedEmployeeLeaves,
        length: transformedEmployeeLeaves.length
      };

      res.json(dt);
  
    } catch (error) {
      console.error('Error retrieving departments:', error);
      res.status(500).send('Error retrieving departments');
    }
}

const addDepartment = async (req, res) => {
    if ([2, 4].includes(req.userAccess.role_id)) {
        return res.status(405).json('You don\'t have the authorization');
    }

}
const deleteDepartment = async (req, res) => {
    if ([2, 4].includes(req.userAccess.role_id)) {
        return res.status(405).json('You don\'t have the authorization');
    }

}

const updateDepartment = async (req, res) => {
    if ([2, 4].includes(req.userAccess.role_id)) {
        return res.status(405).json('You don\'t have the authorization');
    }
}


module.exports = {
    getAllDepartment,
    getAllDepartmentByCompany,
    addDepartment,
    deleteDepartment,
    updateDepartment

  };