import request from '../request'
import { BASE_API } from '../Constant'

const baseUrl = `${BASE_API}comment-like`;

function save(comment_id, data = {}) {
    return request({
        url: `${baseUrl}/comment/${comment_id}`,
        data,
        method: 'POST',
    });
}

const CommentLikeServices = {
    save
};

export default CommentLikeServices