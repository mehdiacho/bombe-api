/**
 * @swagger
 * components:
 *   schemas:
 *     Medicine:
 *       type: object
 *       required:
 *         - name
 *         - status
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the medicine.
 *         status:
 *           type: string
 *           description: The status of the medicine (e.g., in stock, out of stock).
 *         inStock:
 *           type: boolean
 *           description: Whether the medicine is in stock.
 *         manufacturer:
 *           type: string
 *           description: The manufacturer or pharmaceutical company that produces the medicine.
 *         dosage:
 *           type: string
 *           description: The recommended dosage for the medicine.
 *         expirationDate:
 *           type: string
 *           format: date
 *           description: The expiration date of the medicine (YYYY-MM-DD).
 *         price:
 *           type: number
 *           description: The price of the medicine.
 *         quantity:
 *           type: integer
 *           description: The quantity of the medicine in stock.
 *         description:
 *           type: string
 *           description: Additional information or description of the medicine.
 *       example:
 *         name: Paracetamol
 *         status: In Stock
 *         inStock: false
 *         manufacturer: Pharma Co.
 *         dosage: 10mg
 *         expirationDate: 2024-12-31
 *         price: 29.99
 *         quantity: 100
 *         description: Pain reliever
 */

