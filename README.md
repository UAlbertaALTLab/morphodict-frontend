# morphodict-frontend
The React front-end for the newly refactored Morphodict applications.

## Working locally
Clone this repo:
```shell
git clone https://github.com/UAlbertaALTLab/morphodict-frontend.git
```

Change directories into the new repo:
```shell
cd morphodict-frontend
```

Install dependencies:
```shell
npm install
```

Ask your friend for the .env files, or make them yourself. Each language 
pair needs a .env file named `.env.sssttt` where `sss` is the source language 
ISO code and `ttt` is the target language ISO code. For example, the Plains Cree 
to English dictionary has a .env file named `.env.crkeng`. These files need the 
following elements:

```text
REACT_APP_NAME
REACT_APP_SUBTITLE
REACT_APP_SOURCE_LANGUAGE_ENDONYM
REACT_APP_WELCOME
REACT_APP_ISO_CODE
REACT_APP_SOURCE_LANGUAGE
REACT_APP_BACKEND
```

These files should be in the root directory of the project.

## To Run on Linux/Mac
Start the project using:
```shell
npm run start:sssttt
```
Again where `sss` is the source language ISO code and `ttt` is the target 
language ISO code.

To run itwêwina:
```shell
npm run start:crkeng
```

To see a list of available services to run, consult the `scripts` section of 
`package.json`.

## To Run on Windows

Start the project using:
```shell
npx env-cmd -f .env.sssttt react-scripts start
```
Again where `sss` is the source language ISO code and `ttt` is the target 
language ISO code.

To run itwêwina:
```shell
npx env-cmd -f .env.crkeng react-scripts start
```

To see a list of available services to run, consult the `scripts` section of 
`package.json`.
