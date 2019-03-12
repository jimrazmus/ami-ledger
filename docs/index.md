# AMI Access Manager Documentation

## Summary

Easily manage the launch permissions on thousands of your Amazon Machine Images (AMI). You define the queries that identify your AMIs along with the list of account IDs that should have launch permissions and AMI Access Manager will make it happen.

AMI Access Manager is idempotent when queries are mutually exclusive. That is, every AMI matches one, and only one, query in the configuration.

## Table of Contents

* [Amazon Permissions](aws-permissions.md)
* [Commands](commands.md)
* [Configuration](configuration.md)
