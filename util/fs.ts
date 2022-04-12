import fs from "fs";

type FSResult<T> = Promise<
  | {
      ok: true;
      data: T;
    }
  | {
      ok: false;
      error: any;
    }
>;

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

export async function writeFile(
  path: string,
  content: string
): Promise<FSResult<null>> {
  return fs.promises
    .writeFile(path, content)
    .then((data) => {
      return {
        ok: true as true,
        data: null,
      };
    })
    .catch((err) => {
      return {
        ok: false,
        error: err,
      };
    });
}
