import { createSystem, defineConfig, defaultConfig } from "@chakra-ui/react";

const customConfig = defineConfig({
    ...defaultConfig,
    strictTokens: true,
    preflight: false,

});

const system = createSystem(customConfig);

export default system;
