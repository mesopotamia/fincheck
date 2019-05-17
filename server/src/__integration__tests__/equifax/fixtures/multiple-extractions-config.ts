export default {
    "actions": [
        {
            "type": "navigate",
            "url": "http://localhost:8080"
        }
    ],
    "extractor": [
        {
            "selector": ".bigScore",
            "propName": "score"
        },
        {
            "selector": ".bigScoreDesc",
            "propName": "description"
        }
    ]
}