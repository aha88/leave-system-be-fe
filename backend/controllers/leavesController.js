const db = require('../db');


const getAllLeave = async (req,res) => {
  if ([2, 3, 4].includes(req.userAccess.role_id)) {
    return res.status(405).json('You don\'t have the authorization');
  }

  try {
      const employeeLeaves = await db('leaves_pool')
          .select(
            'leaves_pool.*',
            'companies.name AS company_name',
            'employees.name AS employor_name',
            'status_leave_code.name AS status_name',
            'leave_types.name AS leave_type_name'
          )
          .leftJoin('companies', 'companies.id', 'leaves_pool.company_id')
          .leftJoin('leave_types', 'leave_types.id', 'leaves_pool.leave_type_id')
          .leftJoin('employees', 'employees.id', 'leaves_pool.employor_id')
          .leftJoin('status_leave_code', 'status_leave_code.id', 'leaves_pool.status');
     
      const transformedEmployeeLeaves = employeeLeaves.map(emp =>
         ({
            id: emp.id, 
            name: emp.name,  
            company_id: emp.company_id,  
            company_name: emp.company_name,
            employee_id: emp.employee_id,  
            duration: emp.duration, 
            start_date: emp.start_date,  
            end_date: emp.end_date, 
            reason: emp.reason,  
            attachment: emp.attachment,  
            leave_type_id: emp.leave_type_id,  
            employor_id: emp.employor_id,  
            employee_name: emp.employor_name,
            employor_remarks: emp.employor_remarks, 
            status: emp.status, 
            created_at: emp.created_at,  
            updated_at: emp.updated_at,  
            status_name: emp.status_name,
            leave_type_name: emp.leave_type_name
        })
      );
        
      const dt = {
        status: res.statusCode,
        data: transformedEmployeeLeaves,
        length: transformedEmployeeLeaves.length
      };

      res.json(dt);
  
    } catch (error) {
      console.error('Error retrieving employee registration:', error);
      res.status(500).send('Error retrieving employee registration');
    }
  

}

const getAllLeaveByCompany = async (req,res) => {
  if ([2, 3, 4].includes(req.userAccess.role_id)) {
    return res.status(405).json('You don\'t have the authorization');
  }

  try {
      const employeeLeaves = await db('leaves_pool')
          .select(
            'leaves_pool.*',
            'companies.name AS company_name',
            'employees.name AS employor_name',
            'status_leave_code.name AS status_name',
            'leave_types.name AS leave_type_name'
          )
          .leftJoin('companies', 'companies.id', 'leaves_pool.company_id')
          .leftJoin('leave_types', 'leave_types.id', 'leaves_pool.leave_type_id')
          .leftJoin('employees', 'employees.id', 'leaves_pool.employor_id')
          .leftJoin('status_leave_code', 'status_leave_code.id', 'leaves_pool.status')
          .where('leaves_pool.company_id', req.userAccess.company_id);
     
      const transformedEmployeeLeaves = employeeLeaves.map(emp =>
         ({
            id: emp.id, 
            name: emp.name,  
            company_id: emp.company_id,  
            company_name: emp.company_name,
            employee_id: emp.employee_id,  
            duration: emp.duration, 
            start_date: emp.start_date,  
            end_date: emp.end_date, 
            reason: emp.reason,  
            attachment: emp.attachment,  
            leave_type_id: emp.leave_type_id,  
            employor_id: emp.employor_id,  
            employee_name: emp.employor_name,
            employor_remarks: emp.employor_remarks, 
            status: emp.status, 
            created_at: emp.created_at,  
            updated_at: emp.updated_at,  
            status_name: emp.status_name,
            leave_type_name: emp.leave_type_name
        })
      );
        
      const dt = {
        status: res.statusCode,
        data: transformedEmployeeLeaves,
        length: transformedEmployeeLeaves.length
      };

      res.json(dt);
  
    } catch (error) {
      console.error('Error retrieving employee leaves:', error);
      res.status(500).send('Error retrieving employee leaves');
    }
}

const createLeave = async (req, res) => {
  
}

const updatedLeave = async (req, res) => {
}

const approvedLeave = async (req, res) => {
}

const rejectedLeave = async (req, res) => {
}

const revokedLeave = async (req, res) => {
}

const employeeleaveHistory = async (req, res) => {

  await db('leaves')
}


module.exports = {
  getAllLeave,
  getAllLeaveByCompany,
  createLeave,
  updatedLeave,
  approvedLeave,
  rejectedLeave,
  revokedLeave,
  employeeleaveHistory
};