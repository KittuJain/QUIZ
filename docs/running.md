# Run

*I am assuming that you have followed [SETUP](setup.html) already*

## Dev work

Before starting any work, take the latest pull of this repository

    git pull --rebase

After that, always remember to update your current node module

    $ npm install

You have done with GET and SET, now it is the time for GO :

    $ gulp connect

Run this command when you are running this app for the very first time
For regular development work, run :

    $ gulp prepare


If you have done any changes on database scripts, then always run

    $ gulp clean prepare


# Testing

## Testing unit test

    $ gulp test

- put your unit level tests into tests/*.js
- DO NOT CREATE MULTIPLE NESTED FOLDERS
- ALWAYS CREATE A TEST FILE WITH THE SAME NAME OF SOURCE FILE


# Updating dependencies

    `npm update`
