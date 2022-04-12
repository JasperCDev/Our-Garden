import fs from "fs";

export type FSResult<T> =
  | {
      ok: true;
      data: T;
    }
  | {
      ok: false;
      error: any;
    };

export async function readFile(path: string): Promise<FSResult<string>> {
  return fs.promises
    .readFile(path)
    .then((data) => {
      return {
        ok: true as true,
        data: data.toString(),
      };
    })
    .catch((err) => {
      return {
        ok: false,
        error: err,
      };
    });
}
