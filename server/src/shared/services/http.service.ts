import { Service } from 'fastify-decorators';
import Axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

@Service('HttpServiceToken')
export class HttpService {
	private readonly axios: AxiosInstance = Axios.create();

	get<T = any>(
		url: string,
		config?: AxiosRequestConfig
	): Promise<AxiosResponse<T>> {
		return this.axios.get<T>(url, config);
	}

	post<T = any>(
		url: string,
		data?: any,
		config?: AxiosRequestConfig
	): Promise<AxiosResponse<T>> {
		return this.axios.post(url, data, config);
	}

	put<T = any>(
		url: string,
		data?: any,
		config?: AxiosRequestConfig
	): Promise<AxiosResponse<T>> {
		return this.axios.put(url, data, config);
	}

	patch<T = any>(
		url: string,
		data?: any,
		config?: AxiosRequestConfig
	): Promise<AxiosResponse<T>> {
		return this.axios.patch(url, data, config);
	}

	delete<T = any>(
		url: string,
		config?: AxiosRequestConfig
	): Promise<AxiosResponse<T>> {
		return this.axios.delete(url, config);
	}
}
