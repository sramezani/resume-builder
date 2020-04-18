export interface IProps {
	theme: {
		color: string,
		fontFamily: string
	}
}
export interface IState {
	currentPage: number,
	activeSlide: number,
	canScroll: boolean
}