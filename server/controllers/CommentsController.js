import express from "express";
import BaseController from "../utils/BaseController";
import auth0provider from "@bcwdev/auth0provider";
import { commentsService } from "../services/CommentsService";

//PUBLIC
export class CommentsController extends BaseController {
    constructor() {
        super("api/comments");
        this.router
            .get("/:id", this.getById)
            .use(auth0provider.getAuthorizedUserInfo)
            .post("", this.create)
            .delete("/:id", this.delete);
    }



    async getById(req, res, next) {
        try {
            let data = await commentsService.getById(req.params.id);
            return res.send(data);
        } catch (error) {
            next(error);
        }
    }

    async create(req, res, next) {
        try {
            req.body.creatorEmail = req.userInfo.email
            let data = await commentsService.create(req.body)
            return res.status(201).send(data)
        } catch (error) { next(error) }
    }

    async delete(req, res, next) {
        try {
            await commentsService.delete(req.params.id, req.userInfo.email);
            return res.send("Successfully deleted");
        } catch (error) {
            next(error);
        }
    }
}
