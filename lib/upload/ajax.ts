export class HttpError extends Error {
  constructor(
    msg: string,
    public readonly status: number,
    public readonly method: string,
    public readonly url: string
  ) {
    super(msg);
  }
}

export type AjaxBody = {[x: string]: any} | string | null;

export type AjaxEvent = ProgressEvent | (ProgressEvent & {percent: number});

export type AjaxError = HttpError | AjaxEvent;

export interface AjaxOptions {
  action: string;
  headers: {[x: string]: string},
  data: any;
  filename: string;
  file: File;
  withCredentials: string;
  onProgress: (e: ProgressEvent & {percent: number}) => void;
  onSuccess: (body: AjaxBody) => void;
  onError: (error: AjaxError) => void;
}

export function upload(option: AjaxOptions) {
  if (typeof XMLHttpRequest === 'undefined') {
    return;
  }

  const xhr = new XMLHttpRequest();
  const action = option.action;

  if (xhr.upload) {
    xhr.upload.onprogress = function progress(e: ProgressEvent) {
      if (e.total > 0) {
        (e as any).percent = e.loaded / e.total * 100;
      }
      option.onProgress(e as any);
    };
  }

  const formData = new FormData();

  if (option.data) {
    Object.keys(option.data).forEach(key => {
      formData.append(key, option.data[key]);
    });
  }

  formData.append(option.filename, option.file, option.file.name);

  xhr.onerror = function error(e) {
    option.onError(e);
  };

  xhr.onload = function onload() {
    if (xhr.status < 200 || xhr.status >= 300) {
      return option.onError(getError(action, option, xhr));
    }

    option.onSuccess(getBody(xhr));
  };

  xhr.open('post', action, true);

  if (option.withCredentials && 'withCredentials' in xhr) {
    xhr.withCredentials = true;
  }

  const headers = option.headers || {};

  for (let item in headers) {
    if (headers.hasOwnProperty(item) && headers[item] !== null) {
      xhr.setRequestHeader(item, headers[item]);
    }
  }
  xhr.send(formData);
  return xhr;
}


function getError(action: string, option: AjaxOptions, xhr: XMLHttpRequest): HttpError {
  let msg;
  if (xhr.response) {
    msg = `${xhr.response.error || xhr.response}`;
  } else if (xhr.responseText) {
    msg = `${xhr.responseText}`;
  } else {
    msg = `fail to post ${action} ${xhr.status}`;
  }

  return new HttpError(msg, xhr.status, 'post', action);
}

function getBody(xhr: XMLHttpRequest): {[x: string]: any} | string | null {
  const text = xhr.responseText || xhr.response;
  if (!text) {
    return text;
  }

  try {
    return JSON.parse(text);
  } catch (e) {
    return text;
  }
}