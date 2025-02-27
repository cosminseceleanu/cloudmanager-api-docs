---
title: Creating an Event Integration Project - Cloud Manager API
description: Describes how to create an Event integration project on Adobe Developer Console
keywords:
  - Experience Cloud
  - Adobe Experience Manager
  - API Documentation
  - Cloud Manager
  - Events
---

# Creating an Event Integration Project

By using Adobe I/O Events, Cloud Manager can send external applications notifications when key events occur. This allows customers to connect existing and new external applications which respond to events emitted by Cloud Manager CI/CD pipelines.

To work with the Cloud Manager Events on the Adobe Developer Console, you need to either the System Administrator role or be an assigned API Developer for your organization. Click [here](http://www.adobe.com/go/aac_api_prod_learn) to learn more about the API Developer role.

Adobe I/O Events emitted by Cloud Manager are sent to **webhooks** hosted either in on-premise infrastructure, specialized webhook hosting providers, [Adobe I/O Runtime](https://developer.adobe.com/runtime/docs/), or even your AEM instances managed by Adobe. Alternatively, the [Adobe I/O Journaling API](https://developer.adobe.com/events/docs/guides/api/journaling_api/) may be used, especially in cases where network security rules prohibit a webhook from being accessible from the public internet.

The [Getting Started with Adobe I/O Events](https://developer.adobe.com/events/docs/guides/) guide provides general documentation on how to set up a webhook. As with [API Integration Projecs](create-api-integration.md), a certificate file is needed to set up an Event Integration.

Once your webhook is up and running and you have your certificate, to create an Event Integration:

1. Navigate to the following URL: [https://developer.adobe.com/console](https://developer.adobe.com/console). This can also be reached by clicking the Console button at the top of this page.

2. Click the `Create new project` button or select an existing project.

3. (Optional) Click the `Edit project` button and give your project a title and description.

4. Click the `Add to Project` button and select `Event` from the drop-down menu.

5. Under the Experience Cloud section select `Cloud Manager` and then click `Next`.

6. For a new project, generate or Upload a key pair. Click either `Generate keypair` or `Next`.

7. Select the events you want to receive on the webhook.

8. Fill out the name and description.

9. Provide the webhook URL or, if Adobe I/O Runtime is available, select the Runtime action.

10. Click `Save configured events`.
