# AWS Permissions

AMI Access Manager has a small set of permissions required to run effectively. These include the following:

* ec2:DescribeImages - required to query for AMIs
* ec2:DescribeImageAttribute - required to fetch the launch permissions of an AMI
* ec2:ModifyImageAttribute - required to change the launch permissions of an AMI
* sts:getCallerIdentity - optional, but necessary for the "auth" command

Here is a sample AWS policy that includes the permissions necessary to run this program. Note that you can be more restrictive with the Resource section if you choose.

    {
        "Version": "2012-10-17",
        "Statement": [
            {
                "Effect": "Allow",
                "Action": [
                    "ec2:DescribeImages",
                    "ec2:DescribeImageAttribute",
                    "ec2:ModifyImageAttribute",
                    "sts:GetCallerIdentity"
                ],
                "Resource": "*"
            }
        ]
    }
