declare module '#app' {
	interface NuxtApp {
		$publishCurrentGame(game: Partial<Game>): Promise<void>
		$subscribeCurrentGame(): Promise<void>
	}
}

declare module 'vue' {
	interface ComponentCustomProperties {
		$publishCurrentGame(game: Partial<Game>): Promise<void>
		$subscribeCurrentGame(): Promise<void>
	}
}

export {}
