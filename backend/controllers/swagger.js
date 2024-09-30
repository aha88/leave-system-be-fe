//----------------------------------------------------------------------------------------------------------------------------------------//
//                   USER                                                                                                             //
//----------------------------------------------------------------------------------------------------------------------------------------//

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: User login
 *     description: Authenticates a user with their email and password, returning a JWT token on success.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "aizat@email.com"
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "aizat"
 *     responses:
 *       200:
 *         description: Login successful, returns JWT token and user details.
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Retrieve all users
 *     tags:
 *       - User
 *     security:
 *       - xTokenAuth: []   
 *     responses:
 *       200:
 *         description: Success Retretive
 *       403:
 *         description: Unauthorized request
 */


/**
 * @swagger
 * /api/user/{id}:
 *   get:
 *     summary: Retrieve a user by ID
 *     tags:
 *       - User
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the user to retrieve
 *         schema:
 *           type: integer
 *     security:
 *       - xTokenAuth: []  # This requires the x-token header
 *     responses:
 *       200:
 *         description: User retrieved successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Error retrieving user
 */

//----------------------------------------------------------------------------------------------------------------------------------------//
//                   EMPLOYEE                                                                                                             //          
//----------------------------------------------------------------------------------------------------------------------------------------//

/**
 * @swagger
 * /api/employees:
 *  get:
 *    summary: Retreive all customers
 *    tags:
 *      - Employee
 *    security:
 *      - xTokenAuth: []
 *    responses:
 *       200:
 *         description: Success Retretive
 *       403:
 *         description: Unauthorized request 
 */

/**
 * @swagger
 * /api/employeeCompany/{id}:
 *  get:
 *    summary: Retreive all customers
 *    tags:
 *      - Employee
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

/**
 * @swagger
 * /api/employee/{id}:
 *  get:
 *    summary: Retreive all customers
 *    tags:
 *      - Employee
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


/**
 * @swagger
 * /api/employee_update/{id}:
 *   post:
 *     summary: Update employee data
 *     tags:
 *       - Employee
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the employee
 *         schema:
 *           type: integer
 *     security:
 *       - xTokenAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - bod
 *               - email
 *               - phone
 *               - whatapps
 *               - telegram
 *               - role_id
 *               - designation_id
 *               - department_id
 *               - category_id
 *               - company_id
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Aizat"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "aizat@email.com"
 *               phone:
 *                 type: string
 *                 example: "6789123123"
 *               whatapps:
 *                 type: string
 *                 example: "6789123123"
 *               telegram:
 *                 type: string
 *                 example: "16789123123"
 *               company_id:
 *                 type: integer
 *                 example: 1
 *               role_id:
 *                 type: integer
 *                 example: 1
 *               department_id:
 *                 type: integer
 *                 example: 1
 *               designation_id:
 *                 type: integer
 *                 example: 1
 *               category_id:
 *                 type: integer
 *                 example: 1
 *               status:
 *                 type: string
 *                 example: "A"
 *     responses:
 *       200:
 *         description: Success
 *       403:
 *         description: Unauthorized request
 */

/**
 * @swagger
 * /api/employee_details_update/{id}:
 *   post:
 *     summary: Update employee details data
 *     tags:
 *       - Employee
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the employee
 *         schema:
 *           type: integer
 *     security:
 *       - xTokenAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name,
 *               - company_id,
 *               - address1,
 *               - address2,
 *               - postcode,
 *               - city,
 *               - country,
 *               - email,
 *               - phone,
 *               - handphone,
 *               - spouse_name,
 *               - spouse_bod,
 *               - child_1,
 *               - child_1_bod,
 *               - child_2,
 *               - child_2_bod,
 *               - child_3,
 *               - child_3_bod,
 *               - child_4,
 *               - child_4_bod,
 *               - child_5,
 *               - child_5_bod,
 *               - child_6,
 *               - child_6_bod,
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Aizat"
 *               company_id:
 *                 type: integer
 *                 example: 1
 *               address1:
 *                 type: string
 *                 example: "no1 jalan"
 *               address2:
 *                 type: string
 *                 example: ""
 *               postcode:
 *                 type: string
 *                 example: ""
 *               city:
 *                 type: string
 *                 example: "kl"
 *               country:
 *                 type: string
 *                 example: "MY"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "aiz@perosnal.com"
 *               phone:
 *                 type: string
 *                 example: "131231231"
 *               handphone:
 *                 type: string
 *                 example: "4514121231"
 *               spouse_name:
 *                 type: string
 *                 example: "Nor A"
 *               spouse_bod:
 *                 type: string
 *                 format: date
 *                 example: "1998-11-11"
 *               child_1:
 *                 type: string
 *                 example: "Nor A"
 *               child_1_bod:
 *                 type: string
 *                 format: date
 *                 example: "1998-11-11"
 *               child_2:
 *                 type: string
 *                 example: "Nor A"
 *               child_2_bod:
 *                 type: string
 *                 format: date
 *                 example: "1998-11-11"
 *               child_3:
 *                 type: string
 *                 example: "Nor A"
 *               child_3_bod:
 *                 type: string
 *                 format: date
 *                 example: "1998-11-11"
 *               child_4:
 *                 type: string
 *                 example: "Nor A"
 *               child_4_bod:
 *                 type: string
 *                 format: date
 *                 example: "1998-11-11"
 *               child_5:
 *                 type: string
 *                 example: "Nor A"
 *               child_5_bod:
 *                 type: string
 *                 format: date
 *                 example: "1998-11-11"
 *               child_6:
 *                 type: string
 *                 example: "Nor A"
 *               child_6_bod:
 *                 type: string
 *                 format: date
 *                 example: "1998-11-11"       
 *               department_id:
 *                 type: integer
 *                 example: 1
 *               designation_id:
 *                 type: integer
 *                 example: 1
 *               category_id:
 *                 type: integer
 *                 example: 1
 *               status:
 *                 type: string
 *                 example: "A"
 *     responses:
 *       200:
 *         description: Success
 *       403:
 *         description: Unauthorized request
 */