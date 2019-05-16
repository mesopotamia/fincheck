export default {
    "actions": [
        {
            "type": "navigate",
            "url": "http://localhost:8080"
        },
        {
            "type": "click",
            "selector": "#updateScoreLinkId"
        },
        {
            "type": "click",
            "selector": "#submitButton"
        }
    ],
    "extractor": {
        "selector": "#contentBody > h3"
    }
}