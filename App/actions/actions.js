const togglePlaying = () => {
	return {
		type: 'TOGGLE_PLAYING'
	}
}

const selectSong = (id) => {
	return {
		type: 'SELECT_SONG',
		id
	}
}

export { togglePlaying, selectSong };