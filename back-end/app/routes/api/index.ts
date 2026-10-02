const express = require('express')
const router = express.Router()

//controller
import apiController from "../../http/controller/apiController";

//Random
router.get("/", apiController.index)
router.get("/jobs", apiController.getJobs)
router.get("/soccer", apiController.getSoccer)
router.get("/rings", apiController.getRings)
export default router;
  