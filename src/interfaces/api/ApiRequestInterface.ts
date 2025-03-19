export default interface ApiRequestInterface {
  method: string;
  url: string;
  body?: string; // body stringify
  headers?: { [key: string]: string }
}