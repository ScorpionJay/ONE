/**
 * Created by zhang on 2016/8/2.
 */
import Realm from 'realm';


// 干货收藏表
 class Article extends Realm.Object {

    static schema = {
        name:'Article',
        properties:{
            content:'string',//文章的内容
            time:'string',//文章发表时间
            source:'string',//图片地址
        }

    };

}

export default new Realm({schema: [Article]});
