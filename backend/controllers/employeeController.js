const db = require('../db');


/**
 * 
 */
const getAllEmployee = async (req, res) => {
   if (req.userAccess != 1) {
    return res.status(405).json('You dont have the authorization');
  }
  
    try {
        const employee = await db('employees')
        .select(
            'employees.id as employee_id',
            'employees.name as employee_name',
            'employees.email as employee_email',
            'employees.company_id',
            'employee_details.*',
            'departments.name as employee_dept ',
            'designations.name as employee_design',
            'designations.name as employee_design',
            'roles.name as employee_role',
        )
        .join('employee_details', 'employee_details.id', 'employees.employee_details_id')
        .join('departments', 'departments.id', 'employees.department_id')
        .join('categories', 'categories.id', 'employees.category_id')
        .join('roles', 'roles.id', 'employees.role_id')
        .join('designations', 'designations.id', 'employees.designation_id');
    
        const transformedEmployee = employee.map(emp => ({
            id: emp.employee_id,
            name: emp.employee_name,
            email: emp.employee_email,
            company_id: emp.company_id,
            whatapps: emp.whatapps,
            telegram: emp.telegram,
            role_id: emp.role_id,
            designation_id: emp.employee_design,
            department_id: emp.employee_dept,
            role_id: emp.employee_role,
            employee_details: {
                id: emp.id,  
                address1: emp.address1,
                address2: emp.address2,
                postcode: emp.postcode,
                city: emp.city,
                country: emp.country,
                email: emp.email,
                phone: emp.phone,
                handphone: emp.handphone,
            }
        }));
        
          const dt = {
            status: res.statusCode,
            data: transformedEmployee,
            length: transformedEmployee.length,
          };
      
          res.json(dt);
      
        } catch (error) {
          console.error('Error retrieving employee registration:', error);
          res.status(500).send('Error retrieving employee registration');
        }
}


// id a customer
const allEmployeeByCompany = async (req, res) => {
  const id = req.params.id
 
  try {
    const employee = await db('employees')
      .select(
          'employees.id as employee_id',
          'employees.name as employee_name',
          'employees.email as employee_email',
          'employees.company_id',
          'employee_details.*',
          'departments.name as employee_dept ',
          'designations.name as employee_design',
          'designations.name as employee_design',
          'roles.name as employee_role',
      )
      .join('employee_details', 'employee_details.id', 'employees.employee_details_id')
      .join('departments', 'departments.id', 'employees.department_id')
      .join('categories', 'categories.id', 'employees.category_id')
      .join('roles', 'roles.id', 'employees.role_id')
      .join('designations', 'designations.id', 'employees.designation_id')
      .where('employees.company_id', id );
  
    
      
      const transformedEmployee = employee.map(emp => ({
          id: emp.employee_id,
          name: emp.employee_name,
          email: emp.employee_email,
          company_id: emp.company_id,
          whatapps: emp.whatapps,
          telegram: emp.telegram,
          role_id: emp.role_id,
          designation_id: emp.employee_design,
          department_id: emp.employee_dept,
          role_id: emp.employee_role,
          employee_details: {
              id: emp.id,  
              address1: emp.address1,
              address2: emp.address2,
              postcode: emp.postcode,
              city: emp.city,
              country: emp.country,
              email: emp.email,
              phone: emp.phone,
              handphone: emp.handphone,
          }
      }));
      
        const dt = {
          status: res.statusCode,
          data: transformedEmployee,
          length: transformedEmployee.length,
        };
    
    res.json(dt);

  } catch (error) {
    console.error('Error retrieving employee registration:', error);
    res.status(500).send('Employee registration not found');
  }
 
};



