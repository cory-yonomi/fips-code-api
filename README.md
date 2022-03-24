# US FIPS County Code API
United States counties and their Federal Information Processing Standards codes

## About
This API was launched to provide an easier option for accessing a desired FIPS code. There are some government resources, a very long list and the Census Bureau API. The format of the data from both those sources isn't conducive to a number of web app functions. The data and scripts that initialized this APIs core data were based on work by [Derek Swingley](https://derekswingley.com) and his article [Using the Census API to Get County FIPS Codes](https://derekswingley.com/2019/10/13/using-the-census-api-to-get-county-fips-codes/). I'm taking it a step further, mostly because I'm practicing development skills, but also because there has to be at least one other person needing an easier time accessing these codes.

# Docs
This API expects GET requests with one to three query parameters.

## Available Parameters
    - countyName: A string of the name of the county
    - state: A string of the two letter state abbreviation
    - countyCode: A string of the county's 6 digit FIPS code

## Request Endpoints

### api/all

//fips-county-api.herokuapp.com/api/all?_countyName=Travis&state=TX will provide the following response object:

    {
        "state": "Texas",
        "countyName": "Travis",
        "countyCode": "48453"
    }


//fips-county-api.herokuapp.com/api/all?_countyCode=48453 will provide the following response object:

    {
        "state": "Texas",
        "countyName": "Travis",
        "countyCode": "48453"
    }

Multiple county codes can be supplied, separated by commas and no spaces.

//fips-county-api.herokuapp.com/api/all?_countyCode=48453,13259 will provide the following response:

    [
        {
            "state": "Texas",
            "countyName": "Travis County",
            "countyCode": "48453"
        },
        {
            "state": "Georgia",
            "countyName": "Stewart County",
            "countyCode": "48453"
        }
    ]

### api/code

//fips-county-api.herokuapp.com/api/code?_countyName=Travis&state=TX will provide the following response object:

    {
        "countyCode": "48453"
    }
