

## 补发MQ

```sh

curl --location --request POST 'https://isrm.going-link.com/spuc/v1/65493/po-extended/send-message-to-mq' \
--header 'Authorization: bearer 8a917b6f-ffd2-4e67-b0ba-c238a9e2d326' \
--header 'x-virtual-env;' \
--header 'User-Agent: Apifox/1.0.0 (https://apifox.com)' \
--header 'Content-Type: application/json' \
--header 'Accept: */*' \
--header 'Host: isrm.going-link.com' \
--header 'Connection: keep-alive' \
--data-raw '{
    "buKey": "65493c65d4e6e4d5e46d384016dc3f030620c",
    "topicCode": "sodr-asn-message-topic",
    "tag": "SODR",
    "data": "[{\"type\":\"EC_PO_FORCED_CANCEL_ASN_CALLBACK\",\"tenantId\":65493,\"userId\":-1,\"sendDate\":\"2026-08-04 13:58:08\",\"data\":{\"tenantId\":65493,\"ecPoLineCancelDTOList\":[{\"tenantId\":65493,\"poLineLocationId\":224782494,\"poLineId\":203087136,\"poHeaderId\":50088198,\"displayPoNum\":\"PO26080400100\",\"displayLineNum\":\"2\",\"prLineId\":82517478,\"prHeaderId\":362733664,\"cancelledFlag\":1,\"success\":true}],\"byLineFlag\":1,\"operationCode\":\"CANCEL\"}}]"
}'
```