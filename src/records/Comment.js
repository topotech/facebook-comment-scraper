import { fromJS, Record } from 'immutable';

export default class Comment extends Record({
  comment_count: null,
  created_time: null,
  id: null,
  message: null,
}) {
  constructor(row) {
    const rowMap = fromJS(row);
    const commentCount =
      rowMap.get(
        'comment_count',
        rowMap.getIn(['comments', 'summary', 'total_count']),
      );
    super({
      ...rowMap.toJSON(),
      comment_count: commentCount,
    });
  }

  get shortId() {
    return this.id ? this.id.split('_').pop() : this.id;
  }
}
