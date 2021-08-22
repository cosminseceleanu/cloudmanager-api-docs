(self.webpackChunkcloudmanager_api_docs=self.webpackChunkcloudmanager_api_docs||[]).push([[741],{6074:function(e,t,n){"use strict";n.r(t),n.d(t,{_frontmatter:function(){return d},default:function(){return m}});var a,o=n(2122),i=n(9756),r=(n(5007),n(4983)),l=n(9536),c=["components"],d={},s=(a="Glitch",function(e){return console.warn("Component "+a+" was not imported, exported, or provided by MDXProvider as global scope"),(0,r.mdx)("div",e)}),u={_frontmatter:d},p=l.Z;function m(e){var t=e.components,n=(0,i.Z)(e,c);return(0,r.mdx)(p,(0,o.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,r.mdx)("h1",{id:"tutorial-step-5---getting-execution-data"},"Tutorial Step 5 - Getting Execution Data"),(0,r.mdx)("p",null,"Now that we have an access token, we can use it to make API calls into Cloud Manager to get more information about the execution (and in the next step the program)."),(0,r.mdx)("h2",{id:"writing-a-generic-makeapicall-function"},"Writing a Generic ",(0,r.mdx)("inlineCode",{parentName:"h2"},"makeApiCall")," function"),(0,r.mdx)("p",null,"Making an API call to Cloud Manager requires several headers to be passed. Since we are ultimately going to be making two separate API calls (one for the execution and one for the program), it makes sense to centralize this logic into a new function."),(0,r.mdx)("p",null,"The function itself is pretty simple -- it accepts the access token, a URL, and an HTTP method and then makes a request to that URL with the supplied method setting the three required headers:"),(0,r.mdx)("ul",null,(0,r.mdx)("li",{parentName:"ul"},(0,r.mdx)("inlineCode",{parentName:"li"},"x-gw-ims-org-id")," - the Organization ID (contained in the ",(0,r.mdx)("inlineCode",{parentName:"li"},"ORGANIZATION_ID")," variable)"),(0,r.mdx)("li",{parentName:"ul"},(0,r.mdx)("inlineCode",{parentName:"li"},"x-api-key")," - the API Key (contained in the ",(0,r.mdx)("inlineCode",{parentName:"li"},"API_KEY")," variable)"),(0,r.mdx)("li",{parentName:"ul"},(0,r.mdx)("inlineCode",{parentName:"li"},"Authorization")," - contains the access token")),(0,r.mdx)("p",null,"The function then returns the response body as a JavaScript object."),(0,r.mdx)("pre",null,(0,r.mdx)("code",{parentName:"pre",className:"language-javascript"},'async function makeApiCall(accessToken, url, method) {\n  const response = await fetch(url, {\n    method: method,\n    headers: {\n      "x-gw-ims-org-id": process.env.ORGANIZATION_ID,\n      "x-api-key": process.env.API_KEY,\n      Authorization: `Bearer ${accessToken}`,\n    },\n  });\n\n  return response.json();\n}\n')),(0,r.mdx)("h2",{id:"writing-a-specific-getexecution-function"},"Writing a Specific ",(0,r.mdx)("inlineCode",{parentName:"h2"},"getExecution")," Function"),(0,r.mdx)("p",null,"With the generic function in place, the function to get an execution is pretty simple. It just needs to call the ",(0,r.mdx)("inlineCode",{parentName:"p"},"getAccessToken")," function (created in the last step) and then makes a GET request to the execution URL."),(0,r.mdx)("pre",null,(0,r.mdx)("code",{parentName:"pre",className:"language-javascript"},'async function getExecution(executionUrl) {\n  const accessToken = await getAccessToken();\n\n  return makeApiCall(accessToken, executionUrl, "GET");\n}\n')),(0,r.mdx)("h2",{id:"getting-the-execution-in-the-webhook"},"Getting the Execution in the Webhook"),(0,r.mdx)("p",null,"Finally, we can call the ",(0,r.mdx)("inlineCode",{parentName:"p"},"getExecution")," function with the URL contained in the event payload. There's a variety of information in the execution response (take a look at the ",(0,r.mdx)("a",{parentName:"p",href:"../swagger-specs/api.yaml"},"API Reference")," for all the details), but for now let's just log the execution id."),(0,r.mdx)("pre",null,(0,r.mdx)("code",{parentName:"pre",className:"language-javascript"},'if (\n  STARTED === event["@type"] &&\n  EXECUTION === event["xdmEventEnvelope:objectType"]\n) {\n  console.log("received execution start event");\n\n  const executionUrl = event["activitystreams:object"]["@id"];\n\n  getExecution(executionUrl).then((execution) => {\n    console.log(`Execution ${execution.id} started`);\n  });\n}\n')),(0,r.mdx)("h2",{id:"running-the-updated-webhook"},"Running the Updated Webhook"),(0,r.mdx)("p",null,"If you are running the script locally, you'll need to stop and restart the node process. You don't need to restart ngrok. In fact, if you do restart ngrok, the URL will likely change and you'll need to go back into the ",(0,r.mdx)("a",{href:"https://console.adobe.io/integrations",target:"_new"},"Adobe I/O Console")," and update the Webhook URL."),(0,r.mdx)("p",null,"If you are running the script through Glitch, Glitch will restart automatically. If you don't want to update your existing Glitch project (or lost it), you can click the button below to start over."),(0,r.mdx)(s,{projectName:"adobe-cloudmanager-api-tutorial-step5",mdxType:"Glitch"}),(0,r.mdx)("h2",{id:"next-step"},"Next Step"),(0,r.mdx)("p",null,"With all that done, you're ready to proceed to the next step. Continue to ",(0,r.mdx)("a",{parentName:"p",href:"6-getting-the-program.md"},"Step 6"),"."))}m.isMDXComponent=!0}}]);
//# sourceMappingURL=component---src-pages-tutorial-5-getting-the-execution-md-7e9b1f7846d82b889d26.js.map