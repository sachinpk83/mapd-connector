import {isNodeRuntime, threadContext} from "./mapd-con-es6";

const MapDClient = isNodeRuntime() ? require("../build/thrift/node/OmniSci.js").Client: threadContext().OmniSciClient;
const TMapDException = isNodeRuntime() ? require("../build/thrift/node/omnisci_types.js").TOmniSciException: threadContext().TOmniSciException;
const Thrift = isNodeRuntime() ? require("thrift").Thrift: threadContext().Thrift;

export function isResultError(result) {
  return result instanceof Thrift.TException || result instanceof Error
}

export function createResultError(result) {
  if (result instanceof TMapDException) {
    return new Error(result.error_msg)
  } else if (typeof result.message === "undefined") {
    return new Error("Unspecified Error")
  } else {
    return new Error(result.message)
  }
}

/* eslint-disable consistent-this */
export function wrapMethod(context, method, isError) {
  return function wrapped(...args) {
    const arity = MapDClient.prototype[method].length
    if (args.length === arity) {
      const callback = args.pop()
      MapDClient.prototype[method].call(context, ...args, result => {
        if (isError(result)) {
          callback(result)
        } else {
          callback(null, result)
        }
      })
    } else if (args.length === arity - 1) {
      const result = MapDClient.prototype[method].call(context, ...args)
      if (isError(result)) {
        throw result
      }
      return result
    } else {
      throw new Error("Insufficient arguments to run this method " + method)
    }
  }
}

export function wrapWithErrorHandling(context, method) {
  return wrapMethod(context, method, isResultError)
}
/* eslint-enable consistent-this */
