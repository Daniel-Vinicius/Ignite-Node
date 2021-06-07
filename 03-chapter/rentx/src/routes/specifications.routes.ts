import { Router } from "express";

import { CreateSpecificationController } from "../modules/cars/useCases/createSpecification/CreateSpecificationController";
import { listSpecificationsController } from "../modules/cars/useCases/listSpecifications";

const specificationsRoutes = Router();

const createSpecificationController = new CreateSpecificationController();

specificationsRoutes.post("/", createSpecificationController.handle);

specificationsRoutes.get("/", (_, response) => {
  return listSpecificationsController.handle(_, response);
});

export { specificationsRoutes };
