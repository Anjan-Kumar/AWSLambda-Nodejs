exports.handler = function(event, context, callback) {
    console.log("value1 = " + event.key1);
    console.log("value2 = " + event.key2);  
    callback(null, "Testing final CICD of Lambda.");
    // or 
    // callback("some error type"); 
 }
