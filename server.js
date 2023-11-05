const express = require('express');
const bodyParser = require('body-parser');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
//const { FieldValue } = require('firebase-admin/firestore');
const app = express();
const port = 8383;
const { db } = require('./firebase.js');
const {collection, doc, setDoc} = require("firebase/firestore")

app.use(express.json())

const options = require('./swagger');
const {admin} = require("./firebase");

const specs = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));



/**
 * @swagger
 * tags:
 *   name: Inventory
 *   description: The inventory managing API
 * /inventory:
 *   get:
 *     summary: Get a list of all inventory.
 *     tags: [Inventory]
 *     responses:
 *       200:
 *         description: List of inventory.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Medicine'
 *               type: array
 *               example: ["Item1", "Item2"]
 *               items:
 *                 type: string
 */
app.get('/inventory', async (req, res) => {
    const inventoryRef = collection(db, 'inventory');

    try {
        const querySnapshot = await inventoryRef.get();
        const documents = [];

        querySnapshot.forEach((doc) => {
            //documents.push(doc.data());
            documents.push(doc.id);
        });

        res.status(200).send(documents);
    } catch (error) {
        console.error('Error getting list', error);
        res.sendStatus(500);
    }
})

/**
 * @swagger
 * tags:
 *   name: Medicines
 *   description: The inventory managing API
 * /medicines:
 *   get:
 *     summary: Get a list of medicines in the inventory.
 *     tags: [Inventory]
 *     responses:
 *       200:
 *         description: List of medicines in the inventory.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Medicine'
 *               type: array
 *               example: ["Medicine1", "Medicine2"]
 *               items:
 *                 type: string
 */
app.get('/medicines', async (req, res) => {
    const inventoryRef = db.collection('inventory').doc('medicines').collection('drugs');

    try {
        const querySnapshot = await inventoryRef.get();
        const documents = [];

        querySnapshot.forEach((doc) => {
            //documents.push(doc.data());
            documents.push(doc.id);
        });

        res.status(200).send(documents);
    } catch (error) {
        console.error('Error getting documents', error);
        res.sendStatus(500);
    }
})

/**
 * @swagger
 * tags:
 *   name: Medicines
 *   description: The inventory managing API
 * /tags:
 *   get:
 *     summary: Get a list of all tags in the inventory.
 *     tags: [Inventory]
 *     responses:
 *       200:
 *         description: List of tags in the inventory.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Medicine'
 *               type: array
 *               example: ["tag1", "tag2"]
 *               items:
 *                 type: string
 */
app.get('/tags', async (req, res) => {
    const inventoryRef = db.collection('inventory').doc('tags')

    try {
        const querySnapshot = await inventoryRef.get();
        const documents = [];
        //write code to retrieve a list of tags
        querySnapshot.forEach((doc) => {
            //documents.push(doc.data());
            documents.push(doc.id);
        });

        res.status(200).send(documents);
    } catch (error) {
        console.error('Error getting documents', error);
        res.sendStatus(500);
    }
})

/**
 * @swagger
 * tags:
 *   name: Medicines
 *   description: The inventory managing API
 * /medicines/{name}:
 *   get:
 *     summary: Get medicine information by name.
 *     tags: [Inventory]
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Medicine information.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "paracetamol"
 *                 data:
 *                   type: object
 *                   example: {
 *                     name: "paracetamol",
 *                     status: "In Stock",
 *                     manufacturer: "Pharma Co.",
 *                     dosage: "10mg",
 *                     expirationDate: "2024-12-31",
 *                     price: 29.99,
 *                     quantity: 100,
 *                     description: "Pain reliever"
 *                   }
 *       404:
 *         description: Medicine not found.
 */
app.get('/medicines/:name', async (req, res) => {
    const { name } = req.params


    const inventoryRef = db.collection('inventory').doc('medicines').collection('drugs');

    try {
        const querySnapshot = await inventoryRef.where("name", "==", name).get();
        const documents = []

        querySnapshot.forEach((doc) => {
            documents.push({
                id: doc.id,
                data: doc.data()
            });
            //documents.push(doc.id);
        });

        res.status(200).send(documents);
    } catch (error) {
        console.error('Error getting documents', error);
        res.sendStatus(500);
    }
})

