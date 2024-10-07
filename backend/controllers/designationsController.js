const db = require('../db');

const getAllDesignation = async (req, res) => {
    if ([2, 3, 4].includes(req.userAccess.role_id)) {
        return res.status(405).json('You don\'t have the authorization');
    }

    try {
        const employeeLeaves = await db('designations')
            .select(
              'designations.*',
              'companies.name AS company_name',
            )
            .leftJoin('companies', 'companies.id', 'designations.company_id');
       
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
        console.error('Error retrieving designations:', error);
        res.status(500).send('Error retrieving designations');
      }
}

const getAllDesignationByCompany = async (req,res) => {
    if ([2, 4].includes(req.userAccess.role_id)) {
        return res.status(405).json('You don\'t have the authorization');
    }
    try {
        const employeeLeaves = await db('designations')
            .select(
              'designations.*',
              'companies.name AS company_name',
            )
            .leftJoin('companies', 'companies.id', 'designations.company_id')
            .where('designations.company_id', req.userAccess.company_id);
       
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
        console.error('Error retrieving designations:', error);
        res.status(500).send('Error retrieving designations');
      }
}

const addDesignation = async (req, res) => {
  if ([2, 4].includes(req.userAccess.role_id)) {
    return res.status(405).json('You don\'t have the authorization');
  }

  const { name, company_id} = req.body;

  try {

      const designationAdd = {
          name: name,
          company_id: company_id
      };

      await db('designations').insert(designationAdd)

      res.status(201).json({
          status: res.statusCode,
          data: 'Successful added data'
      })

  } catch (error){
      res.status(500).json({msg: "Error on adding designation"})
  }
}

const deleteDesignation = async (req, res) => {
    if ([4].includes(req.userAccess.role_id)) {
        return res.status(405).json('You don\'t have the authorization');
    }
    const {id} = req.params;

    try {
        const deletedRows = await db('designations')
          .where({ id })  
          .del(); 
    
        if (deletedRows) {
          return res.status(200).json({
            status: 'success',
            message: `Designations with ID ${id} deleted successfully`,
          });
        } else {
          return res.status(404).json({
            status: 'error',
            message: 'Designations not found',
          });
        }
    
      } catch (error) {
        console.error('Error deleting designation:', error);
        return res.status(500).json({
          status: 'error',
          message: 'Server error while deleting designation',
        });
      }
}

const updateDesignation = async (req, res) => {
  if ([2, 4].includes(req.userAccess.role_id)) {
    return res.status(405).json('You don\'t have the authorization');
  }

  const { name, company_id} = req.body;
  const { id } = req.params;

  try {

      const designations = {
          name: name,
          company_id: company_id,
      };

      await db('designations').where('id', id).update(designations)

      res.status(201).json({
          status: res.statusCode,
          data: 'Successful updated data'
      })

  } catch (error){
      res.status(500).json({msg: "Error on adding designations"})
  }
}

module.exports = {
    getAllDesignation,
    getAllDesignationByCompany,
    addDesignation,
    deleteDesignation,
    updateDesignation
};