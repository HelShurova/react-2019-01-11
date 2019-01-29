import {ADD_COMMENT, DELETE_ARTICLE, LOAD_ALL_ARTICLES, START, SUCCESS, FAIL} from '../constants';
import {arrToMap} from './utils'
import {Record} from 'immutable';

const ArticleRecord = Record({
    id: null,
    text: null,
    title: null,
    date: null,
    comments: []
})

const ReducerState = Record({
    entities: arrToMap([], ArticleRecord),
    loading: false,
    loaded: false,
    error: null
})

export default (articles = new ReducerState(), action) => {
    const { type, payload, randomId, response, error } = action

    switch (type) {
        // case LOAD_ALL_ARTICLES:
        //     return articles.set('entities', arrToMap(response, ArticleRecord))

        case DELETE_ARTICLE:
            return articles.deleteIn(['entities', payload.id])

        case ADD_COMMENT:
            return articles.updateIn(
                ['entities', payload.articleId, 'comments'],
                (comments) => {
                    return comments.concat(randomId)
                }
            )

        case LOAD_ALL_ARTICLES + START:
            return articles.set('loading', true)

        case LOAD_ALL_ARTICLES + SUCCESS:
            return articles
                .set('loading', false)
                .set('loaded', true)
                .set('entities', arrToMap(response, ArticleRecord))

        case LOAD_ALL_ARTICLES + FAIL:
            return articles
                .set('loading', false)
                .set('loaded', true)
                .set('error', error)

        default:
            return articles
    }
}
