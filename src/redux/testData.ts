import { Businesses } from "./state";

const data: Businesses = {
	test: {
		id: "test",
		name: "Ramen store",
		status: "open",
		rating: 4.3,
		ratingNum: 123,
		address: "111 ST NY, 11223",
		hours: ["7AM", "8PM"],
		gallery: [
			{
				url: "https://cdn.dribbble.com/users/371094/screenshots/3884115/ramen.jpg",
				description: "good morning!"
			}
		]
	},
	hello: {
		id: "hello",
		name: "Donut store",
		status: "close",
		rating: 3.1,
		ratingNum: 10,
		address: "222 ST NY, 12031",
		hours: ["9AM", "5PM"],
		gallery: [
			{
				url: "https://exploremcallen.com/wp-content/uploads/2018/05/mcallen-donut-day.jpg",
				description: "blablabla"
			}
		]
	},
	":)": {
		id: ":)",
		name: "Chinese food store",
		status: "open",
		rating: 4.7,
		ratingNum: 2034,
		address: "333 ST NY, 11223",
		hours: ["9AM", "6PM"],
		gallery: [
			{
				url:
					"https://www.ediblebrooklyn.com/wp-content/uploads/sites/2/2017/12/IMG_1339.jpg",
				description: "YUM"
			}
		]
	}
};

export default data;
