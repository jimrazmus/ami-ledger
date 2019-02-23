#!/usr/bin/env bash
curl --user $CIRCLECI_USER \
    --request POST \
    --form revision=$CIRCLECI_COMMIT \
    --form config=@config.yml \
    --form notify=false \
        https://circleci.com/api/v1.1/project/github/jimrazmus/ami-access-manager/tree/master