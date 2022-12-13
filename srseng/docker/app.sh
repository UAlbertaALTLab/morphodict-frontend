#!/bin/bash

-set eu

npm run start:srseng &

wait -n

exit $?
