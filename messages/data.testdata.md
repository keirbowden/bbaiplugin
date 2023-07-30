# summary

Creates test record data

# description

Creates test record data based on supplied field names and types

# flags.fields.summary

The fields to generate

# flags.fields.description

The fields to generate fake data for

# flags.recordformat.summary

The format of the record data - JSON, CSV etc - default CSV

# flags.recordformat.description

The format of the records - JSON, CSV etc - default SCV

# flags.number.summary

The number of records required - default 5, max 50

# flags.number.description

The number of records required - default 5, max 50

# examples

- Create test contact records

  <%= config.bin %> <%= command.id %> -f "First Name (Text), Last Name (Text), Company (Text), Rating__c (Number 1-10)" -r json

# info.results

Here are the records you requested