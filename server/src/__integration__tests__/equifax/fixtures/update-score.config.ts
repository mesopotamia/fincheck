export default {
    "actions": [
        {
            "type": "navigate",
            "url": "http://localhost:8081/equifax"
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