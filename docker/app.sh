#!/bin/bash

set -eu

PROG="$(basename -- "${0}")"

if (( $# != 1 )); then
    echo "Error: Missing required argument" 1>&2
    echo "Usage: ${PROG} MORPHODICT_LANG_PAIR" 1>&2
    exit 1
fi
MORPHODICT_LANG_PAIR="${1}"

# In production, allow any created files/directories to be group-writeable so
# that both the morphodict and morphodict-run users can modify them.
umask 0002

exec npm run start:MORPHODICT_LANG_PAIR

# uwsgi --http-socket is intended to be used behind, e.g., nginx
exec uwsgi --http-socket :3000 \
    --stats :4141 \
    --wsgi-file src/wsgi.py \
    src/uwsgi.ini

