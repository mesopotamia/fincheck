export default {
    "actions": [
        {
            "type": "navigate",
            "url": "http://localhost:8081/equifax"
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