/**
 * Created by zhang on 2016/8/2.
 */
import realm from '../schema/Article';

const TABLE_NAME = 'Article';

//添加文章
export function addArticle(content,time,source){
    let newCollect ={
        content,
        time,
        source,
    };
    realm.write(() => {
        realm.create(TABLE_NAME, newCollect);
    });
}

//查询所有文章
export function getArticleList(){
    let tempDatas = realm.objects(TABLE_NAME);
    if(null==tempDatas){
        return [];
    };
    return [...realm.objects(TABLE_NAME)];
}


