# Configuration

AMI Access Manager(aam) configuration syntax defines the work the program will do.

## Jobs

Configuration is provided as a JSON object. It begins with a "jobs" array containing one or more job objects. Each job object combines a "query" with a list of "accounts". For example:

    {
        "jobs": [
            {
                "query": { SOME_QUERY },
                "accounts": [ SOME_ACCOUNTS ]
            },
            {
                "query": { ANOTHER_QUERY },
                "accounts": [ OTHER_ACCOUNTS ]
            },

            ...

        ]
    }

*BEWARE:* Query objects must be mutually exclusive when running the "full" command, unless the lists of accounts match. You will get non-deterministic results if the account lists do not match.

### Query

A query is used to identify the Amazon Machine Image(s) to manage. The query may be any selection criteria accepted by the describeImages API method, as documented [here](https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_DescribeImages.html) and expressed in JSON syntax. For example:

    "query": {
        "Filters": [
            {
                "Name": "name",
                "Values": [
                    "your-amis-name"
                ]
            }
        ]
    }

### Accounts

One or more Amazon account IDs are used to mutate the launch permissions of an Amazon Machine Image. For example:

    "accounts": [
        "000000000000",
        "111111111111"
    ]

The accounts listed may be added, removed, or explictly set depending on how the program is run.
