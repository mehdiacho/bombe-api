const express = require('express');
const bodyParser = require('body-parser');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const { FieldValue } = require('firebase-admin/firestore');
const app = express();
const port = 8383;
const { db } = require('../firebase.js');

app.use(express.json())

const options = require('../swagger');

const specs = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

/**
 * @swagger
 * tags:
 *   name: Inventory
 *   description: The inventory managing API
 * /inventory/update-medicine/{medicineName}:
 *   patch:
 *     summary: Update medicine details selectively.
 *     tags: [Inventory]
 *     parameters:
 *       - in: path
 *         name: medicineName
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             description: An object containing the properties to update.
 *             example:
 *               {
 *                 status: "Out of Stock",
 *                 price: 39.99
 *               }
 *     responses:
 *       200:
 *         description: Medicine details updated successfully.
 *       404:
 *         description: Medicine not found.
 */
app.patch('/inventory/update-medicine/:medicineName', async (req, res) => {
    const { medicineName } = req.params;
    const updates = req.body;

    const inventoryRef = db.collection('inventory').doc('medicines').collection('drugs').doc(medicineName);

    try {
        const doc = await inventoryRef.get();

        if (!doc.exists) {
            res.status(404).send("Medicine not found.");
        } else {
            const currentData = doc.data();
            const updatedData = { ...currentData, ...updates };

            await inventoryRef.set(updatedData, { merge: true });
            res.status(200).send("Update successful");
        }
    } catch (error) {
        console.error('Error updating medicine', error);
        res.sendStatus(500);
    }
});

/**
 * @swagger
 * tags:
 *   name: Facilities
 *   description: Facility Management
 * /facilities/employees/{facilityID}:
 *   get:
 *     summary: Get a list of employees working at a specific facility.
 *     tags: [Facilities]
 *     parameters:
 *       - in: path
 *         name: facilityID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of employees at the facility.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   data:
 *                     type: object
 *       404:
 *         description: Facility not found.
 */
app.get('/facilities/employees/:facilityID', async (req, res) => {
    const { facilityID } = req.params;
    const facilityRef = db.collection('facilities').doc(facilityID);

    try {
        const facilityDoc = await facilityRef.get();

        if (!facilityDoc.exists) {
            res.status(404).send("Facility not found.");
            return;
        }

        const employeesRef = facilityRef.collection('employees');
        const querySnapshot = await employeesRef.get();
        const employees = [];

        querySnapshot.forEach((doc) => {
            employees.push({
                id: doc.id,
                data: doc.data()
            });
        });

        res.status(200).send(employees);
    } catch (error) {
        console.error('Error getting employees', error);
        res.sendStatus(500);
    }
});

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User Management
 * /users/update-profile:
 *   patch:
 *     summary: Update user profile information.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             description: An object containing the properties to update.
 *             example:
 *               {
 *                 name: "John Doe",
 *                 email: "john.doe@example.com",
 *                 phoneNumber: "123-456-7890"
 *               }
 *     responses:
 *       200:
 *         description: Profile updated successfully.
 *       404:
 *         description: User not found.
 */
app.patch('/users/update-profile', async (req, res) => {
    const updates = req.body;
    // Implement user authentication to get the user's ID or use an ID from the request, and then update the user's document.
    const userId = 'user123'; // Replace with actual user ID.
    const userRef = db.collection('users').doc(userId);

    try {
        const doc = await userRef.get();

        if (!doc.exists) {
            res.status(404).send("User not found.");
        } else {
            const currentData = doc.data();
            const updatedData = { ...currentData, ...updates };

            await userRef.set(updatedData, { merge: true });
            res.status(200).send("Profile updated successfully");
        }
    } catch (error) {
        console.error('Error updating profile', error);
        res.sendStatus(500);
    }
});

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User Management
 * /users/delete-account:
 *   delete:
 *     summary: Delete user account.
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: User account deleted successfully.
 *       404:
 *         description: User not found.
 */
app.delete('/users/delete-account', async (req, res) => {
    // Implement user authentication to get the user's ID or use an ID from the request, and then delete the user's document.
    const userId = 'user123'; // Replace with actual user ID.
    const userRef = db.collection('users').doc(userId);

    try {
        const doc = await userRef.get();

        if (!doc.exists) {
            res.status(404).send("User not found.");
        } else {
            await userRef.delete();
            res.status(200).send("User account deleted successfully");
        }
    } catch (error) {
        console.error('Error deleting user account', error);
        res.sendStatus(500);
    }
});

/**
 * @swagger
 * tags:
 *   name: Inventory
 *   description: The inventory managing API
 * /inventory/create-tag:
 *   post:
 *     summary: Create a new tag for inventory items.
 *     tags: [Inventory]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the new tag.
 *                 example: "New Tag"
 *               description:
 *                 type: string
 *                 description: Additional information about the tag.
 *                 example: "This is a new tag for items."
 *           required:
 *             - name
 *     responses:
 *       200:
 *         description: Tag created successfully.
 */
app.post('/inventory/create-tag', async (req, res) => {
    const { name, description } = req.body;

    const tagsRef = db.collection('inventory').doc('tags').collection('tagList');
    const res2 = await tagsRef.add({
        name,
        description
    });

    res.status(200).send(`Tag created successfully`);
});
//tag logic: if tag already exists, skip it. otherwise add tag
// (you could retrieve the list of tags first then compare,
// then return a list that contains only new tags that will merge
// with the current list


// Add more endpoints for medicine procurement as needed.


app.listen(port, () => console.log(`Server has started on port: ${port}`))
