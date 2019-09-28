import djv from 'djv'

const env = new djv()

export const addJsonSchema = env.addSchema.bind(env)

export enum JsonSchemaType {
  RpcInfo = 'RPC_INFO',
  RpcBlock = 'RPC_BLOCK',
  RpcTransaction = 'RPC_TRANSACTION',
}

export function isValidJson(name: string, object: object): boolean {
  return !env.validate(name, object)
}
