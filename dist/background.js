(()=>{"use strict";function e(e,o,n){if("pageView"===o){var a={type:"pageView",client_id:"d3859a90-3d1e-44bf-8925-eb14935442c8",event_data:{client_app:"Masa Chrome Extension",client_name:"Masa",page:e.url}};n&&(console.log("User address before sending:",n),a.user_address=n),console.log("Payload to be sent:",a),fetch("https://api.cookiemonster.masa.finance/tracking",{method:"POST",headers:{"Content-Type":"application/json",accept:"application/json"},body:JSON.stringify(a)}).then((function(e){console.log("Data sent successfully:",e)})).catch((function(e){console.error("Error sending data:",e)}))}}function o(o){chrome.storage.local.get(["trackingEnabled","userAddress"],(function(n){if(console.log("Storage result:",n),console.log("Tracking enabled:",n.trackingEnabled),console.log("User address from storage:",n.userAddress),n.trackingEnabled){var a={url:o};console.log("Sending page view for URL:",o),n.userAddress?(console.log("User address is available:",n.userAddress),e(a,"pageView",n.userAddress)):(console.log("User address is not available, not sending user address."),e(a,"pageView"))}else console.log("Tracking is disabled, not sending page view.")}))}console.log("Background script loaded."),chrome.webNavigation.onCompleted.addListener((function(e){0===e.frameId?(console.log("Main frame navigation completed:",e),o(e.url)):console.log("Subframe navigation completed, ignored.")})),chrome.runtime.onMessage.addListener((function(e,n,a){var s;"urlChange"===e.type?(console.log("URL changed to:",e.url),o(e.url)):"onClick"===e.type&&(console.log("Click event detected:",e.clickData),s=e.clickData,chrome.storage.local.get(["trackingEnabled"],(function(e){e.trackingEnabled&&console.log("Sending click event data:",s)})))}))})();