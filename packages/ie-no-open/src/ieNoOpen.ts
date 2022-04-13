import { PromiseHandler } from "@lambda-middleware/utils";
import debugFactory, { IDebugger } from "debug";
import { APIGatewayProxyResult, Context } from "aws-lambda";

const logger: IDebugger = debugFactory("@lambda-middleware/ie-no-open");

export const ieNoOpen = <E>() => (
  handler: PromiseHandler<E, APIGatewayProxyResult>
) => async (event: E, context: Context): Promise<APIGatewayProxyResult> => {
  logger("Running handler");
  const response = await handler(event, context);
  return {
    ...response,
    headers: { ...response.headers, "X-Download-Options": "noopen" },
  };
};
