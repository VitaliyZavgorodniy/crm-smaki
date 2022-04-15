/*  no-nested-ternary */
/*  no-magic-numbers */
import queryString from "query-string";

export default class ApiClient {
  constructor({
    apiUrl = "",
    prefix = "",
    onError = () => {},
    onNetworkError = () => {},
  } = {}) {
    if (!apiUrl) throw new Error("[apiUrl] required");

    this.apiUrl = apiUrl;
    this.prefix = prefix;
    this.onError = onError;
    this.onNetworkError = onNetworkError;
  }

  async get(url, params = {}) {
    return this.request({
      url,
      params,
      method: "GET",
    });
  }

  async post(url, payload = {}, type = "json") {
    return this.request({
      url,
      method: "POST",
      body: payload,
      type,
    });
  }

  async put(url, payload = {}) {
    return this.request({
      url,
      method: "PUT",
      body: payload,
    });
  }

  async patch(url, payload = {}) {
    return this.request({
      url,
      method: "PATCH",
      body: payload,
    });
  }

  async delete(url, payload = {}) {
    return this.request({
      url,
      method: "DELETE",
      body: payload,
    });
  }

  setApiUrl(apiUrl) {
    this.apiUrl = apiUrl;
  }

  setApiPrefix(prefix) {
    this.prefix = prefix;
  }

  setToken(token) {
    this.token = token;
  }

  getToken() {
    return this.token;
  }

  async fetch(url, options, attempts = 3) {
    for (let i = 0; i < attempts; i++) {
      try {
        return await fetch(url, options);
      } catch (error) {
        if (
          error &&
          error.name === "TypeError" &&
          error.message === "Network request failed"
        ) {
          if (i >= attempts - 1) {
            throw error;
          } else {
            await this.delay(5000);
          }
        } else {
          throw error;
        }
      }
    }
  }

  async request({ url, method, params = {}, body, type = "json" }) {
    const query = Object.keys(params).length
      ? `?${queryString.stringify(params, { arrayFormat: "comma" })}`
      : "";
    const requestUrl = `${this.apiUrl}/${this.prefix}/${url}${query}`;
    const headers = new Headers();
    const requestBody =
      method === "GET"
        ? undefined
        : type === "formData"
        ? body
        : JSON.stringify({ ...body });

    headers.append("Accept", "application/json");

    if (type === "json") {
      headers.append("Content-Type", "application/json");
    }

    if (this.token) {
      headers.append("Authorization", `Bearer ${this.token}`);
    }

    const options = {
      method,
      headers,
      redirect: "follow",
      withCredentials: true,
      crossDomain: false,
      body: requestBody,
    };

    try {
      const res = await this.fetch(requestUrl, options);

      let json = {};

      try {
        json = await res.json();
      } catch (error) {
        console.log("Wrong response error: ", error);

        const e = {
          code: "INVALID_RESPONSE",
          httpStatus: res.status,
        };

        throw e;
      }

      if (json.status === 0) {
        throw json.error;
      }

      return json;
    } catch (error) {
      this.handleServerError(error);

      throw error;
    }
  }

  async delay(ms = 100) {
    return new Promise((res) => setTimeout(res, ms));
  }

  handleServerError(error) {
    console.log("Server error: ", error);
    this.onError(error);
  }
}
