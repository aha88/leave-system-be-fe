const db = require('../db');


const getAllCategories = async (req,res) => {
    if ([2, 3, 4].includes(req.userAccess.role_id)) {
        return res.status(405).json('You don\'t have the authorization');
    }

  try {
      const employeeLeaves = await db('categories')
          .select(
            'categories.*',
            'companies.name AS company_name',
          )
          .leftJoin('companies', 'companies.id', 'categories.company_id');
     
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
      console.error('Error retrieving categories:', error);
      res.status(500).send('Error retrieving categories');
    }
  

}

const getAllCategoriesByCompany = async (req, res) => {
    if ([2, 4].includes(req.userAccess.role_id)) {
        return res.status(405).json('You don\'t have the authorization');
    }

    try {
       const employeeLeaves = await db('categories')
          .select(
            'categories.*',
            'companies.name AS company_name',
          )
          .leftJoin('companies', 'companies.id', 'categories.company_id')
          .where('categories.company_id', req.userAccess.company_id);
     
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
      console.error('Error retrieving categories:', error);
      res.status(500).send('Error retrieving categories');
    }
}

const addCategory = async (req, res) => {
    if ([2, 4].includes(req.userAccess.role_id)) {
        return res.status(405).json('You don\'t have the authorization');
    }

    const { name, company_id} = req.body;

    try {

        const categoryadd = {
            name: name,
            company_id: company_id
        };

        await db('categories').insert(categoryadd)

        res.status(201).json({
            status: res.statusCode,
            data: 'Successful added data'
        })

    } catch (error){
        res.status(500).json({msg: "Error on adding category"})
    }
}

const deleteCategory = async (req, res) => {
    if ([2, 4].includes(req.userAccess.role_id)) {
        return res.status(405).json('You don\'t have the authorization');
    }
    
    const {id} = req.params;

    try {
        const deletedRows = await db('categories')
          .where({ id })  
          .del(); 
    
        if (deletedRows) {
          return res.status(200).json({
            status: 'success',
            message: `categories with ID ${id} deleted successfully`,
          });
        } else {
          return res.status(404).json({
            status: 'error',
            message: 'categories not found',
          });
        }
    
      } catch (error) {
        console.error('Error deleting categorie:', error);
        return res.status(500).json({
          status: 'error',
          message: 'Server error while deleting categorie',
        });
    }
}

const updateCategory = async (req, res) => {
    if ([2, 4].includes(req.userAccess.role_id)) {
        return res.status(405).json('You don\'t have the authorization');
    }

    const { name, company_id} = req.body;
    const { id } = req.params;

    try {

        const categoryadd = {
            name: name,
            company_id: company_id,
        };

        await db('categories').where('id', id).update(categoryadd)

        res.status(201).json({
            status: res.statusCode,
            data: 'Successful updated data'
        })

    } catch (error){
        res.status(500).json({msg: "Error on adding category"})
    }

}


module.exports = {
    getAllCategories,
    getAllCategoriesByCompany,
    addCategory,
    deleteCategory,
    updateCategory

  };