/**
 * @swagger
 * tags:
 *   name: Medicines
 *   description: The inventory managing API
 * /tags/{name}:
 *   get:
 *     summary: Get list of inventory by tag name.
 *     tags: [Inventory]
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Inventory Tag List.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "pain-killer"
 *                 data:
 *                   type: object
 *                   example: {
 *                     name: "paracetamol",
 *                     status: "In Stock",
 *                     manufacturer: "Pharma Co.",
 *                     dosage: "10mg",
 *                     expirationDate: "2024-12-31",
 *                     price: 29.99,
 *                     quantity: 100,
 *                     description: "Pain reliever",
 *                     tags: ["pain-reliever", "pain-killer"]
 *                   }
 *       404:
 *         description: Tag not found.
 */
app.get('/tags/:name', async (req, res) => {
    const { name } = req.params


    const inventoryRef = db.collection('inventory').doc('medicines').collection('drugs');

    try {
        const querySnapshot = await inventoryRef.where("tags", "==", name).get();
        const documents = []

        querySnapshot.forEach((doc) => {
            documents.push({
                id: doc.id,
                data: doc.data()
            });
            //documents.push(doc.id);
        });

        res.status(200).send(documents);
    } catch (error) {
        console.error('Error getting list', error);
        res.sendStatus(500);
    }
})

/**
 * @swagger
 * tags:
 *   name: Medicines
 *   description: The inventory managing API
 * /add-batch:
 *   post:
 *     summary: Add a new batch of medicine to the inventory.
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
 *                 description: The name of the medicine.
 *                 example: "paracetamol"
 *               status:
 *                 type: string
 *                 description: The status of the medicine (e.g., in stock, out of stock).
 *                 example: "In Stock"
 *               inStock:
 *                 type: boolean
 *                 description: The status of the medicine (e.g., in stock, out of stock).
 *                 example: false
 *               manufacturer:
 *                 type: string
 *                 description: The manufacturer or pharmaceutical company that produces the medicine.
 *                 example: "Pharma Co."
 *               dosage:
 *                 type: string
 *                 description: The recommended dosage for the medicine.
 *                 example: "10mg"
 *               expirationDate:
 *                 type: string
 *                 format: date
 *                 description: The expiration date of the medicine (YYYY-MM-DD).
 *                 example: "2024-12-31"
 *               price:
 *                 type: number
 *                 description: The price of the medicine.
 *                 example: 29.99
 *               quantity:
 *                 type: integer
 *                 description: The quantity of the medicine in stock.
 *                 example: 100
 *               description:
 *                 type: string
 *                 description: Additional information or description of the medicine.
 *                 example: "Pain reliever"
 *           required:
 *             - name
 *             - status
 *     responses:
 *       200:
 *         description: Medicine added to the inventory successfully.
 */
app.post('/add-batch', async (req, res) => {
    const {
        name,
        status,
        inStock,
        manufacturer,
        dosage,
        expirationDate,
        price,
        quantity,
        description
    } = req.body;

    const inventoryRef = db.collection('inventory').doc('medicines').collection(`drugs`).doc(name);
    const res2 = await inventoryRef.set({
        name,
        status,
        inStock,
        manufacturer,
        dosage,
        expirationDate,
        price,
        quantity,
        description
    }, { merge: true });

    res.status(200).send(`Medicine created successfully`);
});

