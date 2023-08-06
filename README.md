# bbai

[![NPM](https://img.shields.io/npm/v/bbai.svg?label=bbai)](https://www.npmjs.com/package/bbai) [![Downloads/week](https://img.shields.io/npm/dw/bbai.svg)](https://npmjs.org/package/bbai) [![License](https://img.shields.io/badge/License-BSD%203--Clause-brightgreen.svg)](https://raw.githubusercontent.com/salesforcecli/bbai/main/LICENSE.txt)

## Install

```bash
sf plugins install bbai@x.y.z
```

## Commands

<!-- commands -->
* [`sf bbai data testdata`](#sf-bbai-data-testdata)
* [`sf bbai explain apex`](#sf-bbai-explain-apex)
* [`sf bbai explain cli`](#sf-bbai-explain-cli)
* [`sf bbai explain salesforce`](#sf-bbai-explain-salesforce)
* [`sf bbai org data`](#sf-bbai-org-data)

## `sf bbai data testdata`

Creates test record data

```
USAGE
  $ sf bbai data testdata [--json] [-f <value>] [-r <value>] [-n <value>]

FLAGS
  -f, --fields=<value>        The fields to generate
  -n, --number=<value>        [default: 5] The number of records required - default 5, max 50
  -r, --recordformat=<value>  [default: csv] The format of the record data - JSON, CSV etc - default CSV

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Creates test record data

  Creates test record data based on supplied field names and types

EXAMPLES
  Create test contact records

    $ sf bbai data testdata -f "First Name (Text), Last Name (Text), Company (Text), Rating__c (Number 1-10)" -r \
      json

FLAG DESCRIPTIONS
  -f, --fields=<value>  The fields to generate

    The fields to generate fake data for

  -n, --number=<value>  The number of records required - default 5, max 50

    The number of records required - default 5, max 50

  -r, --recordformat=<value>  The format of the record data - JSON, CSV etc - default CSV

    The format of the records - JSON, CSV etc - default SCV
```

## `sf bbai explain apex`

Explain an Apex concept

```
USAGE
  $ sf bbai explain apex [--json] [-t <value>]

FLAGS
  -t, --topic=<value>  The topic that you would like explained

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Explain an Apex concept

  Explain a programming concept as it pertains to the Apex language

EXAMPLES
  Explain sharing

    $ sf bbai explain apex -t sharing

  Explain access modifiers

    $ sf bbai explain apex -t 'access modifiers'

FLAG DESCRIPTIONS
  -t, --topic=<value>  The topic that you would like explained

    The topic that you would like explained - enquote multiple words
```

## `sf bbai explain cli`

Explain a CLI command

```
USAGE
  $ sf bbai explain cli [--json] [-c <value>]

FLAGS
  -c, --command=<value>  The command that you want explained.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Explain a CLI command

  Explains a CLI command string.

EXAMPLES
  Explain pushing source

    $ sf bbai explain cli -c "push source"

  Explain running tests

    $ sf bbai explain cli -c "run test"

FLAG DESCRIPTIONS
  -c, --command=<value>  The command that you want explained.

    Use sfdx or sf notation.
```

## `sf bbai explain salesforce`

Explains a Salesforce concept.

```
USAGE
  $ sf bbai explain salesforce [--json] [-t <value>] [-s <value>]

FLAGS
  -s, --style=<value>  [default: programmer] The style of the explanation - who is the audience?
  -t, --topic=<value>  The topic to explain.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Explains a Salesforce concept.

  Explains a Salesforce concept for a particular audience.

EXAMPLES
  Explain permission sets to a programmer audience

    $ sf bbai explain salesforce -t "permission sets"

  Explain sharing to an executive audience

    $ sf bbai explain salesforce -t sharing -s executive

FLAG DESCRIPTIONS
  -s, --style=<value>  The style of the explanation - who is the audience?

    The style of the explanation - e.g. business, technical, admins, developer - defaults to programmer

  -t, --topic=<value>  The topic to explain.

    The topic to explain.
```

## `sf bbai org data`

Respond to a task (prompt) from a user, extracting information from a

```
USAGE
  $ sf bbai org data [--json] [-t <value>] [-u <value>]

FLAGS
  -t, --task=<value>      The task (prompt) from the user
  -u, --username=<value>  The full Salesforce username to retrieve any data.

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Respond to a task (prompt) from a user, extracting information from a
  Salesforce instance if appropriate.

  Respond to a prompt from a user, extracting information from a
  Salesforce instance if appropriate.

EXAMPLES
  - Create an email containing account information
  $ sf bbai org data -t "Create an email introducing GenePoint, a new account we are tracking in Salesforce. Include the industry and number of employee details from our Salesforce database" 
      -u <username>

FLAG DESCRIPTIONS
  -t, --task=<value>  The task (prompt) from the user

    The task the user would like the model to perform

  -u, --username=<value>  The full Salesforce username to retrieve any data.

    The full Salesforce username to retrieve any data.
```
<!-- commandsstop -->
