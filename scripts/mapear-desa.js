#! /usr/bin/env node
var shell = require("shelljs");
shell.exec("rm src/app/modules/core/services/api.service.ts");
shell.exec("rm src/app/models/comunes.model.ts");
shell.exec("npx swagger-typescript-api -p ./scripts/swagger.json --templates scripts/templates/comunes --modular -o src/app/modules/core/services/");
shell.exec("mv src/app/modules/core/services/api.ts src/app/modules/core/services/api.service.ts");
shell.exec("mv src/app/modules/core/services/data-contracts.ts src/app/models/comunes.model.ts");
shell.exec("rm src/app/modules/core/services/http-client.ts");
