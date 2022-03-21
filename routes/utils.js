const csrf = require("csurf");
const csrfProtection = csrf({ cookie: true });
const db = require("../db/models");

const asyncHandler = (handler) => {
    return (req, res, next) => {
        return handler(req, res, next).catch(next);
    };
};

const chckbookmark = async (stories, userId)=>{
 
    for(let i=0;i<stories.length;++i){
        const story = stories[i];
        const storyId = story.id;
        
        let userStoryCoinsCount = await db.StoryCoin.sum('count', {
            where: {
                storyId: storyId,
                userId: userId,
            }
        });
        
        if(!userStoryCoinsCount)   userStoryCoinsCount = 0;
        if(userStoryCoinsCount >= 10000000){
            story.isbookmarked = 1;
        }  
        else{
            story.isbookmarked = 0;
        }    
    }
}
 
module.exports = {
    csrfProtection,
    asyncHandler,
    chckbookmark,
};
