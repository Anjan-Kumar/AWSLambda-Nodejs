exports.handler = function(event, context, callback) {
    console.log("value1 = " + event.key1);
    console.log("value2 = " + event.key2);  
    callback(null, "Final CICD pipeline of AWS Lambda after Deployment .");
    // or 
    // callback("some error type"); 
 }
