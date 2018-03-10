import { fromJS, Record } from 'immutable';

export default class Post extends Record({
  comment_count: null,
  created_time: null,
  id: null,
  like_count: null,
  message: null,
  permalink_url: null,
}) {
  constructor(row) {
    const rowMap = fromJS(row);
    const commentCount =
      rowMap.get(
        'comment_count',
        rowMap.getIn(['comments', 'summary', 'total_count']),
      );
    const likeCount =
      rowMap.get(
        'like_count',
        rowMap.getIn(['likes', 'summary', 'total_count']),
      );
    super({
      ...rowMap.toJSON(),
      comment_count: commentCount,
      like_count: likeCount,
    });
  }

  get shortId() {
    return this.id ? this.id.split('_').pop() : this.id;
  }
}
