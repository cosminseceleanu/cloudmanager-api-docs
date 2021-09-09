(self.webpackChunkcloudmanager_api_docs=self.webpackChunkcloudmanager_api_docs||[]).push([[789],{96933:function(e,t,n){"use strict";n.r(t),n.d(t,{_frontmatter:function(){return p},default:function(){return c}});var o=n(22122),a=n(19756),i=(n(15007),n(64983)),r=n(99536),l=n(77402),s=["components"],p={},d={_frontmatter:p},m=r.Z;function c(e){var t=e.components,n=(0,a.Z)(e,s);return(0,i.mdx)(m,(0,o.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,i.mdx)("h1",{id:"tutorial-step-6---navigating-between-api-calls"},"Tutorial Step 6 - Navigating Between API Calls"),(0,i.mdx)("p",null,"While the execution information is interesting, what we actually want to send in the notification sent to Microsoft Teams or Slack is the program name. This isn't in the execution response but has to be requested from a different URL, one following the pattern ",(0,i.mdx)("inlineCode",{parentName:"p"},"/api/program/{programId}"),"."),(0,i.mdx)("p",null,"While it is possible for you to formulate the URL, it is a best practice to follow the links provided in the API response. The Cloud Manager API responses use a convention named ",(0,i.mdx)("a",{href:"https://en.wikipedia.org/wiki/Hypertext_Application_Language",target:"_new"},"Hypertext Application Language")," (HAL for short) to define links. But you don't really need to know too many details of HAL to use the API. The important part is that in the API response, there is a ",(0,i.mdx)("inlineCode",{parentName:"p"},"_links")," object which contains a set of objects. Each of these objects has a meaningful name that tells the API consumer where the link goes and the ",(0,i.mdx)("inlineCode",{parentName:"p"},"href")," property of the object has the destination."),(0,i.mdx)("p",null,"For example, in an execution response, you will see this:"),(0,i.mdx)("pre",null,(0,i.mdx)("code",{parentName:"pre",className:"language-json"},'    "_links": {\n        "http://ns.adobe.com/adobecloud/rel/pipeline": {\n            "href": "/api/program/1234/pipeline/5678",\n            "templated": false\n        },\n        "http://ns.adobe.com/adobecloud/rel/program": {\n            "href": "/api/program/1234",\n            "templated": false\n        },\n        "self": {\n            "href": "/api/program/1234/pipeline/5678/execution/9012",\n            "templated": false\n        }\n    }\n')),(0,i.mdx)("blockquote",null,(0,i.mdx)("p",{parentName:"blockquote"},"The Cloud Manager API uses templatized links in a few places; in these cases ",(0,i.mdx)("inlineCode",{parentName:"p"},"templatized")," will be ",(0,i.mdx)("inlineCode",{parentName:"p"},"true"),", but that's not the case for the program links we need to follow for this tutorial.")),(0,i.mdx)("p",null,"Note that these links are ",(0,i.mdx)("em",{parentName:"p"},"relative")," to the domain name for the API. As with the path, while you could prepend ",(0,i.mdx)("inlineCode",{parentName:"p"},"cloudmanager.adobe.io")," yourself, it is a best practice to have the links be treated as relative links."),(0,i.mdx)("h2",{id:"writing-a-generic-getlink-function"},"Writing a Generic ",(0,i.mdx)("inlineCode",{parentName:"h2"},"getLink")," Function"),(0,i.mdx)("p",null,"This might be overkill for this tutorial, since we only need a single link, but getting a link from an API response is a common enough task that it makes sense to make a separate function for this. It's fairly straightforward object navigation:"),(0,i.mdx)("pre",null,(0,i.mdx)("code",{parentName:"pre",className:"language-javascript"},'function getLink(obj, linkType) {\n  return obj["_links"][linkType].href;\n}\n')),(0,i.mdx)("h2",{id:"updating-the-getexecution-method"},"Updating the ",(0,i.mdx)("inlineCode",{parentName:"h2"},"getExecution")," Method"),(0,i.mdx)("p",null,"To get the program data based on the execution, first you get the link to the program from the execution response. Remember -- at this point it will be a server-relative path. Then, you use the Node.js ",(0,i.mdx)("inlineCode",{parentName:"p"},"URL")," class to turn that path into an absolute URL and pass this URL to the ",(0,i.mdx)("inlineCode",{parentName:"p"},"makeApiCall")," function to get the program. Finally, the program response is added to the execution response."),(0,i.mdx)("p",null,"Although the ",(0,i.mdx)("inlineCode",{parentName:"p"},"URL")," class is built-in to Node.js, it does need to be imported from the ",(0,i.mdx)("inlineCode",{parentName:"p"},"url")," module. We already are doing this for the ",(0,i.mdx)("inlineCode",{parentName:"p"},"URLSearchParams")," class (added in Step 4), so that line can simply be updated to import both classes."),(0,i.mdx)("pre",null,(0,i.mdx)("code",{parentName:"pre",className:"language-javascript"},'const { URLSearchParams, URL } = require("url");\n')),(0,i.mdx)("p",null,"The updated ",(0,i.mdx)("inlineCode",{parentName:"p"},"getExecution")," function looks like this:"),(0,i.mdx)("pre",null,(0,i.mdx)("code",{parentName:"pre",className:"language-javascript"},'async function getExecution(executionUrl) {\n  const accessToken = await getAccessToken();\n\n  const execution = await makeApiCall(accessToken, executionUrl, "GET");\n\n  const REL_PROGRAM = "http://ns.adobe.com/adobecloud/rel/program";\n  const programLink = getLink(execution, REL_PROGRAM);\n  const programUrl = new URL(programLink, executionUrl);\n  const program = await makeApiCall(accessToken, programUrl);\n\n  execution.program = program;\n\n  return execution;\n}\n')),(0,i.mdx)("h2",{id:"logging-the-program-name-in-the-webhook"},"Logging the Program Name in the Webhook"),(0,i.mdx)("p",null,"Now that ",(0,i.mdx)("inlineCode",{parentName:"p"},"getExecution")," returns the Program information as part of the ",(0,i.mdx)("inlineCode",{parentName:"p"},"execution")," object, we can easily change the log message to output the program name instead of the execution id."),(0,i.mdx)("pre",null,(0,i.mdx)("code",{parentName:"pre",className:"language-javascript"},'if (\n  STARTED === event["@type"] &&\n  EXECUTION === event["xdmEventEnvelope:objectType"]\n) {\n  console.log("received execution start event");\n\n  const executionUrl = event["activitystreams:object"]["@id"];\n\n  getExecution(executionUrl).then((execution) => {\n    console.log(`Execution for ${execution.program.name} started`);\n  });\n}\n')),(0,i.mdx)("h2",{id:"running-the-updated-webhook"},"Running the Updated Webhook"),(0,i.mdx)("p",null,"If you are running the script locally, you'll need to stop and restart the node process. You don't need to restart ngrok. In fact, if you do restart ngrok, the URL will likely change and you'll need to go back into the ",(0,i.mdx)("a",{href:"https://console.adobe.io/integrations",target:"_new"},"Adobe I/O Console")," and update the Webhook URL."),(0,i.mdx)("p",null,"If you are running the script through Glitch, Glitch will restart automatically. If you don't want to update your existing Glitch project (or lost it), you can click the button below to start over."),(0,i.mdx)(l.Z,{projectName:"adobe-cloudmanager-api-tutorial-step6",mdxType:"Glitch"}),(0,i.mdx)("h2",{id:"next-step"},"Next Step"),(0,i.mdx)("p",null,"With all that done, you're ready to proceed to the next and final step. Continue to ",(0,i.mdx)("a",{parentName:"p",href:"7-sending-notifications.md"},"Step 7"),"."))}c.isMDXComponent=!0}}]);
//# sourceMappingURL=component---src-pages-tutorial-6-getting-the-program-md-501527316ea94ab4b966.js.map