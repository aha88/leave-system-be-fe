const db = require('../db');
const {verifyToken} = require('../service/generateToken')
/**
 * @swagger
 * /api/customers:
 *  get:
 *    summary: Retreive all customers
 *    tags:
 *      - Customers
 *    security:
 *      - xTokenAuth: []
 *    responses:
 *       200:
 *         description: Success Retretive
 *       403:
 *         description: Unauthorized request 
 */
// Get all customers
const getAllCustomer = async (req, res) => {

  
  try {
    const customers = await db('customer_registration')
      .select('customer_registration.*', 'status_registration.name as status_name') 
      .join('status_registration', 'status_registration.id', 'customer_registration.status_id');
    
    const transformedCustomers = customers.map(customer => ({
      ...customer,
      status_registration: {
        status_name: customer.status_name,
        status_description: customer.status_description,
      }
    }));

    const dt = {
      status: res.statusCode,
      data: transformedCustomers,
      length: transformedCustomers.length,
    };

    res.json(dt);

  } catch (error) {
    console.error('Error retrieving customer registration:', error);
    res.status(500).send('Error retrieving customer registration');
  }
};


/**
 * @swagger
 * /api/customer/{id}:
 *  get:
 *    summary: Retreive all customers
 *    tags:
 *      - Customers
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        description: The ID of customer
 *        schema:
 *          type: integer
 *    security:
 *      - xTokenAuth: []
 *    responses:
 *       200:
 *         description: Success Retretive
 *       403:
 *         description: Unauthorized request
 *       404:
 *         description: Customer registration not found
 */
// id a customer
const idCustomer = async (req, res) => {
  const id = req.params.id
  

 
  try {
    const customers = await db('customer_registration')
    .select('customer_registration.*', 'status_registration.name as status_name') 
    .join('status_registration', 'status_registration.id', 'customer_registration.status_id')
    .where({ 'customer_registration.id':id });
  
  const transformedCustomers = customers.map(customer => ({
    ...customer,
    status_registration: {
      status_name: customer.status_name,
      status_description: customer.status_description,
    }
  }));


    if (transformedCustomers.length) {

      const data= [{
        'status': res.statusCode,
        'data': transformedCustomers,
        'lenght': transformedCustomers.length
  
      }];
  
      res.json(data);

    } else {
      res.status(404).send('Customer registration not found');
    }
  } catch (error) {
    console.error('Error adding customer registration:', error);
    res.status(500).send('Error adding customer registration');
  }
};

/**
 * @swagger
 * /api/customers_delete/{id}:
 *  post:
 *    summary: Retreive all customers
 *    tags:
 *      - Customers
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        description: The ID of customer
 *        schema:
 *          type: integer
 *    security:
 *      - xTokenAuth: []
 *    responses:
 *       200:
 *         description: Success Retretive
 *       403:
 *         description: Unauthorized request 
 */
// deleteCustomer function
const deleteCustomer = async (req, res) => {
  const { id } = req.params;  
  
  try {
    const deletedRows = await db('customer_registration')
      .where({ id })  
      .del(); 

    if (deletedRows) {
      return res.status(200).json({
        status: 'success',
        message: `Customer with ID ${id} deleted successfully`,
      });
    } else {
      return res.status(404).json({
        status: 'error',
        message: 'Customer not found',
      });
    }

  } catch (error) {
    console.error('Error deleting customer:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Server error while deleting customer',
    });
  }
};

/**
 * @swagger
 * /api/customers_update/{id}:
 *  post:
 *    summary: Retreive all customers
 *    tags:
 *      - Customers
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        description: The ID of customer
 *        schema:
 *          type: integer
 *    security:
 *      - xTokenAuth: []
 *    requestBody:
 *     required: true
 *     content:
 *      application/json:
*        schema:
*          type: object
*          required:
*            - name
*            - email
*            - phone
*            - national_id
*            - birth_of_date
*            - address
*            - status_id
 *          properties:
  *            name:
  *              type: string
  *              example: "aizat"
  *            email:
  *              type: string
  *              format: email
  *              example: "aizat@email.com"
  *            phone:
  *              type: string
  *              example: "6789123123"
  *            national_id:
  *              type: integer
  *              example: 1
  *            birth_of_date:
  *              type: string
  *              format: date  # Changed to 'date' for clarity
  *              example: "1988-11-11"
  *            address:
  *              type: string
  *              example: "jalan 1, 46000 selangor"
  *            status_id:
  *              type: integer
  *              example: 1
 *    responses:
 *       200:
 *         description: Success Retretive
 *       403:
 *         description: Unauthorized request 
 */
// update a delete
const updateCustomer = async (req, res) => {
  const { 
    name, 
    email, 
    phone,
    national_id,
    birth_of_date,
    address,
    status_id
  } = req.body;
  const { id } = req.params

 
try {
     
  const data = await db('customer_registration')
    .where({id})
    .update({ name, email, phone, national_id, birth_of_date, address,status_id });

    if( data == 1) {
        return res.json({
          status: res.statusCode,
          message: 'Update Successful'
        });
      }else{
        return res.json({
          status: res.statusCode,
          message: 'fail'
        });
      }
  

  }  catch (error) {
    console.error( error);
    res.status(500).json({
      status: 'error',
      message: error
    });
  }

}

/**
 *  @swagger
 *  /api/customer/add:
 *   post:
 *    summary: add customer
 *    tags:
 *      - Customers
  *    security:
 *       - xTokenAuth: []  
 *    requestBody:
 *     required: true
 *     content:
 *      application/json:
*        schema:
*          type: object
*          required:
*            - name
*            - email
*            - phone
*            - national_id
*            - birth_of_date
*            - address
*            - status_id
 *          properties:
 *            name:
 *              type: string
 *              example: "aizat"
 *            email:
 *              type: string
 *              format: email
 *              example: "aizat@email.com"
 *            phone:
 *              type: string
 *              example: "6789123123"
 *            national_id:
 *              type: integer
 *              example: 1
 *            birth_of_date:
 *              type: string
 *              format: date  # Changed to 'date' for clarity
 *              example: "1988-11-11"
 *            address:
 *              type: string
 *              example: "jalan 1, 46000 selangor"
 *            status_id:
 *              type: integer
 *              example: 1
 *    responses:
 *       200:
 *         description: Customer added successfully.
 *       400:
 *         description: Bad request, validation errors.
 *       500:
 *         description: Internal server error.
 */

// Add a new user
const addCustomer = async (req, res) => {
  const { 
    name, 
    email, 
    phone,
    national_id,
    birth_of_date,
    address,
    status_id
     } = req.body;
  
  if (!name || !email) {
    return res.status(400).send('Name and email are required');
  }

  try {
    const [id] = await db('customer_registration').insert({ name, email, phone, national_id, birth_of_date, address, status_id });
    res.status(201).json({ id, name, email });
  } catch (error) {
    console.error('Error adding user:', error);
    res.status(500).send('Error adding user');
  }
};

module.exports = {
  deleteCustomer,
  updateCustomer,
  getAllCustomer,
  addCustomer,
  idCustomer
};
