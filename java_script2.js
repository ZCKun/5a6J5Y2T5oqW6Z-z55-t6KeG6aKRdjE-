Java.perform(function() {
    var FeedApi = Java.use("com.ss.android.ugc.aweme.feed.b.b");
    FeedApi.a.implementation = function(type, arg2, arg3, arg4, arg5, aweme_id) {
        console.log('type:', type);
        console.log('parma2:', arg2);
        console.log('parme3:', arg3);
        console.log('parma4:', arg4);
        console.log('parma5:', arg5);
        console.log('aweme id:', aweme);
    }
})
