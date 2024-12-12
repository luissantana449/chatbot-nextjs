import { NextRequest, NextResponse } from "next/server";
import { Message as VercelChatMessage } from "ai";
import {
  BedrockAgentRuntimeClient,
  InvokeAgentCommand,
} from "@aws-sdk/client-bedrock-agent-runtime";
import { AIMessage, ChatMessage, HumanMessage } from "@langchain/core/messages";

export const runtime = "edge";

// Configurar a região e as credenciais da AWS
//const client = new BedrockAgentRuntimeClient({ region: "sa-east-1" });
const client = new BedrockAgentRuntimeClient({
  region: process.env.BEDROCK_AWS_REGION,
  credentials: {
    accessKeyId: process.env.BEDROCK_ACCESS_KEY_ID,
    secretAccessKey: process.env.BEDROCK_ACCESS_SECRET,
  },
});

const convertBedrockMessageToLangChainMessage = (
  message: VercelChatMessage,
) => {
  if (message.role === "user") {
    return new HumanMessage(message.content);
  } else if (message.role === "assistant") {
    return new AIMessage(message.content);
  } else {
    return new ChatMessage(message.content, message.role);
  }
};

async function callBedrockAgent(input: string, url?: any, sessionId?: string) {
  const urlObj = new URL(url);
  const agentId = urlObj.searchParams.get("agentId");
  const aliasId = urlObj.searchParams.get("aliasId");
  let completion = "";
  const params = {
    agentId: agentId ?? process.env.BEDROCK_AGENT_ID,
    agentAliasId: aliasId ?? process.env.BEDROCK_AGENT_ALIAS,
    sessionId: sessionId || process.env.BEDROCK_SESSION_ID,
    inputText: input,
  };

  const command = new InvokeAgentCommand(params);

  const response = await client.send(command);

  try {
    if (response.completion === undefined) {
      throw new Error("Completion is undefined");
    }

    for await (let chunkEvent of response.completion) {
      const chunk = chunkEvent.chunk;
      const decodedResponse = new TextDecoder("utf-8").decode(chunk?.bytes);
      completion += decodedResponse;
    }

    return completion;
  } catch (error) {
    console.error("Erro ao chamar o agente Bedrock:", error);
    throw error;
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const sessionId = req.headers.get("x-uuid");

    // const returnIntermediateSteps = body.show_intermediate_steps;
    const messages = (body.messages ?? [])
      .filter(
        (message: VercelChatMessage) =>
          message.role === "user" || message.role === "assistant",
      )
      .map(convertBedrockMessageToLangChainMessage);

    const lastMessage = messages[messages.length - 1].content;
    const bedrockResponse = await callBedrockAgent(
      lastMessage,
      req.headers.get("referer"),
      sessionId ?? "",
    );

    const formattedResponse = bedrockResponse
      .replace(/\n/g, " ")
      .replace(/^"(.*)"$/, "$1");

    return NextResponse.json(formattedResponse, { status: 200 });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: e.status ?? 500 });
  }
}
