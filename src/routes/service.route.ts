import { Router } from "express";
import { Service } from "../models/services.model";

const router  = Router();

router.get('/', async (req, res) => {
    try {
        const data = await Service.find().exec();

        res.status(200).json({data, message: "Fetched"})
    } catch(e) {
        res.status(500).json({errorText: e.toString(), message: "Unable to create quote document"})
    }
});

router.post('/', async (req, res) => {
    try {
        const service = new Service(req.body);

        await service.save();

        res.status(200).json({data: service.toObject(), message: "Add service"})
    } catch(e) {
        res.status(500).json({errorText: e.toString(), message: "Unable to create quote document"})
    }
});


export default router;