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

/**
 * manager/subordinate to APPROVE leave
 * @param {id} req  employee id 
 * @returns 
 */
const approvedLeave = async (req, res) => {
  const { id } = req.params;
  const userAccess = req.userAccess;
  
  try {
    const employeesApprove = await db('leaves_pool')
    .where('leaves_pool.company_id', parseInt(userAccess.company_id))
    .where('leaves_pool.id', parseInt(id))
    .update({ status: 2 });

    return res.json({ 
      data : res.json({ status: 201, msg: "Leave Approved" })
    })

  } catch(err) {
      return res.json({ msg: error})
  }
}

/**
 * manager/subordinate to REJECT leave
 * @param {id, userAccess} req  employee id 
 * @returns 
 */
const rejectedLeave = async (req, res) => {
  const { id } = req.params;
  const userAccess = req.userAccess;
  
  try {
    const employeesApprove = await db('leaves_pool')
    .where('leaves_pool.company_id', parseInt(userAccess.company_id))
    .where('leaves_pool.id', parseInt(id))
    .update({ status: 3 });

    return res.json({ 
      data : res.json({ status: 201, msg: "Leave Approved" })
    })

  } catch(err) {
      return res.json({ msg: error})
  }
}

/**
 * manager/subordinate to REVOKED leave
 * @param {id} req  employee id 
 */
const revokedLeave = async (req, res) => {
  
  try {
    await db('leaves_pool')
    .where('leaves_pool.company_id', parseInt(userAccess.company_id))
    .where('leaves_pool.id', parseInt(id))
    .update({ status: 5 });

    return res.json({ 
      data : res.json({ status: 201, msg: "Leave Approved" })
    })

  } catch(err) {
      return res.json({ msg: error})
  }
}

/**
 * all user leave checked
 * @param {id, } req  company id 
 */
const leaveTotalHistory = async (req, res) => {
  const { id } = req.params;
  const userAccess = req.userAccess;

  try {
      const employeesLeaves = await db('leaves_pool')
    .select('leaves_pool.*','leave_types.name as leave_name','leave_types.id as leave_id')
    .join('leave_types', 'leaves_pool.leave_type_id', 'leave_types.id')
    .where('leaves_pool.company_id', parseInt(userAccess.company_id))
    .where('leaves_pool.employee_id', parseInt(userAccess.id))

    const dt = employeesLeaves.map(resp => ({
       companyID : resp.company_id,
       name : resp.name,
       company_id : resp.company_id,
       employee_id : resp.employee_id,
       duration : resp.duration,
       start_date : resp.start_date,
       end_date : resp.end_date,
       reason : resp.reason,
       attachment : resp.attachment,
       leave_type_id : {
        id: resp.leave_id,
        name: resp.leave_name
      },
       employor_id : resp.employor_id,
       employor_remarks : resp.employor_remarks,
       status : resp.status
      })
    );

     return res.json({ 
      data : dt
    })

  } catch (error) {
    return res.json({ msg: error})
  }
}

/**
 * user leaves history
 * @param {id, userAccess} req 
 */
const userleaveTotalHistory = async (req, res) => {
  const { id } = req.params;
  const userAccess = req.userAccess;

  try {
    const employeesLeaves = await db('leaves_pool')
    .select('leaves_pool.*','leave_types.name as leave_name','leave_types.id as leave_id')
    .join('leave_types', 'leaves_pool.leave_type_id', 'leave_types.id')
    .where('leaves_pool.company_id', parseInt(id))
    .where('leaves_pool.employee_id', parseInt(userAccess.id))


    const dt = employeesLeaves.map(resp => ({
       companyID : resp.company_id,
       name : resp.name,
       company_id : resp.company_id,
       employee_id : resp.employee_id,
       duration : resp.duration,
       start_date : resp.start_date,
       end_date : resp.end_date,
       reason : resp.reason,
       attachment : resp.attachment,
       leave_type_id : {
        id: resp.leave_id,
        name: resp.leave_name
      },
       employor_id : resp.employor_id,
       employor_remarks : resp.employor_remarks,
       status : resp.status
      })
    );

    return res.json({ 
      data : dt
    })

  } catch (error) {
    return res.json({ msg: error})
  }

}

module.exports = {
  getAllLeave,
  getAllLeaveByCompany,
  createLeave,
  updatedLeave,
  approvedLeave,
  rejectedLeave,
  revokedLeave,
  leaveTotalHistory,
  userleaveTotalHistory
};