/**
 * @swagger
 * tags:
 *   name: Medicines
 *   description: The inventory managing API
 * /add-medicine:
 *   post:
 *     summary: Add a new medicine to the inventory.
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
 *                 description: The name of the medicine.
 *                 example: "paracetamol"
 *               status:
 *                 type: string
 *                 description: The status of the medicine (e.g., in stock, out of stock).
 *                 example: "In Stock"
 *               inStock:
 *                 type: boolean
 *                 description: The status of the medicine (e.g., in stock, out of stock).
 *                 example: false
 *               manufacturer:
 *                 type: string
 *                 description: The manufacturer or pharmaceutical company that produces the medicine.
 *                 example: "Pharma Co."
 *               dosage:
 *                 type: string
 *                 description: The recommended dosage for the medicine.
 *                 example: "10mg"
 *               expirationDate:
 *                 type: string
 *                 format: date
 *                 description: The expiration date of the medicine (YYYY-MM-DD).
 *                 example: "2024-12-31"
 *               price:
 *                 type: number
 *                 description: The price of the medicine.
 *                 example: 29.99
 *               quantity:
 *                 type: integer
 *                 description: The quantity of the medicine in stock.
 *                 example: 100
 *               description:
 *                 type: string
 *                 description: Additional information or description of the medicine.
 *                 example: "Pain reliever"
 *           required:
 *             - name
 *             - status
 *     responses:
 *       200:
 *         description: Medicine added to the inventory successfully.
 */
app.post('/add-medicine', async (req, res) => {
    const {
        name,
        status,
        inStock,
        manufacturer,
        dosage,
        expirationDate,
        price,
        quantity,
        description
    } = req.body;

    const inventoryRef = db.collection('inventory').doc('medicines').collection(`drugs`).doc(name);
    const res2 = await inventoryRef.set({
        name,
        status,
        inStock,
        manufacturer,
        dosage,
        expirationDate,
        price,
        quantity,
        description
    }, { merge: true });

    res.status(200).send(`Medicine created successfully`);
});

/**
 * @swagger
 * tags:
 *   name: Medicines
 *   description: The inventory managing API
 * /update-batch:
 *   patch:
 *     summary: Update batch information selectively.
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
 *                 description: The name of the medicine to update.
 *                 example: "paracetamol"
 *               updates:
 *                 type: object
 *                 description: An object containing the properties to update.
 *                 example:
 *                   {
 *                     status: "Out of Stock",
 *                     price: 39.99
 *                   }
 *     responses:
 *       200:
 *         description: Medicine information updated successfully.
 *       404:
 *         description: Medicine not found.
 */
app.patch('/update-batch', async (req, res) => {
    const { name, updates } = req.body;
    const inventoryRef = db.collection('inventory').doc('medicines').collection('drugs').doc(name);

    try {
        const doc = await inventoryRef.get();

        if (!doc.exists) {
            res.status(404).send("Batch not found.");
        } else {
            const currentData = doc.data();
            const updatedData = { ...currentData, ...updates };

            await inventoryRef.set(updatedData, { merge: true });
            res.status(200).send("Batch information updated successfully.");
        }
    } catch (error) {
        console.error('Error updating batch', error);
        res.sendStatus(500);
    }
})

/**
 * @swagger
 * tags:
 *   name: Medicines
 *   description: The inventory managing API
 * /update-medicine:
 *   patch:
 *     summary: Update medicine information selectively.
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
 *                 description: The name of the medicine to update.
 *                 example: "paracetamol"
 *               updates:
 *                 type: object
 *                 description: An object containing the properties to update.
 *                 example:
 *                   {
 *                     status: "Out of Stock",
 *                     price: 39.99
 *                   }
 *     responses:
 *       200:
 *         description: Medicine information updated successfully.
 *       404:
 *         description: Medicine not found.
 */
app.patch('/update-medicine', async (req, res) => {
    const { name, updates } = req.body;
    const inventoryRef = db.collection('inventory').doc('medicines').collection('drugs').doc(name);

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
})

/**
 * @swagger
 * tags:
 *   name: Medicines
 *   description: The inventory managing API
 * /delete-batch:
 *   delete:
 *     summary: Delete a batch by id.
 *     tags: [Inventory]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: The ID of the medicine to delete.
 *                 example: "paracetamol"
 *     responses:
 *       200:
 *         description: Medicine deleted from the inventory successfully.
 */
