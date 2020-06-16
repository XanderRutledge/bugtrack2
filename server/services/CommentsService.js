import { dbContext } from "../db/DbContext";
import { BadRequest } from "../utils/Errors";

class CommentsService {
    async getById(id) {
        let data = await dbContext.Comments.findOne({ _id: id, })
        if (!data) {
            throw new BadRequest("Invalid ID")
        }
        return data
    }

    async find(query = {}) {
        return await dbContext.Comments.find(query).populate('bugId')
    }


    async create(rawData) {
        let data = await dbContext.Comments.create(rawData)
        return data
    }

    async delete(id, userEmail) {
        let data = await dbContext.Comments.findOneAndRemove({
            _id: id,
            creatorEmail: userEmail,
        });
        if (!data) {
            throw new BadRequest("Invalid ID or you do not own this bug");
        }
    }
}

export const commentsService = new CommentsService();
