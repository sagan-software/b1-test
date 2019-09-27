/**
 * A simple wrapper to strengthen basic types
 * @see {@link https://codemix.com/opaque-types-in-javascript/}
 */
export type Opaque<K, T> = T & { readonly __TYPE__: K }

/** Opaque type representing an EOSIO chain ID */
export type ChainId = Opaque<'ChainId', string>

/** Opaque type representing an EOSIO block ID */
export type BlockId = Opaque<'BlockId', string>

/** Opaque type representing an EOSIO block number */
export type BlockNum = Opaque<'BlockNum', number>

/** Opaque type representing an EOSIO transaction ID */
export type TransactionId = Opaque<'TransactionId', string>

/** Opaque type representing an EOSIO account name */
export type AccountName = Opaque<'AccountName', string>

/** Opaque type representing an EOSIO action name */
export type ActionName = Opaque<'ActionName', string>
