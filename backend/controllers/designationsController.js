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
}

const deleteDesignation = async (req, res) => {
     if ([4].includes(req.userAccess.role_id)) {
        return res.status(405).json('You don\'t have the authorization');
    }
}

const updateDesignation = async (req, res) => {
    if ([4].includes(req.userAccess.role_id)) {
        return res.status(405).json('You don\'t have the authorization');
    }
}

module.exports = {
    getAllDesignation,
    getAllDesignationByCompany,
    addDesignation,
    deleteDesignation,
    updateDesignation
};