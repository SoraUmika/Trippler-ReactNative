export type BusinessStatus = "open" | "close";

export default class Business {
	constructor(
		public id: string,
		public name: string,
		public status: BusinessStatus,
        public rating: number,
        public ratingNum: number
	) {}
}
