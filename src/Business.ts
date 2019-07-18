export type BusinessStatus = "open" | "close";
export type BusinessId = string;  // for semantic purpose

export default class Business {
	constructor(
		public id: BusinessId,
		public name: string,
		public status: BusinessStatus,
        public rating: number,
        public ratingNum: number
	) {}
}
