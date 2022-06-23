const constants = require('../constants/messages')
const Career_Obj = require('../Models/careerObjective')

exports.getCareerObj = async (req, res) => {
    const careerObj = await Career_Obj.find();
    try {
        if (careerObj) {
            let totalRecord = await Career_Obj.countDocuments({ isDeleted: false });
            let careerObj = await Career_Obj.find({ isDeleted: false })
                .sort({ _id: -1 })
                .limit(parseInt(req.params.limit) || 10)
                .skip(parseInt(req.params.offset) - 1)
                .exec();
            return res.status(200).send({
                status: true,
                message: constants.RETRIEVE_SUCCESS,
                totalRecord,
                careerObj
            })
        }
        else {
            return res.status(404).send({
                status: false,
                message: constants.NOT_FOUND
            })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            status: false,
            message: constants.SOMETHING_WENT_WRONG,
        })
    }
}
exports.createCareerObj = async (req, res) => {
    if (!req.body.careerObjective) {
        return res.status().send({
            status: false,
            message: constants.REQUIREDFIELDS
        })
    }
    try {
        const CareerObjective = new Career_Obj({
            _id: new mongoose.Types.ObjectId,
            careerObjective: req.body.careerObjective,
        })
        console.log(CareerObjective)
        CareerObjective.save()
            .then(result => {
                console.log(`Career-Obj is added successfully:::${CareerObjective}`)
                return res.status(201).send({
                    status: true,
                    message: constants.CREATE_CAREER_OBJ
                })
            }).catch(err => {
                console.log(err)
                return res.status.send(500).send({
                    status: false,
                    message: constants.NOT_CREATE_CAREEROBJ
                })
            })

    } catch (error) {
        console.log(error)
        return res.status().send({
            status: false,
            message: constants.ERROR_CAREER_OBJ,
            err: error.message
        })
    }

}
exports.updateCareerObj = async (req, res) => {
    try {
        if (!req.body) {
            return res.status().send({
                status: false,
                message: constants.REQUIREDFIELDS
            })
        }
        else {
            const id = req.params.id
            console.log(id)
            Career_Obj.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
                .then(data => {
                    if (!data) {
                        return res.status(404).send({
                            status: false,
                            message: constants.NO_RECORD_FOUND,

                        })
                    }
                    else {
                        return res.status().send({
                            status: true,
                            message: constants.UPDATE_SUCCESS,
                            data: data
                        })
                    }
                }).catch(err => {
                    console.log(`Error is Calling from promise ${err}`)
                    res.status(500).send({
                        status: false,
                        message: constants.SERVER_ERROR,

                    })
                })

        }
    } catch (error) {
        console.log("Error From try-catch Block")
        return res.status().send({
            status: false,
            message: constants.SERVER_ERROR,
            err: error.message
        })
    }
}
