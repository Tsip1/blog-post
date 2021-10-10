"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let PostsService = class PostsService {
    constructor(postModel) {
        this.postModel = postModel;
        this.posts = [];
    }
    async insertPost(user, title, content, status) {
        const newPost = new this.postModel({ user: user, title: title, content: content, status: status });
        newPost.lastUpdated = new Date();
        newPost.dateCreated = new Date();
        const res = await newPost.save();
        return res.id;
    }
    async getPost(id) {
        console.log("in get post");
        const userPosts = await this.findPost(id);
        return userPosts;
    }
    async getUserPosts(user) {
        const userPosts = await this.findUserPosts(user);
        return userPosts;
    }
    async getPosts() {
        const posts = await this.postModel.find().limit(10).exec();
        return posts;
    }
    async updatePost(id, user, title, content, status, dateCreated) {
        const updatePost = await this.findPost(id);
        if (title) {
            updatePost.title = title;
        }
        if (content) {
            updatePost.content = content;
        }
        if (status) {
            updatePost.status = status;
        }
        updatePost.lastUpdated = new Date();
        updatePost.save();
    }
    async deletePost(id) {
        const deletedPost = await this.postModel
            .findByIdAndRemove(id);
    }
    async findUserPosts(user) {
        let post;
        try {
            post = await this.postModel.find({ user: user }, {}).limit(10).exec();
        }
        catch (error) {
            throw new common_1.NotFoundException('This user has no posts...');
        }
        if (post.length < 1) {
            throw new common_1.NotFoundException('This user has no posts...');
        }
        return post;
    }
    async findPost(id) {
        let post;
        console.log("here");
        try {
            post = await this.postModel.findById(id).exec();
            console.log(post);
        }
        catch (error) {
            throw new common_1.NotFoundException('could not find any post...');
        }
        if (post.length < 1) {
            throw new common_1.NotFoundException('could not find any post...');
        }
        return post;
    }
};
PostsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Post')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], PostsService);
exports.PostsService = PostsService;
//# sourceMappingURL=posts.service.js.map