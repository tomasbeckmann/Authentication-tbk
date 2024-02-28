import { toast } from "sonner";

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: "",
			user: {}
		},
		actions: {
			fetchRegister: (data) => {
				const storage = getStore()
				fetch("https://bug-free-space-goggles-wr764pj5q9vwh5rg4-3001.app.github.dev/user", {
					method: "POST",
					body: JSON.stringify(data),
					headers: {
						"content-type": "application/json",
						Authorization: `Bearer ${storage.token}`
					},
				}).then((response) => {
					console.log("response", response)
					return response.json()
				}).then((data2) => {
					console.log("data", data)
				})
			},
			fetchLogin: (data) => {
				const storage = getStore()
				return fetch("https://bug-free-space-goggles-wr764pj5q9vwh5rg4-3001.app.github.dev/login", {
					method: "POST",
					body: JSON.stringify(data),
					headers: {
						"content-type": "application/json",
						Authorization: `Bearer ${storage.token}`
					},
				})
					.then((response) => {
						console.log(response.json)
						if (response.status === 200) {
							return response.json()
						} if (response.status === 401) {

							toast.error("El usuario no existe")

							throw new Error("ERROR")
						} if (response.status === 400) {

							toast.error("Contraseña incorrecta")

							throw new Error("ERROR")
						} if (response.status === 422) {
							throw new Error("ERROR");
						}
					})
					.then((response) => {
						setStore({ token: response.token, user: response.user })
						localStorage.setItem("TOKEN", response.token)
						sessionStorage.setItem("TOKEN", response.token)
						return true
					})
			},
			fetchToken: (data) => {
				const storage = getStore()
				return fetch("https://bug-free-space-goggles-wr764pj5q9vwh5rg4-3001.app.github.dev/private", {
					method: "GET",
					headers: {
						"content-type": "application/json",
						Authorization: `Bearer ${storage.token}`
					},
				}).then((response) => {
					console.log("response", response)
					return response.json()
				})
			},
		}
	};
};

export default getState;
