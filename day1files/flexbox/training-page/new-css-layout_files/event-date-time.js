
function getEventDateTime(locationString,dateArray){var guessedTZ=moment.tz.guess();var locationTZDict={"San Francisco, CA":"America/Los_Angeles","Boston, MA":"America/New_York"};for(var i=0;i<dateArray.length;i++){var dateRangeArray=dateArray[i].split(';');var s,e;if(locationString in locationTZDict){s=moment.parseZone(dateRangeArray[0]).tz(locationTZDict[locationString]);e=moment.parseZone(s).tz(locationTZDict[locationString]);}
else{s=moment.parseZone(dateRangeArray[0]).tz(guessedTZ);e=moment.parseZone(s).tz(guessedTZ);}
var offsetH=parseInt(dateRangeArray[1].substring(0,2));var offsetM=parseInt(dateRangeArray[1].substring(3,5));e.add(offsetH,'h');e.add(offsetM,'m');dateArray[i]=new Array(s,e);}
var formattedDate='',formattedTime='';for(var i=0;i<dateArray.length;i++){if(dateArray.length>2){if(i==0){formattedDate+=dateArray[i][0].format('MMMM D');}
else{if(i==dateArray.length-1){formattedDate+=' &amp;';}
else{formattedDate+=',';}
if(dateArray[0][0].format('M')!=dateArray[i][0].format('M')){formattedDate+=' '+dateArray[i][0].format('MMMM D');}
else{formattedDate+=' '+dateArray[i][0].format('D');}}}
else if(dateArray.length>1){if(i==0){formattedDate+=' '+dateArray[i][0].format('MMMM D');}
else{formattedDate+=' &amp;';if(dateArray[0][0].format('M')!=dateArray[i][0].format('M')){formattedDate+=' '+dateArray[i][0].format('MMMM D');}
else{formattedDate+=' '+dateArray[i][0].format('D');}}}
else{formattedDate+=' '+dateArray[i][0].format('MMMM D');}}
formattedDate+=', '+dateArray[0][0].format('YYYY');formattedTime+=dateArray[0][0].format('h:mma');formattedTime+=' &ndash; ';formattedTime+=dateArray[0][1].format('h:mma z');return{"dateString":formattedDate,"timeString":formattedTime};}