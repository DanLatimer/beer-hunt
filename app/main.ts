// this import should be first in order to load some required settings (like globals and reflect-metadata)
import { platformNativeScriptDynamic } from "nativescript-angular/platform";
// import '~/shared/angular/setup'

import { AppModule } from "./app.module";

declare var __enableVerboseLogging:any
__enableVerboseLogging();

platformNativeScriptDynamic().bootstrapModule(AppModule);
