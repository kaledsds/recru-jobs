// Converts a route string to an array of strings
export function routeToArray(route: string): string[] {
  return route.split("/").filter((x) => x);
}

// Define a route link from a route index of route array of strings
export function routeLink(route: string[], index: number): string {
  return "/" + route.slice(0, index + 1).join("/");
}
