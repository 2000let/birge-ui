enum sendRequestMethodEnum {
  GET = "GET",
  POST = "POST",
}

const baseURL = "https://jsonplaceholder.typicode.com/";

const sendRequest = <T>(method: sendRequestMethodEnum, url: string): Promise<T> => {
  return fetch(`${baseURL + url}`, { method }).then((res) =>
    res.json()
  ) as Promise<T>;
};

export { sendRequest, sendRequestMethodEnum };
