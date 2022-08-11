const Blog = require('../Models/blog')
const constants = require('../constants/messages')
const mongoose = require('mongoose')
const fs = require('file-system');


exports.getAll = async (req, res) => {
    const blogs = await Blog.find().countDocuments();
    console.log(blogs)
    try {
        if (!blogs == 0) {
            let totalRecord = await Blog.countDocuments({ isDeleted: false });
            let blogs = await Blog.find({ isDeleted: false })
                .sort({ _id: -1 })
                .limit(parseInt(req.params.limit) || 10)
                .skip(parseInt(req.params.offset) - 1)
                .exec();
            return res.status(200).send({
                status: true,
                message: constants.RECORD_FOUND,
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
    if (!req.file) {
        res.status(500).send({
            status: false,
            message: "Please select file"
        })
    }
    else if (req.file) {
        var img = fs.readFileSync(req.file.path);
        var encode_image = img.toString('base64');
        var blogThumbnail = {
            contentType: req.file.mimetype,
            image: Buffer.from(encode_image, 'base64')
        };
    }
    else {
        return res.send(500).send({
            status: false,
            message: "Something wrong with file"
        })
    }

    try {
        if (!req.body.blogTitle || !req.body.blogCategory || !req.body.shortDescription
            || !req.body.DetailsDescription) {
            return res.status(300).send({
                status: false,
                message: constants.REQUIREDFIELDS
            })
        }

        else {
            const newBlog = new Blog({
                _id: new mongoose.Types.ObjectId,
                blogTitle: req.body.blogTitle,
                postedDate: req.body.postedDate,
                blogCategory: req.body.blogCategory,
                shortDescription: req.body.shortDescription,
                DetailsDescription: req.body.DetailsDescription,
                isActive: req.body.isActive,
                blogImage: blogThumbnail,
            })
            newBlog
                .save()
                .then((data => {
                    console.log(data);
                    return res.status(201).send({
                        status: true,
                        message: constants.CREATE_SUCCESS,
                        data: data,
                    });
                })).catch((err => {
                    return res.status(301).send({
                        status: false,
                        message: constants.NOT_ADDED_SUCCESS,
                    });
                }))
        }
    } catch (error) {
        return res.status(505).send({
            status: false,
            message: error.message
        })
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
        Blog.findByIdAndUpdate(id, req.body, { useFindAndModify: true })
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