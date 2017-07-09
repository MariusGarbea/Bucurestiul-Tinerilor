export const songIsPlaying = (state = false, action) => {
	switch(action.type) {
		case 'TOGGLE_PLAYING':
			return !state;
		default:
			return state;
	}
};