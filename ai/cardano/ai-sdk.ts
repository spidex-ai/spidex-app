import { z } from 'zod';

import { tool } from 'ai';

import { getAllCardanoActions } from './actions';

import type {
  CardanoAction,
  CardanoActionResult,
  CardanoActionSchemaAny,
} from './actions';
import type { CoreTool } from 'ai';

export const cardanoTool = <
  TActionSchema extends CardanoActionSchemaAny,
  TResultBody,
>(
  action: CardanoAction<TActionSchema, TResultBody>,
  client: any
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
    execute: async args => {
      const result =
        func.length === 2
          ? await func(client, args)
          : await (
              func as (
                args: z.infer<TActionSchema>
              ) => Promise<CardanoActionResult<TResultBody>>
            )(args);
      return result;
    },
  });
};
export const cardanoTools = (
  client: any,
  actions: CardanoAction<any, any>[] = getAllCardanoActions()
) =>
  actions.reduce(
    (acc, action) => {
      acc[action.name] = cardanoTool(action, client);
      return acc;
    },
    {} as Record<string, CoreTool>
  );
