const express = require("express");
const router = express.Router();
const elasticController = require("../../controllers/elasticControllers");


/**
 * @openapi
 * /api/v1/document:
 *   get:
 *     summary: Get all documents
 *     parameters:
 *      - in: query
 *        name: complete
 *        schema:
 *          type: string
 *        description: Send "true" to tell the response to return the complete information of the document
 *     tags:
 *       - Documents
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array 
 *                   items: 
 *                     type: object
 *       402:
 *         description: Failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: 
 *                   type: string
 *                   example: Failed
 *                 data:
 *                   type: object
 *                   properties:
 *                     error:
 *                       type: string 
 *                       example: "Some error message"
 *   post:
 *     summary: Create a document with a random ID
 *     tags:
 *       - Documents
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *                title:
 *                  type: string
 *                location:
 *                  type: string
 *                contentType:
 *                  type: string
 *                taxonomy:
 *                  type: string
*                accessGroup:
 *                  type: string
 *                componentData:
 *                  type: object
 * 
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array 
 *                   items: 
 *                     type: object
 *       402:
 *         description: Failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: 
 *                   type: string
 *                   example: Failed
 *                 data:
 *                   type: object
 *                   properties:
 *                     error:
 *                       type: string 
 *                       example: "Some error message"
 */

/**
 * @openapi
 * /api/v1/document/{id}:
 *   get:
 *     summary: Get an specific document by ID
 *     tags:
 *       - Documents
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        description: The ID of the document
 *      - in: query
 *        name: complete
 *        schema:
 *          type: string
 *        description: Send "true" to tell the response to return the complete information of the document
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array 
 *                   items: 
 *                     type: object
 *       402:
 *         description: Failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: 
 *                   type: string
 *                   example: Failed
 *                 data:
 *                   type: object
 *                   properties:
 *                     error:
 *                       type: string 
 *                       example: "Some error message"
 *   post:
 *     summary: Create a document with an specific ID
 *     tags:
 *       - Documents
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        description: The ID of the document
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *                title:
 *                  type: string
 *                location:
 *                  type: string
 *                contentType:
 *                  type: string
 *                taxonomy:
 *                  type: string
*                accessGroup:
 *                  type: string
 *                componentData:
 *                  type: object
 * 
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array 
 *                   items: 
 *                     type: object
 *       402:
 *         description: Failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: 
 *                   type: string
 *                   example: Failed
 *                 data:
 *                   type: object
 *                   properties:
 *                     error:
 *                       type: string 
 *                       example: "Some error message"
 *   put:
 *     summary: Update a document with an specific ID
 *     tags:
 *       - Documents
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        description: The ID of the document
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *           description: Object with the fields to update
 * 
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array 
 *                   items: 
 *                     type: object
 *       402:
 *         description: Failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: 
 *                   type: string
 *                   example: Failed
 *                 data:
 *                   type: object
 *                   properties:
 *                     error:
 *                       type: string 
 *                       example: "Some error message"
 *   delete:
 *     summary: Delete a document by ID
 *     tags:
 *       - Documents
 *     parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        description: The ID of the document
 * 
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array 
 *                   items: 
 *                     type: object
 *       402:
 *         description: Failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: 
 *                   type: string
 *                   example: Failed
 *                 data:
 *                   type: object
 *                   properties:
 *                     error:
 *                       type: string 
 *                       example: "Some error message"
 */

/**
 * @openapi
 * /api/v1/search:
 *   post:
 *     summary: Search documents by any criteria
 *     tags:
 *       - Documents
 *     parameters:
 *      - in: header
 *        name: userId
 *        schema:
 *          type: string
 *        description: ID of the user that excecute the request
 *        required: true
  *      - in: query
 *        name: complete
 *        schema:
 *          type: string
 *        description: Send "true" to tell the response to return the complete information of the document
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *           description: Object with the fields to update
 *           example:
 *              andQuery:[{fields:['title'],value:'meeting'}]
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array 
 *                   items: 
 *                     type: object
 *       402:
 *         description: Failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: 
 *                   type: string
 *                   example: Failed
 *                 data:
 *                   type: object
 *                   properties:
 *                     error:
 *                       type: string 
 *                       example: "Some error message"
 */

router.get("/document", (req, res) => elasticController.getAllDocuments(req, res));
router.get("/document/:id", (req, res) => elasticController.getDocumentById(req, res));
router.get("/mapping", (req, res) => elasticController.getIndexMapping(req, res));
router.post("/document", (req, res) => elasticController.createDocument(req, res));
router.post("/document/:id", (req, res) => elasticController.createDocumentWithId(req, res));
router.get("/info", (req, res) => elasticController.getAllDocumentsInfo(req, res));
router.post("/bulk", (req, res) => elasticController.bulkOperation(req, res));
router.post("/search", (req, res) => elasticController.searchDocuments(req, res));
router.post("/search-app", (req, res) => elasticController.searchDocumentsForApp(req, res));
router.put("/document/:id", (req, res) => elasticController.updateDocument(req, res));
router.delete("/document/:id", (req, res) => elasticController.deleteDocument(req, res));
router.post("/content", (req, res) => elasticController.formatContent(req, res));


module.exports = router;