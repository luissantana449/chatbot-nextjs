import { OAuthConfig, OAuthUserConfig } from "next-auth/providers/oauth";

import { createJWTToken } from "@/app/utils/jwt-create";

interface EgideProfile {
  id: number;
  nome: string;
  username: string;
  email: string;
  matricula: string;
  cpf: string;
  ativo: boolean;
}

export function EgideProvider<P extends EgideProfile>(
  options?: OAuthUserConfig<P>,
): OAuthConfig<P> {
  return {
    id: "oauth-egide",
    name: "Égide",
    type: "oauth",
    authorization: {
      url: `https://egide.defensoria.mt.def.br/oauth/authorize`,
      params: { scope: "code" },
    },
    clientId: process.env.EGIDE_CLIENT_ID,
    clientSecret: process.env.EGIDE_CLIENT_SECRET,
    token: `https://egide.defensoria.mt.def.br/oauth/token`,
    userinfo: `https://egide.defensoria.mt.def.br/api/v1/me`,
    async profile(profile: any) {
      const jwtToken = await createJWTToken({ username: profile.username });

      return {
        ...profile,
        jwtToken,
      };
    },
    options,
  };
}
