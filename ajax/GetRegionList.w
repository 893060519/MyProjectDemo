{
    "code": 0,
    "description": null,
    "data": {
        "total":100,      
        "page": 2,
        "list":[{
               "id": 1,
               "name": "广州",
               "devices": [{
                   "id": "11",
                   "name": "音柱"
               }],
               "level": 1,
               "longitude": 123,
               "latitude": 456,
               "parentid": null,
               "parentname": "",
               "description": "这是广州"
           },
           {
               "id": 2,
               "name": "花都",
               "devices": [{
                   "id": "22",
                   "name": "喇叭"
               }],
               "level": 2,
               "longitude": 123,
               "latitude": 456,
               "parentid": 1,
               "parentname": "广州",
               "description": "这是花都"
           },
           {
               "id": 3,
               "name": "海珠",
               "devices": [{
                   "id": "33",
                   "name": "扩大机"
               }],
               "level": 3,
               "longitude": 123,
               "latitude": 456,
               "parentid": 2,
               "parentname": "花都",
               "description": "这是海珠"
           }]
    }
}