#!/bin/bash

-set eu

npm run start:arpeng &

wait -n

exit $?
