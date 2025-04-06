import { z } from "zod";

import { Connection } from "@solana/web3.js";

import { tool } from "ai";

import { getAllCardanoActions } from "./actions";

import type { CardanoAction, CardanoActionResult, CardanoActionSchemaAny } from "./actions";
import type { CoreTool } from "ai";



export const cardanoTool = <TActionSchema extends CardanoActionSchemaAny, TResultBody>(
    action: CardanoAction<TActionSchema, TResultBody>, 
    connection: Connection
) => {
    if (!action.func) {
        return tool({
            description: action.description,
            parameters: action.argsSchema,
        });
    }
    const func = action.func;
    return tool({
        description: action.description,
        parameters: action.argsSchema,
        execute: async (args) => {
            const result = func.length === 2 
                ? await func(connection, args)
                : await (func as ((args: z.infer<TActionSchema>) => Promise<CardanoActionResult<TResultBody>>))(args);
            return result;
        }
    });
}
export const cardanoTools = (connection: Connection, actions: CardanoAction<any, any>[] = getAllCardanoActions()) => actions.reduce((acc, action) => {
    acc[action.name] = cardanoTool(action, connection);
    return acc;
}, {} as Record<string, CoreTool>);