app.delete('/delete-batch', async (req, res) => {
    const { id } = req.body
    const inventoryRef = db.collection('inventory').doc('medicines').collection('drugs').doc(id);

    try {
        const doc = await inventoryRef.get();

        if (!doc.exists) {
            res.status(404).send("Batch not found.");
        } else {
            await inventoryRef.delete();
            res.status(200).send("Batch deleted from the inventory successfully.");
        }
    } catch (error) {
        console.error('Error deleting batch', error);
        res.sendStatus(500);
    }
})

/**
 * @swagger
 * tags:
 *   name: Medicines
 *   description: The inventory managing API
 * /delete-medicine:
 *   delete:
 *     summary: Delete a medicine by id.
 *     tags: [Inventory]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: The ID of the medicine to delete.
 *                 example: "paracetamol"
 *     responses:
 *       200:
 *         description: Medicine deleted from the inventory successfully.
 */
app.delete('/delete-medicine', async (req, res) => {
    const { id } = req.body
    const inventoryRef = db.collection('inventory').doc('medicines').collection('drugs').doc(id);

    try {
        const doc = await inventoryRef.get();

        if (!doc.exists) {
            res.status(404).send("Medicine not found.");
        } else {
            await inventoryRef.delete();
            res.status(200).send("Medicine deleted from the inventory successfully.");
        }
    } catch (error) {
        console.error('Error deleting medicine', error);
        res.sendStatus(500);
    }
})

/**
 * @swagger
 * tags:
 *   name: Accounts
 *   description: Account Management
 * /facilities/create-account:
 *   post:
 *     summary: Create a new medicine-providing facility account.
 *     tags: [Accounts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the facility.
 *                 example: "ABC Pharmacy"
 *               location:
 *                 type: string
 *                 description: The location of the facility.
 *                 example: "123 Main St, City"
 *               contact:
 *                 type: string
 *                 description: Contact information for the facility.
 *                 example: "info@abcpharmacy.com"
 *             required:
 *               - name
 *               - location
 *     responses:
 *       200:
 *         description: Medicine-providing facility account created successfully.
 */
app.post('/facilities/create-account', async (req, res) => {
    const { name, location, contact } = req.body;

    const facilityRef = db.collection('facilities');
    const res2 = await facilityRef.add({
        name,
        location,
        contact,
    });

    res.status(200).send(`Medicine-providing facility account created successfully`);
});

/**
 * @swagger
 * tags:
 *   name: Accounts
 *   description: Account Management
 * /facilities/add-employee:
 *   post:
 *     summary: Add an employee to a specific medicine-providing facility.
 *     tags: [Accounts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               facilityId:
 *                 type: string
 *                 description: The ID of the facility where the employee will be added.
 *                 example: "facility123"
 *               name:
 *                 type: string
 *                 description: The name of the employee.
 *                 example: "John Doe"
 *               position:
 *                 type: string
 *                 description: The position or role of the employee.
 *                 example: "Pharmacist"
 *               contact:
 *                 type: string
 *                 description: Contact information for the employee.
 *                 example: "johndoe@email.com"
 *             required:
 *               - facilityId
 *               - name
 *     responses:
 *       200:
 *         description: Employee added to the facility successfully.
 *       404:
 *         description: Facility not found.
 */
app.post('/facilities/add-employee', async (req, res) => {
    const { facilityId, name, position, contact } = req.body;

    const facilityRef = db.collection('facilities').doc(facilityId);
    const facilityDoc = await facilityRef.get();

    if (!facilityDoc.exists) {
        res.status(404).send("Facility not found.");
        return;
    }

    const employeesRef = facilityRef.collection('employees');
    const res2 = await employeesRef.add({
        name,
        position,
        contact,
    });

    res.status(200).send(`Employee added to the facility successfully`);
});










/**
 * @swagger
 * tags:
 *   name: Accounts
 *   description: Account Management
 * /create-user:
 *   post:
 *     summary: Create a new user account for medicine procurement.
 *     tags: [Accounts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username of the user.
 *                 example: "john_doe"
 *               email:
 *                 type: string
 *                 description: The email address of the user.
 *                 example: "john@example.com"
 *               password:
 *                 type: string
 *                 description: The user's password.
 *                 example: "password123"
 *             required:
 *               - username
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: User account created successfully.
 */
