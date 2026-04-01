/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as certificates from "../certificates.js";
import type * as contact from "../contact.js";
import type * as contactEmail from "../contactEmail.js";
import type * as contactErrors from "../contactErrors.js";
import type * as contactRateLimit from "../contactRateLimit.js";
import type * as contactValidation from "../contactValidation.js";
import type * as crons from "../crons.js";
import type * as projects from "../projects.js";
import type * as seed from "../seed.js";
import type * as techstack from "../techstack.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

declare const fullApi: ApiFromModules<{
  certificates: typeof certificates;
  contact: typeof contact;
  contactEmail: typeof contactEmail;
  contactErrors: typeof contactErrors;
  contactRateLimit: typeof contactRateLimit;
  contactValidation: typeof contactValidation;
  crons: typeof crons;
  projects: typeof projects;
  seed: typeof seed;
  techstack: typeof techstack;
}>;

/**
 * A utility for referencing Convex functions in your app's public API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;

/**
 * A utility for referencing Convex functions in your app's internal API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = internal.myModule.myFunction;
 * ```
 */
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

export declare const components: {};
