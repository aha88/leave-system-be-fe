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
  const { name, company_id} = req.body;

  try {
      const department = {
          name: name,
          company_id: company_id
      };
      await db('departments').insert(department)
      res.status(201).json({
          status: res.statusCode,
          data: 'Successful added data'
      })
  } catch (error){
      res.status(500).json({msg: "Error on adding department"})
  }
}

const deleteDepartment = async (req, res) => {
    if ([2, 4].includes(req.userAccess.role_id)) {
        return res.status(405).json('You don\'t have the authorization');
    }

    const {id} = req.params;

    try {
        const deletedRows = await db('departments')
          .where({ id })  
          .del(); 
    
        if (deletedRows) {
          return res.status(200).json({
            status: 'success',
            message: `Departments with ID ${id} deleted successfully`,
          });
        } else {
          return res.status(404).json({
            status: 'error',
            message: 'Departments not found',
          });
        }
    
      } catch (error) {
        console.error('Error deleting department:', error);
        return res.status(500).json({
          status: 'error',
          message: 'Server error while deleting department',
        });
    }
}

const updateDepartment = async (req, res) => {
  if ([2, 4].includes(req.userAccess.role_id)) {
    return res.status(405).json('You don\'t have the authorization');
  }

  const { name, company_id} = req.body;
  const { id } = req.params;

  try {

      const departments = {
          name: name,
          company_id: company_id,
      };

      await db('departments').where('id', id).update(departments)

      res.status(201).json({
          status: res.statusCode,
          data: 'Successful updated data'
      })

  } catch (error){
      res.status(500).json({msg: "Error on adding departments"})
  }
}

module.exports = {
  getAllDepartment,
  getAllDepartmentByCompany,
  addDepartment,
  deleteDepartment,
  updateDepartment
};