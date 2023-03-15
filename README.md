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

On Windows, run: `npx env-cmd -f .env.crkeng react-scripts start`


## Deployment
morphodict-frontend currently needs to be deployed manually, though 
eventually this process should be wrapped up in a script and called 
through the deploy hook to be deployed automatically. To deploy the front-
end, follow these steps:
1. Make, review, and merge PRs with relevant changes into `main`
2. ssh into `itw.altlab.dev`
3. `sudo -i -u morphodict`, Note: you need permission to become the morphodict user
4. `cd morphodict-frontend`
5. `git pull`
6. Repeat the remaining steps for any language pair you'd like to deploy,
   replacing `crkeng` with the language pair you'd like deployed.
7. `cd crkeng/docker`
8. `docker-compose build`
9. `./deploy`


## Adding a new language pair
In order to add a new language pair, you need to add a series of files 
and commands that will properly handle the new language pair. Assuming
your new language pair is named sssttt, you need the following files:

```text
/src/components/sssttt/SsstttSettings.js
/src/components/sssttt/MainPage.js
.env.sssttt
```

You need to make changes to the following files:

```text
Welcome.js
Settings.js
Header.js
About.js
```

In order to deploy the new site, follow the instructions [here](https://morphodict.readthedocs.io/en/latest/docker.html?highlight=nginx#nginx)
and the deployment instructions above. You'll also need to make `/sssttt/docker/` with 
all the appropriate files in it. I recommend copying the files from `/crkeng/docker/` and 
replacing references of `crkeng` with `sssttt` and ensuring the port is correct.
