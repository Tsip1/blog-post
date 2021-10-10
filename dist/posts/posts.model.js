"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostSchema = void 0;
const mongoose = require("mongoose");
exports.PostSchema = new mongoose.Schema({
    user: { type: String, require: true },
    title: { type: String, require: true },
    content: { type: String, require: true },
    status: { type: String,
        enum: ['Published', 'Drafted', 'WaitingForReview'],
        default: 'Drafted'
    },
    dateCreated: { type: Date,
        default: Date.now
    },
    lastUpdated: { type: Date,
        default: Date.now
    }
});
//# sourceMappingURL=posts.model.js.map