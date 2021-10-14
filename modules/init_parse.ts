import Parse from "parse/node";


export function initParse(appId: string, javascriptKey: string, masterKey: string, serverUrl: string) {
  Parse.initialize(appId, javascriptKey, masterKey);
  Parse.serverURL = serverUrl;
};