// id a customer
const idEmployee = async (req, res) => {
    const id = req.params.id
   
    try {
      const employee = await db('employees')
        .select(
            'employees.id as employee_id',
            'employees.name as employee_name',
            'employees.email as employee_email',
            'employees.company_id',
            'employee_details.*',
            'departments.name as employee_dept ',
            'designations.name as employee_design',
            'designations.name as employee_design',
            'roles.name as employee_role',
        )
        .join('employee_details', 'employee_details.id', 'employees.employee_details_id')
        .join('departments', 'departments.id', 'employees.department_id')
        .join('categories', 'categories.id', 'employees.category_id')
        .join('roles', 'roles.id', 'employees.role_id')
        .join('designations', 'designations.id', 'employees.designation_id')
        .where({ 'employees.id':id });
    
      
        
        const transformedEmployee = employee.map(emp => ({
            id: emp.employee_id,
            name: emp.employee_name,
            email: emp.employee_email,
            company_id: emp.company_id,
            whatapps: emp.whatapps,
            telegram: emp.telegram,
            role_id: emp.role_id,
            designation_id: emp.employee_design,
            department_id: emp.employee_dept,
            role_id: emp.employee_role,
            employee_details: {
                id: emp.id,  
                address1: emp.address1,
                address2: emp.address2,
                postcode: emp.postcode,
                city: emp.city,
                country: emp.country,
                email: emp.email,
                phone: emp.phone,
                handphone: emp.handphone,
            }
        }));
        
          const dt = {
            status: res.statusCode,
            data: transformedEmployee,
            length: transformedEmployee.length,
          };
      
      res.json(dt);
  
    } catch (error) {
      console.error('Error retrieving employee registration:', error);
      res.status(500).send('Employee registration not found');
    }
   
};



/**
 * 
 * update emplyee
 */
const idEmployeeUpdate = async (req, res) => {
  const {
    name,
    email,
    phone,
    whatapps,
    telegram,
    company_id,
    role_id,
    department_id,
    designation_id,
    category_id,
    status
    } = req.body;
    const { id } = req.params;

  try {
    
    const updateEmployeeData = await db('employees')
    .where({id})
    .update(
      {
        name,
        email,
        phone,
        whatapps,
        telegram,
        department_id,
        designation_id,
        telegram,
        company_id,
        role_id,
        category_id,
        status
      });

      if(updateEmployeeData == 1){

        return res.status(201).json({
          status:  res.statusCode,
          message: 'Employee data update successfully',
        });
      }else{
        return res.json({
          status:  res.statusCode,
          message: 'Employee data update unsuccessfully',
        });
      }
       

  } catch(error) {
    console.error('Employee update fail or not found:', error);
    res.status(500).send('Employee update fail or not found')
  }
}

const idEmployeeDetailsUpdate = async (req, res) => {
  const {
          name,
          company_id,
          address1,
          address2,
          postcode,
          city,
          country,
          email,
          phone,
          handphone,
          spouse_name,
          spouse_bod,
          child_1,
          child_1_bod,
          child_2,
          child_2_bod,
          child_3,
          child_3_bod,
          child_4,
          child_4_bod,
          child_5,
          child_5_bod,
          child_6,
          child_6_bod,
    } = req.body;
    const { id } = req.params;

  try {
    
    const updateEmployeeData = await db('employee_details')
    .where('employee_id' , id)
    .update(
      {
        name,
        company_id,
        address1,
        address2,
        postcode,
        city,
        country,
        email,
        phone,
        handphone,
        spouse_name,
        spouse_bod,
        child_1,
        child_1_bod,
        child_2,
        child_2_bod,
        child_3,
        child_3_bod,
        child_4,
        child_4_bod,
        child_5,
        child_5_bod,
        child_6,
        child_6_bod,
      });

      if(updateEmployeeData == 1){
        return res.status(201).json({
          status:  res.statusCode,
          message: 'Employee data update successfully',
        });
      }else{
        return res.json({
          status:  res.statusCode,
          message: 'Employee data update unsuccessfully',
        });
      }
       
  } catch(error) {
    console.error('Employee update fail or not found:', error);
    res.status(500).send('Employee update fail or not found')
  }
}


module.exports = {
    getAllEmployee,
    allEmployeeByCompany,
    idEmployee,
    idEmployeeUpdate,
    idEmployeeDetailsUpdate
  };