app.post('/create-user', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Create a user in Firebase Authentication
        const userRecord = await admin.auth().createUser({
            displayName: username,
            email: email,
            password: password,
        });

        // Get the user's unique ID

        // Create a user document in Firestore
        const user = {
            username: username,
            email: email,
            role: "user"
            // Add other user-related properties if needed
        };
        await db.collection('users').doc(userRecord.uid).set(user);

        res.status(200).send(`User account created successfully`);
    } catch (error) {
        console.error('Error creating user account: ' + error.message);
        res.sendStatus(500);
    }
})

/**
 * @swagger
 * tags:
 *   name: Accounts
 *   description: Account Management
 * /users/sign-in:
 *   post:
 *     summary: Authenticate and sign in as a user.
 *     tags: [Accounts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The user's email address.
 *                 example: "john@example.com"
 *               password:
 *                 type: string
 *                 description: The user's password.
 *                 example: "password123"
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: User authenticated and signed in successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A message indicating successful sign-in.
 *                   example: "User authenticated and signed in successfully"
 *                 userId:
 *                   type: string
 *                   description: The user's ID.
 *                   example: "user123"
 *       401:
 *         description: Authentication failed.
 */
app.post('/users/sign-in', async (req, res) => {
    const { email, password } = req.body;
    const apikey = "AIzaSyB3HPIWtVI0f21JhPVuusLcV8xzGYPeo1M"

    try {
        // Implement user authentication and sign-in logic with Firebase Authentication
        const signInEndpoint = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apikey}`; // Replace with your Firebase API key

        const signInData = {
            email: email,
            password: password,
            returnSecureToken: true,
        };

        // Send a POST request to Firebase Auth for sign-in
        const axios = require('axios');
        const response = await axios.post(signInEndpoint, signInData);

        if (response.data.idToken) {
            // User signed in successfully
            const userId = response.data.localId; // Extract the user ID
            const responseData = {
                message: 'User authenticated and signed in successfully',
                userId: userId, // Include the user ID in the response data
            };
            res.status(200).json(responseData);
        } else {
            // Authentication failed
            res.sendStatus(401);
        }
    } catch (error) {
        console.error('Authentication failed', error);
        res.sendStatus(401);
    }
});

/**
 * @swagger
 * tags:
 *   name: Medicine Procurement
 *   description: Medicine Procurement API
 * /users/load-prescription:
 *   post:
 *     summary: Allows users to upload a prescription.
 *     tags: [Medicine Procurement]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: The user's ID.
 *                 example: "user123"
 *               prescription:
 *                 type: string
 *                 description: The prescription details or image.
 *                 example: "Prescription details..."
 *             required:
 *               - userId
 *               - prescription
 *     responses:
 *       200:
 *         description: Prescription uploaded successfully.
 */
app.post('/users/load-prescription', async (req, res) => {
    const { userId, prescription } = req.body;

    try {
        // Implement prescription storage logic in the user's document in Firestore
        const userRef = db.collection('users').doc(userId);

        // Update the user's document with the prescription
        await userRef.update({ prescription: prescription });

        res.status(200).send(`Prescription uploaded successfully`);
    } catch (error) {
        console.error('Error uploading prescription', error);
        res.sendStatus(500);
    }
});

/**
 * @swagger
 * tags:
 *   name: Medicine Procurement
 *   description: Medicine Procurement API
 * /users/retrieve-prescription:
 *   get:
 *     summary: Retrieves a user's stored prescription.
 *     tags: [Medicine Procurement]
 *     parameters:
 *       - in: query
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User's prescription retrieved successfully.
 *       404:
 *         description: Prescription not found.
 */
app.get('/users/retrieve-prescription', async (req, res) => {
    const userId = req.query.userId;

    // Implement logic to retrieve the user's prescription from Firestore
    try {
        const userDoc = await firebase.firestore().collection('users').doc(userId).get();
        if (!userDoc.exists) {
            res.status(404).send("Prescription not found");
            return;
        }

        const prescription = userDoc.data().prescription;
        res.status(200).send(prescription);
    } catch (error) {
        console.error('Error retrieving prescription', error);
        res.sendStatus(404);
    }
});

/**
 * @swagger
 * tags:
 *   name: Accounts
 *   description: Account Management
 * /users/get-id:
 *   get:
 *     summary: Retrieve the currently signed-in user's ID.
 *     tags: [Accounts]
 *     responses:
 *       200:
 *         description: User ID retrieved successfully.
 *       401:
 *         description: User not authenticated.
 */
app.get('/users/get-id', async (req, res) => {
    const idToken = req.headers.authorization; // Get the ID token from the request headers

    try {
        // Verify the ID token to get the user's UID
        const decodedToken = await admin.auth().verifyIdToken(idToken);

        // Retrieve the user's UID
        const uid = decodedToken.uid;

        res.status(200).send(uid);
    } catch (error) {
        console.error('Error retrieving user ID', error);
        res.sendStatus(401);
    }
});

/**
 * @swagger
 * tags:
 *   name: Medicine Procurement
 *   description: Medicine procurement API
 * /facilities/search-medicine:
 *   get:
 *     summary: Search for medicine-providing facilities by medicine and location.
 *     tags: [Medicine Procurement]
 *     parameters:
 *       - in: query
 *         name: medicine
 *         required: true
 *         schema:
 *           type: string
 *         description: The name of the required medicine.
 *       - in: query
 *         name: location
 *         required: true
 *         schema:
 *           type: string
 *         description: The location for searching facilities.
 *     responses:
 *       200:
 *         description: List of facilities that have the required medicine.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Facility'
 */
app.get('/facilities/search-medicine', async (req, res) => {
    const { medicine, location } = req.query;

    try {
        const facilitiesRef = db.collection('facilities');
        const querySnapshot = await facilitiesRef
            .where('location', '==', location)
            .where('medicines', 'array-contains', medicine)
            .get();
        const facilities = [];

        querySnapshot.forEach((doc) => {
            facilities.push(doc.data());
        });

        res.status(200).send(facilities);
    } catch (error) {
        console.error('Error searching for facilities', error);
        res.sendStatus(500);
    }
});

/**
 * @swagger
 * tags:
 *   name: Medicine Procurement
 *   description: Medicine procurement API
 * /orders/place-order:
 *   post:
 *     summary: Place an order for medicine at a specific facility.
 *     tags: [Medicine Procurement]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 description: The ID of the user placing the order.
 *                 example: "user123"
 *               facilityId:
 *                 type: string
 *                 description: The ID of the facility where the order is placed.
 *                 example: "facility456"
 *               medicine:
 *                 type: string
 *                 description: The name of the medicine being ordered.
 *                 example: "paracetamol"
 *               quantity:
 *                 type: integer
 *                 description: The quantity of the medicine being ordered.
 *                 example: 10
 *               orderDate:
 *                 type: string
 *                 format: date
 *                 description: The date when the order is placed (YYYY-MM-DD).
 *                 example: "2023-12-15"
 *           required:
 *             - userId
 *             - facilityId
 *             - medicine
 *             - quantity
 *             - orderDate
 *     responses:
 *       200:
 *         description: Order placed successfully.
 */
app.post('/orders/place-order', async (req, res) => {
    const { userId, facilityId, medicine, quantity, orderDate } = req.body;

    const ordersRef = db.collection('orders');

    try {
        const newOrder = {
            userId,
            facilityId,
            medicine,
            quantity,
            orderDate,
        };

        const orderRef = await ordersRef.add(newOrder);
        res.status(200).send(`Order placed successfully with ID: ${orderRef.id}`);
    } catch (error) {
        console.error('Error placing order', error);
        res.sendStatus(500);
    }
});




app.listen(port, () => console.log(`Server has started on port: ${port}`))
