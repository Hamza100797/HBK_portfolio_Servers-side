const Blog = require('../Models/blog')
const constants = require('../constants/messages')

exports.getAll = async (req, res) => {
    const students = await Blog.find();
    try {
        if (!students) {
            let totalRecord = await Blog.countDocuments({ isDeleted: false });
            let blogs = await Blog.find({ isDeleted: false })
                .sort({ _id: -1 })
                .limit(parseInt(req.params.limit) || 10)
                .skip(parseInt(req.params.offset) - 1)
                .exec();
            return res.status(200).send({
                status: true,
                message: constant.RECORD_FOUND,
                totalRecord,
                blogs
            });

        }
        else {
            return res.status(404).json({
                status: false,
                message: constants.NO_RECORD_FOUND,
            })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            status: false,
            message: constants.SOMETHING_WENT_WRONG
        })
    }
}

exports.getById = async (req, res) => {
    const id = req.params.id;
    Blog.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({
                    status: false,
                    message: constants.NOT_FOUND
                });
            else res.status(200).send({
                status: true,
                message: constants.RETRIEVE_SUCCESS,
                data: data
            });
        })
        .catch(err => {
            res.status(500).send({
                status: false,
                message: constants.RETRIEVE_NOT_SUCCESS
            });
        });
}
exports.createNew = async (req, res) => {
    if (!req.body.blogTitle || !req.body.shortDescription || !req.body.DetailsDescription || !req.body.blogImage) {
        return res.status(500).send({
            status: false,
            message: constants.REQUIREDFIELDS
        })
    }
    try {
        if (!blog) {
            return res.status(500).json({ status: false, message: constants.SERVER_ERROR });
        }
        else {
            return res.status(200).json({ message: constants.CREATE_BLOG });
        }
    }
    catch (error) {
        console.log('Error!', error);
        return res.status(500).json({ status: false, message: error.message });
    }
}

exports.update = async (req, res) => {
    try {
        if (!req.body) {
            return res.status(400).send({
                status: false,
                message: constants.REQUIREDFIELDS
            });
        }
        const id = req.params.id;
        console.log(id)
        Blog.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
            .then(data => {
                if (!data) {
                    res.status(404).send({
                        status: false,
                        message: constants.NO_RECORD_FOUND
                    });
                } else res.send({
                    status: true,
                    message: constants.UPDATE_SUCCESS,
                    data: data
                });
            })
            .catch(err => {
                res.status(500).json({
                    error: err.message,
                    status: false,
                    message: constants.ERROR_UPDATE
                });
            });

    } catch (error) {
        console.log(error)
        return res.status(500).send({
            status: false,
            message: error.message
        })
    }
}
exports.delete = async (req, res) => {
    const id = req.params.id;
    Blog.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    status: false,
                    message: constants.NOT_FOUND
                });
            } else {
                res.send({
                    status: true,
                    message: constants.DELETED_SUCCESS
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                status: false,
                message: constants.COULD_NOT_DELETED
            });
        });
}