namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: "development" | "production" | "test";
    readonly OPEN_API_KEY: string;
    readonly EGIDE_CLIENT_SECRET: string;
    readonly NEXTAUTH_SECRET: string;
    readonly EGIDE_URL: string;
    readonly EGIDE_CLIENT_ID: string;
    readonly EGIDE_URL_ACCESS_TOKEN: string;
    readonly BEDROCK_ACCESS_KEY_ID: string;
    readonly BEDROCK_ACCESS_SECRET: string;
    readonly BEDROCK_AWS_REGION: string;
    readonly BEDROCK_AGENT_ID: string;
    readonly BEDROCK_AGENT_ALIAS: string;
    readonly BEDROCK_SESSION_ID: string;
  }
}
