/**
 * Created by zhang on 2016/8/2.
 */
import {FETCH_ARTICLE_DATA_STATUS} from './OptionType'
import {addArticle,getArticleList} from '../db/manager/ArticleManager'
//添加收藏
export function addArticleAction(content,time,source){
    let newArticle =addArticle(content,time,source);
    return {
        type:FETCH_ARTICLE_DATA_STATUS.ADD,
        data:newArticle,
    }

}

//查询收藏的文章
export function getArticleListAction(){
    let articles = getArticleList();
    return{
        type:FETCH_ARTICLE_DATA_STATUS.SUCCESS,
        data:articles,
    }
}


