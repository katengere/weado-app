const mongoose = require('mongoose');
const ReportSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    rFile: { type: mongoose.Schema.Types.Mixed, required: true },
    summary: { type: String, required: true },
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'
    },
    fileUrl: { type: String, required: false },
    createdOn: { type: Date, default: new Date() },
    modifiedOn: { type: Date, default: new Date() }
});
const imageSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    imgDetails: { type: mongoose.Schema.Types.Mixed, required: true },
    imgUrl: { type: String, required: false },
    public_id: { type: String, required: false },
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'
    },
    createdOn: { type: Date, default: new Date() },
    modifiedOn: { type: Date, default: new Date() }
});
const ProjectSchema = new mongoose.Schema({
    author: { type: [String], required: true },
    title: { type: String, required: true },
    fileDoc: { type: mongoose.Schema.Types.Mixed, required: true },
    summary: String,
    reportsId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Report'
    }],
    images: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Image'
    }],
    date: { type: Date, default: new Date() },
    activities: [String]
}, {
    timestamps: true,
});

mongoose.model('Report', ReportSchema);
mongoose.model('Image', imageSchema);
mongoose.model('Project', ProjectSchema);