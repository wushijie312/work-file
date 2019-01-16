module.exports = function(){
    return async function printTime(ctx,next){
        ctx.logger.info('============>')
        let startTime = Date.now();
        await next();
        ctx.logger.info(`===> ${Date.now() - startTime} 毫秒!`)
    }
}