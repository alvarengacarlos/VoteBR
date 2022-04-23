#!/bin/bash

#Reference: https://github.com/IBM-Blockchain/microfab

export MICROFAB_CONFIG='{
    "port": 8080,
    "endorsing_organizations":[
        {
            "name": "Org1"
        }
    ],
    "channels":[
        {
            "name": "mychannel",
            "endorsing_organizations":[
                "Org1"
            ]
        }
    ]
}'

docker run -e MICROFAB_CONFIG -p 8080:8080 --rm --name microfab-test-enviroment ibmcom/ibp-microfab