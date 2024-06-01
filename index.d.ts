declare module '#app' {
	interface NuxtApp {
		$emitWS(game: Partial<Game>): Promise<void>
		$startWS(): Promise<void>
	}
}

declare module 'vue' {
	interface ComponentCustomProperties {
		$emitWS(game: Partial<Game>): Promise<void>
		$startWS(): Promise<void>
	}
}

export {}
